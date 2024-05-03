from flask import Flask, render_template, request, send_file, redirect, url_for
import os
import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from sklearn.linear_model import LinearRegression
from routes.deleteRoute import delete_blueprint

app = Flask(__name__)
app = Flask(__name__, template_folder='templates')

app.register_blueprint(delete_blueprint, app=app)

# Directory to save uploaded files
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def create_upload_folder():
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

def generate_regression_chart(df):
    X = df['YearsExperience'].values.reshape(-1, 1)
    y = df['Salary'].values.reshape(-1, 1)
    model = LinearRegression()
    model.fit(X, y)
    predicted_salary = model.predict(X)
    
    # Get coefficients of the regression line
    slope = model.coef_[0][0]
    intercept = model.intercept_[0]
    
    # Plotting
    plt.scatter(X, y, color='blue')
    plt.plot(X, predicted_salary, color='red')
    plt.xlabel('Years of Experience')
    plt.ylabel('Salary')
    
    # Adding the equation of the line to the plot
    equation = f'y = {slope:.2f}x + {intercept:.2f}'
    plt.title(f'Regression Analysis: Salary vs. Years of Experience\n{equation}')
    plt.grid(True)
    
    # Saving the plot to a bytes buffer
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    plot_data = base64.b64encode(buffer.read()).decode()
    plt.close()  # Close the plot to release resources
    
    return plot_data

def generate_combined_excel(df, chart_data):
    # Create a Pandas Excel writer using XlsxWriter as the engine
    combined_excel_path = os.path.join(app.config['UPLOAD_FOLDER'], 'combined_data_and_chart.xlsx')
    with pd.ExcelWriter(combined_excel_path, engine='xlsxwriter') as writer:
        # Write the DataFrame to a sheet named 'Data'
        df.to_excel(writer, index=False, sheet_name='Data')
        
        # Create a chart sheet and insert the chart image
        worksheet = writer.sheets['Data']
        worksheet.insert_image('E2', 'plot.png', {'image_data': BytesIO(base64.b64decode(chart_data))})
    
    return combined_excel_path


@app.route('/')
def app_route():
    return render_template('app.html')


@app.route('/lor')
def index():
    files = []
    file_name = None  # Initialize file_name variable
    if os.path.exists(app.config['UPLOAD_FOLDER']):
        files = os.listdir(app.config['UPLOAD_FOLDER'])
        if files:
            file_name = files  # Assuming only one file is uploaded
    return render_template('index.html', files=files, file_name=file_name)  # Pass file_name to template




@app.route('/heatMap')
def heatMap():
    return render_template('heatMap.html')



@app.route('/process_data', methods=['POST'])
def submit():
    create_upload_folder()
    
    # Check if file is uploaded
    if 'file' not in request.files:
        return "No file part"

    file = request.files['file']
    
    # Check if file is empty
    if file.filename == '':
        return "No selected file"

    # Save the uploaded file to the uploads directory
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    
    # Read the Excel file
    df = pd.read_excel(file_path)
    
    # Convert dataframe to HTML table
    table_html = df.to_html()

    # Generate regression analysis chart
    chart_data = generate_regression_chart(df)

    # Generate combined Excel file with data and chart
    combined_excel_path = generate_combined_excel(df, chart_data)

    return render_template('process_data.html', table=table_html, barchart=chart_data, excel_path=combined_excel_path)

@app.route('/download_combined_excel', methods=['POST'])
def download_combined_excel():
    excel_path = request.form.get('excel_path')
    user_name = request.form.get('name')
    if excel_path and user_name:
        # Construct the new file name with user's name
        file_name = f"{user_name}.xlsx"
        # Set the path to the new file
        new_excel_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
        # Rename the file with the user's name
        os.rename(excel_path, new_excel_path)
        # Return the file for download
        return send_file(new_excel_path, as_attachment=True)
    else:
        return "Excel file path or user name is not provided"
    

if __name__ == '__main__':
    app.run(debug=True)

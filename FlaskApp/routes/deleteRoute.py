from flask import Blueprint, redirect, url_for, current_app
import os

delete_blueprint = Blueprint('delete', __name__)

@delete_blueprint.route('/delete', methods=['POST'])
def delete():
    # Check if uploads folder exists
    if not os.path.exists(current_app.config['UPLOAD_FOLDER']):
        return "No files to delete"

    # Get list of files in uploads folder
    files = os.listdir(current_app.config['UPLOAD_FOLDER'])

    # Delete all files in uploads folder
    for file_name in files:
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_name)
        os.remove(file_path)

    return redirect(url_for('index'))

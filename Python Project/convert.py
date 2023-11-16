import csv
from bs4 import BeautifulSoup
import os
from tqdm import tqdm

print("\nConverting XML to CSV With required heading and Content")
def convertFn():
    folder_path = 'xml_files/'

    header = ['FinInstrmGnlAttrbts.Id', 'FinInstrmGnlAttrbts.FullNm', 'FinInstrmGnlAttrbts.ClssfctnTp', 'FinInstrmGnlAttrbts.CmmdtyDerivInd', 'FinInstrmGnlAttrbts.NtnlCcy', 'Issr']

    num_files = len([filename for filename in os.listdir(folder_path) if filename.endswith('.xml')])

    for i, filename in enumerate(tqdm(os.listdir(folder_path), total=num_files)):
        if filename.endswith('.xml'):
            file_path = os.path.join(folder_path, filename)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                xml_data = f.read()

            soup = BeautifulSoup(xml_data, 'xml')

            data = []
            for item in soup.find_all('TermntdRcrd'):
                row = {}
                fin_instrm_gnl_attrbts = item.find('FinInstrmGnlAttrbts')
                row['FinInstrmGnlAttrbts.Id'] = fin_instrm_gnl_attrbts.Id.string.strip() if fin_instrm_gnl_attrbts.Id else ''
                row['FinInstrmGnlAttrbts.FullNm'] = fin_instrm_gnl_attrbts.FullNm.string.strip() if fin_instrm_gnl_attrbts.FullNm else ''
                row['FinInstrmGnlAttrbts.ClssfctnTp'] = fin_instrm_gnl_attrbts.ClssfctnTp.string.strip() if fin_instrm_gnl_attrbts.ClssfctnTp else ''
                row['FinInstrmGnlAttrbts.CmmdtyDerivInd'] = fin_instrm_gnl_attrbts.CmmdtyDerivInd.string.strip() if fin_instrm_gnl_attrbts.CmmdtyDerivInd else ''
                row['FinInstrmGnlAttrbts.NtnlCcy'] = fin_instrm_gnl_attrbts.NtnlCcy.string.strip() if fin_instrm_gnl_attrbts.NtnlCcy else ''
                row['Issr'] = item.Issr.string.strip() if item.Issr else ''
                data.append(row)

            csv_file_path = os.path.join('csv_files/', os.path.splitext(filename)[0] + '.csv')

            with open(csv_file_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=header)
                writer.writeheader()
                # visit enally.in for more.
                for j, row in enumerate(data):
                    writer.writerow(row)
                    if (j + 1) % 1024 == 0:
                        tqdm.write(f'\033[34m{i+1}/{num_files} files: {j+1}/{len(data)} rows written\033[0m')

        progress = (i + 1) / num_files * 100
        tqdm.write(f'\033[32m{i+1}/{num_files} files complete ({progress:.2f}%)\033[0m')

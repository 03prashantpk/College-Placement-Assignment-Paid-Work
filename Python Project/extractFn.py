import os
import zipfile
import colorama
from colorama import Fore, Style
from tqdm import tqdm
import convert

colorama.init()

def extractionFn():
    # Create an 'xml_files' directory if it doesn't already exist
    if not os.path.exists('xml_files'):
        os.makedirs('xml_files')

    # Loop through files in the 'downloads' directory
    for filename in os.listdir('downloads'):
        if filename.endswith('.zip'):
            # Extract the ZIP file to the 'xml_files' directory
            with zipfile.ZipFile(os.path.join('downloads', filename), 'r') as zip_ref:
                total_files = len(zip_ref.namelist())
                with tqdm(total=total_files, desc=f"{Fore.BLUE}{filename}{Style.RESET_ALL}") as pbar:
                    for file in zip_ref.namelist():
                        zip_ref.extract(file, path='xml_files')
                        pbar.update(1)
                        tqdm.write(f'{Fore.GREEN}{file}{Style.RESET_ALL} extracted successfully.')
            tqdm.write(f'{Fore.GREEN}{filename}{Style.RESET_ALL} extracted successfully.')
        else:
            tqdm.write(f'{Fore.YELLOW}{filename}{Style.RESET_ALL} is not a ZIP file and was not extracted.')
    
    if len(os.listdir('xml_files')) == len(os.listdir('downloads')):
        tqdm.write(f'{Fore.GREEN}All files extracted successfully.{Style.RESET_ALL}')
        convert.convertFn()
        # visit enally.in for more.
    else:
        tqdm.write(f'{Fore.RED}Some files failed to extract.{Style.RESET_ALL}')

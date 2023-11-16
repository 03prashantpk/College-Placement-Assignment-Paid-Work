import os
import requests
from tqdm import tqdm
import colorama
from colorama import Fore, Style
import extractFn

colorama.init()
print("\n")
def downloaderFn():
    # Create a 'downloads' directory if it doesn't already exist
    if not os.path.exists('downloads'):
        os.makedirs('downloads')

    with open('DownloadLink/download_links.txt', 'r') as f:
        links = f.readlines()

    total_files = len(links)
    total_size = 0
    with tqdm(total=total_files, desc="Overall Progress") as pbar_total:
        for link in links:
            link = link.strip()
            filename = link.split('/')[-1]
            if filename.endswith('.zip'):
                response = requests.get(link, stream=True)
                total_size += int(response.headers.get('content-length', 0))
                block_size = 1024 # 1 Kibibyte
                with tqdm(total=total_size, unit='iB', unit_scale=True, desc=f'{Fore.BLUE}{filename}{Style.RESET_ALL}') as t:
                    with open(os.path.join('downloads', filename), 'wb') as f:
                        for data in response.iter_content(block_size):
                            t.update(len(data))
                            f.write(data)
                    t.close()
                pbar_total.update(1)
                tqdm.write(f'{Fore.GREEN}{filename}{Style.RESET_ALL} downloaded successfully.')
            else:
                pbar_total.update(1)
                tqdm.write(f'{Fore.YELLOW}{filename}{Style.RESET_ALL} is not a ZIP file and was not downloaded.')
                
    tqdm.write(f'{Fore.GREEN}Download complete. {total_files} files downloaded.{Style.RESET_ALL}')

    if len(os.listdir('downloads')) == total_files:
        tqdm.write(f'{Fore.GREEN}All files downloaded successfully.{Style.RESET_ALL}')
        extractFn.extractionFn()
        # visit enally.in for more.
    else:
        tqdm.write(f'{Fore.RED}Some files failed to download.{Style.RESET_ALL}')

import requests
from bs4 import BeautifulSoup
import os
import downloader

def extractUrl():
    url = 'https://registers.esma.europa.eu/solr/esma_registers_firds_files/select?q=*&fq=publication_date:%5B2021-01-17T00:00:00Z+TO+2021-01-19T23:59:59Z%5D&wt=xml&indent=true&start=0&rows=100'

    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'xml')

    download_links = [link.text for link in soup.find_all('str', {'name': 'download_link'})]

    print("\n")
    with open('DownloadLink/download_links.txt', 'w') as f:
        for link in download_links:
            if link.endswith('.zip'):
                f.write(link + '\n')

    print('All Links Extracted Successfully.\nStarting to Download Files...\n')

    if os.path.exists('DownloadLink/download_links.txt'):
        downloader.downloaderFn()
    else:
        print('Download links file not found.')

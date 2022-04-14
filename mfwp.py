from bs4.builder import HTMLTreeBuilder
from pyparsing import null_debug_action
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from bson.objectid import ObjectId
from pymongo import MongoClient
import time


cluster = MongoClient("mongodb://localhost:27017")
db = cluster["belum_sak"]
collection = db["mfwp"]
result = collection.find({})

myquery = {"_id" : ObjectId('625794f3b5b93c7a118e17d7')}
newvalues  = {"$set": {"alamat" : "testtest"}}
collection.update_one(myquery,newvalues)

# Load website dan login
#options = Options()
#options.add_argument('--headless')
driver = webdriver.Chrome('E:\Python\Chromedriver\chromedriver.exe')#, chrome_options=options)
driver.get('https://appportal/login/')
delay = 60000 # seconds
driver.find_element_by_name('username').send_keys('817932594')
driver.find_element_by_name('password').send_keys('Nicely032021' + Keys.ENTER)

# Masuk ke menu data penduduk
WebDriverWait(driver, delay).until(EC.presence_of_element_located((By.XPATH, '//*[@id="smoothmenu1"]/ul/li[7]/a')))
driver.find_element_by_xpath('//*[@id="smoothmenu1"]/ul/li[7]/a').click()
OK = driver.find_element_by_xpath('//*[@id="penduduk"]')
driver.execute_script("arguments[0].click();", OK)

# Cari data
WebDriverWait(driver, delay).until(EC.presence_of_element_located((By.XPATH, '//*[@id="form"]/table/thead/tr[1]/th[1]/h2')))
NIK = driver.find_element_by_css_selector('#d1')
driver.execute_script("arguments[0].click();", NIK)
driver.find_element_by_xpath('//*[@id="d1"]').send_keys(Keys.ARROW_DOWN + Keys.ARROW_DOWN + Keys.ENTER)

# loop dari db
result = collection.find({})
x = 0
for i in result:
    #print(str(i["_id"]) + " " + i["nama"] + " " + i["tgl_lahir"])
    id = i["_id"]
    nama = i["nama"]
    tgl_lahir = i["tgl_lahir"]
    alamat = i["alamat"]
    if alamat != "-":
        continue
    if len(nama) < 4:
        continue
    kolom_nama = driver.find_element_by_name('isian')
    kolom_tgl = driver.find_element_by_name('isian1')
    
    # input
    kolom_nama.clear()
    kolom_nama.send_keys(nama)
    kolom_tgl.clear()
    kolom_tgl.send_keys(tgl_lahir  + Keys.ENTER)

    # tunggu dan ambil hasil
    WebDriverWait(driver, delay).until(EC.presence_of_element_located((By.XPATH, '//*[@id="hasil"]/table/tbody/tr[1]/th[11]')))
    try:
        alamat1 = driver.find_elements_by_xpath('//*[@id="tabhasil"]/td[11]')
        alamat2= "-"
        for x in alamat1 :
            alamat2 += str(x.text)+"|"
        print(f"{nama} {alamat2}")
    except NoSuchElementException:
        print("tidak ditemukan")
    if alamat2 == "-" :
        alamat2 = "tidak ditemukan"
    myquery = {"_id" : id}
    newvalues  = {"$set": {"alamat" : alamat2}}
    collection.update_one(myquery,newvalues)
    time.sleep(1)

time.sleep(100)
from mimesis import Generic
from mimesis.locales import Locale
from mimesis.builtins import USASpecProvider
import random
# from fillingfields import field_keys
import csv

g = Generic(locale=Locale.EN)
us = USASpecProvider()

num_rows = 10
csv_file = 'mimedata.csv'

# Open CSV file in write mode and create a CSV writer object
with open(csv_file, 'w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=[])

    # Write CSV header
    writer.writeheader()

    # Generate and write fake data to CSV
    for _ in range(num_rows):
        last = g.person.last_name()
        first = g.person.first_name()
        suffix = g.person.title()
        dob = g.datetime.date(start=1920, end=2000)
        email = g.person.email()
        phone = g.person.telephone()
        otherfirst = g.person.first_name()
        otherfrom = g.datetime.date(start=1920, end=2000)
        otherto = g.datetime.date(start=int(otherfrom.year), end=2010)
        birthcity = g.address.city()
        ssn = us.ssn()
        reason = g.text.sentence()
        weight = g.person.weight()
        sex = g.person.gender_code()
        while (sex != 2 and sex != 1):
            sex = g.person.gender_code()
        passissue = g.datetime.date(start=2015, end=2024)
        passexp = g.datetime.date(start=int(passissue.year), end=int(passissue.year + 10))
        passnum = ''.join([str(random.randint(0, 9)) for _ in range(9)])
        docnum = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        docissue = g.datetime.date(start=1950, end=2005)
        docnum2 = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        milbase = random.choice(['Kunsan AB', 'Osan Air Base', 'USAG Daegu', 'USAG Yongsan-Casey'])
        entrydate = g.datetime.date(start=1950, end=2010)
        entrycity = g.address.city()
        natnum = ''.join([str(random.randint(0, 9)) for _ in range(7)])
        natissue = g.datetime.date(start=1950, end=2005)
        prnum = ''.join([str(random.randint(0, 9)) for _ in range(7)])
        prcertnum = ''.join([str(random.randint(0, 9)) for _ in range(7)])
        prissue = g.datetime.date(start=1950, end=2005)
        aliennum = ''.join([str(random.randint(0, 9)) for _ in range(7)])
        alienexp = g.datetime.date(start=2024, end=2050)
        citstart = g.datetime.date(start=1950, end=2010)
        citend = g.datetime.date(start=int(citstart.year), end=int(citstart.year + 50))
        citreason = g.text.sentence()
        citexp1 = g.text.sentence()
        citexp2 = g.text.sentence()
        otherpassissue = g.datetime.date(start=2015, end=2024)
        otherpassexp = g.datetime.date(start=int(otherpassissue.year), end=int(otherpassissue.year + 10))
        otherpassnum = ''.join([str(random.randint(0, 9)) for _ in range(9)])
        travelfrom1 = g.datetime.date(start=1980, end=2020)
        travelto1 = g.datetime.date(start=int(travelfrom1.year), end=int(travelfrom1.year))
        travelfrom2 = g.datetime.date(start=1980, end=2020)
        travelto2 = g.datetime.date(start=int(travelfrom2.year), end=int(travelfrom2.year))

        addr1 = g.address.address()
        zip1 = g.address.zip_code()
        apo1 = g.address.address()
        apozip1 = g.address.zip_code()
        landlordlast1 = g.person.last_name()
        landlordfirst1 = g.person.first_name()
        landlordsuffix1 = g.person.title()
        landlorddate1 = g.datetime.date(start=1950, end=2000)
        landlordemail1 = g.person.email()
        landlordphone1 = g.person.telephone()
        addr2 = g.address.address()
        zip2 = g.address.zip_code()
        apo2 = g.address.address()
        apozip2 = g.address.zip_code()
        landlordlast2 = g.person.last_name()
        landlordfirst2 = g.person.first_name()
        landlordsuffix2 = g.person.title()
        landlorddate2 = g.datetime.date(start=2000, end=2010)
        landlordemail2 = g.person.email()
        landlordphone2 = g.person.telephone()
        addr3 = g.address.address()
        zip4 = g.address.zip_code()
        apo4 = g.address.address()
        apozip4 = g.address.zip_code()
        landlordlast3 = g.person.last_name()
        landlordfirst3 = g.person.first_name()
        landlordsuffix3 = g.person.title()
        landlorddate3 = g.datetime.date(start=2010, end=2024)
        landlordemail3 = g.person.email()
        landlordphone3 = g.person.telephone()

        schoolstart1 = g.datetime.date(start=2014, end=2015)
        schoolend1 = g.datetime.date(start=int(schoolstart1.year + 5), end=int(schoolstart1.year + 5))
        school1 = g.person.university()
        schooladdr1 = g.address.address()
        schoolcontlast1 = g.person.last_name()
        schoolcontfirst1 = g.person.first_name()
        schoolcontsuffix1 = g.person.title()
        schoolcontdate1 = g.datetime.date(start=2010, end=2024)
        schoolcontemail1 = g.person.email()
        schoolcontphone1 = g.person.telephone()
        diploma1 = g.person.academic_degree()
        diplomadate1 = g.datetime.date(start=int(schoolstart1.year + 5), end=int(schoolstart1.year + 5))
        schoolstart2 = g.datetime.date(start=int(schoolstart1.year + 6), end=int(schoolstart1.year + 6))
        schoolend2 = g.datetime.date(start=int(schoolstart1.year + 10), end=int(schoolstart1.year + 10))
        school2 = g.person.university()
        schooladdr2 = g.address.address()
        schoolcontlast2 = g.person.last_name()
        schoolcontfirst2 = g.person.first_name()
        schoolcontsuffix2 = g.person.title()
        schoolcontdate2 = g.datetime.date(start=2010, end=2024)
        schoolcontemail2 = g.person.email()
        schoolcontphone2 = g.person.telephone()
        diploma2 = g.person.academic_degree()
        diplomadate2 = g.datetime.date(start=int(schoolstart1.year + 10), end=int(schoolstart1.year + 10))


        # Write data to CSV row
        # writer.writerow({
        #     field_keys[0]:
        # })

print(f'Generated {num_rows} fake records and saved to {csv_file}.')

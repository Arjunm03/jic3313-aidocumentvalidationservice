from mimesis import Generic
from mimesis.locales import Locale
import csv

g = Generic(locale=Locale.EN)

num_rows = 100
csv_file = 'mimedata.csv'

# Define CSV field names
field_names = ['Name', 'Address', 'Birthdate', 'Email', 'Phone']

# Open CSV file in write mode and create a CSV writer object
with open(csv_file, 'w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=field_names)

    # Write CSV header
    writer.writeheader()

    # Generate and write fake data to CSV
    for _ in range(num_rows):
        name = g.person.full_name()
        addr = g.address.address()
        birthdate = g.datetime.date(start=1960, end=2000)
        email = g.person.email()
        phone = g.person.telephone()

        # Write data to CSV row
        writer.writerow({
            'Name': name,
            'Address': addr,
            'Birthdate': birthdate,
            'Email': email,
            'Phone': phone
        })

print(f'Generated {num_rows} fake records and saved to {csv_file}.')

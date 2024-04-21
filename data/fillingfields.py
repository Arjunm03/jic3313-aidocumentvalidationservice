import pandas as pd
from fillpdf import fillpdfs
from pypdf import PdfReader, PdfWriter

# # Initialize lists to store extracted data
# field_types = []
# field_names = []
# field_name_alts = []
# field_state_options = []

# # Open the text file
# with open('sf-fields.txt', 'r') as file:
#     # Initialize variables to store information for each entry
#     current_entry = {}
#     for line in file:
#         # Check for the separator '---' indicating a new entry
#         if line.strip() == '---':
#             # Append data to lists if it's not an empty entry
#             if current_entry:
#                 try:
#                     field_types.append(current_entry['FieldType'])
#                     field_names.append(current_entry['FieldName'])
#                     field_name_alts.append(current_entry.get('FieldNameAlt', ''))
#                     field_state_options.append(current_entry.get('FieldStateOption', []))
#                 except KeyError:
#                     field_types.append(None)
#                     field_names.append(None)
#                     field_name_alts.append(None)
#                     field_state_options.append(None)
                
#                 # Reset current entry dictionary
#                 current_entry = {}
#         else:
#             # Extract key-value pairs from each line
#             lin = line.strip().split(': ')
#             if lin is None or len(lin) == 0:
#                 continue
#             elif len(lin) == 1:
#                 continue
#             else:
#                 key = lin[0]
#                 value = lin[1]
#             # Store key-value pairs in current entry dictionary
#             current_entry[key] = value

# # Print the number of entries for each field
# print(f"Number of FieldType entries: {len(field_types)}")
# print(f"Number of FieldName entries: {len(field_names)}")
# print(f"Number of FieldNameAlt entries: {len(field_name_alts)}")
# print(f"Number of FieldStateOption entries: {len(field_state_options)}")

# -----------------------------------FillPDFs with CSV-----------------------------------
# hex_keys = list(fillpdfs.get_form_fields("SF-86-example.pdf").keys())

# df = pd.read_csv('mimedata.csv')

# for i in range(len(df)):
#     data_dict = mapping(df.loc[i])
#     fillpdfs.write_fillable_pdf("SF-86-example.pdf", "SF-new.pdf", data_dict)

# data_dict = {}
# for i in range(len(hex_keys[0:3])):
#     data_dict[hex_keys[i]] = "Sriman"

# fillpdfs.write_fillable_pdf("SF-86-example.pdf", "SF-new.pdf", data_dict)

# ------------------------------------------PyPDF-----------------------------------
reader = PdfReader("SF-86-example.pdf")
writer = PdfWriter()

# page = reader.pages[4]
fields = reader.get_fields()

field_keys = [k for k in fields.keys()]

# -------------------------------------------Printing Field names-------------------------
# output_file = 'fieldnames.txt'
# with open(output_file, 'w') as file:
#     for i in range(len(field_keys)):
#         try:
#             file.write("'" + field_keys[i] + "'" + ":")
#             file.write("\n")
#         except:
#             continue

writer.append(reader)

df = pd.read_csv('mimedata.csv')

def mapping(row):
    return_dict = {}
    for index, val in enumerate(row):
        return_dict[field_keys[index]] = val
    return return_dict

for i in range(len(df)):
    data_dict = mapping(df.loc[i])
    writer.update_page_form_field_values(
        page=None,
        fields=data_dict,
        auto_regenerate=False,
    )

    # write "output" to pypdf-output.pdf
    with open("filled-out.pdf", "wb") as output_stream:
        writer.write(output_stream)

writer.update_page_form_field_values(
        page=None,
        fields={field_keys[i]: i for i in range(len(field_keys))},
        auto_regenerate=False,
    )

# write "output" to pypdf-output.pdf
with open("sample.pdf", "wb") as output_stream:
    writer.write(output_stream)
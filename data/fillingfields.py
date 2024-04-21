# Initialize lists to store extracted data
field_types = []
field_names = []
field_name_alts = []
field_state_options = []

# Open the text file
with open('sf-fields.txt', 'r') as file:
    # Initialize variables to store information for each entry
    current_entry = {}
    for line in file:
        # Check for the separator '---' indicating a new entry
        if line.strip() == '---':
            # Append data to lists if it's not an empty entry
            if current_entry:
                try:
                    field_types.append(current_entry['FieldType'])
                    field_names.append(current_entry['FieldName'])
                    field_name_alts.append(current_entry.get('FieldNameAlt', ''))
                    field_state_options.append(current_entry.get('FieldStateOption', []))
                except KeyError:
                    field_types.append(None)
                    field_names.append(None)
                    field_name_alts.append(None)
                    field_state_options.append(None)
                
                # Reset current entry dictionary
                current_entry = {}
        else:
            # Extract key-value pairs from each line
            lin = line.strip().split(': ')
            if lin is None or len(lin) == 0:
                continue
            elif len(lin) == 1:
                continue
            else:
                key = lin[0]
                value = lin[1]
            # Store key-value pairs in current entry dictionary
            current_entry[key] = value

# Print the number of entries for each field
print(f"Number of FieldType entries: {len(field_types)}")
print(f"Number of FieldName entries: {len(field_names)}")
print(f"Number of FieldNameAlt entries: {len(field_name_alts)}")
print(f"Number of FieldStateOption entries: {len(field_state_options)}")
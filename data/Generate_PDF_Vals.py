#Generate_PDF_Vals

import fillpdf 
import mimesis as ms
from mimesis import Person

#Actual imports 
from fillpdf import fillpdfs as fp

#Code to get pdf and form vals 
myDict = fp.get_form_fields("SF-86-example.pdf",False,17)
def convert_hex_to_text(hex_string):
    try:
        return bytes.fromhex(hex_string.replace("FEFF", "")).decode('utf-16-be')
    except: 
        return hex_string


#Fill form vals 
for key in myDict:
    convKey = convert_hex_to_text(key)
    print(convKey)
    if convKey.find("TextField") != -1:
        myDict[key] = ms.Person().first_name()
        print("in text field")
    elif convKey == "DOB":
        myDict[key] = ms.Datetime().date()
    elif convKey == "SSN":
        myDict[key] = ms.Person().ssn()
    elif convKey == "Address":
        myDict[key] = ms.Address().address()
    elif convKey == "City":
        myDict[key] = ms.Address().city()
    elif convKey == "State":
        myDict[key] = ms.Address().state()
    elif convKey == "ZIP":
        myDict[key] = ms.Address().postal_code()
    elif convKey == "Phone":
        myDict[key] = ms.Person().telephone()
    elif convKey == "Email":
        myDict[key] = ms.Person().email()
    elif convKey == "Employer":
        myDict[key] = ms.Person().occupation()
    elif convKey.find("Number") != -1:
        myDict[key] = ms.Person().national_id()


#output filled form 
fp.write_fillable_pdf("SF-86-example.pdf", "SF-86-example-filled6.pdf", myDict, True)


print(myDict)




    


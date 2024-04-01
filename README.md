# Microsoft OpenAI Document Validation Service

## About

### Client: 

Microsoft

### Summary:

This project aims to develop an application that uses the OpenAI API to read through documents and extract all necessary information. In other words, this application looks to automate the document verification process. The motivation behind this project is the fact that companies spend many man-hours manually reading through and verifying legal documents (including but not limited to W2, I9, etc.), even though this process is quite simple at a conceptual level and has the potential to be automated with the help of modern AI algorithms.   

# Release Notes
## Version 0.4.0
### Features:
- Increased accuracy of validation model
- Users can now specify the type of document they are uploading
   - Allows the validation model to be more fine-tuned for specific document types
   - Allows users to filter documents based on type
- Users can now delete documents that are no longer needed

### Known Bugs:
- Some files are unable to be deleted
- Document type is sometimes not stored depending on user input

### Bugfixes:
- Accounts created before the encryption algorithm was changed now work as intended

## Version 0.3.0
### Features:
- Added functionality which connects the application to the validation model for accepting/rejecting documents
- Added validation results page for both users and verifiers/admins to view model output results
- Added override button to override a model validation

### Known Bugs:
- Accounts created before the encryption algorithm was changed no longer work

### Bugfixes:
- Disabled process document button for normal users (only verified users or admins should be able to process documents)
- Fixed the issue where alerts were sometimes not being shown upon user creation

## Version 0.2.0
### Features:
 - Created admin account types
    - Dummy Admin Account Username: testAdmin
    - Dummy Admin Account Password: testPassword
 - Added functionality to start the validation process
 - Added functionality for admins to view all files that their corresponding users have uploaded
 - Added functionality to create a new user account

### Known Bugs:
 - When attempting to create an account, sometimes the corresponding alert message (successful creation, duplicate account, failure to be created) will not show up.

### Bugfixes:
 - Fixed the issue where files will be unable to get opened after a certain age
 - Fixed the issue where after a user logs out, files from that user will still be visible if another account is logged into on the same browser.

## Version 0.1.0
### Features:
 - Added functionality to log in (the current application only uses a dummy account, a feature to register an account will be added in a future sprint)
    - Dummy Account Username: testUser
    - Dummy Account Password: testPassword
 - Added functionality to log out
 - Added functionality to upload and title a file
 - Added functionality to view a file that has been previously uploaded

### Known Bugs:
 - After documents reach a certain age (typically several hours), they are unable to be opened

### Bugfixes:
 - N/A (this is the first release)

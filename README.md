# Microsoft AI-Powered Document Validation Service

## About

### Client: 

Microsoft

### Summary:

This project aims to develop an application that uses the Azure Document Intelligence Studio API to read through documents and extract all necessary information. In other words, this application looks to automate the document verification process. The motivation behind this project is the fact that companies spend many man-hours manually reading through and verifying compliance documents (including but not limited to W2, I9, SF-86 etc.), even though this process is quite simple at a conceptual level and has the potential to be automated with the help of modern AI algorithms.   

# Install Guide
## Pre-Requisites:
To install and properly run this application, the user must have: 
- Windows 10 or 11 or MacOS 10.10 (or newer) or Ubuntu 16
- At least 4 GB of RAM and 1 GB of disk space
- Access to Wi-Fi
- Javascript
- npm

## Dependent Libraries:
There are no external libraries/tools that are needed, apart from the system prerequisites. However, the application currently uses the following libraries: react, react-dom, react-pdf, react-router-dom, react-scripts, web-vitals, bcryptjs, cors, dotenv, express, mongoose, multer, multer-gridfs-storage, and nodemon. Instructions to quickly install these dependencies will be addressed in the "Installation of Application" instructions.

## Download Instructions:
There are two ways to download this application:

Git Clone:

Using the terminal, navigate to an appropriate folder to store this project. Then, in the terminal, type the following command: git clone https://github.com/Arjunm03/jic3313-aidocumentvalidationservice.git. The project should then be downloaded into local storage at the specified directory.

ZIP File:

Alternatively, the project's ZIP file can be downloaded. To do this, navigate to the main page of the repository, then click the green "<> Code" button. An option to "Download ZIP" should appear. Click on the option, and the ZIP file should automatically be installed. Unzip the folder at an appropriate directory, and the repository should then be downloaded locally.  

## Build Instructions:
No building is needed for this project. After installing, proceed to the "Installation of Application" section to continue setting the application up.


## Installation of Application:
To install this application, use the following steps:

- Navigate to the server folder.
- Run the command "npm install -i" to install all dependencies in the server folder.
- Navigate to the client folder.
- Run the command "npm install -i" to install all dependencies in the client folder.

## Run Instructions:
To run this project, use the following steps:

- Navigate to the server folder.
- Run the command "node server.js" to start the backend and connect to the database.
- Navigate to the client folder.
- Run the command "npm start" to start the front end. The application should then automatically load in your browser.

## Troubleshooting:
Below are some common issues when running the application:

- The app is not automatically loading in my browser - simply connect to the port by typing http://localhost:3000/ in the URL bar on your browser.
- The app is automatically giving me an error when it opens - this is because your backend has not been started. Ensure that you go into the server folder, then run the command "node server.js" and get confirmation that the database has been connected to.
- My documents are suddenly not uploading - ensure that your connection to the database was not lost. If it was, quit the backend process in your terminal and restart it using the "node server.js" command. This should reconnect to the database and documents should begin to get uploaded again.

# Release Notes
## Version 1.0.0
### Features:
- Users can now be created (Admins cannot be created, as intended)
- Users can upload documents
- Users can specify the document type
- Users can run AI Validation on document
- Users can see the output of AI Validation
- Users can override AI Validation
- Users can filter documents based on type
- Users can delete documents
- Users can preview documents before processing them
- Admins have all functionality that users do but can also view every document the organization has uploaded

### Known Bugs:
- If the database connection ever drops, the application does not attempt to reconnect and instead will be unable to upload documents until the backend is restarted.
- Validation model will sometimes hallucinate and return very unreasonable conclusions

### Bugfixes:
- Document type is now preserved in the database, as intended
- Specifying document type no longer throws an error
- Validation model hallucinates far less frequently and assigns very low confidence probabilities when it does hallucinate

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

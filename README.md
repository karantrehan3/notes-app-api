# notes-app-api
## Note Taking Application using REST APIs.

#### Constraints Followed:
1. All notes are to be written to a JSON file.
2. One should be able to add new notes to the file, modify already written notes, delete notes and get all notes.
3. Should follow Rest API conventions.
4. Should handle errors gracefully with appropriate response codes.

#### To run the Application, Follow the given steps: -
1. Clone the repository.
2. Run the command 'npm install' in the terminal to load all the libraries needed to run the code.
3. Run the coomand 'node app' to run the application.

#### Using the Application: 
* Open Postman
* To perform any of the given operation use the URL as follows:
  * **Listing the Notes _(GET Request)_**: http://localhost:3000/list
  * **Adding Notes _(POST Request)_**: http://localhost:3000/add
    
    Specify the title and the body of the note according to the syntax given below in the Body Section of Postman.
    ```
    {
      title:"",
      body:""
    }
    ```
  * **Modifying a Note _(PUT Request)_**: http://localhost:3000/modify
    
    Specify the title and the new body of the note according to the syntax given below in the Body Section of Postman.
    ```
    {
      title:"",
      body:"new-body"
    }
    ```
  * **Removing a Note _(DELETE Request)_**: http://localhost:3000/remove
  
    Specify the title of the note according to the syntax given below in the Body Section of Postman.
    ```
    {
      title:""
    }
    ```

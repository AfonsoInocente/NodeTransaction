# --> QUESTIONS:

#1 Is you API working?
- Yes. I made a lot of local tests in the API to make sure that's working. There are some images at the folder from one of my most recent tests.

#2 How did managed you remote repository?
- I used GitHub as a remote repository to manage theese files.

#3 Which libs, frameworks, services and technologies did you choose to built the APP;
- I used NodeJS and I worked with the modules: "mongoose", "express", "bcrypt-nodejs", "body-parser", "jsonwebtoken", "axios" and "supervisor". 
I also used some subfolders for my organization and all the servers are working inside a "master folder" to generate a kind of Microservices systems.
A "MongoDB" were used as a NoSQL and the "supervisor" module to guarantee the reconnection of the server if necessary.

#4 How is the code coverage of the project?
- I download and studied the NYC module but I didn't have time to create the tests.

#5 Did you guaranteed somehow you API reliability/uptimer?
- The "supervisor" module to guarantee the reconnection of the server if necessary and if the server crash, some status and error messages will be returned to the user.

___________________________________________________________________________________

# --> POSTMAN Collection Link:
https://www.getpostman.com/collections/b51c378db44907871a78

___________________________________________________________________________________

# --> ENDPOINTS:
## Customers:
- http://localhost:3000/customers/create : Create a Customer [Returns a TOKEN]
. Necessary parameters:
    HEADER  -> Content-Type : application/json
    BODY    -> {
                    "full_name": "FULL CUSTOMER NAME",
                    "email": "CUSTOMER@EXAMPLE.COM",
                    "password":12345
               }

- http://localhost:3000/customers/auth : Auth a Customer - GET a new TOKEN
. Necessary parameters:
    HEADER  -> Content-Type : application/json
    BODY    -> {
                    "email": "CUSTOMER@EXAMPLE.COM",
                    "password":12345
               }

## Transaction:
- http://localhost:3000/transactions/create : Create a Transaction
. Necessary parameters:
    HEADER  -> Content-Type : application/json
               auth : [TOKEN]
    BODY    -> {
                    "amount": 0.00
               }

- http://localhost:3000/transactions/ : Get All Transactions From a Customer 
. Necessary parameters:
    HEADER -> auth : [TOKEN]

## Admin:
- http://localhost:3000/admin/customers : Get All Customers
. Necessary parameters:
    HEADER -> admin : 1 OR true

- http://localhost:3000/admin/transactions/ : Get All Transactions 
. Necessary parameters:
    HEADER -> admin : 1 OR true
              user_id : [:ID]
              payment_service : paypal OR stripe
# POSTMAN Collection Link:
https://www.getpostman.com/collections/b51c378db44907871a78

# ENDPOINTS:

Customers:
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

Transaction:
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

Admin:
- http://localhost:3000/admin/customers : Get All Customers
. Necessary parameters:
    HEADER -> admin : 1 OR true

- http://localhost:3000/admin/transactions/ : Get All Transactions 
. Necessary parameters:
    HEADER -> admin : 1 OR true
              user_id : [:ID]
              payment_service : paypal OR stripe
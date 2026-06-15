Here are the scripts explanation to run the basic tests in this framework

 "scripts": {
    "test:all": "playwright test", 
    "test:booking": "playwright test tests/booking.spec.ts",
    "test:products": "playwright test tests/products.spec.ts",
    "test:pagination": "playwright test tests/products.spec.ts -g \"Get products with pagination\""
 }

 So here 

 test:all -> is to run all the tests present in the src/tests/ folder, this can be set in the playwright config file

 test:booking -> is to run only booking tests

 test:products -> is to run only products tests

 test:pagination -> is to run pagination test (You can pass skip and limit in the cmd as env variables, if not they will fetch based on the default values of skip and limit)
 here skip refers to offset and limit is the number of records per page
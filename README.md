# Future shop

An ecommerce shopping system currently built for CS546 final project and may be in the future extended to a fully functional system that can be used commercially.

## Project structure

```
root
  |-- config        Utils to connect mongodb and get collections
  |-- data          CRUD operations on documents
  |-- public        Client-side resources
    |-- css         Style files
    |-- images      Images
    |-- js          Javascript source files
  |-- routes        Express routings
  |-- site_content  Uploaded files and images
    |-- uploads
      |-- images    Images uploaded to the server
  |-- views         HTML pages and templates
  
```

## To Run the Application

1. Install Mongodb
2. Run following commands from the command line:

    ``` Shell
    git clone https://github.com/zxuqian/future_shop.git

    npm install

    npm start
    ```
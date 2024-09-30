## Financial Products Management App

This project is an Angular-based application that allows users to manage financial products. The application provides the following features:

### Features
#### 1. Get All Products:
You can view the list of all financial products available in the system. The product list includes details like:

Product ID
Name
Description
Logo
Date of Release
Date of Revision

#### 2. Search Products:
A search input is available at the top of the products list, allowing you to filter the list of products based on the product name. The search is case-insensitive and updates the list dynamically as you type.


#### 3. Pagination Control:
At the bottom right of the product list, you can select how many products to display using a dropdown select input. You can choose to display:

5 items
10 items
15 items
Selecting any of these options will trigger a request to fetch the specified number of products from the server.

#### 4. Create a New Product:
You can create a new financial product by navigating to the "Add Product" form via the "Agregar Producto" button at the top of the product list. The form requires the following inputs:

Product ID
Name
Description
Logo URL
Date of Release (The date of revision will automatically be set to one year after the release date).
All fields are required, and validation is applied to ensure correct data is entered. If any field is invalid, a red border and error message will appear below the input.

## Running the Application
To run the project locally, follow these steps:

Clone the repository.
Install the necessary dependencies using npm:

`npm install`

Start the application:

`npm start`

The application will be accessible at http://localhost:4200/.
Running Tests
### This project uses Jest as the testing framework.
To run the tests, execute the following command:


`npm run test`

The tests include unit testing for:

Fetching and displaying products.
Searching products by name.
Pagination (5, 10, 15 products).
Creating a new product using the form.
Ensure all tests pass to validate the functionality of the application.

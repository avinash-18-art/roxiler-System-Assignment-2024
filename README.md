# Product Transaction Dashboard

This project is a **Product Transaction Dashboard** that displays transaction data, statistics, and visualizations for a selected month. It includes a table for transactions, statistics for total sales, and a bar chart showing price ranges.

## Features

- **Transaction Listing**: Displays transactions in a paginated table, with search functionality based on product title, description, or price.
- **Transaction Statistics**: Shows total sale amount, total sold items, and total unsold items for a selected month.
- **Bar Chart Visualization**: Displays a bar chart showing the number of items in different price ranges for the selected month.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Running the Project](#running-the-project)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Screenshots](#screenshots)
- [License](#license)

## Technologies Used

### Frontend
- ReactJS
- Axios for API requests
- Chart.js for data visualization
- CSS for styling

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM for database management

## Installation

### Backend Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/avinash-18-art/roxiler-System-Assignment-2024.git
   cd product-transaction-dashboard/backend
2. Install backend dependencies:
   npm install
3. Configure your PostgreSQL database in .env file: 
    DATABASE_URL=postgres://username:password@localhost:5432/product_transactions
4. Run database migrations: 
   npx sequelize-cli db:migrate
5. Start the backend server: 
   npm start
## Frontend Setup :
 
 1. Navigate to the frontend folder: 
 cd ../frontend
 2. Install frontend dependencies: 
 npm install
 3. Create an .env file and configure the API URL: 
   REACT_APP_API_URL=http://localhost:3000/api
 4. Start the frontend development server:
    npm start
 
 ## API Endpoints :
 Transaction APIs 
 1. GET /api/transactions: Fetch paginated list of transactions with optional search.
Query Parameters:
month: String (e.g., March)
search: String (optional)
page: Number (default 1)
perPage: Number (default 10)

2. GET /api/statistics: Fetch transaction statistics for a selected month.
Query Parameters:
month: String (e.g., March) 
3. GET /api/bar-chart: Fetch data for the bar chart (price ranges) for a selected month.
Query Parameters:
month: String (e.g., March) 
## Running the Project :
1. Backend:

Make sure your PostgreSQL database is running.
Run the backend with npm start (on port 3000).
2. Frontend:

Start the frontend with npm start (on port 3001 by default).
Once both are running, open the frontend at http://localhost:3001. 

## Frontend Features :
Month Selection: A dropdown to select the month (January to December), with March selected by default.
Transaction Table:
Displays a list of transactions with pagination.
Search box to filter transactions based on title, description, or price.
Next and Previous buttons for pagination.
Statistics Section:
Shows total sales amount, total sold items, and unsold items for the selected month.
Bar Chart:
Visualizes the number of products in different price ranges for the selected month.

## Backend Features:
Database Initialization: Fetches transaction data from a third-party API and initializes the PostgreSQL database with the seed data.
API for Transactions: Supports pagination, search, and filtering based on month.
API for Statistics: Provides total sales amount, sold items, and unsold items for a selected month.
API for Bar Chart Data: Provides data for the bar chart showing the number of items in different price ranges.

## Screenshots :
Add screenshots here to visually showcase the project.

Transactions Table


Statistics Section


Bar Chart 

## License :

### Explanation:

- **Installation**: Provides clear steps to set up both the backend and frontend, including database configuration.
- **API Endpoints**: Describes the APIs used in the project.
- **Frontend/Backend Features**: Describes the main features of both parts of the project.
- **Screenshots**: Space is left for screenshots to showcase the project visually.
- **License**: MIT License is used (you can change it if you use another license).

You can customize this as per your project details and add links to your GitHub repository if necessary.

# Inventory Management System for Materials Construction Company

This repository is private and contains the source code for an Inventory Management System specifically designed for a materials construction company that deals in the sales of marble, granite, onyx, and other similar materials. The system encompasses complex business logic to handle various aspects of inventory management efficiently.

## Overview

The Inventory Management System aims to streamline and automate the process of managing inventory for construction materials. It provides functionalities to track stock levels, manage orders, and generate reports, ensuring that the company can operate smoothly and meet customer demands without overstocking or running out of critical materials.

## Features

- **Inventory Tracking:** Maintain real-time data on stock levels for all materials.
- **Order Management:** Handle customer orders, including order placement, processing, and fulfillment.
- **Supplier Management:** Manage information and transactions with suppliers.
- **Reporting:** Generate various reports to provide insights into inventory status, sales trends, and supplier performance.
- **User Roles and Permissions:** Different user roles with specific permissions to ensure security and efficient workflow.

## Technology Stack

- **Backend:** Node.js, Express.js
- **ORM:** Sequelize
- **Database:** MySQL

## ERD Diagram

The Entity-Relationship Diagram (ERD) outlines the database structure and relationships between different entities in the system. You can view the ERD diagram by following this [link](https://lucid.app/lucidchart/5692e1fb-4cb7-46d8-9c71-63c2b4a96b91/edit?view_items=hn~.e6gsYNyZ&invitationId=inv_e32b3123-77f1-446a-a6e0-45475d2509dd).

## Functionality

- **Close Sales Faster:** Quickly view the available square meters (m²) of slabs with different sizes and models, allowing for faster decision-making and sales closure.

## Setup Instructions

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/inventory-management-system.git
    ```

2. **Backend Setup:**
    - Navigate to the backend directory:
        ```sh
        cd inventory-management-system/backend
        ```
    - Install dependencies:
        ```sh
        npm install
        ```
    - Set up environment variables for database connection in a `.env` file:
        ```env
        DB_HOST=your_database_host
        DB_USER=your_database_user
        DB_PASS=your_database_password
        DB_NAME=your_database_name
        ```
    - Run the backend server:
        ```sh
        npm start
        ```

3. **Database Setup:**
    - Ensure MySQL is installed and running.
    - Import the provided database schema and data.
    - Use Sequelize to sync the models with the database:
        ```js
        const { sequelize } = require('./models');
        sequelize.sync();
        ```

## Contribution Guidelines

1. **Fork the repository.**
2. **Create a new branch:**
    ```sh
    git checkout -b feature-branch
    ```
3. **Make your changes.**
4. **Commit your changes:**
    ```sh
    git commit -m "Your detailed description of the changes."
    ```
5. **Push to the branch:**
    ```sh
    git push origin feature-branch
    ```
6. **Create a pull request.**

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or support, please contact [your-email@example.com](mailto:your-email@example.com).

---

Feel free to explore the project and contribute to making it better!

# Inventory Management System for Materials Construction Company

**This repository is private and contains the source code for an Inventory Management System specifically designed for a materials construction company that deals in the sales of marble, granite, onyx, and other similar materials. The system encompasses complex business logic to handle various aspects of inventory management efficiently. This README is available only for the interview process.**

## Overview

The Inventory Management System is designed to keep track of the available square meters (m²) of slabs with complex logic due to their varying shapes and sizes, custom requirements, and processes. It manages the entrance and exit of materials and keeps a detailed record of transactions for auditing purposes. By providing real-time data on available m² of slabs, the system helps in closing deals faster and increasing sales efficiency. The system aims to streamline and automate inventory management for construction materials, ensuring efficient operation and customer satisfaction.

## Features

- **Inventory Tracking:** Maintain real-time data on available square meters (m²) of slabs with different shapes and sizes.
- **Order Management:** Handle customer orders, including placement, processing, and fulfillment of custom requirements.
- **Material Flow Management:** Track the entrance and exit of materials to maintain accurate inventory records.
- **Transaction Auditing:** Keep detailed records of all transactions for auditing and compliance purposes.
- **Reporting:** Generate various reports to provide insights into inventory status, sales trends, and performance.
- **User Roles and Permissions:** Implement different user roles with specific permissions to ensure security and efficient workflow.

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

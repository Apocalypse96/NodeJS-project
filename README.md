# Node.js Data Fetching, Filtering, and Sorting API

## Project Description

This Node.js application fetches data from an external API and provides endpoints to filter and sort the fetched data using query parameters. The project emphasizes clean code, logical structure, robust error handling, and comprehensive documentation.

## Features

- Fetches data from an external API
- Filters data based on query parameters
- Sorts data based on query parameters
- Implements comprehensive error handling
- Includes clear project structure and documentation

## Technical Implementation

### Core Logic

The application uses efficient data structures and algorithms for filtering and sorting operations. The filtering mechanism employs a hash-based approach for O(1) lookup time, while sorting utilizes a stable sorting algorithm to maintain the relative order of equal elements.

### External API Handling

We interact with the Microsoft Edge Demos JSON API (https://microsoftedge.github.io/Demos/). To handle potential issues like rate limiting or downtime, we've implemented retry logic with exponential backoff and maintain a local cache of the most recent successful fetch (Optional).


### Performance Optimization 

- **Data Pagination**: Implemented to improve load times and user experience.
- **Caching**: Frequently accessed data is cached to reduce API calls and database queries.
- **Asynchronous Operations**: Utilized to handle multiple requests concurrently and prevent blocking operations.

## Getting Started

### Prerequisites

- Node.js (version 18.13.0 or later)
- npm (version 8 or later)

### Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/nodejs-project.git
```
## Navigate to the project directory
 ```cd nodejs-project```
 
## Install dependancies
```npm install```

### Running the project
- **Initalize the data**
```npm run init```

## Start the server
``` npm start ```

### The server will be running at http://localhost:3000.


# API Endpoints

## Fetch, Filter, and Sort Data

- **URL**: `http://localhost:3000/api/data`
- **Method**: GET
- **Query Parameters**:
  - `filter`: Filter data by a specific key and value in the format `key:value`.
  - `sort`: Sort data by a specific key and order in the format `key:order` (order can be `asc` or `desc`).

### Examples

- Fetch all data: `http://localhost:3000/api/data`
- Fetch and filter data: `http://localhost:3000/api/data?filter=language:Sindhi`
- Fetch and sort data: `http://localhost:3000/api/data?sort=version:asc`
- Fetch, filter, and sort data: `http://localhost:3000/api/data?filter=language:Sindhi&sort=version:asc`

## Error Handling

The API returns appropriate error messages and status codes for various error scenarios, including:

- Fetch failures
- Invalid filter or sort formats
- Non-array data fetched from the API

### Error Testing Examples

- Invalid filter format: `http://localhost:3000/api/data?filter=invalidformat`
- Non-existent filter key: `http://localhost:3000/api/data?filter=nonexistentkey:value`
- Invalid sort format: `http://localhost:3000/api/data?sort=price:invalid`

## Project Structure

```plaintext
nodejs-project/  
├── src/  
│   ├── config/  
│   │   └── config.js  
│   ├── services/  
│   │   └── dataService.js  
│   ├── routes/  
│   │   └── dataRoutes.js  
│   ├── utils/  
│   │   └── logger.js  
│   └── app.js  
├── data/ (Optional for dummy data)  
│   └── dummyData.json  
├── scripts/  
│   └── initData.js  
├── .gitignore  
├── package.json  
└── README.md
```

## Deployment and Scalability

The application is designed to be easily deployable to cloud platforms like Heroku or AWS using containerization with Docker. For scalability, consider implementing:

- **Horizontal Scaling**: Add more instances of the application to handle increased load.
- **Load Balancing**: Distribute incoming traffic across multiple instances.
- **Caching**: Utilize in-memory or distributed caches to reduce database load and improve response times.
- **Database Optimization**: Optimize database queries and indexes for performance.

## Visuals
- Fetch all data: `http://localhost:3000/api/data`
 ![Screenshot from 2024-07-30 04-57-06](https://github.com/user-attachments/assets/3e7b427c-0fa0-4493-b6ac-e046d78f0ea4)

- Fetch and filter data: `http://localhost:3000/api/data?filter=language:Sindhi`
 ![Screenshot from 2024-07-30 04-57-42](https://github.com/user-attachments/assets/86c7fa73-7a0b-4803-93dd-5183229034dc)

- Fetch and sort data: `http://localhost:3000/api/data?sort=version:asc`
 ![Screenshot from 2024-07-30 04-58-14](https://github.com/user-attachments/assets/9c07aaf2-9c65-4b1f-9ac0-7d6a8826905e)

- Fetch, filter, and sort data: `http://localhost:3000/api/data?filter=language:Sindhi&sort=version:asc`
 ![Screenshot from 2024-07-30 04-58-57](https://github.com/user-attachments/assets/b7b838ff-453c-424d-9feb-1802710621ff)


- Invalid filter format: `http://localhost:3000/api/data?filter=invalidformat`
 ![Screenshot from 2024-07-30 05-07-33](https://github.com/user-attachments/assets/9eae026c-9117-48ed-af43-f2ed000d5775)


- Non-existent filter key: `http://localhost:3000/api/data?filter=nonexistentkey:value`
 ![Screenshot from 2024-07-30 05-11-00](https://github.com/user-attachments/assets/daa56adc-4f62-4c68-b5d3-b9d1fb12535f)

- Invalid sort format: `http://localhost:3000/api/data?sort=price:invalid`
 ![Screenshot from 2024-07-30 05-12-17](https://github.com/user-attachments/assets/24ce8a38-f775-48e7-8ae0-7655328a1406)


## Conclusion

This project showcases a robust and well-documented Node.js application for fetching, filtering, and sorting data, along with effective error handling. It demonstrates best practices in code organization, testing, and performance optimization.

## Contributing Guidelines

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Commit your changes
4. Push to your branch
5. Submit a pull request

_

# Show Me The Money - Backend

## Overview
This is a backend service built using Koa.js and TypeScript to fetch and serve Balance Sheet Reports from the Xero API. The service acts as a gateway to interact with Xero's financial reporting.

## Features
- Fetches balance sheet data from Xero API.
- Implements error handling for API failures.
- Provides a REST API at `/api/balance-sheet`.
- Supports CORS for frontend integration.
- Includes unit tests for business logic and API interactions.
- Docker-ready for easy deployment.

## Tech Stack
- **Koa.js** - Lightweight Node.js framework.
- **TypeScript** - Ensures type safety and maintainability.
- **Axios** - For HTTP requests.
- **Jest & Supertest** - For unit testing.
- **Docker** - For containerized deployment.

## API Endpoints
### `GET /api/balance-sheet`
Fetches the balance sheet report from the Xero API and returns the financial data.

#### Example Response
```json
{
  "assets": 1000,
  "liabilities": 500
}
```

## Setup & Installation
### Prerequisites
- Node.js (v16+ recommended)
- pnpm 
- Docker (optional for containerization)

### Installation Steps
```sh

# Install dependencies
pnpm install  # or npm install

# Start the server
pnpm run dev  # or npm run dev
```

### Running Tests
```sh
pnpm test  # or npm test
```

## Docker Setup
To run the backend in a Docker container:
```sh
docker build -t balance-sheet-backend .
docker run -p 4000:4000 balance-sheet-backend
```

## Folder Structure
```
backend-balance-sheet/
│── src/
│   ├── clients/         # API clients (e.g., Xero API)
│   ├── handlers/        # HTTP request handlers
│   ├── usecases/        # Business logic
│   ├── config.ts        # Configuration settings
│   ├── gateway.ts       # API Gateway
│   ├── server.ts        # Entry point
│── tests/               # Unit tests
│── package.json         # Dependencies & scripts
│── Dockerfile           # Containerization
│── README.md            # Project Documentation
```

## Contributing
Feel free to submit issues or open pull requests to improve this service.

## License
MIT License
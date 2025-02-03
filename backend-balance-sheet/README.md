# Show Me The Money - Backend

## Overview

This is a backend service built using Koa.js and TypeScript to fetch and serve Balance Sheet Reports from the Xero API. The service acts as a gateway to interact with Xero's financial reporting and ensures proper validation and error handling.

## Features

- Fetches balance sheet data from Xero API.
- Implements detailed error handling for API failures, validation issues, and unexpected errors.
- Provides a REST API at `/api/balance-sheet`.
- Supports CORS for frontend integration.
- Uses **Zod** for response validation.
- Docker-ready for easy deployment.

## Tech Stack

- **Koa.js** - Lightweight Node.js framework.
- **TypeScript** - Ensures type safety and maintainability.
- **Axios** - For HTTP requests.
- **Zod** - For validating API responses.
- **Jest & Supertest** - For unit testing.
- **Docker** - For containerized deployment.

## API Endpoints

### `GET /api/balance-sheet`

Fetches the balance sheet report from the Xero API and returns the financial data.

#### Example Response

```json
{
  "success": true,
  "data": {
    "reportId": "BalanceSheet",
    "reportName": "Balance Sheet",
    "reportType": "BalanceSheet",
    "reportTitles": [
      "Balance Sheet",
      "Demo Company (AU)",
      "As at 28 February 2018"
    ],
    "reportDate": "23 February 2018",
    "updatedDateUtc": "/Date(1519358515899)/",
    "rows": []
  }
}
```

#### Error Response Example

```json
{
  "success": false,
  "error": "Failed to fetch balance sheet data from Xero API"
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
│   ├── apiClients/      # API clients (e.g., Xero API)
│   ├── routes/          # HTTP request route handlers
│   ├── usecases/        # Business logic
│   ├── errors/          # Custom error classes
│   ├── config.ts        # Configuration settings
│   ├── app.ts           # Entry point
│── package.json         # Dependencies & scripts
│── Dockerfile           # Containerization
│── README.md            # Project Documentation
```

## Contributing

Feel free to submit issues or open pull requests to improve this service.

## License

MIT License

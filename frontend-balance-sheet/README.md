# Show Me The Money - Front End

## Overview

This is a **React + TypeScript** frontend application that displays **Balance Sheet Reports** fetched from the Backend Service Running on `http://localhost:4000`
It integrates with the backend service and renders the balance sheet in a table.

## Tech Stack

- **React 19** - UI Framework.
- **TypeScript** - Ensures type safety and maintainability.
- **Axios** - For HTTP requests.
- **React Testing Library + Jest** – Unit tests
- **Docker** - For containerized deployment.

## Setup & Installation

### Prerequisites

- Node.js (`v16+` recommended)
- pnpm (v9.15.4)
- Backend Service Running on `http://localhost:4000`

### Installation Steps

```sh
# Install dependencies
pnpm install

# Start the server
pnpm start
```

### Running Tests

```sh
pnpm test
```

## Docker Setup

To run the front end in a Docker container:

```sh
docker build -t frontend-balance-sheet .
docker run -p 3001:3001 frontend-balance-sheet
```

## Folder Structure

```
frontend-balance-sheet/
│── src/
│   ├── apis/                   # API calls (Axios)
│   ├── components/             # Reusable UI components
│   ├── controllers/            # Business logic hooks
│   ├── pages/                  # Page components
│   ├── types/                  # TypeScript interfaces
│   ├── App.tsx                 # Root component
```

## License

MIT License

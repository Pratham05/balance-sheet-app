# Show Me The Money - Balance Sheet App

## Overview

This is a full-stack application that displays Balance Sheet Reports using data from the Xero API.  
It consists of:

- **Backend**: A Koa.js server that fetches and returns balance sheet data.
- **Frontend**: A React + TypeScript application that displays the balance sheet data in a table.

## How to Run everything

1. Ensure Docker is running.
2. Run:

```sh
docker-compose up --build
```

3. Access the app:

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:4000/api/balance-sheet

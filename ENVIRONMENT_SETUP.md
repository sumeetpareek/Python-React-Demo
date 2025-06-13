# Environment Configuration Setup

This guide explains how to set up environment variables for both the backend (Python/FastAPI) and frontend (Next.js/React) applications.

## Backend Configuration (Python/FastAPI)

### 1. Create Environment File

Copy the example environment file and create your local configuration:

```bash
cd backend-python-fastapi
cp env.example .env
```

### 2. Environment Variables

The following environment variables are available for the backend:

#### Server Configuration

- `HOST`: Server host (default: `0.0.0.0`)
- `PORT`: Server port (default: `8000`)

#### CORS Configuration

- `CORS_ORIGINS`: Comma-separated list of allowed origins (default: `http://localhost:3000,http://127.0.0.1:3000`)

#### Logging Configuration

- `LOG_LEVEL`: Logging level (default: `INFO`)

#### API Configuration

- `API_TITLE`: API title (default: `MAG7 Stock Returns API`)
- `API_DESCRIPTION`: API description
- `API_VERSION`: API version (default: `1.0.0`)
- `INFO_MESSAGE`: Custom info message for `/api/info` endpoint

#### Stock Symbols Configuration

- `MAG7_SYMBOLS`: Comma-separated list of stock symbols (default: `MSFT,AAPL,GOOGL,AMZN,NVDA,META,TSLA`)

#### Data Validation Configuration

- `MAX_DATE_RANGE_DAYS`: Maximum allowed date range in days (default: `3650`)

### 3. Example `.env` file

```env
# FastAPI Server Configuration
HOST=0.0.0.0
PORT=8000

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Logging Configuration
LOG_LEVEL=INFO

# API Configuration
API_TITLE=MAG7 Stock Returns API
API_DESCRIPTION=API for fetching daily returns of MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA)
API_VERSION=1.0.0
INFO_MESSAGE=Hello from Monorepo FastAPI backend! v2

# Stock Symbols Configuration
MAG7_SYMBOLS=MSFT,AAPL,GOOGL,AMZN,NVDA,META,TSLA

# Data Validation Configuration
MAX_DATE_RANGE_DAYS=3650
```

## Frontend Configuration (Next.js/React)

### 1. Create Environment File

Copy the example environment file and create your local configuration:

```bash
cd frontend-react-nextjs
cp env.example .env.local
```

### 2. Environment Variables

The following environment variables are available for the frontend:

#### API Configuration

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for the backend API (default: `http://127.0.0.1:8000/api`)

#### App Configuration

- `NEXT_PUBLIC_APP_TITLE`: Application title (default: `MAG7 Stocks Dashboard`)
- `NEXT_PUBLIC_APP_DESCRIPTION`: Application description
- `NEXT_PUBLIC_APP_KEYWORDS`: Comma-separated keywords for SEO

#### Development Configuration

- `NEXT_PUBLIC_DEV_MODE`: Enable development mode (default: `true`)
- `NEXT_PUBLIC_ENABLE_DEBUG_LOGGING`: Enable debug logging (default: `false`)

### 3. Example `.env.local` file

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api

# App Configuration
NEXT_PUBLIC_APP_TITLE=MAG7 Stocks Dashboard
NEXT_PUBLIC_APP_DESCRIPTION=Interactive dashboard for visualizing daily returns of MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA)
NEXT_PUBLIC_APP_KEYWORDS=stocks,dashboard,MAG7,finance,charts,returns

# Development Configuration
NEXT_PUBLIC_DEV_MODE=true
NEXT_PUBLIC_ENABLE_DEBUG_LOGGING=false
```

## Important Notes

### Backend

- The backend uses `python-dotenv` to load environment variables from `.env.local`
- All environment variables have sensible defaults
- The configuration is loaded in `config.py` and used throughout the application
- Environment variables are type-converted appropriately (e.g., strings to integers)

### Frontend

- Next.js automatically loads `.env.local` files
- Only variables prefixed with `NEXT_PUBLIC_` are available in the browser
- Environment variables are loaded at build time for static generation
- The API base URL is used in `lib/api.ts` for making requests to the backend

### Security

- Never commit `.env.local` files to version control
- The `.gitignore` files are already configured to exclude these files
- Use different environment variables for different environments (development, staging, production)

## Troubleshooting

1. **Backend can't find environment variables**: Make sure you have `python-dotenv` installed and the `.env` file is in the correct directory.

2. **Frontend can't connect to backend**: Check that `NEXT_PUBLIC_API_BASE_URL` is correctly set and the backend is running.

3. **CORS errors**: Ensure `CORS_ORIGINS` includes the frontend URL.

4. **Environment variables not loading**: Restart the development servers after creating or modifying environment files.

# MAG7 Stock Returns API

A FastAPI backend for fetching daily returns of MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA) using data from `yfinance`.

## Features

- **Modular Architecture**: Separated concerns with dedicated modules for data fetching, processing, and API endpoints
- **Type Annotations**: Full Python type hints for better code quality and IDE support
- **Error Handling**: Comprehensive error handling with meaningful error messages
- **Data Validation**: Input validation for dates and data integrity checks
- **Logging**: Structured logging for debugging and monitoring
- **CORS Support**: Configured for React frontend integration

## Project Structure

```
├── main.py              # FastAPI application entry point
├── data_fetcher.py      # Stock data fetching using yfinance
├── data_processor.py    # Data processing and returns calculation
├── api_endpoints.py     # API endpoint definitions
├── test_api.py          # Test script for API endpoints
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Installation

1. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

2. **Run the server**:

   ```bash
   python main.py
   ```

   Or using uvicorn directly:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

3. **Access the API**:
   - API Documentation: http://localhost:8000/docs
   - Alternative Docs: http://localhost:8000/redoc
   - Health Check: http://localhost:8000/api/health

## API Endpoints

### GET /api/returns

Fetch daily returns for MAG7 stocks within a specified date range.

**Parameters**:

- `start` (string, required): Start date in YYYY-MM-DD format
- `end` (string, required): End date in YYYY-MM-DD format

**Example Request**:

```bash
curl "http://localhost:8000/api/returns?start=2024-01-01&end=2024-01-31"
```

**Example Response**:

```json
{
  "data": {
    "MSFT": [
      {
        "date": "2024-01-02",
        "return": 0.012345
      },
      {
        "date": "2024-01-03",
        "return": -0.005678
      }
    ],
    "AAPL": [
      {
        "date": "2024-01-02",
        "return": 0.008901
      }
    ]
  }
}
```

### GET /api/health

Health check endpoint to verify API status.

**Response**:

```json
{
  "status": "healthy",
  "message": "Stock returns API is running"
}
```

## Error Handling

The API provides comprehensive error handling:

- **400 Bad Request**: Invalid date format, invalid date range, future dates
- **500 Internal Server Error**: Data fetching failures, processing errors

**Example Error Response**:

```json
{
  "detail": "Start date must be before end date"
}
```

## Testing

Run the test suite to verify the API functionality:

```bash
python test_api.py
```

The test suite includes:

- Health check endpoint testing
- Returns endpoint with valid data
- Error handling for invalid dates
- Error handling for future dates

## Data Processing

1. **Data Fetching**: Uses `yfinance` to fetch daily close prices for all MAG7 stocks
2. **Returns Calculation**: Computes daily percentage returns using pandas `pct_change()`
3. **Data Validation**: Ensures data integrity and handles missing values
4. **Response Formatting**: Converts to the required JSON structure

## Dependencies

- **FastAPI**: Modern web framework for building APIs
- **yfinance**: Yahoo Finance data fetching
- **pandas**: Data manipulation and analysis
- **pydantic**: Data validation and serialization
- **uvicorn**: ASGI server for running FastAPI
- **requests**: HTTP library for testing

## Development

### Code Style

- Type annotations throughout
- Comprehensive docstrings
- Modular design with separation of concerns
- Error handling at each layer

### Logging

The application uses structured logging with different levels:

- INFO: General application flow
- WARNING: Non-critical issues (missing data)
- ERROR: Critical errors that affect functionality

### CORS Configuration

Configured for React frontend development:

- Allowed origins: `http://localhost:3000`
- All methods and headers allowed

## Future Enhancements

- Caching layer for frequently requested data
- Rate limiting for API endpoints
- Authentication and authorization
- Additional technical indicators
- Historical data archival
- Real-time data streaming

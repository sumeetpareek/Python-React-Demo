# Python FastAPI Backend

A simple FastAPI backend server for the Python-React-Demo project.

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the backend directory:**

   ```bash
   cd backend-python-fastapi
   ```

2. **Create and activate virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Server

```bash
uvicorn main:app --reload
```

The server will start on `http://localhost:8000`

## Available Endpoints

### Initial Check

- **GET** `/`
- **Response:** `{"message": "Hi, this is just a quick test-1 message!"}`

## API Documentation

Once the server is running, you can access:

- **Interactive API docs:** `http://localhost:8000/docs`
- **Alternative API docs:** `http://localhost:8000/redoc`

## Next Steps

- Add more API endpoints as needed
- Set up environment variables for configuration
- Add tests

## Troubleshooting

- **Port already in use:** Change the port in `main.py` or kill the process using port 8000
- **Import errors:** Ensure virtual environment is activated and dependencies are installed
- **CORS issues:** Check that the frontend URL is properly configured in CORS middleware

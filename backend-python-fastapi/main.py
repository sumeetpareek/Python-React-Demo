from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Import our custom API endpoints
from api_endpoints import router as stock_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="MAG7 Stock Returns API",
    description="API for fetching daily returns of MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA)",
    version="1.0.0"
)

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the stock returns API router
app.include_router(stock_router)

# This is the configurable message that will be returned by the API
INFO_MESSAGE = "Hello from Monorepo FastAPI backend! v2"

@app.get("/")
async def read_root():
    return {
        "message": "Welcome to the MAG7 Stock Returns API!",
        "version": "1.0.0",
        "endpoints": {
            "stock_returns": "/api/returns?start=YYYY-MM-DD&end=YYYY-MM-DD",
            "health_check": "/api/health",
            "info": "/api/info"
        }
    }

@app.get("/api/info")
async def get_info():
    return {"message": INFO_MESSAGE}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting MAG7 Stock Returns API server...")
    uvicorn.run(app, host="0.0.0.0", port=8000) 
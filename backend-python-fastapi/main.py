from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Import our custom API endpoints and configuration
from api_endpoints import router as stock_router
from config import config

# Configure logging
logging.basicConfig(level=getattr(logging, config.LOG_LEVEL))
logger = logging.getLogger(__name__)

app = FastAPI(
    title=config.API_TITLE,
    description=config.API_DESCRIPTION,
    version=config.API_VERSION
)

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the stock returns API router
app.include_router(stock_router)

@app.get("/")
async def read_root():
    return {
        "message": f"Welcome to the {config.API_TITLE}",
        "version": config.API_VERSION,
        "endpoints": {
            "stock_returns": "/api/returns?start=YYYY-MM-DD&end=YYYY-MM-DD",
            "health_check": "/api/health",
            "info": "/api/info"
        }
    }

@app.get("/api/info")
async def get_info():
    return {"message": config.INFO_MESSAGE}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting MAG7 Stock Returns API server...")
    uvicorn.run(app, host=config.HOST, port=config.PORT) 
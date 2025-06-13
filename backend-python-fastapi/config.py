import os
from typing import List
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Configuration class for the FastAPI application"""
    
    # Server Configuration
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
    
    # Logging Configuration
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    # API Configuration
    API_TITLE: str = os.getenv("API_TITLE", "MAG7 Stock Returns API 33333")
    API_DESCRIPTION: str = os.getenv(
        "API_DESCRIPTION", 
        "API for fetching daily returns of MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA)"
    )
    API_VERSION: str = os.getenv("API_VERSION", "1.0.0")
    INFO_MESSAGE: str = os.getenv("INFO_MESSAGE", "Hello from Monorepo FastAPI backend! v2")
    
    # Stock Symbols Configuration
    MAG7_SYMBOLS: List[str] = os.getenv("MAG7_SYMBOLS", "MSFT,AAPL,GOOGL,AMZN,NVDA,META,TSLA").split(",")
    
    # Data Validation Configuration
    MAX_DATE_RANGE_DAYS: int = int(os.getenv("MAX_DATE_RANGE_DAYS", "3650"))

# Create a global config instance
config = Config() 
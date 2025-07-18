from typing import Dict, List, Any, Optional
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from datetime import date, datetime
import logging

from data_fetcher import StockDataFetcher
from data_processor import StockDataProcessor
from config import config

logger = logging.getLogger(__name__)

# Create router for API endpoints
router = APIRouter(prefix="/api", tags=["stock-data"])

# Pydantic models for request/response validation
class DailyReturn(BaseModel):
    date: str = Field(..., description="Date in YYYY-MM-DD format")
    return_value: float = Field(..., description="Daily return as decimal")
    
    class Config:
        # Use the alias for JSON serialization
        populate_by_name = True
        json_schema_extra = { 
            "example": {
                "date": "2024-12-03",
                "return": 0.00051
            }
        }

class ReturnsResponse(BaseModel):
    data: Dict[str, List[Dict[str, Any]]] = Field(..., description="Returns data for each symbol")

class SymbolsResponse(BaseModel):
    symbols: List[str] = Field(..., description="List of available stock symbols")
    description: str = Field(..., description="Description of the symbol set")

class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Additional error details")

# Initialize services
data_fetcher = StockDataFetcher()
data_processor = StockDataProcessor()

@router.get(
    "/symbols",
    response_model=SymbolsResponse,
    summary="Get available stock symbols",
    description="Get the list of available stock symbols that can be used in the returns endpoint"
)
async def get_symbols() -> SymbolsResponse:
    """
    Get the list of available stock symbols.
    
    Returns:
        SymbolsResponse: List of available stock symbols and description
    """
    return SymbolsResponse(
        symbols=config.MAG7_SYMBOLS,
        description="MAG7 stocks (Microsoft, Apple, Google, Amazon, NVIDIA, Meta, Tesla)"
    )

@router.get(
    "/returns",
    response_model=ReturnsResponse,
    responses={
        400: {"model": ErrorResponse, "description": "Bad request - invalid parameters"},
        500: {"model": ErrorResponse, "description": "Internal server error"}
    },
    summary="Get daily returns for specified stocks",
    description="Fetch daily percentage returns for specified stocks within a specified date range. If no symbols are provided, returns data for all MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA)."
)
async def get_returns(
    start: str = Query(..., description="Start date in YYYY-MM-DD format"),
    end: str = Query(..., description="End date in YYYY-MM-DD format"),
    symbols: Optional[str] = Query(None, description="Comma-separated list of stock symbols (e.g., 'AAPL,MSFT,GOOGL'). If not provided, fetches all MAG7 stocks.")
) -> ReturnsResponse:
    """
    Get daily returns for specified stocks within a specified date range.
    
    Args:
        start: Start date in YYYY-MM-DD format
        end: End date in YYYY-MM-DD format
        symbols: Optional comma-separated list of stock symbols
        
    Returns:
        ReturnsResponse: Daily returns data for each specified stock
        
    Raises:
        HTTPException: If there's an error with the request or data processing
    """
    try:
        # Parse and validate dates
        try:
            start_date = datetime.strptime(start, '%Y-%m-%d').date()
            end_date = datetime.strptime(end, '%Y-%m-%d').date()
        except ValueError as e:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid date format. Use YYYY-MM-DD format. Error: {str(e)}"
            )
        
        # Parse symbols if provided
        symbols_list = None
        if symbols:
            try:
                # Split by comma and clean up whitespace
                symbols_list = [s.strip().upper() for s in symbols.split(',') if s.strip()]
                
                # Validate symbols
                # TODO: Check how is this being done
                data_fetcher.validate_symbols(symbols_list)
            except ValueError as e:
                raise HTTPException(status_code=400, detail=str(e))
        
        # Validate date range
        try:
            data_fetcher.validate_date_range(start_date, end_date)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        
        # Fetch price data
        try:
            price_data = data_fetcher.fetch_daily_prices(start_date, end_date, symbols_list)
        except ValueError as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch stock data: {str(e)}")
        
        # Validate price data
        try:
            data_processor.validate_price_data(price_data)
        except ValueError as e:
            raise HTTPException(status_code=500, detail=f"Invalid price data: {str(e)}")
        
        # Calculate returns
        try:
            returns_data = data_processor.calculate_daily_returns(price_data)
        except ValueError as e:
            raise HTTPException(status_code=500, detail=f"Failed to calculate returns: {str(e)}")
        
        # Convert to response format - use the raw dictionary format
        response_data = {}
        for symbol, returns in returns_data.items():
            response_data[symbol] = returns
        
        logger.info(f"Successfully processed returns for {len(response_data)} symbols")
        return ReturnsResponse(data=response_data)
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error in get_returns: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@router.get(
    "/health",
    summary="Health check endpoint",
    description="Simple health check to verify the API is running"
)
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Stock returns API is running"} 
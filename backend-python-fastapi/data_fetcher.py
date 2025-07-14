from typing import Dict, List, Optional
import yfinance as yf
import pandas as pd
from datetime import datetime, date
import logging

# Import configuration
from config import config

# Configure logging
logging.basicConfig(level=getattr(logging, config.LOG_LEVEL))
logger = logging.getLogger(__name__)

class StockDataFetcher:
    """Handles fetching stock data from yfinance"""
    
    def __init__(self):
        self.symbols = config.MAG7_SYMBOLS
    
    def fetch_daily_prices(
        self, 
        start_date: date, 
        end_date: date,
        symbols: Optional[List[str]] = None
    ) -> Dict[str, pd.Series]:
        """
        Fetch daily close prices for specified stocks
        
        Args:
            start_date: Start date for data fetching
            end_date: End date for data fetching
            symbols: Optional list of stock symbols to fetch. If None, uses all symbols from config
            
        Returns:
            Dictionary mapping symbol to DataFrame with daily close prices
        """
        try:
            # Use provided symbols or fall back to config symbols
            symbols_to_fetch = symbols if symbols is not None else self.symbols
            
            # Validate symbols
            if not symbols_to_fetch:
                raise ValueError("No symbols provided for data fetching")
            
            logger.info(f"Fetching data for {len(symbols_to_fetch)} symbols from {start_date} to {end_date}")
            
            # Convert dates to string format for yfinance
            start_str = start_date.strftime('%Y-%m-%d')
            end_str = end_date.strftime('%Y-%m-%d')
            
            result = {}
            
            # Fetch data for each symbol individually to ensure we get data
            for symbol in symbols_to_fetch:
                try:
                    logger.info(f"Fetching data for {symbol}")
                    ticker = yf.Ticker(symbol)
                    data = ticker.history(start=start_str, end=end_str)
                    
                    if data.empty:
                        logger.warning(f"No data available for {symbol}")
                        continue
                    
                    # Extract close prices
                    close_data = data['Close']
                    
                    # Remove any NaN values
                    close_data = close_data.dropna()
                    
                    if len(close_data) > 0:
                        result[symbol] = close_data
                        logger.info(f"Successfully fetched {len(close_data)} data points for {symbol}")
                    else:
                        logger.warning(f"No valid close prices for {symbol}")
                        
                except Exception as e:
                    logger.error(f"Error fetching data for {symbol}: {str(e)}")
                    continue
            
            if not result:
                raise ValueError("No data could be fetched for any symbols")
            
            logger.info(f"Successfully fetched data for {len(result)} symbols")
            return result
            
        except Exception as e:
            logger.error(f"Error fetching stock data: {str(e)}")
            raise ValueError(f"Failed to fetch stock data: {str(e)}")
    
    def validate_date_range(self, start_date: date, end_date: date) -> None:
        """
        Validate the date range for data fetching
        
        Args:
            start_date: Start date
            end_date: End date
            
        Raises:
            ValueError: If date range is invalid
        """
        if start_date >= end_date:
            raise ValueError("Start date must be before end date")
        
        if start_date > date.today():
            raise ValueError("Start date cannot be in the future")
        
        # Check if date range is reasonable (not more than configured max days)
        if (end_date - start_date).days > config.MAX_DATE_RANGE_DAYS:
            raise ValueError(f"Date range cannot exceed {config.MAX_DATE_RANGE_DAYS} days")
    
    # TODO: Improve this validation
    def validate_symbols(self, symbols: List[str]) -> None:
        """
        Validate the provided symbols
        
        Args:
            symbols: List of stock symbols to validate
            
        Raises:
            ValueError: If symbols are invalid
        """
        if not symbols:
            raise ValueError("At least one symbol must be provided")
        
        # Check for empty or invalid symbols
        for symbol in symbols:
            if not symbol or not symbol.strip():
                raise ValueError("Symbol cannot be empty")
            
            # Basic validation - symbols should be alphanumeric
            if not symbol.strip().isalnum():
                raise ValueError(f"Invalid symbol format: {symbol}")
        
        # Check if we have too many symbols (to prevent abuse)
        if len(symbols) > 50:  # Reasonable limit
            raise ValueError("Too many symbols requested. Maximum 50 symbols allowed.") 
from typing import Dict, List, Any
import pandas as pd
from datetime import date
import logging

logger = logging.getLogger(__name__)

class StockDataProcessor:
    """Handles processing stock data and calculating returns"""
    
    def calculate_daily_returns(
        self, 
        price_data: Dict[str, pd.Series]
    ) -> Dict[str, List[Dict[str, Any]]]:
        """
        Calculate daily percentage returns for each stock
        
        Args:
            price_data: Dictionary mapping symbol to Series of daily close prices
            
        Returns:
            Dictionary mapping symbol to list of daily return data
        """
        try:
            logger.info("Calculating daily returns for all symbols")
            
            result = {}
            
            for symbol, prices in price_data.items():
                if len(prices) < 2:
                    logger.warning(f"Insufficient data for {symbol}, skipping")
                    continue
                
                # Calculate daily returns (percentage change)
                returns = prices.pct_change().dropna()
                
                # Convert to list of dictionaries with date and return
                return_data = []
                for date_idx, return_val in returns.items():
                    return_data.append({
                        "date": date_idx.strftime('%Y-%m-%d'),
                        "return": round(float(return_val), 6)  # Round to 6 decimal places
                    })
                
                result[symbol] = return_data
                logger.info(f"Calculated {len(return_data)} daily returns for {symbol}")
            
            return result
            
        except Exception as e:
            logger.error(f"Error calculating returns: {str(e)}")
            raise ValueError(f"Failed to calculate returns: {str(e)}")
    
    def validate_price_data(self, price_data: Dict[str, pd.Series]) -> None:
        """
        Validate the price data before processing
        
        Args:
            price_data: Dictionary mapping symbol to Series of daily close prices
            
        Raises:
            ValueError: If price data is invalid
        """
        if not price_data:
            raise ValueError("No price data provided")
        
        for symbol, prices in price_data.items():
            if prices.empty:
                raise ValueError(f"No price data available for {symbol}")
            
            if prices.isnull().any():
                logger.warning(f"Missing values detected in {symbol} data")
            
            if (prices <= 0).any():
                raise ValueError(f"Invalid price values (non-positive) found in {symbol} data") 
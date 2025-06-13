#!/usr/bin/env python3
"""
Test script for the MAG7 Stock Returns API
"""

import requests
import json
from datetime import date, timedelta

# API base URL
BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    print("Testing health check endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_returns_endpoint():
    """Test the returns endpoint with a recent date range"""
    print("\nTesting returns endpoint...")
    
    # Use a recent date range (last 30 days)
    end_date = date.today()
    start_date = end_date - timedelta(days=30)
    
    params = {
        "start": start_date.strftime('%Y-%m-%d'),
        "end": end_date.strftime('%Y-%m-%d')
    }
    
    try:
        response = requests.get(f"{BASE_URL}/api/returns", params=params)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Success! Retrieved data for {len(data['data'])} symbols")
            
            # Print sample data for first symbol
            for symbol, returns in data['data'].items():
                print(f"\n{symbol}: {len(returns)} daily returns")
                if returns:
                    print(f"Sample: {returns[0]}")
                break
        else:
            print(f"Error response: {response.json()}")
        
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_invalid_dates():
    """Test error handling with invalid dates"""
    print("\nTesting error handling with invalid dates...")
    
    # Test with invalid date format
    params = {
        "start": "invalid-date",
        "end": "2024-01-01"
    }
    
    try:
        response = requests.get(f"{BASE_URL}/api/returns", params=params)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 400
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_future_dates():
    """Test error handling with future dates"""
    print("\nTesting error handling with future dates...")
    
    # Test with future dates
    future_date = date.today() + timedelta(days=30)
    past_date = date.today() - timedelta(days=10)
    
    params = {
        "start": future_date.strftime('%Y-%m-%d'),
        "end": (future_date + timedelta(days=5)).strftime('%Y-%m-%d')
    }
    
    try:
        response = requests.get(f"{BASE_URL}/api/returns", params=params)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 400
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    print("MAG7 Stock Returns API Test Suite")
    print("=" * 40)
    
    # Run tests
    tests = [
        ("Health Check", test_health_check),
        ("Returns Endpoint", test_returns_endpoint),
        ("Invalid Dates", test_invalid_dates),
        ("Future Dates", test_future_dates)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        result = test_func()
        results.append((test_name, result))
    
    # Summary
    print(f"\n{'='*50}")
    print("TEST SUMMARY")
    print("=" * 50)
    
    passed = 0
    for test_name, result in results:
        status = "PASS" if result else "FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nPassed: {passed}/{len(results)} tests")
    
    if passed == len(results):
        print("🎉 All tests passed!")
    else:
        print("❌ Some tests failed. Check the output above.") 
from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Update this message form `test-1` to `test-2` to `test-3` and so on,
# to test local API setup, live API changes, and server auto deployments
CUSTOM_TEST_MESSAGE = "Hi, this is just a quick test-1 message!"

@app.get("/")
async def read_root():
    return {"message": CUSTOM_TEST_MESSAGE}

# Starts the FastAPI server using uvicorn ASGI server
# Host 0.0.0.0 allows external access to the server
if __name__ == "__main__":
    import uvicorn
    logger.info("Starting Backend Python FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
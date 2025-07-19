import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGO_DB", "offerletterdb")
COLLECTION_NAME = "offerletters"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

def get_offer_collection():
    return db[COLLECTION_NAME] 
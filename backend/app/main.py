from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import OfferLetter
from app.database import get_offer_collection
from app.docx_utils import generate_docx
from app.pdf_utils import generate_pdf
from bson import ObjectId
from fastapi.encoders import jsonable_encoder

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/offer-letter")
def create_offer_letter(data: OfferLetter):
    collection = get_offer_collection()
    result = collection.insert_one(data.dict())
    return {"id": str(result.inserted_id), "data": data.dict()["data"]}

@app.get("/api/offer-letter/{id}")
def get_offer_letter(id: str):
    collection = get_offer_collection()
    doc = collection.find_one({"_id": ObjectId(id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@app.get("/api/offer-letter/all")
def get_all_offer_letters():
    collection = get_offer_collection()
    docs = list(collection.find())
    result = []
    for doc in docs:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        result.append(doc)
    return jsonable_encoder(result)

@app.delete("/api/offer-letter/{id}")
def delete_offer_letter(id: str):
    collection = get_offer_collection()
    result = collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"status": "success"}
    else:
        raise HTTPException(status_code=404, detail="Offer letter not found")

@app.get("/api/offer-letter/{id}/docx")
def download_docx(id: str):
    collection = get_offer_collection()
    doc = collection.find_one({"_id": ObjectId(id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    file_path = generate_docx(doc)
    return FileResponse(file_path, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", filename="offer_letter.docx")

@app.get("/api/offer-letter/{id}/pdf")
def download_pdf(id: str):
    collection = get_offer_collection()
    doc = collection.find_one({"_id": ObjectId(id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    file_path = generate_pdf(doc)
    return FileResponse(file_path, media_type="application/pdf", filename="offer_letter.pdf") 
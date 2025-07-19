from pydantic import BaseModel
from typing import Dict, Any

class OfferLetter(BaseModel):
    data: Dict[str, Any] 
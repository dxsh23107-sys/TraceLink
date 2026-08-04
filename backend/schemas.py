from pydantic import BaseModel
from typing import List, Literal


class Platform(BaseModel):
    id: str
    name: str
    color: str
    mark: str


class SearchRequest(BaseModel):
    query: str
    type: Literal["email", "username"]


class SearchResult(BaseModel):
    id: str
    platform: Platform
    username: str
    displayName: str
    followers: int
    bio: str
    location: str
    country: str
    joinDate: str
    website: str
    status: str
    verified: bool


class SearchResponse(BaseModel):
    success: bool
    total_results: int
    results: List[SearchResult]
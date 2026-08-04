from fastapi import APIRouter
from schemas import (
    SearchRequest,
    SearchResponse,
    SearchResult,
    Platform,
)
from services.github import search_github

router = APIRouter(prefix="/search", tags=["Search"])


@router.post("/", response_model=SearchResponse)
async def search(data: SearchRequest):

    username = data.query.split("@")[0].strip().lower()

    github_users = search_github(username)

    results = []

    for user in github_users[:5]:
        results.append(
            SearchResult(
                id=str(user.get("id", "")),
                platform=Platform(
                    id="github",
                    name="GitHub",
                    color="#8b95a5",
                    mark="Gh",
                ),
                username=user.get("login", ""),
                displayName=user.get("login", ""),
                followers=0,
                bio="GitHub User",
                location="Unknown",
                country="Unknown",
                joinDate="-",
                website=user.get("html_url", ""),
                status="active",
                verified=False,
            )
        )

    return SearchResponse(
        success=True,
        total_results=len(results),
        results=results,
    )
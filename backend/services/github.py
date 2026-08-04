import requests


def search_github(username: str):
    url = f"https://api.github.com/search/users?q={username}"

    try:
        response = requests.get(
            url,
            headers={
                "Accept": "application/vnd.github+json",
                "User-Agent": "TraceLink",
            },
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        print("GitHub Response:")
        print(data)

        return data.get("items", [])

    except Exception as e:
        print("GitHub Error:", e)
        return []
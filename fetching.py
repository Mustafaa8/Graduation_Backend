import requests
url = "http://localhost:3400/records/first"
res = requests.get(url=url)
print(res.json())
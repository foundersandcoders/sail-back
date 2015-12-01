curl -b cookies.txt -d @../foch-data/$1.json -H 'Content-Type: application/json' localhost:1337/upload?type=$1

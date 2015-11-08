#!/bin/bash
curl -c ./cookies.txt -d "username=$1&password=$2" http://localhost:1337/signin
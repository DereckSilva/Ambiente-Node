#!/bin/bash

# configura o back-end com com node simples
npm init -y
jq '.scripts.start = "node app.js" | .scripts.dev = "nodemon app.js"' package.json > tmp.json && mv tmp.json package.json
jq '.type = "module"' package.json > tmp.json && mv tmp.json package.json

npm install express mysql && npm install nodemon --save-dev
npm run dev
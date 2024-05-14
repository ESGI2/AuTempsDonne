# Étape de construction Node.js
FROM node:16 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Étape de construction Python
FROM python:3.9 as python-builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Étape de production
FROM node:alpine

WORKDIR /app

# Installer Python dans l'image Alpine
RUN apk add --no-cache python3 py3-pip

COPY --from=builder /app .
COPY --from=python-builder /app .

EXPOSE 3000

CMD ["node", "app.js"]

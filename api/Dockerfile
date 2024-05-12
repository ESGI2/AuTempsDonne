# Étape de construction
FROM node:21 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Étape de production
FROM node:alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "app.js"]

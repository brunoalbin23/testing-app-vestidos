FROM node:20-alpine

WORKDIR /app

# Copiamos los package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos todo el código
COPY . .

# Build de producción
RUN npm run build

# Puerto que expone la app
EXPOSE 3000

# Comando para correr la app en producción
CMD ["npm", "start"]

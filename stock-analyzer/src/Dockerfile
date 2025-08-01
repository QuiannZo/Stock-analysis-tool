FROM node:20-alpine AS builder

# directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# dependencias de npm
RUN npm install

# Copia el resto del código
COPY . .

# Compila el proyecto
RUN npm run build

############
# Producción
FROM node:20-alpine AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios para producción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/next.config.js ./

# puerto en el que Next.js corre por defecto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]

FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG VITE_BACK_URL
ENV VITE_BACK_URL=$VITE_BACK_URL

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

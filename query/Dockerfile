FROM node:alpine AS build
WORKDIR /app
COPY ./ ./
RUN npm install typescript -g && npm install && npm run build

FROM node:alpine
WORKDIR /app
COPY --from=build /app /app
RUN rm -rf *.ts
CMD ["npm","run", "start-prod"]

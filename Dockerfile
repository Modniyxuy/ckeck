FROM node:16-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

FROM node:16-alpine AS build

USER node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

FROM node:16-alpine AS production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/dist ./dist

CMD [ "node", "dist/src/main.js" ]
ENTRYPOINT ["/app/entrypoint.sh"]

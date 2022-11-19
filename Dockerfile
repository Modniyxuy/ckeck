FROM node:16-alpine AS development

USER node

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM node:16-alpine AS build

USER node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

FROM node:16-alpine AS production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "node", "dist/src/main.js" ]
ENTRYPOINT ["/app/entrypoint.sh"]
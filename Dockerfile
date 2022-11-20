FROM node:16-alpine AS builder

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build \
    && npm prune --production

USER node

FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/public/ ./public/
COPY --from=builder --chown=node:node /app/dist/ ./dist/

USER node

CMD ["node", "dist/main.js"]
ENTRYPOINT ["/app/entrypoint.sh"]

FROM node:18-alpine

RUN apk add --no-cache wget

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
  then npm ci; \
  else npm ci --only=production; \
  fi

COPY . .

ENV PORT=7010
EXPOSE 7010

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:7010/health || exit 1

CMD ["npm", "start"]

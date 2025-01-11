FROM node:lts-slim AS deps
WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
COPY package*.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

FROM node:lts-slim AS builder
WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build
RUN pnpm prune --production

FROM node:lts-slim AS runner
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/

EXPOSE 3000
CMD [ "node", "build" ]
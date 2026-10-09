FROM node:lts AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@10

# -------------------------
# Build
# -------------------------
FROM base AS build

ARG EMAIL
ARG PHONE

ENV EMAIL=$EMAIL
ENV PHONE=$PHONE

COPY . .
RUN pnpm install
RUN pnpm build

FROM httpd:2.4 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80

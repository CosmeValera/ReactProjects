# Base image
FROM gcs/sles-base:15.7-p26 AS base

# Install software dependencies
RUN zypper --non-interactive install --no-recommends \
    nodejs22 \
    npm22 \
    && zypper clean -a

# Builder stage: copy source and prune using local turbo
FROM base AS builder
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./
COPY .npmrc ./
COPY packages/ ./packages/
COPY apps/ ./apps/


# Create turbo structure
RUN --mount=type=bind,source=./npm-cache,target=/app/npm-cache \
    npm ci --prefer-offline 
RUN npm run prune:grafana-mfe

# Installer stage: install dependencies using your .tgz package
FROM base AS installer    
WORKDIR /app

# Copy pruned package.json y lockfile, npm cache and iov-ds
COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/.npmrc ./
COPY --from=builder /app/packages/iov-ds-*.tgz ./packages/

RUN --mount=type=bind,source=./npm-cache,target=/app/npm-cache \
    npm ci --prefer-offline

# Build stage: copy full source and build
COPY --from=builder /app/out/full/ ./
# RUN npm run build # We just need the source files and start in development mode
RUN npm run build

FROM sles15sp7_bci_nginx:p26 AS runner
WORKDIR /app

# Remove default nginx html
RUN rm -rf /srv/www/htdocs/*

# Copy built static files from installer stage
COPY --from=installer /app/apps/grafana-mfe/dist/ /srv/www/htdocs/

#### WORKAROUND: sles15bcip25_nginx:p25 without execution permissions in /etc/ssl/gcs-certs/ and /etc/ssl/keys/ and /etc/nginx/ssl/ ####
#### WORKAROUND: sles15bcip25_nginx:p25 without write permissions in /run ####
RUN chmod +x /etc/ssl/gcs-certs/ /etc/ssl/keys/ /etc/nginx/ssl/ && \
    mkdir -p /run && \
    touch /run/nginx.pid && \
    chown -R nginx:nginx /run/nginx.pid

#### WORKAROUND: Modify CSP headers ####
RUN sed -i "s|add_header Content-Security-Policy.*;|add_header Content-Security-Policy \"default-src 'self' http: https: data: blob: 'unsafe-inline'\" always;|" /etc/nginx/nginx.conf

USER nginx

EXPOSE 443
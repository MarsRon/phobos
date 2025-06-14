# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.13.1

#
# Basic setup
#
FROM node:${NODE_VERSION}-alpine AS base
# Use production node environment by default.
ENV NODE_ENV=production
WORKDIR /phobos

#
# NPM install and compile node-canvas stage
#
FROM base AS npm-install

RUN apk add --no-cache make g++ libtool autoconf automake \
    cairo-dev pango-dev jpeg-dev giflib-dev librsvg-dev

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

#
# Final stage
#
FROM base AS final

# Copy compiled node-canvas from previous stage
COPY --from=npm-install /phobos/node_modules /phobos/node_modules

# Install distube and node-canvas dependencies
RUN apk add --no-cache ffmpeg libsodium libopusenc \
    cairo pango jpeg giflib librsvg

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 8001

# Run the application.
CMD ["npm", "start"]

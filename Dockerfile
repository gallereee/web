FROM node:16

# Link image to repository
LABEL org.opencontainers.image.source="https://github.com/gallereee/web"

# Set github token required to fetch packages
ARG github_token
ENV GITHUB_TOKEN $github_token
ENV NEXT_TELEMETRY_DISABLED 1

# Create app directory
WORKDIR /app
# Install app dependencies
COPY ["package.json", "package-lock.json", ".npmrc", ".env.local", "./"]
RUN npm ci
# Remove token-related stuff
RUN rm -f .npmrc
ENV GITHUB_TOKEN=""
# Bundle app source
COPY . .
# Build project
RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "start"]

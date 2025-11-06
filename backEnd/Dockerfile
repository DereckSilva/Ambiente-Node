FROM ubuntu:22.04
WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs && \
 apt-get install jq -y

COPY . .
COPY ./bash.sh /

RUN chmod +x bash.sh

EXPOSE 3000
CMD ["npm", "run", "dev"]
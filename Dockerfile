FROM node:latest

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"
ENV EMAIL="real_email"
ENV PASSWORD="real_password"

COPY . ./

EXPOSE 3000
ENTRYPOINT ["npm","start"]
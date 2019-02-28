FROM node:latest
MAINTAINER Luan H. G. Gregori
COPY . /var/www
WORKDIR /var/www
RUN npm config set strict-ssl false
RUN npm install
ENTRYPOINT ["mysql"]
EXPOSE 3000
#https://github.com/harblaith7/Docker-AWS-Crash-Course.git# pull official base image
#FROM node:18-alpine3.15 as build


# FROM REACT DOCKER TUTORIAL AT 
# https://www.geeksforgeeks.org/how-to-call-npm-start-though-docker/
# TWO Key Commands
# docker build -t cbentleywatson/front-end . # front end actually probably needs to be updates
#docker run -d -it -p 3000:80 cbentleywatson/front-end
# DON'T forget the 3000:80 conversion. NGIXruns on port 80, which we don't want to use locally


#WORKDIR /app
#COPY package.json .
#RUN npm install --legacy-peer-deps
#COPY . .
#RUN npm run build
#EXPOSE  3000

# The Working Version used to Run a local version with npm start
#FROM node:alpine
#RUN mkdir /app
#WORKDIR /app
#COPY package.json /app
#RUN npm install --legacy-peer-deps
#COPY . /app
#RUN npm run build

#CMD ["npm", "start"]

FROM node:alpine as builder
#WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps  && mkdir /react-ui && mv ./node_modules ./react-ui
WORKDIR /react-ui
#RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:stable-alpine

#!/bin/sh
#COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder  /react-ui/build /usr/share/nginx/html

#RUN rm -rf ./*
#COPY --from=build /app/build . # Line below exposes 3000 and 80?
EXPOSE  3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

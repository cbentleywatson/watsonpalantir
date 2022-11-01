#https://github.com/harblaith7/Docker-AWS-Crash-Course.git# pull official base image
FROM node:18-alpine3.15 as build-deps


# add `/app/node_modules/.bin` to $PATH
#ENV PATH /pal-clone/node_modules/.bin:$PATH

# install app dependencies
#COPY pal-clone/package.json ./
#COPY pal-clone/package-lock.json ./
#RUN npm install 

#RUN npm install react-scripts@3.4.1 -g 

# add app
WORKDIR /app
COPY package.json .

#COPY . ./

# set working directory
#WORKDIR /pal-clone
RUN npm install
COPY . .
RUN npm run build


RUN npm install -g serve
RUN serve -s /app/build

#FROM node:18-alpine3.15 as minimized
#COPY --from=build-deps /app/build /app/build
#RUN npm install -g serve
#RUN serve -s /app/build
#FROM nginx:1.12-alpine
#COPY --from=build-deps /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]


#FROM node:18-alpine3.15 as minimized
#COPY --from=build-deps /app/build /
#RUN npm install -g serve
#RUN serve -s /app/build




#CMD ["npm", "start"]

# The EXPOSE command links the port the PROGRAAM sees to the Port Chrome communicates with. The second number is the port to use with the browser, the first is what react uses 

#EXPOSE 3000:3000
EXPOSE  3000:3000
#EXPOSE 80:3000
#EXPOSE 3000:3000

#CMD ["npm", "start"]

#CMD ["ls", "pal-clone/node_modules"]

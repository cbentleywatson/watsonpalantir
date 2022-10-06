#https://github.com/harblaith7/Docker-AWS-Crash-Course.git# pull official base image
FROM node:18-alpine3.15


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
# start app
# The EXPOSE command links the port the PROGRAAM sees to the Port Chrome communicates with. The second number is the port to use with the browser, the first is what react uses 

#EXPOSE 3000:3000
EXPOSE  3000
#EXPOSE 80:3000
#EXPOSE 3000:3000

CMD ["npm", "start"]

#CMD ["ls", "pal-clone/node_modules"]

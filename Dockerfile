# Pull the latest base image
FROM node:14-alpine
# set working directory
WORKDIR /app
# set working directory
EXPOSE 3001
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Copy package.json to /app
COPY package.json ./
# Copy package-lock.json to /app
COPY package-lock.json ./

# Install dependencies
RUN npm i
# add app
COPY . ./
# Remove Docekrfile
RUN rm Dockerfile
RUN rm .env.development
RUN rm .env.production
# Copy env file over to /app to run prodution comment if you want dev
COPY .env.production ./.env
# start app
CMD ["npm", "start"]   

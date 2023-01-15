FROM node:18
ENV NODE_ENV=production
WORKDIR /usr/app
COPY ./ ./
CMD [ "npm", "start" ]

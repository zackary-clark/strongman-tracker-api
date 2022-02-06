FROM arm64v8/node:17
ENV NODE_ENV=production
WORKDIR /usr/app
COPY ./ ./
CMD [ "npm", "start" ]

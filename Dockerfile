FROM arm64v8/node:17
ENV NODE_ENV=production
WORKDIR /usr/app
COPY ./ ./
RUN npm install
CMD [ "npm", "start" ]

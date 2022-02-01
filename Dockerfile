FROM arm64v8/node:17
ENV NODE_ENV=production
RUN npm install
COPY . .
CMD [ "npm", "start" ]

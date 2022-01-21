FROM arm64v8/node:17
ENV NODE_ENV=production
RUN yarn install
COPY . .
CMD [ "yarn", "start" ]

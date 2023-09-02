FROM node:18

WORKDIR /app
COPY . .
COPY ./node_modules ./node_modules
RUN yarn
# CMD "yarn" "dev"
RUN yarn build
EXPOSE 3000
CMD "yarn" "start"

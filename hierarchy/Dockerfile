FROM node

WORKDIR /app/hierarchy

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]
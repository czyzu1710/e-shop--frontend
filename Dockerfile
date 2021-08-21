FROM node:15

WORKDIR /usr/src/app

RUN git clone https://gitlab.com/studenckieubranka/frontend.git

WORKDIR ./frontend

RUN git checkout -t origin/feature/prepare-docker

RUN npm install

EXPOSE 3000

CMD npm start

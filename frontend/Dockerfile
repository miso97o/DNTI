FROM node:lts-alpine as build-stage 
WORKDIR .

COPY package*.json ./ 
RUN npm install
COPY . . 
RUN npm run build 

FROM nginx:stable-alpine as production-stage

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY --from=build-stage ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /user/share/nginx/html/*
COPY --from=build-stage ./dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g","daemon off;"]

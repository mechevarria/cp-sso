# build using nodejs
FROM node:12 as builder

WORKDIR /usr/src/app

COPY *.json ./

COPY *.js ./

RUN npm install

COPY src/ ./src/

RUN npm run build

# run using nginx
FROM nginx

COPY ./nginx.template.conf /tmp/

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

CMD /bin/sh -c "envsubst < /usr/share/nginx/html/assets/js/env.template.js > /usr/share/nginx/html/assets/js/env.js && envsubst '\${SPRINGBOOT_URL}' < /tmp/nginx.template.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
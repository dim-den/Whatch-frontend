FROM node:18 as build

COPY package.json /usr/angular-workdir/
WORKDIR /usr/angular-workdir
RUN yarn install
RUN npm install npm install -g @angular/cli

COPY ./ /usr/angular-workdir
RUN ng build --output-path=/dist

FROM nginx:1.15.8-alpine

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=0 /dist /usr/share/nginx/html

RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
          envsubst '\$BACKEND_API_URL \$DEFAULT_LANGUAGE ' < \${mainFileName} > main.tmp && \
          mv main.tmp  \${mainFileName} && nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]

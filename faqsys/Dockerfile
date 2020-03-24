FROM nginx:1.14.0-alpine
RUN echo "http://dl-cdn.alpinelinux.org/alpine/main" >> /etc/apk/repositories && \
  apk upgrade --no-cache --update
COPY build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
EXPOSE 80

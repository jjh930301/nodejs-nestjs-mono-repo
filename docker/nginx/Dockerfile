FROM nginx:alpine3.18-slim

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

COPY docker/nginx/default.conf /etc/nginx/conf.d/
COPY docker/nginx/nginx.conf /etc/nginx/

# api
EXPOSE 9090 
# ocpp - deployment
EXPOSE 9000
# process 
EXPOSE 9010

# default
EXPOSE 80
EXPOSE 443
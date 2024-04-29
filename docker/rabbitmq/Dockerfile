FROM rabbitmq:3-management

COPY rabbitmq/mq.sh /usr/local/bin/

EXPOSE 5672
EXPOSE 15672 

RUN chmod +x /usr/local/bin/mq.sh

WORKDIR /usr/local/bin

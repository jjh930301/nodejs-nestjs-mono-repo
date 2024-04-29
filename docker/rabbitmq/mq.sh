#/bin/sh
rabbitmq-plugins enable rabbitmq_management

sleep 2
# declare queue
rabbitmqadmin -u admin -p password declare queue name=new

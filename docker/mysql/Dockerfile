FROM mysql:8.0.33

EXPOSE 3306

COPY mysql/initdb.d/ /docker-entrypoint-initdb.d/
COPY mysql/conf.d /etc/mysql/conf.d/
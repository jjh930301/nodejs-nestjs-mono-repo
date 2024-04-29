FROM node:18.19.1-alpine AS base
WORKDIR /app
COPY . .
RUN apk update
RUN apk add git openssh
RUN git config --global url."https://".insteadOf ssh://

RUN npm install 

FROM node:18.19.1-alpine as api
WORKDIR /app
# create a non-root user for compose watch
RUN adduser -D app
RUN chown -R app:app /app
USER app
# give the user ownership of the app directory for compose watch
COPY --chown=app:app --from=base /app .
COPY --chown=app:app ./api ./api
COPY --chown=app:app ./ev-common ./ev-common
COPY --chown=app:app ./config ./config
COPY --chown=app:app ./package*.json .
EXPOSE 9090


FROM node:18.19.1-alpine  as socket
WORKDIR /app
RUN adduser -D app
RUN chown -R app:app /app
USER app
COPY --chown=app:app --from=base /app .
COPY --chown=app:app ./socket ./socket
COPY --chown=app:app ./ev-common ./ev-common
COPY --chown=app:app ./config ./config
COPY --chown=app:app ./package*.json .
EXPOSE 9000
EXPOSE 9001
RUN mkdir -p logs


FROM node:18.19.1-alpine  as process
WORKDIR /app
RUN adduser -D app
RUN chown -R app:app /app
USER app
COPY --chown=app:app --from=base /app .
COPY --chown=app:app ./process ./process
COPY --chown=app:app ./ev-common ./ev-common
COPY --chown=app:app ./config ./config
COPY --chown=app:app ./package*.json .
EXPOSE 9010
RUN mkdir -p logs
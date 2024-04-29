## run packages

- `docker-compose -f compose.datastore.yml up --build`

- `git clone git@github.com:jjh930301/nodejs-nestjs-mono-repo.git`

- root , ev-common , api , process , socket dir에서 `npm i`

- `npm run start:all`

## 참조

- 크로커스에서 구조적으로 문제가 있던 message broker가 수정된 프로젝트

- socket , process는 sequelize를 사용하고 있었고 api(nestjs)는 typeorm을 사용하고 있어서 js -> ts 마이그레이션

- 개발전 공통 개발

- 공통 관리가 되지 않고 있어서 private git repo를 고려했으나 빈번한 entity의 수정으로 mono repo에서 공통 관리

- local , dev , production이 나눠져 있지 않았지만 환경 구성

- socket server replica가 생성될 때 process서버는 생성된 queue를 구독 특정 채널에 publish

- app.controller.ts api를 개발 예시

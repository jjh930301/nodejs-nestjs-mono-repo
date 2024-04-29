# README #

이 문서는 크로커스 SaaS 형태의 관제플랫폼 중, API서버와 관련한 문서 입니다.

## 크로커스 SaaS 관제플랫폼의 구성 ## 

### 서버 구성 ###

* OCPP 1.6 수신서버 (프로젝트명: csms-ocpp1.6)
    * OCPP 1.6의 메세지를 수신하여 OCPP 1.6 처리서버로 메세지를 전달하며, OCPP 1.6 처리서버의 결과값을 충전기로 전달하는 서버
* OCPP 1.6 처리서버 (프로젝트명: csms-ocpp1.6-process)
    * OCPP 1.6 수신서버가 받은 OCPP 메세지를 처리하는 서버
* API 서버 (프로젝트명: csms-api)
    * 관제 플랫폼의 Frontend 또는 사용자 App에 대응하는 Restful API 서버

추후 2.0.1의 도입 시

* OCPP 2.0.1 수신서버
* OCPP 2.0.1 처리서버

가 추가 될 것 입니다.

### 아키텍트 구성 ###

서버간의 통신은 RabbitMQ를 이용하여 이루어지며, <br>
OCPP 1.6버전의 exchange와 OCPP 2.0.1버전의 exchange로 구성 될 예정입니다.

** 이미지는 추후 첨부

### Sequelize 사용법 ###

Sequelize 는 Node의 ORM으로 DB Table을 Model화 하여 객체로 사용 할 수 있게 해 줍니다.

models 폴더 하위의 파일로 DB 테이블을 갱신 할 수 있으며,<br>
DB 테이블을 models 폴더 하위의 파일로 생성하는 것도 가능합니다.

<span style="color: red;">이 문서에서는 DB 테이블을 models 폴더 하위의 파일로 sequelize-auto를 이용하여 Migration 하는 방법만을 기술합니다.</span>

* .sequelize-auto.cfg.js: sequelize-auto 를 이용하여 Migration 할 때 <br>
  자동으로 create_at 등의 timestamp 컬럼이 생성되는 것을 막습니다.
* .sequelize-models.sh: ShellScript로, sequelize-auto를 실행하는 명령어가 포함되어 있습니다.<br>
  Database의 URL, USERNAME, PASSWORD, DB Schema이름을 세팅해야 합니다.<br>
  정상적으로 실행되면 models 폴더 밑의 모든 파일이 덮어써지게 됩니다.
* models 폴더 하위의 associations.js: 테이블간의 Relations을 코드화 한 파일로서, <br>
  model 파일들이 덮어씌워 졌을 때, 새로 수정하지 않게 하기위해 별도 파일로 빼 놓았습니다.
* .sequelize-models.js 파일 실행 후, models/init-models.js 파일에 자등으로 생성되는 Relations 들은 주석 처리 해야 하며,<br>
  이전에 없었던 새로운 Relations의 내용은 models/associations.js 파일로 이동시켜야 합니다.


### Node 서버 실행 방법 ###
* 프로젝트를 GIT에서 받은 후 npm install 실행 (package.json 의 기술된 라이브러리 종속성 설치)
* 서버 실행
    * 로컬에서 실행시
        * vscode 혹은 jetbrains 의 실행 스크립트로 실행
        * npm run dev
    * 테스트 서버에서 실행시
        * npm run dev
    * 배포 서버에서 실행시
        * npm start
    * 실행 종료
        * npm stop
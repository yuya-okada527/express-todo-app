# Expressで作ったTODO アプリのサンプル

## ローカルMongoDB準備

- docker-composeを立ち上げ
- mogodbにログイン
  - mongo -u root
- DBの作成
  - use todo_db
- コレクションの作成
  - db.createCollection("name")
- ユーザの作成
  - db.createUser({user: "name", pwd: "password", roles: ["readWrite"]})

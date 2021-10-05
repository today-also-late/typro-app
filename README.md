
## TyPro

https://typro-app.vercel.app/

プログラミング教育必修化に向け、初学者(中高生)がスムーズにプログラミングを学ぶための助けとなるタイピングアプリです。

本アプリでは 1 つのプログラムを 1 行づつ入力し、タイピング中も思考させるために出力結果まで解答します。解答後の解説で、コードを詳細まで理解することも可能です。

## TERMINAL2021 準グランプリ!!
Sky株式会社主催、学生対象アプリ開発コンテスト「TERMINAL2021」　全国の121名の学生が挑戦した中から準グランプリ獲得！！

## Environment setting

### Installation of Node.js・npm

<a href= "https://nodejs.org/ja/">Node.js' official website</a><br>
<img src="image/Nodejsofficial.png" width="400">

<!-- ![Nodejsofficial](https://user-images.githubusercontent.com/58549977/127946461-ee882ee1-5d7a-4033-90e1-89e4df95ce48.png) -->

### Installation of npm

for Mac

```
sudo npm install -g npm
```

for Windows

```
npm install -g npm
```

### Installation of next.js

```
npm install next react react-dom
```

### prettier setup

Install prettier as an extension of vscode.

Restart vscode.

## firebase

アカウント and プロジェクト and アプリを作成して各種キーを取得してください

Firebase Authentication でメール、パスワードを有効にしてください

Cloud Firestore でデータベースを作成してください

## 環境設定

### ①.env

各自.env ファイルを作って以下の\*に自分のキーを記述してください

NEXT_PUBLIC_FIREBASE_API_KEY="**\*\*\*\***\*\***\*\*\*\***"

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="**\*\*\*\***\*\***\*\*\*\***"

REACT_APP_FIREBASE_DATABASE="**\*\*\*\***\*\***\*\*\*\***"

NEXT_PUBLIC_FIREBASE_PROJECT_ID="**\*\*\*\***\*\***\*\*\*\***"

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="**\*\*\*\***\*\***\*\*\*\***"

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="**\*\*\*\***\*\***\*\*\*\***"

NEXT_PUBLIC_FIREBASE_APP_IDD="**\*\*\*\***\*\***\*\*\*\***"

REACT_APP_FIREBASE_MEASUREMENT_ID="**\*\*\*\***\*\***\*\*\*\***"

### ②.firebaserc

default に各自のプロジェクトの ID を記述してください

## 以下ターミナルで入力

### ③npm i

### ④firebase login

### ⑤firebase deploy --only firestore:rules

### ⑥firebase init

## firebase に問題を追加するとき

npm install firebase-admin firebase-functions

firebase deploy --only functions

curl -X POST https://YOUR_REGION-YOUR_PROJECT_NAME.cloudfunctions.net/addDataset -H "Content-Type:application/json" -d @questions.json

## firebase not perimision のとき

firebase deploy --only firestore:rules

## slack で user からの問題を受け取るときに設定

https://typro.slack.com/apps/new/A0F7XDUAZ--incoming-webhook-

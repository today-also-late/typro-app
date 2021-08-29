This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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

アカウントandプロジェクトandアプリを作成して各種キーを取得してください

Firebase Authenticationでメール、パスワードを有効にしてください

Cloud Firestoreでデータベースを作成してください


## 環境設定

### ①.env

各自.envファイルを作って以下の*に自分のキーを記述してください

NEXT_PUBLIC_FIREBASE_API_KEY="******************"

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="******************"

REACT_APP_FIREBASE_DATABASE="******************"

NEXT_PUBLIC_FIREBASE_PROJECT_ID="******************"

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="******************"

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="******************"

NEXT_PUBLIC_FIREBASE_APP_IDD="******************"

REACT_APP_FIREBASE_MEASUREMENT_ID="******************"

### ②.firebaserc

defaultに各自のプロジェクトのIDを記述してください

## 以下ターミナルで入力
### ③npm i
### ④firebase login
### ⑤firebase deploy --only firestore:rules
### ⑥firebase init

## firebaseに問題を追加するとき

npm install firebase-admin firebase-functions

firebase deploy --only functions

curl -X POST https://YOUR_REGION-YOUR_PROJECT_NAME.cloudfunctions.net/addDataset -H "Content-Type:application/json" -d @questions.json

## firebase not perimisionのとき
firebase deploy --only firestore:rules

## slackでuserからの問題を受け取るときに設定
https://typro.slack.com/apps/new/A0F7XDUAZ--incoming-webhook-

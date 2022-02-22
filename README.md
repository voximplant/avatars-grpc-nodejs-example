# NodeJS example for Avatars gRPC API
Simple CLI app, which allows you to chat with avatar.

## Setup environment

In order to run application you'll need to get:
- Avatar ID (guid)
- Platform account ID (https://manage.voximplant.com/settings/api_keys)
- Platform API key (https://manage.voximplant.com/settings/api_keys)

and put them into env variables (like):
```
export API_KEY=00000000-0000-0000-0000-0000000001
export ACCOUNT_ID=0000000
export AVATAR_ID=00000000-0000-0000-0000-0000000001
```

## Build & run
```
npm i
npm run client
```
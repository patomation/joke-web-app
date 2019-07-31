# TakeMeTour's Job Quest 2018 Edition

## Development
1. Install dependencies
```
npm install
```
2. Copy .evn-default to .env
```
cp .env-default .env
```
3. Set MONGODB_URL enviroment variable to the following and replace {{username}}, {{password}}, {{cluster}} and {{appname}}
```
MONGODB_URL=mongodb+srv://{{username}}:{{password}}@{{cluster}}.mongodb.net/{{appname}}?retryWrites=true&w=majority
```
4. Running Local Environment.
Local api server and client app.
```
npm start
```
Have fun tinkering

## Publishing
1. Set now mongodb_url_jokes secret
```
now secrets add mongodb_url_jokes "mongodb+srv://{{username}}:{{password}}@{{cluster}}.mongodb.net/{{appname}}?retryWrites=true&w=majority"
```
2. Change apiHost url in ```src/apiHost.json``` to your now {{username}}.
```
https://jokes.{{username}}.now.sh/api
```
3. Publish Code in one command.
Handles webpack build, zeit now deploy and opens published app in new url.
```
npm run publish
```

# attachment_linker
Sends the media download url from the originating matrix hs when someone sends an attachment. **THIS DOES NOT WORK WITH AUTH MEDIA**

# Setup:
Create txt file `./db/login.txt` and inside it, put
```
https://matrix.homeserver
[login token]
```
Then run `npm install` and you can start the bot with `node index.js`. It should autojoin any room you invite the account to while the bot is online

This is just something I threw together real quick, sorry for the lack of any quality.

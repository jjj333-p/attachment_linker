//sdk stuff idk
import sdk from "matrix-bot-sdk"
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;
import fs from "fs"

import fetch from "node-fetch"

//fetch login details
const logintxt = fs.readFileSync("./db/login.txt", "utf-8") //this is a fetch, why couldnt i find this
const logindata = logintxt.split("\n")
const homeserverUrl = logindata[0]
const accessToken = logindata[1]

//the bot sync something idk bro it was here in the example so i dont touch it ;-;
const storage = new SimpleFsStorageProvider("bot.json");

//login to client
const client = new MatrixClient(homeserverUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);

//start client
client.start().then(() => console.log("Client started!"));



client.on("room.message", async (roomId, event) => {

    //if no content in message
    if (! event["content"]) return;

    //only work on media
    if (! event["content"]["url"]) return

    //filter out events sent by the bot itself.
    if (event["sender"] === await client.getUserId()) return;

    //parce hs url from mxid
    let domain = event["sender"].split(":")[1]
    let httpsDomain = "https://" + domain + "/.well-known/matrix/client"

    //console log for debug
    console.log(domain)

    //fetch the real delegated hs url
    let hsUrl = (await (await fetch(httpsDomain, {"method":"Get"})).json().catch(() => {return {"m.homeserver":{"base_url":httpsDomain}}}))["m.homeserver"]["base_url"]

    //throw together the media id from the mxc and the hs media url and send it
    client.sendText(roomId, (hsUrl + "/_matrix/media/r0/download/" + domain + event["content"]["url"].substring(domain.length + 6)))

});


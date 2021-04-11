const axios = require("axios");
const process = require("process");
const crypto = require("crypto");

function timestamp(){
    return new Date().getTime();
}

function signal(secret, ...payload) {
    return crypto.createHmac("sha256", secret)
        .update(payload.join(""))
        .digest("hex")
        .toUpperCase();
}

async function auth(){
    const time = timestamp();
    const sign = signal(process.env.ACCESSSECRET, process.env.ACCESSID, time);
    const resp = await axios.default.get("/v1.0/token?grant_type=1", {
        baseURL: process.env.SERVERURL,
        headers: {
            sign, t: time,
            client_id: process.env.ACCESSID,
            sign_method: process.env.SIGNMETHOD
        }
    })

    return resp.data?.result?.access_token;
}

async function credentials(){
    const token = await auth();
    const time = timestamp();
    const sign = signal(process.env.ACCESSSECRET, process.env.ACCESSID, token, time);

    return {
        access_token: token, t: time, sign,
        client_id: process.env.ACCESSID,
        sign_method: process.env.SIGNMETHOD,
    }
}

module.exports = { credentials }
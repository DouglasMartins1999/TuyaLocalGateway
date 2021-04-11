const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");
const process = require("process");

dotenv.config();

const server = express();
const helpers = require("./helpers.js");
const devices = require("./devices.json");
const requester = axios.create({ baseURL: process.env.SERVERURL })

server.get("/switch", async (req, resp, next) => {
    const device = devices[req.query.device];
    const value = req.query.turnon === "true";
    const body = { commands:[{ code: "switch_led", value }] }

    const headers = await helpers.credentials();
    const result = await requester.post(`/v1.0/devices/${device}/commands`, body, { headers })

    resp.sendStatus(result.data.success ? 200 : 500);
    return next();
})

server.listen(process.env.PORT, () => {
    console.log("Servidor Iniciado na Porta", process.env.PORT);
})
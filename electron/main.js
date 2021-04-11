const { app, Tray, Menu, MenuItem } = require('electron');
const settings = require("./settings.json");
let tray = null; 

function turn(device, turnItOn) {
    const { net } = require('electron');
    const req = net.request({
        hostname: settings.host,
        path: settings.pathURL
            .replace("{{device}}", device)
            .replace("{{turnOn}}", turnItOn)
    })

    return req.end();
}

app.once("ready", () => {
    if (process.platform == 'darwin')  
        app.dock.hide();

    const menu = new Menu();

    settings.devices.forEach(dev => {
        const container = new MenuItem({ label: dev.name, submenu: [] })
        const turnOn = new MenuItem({ label: "Ligar", click: () => turn(dev.device, true) });
        const turnOff = new MenuItem({ label: "Desligar", click: () => turn(dev.device, false) });

        container.submenu.append(turnOn);
        container.submenu.append(turnOff);
        menu.append(container);
    })

    tray = new Tray(__dirname + '/icon.png')
    tray.setContextMenu(menu);
})
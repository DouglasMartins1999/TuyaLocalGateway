var on = document.getElementById("on");
var off = document.getElementById("off");
var title = document.getElementById("device");
var type = document.getElementById("type");
var pos = 0;

function refreshDevice(){
    title.textContent = devices[pos].name;
    type.textContent = devices[pos].type;
}

function setPosition(p){
    pos = p;
}

function turn(device, turnOn) {
    var xhr = new XMLHttpRequest();
    var path = BASEURL
        .replace("{{device}}", device)
        .replace("{{turnOn}}", turnOn);

    xhr.open("get", path)
    xhr.send();
}

on.addEventListener("click", function() {
    turn(devices[pos].device, true);
});

off.addEventListener("click", function() {
    turn(devices[pos].device, false);
})

title.addEventListener("click", function() {
    setPosition(devices.length > (pos + 1) ? (pos + 1) : 0);
    refreshDevice();
})

refreshDevice();
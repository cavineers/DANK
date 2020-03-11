"use strict";
var _this = this;
exports.__esModule = true;
var nt_1 = require("./nt");
var v2Layout_1 = require("./v2Layout");
var Mousetrap = require("mousetrap");
var electron = require("electron");
var nt = new nt_1["default"](false);
var interval;
var WIN = electron.remote.getCurrentWindow();
nt.on("connect", function () {
    console.log("Connected");
    M.toast({ html: "<span style=\"color:lightgreen;\">Connected to " + nt.getRobotName() + "<span>" });
    setTimeout(function () {
        var data = nt.getProfileData();
        console.log(data);
        if (data._version == 2) {
            var v2_1 = new v2Layout_1["default"](data, nt).build().display();
            M.toast({ html: "Loaded profile " + nt.getProfileName() });
            setTimeout(function () {
                _this.setInterval(function () {
                    v2_1.periodic();
                }, 100);
            }, 500);
        }
    }, 1000);
});
nt.on("disconnect", function () {
    clearInterval(interval);
    console.log("disconnected");
    M.toast({ html: "<span style=\"color:lightred;\">Disconnected<span>" });
});
nt.connect();
Mousetrap.bind("ctrl+r", function () {
    location.reload();
});
Mousetrap.bind("f11", function () {
    WIN.setKiosk(!WIN.isKiosk());
});

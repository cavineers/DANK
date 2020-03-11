"use strict";
exports.__esModule = true;
var wpilib_nt_client_1 = require("wpilib-nt-client");
var dotenv_1 = require("dotenv");
var os = require("os");
var fs = require("fs");
var path = require("path");
dotenv_1.config();
var NT = (function () {
    function NT(autoConnect) {
        if (autoConnect === void 0) { autoConnect = true; }
        this.connected = false;
        this.onCalls = {
            connect: function () { },
            disconnect: function () { }
        };
        this.robot = {};
        this.team_number = "0".repeat(4 - process.env.TEAM_NUMBER.length) + process.env.TEAM_NUMBER;
        this.rio_ip = "10." + this.team_number[0] + this.team_number[1] + "." + this.team_number[2] + this.team_number[3] + ".2";
        this.client = new wpilib_nt_client_1.Client();
        if (autoConnect) {
            this.connect();
        }
    }
    NT.prototype.connect = function () {
        var _this = this;
        this.client.start(function (isConnected, err) {
            if (err != null) {
                console.log(err);
                _this.internalDisconnect();
                return;
            }
            _this.connected = isConnected;
            _this.internalConnect();
            console.log(isConnected);
        }, this.rio_ip);
    };
    NT.prototype.isConnected = function () {
        return this.connected;
    };
    NT.prototype.internalConnect = function () {
        var _this = this;
        setTimeout(function () {
            _this.robot.name = _this.client.getEntry(_this.client.getKeyID("/DankDash/RobotName")).val;
            _this.robot.profile = _this.client.getEntry(_this.client.getKeyID("/DankDash/ProfileName")).val;
            if (fs.existsSync(path.join(os.homedir(), "DANK", "profiles", _this.robot.profile + ".json"))) {
                _this.profileData = JSON.parse(fs.readFileSync(path.join(os.homedir(), "DANK", "profiles", _this.robot.profile + ".json"), "utf-8"));
            }
            else {
                _this.profileData = { _version: 2, layout: [{ type: "StaticText", style: "transform:translateX(-50%) translateY(-50%);user-select:none;font-size:30px;", x: "50%", y: "50%", z: "100", text: "The profile '" + _this.robot.profile + "' isn't installed" }] };
            }
            _this.onCalls.connect();
        }, 500);
    };
    NT.prototype.internalDisconnect = function () {
        var _this = this;
        this.onCalls.disconnect();
        setTimeout(function () {
            _this.connect();
        }, 750);
    };
    NT.prototype.getRobotName = function () {
        return this.robot.name;
    };
    NT.prototype.getProfileName = function () {
        return this.robot.profile;
    };
    NT.prototype.getProfileData = function () {
        return this.profileData;
    };
    NT.prototype.on = function (name, func) {
        switch (name) {
            case "connect":
                this.onCalls.connect = func;
                break;
            case "disconnect":
                this.onCalls.disconnect = func;
            default:
                break;
        }
    };
    NT.prototype.getValue = function (key) {
        return this.client.getEntry(this.client.getKeyID(key)).val;
    };
    return NT;
}());
exports["default"] = NT;

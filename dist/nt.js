"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(require("os"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const wpilib_nt_client_1 = require("wpilib-nt-client");
class NT {
    constructor(autoConnect = true, teamNumber = "4541") {
        this.connected = false;
        this.onCalls = {
            connect: () => { },
            disconnect: () => { },
        };
        this.robot = {};
        this.team_number = "0".repeat(4 - teamNumber.length) + teamNumber;
        this.rio_ip = `10.${this.team_number[0]}${this.team_number[1]}.${this.team_number[2]}${this.team_number[3]}.2`;
        // this.rio_ip = "localhost";
        this.client = new wpilib_nt_client_1.Client();
        if (autoConnect) {
            this.connect();
        }
    }
    connect() {
        this.client.start((isConnected, err) => {
            if (err != null) {
                console.log(err);
                this.internalDisconnect();
                return;
            }
            this.connected = isConnected;
            this.internalConnect();
            console.log(isConnected);
        }, this.rio_ip);
    }
    isConnected() {
        return this.connected;
    }
    internalConnect() {
        setTimeout(() => {
            this.robot.name = this.client.getEntry(this.client.getKeyID("/DankDash/RobotName")).val;
            this.robot.profile = this.client.getEntry(this.client.getKeyID("/DankDash/ProfileName")).val;
            if (fs.existsSync(path.join(os.homedir(), "DANK", "profiles", `${this.robot.profile}.json`))) {
                this.profileData = JSON.parse(fs.readFileSync(path.join(os.homedir(), "DANK", "profiles", `${this.robot.profile}.json`), "utf-8"));
            }
            else {
                this.profileData = { _version: 2, layout: [{ type: "StaticText", style: "transform:translateX(-50%) translateY(-50%);user-select:none;font-size:30px;", x: "50%", y: "50%", z: "100", text: `The profile '${this.robot.profile}' isn't installed` }] };
            }
            this.onCalls.connect();
        }, 500);
    }
    internalDisconnect() {
        this.onCalls.disconnect();
        setTimeout(() => {
            this.connect();
        }, 750);
    }
    getRobotName() {
        return this.robot.name;
    }
    getProfileName() {
        return this.robot.profile;
    }
    getProfileData() {
        return this.profileData;
    }
    on(name, func) {
        switch (name) {
            case "connect":
                this.onCalls.connect = func;
                break;
            case "disconnect":
                this.onCalls.disconnect = func;
            default:
                break;
        }
    }
    getValue(key) {
        return this.client.getEntry(this.client.getKeyID(key)).val;
    }
}
exports.default = NT;

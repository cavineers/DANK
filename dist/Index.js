"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import
const electron_1 = require("electron");
const Connection_1 = __importDefault(require("./Connection"));
const LayoutV3_1 = __importDefault(require("./layouts/LayoutV3"));
class Client {
    constructor() {
        this.m_connection = new Connection_1.default();
        this.m_name = "";
        this.m_address = "";
        console.log("Copyright © 2021 FRC Team 4541");
        console.log(`Version: v${require("electron").remote.app.getVersion()}`);
    }
    updateStatus(e, args) {
        let a = document.getElementById("main");
        let b = document.getElementById("boot-text");
        switch (args.code) {
            case -1:
                console.error(args.error);
                b.innerText = args.text;
                break;
            case 0:
                b.innerText = args.text;
                break;
            case 1:
                b.innerText = args.text;
                break;
            case 2:
                // Set public text
                b.innerText = args.text;
                // Switch display to main
                document.getElementById("boot").style.display = "none";
                document.getElementById("connect-wait").style.display = "block";
                this.connect();
                break;
            case 3:
                b.innerHTML = `<div class="progress"><div class="determinate red" style="width: ${args.percent}%"></div></div><div style="text-align:center;" class="grey-text">${args.current}/${args.total}</div>`;
                break;
            case 4:
                b.innerHTML = `<div class="progress"><div class="indeterminate red"></div></div>`;
                break;
            default:
                console.warn("Unknown status_update status code");
                break;
        }
    }
    connect() {
        this.m_connection.connect();
        this.m_connection.on("connected", (data) => {
            electron_1.remote.getCurrentWindow().setResizable(true);
            electron_1.remote.getCurrentWindow().maximize();
            electron_1.remote.getCurrentWindow().setSize(1280, 780);
            document.getElementById("main").style.display = "block";
            document.getElementById("connect-wait").style.display = "none";
            M.toast({ html: `Connected to ${data.address}` });
            this.m_address = data.address;
            this.updateRobot();
        });
        this.m_connection.on("02", (content) => {
            try {
                content = JSON.parse(content);
                console.log(content);
                if (content.version == "v3") {
                    this.m_layout = new LayoutV3_1.default(content.layout);
                }
            }
            catch (error) {
                console.log(error);
                M.toast({ html: "There is an error in this layout." });
            }
        });
        this.m_connection.on("message", (message) => {
            M.toast({ html: message });
        });
        this.m_connection.on("06", (message) => {
            M.toast({ html: `Connected to ${message}` });
            this.m_name = message;
            this.updateRobot();
        });
        this.m_connection.on("closed", () => {
            var _a;
            M.toast({ html: `Disconnected from ${this.m_name}` });
            document.getElementById("content").innerHTML = "";
            this.m_name = "";
            this.m_address = "";
            (_a = this.m_layout) === null || _a === void 0 ? void 0 : _a.reset();
            this.updateRobot();
        });
    }
    updateRobot() {
        document.getElementById("robot").innerText = `${this.m_name} (${this.m_address})`;
    }
}
exports.default = Client;

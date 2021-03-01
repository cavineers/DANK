"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = __importDefault(require("./Connection"));
class Client {
    constructor() {
        this.m_connection = new Connection_1.default();
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
    }
}
exports.default = Client;

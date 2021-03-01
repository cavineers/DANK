"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const Constants_1 = __importDefault(require("./Constants"));
class Connection extends events_1.default {
    constructor() {
        super();
        this.m_addresses = [`ws://${Constants_1.default.kRioAddress}:${Constants_1.default.kPort}`, `ws://localhost:${Constants_1.default.kPort}`];
        this.m_currentAddr = 0;
        this.m_connection = null;
        this.m_connected = false;
    }
    connect() {
        console.log("Attempting Connect");
        this.m_connection = new WebSocket(this.m_addresses[this.m_currentAddr]);
        this.m_connection.addEventListener("open", (event) => {
            console.log("opened", event);
            this.emit("connected", { address: this.m_addresses[this.m_currentAddr] });
        });
        this.m_connection.addEventListener("close", (event) => {
            console.log("closed", event);
        });
        this.m_connection.addEventListener("error", (event) => {
            event.preventDefault();
            console.log("error", event);
            if (!this.m_connected) {
                this.m_currentAddr = this.m_currentAddr + 1 == this.m_addresses.length ? 0 : this.m_currentAddr + 1;
            }
            this.connect();
        });
        this.m_connection.addEventListener("message", (message) => {
            var _a, _b;
            console.log("message", message);
            let type = message.data.substring(0, 2);
            let content = message.data.substring(3);
            switch (type) {
                case "00":
                    (_a = this.m_connection) === null || _a === void 0 ? void 0 : _a.send("01;pong");
                    break;
                case "01":
                    (_b = this.m_connection) === null || _b === void 0 ? void 0 : _b.send("01;ping");
                    break;
                case "02":
                    let layout = content;
                    break;
                case "03":
                    console.log("message", content);
                    break;
                case "05":
                    console.log("robot year", content);
                    break;
                case "06":
                    console.log("robot name", content);
                    break;
                default:
                    break;
            }
        });
    }
}
exports.default = Connection;

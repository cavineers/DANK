"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __importDefault(require("./Constants"));
class Connection {
    constructor() {
        this.m_connection = new WebSocket(`ws://${Constants_1.default.kRioAddress}:${Constants_1.default.kPort}`);
    }
}
exports.default = Connection;

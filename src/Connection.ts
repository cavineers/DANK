import Constants from "./Constants";

export default class Connection {
    private m_connection: WebSocket;

    constructor() {
        this.m_connection = new WebSocket(`ws://${Constants.kRioAddress}:${Constants.kPort}`);
    }
}

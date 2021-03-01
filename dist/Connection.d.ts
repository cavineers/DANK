/// <reference types="node" />
import EventEmitter from "events";
export default class Connection extends EventEmitter {
    private m_addresses;
    private m_currentAddr;
    private m_connection;
    private m_connected;
    constructor();
    connect(): void;
}

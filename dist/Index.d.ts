import { IpcRendererEvent } from "electron";
export default class Client {
    private m_connection;
    private m_name;
    private m_address;
    private m_layout?;
    constructor();
    updateStatus(e: IpcRendererEvent, args: any): void;
    private connect;
    private updateRobot;
}

// Import
import { IpcRendererEvent } from "electron";
import Store from "electron-store";
import * as fs from "fs";
import * as Path from "path";
import Connection from "./Connection";

export default class Client {
    private m_connection = new Connection();

    constructor() {
        console.log("Copyright © 2021 FRC Team 4541");
        console.log(`Version: v${require("electron").remote.app.getVersion()}`);
    }

    public updateStatus(e: IpcRendererEvent, args: any) {
        let a: HTMLDivElement = <HTMLDivElement>document.getElementById("main");
        let b: HTMLDivElement = <HTMLDivElement>document.getElementById("boot-text");

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
                (<HTMLDivElement>document.getElementById("boot")).style.display = "none";

                (<HTMLDivElement>document.getElementById("connect-wait")).style.display = "block";

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

    private connect() {
        this.m_connection.connect();
    }
}

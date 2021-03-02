// Import
import { IpcRendererEvent, remote } from "electron";
import Store from "electron-store";
import * as fs from "fs";
import * as Path from "path";
import Connection from "./Connection";
import { Remote } from "electron";
import LayoutV3 from "./layouts/LayoutV3";
export default class Client {
    private m_connection = new Connection();

    private m_name: string = "";
    private m_address: string = "";

    private m_layout?: LayoutV3;

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

        this.m_connection.on("connected", (data: { address: string }) => {
            remote.getCurrentWindow().setResizable(true);
            remote.getCurrentWindow().maximize();
            remote.getCurrentWindow().setSize(1280, 780);
            (<HTMLDivElement>document.getElementById("main")).style.display = "block";

            (<HTMLDivElement>document.getElementById("connect-wait")).style.display = "none";

            M.toast({ html: `Connected to ${data.address}` });
            this.m_address = data.address;
            this.updateRobot();
        });

        this.m_connection.on("02", (content) => {
            try {
                content = JSON.parse(content);

                console.log(content);
                if (content.version == "v3") {
                    this.m_layout = new LayoutV3(content.layout);
                }
            } catch (error) {
                console.log(error);
                M.toast({ html: "There is an error in this layout." });
            }
        });

        this.m_connection.on("message", (message: string) => {
            M.toast({ html: message });
        });

        this.m_connection.on("06", (message: string) => {
            M.toast({ html: `Connected to ${message}` });
            this.m_name = message;
            this.updateRobot();
        });

        this.m_connection.on("closed", () => {
            M.toast({ html: `Disconnected from ${this.m_name}` });
            (<HTMLDivElement>document.getElementById("content")).innerHTML = "";

            this.m_name = "";
            this.m_address = "";

            this.m_layout?.reset();

            this.updateRobot();
        });
    }

    private updateRobot() {
        (<HTMLDivElement>document.getElementById("robot")).innerText = `${this.m_name} (${this.m_address})`;
    }
}

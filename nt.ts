import { Client } from "wpilib-nt-client";
import { config } from "dotenv";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";

config();

export default class NT {
    private rio_ip: string;
    private team_number: string;
    private client: Client;
    private connected: boolean = false;
    private onCalls: any = {
        connect: () => {},
        disconnect: () => {}
    };
    private robot: any = {};
    private profileData: any;

    constructor(autoConnect: boolean = true) {
        this.team_number = "0".repeat(4 - process.env.TEAM_NUMBER.length) + process.env.TEAM_NUMBER;
        this.rio_ip = `10.${this.team_number[0]}${this.team_number[1]}.${this.team_number[2]}${this.team_number[3]}.2`;
        // this.rio_ip = "localhost";
        this.client = new Client();
        if (autoConnect) {
            this.connect();
        }
    }

    public connect(): void {
        this.client.start((isConnected: boolean, err: Error) => {
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

    public isConnected(): boolean {
        return this.connected;
    }

    private internalConnect(): void {
        setTimeout(() => {
            this.robot.name = this.client.getEntry(this.client.getKeyID("/DankDash/RobotName")).val;
            this.robot.profile = this.client.getEntry(this.client.getKeyID("/DankDash/ProfileName")).val;
            if (fs.existsSync(path.join(os.homedir(), "DANK", "profiles", `${this.robot.profile}.json`))) {
                this.profileData = JSON.parse(fs.readFileSync(path.join(os.homedir(), "DANK", "profiles", `${this.robot.profile}.json`), "utf-8"));
            } else {
                this.profileData = { _version: 2, layout: [{ type: "StaticText", style: "transform:translateX(-50%) translateY(-50%);user-select:none;font-size:30px;", x: "50%", y: "50%", z: "100", text: `The profile '${this.robot.profile}' isn't installed` }] };
            }
            this.onCalls.connect();
        }, 500);
    }

    private internalDisconnect(): void {
        this.onCalls.disconnect();
        setTimeout(() => {
            this.connect();
        }, 750);
    }

    public getRobotName(): string {
        return this.robot.name;
    }

    public getProfileName(): string {
        return this.robot.profile;
    }

    public getProfileData(): any {
        return this.profileData;
    }

    public on(name: string, func: any) {
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

    public getValue(key: string): string {
        return this.client.getEntry(this.client.getKeyID(key)).val;
    }
}

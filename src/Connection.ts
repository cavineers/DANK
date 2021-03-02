import EventEmitter from "events";
import Constants from "./Constants";

export default class Connection extends EventEmitter {
    private m_addresses: string[] = [`ws://${Constants.kRioAddress}:${Constants.kPort}`, `ws://localhost:${Constants.kPort}`];

    private m_currentAddr: number = 0;

    private m_connection: WebSocket | null = null;

    private m_connected: boolean = false;

    constructor() {
        super();
    }

    public connect(): void {
        console.log("Attempting Connect");

        this.m_connection = new WebSocket(this.m_addresses[this.m_currentAddr]);

        this.m_connection.addEventListener("open", (event) => {
            console.log("opened", event);

            this.emit("connected", { address: this.m_addresses[this.m_currentAddr] });
        });

        this.m_connection.addEventListener("close", (event) => {
            console.log("closed", event);

            this.emit("closed");
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
            console.log("message", message);

            let type: string = message.data.substring(0, 2);
            let content: string = message.data.substring(3);

            console.log(type);

            switch (type) {
                case "00":
                    this.m_connection?.send("01;pong");
                    break;
                case "01":
                    this.m_connection?.send("01;ping");
                    break;
                case "02":
                    this.emit("02", content);
                    console.log("02");
                    break;
                case "03":
                    console.log("03", content);
                    this.emit("message", content);
                    break;
                case "05":
                    console.log("robot year", content);
                    break;
                case "06":
                    console.log("robot name", content);
                    this.emit("06", content);
                    break;
                default:
                    break;
            }
        });
    }
}

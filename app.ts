import NT from "./nt";
import v2Layout from "./v2Layout";
import * as Mousetrap from "mousetrap";
import * as electron from "electron";

let nt: NT = new NT(false);
let interval: any;
let WIN: electron.BrowserWindow = electron.remote.getCurrentWindow();

nt.on("connect", () => {
    console.log("Connected");
    //@ts-ignore
    M.toast({ html: `<span style="color:lightgreen;">Connected to ${nt.getRobotName()}<span>` });
    setTimeout(() => {
        let data: any = nt.getProfileData();
        console.log(data);
        if (data._version == 2) {
            let v2 = new v2Layout(data, nt).build().display();
            //@ts-ignore
            M.toast({ html: `Loaded profile ${nt.getProfileName()}` });
            setTimeout(() => {
                this.setInterval(() => {
                    v2.periodic();
                }, 100);
            }, 500);
        }
    }, 1000);
});
nt.on("disconnect", () => {
    clearInterval(interval);
    console.log("disconnected");
    //@ts-ignore
    M.toast({ html: `<span style="color:lightred;">Disconnected<span>` });
});

nt.connect();

Mousetrap.bind("ctrl+r", () => {
    location.reload();
});

Mousetrap.bind("f11", () => {
    WIN.setKiosk(!WIN.isKiosk());
});

import Path from "path";
import NT from "./../NT";
import Constants from "./../Constants";
export default class LayoutV3 {
    private html: string = "";
    private listenFor: Array<{ key: string; id: string }> = [];
    private nt: NT = new NT(true, Constants.kTeamNumber);

    constructor(layout: Array<any>) {
        layout.forEach((element) => {
            switch (element.type) {
                case "CameraStream":
                    let CameraStream = document.createElement("img");
                    CameraStream.src = element.source;
                    CameraStream.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        CameraStream.style.left = element.x;
                    } else {
                        CameraStream.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        CameraStream.style.top = element.y;
                    } else {
                        CameraStream.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        CameraStream.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        CameraStream.style.cssText += element.style;
                    }
                    this.html += this.elemString(CameraStream);
                    break;
                case "StaticText":
                    let StaticText = document.createElement("div");
                    StaticText.innerHTML = element.text;
                    StaticText.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        StaticText.style.left = element.x;
                    } else {
                        StaticText.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        StaticText.style.top = element.y;
                    } else {
                        StaticText.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        StaticText.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        StaticText.style.cssText += element.style;
                    }
                    this.html += this.elemString(StaticText);
                    break;
                case "Container":
                    let Container = document.createElement("div");
                    Container.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        Container.style.left = element.x;
                    } else {
                        Container.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        Container.style.top = element.y;
                    } else {
                        Container.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        Container.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        Container.style.cssText += element.style;
                    }
                    this.html += this.elemString(Container);
                    break;
                case "Image":
                    let Image = document.createElement("img");
                    Image.src = Path.join(__dirname, "assets", "img", `${element.source}`);
                    Image.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        Image.style.left = element.x;
                    } else {
                        Image.style.right = element.x;
                    }
                    if (element.z != undefined) {
                        Image.style.zIndex = element.z;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        Image.style.top = element.y;
                    } else {
                        Image.style.bottom = element.y;
                    }
                    if (element.style != undefined) {
                        Image.style.cssText += element.style;
                    }
                    this.html += this.elemString(Image);
                    break;
                case "DynamicText":
                    let DynamicText = document.createElement("div");
                    DynamicText.innerHTML = this.nt.getValue(element.key);
                    DynamicText.style.position = "absolute";
                    DynamicText.id = this.genID();
                    if (element.xReversed == undefined || element.xReversed == false) {
                        DynamicText.style.left = element.x;
                    } else {
                        DynamicText.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        DynamicText.style.top = element.y;
                    } else {
                        DynamicText.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        DynamicText.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        DynamicText.style.cssText += element.style;
                    }
                    this.listenFor.push({ key: element.key, id: DynamicText.id });
                    this.html += this.elemString(DynamicText);
                    break;
                case "AllianceContainer":
                    let AllianceContainer = document.createElement("div");
                    AllianceContainer.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        AllianceContainer.style.left = element.x;
                    } else {
                        AllianceContainer.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        AllianceContainer.style.top = element.y;
                    } else {
                        AllianceContainer.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        AllianceContainer.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        AllianceContainer.style.cssText += element.style;
                    }
                    if (this.nt.getValue("/FMSInfo/IsRedAlliance")) {
                        AllianceContainer.style.backgroundColor = "red";
                    } else {
                        AllianceContainer.style.backgroundColor = "blue";
                    }
                    this.html += this.elemString(AllianceContainer);
                    break;
                default:
                    throw new Error("Unknown layout module");
            }
        });

        console.log(this.html);
        (<HTMLDivElement>document.getElementById("content")).innerHTML = this.html;
    }

    private elemString(node: HTMLElement) {
        let tmpNode = document.createElement("div");
        tmpNode.appendChild(node.cloneNode(true));
        let str = tmpNode.innerHTML;
        return str;
    }

    private genID(): string {
        return "_" + Math.random().toString(36).substr(2, 9);
    }

    public periodic(): void {
        this.listenFor.forEach((ele) => {
            let data: any = this.nt.getValue(ele.key);
            if (ele.key == "/DankDash/MatchTime") {
                data = `${Math.floor(data / 60)}:${"0".repeat(data % 60 < 10 ? 1 : 0)}${data % 60}`;
            }
            (<HTMLDivElement>document.getElementById(ele.id)).innerHTML = data;
        });
    }

    public reset(): void {
        this.listenFor = [];
    }
}

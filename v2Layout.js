"use strict";
exports.__esModule = true;
var path = require("path");
var v2Layout = (function () {
    function v2Layout(data, nt) {
        this.html = "";
        this.listenFor = [];
        this.data = data;
        this.nt = nt;
    }
    v2Layout.prototype.build = function () {
        var _this = this;
        this.data.layout.forEach(function (element) {
            switch (element.type) {
                case "CameraStream":
                    var CameraStream = document.createElement("img");
                    CameraStream.src = element.source;
                    CameraStream.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        CameraStream.style.left = element.x;
                    }
                    else {
                        CameraStream.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        CameraStream.style.top = element.y;
                    }
                    else {
                        CameraStream.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        CameraStream.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        CameraStream.style.cssText += element.style;
                    }
                    _this.html += _this.elemString(CameraStream);
                    break;
                case "StaticText":
                    var StaticText = document.createElement("div");
                    StaticText.innerHTML = element.text;
                    StaticText.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        StaticText.style.left = element.x;
                    }
                    else {
                        StaticText.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        StaticText.style.top = element.y;
                    }
                    else {
                        StaticText.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        StaticText.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        StaticText.style.cssText += element.style;
                    }
                    _this.html += _this.elemString(StaticText);
                    break;
                case "Container":
                    var Container = document.createElement("div");
                    Container.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        Container.style.left = element.x;
                    }
                    else {
                        Container.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        Container.style.top = element.y;
                    }
                    else {
                        Container.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        Container.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        Container.style.cssText += element.style;
                    }
                    _this.html += _this.elemString(Container);
                    break;
                case "Image":
                    var Image_1 = document.createElement("img");
                    Image_1.src = path.join(__dirname, "assets", "img", "" + element.source);
                    Image_1.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        Image_1.style.left = element.x;
                    }
                    else {
                        Image_1.style.right = element.x;
                    }
                    if (element.z != undefined) {
                        Image_1.style.zIndex = element.z;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        Image_1.style.top = element.y;
                    }
                    else {
                        Image_1.style.bottom = element.y;
                    }
                    if (element.style != undefined) {
                        Image_1.style.cssText += element.style;
                    }
                    _this.html += _this.elemString(Image_1);
                    break;
                case "DynamicText":
                    var DynamicText = document.createElement("div");
                    DynamicText.innerHTML = _this.nt.getValue(element.key);
                    DynamicText.style.position = "absolute";
                    DynamicText.id = _this.genID();
                    if (element.xReversed == undefined || element.xReversed == false) {
                        DynamicText.style.left = element.x;
                    }
                    else {
                        DynamicText.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        DynamicText.style.top = element.y;
                    }
                    else {
                        DynamicText.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        DynamicText.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        DynamicText.style.cssText += element.style;
                    }
                    _this.listenFor.push({ key: element.key, id: DynamicText.id });
                    _this.html += _this.elemString(DynamicText);
                    break;
                case "AllianceContainer":
                    var AllianceContainer = document.createElement("div");
                    AllianceContainer.style.position = "absolute";
                    if (element.xReversed == undefined || element.xReversed == false) {
                        AllianceContainer.style.left = element.x;
                    }
                    else {
                        AllianceContainer.style.right = element.x;
                    }
                    if (element.yReversed == undefined || element.yReversed == false) {
                        AllianceContainer.style.top = element.y;
                    }
                    else {
                        AllianceContainer.style.bottom = element.y;
                    }
                    if (element.z != undefined) {
                        AllianceContainer.style.zIndex = element.z;
                    }
                    if (element.style != undefined) {
                        AllianceContainer.style.cssText += element.style;
                    }
                    if (_this.nt.getValue("/FMSInfo/IsRedAlliance")) {
                        AllianceContainer.style.backgroundColor = "red";
                    }
                    else {
                        AllianceContainer.style.backgroundColor = "blue";
                    }
                    _this.html += _this.elemString(AllianceContainer);
                    break;
                default:
                    throw new Error("Unknown layout module");
            }
        });
        return this;
    };
    v2Layout.prototype.display = function () {
        document.getElementById("layout").innerHTML = this.html;
        return this;
    };
    v2Layout.prototype.elemString = function (node) {
        var tmpNode = document.createElement("div");
        tmpNode.appendChild(node.cloneNode(true));
        var str = tmpNode.innerHTML;
        return str;
    };
    v2Layout.prototype.genID = function () {
        return ("_" +
            Math.random()
                .toString(36)
                .substr(2, 9));
    };
    v2Layout.prototype.periodic = function () {
        var _this = this;
        this.listenFor.forEach(function (ele) {
            var data = _this.nt.getValue(ele.key);
            if (ele.key == "/DankDash/MatchTime") {
                data = Math.floor(data / 60) + ":" + "0".repeat(data % 60 < 10 ? 1 : 0) + data % 60;
            }
            document.getElementById(ele.id).innerHTML = data;
        });
    };
    return v2Layout;
}());
exports["default"] = v2Layout;

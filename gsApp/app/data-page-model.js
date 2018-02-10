"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var frameModule_1 = require("ui/frame");
var utils_1 = require("tns-core-modules/utils/utils");
var platform_1 = require("tns-core-modules/platform");
var fs = require("tns-core-modules/file-system");
var http= require('http');

var firebase = require("nativescript-plugin-firebase");

var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //_this.onAuthStateChangedHandlerSet = false;
        return _this;
    }
    
    HelloWorldModel.prototype.doSendData = function () {
        var _this = this;
        var dataToSend = _this.get("data");
        _this.set("data","");
        console.log(dataToSend);

        http.request({
            url: "http://192.168.43.241:5000",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ data: dataToSend })
        }).then(function (response) {
            result = response.content.toJSON();
            console.log(result);
        }, function (e) {
            console.log("Error occurred " + e);
        });

    };

    HelloWorldModel.prototype.doLogout = function () {
        console.log("Logout");
        var _this = this;
        firebase.logout().then(function () {
            //console.log("logged out");
        }, function (error) {
            dialogs_1.alert({
                title: "Logout error",
                message: error,
                okButtonText: "Hmmkay"
            });
        });
    };
    

    function navigante() {
        var topmost = frameModule_1.topmost();
        topmost.navigate("main-page");
    }

    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var frameModule_1 = require("ui/frame");
var utils_1 = require("tns-core-modules/utils/utils");
var platform_1 = require("tns-core-modules/platform");
var fs = require("tns-core-modules/file-system");

var firebase = require("nativescript-plugin-firebase");

var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onAuthStateChangedHandlerSet = false;
        doInit();
        return _this;
    }
    
    HelloWorldModel.prototype.doFacebookLogin = function () {
        firebase.login({
            type: firebase.LoginType.FACEBOOK
        }).then(function (result) {
            dialogs_1.alert({
                title: "Login OK",
                message: JSON.stringify(result),
                okButtonText: "Nice!"
            });
        }, function (errorMessage) {
            dialogs_1.alert({
                title: "Login error",
                message: errorMessage,
                okButtonText: "OK"
            });
        });
    };

    HelloWorldModel.prototype.doEmailLogin = function () {
        var _this = this;
        let email = _this.get("email"),
            password = _this.get("password");
        if(email === undefined || password ===undefined) {
            dialogs_1.alert({
                title: "Empty credentials",
                message: "email and password can't be empty!",
                okButtonText: "okay"
            });
        } else if(!email.includes("@")) {
            dialogs_1.alert({
                title: "invalid email",
                message: "enter complete email address",
                okButtonText: "okay"
            });
        } else {
            firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: email,
                    password: password
                }
            }).then(function (result) {
                firebase.getAuthToken({
                    forceRefresh: false
                }).then(function (token) {
                    console.log("Auth token retrieved: " + token);
                }, function (errorMessage) {
                    console.log("Auth token retrieval error: " + errorMessage);
                });
            }, function (errorMessage) {
                dialogs_1.alert({
                    title: "Login error",
                    message: errorMessage,
                    okButtonText: "OK"
                });
            });
        }
    };

    function navigante() {
        var topmost = frameModule_1.topmost();
        topmost.navigate("data-page");
    }

    function goHome() {
        var topmost = frameModule_1.topmost();
        topmost.navigate("main-page");
    }

    function doInit () {
        var _this = this;
        //console.log("init firebase");
        firebase.init({
            storageBucket: "gs://gsapp-1c27c.appspot.com",
            persist: true,
            onAuthStateChanged: function (data) {
                console.log((data.loggedIn ? "Logged in to firebase" : "Logged out from firebase") + " (init's onAuthStateChanged callback)");
                if (data.loggedIn) {
                    console.log("logged in");
                    navigante();
                } else {
                    let topmost_1 = frameModule_1.topmost().currentPage;
                    if (topmost_1 !== null)
                        if (topmost_1.toString().split('app/')[1].split('.xml')[0] != 'main-page')
                            goHome();
                }
            }
        }).then(function () {
            console.log("Firebase is ready");
        }, function (error) {
            console.log("firebase.init error: " + error);
        });
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;

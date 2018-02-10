"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_page_model_1 = require("./data-page-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new data_page_model_1.HelloWorldModel();
}
exports.pageLoaded = pageLoaded;

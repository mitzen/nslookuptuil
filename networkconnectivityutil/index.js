"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const nslookup_1 = require("./nslookup");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const servers = tl.getInput('servers', true);
            if (servers == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Server names must be provided.');
                return;
            }
            if (servers != null)
                yield (0, nslookup_1.execute)(servers);
            console.log('done');
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();

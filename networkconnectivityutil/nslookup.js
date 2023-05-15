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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const dns_1 = __importDefault(require("dns"));
function execute(servers) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Target servers', servers);
        var result = getServerNames(servers);
        yield dumpProxyInfo();
        // Execute wit normal proxy
        yield executeNsLookup(result);
        // Execute with proxy off
        yield executeNsLookupProxyEnvSetToEmpty(result);
    });
}
exports.execute = execute;
;
function setEnvironmentVariable(env, value) {
    return __awaiter(this, void 0, void 0, function* () {
        process.env[env] = value;
    });
}
function executeNsLookupProxyEnvSetToEmpty(result) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Switching to empty proxy configuration");
        yield setEnvironmentVariable('HTTP_PROXY', '');
        yield setEnvironmentVariable('HTTPS_PROXY', '');
        yield executeNsLookup(result);
    });
}
function executeNsLookup(result) {
    return __awaiter(this, void 0, void 0, function* () {
        result.forEach(server => {
            console.log(`Running nslookup on ${server}`);
            console.log(`-------------------------------------------------------`);
            let cmdToExecute = `nslookup ${server}`;
            console.log(cmdToExecute);
            dns_1.default.resolveAny(`${server}`, (err, result) => console.log(result));
            console.log(`-------------------------------------------------------`);
        });
    });
}
function getServerNames(servers) {
    var arr = servers.split(",").map(function (item) {
        return item.trim();
    });
    return arr;
}
function dumpProxyInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const HTTP_PROXY = 'HTTP_PROXY';
        const HTTPS_PROXY = 'HTTPS_PROXY';
        const NO_PROXY = 'NO_PROXY';
        try {
            console.log(`${HTTP_PROXY}=`, process.env[`${HTTP_PROXY}`]);
            console.log(`${HTTPS_PROXY}=`, process.env[`${HTTPS_PROXY}`]);
            console.log(`${NO_PROXY}=`, process.env[`${NO_PROXY}`]);
            console.log(`${HTTP_PROXY}=`, process.env[`${HTTP_PROXY}`]);
            console.log(`${HTTPS_PROXY}=`, process.env[`${HTTPS_PROXY}`]);
            console.log(`${NO_PROXY}=`, process.env[`${NO_PROXY}`]);
            console.log(`${HTTP_PROXY.toLowerCase()}=`, process.env[`${HTTP_PROXY}.toLowerCase()`]);
            console.log(`${HTTPS_PROXY.toLowerCase()}=`, process.env[`${HTTPS_PROXY.toLowerCase()}`]);
            console.log(`${NO_PROXY.toLowerCase()}=`, process.env[`${NO_PROXY.toLowerCase()}`]);
        }
        catch (error) {
            console.log(error);
        }
    });
}

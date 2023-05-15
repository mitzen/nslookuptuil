import { exec } from 'child_process';
import dns from 'dns';

export async function execute(servers: string)
{
    console.log('Target servers', servers);
    var result = getServerNames(servers)
    
    await dumpProxyInfo();
    // Execute wit normal proxy
    await executeNsLookup(result);
    // Execute with proxy off
    await executeNsLookupProxyEnvSetToEmpty(result);
};

async function setEnvironmentVariable(env: string, value: any): Promise<void> {
    process.env[env] = value;
}

async function executeNsLookupProxyEnvSetToEmpty(result: string[]) {

    console.log("Switching to empty proxy configuration")
    await setEnvironmentVariable('HTTP_PROXY', '');    
    await setEnvironmentVariable('HTTPS_PROXY', '');
    await executeNsLookup(result);
}

async function executeNsLookup(result: string[]) {
    result.forEach(server => {
        
        console.log(`Running nslookup on ${server}`);
        console.log(`-------------------------------------------------------`);
        let cmdToExecute = `nslookup ${server}`;

        console.log(cmdToExecute);        
        dns.resolveAny(`${server}`, (err: any, result: any) =>
        console.log(result));
        console.log(`-------------------------------------------------------`);
    });
}

function getServerNames(servers: string): string[] {
    var arr = servers.split(",").map(function(item) {
        return item.trim();
    });
    return arr;
}


async function dumpProxyInfo() {

    const HTTP_PROXY='HTTP_PROXY';
    const HTTPS_PROXY='HTTPS_PROXY';
    const NO_PROXY='NO_PROXY';

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

    } catch (error) {
        console.log(error);
    }
} 
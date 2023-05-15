import dns from 'dns';
import { setTimeout } from 'timers/promises';

export async function execute(servers: string)
{
    console.log('Target servers', servers);
    var result = await getServerNames(servers)
    
    await dumpProxyInfo();
    // Execute wit normal proxy
    await executeNsLookup(result);
    // // Execute with proxy off
    // await executeNsLookupProxyEnvSetToEmpty(result);
};

async function executeNsLookupProxyEnvSetToEmpty(result: string[]) {
    console.log("Switching to empty proxy configuration")
    await setEnvironmentVariable('HTTP_PROXY', '');    
    await setEnvironmentVariable('HTTPS_PROXY', '');
    await executeNsLookup(result);
}

async function executeNsLookup(result: string[]) {
    for (var server of result)
    {
        console.log(`Running nslookup on ${server}`);
        console.log(`-------------------------------------------------------`);
        
        try {
            
            let result = await resolveDns(server);
            // return (async function() { 
            //     dns.resolveAny(`${server}`, (err: any, result: any) => console.log(result));
            // })();
            await setTimeout(500);

            console.log(result);
            console.log(`-------------------------------------------------------`);
            
        } catch (error: any) {
            console.log(error);
        }
        
    }
    
    // result.forEach(server => {       
    //     console.log(`Running nslookup on ${server}`);
    //     console.log(`-------------------------------------------------------`);
    
    //     resolveDns(server);
    //     // return (async function() { 
    //     //     dns.resolveAny(`${server}`, (err: any, result: any) => console.log(result));
    //     // })();
    //     console.log(`-------------------------------------------------------`);
    // });
}

async function resolveDns(server: string) { 
    console.log("resolvedns", server);
    return new Promise((resolve, reject) => {
        dns.resolveAny(`${server}`, (err: any, result: any) => 
        { 
            if (err) 
                reject(err);
            console.log(result);
            resolve(result);
        });
    });
}

async function getServerNames(servers: string): Promise<string[]> {
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

async function setEnvironmentVariable(env: string, value: any): Promise<void> {
    process.env[env] = value;
}

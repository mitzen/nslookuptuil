const { exec } = require('child_process');

export async function execute(servers: string)
{
    console.log('Target servers', servers);
    var result = getServerNames(servers)
    
    // Execute wit normal proxy
    await executeNsLookup(result);
    // Execute with proxy off
    await executeNsLookupProxyEnvSetToEmpty(result);
};

function setEnvironmentVariable(env: string, value: any): void {
    process.env[env] = value;
}

function executeNsLookupProxyEnvSetToEmpty(result: string[]) {
    setEnvironmentVariable('HTTP_PROXY', '');    
    setEnvironmentVariable('HTTPS_PROXY', '');
    executeNsLookup(result);
}

async function executeNsLookup(result: string[]) {
    result.forEach(server => {
        
        console.log(`Running nslookup on ${server}`);
        console.log(`-------------------------------------------------------`);
        
        exec(`nslookup -debug www.google.com`, (err: any, stdout: string, stderr: string) => {
            if (err) {
                console.log("command cannot be executed");
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
        
        console.log(`-------------------------------------------------------`);
    });
}

function getServerNames(servers: string): string[] {
    var arr = servers.split(",").map(function(item) {
        return item.trim();
    });
    return arr;
}


import tl = require('azure-pipelines-task-lib/task');
const { exec } = require('child_process');

async function run() {
    try {
        const servers: string | undefined = tl.getInput('servers', true);
        if (servers == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('Target servers', servers);
        console.log("Performing nslookup");
        
        exec(`nslookup -debug www.google.com`, (err: any, stdout: string, stderr: string) => {
            if (err) {
              // node couldn't execute the command
              return;
            }
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });
    }
    catch (err: any) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
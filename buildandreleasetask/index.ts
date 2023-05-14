import tl = require('azure-pipelines-task-lib/task');
import { execute } from './nslookup';

async function run() {
    try {
        const servers: string | undefined = tl.getInput('servers', true);
        
        if (servers == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Server names must be provided.');
            return;
        }

        if (servers != null)
            await execute(servers);

        console.log('done')
    }
    catch (err: any) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
import {spawn} from "child_process";
import path from "path";
import {readdir, stat as fsStat} from 'fs/promises'
import assert from "node:assert";

const dropboxRoot = process.argv[2];
assert(dropboxRoot, `dropbox root cannot be null`);

const nodeModules = await listNodeModules(dropboxRoot);
console.log(`found ${nodeModules.length} "node_modules"`);

for(const dir of nodeModules) {
    await runTask(`Set-Content -Path '${dir}' -Stream com.dropbox.ignored -Value 1`);
}
console.log(`done!`);

function runTask(command: string) {
    return new Promise((resolve, reject) => {
        const child = spawn("powershell.exe", [command]);
        child.stdout.on("data", function (data) {
            console.log(`Powershell Data: ${data}`);
        });
        child.stderr.on("data", function (data) {
            reject(data);
        });
        child.on("exit", function () {
            console.log(`${command} finished`);
            resolve(true);
        });

        child.stdin.end(); //end input
    });
}

async function listNodeModules(dir: string): Promise<string[]> {
    const results: string[] = [];

    if(dir.endsWith('node_modules')){
        results.push(dir);
        console.log(`found ${dir}`);
        return results;
    }

    const list = await readdir(dir);
    if (!list.length) {
        return results;
    }

    for (let file of list) {
        file = path.join(dir, file);
        const stat = await fsStat(file);
        if (stat && stat.isDirectory()) {

            results.push(...(await listNodeModules(file)));
        }
    }

    return results;
}

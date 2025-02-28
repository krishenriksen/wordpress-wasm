const gulp = require('gulp');
const path = require('path');
const { spawn } = require('child_process');

const sourceDir = __dirname;
const buildDir = path.join(__dirname, '..', 'build-wp');

async function buildWordPress() {
    // Build WordPress
    await asyncSpawn('docker', [
        'build', '.',
        '--tag=wordpress-wasm',
        '--progress=plain',
        ...(process.env.WP_ZIP_URL ? ['--build-arg', `WP_ZIP_URL=${wpZipUrl}`] : []),
    ], { cwd: sourceDir, stdio: 'inherit' });

    // Extract the built WordPress files
    await asyncSpawn('docker', [
        'run',
        '--name', 'wordpress-wasm-tmp',
        '--rm',
        '-v', `${buildDir}:/output`,
        'wordpress-wasm',
        // Use sh -c because wildcards are a shell feature and
        // they don't work without running cp through shell.
        'sh', '-c', `cp -r /root/output/* /output/`,
    ], { cwd: sourceDir, stdio: 'inherit' });
}

exports.build = buildWordPress;

function asyncSpawn(...args) {
    return new Promise((resolve, reject) => {
        const child = spawn(...args);

        child.on('close', (code) => {
            if (code === 0) resolve(code);
            else reject(new Error(`Process exited with code ${code}`));
        });
    });
}

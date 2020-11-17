/**
 * Import vendor modules
 */
const sodium = require('tweetsodium');

/**
 * Export the GitHub action functions
 */
module.exports = {
    /**
     * Add a secret to a GitHub repository
     *
     * @param org
     * @param repository
     * @param name
     * @param secret
     * @return {Promise<void>}
     */
    addSecret: async (org, repository, name, secret) => {
        const publicKey = await global.octokit.request('GET /repos/{owner}/{repo}/actions/secrets/public-key', {
            owner: org,
            repo: repository
        }).catch((e) => {
            if(global.verbose) {
                console.error(e);
                process.exit(1);
            } else {
                console.error('ERR!');
                process.exit(1);
            }
        });

        if(publicKey.status === 200) {
            if(global.verbose) {
                console.log(publicKey);
            }
        } else {
            if(global.verbose) {
                console.error(publicKey);
                process.exit(1);
            } else {
                console.error('ERR!');
                process.exit(1);
            }
        }

        // Convert the message and key to Uint8Array's (Buffer implements that interface)
        const messageBytes = Buffer.from(secret);
        const keyBytes = Buffer.from(publicKey.data.key, 'base64');

        // Encrypt using LibSodium.
        const encryptedBytes = sodium.seal(messageBytes, keyBytes);

        // Base64 the encrypted secret
        const encrypted = Buffer.from(encryptedBytes).toString('base64');

        const response = await global.octokit.request('PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
            owner: org,
            repo: repository,
            secret_name: name,
            encrypted_value: encrypted,
            key_id: publicKey.data.key_id
        }).catch((e) => {
            if(global.verbose) {
                console.error(e);
                process.exit(1);
            } else {
                console.error('ERR!');
                process.exit(1);
            }
        });

        if(response.status === 201 || response.status === 204) {
            if(global.verbose) {
                console.log(response);
                process.exit(0);
            } else {
                console.log('OK!');
                process.exit(0);
            }
        } else {
            if(global.verbose) {
                console.error(response);
                process.exit(1);
            } else {
                console.error('ERR!');
                process.exit(1);
            }
        }
    }
};

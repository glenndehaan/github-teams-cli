/**
 * Export the GitHub repo functions
 */
module.exports = {
    /**
     * Create a new GitHub repository
     *
     * @param org
     * @param name
     * @return {Promise<void>}
     */
    create: async (org, name) => {
        const response = await global.octokit.request('POST /orgs/{org}/repos', {
            org: org,
            name: name,
            private: true
        }).catch((e) => {
            if(global.verbose) {
                console.error(e);
                process.exit(1);
            } else {
                console.error('ERR!');
                process.exit(1);
            }
        });

        if(response.status === 201) {
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
    },

    /**
     * Add team access to a repository
     *
     * @param org
     * @param repository
     * @param team
     * @return {Promise<void>}
     */
    teamAccess: async (org, repository, team) => {
        const response = await global.octokit.request('PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
            org: org,
            team_slug: team,
            owner: org,
            repo: repository,
            permission: 'push'
        }).catch((e) => {
            if(global.verbose) {
                console.error(e);
                process.exit(1);
            } else {
                console.error('ERR!');
                process.exit(1);
            }
        });

        if(response.status === 204) {
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

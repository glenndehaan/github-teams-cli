/**
 * Import vendor modules
 */
const { Octokit } = require("@octokit/core");

/**
 * Setup the GitHub library
 *
 * @param token
 */
module.exports = (token) => {
    global.octokit = new Octokit({ auth: token });
};

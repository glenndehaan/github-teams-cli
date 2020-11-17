/**
 * Import vendor modules
 */
const program = require('commander');
const atob = require('atob');

/**
 * Import own modules
 */
const verbose = require('./utils/verbose');
const github = require('./utils/github');
const actions = require('./github/actions');
const repos = require('./github/repos');

/**
 * Set global vars
 */
let subcommand = false;

/**
 * Set application name
 */
program.name('github-teams-cli');

/**
 * Setup application arguments
 */
program
    .requiredOption('-t, --token <value>', 'set the GitHub authentication token')
    .option('-b, --base64', 'toggles the secret input to base64')
    .option('-v, --verbose', 'output extra debugging');

/**
 * Setup application commands
 */
program
    .command('create-repository <org> <name>')
    .description('create a GitHub repository')
    .action((org, name) => {
        subcommand = true;
        verbose(program.verbose);
        github(program.token);
        repos.create(org, name);
    });
program
    .command('add-team-access <org> <repository> <team>')
    .description('give a team write permissions on a repository')
    .action((org, repository, team) => {
        subcommand = true;
        verbose(program.verbose);
        github(program.token);
        repos.teamAccess(org, repository, team);
    });
program
    .command('add-secret <org> <repository> <name> <secret>')
    .description('add a secret to a GitHub repository')
    .action((org, repository, name, secret) => {
        subcommand = true;
        verbose(program.verbose);
        github(program.token);

        const secretPass = program.base64 ? atob(secret) : secret;
        actions.addSecret(org, repository, name, secretPass);
    });

/**
 * Let commander handle process arguments
 */
program.parse(process.argv);

/**
 * Run help when no command is given
 */
if (!subcommand) {
    program.outputHelp();
}

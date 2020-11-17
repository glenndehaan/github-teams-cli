# GitHub Teams CLI

A simple CLI to get stuff automated for teams

## Structure
- NodeJS
- Commander
- Tweetsodium
- Octokit

## Basic Usage
- Download the latest version from the releases page on GitHub
- Save the binary in its own folder
- Run the binary `./github-teams-cli-xxx`

## Development Usage
- Install NodeJS 14.0 or higher
- Run `npm install` in the root project folder

## Help
```
Usage: github-teams-cli [options] [command]

Options:
  -t, --token <value>                            set the GitHub authentication token
  -b, --base64                                   toggles the secret input to base64
  -v, --verbose                                  output extra debugging
  -h, --help                                     display help for command

Commands:
  create-repository <org> <name>                 create a GitHub repository
  add-team-access <org> <repository> <team>      give a team write permissions on a repository
  add-secret <org> <repository> <name> <secret>  add a secret to a GitHub repository
  help [command]                                 display help for command
```

## License

MIT

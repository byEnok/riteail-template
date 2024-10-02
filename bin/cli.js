#!/usr/bin/env node

import { execSync } from 'child_process';

const runCommand = command => {
  try {
    execSync(`${command}`, {stdio: 'inherit'});
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
}

const projectName = process.argv[2] || 'riteail-project';
// Clone the template repository from GitHub
// const gitCheckoutCommand = `git clone https://github.com/byEnok/riteail-template.git ${projectName}` 
// Basic Dependencies install
const installDepsCommand = `cd ${projectName} && npm install}`
// Remove the .git folder 
const removeGitFolderCommand = `cd ${projectName} && rm -rf .git`;



// Step 1: Clone the project
// console.log(`Creating project: ${projectName}`);
// const checkedOut = runCommand(gitCheckoutCommand)
// if (!checkedOut) process.exit(-1) 


// Step 2: Remove the .git folder so the new project has its own local git history
console.log(`Removing .git history from the template`);
runCommand(removeGitFolderCommand);
// if (!removeGitFolderCommand) process.exit(-1)

// Step 3: Install dependencies
console.log(`Installing dependencies for ${projectName}`)
const installedDeps = runCommand(installDepsCommand)
if (!installedDeps) process.exit(-1)


console.log(`Project ${projectName} created successfully!`);
console.log('Next steps:');
console.log(`  cd ${projectName}`);
console.log('  git init');  // Initialize a new local git repository
console.log('  git add .');  // Add the initial files to the new repository
console.log(`  git commit -m "Initial commit from ${projectName}"`);
console.log('  npm run dev');

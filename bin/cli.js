#!/usr/bin/env node

import { execSync } from 'child_process';
import path from "path";
import fs from "fs";

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

// Determine the target directory (current directory or a new one)
const targetDir = projectName === '.' ? process.cwd() : path.join(process.cwd(), projectName);

// Install dependencies
const installDepsCommand = `cd ${targetDir} && npm install`

// Remove the .git folder 
const removeGitFolderCommand = `cd ${targetDir} && rm -rf .git`;


// Check if the folder already exists
if (projectName !== "," && fs.existsSync(targetDir)) {
  console.error(`Error: Directory ${targetDir} already exists. Please choose a different project name.`);
  process.exit(1);
}

// Create a new folder if projectName isn't "."
if (projectName !== '.') {
  fs.mkdirSync(targetDir);
}

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

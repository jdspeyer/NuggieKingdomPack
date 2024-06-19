/**
 * sync_manifest.js
 * 
 * Utilizes the CurseForge API to sync the mods folder with the manifest.json file.
 */

/// File fetching service for reading in the manifest.json file.
const fs = require('fs');

/// Directories for reference in rest of file.
const MANIFEST_PATH = "../manifest.json";
const MOD_PATH = "../mods/"

/**
 * Main function for the script.
 * This is executed at file entry- Async so we can await api calls when necessary.
 */
async function main(){
}

/**
 * 
 */
async function readManifest(){
    
}


async function checkModExists(){}

async function downloadModFromCurseForge(){}

/// FILE ENTRY POINT
main();
/**
 * sync_manifest.js
 * 
 * Utilizes the CurseForge API to sync the mods folder with the manifest.json file.
 */

/// File fetching service for reading in the manifest.json file.
const fs = require('fs').promises;
const env = require('dotenv').config();

// Access the API key from process.env
const API_KEY = process.env.API_KEY;

/// Directories for reference in rest of file.
const MANIFEST_PATH = "../manifest.json";
const MOD_PATH = "../mods/"

/**
 * Main function for the script.
 * This is executed at file entry- Async so we can await api calls when necessary.
 */
async function main(){
    /// Fetch the manifest.json file from the directory (this should be
    /// the main working directory of the repository/ modpack)
    const manifestFileJson = await readManifest(MANIFEST_PATH);
    const manifestFileMods = manifestFileJson.files
    const manifestFileGameVersion = manifestFileJson.minecraft.version

    /// Loop through the manifest mods and attempt to download them from the manifest.json file.
    for(const mod of manifestFileMods){
        await checkModExists(manifestFileGameVersion, mod.projectID, mod.fileID)
        console.log(mod.projectID)
    }

}

/**
 * 
 */
async function readManifest(path){
    try{
        const data = await fs.readFile(path, 'utf8');
        const jsonObject = JSON.parse(data);
        return jsonObject;
    }catch(e){
        console.error(`Error reading file: ${e}`);
        throw e;
    }
}


async function checkModExists(version, mod, fileID){
    const url = `https://api.curseforge.com/v1/mods/${mod}/files/${fileID}/download-url`
    const headers = {
        'Accept': 'application/type',
        'X-Api-Key': API_KEY
    }

    const response = await fetch(url, headers);
    console.log(response)
}

async function downloadModFromCurseForge(){}

/// FILE ENTRY POINT
main();
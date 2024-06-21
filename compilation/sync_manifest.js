/**
 * sync_manifest.js
 *
 * Utilizes the CurseForge API to sync the mods folder with the manifest.json file.
 */

/// File fetching service for reading in the manifest.json file.
const fs = require('fs').promises
const env = require('dotenv').config()
const { Curseforge } = require('node-curseforge')

// Access the API key from process.env
const API_KEY = process.env.API_KEY

const cf = new Curseforge(API_KEY)
const mc = cf.get_game('minecraft')

/// Directories for reference in rest of file.
const MANIFEST_PATH = '../manifest.json'
const MOD_PATH = '../mods/'

/**
 * Main function for the script.
 * This is executed at file entry- Async so we can await api calls when necessary.
 */
async function main () {
  /// Fetch the manifest.json file from the directory (this should be
  /// the main working directory of the repository/ modpack)
  const manifestFileJson = await readManifest(MANIFEST_PATH)
  const manifestFileMods = manifestFileJson.files
  const manifestFileGameVersion = manifestFileJson.minecraft.version

  /// Loop through the manifest mods and attempt to download them from the manifest.json file.
  for (const mod of manifestFileMods) {
    await checkModExists(manifestFileGameVersion, mod.projectID, mod.fileID)
    console.log(mod.projectID)
  }
}

/**
 *
 */
async function readManifest (path) {
  try {
    const data = await fs.readFile(path, 'utf8')
    const jsonObject = JSON.parse(data)
    return jsonObject
  } catch (e) {
    console.error(`Error reading file: ${e}`)
    throw e
  }
}

async function checkModExists (version, mod, fileID) {
  const file = await cf.get_file(mod, fileID)
  console.log(file)
}

async function downloadModFromCurseForge () {}

/// FILE ENTRY POINT
main()

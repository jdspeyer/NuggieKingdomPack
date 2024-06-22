/**
 * sync_manifest.js
 *
 * Utilizes the CurseForge API to sync the mods folder with the manifest.json file.
 */

/// File fetching service for reading in the manifest.json file.
const fs = require('fs').promises
const env = require('dotenv').config()
const { Curseforge } = require('node-curseforge')
const util = require('util')
const { exec } = require('child_process')

// Access the API key from process.env
const API_KEY = process.env.API_KEY

const cf = new Curseforge(API_KEY)
const mc = cf.get_game('minecraft')

/// Directories for reference in rest of file.
const MANIFEST_PATH = '../manifest.json'
const LOCAL_MANIFEST_PATH = '../local/manifest.json'
const NUGGIE_KINGDOM_PATH = '../../NuggieKingdomPack'

/**
 * Main function for the script.
 * This is executed at file entry- Async so we can await api calls when necessary.
 */
async function main () {
  /// Fetch the manifest.json file from the directory (this should be
  /// the main working directory of the repository/ modpack)
  const manifestFileJson = await readManifest(MANIFEST_PATH)
  const localManifestFileJson = await readManifest(LOCAL_MANIFEST_PATH)

  /// Load in the mod file pointers from the json file
  const manifestFileMods = manifestFileJson.files
  const localManifestFileMods = localManifestFileJson.files

  /// Set the manifest game version.
  const manifestFileGameVersion = manifestFileJson.minecraft.version

  /// Loop through the manifest mods and attempt to download them from the manifest.json file.
  for (const mod of manifestFileMods) {
    await checkModExists(manifestFileGameVersion, mod.projectID, mod.fileID)
  }
}

/**
 *  Reads in the manifest file from the provided path into the working directory of the modpack.
 *
 * @param {string} path Working directory that will be used to pull in the json file.
 * @returns JSON object with the mod details.
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

/**
 *
 */
function pushToGitHub () {
  runCommand('git add .', NUGGIE_KINGDOM_PATH)
  const commitMessage = 'Your commit message'
  const gitCommitCommand = `git commit -m "${commitMessage.replace(
    /"/g,
    '\\"'
  )}"` // Es
  runCommand(gitCommitCommand)
  runCommand('git push', NUGGIE_KINGDOM_PATH)
}

/**
 *
 * @param {string} command
 * @param {string} cwd
 */
function runCommand (command, cwd) {
  const options = {}
  if (cwd) {
    options.cwd = cwd
  }

  exec(command, options, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    if (stderr) {
      console.error(`stderr: ${stderr}`)
    }
  })
}

// Example usage
showMessageBox('This is a message box. Click OK to continue.')

/// FILE ENTRY POINT
main()

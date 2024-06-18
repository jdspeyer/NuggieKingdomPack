# Nuggie Kingdom Pack Overview

This file will serve as your guide to effectively using GitHub for modpack project management! Exciting stuff! 🎉

---

## Pulling In Production Changes

You will want to pull in changes everyday before you start working incase someone made additions to something you were working on while you were away.

### What Are Branches?

GitHub uses a branch system to help with project organization— each of these branches can be thought of as a different version of the project. We keep the production or final version of the project on the `main` `branch`. So we want to make sure that we pull this branch in every time we start working so we stay up to date. We do this by doing the following commands:

```bash
git checkout main
git pull
```

### I Just Pulled In Production, Now What?

Now that you have pulled in production, you need to do one of the following depending on if you are starting a new feature or working on an already in-progress feature:

- **IF NEW:** Create a **NEW**`branch` for a **NEW** feature that you are going start working on (this will use the the main production `branch` as a base for the new additions you are going to make.
    
    ```bash
    git branch <branch_name>
    git checkout <branch_name>
    ```
    
- **IF IN PROGRESS:** Merge the changes you just pulled in with the `branch` you have been working on (You will typically do this when you have been working on the same branch for a couple of days and there have been changes to the production branch while you have been working).
    
    ```bash
    git checkout <branch_name>
    git merge main
    ```
    

### Updating The Mods Folder

Due to licensing and storage issues, you cannot just upload/ download the mod .jar files to the GitHub repository; however, that does not make things that much more difficult for resuming your work. Just make sure to run this command before getting started to sync your `mannifest.json` file with your `mods` folder.

```bash
Command will go here.
```

### Get To Work!

From here, you can start working on your features/ ideas and know that you are not interfering with the work of the rest of the team! 

---

## Sharing Your Progress

To share your progress with the team you will need to push your changes back up to GitHub, so please make sure to do the following carefully.

### Export The CurseForge Project

The first thing you will do is export the CurseForge project as a `.zip` file. To do this select the 3 dots next to the `play` button on the modpack screen and select `export` .  When you do this, please leave the version number empty and unselect all folders other than the following ones:

1. Mods
2. …

Once you have done this, please save the `.zip` file into the working directory (`instances/NuggieKingdomPack/`).

### Upload Your Changes

Upload your changes that you have made to the repository by doing the following commands:

```bash
git add .
git commit -m "short description of changes"
git push
```

---

## Troubleshooting

Did you run into an error? Future errors that we run into will be documented here so that you can always refer to it and avoid extra headaches!

### It Says That My Branch Is Behind The One I Am Pushing To

This is a common issue and typically means that you are working on a feature alongside multiple other people. To fix this, you will need to pull in the changes that have been made to your local project by running:

```bash
git pull
```

If this does not work, that means that you have a merge conflict with the branch you are trying to push to (your code/files are not compatible with theirs). If this happens just let Jake know and we will resolve it and document it here.

---
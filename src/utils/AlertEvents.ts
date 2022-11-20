import {alertActions, AlertTypes} from "../slices/AlertSlice";
import {store} from "../store/store";

export const openFileCreatedEvent = (filename:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.SUCESS,
        title: "New file created",
        message: `A new file with the name ${filename} was created`
    }))
}

export const openGitHubAccountAdded = (githubAccount:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.SUCESS,
        title: "GitHub Account added",
        message: `Your GitHub Account ${githubAccount} was successfully added/updated.`
    }))
}

export const openGitHubAccountNotAdded = (githubAccount: string)=>{
    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: "GitHub Account not added/updated",
        message: `Your GitHub Account ${githubAccount} could not be added/updated. Please try again later.`
    }))
}


export const uploadToGitHubSuccessful = (filename:string, githubAccount: string, reponame:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: "GitHub Account not added/deleted",
        message: `Your file ${filename} was successfully uploaded to ${githubAccount+'/'+reponame}`
    }))
}

export const updatedFilename = (id:string, filename:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.SUCESS,
        title: "Filename updated",
        message: `Your file with id ${id} was renamed to ${filename}`
    }))
}

export const updatedFile = (filename:string)=>{
    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.SUCESS,
        title: "File saved",
        message: `Your file ${filename} was successfully saved to the database`
    }))
}

export const updatedFileErrored = (filename:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: "File not saved",
        message: `Your file ${filename} could not be saved to the database.`
    }))
}

export const displayFileNotFound = (id:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: "File not found",
        message: `Your file with id ${id} could not be found in database`
    }))
}

export const uploadToGitHubRepoNotFound = (githubAccount: string, reponame:string)=>{
    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: "GitHub repo not found.",
        message: `The repository ${githubAccount+'/'+reponame} could not be found.`
    }))
}


export const openErrorOpeningFile = (filename:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: "Error when opening file",
        message: `The file ${filename} could not be opened`
    }))
}

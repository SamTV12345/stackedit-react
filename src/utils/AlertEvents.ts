import {alertActions, AlertTypes} from "../slices/AlertSlice";
import {store} from "../store/store";

export const openFileCreatedEvent = (filename:string)=>{
    store.dispatch(alertActions.setMessage(`A new file with the name ${filename} was created`))
    store.dispatch(alertActions.setTitle("New file created"))
    store.dispatch(alertActions.setType(AlertTypes.SUCESS))
    store.dispatch(alertActions.setOpen(true))
}

export const openGitHubAccountAdded = (githubAccount:string)=>{
    store.dispatch(alertActions.setMessage(`Your GitHub Account ${githubAccount} was successfully added/updated.`))
    store.dispatch(alertActions.setTitle("GitHub Account added"))
    store.dispatch(alertActions.setType(AlertTypes.SUCESS))
    store.dispatch(alertActions.setOpen(true))
}

export const openGitHubAccountNotAdded = (githubAccount: string)=>{
    store.dispatch(alertActions.setMessage(`Your GitHub Account ${githubAccount} could not be added/updated. Please try again later.`))
    store.dispatch(alertActions.setTitle("GitHub Account not added/deleted"))
    store.dispatch(alertActions.setType(AlertTypes.ERROR))
    store.dispatch(alertActions.setOpen(true))
}


export const uploadToGitHubSuccessful = (filename:string, githubAccount: string, reponame:string)=>{
    store.dispatch(alertActions.setMessage(`Your file ${filename} was successfully uploaded to ${githubAccount+'/'+reponame}`))
    store.dispatch(alertActions.setTitle("GitHub Account not added/deleted"))
    store.dispatch(alertActions.setType(AlertTypes.ERROR))
    store.dispatch(alertActions.setOpen(true))
}

export const updatedFilename = (id:string, filename:string)=>{
    store.dispatch(alertActions.setMessage(`Your file with id ${id} was renamed to ${filename}`))
    store.dispatch(alertActions.setTitle("Filename updated"))
    store.dispatch(alertActions.setType(AlertTypes.SUCESS))
    store.dispatch(alertActions.setOpen(true))
}

export const updatedFile = (filename:string)=>{
    store.dispatch(alertActions.setMessage(`Your file ${filename} was successfully saved to the database`))
    store.dispatch(alertActions.setTitle("File saved"))
    store.dispatch(alertActions.setType(AlertTypes.SUCESS))
    store.dispatch(alertActions.setOpen(true))
}

export const updatedFileErrored = (filename:string)=>{
    store.dispatch(alertActions.setMessage(`Your file ${filename} could not be saved to the database.`))
    store.dispatch(alertActions.setTitle("File not saved"))
    store.dispatch(alertActions.setType(AlertTypes.ERROR))
    store.dispatch(alertActions.setOpen(true))
}

export const displayFileNotFound = (id:string)=>{
    store.dispatch(alertActions.setMessage(`Your file with id ${id} could not be found in database`))
    store.dispatch(alertActions.setTitle("File not found"))
    store.dispatch(alertActions.setType(AlertTypes.ERROR))
    store.dispatch(alertActions.setOpen(true))
}

export const uploadToGitHubRepoNotFound = (githubAccount: string, reponame:string)=>{
    store.dispatch(alertActions.setMessage(`The repository ${githubAccount+'/'+reponame} could not be found.`))
    store.dispatch(alertActions.setTitle("GitHub repo not found."))
    store.dispatch(alertActions.setType(AlertTypes.ERROR))
    store.dispatch(alertActions.setOpen(true))
}


export const openErrorOpeningFile = (filename:string)=>{
    store.dispatch(alertActions.setMessage(`The file ${filename} could not be opened`))
    store.dispatch(alertActions.setTitle("Error when opening file"))
    store.dispatch(alertActions.setType(AlertTypes.ERROR))
    store.dispatch(alertActions.setOpen(true))
}

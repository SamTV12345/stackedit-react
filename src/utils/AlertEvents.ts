import {alertActions, AlertTypes} from "../slices/AlertSlice";
import {store} from "../store/store";
import i18n from "../i18n/i18n";

export const openFileCreatedEvent = (filename:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.SUCESS,
        title: i18n.t('alert-new-created'),
        message: i18n.t('alert-new-file-created-explanation', {filename})
    }))
}

export const openGitHubAccountAdded = (githubAccount:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.SUCESS,
        title: i18n.t('alert-github-account-added'),
        message: i18n.t('alert-github-account-added-explanation', {username: githubAccount})
    }))
}

export const openGitHubAccountNotAdded = (githubAccount: string)=>{
    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: i18n.t('alert-github-account-added-error'),
        message: i18n.t('alert-github-account-added-error-explanation', {username: githubAccount})
    }))
}


export const uploadToGitHubSuccessful = (filename:string, githubAccount: string, reponame:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: i18n.t('alert-github-upload-error'),
        message: i18n.t('alert-github-upload-error-explanation', {filename, username: githubAccount, reponame})
    }))
}

export const updatedFilename = (id:string, filename:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.SUCESS,
        title: i18n.t('alert-github-filename-updated'),
        message: i18n.t('alert-github-filename-updated-explanation', {filename, id})
    }))
}

export const updatedFile = (filename:string)=>{
    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.SUCESS,
        title: i18n.t('alert-updated-file'),
        message: i18n.t('alert-updated-file-explanation', {filename})
    }))
}

export const updatedFileErrored = (filename:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: i18n.t('alert-not-updated-file'),
        message: i18n.t('alert-not-updated-file-explanation', {filename})
    }))
}

export const displayFileNotFound = (id:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: i18n.t('alert-file-not-found'),
        message: i18n.t('alert-file-not-found-explanation', {id})
    }))
}

export const uploadToGitHubRepoNotFound = (githubAccount: string, reponame:string)=>{
    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: i18n.t('alert-github-repo-not-found'),
        message: i18n.t('alert-github-repo-not-found-explanation', {githubAccount, reponame})
    }))
}


export const openErrorOpeningFile = (filename:string)=>{

    store.dispatch(alertActions.setAlerting({
        open: true,
        type: AlertTypes.ERROR,
        title: i18n.t('alert-open-file-error'),
        message: i18n.t('alert-open-file-error-explanation', {filename})
    }))
}

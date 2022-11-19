import axios from "axios";
import * as Buffer from "buffer";
import {uploadToGitHubRepoNotFound, uploadToGitHubSuccessful} from "./AlertEvents";

interface UploadPayload {
    message: string,
    content: string,
    sha?: string
}


export const uploadFileToRegistry = (token: string, name: string, username: string, repo: string, content: string) => {
    const dataToTransport: UploadPayload = {
        "message": "Created from https://samtv12345.github.io/stackedit-react/",
        "content": `${Buffer.Buffer.from(content).toString('base64')}`
    }

    const requestURL = `https://api.github.com/repos/${username}/${repo}/contents/${encodeURI(name)}`
    axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

    axios.defaults.headers.Authorization = `Bearer ${token}`

    axios.get(requestURL, {
        headers: {}
    }).then(c => {
        dataToTransport.sha = c.data.sha
        axios.put(requestURL, dataToTransport)
            .then(() => console.log("Ok"))
            .catch(c => console.log(c))
    }
    ).catch(() => {
        axios.put(requestURL, dataToTransport)
            .then(() => uploadToGitHubSuccessful(name, username, repo))
            .catch(()=>uploadToGitHubRepoNotFound(username, repo))
    })

}

import axios from "axios";
import * as Buffer from "buffer";

interface UploadPayload {
    message:string,
    content:string,
    sha?:string
}


export const uploadFileToRegistry =(token:string, name:string, username:string, repo:string, content:string)=> {
    console.log(token)
    const dataToTransport:UploadPayload = {
        "message": "Created from https://samtv12345.github.io/stackedit-react/",
        "content": `${Buffer.Buffer.from(content).toString('base64')}`
    }

    const requestURL = `https://api.github.com/repos/${username}/${repo}/contents/${encodeURI(name)}`
    axios.defaults.headers.put['Content-Type'] ='application/x-www-form-urlencoded';

    axios.defaults.headers.Authorization = `Bearer ${token}`

    console.log(repo)
    axios.get(requestURL,{headers:{
        }}).then(c=>{
        dataToTransport.sha = c.data.sha
        axios.put(requestURL, dataToTransport)
            .then(()=>console.log("Ok"))
            .catch(c=>console.log(c))
    }).catch(()=>{
        axios.put(requestURL, dataToTransport)
            .then(()=>console.log("Uploaded"))
    })

}

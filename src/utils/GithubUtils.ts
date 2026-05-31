import axios from "axios";
import {uploadToGitHubRepoNotFound, uploadToGitHubSuccessful} from "./AlertEvents";

interface UploadPayload {
    message: string,
    content: string,
    sha?: string
}

// Minimal surface of the HTTP client used here. Injectable so the upload flow
// can be tested without network access and without touching axios globals.
export interface GithubHttpClient {
    get(url: string): Promise<{ data: { sha?: string } }>
    put(url: string, body: UploadPayload): Promise<unknown>
}

// UTF-8 safe base64 encoding (btoa alone mangles multi-byte characters).
const base64Encode = (content: string): string => {
    const bytes = new TextEncoder().encode(content)
    let binary = ''
    bytes.forEach(byte => { binary += String.fromCharCode(byte) })
    return btoa(binary)
}

const createClient = (token: string): GithubHttpClient =>
    axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
        },
    })

export const uploadFileToRegistry = async (
    token: string,
    name: string,
    username: string,
    repo: string,
    content: string,
    client: GithubHttpClient = createClient(token),
): Promise<void> => {
    const payload: UploadPayload = {
        message: "Created from https://samtv12345.github.io/stackedit-react/",
        content: base64Encode(content),
    }

    const requestURL = `/repos/${username}/${repo}/contents/${encodeURI(name)}`

    // If the file already exists, GitHub requires its blob sha to update it.
    try {
        const existing = await client.get(requestURL)
        if (existing?.data?.sha) {
            payload.sha = existing.data.sha
        }
    } catch {
        // File does not exist yet (or could not be read) — create it without a sha.
    }

    try {
        await client.put(requestURL, payload)
        uploadToGitHubSuccessful(name, username, repo)
    } catch {
        uploadToGitHubRepoNotFound(username, repo)
    }
}

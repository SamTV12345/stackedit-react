import {File} from "../slices/CommonSlice";

export const jsonDownloadName = (file: {name: string}): string =>
    `${file.name?.trim() || 'untitled'}.json`

// Triggers a browser download of the given file serialized as JSON.
export const downloadFileAsJson = (file: File): void => {
    const url = window.URL.createObjectURL(
        new Blob([JSON.stringify(file)], {type: 'application/json'}),
    )
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', jsonDownloadName(file))
    document.body.appendChild(link)
    link.click()
    link.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)
}

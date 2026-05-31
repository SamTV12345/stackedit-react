import {db} from "../database/Database";
import {commonActions, File} from "../slices/CommonSlice";
import {getSampleFile} from "./getSampleFile";
import {AppDispatch} from "../store/store";

interface LoadInitialFileDeps {
    dispatch: AppDispatch,
    loadSample?: () => void,
}

// Decides which file to show on startup: the most recently opened one, or a
// freshly seeded sample file when the database is empty.
export const loadInitialFile = async (
    {dispatch, loadSample = getSampleFile}: LoadInitialFileDeps,
): Promise<File | undefined> => {
    const count = await db.count('file')
    if (count === 0) {
        loadSample()
        return undefined
    }

    const files = await db.getAll('file')
    const mostRecent = files.reduce((a, b) => (a.lastOpened > b.lastOpened ? a : b))
    dispatch(commonActions.setCurrentFile(mostRecent))
    dispatch(commonActions.setEditorText(mostRecent.content))
    return mostRecent
}

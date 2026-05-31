import type {editor} from "monaco-editor";

type IStandaloneCodeEditor = editor.IStandaloneCodeEditor

// Built-in Monaco action ids for the find and find-and-replace widgets.
export const FIND_ACTION = 'actions.find'
export const REPLACE_ACTION = 'editor.action.startFindReplaceAction'

// Runs a registered Monaco editor action (e.g. opening the find/replace widget).
export const runEditorAction = (
    editorInstance: IStandaloneCodeEditor | undefined,
    actionId: string,
): void => {
    editorInstance?.focus()
    editorInstance?.getAction(actionId)?.run()
}

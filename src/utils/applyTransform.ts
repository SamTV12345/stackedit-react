import type {editor} from "monaco-editor";
import {TextEditResult} from "./markdownFormat";

type IStandaloneCodeEditor = editor.IStandaloneCodeEditor
export type TextTransform = (value: string, start: number, end: number) => TextEditResult

// Applies a pure text transform to a Monaco editor: reads the current value and
// selection, runs the transform, writes the result as a single undoable edit,
// and restores the resulting selection.
export const applyTransform = (
    editorInstance: IStandaloneCodeEditor | undefined,
    transform: TextTransform,
): void => {
    if (!editorInstance) {
        return
    }
    const model = editorInstance.getModel()
    const selection = editorInstance.getSelection()
    if (!model || !selection) {
        return
    }

    const value = model.getValue()
    const start = model.getOffsetAt(selection.getStartPosition())
    const end = model.getOffsetAt(selection.getEndPosition())
    const result = transform(value, start, end)

    editorInstance.executeEdits('toolbar', [{
        range: model.getFullModelRange(),
        text: result.value,
    }])

    const startPos = model.getPositionAt(result.selectionStart)
    const endPos = model.getPositionAt(result.selectionEnd)
    editorInstance.setSelection({
        startLineNumber: startPos.lineNumber,
        startColumn: startPos.column,
        endLineNumber: endPos.lineNumber,
        endColumn: endPos.column,
    })
    editorInstance.focus()
}

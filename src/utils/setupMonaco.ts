// Loads the Monaco editor and its language workers, then points
// @monaco-editor/react at the local monaco instance. This is deferred until the
// editor is actually needed so non-editor routes (landing page, privacy page)
// don't download ~3.5MB of editor code on first paint.
let monacoSetupPromise: Promise<void> | null = null

const doSetup = async (): Promise<void> => {
    const loader = await import("@monaco-editor/loader")
    const monaco = await import("monaco-editor")
    const editorWorker = await import("monaco-editor/esm/vs/editor/editor.worker?worker")
    const jsonWorker = await import("monaco-editor/esm/vs/language/json/json.worker?worker")
    const cssWorker = await import("monaco-editor/esm/vs/language/css/css.worker?worker")
    const htmlWorker = await import("monaco-editor/esm/vs/language/html/html.worker?worker")
    const tsWorker = await import("monaco-editor/esm/vs/language/typescript/ts.worker?worker")

    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === "json") {
                return new jsonWorker.default()
            }
            if (label === "css" || label === "scss" || label === "less") {
                return new cssWorker.default()
            }
            if (label === "html" || label === "handlebars" || label === "razor") {
                return new htmlWorker.default()
            }
            if (label === "typescript" || label === "javascript") {
                return new tsWorker.default()
            }
            return new editorWorker.default()
        }
    }
    loader.default.config({monaco})
}

// Idempotent: the setup work runs at most once per session.
export const setupMonaco = (): Promise<void> => {
    if (!monacoSetupPromise) {
        monacoSetupPromise = doSetup()
    }
    return monacoSetupPromise
}

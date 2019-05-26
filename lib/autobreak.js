'use babel';

export default {
    subscriptions: null,

    activate() {
        this.lineBreakObserveSubscription =
            atom.workspace.observeTextEditors((editor) => {
                editor.onDidChange(checkIfShouldBreakLines);
            });
    },

    deactivate() {
        this.lineBreakObserveSubscription.dispose();
    }
}

function checkIfShouldBreakLines() {
    let editor = atom.workspace.getActiveTextEditor();
    const pLL = editor.preferredLineLength;

    // const initialStatePtr = editor.createCheckpoint();

    for (let buffRowNum = editor.getCursorScreenPosition().row;
        buffRowNum <= editor.getLastBufferRow(); buffRowNum++) {

        let rowText = editor.lineTextForBufferRow(buffRowNum);

        if (rowText.length <= pLL)
            break;

        let breakIndex = rowText.lastIndexOf(" ", pLL + 1);
        rowText = rowText.substring(0, breakIndex) + '\n' + rowText.substring(breakIndex + 1);

        let lastCursorPos = editor.getCursorScreenPosition();
        let wasAtEndOfLine = editor.getLastCursor().isAtEndOfLine();

        editor.setTextInBufferRange([[buffRowNum, 0], [buffRowNum, pLL + 1]], rowText);

        // Workaround for the cursor jumping when inserting text on a line that ends up
        // breaking.  Without this, the cursor jumps to the newly inserted text
        if (! wasAtEndOfLine)
            editor.setCursorScreenPosition(lastCursorPos);
    }

    // editor.groupChangesSinceCheckpoint(initialStatePtr);
}

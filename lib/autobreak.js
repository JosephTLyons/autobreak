'use babel';

export default {
    subscriptions: null,

    activate() {
        atom.workspace.observeTextEditors((editor) => {
            editor.onDidChange(checkIfShouldBreakLines)
        });
    },

    deactivate() {
        this.subscriptions.dispose();
    }
}

function checkIfShouldBreakLines() {
    let editor = atom.workspace.getActiveTextEditor();
    let pLL = editor.preferredLineLength;

    // const initialStatePtr = editor.createCheckpoint();

    for (let buffRowNum = editor.getCursorScreenPosition().row;
        buffRowNum < editor.getLastBufferRow(); buffRowNum++) {

        let rowText = editor.lineTextForBufferRow(buffRowNum);

        if (rowText.length <= pLL)
            break;

        let breakIndex = rowText.substr(0, pLL).lastIndexOf(" ");
        rowText = rowText.substr(0, breakIndex) + '\n' + rowText.substr(breakIndex + 1);

        let lastPos = editor.getCursorScreenPosition();
        let wasAtEndOfLine = editor.getLastCursor().isAtEndOfLine();

        editor.setTextInBufferRange([[buffRowNum, 0], [buffRowNum, pLL + 1]], rowText);

        // Workaround for the cursor jumping when inserting text on a line that ends up
        // breaking.  Without this, the cursor jumps to the
        if (! wasAtEndOfLine)
            editor.setCursorScreenPosition(lastPos);
    }

    // editor.groupChangesSinceCheckpoint(initialStatePtr);
}

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
    // After package is written, I might be able to collapse some of these and avoid making a
    // variable, as long as I don't use any of these directly later on in the package
    let editor = atom.workspace.getActiveTextEditor();
    let cursorRow = editor.getCursorScreenPosition().row;
    let rowText = editor.lineTextForBufferRow(cursorRow);
    let pLL = editor.preferredLineLength;

    // Alternative for some of the code above, not sure which one is faster, keeping to test this
    // laster
    // let editor = atom.workspace.getActiveTextEditor();
    // let cursorRow = editor.getLastCursor().getScreenRow();
    // let rowText = editor.lineTextForBufferRow(cursorRow);

    if (rowText.length > pLL) {
        // const initialStatePtr = editor.createCheckpoint();

        for (let buffRow = cursorRow; buffRow < editor.getLastBufferRow(); buffRow++)
        {
            rowText = editor.lineTextForBufferRow(buffRow);

            let index = rowText.substr(0, pLL).lastIndexOf(" ");
            rowText = rowText.substr(0, index) + '\n' + rowText.substr(index + 1);

            let lastPos = editor.getCursorScreenPosition();
            let wasAtEndOfLine = editor.getLastCursor().isAtEndOfLine();

            editor.setTextInBufferRange([[cursorRow, 0], [cursorRow, pLL + 1]],
                rowText);

            // Workaround for the cursor jumping when inserting text on a line that ends up breaking
            // Without this, the cursor jumps to the
            if (! wasAtEndOfLine)
                editor.setCursorScreenPosition(lastPos);
        }

        // editor.groupChangesSinceCheckpoint(initialStatePtr);
    }
}

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
    let cursorRowText = editor.lineTextForBufferRow(cursorRow);
    let rowTextLength = cursorRowText.length;
    let pLL = editor.preferredLineLength;

    // Alternative for some of the code above, not sure which one is faster, keeping to test this
    // laster
    // let editor = atom.workspace.getActiveTextEditor();
    // let cursorRow = editor.getLastCursor().getScreenRow();
    // let cursorRowText = editor.lineTextForBufferRow(cursorRow);

    if (rowTextLength > pLL) {
        let index = cursorRowText.substr(0, pLL).lastIndexOf(" ");
        cursorRowText = cursorRowText.substr(0, index) + '\n' + cursorRowText.substr(index + 1);

        let lastPos = editor.getCursorScreenPosition();
        let wasAtEnd = editor.getLastCursor().isAtEndOfLine();

        editor.setTextInBufferRange([[cursorRow, 0], [cursorRow, pLL + 1]],
            cursorRowText);

        // Workaround for the cursor jumping when inserting text on a line that ends up breaking
        // Without this, the cursor jumps to the
        if (! wasAtEnd)
            editor.setCursorScreenPosition(lastPos);
    }
}

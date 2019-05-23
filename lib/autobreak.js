'use babel';

export default {

    subscriptions: null,

    activate() {
        atom.workspace.observeTextEditors((editor) => {
            editor.onDidChange(checkIfShouldBreakText)
        });
    },

    deactivate() {
        this.subscriptions.dispose();
    }
}

function checkIfShouldBreakText() {
    // After package is written, I might be able to collapse some of these and avoid making a
    // variable, as long as I don't use any of these directly later on in the package
    let editor = atom.workspace.getActiveTextEditor();
    let cursorRow = editor.getCursorScreenPosition().row;
    let cursorRowText = editor.lineTextForBufferRow(cursorRow);
    let rowTextLength = cursorRowText.length;
    let pLL = editor.preferredLineLength;

    // let editor = atom.workspace.getActiveTextEditor();
    // let cursorRow = editor.getLastCursor().getScreenRow();
    // let cursorRowText = editor.lineTextForBufferRow(cursorRow);

    if (rowTextLength > pLL)
        breakLinesAtRow(cursorRow);
}

function breakLinesAtRow(row) {
    console.log(rowTextLength);

    // get all lines without newlines (there's a method for this) from row above current, as
    // changing the first word in a row (making it shorter) can lead to the possiblity of the
    // previous row being able to accept it

    // Adjust all lines from row - 1 to the end
}

// Only activate on .txt, .md, and let the user then choose the others in the settings
// In read me, this does not support multiple cursors!

// If we want to make it efficent, packack should work with two cases, deleting text and adding text

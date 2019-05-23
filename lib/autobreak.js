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
        let index = cursorRowText.lastIndexOf(" ");
        cursorRowText = cursorRowText.substr(0, index) + '\n' + cursorRowText.substr(index + 1);

        editor.setTextInBufferRange([[cursorRow, 0], [cursorRow, Infinity]],
            cursorRowText);
    }
}

// Only activate on .txt, .md, and let the user then choose the others in the settings

// In read me, this does not support multiple cursors!

// If we want to make it efficent, packack should work with two cases, deleting text and adding text

// Remove all text files from this package we dont need

// Do enable and disable work?

// Can we make this more efficient by storing some variables globally instead of calling the methods
// for each key press

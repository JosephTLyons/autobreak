'use babel';

export default {

    subscriptions: null,

    activate() {
        atom.workspace.observeTextEditors((editor) => { editor.onDidChange(breakText) });
    },

    deactivate() {
        this.subscriptions.dispose();
    },
};

function breakText() {
    const lineLength = atom.workspace.getActiveTextEditor().getBufferRow();
    console.log(lineLength); // Just testing to see if the code works
}

// Only activate on .txt, .md, and let the user then choose the others in the settings

'use babel';

export default {

    subscriptions: null,

    activate() {
        atom.workspace.observeTextEditors((editor) => { editor.onDidChange(breakText()) });
    },

    deactivate() {
        this.subscriptions.dispose();
    },
};

function breakText() {
    console.log("Breaking text now"); // Just testing to see if the code works
}

// Only activate on .txt, .md, and let the user then choose the others in the settings

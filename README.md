# autobreak package

A short description of your package.

![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)

## TODO
- Only activate on .txt, .md, and let the user then choose the others in the
  settings
- In read me, this does not support multiple cursors!
- If we want to make it efficent, packack should work with two cases, deleting
  text and adding text
- Remove all text files from this package we dont need
- Do enable and disable work?
- Can we make this more efficient by storing some variables globally instead of
  calling the methods for each key press
- Deal with the case of inserting text and with deleting text
- Deal with inserting text when cursor is directly behind another word (use
  Cursor Position Details methods)
- Add check point before and after so that command undo can fix whatever is
  changed via this package.
- Is there a way to get the newline from the package?
    - Replace all newline insertions with the default newline the user is using
    - Note that inserting the text into the buffer will automatically normalize
      line endings
- Use disposable to unsubscribe from onDidChange()
    - https://blog.atom.io/2014/09/16/new-event-subscription-api.html ??

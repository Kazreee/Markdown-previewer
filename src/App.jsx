import { useState } from 'react'
import { Marked } from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';

const defaultMarkText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

`
function App() {

  const [input, setInput] = useState(defaultMarkText);

  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  marked.use({ breaks: true })
  const styledText = input.replace(/\n```([\s\S]*?)\n```/g, (match, code) => {
    return `\n\`\`\`javascript${code}\n\`\`\``;
  });


  return (
    <>
      <div className="editor-container">
        <div className="container">
          <div className="logo">
            <i className="fa-brands fa-free-code-camp"></i>
            <h4>Editor</h4>
          </div>
          <i className="fa-solid fa-x"></i>
        </div>
        <textarea id='editor' value={input} onChange={
          (e) => setInput(e.target.value)
          }></textarea>
      </div>
      <div className="preview-container">
        <div className="container">
          <div className="logo">
            <i className="fa-brands fa-free-code-camp"></i>
            <h4>Preview</h4>
          </div>
          <i className="fa-solid fa-x"></i>
        </div>
        <div id='preview' dangerouslySetInnerHTML={{__html: marked.parse(styledText)}}></div>
      </div>
    </>
  )
}

export default App

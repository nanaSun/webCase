import "./index.scss"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>aaaaa</p>
        <p>bbbbb</p>
      </div>
    );
  }
}
const root=document.createElement("div")
root.id="root"
document.body.appendChild(root)
ReactDOM.render(<App />, root);

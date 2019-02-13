import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class App extends Component {
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

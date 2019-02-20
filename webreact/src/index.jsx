import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Count from "./Count"
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      count:0
    }
  }
  count(){
    this.setState({
      count:++this.state.count
    })
  }
  render() {
    return (
      <div>
        <p key="pCount" onClick={()=>this.count()}>{this.state.count}</p>
        <p>bbbbb</p>
        <Count key="mainCount"></Count>
      </div>
    );
  }
}
const root=document.createElement("div")
root.id="root"
document.body.appendChild(root)
ReactDOM.render(<App />, root);

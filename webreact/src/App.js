import React,{Component} from 'react';
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
        <p>aaasss</p>
        <Count key="mainCount"></Count>
      </div>
    );
  }
}

export default App
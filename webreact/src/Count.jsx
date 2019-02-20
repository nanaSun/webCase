import React,{Component,PureComponent} from 'react';
class Count extends PureComponent {
    constructor(props){
        super(props)
    }
    // shouldComponentUpdate(props){
    // console.log(props)
    // return false
    // }
    componentDidUpdate(){
        console.log("update")
    }
    render() {
        console.log("render")
    return (
        <div>
            <p>lalalal</p>
        </div>
    );
    }
}
export default Count

import React, { PureComponent } from 'react'

function addAge(Target: Function) {
    Target.prototype.age = 111
}

@addAge
class ClassComponent extends PureComponent {

    age?: number

    render(){
        return <h2>我时候类组件</h2>
    }
}


export default ClassComponent

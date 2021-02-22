import React, { Component } from 'react'
import GridElement from '../Components/TestComponent/GridElement';
import GridContainer from '../Components/TestComponent/GridContainer';
export default class TestPage extends Component {
    render() {
        return (
            <div>
                <GridElement/>
                <GridContainer/>        
            </div>
        )
    }
}

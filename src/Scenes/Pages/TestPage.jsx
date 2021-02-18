import React, { Component } from 'react'
import GridElement from '../Components/TestPage/GridElement';
import GridContainer from '../Components/TestPage/GridContainer';
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

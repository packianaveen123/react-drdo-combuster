import React, { Component } from 'react'
import GridElement from '../Components/TestComponent/GridElement';
import GridContainer from '../Components/TestComponent/GridContainer';
import StatusBlock from '../Components/TestComponent/StatusBlock';

export default class TestPage extends Component {
    render() {
        return (
            <div >
                <StatusBlock/>
                <GridContainer/>        
            </div>
        )
    }
}

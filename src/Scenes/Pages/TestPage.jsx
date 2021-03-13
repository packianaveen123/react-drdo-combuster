import React, { Component } from 'react'

import GridContainer from '../Components/TestPageComponent/GridContainer';
import StatusBlock from '../Components/TestPageComponent/StatusBlock';

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

import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Input, Col, Row, Button } from 'antd';


const { Search } = Input;
const onSearch = value => console.log(value);

export default class SearcgBox extends Component {

    render() {
        return (
            <div >
                {/* <Search placeholder="input search text"
                allowClear onSearch={onSearch} 
                 /> */}
                
                        <Input type="search"
                            name="search"
                            placeholder="Search..."
                            style={{
                                width: '40rem',
                                border: "none",
                                backgroundColor: 'transparent',
                                borderBottom: "1px solid gray",
                            }}
                        />                 
            </div>


        );
    }
}
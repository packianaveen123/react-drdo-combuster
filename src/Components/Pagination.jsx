import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Pagination } from 'antd';

ReactDOM.render(<Pagination defaultCurrent={1} total={50} />, document.getElementById('container'));
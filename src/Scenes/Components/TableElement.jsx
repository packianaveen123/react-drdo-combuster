import React, { Component } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Table, Space } from 'antd';
import { testdatas } from '../../Data/TestData.json';
const { Column } = Table;
export default class TableElement extends Component {
    render() {
        return (
            <div>
                <Table dataSource={testdatas} style={{ backgroundColor: "#131633" }} >
                    <Column title="S.No" dataIndex="SNo" />
                    <Column title="Name" dataIndex="Name" />
                    <Column title="Unit" dataIndex="Unit" />
                    <Column title="Value" dataIndex="Value" />
                    <Column
                        title="Edit"
                        key="edit"
                        render={() => (
                            <Space size="middle">
                                <EditOutlined />
                            </Space>
                        )}
                    />
                </Table>,
            </div>
        )
    }
}

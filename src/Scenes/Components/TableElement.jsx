import React, { Component } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Table, Space } from 'antd';
import { testdatas } from '../../Data/TestData.json';
const { Column } = Table;
export default class TableElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: true,
            value: true,
            lowerLimit: true,
            normalLimit: true,
            upperLimit: true,

        }
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <Table dataSource={data} style={{ backgroundColor: "#131633" }} >
                    <Column title="S.No" dataIndex="SNo" />
                    <Column title="Name" dataIndex="Name" />
                    <Column title="Unit" dataIndex="Unit" />


                    {
                        this.props.value ?
                            <Column
                                title="Value"
                                key="value"
                                render={() => (
                                    <Space>
                                        dataIndex="Value"
                                    </Space>)}
                            /> : []
                    }
                    {
                        this.props.value ?
                            <Column
                                title="Value"
                                key="value"
                                render={() => (
                                    <Space>
                                        dataIndex="Value"
                                    </Space>)}
                            /> : []
                    }
                    {
                        this.props.lowerLimit ?
                            <Column
                                title="LowerLimit"
                                key="lowerLimit"
                                render={() => (
                                    <Space>
                                        dataIndex="LowerLimit"
                                    </Space>)}
                            /> : []
                    }
                    {
                        this.props.normalLimit ?
                            <Column
                                title="NormalLimit"
                                key="normalLimit"
                                render={() => (
                                    <Space>
                                        dataIndex="NormalLimit"
                                    </Space>)}
                            /> : []
                    }
                    {
                        this.props.upperLimit ?
                            <Column
                                title="UpperLimit"
                                key="upperLimit"
                                render={() => (
                                    <Space>
                                        dataIndex="UpperLimit"
                                    </Space>)}
                            /> : []
                    }


                    {
                        this.props.editable ?
                            <Column
                                title="Edit"
                                key="edit"
                                render={() => (
                                    <Space size="middle">
                                        <EditOutlined />
                                    </Space>
                                )}
                            /> : []
                    }
                </Table>
            </div>
        )
    }
}

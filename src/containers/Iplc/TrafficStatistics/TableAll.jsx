import React from "react";
import {Table} from "antd";

const {Column, ColumnGroup} = Table;

class TableAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        }
    }

    render() {
        const {dataTable} = this.state;
        const data = [{
            key: '1',
            firstName: 'submarine',
            Traffic: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        }, {
            key: '2',
            firstName: 'APG',
            Traffic: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        }, {
            key: '3',
            firstName: 'IA',
            Traffic: 'Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
            {
                key: '4',
                firstName: 'AAE-1',
                Traffic: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: '5',
                firstName: 'Landline',
                Traffic: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: '6',
                firstName: 'CMI',
                Traffic: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: '7',
                firstName: 'CT',
                Traffic: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: '8',
                firstName: 'CU',
                Traffic: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: '9',
                firstName: 'Da Nang',
                Traffic: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: '10',
                firstName: 'Ha Noi',
                Traffic: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: '11',
                firstName: 'Ho Chi Minh',
                Traffic: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: '12',
                firstName: 'Sum',
                Traffic: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },


        ];
        return (
            <Table
                bordered
                // columns={columns}
                dataSource={data}
                pagination={false}
            >

                <ColumnGroup>
                    <Column
                        title=""
                        key="1"
                        dataIndex="firstName"
                    />

                </ColumnGroup>


                <ColumnGroup title="Japan">
                    <Column
                        title="Traffic"
                        key="Traffic"
                        dataIndex="Traffic"
                    />
                    <Column
                        title="Capacity"
                        key="Capacity"
                    />
                    <Column
                        title="%"
                        key="%"
                    />
                </ColumnGroup>

                <ColumnGroup title="Singapore">
                    <Column
                        title="Traffic"
                        key="Traffic-s"
                    />
                    <Column
                        title="Capacity"
                        key="Capacity-s"
                    />
                    <Column
                        title="%"
                        key="%-s"
                    />
                </ColumnGroup>
                <ColumnGroup title="Hong Kong">
                    <Column
                        title="Traffic"
                        key="Traffic-h"
                    />
                    <Column
                        title="Capacity"
                        key="Capacity-h"
                    />
                    <Column
                        title="%"
                        key="%-h"
                    />
                </ColumnGroup>
                <ColumnGroup title="Sum">
                    <Column
                        title="Traffic"
                        key="Traffic-sum"
                    />
                    <Column
                        title="Capacity"
                        key="Capacity-sum"
                    />
                    <Column
                        title="%"
                        key="%-sum"
                    />
                </ColumnGroup>

            </Table>
        )
    }
}

export default TableAll
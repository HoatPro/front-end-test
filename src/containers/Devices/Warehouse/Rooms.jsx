import React from 'react';
import {Table} from 'antd';
class TableRoom extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            dataTable:[],

        }
    }
    render(){
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Name',
                dataIndex:"Name",
                key: 'name',
            },
            {
                title: 'Warehouse',
                dataIndex:"warehouse",
                key: 'warehouse',
            },
            {
                title: 'Action',
                key: 'action',

            },
            ]
        return(
           <Table
               className="table-detail"
               columns={columns}
               dataSource={this.state.dataTable}
               bordered
           />
        )
    }
}
export  default  TableRoom;
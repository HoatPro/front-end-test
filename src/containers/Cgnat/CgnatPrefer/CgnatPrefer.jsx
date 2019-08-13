
import React from "react";
import { Table ,message,Collapse,Icon,Button,Input} from 'antd';
import { CgnatPreferWrapper } from "./CgnatPrefer.style";
import axios from "axios";
const {Panel}=Collapse;
const { Search } = Input;


const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};
class CgnatPrefer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[],
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/cgnat-prefer"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            console.log(data);
            let dataObject=data.map((dataObj,index)=>{
                return{
                    "index":index+1,
                    dataObj
                }
            });
            message.success("GET CGNAT Prefer  successfull!")
            this.setState({
                dataTable:dataObject
            })
        }
    }


    render() {
        const columns = [
            {
                title: 'Index',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Region',
                // dataIndex:'device_name',
                key: 'mpRegion',
                render:record=>{
                    return record.dataObj.mpRegion
                }
            },
            {
                title: 'Group Mp',
                // dataIndex:'device_ip',
                key: 'mpGroup',
                render:record=>{
                    return record.dataObj.mpGroup
                }
            },
            {
                title: 'MP',
                // dataIndex:'fpc_slot',
                key: 'mp',
                render:record=>{
                    return record.dataObj.name
                }
            },
            {
                title: 'MP Ip',
                // dataIndex:'pic_slot',
                key: 'ip',
                render:record=>{
                    return record.dataObj.ip
                }
            },
            {
                title: 'CGNAT',
                // dataIndex:'card',
                key: 'cgnat',
                render:record=>{
                    return record.dataObj.cgnat
                }
            },
            {
                title: 'CGNAT Ip',
                // dataIndex:'log_message',
                key: 'cgnat_ip',
                render:record=>{
                    return record.dataObj.cgnat_ip
                }
            },
        ];


        return (
            <CgnatPreferWrapper>

                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel
                        header=" CGNAT Prefer"
                        key="1"
                        style={customPanelStyle}
                        showArrow={false}>
                        <Search
                            placeholder="Search by name..."
                            onSearch={value => console.log(value)}
                            style={{ width: 200, marginRight:20 }}
                        />
                        <Button type="primary">Export to excel</Button>

                    </Panel>
                </Collapse>
                <div className="table">
                    <Table
                        className="table-detail"
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        // pagination={{ defaultPageSize: 20}}
                        rowKey={record => record.index}
                    />
                </div>
            </CgnatPreferWrapper>

        )
    }
}

export default CgnatPrefer;
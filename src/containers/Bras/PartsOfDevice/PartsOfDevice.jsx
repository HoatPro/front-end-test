import React from "react";
import { PartsOfDeviceWrapper } from "./PartsOfDevice.style";
import {Card, Button,Table,Input, message} from 'antd';
import  axios from 'axios'
import {retrieveColumnLayout} from "echarts/src/layout/barGrid";
const {Search}=Input
class PartsOfDevice extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataTable:[]
        }

    }
    async componentDidMount(){
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/get-part-in-group-mp"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if(status){
            message.success("GET group MP topo successfully!")
            this.setState({
                dataTable:data,

            })
        }else{
            message.error("GET data error!!!")
        }
    }

    render() {
     const listToDisplay=this.state.dataTable;

       console.log(index)
        const columns = [
            {
                title: 'Index',
                key:'index',
            },
            {
                title: 'Mp',
                key:'mp',
                render:record=>{
                    return record.dt.a
                }
            },
            {
                title: 'Juniper MX960',
                key:'jupiter-mx960',
                render:record=>{
                    return record.dt.b
                }
            },
            {
                title: 'Juniper MX480',
                key:'jupiter-mx480',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'Juniper MX104',
                key:'jupiter-mx104',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'Juniper MX5-T',
                key:'jupiter-mx5t',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'Enhanced MX SCB',
                key:'enhanced-mx-scb',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'Enhanced MX SCB 2',
                key:'enhanced-mx-scb-2',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'RE-S-1800x4',
                key:'res-1800',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'RE-MX-104',
                key:'re-mx-104',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'MPCE Type 2 3D',
                key:'mpce-type-2',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'MIC-3D-4XGE-XFP',
                key:'mic-3d-4xge-xfp',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'MIC-3D-2XGE-XFP',
                key:'mic-3d-3xge-xfp',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'MIC-3D-20GE-SFP',
                key:'mic-3d-20ge-xfp',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'MPCE Type 3 3D',
                key:'mpce-type-3-3d',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'MIC3-3D-10XGE-SFPP',
                key:'mic3-3d-10xge-sfpp',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'MPC4E 3D 32XGE',
                key:'mpc4e-3d-32xge',
                render:record=>{
                    return record.dt.c
                }
            },
            {
                title: 'MPC4 2x100',
                key:'mpc4e-3d-32xge',
                children:[
                    {
                        title: 'MPC4E 3D 2CGE+8XGE',
                        key:'mpc4e-3d-3cge-8xge',
                    },
                    {
                        title: 'CFP-100G-SR10',
                        key:'cfp-100g-sr10',
                        render:record=>{
                            return record.dt.c
                        }
                    },
                    ]
            },
            {
                title: 'MPC5 2xCGE',
                key:'mpc5-2xcge',
                children:[
                    {
                        title: 'MPC5E 3D 2CGE+4XGE',
                        key:'mpc4e-3d-3cge-4xge',
                    },
                    {
                        title: 'CFP2-100G-SR10-D',
                        key:'cfp2-100g-sr10-d',
                        render:record=>{
                            return record.dt.c
                        }
                    },
                ]
            },
            {
                title: 'MPC7 Multirate',
                key:'mpc7',
                children:[
                    {
                        title: 'MPC7E 3D MRATE-12xQSFPP-XGE-XLGE-CGE',
                        key:'mpc7e-3d-mrate',
                    },
                    {
                        title: 'QSFP-100GBASE-SR4',
                        key:'qsfp-100gbase-sr4',
                        render:record=>{
                            return record.dt.c
                        }
                    },
                    {
                        title: 'QSFP-100GBASE-LR4',
                        key:'qsfp-100gbase-lr4',
                        render:record=>{
                            return record.dt.c
                        }
                    },
                    {
                        title: 'QSFP+-40G-SR4',
                        key:'qsfp-40g-sr4',
                        render:record=>{
                            return record.dt.c
                        }
                    },

                ]
            }









        ];

        return (
            <PartsOfDeviceWrapper>
                <Card style={{width:"1732px",marginBottom:10}}>

                    <h2>Parts of Group MP</h2>
                    <div style={{ marginBottom:20,width:200,float:"left", marginRight:15}}>
                        <h4>Search by name</h4>
                        <Search  placeholder="search by name....."/>
                    </div>
                    <div>
                     <h4>Export</h4>
                        <Button type="primary">Export to excel file </Button>
                    </div>

                </Card>


                    <Table
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        size="middle"
                    />


            </PartsOfDeviceWrapper>
        );
    }
}
export default PartsOfDevice;



import React from "react";
import {Card, Input, Table, message, Row, Col} from 'antd'
import {RecommendActionWrapper} from "./RecommendAction.style"
import axios from "axios";
import moment from "moment";

class RecommedAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            statusText: "Active"
        }
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/recommend-devices-tool-cgnat"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET Tool Cgnat decives successfull!");
            const dataObj = data.map((data, index) => {
                return {
                    index: index + 1,
                    data
                }
            })
            this.setState({
                dataTable: dataObj
            })
        } else {
            message.error("GET data Error!!!")
        }
    }

    onChange = (value) => {
        console.log(value)
    }

    render() {

        const {dataTable, statusText} = this.state;
        const columns = [
            {
                title: '#',
                key: 'index',
                render: record => {
                    return record.index
                }
            },
            {
                title: 'Name',
                key: 'name',
                render: record => {
                    return record.data.device_name
                }
            },
            {
                title: 'Ip',
                key: 'ip',
                render: record => {
                    return record.data.device_ip
                }
            },
            {
                title: 'FPC Slot',
                key: 'fpcslot',
                render: record => {
                    return record.data.fpc_slot
                }
            },
            {
                title: 'Pic Slot',
                key: 'pic-slot',
                render: record => {
                    return record.data.pic_slot
                }
            },
            {
                title: 'Card',
                key: 'card',
                render: record => {
                    return record.data.card
                }

            },
            {
                title: 'Log Message',
                key: 'log-message',
                render: record => {
                    return record.data.log_message
                }
            },
            {
                title: 'Timestamp',
                key: 'timestamp',
                render: record => {
                    const time = record.data.time_stamp;
                    return moment(time).format("YYYY/MM/DD HH:mm:ss")
                }
            },
            {
                title: 'Times scan',
                key: 'timescan',
                render: record => {
                    return record.data.times_scan
                }
            },
            {
                title: 'Action',
                key: 'action',
                render: record => {
                    return <div style={{
                        backgroundColor: "orange",
                        color: "white",
                        fontWeight: 700,
                        padding: 6
                    }}> {record.data.action_handler === "system" ? "Disabled by system" : record.data.command === "reboot" ? "Reboot" : "Shutdown"}</div>
                }
            },

        ]
        return (
            <RecommendActionWrapper>
                <Card style={{width: "100%", fontWeight: 600, marginBottom: 15}}>
                    <h2>Recommend Devices</h2>
                </Card>

                <Card style={{width: "100%"}}>
                    <div>
                        {/*<p*/}
                        {/*    style={{marginBottom:20,backgroundColor:"#E8E8E8",float:"left", fontWeight:600, height:30, padding:5}}*/}
                        {/*>Number of items per page</p> &nbsp;*/}
                        <Input addonBefore="Number of items per page" type="number" onChange={this.onChange}
                               style={{height: 35, marginBottom: 15, width: 250}} defaultValue={10}/>
                    </div>
                    <Table
                        className="table-detail"
                        columns={columns}
                        dataSource={dataTable}
                        bordered
                        rowKey={record => record.index}
                    />
                </Card>
            </RecommendActionWrapper>
        );
    }
}

export default RecommedAction;




import React from "react";
import {Table, Card, Icon} from 'antd';
import {HistoryWrapper} from "./History.style"
import axios from "axios";
import moment from "moment";

const successMessage = ["success", "ok"];
const errorMessage = ["fail", "error"];

function IconRow(props) {
    const message = props.data.toLowerCase();
    let include = false;
    let success = false;
    successMessage.forEach((item) => {
        if (message.includes(item)) {
            include = true;
            success = true;
        }
    })
    errorMessage.forEach((item) => {
        if (message.includes(item)) {
            include = true;
        }
    })
    return (
        <div>
            {include && (
                <Icon
                    type={success ? "check" : "close"}
                    style={{color: success ? "green" : "red", fontSize: '16px', fontWeight: 800}}
                />
            )} {message}
        </div>
    );
}

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            startValue: null,
            endValue: null,
            endOpen: false,
        }
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/histories-tool-cgnat"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            console.log(data);
            let dataObject = data.map((dataObj, index) => {
                return {
                    "index": index + 1,
                    dataObj
                }
            })
            console.log(dataObject)
            this.setState({
                dataTable: dataObject
            })
        }
    }


    render() {
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Name',
                key: 'device_name',
                render: record => {
                    return record.dataObj.device_name
                }

            },

            {
                title: 'Ip',
                key: 'device_ip',
                render: record => {
                    return record.dataObj.device_ip
                }
            },
            {
                title: 'FPC Slot',
                key: 'fpc_slot',
                render: record => {
                    return record.dataObj.fpc_slot
                }
            },
            {
                title: 'Pic Slot',
                key: 'pic_slot',
                render: record => {
                    return record.dataObj.pic_slot
                }
            },
            {
                title: 'Card',
                key: 'card',
                render: record => {
                    return record.dataObj.card
                }
            },
            {
                title: 'Status',
                key: 'status',
                render: record => {
                    return record.dataObj.status
                }
            },
            {
                title: 'Message AOPT',
                key: 'msg_aopt',
                render: record => {
                    return record.dataObj.msg_aopt
                }

            },
            {
                title: 'Reason',
                key: 'reason',
                render: record => {
                    return record.dataObj.reason
                }

            },
            {
                title: 'Timestamp',
                key: 'time_stamp',
                render: record => {
                    const time = record.dataObj.time_stamp
                    return moment(time).format("YYYY/MM/DD HH:mm:ss")
                }

            },
            {
                title: 'Uptime Result',
                key: 'uptime_result',
                render: record => {
                    return <IconRow data={record.dataObj.uptime_result}/>
                }
            },
            {
                title: 'Pre Jsnap Result',
                key: 'pre_jsnap_result',
                render: record => {
                    return <IconRow data={record.dataObj.pre_jsnap_result}/>
                }
            },
            {
                title: 'Action Result',
                key: 'action_result',
                render: record => {
                    return <IconRow data={record.dataObj.action_result}/>
                }
            },
            {
                title: 'Post Jsnap Result',
                key: 'post_jsnap_result',
                render: record => {
                    return <IconRow data={record.dataObj.post_jsnap_result}/>
                }

            },
            {
                title: 'Compare Jsnap Result',
                key: 'compare_jsnap_result',
                render: record => {
                    return <IconRow data={record.dataObj.compare_jsnap_result}/>
                }

            },
            {
                title: 'Pic State',
                key: 'pic_state',
                render: record => {
                    return <IconRow data={record.dataObj.pic_state}/>
                }

            },


        ];

        const {startValue, endValue, endOpen} = this.state;

        return (
            <HistoryWrapper>
                <Card style={{fontWeight: 600, marginBottom: 10}}>
                    <h2>History</h2>
                </Card>

                <Card>
                    <div>
                        <Table
                            scroll={{x: true}}
                            columns={columns}
                            dataSource={this.state.dataTable}
                            bordered
                            // pagination={{ defaultPageSize: 20}}
                            rowKey={record => record.index}
                        />
                    </div>
                </Card>
            </HistoryWrapper>


        )
    }
}

export default History;
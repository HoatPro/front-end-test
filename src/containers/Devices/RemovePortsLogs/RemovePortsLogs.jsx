import React from "react";
import {Card, Tabs, Table, message, Icon, DatePicker, Select, Alert, Modal, Button} from 'antd';
import {RemovePortsLogsWrapper} from "./RemovePortsLogs.style"
import axios from "axios";
import Search from "antd/lib/input/Search";
import TableFail from "./TableFail"
import moment from "moment";
import TableDetail from "../RemovePortsLogs/TableDetail";

const dateFormat = 'DD-MM-YYYY';
const {TabPane} = Tabs;
const {Option} = Select;
class RemovePortsLogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            totalPortCnt: null,
            totalSuccessPortCnt: null,
            totalSuccessPortPercent: null,
            dataGet: [],
            dataLogs: [],
            visible: false,
            timeList: [],
            dataMoDal:[]

        }
    }

    async componentDidMount() {
        let today = moment(new Date());
        const date = today._d.toISOString();
        const options = {
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/remove-ports-from-opsview-logs?date=${date}`
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET logs successfull!");
            const totalPortCnt = data.reduce((sum, e) => (sum + e.ports.length), 0);
            const totalSuccessPortCnt = data.reduce((sum, e) => (sum + e.ports.reduce((s, port) => {
                if (port.requestOpsviewResult != null && port.requestOpsviewResult.success) {
                    return s + 1;
                }
                return s;
            }, 0)), 0);
            const totalSuccessPortPercent = Math.round(totalSuccessPortCnt / totalPortCnt * 100 * 100) / 100;
            const dataObj = data.map((data, index) => {
                let successPortCnt = data.ports.reduce((s, data) => {
                    if (data.requestOpsviewResult != null && data.requestOpsviewResult.success) {
                        return s + 1;
                    }
                    return s;
                }, 0);

                let successPercent = Math.round(successPortCnt / data.ports.length * 100 * 100) / 100;
                return {
                    index: index + 1,
                    data,
                    successPortCnt,
                    successPercent,
                    length: data.ports.length
                }
            })
            this.setState({
                dataTable: dataObj,
                dataDetail: dataObj,
                totalPortCnt: totalPortCnt,
                totalSuccessPortCnt: totalSuccessPortCnt,
                totalSuccessPortPercent: totalSuccessPortPercent,
                dataGet: data,
                timeList: this.getTimeList(data)

            })
        } else {
            message.error("GET data Error!!!")
        }
    }
    getTimeList(listData) {
        const set = new Set();

        for (let item of listData) {
            set.add(item.time);
        }

        return [...set];
    }


    onChangeDate=(dateString)=> {
        var myDate = new Date(dateString._d);
        const dateSelected = myDate.toISOString();
        console.log(dateSelected)
        axios({
            method: "GET",
            url: `https://netd.ast.fpt.net/netd-api/api/remove-ports-from-opsview-logs?date=${dateSelected}`
        }).then(res => {
            if (res.status) {
                message.success("GET logs successfull!");
                const data=res.data.data
                const totalPortCnt = data.reduce((sum, e) => (sum + e.ports.length), 0);
                const totalSuccessPortCnt = data.reduce((sum, e) => (sum + e.ports.reduce((s, port) => {
                    if (port.requestOpsviewResult != null && port.requestOpsviewResult.success) {
                        return s + 1;
                    }
                    return s;
                }, 0)), 0);
                const totalSuccessPortPercent = Math.round(totalSuccessPortCnt / totalPortCnt * 100 * 100) / 100;
                const dataFail = [];
                const dataObj = data.map((data, index) => {
                    let successPortCnt = data.ports.reduce((s, data) => {
                        if (data.requestOpsviewResult != null && data.requestOpsviewResult.success) {
                            return s + 1;
                        }
                        return s;
                    }, 0);

                    let successPercent = Math.round(successPortCnt / data.ports.length * 100 * 100) / 100;
                    if (successPercent < 100) {
                        dataFail.push(data)
                    }
                    return {
                        index: index + 1,
                        data,
                        successPortCnt,
                        successPercent,
                        length: data.ports.length
                    }
                })
                this.setState({
                    dataTable: dataObj,
                    dataDetail:dataObj,
                    totalPortCnt: totalPortCnt,
                    totalSuccessPortCnt: totalSuccessPortCnt,
                    totalSuccessPortPercent: totalSuccessPortPercent,
                    dataGet: res.data.data,
                    dataFail: dataFail,
                    timeList: this.getTimeList(res.data.data)
                })
            }else {
                message.error("GET data Error!!!")
            }
        })

    }

    handleClick = (index) => {
        const {dataDetail} = this.state;
        const dataModal = [];
        dataDetail.filter(data => {
            if (data.index == index) {
                dataModal.push(data)
            }
        })
        this.setState({
            visiable: true,
            dataModal: dataModal
        })
    }
    setVisible = (visiable) => {
        this.setState({
            visiable: visiable
        })
    }

    //Change Time
    handleChangeTime = (date) => {
        const {dataGet} = this.state;
        const dataDetail = [];
        dataGet.map(data => {
            if (data.time == date) {
                dataDetail.push(data)
            }
        });
        const totalPortCnt = dataDetail.reduce((sum, e) => (sum + e.ports.length), 0);
        const totalSuccessPortCnt = dataDetail.reduce((sum, e) => (sum + e.ports.reduce((s, port) => {
            if (port.requestOpsviewResult != null && port.requestOpsviewResult.success) {
                return s + 1;
            }
            return s;
        }, 0)), 0);
        const totalSuccessPortPercent = Math.round(totalSuccessPortCnt / totalPortCnt * 100 * 100) / 100;
        const dataFail = [];
        const dataObj = dataDetail.map((data, index) => {
            let successPortCnt = data.ports.reduce((s, data) => {
                if (data.requestOpsviewResult != null && data.requestOpsviewResult.success) {
                    return s + 1;
                }
                return s;
            }, 0);

            let successPercent = Math.round(successPortCnt / data.ports.length * 100 * 100) / 100;
            if (successPercent < 100) {
                dataFail.push(data)
            }
            return {
                index: index + 1,
                data,
                successPortCnt,
                successPercent,
                length: data.ports.length
            }
        })
        this.setState({
            dataTable: dataObj,
            totalPortCnt: totalPortCnt,
            totalSuccessPortCnt: totalSuccessPortCnt,
            totalSuccessPortPercent: totalSuccessPortPercent,
            dataFail: dataFail,
        })
    }

    render() {
        const { dataTable, totalPortCnt, totalSuccessPortCnt, totalSuccessPortPercent, dataModal,timeList,dataFail} = this.state;
        const listTime = [];
        timeList.map((time, index) => {
            listTime.push(
                <Option key={time}>{moment(`${time}`).format("YYYY-MM-DD HH:mm:ss")}</Option>
            )
        })
        const columns = [
            {
                title: 'Index',
                key: 'index',
                render: record => {
                    return record.index
                }
            },
            {
                title: 'Times',
                key: 'time',
                render: record => {
                    const times = record.data.time
                    return moment(times).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {
                title: 'Name',
                key: 'name',
                render: record => {
                    return record.data.name
                }
            },
            {
                title: 'Ip',
                key: 'ip',
                render: record => {
                    return record.data.ip
                }
            },
            {
                title: 'Function',
                key: 'function',
                render: record => {
                    return record.data.function
                }
            },
            {
                title: 'Method',
                key: 'methods',
                render: record => {
                    return record.data.method
                }
            },
            {
                title: 'Stat',
                key: 'stat',
                render: record => {
                    if (record.successPercent == 0) {
                        return <div
                            style={{color: "red"}}>{record.successPortCnt + '/' + record.length + '(' + record.successPercent + '%)'}</div>
                    }
                    return <div
                        style={{color: "green"}}>{record.successPortCnt + '/' + record.length + '(' + record.successPercent + '%)'}</div>


                }
            },
            {
                title: 'Action',
                key: 'action',
                render: record => {
                    return (<div>
                        <Icon
                            type="eye"
                            style={{
                                width: 26,
                                height: 26,
                                backgroundColor: "#00b5ad",
                                padding: 5,
                                color: "white",
                                fontWeight: 700,
                                borderRadius: 5
                            }}
                            onClick={() => this.handleClick(record.index)}
                        />

                    </div>)
                }
            },

        ]
        return (

            <RemovePortsLogsWrapper>
                <Card style={{width: "100%", fontWeight: 600, marginBottom: 15}}>
                    <h2 style={{fontWeight: 700}}>Logs</h2>

                    <div style={{width: 1200, marginBottom: 100}}>
                        <div style={{width: 200, float: "left"}}>
                            <h4>Choose log date</h4>
                            <DatePicker
                                onChange={this.onChangeDate}
                                format={dateFormat}
                                defaultValue={moment().subtract(0, 'days')}
                            />
                        </div>
                        <div style={{width: 200, float: "left"}}>
                            <h4> Search by name...</h4>
                            <Search style={{width: 180}} placeholder="Search by name..."/>
                        </div>

                        <div style={{width: 200, float: "left"}}>
                            <h4> Search by time</h4>
                            <Select
                                style={{width: 180}}
                                defaultValue={"all"}
                                onChange={this.handleChangeTime}
                            >
                                {listTime}
                            </Select>
                        </div>

                    </div>

                    <Tabs type="card">
                        <TabPane tab="Overview" key="1">
                            <Alert style={{fontWeight: 650, textAlign: "center"}}
                                   message={`${totalSuccessPortCnt}/${totalPortCnt}(${totalSuccessPortPercent}%)`}
                                   type="info"/>
                            <Table
                                style={{fontWeight: 500, marginTop: 10}}
                                columns={columns}
                                dataSource={dataTable}
                                bordered
                                rowKey={record => record.index}
                            />

                        </TabPane>
                        <TabPane tab="Fail list" key="2">
                            <TableFail dataFail={dataFail}/>
                        </TabPane>

                    </Tabs>
                    <Modal
                        width={1200}
                        closable={false}
                        // title={`Ports of device ${record.data.name} | ${record.data.ip}`}
                        centered
                        visible={this.state.visiable}
                        footer={[
                            <Button key={1} type="danger" onClick={() => this.setVisible(false)}>Close</Button>
                        ]}
                    >
                        <TableDetail dataModal={dataModal}/>
                    </Modal>
                </Card>
            </RemovePortsLogsWrapper>
        );
    }
}

export default RemovePortsLogs;



import React from "react";
import {Table, message, Card, Icon, Alert, Modal, Button, Row, Col, Select,Input} from 'antd';
import {AllDevicesWrapper} from "./AllDevices.style"
import axios from "axios";
import Search from "antd/lib/input/Search";
import TableDetail from "./TableDetail";
import moment from "moment";

const {confirm} = Modal;

const Option = Select.Option;

class AllDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
            dataDetail: [],
            crawledCnt: null,
            standardCnt: null,
            numberTotalDevices: null,
            visibleDetail: false,
            visibleEdit: false,
            dataModal: [],
            dataEdit: [],
            nameDevice: [],
            ipDevice: [],
            functionDevice:[],
            areaDevice:[],
            roomDevice:[],
            rackDevice:[],
            functionList: [],
            areaList: [],
            roomList: [],
            rackEdit: []
        }
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/net-devices"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET NET devices successfull!");
            const newData = data.map((row, index) => {
                    if (!Array.isArray(row.ports)) {
                        return {
                            index: index + 1,
                            row,
                        };
                    }
                    const normalPortCnt = row.ports.reduce((sum, port) => (sum + (port.description ? 1 : 0)), 0); //port has description
                    let standardPortCnt = 0; // port has L1#,L2#,... and bypass ##
                    let portToAddCnt = 0; // port had L1#,L2#,...
                    let monitoredPortCnt = 0; // port has existInOps

                    for (const port of row.ports) {
                        if (port.description && (port.description.startsWith('L1#') || port.description.startsWith('L2#') || port.description.startsWith('L2.5#') || port.description.startsWith('L3#'))) {
                            portToAddCnt++;
                            standardPortCnt++;
                            if (port.existInOps) {
                                monitoredPortCnt++;
                            }
                        } else if (port.description && port.description.startsWith('##')) {
                            standardPortCnt++;
                        }
                    }

                    const standardPortPercent = (normalPortCnt == 0 ? 100 : Math.round(standardPortCnt / normalPortCnt * 100 * 100) / 100);
                    const monitoredPortPercent = (portToAddCnt == 0 ? 100 : Math.round(monitoredPortCnt / portToAddCnt * 100 * 100) / 100);

                    row.normalPortCnt = normalPortCnt;
                    row.standardPortCnt = standardPortCnt;
                    row.monitoredPortCnt = monitoredPortCnt;
                    row.portToAddCnt = portToAddCnt;
                    row.standardPortPercent = standardPortPercent;
                    row.monitoredPortPercent = monitoredPortPercent;

                    return {
                        index: index + 1,
                        row,
                        normalPortCnt: normalPortCnt,
                        standardPortCnt: standardPortCnt,
                        monitoredPortCnt: monitoredPortCnt,
                        portToAddCnt: portToAddCnt,
                        standardPortPercent: standardPortPercent,
                        monitoredPortPercent: monitoredPortPercent,


                    }

                }
            );
            const crawledCnt = data.reduce((sum, e) => (sum + Array.isArray(e.ports)), 0);
            const standardCnt = data.reduce((sum, e) => (sum + (e.standardPortPercent == 100)), 0);

            this.setState({
                dataTable: newData,
                dataDetail: newData,
                crawledCnt: crawledCnt,
                standardCnt: standardCnt,
                numberTotalDevices: data.length,

            })

        }
    }

// Modal Detail
    onClickDetail = value => {
        const {dataDetail} = this.state;
        const dataModal = [];
        const nameDevice = [];
        const ipDevice = [];
        const functionDevice=[]
        dataDetail.map(data => {
            if (value == data.index) {
                dataModal.push(data);
                nameDevice.push(data.row.name)
                ipDevice.push(data.row.ip)
                functionDevice.push(data.row.function)
            }
        })
        this.setState({
            visibleDetail: true,
            dataModal: dataModal,
            nameDevice: nameDevice,
            ipDevice: ipDevice,
            functionDevice:functionDevice
        });
    }

    handleCancel = e => {
        this.setState({
            visibleDetail: false,
            visibleEdit:false
        });
    };

    //Modal check connection
    showConfirm = (index) => {
        const {dataDetail} = this.state;
        const dataModal = [];
        const nameDevice = [];
        dataDetail.map(data => {
            if (index == data.index) {
                dataModal.push(data);
                nameDevice.push(data.row.name)
            }
        })
        confirm({
            title: 'Confirm to submit?',
            content: `Are you sure to check connection to ${nameDevice}?`,
            onOk() {
                console.log('Yes');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
// Modal edit

    deduplicate = (arr) => {
        let set = new Set(arr);
        return Array.from(set);
    }
    showEdit = value => {
        const {dataDetail} = this.state;
        const dataEdit = [];
        const nameDevice = [];
        const ipDevice = [];
        const functionDevice=[];
        const areaDevice=[];
        const functionList = [];
        const areaList = [];
        const roomList=[];
        const roomDevice=[];
        const rackDevice=[];
        dataDetail.map(data => {
            functionList.push(data.row.function);
            areaList.push(data.row.area);
            roomList.push(data.row.room);
            if (value == data.index) {
                dataEdit.push(data);
                nameDevice.push(data.row.name)
                ipDevice.push(data.row.ip)
                functionDevice.push(data.row.function)
                areaDevice.push(data.row.area)
                roomDevice.push(data.row.room)
                rackDevice.push(data.row.rack)

            }
        });
        console.log(dataEdit);
        let funList = this.deduplicate(functionList);
        let arList = this.deduplicate(areaList);
        let romList=this.deduplicate(roomList)
        this.setState({
            visibleEdit: true,
            dataEdit: dataEdit,
            nameDevice: nameDevice,
            ipDevice: ipDevice,
            functionList: funList,
            areaList: arList,
            roomList:romList,
            functionDevice:functionDevice,
            areaDevice:areaDevice,
            roomDevice:roomDevice,
            rackDevice:rackDevice
        });
    }

    render() {
        const {dataModal, nameDevice, ipDevice, functionList,areaList,roomList,functionDevice,areaDevice,roomDevice,rackDevice} = this.state;
        console.log(functionDevice)
        const columns = [
            {
                title: 'Index',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Checking Time',
                key: 'check',
                render: record => {
                    return (<div style={{
                        color: record.row.time_check ? 'black' : 'red'
                    }}>{record.row.time_check ? moment(record.row.time_check).format("YYYY-MM-DD HH:mm:ss") : 'N/A'}</div>)
                }
            },
            {
                title: 'Name',
                key: 'name',
                render: record => {
                    return record.row.name
                }
            },
            {
                title: 'Ip',
                key: 'ip',
                render: record => {
                    return record.row.ip
                }
            },
            {
                title: 'Function',
                key: 'function',
                render: record => {
                    return record.row.function
                }
            },
            {
                title: 'Description',
                key: 'description',
                render: record => {
                    return record.row.description
                }
            },
            {
                title: 'Type',
                key: 'manufacturer',
                render: record => {
                    return record.row.manufacturer
                }
            },
            {
                title: 'Area',
                key: 'area',
                render: record => {
                    return record.row.area
                }
            },
            {
                title: 'Room',
                key: 'room',
                render: record => {
                    return record.row.room
                }
            },
            {
                title: 'Rack',
                key: 'rack',
                render: record => {
                    return record.row.rack
                }
            },
            {
                title: 'Standard Stat',
                key: 'standar-stat',
                render: record => {
                    return (<div style={{color: record.row.standardPortPercent == 100 ? 'green' : 'red'}}>{
                        Array.isArray(record.row.ports) ? `${record.row.standardPortCnt}/${record.row.normalPortCnt}(${record.row.standardPortPercent}%)` : 'connection error'
                    }</div>)

                }
            },
            {
                title: 'Monitored Stat',
                key: 'monitored-stat',
                render: record => {

                    return (<div
                        style={{color: record.row.monitoredPortPercent == 100 ? 'green' : 'red'}}>{
                        Array.isArray(record.row.ports) ? `${record.row.monitoredPortCnt}/${record.row.portToAddCnt}(${record.row.monitoredPortPercent}%)` : 'connection error'
                    }</div>)

                }

            },
            {
                title: 'ActionActionActionA ',
                key: 'action',
                render: record => {
                    return (<div>
                        <Icon type="eye"
                              style={{
                                  width: 30,
                                  height: 30,
                                  backgroundColor: "#00b5ad",
                                  padding: 7,
                                  color: "white",
                                  fontWeight: 700,
                                  borderRadius: 5
                              }}
                              onClick={() => this.onClickDetail(record.index)}
                        />&nbsp;
                        <Icon type="fork"
                              style={{
                                  width: 30,
                                  height: 30,
                                  backgroundColor: "#16AB39",
                                  padding: 7,
                                  color: "white",
                                  fontWeight: 700,
                                  borderRadius: 5
                              }}
                              onClick={() => this.showConfirm(record.index)}
                        />&nbsp;
                        <Icon type="edit"
                              style={{
                                  width: 30,
                                  height: 30,
                                  backgroundColor: "#fbbd08",
                                  padding: 7,
                                  color: "white",
                                  fontWeight: 700,
                                  borderRadius: 5,
                              }}
                              onClick={() => this.showEdit(record.index)}
                        />&nbsp;
                        <Icon type="delete"
                              style={{
                                  width: 30,
                                  height: 30,
                                  backgroundColor: "#db2828",
                                  padding: 7,
                                  color: "white",
                                  fontWeight: 700,
                                  borderRadius: 5
                              }}/>
                    </div>)
                }

            },
        ];
        //function list
        const functionsList = [];
        functionList.map((fun, index) => {
            functionsList.push(<Option key={index}>{fun}</Option>)
        })
        // area list
        const areasList=[]
        areaList.map((are,index)=>{
            areasList.push(<Option key={index}>{are}</Option>)
        })
        // room list
        const roomsList=[]
        roomList.map((rom,index)=>{
            roomsList.push(<Option key={index}>{rom}</Option>)
        })
        return (
            <AllDevicesWrapper>
                <Card style={{width: "100%", marginBottom: 20}}>
                    <h2> All Devices</h2>
                    <div style={{width: 200}}>
                        <h4> Search by name...</h4>
                        <Search style={{width: 180}} placeholder="Search by name..."/>
                    </div>
                </Card>
                <Card style={{width: "100%"}}>
                    <Alert
                        message={`${this.state.crawledCnt} crawled, ${this.state.standardCnt} had full standard ports, ${this.state.numberTotalDevices} total devices `}
                        type="info"
                        style={{fontWeight: 650, textAlign: "center", marginBottom: 10, color: "#0F556C"}}
                    />
                    <Table
                        scroll={{x: true}}
                        className="table-detail"
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        rowKey={record => record.index}
                    />

                </Card>
                <Modal
                    width={1000}
                    style={{height: 500}}
                    closable={false}
                    title={`Ports of device ${nameDevice} | ${ipDevice}`}
                    centered
                    visible={this.state.visibleDetail}
                    footer={[
                        <Button key={1} type="danger" onClick={() => this.handleCancel()}>Close</Button>
                    ]}
                >
                    <TableDetail dataModal={dataModal}/>
                </Modal>
                <Modal
                    width={1000}
                    style={{height: 500}}
                    closable={false}
                    title={`Ports of device ${nameDevice} | ${ipDevice}`}
                    centered
                    visible={this.state.visibleEdit}
                    footer={[
                        <div>
                            <Button key={1} style={{backgroundColor: "#16ab39", color: "white", fontWeight: 600}}
                                    onClick={() => this.handleSave()}>Save</Button>
                            <Button key={1} type="danger" onClick={() => this.handleCancel()}>Close</Button>
                        </div>
                    ]}
                >
                    <Row style={{marginBottom: 10}}>
                        <Col span={12}>
                            <h4 style={{fontWeight: 600}}>Function</h4>
                            <Select defaultValue={functionDevice} style={{width: 350}}>
                                {functionsList}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <h4 style={{fontWeight: 600}}>Aera</h4>
                            <Select defaultValue={areaDevice} style={{width: 350}}>
                                {areasList}
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <h4 style={{fontWeight: 600}}>Room</h4>
                            <Select defaultValue={roomDevice} style={{width: 350}}>
                                {roomsList}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <h4 style={{fontWeight: 600}}>Rack</h4>
                            <Input value={rackDevice} style={{width: 350}}>

                            </Input>
                        </Col>
                    </Row>
                    {/*<ModalEdit dataEdit={dataEdit}/>*/}
                </Modal>
            </AllDevicesWrapper>


        )
    }
}

export default AllDevice;
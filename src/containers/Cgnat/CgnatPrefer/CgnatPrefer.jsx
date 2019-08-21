import React from "react";
import {Table, message, Card, Icon, Button, Input} from 'antd';
import {CgnatPreferWrapper} from "./CgnatPrefer.style";
import axios from "axios";
import _ from 'lodash';
import ExportJsonExcel from 'js-export-excel';

const {Search} = Input;

class CgnatPrefer extends React.Component {
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
            url: "https://netd.ast.fpt.net/netd-api/api/cgnat-prefer"
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
            });
            message.success("GET CGNAT Prefer  successfull!")
            this.setState({
                dataTable: dataObject
            })
        }
    }

    downloadExcel = () => {
        const option = {};
        const {dataTable} = this.state;
        console.log(dataTable)
        const dataExcel = [];
        for (let i in dataTable) {
            if (dataTable) {
                let obj = {
                    "Index": dataTable[i].index,
                    "Region": dataTable[i].dataObj.mpRegion,
                    "Group Mp": dataTable[i].dataObj.mpGroup,
                    "Mp": dataTable[i].dataObj.name,
                    "MP Ip": dataTable[i].dataObj.ip,
                    "CGNAT": dataTable[i].dataObj.cgnat,
                    "CGNAT Ip": dataTable[i].dataObj.cgnat_ip


                }
                dataExcel.push(obj)

            }
        }
        option.fileName = 'CGNAT_Prefer'
        option.datas = [
            {
                sheetData: dataExcel,
                sheetName: 'sheet',
                sheetFilter: ['Index', 'Region', 'Group Mp', 'Mp', 'Mp Ip', 'CGNAT', 'CGNAT Ip'],
                sheetHeader: ['Index', 'Region', 'Group Mp', 'Mp', 'Mp Ip', 'CGNAT', 'CGNAT Ip'],
            }
        ];

        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
    handleSearch = (value) => {
        const {dataTable} = this.state;
        const filteredList = dataTable.filter(function (item) {
            const lowerCaseSearchByName = value.trim().toLowerCase();
            return item.dataObj.mpGroup == lowerCaseSearchByName.toUpperCase();
        });
        this.setState({
            dataTable: filteredList
        })
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
                key: 'mpRegion',
                render: record => {
                    return record.dataObj.mpRegion
                }
            },
            {
                title: 'Group Mp',
                key: 'mpGroup',
                render: record => {
                    return record.dataObj.mpGroup
                }
            },
            {
                title: 'MP',
                key: 'mp',
                render: record => {
                    return record.dataObj.name
                }
            },
            {
                title: 'MP Ip',
                key: 'ip',
                render: record => {
                    return record.dataObj.ip
                }
            },
            {
                title: 'CGNAT',
                key: 'cgnat',
                render: record => {
                    return record.dataObj.cgnat
                }
            },
            {
                title: 'CGNAT Ip',
                key: 'cgnat_ip',
                render: record => {
                    return record.dataObj.cgnat_ip
                }
            },
        ];


        return (
            <CgnatPreferWrapper>

                <Card style={{marginBottom: 10}}>

                    <Search
                        placeholder="Search by name..."
                        onSearch={value => this.handleSearch(value)}
                        style={{width: 180, marginRight: 20}}
                        enterButton
                    />
                    <Button type="primary" onClick={this.downloadExcel}>Export to excel</Button>

                </Card>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataTable}
                        bordered
                        // pagination={{ defaultPageSize: 20}}
                        rowKey={record => record.index}
                    />
                </Card>
            </CgnatPreferWrapper>

        )
    }
}

export default CgnatPrefer;
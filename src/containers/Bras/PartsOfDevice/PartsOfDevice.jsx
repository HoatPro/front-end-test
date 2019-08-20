import React from "react";
import {PartsOfDeviceWrapper} from "./PartsOfDevice.style";
import {Card, Button, Table, Input, message} from 'antd';
import ExportJsonExcel from 'js-export-excel';
import axios from 'axios'

const {Search} = Input

class PartsOfDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        }

    }

    refactorData(parts) {

        function createNewDataRow() {
            let data = [
                {
                    name: "Juniper MX960",
                    excelLocation: "d",
                    number: 0
                },
                {
                    name: "Juniper MX480",
                    excelLocation: "e",
                    number: 0
                },
                {
                    name: "Juniper MX240",
                    excelLocation: "f",
                    number: 0
                },
                {
                    name: "Juniper MX104",
                    excelLocation: "g",
                    number: 0
                },
                {
                    name: "Juniper MX5-T",
                    excelLocation: "h",
                    number: 0
                },
                {
                    name: "MX SCB",
                    excelLocation: "i",
                    number: 0
                },
                {
                    name: "Enhanced MX SCB",
                    excelLocation: "j",
                    number: 0
                },
                {
                    name: "Enhanced MX SCB 2",
                    excelLocation: "k",
                    number: 0
                },
                {
                    name: "RE-S-2000",
                    excelLocation: "l",
                    number: 0
                },
                {
                    name: "RE-S-1800x4",
                    excelLocation: "m",
                    number: 0
                },
                {
                    name: "RE-MX-104",
                    excelLocation: "n",
                    number: 0
                },
                {
                    name: "MPCE Type 2 3D",
                    excelLocation: "o",
                    number: 0
                },
                {
                    name: "MIC-3D-4XGE-XFP",
                    excelLocation: "p",
                    number: 0
                },
                {
                    //name: "MIC 3D 20x 1GE(LAN) SFP",
                    name: "MIC-3D-2XGE-XFP",
                    excelLocation: "q",
                    number: 0
                },
                {
                    // name: "MIC 3D 20x 1GE(LAN)-E,SFP",
                    name: "MIC-3D-20GE-SFP",
                    excelLocation: "r",
                    number: 0
                },
                {
                    // name: "MIC-3D-20GE-SFP-E",
                    name: "MIC-3D-20GE-SFP-E",
                    excelLocation: "s",
                    number: 0
                },
                {
                    name: "MPCE Type 3 3D",
                    excelLocation: "t",
                    number: 0
                },
                {
                    name: "MIC3-3D-10XGE-SFPP",
                    excelLocation: "u",
                    number: 0
                },
                {
                    name: "MPC4E 3D 32XGE",
                    excelLocation: "v",
                    number: 0
                },
                {
                    name: "MPC4E 3D 2CGE+8XGE",
                    excelLocation: "w",
                    number: 0
                },
                {
                    name: "CFP-100G-SR10",
                    excelLocation: "x",
                    number: 0
                },
                {
                    name: "CFP-100G-LR4",
                    excelLocation: "y",
                    number: 0
                },
                {
                    name: "CFP-100G-ER",
                    excelLocation: "z",
                    number: 0
                },
                {
                    name: "MPC5E 3D 2CGE+4XGE",
                    excelLocation: "aa",
                    number: 0
                },
                {
                    name: "CFP2-100G-SR10-D",
                    excelLocation: "ab",
                    number: 0
                },
                {
                    name: "MPC7E 3D 40XGE",
                    excelLocation: "ac",
                    number: 0
                },
                {
                    name: "MPC7E 3D MRATE-12xQSFPP-XGE-XLGE-CGE",
                    excelLocation: "ad",
                    number: 0
                },
                {
                    name: "QSFP-100GBASE-SR4",
                    excelLocation: "ae",
                    number: 0
                },
                {
                    name: "QSFP-100GBASE-LR4",
                    excelLocation: "af",
                    number: 0
                },
                {
                    name: "QSFP-100GBASE-ER4",
                    excelLocation: "ag",
                    number: 0
                },
                {
                    name: "QSFP+-40G-SR4",
                    excelLocation: "ah",
                    number: 0
                },
                {
                    name: "QSFP+-40G-LR4",
                    excelLocation: "ai",
                    number: 0
                }
            ];
            return data;
        }

        let rows = [];

        if (parts && parts.length > 0) {
            let listPart = parts
            let listRow = [];
            listPart.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                } else {
                    return -1;
                }
            });


            let mpNameCheck = listPart[0].name;
            // console.log(mpNameCheck);
            let mpRow = {
                name: mpNameCheck,
                data: []
            };
            let listRowData = [];
            let listExcelData = createNewDataRow();
            //refactor data
            for (let part of listPart) {
                if (part.name != mpNameCheck) {
                    mpNameCheck = part.name;
                    mpRow.data = [...listExcelData];
                    let cloneRow = {...mpRow};
                    listRowData.push(cloneRow);
                    mpRow = {
                        name: mpNameCheck,
                        data: []
                    };
                    listExcelData = createNewDataRow();

                }

                for (let excelItem of listExcelData) {

                    if (part.description) {
                        part.description = part.description.trim();
                    }
                    if (part.manualDescription) {
                        part.manualDescription = part.manualDescription.trim();
                    }

                    if (excelItem.name == part.description || excelItem.name == part.manualDescription) {
                        excelItem.number += 1;
                        break;
                    }
                }
            }
            mpRow.data = [...listExcelData];
            listRowData.push({...mpRow});
            listExcelData = null;

            rows = listRowData;
        }

        return rows;
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/get-part-in-group-mp"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET group MP topo successfully!");
            const dataTable = this.refactorData(data);
            const dataObj = dataTable.map((data, index) => {
                return {
                    index: index + 1,
                    data
                }
            })
            this.setState({
                dataTable: dataObj,

            })
        } else {
            message.error("GET data error!!!")
        }
    }

    downloadExcel = () => {
        const option = {};
        const {dataTable} = this.state;
        console.log(dataTable);
        const dataNew = dataTable.map((data, index) => {
            const numberJuniperMX960 = {};
            const numberJuniperMX480 = {};
            const numberJuniperMX104 = {};
            const numberJuniperMX5T = {};
            const numberMXSCB = {};
            const numberEnhancedMXSCB = {};
            const numberEnhancedMXSCB2 = {};
            const numberRES1800x4 = {};
            const deviceNameNew = [];
            const numberREMX104 = {};
            const numberMPCEType23D = {};
            const numberMIC3D4XGEXFP = {};
            const numberMIC3D2XGEXFP = {};
            const numberMIC3D20GESFP = {};
            const numberMPCEType33D = {};
            const numberMIC33D10XGESFPP = {};
            const numberMPC4E3D32XGE = {};
            const numberMPC4E3D2CGE8XGE = {};
            const numberCFP100GSR10 = {};
            const numberMPC5E3D2CGE4XGE = {};
            const numberCFP2100GSR10D = {};
            const numberMPC7E3DMRATE = {};
            const numberQSFP100GBASESR4 = {};
            const numberQSFP100GBASELR4 = {};
            const numberQSFP40GSR4 = {};
            let deviceName = data.data.name;
            if ((deviceName + '').includes('NOC-NET-')) {
                deviceName = deviceName.replace("NOC-NET-", "");
                deviceName = deviceName.substr(0, deviceName.lastIndexOf("-"));
                deviceNameNew.push(deviceName);
            }
            data.data.data.map(dt => {
                if (dt.name === "Juniper MX960") {
                    numberJuniperMX960[0] = dt.number
                }
                if (dt.name === "Juniper MX480") {
                    numberJuniperMX480[0] = dt.number
                }
                if (dt.name === "Juniper MX104") {
                    numberJuniperMX104[0] = dt.number
                }
                if (dt.name === "Juniper MX5-T") {
                    numberJuniperMX5T[0] = dt.number
                }
                if (dt.name === "MX SCB") {
                    numberMXSCB[0] = dt.number
                }
                if (dt.name === "Enhanced MX SCB") {
                    numberEnhancedMXSCB[0] = dt.number
                }
                if (dt.name === "Enhanced MX SCB 2") {
                    numberEnhancedMXSCB2[0] = dt.number
                }
                if (dt.name === "RE-S-1800x4") {
                    numberRES1800x4[0] = dt.number
                }
                if (dt.name === "RE-MX-104") {
                    numberREMX104[0] = dt.number
                }
                if (dt.name === "MPCE Type 2 3D") {
                    numberMPCEType23D[0] = dt.number
                }
                if (dt.name === "MIC-3D-4XGE-XFP") {
                    numberMIC3D4XGEXFP[0] = dt.number
                }
                if (dt.name === "MIC-3D-2XGE-XFP") {
                    numberMIC3D2XGEXFP[0] = dt.number
                }
                if (dt.name === "MIC-3D-20GE-SFP") {
                    numberMIC3D20GESFP[0] = dt.number
                }
                if (dt.name === "MPCE Type 3 3D") {
                    numberMPCEType33D[0] = dt.number
                }
                if (dt.name === "MIC3-3D-10XGE-SFPP") {
                    numberMIC33D10XGESFPP[0] = dt.number
                }

                if (dt.name === "MPC4E 3D 2CGE+8XGE") {
                    numberMPC4E3D2CGE8XGE[0] = dt.number
                }

                if (dt.name === "CFP-100G-SR10") {
                    numberCFP100GSR10[0] = dt.number
                }
                if (dt.name === "MPC5E 3D 2CGE+4XGE") {
                    numberMPC5E3D2CGE4XGE[0] = dt.number
                }
                if (dt.name === "CFP2-100G-SR10-D") {
                    numberCFP2100GSR10D[0] = dt.number
                }
                if (dt.name === "MPC7E 3D MRATE-12xQSFPP-XGE-XLGE-CGE") {
                    numberMPC7E3DMRATE[0] = dt.number
                }
                if (dt.name === "QSFP-100GBASE-SR4") {
                    numberQSFP100GBASESR4[0] = dt.number
                }
                if (dt.name === "QSFP-100GBASE-LR4") {
                    numberQSFP100GBASELR4[0] = dt.number
                }
                if (dt.name === "QSFP+-40G-SR4") {
                    numberQSFP40GSR4[0] = dt.number
                }


            })
            return {
                index: index + 1,
                deviceNameNew: deviceNameNew,
                numberJuniperMX960: numberJuniperMX960,
                numberJuniperMX480: numberJuniperMX480,
                numberJuniperMX104: numberJuniperMX104,
                numberJuniperMX5T: numberJuniperMX5T,
                numberMXSCB: numberMXSCB,
                numberEnhancedMXSCB: numberEnhancedMXSCB,
                numberEnhancedMXSCB2: numberEnhancedMXSCB2,
                numberRES1800x4: numberRES1800x4,
                numberREMX104: numberREMX104,
                numberMPCEType23D: numberMPCEType23D,
                numberMIC3D4XGEXFP: numberMIC3D4XGEXFP,
                numberMIC3D2XGEXFP: numberMIC3D2XGEXFP,
                numberMIC3D20GESFP: numberMIC3D20GESFP,
                numberMPCEType33D: numberMPCEType33D,
                numberMIC33D10XGESFPP: numberMIC33D10XGESFPP,
                numberMPC4E3D32XGE: numberMPC4E3D32XGE,
                numberMPC4E3D2CGE8XGE: numberMPC4E3D2CGE8XGE,
                numberCFP100GSR10: numberCFP100GSR10,
                numberMPC5E3D2CGE4XGE: numberMPC5E3D2CGE4XGE,
                numberCFP2100GSR10D: numberCFP2100GSR10D,
                numberMPC7E3DMRATE: numberMPC7E3DMRATE,
                numberQSFP100GBASESR4: numberQSFP100GBASESR4,
                numberQSFP100GBASELR4: numberQSFP100GBASELR4,
                numberQSFP40GSR4: numberQSFP40GSR4

            }

        });

        console.log(dataNew)
        const dataExcel = [];
        for (let i in dataNew) {
            console.log(dataNew[i])
            if (dataNew) {
                let obj = {
                    "Index": dataNew[i].index,
                    "Mp": dataNew[i].deviceNameNew,
                    "Juniper MX960": dataNew[i].numberJuniperMX960[0],
                    "Juniper MX480": dataNew[i].numberJuniperMX480[0],
                    "Juniper MX104": dataNew[i].numberJuniperMX104[0],
                    "Juniper MX5-T": dataNew[i].numberJuniperMX5T[0],
                    "MX SCB": dataNew[i].numberMXSCB[0],
                    "Enhanced MX SCB": dataNew[i].numberEnhancedMXSCB[0],
                    "Enhanced MX SCB 2": dataNew[i].numberEnhancedMXSCB2[0],

                    "RE-S-1800x4": dataNew[i].numberRES1800x4[0],
                    "RE-MX-104": dataNew[i].numberREMX104[0],
                    "MPCE Type 2 3D": dataNew[i].numberMPCEType23D[0],
                    "MIC-3D-4XGE-XFP": dataNew[i].numberMIC3D4XGEXFP[0],
                    "MIC-3D-2XGE-XFP": dataNew[i].numberMIC3D2XGEXFP[0],
                    "MIC-3D-20GE-SFP": dataNew[i].numberMIC3D20GESFP[0],
                    "MPCE Type 3 3D": dataNew[i].numberMPCEType33D[0],
                    "MIC3-3D-10XGE-SFPP": dataNew[i].numberMIC33D10XGESFPP[0],
                    "MPC4E 3D 32XGE": dataNew[i].numberMPC4E3D32XGE[0],

                    "MPC4E 3D 2CGE+8XGE": dataNew[i].numberMPC4E3D2CGE8XGE[0],
                    "CFP-100G-SR10": dataNew[i].numberCFP100GSR10[0],
                    "MPC5E 3D 2CGE+4XGE": dataNew[i].numberMPC5E3D2CGE4XGE[0],
                    "CFP2-100G-SR10-D": dataNew[i].numberCFP2100GSR10D[0],
                    "MPC7E 3D MRATE-12xQSFPP-XGE-XLGE-CGE": dataNew[i].numberMPC7E3DMRATE[0],
                    "QSFP-100GBASE-SR4": dataNew[i].numberQSFP100GBASESR4[0],
                    "QSFP-100GBASE-LR4": dataNew[i].numberQSFP100GBASELR4[0],
                    "QSFP+-40G-SR4": dataNew[i].numberQSFP40GSR4[0]


                }
                dataExcel.push(obj)

            }
        }
        option.fileName = 'Parts_group_MP'
        option.datas = [
            {
                sheetData: dataExcel,
                sheetName: 'sheet',
                sheetFilter: ['Index', 'Mp', 'Juniper MX960', 'Juniper MX480', 'Juniper MX104', 'Juniper MX5-T', 'MX SCB', 'Enhanced MX SCB', 'Enhanced MX SCB 2', 'RE-S-1800x4', 'RE-MX-104', 'MPCE Type 2 3D', 'MIC-3D-4XGE-XFP', 'MIC-3D-2XGE-XFP', 'MIC-3D-20GE-SFP', 'MPCE Type 3 3D', 'MIC3-3D-10XGE-SFPP', 'MPC4E 3D 32XGE',
                    'MPC4E 3D 2CGE+8XGE',
                    'CFP-100G-SR10',
                    'MPC5E 3D 2CGE+4XGE',
                    'CFP2-100G-SR10-D',
                    'MPC7E 3D MRATE-12xQSFPP-XGE-XLGE-CGE',
                    'QSFP-100GBASE-SR4',
                    'QSFP-100GBASE-LR4',
                    'QSFP+-40G-SR4'
                ],
                sheetHeader: ['Index', 'Mp', 'Juniper MX960', 'Juniper MX480', 'Juniper MX104', 'Juniper MX5-T', 'MX SCB', 'Enhanced MX SCB', 'Enhanced MX SCB 2', 'RE-S-1800x4', 'RE-MX-104', 'MPCE Type 2 3D', 'MIC-3D-4XGE-XFP', 'MIC-3D-2XGE-XFP', 'MIC-3D-20GE-SFP', 'MPCE Type 3 3D', 'MIC3-3D-10XGE-SFPP', 'MPC4E 3D 32XGE',
                    'MPC4E 3D 2CGE+8XGE',
                    'CFP-100G-SR10',
                    'MPC5E 3D 2CGE+4XGE',
                    'CFP2-100G-SR10-D',
                    'MPC7E 3D MRATE-12xQSFPP-XGE-XLGE-CGE',
                    'QSFP-100GBASE-SR4',
                    'QSFP-100GBASE-LR4',
                    'QSFP+-40G-SR4'],
            }
        ];

        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }


    render() {
        const {dataTable} = this.state;
        const columns = [
            {
                title: 'Index',
                key: 'index',
                render: record => {
                    return record.index
                }
            },
            {
                title: 'Mp',
                key: 'mp',
                render: record => {
                    let deviceName = record.data.name;
                    if ((deviceName + '').includes('NOC-NET-')) {
                        deviceName = deviceName.replace("NOC-NET-", "");
                        deviceName = deviceName.substr(0, deviceName.lastIndexOf("-"));
                        return deviceName
                    }
                }
            },
            {
                title: 'Juniper MX960',
                key: 'jupiter-mx960',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "Juniper MX960") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'Juniper MX480',
                key: 'jupiter-mx480',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "Juniper MX480") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'Juniper MX104',
                key: 'jupiter-mx104',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "Juniper MX104") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'Juniper MX5-T',
                key: 'jupiter-mx5t',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "Juniper MX5-T") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'MX SCB',
                key: 'mxScb',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "MX SCB") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'Enhanced MX SCB',
                key: 'enhanced-mx-scb',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "Enhanced MX SCB") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'Enhanced MX SCB 2',
                key: 'enhanced-mx-scb-2',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "Enhanced MX SCB 2") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'RE-S-1800x4',
                key: 'res-1800',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "RE-S-1800x4") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'RE-MX-104',
                key: 're-mx-104',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "RE-MX-104") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'MPCE Type 2 3D',
                key: 'mpce-type-2',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "MPCE Type 2 3D") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'MIC-3D-4XGE-XFP',
                key: 'mic-3d-4xge-xfp',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "MIC-3D-4XGE-XFP") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'MIC-3D-2XGE-XFP',
                key: 'mic-3d-3xge-xfp',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "MIC-3D-2XGE-XFP") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'MIC-3D-20GE-SFP',
                key: 'mic-3d-20ge-xfp',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "MIC-3D-20GE-SFP") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'MPCE Type 3 3D',
                key: 'mpce-type-3-3d',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "MPCE Type 3 3D") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'MIC3-3D-10XGE-SFPP',
                key: 'mic3-3d-10xge-sfpp',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "MIC3-3D-10XGE-SFPP") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'MPC4E 3D 32XGE',
                key: 'mpc4e-3d-32xge',
                render: record => {
                    const numberResult = []
                    record.data.data.map(dt => {
                        if (dt.name === "MPC4E 3D 32XGE") {
                            numberResult.push(dt.number)
                        }
                    })
                    return numberResult
                }
            },
            {
                title: 'MPC4 2x100',
                key: 'mpc4-2x100',
                children: [
                    {
                        title: 'MPC4E 3D 2CGE+8XGE',
                        key: 'mpc4e-3d-3cge-8xge',
                        render: record => {
                            const numberResult = []
                            record.data.data.map(dt => {
                                if (dt.name === "MPC4E 3D 2CGE+8XGE") {
                                    numberResult.push(dt.number)
                                }
                            })
                            return numberResult
                        }
                    },
                    {
                        title: 'CFP-100G-SR10',
                        key: 'cfp-100g-sr10',
                        render: record => {
                            const numberResult = []
                            record.data.data.map(dt => {
                                if (dt.name === "CFP-100G-SR10") {
                                    numberResult.push(dt.number)
                                }
                            })
                            return numberResult
                        }
                    },
                ]
            },
            {
                title: 'MPC5 2xCGE',
                key: 'mpc5-2xcge',
                children: [
                    {
                        title: 'MPC5E 3D 2CGE+4XGE',
                        key: 'mpc4e-3d-3cge-4xge',
                        render: record => {
                            const numberResult = []
                            record.data.data.map(dt => {
                                if (dt.name === "MPC5E 3D 2CGE+4XGE") {
                                    numberResult.push(dt.number)
                                }
                            })
                            return numberResult
                        }
                    },
                    {
                        title: 'CFP2-100G-SR10-D',
                        key: 'cfp2-100g-sr10-d',
                        render: record => {
                            const numberResult = []
                            record.data.data.map(dt => {
                                if (dt.name === "CFP2-100G-SR10-D") {
                                    numberResult.push(dt.number)
                                }
                            })
                            return numberResult
                        }
                    },
                ]
            },
            {
                title: 'MPC7 Multirate',
                key: 'mpc7',
                children: [
                    {
                        title: 'MPC7E 3D MRATE-12xQSFPP-XGE-XLGE-CGE',
                        key: 'mpc7e-3d-mrate',
                        render: record => {
                            const numberResult = []
                            record.data.data.map(dt => {
                                if (dt.name === "MPC7E 3D MRATE-12xQSFPP-XGE-XLGE-CGE") {
                                    numberResult.push(dt.number)
                                }
                            })
                            return numberResult
                        }
                    },
                    {
                        title: 'QSFP-100GBASE-SR4',
                        key: 'qsfp-100gbase-sr4',
                        render: record => {
                            const numberResult = []
                            record.data.data.map(dt => {
                                if (dt.name === "QSFP-100GBASE-SR4") {
                                    numberResult.push(dt.number)
                                }
                            })
                            return numberResult
                        }
                    },
                    {
                        title: 'QSFP-100GBASE-LR4',
                        key: 'qsfp-100gbase-lr4',
                        render: record => {
                            const numberResult = []
                            record.data.data.map(dt => {
                                if (dt.name === "QSFP-100GBASE-LR4") {
                                    numberResult.push(dt.number)
                                }
                            })
                            return numberResult
                        }
                    },
                    {
                        title: 'QSFP+-40G-SR4',
                        key: 'qsfp-40g-sr4',
                        render: record => {
                            const numberResult = []
                            record.data.data.map(dt => {
                                if (dt.name === "QSFP+-40G-SR4") {
                                    numberResult.push(dt.number)
                                }
                            })
                            return numberResult
                        }
                    },

                ]
            }


        ];
        return (
            <PartsOfDeviceWrapper>
                <Card style={{marginBottom: 10}}>

                    <h2>Parts of Group MP</h2>
                    <div style={{marginBottom: 20, width: 200, float: "left", marginRight: 15}}>
                        <h4>Search by name</h4>
                        <Search placeholder="search by name....."/>
                    </div>
                    <div>
                        <h4>Export</h4>
                        <Button type="primary" onClick={this.downloadExcel}>Export to excel file </Button>
                    </div>

                </Card>
                <Card>
                    <Table
                        style={{textAlign: "right"}}
                        scroll={{x: '1%'}}
                        columns={columns}
                        dataSource={dataTable}
                        bordered
                        size={"middle"}
                        rowKey={record => record.index}
                    />
                </Card>


            </PartsOfDeviceWrapper>
        );
    }
}

export default PartsOfDevice;



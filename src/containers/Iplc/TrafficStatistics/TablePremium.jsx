import React from "react";
import {Table} from "antd";

const {Column, ColumnGroup} = Table;

class TablePremium extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        }
    }

    //Convert Data
    filterList = (list, service = -1, type = -1, provider = -1, location = -1, localLocation = -1) => {

        // params can be an array or single varible
        return list.filter(e => {
            return (service == -1 || e.service == service || (Array.isArray(service) && (service.includes(-1) || service.includes(e.service))))
                && (type == -1 || e.type == type || (Array.isArray(type) && (type.includes(-1) || type.includes(e.type))))
                && (provider == -1 || e.provider == provider || (Array.isArray(provider) && (provider.includes(-1) || provider.includes(e.provider))))
                && (location == -1 || e.neighborLocation == location || (Array.isArray(location) && (location.includes(-1) || location.includes(e.neighborLocation))))
                && (localLocation == -1 || e.localLocation == localLocation || (Array.isArray(localLocation) && (localLocation.includes(-1) || localLocation.includes(e.localLocation))));
        });
    };

    //Sum
    sumByAttr = (list, attr) => {


        let sum = 0;
        for (const item of list) {
            sum += item[attr];
        }
        return sum;
    }

    render() {
        const listA = this.props.listA;

        const list = listA.trafficData;
        const sumTraffic = this.sumByAttr(this.filterList(list, -1, "submarine", -1, "Singapore"), 'trafficIn');
        let sumCapacity = this.sumByAttr(this.filterList(list, -1, "submarine", -1, "Singapore"), 'speed');
        let sumUsedPercent = sumTraffic / sumCapacity * (100 / 0.9);
        console.log(sumTraffic.toFixed(2));


        const data = [{
            key: '1',
            firstName: 'submarine',
            Traffic: `${this.sumByAttr(this.filterList(list, "Premium", "submarine", -1, "Singapore"), 'trafficIn').toFixed(2)}`,
            Capacity: `${this.sumByAttr(this.filterList(list, "Premium", "submarine", -1, "Singapore"), 'speed').toFixed(2)}`,
            Percent: ``,
            TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", "submarine", -1, "Hong Kong"), 'trafficIn').toFixed(2)}`,
            CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", "submarine", -1, "Hong Kong"), 'speed').toFixed(2)}`,
            PercentH: '',
            TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", "submarine", -1, "Japan"), 'trafficIn').toFixed(2)}`,
            CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", "submarine", -1, "Japan"), 'speed').toFixed(2)}`,
            PercentJ: '',
            TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", "submarine", -1, -1), 'trafficIn').toFixed(2)}`,
            CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", "submarine", -1, -1), 'speed').toFixed(2)}`,
            PercentSum: ''
        }, {
            key: '2',
            firstName: 'IA',
            Traffic: `${this.sumByAttr(this.filterList(list, "Premium", -1, "IA", "Singapore"), 'trafficIn').toFixed(2)}`,
            Capacity: `${this.sumByAttr(this.filterList(list, "Premium", -1, "IA", "Singapore"), 'speed').toFixed(2)}`,
            Percent: '',
            TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", -1, "IA", "Hong Kong"), 'trafficIn').toFixed(2)}`,
            CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", -1, "IA", "Hong Kong"), 'speed').toFixed(2)}`,
            PercentH: '',
            TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, "IA", "Japan"), 'trafficIn').toFixed(2)}`,
            CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, "IA", "Japan"), 'speed').toFixed(2)}`,
            PercentJ: '',
            TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", -1, "IA", -1), 'trafficIn').toFixed(2)}`,
            CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", -1, "IA", -1), 'speed').toFixed(2)}`,
            PercentSum: ''
        }, {
            key: '3',
            firstName: 'AAE-1',
            Traffic: `${this.sumByAttr(this.filterList(list, "Premium", -1, "AAE-1", "Singapore"), 'trafficIn').toFixed(2)}`,
            Capacity: `${this.sumByAttr(this.filterList(list, "Premium", -1, "AAE-1", "Singapore"), 'speed').toFixed(2)}`,
            Percent: '',
            TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", -1, "AAE-1", "Hong Kong"), 'trafficIn').toFixed(2)}`,
            CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", -1, "AAE-1", "Hong Kong"), 'speed').toFixed(2)}`,
            PercentH: '',
            TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, "AAE-1", "Japan"), 'trafficIn').toFixed(2)}`,
            CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, "AAE-1", "Japan"), 'speed').toFixed(2)}`,
            PercentJ: '',
            TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", -1, "AAE-1", -1), 'trafficIn').toFixed(2)}`,
            CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", -1, "AAE-1", -1), 'speed').toFixed(2)}`,
            PercentSum: ''
        },
            {
                key: '4',
                firstName: 'APG',
                Traffic: `${this.sumByAttr(this.filterList(list, "Premium", -1, "APG", "Singapore"), 'trafficIn').toFixed(2)}`,
                Capacity: `${this.sumByAttr(this.filterList(list, "Premium", -1, "APG", "Singapore"), 'speed').toFixed(2)}`,
                Percent: '',
                TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", -1, "APG", "Hong Kong"), 'trafficIn').toFixed(2)}`,
                CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", -1, "APG", "Hong Kong"), 'speed').toFixed(2)}`,
                PercentH: '',
                TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, "APG", "Japan"), 'trafficIn').toFixed(2)}`,
                CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, "APG", "Japan"), 'speed').toFixed(2)}`,
                PercentJ: '',
                TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", -1, "APG", -1), 'trafficIn').toFixed(2)}`,
                CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", -1, "APG", -1), 'speed').toFixed(2)}`,
                PercentSum: ''
            },
            {
                key: '5',
                firstName: 'Landline',
                Traffic: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", -1, "Singapore"), 'trafficIn').toFixed(2)}`,
                Capacity: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", -1, "Singapore"), 'speed').toFixed(2)}`,
                Percent: '',
                TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", -1, "Hong Kong"), 'trafficIn').toFixed(2)}`,
                CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", -1, "Hong Kong"), 'speed').toFixed(2)}`,
                PercentH: '',
                TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", -1, "Japan"), 'trafficIn').toFixed(2)}`,
                CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", -1, "Japan"), 'speed').toFixed(2)}`,
                PercentJ: '',
                TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", -1, -1), 'trafficIn').toFixed(2)}`,
                CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", -1, -1), 'speed').toFixed(2)}`,
                PercentSum: ''
            },
            {
                key: '6',
                firstName: 'CT',
                Traffic: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CT", "Singapore"), 'trafficIn').toFixed(2)}`,
                Capacity: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CT", "Singapore"), 'speed').toFixed(2)}`,
                Percent: '',
                TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CT", "Hong Kong"), 'trafficIn').toFixed(2)}`,
                CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CT", "Hong Kong"), 'speed').toFixed(2)}`,
                PercentH: '',
                TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CT", "Japan"), 'trafficIn').toFixed(2)}`,
                CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CT", "Japan"), 'speed').toFixed(2)}`,
                PercentJ: '',
                TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CT", -1), 'trafficIn').toFixed(2)}`,
                CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CT", -1), 'speed').toFixed(2)}`,
                PercentSum: ''
            },
            {
                key: '7',
                firstName: 'CMI',
                Traffic: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CMI", "Singapore"), 'trafficIn').toFixed(2)}`,
                Capacity: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CMI", "Singapore"), 'speed').toFixed(2)}`,
                Percent: '',
                TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CMI", "Hong Kong"), 'trafficIn').toFixed(2)}`,
                CapacityH: `${this.sumByAttr(this.filterList(list, -1, "Landline", "CMI", "Hong Kong"), 'speed').toFixed(2)}`,
                PercentH: '',
                TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CMI", "Japan"), 'trafficIn').toFixed(2)}`,
                CapacityJ: `${this.sumByAttr(this.filterList(list, -1, "Landline", "CMI", "Japan"), 'speed').toFixed(2)}`,
                PercentJ: '',
                TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CMI", -1), 'trafficIn').toFixed(2)}`,
                CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CMI", -1), 'speed').toFixed(2)}`,
                PercentSum: ''
            },
            {
                key: '8',
                firstName: 'CU',
                Traffic: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CU", "Singapore"), 'trafficIn').toFixed(2)}`,
                Capacity: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CU", "Singapore"), 'speed').toFixed(2)}`,
                Percent: "",
                TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CU", "Hong Kong"), 'trafficIn').toFixed(2)}`,
                CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CU", "Hong Kong"), 'speed').toFixed(2)}`,
                PercentH: '',
                TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CU", "Japan"), 'trafficIn').toFixed(2)}`,
                CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CU", "Japan"), 'speed').toFixed(2)}`,
                PercentJ: '',
                TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CU", -1), 'trafficIn').toFixed(2)}`,
                CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", "Landline", "CU", -1), 'speed').toFixed(2)}`,
                PercentSum: ''
            },
            {
                key: '9',
                firstName: 'Ho Chi Minh',
                Traffic: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Singapore", "Ho Chi Minh"), 'trafficIn').toFixed(2)}`,
                Capacity: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Singapore", "Ho Chi Minh"), 'speed').toFixed(2)}`,
                Percent: '',
                TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Hong Kong", "Ho Chi Minh"), 'trafficIn').toFixed(2)}`,
                CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Hong Kong", "Ho Chi Minh"), 'speed').toFixed(2)}`,
                PercentH: '',
                TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Japan", "Ho Chi Minh"), 'trafficIn').toFixed(2)}`,
                CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Japan", "Ho Chi Minh"), 'speed').toFixed(2)}`,
                PercentJ: '',
                TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, -1, "Ho Chi Minh"), 'trafficIn').toFixed(2)}`,
                CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, -1, "Ho Chi Minh"), 'speed').toFixed(2)}`,
                PercentSum: ''
            },
            {
                key: '10',
                firstName: 'Ha Noi',
                Traffic: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Singapore", "Ha Noi"), 'trafficIn').toFixed(2)}`,
                Capacity: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Singapore", "Ha Noi"), 'speed',).toFixed(2)}`,
                Percent: '',
                TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Hong Kong", "Ha Noi"), 'trafficIn').toFixed(2)}`,
                CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Hong Kong", "Ha Noi"), 'speed').toFixed(2)}`,
                PercentH: '',
                TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Japan", "Ha Noi"), 'trafficIn').toFixed(2)}`,
                CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Japan", "Ha Noi"), 'speed').toFixed(2)}`,
                PercentJ: '',
                TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, -1, "Ha Noi"), 'trafficIn').toFixed(2)}`,
                CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, -1, "Ha Noi"), 'speed',).toFixed(2)}`,
                PercentSum: ''
            },
            {
                key: '11',
                firstName: 'Da Nang',
                Traffic: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Singapore", "Da Nang"), 'trafficIn').toFixed(2)}`,
                Capacity: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Singapore", "Da Nang"), 'speed').toFixed(2)}`,
                Percent: '',
                TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Hong Kong", "Da Nang"), 'trafficIn').toFixed(2)}`,
                CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Hong Kong", "Da Nang"), 'speed').toFixed(2)}`,
                PercentH: '',
                TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Japan", "Da Nang"), 'trafficIn').toFixed(2)}`,
                CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Japan", "Da Nang"), 'speed').toFixed(2)}`,
                PercentJ: '',
                TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, -1, "Da Nang"), 'trafficIn').toFixed(2)}`,
                CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, -1, "Da Nang"), 'speed').toFixed(2)}`,
                PercentSum: ''
            },
            {
                key: '12',
                firstName: 'Sum',
                Traffic: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Singapore", -1), 'trafficIn').toFixed(2)}`,
                Capacity: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Singapore", -1), 'speed').toFixed(2)}`,
                Percent: '',
                TrafficH: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Hong Kong", -1), 'trafficIn').toFixed(2)}`,
                CapacityH: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Hong Kong", -1), 'speed').toFixed(2)}`,
                PercentH: '',
                TrafficJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Japan", -1), 'trafficIn').toFixed(2)}`,
                CapacityJ: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, "Japan", -1), 'speed').toFixed(2)}`,
                PercentJ: '',
                TrafficSum: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, -1, -1), 'trafficIn').toFixed(2)}`,
                CapacitySum: `${this.sumByAttr(this.filterList(list, "Premium", -1, -1, -1, -1), 'speed').toFixed(2)}`,
                PercentSum: ''
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
                <ColumnGroup title="Singapore">
                    <Column
                        title="Traffic"
                        key="Traffic"
                        dataIndex="Traffic"
                    />
                    <Column
                        title="Capacity"
                        key="Capacity"
                        dataIndex="Capacity"
                    />
                    <Column
                        title="%"
                        key="%"
                        dataIndex="Percent"
                    />
                </ColumnGroup>

                <ColumnGroup title="Hong Kong">
                    <Column
                        title="Traffic"
                        key="TrafficH"
                        dataIndex="TrafficH"

                    />
                    <Column
                        title="Capacity"
                        key="CapacityH"
                        dataIndex="CapacityH"
                    />
                    <Column
                        title="%"
                        key="%H"
                        dataIndex="PercentH"
                    />
                </ColumnGroup>
                <ColumnGroup title="Japan">
                    <Column
                        title="Traffic"
                        key="TrafficJ"
                        dataIndex="TrafficJ"
                    />
                    <Column
                        title="Capacity"
                        key="CapacityJ"
                        dataIndex="CapacityJ"
                    />
                    <Column
                        title="%"
                        key="%-j"
                        dataIndex="PercentJ"
                    />
                </ColumnGroup>
                <ColumnGroup title="Sum">
                    <Column
                        title="Traffic"
                        key="Traffic-sum"
                        dataIndex="TrafficSum"
                    />
                    <Column
                        title="Capacity"
                        key="Capacity-sum"
                        dataIndex="CapacitySum"
                    />
                    <Column
                        title="%"
                        key="%-sum"
                        dataIndex="PercentSum"
                    />
                </ColumnGroup>

            </Table>
        )
    }
}

export default TablePremium
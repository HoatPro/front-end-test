import React from "react";
import {ShowWrapper} from "./Show.style";
import axios from "axios";
import {message, Select, Input, Card} from "antd";
import TableMP from './TableMP';


const {Option} = Select;
const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSelect: [],
            nameSelected: [],


        }
    }

    async componentDidMount() {

        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/show-all-group-mp"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET group MP topo successfully!")
            const dataObj = data.listName.map((dt, index) => {
                return {
                    "index": index,
                    dt
                }
            })
            this.setState({
                dataSelect: dataObj,

            })
        } else {
            message.error("GET data error!!!")
        }
    }

    onChange = (value) => {
        const {dataSelect} = this.state;
        const nameOb = [];
        dataSelect.map(dt => {
            if (value == dt.index) {
                nameOb.push(dt.dt)
            } else return null;
        });

        this.setState({
            nameSelected: nameOb
        })
    }


    render() {


        const children = [];
        this.state.dataSelect.map(dt => {
            children.push(<Option key={dt.index}>{dt.dt}-MP-*</Option>);
        })
        const {nameSelected} = this.state;

        return (
            <ShowWrapper>
                <Card style={{width: "100%", marginBottom: 10}}>
                    <h4> Search by name</h4>
                    <Select
                        showSearch
                        style={{width: 200, marginBottom: 20}}
                        placeholder="name"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {children}
                    </Select>
                </Card>
                <Card>
                    <TableMP
                        nameMp={nameSelected}
                    />
                </Card>
            </ShowWrapper>
        );
    }
}

export default Show;

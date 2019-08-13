import React from "react";
import {Table, message} from 'antd';

import axios from "axios";
import Search from "antd/lib/input/Search";

const {Column, ColumnGroup} = Table;

class IplcMpopByGwIpv6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],

        }
    }

    async componentDidMount() {
        const options = {
            method: "GET",
            url: "https://netd.ast.fpt.net/netd-api/api/get-iplc-mpop-by-gw-data-ipv6"
        };
        const {
            status,
            data: {data}
        } = await axios(options);
        if (status) {
            message.success("GET data successfull!");
            this.setState({
                dataTable: data
            })
        }else {message.error("GET data Error!!!")}
    }

    render() {
      const {dataTable}=this.state;
      console.log(dataTable);
        return (
            <div>
                <div>
                    <h2>
                        Equal
                    </h2>
                    <h4>Search by name</h4>
                    <Search style={{width: 300, marginTop: 8, marginBottom: 30}}/>
                </div>
                <div>
                    <Table dataSource={this.state.dataTable} bordered>

                        <Column title="Ingress Device" dataIndex="name" key="name"/>
                        <Column title="IPLC-Interface" dataIndex="interfaceName" key="interfaceName"/>
                       {/* <Column*/}
                       {/*     title="Tags"*/}
                       {/*     dataIndex="tags"*/}
                       {/*     key="tags"*/}
                       {/*     render={tags => (*/}
                       {/*         <span>*/}
                       {/*{tags.map(tag => (*/}
                       {/*  <Tag color="blue" key={tag}>*/}
                       {/*          {tag}*/}
                       {/*             </Tag>*/}
                       {/*            ))}*/}
                       {/*               </span>*/}
                       {/*     )}*/}
                       {/* />*/}

                    </Table>
                </div>
            </div>

        )
    }
}

export default IplcMpopByGwIpv6;
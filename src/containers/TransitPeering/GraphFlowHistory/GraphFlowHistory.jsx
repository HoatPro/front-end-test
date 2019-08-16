import React from "react";
import Summary from "./Summary";
import {Tabs} from  'antd';
import Detail from "./Detail";
const { TabPane } = Tabs;
class GraphFlowHistory extends React.Component {

    render() {
        return (
            <Tabs type="card">
                <TabPane tab="Summary" key="1">
                    <Summary/>
                </TabPane>
                <TabPane tab="Detail" key="2">
                  <Detail/>
                </TabPane>

            </Tabs>
        )
    }
}

export default  GraphFlowHistory;
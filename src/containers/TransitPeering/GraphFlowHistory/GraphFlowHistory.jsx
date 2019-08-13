import React from "react";
import Summary from "./Summary";
import Detail from "./Detail"
class GraphFlowHistory extends React.Component {

    render() {
        return (
            <div>
                <div>
               <Summary/>
                </div>
                <div>
                   <Detail/>
                </div>

            </div>
        )
    }
}

export default  GraphFlowHistory;
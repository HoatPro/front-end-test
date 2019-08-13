import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import en_US from 'antd/lib/locale-provider/en_US';
import {LocaleProvider} from 'antd';
import routes from './routes';
import Layout from '../Layout/Layout';

import DashBoard from '../DashBoard/DashBoard';

import GroupMpList from '../Bras/GroupMpList/GroupMpList';
import Show from '../Bras/Show/Show';
import GroupMpSummary from '../Bras/GroupMpSummary/GroupMpSummary';
import PartsOfDevice from '../Bras/PartsOfDevice/PartsOfDevice';

import CgnatPrefer from '../Cgnat/CgnatPrefer/CgnatPrefer';
import CgnatSummary from '../Cgnat/CgnatSummary/CgnatSummary';

import TrafficStatistics from '../Iplc/TrafficStatistics/TrafficStatistics';
import TrafficChart from '../Iplc/TrafficChart/TrafficChart';

import AddNewDevice from '../Devices/AddNewDevice/AddNewDevice';
import RemovePortsLogs from '../Devices/RemovePortsLogs/RemovePortsLogs';
import AllDevices from '../Devices/AllDevices/AllDevices';
import FunctionList from '../Devices/FunctionList/FunctionList';
import AreasAndRooms from '../Devices/AreasAndRooms/AreasAndRooms';
import Warehouse from '../Devices/Warehouse/Warehouse';

import IRBDetail from '../TransitPeering/IRBDetail/IRBDetail';
import GraphFlowHistory from '../TransitPeering/GraphFlowHistory/GraphFlowHistory';

import Ipv6ToMpop from '../BlancingIplc/Ipv6ToMpop/Ipv6ToMpop';
import IplcReport from '../BlancingIplc/IplcReport/IplcReport';
import EqualReport from '../BlancingIplc/EqualReport/EqualReport';
import IplcMpopByGwIpv6 from '../BlancingIplc/IplcMpopByGwIpv6/IplcMpopByGwIpv6';
import EqualMpopByGwIpv6 from '../BlancingIplc/EqualMpopByGwIpv6/EqualMpopByGwIpv6';
import IplcMpopByGwIpv4 from '../BlancingIplc/IplcMpopByGwIpv4/IplcMpopByGwIpv4';
import EqualMpopByGwIpv4 from '../BlancingIplc/EqualMpopByGwIpv4/EqualMpopByGwIpv4';



import DevicesConfig from '../ToolCgnat/DevicesConfig/DevicesConfig';
import ErrorLog from '../ToolCgnat/ErrorLog/ErrorLog';
import RecommendAction from '../ToolCgnat/RecommendAction/RecommendAction';
import History from '../ToolCgnat/History/History';
import LogConfig from '../ToolCgnat/LogConfig/LogConfig';
import VariablesConfig from '../ToolCgnat/VariablesConfig/VariablesConfig';

function App() {
    return (
        <LocaleProvider locale={en_US}>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path={routes.dashboard} component={DashBoard}/>

                        <Route exact path={routes.show} component={Show}/>
                        <Route path={routes.group_mp_list} component={GroupMpList}/>
                        <Route path={routes.group_mp_summary} component={GroupMpSummary}/>
                        <Route path={routes.parts_of_device} component={PartsOfDevice}/>

                        <Route path={routes.cgnat_prefer} component={CgnatPrefer}/>
                        <Route path={routes.cgnat_summary} component={CgnatSummary}/>

                        <Route path={routes.traffic_statistics} component={TrafficStatistics}/>
                        <Route path={routes.traffic_chart} component={TrafficChart}/>

                        <Route path={routes.add_new_device} component={AddNewDevice}/>
                        <Route path={routes.remove_ports_logs} component={RemovePortsLogs}/>
                        <Route path={routes.all_devices} component={AllDevices}/>
                        <Route path={routes.function_list} component={FunctionList}/>
                        <Route path={routes.areas_and_rooms} component={AreasAndRooms}/>
                        <Route path={routes.warehouse} component={Warehouse}/>

                        <Route path={routes.irb_detail} component={IRBDetail}/>
                        <Route path={routes.graph_flow_history} component={GraphFlowHistory}/>

                        <Route path={routes.ipv6_to_mpop} component={Ipv6ToMpop}/>
                        <Route path={routes.iplc_report} component={IplcReport}/>
                        <Route path={routes.equal_report} component={EqualReport}/>
                        <Route path={routes.iplc_mpop_by_gw_ipv6} component={IplcMpopByGwIpv6}/>
                        <Route path={routes.equal_mpop_by_gw_ipv6} component={EqualMpopByGwIpv6}/>
                        <Route path={routes.iplc_mpop_by_gw_ipv4} component={IplcMpopByGwIpv4}/>
                        <Route path={routes.equal_mpop_by_gw_ipv4} component={EqualMpopByGwIpv4}/>

                        <Route path={routes.devices_config} component={DevicesConfig}/>
                        <Route path={routes.error_log} component={ErrorLog}/>
                        <Route path={routes.recommend_action} component={RecommendAction}/>
                        <Route path={routes.history} component={History}/>
                        <Route path={routes.log_config} component={LogConfig}/>
                        <Route path={routes.variables_config} component={VariablesConfig}/>


                    </Switch>
                </Layout>
            </BrowserRouter>
        </LocaleProvider>
    );
}

export default App;

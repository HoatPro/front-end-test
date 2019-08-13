import React from 'react';
import {Menu, Icon} from 'antd';
import {SiderWrapper} from './Layout.style';
import {Link} from 'react-router-dom';

const {SubMenu} = Menu;


class Sider extends React.Component {

    render() {
        return (
            <SiderWrapper>
                <Menu
                    mode="inline"
                    theme="light"
                    multiple={false}
                    inlineCollapsed={this.props.collapse}
                >
                    <Menu.Item key="1">
                        <Link to="/">
                        <span>
                        <Icon type="home" theme="twoTone"/>
                        <span>DashBoard</span>
                        </span>
                        </Link>
                    </Menu.Item>

                    <SubMenu title={<span><Icon type="appstore" theme="filled"/> <span>BARS</span></span>}>

                        <Menu.Item key="roup-mp-topos">
                            <Link to="/group-mp/group-mp-topos">
                        <span>
                        <span>Show</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="group-mp-list">
                            <Link to="/group-mp/group-mp-list">
                        <span>
                        <span>Group MP List</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="group-mp-summary">
                            <Link to="/group-mp/group-mp-summary">
                        <span>
                        <span>Summary</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="group-mp-device">
                            <Link to="/group-mp/parts">
                        <span>
                        <span>Parts of device</span>
                        </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu title={<span><Icon type="codepen-circle"/> <span>CGNAT</span></span>}>

                        <Menu.Item key="cgnat-prefer">
                            <Link to="/cgnat/prefer">
                        <span>
                        <span>CGNAT Prefer</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="cgnat-summary">
                            <Link to="/cgnat/summary">
                        <span>
                        <span>Summary</span>
                        </span>
                            </Link>
                        </Menu.Item>

                    </SubMenu>
                    <SubMenu title={<span><Icon type="global"/> <span>IPLC</span></span>}>

                        <Menu.Item key="traffic_statistics">
                            <Link to="/iplc/traffic-statistics">
                        <span>
                        <span>Traffic statistics</span>
                        </span>
                            </Link>
                        </Menu.Item>


                        <Menu.Item key="traffic_chart">
                            <Link to="/iplc/traffic-chart">
                        <span>
                        <span>Traffic charts</span>
                        </span>
                            </Link>
                        </Menu.Item>


                    </SubMenu>


                    <SubMenu title={<span><Icon type="dashboard" theme="filled"/> <span>DEVICES</span></span>}>
                        <Menu.Item key="add_new_device">
                            <Link to="/devices/add-new-device">
                        <span>
                        <span>Add new device</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="remove_ports_logs">
                            <Link to="/devices/remove-ports">
                        <span>
                        <span>Remove ports logs</span>
                        </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="all_devices">
                            <Link to="/devices/devices">
                        <span>
                        <span>All devices</span>
                        </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="function_list">
                            <Link to="/devices/function-list">
                        <span>
                        <span>Function List</span>
                        </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="areas_and_rooms">
                            <Link to="/devices/areas-and-rooms">
                        <span>
                        <span>Areas and Rooms</span>
                        </span>
                            </Link>
                        </Menu.Item>


                        <Menu.Item key="warehouse">
                            <Link to="/devices/warehouse">
                        <span>
                        <span>Warehouse</span>
                        </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>


                    <SubMenu title={<span><Icon type="bug" theme="filled"/> <span>Transit/Peering</span></span>}>

                        <Menu.Item key="irb_detail">
                            <Link to="/auto-balancing-transit-peering/irb-detail">
                        <span>
                        <span>IBR detail</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="graph_flow_history">
                            <Link to="/auto-balancing-transit-peering/graph-flow-history">
                        <span>
                        <span>Grap flow history</span>
                        </span>
                            </Link>
                        </Menu.Item>

                    </SubMenu>
                    <SubMenu title={<span><Icon type="star" theme="filled"/> <span>Balancing IPLC</span></span>}>
                        <Menu.Item key="ipv6_to_mpop">
                            <Link to="/auto-balancing-iplc/ipv6-to-mpop">
                        <span>
                        <span>IpV6 to MPOP</span>
                        </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="iplc_report">
                            <Link to="/auto-balancing-iplc/iplc-report">
                        <span>
                        <span>IPLC report</span>
                        </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="equal_report">
                            <Link to="/auto-balancing-iplc/equal-report">
                        <span>
                        <span>Equal report</span>
                        </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="iplc_mpop_by_gw_ipv6">
                            <Link to="/auto-balancing-iplc/iplc-mpop-by-gw-ipv6">
                        <span>
                        <span>IPLC - MP by GW's(ipv6)</span>
                        </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="equal_mpop_by_gw_ipv6">
                            <Link to="/auto-balancing-iplc/equal-mpop-by-gw-ipv6">
                        <span>
                        <span>Equal- MP by GW's(ipv6)</span>
                        </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="iplc_mpop_by_gw_ipv4">
                            <Link to="/auto-balancing-iplc/iplc-mpop-by-gw-ipv4">
                        <span>
                        <span>IPLC- MP by GW's(ipv4)</span>
                        </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="equal_mpop_by_gw_ipv4">
                            <Link to="/auto-balancing-iplc/equal-mpop-by-gw-ipv4">
                        <span>
                        <span>Equal- MP by GW's(ipv4)</span>
                        </span>
                            </Link>
                        </Menu.Item>

                    </SubMenu>

                    <SubMenu title={<span><Icon type="setting"/> <span>TOOL CGNAT</span></span>}>
                        <Menu.Item key=" devices_config">
                            <Link to="/tool-cgnat/devices_config">
                        <span>
                        <span>Devices config</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="error_log">
                            <Link to="/tool-cgnat/error-log">
                        <span>
                        <span>Error</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="recommend_action">
                            <Link to="/tool-cgnat/recommed-action">
                        <span>
                        <span>Recommend action</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="history">
                            <Link to="/tool-cgnat/history">
                        <span>
                        <span>History</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="log_config">
                            <Link to="/tool-cgnat/log-config">
                        <span>
                        <span>Log Config</span>
                        </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="variables_config">
                            <Link to="/tool-cgnat/variables-config">
                        <span>
                        <span>Variables Config</span>
                        </span>
                            </Link>
                        </Menu.Item>

                    </SubMenu>
                </Menu>
                < /SiderWrapper>
                    );
                    }
                    }

                    export default Sider;
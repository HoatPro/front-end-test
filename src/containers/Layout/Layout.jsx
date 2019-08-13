import React from "react";
import PropTypes from "prop-types";
import {Button, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header";
import { LayoutWrapper } from "./Layout.style";
import Footer from "./Footer";
import routes from "../App/routes";
import Sider from "./Sider";


class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "Admin",
      collapsed: false,

    };
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children } = this.props;
    return (
      <LayoutWrapper >
        <div className="wrapper">
          <div
            className="sidebar"
            data-color="azure"
            data-background-color="white"
            data-image="../assets/img/sidebar-1.jpg"
          >
            <div className="logo">
              <Link to={routes.dashboard} style={{paddingLeft :80,color:"black" }} >
              NET DAS
              </Link>
            </div>
            <div className="sidebar-wrapper">
            <Sider collapse={this.state.collapsed} />
            </div>
          </div>
          <div
            className="header"
            style={{
              borderBottom: "1px solid #E7E7E7"
            }}
          >
            <Header email={this.state.email} />

            <Button type="default" onClick={this.toggleCollapsed} style={{ marginTop:-32,marginLeft:5,float:"left" }}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
          </div>
          <div className="content">{children}</div>
          <div
            className="footer"
            style={{
              borderTop: "1px solid #E7E7E7"
            }}
          >
            <Footer />
          </div>
        </div>
      </LayoutWrapper>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default withRouter(Layout);

import React, { Component } from "react";
import "./UserPage.css";

import UserInfo from "../UserInfo";
import UserImages from "../UserImages";
import { getUsersData } from "../../store/actions/dataHandler";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import isEmpty from "../../isEmpty";
import Spinner from "../Spinner/Spinner";
import NotFound from "../NotFound";

class UserPage extends Component {
  componentDidMount() {
    const { history, getUsersData } = this.props;
    const { pathname } = history.location;
    const user = pathname.split(/^\//)[1];

    getUsersData(user);
  }

  render() {
    const { data } = this.props;

    if (isEmpty(data)) return <Spinner />;
    if (data.error) return <NotFound />;

    return (
      <div>
        <UserInfo />
        <UserImages />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.dataPage
});

export default connect(
  mapStateToProps,
  { getUsersData }
)(withRouter(UserPage));

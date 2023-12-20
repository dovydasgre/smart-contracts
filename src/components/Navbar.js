import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <p className="navbar-brand col-sm-3 col-md-2 mr-0">Marketplace</p>
        <p style={{ color: "white", paddingRight: "20px" }}>
          Your wallet address: {this.props.account}
        </p>
      </nav>
    );
  }
}

export default Navbar;

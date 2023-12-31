import React, { Component } from "react";

class Main extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const name = this.productName.value;
    const price = window.web3.utils.toWei(
      this.productPrice.value.toString(),
      "Ether"
    );
    this.props.createProduct(name, price);
  };

  render() {
    return (
      <div
        id="content"
        style={{
          margin: "auto",
          width: "50%",
          padding: "10px",
        }}
      >
        <div>
          <h1>Add Product</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group mr-sm-2">
              <input
                id="productName"
                type="text"
                ref={(input) => {
                  this.productName = input;
                }}
                className="form-control"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="form-group mr-sm-2">
              <input
                id="productPrice"
                type="text"
                ref={(input) => {
                  this.productPrice = input;
                }}
                className="form-control"
                placeholder="Product Price"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </div>
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </td>
                  <td>{product.owner}</td>
                  <td>
                    {!product.purchased && product.owner !== this.props.account ? (
                      <button
                        className="btn btn-primary"
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          this.props.purchaseProduct(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      >
                        Buy
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ marginTop: "80px" }}>
          <h2>Your Items</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody id="productList">
              {this.props.products.map((product, key) => {
                if (product.owner === this.props.account) {
                  return (
                    <tr key={key}>
                      <th scope="row">{product.id.toString()}</th>
                      <td>{product.name}</td>
                      <td>
                        {window.web3.utils.fromWei(
                          product.price.toString(),
                          "Ether"
                        )}{" "}
                        Eth
                      </td>
                      <td>
                        {!product.purchased ? <p>For sale</p> : <p>Owner</p>}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Main;

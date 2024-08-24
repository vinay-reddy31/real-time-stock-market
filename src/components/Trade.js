import React, { Component } from 'react';

class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  handleQuantityChange = (event) => {
    this.setState({ quantity: parseInt(event.target.value, 10) });
  };

  handleBuyClick = () => {
    this.props.onBuy(this.props.selectedStock, this.state.quantity);
  };

  handleSellClick = () => {
    this.props.onSell(this.props.selectedStock, this.state.quantity);
  };

  render() {
    const { selectedStock } = this.props;
    const { quantity } = this.state;

    return (
      <div>
        <h2>Trade {selectedStock.ticker}</h2>
        <p>Current Price: ${selectedStock.close}</p>
        <input
          type="number"
          value={quantity}
          onChange={this.handleQuantityChange}
          min="1"
        />
        <button onClick={this.handleBuyClick}>Buy</button>
        <button onClick={this.handleSellClick}>Sell</button>
      </div>
    );
  }
}

export default Trade;

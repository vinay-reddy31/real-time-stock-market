import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js to work correctly
import './market.css'

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: 'IBM',
      stockData: null,
      currentPrice: null,
      error: null,
      quantity: 1, // Default quantity for buying/selling
    };
  }

  componentDidMount() {
    this.fetchStockData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCompany !== this.state.selectedCompany) {
      this.fetchStockData();
    }
  }

  fetchStockData = () => {
    const { selectedCompany } = this.state;
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${selectedCompany}&interval=5min&apikey=demo`)
      .then(response => response.json())
      .then(data => {
        if (data['Time Series (5min)']) {
          const latestData = data['Time Series (5min)'];
          this.setState({
            stockData: latestData,
            currentPrice: parseFloat(Object.values(latestData)[0]['4. close']),
          });
        } else {
          this.setState({ error: 'Invalid data structure' });
        }
      })
      .catch(error => {
        this.setState({ error: 'Failed to fetch data' });
      });
  };

  handleCompanyChange = (event) => {
    this.setState({ selectedCompany: event.target.value });
  };

  handleBuyClick = () => {
    const { currentPrice, quantity } = this.state;
    if (currentPrice) {
      this.props.onBuy(currentPrice, quantity);
    } else {
      alert("Please select a stock to buy.");
    }
  };

  handleSellClick = () => {
    const { currentPrice, quantity } = this.state;
    if (currentPrice) {
      this.props.onSell(currentPrice, quantity);
    } else {
      alert("Please select a stock to sell.");
    }
  };

  handleQuantityChange = (event) => {
    this.setState({ quantity: parseInt(event.target.value, 10) });
  };

  renderStockChart() {
    const { stockData } = this.state;
    if (!stockData) {
      return <p>Loading data...</p>;
    }

    // Prepare the data for the chart
    const labels = Object.keys(stockData).reverse(); // Reverse to show the oldest first
    const closePrices = labels.map(time => stockData[time]['4. close']);

    const data = {
      labels,
      datasets: [
        {
          label: 'Stock Price',
          data: closePrices,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Time',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Price in USD',
          },
        },
      },
    };

    return <Line data={data} options={options} />;
  }

  render() {
    const { selectedCompany, currentPrice, error, quantity } = this.state;

    return (
      <div>
        <h2>Select a Company</h2>
        <select value={selectedCompany} onChange={this.handleCompanyChange}>
          <option value="IBM">IBM</option>
          <option value="MSFT">Microsoft</option>
          <option value="AAPL">Apple</option>
          <option value="GOOGL">Google</option>
          <option value="AMZN">Amazon</option>
        </select>

        {error ? <p>{error}</p> : this.renderStockChart()}

        <div className="market"> 
          <p>Current Price: ${currentPrice ? currentPrice.toFixed(2) : 'N/A'}</p>
          <input
            type="number"
            value={quantity}
            onChange={this.handleQuantityChange}
            min="1"
          />
          <div className="buy-sell-buttons">
          <button className="buy-button" onClick={this.handleBuyClick}>Buy</button>
          <button className="sell-button" onClick={this.handleSellClick}>Sell</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Market;

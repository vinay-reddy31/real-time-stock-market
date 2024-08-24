import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    const { stocks, balance } = this.props;

    // Basic CSS styles for the table
    const tableStyle = {
      borderCollapse: 'collapse',
      width: '100%',
    };
    const thTdStyle = {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'center', // Center align text
    };
    const thStyle = {
      backgroundColor: '#f2f2f2',
      textAlign: 'center', // Center align header text
    };

    return (
      <div>
        <h2>My Dashboard</h2>
        <p>Balance: ${balance.toFixed(2)}</p>

        <h3>My Holdings</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...thTdStyle, ...thStyle }}>Ticker</th>
              <th style={thTdStyle}>Quantity</th>
              <th style={thTdStyle}>Current Value</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map((stock, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{stock.ticker}</td>
                  <td style={thTdStyle}>{stock.quantity}</td>
                  <td style={thTdStyle}>${(parseFloat(stock.price) * stock.quantity).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={thTdStyle}>No holdings</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;

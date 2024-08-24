import React, { Component } from 'react';
import Navbar from './components/Navbar';
// import Trade from './components/Trade';
import Dashboard from './components/Dashboard';
import Market from './components/Market';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      balance: 10000, // Starting balance
      view: 'market', // Default view
    };
  }

  handleBuy = (price, quantity) => {
    const cost = price * quantity;
    if (this.state.balance >= cost) {
      this.setState((prevState) => ({
        balance: prevState.balance - cost,
        stocks: [...prevState.stocks, { ticker: 'IBM', quantity, price }], // Assuming 'IBM' for now; adjust as needed
      }));
    } else {
      alert("Please Select Quantity!");
    }
  };

  handleSell = (price, quantity) => {
    const revenue = price * quantity;
    this.setState((prevState) => ({
      balance: prevState.balance + revenue,
      stocks: prevState.stocks.filter(
        (s) => s.quantity > quantity || (s.quantity === quantity && s.price !== price)
      ),
    }));
  };

  handleViewChange = (view) => {
    this.setState({ view });
  };

  render() {
    const { stocks, balance, view } = this.state;

    return (
      <div>
        <Navbar />
        <nav className="navbar-container">
          <button className="nav-button" onClick={() => this.handleViewChange('market')}>Market</button>
          <button className="nav-button" onClick={() => this.handleViewChange('dashboard')}>Dashboard</button>
          <span> | Balance: ${balance.toFixed(2)}</span>
        </nav>

        {view === 'market' && (
          <Market
            onBuy={this.handleBuy}
            onSell={this.handleSell}
          />
        )}

        {view === 'dashboard' && (
          <Dashboard
            stocks={stocks}
            balance={balance}
          />
        )}
      </div>
    );
  }
}

export default App;
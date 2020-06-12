import React from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

function App({ city }) {
  console.log({ city });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    city: state.city,
  };
};
export default connect(mapStateToProps)(App);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCurrentWeather } from './redux/reducers/weatherReducer';
import './css/main.css';

function App({ city, loadCurrentWeather, currentWeather, loading }) {
  useEffect(() => {
    loadCurrentWeather();
  }, []);

  return (
    <div className="App">
      {loading && <p>loading</p>}
      <header className="App-header">
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

export default connect(
  (state) => ({
    city: state.city,
    currentWeather: state.currentWeather,
    loading: state.loading,
  }),
  (dispatch) => ({
    loadCurrentWeather: () => dispatch(loadCurrentWeather()),
  })
)(App);

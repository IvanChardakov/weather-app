import React, { useState, useCallback, useEffect } from 'react';
import AutosizeInput from 'react-input-autosize';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import { changeCity } from '../redux/reducers/weatherReducer';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

const Search = ({ city, loading, changeCity }) => {
  const [searchValue, setSearchValue] = useState(city || '');
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    loading && setShowIcon(true);
  }, [loading]);

  const onInputChange = useCallback(
    debounce((city) => {
      changeCity(city);
    }, 500),
    []
  );

  const handleOnChange = (value) => {
    onInputChange(value);
    setSearchValue(value);
    if (showIcon) {
      setShowIcon(false);
    }
  };

  return (
    <div className="search-wrapper">
      <AutosizeInput
        value={searchValue}
        placeholder="City"
        onChange={(e) => handleOnChange(e.target.value)}
        onClick={() => setShowIcon(false)}
        onBlur={() => setShowIcon(true)}
      />
      {showIcon && (
        <>
          {loading ? (
            <CircularProgress style={{ width: '20px', height: '20px' }} />
          ) : (
            <SearchIcon className="search-icon" />
          )}
        </>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    city: state.city,
    loading: state.loading,
  }),
  (dispatch) => ({
    changeCity: (city) => dispatch(changeCity(city)),
  })
)(Search);

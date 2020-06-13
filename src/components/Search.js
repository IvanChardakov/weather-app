import React, { useState, useCallback } from 'react';
import AutosizeInput from 'react-input-autosize';
import SearchIcon from '@material-ui/icons/Search';
import { changeCity } from '../redux/reducers/weatherReducer';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

const Search = ({ city, changeCity }) => {
  const [searchValue, setSearchValue] = useState(city || '');
  const [showIcon, setShowIcon] = useState(true);

  const onInputChange = useCallback(
    debounce((city) => {
      changeCity(city);
    }, 500),
    []
  );

  const handleOnChange = (value) => {
    onInputChange(value);
    setSearchValue(value);
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
      {showIcon && <SearchIcon className="search-icon" />}
    </div>
  );
};

export default connect(
  (state) => ({
    city: state.city,
  }),
  (dispatch) => ({
    changeCity: (city) => dispatch(changeCity(city)),
  })
)(Search);

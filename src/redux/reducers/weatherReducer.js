const initialState = { city: 'plovdiv' };

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case '':
      return 123;
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
      case 'UNSET_USER':
        return {};
        case 'UPDATE_USER_LOCATION':
          const countryId = action.payload.country_id;
          const cityId = action.payload.city_id;
          return {...state, country_id: countryId, city_id: cityId};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;

import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import languages from './languages.reducer';
import services from './services.reducer';
import childReducer from './child.reducer';
import countries from './countries.reducer';
import cities from './cities.reducer';
import results from './results.reducer';
import children from './children.reducer';
import favorites from './favorites.reducer';
import childToEdit from './childToEdit.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  languages,
  services,
  childReducer,
  countries,
  cities,
  results,
  children,
  favorites,
  childToEdit,
});

export default rootReducer;

import React, {Fragment} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import {Provider} from 'react-redux';
import store from './store/root-reducer';
import {getCurrentUser, currentUserLoading} from '../src/store/auth/selectors';
import {useSelector, useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Login from './components/Auth/Login';
import {getUserInfo} from './store/auth/actions';

const Authentication = (Component) => {
  const Wrapper = (props) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    console.log('currentUser: ', currentUser);
    const loading = useSelector(currentUserLoading);

    React.useEffect(() => {
      dispatch(getUserInfo());
    }, []);

    let component = <Fragment />;

    if (loading) component = <Loader />;
    else if (!Boolean(currentUser && currentUser.username)) component = <Login />;
    else if (Boolean(currentUser && currentUser.username)) component = <Component {...props} />;
    return <div style={{background: '#f5f5f5'}}>{component}</div>;
  };

  return HigherOrderWrapper(Wrapper);
};

export default Authentication;

const Loader = () => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item style={{padding: 20}}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

const HigherOrderWrapper = (Component) => (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Component {...props} />
        </MuiThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

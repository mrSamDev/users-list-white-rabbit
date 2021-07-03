import {Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {makeStyles} from '@material-ui/core/styles';
import Config from '../../constants/config';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch} from 'react-redux';
import {onUserLogout} from '../../store/auth/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'center',
    alignItems: 'center',
  },
}));

const Layout = ({children}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const onLogout = () => dispatch(onUserLogout());

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {Config.appName}
          </Typography>
          <IconButton style={{color: '#fff'}} onClick={onLogout}>
            <ExitToApp color="inherit" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </Fragment>
  );
};

export default Layout;

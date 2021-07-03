import React from 'react';
import Page from '../Layout/Page';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import {CircularProgress} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlined from '@material-ui/icons/CloseOutlined';
import {getUsersFromStore, getUsersLoadingStateFromStore} from '../../store/users/selectors';
import {getUsers} from '../../store/users/actions';
import CreateUser from '../CreateUser';

const Userlist = () => {
  const [searchKey, setSearchKey] = React.useState('');
  const dispatch = useDispatch();
  const userList = useSelector(getUsersFromStore);
  const loading = useSelector(getUsersLoadingStateFromStore);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleSearch = (item) => ((item.user.name && item.user.name.first) || '').toLowerCase().includes(searchKey.toLowerCase());
  return (
    <React.Fragment>
      <Page title="User List">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="space-between" style={{marginTop: 20}}>
              <Grid item>
                <Typography variant="h4">Users List</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <TextField
                      InputProps={{
                        endAdornment: searchKey !== '' && (
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={() => setSearchKey('')}>
                              <CloseOutlined />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      variant="outlined"
                      label="Search"
                      value={searchKey}
                      onChange={(event) => setSearchKey(event.target.value)}
                    />
                  </Grid>
                  <Grid item item xs={12} sm={4}>
                    <CreateUser />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>DOB</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={5}>
                        <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300}}>
                          <Typography variant="h6">Loading </Typography>
                          <CircularProgress size={20} />
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ) : (
                    userList.filter(handleSearch).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Grid style={{display: 'flex', alignItems: 'center'}}>
                            <Avatar src={item.user.picture && item.user.picture.thumbnail} style={{marginRight: 10}} />
                            <Typography> {`${item.user.name.first} ${item.user.name.last}`}</Typography>
                          </Grid>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Typography> {item.user.email}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Typography> {item.user.username}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Typography> {item.user.phone}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Typography> {dayjs(item.user.dob).format('MM/DD/YYYY')}</Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Page>
    </React.Fragment>
  );
};

export default Userlist;

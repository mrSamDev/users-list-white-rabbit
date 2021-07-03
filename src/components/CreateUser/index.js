import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import React, {Fragment} from 'react';
import {addUser} from '../../store/users/actions';

import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import CustomizedDialogs from '../Dialog';
import Add from '@material-ui/icons/Add';

const CreateUser = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };
  const dispatch = useDispatch();

  const {formState, handleSubmit, control} = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const onSubmit = (data) => {
    dispatch(addUser(data));
    toggleModal();
  };

  const validationErrors = formState.errors;

  return (
    <Fragment>
      <Button startIcon={<Add />} fullWidth variant="contained" color="primary" onClick={toggleModal}>
        <Typography>Create User</Typography>
      </Button>
      <CustomizedDialogs title="Create User" open={isModalOpen} handleClose={toggleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container alignItems="center" justify="space-between" spacing={2}>
            <Grid item xs={12} sm={2}>
              <Controller
                name="name.title"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({field}) => (
                  <TextField
                    select
                    SelectProps={{
                      native: true,
                    }}
                    // fullWidth
                    error={validationErrors.name && validationErrors.name.title}
                    label="Title"
                    variant="outlined"
                    {...field}>
                    <option key={'select'} value={'mr'}>
                      Mr
                    </option>
                    <option key={'select'} value={'mr'}>
                      Mr
                    </option>
                    <option key={'select'} value={'mrs'}>
                      Mrs
                    </option>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Controller
                name="name.first"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({field}) => <TextField fullWidth error={validationErrors.name && validationErrors.name.first} label="First Name" variant="outlined" {...field} />}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Controller
                name="name.last"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({field}) => <TextField fullWidth error={validationErrors.name && validationErrors.name.last} label="Last Name" variant="outlined" {...field} />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({field}) => <TextField fullWidth error={validationErrors.username} label="Username" variant="outlined" {...field} />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="gender"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({field}) => <TextField fullWidth error={validationErrors.gender} label="Gender" variant="outlined" {...field} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({field}) => <TextField fullWidth error={validationErrors.email} label="Email" variant="outlined" {...field} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({field}) => <TextField fullWidth error={validationErrors.password} label="Password" variant="outlined" {...field} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="dob"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({field: {value, onChange}}) => (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      error={validationErrors.dob}
                      id="date-picker-dialog"
                      label="DOB"
                      format="MM/dd/yyyy"
                      inputVariant="outlined"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                      value={value || null}
                      maxDate={new Date()}
                      onChange={onChange}
                    />
                  </MuiPickersUtilsProvider>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({field}) => <TextField fullWidth error={validationErrors.phone} label="Phone" variant="outlined" {...field} />}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Grid container justify="space-between" alignItems="center" spacing={2} style={{paddingTop: 20}}>
                <Grid item xs={12} md={6}>
                  <Button fullWidth variant="outlined" color="primary" onClick={toggleModal}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button fullWidth variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CustomizedDialogs>
    </Fragment>
  );
};

export default CreateUser;

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    marginLeft: 10,
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: ({disableContentPadding, minWidth, minHeight}) => {
    let rest = {};
    if (minHeight) rest = {minHeight: minHeight};
    return {
      padding: disableContentPadding ? 0 : theme.spacing(2),
      minWidth: minWidth || 300,
      ...rest,
    };
  },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function CustomizedDialogs(props) {
  const {handleClose, open, actions, title, minHeight, minWidth} = props;
  const {disableContentPadding, maxWidth, fullScreen, paperProps = {}} = props;
  return (
    <Dialog PaperProps={paperProps || {}} fullWidth={true} maxWidth={maxWidth} fullScreen={fullScreen} TransitionComponent={Transition} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent {...{minHeight, minWidth, disableContentPadding}} dividers>
        {props.children}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}

CustomizedDialogs.defaultProps = {
  open: false,
  handleClose: () => {},
  children: <React.Fragment />,
  actions: null,
  title: '',
  maxWidth: 'md',
  fullScreen: false,
};

CustomizedDialogs.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  actions: PropTypes.node,
  title: PropTypes.string,
};

export default CustomizedDialogs;

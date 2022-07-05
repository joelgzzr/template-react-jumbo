import { Box, Collapse } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

import CmtImage from '../../coremat/CmtImage';
import { selectLoadingToken, selectSignInErrors, signIn } from '../../redux/features/auth';
import IntlMessages from '../common/IntlMessages';
import LoadingButton from '../common/LoadingButton';

import AuthWrapper from './AuthWrapper';

const useStyles = makeStyles((theme) => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: (props) => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  submitButton: {
    minWidth: 91,
    minHeight: 35,
  },
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(<IntlMessages id="signIn.errors.invalidEmail" />)
    .required(<IntlMessages id="signIn.errors.requiredEmail" />),
  password: Yup.string().required(<IntlMessages id="signIn.errors.requiredPassword" />),
});

function SignIn({ variant, wrapperVariant }) {
  const loadingToken = useSelector(selectLoadingToken);
  const signInErrors = useSelector(selectSignInErrors);
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ email, password }) => {
      dispatch(signIn({ email, password }));
    },
  });

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb} data-testid="signIn_authThumb">
          <CmtImage src="/images/auth/login-img.png" />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src="/images/logo.png" />
        </Box>
        <Typography className={classes.titleRoot} component="div" variant="h1">
          <IntlMessages id="signIn.labels.login" />
        </Typography>
        <Collapse data-testid="signIn_incorrectCredentialsCollapse" in={!!signInErrors?.error}>
          <Alert className={classes.alertRoot} severity="error" variant="outlined">
            <IntlMessages id="signIn.errors.incorrectCredentials" />
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              className={classes.textFieldRoot}
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              id="email"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                'data-testid': 'signIn_emailInput',
              }}
              label={<IntlMessages id="signIn.labels.email" />}
              margin="normal"
              name="email"
              value={values.email}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              className={classes.textFieldRoot}
              error={!!(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              id="password"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                'data-testid': 'signIn_passwordInput',
              }}
              label={<IntlMessages id="signIn.labels.password" />}
              margin="normal"
              name="password"
              type="password"
              value={values.password}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Box>
          <Box alignItems="center" display="flex" justifyContent="space-between" mb={5}>
            <Box fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">
                <IntlMessages id="signIn.buttons.forgotPassword" />
              </NavLink>
            </Box>
          </Box>

          <Box alignItems="center" display="flex" justifyContent="space-between" mb={5}>
            <LoadingButton
              className={classes.submitButton}
              color="primary"
              data-testid="signIn_submitButton"
              disabled={loadingToken}
              loading={loadingToken}
              type="submit"
              variant="contained"
            >
              <IntlMessages id="signIn.buttons.signIn" />
            </LoadingButton>

            <Box fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/signup">
                <IntlMessages id="signIn.buttons.createAccount" />
              </NavLink>
            </Box>
          </Box>
        </form>
      </Box>
    </AuthWrapper>
  );
}

SignIn.propTypes = {
  variant: PropTypes.string,
  wrapperVariant: PropTypes.string,
};

SignIn.defaultProps = {
  variant: 'default',
  wrapperVariant: 'default',
};

export default SignIn;

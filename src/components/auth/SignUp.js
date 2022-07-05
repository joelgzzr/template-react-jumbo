import { Box, Collapse } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

import CmtImage from '../../coremat/CmtImage';
import { selectLoadingToken, selectSignUpErrors, signUp } from '../../redux/features/auth';
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
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
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
  textCapital: {
    textTransform: 'capitalize',
  },
  textAcc: {
    textAlign: 'center',
    '& a': {
      marginLeft: 4,
    },
  },
  alrTextRoot: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(<IntlMessages id="signUp.errors.invalidEmail" />)
    .required(<IntlMessages id="signUp.errors.requiredEmail" />),
  name: Yup.string().required(<IntlMessages id="signUp.errors.requiredName" />),
  password: Yup.string()
    .min(6, <IntlMessages id="signUp.errors.passwordLength" />)
    .required(<IntlMessages id="signUp.errors.requiredPassword" />),
});

function SignUp({ variant, wrapperVariant }) {
  const loadingToken = useSelector(selectLoadingToken);
  const signUpErrors = useSelector(selectSignUpErrors);
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ name, email, password }) => {
      dispatch(signUp({ name, email, password }));
    },
  });

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb} data-testid="signUp_authThumb">
          <CmtImage src="/images/auth/sign-up-img.png" />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src="/images/logo.png" />
        </Box>
        <Typography className={classes.titleRoot} component="div" variant="h1">
          <IntlMessages id="signUp.labels.createAccount" />
        </Typography>
        <Collapse data-testid="signUp_signUpErrorsCollapse" in={!!signUpErrors?.error}>
          <Alert className={classes.alertRoot} severity="error" variant="outlined">
            <IntlMessages id="signUp.errors.registerError" />
          </Alert>
        </Collapse>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              className={classes.textFieldRoot}
              error={!!(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              id="name"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                'data-testid': 'signUp_nameInput',
              }}
              label={<IntlMessages id="signUp.labels.name" />}
              margin="normal"
              name="name"
              value={values.name}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              className={classes.textFieldRoot}
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              id="email"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                'data-testid': 'signUp_emailInput',
              }}
              label={<IntlMessages id="signUp.labels.email" />}
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
                'data-testid': 'signUp_passwordInput',
              }}
              label={<IntlMessages id="signUp.labels.password" />}
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

          <Box
            alignItems={{ sm: 'center' }}
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent={{ sm: 'space-between' }}
            mb={3}
          >
            <Box mb={{ xs: 2, sm: 0 }}>
              <LoadingButton
                className={classes.submitButton}
                color="primary"
                data-testid="signUp_submitButton"
                disabled={loadingToken}
                loading={loadingToken}
                type="submit"
                variant="contained"
              >
                <IntlMessages id="signUp.buttons.register" />
              </LoadingButton>
            </Box>

            <Box fontSize={{ xs: 12, sm: 16 }}>
              <IntlMessages id="signUp.messages.haveAccount" />{' '}
              <NavLink to="/signin">
                <IntlMessages id="signUp.buttons.login" />
              </NavLink>
            </Box>
          </Box>
        </form>
      </Box>
    </AuthWrapper>
  );
}

SignUp.propTypes = {
  variant: PropTypes.string,
  wrapperVariant: PropTypes.string,
};

SignUp.defaultProps = {
  variant: 'default',
  wrapperVariant: 'default',
};

export default SignUp;

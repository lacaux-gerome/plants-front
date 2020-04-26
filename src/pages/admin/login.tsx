import React, { useState, SyntheticEvent, useContext } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { QueryLoginUserArgs, Query } from "generated/graphql";
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  makeStyles,
  Link,
} from "@material-ui/core";

import { adminAppRouter } from "routes/internal-router";
import { Copyright } from "./components/copyright";
import { isInputError } from "network/errors-guards";
import { localStorageWrapper } from "network/local-storage/local-storage-wrapper";
import { AppContext } from "typed-index";

const loginUserQuery = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      success
      user {
        id
        email
        firstName
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type LoginFormAdminField = "EMAIL_FIELD" | "PASSWORD_FIELD";
type LoginAdminForm = Record<LoginFormAdminField, boolean>;

export const LoginAdmin = () => {
  const history = useHistory();
  const { setIsConnected } = useContext(AppContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formErrors, setFormErrors] = useState<LoginAdminForm>({
    EMAIL_FIELD: false,
    PASSWORD_FIELD: false,
  });
  const [loginUser] = useLazyQuery<Query>(loginUserQuery, {
    variables: { email, password } as QueryLoginUserArgs,
    onCompleted: ({ loginUser: data }) => {
      if (!data) {
        return;
      }
      if (data.success) {
        setIsConnected(true);
        localStorageWrapper.setItem(true, "isConnectedToAdmin");
        history.push(adminAppRouter.home());
      }
    },
    onError: ({ graphQLErrors }) => {
      if (isInputError(graphQLErrors[0])) {
        const errors = graphQLErrors[0].extensions?.extraInfo.reduce(
          (acc: LoginAdminForm, error: LoginFormAdminField) => {
            return { ...acc, [error]: true };
          },
          formErrors
        );
        setFormErrors(errors);
      }
    },
  });
  const classes = useStyles();
  const _confirm = (event: SyntheticEvent) => {
    event.preventDefault();
    loginUser({ variables: { email, password } });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            onChange={(event) => {
              if (formErrors.EMAIL_FIELD) {
                setFormErrors({ ...formErrors, EMAIL_FIELD: false });
              }
              setEmail(event.target.value);
            }}
            value={email}
            error={formErrors["EMAIL_FIELD"]}
            name="email"
            autoComplete="email"
            autoFocus
            id="email"
            label="Email Address"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={formErrors["PASSWORD_FIELD"]}
            type="password"
            onChange={(event) => {
              if (formErrors.PASSWORD_FIELD) {
                setFormErrors({ ...formErrors, PASSWORD_FIELD: false });
              }
              setPassword(event.target.value);
            }}
            value={password}
            name="password"
            id="password"
            label="Password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={_confirm}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">Forgot password?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

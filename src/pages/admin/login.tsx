import React, { useState, SyntheticEvent } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { AuthResp } from "generated/graphql";
import { useHistory } from "react-router-dom";
import { caregiverAppRouter } from "routes/internal-router";

const createUserQuery = gql`
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

export const LoginAdmin = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createUser, { data }] = useLazyQuery<AuthResp>(createUserQuery, {
    variables: { email, password },
    onCompleted: () => {
      if (data?.success) {
        document.cookie = "signedin=true";
        history.push(caregiverAppRouter.home());
      }
    },
  });
  const _confirm = (event: SyntheticEvent) => {
    event.preventDefault();
    createUser({ variables: { email, password } });
  };
  return (
    <form method="post" onSubmit={_confirm}>
      <fieldset>
        <p>
          <label htmlFor="email">
            Email <abbr title="required">*</abbr>
          </label>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="email"
            value={email}
          />
        </p>
        <p>
          <label htmlFor="password">
            Password <abbr title="required">*</abbr>
          </label>
          <input
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
      </fieldset>
      <p>
        <button type="submit">Login</button>
      </p>
    </form>
  );
};

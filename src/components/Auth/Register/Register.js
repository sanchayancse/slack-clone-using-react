import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";

function Register() {
  let user = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  let errors = [];
  const [userState, setuserState] = useState(user);
  const [errorState, seterrorState] = useState(errors);
  const handleInput = (e) => {
    let target = e.target;
    setuserState((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: "please fill all the fields" })
      );
      return false;
    } else if (!checkPassword()) {
      seterrorState((error) =>
        error.concat({ message: "Given password not valid" })
      );
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !userState.username.length ||
      !userState.password.length ||
      !userState.confirmpassword.length ||
      !userState.email.length
    );
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
      return false;
    } else if (userState.password !== userState.confirmpassword) {
      return false;
    }
    return true;
  };

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };


  const onSubmit = (e) => {
      seterrorState(() =>[]);
    if (checkForm()) {
    } else {
    }
  };

  

  return (
    <Grid verticalAlign="middle" textAlign="center">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header as="h2">
          <Icon name="slack" />
          Register
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              value={userState.username}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
            />

            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />

            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Password"
            />

            <Form.Input
              name="confirmpassword"
              value={userState.confirmpassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm Password"
            />
          </Segment>

          <Button>Submit</Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formatErrors()}
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default Register;

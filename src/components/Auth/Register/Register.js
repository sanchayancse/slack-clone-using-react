import React, { useState } from "react";
import "./Register.css";
import fire from "../../../config/fire";
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

  //create Database into the firebase

  let userCollections = fire.database().ref("users");

  let errors = [];
  const [userState, setuserState] = useState(user);
  const [errorState, seterrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


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
      seterrorState((error) =>
        error.concat({ message: "Password length Should be grater than 8 " })
      );

      return false;
    } else if (userState.password !== userState.confirmpassword) {
      seterrorState((error) =>
        error.concat({
          message: "Password and Confirm Password does note match",
        })
      );
      return false;
    }
    return true;
  };

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  const onSubmit = (e) => {
    seterrorState(() => []);
    setIsSuccess(false);
    if (checkForm()) {
      setIsLoading(true);
      fire
        .auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then((createdUser) => {
          //console.log(createdUser);
          setIsLoading(false);
          updateUserDetails(createdUser);
        })
        .catch((servererror) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(servererror));
          //console.log(servererror);
        });
    }
  };

  const updateUserDetails = (createdUser) => {
    if (createdUser) {
      setIsLoading(true);
      createdUser.user
        .updateProfile({
          displayName: userState.username,
          photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`,
        })
        .then(() => {
          // console.log(createdUser);
          setIsLoading(false);
          saveUser(createdUser);
        })
        .catch((servererror) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(servererror));
        });
    }
  };

  // Save users in Databse

  const saveUser = (createdUser) => {
    setIsLoading(true);
    userCollections
      .child(createdUser.user.uid)
      .set({
        displayName: createdUser.user.displayName,
        photoURL: createdUser.user.photoURL,
      })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
        console.log("user saved in database");

      })
      .catch((servererror) => {
        setIsLoading(false);
        seterrorState((error) => error.concat(servererror));
      });
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid__form">
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

          <Button disabled={isLoading} loading={isLoading}>
            Submit
          </Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formatErrors()}
          </Message>
        )}

          {/* User Registration Success Message */}

          {isSuccess && (
          <Message success>
            <h3>Successfully Registered</h3>
            
          </Message>
        )}
      
      </Grid.Column>
    </Grid>
  );
}

export default Register;

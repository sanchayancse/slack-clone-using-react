import React,{ useState} from 'react';
import './Login.css';
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
  import { Link } from "react-router-dom";
  

function Login() {


    let user = {
        email: "",
        password: "",
      };
    
      
  let errors = [];


      const [userState, setuserState] = useState(user);
      const [errorState, seterrorState] = useState(errors);
      const [isLoading, setIsLoading] = useState(false);



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
        } 
        return true;
      };
    
      const isFormEmpty = () => {
        return (
          
          !userState.password.length ||
          
          !userState.email.length
        );
      };
    

      const onSubmit = (e) => {
        seterrorState(() => []);
      
        if (checkForm()) {
          setIsLoading(true);
          fire
            .auth()
            .signInWithEmailAndPassword(userState.email, userState.password)
            .then((user) => {
              //console.log(createdUser);
              setIsLoading(false);
              console.log(user);
            })
            .catch((servererror) => {
              setIsLoading(false);
              seterrorState((error) => error.concat(servererror));
              //console.log(servererror);
            });
        }
      };
    
      const formatErrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>);
      };
    

    return (
        <Grid verticalAlign="middle" textAlign="center" className="grid__form">
        <Grid.Column style={{ maxWidth: "500px" }}>
          <Header as="h2">
            <Icon name="slack" />
            Login
          </Header>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
              
  
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
  
              
            </Segment>
  
            <Button disabled={isLoading} loading={isLoading}>
              Login
            </Button>
          </Form>
          {errorState.length > 0 && (
            <Message error>
              <h3>Errors</h3>
              {formatErrors()}
            </Message>
          )}
  
           
  
        <Message>
          Not an User? <Link to="/register"> Register </Link>
        </Message>
        </Grid.Column>
      </Grid>
    )
}

export default Login

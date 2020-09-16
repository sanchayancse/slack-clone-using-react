import React from "react";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import './UserInfo.css';
import fire from '../../../config/fire';



const UserInfo = (props) => {

    const getDropdown = () =>{
        return[{
            key: 'signout',
            text: <samp onClick={signOut}> signout</samp>
        }]
    }

    const signOut = () =>{
        fire.auth().signOut().then(()=>{
            console.log("user signed out")
        })
    }


    if(props.user){
  return (
    <Grid>
      <Grid.Column>
        <Grid.Row className="userinfo">
          <Header inverted as="h2">
            <Icon name="slack" />
            <Header.Content>Slack</Header.Content>
          </Header>
          <Header inverted as="h4" className="username">
              <Dropdown trigger={
                  <span>
                  <Image src={props.user.photoURL} avatar></Image>
                  {props.user.displayName}
                </span>
              }
              options ={getDropdown()}
              >
                  
              </Dropdown>
            
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
    }
    return null;
};


const mapStateToProps = (state) => {
    return {user: state.user.currentUser};
  };



export default connect(mapStateToProps)(UserInfo);

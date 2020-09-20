import React from 'react';
import {SideBar} from './components/sidebar/SideBar';
import './App.css';
import Message from './components/Messages/Message';
import { Grid } from 'semantic-ui-react';


function App() {
  return (
    <Grid columns="equal">
     <SideBar/>
     <Grid.Column className="chatpanel">
     
     <Message/>
     </Grid.Column>
     
     <Grid.Column width={3}>
       <span>

       </span>
     </Grid.Column>
     </Grid>
  );
}

export default App;

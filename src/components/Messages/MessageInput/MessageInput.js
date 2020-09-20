import React, { useState } from "react";
import { Button, Input, Segment } from "semantic-ui-react";
import fire from "../../../config/fire";

import { connect } from "react-redux";

const MessageInput = (props) => {
  const messageStore = fire.database().ref("messages");

  const [messageState, setMessageState] = useState("");
  var date = new Date();
  var timestamp = date.getTime();
  const MessageInfo = () => {
    return {
      user: {
        avatar: props.user.photoURL,
        name: props.user.displayName,
        id: props.user.uid,
      },
      content: messageState,
      //timestamp: fire.database.ServerValue.Timestamp.now()
      timestamp: timestamp
     
    };
  };

  const onSubmit = () => {
    if (messageState) {
      messageStore
        .child(props.channel.id)
        .push()
        
        .set(MessageInfo())
        .then(() => setMessageState(""), console.log("sent"))
        .catch((err) => console.log(err));
    }
  };

  const onMessageChange = (e) => {
    const target = e.target;
    setMessageState(target.value);
  };

  const ActionButtons = () => {
    return (
      <>
        <Button icon="send" onClick={onSubmit} />
        <Button icon="upload" />
      </>
    );
  };

  return (
    <Segment>
      <Input
        onChange={onMessageChange}
        fluid={true}
        name="message"
        value={messageState}
        label={ActionButtons()}
        labelPosition="right"
      />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

export default connect(mapStateToProps)(MessageInput);

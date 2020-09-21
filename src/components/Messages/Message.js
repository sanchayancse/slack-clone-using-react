import React, { useEffect, useState } from "react";
import MessageHeaader from "./MessageHeader/MessageHeader";
import MessageInput from "./MessageInput/MessageInput";
import fire from "../../config/fire";
import { connect } from "react-redux";
import { Segment, Comment } from "semantic-ui-react";
import MessageContent from "./MessageContent/MessageContent";
import "./Message.css";

const Message = (props) => {
  const messageStore = fire.database().ref("messages");

  const [messagesState, setMessageState] = useState([]);

  useEffect(() => {
    if (props.channel) {
      setMessageState([]);
      messageStore.child(props.channel.id).on("child_added", (snap) => {
        setMessageState((currentState) => {
          let updatedState = [...currentState];
          updatedState.push(snap.val());
          return updatedState;
        });
      });
      return () => messageStore.child(props.channel.id).off();
    }
  }, [props.channel]);

  const displayMessages = () => {
    if (messagesState.length > 0) {
      return messagesState.map((message) => {
        return (
          <MessageContent
            myMessage={message.user.id === props.user.uid}
            key={message.timestamp}
            message={message}
          />
        );
      });
    }
  };
  return (
    <div>
      <MessageHeaader />
      <Segment className="messagecontent">
        <Comment.Group>{displayMessages()}</Comment.Group>
      </Segment>
      <MessageInput />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channel: state.channel.currentChannel,
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(Message);

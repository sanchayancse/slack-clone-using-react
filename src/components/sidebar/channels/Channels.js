import React, { useState, useEffect } from "react";
import "./Channels.css";
import { connect } from "react-redux";
import { Button, Icon, Menu, Modal, Form, Segment } from "semantic-ui-react";
import fire from "../../../config/fire";
import { setChannel } from "../../../store/actioncreator";

const Channels = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [channelAdd, setChannelAdd] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [channelData, setChannelData] = useState([]);

  const channel = fire.database().ref("channels");

  useEffect(() => {
    channel.on("child_added", (snap) => {
      console.log(snap.val());
      setChannelData((currentstate) => {
        let updatedState = [...currentstate];
        updatedState.push(snap.val());
        if(updatedState.length === 1){
          props.selectChannel(updatedState[0])
        }
        return updatedState;
      });
    });

    return () => channel.off();
  }, []);


  useEffect(()=>{
    if(channelData.length > 0){
      props.selectChannel(channelData[0])
    }
  },[!props.channel ?channelData : null])

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const checkForm = () => {
    return channelAdd && channelAdd.name && channelAdd.description;
  };

  const displayChannels = () => {
    if (channelData.length > 0) {
      return channelData.map((channel) => {
        return <Menu.Item 
                key={channel.id}
                name={channel.name}
                onClick={()=> props.selectChannel(channel)}
                active={props.channel &&  channel.id === props.channel.id}
                ></Menu.Item>;
      });
    }
  };

  const onSubmit = () => {
    if (!checkForm()) {
      return;
    }

    const key = channel.push().key;

    const channelss = {
      id: key,
      name: channelAdd.name,
      description: channelAdd.description,
      created_by: {
        name: props.user.displayName,
        avatar: props.user.photoURL,
      },
    };

    setIsLoading(true);
    channel
      .child(key)
      .update(channelss)
      .then(() => {
        setChannelAdd({ name: "", description: "" });
        closeModal();
        setIsLoading(false);
        console.log("saved to the db");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInput = (e) => {
    let target = e.target;
    setChannelAdd((currentstate) => {
      let UpdateState = { ...currentstate };

      UpdateState[target.name] = target.value;
      return UpdateState;
    });
  };

  return (
    <>
      <Menu.Menu>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels
          </span>
          ({channelData.length})
        </Menu.Item>
        {displayChannels()}
        <Menu.Item>
          <span className="click" onClick={openModal}>
            <Icon name="add" /> ADD
          </span>
        </Menu.Item>
      </Menu.Menu>

      <Modal open={modalOpen} onClose={closeModal}>
        <Modal.Header>Create Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
              <Form.Input
                name="name"
                value={channelAdd.name}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Name"
              />

              <Form.Input
                name="description"
                value={channelAdd.description}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Description"
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button loading={isLoading} onClick={onSubmit}>
            <Icon name="checkmark" /> Add
          </Button>

          <Button onClick={closeModal}>
            <Icon name="remove" /> Cancle
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel : state.channel.currentChannel,
  };
};


const mapDispatchToProps = (dispatch) =>{

  return{
    selectChannel : (channel)=>dispatch(setChannel(channel))
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Channels);

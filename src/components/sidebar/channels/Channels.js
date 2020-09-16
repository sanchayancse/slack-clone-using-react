import React, { useState } from "react";
import "./Channels.css";
import { connect } from "react-redux";
import { Button, Icon, Menu, Modal, Form, Segment } from "semantic-ui-react";
import fire from "../../../config/fire";

const Channels = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [channelAdd, setChannelAdd] = useState({ name: "", description: "" });

  const channel = fire.database().ref("channels");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  
  const checkForm =()=>{
    return channelAdd && channelAdd.name && channelAdd.description;
}


  const onSubmit = () => {

    if(!checkForm()){
        return ;
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

    channel
      .child(key)
      .update(channelss)
      .then(() => {
        setChannelAdd({ name: "", description: "" });

        console.log("saved to the db");
      })
      .catch((error)=>{
          console.log(error)

      })
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
          (0)
        </Menu.Item>
        <Menu.Item>
          <span onClick={openModal}>
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
          <Button onClick={onSubmit}>
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
  };
};

export default connect(mapStateToProps)(Channels);

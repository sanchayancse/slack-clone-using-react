
import React, {useState} from 'react';
import { Comment } from 'semantic-ui-react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import './MessageContent.css';

TimeAgo.locale(en);

const timeAgo = new TimeAgo();

const MessageContent = (props) =>{

   
    return <Comment>

        <Comment.Avatar src={props.message.user.avatar}></Comment.Avatar>
        <Comment.Content className={props.myMessage ? "myMessage" : null}>
            <Comment.Author>{props.message.user.name}</Comment.Author>
            <Comment.Metadata>{timeAgo.format(props.message.timestamp) }</Comment.Metadata>
            <Comment.Text>{props.message.content}</Comment.Text>
        </Comment.Content>
    </Comment>
}

export default MessageContent;
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFileOutlined,
  InsertEmoticonOutlined,
  Mic,
  MoreVertOutlined,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import Message from "./Message";
import firebase from "firebase/compat/app";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react"

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  // chatメッセージが追加されるたびこれが再実行される。それに伴いmessageSnapshotに関連する部分も再実行
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
  );
  const showMessage = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      // firestoreから最新を取得するまでの一旦表示する部分
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL}/>
        ) : (<Avatar>{recipientEmail[0]}</Avatar>)}
        <HeaderInfomation>
          <h3>{ recipientEmail }</h3>
          {recipientSnapshot ? (
            <p>Last acvite: {' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>) : "Unavailable"
              }
            </p>
          ): (<p>Loading Last active ...</p>)}
        </HeaderInfomation>
        <HeaderIcons>
          <IconButton>
            <AttachFileOutlined />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessage()}
        <EndOfMessage />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonOutlined />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <Mic />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInfomation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 15px;
    color: grey;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessage = styled.div``;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
`;

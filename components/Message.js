import styled from "styled-components";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase'
import moment from "moment"

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever
  return (
    <Container>
      <TypeOfMessage>{message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : ''}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  position: relative;
  text-align: right;
`

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`

const Timestamp = styled.p`
  margin: 0;
  color: gray;
  font-size: 10px;
`
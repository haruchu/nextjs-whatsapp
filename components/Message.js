import styled from "styled-components";
import React from "react";

function Message({ user, message }) {
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

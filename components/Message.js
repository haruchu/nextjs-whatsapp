import styled from "styled-components";
import React from "react";

function Message({ user, mesasge }) {
  return (
    <Container>
      <p>{message}</p>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

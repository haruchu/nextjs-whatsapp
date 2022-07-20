import React from 'react'
import {Circle} from 'better-react-spinkit'
import styled from 'styled-components'

function Loading() {
  return (
    <Wrapper>
      <Circle color="#3cbc28" size={100} />
    </Wrapper>
  )
}

export default Loading

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;
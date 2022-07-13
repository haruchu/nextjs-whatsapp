import { Avatar, Button, IconButton } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components'
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as EmailValidator from 'email-validator'

function Sidebar() {
  const createChat = () => {
    const input = prompt("Please enter an email address for the user you wish to chat with");

    if (!input) return null;

    if (EmailValidator.validate(input)) {
      
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </IconsContainer>

      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search in chats'/>
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  margin: 10px;
  cursor: pointer;

  transition: 0.5s;

  &:hover{
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
`;

const Search = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`
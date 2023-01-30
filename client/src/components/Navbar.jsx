import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Upload from "./Upload";

const Container = styled.div`
  top: 0;
  background-color: ${({ theme }) => theme.navbarBg};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 3px;
`;

const Input = styled.input`
border: none;
background-color: ${({ theme }) => theme.searchInputBg};
outline: none;
width: 100%;
color: ${({ theme }) => theme.text};
padding: 10px;
border-radius: 5px;


&::placeholder{
    font-weight 600;
}  
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #3ea6ff;
    color: white;
    border: 1px solid black;
  }
`;

const User = styled.div`
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const CustomizedSearchIcon = styled(SearchIcon)`
  color: ${({ theme }) => theme.searchIconBg};
  margin-left: 5px;
  cursor: pointer;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    try {
      navigate("/");
      window.location.reload();
      sessionStorage.clear();
      localStorage.clear();
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />

            <CustomizedSearchIcon onClick={()=>navigate(`/search?q=${query}`)} /> 
            {// el 8alta hena
             //kant fe /search?(((q)))=... el q de kont m5leha query w dah 8alat 3ashan el route
            //implementation fe search endpoint fel routes
          }
            
          </Search>
          {currentUser ? (
            <User>
              <VideoCallIcon onClick={() => setOpen(true)} />
              <NotificationsIcon />
              <Avatar src={currentUser.img} />
              {currentUser.name}
              <Button onClick={handleLogout}>LOGOUT</Button>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;

// import Reaper from "../images/Reaper.png"; //pngegg
// import doomFist from "../images/doomfist.jpg";
// import junkrat50 from "../images/junkrat50.jpg";
// import sona1 from "../images/sona1.jpg";
// import winston from "../images/winston.png";
// import reinhard from "../images/reinhard.png";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import Card from "../components/Card";
import Comments from "../components/Comments";
import Comment from "../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  dislike,
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
} from "../redux/videoSlice";
import axios from "axios";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
// import randomFile from "select-random-file"
// import fs from "file-system"
const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

// const Recommendation = styled.div`
//   flex: 2;
// `;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.searchIconBg};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 600;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  &: hover {
    background-color: #f94444;
  }
  ${(props) =>
    props.green &&
    `
  background-color: grey;
  color: black;
  pointer-events: none;
  `}
`;
const videoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const CustomizedThumbUpOutlinedIcon = styled(ThumbUpOutlinedIcon)`
  &: hover {
    color: red;
  }
`;
const CustomizedThumbDownOffAltOutlinedIcon = styled(
  ThumbDownOffAltOutlinedIcon
)`
  &: hover {
    color: red;
  }
`;
const CustomizedReplyOutlinedIcon = styled(ReplyOutlinedIcon)`
  &: hover {
    color: red;
  }
`;
const CustomizedAddTaskOutlinedIcon = styled(AddTaskOutlinedIcon)`
  &: hover {
    color: red;
  }
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const LoginFirst = styled.h1`
  font-size: 50px;
  font-weight: 800;
  color: #f3f3f3;
  margin-bottom: 10px;
  position: relative;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  top: 150px;
  left: 40px;
  display: flex;
  position: relative;
  left: 400px;
`;
const Signin = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-size: 18px;
  border-radius: 3px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  position: relative;

  right: 350px;
  top: 120px;

  gap: 5px;
  margin: 30px 30px 0px 0px;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #3ea6ff;
    color: white;
    border: 1px solid black;
  }
`;
const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});
  const [sub, setSub] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser._id) {
          console.log("LOGIN U FUKIN ASSHGOLE");
        }
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        //console.log(channelRes.data)
        setChannel(channelRes.data);

        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentVideo._id));
  };
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentVideo._id));
  };
  const handleSub = async () => {
    setSub(!sub);
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };
  //console.log(currentVideo._id)

  return (
    <>
      {currentUser ? (
        <Container>
          <Content>
            <VideoWrapper>
              <VideoFrame src={currentVideo.videoUrl} controls />
            </VideoWrapper>
            <Title>{currentVideo.title}</Title>
            <Details>
              <Info>
                {currentVideo.views} · {format(currentVideo.createdAt)}
              </Info>
              <Buttons>
                <Button onClick={handleLike}>
                  {currentVideo.likes?.includes(currentUser._id) ? (
                    <ThumbUpIcon />
                  ) : (
                    <CustomizedThumbUpOutlinedIcon />
                  )}{" "}
                  {currentVideo.likes?.length}
                </Button>
                <Button onClick={handleDislike}>
                  {currentVideo.dislikes?.includes(currentUser._id) ? (
                    <ThumbDownIcon />
                  ) : (
                    <CustomizedThumbDownOffAltOutlinedIcon />
                  )}
                  {""}
                  {currentVideo.dislikes?.length}
                </Button>
                <Button>
                  <CustomizedReplyOutlinedIcon /> Share
                </Button>
                <Button>
                  <CustomizedAddTaskOutlinedIcon /> Save
                </Button>
              </Buttons>
            </Details>
            <Hr />
            <Channel>
              <ChannelInfo>
                <Image src={channel.img} />
                <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>
                    {channel.subscribers} subscribers
                  </ChannelCounter>
                  <Description>{currentVideo.desc}</Description>
                </ChannelDetail>
              </ChannelInfo>

              {currentUser.subscribedUsers?.includes(channel._id) ? (
                <Subscribe green onClick={handleSub}>
                  SUBSCRIBED
                </Subscribe>
              ) : (
                <Subscribe onClick={handleSub}>SUBSCRIBE</Subscribe>
              )}
            </Channel>
            <Hr />
            <Comments videoId={currentVideo._id} />
            {/* <Comment img={winston} />
        <Comment img={doomFist} />
        <Comment img={junkrat50} />
        <Comment img={doomFist} />
        <Comment img={sona1} />
        <Comment img={reinhard} />
        <Comment img={Reaper} /> */}
          </Content>
          <Recommendation tags={currentVideo.tags} />
        </Container>
      ) : (
        <>
          <LoginFirst>
            Please login first!
            <Link
              to="/signin"
              style={{ textDecoration: "none", display: "flex" }}
            >
              <Signin>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Signin>
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", display: "flex" }}
            >
              <Signin>
                <AccountCircleOutlinedIcon />
                REGISTER{" "}
              </Signin>
            </Link>
          </LoginFirst>
        </>
      )}
    </>
  );
};

export default Video;

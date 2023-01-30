import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";
import dva from "../images/dva.png";

const Container = styled.div`
  margin-bottom: ${(props) => props.type === "sm" ? "10px" : "45px"};
  curson: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: ${(props) => props.type !== "sm" && "310px"};
  height: ${(props) => props.type === "sm" ? "130px" : "200px"};
  background-color: pink;
  cursor: pointer;
  
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 2px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
  margin-right: 8px;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
width: ${(props) => props.type === "sm" && "118px"};
`;

const Title = styled.h1`
  font-size: ${(props) => props.type === "sm" ? "13px" : "16px"};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`

font-size: ${(props) => props.type === "sm" ? "12px" : "16px"};
margin: 9px 0px 0px 0px;
color: ${({ theme }) => theme.text};

`;

const Info = styled.div`
font-size: 11px;
color: ${({ theme }) => theme.textSoft};
`;

// const Date = styled.span`
// font-size: 10px;
// color: ${({ theme }) => theme.textSoft};
// `;

const Subs = styled.div`
font-size: 10px;
color: ${({ theme }) => theme.textSoft};
margin: 1px 0px 7px 0px;
`

const Card = ({type, video}) => {

  const [channel, setChannel] = useState([])

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`)
      setChannel(res.data)
    }
    fetchChannel();
  }, [video.userId])

  const { currentVideo } = useSelector((state) => state.video);
//console.log(currentVideo)
  return (
      <Link to={`/video/${video._id}`} style={{textDecoration: "none"}}>
    <Container type={type}>
      <Image type={type} src={video.imgUrl} />
      <Details type={type}>
        <ChannelImage type={type} src={channel.img}/>
        <Texts type={type}>
            <Title type={type}>{video.title}</Title>
            <ChannelName type={type}>{channel.name}</ChannelName>
            <Subs>13K Subscribers</Subs>
            <Info>{video.views} views · {format(video.createdAt)}</Info>
        </Texts>
      </Details>
    </Container>
      </Link>
  );
};

export default Card;

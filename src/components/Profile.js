import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

import { Container } from '@mui/material';

import DisplaySinglePostOnProfile from '../components/common/DisplaySinglePostOnProfile';
import ProfilePicture from './common/ProfilePicture';

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({
    username: '',
    isAdmin: false,
    email: '',
    password: '',
    cloudinaryImageId: ''
  });

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleUser(id))
      .then(({ data }) => {
        setUserData(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [id]);

  const userPosts = userData?.posts;
  console.log(userPosts);

  const humanDate = new Date(userData?.createdAt).toLocaleDateString();

  return (
    <>
      <Container>
        <h1>User Profile</h1>
        <ProfilePicture cloudinaryImageId={userData?.cloudinaryImageId} />
        <p>Username: {userData?.username}</p>
        <p>Joined on: {`${humanDate}`}</p>
        <p>User ID: {userData?._id}</p>
        <p>Posts:</p>
        {userPosts?.map((post) => (
          <DisplaySinglePostOnProfile postId={post} key={post} />
        ))}
      </Container>
    </>
  );
}

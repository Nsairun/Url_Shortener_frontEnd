/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OrgF, {
  MainHolder,
  NavBar,
  UrlHolder,
} from '../../components/Organisms/Organisms';

import {
  ButtonHolder,
  JoinHolder,
  LogoHolder,
  UrlCard,
  CardBottom,
  LongUrlField,
} from '../../components/Molecules/Molecules';

import {
  Button,
  InputField,
  Join,
  JoinSpan,
  Ptag,
  ShortLogo,
  ShortUrl,
  UrlTxt,
  ViewIcon,
  CopyIcon,
  DeleteIcon,
  CopyIconCopied,
} from '../../components/Atoms/Atoms';
import MyContext from '../../context';
import AuthGuard from '../../components/AuthGuard/AuthGuard';

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

function UserPage({ currentUser }) {
  const navigate = useNavigate();
  const { urls, handleSubmit, copy, copyText } = useContext(MyContext);
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
    window.location.reload(true);
  };

  return (
    <User>
      <NavBar>
        <LogoHolder>
          <ShortLogo />
          <ShortUrl>ShorTy</ShortUrl>
        </LogoHolder>
        <ButtonHolder>
          <Ptag $secondry>Hi {currentUser.user_name}</Ptag>
          <Button onClick={logout} $primary>
            LogOut
          </Button>
        </ButtonHolder>
      </NavBar>
      <MainHolder>
        <JoinHolder>
          <Join>Welcome my friend</Join>
          <JoinSpan>{currentUser.user_name}</JoinSpan>
        </JoinHolder>
        <Ptag>What will you like to shorten today</Ptag>
        <LongUrlField onSubmit={handleSubmit}>
          <InputField placeholder="Enter LongUrl" name="long_url" type="url" />
          <Button type="submit">Shorten</Button>
        </LongUrlField>
      </MainHolder>
      <UrlHolder>
        {urls?.map((urldata) => (
          <UrlCard>
            <UrlTxt>{urldata.long_url}</UrlTxt>
            <UrlTxt id="shorturl" $primary>
              {`http://localhost:3000/shorty.com/${urldata.short_url}`}
            </UrlTxt>
            <CardBottom>
              <ViewIcon />
              <UrlTxt $secondry>6 seconds ago</UrlTxt>
              {copy ? (
                <CopyIconCopied />
              ) : (
                <CopyIcon
                  onClick={(e) => {
                    copyText(e);
                  }}
                />
              )}
              <DeleteIcon />
            </CardBottom>
          </UrlCard>
        ))}
      </UrlHolder>
      <OrgF />
    </User>
  );
}

export default AuthGuard(UserPage);

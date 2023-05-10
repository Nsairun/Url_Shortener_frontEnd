/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prettier/prettier */
import './App.css';
import React, { useState } from 'react';
import validUrl from 'valid-url';
import { customAlphabet } from 'nanoid';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { registerUrl } from './api/urlauth';
import MyContext from './context';
import Registeration from './Pages/Registration/Registration';
import Login from './Pages/Login/Login';
import UsersPage from './Pages/User/User';
import HomePage from './Pages/homepage/HomePage';
import UrlStats from './Pages/Urlstats/UrlStats';

function App() {
  const [urls, setUrls] = useState([]);
  const [copy, setCopied] = useState(false);
  const [phrase, setPhrase] = useState(false);
  const nanoId = customAlphabet(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    9
  );

  const copyText = (textToCopy) => {
    setCopied(true);
    navigator.clipboard.writeText(textToCopy);
    setPhrase(true);
  };

  const handleSubmit = (e, UserId = null) => {
    e.preventDefault();

    const { target } = e;
    if (target.long_url.value.lenght <= 0) {
      return;
    }

    const data = {
      long_url: target.long_url.value,
      short_url: nanoId(),
      createdAt: new Date().toLocaleTimeString(),
      UserId,
    };

    const longUrl = data.long_url;
    if (!validUrl.isUri(longUrl)) {
      console.log(`NOT_A_VALID_URL`);
      return;
    }

    registerUrl(data);
    setUrls((prev) => [...prev, data]);
  };
  return (
    <MyContext.Provider
      value={{ setPhrase, phrase, copy, urls, handleSubmit, copyText }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registeration />} />
            <Route path="/user" element={<UsersPage />} />
            <Route path="/stats" element={<UrlStats />} />
          </Routes>
        </BrowserRouter>
      </div>
    </MyContext.Provider>
  );
}

export default App;

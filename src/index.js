import React from 'react';
// import ReactDOM from 'react-dom';
import './Styles/index.css'
import { App } from './Components';
import reportWebVitals from './reportWebVitals';
import * as ReactDOMClient from 'react-dom/client';
import { AuthProvider, PostsProvider } from './providers';

// Create a root.
const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
        <GoogleOAuthProvider clientId="829079409564-1lqc7ola85ksq5ocuj5i7ipjegerqm7v.apps.googleusercontent.com">
            <Provider store={store}>
                <HashRouter>
                        <App />
                </HashRouter>
            </Provider>
        </GoogleOAuthProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';

import './foundation.min.css';
import 'animate.css';
import './index.css';

import Header from './components/Header';
import Content from './components/Content';
import Form from './components/Form';

ReactDOM.render(
    <div>
        <Header />
        <Form />
        <Content />
    </div>
   ,
    document.getElementById('root')
);
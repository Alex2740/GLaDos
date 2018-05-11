import React from 'react';
import ReactDOM from 'react-dom';
import 'animate.css';

import './css/foundation.min.css';
import './css/index.css';
import './css/weather-icons.min.css';
import './css/weather-icons-wind.min.css';

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
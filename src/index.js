import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import {Provider} from './react-redux';
//在入口文件index中引一次store就够了，不需要再在每个子组件中都去引入一次
import store from './store';

ReactDOM.render((
    <Provider store={store}>
        <Counter/>
    </Provider>
),document.getElementById('root'));
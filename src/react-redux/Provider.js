import React, { Component } from 'react'
import ReduxContext from './context';
//Provider 是react-redux库中组件的名字
//ReduxContext.Provider中的Provider，是上下文中的API。两者不一样


//ReactDOM.render((
//     <Provider store={store}>
//         <Counter/>
//     </Provider>
// ),document.getElementById('root'));


//Provider这个组件只是用来传值的，本身并不需要定义dom结构，所以这里用this.props.children来获取要渲染的组件
export default class Provider extends Component {
  render() {
    return (
      <ReduxContext.Provider value={{store:this.props.store}}>
        {this.props.children}
      </ReduxContext.Provider>
    )
  }
}

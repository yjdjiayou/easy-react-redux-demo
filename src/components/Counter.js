import React,{Component} from 'react';
import actions from '../store/actions/counter';
import {connect} from '../react-redux';
 class Counter extends Component{
   render(){
       console.log(this.props);
       return (
           <>
             <p>{this.props.counter.number}</p>
             <button onClick={this.props.increment}>+</button>
             <button onClick={this.props.decrement}>-</button>
           </>
       )
   }
}

//为什么要映射状态？
//1 仓库中的状态可能很多，但当前组件只需要用到一部分状态；、
//2 可能需要增加 或者 减少 或者 修改一些属性
//即使映射了状态，某个组件修改了某个状态，也会触发所有用到store的组件重新渲染
//除非你搭配pureCompenent使用， 可以只让修改了状态的组件去更新，其他组件不会触发更新


//将仓库中的状态映射成组件需要的属性
const mapStateToProps = state=>state;
 //修改一些属性
// const mapStateToProps = state=>{state*10};


// const actions = (dispatch) => {
//   return {
//     increment: (...args) => dispatch(actions.increment(...args)),
//     decrement: (...args) => dispatch(actions.decrement(...args))
//   }
// };

//conect负责连接仓库和组件
export default connect(
    mapStateToProps,
    //这个 actions 可以是一个对象，也可以是一个函数（函数会在内部执行）
    //actions里面的属性最终会成组件的属性，组件可以通过this.props.xxx访问
    actions
)(Counter);
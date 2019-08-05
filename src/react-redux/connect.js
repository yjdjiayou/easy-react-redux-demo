import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import ReduxContext from './context';

//context最终返回一个组件

export default function(mapStateToProps,mapDispatchToProps){
   return function(WrappedComponent){
     return class extends Component{
         //这样定义后，组件就可以通过this.context获取上下文对象
          static contextType = ReduxContext;
          constructor(props,context){
              super(props);//context={store:this.props.store}
              //将总的状态映射成当前组件需要的属性对象
              this.state = mapStateToProps(context.store.getState());
              if(typeof mapDispatchToProps == 'function'){
                  this.boundActions = mapDispatchToProps(context.store.dispatch,props);
              }else{
                  this.boundActions = bindActionCreators(mapDispatchToProps,context.store.dispatch);
              }
          }
         shouldComponentUpdate(newProps,nextState){
             if(this.state === mapStateToProps(context.store.getState())){
                 return false;
             }
             return true;
         }
          componentDidMount(){
              this.unsubcribe = this.context.store.subscribe(()=>{
                  this.setState(mapStateToProps(this.context.store.getState()));
              });
          }
          componentWillUnmount(){
            this.unsubcribe();
          }
          render(){
              return <WrappedComponent dispatch={this.context.store.dispatch} {...this.state} {...boundActions}/>
          }
     }
   }
}
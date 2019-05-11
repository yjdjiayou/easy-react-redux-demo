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
               let actions={};
              if(typeof mapDispatchToProps == 'function'){
                actions = mapDispatchToProps(this.context.store.dispatch);
              }else{
                actions = bindActionCreators(mapDispatchToProps,this.context.store.dispatch);
              }
              
              return <WrappedComponent dispatch={this.context.store.dispatch} {...this.state} {...actions}/>
          }
     }
   }
}
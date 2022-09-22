
import { EventEmitter } from "node:events";
var life = new EventEmitter();
 //设置事件监听的最大数量
 life.setMaxListeners(11);//一个事件可以最多设置11个监听事件 默认是10个
 
 //加上事件监听 addEventLister
 life.on('please',function(who){
 	console.log('给'+who+'倒水');
 }) ;//on('事件名字'， 回调方法

 life.on('please',function(who){
 	console.log('给'+who+'做饭');
 }) ;//on('事件名字'， 回调方法

life.on('please',function(who){
 	console.log('给'+who+'洗衣服');
}) ;//on('事件名字'， 回调方法


life.on('lalala',function(who){
 	console.log('给'+who+'发工资');
}) ;//on('事件名字'， 回调方法

//life.emit('please','我') ;
var hasConforListerner = life.emit('please','我') ;//触发事件名称，传入参数值
//会返回true和false 代表事件是否被监听过

console.log(hasConforListerner)
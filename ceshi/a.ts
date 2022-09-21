
import { EventEmitter } from "node:events";
var life = new EventEmitter();

function read(who:String) {
    console.log(' 请讲故事给 ' + who + ' 听 ');
}
life.on('please', read)
// life.emit('please', ' 我 ');

life.removeListener('please', read);


life.emit('please', ' 我 ');

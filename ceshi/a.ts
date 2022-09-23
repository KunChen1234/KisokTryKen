
// // import { EventEmitter } from "node:events";
// // var life = new EventEmitter();
// //  //设置事件监听的最大数量
// //  life.setMaxListeners(11);//一个事件可以最多设置11个监听事件 默认是10个

// import { SerialPort } from "serialport";
// import { DelimiterParser } from '@serialport/parser-delimiter'
// import { EventEmitter } from "node:events";
 
// //  //加上事件监听 addEventLister
// //  life.on('please',function(who){
// //  	console.log('给'+who+'倒水');
// //  }) ;//on('事件名字'， 回调方法

// //  life.on('please',function(who){
// //  	console.log('给'+who+'做饭');
// //  }) ;//on('事件名字'， 回调方法

// // life.on('please',function(who){
// //  	console.log('给'+who+'洗衣服');
// // }) ;//on('事件名字'， 回调方法


// // life.on('lalala',function(who){
// //  	console.log('给'+who+'发工资');
// // }) ;//on('事件名字'， 回调方法

// // //life.emit('please','我') ;
// // var hasConforListerner = life.emit('please','我') ;//触发事件名称，传入参数值
// // //会返回true和false 代表事件是否被监听过

// // console.log(hasConforListerner)
// async function FindCOM(): Promise<{ result: boolean, path: string }> {

//     return new Promise(async (resolve) => {
//         let ports = await SerialPort.list();
//         const port=ports.filter(port=>{
//             return port.vendorId=="09D8"
//         })
//         const COM=port[0].path
//         // console.log(ports)
//         // for (const element of ports) {
//         //     if (element.vendorId === "09D8") {
//         //         console.log("find")
//         //         findcom = true
//         //         COM = element.path
//         //     }
//         // }
//         if (port) {
//             resolve({ result: true, path: COM })
//         }
//         else {
//             resolve({ result: false, path: "null" })
//         }
//     });
// }
// async function OpenPort(COMpath: string): Promise<any | SerialPort | null> {
//     console.log(COMpath)
//     const port = new SerialPort({ path: COMpath, baudRate: 9600, autoOpen: true }, (err: Error | null | undefined) => {
//         if (err) {
//             console.error(err.message);
//             console.log("Unable to open serial port, exiting");
//             process.exit(1);
//         }
//     });
//     return new Promise((resolve) => {
//         resolve(port)
//     })
// }
// async function command(port: SerialPort, command: String, dataParser: DelimiterParser): Promise<Buffer> {
//     port.write(command)
//     return new Promise((resolve) => {
//         dataParser.once("data", (data: Buffer) => {
//             // console.log(data.toString())
//             resolve(data)
//         })
//     })
// }

// async function main() {
//     const internalEvents = new EventEmitter
//     const { result, path } = await FindCOM()
//     // let port = await OpenPort(path)
//     // const dataParser = port.pipe(new DelimiterParser({ delimiter: "\r", includeDelimiter: false }));
//     if (result) {
//         let port = await OpenPort(path)
//         // port.write('041007\r')//init LED
//         // port.write('041107\r')//LED ON
//         // port.write('041207\r')//LED OFF
//         let runLoop = true
//         port.on("open", async () => {
//             internalEvents.on("shutdown", () => {
//                 runLoop = false;
//             })
//         });
//         const dataParser = port.pipe(new DelimiterParser({ delimiter: "\r", includeDelimiter: false }));
//         while (runLoop) {
//             let data = await command(port, '050010\r', dataParser)
// 			if (data && Buffer.isBuffer(data) && data.subarray(0, 4).toString() === "0001" && data.length > 4)
// 			{
// 				let newdata = await command(port,"20020420\r",dataParser);
// 				console.log(newdata.toString())

// 			}
//             // console.log(tagData);
//             dataParser.removeAllListeners();
//         }
//     }
//     else {
//         console.log("Connect to scanner please")
//     }
// }
// main()
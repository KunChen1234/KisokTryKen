import { SerialPort } from "serialport";
import { DelimiterParser } from '@serialport/parser-delimiter'
import { EventEmitter } from "node:events";
interface RoobuckTag {
    MAC: string;
    SN: string;
}
async function FindCOM(): Promise<{ result: boolean, path: string }> {

    return new Promise(async (resolve) => {
        let ports = await SerialPort.list();
        let findcom = false;
        let COM = "";
        // console.log(ports)
        for (const element of ports) {
            if (element.vendorId === "09D8") {
                // console.log("find")
                findcom = true
                COM = element.path
            }
        }
        if (findcom) {
            resolve({ result: true, path: COM })
        }
        else {
            resolve({ result: false, path: "null" })
        }
    });
}

async function OpenPort(COMpath: string): Promise<any | SerialPort | null> {
    console.log(COMpath)
    const port = new SerialPort({ path: COMpath, baudRate: 9600, autoOpen: true }, (err: Error | null | undefined) => {
        if (err) {
            console.error(err.message);
            console.log("Unable to open serial port, exiting");
            process.exit(1);
        }
    });
    return new Promise((resolve) => {
        resolve(port)
    })
}
async function command(port: SerialPort, command: String, dataParser: DelimiterParser): Promise<String> {
    const dataParser1 = port.pipe(new DelimiterParser({ delimiter: "\r", includeDelimiter: false }));
    port.write(command)
    return new Promise((resolve) => {
        dataParser.once("data", (data: Buffer) => {
            // console.log(data.toString())
            resolve(data.toString())

        })
    })
}

async function main() {
    const internalEvents = new EventEmitter
    const { result, path } = await FindCOM()
    if (result) {
        let port = await OpenPort(path)
        const dataParser = port.pipe(new DelimiterParser({ delimiter: "\r", includeDelimiter: false }));
        // port.write('041007\r')//init LED
        // port.write('041107\r')//LED ON
        // port.write('041207\r')//LED OFF
        let runLoop = true
        while (runLoop) {
            //await command(port, "041107\r", dataParser);
            // port.write('041007\r')
            // port.write("041107\r");
            let data = await command(port, '050010\r', dataParser)
            if (data === "0000") {
                dataParser.removeAllListeners();
            }
            else
            {
                console.log(data);
                dataParser.removeAllListeners();
            }
            //await command(port, "041207\r", dataParser);
            // port.write("041207\r");
            console.log(data)

        }

    }
    else {
        console.log("Connect to scanner please")
    }
}
function isRoobuckTag(obj: unknown): obj is RoobuckTag {
    if (obj && typeof obj === "object") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parse = obj as Record<string, any>;
        return parse && typeof parse === "object" && !Array.isArray(parse) &&
            parse.MAC && typeof parse.MAC === "string" && parse.SN &&
            typeof parse.SN === "string";
    } else {
        return false;
    }
}

// async function scanTag(comPort: SerialPort, dataParser: DelimiterParser):Promise<{ result: boolean, tagId: string | null }> {

// }
// async function asyncRead(comPort: SerialPort, dataParser: DelimiterParser): Promise<[string, unknown]> {
// 	await command(comPort, "041007\r", dataParser);
// 	await command(comPort, "041101\r", dataParser);
// 	// eslint-disable-next-line no-constant-condition
// 	while (true) {
// 		try {
// 			const { result, tagId } = await scanTag(comPort, dataParser);
// 			if (result && tagId) {
// 				await command(comPort, "041107\r", dataParser);
// 				const data = await command(comPort, "20020420\r", dataParser); // Read data encoded in tag
// 				if (data && Buffer.isBuffer(data) && data.subarray(0, 4).toString() === "0001" && data.length > 4) {
// 					const converted = Buffer.from(data.toString(), "hex");
// 					const start = converted.toString().indexOf("{");
// 					const end = converted.toString().lastIndexOf("}");
// 					const strCon = converted.subarray(start, end + 1).toString("utf8").replace(/\0/g, "");
// 					try {
// 						return [tagId, JSON.parse(strCon)];
// 					} catch (err) {
// 						await command(comPort, "0407646006E3000400\r", dataParser); // Short high Beep
// 						await command(comPort, "0407646004F401F401\r", dataParser); // long low Beep
// 						await command(comPort, "041207\r", dataParser);
// 						console.error(err);
// 					}
// 				} else {
// 					await command(comPort, "0407646006E3000400\r", dataParser); // Short high Beep
// 					await command(comPort, "0407646004F401F401\r", dataParser); // long low Beep
// 					await command(comPort, "041207\r", dataParser);
// 					console.log("Failed to Read Tag data");
// 				}
// 			}
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	}
// }




main()

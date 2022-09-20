import { SerialPort } from "serialport";
import { DelimiterParser } from '@serialport/parser-delimiter'


async function checkCOM(): Promise<string> {
    return SerialPort.list().then((ports: any) => {
        for (const element of ports) {
            if (element.vendorId === "09D8") {
                // console.log("find");
                let COM = element.path;
                return COM;
            }
        }
    });
}
async function getCOM(): Promise<String> {
    let data: String
    try {
        const value: string = await checkCOM()
        // console.log(value)
        data = await Scan(value)
        console.log(data)
    }
    catch (err) {
        console.log(err)
    }
    return new Promise((resolve) => {
        resolve(data)
    })
}

async function Scan(a: string): Promise<String> {
    // a='COM3'
    // console.log("get Path:" + a)
    const port = new SerialPort({ path: a, baudRate: 9600, autoOpen: true }, (err: Error | null | undefined) => {
        if (err) {
            console.error(err.message);
            console.log("Unable to open serial port, exiting");
            process.exit(1);
        }
    });
    const dataParser = port.pipe(new DelimiterParser({ delimiter: "\r", includeDelimiter: false }));
    port.write("050010\r")
    return new Promise((resolve) => {
        dataParser.on("data", (data: Buffer) => {
            console.log(data.toString())
            resolve(data.toString())
        })
    })
}

async function main() {
    while (true) {
        try {
            let a: String = await getCOM()
            console.log(a)
        }
        catch (err) {
            console.log(err)
        }
    }
}

main()

// async function main() {
//     try {
//         const a: String = await Open('COM3')
//         console.log(a)
//     }
//     catch (err) {
//         console.log(err)
//     }
// }






import FindById from"./databaseTest"

async function main() {
    const a=await FindById()
    console.log("a:",a)
}
main()
import { PrismaClient } from '@prisma/client'
import { Decipher } from 'crypto'
import { resolve } from 'path'
import { send } from 'process'

const prisma = new PrismaClient()

async function FindById():Promise<any>{
  const users = await prisma.user.findMany()
  // console.log(users)
  return new Promise((resolve)=>
  {
    resolve (users)
  })
}


async function sendData(data:any):Promise<any> {
  return new Promise((resolve)=>
  {
    resolve(data)
  })
}
export default FindById;
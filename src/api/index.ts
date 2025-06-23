/// <reference types="@cloudflare/workers-types" />

import { env } from "cloudflare:workers";
import { Hono } from "hono";

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}
const app = new Hono<{Bindings: Bindings}>()

app.get('/api/task', async (c) =>{
  let {results} = await c.env.DB.prepare("SELECT * FROM task").all()
  return c.json(results)
})

   app.post('/api/task', async(c) =>{
    const newId = crypto.randomUUID()
    const input = await c.req.json<any>()
    const query = 'INSERT INTO task(id.name,description,deadline) values("${newId}","${input.name}","${input.description}","${input.deadline}"'
    const newtask = await c.env.DB.exec(query)
    return c.json(newtask)
   }) 
   export default app


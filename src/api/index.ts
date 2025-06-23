/// <reference types="@cloudflare/workers-types" />

import { env } from "cloudflare:workers";
import { Hono } from "hono";

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}
const app = new Hono<{Bindings: Bindings}>()

app.get('/api/task', async (c) =>{
  let {results} = await c.env.DB.prepare('SELECT * FROM task').all()
  return c.json(results)
})

   app.post('/api/task', async(c) =>{
    const newId = crypto.randomUUID()
    const input = await c.req.json<any>()
    const query = 'INSERT INTO task(id.name,description,deadline) values("${newId}","${input.name}","${input.description}","${input.deadline}"'
    const newtask = await c.env.DB.exec(query)
    return c.json(newtask)
   }) 
   app.get('/api/task', async (c) =>{
    const taskId = c.req.param('id')
  let {results} = await c.env.DB.prepare('SELECT * FROM task WHERE id = ?').bind(taskId).all()
  return c.json(results[0])
})

app.put('/api/task/:id', async (c) =>{
  const taskId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = 'UPDATE task SET name = "$(input.name0", description = "${input.description}", deadline = ${input.deadline} WHERE id = "${taskId}"'
  const task = await c.env.DB.exec(query)

  return c.json(task)
})

app.delete('/api/task/:id', async (c) =>{
  const taskId = c.req.param('id')

  const query = 'DELETE FROM task WHERE id = "${taskId}"'
  const task = await c.env.DB.exec(query)

  return c.json(task)
})

   export default app


/// <reference types="@cloudflare/workers-types" />

import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
  ASSETS: Fetcher
}

const app = new Hono<{Bindings: Bindings}>()

//get all tasks
app.get('/api/tasks', async (c) =>{
  let {results} = await c.env.DB.prepare('SELECT * FROM task').all()
  return c.json(results)
})

  //Get task by ID 
   app.get('/api/tasks/:id', async (c) =>{
    const taskId = c.req.param('id')
  let {results} = await c.env.DB.prepare('SELECT * FROM task WHERE id = ?').bind(taskId).all()
  return c.json(results[0])
})
app.post('/api/tasks', async(c) =>{
    const newId = crypto.randomUUID()
    const input = await c.req.json<any>()
    const query = 'INSERT INTO tasks(id, Nama, keterangan, deadline) values (?, ?, ?, ?)'
    const newTask = await c.env.DB.exec(query)
    return c.json(newTask)
   }) 

app.put('/api/tasks/:id', async (c) =>{
  const taskId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = 'UPDATE task SET Nama = "${input.Nama}", keterangan = "${input.keterangan }", deadline = ${input.deadline} WHERE id = "${taskId}"'
  const task = await c.env.DB.exec(query)

  return c.json(task)
})

app.delete('/api/tasks/:id', async (c) =>{
  const taskId = c.req.param('id')

  const query = 'DELETE FROM task WHERE id = "${taskId}"'
  const task = await c.env.DB.exec(query)

  return c.json(task)
})

app.get('*', (c) => c.env.ASSETS.fetch(c.req.raw))

   export default app


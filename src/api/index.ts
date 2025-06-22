/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/task")) {
      if (request.method == 'GET') {
        const { results } = await env.DB.prepare("SELECT * FROM task").all();
        return Response.json(results);
      }
       else if (request.method == 'POST') {
        const newId = crypto.randomUUID();
        const input = await request.json<any>();
       const query = 'INSERT INTO task(id,name,description,deasline) values ("${newId}","${input.name}","${input.description}","${input.deadline}")';
        const newTask = await env.DB.exec(query);
        return Response.json(newTask);
      }
    }
    return env.ASSETS.fetch(request);
  }
};

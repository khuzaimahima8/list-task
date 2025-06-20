export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if(url.pathname.startsWith("/api/task")){
      let {result} = await env.DB.prepare("SELECT * FROM task").all();
      return Response.json(result);
    }
    return env.ASSETS.fetch(request);
  },
}
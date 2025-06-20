export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if(url.pathname.startsWith("/api/task")){
      return new Response.json([
        {
            id: '1',
            name: "task 1",
            description: "match",
            deadline: 1741247092,
      },
      {
            id: '2',
            name: "task 2",
            description: "english",
            deadline: 1741247092,
      },
      {
            id: '3',
            name: "task 3",
            description: "kimia",
            deadline: 1741247092,
      },
      {
             id: '4',
            name: "task 4",
            description: "biologi",
            deadline: 1741247092,
      },
      
        ]);  
    }
    return env.ASSETS.fetch(request);
  },
}
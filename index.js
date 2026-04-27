export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // API to get all posts
    if (url.pathname === "/api/posts" && request.method === "GET") {
      const { results } = await env.DB.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
      return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
    }

    // API to create a post
    if (url.pathname === "/api/posts" && request.method === "POST") {
      const { title, content } = await request.json();
      await env.DB.prepare("INSERT INTO posts (title, content) VALUES (?, ?)").bind(title, content).run();
      return new Response("Post Published!", { headers: { "Access-Control-Allow-Origin": "*" } });
    }

    return new Response("Not Found", { status: 404 });
  }
};

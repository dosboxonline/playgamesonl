export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = url.search.substring(1);

  if (!targetUrl) {
    return new Response("No URL provided", { status: 400 });
  }

  const resp = await fetch(targetUrl, {
    headers: context.request.headers
  });

  const headers = new Headers(resp.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "*");

  return new Response(resp.body, {
    status: resp.status,
    headers
  });
}

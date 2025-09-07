export async function onRequest(context) {
  const url = new URL(context.request.url);

  // context.params.proxy содержит то, что идёт после /cors/
  // но нам нужно именно query "?https://..."
  const targetUrl = url.search.substring(1);

  if (!targetUrl) {
    return new Response("No URL provided", { status: 400 });
  }

  const response = await fetch(targetUrl);

  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders
  });
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Берём всё после "?" как оригинальный URL
  const targetUrl = url.search.substring(1);

  if (!targetUrl) {
    return new Response("No URL provided", { status: 400 });
  }

  const response = await fetch(targetUrl, {
    headers: context.request.headers
  });

  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders
  });
}
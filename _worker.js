export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Pass through requests for real static assets (files with extensions)
    // e.g. /src/logo.webp, /_redirects, etc.
    if (pathname.includes('.')) {
      return env.ASSETS.fetch(request);
    }

    // For the root path, serve index.html directly
    if (pathname === '/') {
      return env.ASSETS.fetch(request);
    }

    // For any clean path like /teamname, rewrite to index.html
    // The browser URL stays as /teamname — your JS reads it via window.location.pathname
    const rewrittenUrl = new URL(request.url);
    rewrittenUrl.pathname = '/index.html';
    return env.ASSETS.fetch(new Request(rewrittenUrl.toString(), request));
  },
};

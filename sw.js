const CACHE_NAME='gicheha-images-v1';
self.addEventListener('install',event=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  const isImage=req.destination==='image' || /\.(?:jpg|jpeg|png|webp|avif)(?:\?|$)/i.test(url.pathname);
  if(!isImage) return;
  event.respondWith(caches.open(CACHE_NAME).then(async cache=>{
    const cached=await cache.match(req);
    if(cached) return cached;
    try{
      const response=await fetch(req);
      if(response.ok || response.type==='opaque') cache.put(req,response.clone());
      return response;
    }catch(error){
      return new Response('',{status:503,statusText:'Image unavailable'});
    }
  }));
});

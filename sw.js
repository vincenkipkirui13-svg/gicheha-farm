const CACHE_NAME='gicheha-images-v4';
const IMAGE_URLS=[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Livestock_at_the_grazing_area.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Dorper%20sheep%20%28Belagro-2021%29.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Jersey%20cattle.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Boer%20Goat%20%2850374051253%29.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/EB1911_Sheep_-_Hampshire_Down_Ram.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Sahiwal%20Cattle%20in%20Kenya.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/A%20herd%20of%20goats.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Girolando.jpg?width=800",
  "https://www.kenyanews.go.ke/wp-content/uploads/2022/11/SEEDS-1200x630.jpg?width=800",
  "https://www.delamarefarm.co.ke/assets/farm-supplies-ZJyENUks.jpg"
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache=>{
        await Promise.allSettled(IMAGE_URLS.map(async url=>{
          try{
            const response=await fetch(url,{mode:'no-cors',cache:'no-cache'});
            if(response.ok || response.type==='opaque') await cache.put(url,response.clone());
          }catch(error){}
        }));
        return cache;
      })
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  const isImage=req.destination==='image' || /\.(?:jpg|jpeg|png|webp|avif)(?:\?|$)/i.test(url.pathname);
  if(!isImage) return;
  event.respondWith(
    caches.open(CACHE_NAME).then(async cache=>{
      const cached=await cache.match(req);
      if(cached) return cached;
      try{
        const response=await fetch(req,{cache:'no-cache'});
        if(response.ok || response.type==='opaque') await cache.put(req,response.clone());
        return response;
      }catch(error){
        return new Response('',{status:503,statusText:'Image unavailable'});
      }
    })
  );
});

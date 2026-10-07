const CACHE_NAME='gicheha-images-v9';
const IMAGE_URLS=[
  "https://qcat.wocat.net/media/bd/9/bd942f70-b729-4925-9bcd-884af297c842.jpg",
  "https://cdn.shopify.com/s/files/1/0509/2871/3882/files/merinos_480x480.jpg?v=1634916864",
  "https://image.chitra.live/api/v1/wps/57f0425/97a4b250-614e-43b0-87e2-064ab1f79ad3/0/Matt-Smith-DSC08845-720x480.jpg",
  "https://rastafarm.co.ke/images/gallabuck.jpg",
  "https://mountainduckeggs.com/cdn/shop/articles/IMG_8716.jpg?v=1756866909&width=1200",
  "https://farmow.com/article-image/1600847811.jpg",
  "https://i0.wp.com/gazettelacaune.fr/wp-content/uploads/2018/04/brebis_lacaune.jpg?fit=2048%2C1365&ssl=1",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Potatoe%20seeds.jpg?width=1400"
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
  const isImage=req.destination==='image' || /\\.(?:jpg|jpeg|png|webp|avif)(?:\\?|$)/i.test(url.pathname);
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

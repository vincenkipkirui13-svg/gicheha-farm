const CACHE_NAME='gicheha-images-v7';
const IMAGE_URLS=[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lacaune%20sheep%20%28Belagro-2021%29.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Holstein%20Friesian%20UK%20Yorkshire%20July%202011.jpg?width=1600",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Holstein%20Friesian%20UK%20Yorkshire%20July%202011.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Young%20Ayrshire%20cow%20%2852181577014%29.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Guernsey%20Dairy%20Cow.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Brown%20Swiss%20cows%20on%20Simplonpass%2001.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Jersey%20cattle.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Sahiwal%20Cattle%20in%20Kenya.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Boran%20bull%20at%20kasarani.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Bezerros%20Girolando%20Pastando.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Brahman%20cattle%20in%20Costa%20Rica.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Gir%20cattle.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Dorper%20Sheep%20Breed%20Antigua%209187.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Hampshire%20Down%20sheep%20J5.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Merino%20sheep.%20%2852908265984%29.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Romney%20sheep%20on%20Romney%20Marsh%20-%20geograph.org.uk%20-%205571120.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Boer%20goat.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Galla%20goat%20at%20kasarani.jpg?width=1000",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Alpine%20Goat.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Toggenburger%20Goat.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Saanen%20goat-04282.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Kalahari%20Red%20Goat%2C%20April%202023.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Potato%20tubers.jpg?width=1400"
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

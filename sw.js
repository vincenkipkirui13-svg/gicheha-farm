const CACHE_NAME='gicheha-images-v5';
const IMAGE_URLS=[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Friesian%20cow.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/AyrshireCattle1.JPG?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Guernsey%20cattle.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Brown%20swiss.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Jersey%20cattle.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Sahiwal%20Cattle%20in%20Kenya.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Boran%20cattle%20in%20Kenya.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Girolando.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Dorper%20sheep%20%28Belagro-2021%29.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Hampshire%20Down%20Sheep.JPG?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Merino%20Sheep.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Romney%20sheep%20and%20lamb%20-%20geograph.org.uk%20-%206164208.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Boer%20Goat%20%2850374051253%29.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Galla%20goat%20at%20kasarani.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Alpine%20Goat.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Toggenburg%20goat.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lucerne%20%284656862796%29.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Alfalfa%20field%20-%20geograph.org.uk%20-%204092964.jpg?width=800",
  "https://www.kenyanews.go.ke/wp-content/uploads/2022/11/SEEDS-1200x630.jpg?width=800",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Livestock_at_the_grazing_area.jpg?width=1280"
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

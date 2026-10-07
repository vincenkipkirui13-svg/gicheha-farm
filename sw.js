const CACHE_NAME='gicheha-images-v10';
const IMAGE_URLS=[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Holstein%20Friesian%20UK%20Yorkshire%20July%202011.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Young%20Ayrshire%20cow%20%2852181577014%29.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Guernsey%20Dairy%20Cow.jpg?width=1200",
  "https://www.realcaliforniamilk.jp/themes/cmab/assets/awsimages/brown_swiss.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Jersey%20cattle.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20Sahiwal%20Bull.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Boran%20bull%20at%20kasarani.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Bezerros%20Girolando%20Pastando.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Dorper%20Sheep%20Breed%20Antigua%209187.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Hampshire%20Down%20sheep%20J5.jpg?width=1200",
  "https://cdn.shopify.com/s/files/1/0509/2871/3882/files/merinos_480x480.jpg?v=1634916864",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Romney%20Marsh%20Sheep%20-%20geograph.org.uk%20-%203250278.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Boer%20goat.jpg?width=1200",
  "https://rastafarm.co.ke/images/gallabuck.jpg",
  "https://mountainduckeggs.com/cdn/shop/articles/IMG_8716.jpg?v=1756866909&width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Toggenburger%20Goat.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Brahman%20cattle%20in%20Costa%20Rica.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Gir%20cattle.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Saanen%20goat-04282.jpg?width=1200",
  "https://boerboksa.co.za/images/Gallery/Kalahari%20Red/Big/Kalahari06.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Brebis%20lacaune.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Potatoe%20seeds.jpg?width=1400"
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache=>{
      await Promise.allSettled(IMAGE_URLS.map(async url=>{
        try{
          const response=await fetch(url,{mode:'no-cors',cache:'no-cache'});
          if(response.ok || response.type==='opaque') await cache.put(url,response.clone());
        }catch(error){}
      }));
      return self.skipWaiting();
    })
  );
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  const isImage=req.destination==='image' || /\\.(?:jpg|jpeg|png|webp|avif)(?:\\?|$)/i.test(url.pathname);
  if(!isImage) return;
  event.respondWith(caches.open(CACHE_NAME).then(async cache=>{
    const cached=await cache.match(req);
    if(cached) return cached;
    try{
      const response=await fetch(req,{cache:'no-cache'});
      if(response.ok || response.type==='opaque') await cache.put(req,response.clone());
      return response;
    }catch(error){return new Response('',{status:503,statusText:'Image unavailable'});}
  }));
});
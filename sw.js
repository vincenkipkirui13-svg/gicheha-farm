const CACHE_NAME='gicheha-images-v12';
const IMAGE_URLS=[
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/cattle/friesian-holstein/friesian-holstein-02.jfif",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/cattle/ayrshire/ayrshire-01.jfif",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/cattle/guernsey/guernsey-01.jfif",
  "https://www.realcaliforniamilk.jp/themes/cmab/assets/awsimages/brown_swiss.jpg",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/cattle/jersey/jersey-01.jfif",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/cattle/sahiwal/sahiwal-01.jfif",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/cattle/boran/boran-01.jfif",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/cattle/girolando/girolando-01.jfif",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/sheep/dorper/dorper-01.jfif",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/sheep/hampshire/hampshire-01.jfif",
  "https://cdn.shopify.com/s/files/1/0509/2871/3882/files/merinos_480x480.jpg?v=1634916864",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Romney%20Marsh%20Sheep%20-%20geograph.org.uk%20-%203250278.jpg?width=1200",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/goats/boer/boer-01.jfif",
  "https://rastafarm.co.ke/images/gallabuck.jpg",
  "https://mountainduckeggs.com/cdn/shop/articles/IMG_8716.jpg?v=1756866909&width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Toggenburger%20Goat.jpg?width=1200",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/cattle/brahman/brahman-01.jfif",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/other-cattle/gir/gir-01.jfif",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Saanen%20goat-04282.jpg?width=1200",
  "https://raw.githubusercontent.com/vincenkipkirui13-svg/delamere-farm/main/public/animal-photos/goats/kalahari-red/kalahari-red-01.jfif",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Brebis%20lacaune.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Potatoe%20seeds.jpg?width=1400"
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(async cache=>{await Promise.allSettled(IMAGE_URLS.map(async url=>{try{const response=await fetch(url,{mode:'no-cors',cache:'no-cache'});if(response.ok||response.type==='opaque')await cache.put(url,response.clone())}catch(error){}}));return self.skipWaiting()}))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);const isImage=req.destination==='image'||/\\.(?:jpg|jpeg|png|webp|avif|jfif)(?:\\?|$)/i.test(url.pathname);if(!isImage)return;event.respondWith(caches.open(CACHE_NAME).then(async cache=>{const cached=await cache.match(req);if(cached)return cached;try{const response=await fetch(req,{cache:'no-cache'});if(response.ok||response.type==='opaque')await cache.put(req,response.clone());return response}catch(error){return new Response('',{status:503,statusText:'Image unavailable'})}}))});
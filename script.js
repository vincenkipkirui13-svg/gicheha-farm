const DEFAULT_SETTINGS={"name":"Gicheha Farm","phone":"0786113644","whatsapp":"254786113644","heroTitle":"Quality You Can Trust","heroText":"Gicheha Farm is your trusted source for premium Kalro products, well-bred healthy livestock, and quality farm supplies in Naivasha, Kenya.","aboutTitle":"About Gicheha Farm","aboutText":"Gicheha Farm connects livestock buyers with trusted breeders offering healthy and premium-quality farm animals. Our mission is to simplify livestock trading while maintaining quality, transparency, and reliability."};
const DEFAULT_LIVESTOCK=[{"id":"lactating-cows","name":"Lactating Cows","category":"Cattle","price":"KSh 120,000 – 200,000","description":"Upgrade your herd with high-quality genetics. Producing 21–44L/day."},{"id":"ayrshire-cows","name":"Ayrshire Cows","category":"Cattle","price":"KSh 30,000 – 150,000","description":"Ayrshire dairy cattle available for your farm."},{"id":"jersey-cows","name":"Jersey Cows","category":"Cattle","price":"Contact for price","description":"High butter fat milk production breed."},{"id":"boran-sahiwal","name":"Boran & Sahiwal","category":"Cattle","price":"From KSh 25,000","description":"Beef cattle breeds available."},{"id":"girolando","name":"Girolando","category":"Cattle","price":"KSh 20,000 – 250,000","description":"High milk production cows."},{"id":"boer-goat","name":"Boer Goat","category":"Goats","price":"KSh 15,000 – 30,000","description":"Kids to mature goats available."},{"id":"kalro-goats","name":"Gicheha Goats","category":"Goats","price":"KSh 6,000 – 15,000","description":"Milk production goats available."},{"id":"kalahari-red-goat","name":"Kalahari Red Goat","category":"Goats","price":"KSh 7,000 – 18,000","description":"Hardy meat goats known for adapting well to hot, dry conditions."},{"id":"dorper-sheep","name":"Dorper Sheep","category":"Sheep","price":"KSh 5,500 – 25,000","description":"Healthy breeding stock available."},{"id":"hampshire-sheep","name":"Hampshire Sheep","category":"Sheep","price":"KSh 26,000 – 48,000","description":"4–12 months available."}];
const FEED_TABLE_IDS=new Set(["dairy-meal-50kg","dairy-meal-70kg","layers-mash","growers-mash","chick-mash","fish-feed-50kg","dog-meal-20kg","organic-fertilizer","hybrid-maize-seeds","napier-grass-seeds"]);
const DEFAULT_PRODUCTS=[{"id":"turkey","name":"Turkey","category":"Poultry","price":"KSh 3,000","description":"A great choice for poultry keepers and farmers looking to raise turkeys."},{"id":"goose","name":"Goose","category":"Poultry","price":"KSh 2,350","description":"Healthy geese for your farm or poultry project. Contact us for availability."},{"id":"pigs","name":"Pigs","category":"Other","price":"KSh 7,500 – 30,000","description":"Pigs for farmers planning to start or grow a livestock project."},{"id":"day-old-chicks","name":"Day-old Chicks","category":"Poultry","price":"KSh 70","description":"Start your poultry flock with day-old chicks. Ask us about availability."},{"id":"seedlings","name":"Seedlings","category":"Seeds & fertilizer","price":"KSh 5 – 50","description":"Seedlings to help you get your planting season underway. Ask about available varieties."},{"id":"duck","name":"Duck","category":"Poultry","price":"KSh 1,500","description":"Ducks for small-scale or commercial poultry keeping."},{"id":"fish-fingerlings","name":"Fish Fingerlings (Samaki)","category":"Fish","price":"Inquire on WhatsApp","description":"Fish fingerlings for stocking your fish pond. Price depends on your requirements."},{"id":"eggs","name":"Eggs (Mayai)","category":"Poultry","price":"KSh 380","description":"Eggs available in different quantities. Contact us to confirm your order."},{"id":"rabbit","name":"Rabbit","category":"Other","price":"KSh 300 – 3,500","description":"Rabbits for farmers and anyone interested in rabbit keeping."},{"id":"peacock","name":"Peacock","category":"Poultry","price":"KSh 1,500 – 20,000","description":"Ornamental peafowl available on request. Message us for current pricing and availability."},{"id":"guinea-fowl","name":"Guinea Fowl","category":"Poultry","price":"KSh 140 – 3,800","description":"Guinea fowl for your poultry farm. Contact us for current prices and availability."},{"id":"animal-feed-hay","name":"Animal Feed & Hay","category":"Feeds","price":"From KSh 8 – 400","description":"Lucerne, Rhodes, Silage available."},{"id":"potato-seeds","name":"KALRO Certified Potato Seeds","category":"Seeds & fertilizer","price":"90kg C1 KSh 3,700 • 90kg C2 KSh 3,000 • 50kg C1 KSh 2,700 • 50kg C2 KSh 2,150","description":"High-quality certified potato seeds for commercial farming. KEPHIS certified, high germination, disease resistant. Varieties: Super Shangi, Dutch, Unica, Sheherekea, Stephens, Markies, Millioner. Delivery available countrywide."},{"id":"dairy-meal-50kg","name":"Dairy Meal 50kg","category":"Feeds","price":"KSh 3,200","description":"Quality animal feed. Confirm current availability."},{"id":"dairy-meal-70kg","name":"Dairy Meal 70kg","category":"Feeds","price":"KSh 4,200","description":"Quality animal feed. Confirm current availability."},{"id":"layers-mash","name":"Layers Mash","category":"Feeds","price":"KSh 3,600","description":"Quality poultry feed. Confirm current availability."},{"id":"growers-mash","name":"Growers Mash","category":"Feeds","price":"KSh 3,400","description":"Quality poultry feed. Confirm current availability."},{"id":"chick-mash","name":"Chick Mash","category":"Feeds","price":"KSh 3,800","description":"Quality poultry feed. Confirm current availability."},{"id":"fish-feed-50kg","name":"Fish Feed 50kg","category":"Feeds","price":"KSh 4,500","description":"Quality fish feed. Confirm current availability."},{"id":"dog-meal-20kg","name":"Dog Meal 20kg","category":"Feeds","price":"KSh 2,500","description":"Quality dog meal. Confirm current availability."},{"id":"organic-fertilizer","name":"Organic Fertilizer","category":"Seeds & fertilizer","price":"KSh 2,000","description":"Quality organic fertilizer. Confirm current availability."},{"id":"hybrid-maize-seeds","name":"Hybrid Maize Seeds","category":"Seeds & fertilizer","price":"KSh 1,800","description":"Hybrid maize seeds. Confirm variety and packet size."},{"id":"napier-grass-seeds","name":"Napier Grass Seeds","category":"Seeds & fertilizer","price":"KSh 1,200","description":"Napier grass seeds. Confirm packet size."}];

let siteData={settings:DEFAULT_SETTINGS,livestock:DEFAULT_LIVESTOCK,products:DEFAULT_PRODUCTS,photos:{}};
const PHOTO_GROUPS={
 "animal-feed-hay":"Animal Feeds & Hay",
 "seedlings":"Seeds & Fertilizer","potato-seeds":"Seeds & Fertilizer","organic-fertilizer":"Seeds & Fertilizer","hybrid-maize-seeds":"Seeds & Fertilizer","napier-grass-seeds":"Seeds & Fertilizer",
 "dairy-meal-50kg":"Animal Feeds & Hay","dairy-meal-70kg":"Animal Feeds & Hay","layers-mash":"Animal Feeds & Hay","growers-mash":"Animal Feeds & Hay","chick-mash":"Animal Feeds & Hay","fish-feed-50kg":"Animal Feeds & Hay","dog-meal-20kg":"Animal Feeds & Hay",
 "lactating-cows":"Lactating Cows","ayrshire-cows":"Ayrshire Cows","jersey-cows":"Jersey Cows",
 "boran-sahiwal":"Boran & Sahiwal Cattle","girolando":"Girolando Cattle",
 "boer-goat":"Boer Goats","kalro-goats":"Kalro Goats","kalahari-red-goat":"Kalahari Red Goats",
 "dorper-sheep":"Dorper Sheep","hampshire-sheep":"Hampshire Sheep",
 "turkey":"Turkey","goose":"Goose","pigs":"Pigs","day-old-chicks":"Day-old Chicks",
 "duck":"Duck","fish-fingerlings":"Fish Fingerlings","eggs":"Eggs",
 "rabbit":"Rabbit","peacock":"Peacock","guinea-fowl":"Guinea Fowl"
};
function digits(value){return String(value||"").replace(/\D/g,"")}
function waNumber(){let number=digits(siteData.settings.whatsapp);if(number.startsWith("0"))number="254"+number.slice(1);return number}
function waLink(message){return "https://wa.me/"+waNumber()+"?text="+encodeURIComponent(message)}
function photoGroup(item){return PHOTO_GROUPS[item.id]||item.name}
function createPhotoBox(item){
 const box=document.createElement("div");box.className="card-photo empty-photo";
 const urls=Array.isArray(siteData.photos[photoGroup(item)])?siteData.photos[photoGroup(item)].filter(Boolean).slice(0,5):[];
 if(!urls.length){const span=document.createElement("span");span.textContent="ADD PHOTO IN ADMIN";box.append(span);return box}
 box.classList.remove("empty-photo");
 const frame=document.createElement("div");frame.className="card-main-photo-frame";
 const main=document.createElement("img");main.className="card-main-photo";main.src=urls[0];main.alt=item.name+" photograph";main.loading="lazy";main.decoding="async";frame.append(main);box.append(frame);
 if(urls.length>1){
  const thumbs=document.createElement("div");thumbs.className="card-photo-thumbs";
  urls.slice(1).forEach((url,index)=>{const button=document.createElement("button");button.type="button";button.className="card-photo-thumb";button.setAttribute("aria-label","Show "+item.name+" photo "+(index+2));const image=document.createElement("img");image.src=url;image.alt="";image.loading="lazy";button.append(image);button.onclick=()=>{main.src=url;thumbs.querySelectorAll("button").forEach(b=>b.classList.remove("active"));button.classList.add("active")};thumbs.append(button)});
  box.append(thumbs);
 }
 return box;
}
function createCard(item){
 const card=document.createElement("article");card.className="product-card";card.append(createPhotoBox(item));
 const body=document.createElement("div");body.className="card-body";
 const category=document.createElement("span");category.className="product-category";category.textContent=item.category;
 const title=document.createElement("h3");title.textContent=item.name;
 const description=document.createElement("p");description.textContent=item.description;
 const price=document.createElement("div");price.className="product-price";price.textContent=item.price;
 const link=document.createElement("a");link.className="btn btn-primary";link.href=waLink("Hello Gicheha Farm, I am interested in "+item.name+". Please share availability and details.");link.target="_blank";link.rel="noopener";link.textContent="Enquire on WhatsApp";
 body.append(category,title,description,price,link);card.append(body);return card;
}
function renderCatalog(){
 const livestockGrid=document.getElementById("livestockGrid"),productsGrid=document.getElementById("farmProductsGrid");
 if(livestockGrid){
  livestockGrid.replaceChildren();DEFAULT_LIVESTOCK.forEach(item=>livestockGrid.append(createCard(item)));
  const filters=document.getElementById("livestockFilters");
  if(filters)filters.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
   filters.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===button));
   const selected=button.dataset.filter;
   [...livestockGrid.children].forEach((card,index)=>{card.hidden=selected!=="All"&&DEFAULT_LIVESTOCK[index].category!==selected});
  }));
 }
 if(productsGrid){productsGrid.replaceChildren();DEFAULT_PRODUCTS.filter(item=>!FEED_TABLE_IDS.has(item.id)).forEach(item=>productsGrid.append(createCard(item)))}
}
function renderSectionPhoto(target,group,label){
 if(!target)return;
 const urls=Array.isArray(siteData.photos[group])?siteData.photos[group].filter(Boolean).slice(0,5):[];
 target.replaceChildren();
 if(!urls.length){target.classList.add("empty-photo");const span=document.createElement("span");span.textContent=label;target.append(span);return}
 target.classList.remove("empty-photo");
 const frame=document.createElement("div");frame.className="card-main-photo-frame";
 const main=document.createElement("img");main.className="card-main-photo";main.src=urls[0];main.alt=group+" photo";main.loading="lazy";main.decoding="async";frame.append(main);target.append(frame);
 if(urls.length>1){const thumbs=document.createElement("div");thumbs.className="card-photo-thumbs";urls.slice(1).forEach((url,index)=>{const button=document.createElement("button");button.type="button";button.className="card-photo-thumb";button.setAttribute("aria-label","Show "+group+" photo "+(index+2));const img=document.createElement("img");img.src=url;img.alt="";img.loading="lazy";button.append(img);button.onclick=()=>{main.src=url;thumbs.querySelectorAll("button").forEach(b=>b.classList.remove("active"));button.classList.add("active")};thumbs.append(button)});target.append(thumbs)}
}
function renderManagedPhotos(){
 const hero=document.getElementById("home"),heroUrl=(siteData.photos["Hero Background"]||[])[0];
 if(hero){if(heroUrl){hero.style.backgroundImage='url("'+heroUrl.replace(/"/g,"%22")+'")';hero.classList.remove("hero-background-empty")}else{hero.style.backgroundImage="";hero.classList.add("hero-background-empty")}}
 renderSectionPhoto(document.getElementById("animalFeedsPhoto"),"Animal Feeds & Hay","ADD ANIMAL FEEDS PHOTO IN ADMIN");
 renderSectionPhoto(document.getElementById("seedsFertilizerPhoto"),"Seeds & Fertilizer","ADD SEEDS & FERTILIZER PHOTO IN ADMIN");
 renderSectionPhoto(document.querySelector(".about-gallery .about-main"),"About Gicheha Farm","ADD YOUR ABOUT PHOTO IN ADMIN");
}
function applySettings(){
 const s=siteData.settings;const set=(id,value)=>{const element=document.getElementById(id);if(element)element.textContent=value};
 ["brandName","footerName","copyrightName"].forEach(id=>set(id,s.name));
 set("heroTitle",s.heroTitle);set("heroText",s.heroText);set("aboutTitle",s.aboutTitle);set("aboutText",s.aboutText);
 const phone=s.phone||"0786113644";
 ["callHero","contactPhone"].forEach(id=>{const element=document.getElementById(id);if(element){element.href="tel:"+digits(phone);if(id==="callHero")element.innerHTML='Call Now: <span data-phone></span>';else element.textContent=phone}});
 document.querySelectorAll("[data-phone]").forEach(element=>element.textContent=phone);
 const inquiry=waLink("Hello Gicheha Farm, I would like to make an inquiry.");
 ["waHero","contactWhatsApp","floatingWhatsApp","feedInquiry"].forEach(id=>{const element=document.getElementById(id);if(element)element.href=inquiry});
 const contact=document.getElementById("contactWhatsApp");if(contact)contact.textContent="WhatsApp Order ↗";
 document.title=s.name+" | Quality You Can Trust";
 const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
}
function initMenu(){const toggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");if(toggle&&nav){toggle.onclick=()=>nav.classList.toggle("open");nav.querySelectorAll("a").forEach(link=>link.onclick=()=>nav.classList.remove("open"))}}
async function init(){
 try{const response=await fetch("/api/photos",{cache:"no-store"});if(response.ok){const data=await response.json();siteData.photos=data.photos||{}}}catch(error){console.warn("Using empty photo placeholders while the gallery service is unavailable.",error)}
 applySettings();renderCatalog();renderManagedPhotos();initMenu();
}
init();

/* Keep the Gicheha Farm inquiry form and administrator-controlled contact numbers. */
const inquiryForm=document.getElementById("inquiry");
if(inquiryForm){inquiryForm.addEventListener("submit",event=>{
 event.preventDefault();
 const name=document.getElementById("name").value.trim(),phone=document.getElementById("phone").value.trim(),location=document.getElementById("location").value.trim(),goods=document.getElementById("goods").value,details=document.getElementById("details").value.trim();
 const message=encodeURIComponent("Hello Gicheha Farm.\nFull name: "+name+"\nPhone: "+phone+"\nLocation: "+location+"\nType of goods/livestock: "+goods+"\nAdditional details: "+(details||"None"));
 let wa=digitsOnly(farmContactSettings.whatsappNumber);if(wa.startsWith("0"))wa="254"+wa.slice(1);window.open("https://wa.me/"+wa+"?text="+message,"_blank","noopener");
})}
let farmContactSettings={callNumber:"0786113644",whatsappNumber:"254786113644"};
function digitsOnly(value){return String(value||"").replace(/[^0-9]/g,"")}
function phoneForDisplay(value){const n=digitsOnly(value);if(n.length===10&&n.startsWith("0"))return n.slice(0,4)+" "+n.slice(4,7)+" "+n.slice(7);if(n.length===12&&n.startsWith("254"))return "+254 "+n.slice(3,6)+" "+n.slice(6,9)+" "+n.slice(9);return value}
function applyFarmContactSettings(settings){
 farmContactSettings={...farmContactSettings,...settings};
 const rawCall=String(farmContactSettings.callNumber).trim(),callHref=(rawCall.startsWith("+")?"+":"")+digitsOnly(rawCall);
 let waDigits=digitsOnly(farmContactSettings.whatsappNumber);if(waDigits.startsWith("0"))waDigits="254"+waDigits.slice(1);
 document.querySelectorAll('a[href^="tel:"]').forEach(a=>{a.href="tel:"+callHref});
 document.querySelectorAll('a[href*="wa.me/"]').forEach(a=>{const u=new URL(a.href,window.location.href);u.pathname="/"+waDigits;a.href=u.href});
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nodes=[];
 while(walker.nextNode()){const n=walker.currentNode;if(!n.parentElement||/^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.parentElement.tagName))continue;if(n.parentElement.closest('a[href^="tel:"]')||/0786\s?113\s?644|254786113644/.test(n.nodeValue))nodes.push(n)}
 const shown=phoneForDisplay(farmContactSettings.callNumber);
 nodes.forEach(n=>{const link=n.parentElement.closest('a[href^="tel:"]');if(link)n.nodeValue=n.nodeValue.replace(/(?:\+?\d[\d\s()-]{6,}\d)/,shown);else n.nodeValue=n.nodeValue.replace(/0786\s?113\s?644/g,shown).replace(/254786113644/g,shown)});
}
fetch("/api/settings",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(d=>{if(d&&d.settings)applyFarmContactSettings(d.settings)}).catch(()=>{});

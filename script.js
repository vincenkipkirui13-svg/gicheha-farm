/* Local, category-matched farm photos. These are illustrative photos, not breed verification. */
const localAnimalPhotos={
  "cattle": [
    "images/cattle/cattle-01.webp",
    "images/cattle/cattle-02.webp",
    "images/cattle/cattle-03.webp",
    "images/cattle/cattle-04.webp",
    "images/cattle/cattle-05.webp",
    "images/cattle/cattle-06.webp",
    "images/cattle/cattle-08.webp",
    "images/cattle/cattle-09.webp",
    "images/cattle/cattle-10.webp",
    "images/cattle/cattle-11.webp",
    "images/cattle/cattle-12.webp",
    "images/cattle/cattle-13.webp",
    "images/cattle/cattle-14.webp",
    "images/cattle/cattle-15.webp",
    "images/cattle/cattle-16.webp",
    "images/cattle/cattle-17.webp",
    "images/cattle/cattle-18.webp",
    "images/cattle/cattle-19.webp",
    "images/cattle/cattle-20.webp",
    "images/cattle/cattle-21.webp",
    "images/cattle/cattle-22.webp",
    "images/cattle/cattle-23.webp",
    "images/cattle/cattle-24.webp",
    "images/cattle/cattle-25.webp",
    "images/cattle/cattle-26.webp",
    "images/cattle/cattle-27.webp",
    "images/cattle/cattle-28.webp",
    "images/cattle/cattle-29.webp",
    "images/cattle/cattle-30.webp",
    "images/cattle/cattle-31.webp",
    "images/cattle/cattle-32.webp",
    "images/cattle/cattle-33.webp",
    "images/cattle/cattle-34.webp",
    "images/cattle/cattle-35.webp",
    "images/cattle/cattle-36.webp",
    "images/cattle/cattle-37.webp",
    "images/cattle/cattle-38.webp",
    "images/cattle/cattle-39.webp",
    "images/cattle/cattle-40.webp",
    "images/cattle/cattle-41.webp",
    "images/cattle/cattle-42.webp",
    "images/cattle/cattle-43.webp",
    "images/cattle/cattle-44.webp",
    "images/cattle/cattle-46.webp",
    "images/cattle/cattle-47.webp"
  ],
  "sheep": [
    "images/sheep/sheep-01.webp",
    "images/sheep/sheep-02.webp",
    "images/sheep/sheep-03.webp",
    "images/sheep/sheep-04.webp",
    "images/sheep/sheep-05.webp",
    "images/sheep/sheep-06.webp",
    "images/sheep/sheep-07.webp",
    "images/sheep/sheep-08.webp",
    "images/sheep/sheep-09.webp",
    "images/sheep/sheep-10.webp",
    "images/sheep/sheep-11.webp",
    "images/sheep/sheep-12.webp",
    "images/sheep/sheep-13.webp",
    "images/sheep/sheep-14.webp",
    "images/sheep/sheep-15.webp",
    "images/sheep/sheep-16.webp",
    "images/sheep/sheep-17.webp",
    "images/sheep/sheep-18.webp",
    "images/sheep/sheep-19.webp",
    "images/sheep/sheep-20.webp"
  ],
  "goats": [
    "images/goat/goat-01.webp",
    "images/goat/goat-02.webp",
    "images/goat/goat-03.webp",
    "images/goat/goat-04.webp",
    "images/goat/goat-05.webp",
    "images/goat/goat-06.webp"
  ]
};
const photoCursor={cattle:0,sheep:0,goats:0};

document.querySelectorAll('.animal-card').forEach(card=>{
  const type=card.dataset.type;
  const main=card.querySelector('.animal-main-photo');
  const gallery=card.querySelector('.photo-gallery');
  if(!main||!gallery||!localAnimalPhotos[type])return;
  const perCard=type==='cattle'?4:type==='sheep'?4:1;
  const start=photoCursor[type];
  const photos=localAnimalPhotos[type].slice(start,start+perCard);
  photoCursor[type]+=photos.length;
  if(!photos.length)return;
  main.src=photos[0];
  main.removeAttribute('srcset');
  main.loading='lazy';
  main.decoding='async';
  main.alt=(main.alt||'Farm animal photo')+' — category-matched local photo';
  gallery.innerHTML=photos.slice(1).map((src,i)=>'<button type="button" class="gallery-thumb" data-src="'+src+'" aria-label="View additional '+type+' photo '+(i+2)+'"><img src="'+src+'" alt="Additional '+type+' photo '+(i+2)+'" loading="lazy" decoding="async"></button>').join('');
  gallery.querySelectorAll('.gallery-thumb').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const previous=main.src;
      main.src=btn.dataset.src;
      btn.dataset.src=previous;
      const thumb=btn.querySelector('img');
      thumb.src=previous;
    });
  });
});

/* Keep livestock category filters and the WhatsApp inquiry form working. */
document.querySelectorAll('.filter').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));
    button.classList.add('active');
    const filter=button.dataset.filter;
    document.querySelectorAll('.animal-card').forEach(card=>{
      card.style.display=filter==='all'||card.dataset.type===filter?'block':'none';
    });
  });
});

const inquiryForm=document.getElementById('inquiry');
if(inquiryForm){
  inquiryForm.addEventListener('submit',event=>{
    event.preventDefault();
    const name=document.getElementById('name').value.trim();
    const phone=document.getElementById('phone').value.trim();
    const location=document.getElementById('location').value.trim();
    const goods=document.getElementById('goods').value;
    const details=document.getElementById('details').value.trim();
    const message=encodeURIComponent(
      'Hello Gicheha Farm.\nFull name: '+name+
      '\nPhone: '+phone+
      '\nLocation: '+location+
      '\nType of goods/livestock: '+goods+
      '\nAdditional details: '+(details||'None')
    );
    window.open('https://wa.me/254786113644?text='+message,'_blank','noopener');
  });
}

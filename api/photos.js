const {neon}=require('@neondatabase/serverless');
const defaults=require('../photo-gallery.json');

function database(){
  const url=process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.POSTGRES_PRISMA_URL;
  if(!url) throw new Error('Persistent database is not configured');
  return neon(url);
}

function validateGallery(input){
  const source=input&&typeof input==='object'&&!Array.isArray(input)?input:{};
  const out={};
  for(const breed of Object.keys(defaults)){
    const items=Array.isArray(source[breed])?source[breed]:defaults[breed];
    out[breed]=items
      .filter(url=>typeof url==='string'&&url.length<2048&&(/^(\/[^/]|https:\/\/)/.test(url)))
      .slice(0,5);
  }
  return out;
}

module.exports=async(req,res)=>{
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Cache-Control','public, max-age=30, stale-while-revalidate=120');
  if(req.method!=='GET'){
    res.statusCode=405;
    res.setHeader('Allow','GET');
    return res.end(JSON.stringify({error:'Method not allowed'}));
  }
  try{
    const q=database();
    await q`CREATE TABLE IF NOT EXISTS gicheha_farm_gallery (id TEXT PRIMARY KEY, photos JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
    const rows=await q`SELECT photos FROM gicheha_farm_gallery WHERE id='main' LIMIT 1`;
    return res.end(JSON.stringify({photos:validateGallery(rows.length?rows[0].photos:defaults)}));
  }catch(error){
    console.error('Gallery read failed:',error);
    return res.end(JSON.stringify({photos:defaults}));
  }
};

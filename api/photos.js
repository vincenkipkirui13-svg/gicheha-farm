const {neon}=require('@neondatabase/serverless');
const defaults=require('../photo-gallery.json');

function database(){
  const url=process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.POSTGRES_PRISMA_URL;
  if(!url) throw new Error('Persistent database is not configured');
  return neon(url);
}

function validateGallery(input){
  const source=input&&typeof input==='object'&&!Array.isArray(input)?input:defaults;
  const out={};
  for(const breed of Object.keys(source)){
    if(typeof breed!=='string'||!breed.trim()||breed.length>60||!Array.isArray(source[breed]))continue;
    out[breed.trim()]=source[breed]
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
    if(!rows.length)return res.end(JSON.stringify({photos:defaults}));
    const current=validateGallery(rows[0].photos);const merged={...defaults,...current};const needsDefaults=Object.keys(defaults).some(name=>!Object.prototype.hasOwnProperty.call(current,name));
    const legacyOnly=["Friesian Cows","Ayrshire Cows","Guernsey Cows","Brown Swiss Cows","Sahiwal Cattle","Boran Cattle","Merino Sheep","Romney Sheep","Galla Goats","Alpine Goats","Toggenburg Goats","Brahman Cattle","Gir Cattle","Saanen Goats","Kalahari Red Goats","Lacaune Sheep"];
    if(Object.keys(current).some(name=>legacyOnly.includes(name))){
      const migrated={...defaults};
      for(const name of Object.keys(migrated))if(Array.isArray(current[name]))migrated[name]=current[name].slice(0,5);
      const combined=[...(current['Boran Cattle']||[]),...(current['Sahiwal Cattle']||[])];
      if(combined.length)migrated['Boran & Sahiwal Cattle']=[...new Set(combined)].slice(0,5);
      await q`UPDATE gicheha_farm_gallery SET photos=${JSON.stringify(migrated)}::jsonb,updated_at=NOW() WHERE id='main'`;
      return res.end(JSON.stringify({photos:{...defaults,...migrated}}));
    }
    if(needsDefaults){await q`UPDATE gicheha_farm_gallery SET photos=${JSON.stringify(merged)}::jsonb,updated_at=NOW() WHERE id='main'`;return res.end(JSON.stringify({photos:merged}));}return res.end(JSON.stringify({photos:merged}));
  }catch(error){
    console.error('Gallery read failed:',error);
    return res.end(JSON.stringify({photos:defaults}));
  }
};

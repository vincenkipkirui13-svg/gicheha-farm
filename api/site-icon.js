const {neon}=require('@neondatabase/serverless');
module.exports=async(req,res)=>{
 if(req.method!=='GET'){res.statusCode=405;res.setHeader('Allow','GET');return res.end('Method not allowed')}
 try{
  const url=process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.POSTGRES_PRISMA_URL;
  if(!url)throw new Error('Persistent database is not configured');
  const q=neon(url);
  const rows=await q`SELECT settings FROM gicheha_farm_settings WHERE id='main' LIMIT 1`;
  const id=rows.length&&rows[0].settings&&rows[0].settings.iconPhotoId||'';
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)){
   res.statusCode=302;res.setHeader('Location','/favicon.svg');res.setHeader('Cache-Control','no-store');return res.end();
  }
  const photos=await q`SELECT mime_type,data FROM gicheha_farm_photos WHERE id=${id} LIMIT 1`;
  if(!photos.length){res.statusCode=302;res.setHeader('Location','/favicon.svg');res.setHeader('Cache-Control','no-store');return res.end()}
  const type=photos[0].mime_type;
  if(!['image/png','image/jpeg','image/webp','image/avif'].includes(type)){res.statusCode=302;res.setHeader('Location','/favicon.svg');return res.end()}
  const bytes=Buffer.from(photos[0].data,'base64');
  res.statusCode=200;res.setHeader('Content-Type',type);res.setHeader('Content-Length',String(bytes.length));res.setHeader('Cache-Control','public, max-age=60, must-revalidate');res.setHeader('X-Content-Type-Options','nosniff');return res.end(bytes);
 }catch(error){console.error('Website icon read failed:',error);res.statusCode=302;res.setHeader('Location','/favicon.svg');res.setHeader('Cache-Control','no-store');return res.end()}
};

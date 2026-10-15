const {neon}=require('@neondatabase/serverless');

module.exports=async(req,res)=>{
  if(req.method!=='GET'){
    res.statusCode=405;
    res.setHeader('Allow','GET');
    return res.end('Method not allowed');
  }
  const id=String(req.query&&req.query.id||'');
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)){
    res.statusCode=400;
    return res.end('Invalid photo id');
  }
  try{
    const url=process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.POSTGRES_PRISMA_URL;
    if(!url) throw new Error('Persistent database is not configured');
    const q=neon(url);
    const rows=await q`SELECT mime_type,data FROM gicheha_farm_photos WHERE id=${id} LIMIT 1`;
    if(!rows.length){
      res.statusCode=404;
      return res.end('Photo not found');
    }
    const type=rows[0].mime_type;
    if(!['image/jpeg','image/png','image/webp','image/avif'].includes(type)){
      res.statusCode=415;
      return res.end('Unsupported photo type');
    }
    const bytes=Buffer.from(rows[0].data,'base64');
    res.statusCode=200;
    res.setHeader('Content-Type',type);
    res.setHeader('Content-Length',String(bytes.length));
    res.setHeader('Cache-Control','public, max-age=31536000, immutable');
    res.setHeader('X-Content-Type-Options','nosniff');
    return res.end(bytes);
  }catch(error){
    console.error('Photo read failed:',error);
    res.statusCode=500;
    return res.end('Unable to load photo');
  }
};

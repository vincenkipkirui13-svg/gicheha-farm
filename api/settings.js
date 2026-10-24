const {neon}=require('@neondatabase/serverless');
const DEFAULTS={callNumber:'0786113644',whatsappNumber:'254786113644'};
module.exports=async(req,res)=>{
 res.setHeader('Content-Type','application/json; charset=utf-8');
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET'){res.statusCode=405;res.setHeader('Allow','GET');return res.end(JSON.stringify({error:'Method not allowed'}))}
 try{
  const url=process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.POSTGRES_PRISMA_URL;
  if(!url)throw new Error('Persistent database is not configured');
  const q=neon(url);
  await q`CREATE TABLE IF NOT EXISTS gicheha_farm_settings (id TEXT PRIMARY KEY, settings JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  const rows=await q`SELECT settings FROM gicheha_farm_settings WHERE id='main' LIMIT 1`;
  const saved=rows.length&&rows[0].settings||{};
  return res.end(JSON.stringify({settings:{callNumber:saved.callNumber||DEFAULTS.callNumber,whatsappNumber:saved.whatsappNumber||DEFAULTS.whatsappNumber}}));
 }catch(error){console.error('Public contact settings read failed:',error);return res.end(JSON.stringify({settings:DEFAULTS}))}
};
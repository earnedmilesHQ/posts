// Usage: node news.js <spec.json> <outDir>
// spec: {date, title, hook, icon, slides:[{label,h,c,stat?:[value,label],icon?}], sources:[...], seed}
const path=require("path"),fs=require("fs");
const {chromium}=require(process.env.PW||"playwright");
const spec=JSON.parse(fs.readFileSync(process.argv[2]));const out=process.argv[3];
const asset=n=>{if(!n)return null;for(const d of["news","icons"]){const p=path.join(__dirname,"assets",d,n+".png");if(fs.existsSync(p))return p}return null};
const seed=spec.seed||0;
const total=spec.slides.length+2;
const th={accent:spec.accent,accentDeep:spec.accentDeep,hue:spec.hue,kicker:spec.kicker};
const items=[{...th,kind:"cover",title:spec.title,hook:spec.hook,icon:asset(spec.icon),date:spec.date,total},
 ...spec.slides.map((s,k)=>({...th,kind:"point",i:k+2,label:s.label,h:s.h,c:s.c,stat:s.stat||null,icon:asset(s.icon),date:spec.date,total})),
 {...th,kind:"cta",h:spec.cta_h||"Follow for *running news*",sub:spec.cta_sub||"Save this. Send it to a running friend.",sources:spec.sources,date:spec.date,total}];
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROME||undefined,args:["--no-sandbox","--allow-file-access-from-files"]});
  const p=await b.newPage({viewport:{width:1080,height:1350}});
  await p.goto("file://"+path.join(__dirname,"news.html"));
  await p.evaluate(()=>document.fonts.ready);
  await p.evaluate(()=>Promise.all(['900 40px Unbounded','800 40px Unbounded','500 40px "Instrument Sans"','600 40px "Instrument Sans"','500 20px "Martian Mono"'].map(f=>document.fonts.load(f,"AaBb0123"))));
  fs.mkdirSync(out,{recursive:true});
  for(let i=0;i<items.length;i++){
    const it=items[i];it.bg="assets/bgs/bg"+(((seed+i)%4)+1)+".jpg";it.flip=(seed+i)%3===1;
    const w=await p.evaluate(d=>window.render(d),it);
    await p.evaluate(()=>Promise.all([...document.images].map(im=>im.decode().catch(()=>{}))));
    await p.evaluate(()=>{});
    if(it.icon) await p.evaluate(()=>{const im=document.querySelector(".ico");if(im&&im.naturalWidth){} });
    if(w.length)console.log("WARN slide",i+1,w.join(","));
    await p.screenshot({path:path.join(out,(i+1)+".png")});
  }
  await b.close();console.log("rendered",items.length);
})();

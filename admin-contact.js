(()=> {
  const get=id=>document.getElementById(id);
  async function loadContactSettings(){
    if(!get('contactForm')||get('appView').classList.contains('hidden'))return;
    try{
      const result=await api('settings');
      get('callNumber').value=result.settings.callNumber||'0786113644';
      get('whatsappNumber').value=result.settings.whatsappNumber||'254786113644';
    }catch(error){
      message(get('contactStatus'),error.message,true);
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const form=get('contactForm');
    if(!form)return;
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      const button=get('saveContact');
      button.disabled=true;
      button.textContent='Saving…';
      hide(get('contactStatus'));
      try{
        const result=await api('settings',{method:'POST',body:JSON.stringify({settings:{
          callNumber:get('callNumber').value,
          whatsappNumber:get('whatsappNumber').value
        }})});
        get('callNumber').value=result.settings.callNumber;
        get('whatsappNumber').value=result.settings.whatsappNumber;
        message(get('contactStatus'),'Contact numbers saved. The public website will use the new numbers automatically.');
      }catch(error){
        message(get('contactStatus'),error.message,true);
      }finally{
        button.disabled=false;
        button.textContent='Save contact details';
      }
    });
    const app=get('appView');
    new MutationObserver(()=>{if(!app.classList.contains('hidden'))loadContactSettings()}).observe(app,{attributes:true,attributeFilter:['class']});
    loadContactSettings();
  });
})();
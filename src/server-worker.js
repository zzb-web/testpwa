self.addEventListener("install",event=>{})
self.addEventListener("active",event=>{})
self.addEventListener("fetch",event=>{
  event.responWith(fetch(event.request));
})
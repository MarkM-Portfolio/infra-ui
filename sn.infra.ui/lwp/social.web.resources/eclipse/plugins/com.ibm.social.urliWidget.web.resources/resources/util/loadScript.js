/*if the url not be loaded,after loaded the url,run the callback functions
if the url already be loaded,run the callback functions directiry*/


define(function(){
   var callbackMap = {};
   return function(url , callback) {
      if(!callbackMap[url]){
         callbackMap[url] = {
            isLoaded:false,
            callbacks:[]
         }
         var script = document.createElement('script');
         script.type = 'text/javascript';
         script.src = url;
         script.onload = function(){
            callbackMap[url].isLoaded = true;
            for(var i = 0; i < callbackMap[url].callbacks.length; i++){
               callbackMap[url].callbacks[i]();
            }
         }
         document.getElementsByTagName('head')[0].appendChild(script);
      }
      if(callbackMap[url].isLoaded && typeof callback === 'function'){
         callback();
      }
      if(typeof callback === 'function'){
         callbackMap[url].callbacks.push(callback);
      }
   }
})
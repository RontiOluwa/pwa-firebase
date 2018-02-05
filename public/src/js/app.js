
var deferredPrompt;
var enableNotificationButtons = document.querySelectorAll('.enable-notifications');

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

function display() {
  if('serviceWorker' in navigator){
    var option = {
      body:'You sucessfully suscribe to our notification service!',
      icon:'/src/images/icons/app-icon-96x96.png',
      image:'/src/images/sf-boat.jpg',
      dir:'ltr',
      lang:'en-US', // BCP 47
      vibrate:[100,50,200],
      badge:'/src/images/icons/app-icon-96x96.png',
      // tag:'comfirm-notification',
      // renotify:true
      acttion:[
        {acttion:'confirm',title:'Okay',icon:'/src/images/icons/app-icon-96x96.png'},
        {acttion:'cancel',title:'cancel',icon:'/src/images/icons/app-icon-96x96.png'}
      ]
    };
    navigator.serviceWorker.ready
    .then(function(swreg){
        swreg.showNotification('Successfully Suscribe !',option)
    })
  }
}

function configure(){
  if(!('serviceWorker' in navigator)){
    return;
  }
  var reg;
  navigator.serviceWorker.ready
    .then(function(swreg) {
      return swreg.pushManager.getSubscription();
  })
  .then(function(sub) {
      if(sub === null){
        reg.pushManager.subcribe({
          userVisibility:true
        });
      }
      else
      {

      }
  })
}

function askPermission(){
  Notification.requestPermission(function(result) {
    if(result !=='granted'){
      console.log('Permision not granted');
    }else{
      console.log('Permision granted');
      // // enableNotificationButtons.style.display='none'    
      display();
    }
  })
}

if('Notification' in window){
  for(var i = 0;i < enableNotificationButtons.length; i++){
    enableNotificationButtons[i].style.display='inline-block'
    enableNotificationButtons[i].addEventListener('click',askPermission);
  }
}
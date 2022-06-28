function load(callback) {
  chrome.storage.sync.get('blocked_patterns', function(data) {
    callback(data['blocked_patterns'] || []);
  });
}

function stop(callback) {
  if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  }
  console.log("Deteniendo bloqueo... D:")
  return callback.call()
}

function blockRequest(details) { return {cancel: true}; }  

function start(urls) { 
  if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  }	

  chrome.webRequest.onBeforeRequest.addListener(
    blockRequest, 
    {urls: ["*://cdn.lavoz.com.ar/sites/default/files/libs/paywall/lavoz/pw.js?*"]}, 
    ['blocking']
  ); 

  console.log("Iniciando bloqueo... :D")
}


function save(newPatterns, callback) {
  patterns = newPatterns;
  chrome.storage.sync.set({
    'blocked_patterns': newPatterns
  }, function() {
    start();
    callback.call();
  });
}

load(function(p) {
  patterns = p;
});




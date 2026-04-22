const AUTH_KEY = 'YOUR_AUTH_KEY'
const SERVER_DOMAIN = 'sdk.core-relay.org'

export const initServerTrack = () => {
  if (window.ServerTrack) {
    console.log('ServerTrack already initialized')
    return
  }

  window.ServerTrack = window.ServerTrack || {}
  window.serverTrackQueue = []
  window.st = function() { 
    window.serverTrackQueue.push(arguments) 
  }

  const script = document.createElement('script')
  script.async = true
  const randomPath = Math.random().toString(36).substring(2, 15)
  script.src = `https://${SERVER_DOMAIN}/lib/${randomPath}?key=${AUTH_KEY}`
  
  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(script, firstScript)

  console.log('ServerTrack initialized')
}

export const trackEvent = (eventName, eventData = {}, userData = null) => {
  if (!window.st) {
    console.error('ServerTrack not initialized')
    return
  }

  if (userData) {
    window.st('track', eventName, eventData, userData)
  } else {
    window.st('track', eventName, eventData)
  }
}

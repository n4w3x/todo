import { format } from 'date-fns'

const arrId = {}

export function setTimer(callback, ms, id) {
  if (arrId[id]) return true

  const currentTime = Date.now() + ms
  const mls = ms
  const interval = setInterval(() => {
    callback(format(currentTime - Date.now(), 'mm:ss'))
    arrId[id].tik = format(currentTime - Date.now(), 'mm:ss')
    arrId[id].tikMS = currentTime - Date.now()
  }, 1000)

  const play = true
  const stop = false
  arrId[id] = {
    interval,
    currentTime,
    mls,
    play,
    stop,
  }
  return true
}

export function getCurrentTime(id) {
  if (!arrId[id]) return false

  if (arrId[id].tikMS < 1000) {
    clearInterval(arrId[id].interval)
    arrId[id].play = false
    arrId[id].stop = false
    return format(arrId[id].mls, 'mm:ss')
  }

  return arrId[id].tik
}

export function toPlay(id, callback) {
  if (arrId[id].play) return true
  if (arrId[id].play === false && arrId[id].stop === false) {
    arrId[id].currentTime = Date.now() + arrId[id].mls
    arrId[id].tikMS = arrId[id].currentTime - Date.now()
    const interval = setInterval(() => {
      callback(format(arrId[id].currentTime - Date.now(), 'mm:ss'))
      arrId[id].tik = format(arrId[id].currentTime - Date.now(), 'mm:ss')
      arrId[id].tikMS = arrId[id].currentTime - Date.now()
    }, 1000)
    arrId[id].interval = interval
    arrId[id].play = true
  }
  if (arrId[id].stop === true) {
    arrId[id].currentTime = Date.now() + arrId[id].tikMS
    const interval = setInterval(() => {
      callback(format(arrId[id].currentTime - Date.now(), 'mm:ss'))
      arrId[id].tik = format(arrId[id].currentTime - Date.now(), 'mm:ss')
      arrId[id].tikMS = arrId[id].currentTime - Date.now()
    }, 1000)
    arrId[id].interval = interval
    arrId[id].play = true

    arrId[id].stop = false
    return true
  }
  arrId[id].play = true
  return true
}

export function toPause(id) {
  arrId[id].play = false
  clearInterval(arrId[id].interval)
  arrId[id].stop = true
}

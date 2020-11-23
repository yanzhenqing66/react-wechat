/**
 * 
 * 路由跳转
 */

export function goRedirect(type, header) {
  let path
  if(type === 'boss') {
    path = '/boss'
  } else {
    path = '/job'
  }
  if(!header) {
    path += 'info'
  }
  return path
}
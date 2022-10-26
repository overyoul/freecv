// function handleKeyPress (event) {
//     // You can put code here to handle the keypress.
//     document.getElementById("last-keypress").innerText = event.key
//     console.log(`You pressed ${event.key}`)
//   }

// window.addEventListener('keyup', handleKeyPress, true)
const Store = require('electron-store');
const store = new Store();
const { clipboard } = require('electron')
var content = document.getElementById("content")
var clear = document.getElementById("clear")
var reload = document.getElementById("reload")
clear.onclick = function () {
  store.clear()
  init()
}
reload.onclick = function () {
  init()
}
var total = document.getElementById("total")
init()
function init() {
  total.innerHTML = "当前剪贴板共" + store.size + "条"
  var childs = content.childNodes;
  for (var i = childs.length - 1; i >= 0; i--) {
    content.removeChild(childs[i]);
  }

  for (i = store.size - 1; i >= 0; i--) {
    var tag = document.createElement('div');
    tag.innerText = (store.size - i).toString() + ". " + store.get(i.toString())
    tag.className = "item alert alert-info"
    content.appendChild(tag)
  }
  var lis = document.getElementsByClassName("item");
  console.log(lis.length)
  for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
      clipboard.writeText(this.innerText.substring(3))
    }
  }
}
Mousetrap.bind('4', () => { })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// combinations
Mousetrap.bind('alt+shift+k', () => { })

// map multiple combinations to the same callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// gmail style sequences
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})


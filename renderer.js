// function handleKeyPress (event) {
//     // You can put code here to handle the keypress.
//     document.getElementById("last-keypress").innerText = event.key
//     console.log(`You pressed ${event.key}`)
//   }
  
// window.addEventListener('keyup', handleKeyPress, true)
const Store = require('electron-store');
const store = new Store();
const {clipboard} = require('electron')
var content=document.getElementById("content")
var total=document.getElementById("total")

total.innerHTML="当前剪贴板共"+store.size+"条"
for(i=0;i<store.size;i++){
    var tag=document.createElement('div');
    tag.innerText=(i+1).toString()+". "+store.get(i.toString())
    tag.className="item"
    content.appendChild(tag)
}
var lis = document.getElementsByClassName("item");
// store.clear()
console.log(lis.length)
for(var i=0; i<lis.length; i++){
    lis[i].onclick = function () {
        var text=this.innerText
        alert(clipboard.readText())
        // clipboard.write("123")
    }
}
Mousetrap.bind('4', () => { })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// combinations
Mousetrap.bind('alt+shift+k', () => {  })

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


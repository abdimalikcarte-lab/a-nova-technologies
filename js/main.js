document.querySelectorAll('#links a').forEach(a=>a.addEventListener('click',()=>{
 document.getElementById('links').classList.remove('open');
 document.querySelectorAll('#links a').forEach(x=>x.classList.remove('on'));a.classList.add('on');
}));

let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue_rotate');
let download = document.getElementById('download');
let upload = document.getElementById('upload');
let img = document.getElementById('img');
let reset = document.querySelector('span');
let img_box = document.getElementsByClassName('img_box')[0];
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
// on load ;
window.onload = function(){
    download.style.display = 'none';
    reset.style.display = 'none';
    img_box.style.display = 'none';
};
// upload ;
upload.onchange = function(){
    download.style.display = 'block';
    reset.style.display = 'block';
    img_box.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){
        img.src = file.result;
        canvas.width = img.width;
        canvas.height = img.height;
        img.style.maxWidth = '75vw';
        img.style.maxHeight = '80vh';
        canvas.style.maxWidth = '75vw';
        canvas.style.maxHeight = '80vh';
        ResetValue();
    };
    img.onload = function(){
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display = 'none';
    };
};
// filters ;
let filters = document.querySelectorAll('ul li input');
filters.forEach(filter => {
    filter.addEventListener('input', function(){
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height)
    })
})
// reset ;
function ResetValue(){
    ctx.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
};
reset.addEventListener('click',ResetValue);
// download ;
download.onclick = function(){
    download.href = canvas.toDataURL();
};
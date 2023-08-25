const mod = function(n, k){
    if(n < 0){
      return k + n
    }
    if(n > nums.length){
      return n % k
    }
    return n
}
  
var billboard = true

const addImagesOnPageLoad = function(){
    const initialImages = Array.from(document.querySelectorAll('img')).slice(17)
    for(var i = 0; i < initialImages.length; i++){
    initialImages[i].src = getImageName(nums[i])
    }
}

const addImagesOnScroll = function(){
for(let i = 0; i < 4; i++){
    lastImg = document.querySelector('img:last-of-type')

    let imgToAdd = document.createElement('img');
    imgToAdd.src = getImageName(nums.pop())
    imgToAdd.addEventListener("click", gallery_click)
    if(billboard){
    imgToAdd.className = "invisible_image"
    } else {
    imgToAdd.className = "gallery_image"
    }

    lastImg.insertAdjacentElement('afterend', imgToAdd)
}
}
  
const getImageName = function(n){
    if(n < 10){
        return `files/0${n}.jpeg`
    } else {
        return `files/${n}.jpeg`
    }
}

const shuffle = function(array){
    let l = array.length, t, i

    while(l){
        i = Math.floor(Math.random() * l)
        l--

        t = array[l]
        array[l] = array[i]
        array[i] = t
    }

    return array
}

const handleInfiniteScroll = function(){
    throttle(() => {
    const endOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    if (endOfPage) {
        addImagesOnScroll()
    }
    if (nums.length == 0) {
        removeInfiniteScroll()
    }
    }, 1000)
}

const throttle = function(callback, time){
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
    callback();
    throttleTimer = false;
    }, time);
};

const removeInfiniteScroll = function(){
    loader.remove();
    window.removeEventListener("scroll", handleInfiniteScroll);
};

window.addEventListener("scroll", handleInfiniteScroll);

window.addEventListener("keydown", (e) => {
if(e.code == 'ArrowLeft'){
    console.log("leftkeypress")
    currentImageNumber--
    billboard_image.src = getImageName(nums[mod(currentImageNumber, nums.length)])
}
if(e.code == 'ArrowRight'){
    console.log("rightkeypress")
    currentImageNumber++
    billboard_image.src = getImageName(nums[mod(currentImageNumber, nums.length)])
}
});

var billboard_image = document.querySelector("#billboard_image")
var currentImageNumber = 0;

billboard_click = function(e) {
billboard = false
e.target.removeEventListener("click", billboard_click)
e.target.id = ""

const images = document.querySelectorAll('img')
images.forEach((i) => {
    i.classList.add("gallery_image")
    i.classList.remove("invisible_image")
    i.addEventListener("click", gallery_click)
})
}

gallery_click = function(e) {
billboard = true
const images = document.querySelectorAll('img')
images.forEach((i) => {
    i.classList.remove("gallery_image")
    i.classList.add("invisible_image")
    i.removeEventListener("click", gallery_click)
})

e.target.id = "billboard_image"
e.target.classList.remove("invisible_image")
e.target.addEventListener("click", billboard_click)
}

billboard_image.addEventListener("click", billboard_click)

var nums = shuffle(Array.from({length: 164}, (_, i) => i + 1))

var throttleTimer;

addImagesOnPageLoad()
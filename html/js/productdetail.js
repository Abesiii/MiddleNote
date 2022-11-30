const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;


$(document).ready(function() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const title = urlParams.get('title');
	const price = urlParams.get('price');
	
	console.log(title);
	
	
	
	document.getElementsByClassName("product-title")[0].innerHTML = title;
	document.getElementsByClassName("new-price")[0].innerHTML = "Discounted Price: <span>" + price + "</span></p>";
	document.getElementsByClassName("img-showcase")[0].innerHTML = "<img src = 'https://loremflickr.com/900/900/" +title+ "?random=1'><img src = 'https://loremflickr.com/900/900/" + title+ "?random=2'><img src = 'https://loremflickr.com/900/900/" + title+ "?random=3'><img src = 'https://loremflickr.com/900/900/" + title+ "?random=4'>";
	document.getElementsByClassName("img-select")[0].innerHTML = "<div class = 'img-item'><a href = '#' data-id = '1'><img src = 'https://loremflickr.com/900/900/" + title + "?random=1'></a></div><div class = 'img-item'><a href = '#' data-id = '2'><img src = 'https://loremflickr.com/900/900/" + title + "?random=2'></a></div><div class = 'img-item'> <a href = '#' data-id = '3'><img src = 'https://loremflickr.com/900/900/" + title + "?random=3'></a></div><div class = 'img-item'><a href = '#' data-id = '4'><img src = 'https://loremflickr.com/900/900/" + title + "?random=4'></a></div>";


const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        console.log("clicked");
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);


});

	



imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        console.log("clicked");
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);




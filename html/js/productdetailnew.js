

$(document).ready(function() {
	refresh();
	
});


function refresh() {
	
	const link = window.location.href;
	var url = new URL(link);
	
	const urlParams = url.searchParams;
	
	console.log(urlParams);
	const index = urlParams.get('index');
	
	console.log(index);
	
	var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
	var addedAmount = (Object.keys(existingEntries).length);
	
	var storedTitle = existingEntries[index].title;
	var title = existingEntries[index].title;
	var storedPrice = existingEntries[index].price;
	var storedDescription = existingEntries[index].description;
	var storedLocation = existingEntries[index].location;
	var storedCategory = existingEntries[index].cate;
	
	document.getElementsByClassName("product-title")[0].innerHTML = storedTitle;
	document.getElementsByClassName("new-price")[0].innerHTML = "Discounted Price: <span>$" + storedPrice + "</span></p>"
	document.getElementById("item-description").innerHTML = storedDescription;
	document.getElementById("shiplocation").innerHTML = storedLocation;
	document.getElementById("arrivalpoint").value = storedLocation;
	document.getElementById("catepara").innerHTML = storedCategory;
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
	
	


	
}
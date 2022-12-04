
var existingAddedAmount = 0;
var lastDataTitle;
var lastDataPrice;

$(document).ready(function() {
	refresh();
});



function movetoDetailDefault(product) {
	
	var jquerythis = $(product);
	
	var title = $(product).siblings(".title").text();
	var price = $(product).siblings(".price").text();
	window.location.href='./product_detail.html?title=' + title + '&price=' + price;
}
	









// div.innerHTML = '<div class="product"><img src="https://images.pexels.com/photos/2922276/pexels-photo-2922276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""><ul class="d-flex align-items-center justify-content-center list-unstyled icons"><li class="icon"><span class="fas fa-expand-arrows-alt"></span></li><li class="icon mx-3"><span class="far fa-heart"></span></li><li class="icon"><span class="fas fa-shopping-bag"></span></li></ul></div>';




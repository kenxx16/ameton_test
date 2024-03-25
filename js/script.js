

$(document).ready(function(){
	$(".owl-carousel").owlCarousel({
		items: 1,
		nav: true,
		margin: 24,
		dots: false,
		responsive: {
			700: {
			  items: 2
			},
			900: {
			  items: 3
			},
			1280: {
			  items: 4
			}
		}
	});
});
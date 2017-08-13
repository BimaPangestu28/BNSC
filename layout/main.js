/*Global Variable*/
var numSlide = 0;

/*Animation For Fixed Menu Navigation*/
function fixedMenu() {
	$(".menu").on('mouseover', function(){
		$(".text-hover").fadeIn();
	});

	$(".menu").on('mouseleave', function(){
		$(".text-hover").fadeOut();
	});
}

/*For Slider Banner*/
function slider() {
	numSlide += 1;

	if (numSlide == 2) {
		numSlide = 0;
	}

	marginSlide = numSlide * -100;
	/*console.log(numSlide);*/

	$("#si-banner").animate({
		marginLeft: marginSlide.toString() + "%"
	}, 1000);
};

/*For Next Slider Banner*/
function nextSlider() {
	numSlide += 1;

	if (numSlide == 2) {
		numSlide = 0;
	}

	marginSlide = numSlide * -139;
	/*console.log(numSlide);*/

	$("#si-banner").animate({
		marginLeft: marginSlide.toString() + "%"
	}, 1000);
}

/*For Previous Slider*/
function prevSlider() {
	numSlide -= 1;

	if (numSlide == -1) {
		numSlide = 1;
	}

	marginSlide = numSlide * -139;
	/*console.log(numSlide);*/

	$("#si-banner").animate({
		marginLeft: marginSlide.toString() + "%"
	}, 1000);
}

/*For SideNav*/
function sideNav() {
	if (($(window).width() > 768) && ($(window).width() <= 1440)) {
		$("#fix-nav").on('click', function(){
			$("#sidenav").css("display", "inline");
			$("body").css("margin-left", "20%");
			$("#fix-nav").css("display", "none");
		});

		$(".closebtn").on('click', function(){
			$("#sidenav").css("display", "none");
			$("body").css("margin-left", "0");
			$("#fix-nav").css("display", "inline");
		});
	}

	else if (($(window).width()) > 320 && ($(window).width() <= 768)) {
		$("#fix-nav").on('click', function(){
			$("#sidenav").css("display", "inline");
			$("body").css("margin-left", "30%");
			$("#fix-nav").css("display", "none");
		});

		$(".closebtn").on('click', function(){
			$("#sidenav").css("display", "none");
			$("body").css("margin-left", "0");
			$("#fix-nav").css("display", "inline");
		});
	}

	else if (($(window).width() <= 537)) {
		$("#fix-nav").on('click', function(){
			$("#sidenav").css("display", "inline");
			$("#fix-nav").css("display", "none");
		});

		$(".closebtn").on('click', function(){
			$("#sidenav").css("display", "none");
			$("#fix-nav").css("display", "inline");
		});
	}
}

/*For datepicker*/
function datePick() {
	$(".birth").datepicker();
}

function main() {
	fixedMenu();
	/*setInterval("slider()", 10000);*/
	sideNav();
	datePick();
}

main();
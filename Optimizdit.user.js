// ==UserScript==
// @name        Optimizdit
// @namespace   https://github.com/codefiles/Optimizdit
// @include     *www.reddit.com*
// @version     15.04.12
// @description Minimize threads with visited title, comment, or thmumbnail link and adds checkbox for flexibility of this feature.  Open links in new tab.  Removes unused features.
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

/*
	changelog:
		15.04.12 - initial release
		
	to do:
		-  write code to save minimized state on visited threads for 2 days
*/

/* Open links in new tab */
$('a').attr('target', '_blank');

/* Removes unused features */
$("li.share, .expando-button").hide();

/* Modifies rank class style */
$(".rank").css('margin-left', '8px');

/* Adds checkbox class style */
GM_addStyle(".checkbox { float: left; margin-top: 18px; }");

/* Adds div and class for checkboxes */
$('.link').prepend($('<div>').addClass("checkbox"));

/* Adds checkboxes */
$(".checkbox").append($('<input>', { type : "checkbox" }));

/* Adds checked state to checkbox and thread */
function checkedbox(e) {
	/* Hide everything under thing class except rank and entry class */
	$(e).children(".midcol, a.thumbnail").hide();
	/* Hide tagline class */
	$(e).find(".tagline").hide();
	/* Modifies entry class style*/
	$(e).children(".entry").css('margin-left', '47px');
	/* Modifies title class and comment class link style */
	$(e).find("a.title, a.comments").css('color', 'lightgray');
	$(e).find('input[type=checkbox]').prop("checked", true);
}

/* Adds checkbox functionality */
$('input[type=checkbox]').click(function() {
	/* When a checkbox is checked */
	if (this.checked) {	
		/* Apply checked state to checkbox and thread */
		checkedbox($(this).parent().parent());
	/* When a checkbox is unchecked */
	} else {
		/* Show everything under thing class */
		$(this).parent().siblings().show();
		/* Show tagline class */
		$(this).parent().siblings(".entry").children(".tagline").show();
		/* Resets entry class style*/
		$(this).parent().siblings(".entry").css('margin-left', '0px');
		/* Resets title class and comment class link style */
		$(this).parent().siblings(".entry").find("a.title").css('color', '#00F;');
		$(this).parent().siblings(".entry").find("a.comments").css('color', '#888;');
	}
});

/* Adds link functionality */
$("a.title").click(function() {
	/* Apply checked state to checkbox and thread */
	checkedbox($(this).parentsUntil(".thing").parent());
});

/* Adds thumbnail link functionality */
$("a.thumbnail").click(function() {
	/* Apply checked state to checkbox and thread */
	checkedbox($(this).parent());
});

/* Adds comment link functionality */
$("a.comments").click(function() {
	/* Apply checked state to checkbox and thread */
	checkedbox($(this).parentsUntil(".thing").parent());
});
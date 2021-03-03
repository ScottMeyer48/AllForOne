$(document).ready(() => {  				// QUAND LA PAGE EST CHARGER -- open panel left + Hover CSS 
	// document.getElementById("mySidebar").style.width = "310px";
	// document.getElementById("panel_title").style.width = "310px";
	// document.getElementById("main").style.marginLeft = "310px";

	document.getElementById("panel").style.width = "310px";
	document.getElementById("main").style.marginLeft = "310px";

});

$(document).ready(function() {			// Special - CSS - on hover .panel_title and .garde change background (not possible in css)
	$('.panel_title').hover(function() {
		$('.panel_title').css('transition', '0s').css('background-color', '#E6994C');
		$('.garde').css('transition', '0s').css('background-color', '#E6994C');
	},function() {  // on mouseout, reset the background colour
		$('.panel_title').css('background-color', '#00796B');
		$('.garde').css('background-color', '#00796B');
	});

	$('.garde').hover(function() {
		$('.panel_title').css('transition', '0s').css('background-color', '#E6994C');
		$('.garde').css('transition', '0s').css('background-color', '#E6994C');
	},function() {  // on mouseout, reset the background colour
		$('.panel_title').css('background-color', '#00796B');
		$('.garde').css('background-color', '#00796B');
	});
});

function show_message(message, style) { // SNACKBAR MESSAGE (INFO - SUCCESS - WARNING)
	if (style == 'info') {style_message = ' ';} 	
	if (style == 'success') {style_message = ' ';} 	
	if (style == 'warning') {style_message = ' ';} 	

	document.getElementById('message_block').innerHTML = style_message + message;
	var x = document.getElementById("message_block");
	x.className = "show " + style;

	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800); // After 4 seconds, remove the show class from DIV
}

function sidebar_open_close() {			// SIDEBAR - OPEN/CLOSE 

	var sidebar_largeur = document.getElementById('panel').offsetWidth;
	if (sidebar_largeur == 0) { 
		document.getElementById("panel").style.width = "310px";
		document.getElementById("main").style.marginLeft = "310px";
		// document.getElementById("editor").style.marginLeft = "310px";
		// document.getElementsByClassName("ck-editor__editable").style.marginLeft = "310px";
	}else{
		// document.getElementsByClassName("ck-editor__editable").style.width = "100%";
		document.getElementById("panel").style.width = "0";
		document.getElementById("main").style.marginLeft = "0";
		// document.getElementById("cke").style.marginLeft = "0";
		// document.getElementById("editor").style.width = "100%";

	}


	// var sidebar_largeur = document.getElementById('mySidebar').offsetWidth;
	// document.getElementById("panel_title").style.transition = "0.5s";
	// if (sidebar_largeur == 0) { 
	// 	document.getElementById("mySidebar").style.width = "310px";
	// 	document.getElementById("panel_title").style.width = "310px";
	// 	document.getElementById("main").style.marginLeft = "310px";
	// }else{
	// 	document.getElementById("mySidebar").style.width = "0";
	// 	document.getElementById("panel_title").style.width = "0";
	// 	document.getElementById("main").style.marginLeft = "0";
	// }
}

function show_record(name_bt,order){	// Show/Hide button record
	if (name_bt == 'bt_record_cke' && order == 'show'){
		document.getElementById("bt_record_cke").style.display = "block"; // Show button
	} 
	if (name_bt == 'bt_record_cke' && order == 'hide'){
		document.getElementById("bt_record_cke").style.display = "none"; // Hide button
	} 
}


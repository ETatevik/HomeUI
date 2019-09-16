jQuery(document).ready(function($) {
	$('#modalPrint').fadeOut();
    
    $('ul.buttons > li>a.print').on('click', function(event) {
    	event.preventDefault();
	    $('#modalPrint').fadeIn(800);
    });

    $('#modalPrint').on('click',function(event) {
    	event.preventDefault();
    	if (event.target.id == 'modalPrint') {
    		$(this).fadeOut(500);
    	}

    });

    $('#mainTable table > tbody > tr').on('click', function(event) {
    	event.preventDefault();
    	$('#mainTable table > tbody > tr').not(this).removeClass('active');
    	$(this).toggleClass('active');
    });


});
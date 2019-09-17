jQuery(document).ready(function($) {
    
    $('ul.buttons > li>a.print').on('click', function(event) {
    	event.preventDefault();
	    $('#modalPrint').addClass('anime');
    });

    $('#modalPrint').on('click',function(event) {
    	event.preventDefault();
    	if (event.target.id == 'modalPrint') {
    		$(this).removeClass('anime');
    	}

    });

    $('#mainTable table > tbody > tr').on('click', function(event) {
    	event.preventDefault();
    	$('#mainTable table > tbody > tr').not(this).removeClass('active');
    	$(this).toggleClass('active');
    });


});
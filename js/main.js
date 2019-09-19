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

    $('#crEdPost label[for="langu"]').on('click', function(event) {
        event.preventDefault();
         console.log(event.target.tagName.toLowerCase())
        if ( (event.target.tagName.toLowerCase() == 'li' && event.target.className == "activeLang") 
            || event.target.tagName.toLowerCase() == "label" 
            || $(this).parent('li.activeLang')) {
           
            let li = "";
            if ($(this).hasClass('activeLang')){
                li = $(this);
            }else if(event.target.tagName == "img"){
                li = $('#crEdPost label[for="langu"] ul li.activeLang');
            } else if( $(this).attr('for') == "langu"){
                li = $(this).children("ul").children('.activeLang');
            }
            $('#langu li').not(li).fadeToggle(200);   

        }
    });


});
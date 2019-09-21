(function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  };
}(jQuery));


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

    $.fn.chackLang = function(textLang){
        let glText = '';
        if(textLang == "English"){
            glText = "eng";
        }else if(textLang == "Armenian"){
            glText = "arm";
        }else if(textLang == "Russian"){
            glText = "ru";
        }
        return $(this).val(glText);
    }

    $('input#lang').chackLang($('#langu li.activeLang > span').text());
    $('#langu li').on('click', function(event) {
        event.preventDefault();
        
        if (!$(this).hasClass('activeLang')) {
            $('#langu li.activeLang').css('order', $(this).css('order'));
            $(this).css('order', 1);
            $('#langu li').removeClass('activeLang');
            $(this).addClass('activeLang');
            $('#langu li').not(this).fadeOut(200); 
        }else{
            $('#langu li').not(this).fadeToggle(200); 
        }
        $('input#lang').chackLang($(this).children('span').text());
    });


    $('input#iditi').inputFilter(function(value) {
        return /^\d*$/.test(value);
    });


    $("#addMultiFile").on("change", function() {
        if ($(this).prop('files').length > 2) {
            alert("You can select only 2 file : 1 image and 1 audio");
            $(this).val('');
        }else if($(this).prop('files').length == 2 && (($(this).prop('files')[0].type == "image/png" && $(this).prop('files')[1].type ==  "image/png")
            || ($(this).prop('files')[0].type == "image/jpg" && $(this).prop('files')[1].type ==  "image/jpg")
            || ($(this).prop('files')[0].type == "image/jpg" && $(this).prop('files')[1].type ==  "image/png")
            || ($(this).prop('files')[0].type == "image/png" && $(this).prop('files')[1].type ==  "image/jpg"))){
            alert("You can select only  1 image");
            $(this).val('');
        }else if($(this).prop('files').length == 1 
            && ($(this).prop('files')[0].type == "image/png" ||  $(this).prop('files')[0].type == "image/jpg") 
            && $(this).prop('files')[0].size / 1048576 <= 5){
            // $('input[name="image"]').eq(0).prop('files') = $(this).prop('files')[0];
            console.log($(this).prop('files')[0])
        }

        // {
        //     let fileSize = $(this).prop('files')[0].size;
        //     fileSize = fileSize / 1048576; //size in mb
        //     console.log(fileSize)
        // } 
        console.log($('input[name="image"]'))

    });


});
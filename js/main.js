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
}(jQuery));


jQuery(document).ready(function($) {

    // homeUI html script
    {
        // Print modal window
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

        // table body choose event
        $('#mainTable table > tbody > tr').on('click', function(event) {
            event.preventDefault();
            $('#mainTable table > tbody > tr').not(this).removeClass('active');
            $(this).toggleClass('active');
        });
    }


    // addPost html script
    {
        //  choose language and save that in input
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

        // id only number
        $('input#iditi').inputFilter(function(value) {
            return /^\d*$/.test(value);
        });

        // choose image and audio file save that in input and make base 64 texts
        {
            let locText = '';
            var handleFileSelect = function(evt) {
                var files = evt.target.files;
                var file = files[0];
                if (files && file) {  
                    var reader = new FileReader();

                    reader.onload = function(readerEvt) {
                        var binaryString = readerEvt.target.result;
                        console.log(btoa(binaryString));//make base64 text file any file
                    };

                    reader.readAsBinaryString(file);
                }
                   
            };

            $(".addMultiFile > input[type='file']").on("change", function(event) {
                
                if ($(this).prop('files')[0].size / 1048576 > 5 && $(this).attr('name') == 'image'){
                    alert('Maximum image size 5 MB');
                    $(this).val('');
                }else if($(this).prop('files')[0].size / 1048576 > 100 && $(this).attr('name') == 'audio'){
                    alert('Maximum audio size 100 MB');
                    $(this).val('');
                }else{
                    $(this).attr('disabled', 'true');
                    $(this).removeClass('active');
                    $(".addMultiFile > input[type='file']").not(this).removeAttr('disabled')
                    $(".addMultiFile > input[type='file']").not(this).addClass('active');

                    if ($(this).attr('name') == 'image') {
                        if(locText.length  == 0){
                            locText = $(this).prop('files')[0].name;
                        }else if(/  &  /.test(locText)){
                            locText = locText.split('  &  ');
                            locText.shift();
                            locText = locText.join('');
                            locText += '  &  ' + $(this).prop('files')[0].name;
                        }
                        handleFileSelect(event);//make base64 text file image file,but not give that in server only console log
                    }else{
                        if(!/  &  /.test(locText)){
                            locText +=  '  &  ' + $(this).prop('files')[0].name;
                        }else{
                            locText = locText.split('  &  ');
                            locText.shift();
                            locText = locText.join('');
                            locText += '  &  ' + $(this).prop('files')[0].name;
                        }
                        handleFileSelect(event);//make base64 text file audio file,but not give that in server only console log

                    }

                    $('.addAudioImgNames').text(locText);

                }
            });
        }


        // post form submit in server
        $('form[name="postsMU"]').submit(function(event) {
            $('input').removeAttr('disabled');
        });
    }

    // login (admin) html script // index html
    {
        $('#login .col > label > input').on({
            focus: function(event) {
                event.preventDefault();
                $(this).parent('label').addClass('active');
                $('#login .col > label > input').not(this).parent('label').removeClass('active');
            },
            blur: function(event){
                event.preventDefault();
                $(this).parent('label').removeClass('active');
            },
            change: function(event){
                event.preventDefault();
                $(this).parent('label').css('borderBottomColor', '#4C73FF');
                $(this).prev('img').css('opacity', '1');
                if(!$(this).val()){                    
                    $(this).parent('label').removeAttr('style');
                    $(this).prev('img').removeAttr('style');
                }
            }
        });
    }

});
(function($){
    "use strict";
    
    $(document).ready(function(){
        /*
         * Contact form. Requires jQuery validation.
         */
        
        var contactForm = '#contact-form',
            $contactForm = $(contactForm),
            $btnSubmit = $contactForm.find('button[type="submit"]');
        
        if ($.fn.validate){
            $contactForm.validate();
        }
        else{
            console.log('Plugin "validate" is not loaded.');
        }
        
        $(document).on('submit', contactForm, function(e){
            var defaultMessage = $btnSubmit.html(),
                sendingMessage = 'Loading...',
                errorMessage = 'Error Sending!',
                okMessage = 'Email Sent!';
            
            $btnSubmit.html(sendingMessage);
            
            $.ajax({
                url: $contactForm.attr('action'),
                type: 'post',
                dataType: 'json',
                data: $(this).serialize(),
                success: function(data){
                    if(data === true){
                        $btnSubmit.html(okMessage);
                        $contactForm.find('input[type="text"], textarea').val('');
                    }
                    else{
                        $btnSubmit.html(errorMessage);
                    }

                    setTimeout(function(){
                        $btnSubmit.html(defaultMessage);
                    }, 3000);
                },
                error: function(xhr, err){
                    $btnSubmit.html(errorMessage);

                    setTimeout(function(){
                        $btnSubmit.html(defaultMessage);
                    }, 3000);
                }
            });
            
            e.preventDefault();
        });
    });
})(jQuery);
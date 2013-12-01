var Store = {
  
  defaults: {
    cutoffWidth: 768
  },
  
  init: function(page, options) {
    var inPreview = (/\/admin\/design/.test(top.location.pathname));
    var win = $(window);
    var width = $(document).width();
    
    options = $.extend(this.defaults, options);		
  
	  // hide images to prevent flicker
	  // $('#product_images img, #home_gallery img').hide();

	  // product detail controller
		$('#controller_description, #controller_inventory, #controller_share').on('click', function() {
			var controllers = '#product_description, #product_inventory, #product_share';
			var controller_id = '#' + $(this).attr('data');
	
			$(this).addClass('selected').siblings().removeClass('selected');
			
			$(controllers).hide();
			$(controller_id).fadeIn('slow');
						   	
			return false;
		});
		
		// product detail options button
		$('#options_button').on('click', function(event) {
		  event.preventDefault();		
			
			$('#options_menu').animate({
	      height: 'toggle',
	      opacity: 'toggle'
	    });
		});
		
		// open category or artists menu
		$('#filters div a').on('click', function(event) {
		  event.preventDefault();
			var active_list = '#' + $(this).attr('data');
			
			if ($('#filters .list').not(active_list).is(':visible')) {
				$('#filters .list').not(active_list).slideUp('slow', function() {
					$(active_list).animate({
		      	height: 'toggle',
						opacity: 'toggle'
					});	
				});	
			} else {
				$(active_list).animate({
	      	height: 'toggle',
					opacity: 'toggle'
				});						
			};
		});

		$('#nav_menu').click(function(event){
			event.preventDefault();
			
			$('html, body').css('overflow','hidden');
			$('.navigation.mobile').toggleClass('selected');
		});
		
		$('#close').click(function(event){
			event.preventDefault();
			
			$('html, body').css('overflow','auto');
			$('.navigation.mobile').toggleClass('selected');
		});		
  
    $('#content').imagesLoaded(function() {
      setTimeout(function() {
				
				// Isotope -- Masonry
				$('#products.masonry').isotope({
		  		itemSelector : '.product',
		  		layoutMode : 'masonry',
		  		resizable: true
		  		// masonry: { columnWidth: $('#products.masonry').width() / 3 }
				});
				
				$(window).smartresize(function(){
					$('#products.masonry').isotope({
						// update columnWidth to a percentage of container width
						// masonry: { columnWidth: $('#products.masonry').width() / 3 }
					});
				});				
				
				// Isotope -- fitRows
				$('#products.mixed').isotope({
		  		itemSelector : '.product',
		  		layoutMode : 'fitRows'
		  		//resizable: false		  		
				});
				
				// Fade in images to prevent flickering
		  	//$('#product_images img, #home_gallery img').fadeIn('slow');	 
		  	
		  	$('.slides').fadeIn('slow');
		  	
		  	if ( width < 768 ) {
					$('#product_images').flexslider({
				    animation: 'slide',
				    animationSpeed: 500,
				    directionNav: false,
				    slideshow: false,
				    animationLoop: false,
				    smoothHeight: true,
				    useCSS: false //temp css transition fix
					});
		  	} else {
					$('#product_images').flexslider({
				    animation: 'slide',
				    controlNav: 'thumbnails',
				    animationSpeed: 500,
				    directionNav: false,
				    slideshow: false,
				    animationLoop: false,
				    smoothHeight: true,
				    useCSS: false //temp css transition fix
					});			  	
		  	}
				
				// Initialize homepage gallery
				$('#home_gallery').flexslider({
			    animation: 'slide',
			    animationSpeed: 500,
			    directionNav: false,
			    slideshow: false,
			    animationLoop: false,			    
			    smoothHeight: true,
			    useCSS: false //temp css transition fix
				});
				// advance slideshow on click
				$('#home_gallery img').click(function(event) {
					$('#home_gallery').flexslider('next'); //Go to next slide
				});		
		
				$('#product_images').click(function(event) {
			  	event.preventDefault();
			    $(this).flexslider('next'); //Go to next slide
			  });       				   
      }, inPreview ? 50 : 0);
    });		  

 
 		 // Set up search toggle on click   
    if(options.showSearch) {
		  $('#search-form a').click(function(event) {
		    event.preventDefault();
		    $('#search-form input').fadeIn().focus();
		    $(this).addClass('selected');
		  });
		
		  $('#search-form input').blur(function(event) {
		    event.preventDefault();
		    $(this).fadeOut('fast');
		    $('#search-form a').removeClass('selected');
		  });	
    }	 
		
		// keep banner hidden if dismissed
		$('#banner').hide();
	  if($.cookie('banner') != 'x') {
    	$('#banner').show();
    };

		$('.dismiss').click(function(event) { 
			event.preventDefault();
			
			$(this).parent().animate({
	      height: 'toggle',
	      opacity: 'toggle'
	    });
	    
	    $.cookie('banner','x', {expires: 1});
			
		});
    
	  // Add focus to contact form inputs
	  $('#contact_form input, #contact_form textarea').blur(function(){
			$(this).parent().removeClass('selected');
		}) .focus(function() {		
			$(this).parent().addClass('selected');
		});    
		
		if(page == 'product') {
		  	  		  
		  $('#options_menu li a').on('click', function(event){
		  	event.preventDefault();

		    var option_id = $(this).attr('id');
		    $(this).parents('form').children('#option').attr('value', option_id);
		    $(this).parents('form').children('#product-addtocart').click();
		  }); 
		}

    if(page == 'cart') {
      var cartForm = $('#cart-form');
		
      $('#checkout-btn').click(function(event) {
        event.preventDefault();
        cartForm.append('<input type="hidden" name="checkout" value="1">').submit();
      });
      		
			$('.remove_item').click(function(event) {
			  event.preventDefault();
			  $(this).parent().find('.item_qty input').val(0);
			  cartForm.submit();
			});	
			
      cartForm.on('change keyup', '#country, #cart_discount_code, input', function() {
        $('.update-btn').addClass('updated');
      });				      
	  }	  
  }
};

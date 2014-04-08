/**
 //http://tympanus.net/Blueprints/HorizontalDropDownMenu/
 //Modified
 */
/**
 * cbpHorizontalMenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var dropDownMenu = (function() {

	var $listItems = $( '.fn_dropdown > ul > li'),
		$menuItems = $listItems.children( 'a' ),
		$body = $( 'body' ),
		$container = $('.sub-menu'),
		current = -1;

	function init() {
		$menuItems.on( 'click', open );
		
	}
	
	function open( event ) {

		if( current !== -1 ) {
			$listItems.eq( current ).removeClass( 'open' );
		}

		var $item = $( event.currentTarget ).parent( 'li' ),
			idx = $item.index();

		if( current === idx ) {
			$item.removeClass( 'open' );
			current = -1;
			
		}
		else {
			$item.addClass( 'open' );
			current = idx;
			//$body.off( 'click' ).on( 'click', close );
						
			$('.fn-close').on( 'click', close );
			//$listItems.on( 'blur', close );
			$(document).on('click',function (e){
				if ($container.has(e.target).length > 0)
				{
					//console.log('this container HAS been clicked');	 
				}
				else {
					close();
					//console.log('this container HAS NOT been clicked');
				}
			});
		}
		return false;
	}

	function close( event ) {
		$listItems.eq( current ).removeClass( 'open' );
		current = -1;
	}
	//To use from outside to close menu
	function closeMenu() {
		close();	
	}
	function openMenu() {
		open();	
	}
	
	return { init : init, closeMenu: closeMenu, openMenu: openMenu };

})();

var dropDownMenuAlternate = (function() {

	var $menuToggle = $('.fn_dropdown-alt'),
		$body = $( 'body' ),
		$container = $('.dropdown-alt ul li > .sub-menu'); 


	function init() {
		$menuToggle.change( open );
	}
	
	function open( event ) {
		
		var $item = $( event.currentTarget );

		if( $container.hasClass('is-open')) {
			$container.removeClass('is-open');
		
		}

		else {
			//$(this).addClass( 'open' );
			$container.addClass('is-open');
			console.log('do somethink');
			$('.fn-close').on( 'click', close );
			
		}
		
		return false;
	}

	function close( event ) {
		$menuToggle.removeAttr( 'checked' );
		$container.removeClass( 'is-open' );
			
	}
	//To use from outside to close menu
	function closeMenu() {
		close();	
	}
	function openMenu() {
		open();	
	}
	
	return { init : init, closeMenu: closeMenu, openMenu: openMenu };

})();
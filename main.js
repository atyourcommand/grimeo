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

})();;//https://github.com/Sam152/Javascript-Grids
(function($) {

  /**
   * Set all elements within the collection to have the same height.
   */
  $.fn.equalHeight = function(){
    var heights = [];
    $.each(this, function(i, element){
      $element = $(element);
      var element_height;
      // Should we include the elements padding in it's height?
      var includePadding = ($element.css('box-sizing') == 'border-box') || ($element.css('-moz-box-sizing') == 'border-box');
      if (includePadding) {
        element_height = $element.innerHeight();
		//console.log("must be border box");
      } else {
        element_height = $element.height();
      }
      heights.push(element_height);
    });
    this.height(Math.max.apply(window, heights));
    return this;
  }

  /**
   * Create a grid of equal height elements.
   */
  $.fn.equalHeightGrid = function(columns){
    var $tiles = this;
    $tiles.css('height', 'auto');
    for (var i = 0; i < $tiles.length; i++) {
      if (i % columns == 0) {
        var row = $($tiles[i]);
        for(var n = 1;n < columns;n++){
          row = row.add($tiles[i + n]);
        }
        row.equalHeight();
      }
    }
    return this;
  };

  /**
   * Detect how many columns there are in a given layout.
   */
  $.fn.detectGridColumns = function() {
    var offset = 0, cols = 0;
    this.each(function(i, elem) {
      var elem_offset = $(elem).offset().top;
      if (offset == 0 || elem_offset == offset) {
        cols++;
        offset = elem_offset;
      } else {
        return false;
      }
    });
    return cols;
  };

  /**
   * Ensure equal heights now, on ready, load and resize.
   */
  $.fn.responsiveEqualHeightGrid = function() {
    var _this = this;
    function syncHeights() {
      var cols = _this.detectGridColumns();
      //console.log(cols);
      _this.equalHeightGrid(cols);  
    }
    $(window).bind('resize load', syncHeights);
    syncHeights();
    return this;
  };

})(jQuery);;(function($) {
	$(document).ready(function() {
    
		$('.fn_assign_link .panel').on('click',function(e) {
		   e.stopPropagation();
		   console.log('working');
		   var thisHref = $(this).children('h3').children('a[data-attribute="link"]').attr('href');
		   var displayStatus = $(this).children('h3').children('a').attr('data-attribute');
			 if(displayStatus=="link")
			 {
				 $(this).children('a[data-attribute="link"]').click();
				 window.location.href = thisHref;
				 //console.log(displayStatus); 
			 }
		});
	
		$('body').on('mouseenter','.fn-add-hover',
		function(e){ 
			$(this).addClass('hover')
		});
		$('body').on('mouseleave','.fn-add-hover',
		function(e){
			 $(this).removeClass('hover')
		});
		
		$(window).load(function(){
			$('input').each(function() { 
				//console.log('this each function is working');
				$this = $(this);
				$label = $('label[for="'+ $this.attr('id') +'"]');
					if ($label.length > 0 ) {
					  if ($this.is(':checked'))
						$label.addClass('selected');
					  else
						$label.removeClass('selected');
					}
			});
		
		});
				
		$(document).on('change', 'input', function() { 
			//console.log('input change');
			$this = $(this);
			$label = $('label[for="'+ $this.attr('id') +'"]');
			
			//extra for radio to remove class from all labels others
			$radioName = $this.attr('name');
			$nearestLabel = $( 'input[name="'+$radioName+'"]' ).next('label');
			if ($this.attr('type') == 'radio') {
				//remove existing selected class first
				$nearestLabel.removeClass('selected');
			}
			//
			if ($this.is(':checked'))
			   $label.addClass('selected');
			else
			   $label.removeClass('selected');

		});
		
		//Adds .has-menu & adds or removes .show-menu when clicked
		var menuHelper = function() {
				
				$('.fn_menu-helper li').each(function(){
					var $childMenu = $('li > ul');	
					if($(this).find($childMenu).length > 0 ){
						$(this).addClass('has-menu');	
					}
				
				});
				
				//var $trigger = $this.children('a'); 
				$('.fn_menu-helper ul li a').bind('click',function(e){
					e.stopPropagation
					var $this = $(this);
					//console.log($this);
					var $listItem = $this.parent('li');
					var $listItemSiblings = $listItem.siblings();
					var $listItemWithClass = $listItem.filter('.show-menu');
					if ($listItemWithClass.length > 0){
						$listItem.removeClass('show-menu');
						console.log('remove class');
					} else {
						$listItem.addClass('show-menu');
						$listItemSiblings.removeClass('show-menu');
						console.log('add class');
					}
					return false;
				});
		}
		
		// Basic Accordion
		$('.accordion ul').hide();	
		$('.accordion li a').click(function (e) {
			
			var $list = $(this).parent().children('ul:first');
			var $otherLists = $(this).parent('li').siblings().children('ul');
			var $otherListsParent = $otherLists.parent('li');
			$list.slideToggle();
			$otherLists.slideUp();
			$otherListsParent.removeClass('show-menu');
			e.preventDefault();
		
		});
		
	   menuHelper();	
		//console.log('has menu function is running');
	
			
	});   
})(jQuery);;var loadingContent = (function(){
	
	
	function init(){
		console.log('loading content layer working');
	}
	
	var $inProgressBg = $('.in-progress-bg'); 
	var $inProgressMsg = $('.in-progress-msg'); 
		
	function start(message){
		var $loader = "<img src=\"images/misc/loading-small.gif\" class=\"\"/>";
		var $message = "<p>"+message+"</p>";
		var $items;
		$inProgressBg.addClass('show');	
		//console.log('state is starting');
		$items = "<div class=\"\">"+$loader+$message+"</div>" ;
		$inProgressMsg.html($items);
		return true;			
	}
	function end(message){
		$inProgressBg.removeClass('show');	
		$inProgressMsg.html('');
		return true;			
	}
	
	return { init: init, start: start, end : end };	
	
})();;(function ( $ ) {
    $.fn.FormCache = function( options ) {
        var settings = $.extend({
        }, options );
        
        function on_change(event) {
            var input = $(event.target);
            var key = input.parents('form:first').attr('name');
            var data = JSON.parse(localStorage[key]);
            
            if(input.attr('type') == 'checkbox') {
                data[input.attr('name')] = input.is(':checked');
			}else if (input.attr('type') == 'radio'){
				data[input.attr('id')] = input.is(':checked');
			
			}else {
                data[input.attr('name')] = input.val();
            }
            localStorage[key] = JSON.stringify(data);
        }
        
        return this.each(function() {    
            var element = $(this);
            
            if(typeof(Storage)!=="undefined"){
                var key = element.attr('name');
                
                var data = false;
                if(localStorage[key]) {
                    data = JSON.parse(localStorage[key]);
                }
                
                if(!data) {
                    localStorage[key] = JSON.stringify({});
                    data = JSON.parse(localStorage[key]);
                }
                element.find('input, select').change(on_change);
                
                element.find('input, select').each(function(e){
                    if($(this).attr('type') != 'submit') {
                        var input = $(this);
                        //var value = data[input.attr('name')];
                        if(input.attr('type') == 'checkbox') {
                            var value = data[input.attr('name')];
							if(value) {
                                input.attr('checked', input.prop('checked', true));
								//console.log('adding checkbox checked on', e );
                            } else {
                                input.removeAttr('checked');
								//console.log('removing checkbox checked on', e );
                            }
							
						} else if (input.attr('type') == 'radio'){
                        	var value = data[input.attr('id')];
							if(value) {
                                input.attr('checked', input.prop('checked', true));
								//console.log('adding radio checked on', e );
                            } else {
                                input.removeAttr('checked');
								//console.log('removing radio checked on', e );
                            }
						
						
						} else {
                            input.val(value);
                        }
                    }
                });
                
            }
            else {
                alert('local storage is not available');
            }
        });
    };     
}( jQuery ));/**
 * jQuery jPages v0.7
 * Client side pagination with jQuery
 * http://luis-almeida.github.com/jPages
 *
 * Licensed under the MIT license.
 * Copyright 2012 Luís Almeida
 * https://github.com/luis-almeida
 */
;
(function ($, window, document, undefined) {
    var name = "jPages",
        instance = null,
        defaults = {
            containerID: "",
            first: false,
            previous: "",
            next: "",
            last: false,
            links: "numeric",
            startPage: 1,
            perPage: 10,
            midRange: 5,
            startRange: 1,
            endRange: 1,
            keyBrowse: true,
            scrollBrowse: false,
            pause: 0,
            clickStop: false,
            delay: 50,
            direction: "forward",
            animation: "",
            fallback: 400,
            minHeight: true,
            callback: undefined, 
			adBlock: true
        };

    function Plugin(element, options) {
        this.options = $.extend({}, defaults, options);
        this._container = $("#" + this.options.containerID);
        if (!this._container.length) return;
        this.jQwindow = $(window);
        this.jQdocument = $(document);
        this._holder = $(element);
        this._nav = {};
        this._first = $(this.options.first);
        this._previous = $(this.options.previous);
        this._next = $(this.options.next);
        this._last = $(this.options.last);
        this._items = this._container.children(":visible");
        this._itemsShowing = $([]);
        this._itemsHiding = $([]);
        this._numPages = Math.ceil(this._items.length / this.options.perPage);
        this._currentPageNum = this.options.startPage;
        this._clicked = false;
        this._cssAnimSupport = this.getCSSAnimationSupport();
        this.init();
    }
    Plugin.prototype = {
        constructor: Plugin,
        getCSSAnimationSupport: function () {
            var animation = false,
                animationstring = 'animation',
                keyframeprefix = '',
                domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
                pfx = '',
                elm = this._container.get(0);
            if (elm.style.animationName) animation = true;
            if (animation === false) {
                for (var i = 0; i < domPrefixes.length; i++) {
                    if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                        pfx = domPrefixes[i];
                        animationstring = pfx + 'Animation';
                        keyframeprefix = '-' + pfx.toLowerCase() + '-';
                        animation = true;
                        break;
                    }
                }
            }
            return animation;
        },
        init: function () {
            this.setStyles();
            this.setNav();
            this.paginate(this._currentPageNum);
            this.setMinHeight();
        },
        setStyles: function () {
            var requiredStyles = "<style>" + ".jp-invisible { visibility: hidden !important; } " + ".jp-hidden { display: none !important; }" + "</style>";
            $(requiredStyles).appendTo("head");
            if (this._cssAnimSupport && this.options.animation.length) this._items.addClass("animated jp-hidden");
            else this._items.hide();
        },
        setNav: function () {
            var navhtml = this.writeNav();
            this._holder.each(this.bind(function (index, element) {
                var holder = $(element);
                holder.html(navhtml);
                this.cacheNavElements(holder, index);
                this.bindNavHandlers(index);
                this.disableNavSelection(element);
            }, this));
            if (this.options.keyBrowse) this.bindNavKeyBrowse();
            if (this.options.scrollBrowse) this.bindNavScrollBrowse();
        },
        writeNav: function () {
            var i = 1,
                navhtml;
            navhtml = this.writeBtn("first") + this.writeBtn("previous");
            for (; i <= this._numPages; i++) {
                if (i === 1 && this.options.startRange === 0) navhtml += "<span>...</span>";
                if (i > this.options.startRange && i <= this._numPages - this.options.endRange) navhtml += "<a href='#' class='jp-hidden'>";
                else
                    navhtml += "<a>";
                switch (this.options.links) {
                case "numeric":
                    navhtml += i;
                    break;
                case "blank":
                    break;
                case "title":
                    var title = this._items.eq(i - 1).attr("data-title");
                    navhtml += title !== undefined ? title : "";
                    break;
                }
                navhtml += "</a>";
                if (i === this.options.startRange || i === this._numPages - this.options.endRange) navhtml += "<span>...</span>";
            }
            navhtml += this.writeBtn("next") + this.adBlock() + this.writeBtn("last") + "</div>";
            return navhtml;
        },
        writeBtn: function (which) {
            return this.options[which] !== false && !$(this["_" + which]).length ? "<a class='jp-" + which + "'>" + this.options[which] + "</a>" : "";
        },
		//MOD JB
		adBlock: function (){
			var adBlockHtml = '<div id="ad-location-one"></div>';
			return adBlockHtml; 
		},
		//END MOD JB
        cacheNavElements: function (holder, index) {
            this._nav[index] = {};
            this._nav[index].holder = holder;
            this._nav[index].first = this._first.length ? this._first : this._nav[index].holder.find("a.jp-first");
            this._nav[index].previous = this._previous.length ? this._previous : this._nav[index].holder.find("a.jp-previous");
            this._nav[index].next = this._next.length ? this._next : this._nav[index].holder.find("a.jp-next");
            this._nav[index].last = this._last.length ? this._last : this._nav[index].holder.find("a.jp-last");
            this._nav[index].fstBreak = this._nav[index].holder.find("span:first");
            this._nav[index].lstBreak = this._nav[index].holder.find("span:last");
            this._nav[index].pages = this._nav[index].holder.find("a").not(".jp-first, .jp-previous, .jp-next, .jp-last");
            this._nav[index].permPages = this._nav[index].pages.slice(0, this.options.startRange).add(this._nav[index].pages.slice(this._numPages - this.options.endRange, this._numPages));
            this._nav[index].pagesShowing = $([]);
            this._nav[index].currentPage = $([]);
        },
        bindNavHandlers: function (index) {
            var nav = this._nav[index];
            nav.holder.bind("click.jPages", this.bind(function (evt) {
                var newPage = this.getNewPage(nav, $(evt.target));
                if (this.validNewPage(newPage)) {
                    this._clicked = true;
                    this.paginate(newPage);
                }
                evt.preventDefault();
            }, this));
            if (this._first.length) {
                this._first.bind("click.jPages", this.bind(function () {
                    if (this.validNewPage(1)) {
                        this._clicked = true;
                        this.paginate(1);
                    }
                }, this));
            }
            if (this._previous.length) {
                this._previous.bind("click.jPages", this.bind(function () {
                    var newPage = this._currentPageNum - 1;
                    if (this.validNewPage(newPage)) {
                        this._clicked = true;
                        this.paginate(newPage);
                    }
                }, this));
            }
            if (this._next.length) {
                this._next.bind("click.jPages", this.bind(function () {
                    var newPage = this._currentPageNum + 1;
                    if (this.validNewPage(newPage)) {
                        this._clicked = true;
                        this.paginate(newPage);
                    }
                }, this));
            }
            if (this._last.length) {
                this._last.bind("click.jPages", this.bind(function () {
                    if (this.validNewPage(this._numPages)) {
                        this._clicked = true;
                        this.paginate(this._numPages);
                    }
                }, this));
            }
        },
        disableNavSelection: function (element) {
            if (typeof element.onselectstart != "undefined") element.onselectstart = function () {
                return false;
            };
            else if (typeof element.style.MozUserSelect != "undefined") element.style.MozUserSelect = "none";
            else
                element.onmousedown = function () {
                    return false;
                };
        },
        bindNavKeyBrowse: function () {
            this.jQdocument.bind("keydown.jPages", this.bind(function (evt) {
                var target = evt.target.nodeName.toLowerCase();
                if (this.elemScrolledIntoView() && target !== "input" && target != "textarea") {
                    var newPage = this._currentPageNum;
                    if (evt.which == 37) newPage = this._currentPageNum - 1;
                    if (evt.which == 39) newPage = this._currentPageNum + 1;
                    if (this.validNewPage(newPage)) {
                        this._clicked = true;
                        this.paginate(newPage);
                    }
                }
            }, this));
        },
        elemScrolledIntoView: function () {
            var docViewTop, docViewBottom, elemTop, elemBottom;
            docViewTop = this.jQwindow.scrollTop();
            docViewBottom = docViewTop + this.jQwindow.height();
            elemTop = this._container.offset().top;
            elemBottom = elemTop + this._container.height();
            return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
        },
        bindNavScrollBrowse: function () {
            this._container.bind("mousewheel.jPages DOMMouseScroll.jPages", this.bind(function (evt) {
                var newPage = (evt.originalEvent.wheelDelta || -evt.originalEvent.detail) > 0 ? (this._currentPageNum - 1) : (this._currentPageNum + 1);
                if (this.validNewPage(newPage)) {
                    this._clicked = true;
                    this.paginate(newPage);
                }
                evt.preventDefault();
                return false;
            }, this));
        },
        getNewPage: function (nav, target) {
            if (target.is(nav.currentPage)) return this._currentPageNum;
            if (target.is(nav.pages)) return nav.pages.index(target) + 1;
            if (target.is(nav.first)) return 1;
            if (target.is(nav.last)) return this._numPages;
            if (target.is(nav.previous)) return nav.pages.index(nav.currentPage);
            if (target.is(nav.next)) return nav.pages.index(nav.currentPage) + 2;
        },
        validNewPage: function (newPage) {
            return newPage !== this._currentPageNum && newPage > 0 && newPage <= this._numPages;
        },
        paginate: function (page) {
            var itemRange, pageInterval;
            itemRange = this.updateItems(page);
            pageInterval = this.updatePages(page);
            this._currentPageNum = page;
            if ($.isFunction(this.options.callback)) this.callback(page, itemRange, pageInterval);
            this.updatePause();
        },
        updateItems: function (page) {
            var range = this.getItemRange(page);
            this._itemsHiding = this._itemsShowing;
            this._itemsShowing = this._items.slice(range.start, range.end);
            if (this._cssAnimSupport && this.options.animation.length) this.cssAnimations(page);
            else this.jQAnimations(page);
            return range;
        },
        getItemRange: function (page) {
            var range = {};
            range.start = (page - 1) * this.options.perPage;
            range.end = range.start + this.options.perPage;
            if (range.end > this._items.length) range.end = this._items.length;
            return range;
        },
        cssAnimations: function (page) {
            clearInterval(this._delay);
            this._itemsHiding.removeClass(this.options.animation + " jp-invisible").addClass("jp-hidden");
            this._itemsShowing.removeClass("jp-hidden").addClass("jp-invisible");
            this._itemsOriented = this.getDirectedItems(page);
            this._index = 0;
            this._delay = setInterval(this.bind(function () {
                if (this._index === this._itemsOriented.length) clearInterval(this._delay);
                else {
                    this._itemsOriented.eq(this._index).removeClass("jp-invisible").addClass(this.options.animation);
                }
                this._index = this._index + 1;
            }, this), this.options.delay);
        },
        jQAnimations: function (page) {
            clearInterval(this._delay);
            this._itemsHiding.addClass("jp-hidden");
            this._itemsShowing.fadeTo(0, 0).removeClass("jp-hidden");
            this._itemsOriented = this.getDirectedItems(page);
            this._index = 0;
            this._delay = setInterval(this.bind(function () {
                if (this._index === this._itemsOriented.length) clearInterval(this._delay);
                else {
                    this._itemsOriented.eq(this._index).fadeTo(this.options.fallback, 1);
                }
                this._index = this._index + 1;
            }, this), this.options.delay);
        },
        getDirectedItems: function (page) {
            var itemsToShow;
            switch (this.options.direction) {
            case "backwards":
                itemsToShow = $(this._itemsShowing.get().reverse());
                break;
            case "random":
                itemsToShow = $(this._itemsShowing.get().sort(function () {
                    return (Math.round(Math.random()) - 0.5);
                }));
                break;
            case "auto":
                itemsToShow = page >= this._currentPageNum ? this._itemsShowing : $(this._itemsShowing.get().reverse());
                break;
            default:
                itemsToShow = this._itemsShowing;
            }
            return itemsToShow;
        },
        updatePages: function (page) {
            var interval, index, nav;
            interval = this.getInterval(page);
            for (index in this._nav) {
                if (this._nav.hasOwnProperty(index)) {
                    nav = this._nav[index];
                    this.updateBtns(nav, page);
                    this.updateCurrentPage(nav, page);
                    this.updatePagesShowing(nav, interval);
                    this.updateBreaks(nav, interval);
                }
            }
            return interval;
        },
        getInterval: function (page) {
            var neHalf, upperLimit, start, end;
            neHalf = Math.ceil(this.options.midRange / 2);
            upperLimit = this._numPages - this.options.midRange;
            start = page > neHalf ? Math.max(Math.min(page - neHalf, upperLimit), 0) : 0;
            end = page > neHalf ? Math.min(page + neHalf - (this.options.midRange % 2 > 0 ? 1 : 0), this._numPages) : Math.min(this.options.midRange, this._numPages);
            return {
                start: start,
                end: end
            };
        },
        updateBtns: function (nav, page) {
            if (page === 1) {
                nav.first.addClass("jp-disabled");
                nav.previous.addClass("jp-disabled");
            }
            if (page === this._numPages) {
                nav.next.addClass("jp-disabled");
                nav.last.addClass("jp-disabled");
            }
            if (this._currentPageNum === 1 && page > 1) {
                nav.first.removeClass("jp-disabled");
                nav.previous.removeClass("jp-disabled");
            }
            if (this._currentPageNum === this._numPages && page < this._numPages) {
                nav.next.removeClass("jp-disabled");
                nav.last.removeClass("jp-disabled");
            }
        },
        updateCurrentPage: function (nav, page) {
            nav.currentPage.removeClass("jp-current");
            nav.currentPage = nav.pages.eq(page - 1).addClass("jp-current");
        },
        updatePagesShowing: function (nav, interval) {
            var newRange = nav.pages.slice(interval.start, interval.end).not(nav.permPages);
            nav.pagesShowing.not(newRange).addClass("jp-hidden");
            newRange.not(nav.pagesShowing).removeClass("jp-hidden");
            nav.pagesShowing = newRange;
        },
        updateBreaks: function (nav, interval) {
            if (interval.start > this.options.startRange || (this.options.startRange === 0 && interval.start > 0)) nav.fstBreak.removeClass("jp-hidden");
            else nav.fstBreak.addClass("jp-hidden"); if (interval.end < this._numPages - this.options.endRange) nav.lstBreak.removeClass("jp-hidden");
            else nav.lstBreak.addClass("jp-hidden");
        },
        callback: function (page, itemRange, pageInterval) {
            var pages = {
                current: page,
                interval: pageInterval,
                count: this._numPages
            }, items = {
                    showing: this._itemsShowing,
                    oncoming: this._items.slice(itemRange.start + this.options.perPage, itemRange.end + this.options.perPage),
                    range: itemRange,
                    count: this._items.length
                };
            pages.interval.start = pages.interval.start + 1;
            items.range.start = items.range.start + 1;
            this.options.callback(pages, items);
        },
        updatePause: function () {
            if (this.options.pause && this._numPages > 1) {
                clearTimeout(this._pause);
                if (this.options.clickStop && this._clicked) return;
                else {
                    this._pause = setTimeout(this.bind(function () {
                        this.paginate(this._currentPageNum !== this._numPages ? this._currentPageNum + 1 : 1);
                    }, this), this.options.pause);
                }
            }
        },
        setMinHeight: function () {
            if (this.options.minHeight && !this._container.is("table, tbody")) {
                setTimeout(this.bind(function () {
                    this._container.css({
                        "min-height": this._container.css("height")
                    });
                }, this), 1000);
            }
        },
        bind: function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        },
        destroy: function () {
            this.jQdocument.unbind("keydown.jPages");
            this._container.unbind("mousewheel.jPages DOMMouseScroll.jPages");
            if (this.options.minHeight) this._container.css("min-height", "");
            if (this._cssAnimSupport && this.options.animation.length) this._items.removeClass("animated jp-hidden jp-invisible " + this.options.animation);
            else this._items.removeClass("jp-hidden").fadeTo(0, 1);
            this._holder.unbind("click.jPages").empty();
        }
    };
    $.fn[name] = function (arg) {
        var type = $.type(arg);
        if (type === "object") {
            if (this.length && !$.data(this, name)) {
                instance = new Plugin(this, arg);
                this.each(function () {
                    $.data(this, name, instance);
                });
            }
            return this;
        }
        if (type === "string" && arg === "destroy") {
            instance.destroy();
            this.each(function () {
                $.removeData(this, name);
            });
            return this;
        }
        if (type === 'number' && arg % 1 === 0) {
            if (instance.validNewPage(arg)) instance.paginate(arg);
            return this;
        }
        return this;
    };
})(jQuery, window, document);;/*Add Adsense code to the dom*/
var appendAdCode = (function(){
	
	function init(){
		//console.log('loading ads to content');
	}
	
	function loadAds (){
		setTimeout(function (){
			
			var $adsense1 = '<div class="ad-spot-header"><script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:234px;height:60px"data-ad-client="ca-pub-9333805017415789"data-ad-slot="7244347139"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>'
			var $adsense2 = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:120px;height:90px" data-ad-client="ca-pub-9333805017415789" data-ad-slot="4519063136"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
			
			var adSpotOne = $('#ad-location-one');
			var adBlockOne = '<div class="ad-block-one">'+$adsense1+'</div>';
			var adBlockTwo = '<div class="ad-block-one">'+$adsense2+'</div>';
			//adSpotOne.hide().html(adBlockOne).fadeIn('2000');	
			
			$(window).resize(function(){     
			   if ($('header').width() <= 480 ){
					adSpotOne.html(''); 
					adSpotOne.html(adBlockTwo); 
			   } else {
					adSpotOne.html(''); 
					adSpotOne.html(adBlockOne);   
			   }
			});
			
					
		
		}, 10000);
	}
	
	return {loadAds: loadAds, init: init}
	
})();



;/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

//Modified added display properties to animated states


(function($) {

/*---------------------------
 Defaults for Reveal
----------------------------*/
	 
/*---------------------------
 Listener for data-reveal-id attributes
----------------------------*/

	$('a[data-reveal-id]').live('click', function(e) {
		e.preventDefault();
		var modalLocation = $(this).attr('data-reveal-id');
		$('#'+modalLocation).reveal($(this).data());
		
		//Mod JB
		var $assetId = $(this).attr('data-asset-id');
		var $videoMode = $(this).attr('data-video-mode');
		var $thisModal = $('#' + modalLocation);
		$thisModal.attr('data-asset-id', $assetId);
		$thisModal.attr('data-video-mode', $videoMode);
		//
	});

/*---------------------------
 Extend and Execute
----------------------------*/

    $.fn.reveal = function(options) {
        
        
        var defaults = {  
	    	animation: 'fadeAndPop', //fade, fadeAndPop, none
		    animationspeed: 300, //how fast animtions are
		    closeonbackgroundclick: true, //if you click background will modal close?
		    dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
    	}; 
    	
        //Extend dem' options
        var options = $.extend({}, defaults, options); 
	
        return this.each(function() {
        
/*---------------------------
 Global Variables
----------------------------*/
        	var modal = $(this),
        		topMeasure  = parseInt(modal.css('top')),
				topOffset = modal.height() + topMeasure,
          		locked = false,
				modalBG = $('.reveal-modal-bg');

/*---------------------------
 Create Modal BG
----------------------------*/
			if(modalBG.length == 0) {
				modalBG = $('<div class="reveal-modal-bg" />').insertAfter(modal);
			}		    
     
/*---------------------------
 Open & Close Animations
----------------------------*/
			//Entrance Animations
			modal.bind('reveal:open', function () {
			  modalBG.unbind('click.modalEvent');
				$('.' + options.dismissmodalclass).unbind('click.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modal.css({'top': $(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible', 'display':'block'});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"top": $(document).scrollTop()+topMeasure + 'px',
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					}
					if(options.animation == "fade") {
						modal.css({'opacity' : 0, 'visibility' : 'visible', 'display':'block', 'top': $(document).scrollTop()+topMeasure});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					} 
					if(options.animation == "none") {
						modal.css({'visibility' : 'visible', 'top':$(document).scrollTop()+topMeasure});
						modalBG.css({"display":"block"});	
						unlockModal()				
					}
				}
				modal.unbind('reveal:open');
			}); 	

			//Closing Animation
			modal.bind('reveal:close', function () {
			  if(!locked) {
					lockModal();
					$('.video-container').html('');//JB
					if(options.animation == "fadeAndPop") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  $(document).scrollTop()-topOffset + 'px',
							"opacity" : 0
						}, options.animationspeed/2, function() {
							modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden', 'display':'none'});
							unlockModal();
						});					
					}  	
					if(options.animation == "fade") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"opacity" : 0
						}, options.animationspeed, function() {
							modal.css({'opacity' : 1, 'visibility' : 'hidden', 'display':'none','top' : topMeasure});
							unlockModal();
						});					
					}  	
					if(options.animation == "none") {
						modal.css({'visibility' : 'hidden', 'top' : topMeasure});
						modalBG.css({'display' : 'none'});	
					}		
				}
				modal.unbind('reveal:close');
			});     
   	
/*---------------------------
 Open and add Closing Listeners
----------------------------*/
        	//Open Modal Immediately
    	modal.trigger('reveal:open')
			
			//Close Modal Listeners
			var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
			  modal.trigger('reveal:close')
			});
			
			if(options.closeonbackgroundclick) {
				modalBG.css({"cursor":"pointer"})
				modalBG.bind('click.modalEvent', function () {
				  modal.trigger('reveal:close')
				});
			}
			$('body').keyup(function(e) {
        		if(e.which===27){ modal.trigger('reveal:close'); } // 27 is the keycode for the Escape key
			});
			
			
/*---------------------------
 Animations Locks
----------------------------*/
			function unlockModal() { 
				locked = false;
			}
			function lockModal() {
				locked = true;
			}	
			
        });//each call
    }//orbit plugin call
})(jQuery);
        
;(function ($) {
    $.fn.SavedList = function( options ) {
        var settings = $.extend({
        }, options );		
			
				var element = $(this),
				$list = $('#show-items'),
				$listItem = $list.find('li'),
				tasks = '',
				key = 'favourites',
				key2 = element.attr('name'),
				$btnClear = $('#clear-all'),
				$deleteLink = '<a href="#" class="button closer">Remove</a>',
				newData = ''; 
			
			//Build list function
			var buildList = (function(){
				$.each(data, function(index, value) {
					$($list).append('<li id=\"'+ value.assetId +'\"><img src='+ value.assetImage +'/>' + value.assetName + $deleteLink + '</li>');	
				});
			});
			
			//Get existing data for list from local storage
			var data = localStorage.getItem(key);
			if (data != null) {
				data = JSON.parse(data);
			} else {
				data = new Array();
			} 
			buildList(); //Build list on load of page
			
			function on_change(event){
				var input = $(event.target),
					isChecked = input.is(':checked');
					$id = input.attr('id'),
					$name = input.attr('name'),
					assetName = input.attr('data-asset-name'),	
					assetValue  = input.val(),
					posterPath = input.attr('data-asset-poster-path'),
					$assetImage = '<img src='+ posterPath +'/>',
					$assetName = assetName,
					newItem = '<li id=\"'+$id+'\">' + $assetImage + $assetName + $deleteLink +'</li>'; 
				
				var checkedData = (function (){
					
					var dataChecked = JSON.parse(localStorage[key2]);
					dataChecked[input.attr('name')] = input.is(':checked');
					console.log('this is the data' + dataChecked);
					localStorage[key2] = JSON.stringify(dataChecked);
				
				})();
								
				//Favourites List data from input
				var tempData = {"assetId":$id, "assetName":assetName, "assetImage":posterPath};
					//Get existing from local storage
					var data = localStorage.getItem(key);
					if (data != null) {
					data = JSON.parse(data);
					} else {
					data = new Array();
					}
					
					//Function to remove an item from the Favourites List and Local Storage
					var removeItem = function(itemId){
						var $listItemWithId = $list.find('#' + itemId);
						$listItemWithId.remove();
						var newData = data.filter(function(jsonObject) { return jsonObject.assetId != $id;});
						console.log('new data is' + newData);
						localStorage.removeItem(key);
						data.push(newData);
						localStorage.setItem(key, JSON.stringify(newData));

					}
										
					if (isChecked === true){
						//add new
						data.push(tempData);
						localStorage.setItem(key, JSON.stringify(data));
						$list.append(newItem);//adds to list
					} else {
						
						removeItem($id); //remove from the list
					}
					
			}
			
			return this.each(function(){    
				var element = $(this);
				
				if(typeof(Storage)!=="undefined"){
						
						var dataChecked = false;
						if(localStorage[key2]) {
							dataChecked = JSON.parse(localStorage[key2]);
						}
						
						if(!dataChecked) {
							localStorage[key2] = JSON.stringify({});
							dataChecked = JSON.parse(localStorage[key2]);
						}
						
						element.find('input').change(on_change);
						
						element.find('input').each(function(e){
							if($(this).attr('type') != 'submit') {
								var input = $(this);
								var value = dataChecked[input.attr('name')];
								if(value) {
									input.attr('checked', input.prop('checked', true));
									//console.log('has a value' + value );
								} else {
									input.removeAttr('checked');
									//console.log('no value');
								}
							}
						});
						
						//clear the html of the list
						$btnClear.click(function(e){
							localStorage.removeItem(key);
							$list.html( '' );
							e.preventDefault();
					
						});
						
						//click function to make of item as complete or remove it
						 $listItem.find('.closer').live('click',function(e){
							var $listItem = $(this).parent('li');
							
							if ($listItem.hasClass('task-complete')){
								$(this).closest('li').fadeOut('slow').remove();
								//localStorage.setItem('tasks', tasks);
								//console.log('condition 1');
					
							} else {
								$listItem.addClass('task-complete');
								//console.log('condition 2');
							}
							e.preventDefault();
					
						});
				}
				else {
					alert('local storage is not available');
				}		
			});
			
    };     
}(jQuery))		;var swapText = (function (){
			
	var $swapItem = $('.fn-change-text');
	var $spanFirst = $swapItem.children('span').eq(0);
	var $spanSecond = $swapItem.children('span').eq(1);
	var $item,
	current = -1;
	
	function init(){
		$swapItem.on('click',open)	
	}
	
	function open (event){
		
		var $item = $(event.currentTarget);
		var idx = $item.index();
				
		if( current !== -1 ) {
			$swapItem.eq( current ).removeClass( 'open' );	
			//console.log('current is not -1');
		} 
		
		if( current === idx ) {
			$swapItem.removeClass( 'open' );
			current = -1;
			//console.log('current is ' + idx);
			$spanFirst.addClass('fade-in');
			$spanSecond.removeClass('fade-in');
			
		} else {
			$swapItem.addClass( 'open' );
			$spanFirst.removeClass('fade-in');
			$spanSecond.addClass('fade-in');
			current = idx;
		}
		
		return false	
	}
	function close (event){
		$swapItem.removeClass( 'open' );
		$spanFirst.addClass('fade-in');
		$spanSecond.removeClass('fade-in');
		current = -1;
	}
	function swap(){
		open();	
	}
	function revert(){
		close();	
	}
	
	return {init:init, swap:swap, revert:revert}
		
})();

;$(function() {
	//With ajax content need to wait for all events for some of these listeners
	$(window).load(function(){    
		
		var $header = $('.not-in-use');
		$(window).scroll(function () {
		   if(scrollY <= 0){
			   //$header.removeClass('content-scroll');
			   $header.animate({
					opacity: 1,
			   }, 500);
		   }
		   if(scrollY > 0 && $header.is(':not(:animated)')){
			   //$header.addClass('content-scroll');
			   $header.animate({
					opacity: .5,
			   }, 500);
		   }
		});
		
		$('.fn-toggle-control').click(function(){
			var $userControl = $(this).closest('.result').find('.control');
			var $userOptions = $(this).closest('.result').find('.user-options');
			$userControl.fadeToggle();
			$userOptions.fadeToggle();
			return false;
			//console.log('clicked');
		
		});
		
		$('.fn-expand-panel').click(function(){
			var $icon = $(this).children('i:first');
			var $panelColumn = $(this).closest('.result').parent('.column');
			var $otherPanelColumns = $panelColumn.siblings('.column');	
			$panelColumn.toggleClass('panel-full-width');
			$otherPanelColumns.removeClass('panel-full-width');
			$icon.toggleClass('fa-compress');
			
			scrollTop($(this));
			return false;
		});
				
		var uiOptions = (function(){
			var	$body = $( 'body' ),
		
			$header = $('header'),
			$search = $('.search');
			$searchMovie = $('.search-movie');
			$searchTv = $('.search-tv'),
			$userOptions = $('.options'),
			$logo = $('.logo'),
			$genreInput = $('input[name="options[4_A]"]'),
			$genreInputLabel = $('input[name="options[4_A]"]').next('label');
			
			//Add class after a delay
			(function (){
				var $this = $(this),
					timer = $this.data("timer") || 0;
				
				clearTimeout(timer);
				//add something 
				timer = setTimeout(function() {
					$header.addClass("search-active");
					//$logo.removeClass('logos-logo');
					//$logo.addClass('logos-logo-mobile');	
				}, 2000); // 2000 is in mil sec eq to 2 sec.
		
				$this.data("timer", timer);
			})();
			
			var $uiOption = $('input[name="options[1]"]', '.ui-options');
				
			$uiOption.change(function(){
				
				var $uiOptionChecked = $('input[name="options[1]"]:checked', '.ui-options').val();
				//console.log($uiOptionChecked);	
				if ($uiOptionChecked === 'movies'){
					$header.addClass('search-active');
					//$logo.removeClass('logos-logo');
					//$logo.addClass('logos-logo-mobile');
					$searchMovie.delay('400').addClass('show');
					$('.options-nav').addClass('show');
					$searchTv.removeClass('show');
					$genreInput.prop('disabled', false);
					$genreInputLabel.removeClass('disabled');
					$search.delay('400').fadeIn('slow');
					
				} else if ($uiOptionChecked === 'tv'){
					$header.addClass('search-active');
					//$logo.removeClass('logos-logo');
					//$logo.addClass('logos-logo-mobile');
					$searchMovie.removeClass('show');
					$searchTv.delay('400').addClass('show');
					$('.options-nav').removeClass('show');
					$genreInput.prop('disabled', true);
					$genreInputLabel.addClass('disabled');
					$search.delay('400').fadeIn('slow');
				
				} else {
					//$header.removeClass('search-active');
					//$header.addClass('search-active');
					//$searchMovie.removeClass('show');
					//$searchTv.removeClass('show');
					//$search.hide();
					//$('.options-nav').removeClass('show');
					//$userOptions.delay('400').fadeIn('slow');
				}
					
			});
			
			$('input[name="options[3_A]"]').change(function(){
				if ($userOptions.css("display") == "none")
				$userOptions.slideDown('fast');
				else
				$userOptions.slideUp('fast');
			});
			
			//Add a class and remove it to preview something
			var previewFeature = function ($target){
				$target.addClass('preview');			
				setTimeout(function(){
					$target.removeClass('preview');	
				}, 1000);
			}
			
			//User option radio options to change classes
			var $userOptionOne = $('input[name="options[2_A]"]', '.user-options');
			//console.log($userOptionThree);
			if ($userOptionOne.attr('checked')){
				//$body.addClass('show-trailers')
				//console.log('is checked');	
			}else{
				//$body.removeClass('show-trailers')
				//console.log('is not checked');	
			}
			$userOptionOne.change(function(){
				$body.toggleClass('show-trailers');
				previewFeature($body);
			});
			
			var $userOptionTwo = $('input[name="options[2_B]"]', '.user-options');
			if ($userOptionTwo.attr('checked') && !$userOptionTwo.attr('disabled')){
				$body.addClass('show-adult')
				//console.log('is checked');	
			}else{
				$body.removeClass('show-adult')
				//console.log('is not checked');	
			}			
			$userOptionTwo.change(function(){
				$header.toggleClass('show-adult');
			});
			
			//Favourites Check Box Option
			var $userOptionThree = $('input[id="2_C"]', '.user-options');
			//console.log($userOptionThree);
			if ($userOptionThree.attr('checked')){
				$body.addClass('show-favourites')
				//console.log('is checked');	
			}else{
				$body.removeClass('show-favourites')
				//console.log('is not checked');	
			}
			$userOptionThree.change(function(){
				$body.toggleClass('show-favourites');
			});
			
							
		});
		
		uiOptions();
	});	
});
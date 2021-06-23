/* ===================================
    About
====================================== */

/*
    Theme Name: MegaOne
    Theme URI:
    Author: Themes Industry
    Author URI:
    Description: One Page , Multi Parallax Template
    Tags: one page, multi page, multipurpose, parallax, creative, html5

 */

//PAGE LOADER
$(window).on("load", function () {
    "use strict";
    $(".loader").fadeOut(800);
    $('.side-menu').removeClass('opacity-0');
});


jQuery($=> {
    "use strict";
    let $window = $(window);
    let body = $("body");
    let $root = $("html, body");
    $('[data-toggle="tooltip"]').tooltip();

    //Contact Us
    $("#submit_btn").on(' click', function () {
        let userName = $('input[name=userName]').val();
        let userEmail = $('input[name=email]').val();
        let companyName = $('input[name=companyName]').val();

        //simple validation at client's end
        let postData, output;
        let proceed = true;
        if (userName === "") {
            proceed = false;
        }
        if (userEmail === "") {
            proceed = false;
        }


        if (companyName === "") {
            proceed = false;
        }
        //everything looks good! proceed...
        if (proceed) {

            //data to be sent to server
            postData = {
                'userName': userName,
                'userEmail': userEmail,
                'userMessage': companyName
            };

            //Ajax post data to server
            $.post('contact.php', postData, function (response) {
                //load json data from server and output message
                if (response.type === 'error') {
                    output = '<div class="alert-danger" style="padding:10px; margin-bottom:25px;">' + response.text + '</div>';
                } else {
                    output = '<div class="alert-success" style="padding:10px; margin-bottom:25px;">' + response.text + '</div>';
                    //reset values in all input fields
                    $('.getin_form input').val('');
                    $('.getin_form textarea').val('');

                }

                $("#result").slideUp("fast").html(output).slideDown();
            }, 'json');

        } else {
            output = '<div class="alert-danger" style="padding:10px; margin-bottom:25px;">Please provide the missing fields.</div>';
            $("#result").slideUp("fast").html(output).slideDown();
        }

    });
    /*rating stars*/
    let fadeInStar = ()=> {
        let starItem = $('#rattingIcon .fa-star.fas');
        starItem.addClass('scale-star');
        setTimeout(function () {
            starItem.removeClass('scale-star');
        }, 180);
    };
    let ratingText = $('#ratingText');

    let fadeInStarText = n => {
        ratingText.addClass('scale-price');
        setTimeout(function () {
            ratingText.removeClass('scale-price');
            switch (n) {
                case 0:
                    ratingText.text('Poor!');
                    break;
                case 1:
                    ratingText.text('Average!');
                    break;
                case 2:
                    ratingText.text('Good!');
                    break;
                case 3:
                    ratingText.text('Very Good!');
                    break;
                case 4:
                    ratingText.text('Excellent!');
            }
        }, 180);
    };

    $("#rattingIcon .fa-star").on('click', function () {
        let iconIndex = $(this).index();
        $(this).addClass("fas").removeClass("far");
        $(this).prevAll().addClass("fas").removeClass("far");
        $(this).nextAll().addClass("far").removeClass("fas");
        fadeInStar();
        fadeInStarText(iconIndex);
    });


    /*----- shop detail Tabs init -----*/
    $(function () {
        initTabsToAccordion();
    });

    function initTabsToAccordion() {
        var animSpeed = 500;
        var win = $(window);
        var isAccordionMode = true;
        var tabWrap = $(".tab-to-accordion");
        var tabContainer = tabWrap.find(".tab-container");
        var tabItem = tabContainer.children("div[id]");
        var tabsetList = tabWrap.find(".tabset-list");
        var tabsetLi = tabsetList.find("li");
        var tabsetItem = tabsetList.find("a");
        var activeId = tabsetList
            .find(".active")
            .children()
            .attr("href");
        cloneTabsToAccordion();
        accordionMode();
        tabsToggle();
        hashToggle();
        win.on("resize orientationchange", accordionMode);

        function cloneTabsToAccordion() {
            $(tabsetItem).each(function () {
                var $this = $(this);
                var activeClass = $this.parent().hasClass("active");
                var listItem = $this.attr("href");
                var listTab = $(listItem);
                if (activeClass) {
                    var activeClassId = listItem;
                    listTab.show();
                }
                var itemContent = $this.clone();
                var itemTab = $this.attr("href");
                if (activeClassId) {
                    itemContent
                        .insertBefore(itemTab)
                        .wrap('<div class="accordion-item active"></div>');
                } else {
                    itemContent
                        .insertBefore(itemTab)
                        .wrap('<div class="accordion-item"></div>');
                }
            });
        }

        function accordionMode() {
            var liWidth = Math.round(tabsetLi.outerWidth());
            var liCount = tabsetLi.length;
            var allLiWidth = liWidth * liCount;
            var tabsetListWidth = tabsetList.outerWidth();
            if (tabsetListWidth <= allLiWidth) {
                isAccordionMode = true;
                tabWrap.addClass("accordion-mod");
            } else {
                isAccordionMode = false;
                tabWrap.removeClass("accordion-mod");
            }
        }

        function tabsToggle() {
            tabItem.hide();
            $(activeId).show();
            $(tabWrap).on("click", 'a[href^="#tab"]', function (e) {
                e.preventDefault();
                var $this = $(this);
                var activeId = $this.attr("href");
                var activeTabSlide = $(activeId);
                var activeOpener = tabWrap.find('a[href="' + activeId + '"]');
                $('a[href^="#tab"]')
                    .parent()
                    .removeClass("active");
                activeOpener.parent().addClass("active");
                if (isAccordionMode) {
                    tabItem.stop().slideUp(animSpeed);
                    activeTabSlide.stop().slideDown(animSpeed);
                } else {
                    tabItem.hide();
                    activeTabSlide.show();
                }
            });
        }

        function hashToggle() {
            var hash = location.hash;
            var activeId = hash;
            var activeTabSlide = $(activeId);
            var activeOpener = tabWrap.find('a[href="' + activeId + '"]');
            if ($(hash).length > 0) {
                $('a[href^="#tab"]')
                    .parent()
                    .removeClass("active");
                activeOpener.parent().addClass("active");
                tabItem.hide();
                activeTabSlide.show();
                win
                    .scrollTop(activeTabSlide.offset().top)
                    .scrollLeft(activeTabSlide.offset().left);
            }
        }
    }

    /* ----- Back to Top ----- */
    $(body).append('<a href="#" class="back-top"><i class="fa fa-angle-up"></i></a>');
    let amountScrolled = 700;
    let backBtn = $("a.back-top");
    $window.on("scroll", function () {
        if ($window.scrollTop() > amountScrolled) {
            backBtn.addClass("back-top-visible");
        } else {
            backBtn.removeClass("back-top-visible");
        }
    });
    backBtn.on("click", function () {
        $root.animate({
            scrollTop: 0
        }, 700);
        return false;
    });

    /* ------- Smooth scroll ------- */
    $("a.pagescroll").on("click", function (event) {
        event.preventDefault();
        let action = $(this.hash).offset().top;
        if ($('body').hasClass('offset-nav'))
            action -= 70;
        if($(this).hasClass('scrollupto'))
            action-=65;
        $("html,body").animate({
            scrollTop: action
        }, 1200);
    });

    /* ------- navbar menu Position dynamically ------- */
    $(".dropdown").on("mouseenter", function () {
        let $elem = $(this).find('.dropdown-menu'),
            left = $elem.offset().left,
            width = $elem.width(),
            docW = $(window).width();

        if ((left + width) > docW) {
            $elem.addClass("right-show");
        } else if ((left + (width * 2)) < docW) {
            $elem.removeClass("right-show");
        }
    });

    /*------ Sticky MENU Fixed ------*/
    let headerHeight = $("header").outerHeight();
    let navbar = $("nav.navbar");
    if (navbar.not('.fixed-bottom').hasClass("static-nav")) {
        $window.scroll(function () {
            let $scroll = $window.scrollTop();
            let $navbar = $(".static-nav");
            let nextSection = $(".section-nav-smooth");
            if ($scroll > 120) {
                $navbar.addClass("fixedmenu mt-0");
                nextSection.css("margin-top", headerHeight);
            } else {
                $navbar.removeClass("fixedmenu mt-0");
                nextSection.css("margin-top", 0);
            }
        });
        $(function () {
            if ($window.scrollTop() >= $(window).height()) {
                $(".static-nav").addClass('fixedmenu');
            }
        })
    }
    if (navbar.hasClass("fixed-bottom")) {
        let navTopMargin = $(".fixed-bottom").offset().top;
        let scrollTop = $window.scrollTop();
        $(window).scroll(function () {
            if ($(window).scrollTop() > navTopMargin) {
                $('.fixed-bottom').addClass('fixedmenu');
            } else {
                $('.fixed-bottom').removeClass('fixedmenu');
            }
            if ($(window).scrollTop() < 260) {
                $('.fixed-bottom').addClass('menu-top');
            } else {
                $('.fixed-bottom').removeClass('menu-top');
            }
        });
        $(function () {
            if (scrollTop < 230) {
                $('.fixed-bottom').addClass('menu-top');
            } else {
                $('.fixed-bottom').removeClass('menu-top');
            }
            if (scrollTop >= $(window).height()) {
                $('.fixed-bottom').addClass('fixedmenu');
            }
        })
    }
    /*Menu Onclick*/
    let sideMenuToggle = $("#sidemenu_toggle");
    let sideMenu = $(".side-menu");
    if (sideMenuToggle.length) {
        sideMenuToggle.on("click", function () {
            $("body").addClass("overflow-hidden");
            sideMenu.addClass("side-menu-active");
            $(function () {
                setTimeout(function () {
                    $("#close_side_menu").fadeIn(300);
                }, 300);
            });
        });
        $("#close_side_menu , #btn_sideNavClose , .side-nav .nav-link.pagescroll").on("click", function () {
            $("body").removeClass("overflow-hidden");
            sideMenu.removeClass("side-menu-active");
            $("#close_side_menu").fadeOut(200);
            $(function () {
                setTimeout(function () {
                    $('.sideNavPages').removeClass('show');
                    $('.fas').removeClass('rotate-180');
                }, 400);
            });
        });
        $(document).keyup(function (e) {
            if (e.keyCode === 27) { // escape key maps to keycode `27`
                if (sideMenu.hasClass("side-menu-active")) {
                    $("body").removeClass("overflow-hidden");
                    sideMenu.removeClass("side-menu-active");
                    $("#close_side_menu").fadeOut(200);
                    $tooltip.tooltipster('close');
                    $(function () {
                        setTimeout(function () {
                            $('.sideNavPages').removeClass('show');
                            $('.fas').removeClass('rotate-180');
                        }, 400);
                    });
                }
            }
        });
    }
    /*
     * Side menu collapse opener
     * */
    $(".collapsePagesSideMenu").on('click', function () {
        $(this).find('.fas').toggleClass("rotate-180");
    });


    /* ----- Full Screen ----- */
    function resizebanner() {
        let $fullscreen = $(".full-screen");
        $fullscreen.css("height", $window.height());
        $fullscreen.css("width", $window.width());
    }
    resizebanner();
    $window.resize(function () {
        resizebanner();
    });

    $('.progress').each(function () {
        $(this).appear(function () {
            $(this).animate({
                opacity: 1,
                left: "0px"
            }, 500);
            let b = $(this).find(".progress-bar").attr("data-value");
            $(this).find(".progress-bar").animate({
                width: b + "%"
            }, 500);
        });
    });

    /* =====================================
     Parallax And responsive plugins initialize
      ====================================== */
    let $tooltip = $('.tooltip');
    $(function () {
        $tooltip.tooltipster({
            plugins: ['follower'],
            anchor: 'bottom-right',
            offset: [0, 0],
            animation: 'fade',
            content:'Clique Aqui para fechar ou pressione ESC',
            delay: 20,
            theme: 'tooltipster-light',
            repositionOnScroll: true,
            // change the content of tooltip in all pages
            // functionBefore: function (instance, helper) {
            //     instance.content('Click Here To Close or Press ESC!');
            // }
        });
    });
    /*Wow Animations*/
    if ($(".wow").length && $(window).outerWidth() >= 567) {
        let wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: false,
            live: true
        });
        wow.init();
    }
    if ($(window).width() > 992) {
        $(".parallax").parallaxie({
            //speed value btw (-1 to 1)
            speed: 0.55,
            offset: 0,
        });
        $(".parallax.parallax-slow").parallaxie({
            speed: 0.31,
        });
    }

    /* =====================================
                 Pricing duration toggle
       ===================================== */

    $('.Pricing-toggle-button').on('click', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
        }
    });


    $('.pricing-item').on('mouseenter' , function(){
        $('.pricing-item').removeClass('active');
        $(this).addClass('active');
    }).on('mouseleave' , function(){
        $('.pricing-item').removeClass('active');
        $('.pricing-item.selected').addClass('active');
    });


    /* =====================================
             Fancy Box Image viewer
      ====================================== */
    $('[data-fancybox]').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        buttons: [
            'slideShow',
            'fullScreen',
            'thumbs',
            'share',
            // 'download',
            'zoom',
            'close'
        ],
    });


    /* ------ OWL Slider ------ */
    /*Partners / LOgo*/
    $("#partners-slider").owlCarousel({
        items: 5,
        autoplay: 1500,
        smartSpeed: 1500,
        autoplayHoverPause: true,
        slideBy: 1,
        loop: true,
        margin: 30,
        dots: false,
        nav: false,
        responsive: {
            1200: {
                items: 5,
            },
            991: {
                items: 4,
            },
            767: {
                items: 3,
            },
            480: {
                items: 2,
            },
            0: {
                items: 1,
            },
        }
    });

    /*Testimonials*/
    $("#testimonial-slider").owlCarousel({
        items: 1,
        autoplay: false,
        mouseDrag: true,
        loop: true,
        margin: 30,
        dots: true,
        nav: false,
        responsive: {
            980: {
                items: 1,
            },
            600: {
                items: 1,
            },
            320: {
                items: 1,
            },
        }
    });
    //gallery detail slider
    $("#carousel-gallery-detail").owlCarousel({
        items: 1,
        autoplay: false,
        mouseDrag: true,
        loop: true,
        margin: 0,
        dots: false,
        nav: true,
        responsive: {
            980: {
                items: 1,
            },
            600: {
                items: 1,
            },
            320: {
                items: 1,
            },
        }
    });
    //main slider in pages
    $("#testimonial-main-slider").owlCarousel({
        items: 3,
        autoplay: 2500,
        autoplayHoverPause: true,
        loop: true,
        margin: 0,
        dots: true,
        nav: false,
        responsive: {
            1280: {
                items: 3,
            },
            980: {
                items: 3,
            },
            600: {
                items: 2,
            },
            320: {
                items: 1,
            },
        }
    });

    //main slider in pages
    $("#price-slider").owlCarousel({
        items: 3,
        autoplay: false,
        loop: false,
        margin: 0,
        padding: 0,
        dots: true,
        nav: false,
        responsive: {
            1280: {
                items: 3,
            },
            980: {
                items: 3,
            },
            600: {
                items: 2,
            },
            0: {
                items: 1,
            },
        }
    });


    /*Our Team*/
    $("#ourteam-slider").owlCarousel({
        items: 4,
        margin: 0,
        dots: false,
        nav: false,
        responsive: {
            1280: {
                items: 4,
            },
            768: {
                items: 3,
            },
            520: {
                items: 2,
            },
            0: {
                items: 1,
            },
        }
    });

    /*Services Box Slider*/
    $("#services-slider").owlCarousel({
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1200,
        loop: true,
        nav: false,
        navText: false,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            640: {
                items: 3
            }
        }
    });
    //service detail
    $("#service-detail").owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1200,
        loop: true,
        nav: false,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        margin: 15,
        responsive: {
            0: {
                items: 1,
            },
            640: {
                items: 2,
            }
        }
    });
    //shop detail dual carousel
    let syncCont = $("#shop-dual-carousel");
    let syncCarousel = $("#syncCarousel.owl-carousel");

    if (syncCont) {
        syncCont.append('<div class="owl-carousel carousel-shop-detail-inner owl-theme" id="syncChild"></div>');
        let arrTotal = syncCarousel.find('.item').length - 1;
        let item = '';
        let syncChild = $("#syncChild");
        for (let i = 0; i <= arrTotal; i++) {
            item = syncCarousel.find('.item').eq(i).find('img').attr('src');
            syncChild.append('<!-- Item ' + (i + 1) + '--><div class="item"><img src="' + item + '" alt=""></div>');
        }
    }


    let syncChild = $("#syncChild.owl-carousel");

    syncCarousel.owlCarousel({
        singleItem: true,
        items: 1,
        dots: false,
        slideSpeed: 1000,
        mouseDrag: false,
        nav: true,
        pagination: false,
        afterAction: syncPosition(),
        responsiveRefreshRate: 200,
    });

    syncChild.owlCarousel({
        items: 4,
        pagination: false,
        margin: 0,
        dots: false,
        afterAction: syncPosition(),
    });

    function syncPosition() {
        setTimeout(function () {
            syncChild.find(".owl-item").first().addClass("synced");
        }, 300);
    }

    // Sync nav
    syncCarousel.on('click', '.owl-next', function () {
        let innerActive = syncChild.find('.owl-item.active:first').index();
        let innerActiveLast = syncChild.find('.owl-item.active:last').index();
        let innerActiveSynced = syncChild.find('.owl-item.active.synced').index();
        let innerSynced = syncChild.find('.owl-item.synced').index();
        if (innerActiveSynced === -1) {
            if (innerActive > innerSynced) {
                while (innerActive > innerSynced) {
                    syncChild.trigger('prev.owl.carousel');
                    innerSynced++;
                }
            } else if (innerActive < innerSynced) {
                while (innerActive < innerSynced) {
                    syncChild.trigger('next.owl.carousel');
                    innerSynced--;
                }
            }
        } else if (innerActiveSynced === innerActiveLast) {
            syncChild.trigger('next.owl.carousel');
        }
        let itemBottom = syncChild.find('.owl-item.synced');
        itemBottom.next().addClass('synced').siblings().removeClass('synced');
    });
    syncCarousel.on('click', '.owl-prev', function () {
        let innerActive = syncChild.find('.owl-item.active:first').index();
        let innerActiveSynced = syncChild.find('.owl-item.active.synced').index();
        let innerSynced = syncChild.find('.owl-item.synced').index();
        if (innerActiveSynced === -1) {
            if (innerActive > innerSynced) {
                while (innerActive > innerSynced - 2) {
                    syncChild.trigger('prev.owl.carousel');
                    innerSynced++;
                }
            } else if (innerActive < innerSynced) {
                while (innerActive < innerSynced - 2) {
                    syncChild.trigger('next.owl.carousel');
                    innerSynced--;
                }
            }
        } else if (innerActiveSynced === innerActive) {
            syncChild.trigger('prev.owl.carousel');
        }
        let itemBottom = syncChild.find('.owl-item.synced');
        itemBottom.prev().addClass('synced').siblings().removeClass('synced');
    });

    syncChild.on("click", ".owl-item", function () {
        let number = $(this).index();
        syncCarousel.trigger("to.owl.carousel", number, 300);
        $(this).siblings().removeClass('synced');
        $(this).addClass("synced");
    });
    //fancybox for shop
    $('#syncCarousel [data-fancybox]').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        buttons: [
            'slideShow',
            'fullScreen',
            'thumbs',
            'share',
            'download',
            'zoom',
            'close'
        ],
        afterShow: function () {
            let number = this.index;
            $(syncChild).add(syncCarousel).trigger("to.owl.carousel", number, 300);
            $('#syncChild .owl-item').removeClass("synced").eq(number).addClass('synced');
        }
    });
    //hover effect on shop detail slider image : zooming effect
    $("#syncCarousel .item").on('mousemove', function (e) {
        $(this).find('img').css({
            'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + '%'
        });
    });
    //shop cart item removing
    $('#shop .btn-close').on('click', function (e) {
        e.preventDefault();
        let cartItem = $(this).parent().parent('tr');
        if (cartItem.siblings().length > 0){
            cartItem.fadeOut(300);
            setTimeout(function () {
                cartItem.remove();
            },300)
        }
        else {
            let r = confirm("Do You Want To Empty The Cart?");
            if(r === true){
                $('#cart').html('<div class="text-center"><h3 class="mb-4">Your Cart Is Empty...</h3>' +
                    '<a href="shop.html" class="btn button btn-alt">Go To Shop</a></div>');
                let move = $(window).scrollTop();
                move -=1;
                $("html,body").animate({
                    scrollTop: move
                }, 10);
            }
        }
    });
    /*  ---------  gallery hover effect  ----------  */
    $("#carousel-gallery-detail .item").on('mousemove', function (e) {
        $(this).find('img').css({
            'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + '%'
        });
    });


    /* ----------- Counters ---------- */
    $(".counters").appear(function () {
        $(".count_nums").countTo();
    });


    /* =====================================
            Coming Soon Count Down
    ====================================== */
    let countDown = $(".count_down");
    if (countDown.length) {
        countDown.downCount({
            // month / day / Year
            date: '2/21/2021 12:00:00',
            offset: +10
        });
    }

    /* =====================================
            pagePiling parallax Index
    ====================================== */
    let pagePiling = $('#pagepiling');
    if ($(pagePiling).length) {
        $(pagePiling).pagepiling({
            onLeave: function (index, nextIndex, direction) {
                let i = index;
                let lastIndex = $('#pagepiling section:last').index();
                if (direction === 'down') {
                    $('#para-menu li a').removeClass('current');
                    $('#para-menu li').eq(i).children().addClass('current');
                    $('.para-btn.para-up').removeClass('disabled');
                } else {
                    i -= 2;
                    $('#para-menu li a').removeClass('current');
                    $('#para-menu li').eq(i).children().addClass('current');
                }
                if (i === 0) {
                    $('.para-btn.para-up').addClass('disabled');
                } else if (lastIndex === i) {
                    $('.para-btn.para-down').addClass('disabled');
                } else if (direction === 'up' && i < lastIndex) {
                    $('.para-btn.para-down').removeClass('disabled');
                }
            }
        });
        //PagePiling Arrows
        $('.para-up').on('click', function () {
            $.fn.pagepiling.moveSectionUp();
        });
        $('.para-down').on('click', function () {
            $.fn.pagepiling.moveSectionDown();
        });
    }
    //parallax menu navigation
    $('#para-menu li a').on('click', function (e) {
        e.preventDefault();
        let pageSection = $(this).parent().index();
        let lastPage = $('#pagepiling').find('section').length;
        pageSection++;
        $.fn.pagepiling.moveTo(pageSection);
        $('#para-menu li a').removeClass('current');
        $(this).addClass('current');
        //arrows disabling
        if (pageSection === 1) {
            $('.para-btn.para-up').addClass('disabled');
        } else if (pageSection === lastPage) {
            $('.para-btn.para-down').addClass('disabled');
        }
    });

    //  classic startup text rotation
    let typed = $('#typed-text');
    if (typed.length) {
        let classicStartup = new Typed('#typed-text', {
            strings: ['Front End Developer', 'Front End Designer', 'Front End Master', 'Creative Designer', 'Creative Builder'],
            typeSpeed: 45,
            backSpeed: 22,
            backDelay: 1000,
            smartBackspace: true, // this is a default
            loop: true
        });
    }

    /* =====================================
                CubePortfolio
    ====================================== */
    /* ------Blog Masonry----- */
    $("#blog-measonry").cubeportfolio({
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: "rotateSides",
        gapHorizontal: 30,
        gapVertical: 30,
        gridAdjustment: "responsive",
        mediaQueries: [{
            width: 1500,
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 992,
            cols: 3
        }, {
            width: 768,
            cols: 3
        }, {
            width: 480,
            cols: 1
        }, {
            width: 320,
            cols: 1,
        }],
    });

    /*services*/
    $("#services-measonry").cubeportfolio({
        layoutMode: 'grid',
        defaultFilter: '*',
        filters: '#services-filter',
        animationType: "rotateSides",
        gapHorizontal: 30,
        gapVertical: 30,
        gridAdjustment: "responsive",
        mediaQueries: [{
            width: 1500,
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 992,
            cols: 3
        }, {
            width: 768,
            cols: 2
        }, {
            width: 480,
            cols: 1
        }, {
            width: 320,
            cols: 1,
        }],
    });

    /*Testimonials Grids*/
    $("#testimonial-grid").cubeportfolio({
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: "rotateSides",
        gapHorizontal: 0,
        gapVertical: 0,
        gridAdjustment: "responsive",
        mediaQueries: [{
            width: 1500,
            cols: 4,
        }, {
            width: 1100,
            cols: 4
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
    });

    /*Testimonials Grids*/
    $("#price-grid").cubeportfolio({
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: "rotateSides",
        gapHorizontal: 50,
        gapVertical: 50,
        gridAdjustment: "responsive",
        mediaQueries: [{
            width: 1500,
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 2
        }, {
            width: 480,
            cols: 1
        }]
    });

    /*Gallery without spaces*/
    $("#grid-mosaic").cubeportfolio({
        filters: "#mosaic-filter",
        layoutMode: 'grid',
        defaultFilter: "*",
        animationType: "rotateSides",
        gapHorizontal: 0,
        gapVertical: 0,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1500,
            cols: 3,
        }, {
            width: 1100,
            cols: 3,
        }, {
            width: 767,
            cols: 2,
        }, {
            width: 480,
            cols: 1,
        }],
        plugins: {
            loadMore: {
                element: '#js-loadMore-mosaic',
                action: 'click',
                loadItems: 4,
            }
        },
    });


    /* =====================================
                Revolution Slider
    ====================================== */
    /* -----Main Index Slider------ */
    //single item indexes
    $("#rev_single").show().revolution({
        sliderType: "hero",
        jsFileLocation: "js/revolution",
        sliderLayout: "fullscreen",
        scrollbarDrag: "true",
        dottedOverlay: "none",
        delay: 9000,
        navigation: {},
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1170, 1024, 778, 480],
        gridheight: [868, 768, 960, 720],
        lazyType: "none",
        parallax: {
            type: "scroll",
            origo: "slidercenter",
            speed: 400,
            levels: [10, 15, 20, 25, 30, 35, 40, -10, -15, -20, -25, -30, -35, -40, -45, 55]
        },
        shadow: 0,
        spinner: "off",
        autoHeight: "off",
        fullScreenAutoWidth: "off",
        fullScreenAlignForce: "off",
        fullScreenOffsetContainer: "",
        disableProgressBar: "on",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: false,
        fallbacks: {
            simplifyAll: "off",
            disableFocusListener: false
        }
    });
    //modern agency index
    $("#vertical-bullets").show().revolution({
        sliderType: "standard",
        sliderLayout: "fullscreen",
        scrollbarDrag: "true",
        dottedOverlay: "none",
        navigation: {
            keyboardNavigation: "on",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            mouseScrollReverse: "default",
            onHoverStop: "off",
            bullets: {
                enable: true,
                hide_onmobile: true,
                hide_under: 767,
                hide_onleave: false,
                direction: "vertical",
                h_align: "left",
                v_align: "center",
                h_offset: 30,
                v_offset: 0,
                space: 5,
                tmp: '<div class="tp-bullet-inner"></div><div class="tp-line"></div>'
            },
            touch: {
                touchenabled: "on",
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: false
            },
        },
        viewPort: {
            enable: true,
            outof: "pause",
            visible_area: "90%",
            presize: true
        },
        responsiveLevels: [4096, 1260, 778, 480],
        visibilityLevels: [4096, 1260, 778, 480],
        gridwidth: [1140, 1024, 750, 480],
        gridheight: [600, 500, 500, 350],
        lazyType: "none",
        parallax: {
            type: "mouse",
            origon: "slidercenter",
            speed: 9000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
        },
        shadow: 0,
        spinner: "off",
        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "off",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 360,
        hideAllCaptionAtLilmit: 360,
        debugMode: false,
        fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
        }
    });
//    end of js
});
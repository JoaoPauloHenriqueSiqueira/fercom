<!DOCTYPE html>
<html lang="pt-br">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{ $company->name }} | Shop</title>
    <link href="images/img/favicon.png" rel="icon">
    <link rel="stylesheet" href="{{ asset('css/bundle.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/jquery.fancybox.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/cubeportfolio.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/tooltipster.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/revolution-settings.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/revolution/navigation.css') }}">
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <style>
        .bg-blue {
            background: #F05454;
        }

        .bg-yellow {
            background: #222831;
            color: #fff;
        }

        .side-menu:not(.gradient-bg) {
            background: #F05454;
            color: #fff;
        }

        .side-nav .navbar-nav .nav-link {
            color: #fff !important;
        }

        ::-webkit-scrollbar-thumb {
            background: #F05454;
        }

        .fixedmenu {
            background: #222831 !important;
        }

        .fixedmenu .navbar-nav .nav-link {
            color: #fff;
        }

        ul.darkcolor.social-icons li a,
        ul.darkcolor.social-icons-simple li a {
            color: #fff;
            border-color: #fff;
        }

        .navbar-nav .nav-link {
            color: #fff;
        }

        .navbar-brand>img {
            max-width: 180%;
            width: 180%;

        }

        .dropdown-menu .dropdown-item,
        .dropdown-menu .dropdown-title {
            color: #fff;
        }

        .padding_bottom {
            width: 100%;
            min-height: 360px;
        }


        /* The snackbar - position it at the bottom and in the middle of the screen */
        #snackbar,
        #snackbarLogin,
        #snackbarRegister,
        #snackbarUpdate,
        #snackbarSale {
            visibility: hidden;
            /* Hidden by default. Visible on click */
            min-width: 250px;
            /* Set a default minimum width */
            margin-left: -125px;
            /* Divide value of min-width by 2 */
            background-color: #333;
            /* Black background color */
            color: #fff;
            /* White text color */
            text-align: center;
            /* Centered text */
            border-radius: 2px;
            /* Rounded borders */
            padding: 16px;
            /* Padding */
            position: fixed;
            /* Sit on top of the screen */
            z-index: 1;
            /* Add a z-index if needed */
            left: 50%;
            /* Center the snackbar */
            bottom: 30px;
            /* 30px from the bottom */
        }

        /* Show the snackbar when clicking on a button (class added with JavaScript) */
        #snackbar.show,
        #snackbarLogin.show,
        #snackbarRegister.show,
        #snackbarUpdate.show,
        #snackbarSale.show {
            visibility: visible;
            /* Show the snackbar */
            /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
However, delay the fade out process for 2.5 seconds */
            -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }

        /* Animations to fade the snackbar in and out */
        @-webkit-keyframes fadein {
            from {
                bottom: 0;
                opacity: 0;
            }

            to {
                bottom: 30px;
                opacity: 1;
            }
        }

        @keyframes fadein {
            from {
                bottom: 0;
                opacity: 0;
            }

            to {
                bottom: 30px;
                opacity: 1;
            }
        }

        @-webkit-keyframes fadeout {
            from {
                bottom: 30px;
                opacity: 1;
            }

            to {
                bottom: 0;
                opacity: 0;
            }
        }

        @keyframes fadeout {
            from {
                bottom: 30px;
                opacity: 1;
            }

            to {
                bottom: 0;
                opacity: 0;
            }
        }
    </style>
</head>

<body>
    <!--PreLoader-->
    <div class="loader">
        <div class="loader-spinner"></div>
    </div>
    <!--PreLoader Ends-->
    <!-- header -->
    <header class="site-header">
        <nav class="navbar navbar-expand-lg static-nav bg-yellow">
            <div class="container">
                <a class="navbar-brand" href="../index-construction.html">
                    <img src="images/img/header.png" alt="logo">
                </a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">Início</a>
                        </li>
                        <li class="nav-item dropdown static">
                            <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Categorias </a>
                            <ul class="dropdown-menu megamenu">
                                <li>
                                    <div class="container">
                                        <div class="row">
                                            @foreach ($groups as $data)
                                            <div class="col-lg-12 col-md-6 col-sm-12">
                                                <a class="dropdown-item" href="?group={{$data['id']}}">
                                                    <h5 class="dropdown-title bottom10"><img style="max-width:50px!important;color: white;" src="images/img/iconesMenu/{{$data['icon']}}.png" /> {{ $data['name'] }}</h5>
                                                </a>
                                                @foreach ($data['categories'] as $d)
                                                @if(!empty($d['subcategories']))
                                                <a class="dropdown-item collapsePagesSideMenu" data-toggle="collapse" href="#innerall-{{$d['id']}}">
                                                    {{ $d['name'] }} <i class="fas fa-chevron-down"></i>
                                                </a>
                                                <div id="innerall-{{$d['id']}}" class="collapse">
                                                    <ul class="mt-2">
                                                        <li class="nav-item">
                                                            <a class="nav-link" href="?group={{$data['id']}}&category={{$d['id']}}">Todos produtos</a>
                                                        </li>
                                                        @foreach ($d['subcategories'] as $s)
                                                        <li class="nav-item">
                                                            <a class="nav-link" href="?group={{$data['id']}}&category={{$d['id']}}&subcategory={{$s['id']}}">{{ $s['name'] }}</a>
                                                        </li>
                                                        @endforeach
                                                    </ul>
                                                </div>
                                                @else
                                                <a class="nav-link" href="?group={{$data['id']}}&category={{$d['id']}}">{{$d['name']}}</a>
                                                @endif
                                                @endforeach
                                            </div>
                                            @endforeach
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul class="social-icons darkcolor social-icons-simple d-lg-inline-block d-none animated fadeInUp" data-wow-delay="300ms">
                    <li><a target="_blank" href="{{$company->whatsapp}}" class="whatsapp"><i class="fab fa-whatsapp"></i></a> </li>
                    <li><a target="_blank" href="{{$company->facebook}}" class="facebook"><i class="fab fa-facebook-f"></i> </a> </li>
                    <li><a target="_blank" href="{{$company->instragram}}" class="insta"><i class="fab fa-instagram"></i> </a> </li>
                </ul>
            </div>
            <!--side menu open button-->
            <a href="javascript:void(0)" class="d-inline-block sidemenu_btn" id="sidemenu_toggle">
                <span class="bg-dark" style="color:#fff !important;"></span> <span class="bg-dark" style="color: #fff !important;"></span> <span class="bg-dark" style="color:#fff !important;"></span>
            </a>
        </nav>

        <!-- side menu -->
        <div class="side-menu opacity-0 ">
            <div class="overlay"></div>
            <div class="inner-wrapper">
                <span class="btn-close" id="btn_sideNavClose"><i></i><i></i></span>
                <nav class="side-nav w-100">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">Início</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link collapsePagesSideMenu" data-toggle="collapse" href="#sideNavPages">
                                Categorias <i class="fas fa-chevron-down"></i>
                            </a>
                            <div id="sideNavPages" class="collapse sideNavPages">
                                <ul class="navbar-nav mt-2">
                                    @foreach ($groups as $data)
                                    <li class="nav-item">
                                        @if(!empty($data['categories']))
                                        <a class="nav-link collapsePagesSideMenu" data-toggle="collapse" href="#inner-{{$data['id']}}">
                                            {{ $data['name'] }} <i class="fas fa-chevron-down"></i>
                                        </a>
                                        <div id="inner-{{$data['id']}}" class="collapse sideNavPages sideNavPagesInner">
                                            <ul class="navbar-nav mt-2">
                                                <li class="nav-item">
                                                    <a class="nav-link" href="?group={{$data['id']}}">Todos produtos</a>
                                                </li>
                                                @foreach ($data['categories'] as $d)
                                                @if(!empty($d['subcategories']))
                                                <a class="nav-link collapsePagesSideMenu" data-toggle="collapse" href="#innersub-{{$d['id']}}">
                                                    {{ $d['name'] }} <i class="fas fa-chevron-down"></i>
                                                </a>

                                                <div id="innersub-{{$d['id']}}" class="collapse">
                                                    <ul class="mt-2">
                                                        <li class="nav-item">
                                                            <a class="nav-link" href="?group={{$data['id']}}&category={{$d['id']}}">Todos produtos</a>
                                                        </li>
                                                        @foreach ($d['subcategories'] as $s)
                                                        <li class="nav-item">
                                                            <a class="nav-link" href="?group={{$data['id']}}&category={{$d['id']}}&subcategory={{$s['id']}}">{{ $s['name'] }}</a>
                                                        </li>
                                                        @endforeach
                                                    </ul>
                                                </div>

                                                @else
                                                <li class="nav-item">
                                                    <a class="nav-link" href="?group={{$data['id']}}&category={{$d['id']}}">{{ $d['name'] }}</a>
                                                </li>
                                                @endif

                                                @endforeach
                                            </ul>
                                        </div>
                                        @else
                                        <a class="nav-link" href="?group={{$data['id']}}">{{ $data['name'] }}</a>
                                        @endif
                                    </li>
                                    @endforeach
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div class="side-footer w-100">
                    <ul class="social-icons-simple darkcolor top40">
                        <li><a target="_blank" href="{{$company->whatsapp}}" class="whatsapp"><i class="fab fa-whatsapp"></i></a> </li>
                        <li><a target="_blank" href="{{$company->facebook}}" class="facebook"><i class="fab fa-facebook-f"></i> </a> </li>
                        <li><a target="_blank" href="{{$company->instragram}}" class="insta"><i class="fab fa-instagram"></i> </a> </li>
                    </ul>
                    © <span class="year"></span> . Feito com <i class="fas fa-heart" aria-hidden="true"></i> por <a href="https://inn9.net" target="_blank">Inn9</a>
                </div>
            </div>
        </div>
        <div id="close_side_menu" class="tooltip"></div>
        <!-- End side menu -->
    </header>
    <!-- header -->
    <!--Page Header-->
    <section id="main-banner-page" class="position-relative page-header shop-header section-nav-smooth parallax">
        <div class="overlay overlay-dark opacity-6 z-index-1"></div>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2">
                    <div class="page-titles whitecolor text-center padding_top padding_bottom">
                        <h2 class="font-xlight">As melhores ofertas</h2>
                        <h2 class="font-bold">As melhores marcas</h2><br>
                        <h3 class="font-light pt-2">A mais completa loja da região</h3>
                    </div>
                </div>
            </div>
            <div class="bg-blue title-wrap">
                <div class="row">
                    <div class="col-lg-12 col-md-12 whitecolor">
                        <h3 class="float-left">{{$breadcrumbs['name']}}</h3>
                        <ul class="breadcrumb top10 bottom10 float-right">
                            <li class="breadcrumb-item hover-light"><a href="{{ route('home') }}?group={{$breadcrumbs['id']}}">{{ $breadcrumbs['subname'] }}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @if ($errors->any())
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
        <div id="liveToast" class="toast show" role="alert" aria-live="assertive" data-bs-autohide="true" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Notificação</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                @foreach ($errors->all() as $error)
                {{$error}}
                @endforeach
            </div>
        </div>
    </div>

    @endif

    @if(session()->has('message'))

    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
        <div id="liveToast" class="toast show" role="alert" aria-live="assertive" data-bs-autohide="true" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Notificação</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ session()->get("message")}}
            </div>
        </div>
    </div>
    @endif
    @yield('content')

    <!--Site Footer Here-->
    <footer id="site-footer" class=" bgprimary padding_top">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="footer_panel padding_bottom_half bottom20">
                        <ul class="latest_news whitecolor">
                            <li> <a href="#.">Cidade </a> <span class="date defaultcolor">{{ $company->city }} - {{ $company->cep }} </span> </li>
                            <li> <a href="#.">Endereço </a> <span class="date defaultcolor">{{ $company->address }}</span> </li>
                        </ul>
                        <div class="d-table w-100 address-item whitecolor bottom25">
                            <span class="d-table-cell align-middle"><i class="fas fa-mobile-alt"></i></span>
                            <p class="d-table-cell align-middle bottom0">
                                {{ $company->phone }} <a class="d-block" href="mailto:fercomsm@fercomsm.com.br">fercomsm@fercomsm.com.br</a>
                            </p>
                        </div>
                        <ul class="social-icons white wow fadeInUp" data-wow-delay="300ms">
                            <li><a target="_blank" href="{{$company->whatsapp}}" class=""><i class="fab fa-whatsapp"></i></a> </li>
                            <li><a target="_blank" href="{{$company->facebook}}" class=""><i class="fab fa-facebook-f"></i> </a> </li>
                            <li><a target="_blank" href="{{$company->instagram}}" class=""><i class="fab fa-instagram"></i> </a> </li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="footer_panel padding_bottom_half bottom20">
                        <h3 class="whitecolor bottom25">Atendimento Loja Física</h3>
                        <ul class="hours_links whitecolor">
                            <li><span>Segunda-Sexta:</span> <span>8:00-18:00</span></li>
                            <li><span>Sábado:</span> <span>8:00-12:00</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!--Footer ends-->
    <!-- jQuery first, then Popper.js') }}, then Bootstrap JS -->
    <script src="{{ asset('js/bundle.min.js') }}"></script>
    <!--to view items on reach-->
    <script src="{{ asset('js/jquery.appear.js') }}"></script>
    <!--Owl Slider-->
    <script src="{{ asset('js/owl.carousel.min.js') }}"></script>
    <!--Parallax Background-->
    <script src="{{ asset('js/parallaxie.min.js') }}"></script>
    <!--Cubefolio Gallery-->
    <script src="{{ asset('js/jquery.cubeportfolio.min.js') }}"></script>
    <!--Fancybox js-->
    <script src="{{ asset('js/jquery.fancybox.min.js') }}"></script>
    <!--wow js-->
    <script src="{{ asset('js/wow.min.js') }}"></script>
    <!--number counters-->
    <script src="{{ asset('js/jquery-countTo.js') }}"></script>
    <!--tooltip js-->
    <script src="{{ asset('js/tooltipster.min.js') }}"></script>
    <!--Revolution SLider-->
    <script src="{{ asset('js/jquery.themepunch.tools.min.js') }}"></script>
    <script src="{{ asset('js/jquery.themepunch.revolution.min.js') }}"></script>
    <!-- SLIDER REVOLUTION 5.0 EXTENSIONS -->
    <script src="{{ asset('js/extensions/revolution.extension.actions.min.js') }}"></script>
    <script src="{{ asset('js/extensions/revolution.extension.carousel.min.js') }}"></script>
    <script src="{{ asset('js/extensions/revolution.extension.kenburn.min.js') }}"></script>
    <script src="{{ asset('js/extensions/revolution.extension.layeranimation.min.js') }}"></script>
    <script src="{{ asset('js/extensions/revolution.extension.migration.min.js') }}"></script>
    <script src="{{ asset('js/extensions/revolution.extension.navigation.min.js') }}"></script>
    <script src="{{ asset('js/extensions/revolution.extension.parallax.min.js') }}"></script>
    <script src="{{ asset('js/extensions/revolution.extension.slideanims.min.js') }}"></script>
    <script src="{{ asset('js/extensions/revolution.extension.video.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>

    <!--custom functions and script-->
    <script src="{{ asset('js/functions.js') }}"></script>
    <script>
        function updateYear() {
            let year = new Date().getFullYear();
            $(".year").append(year)
        }

        $(document).ready(function() {
            updateYear();
            var divSnack = document.getElementById("liveToast");

            if (divSnack) {
                setTimeout(function() {
                    divSnack.className = divSnack.className.replace("show", "");
                }, 3000);
            }
        });
    </script>
</body>

</html>
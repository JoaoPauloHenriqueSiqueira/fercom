@extends('layout.shopping', ['company' => $company,'groups'=>$groups])

@section('content')

<!--Shop details-->
<section id="shop" class="padding">
<div id="snackbar" class="snackbar"></div>

    <div class="container">
        <div class="row">
            <!-- NOTE: The Id of both of below tags should be same as below-->
            <!-- shop-dual-carousel -->
            <div class="col-lg-5 col-md-5 col-sm-12 wow fadeInLeft heading-space" id="shop-dual-carousel" data-wow-delay="20ms" data-wow-duration="1100ms">
                <!-- syncCarousel -->
                <div class="owl-carousel carousel-shop-detail owl-theme" id="syncCarousel">
                    <!--Item 1-->
                    <div class="item">
                        <a href="images/img/produtos/{{$product->id}}.jpg" data-fancybox="gallery" title="Zoom In">
                            <img src="images/img/produtos/{{$product->id}}.jpg" alt="Latest News">
                        </a>
                    </div>
                </div>
                <!-- The second carousel will be created dynamically using JS Based upon the items added in upper carousel -->
            </div>
            <div class="col-lg-7 col-md-7 col-sm-12 shop_info heading-space wow fadeInRight" data-wow-delay="20ms" data-wow-duration="1100ms">
                <!--Shop detail-->
                <h2 class="heading darkcolor font-light2 bottom15"><span>{{ $product->getFullNameValueAttribute() }}</span></h2>
                <h3 class="py-3">{{$product->getSaleFormatValueAttribute()}}</h3>
                <p class=" bottom10">
                    {{ $product->description }}
                </p>
                <div class="row">
                    <div class="col-md-8 mt-1">
                        <div class="quote">
                            <label for="quantity" class="d-none"></label>
                            <input type="number" placeholder="Quantity" min="1" max="100" value="1" class="quote px-4" id="quantity">
                            <a href="javascript:void(0)" class="btn-common btn btn-alt">Adicionar ao carrinho <i class="fa fa-cart-plus"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>
<!--Shop Deails-->
@endsection
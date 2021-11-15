@extends('layout.shopping', ['company' => $company,'groups'=>$groups])

@section('content')
<div id="snackbar" class="snackbar"></div>

<!--Page Header ends -->
<!--Shopping-->
<section id="our-shop" class="padding_top padding_bottom_half">
    <div class="container">

    @if($group)
    <div class="row">
        <div class="col-md-12 text-center wow fadeIn" data-wow-delay="300ms">
            <h3 class="heading bottom30 darkcolor font-light2"><span class="font-weight-bold">{{$description['name']}}</span>
                <span class="divider-center"></span>
            </h3>
            <div class="col-md-8 offset-md-2 heading_space">
                <p>
                    {{$description['description']}}
                </p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-12 text-center wow fadeIn" data-wow-delay="300ms">
            <h3 class="heading bottom30 darkcolor font-light2"><span class="font-weight-bold">Produtos</span>
                <span class="divider-center"></span>
            </h3>
            <div class="col-md-8 offset-md-2 heading_space">
                @if($subcategories)
                    @foreach ($subcategories as $data)
                        @if(!empty($data))
                            <a class="nav-link" href="{{ route('home') }}{{$data['link']}}">{{ $data['name'] }}</a>
                        @endif
                    @endforeach
                @endif
            </div>
        </div>

        <div class="col-lg-9 col-md-9 col-sm-12">
            <div class="row">
                @foreach ($products as $data)

                <div class="col-lg-3 col-sm-12 wow fadeIn" data-wow-delay="500ms">
                    <div class="shopping-box bottom30">
                        <div class="image">
                            <img src="images/img/produtos/{{$data->product_code}}.jpg" alt="shop">
                            <!-- <div class="overlay overlay-blue center-block">
                                <a class="opens" id="product-{{$data['id']}}" title="Adicionar ao Carrinho" data-product="{{$data}}" onclick="addCart({{$data['id']}})"><i class="fa fa-shopping-cart"></i></a>
                            </div> -->
                        </div>
                        <div class="shop-content text-center">
                            <h4 class="darkcolor pb-2">
                                <a href="detail?product={{$data->product_code}}">{{$data->getFullNameValueAttribute()}}</a>
                            </h4>
                            <p>{{$data->getShortDescription()}}</p>
                            <h4 class="price-product font-weight-bold">{{$data->getSaleFormatValueAttribute()}}</h4>
                        </div>
                    </div>
                </div>
                <!-- FIM DOS PRODUTOS -->
                @endforeach
            </div>
        </div>
        @else
        <div class="row">
            <div class="col-md-12 text-center wow fadeIn" data-wow-delay="300ms">
                <h3 class="heading bottom30 darkcolor font-light2"><span class="font-weight-bold">{{$description['name']}}</span>
                    <span class="divider-center"></span>
                </h3>
                <div class="col-md-8 offset-md-2 heading_space">
                    <p>
                        {{$description['description']}}
                    </p>
                </div>
            </div>

            @foreach ($products as $data)
            <div class="col-lg-3 col-md-6 col-sm-6 wow fadeIn" data-wow-delay="500ms">
                <div class="shopping-box bottom30">
                    <div class="image">
                        <img src="images/img/produtos/{{$data->product_code}}.jpg" alt="shop">
                        <!-- <div class="overlay overlay-blue center-block">
                            <a class="opens" id="product-{{$data['id']}}" title="Adicionar ao Carrinho" data-product="{{$data}}" onclick="addCart({{$data['id']}})"><i class="fa fa-shopping-cart"></i></a>
                        </div> -->
                    </div>
                    <div class="shop-content text-center">
                        <h4 class="darkcolor pb-2">
                            <a href="detail?product={{$data->product_code}}">{{$data->getFullNameValueAttribute()}}</a>
                        </h4>
                        <p>{{$data->getShortDescription()}}</p>
                        <h4 class="price-product font-weight-bold">{{$data->getSaleFormatValueAttribute()}}</h4>
                    </div>
                </div>
            </div>
            <!-- FIM DOS PRODUTOS -->
            @endforeach

        @endif

        <div class="col-lg-12 col-md-12">
            @if( method_exists($products,'links') )
            <h1 class="center">{{$products->links('vendor.pagination.materializecss')}}</h1>
            @endif
        </div>

    </div>
    </div>
</section>
<!--Shopping ends-->
@endsection
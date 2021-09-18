@extends('layout.shopping', ['company' => $company,'groups'=>$groups])

@section('content')

<!--Shop details-->
<section id="shop" class="padding">
<div id="snackbar" class="snackbar"></div>

<!--Product Line Up Start -->
<div id="product-listing" class="product-listing">
    <div class="mini-cart-header text-left">
        <h4 class="center-text text-center">Meu Carrinho</h4>
    </div>
    <div class="mini-cart-body">
        <div class="inner-card show-cart">
        </div>
    </div>
    
    <div class="mini-cart-footer">
        <div class="subtotal text-center">
            <span class="total-title">Total: </span>
            <span class="total-price">
                <span class="Price-amount total-cart">
                </span>
            </span>
        </div>
        <div class="actions text-center">
            <a href="#" onclick="showRegister()" class="btn pink-gradient-btn-into-transparent btnCart">Finalizar
                Compra</a>
            <a href="#" class="clear-cart btn pink-gradient-btn-into-transparent btnCart">Limpar Carrinho</a>
        </div>
    </div>
</div>


<div id="saleFinish" class="product-listing text-center">
</div>

<div id="registerScreen" class="modal fade bd-example-modal-sm">
    <div class="modal-dialog modal-sm whitebox wow slideInLeft">
        <div class="widget logincontainer register-account modal-content">
            <h3 class="bottom35 text-center text-md-left">Crie sua conta </h3>
            <form class="getin_form border-form" id="register">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div class="form-group bottom35">
                            <label for="registerName" class="d-none"></label>
                            <input class="form-control" type="text" placeholder="Nome Completo" required=""
                                id="registerName" name="name">
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                        <div class="form-group bottom35">
                            <label for="registerEmail" class="d-none"></label>
                            <input class="form-control" type="email" placeholder="Email:" required=""
                                id="registerEmail" name="email">
                        </div>
                    </div>

                    <div class="col-md-12 col-sm-12">
                        <div class="form-group bottom35">
                            <label for="registerPass" class="d-none"></label>
                            <input class="form-control" type="password" placeholder="Password:" required=""
                                id="registerPass" name="password">
                        </div>
                    </div>



                    <div class="col-md-12 col-sm-12">
                        <div class="form-group bottom35">
                            <label for="registerCellPhone" class="d-none"></label>
                            <input class="form-control" type="text" placeholder="Celular:" required=""
                                id="registerCellPhone" name="cell_phone">
                        </div>
                    </div>
                    <!-- <div class="col-md-12 col-sm-12">
                        <div class="form-group bottom35">
                            <div class="form-check text-left">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="defaultUnchecked">
                                    <label class="custom-control-label register-remember"
                                        for="defaultUnchecked">Remember me on this device</label>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div id="snackbarRegister"></div>
                    <div class="col-sm-12 register-btn">
                        <a href="#" onclick="register()" class="btn pink-gradient-btn-into-transparent">Enviar</a>
                    </div>
                    <div class="col-sm-12 register-btn">
                        <p class="top20 SignInclass"> Já possui uma conta? &nbsp;<a href="#"
                                onclick="showLogin()">Entrar</a> </p>

                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<div id="loginScreen" class="modal fade bd-example-modal-sm">
    <div class="modal-dialog modal-sm whitebox wow slideInLeft">
        <div class="widget logincontainer register-account modal-content">
            <h3 class="bottom35 text-center text-md-left">Entre na sua conta </h3>

            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group bottom35">
                        <label for="loginEmail" class="d-none"></label>
                        <input class="form-control" type="email" placeholder="Email:" required="" id="loginEmail"
                            name="email">
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group bottom35">
                        <label for="loginPass" class="d-none"></label>
                        <input class="form-control" name="password" type="password" placeholder="Password:"
                            required="" id="loginPass">
                    </div>
                </div>
                <div id="snackbarLogin"></div>
                <div class="col-md-12 col-sm-12">
                    <div class="row center" id="loaderAjaxLogin" style="display: none;">
                        <div class="col-sm-12 col-lg-12 f-sec1  text-center text-lg-center">
                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                    </div>
                </div>

                <!-- <div class="col-md-12 col-sm-12">
                        <div class="form-group bottom35">
                            <div class="form-check text-left">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="loginDefaultUnchecked">
                                    <label class="custom-control-label register-remember"
                                        for="defaultUnchecked">Lembrar de mim nesse dispostivo</label>
                                </div>
                            </div>
                        </div>
                    </div>-->
                <div class="col-sm-12 register-btn">
                    <button class="btn pink-gradient-btn-into-black" onclick="login()">Entrar</button>
                    <p class="top20 SignInclass"> Não tem uma conta ainda? &nbsp;<a href="#"
                            onclick="showRegister()">Registrar</a> </p>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="addressScreen" class="modal fade bd-example-modal-sm">
    <div class="modal-dialog modal-sm whitebox wow slideInLeft">
        <div class="widget logincontainer register-account modal-content">
            <h3 class="bottom35 text-center text-md-left">Qual o endereço de entrega?</h3>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group bottom35">
                        <label for="registerCep" class="d-none"></label>
                        <input class="form-control" type="text" placeholder="CEP" required="" id="registerCep"
                            disabled value="18650-000">
                    </div>
                </div>

                <div class="col-md-12 col-sm-12">
                    <label class="select">
                        <select id="registerCity">
                            <option>São Manuel</option>
                        </select>
                    </label>
                </div>

                <div class="col-md-12 col-sm-12">
                    <div class="form-group bottom35">
                        <label for="registerAddress" class="d-none"></label>
                        <input class="form-control" type="text" placeholder="Endereço" required=""
                            id="registerAddress">
                    </div>
                </div>

                <div class="col-md-12 col-sm-12">
                    <div class="form-group bottom35">
                        <label for="registerAddressNumber" class="d-none"></label>
                        <input class="form-control" type="text" placeholder="Número" required=""
                            id="registerAddressNumber">
                    </div>
                </div>

                <div class="col-md-12 col-sm-12">
                    <div class="form-group bottom35">
                        <label for="registerNeighb" class="d-none"></label>
                        <input class="form-control" type="text" placeholder="Bairro" required=""
                            id="registerNeighb">
                    </div>
                </div>

                <div id="snackbarUpdate"></div>
                <div class="col-md-12 col-sm-12">
                    <div class="row center" id="loaderAjaxUpdate" style="display: none;">
                        <div class="col-sm-12 col-lg-12 f-sec1  text-center text-lg-center">
                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group bottom35">
                        <label for="registerComplem" class="d-none"></label>
                        <input class="form-control" type="text" placeholder="Complemento" required=""
                            id="registerComplem">
                    </div>
                </div>

                <div class="col-sm-12 register-btn">
                    <button class="btn pink-gradient-btn-into-black" onclick="updateAddress()">Enviar</button>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="confirmAddressScreen" class="modal fade bd-example-modal-sm">
    <div class="modal-dialog modal-sm whitebox wow slideInLeft">
        <div class="widget logincontainer register-account modal-content">
            <h3 class="bottom35 text-center text-md-left">Confirma o endereço de entrega?</h3>
            <form class="getin_form border-form">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div class="form-group bottom35">
                            <label for="registerCep" class="d-none"></label>
                            <input class="form-control" type="text" id="actAdress" disabled>
                        </div>
                    </div>

                    <div id="snackbarSale"></div>
                    <div class="col-md-12 col-sm-12">
                        <div class="row center" id="loaderAjaxSale" style="display: none;">
                            <div class="col-sm-12 col-lg-12 f-sec1  text-center text-lg-center">
                                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 register-btn">
                        <a onclick="confirmSale()" class="btn pink-gradient-btn-into-black text-white">Confirmar</a>
                        <a onclick="anotherAddress()" class="btn pink-gradient-btn-into-black text-white">Outro
                            endereço</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</section>
<!--Shop Deails-->
@endsection
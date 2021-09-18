// const authorization = "70224c3349cb30fa639d07c9f760604e";
// const company = "2";
// const url = "http://theboss.link/api/admin/";
// const userSale = "7"

// const authorization = "70224c3349cb30fa639d07c9f760604e";
// const company = "2";
// const url = "http://localhost/theboss/public/api/admin/";
// const userSale = "7"


function notificar($text, $div) {
  if (!$div) {
    var divSnack = document.getElementById("snackbar");
  } else {
    var divSnack = document.getElementById($div);
  }

  divSnack.innerHTML = $text;
  // Add the "show" class to DIV
  divSnack.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { divSnack.className = divSnack.className.replace("show", ""); }, 3000);
}


function createFooter() {
  let footer = `
  <div class="footer">
        <div class="container">
            <div class="row footer-container">
                <div class="col-sm-12 col-lg-12 f-sec1  text-center text-lg-center">
                    <h4 class="high-lighted-heading">Sobre nós</h4>
                    <p>Somos uma loja de variedades com as melhores ofertas e novidades do mercado</p>
                    <h4>Redes sociais</h4>
                    <div class="s-icons">
                        <ul class="social-icons-simple">
                            <li><a target="_blank" href="https://www.facebook.com/Augusto-Presentes-100867855287302" class="facebook-bg-hvr"><i class="fab fa-facebook-f"
                                        aria-hidden="true"></i></a></li>
                            <li><a target="_blank" href="http://wa.me/5514991184850" class="whatsapp-bg-hvr"><i class="fab fa-whatsapp"
                                        aria-hidden="true"></i></a></li>
                            <!-- <li><a href="javascript:void(0)" class="instagram-bg-hvr"><i class="fab fa-instagram" -->
                            <!-- aria-hidden="true"></i></a></li> -->
                        </ul>
                    </div>
                    <p>
                        CNPJ: 22.369.610/0001-08 <br>
                        Telefone: (14)99118-4850 <br>
                        Loja 1: Rua Gomes de Faria 250 Centro - São Manuel/SP
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 footer_notes">
                    <p class="whitecolor text-center w-100 wow fadeInDown"
                        style="visibility: hidden; animation-name: none;">
                        © <span class="year"></span> . Feito com <i class="fas fa-heart" aria-hidden="true"></i> por <a
                            href="https://inn9.net" target="_blank">Inn9</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  `;

  $("#footer").append(footer);
}

function forgotPassword(){
  var objDiv = document.getElementById("forgotForm");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function passwordRescue(isRescue)
{
  if(isRescue){
    $("#loginForm").hide();
    $("#forgotForm").show('slow');
  }else{
    $("#forgotForm").hide();
    $("#loginForm").show('slow');
  }

  this.forgotPassword();
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

function createRowCategory(category) {
  return $(`
            <li><a class="dropdown-item" href="product-listing.html?category=${category.id}">${category.name}</a></li>
        `);
}

function createRowProduct(product) {

  let quanti = "";

  if (product.control_quantity > 0) {
    quanti = `${product.quantity} unid. disponivel(is): `;
  }

  let sizes = "";

  if (product.sizes.length > 0) {
    sizes = `Tamanhos: `;
    product.sizes.forEach((element) => {
      sizes += `
        ${element.name}
      `;
    })
  }

  let photo = '';
  if(product.photos.length > 0 ){
    photo = product.photos[0];
  }

  return `
    <div class='col-12 col-md-6 col-lg-4 manage-color-hover wow slideInUp card'>
        <div class='product-item owl-theme product-listing-carousel zoom'>
            <div class='item p-item-img'>
                <img src='${photo}' alt='images img-responsive'>
                <div class='text-center d-flex justify-content-center align-items-center'>
                    <a id="${product.id}" class='listing-cart-icon add-to-cart' onclick=addCart(${product.id})>
                        <i class='fa fa-shopping-cart'></i>
                    </a>
                </div>
            </div>
        </div>
        <div class='p-item-detail'>
            <h4 class='text-center p-item-name'>
            <a id="detail${product.id}}" href='product-detail.html' onclick="saveProductDetail(${product.id})">${product.name}
            </a>
                </h4>
              <p class="text-center">${quanti}</p>
              <p class='text-center p-item-price'>${sizes}</p>

            <p class='text-center p-item-price'>${product.valor_moeda}</p>

        </div>
    </div>
`
}


function saveProductDetail(element) {

  let $product = $(`#${element}`).data('product');
  sessionStorage.setItem('productDetail', JSON.stringify($product));
}

function detailProduct() {
  $("#loaderAjax").hide();

  let prod = JSON.parse(sessionStorage.getItem('productDetail'));
  if (prod == null) {
    return emptyCategoryProduct();
  }

  let photos = createPhotoProduto(prod.photos);
  let itemSlider = createPhotoProdutoSlider(prod.photos);
  let item = createDetailProduct(prod, photos, itemSlider);
  $("#productDetail").append(item);
  $(`#${prod.id}`).data('product', prod);
}

function createPhotoProdutoSlider(photos) {
  let elem = "";
  photos.forEach((element) => {
    elem += `
    <div class="swiper-slide">
       <img src="${element}"  />
    </div>
    `;
  });

  return elem;
}

function createPhotoProduto(photos) {
  let elem = "";

  photos.forEach((element) => {
    elem += `
    <div class="swiper-slide"> 
    <a href="${element}"
      data-fancybox="1">
        <img class="myimage"
          src="${element}" alt="gallery"/>
      </a>
    </div>
    `;
  });

  return elem;
}

function createDetailProduct(product, photos, slider) {

  let sizes = "";
  if (product.sizes.length > 0) {
    sizes = `Tamanhos: <br>`;
    product.sizes.forEach((element) => {
      sizes += `
      ${element.name}
    `;
    })
  }

  return `
  <div class="product-body">
                        <div class="pro-detail-sec row">
                            <div class="col-12">
                                <h4 class="pro-heading text-center center-text">Detalhes do produto</h4>
                            </div>
                        </div>
                        <div class="row product-list product-detail">

                            <div class="col-12 col-lg-6 product-detail-slider">
                                <div class="wrapper">
                                    <div class="Gallery swiper-container img-magnifier-container" id="gallery">
                                        <div class="swiper-wrapper myimgs">
                                          ${photos}                                      
                                        </div>
                                    </div>
                                    <div class="Thumbs swiper-container" id="thumbs">
                                        <div class="swiper-wrapper">
                                           ${slider}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-lg-6 text-center text-lg-left">
                                <div>
                                  <h4><span class="real-price">${product.name}</span></h4>
                                  <p>${product.description != null ? product.description : ""}</p>
                                  <p>${sizes}</p>

                                </div>
                                
                                <div class="product-single-price">
                                    <h4><span class="real-price">${product.valor_moeda}</span></h4>
                                </div>

                                

                                <div class="dropdown-divider"></div>
                                <div class="row">
                                    <div class="col-12 col-lg-9">
                                      <a id="${product.id}" class="btn yellow-color-green-gradient-btn listing-cart-icon add-to-cart" 
                                        onclick=addCart(${product.id})>
                                        Adicionar ao Carrinho
                                      </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  `;
}

function address() {
  let neighb = $("#registerNeighb").val();
  let adress = $("#registerAddress").val();
  user.address = adress + "Bairro:" + neighb;

}

function register() {
  let obj = {};

  obj.name = $("#registerName").val();
  obj.cell_phone = $("#registerCellPhone").val();
  obj.email = $("#registerEmail").val();
  obj.password = $("#registerPass").val();

  let $url = url + "client";
  $.ajax({
    type: "POST",
    crossDomain: true,
    dataType: "json",
    url: $url,
    data: obj,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", authorization);
      xhr.setRequestHeader("Company", company);
    },
    success: function (response) {
      let clientId = response.id;
      obj.id = clientId;
      user = obj;

      shoppingCart.addUserToCart();
      notificar("Cadastro efetuado com sucesso 😁", "snackbarRegister");
      $("#registerScreen").modal('hide');
      $("#addressScreen").modal('show');

    },
    error: function (data) {
      let errors = data.responseJSON.errors;
      Object.keys(errors).forEach(function (key) {
        notificar(errors[key], "snackbarRegister");
      });
    },
  });
}

function getCategories() {
  let $url = url + "categories";
  $.ajax({
    type: "GET",
    crossDomain: true,
    dataType: "json",
    url: $url,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Content-type",
        "application/json"
      );
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", authorization);
      xhr.setRequestHeader("Company", company);
    },
    success: function (response) {
      let categories = response.data;
      if (categories !== undefined) {
        categories.forEach((element) => {
          let row = createRowCategory(element);
          $(".categories").append(row);
        });
      }
    },
    error: function (data) {
      console.log("Ocorreu um erro ao listar as categorias" + JSON.stringify(data));
    },
  });
}

function getProducts($page) {

  if (!$page) {
    $page = 1;
  }

  let $url = url + "products?page=" + $page + "&per_page=20";
  $.ajax({
    type: "GET",
    crossDomain: true,
    dataType: "json",
    url: $url,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Content-type",
        "application/json"
      );
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", authorization);
      xhr.setRequestHeader("Company", company);
    },
    success: function (response) {
      
      let products = response.data;
      if (products !== undefined) {
        var $i = parseInt($page) - 2;
        var $i2 = parseInt($page) + 2;

        if ($i <= 0) {
          $i = 1;
        }

        products.forEach((element) => {
          let row = createRowProduct(element);
          let id = element.id;
          $("#productList").append(row);
          $(`#${id}`).data('product', element);
        });


        if (response.last_page > 1) {
          let $paginate = ``;
          if($i > 1 ){
            $paginate += `<li class="page-item"><a class="page-link" href="index.html?page=1">1</a></li>`
          }

          while ($i <= response.last_page && $i > 0 && $i <= $i2) {
            let active = "";
            if ($i == response.current_page) {
              active = "active";
            }

            $paginate += `<li class="page-item ${active}"><a class="page-link" href="index.html?page=${$i}">${$i}</a></li>`
            $i++;
          }

          if($i < response.last_page ){
            $paginate += `<li class="page-item"><a class="page-link" href="index.html?page=${response.last_page}">${response.last_page} </a></li>`
          }

          $("#paginateProduct").append($paginate);

        }
      }
    },
    error: function (data) {
      console.log("Ocorreu um erro ao listar os produtos" + JSON.stringify(data));
    },
    complete: () => $("#loaderAjax").hide()
  });

}

function getProductsCategory($category, $page) {

  if (!$page) {
    $page = 1;
  }
  let $url = url + `category/${$category}/products?page=${$page}&per_page=20`;
  $.ajax({
    type: "GET",
    crossDomain: true,
    dataType: "json",
    url: $url,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Content-type",
        "application/json"
      );
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", authorization);
      xhr.setRequestHeader("Company", company);
    },
    success: function (response) {
      let products = response.data;
      if (products !== undefined && products.length > 0) {

        var $i = parseInt($page) - 2;
        var $i2 = parseInt($page) + 2;

        if ($i <= 0) {
          $i = 1;
        }

        products.forEach((element) => {
          let row = createRowProduct(element);
          let id = element.id;
          $("#productList").append(row);
          $(`#${id}`).data('product', element);
        });

        if (response.last_page > 1) {
          let $paginate = ``;
          
          if($i > 1 ){
            $paginate += `<li class="page-item"><a class="page-link" href="product-listing.html?category=${$category}&page=1">1</a></li>`
          }
          
          while ($i <= response.last_page && $i > 0 && $i <= $i2) {

            let active = "";
            if ($i == response.current_page) {
              active = "active";
            }
            $paginate += `<li class="page-item ${active}">
            <a class="page-link" href="product-listing.html?category=${$category}&page=${$i}">${$i}</a>
            </li>`
            $i++;
          }

          if($i < response.last_page ){
            $paginate += `<li class="page-item"><a class="page-link" href="product-listing.html?category=${$category}&page=${response.last_page}">${response.last_page} </a></li>`
          }


            $("#paginateProduct").append($paginate);
          }
      } else {
        notificar("Ainda não temos nenhum produto nesta categoria. Mas já estamos trabalhando nisso 😁", false);
        emptyCategory();
      }
    },
    error: function (data) {
      console.log("Ocorreu um erro ao listar os produtos por categoria" + JSON.stringify(data));
    },
    complete: () => $("#loaderAjax").hide()
  });
}

// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  user = {};

  // Constructor
  function Item(product, count) {
    this.id = product.id;
    this.name = product.name;
    this.valor = product.sale_value;
    this.valor_moeda = product.sale_value;
    this.control_quantity = true;

    this.photo = `images/img/produtos/${product.product_code}.jpg`;
    this.quantity = product.quantity;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }

  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  // Save User
  function saveUser() {
    sessionStorage.setItem('userLogged', JSON.stringify(user));
  }

  // Load User
  function loadUser() {
    user = JSON.parse(sessionStorage.getItem('userLogged'));
  }

  if (sessionStorage.getItem("userLogged") != null) {
    loadUser();
  }


  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function (product, count) {
    let id = product.id;

    for (var item in cart) {
      if (cart[item].id === id) {
        notificar("Produto já está adicionado ao carrinho 😁", false);
        return;
      }
    }

    var item = new Item(product, count);
    cart.push(item);
    saveCart();
    notificar("Produto adicionado ao carrinho 😁", false);
  }

  obj.addUserToCart = function () {
    saveUser();
  }

  // Set count from item
  obj.setCountForItem = function (id, count) {

    for (var i in cart) {
      if (cart[i].id == id) {
        cart[i].count = count;
        break;
      }
    }
  };


  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }

  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].id === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      console.log("aaaaaaaa");
      console.log(cart);
      let value = parseFloat(cart[item].valor.replace(',','.').replace(' ',''))
      totalCart += value * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // user : Array
  // Item : Object/Class
  // User : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  // saveUser : Function
  // loadUser : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

function addCart(element) {

  let product = $(`#product-${element}`).data('product');

  $valor = Number(product.sale_value);
  shoppingCart.addItemToCart(product, 1);
  displayCart();
}

// Clear items
$('.clear-cart').click(function () {
  shoppingCart.clearCart();
  displayCart();
});

function verifyUser()
{
  let userLogged = displayUser();
  if (isEmpty(userLogged)) {
    showFormLogin();
  }else{
    getSalesClient(userLogged);
  }
}

function getSalesClient($user)
{
  let $page = getUrlParameter('page');
  if (!$page) {
    $page = 1;
  }

  let obj = {
    'email':$user.email,
    'password':$user.password,
  };

  let $url = url + "sales/client?page=" + $page + "&per_page=10";
  $.ajax({
    type: "POST",
    crossDomain: true,
    dataType: "json",
    url: $url,
    data: obj,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", authorization);
      xhr.setRequestHeader("Company", company);
    },
    success: function (response) {
      let sales = response.data;
      let row = '';
      if (sales !== undefined && sales.length > 0) {

        let i3 = 0;
        sales.forEach((element) => {
          row = createRowSale(element,i3);
          $("#requestsList").append(row);
          i3++;
        });

        var $i = parseInt($page) - 2;
        var $i2 = parseInt($page) + 2;

        if ($i <= 0) {
          $i = 1;
        }


        if (response.last_page > 1) {
          let $paginate = ``;
          if($i > 1 ){
            $paginate += `<li class="page-item"><a class="page-link" href="list-cart.html?page=1">1</a></li>`
          }

          while ($i <= response.last_page && $i > 0 && $i <= $i2) {
            let active = "";
            if ($i == response.current_page) {
              active = "active";
            }

            $paginate += `<li class="page-item ${active}"><a class="page-link" href="list-cart.html?page=${$i}">${$i}</a></li>`
            $i++;
          }

          if($i < response.last_page ){
            $paginate += `<li class="page-item"><a class="page-link" href="list-cart.html?page=${response.last_page}">${response.last_page} </a></li>`
          }

          $("#paginateProduct").append($paginate);
          $("#loaderAjax").hide();
        }




      }else{
        row = createNoRowSale();
        $("#requestsList").append(row);
      }
    },
    error: function (data) {
      let errors = data.responseJSON.errors;
      Object.keys(errors).forEach(function (key) {
        notificar(errors[key], "snackbar");
      });
    },
    complete: () => $("#loaderAjax").hide()
  });
}

function addSaleProductsModal(sale)
{
  $("#productsListsale").html('');
  let products = '';
  sale.products.forEach((element) => {
    products += `<p class='media-body mt-auto mb-auto'>${element.quantity}x  ${element.name} (${element.valor_moeda})</p>`;
  });
  $("#productsListsale").append(products);
}

function createNoRowSale()
{
  return `<div class="media">
  <div class="media-body mt-auto mb-auto center center-text text-center">
      <h5 class="name">
      <a href="#">Você ainda não possui pedidos</a>
      </h5>
      </div>
</div>`
}
function createRowSale(element,i)
{
  let products = '';
  element.products.forEach((product) => {
    products += `${product.quantity}x - ${product.name}(${product.valor_moeda})<br>`;
  });


  return `
  <div class="accordion" id="accordionExample${i}">
  <div class="media">
     <div class="media-body mt-auto mb-auto center center-text text-center">
         <h5 class="name">
            <a href="#">${element.date_sale}</a>
         </h5>
         <p class="center"><span>${element.amount}</span></p>
         <p class="center"><span>Status: ${element.status != false ? element.status : 'Processando'} </span></p>
      </div>
  </div>
    <div class="card">
      <div class="card-header" id="${i}">
        <h5 class=" mt-auto mb-auto center center-text text-center">
          <button class="clear-cart btn pink-gradient-btn-into-transparent btnCart" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-controls="collapse${i}">
            Ver Produtos
          </button>
        </h5>
      </div>
    <div id="collapse${i}" class="collapse " aria-labelledby="${i}" data-parent="#accordionExample${i}">
      <div class="card-body mt-auto mb-auto center center-text text-center">
        ${products}
      </div>
    </div>
  </div>
  `
}

function showFormLogin()
{
  let div = `
  <div class="signup-form">
  <!--  START MANAGE CONTEND  -->
  <div class="about_content">
      <div class="container">
          <div class="row">
              <div class="col-12  col-lg-8 offset-lg-2 text-center wow slideInUp" data-wow-duration="2s" style="visibility: visible; animation-duration: 2s; animation-name: slideInUp;">
                  <h1 class="heading">Área do Cliente</h1>
                  <p class="para_text mt-3">
                      Faça login para continuar
                  </p>
              </div>
          </div>
      </div>

      <div class="offset-lg-3  whitebox" id="loginForm">
          <div class="widget logincontainer">
              <form class="getin_form border-form" id="register">
                  <div class="row">
                      <div class="col-md-12 col-sm-12">
                          <div class="form-group bottom35">
                              <label for="email" class="d-none"></label>
                              <input class="form-control" type="email" placeholder="Email:" required="" id="loginEmail">
                          </div>
                      </div>
                      
                      <div class="col-md-12 col-sm-12">
                          <div class="form-group bottom35">
                              <label for="password" class="d-none"></label>
                              <input class="form-control" type="password" placeholder="Senha:" required="" id="loginPassword">
                          </div>
                      </div>
                  
                      <div class="col-sm-12">
                          <a onclick="requestLogin()" class="btn pink-gradient-btn-into-black text-white">Login</a>
                          <p class="top20 SignInclass"> Esqueceu a senha? &nbsp;<a  href="#" onclick="passwordRescue(true)">Recuperar senha</a> </p>
                      </div>
                  </div>
              </form>
          </div>
      </div> 

  
      <div class="offset-lg-3  whitebox hidden" id="forgotForm" >
          <div class="widget logincontainer">
              <form class="getin_form border-form" id="register">
                  <div class="row">
                      
                      <div class="col-md-12 col-sm-12">
                          <div class="form-group bottom35">
                              <label for="email" class="d-none"></label>
                              <input class="form-control" type="email" placeholder="Email:" required="" id="email">
                          </div>
                      </div>
                  
                      <div class="col-sm-12">
                          <button type="submit" class="btn pink-gradient-btn-into-black">Recuperar senha</button>
                          <p class="top20 SignInclass"> Voltar para o &nbsp;<a href="#" onclick="passwordRescue(false)">Login</a> </p>
                      </div>
                  </div>
              </form>
          </div>
      </div> 
  </div>
</div>    
  `;

  $("#requestsList").append(div);
}

function requestLogin()
{
  let obj = {};

  obj.email = $("#loginEmail").val();
  obj.password = $("#loginPassword").val();

  let $url = url + "client/find";
  $.ajax({
    type: "POST",
    crossDomain: true,
    dataType: "json",
    url: $url,
    data: obj,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", authorization);
      xhr.setRequestHeader("Company", company);
    },
    success: function (response) {
      let client = response.client;
      user = client;
      user.password = obj.password;
      user.email = obj.email;

      shoppingCart.addUserToCart();
      $("#requestsList").hide();
    },
    error: function (data) {
      notificar(data.responseJSON.message, "snackbar")
      console.log("Ocorreu um erro ao realizar o login" + JSON.stringify(data));
    }
  });
}

function login() {
  $("#loaderAjaxLogin").show();
  let obj = {};
  obj.email = $("#loginEmail").val();
  obj.password = $("#loginPass").val();
  let $url = url + "client/find";
  $.ajax({
    type: "POST",
    crossDomain: true,
    dataType: "json",
    url: $url,
    data: obj,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", authorization);
      xhr.setRequestHeader("Company", company);
    },
    success: function (response) {
      let client = response.client;
      user = client;
      user.password = obj.password;
      user.email = obj.email;
      shoppingCart.addUserToCart();
      $('#loginScreen').modal('hide');
      $('#registerScreen').modal('hide');
      if (client.address) {
        $("#actAdress").val(client.address);
        $("#confirmAddressScreen").modal('show');
      } else {
        $("#addressScreen").modal('show');
      }
      
    },
    error: function (data) {
      notificar(data.responseJSON.message, "snackbarLogin")
      console.log("Ocorreu um erro ao realizar o login" + JSON.stringify(data));
    },
    complete: () => $("#loaderAjaxLogin").hide()
  });
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function showRegister() {
  if (cart.length <= 0) {
    notificar("Nenhum produto adicionado ao carrinho 🥺", false);
  } else {
    let userLogged = displayUser();
    if (isEmpty(userLogged)) {
      $('#loginScreen').modal('hide');
      $('#registerScreen').modal('show');
    } else {
      if (userLogged.address) {
        $("#actAdress").val(userLogged.address);
        $("#confirmAddressScreen").modal('show');
      } else {
        $("#addressScreen").modal('show');
      }
    }
  }
}

function finishSale() {
  let div = `
  <h4 class="center-text text-center">Prontinho 😍</h4>
  <img src='shop/img/delivery.gif' alt='images img-responsive' style="max-height: 400px; max-width: 400px;">
  <h5 class="center-text text-center">Um de nossos operadores já irá entrar em contato com você para definir o horário de entrega e forma de pagamento</h5>
  <a class="nav-link" href="index.html">Ir para o início</a>
  `;

  $("#saleFinish").append(div);
}

function emptyCategory() {

  let div = `
  <br>
  <img src='images/shop/emptycart.gif' alt='images img-responsive' style="max-height: 400px; max-width: 400px;">
  <h5 class="center-text text-center">Por favor, selecione outra categoria</h5>
  <br>
  `;
  $("#emptyCategory").append(div);

}

function emptyCategoryProduct() {

  let div = `
  <br>
  <div class="text-center">
  <img src='shop/img/emptycart.gif' alt='images img-responsive' style="max-height: 400px; max-width: 400px;">
  <h5 class="center-text text-center">Por favor, selecione um produto</h5>
  </div>
  <br>
  `;
  $("#productDetail").append(div);

}

function emptyCart() {

  let div = `
  <div class="text-center">
  <img src='images/shop/emptycart.gif' alt='images img-responsive' style="max-height: 400px; max-width: 400px;">
  <h5 class="center-text text-center">Seu carrinho está vazio 😅</h5>
  </div>
  <br>
  `;

  $('.show-cart').append(div);
}

function enviarMensagem(texto){
	var celular = "5514991184850";
  textoParser = window.encodeURIComponent(texto);
  window.location.replace("https://api.whatsapp.com/send?phone=" + celular + "&text=" + textoParser);
}

function confirmSale() {
  $("#loaderAjaxSale").show();


  let obj = {};
  var cartArray = shoppingCart.listCart();
  let products = [];
  obj.amount_paid = shoppingCart.totalCart();

  let userLogged = displayUser();
  obj.client_id = userLogged.id;
  obj.password = userLogged.password;

  let textString = 'Compra no TheBoss 😊\n\n*Produtos*\n';

  for (var i in cartArray) {
    let id = cartArray[i].id;
    products.push(id);
    $qtd = `qtde${id}`;
    obj[$qtd] = cartArray[i].quantity;
    $size = `size${id}`
    obj[$size] = $(`#size${id}`).val();
    textString += `${cartArray[i].quantity}x - ${cartArray[i].name} -  ID(${cartArray[i].id}) \n`;
  }
  
  obj.products = products;
  obj.user_id = userSale;

  let $url = url + "sales";

  $.ajax({
    type: "POST",
    crossDomain: true,
    dataType: "json",
    url: $url,
    data: obj,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", authorization);
      xhr.setRequestHeader("Company", company);
    },
    success: function (response) {
      finishSale();
      shoppingCart.clearCart();
      $("#product-listing").hide();
      $("#confirmAddressScreen").modal('hide');

      setTimeout(() => { 
        enviarMensagem(textString);
      }, 3000);
    },
    error: function (data) {
      
      $("#confirmAddressScreen").modal('show');

      let message = "Ocorreu um erro ao realizar a venda"

      if(data.responseJSON){
        message = data.responseJSON.message;
      }

      notificar(message, "snackbarSale")
      console.log("Ocorreu um erro ao cadastrar o cliente" + JSON.stringify(data));
    },
    complete: () => $("#loaderAjaxSale").hide()
  });
}

function updateAddress() {
  $("#loaderAjaxUpdate").show();
  let cep = $("#registerCep").val();
  let city = $("#registerCity").val();
  let address = $("#registerAddress").val();
  let number = $("#registerAddressNumber").val();
  let neigh = $("#registerNeighb").val();
  let complem = $("#registerComplem").val();
  let addressComp = `${address}, ${number}`;

  let userLogged = displayUser();

  userLogged.address = addressComp;
  userLogged.cep = cep;
  userLogged.city = city;
  userLogged.neighborhood = neigh;
  userLogged.complement = complem;



  let $url = url + "client";
  $.ajax({
    type: "POST",
    crossDomain: true,
    dataType: "json",
    url: $url,
    data: userLogged,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", authorization);
      xhr.setRequestHeader("Company", company);
    },
    success: function (response) {
      shoppingCart.addUserToCart();
      let userLogged = displayUser();

      $('#loginScreen').modal('hide');
      $('#registerScreen').modal('hide');
      $('#addressScreen').modal('hide');
      
      if (userLogged.address) {
        $("#actAdress").val(userLogged.address);
        $("#confirmAddressScreen").modal('show');
      } else {
        $("#addressScreen").modal('show');
      }
    },
    error: function (data) {
      
      console.log("Ocorreu um erro ao cadastrar o cliente" + JSON.stringify(data));
      notificar(data.responseJSON.message, "snackbarUpdate")
    },
    complete: () => $("#loaderAjaxUpdate").hide()
  });
}

function anotherAddress() {
  $("#confirmAddressScreen").modal('hide');
  $("#addressScreen").modal('show');
}

function showLogin() {
  if (cart.length <= 0) {
    notificar("Nenhum produto adicionado ao carrinho 🥺", false);
  } else {
    $('#registerScreen').modal('hide');
    $('#loginScreen').modal('show');
  }
}

function updateYear() {
  let year = new Date().getFullYear();
  $(".year").append(year)
}

function displayUser() {
  return user;

}

function totalValueCart()
{
  $('.total-cart').html(shoppingCart.totalCart().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
  $('.total-count').html(shoppingCart.totalCount());
}

function displayCart() {
  var cartArray = shoppingCart.listCart();

  let output = "";
  for (var i in cartArray) {
    let quant = `Unidade(s) disponível(is): ${cartArray[i].quantity}<br>`;

    output += `
    <div class="media">
      <div class="img-holder ml-1 mr-2">
          <a href="#"><img src="${cartArray[i].photo}"
          class="align-self-center img-responsive img-rounded"
          style="max-height: 100px; max-width: 100px;">
          </a>
      </div>
      <div class="media-body mt-auto mb-auto">
          <h5 class="name"><a href="#">${cartArray[i].name}</a></h5>
          ${quant}
          <p class="price"><span>${cartArray[i].valor_moeda}</span>(${cartArray[i].count}) <a href="#"  id='del${cartArray[i].id}' onclick=removeItemCart("del${cartArray[i].id}")> <i
          class="fa fa-trash dustbin delete-item "></i></a></p>
          <label for="quant${cartArray[i].id}" >Quantidade:</label>
          <input type='number' id="quant${cartArray[i].id}" class='item-count form-control' min="1" data-id='${cartArray[i].id}' data-control_quantity='${cartArray[i].control_quantity}' data-quantity='${cartArray[i].quantity}' value='${cartArray[i].count}'>
        
          </div>
    </div>`;
  }

  $('.show-cart').html(output);

  for (var i2 in cartArray) {
    $(`#del${cartArray[i2].id}`).data('product', cartArray[i2]);
  }

  totalValueCart();

  if (cartArray.length <= 0) {
    return emptyCart();
  }

}

// Delete item button

function removeItemCart(element) {
  let prod = $(`#${element}`).data('product');
  for (var item in cart) {
    if (cart[item].id === prod.id) {
      cart.splice(item, 1);
      break;
    }
  }

  sessionStorage.setItem('shoppingCart', JSON.stringify(cart));

}

$('.show-cart').on("click", ".delete-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
  var id = $(this).data('id');
  var count = Number($(this).val());

  let prod = $(`#del${id}`).data('product');
  let control = prod.control_quantity;
  let quantity = prod.quantity;

  shoppingCart.setCountForItem(prod.id, count);

  if (control && quantity < count) {
    $(this).val(1);
    shoppingCart.setCountForItem(prod.id, 1);
    totalValueCart();
    return notificar("Quantidade inválida para esse produto");
  }

  displayCart();
});

displayCart();
$(document).ready(function () {
  updateYear();
});

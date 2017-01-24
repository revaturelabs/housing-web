angular.module('congo', ['ui.router'])
.config(function ($stateProvider) {
    $stateProvider
    .state('home', {
        url: "",
        templateUrl: "views/home.html",
    })
    .state('products', {
        url: "/products",
        templateUrl: "views/productList.html",
    })
    .state('product', {
        url: "/products/{ProductID}",
        controller: "productCtrl",
        templateUrl: "views/product.html",
    })
    .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
    })
    .state('createAccount', {
        url: "/createaccount",
        templateUrl: "views/createAccount.html",
    })
    .state('cart', {
        url: "/cart",
        controller: "cartCtrl",
        templateUrl: "views/Cart.html",
    })
    .state('checkout',{
        url:"/checkout",
        controller: "stripeCtrl",
        templateUrl: "views/checkout.html",
    })
    .state('orders', {
        url: "/orders",
        controller: "ordersCtrl",
        templateUrl: "views/orders.html"
    })
    .state('order', {
        url: "/order/{OrderID}",
        params: {
            message: null
        },
        controller: "orderCtrl",
        templateUrl: "views/Cart.html"
    });
});
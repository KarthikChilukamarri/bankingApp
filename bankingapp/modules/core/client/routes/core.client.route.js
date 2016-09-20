/**
 * Created by MrKK on 9/6/16.
 */

angular.module('index')
    .config(function($stateProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'modules/core/client/views/core/home.client.tpl.html'
            })
            .state('custInfo', {
                url: 'myInfo',
                templateUrl: 'modules/core/client/views/core/myInfo.client.tpl.html'
            })
            .state('custData', {
                url: 'custData',
                templateUrl: 'modules/core/client/views/core/customer.client.tpl.html',
                controller: 'customerCtrl'
            })
            .state('create', {
                url: '/create',
                templateUrl: 'modules/core/client/views/core/create.client.tpl.html'
            })
            .state('update', {
                url: '/update',
                templateUrl: 'modules/core/client/views/update.client.tpl.html'
            })
            .state('delete',{
                url: '/delete/:id',
                templateUrl: 'modules/core/client/views/core/delete.client.tpl.html',
                controller: 'deleteCtrl',
                resolve: {
                    id : function($stateParams) {
                        return $stateParams.id
                    }
                }
            })
            .state('deposit', {
                url: '/deposit',
                templateUrl: 'modules/core/client/views/core/deposit.client.tpl.html',
                controller: 'depositCtrl'
            })
            .state('withdraw',{
                url: '/withdraw',
                templateUrl: 'modules/core/client/views/core/withdraw.client.tpl.html',
                controller: 'withdrawCtrl'
            })
            .state('transfer',{
                url: '/transfer',
                templateUrl: 'modules/core/client/views/core/transfer.client.tpl.html',
                controller: 'transferCtrl'
            })
            .state('display', {
                url: '/display',
                templateUrl: 'modules/core/client/views/core/display.client.tpl.html',
                controller: 'displayCtrl'

            })

    });




/*angular.module('login')
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            /!*.state('signup',{
                url: '/signup',
                templateUrl: 'modules/core/client/views/login/signup.client.tpl.html'
            })
            .state('login', {
                url:'/login',
                templateUrl: 'modules/core/client/views/login/login.client.tpl.html'
            })*!/
            .state('app', {
                url: '/app',
                templateUrl: 'modules/core/client/views/login/base.client.tpl.html'
            })
            .state('app.signup',{
                url: '/signup',
                templateUrl: 'modules/core/client/views/login/signup.client.tpl.html',
                controller: 'signupCtrl'
            })
            .state('app.login',{
                url: '/login',
                templateUrl: 'modules/core/client/views/login/login.client.tpl.html',
                controller: 'loginCtrl'
            })

        $urlRouterProvider.otherwise('/app/login');

    })*/
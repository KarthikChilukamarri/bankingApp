/**
 * Created by MrKK on 9/6/16.
 */
'use strict';

var ApplicationConfiguration = (function(){

    var _applicationModuleName = 'BankingApp';
    var _applicationDependencies = ['ui.router'];
    var _loginModuleName = 'Login';
    var _loginDependencies = ['ui-router'];

    var _registerModule = function(moduleName, dependencies){

        angular.module(moduleName, dependencies || []);
        angular.module(_applicationModuleName).requires.push(moduleName);
    }

    return {
        applicationModuleName : _applicationModuleName,
        applicationDependencies: _applicationDependencies,
        loginModuleName: _loginModuleName,
        loginDependencies: _loginDependencies,
        registerModule: _registerModule
    }

})();
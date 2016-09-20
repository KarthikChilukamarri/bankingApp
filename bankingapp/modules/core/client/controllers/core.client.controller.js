/**
 * Created by MrKK on 9/6/16.
 */
'use strict';


angular.module('index', ['ui.router'])
    .controller('mainCtrl', ['$scope', 'httpService', function($scope, httpService){
        console.log("KK");
    }])
    .controller('infoCtrl',['$scope', '$state', 'httpService', 'dataFactory', function($scope, $state, httpService, dataFactory){
        $scope.getInfo = function(id){
            httpService.getInfo(id)
                .success(function(data){
                    var custInfo = data.CustomerInfo;
                    dataFactory.setData(custInfo);
                    console.log(dataFactory.getData());
                    $state.go('display');
                })
                .error(function(data){
                    console.log(data);
                });
            //console.log(custInfo);
            //$state.go('display', {info: custInfo});
        }
    }])

    .controller('displayCtrl', ['$scope', '$state', '$stateParams', 'httpService', 'dataFactory', function($scope, $state, $stateParams, httpService, dataFactory){
       var info = dataFactory.getData();

        $scope.custInfo = info;

        var address = info.address,
            account = info.accountInfo,
            branch = info.branchInfo,
            baseInfo = {
                'firstName': info.firstName,
                'lastName': info.lastName,
                'iD': info.id
            }
        $scope.address = address;
        $scope.account = account;
        $scope.branch = branch;
        $scope.baseInfo = baseInfo;

        var baseKey = ['First Name', 'Last Name', 'ID'],
            braKey = [ "Branch Code", "Branch Location", "Branch Name"],
            accKey = ["Account Number", "Cash", "Date Of Creation", "Account Type"],
            addKey = ["Phone", "Zip", "Email", "City", "Date Of Creation", "Street"];
        $scope.baseKey = baseKey;
        $scope.accKey = accKey;
        $scope.braKey = braKey;
        $scope.addKey = addKey;

    }])
    .controller('createCtrl', ['$scope', 'httpService', 'dataFactory', '$state', function($scope, httpService, datFactory , $state){
        $scope.create = function(cust) {
            httpService.createAccount(cust)
                .success(function(data){
                    console.log(data);
                    $state.go('home');
                    /*httpService.getInfo(data._id)
                        .success(function(data){
                            datFactory.setData(data);
                            $state.go('display');
                        })
                        .error(function(data){
                            console.log("Error in fetching info: "+data);
                        });*/
                })
                .error(function(data){
                    console.log('Error in creating account: '+data);
                })
        }
    }])

    .controller('depositCtrl', ['$scope', 'httpService', function($scope, httpService){
        console.log('Deposit');
        $scope.deposit = function(cust){
            console.log("Inside Deposit");
            httpService.deposit(cust)
                .success(function(data){
                    console.log(data);
                })
                .error(function(data){
                    console.log(data);
                })
            
        }
    }])

    .controller('withdrawCtrl', ['$scope', 'httpService', function($scope, httpService){
        console.log("In withdraw");
        $scope.withdraw = function(cust){
            console.log(cust);
            httpService.withdraw(cust)
                .success(function(data){
                    console.log(data);
                })
                .error(function(data){
                    console.log(data);
                })
        }

    }])

    .controller('transferCtrl', ['$scope', 'httpService', function($scope, httpService){
        console.log("Inside transfer");
        $scope.transfer = function(cust){
            httpService.transfer(cust)
                .success(function(data){
                    console.log(data);
                })
                .error(function(data){
                    console.log(data);
                })
        }
    }])

    .controller('customerCtrl', ['$scope', '$state', 'httpService', function($scope, $state, httpService){
        console.log('Customer Controller');
        httpService.getAll()
            .success(function(data){
                var cust = data,
                    keys = ['First Name', 'Last Name', 'ID', 'Checking ID', 'Savings ID'];
                $scope.keys = keys;
                $scope.custs = cust;
                console.log(keys);
                console.log(cust);
                //console.log(data);
            })
            .error(function(err){
                console.log(err);
            })

        $scope.delete = function(cust){
            $state.go('delete', {'id': cust._id});
        }

    }])

    .controller('deleteCtrl', ['$scope', '$state', '$stateParams', 'httpService', function($scope, $state, $stateParams, httpService){
        console.log("Inside delete");
        var id = $stateParams.id;
        console.log(id);
        $scope.id = id;
        $scope.delete = function(id)
        {
            httpService.delete(id)
                .success(function(data){
                    console.log(data);
                    $scope.id = "";
                    $state.go('custData');
                })
                .error(function(err){
                    console.log(err);
                })
        }
    }])

    .service('httpService', ['$http', function($http){
        
        this.getInfo = function(id){
            return $http.get('/api/CustomerInfo/'+id);
        },

        this.createAccount = function(cust){
            return $http.post('/api/createAccount', cust);
        },
        
        this.deposit = function(cust){
            return $http.post('/api/depositMoney', cust);
        }

        this.withdraw = function(cust){
            return $http.post('/api/withdrawMoney', cust);
        }

        this.transfer = function(cust){
            return $http.post('/api/transferMoney', cust);
        }

        this.getAll = function(){
            return $http.get('/api/allCustomers');
        }

        this.delete = function(id){
            return $http.delete('/api/CustomerInfo/'+id);
        }
    }])

.factory('dataFactory', function () {

    var data = {};

    return {
        getData: function () {
            return data;
        },
        setData: function (obj) {
            data = obj;
        }
    };
});

/*
angular.module('login',['ui.router'])

    .controller('signupCtrl', ['$scope', 'httpService', function($scope, httpService){

        $scope.submit = function(user){
            httpService.signup(user)
                .success(function(data){
                    console.log(data);
                    for(var p in user){
                        if(user.hasOwnProperty(p)){
                            user[p]="";
                        }
                    }
                })
                .error(function(data){
                    console.log(data);
                });
        }

    }])
    .controller('loginCtrl', ['$scope', 'httpService', '$state', function($scope, httpService, $state){
        

        $scope.submit = function(user){
            httpService.login(user)
                .success(function(data){
                    console.log(data);
                })
                .error(function(data){
                    console.log(data);
                });
        }
    }])

    .service('httpService',['$http', function($http){

        var urlBase = "/api/";

        this.signup = function(user){
                return $http.post(urlBase+"signup", user);
        }

        this.login = function(user){
            return $http.post(urlBase+"login", user);
        }
    }]);*/

/**
 * Created by MrKK on 9/1/16.
 */

var controller = require('../controllers/core.server.controller');
var mainController = require('../controllers/main.server.controller');

module.exports = function(app) {
    
    app
        .route('/')
        .get(mainController.index);
    
   /* app
        .route('/api/profile')
        .get(mainController.index);
*/
    app
        .route('/api/createAccount')
        .post(controller.createAccount);

    /*app
        .route('/api/login')
        .post(controller.login);

    app
        .route('/api/dashboard')
        .get(mainController.index);*/
    /*app
        .route('/api/Accounts')
        .post(controller.createAccount)
        .get(controller.getAllAccounts);*/
    
    app
        .route('/api/CustomerInfo/:id')
        .get(controller.getCustomerInfo)
        .delete(controller.deleteAccount)
        .put(controller.updateAccount);
    
    app
        .route('/api/depositMoney')
        .post(controller.depositMoney);
    
    app
        .route('/api/withdrawMoney')
        .post(controller.withdrawMoney);
    
    app
        .route('/api/transferMoney')
        .post(controller.transferMoney);

    app
        .route('/api/allCustomers')
        .get(controller.getAllCustomers)
}
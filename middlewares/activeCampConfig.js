const ActiveCampaign = require("activecampaign");

const {API_KEY, API_URL } = process.env
 
    const ac = new ActiveCampaign(API_URL, {API_KEY});
 
    // TEST API credentials
    ac.credentials_test().then(function(result) {
        // successful request
        if (result.success) {
            // VALID ACCOUNT
        } else {
            // INVALID ACCOUNT
        }
    }, function(result) {
        // request error
    });
 
    // GET requests
 
    var account_view = ac.api("account/view", {});
    account_view.then(function(result) {
        // successful request
        console.log(result);
    }, function(result) {
        // request error
    });
 
    var contact_exists = ac.api("contact/view?email=test@example.com", {});
    contact_exists.then(function(result) {
        // successful request
        console.log(result);
    }, function(result) {
        // request error
    });
 
    // POST request
 
    var list = {
        name: "List 3",
        sender_name: "My Company",
        sender_addr1: "123 S. Street",
        sender_city: "Chicago",
        sender_zip: "60601",
        sender_country: "USA"
    };
 
    var list_add = ac.api("list/add", list);
    list_add.then(function(result) {
        // successful request
        console.log(result);
    }, function(result) {
        // request error
    });
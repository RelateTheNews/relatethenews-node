'use strict';

RelateTheNews.DEFAULT_HOST = "";
RelateTheNews.DEFAULT_PORT = "443";
RelateTheNews.DEFAULT_BASE_PATH = "";
RelateTheNews.DEFAULT_API_VERSION = null;

RelateTheNews.EMAIL = null;
RelateTheNews.PASSWORD = null;
RelateTheNews.API_KEY = null;

function RelateTheNews(){
    if (!(this instanceof RelateTheNews)) {
        return new RelateTheNews();
    }
}

RelateTheNews.prototype = {
    /**
     * setupAJAX is used to setup ALL ajax calls. RelateTheNews custom
     *  API key header and insures that the ajax call uses the supplied
     *  credentials.
     *  
     *  This MUST be called prior to any other API requests.
     *  
     * @returns {undefined}
     */
    setupAJAX: function(){
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-RTN-API-key', this.API_KEY); 
            }
        });

        $(document).ajaxSend(function (event, xhr, settings) {
            settings.xhrFields = {
                withCredentials: true
            };
        });
    },//setupAJAX

    login: function(){

    },//login
    
    login_jquery: function(){
        this.setupAJAX();

        var apiURL = this.DEFAULT_HOST+"/"+"login";

        $.post(apiURL, { email: this.EMAIL, password: this.PASSWORD})
                .done(function (data){
                    console.log("done"+data);
                })
                .fail(function(data){console.log("fail"+data)})
                .always(function(data){console.log("always"+data)});
      
    },
    
    login_request: function(){
        var native_request = require('request');

        require('request').debug = true;
                
        var headers = {
            'X-RTN-API-key': this.API_KEY,
            'User-Agent': 'Super Agent/0.0.1'
        };
 
        
        var options = {
            uri: "https://"+this.DEFAULT_HOST+"/login",
            method: "POST",
            headers: headers,
            form: {
                email: this.EMAIL,
                password: this.PASSWORD
            }
        };
        
        console.log("Options " + JSON.stringify(options));
        
        debugger;
        var bob = native_request(options, function(err, res, body) {
            debugger;
            console.log("Body" + body);
            console.log("Error" + err);
            console.log("Response" + res);
        });
        
       console.log(bob);
    },
    
    login_native_0: function(){
        var https = require('https');
        var querystring = require('querystring');
        
        var postData = querystring.stringify({
            'email': this.EMAIL,
            'password': this.PASSWORD
        });
        
        console.log( this.DEFAULT_HOST);
        
        var options = {
            hostname: this.DEFAULT_HOST,
            port: this.DEFAULT_PORT,
            path: '/login',
            method: 'POST',
            headers: {
              'X-RTN-API-key': this.API_KEY,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(postData),
              'User-Agent': 'Super Agent/0.0.1'
            },
        };
        
        var req = https.request(options, function(res) {
            debugger;
          console.log('Status: ' + res.statusCode);
          console.log('Headers: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (body) {
            console.log('Body: ' + body);
          });
        });
        
        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });
        
        //debugger;
        // write data to request body
        req.write(postData);
        req.end();
        
        console.log(req);
        
    },
    
    login_native_1: function(){
        var https = require('https');
        var querystring = require('querystring');
        
        var postData = querystring.stringify({
            'email': this.EMAIL,
            'password': this.PASSWORD
        });
        
        var headers = {
            'X-RTN-API-key': this.API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'Super Agent/0.0.1'
        };
        
        var req = https.request({
            hostname: this.DEFAULT_HOST,
            port: this.DEFAULT_PORT,
            path: '/login',
            method: 'POST',
            headers: headers,
            ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
        });
          
        debugger;

        req.setTimeout(480);
        
        req.on('response', function (response){
            console.log("response"+response);
        });
        req.on('error', function(error){
            console.log("error"+error);
        });

        req.on('socket', function(socket) {
            console.log("In socket");
            
            socket.on('connect', function() {
                  console.log("Secure Connect");
                // Send payload; we're safe:
                req.write(postData);
                req.end();
            });
        });
    },

    apiRequest: function(URI, returnType, callback){
        this.setupAJAX();

        if (returnType = 'JSON'){
            $.getJSON(URI, callback);   
        } else {
            $.get(URI, callback);
        }
    },//apiRequest

    logout: function(){
        this.setupAJAX();

        var apiURL = this.DEFAULT_HOST+"/"+"logout";

        $.getJSON(apiURL);

    },//logout
};

module.exports = RelateTheNews;
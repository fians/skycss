
var phantom = require('phantom');
var extractor = require('./extractor.js');

phantom.create(function (ph) {
    ph.createPage(function (page) {
        
        page.set('viewportSize', {width:640, height:480});
        page.set('settings.userAgent', 'Chrome');
        
        page.open('http://fian.my.id', function (status) {
            
            page.evaluate(extractor, function(result) {
            
                console.log(result);

                ph.exit();
                
            });
        });
    });
});


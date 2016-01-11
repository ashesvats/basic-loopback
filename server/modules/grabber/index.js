var Flipkart=require('./flipkart.js');
var Amazon=require('./amazon.js');
var Q=require('q');

 var url='';
    website='';

var Grabber = module.exports = function(_url) {
  if (!(this instanceof Grabber)) return new Grabber(url);

  url=_url;

  website=checkUrl('url');
};

Grabber.prototype.fetch=function()
{
    var defer= Q.defer();
    var _object;
    switch (website)
    {
        case 'amazon':
            var amazon=Amazon(url);
            amazon.fetch().then(function(res)
            {
                defer.resolve(res);
            },function(err) {
                console.error('Error in retrieving amazon result ' + err);
                defer.reject(err);
            });
        break;
    }

    return defer.promise;
};

/*
* Check valid url
* */
function checkUrl(url)
{
  return 'amazon';
}
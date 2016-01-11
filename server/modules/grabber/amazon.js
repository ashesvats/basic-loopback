var request = require('request');
var cheerio=require('./cheerio/index.js');
var Q=require('q');
var url='',
    website='';

var Amazon = module.exports = function(_url) {
    url=_url;
    if (!(this instanceof Amazon)) return new Amazon(_url);
};

Amazon.prototype.fetch=function()
{var defer= Q.defer();
    request(url,function(error,response,html)
    {

        if(!error)
        {
            var $=cheerio.load(html);
            var title,price,seller;
            var json={title:'',price:'',seller:''};

            //price
            $('span#priceblock_ourprice').filter(function(){
                var data = $(this);
                price = data.text();
                json.price = data.text().trim();

            });
            //title
            $('h1#title').filter(function(){
                var data = $(this);
                title = data.children().first().text();
                json.title = title;
            });
           defer.resolve(json);
           return defer.promise;
        }
        else
        {
            console.error(JSON.stringify(error));
            return false;
        }
    });
};


Amazon.prototype.checkUrl=function(url)
{
    return 'amazon';
}

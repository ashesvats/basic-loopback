var cheerio = require('cheerio');
var grabber=require('./../modules/grabber');
var Q=require('q');
var request = require('request');

module.exports = function(app)
{
    app.get('/tools/grabber/flipkart',function(req,res)
    {

     console.log("server is started ");
        next();

    });

    app.get('/tools/grabber/amazon', function(req, res)
    {
        if(typeof req.query.url != 'undefined')
        {
            request(req.query.url,function(error,response,html)
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
                    console.log('Resuktr' + JSON.stringify(json));
                }
                else
                {
                    console.error('Error' + JSON.stringify(error));
                }
                res.json(json);
            });

        }
        else
        {
            res.send("Something went wrong");
        }
    });

}

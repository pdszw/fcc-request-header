'use strict';

module.exports = function(app) {
    app.get('/', function(req,resp) {
        var headersFull = req.headers;
        
        var ip = req.headers['x-forwarded-for'];
        var langRaw = req.headers['accept-language'];
        var osRaw = req.headers['user-agent'];

        // '^(.+?),'
        // ^ = match from beginning of string
        // (.+?) = capture ('()') zero or more characters ('.+') non-greedily ('?') until the first comma
        // without non-greedy, will match everything until the last comma
        var lang = langRaw.match(/^(.+?),/);  
        var lang = lang[1];
        
        var os = osRaw.match(/\((.*)\)/);
        var os = os[1];
        
        var objReqHead = {
            'ipaddress': ip,
            'language': lang,
            'software': os
        }
        
        //console.log(req.headers);
        //console.log('---');
        //console.log(headersFull);
        //console.log('---');
        //console.log(objReqHead);
        
        resp.send(objReqHead);
    });
}
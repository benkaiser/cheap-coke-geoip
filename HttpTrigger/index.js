var geoip = require('geoip-lite');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const ip = req.headers['x-forwarded-for'].split(':')[0];
    context.log('GeoIP: ' + ip);
    var geo = geoip.lookup(ip);
    if (geo) {
        builtJavascript = `
        function geoplugin_city() { return '${geo.city.replace(/'/g, "\\'")}';}
        function geoplugin_latitude() { return '${geo.ll[0]}';}
        function geoplugin_longitude() { return '${geo.ll[1]}';}
        `.trim();
        context.res = {
            body: builtJavascript
        };
    } else {
        context.res = {
            body: 'console.error("failed to geoip")'
        };
    }
}
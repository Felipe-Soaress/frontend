const CryptoJS = require('crypto-js');
var crypto = require("crypto");





var encryptRsaPublicKey = function(toEncrypt, publicKey){
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
}

var encryptRsaPrivateKey = function(toEncrypt, privateKey){
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.privateEncrypt(privateKey, buffer);
    return encrypted.toString("base64");
}

var decryptRsaPrivateKey = function (toDecrypt, privateKey){
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
}

var decryptRsaPublicKey = function (toDecrypt, publicKey){
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.publicDecrypt(publicKey, buffer);
    return decrypted.toString("utf8");
}

module.exports = {
    encryptRsaPublicKey: encryptRsaPublicKey,
    encryptRsaPrivateKey: encryptRsaPrivateKey,
    decryptRsaPrivateKey: decryptRsaPrivateKey,
    decryptRsaPublicKey: decryptRsaPublicKey
}
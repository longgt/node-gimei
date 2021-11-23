
'use strict';

var yaml = require('js-yaml');
var fs = require('fs');
var nameData;
var addressData;

module.exports = function() {
    return {
        nameObj : null,
        addressObj : null,

        name : function() {
            if (this.nameObj === null) {
                if (!nameData) {
                    nameData = yaml.load(fs.readFileSync( __dirname + '/../lib/data/names.yml', 'utf8'));
                }
                var names = nameData;
                this.nameObj = require('./name.js').setNames(names).setGender(Math.round(Math.random()+1) === 1 ? 'male' : 'female');
            }
            return this.nameObj;
        },

        male : function() {
            return this.name().setGender('male');
        },

        female : function() {
            return this.name().setGender('female');
        },

        address : function() {
            if (this.addressObj === null) {
                if(!addressData) {
                    addressData = yaml.load(fs.readFileSync( __dirname + '/../lib/data/addresses.yml', 'utf8'));
                }
                var addresses = addressData;
                this.addressObj = require('./address.js').setAddresses(addresses);
            }
            return this.addressObj;
        },

        reset: function() {
            this.nameObj = null;
            this.addressObj = null;
        }
    };
};


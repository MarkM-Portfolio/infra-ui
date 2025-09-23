/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.bookmarklet.Res");

dojo.require("dojo.i18n");
dojo.require("dojo.string");
dojo.requireLocalization("lconn.bookmarklet", "strings");

//DESIGNED ONLY TO WORK WITH THE 'strings' BUNDLE, AND NO OTHER
dojo.declare("lconn.bookmarklet.Res", [], 
{
    //the identifier for which package this Resource handle will operate with by default
    bundleFor: 'lconn.bookmarklet',
    
    resBundle: null,
    
    //THE FOLLOWING FUNCTIONS SHOULD ONLY BE PERFORMED AT RUNTIME, NOT AT DOJO LOAD TIME
       
    //SET resBundle TO DEFAULT BUNDLE
    loadDefaultBundle: function() {
        this.resBundle = dojo.i18n.getLocalization(this.bundleFor, "strings");
    },
    
    //SET resBundle TO REQUESTED PACKAGE'S BUNDLE
    loadBundle: function(/* str */ pkg) {
        this.resBundle = dojo.i18n.getLocalization(pkg, "strings");
    },
    
    //RETURNS DEFAULT BUNDLE
    getDefaultBundle: function() {
        return dojo.i18n.getLocalization(this.bundleFor, "strings");
    },
    
    //RETURNS REQUESTED PACKAGE'S BUNDLE
    getBundle: function(/* str */ pkg) {
        return dojo.i18n.getLocalization(pkg, "strings");
    },
    
    //GET STRING FROM A BUNDLE
    //if params is non-empty, then the function will go to substitute mode, and return the 'printfed' string
    getStringFrom: function(/* str */ pkg, /* str */ key, /* order array */ params) {
        var strtemp = dojo.i18n.getLocalization(pkg, "strings")[key];
        if( params == undefined ) {
            return strtemp;
        } else {
            return dojo.string.substitute(strtemp, params);
        } 
    },  
    
    //GET STRING FROM DEFAULT BUNDLE
    //if params is non-empty, then the function will go to substitute mode, and return the 'printfed' string
    getString: function(/* str */ key, /* order array */ params) {
        var strtemp = dojo.i18n.getLocalization(this.bundleFor, "strings")[key];
        if( params == undefined ) {
            return strtemp;
        } else {
            return dojo.string.substitute(strtemp, params);
        } 
    }    
    
});

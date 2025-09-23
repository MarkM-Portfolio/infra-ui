/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.mm.enabler.iw.iContext");

dojo.declare("com.ibm.mm.enabler.iw.iContext", null, {

    constructor:function () {    
        // summary: iContext; interface defines methods that the iWidget can use to interact with the iContext.
    },
    constants:{
       //summary: constants defined in iContext 
       mode:{
           VIEW:/*String*/"view",//The generated markup fragment(s) should reflect normal interaction with the iWidget
           EDIT:/*String*/"edit",//The generated markup fragment(s) should reflect iWidget interactions for editing iWidget attributes
           HELP:/*String*/"help"//The iWidget should generate markup fragment(s) to assist the user with interacting with the iWidget
       },
       ATTRIBUTES:/*String*/"attributes",   //Name for the ManagedItemSet holding the customization attributes.
       IDESCRIPTOR:/*String*/"idescriptor", //Name for the ManagedItemSet holding the items describing the iWidget
       USERPROFILE:/*String*/"userprofile", //Name for the ManagedItemSet holding data about the user
       keys:{
           SHIFT:/*int*/1,
           ALT:/*int*/2,
           CTRL:/*int*/4,
           META:/*int*/8,
           CAPSLOCK:/*int*/16
       } 
   },
    getRootElement:function(){
        //summary: returns the root element of the iWidget such that iWidget can easily do things such as
        // searching its own markup. RootElement can also be a convenient place to place items which iWidget wishes
        // to access later.
        return null; /*Element @return rootElement of the iWidget*/
    },
    getElementById: function(/*String*/id,/*DOMNode*/root){
         //summary:This method provides the same semantics as the DOM method by the same name with the distinction that this method will restrict the search to the iWidget's markup rather than the entire page
         //id: element id
         //root: optional DOMElement to define a search scope, it will search in the scope of current active mode.
         return null;/*Element @return the element, or null if element is not found */
    },
    getiWidgetAttributes: function(){
        //summary: This method returns the ManagedItemSet that provides access to the iWidget's customization attributes.  If there is no ManagedItemSet  related to the iWidget's customization attributes, this method MUST create an empty set and return it.
        return {};/*ManagedItemSet @return the ManagedItemSet or empty ManagedItemSet*/
    },  
    getItemSet:function(/*String*/ name,/*Boolean*/isPrivate){
        //summary:This method returns an ItemSet corresponding to the requested name. If it does not already exist, an ItemSet will be created and associated with the supplied name. 
        //name: name of ItemSet
        //isPrivate: optional,the "private" parameter controls whether or not the ItemSet can be exposed to other components. If the ItemSet already exists, the "private" parameter is ignored. 
         return null;/*ItemSet @return requested ItemSet or null if access is denied*/
    },
    requires: function(/*String*/ requiredItem,/*String*/version,/*String*/uri,/*function*/cb,/*String*/mimeType){
         //summary: Provides means for iWidget to declare dependency on set of shared resource support dynamic loads in asynchronous manner
         //requiredItem: name of the Item that needs to be loaded
         //version: optional -- not supported for release1
         //cb: optional -- not supported for release1
         //uri: uri of the resource
         //mimeType: mimetype fo the resoruce
    },
    iScope:function(){
        //summary: This method returns an instance of type Object which was initialized prior to the loading of the iWidget
          return null; /*Object @return an instance of the encapsulation class or return a generic object */
    },
    processMarkup:function(/*String*/markup){
        //summary:This method requests the iContext to process the markup such that it can be inserted into the iWidget's markup and properly interact with the page
        //markup: markup string that needs to be processed
         return null;/*String @return  On success this method MUST return the processed markup while on failure it MUST return null*/
    },
    processiWidgets:function(/*DOMNode*/root){
        //summary: This method requests the iContext to process the subtree under the supplied node for the purpose of resolving and instantiating any referenced iWidgets.
        //root: root element of the subtree
    },
    getElementByClass:function(/*String*/classname,/*DOMNode*/root){
        //summary:This method returns an array of Elements within the iWidget's markup which have the supplied value as one of those specified by the Element's "class" attribute.
        //classname: name of the class attributes
        //root: root Element of the search scope
        return null; /*Element[] @return an array of elements */   
    },
    getUserProfile:function(){
        //summary:This method returns the ManagedItemSet that provides access to the user's profile data. 
        //        Items defined in UserProfile are marked as readOnly
       return null;/*ManagedItemSet @return If there is no ManagedItemSet related to the user's profile, this method creates an empty set and returns it. If access to the user's profile is denied, this method returns null. */
    },
    getiDescriptor:function(){
        //summary: This method returns the ManagedItemSet that provides access to attributes that both the iContext and the iWidget need to understand.
         return null;/*ManagedItemSet @return  If there is no ManagedItemSet  related to the iWidget's descriptive items this method creates an empty set and returns it.*/
    }
});    

/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([ "dojo/_base/declare"
], function(declare) {

   /**
    * This API defines the exception which can be thrown by the semantic
    * services during the parsing and processing A exceptionId should identify
    * the current exception. It is a 7 character long string which uniquely
    * identifies the current abnormal condition of the parsing and processing.
    * <p />
    * 
    * @author <a href="mailto:litong01@us.ibm.com">Tong Li</a>
    * @class com.ibm.mm.data.exception
    * @name com.ibm.mm.data.exception
    */
   var exception = declare("com.ibm.mm.data.exception", null,
   /** @lends com.ibm.mm.data.exception */
   {
      _exceptionId : null,
      _variable : null,

      /**
       * Create new instance of data exception.
       * <p />
       * 
       * @param {String}
       *           exceptionId The exception identifier.
       * @param {Object}
       *           variable The list of the parameters to describe this error
       *           condition. This object must hold all the necessary values to
       *           populate the exception message. For example, a message may be
       *           defined as the following:
       *           <p />
       *           &nbsp;&nbsp;&nbsp;&nbsp;"The node ${id} does not have the
       *           necessary attribute ${attribute} or the attribute has
       *           unrecongnized values." <p/> When an exception is throw, the
       *           variable object should have members namded "id" and
       *           "attribute" respectively. Here is an example of such object
       *           <p />
       *           &nbsp;&nbsp;&nbsp;&nbsp;throw new
       *           com.ibm.mm.data.exception('E000001', {'id':100,
       *           'attribute':'DeJaWu'});
       * @constructs
       */
      constructor : function(/* String */exceptionId, /* Object */variable) {
         this._exceptionId = exceptionId;
         this._variable = variable;
      },

      /**
       * Retrieve locale specific description by the using the status code. This
       * method should not cause any exception. If no locale specific message is
       * found, then an empty string will be returned.
       * 
       * @param {Array}
       *           locales The list of the locales which the locale specific
       *           error should be looked up.
       * @returns {String} The locale specific exception message.
       */
      getMessage : function(/* Array */locales) {
         // we need to load the locale specific resource files and return the
         // matching message.
         // Then we should replace the variables in the message with the values
         // provided by the variable object.
         return "Not implemented";
      }
   });
   return exception;
});

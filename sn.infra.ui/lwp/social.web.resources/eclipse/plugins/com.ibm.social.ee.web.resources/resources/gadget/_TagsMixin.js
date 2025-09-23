/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget._TagsMixin");

dojo.declare("com.ibm.social.ee.gadget._TagsMixin", null, {
   // Must be implemented by subclass
   getTags: function() {},
   getTagsContainer: function() { return this.getTagsNode(); },
   getTagsNode: function() {},

   initializeTags: function () {
      var tags = this.getTags(), d = dojo.doc, scope = this, span, 
          ctnr = this.getTagsContainer(),
          node = this.getTagsNode(),
          maxNum = com.ibm.social.ee.config.gadgetParams.maxTags;
      if(tags.length > 0) {
         var self = this;
         dojo.every(tags, function(tag, i){
            if (i < maxNum) {
               span = dojo.create("span", {"role": "listitem", className: "bidiAware", tabindex: "0"}, node);
               com.ibm.social.incontext.util.text.breakString(tag, d, span);
               if((i != (tags.length - 1)) && (i + 1 != maxNum)) {
                  span = dojo.create("span", {"aria-hidden": "true"}, node);
                  span.appendChild(d.createTextNode(", "));
               }
               return true;
            }
            else {
               span = dojo.create("span", {}, node);
               span.appendChild(d.createTextNode(" "));
               span.appendChild(d.createTextNode(dojo.string.substitute(self.nls.common.tags_more, [tags.length - maxNum])));
               return false;
            }
         });
         ctnr.style.display = "";
      }      
   }
});
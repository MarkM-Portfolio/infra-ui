/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

//TODO: remove this class
dojo.provide("lconn.core.formutilities");

(function(kernel, lang) {

   /**
    * Collection of legacy utilities for form manipulation
    * 
    * @namespace lconn.core.formutilities
    * @deprecated Replace with judicious use of dijit.Form or other base dijit
    *             classes
    * @author Ronny A. Pena
    */

   // TODO: remove this class
   kernel.deprecated("lconn.core.formutilities", "Replace with judicious use of dijit.Form or other base dijit classes.", "3.5");

   var formutilities = lang.mixin(lang.getObject("lconn.core.formutilities", true), /** @lends lconn.core.formutilities */
   {

      /* form element */

      findParentForm : function(controlObj) {
         if (controlObj != null && controlObj.nodeName != null && controlObj.nodeName.toLowerCase() == "form")
            return controlObj;

         if (controlObj.form && controlObj.form != null)
            return controlObj.form;

         var parent = null;

         if ((controlObj.parentNode != null) && controlObj.parentNode.nodeName)
            parent = controlObj.parentNode;
         else
            parent = controlObj.domNode;

         // alert("forms.utilities.findParentForm debug: " +
         // parent.nodeName.toLowerCase());

         if (parent == null) {
            // alert("findParentForm: Could not find form. Probably there is no
            // form element on the page");
            // throw ("findParentForm: Could not find form. Probably there is no
            // form element on the page");
            return null;
         }

         if (parent.nodeName.toLowerCase() == "form") {
            var formObj = parent;
            return formObj;
         }
         else
            return this.findParentForm(parent);
      },

      /* buttons */

      /**
       * this function works on netscape and ie. this function is only useful
       * when you have multiple button in one form. and the input type must be a
       * button type or image, and not a submit type. example: <input
       * onclick="setActionAndSubmit(this.form,'http://localhost/action')"/>
       * form: the name of the form that you are submitting actionURL: the
       * Action url for where this form is beging submitted
       */

      setActionAndSubmit : function(form, actionURL) {
         form.action = actionURL;
         form.submit();
      },

      /**
       * this function works on netscape and ie. this function is only useful
       * when you have multiple button in one form. and the input type must be a
       * button type or image, and not a submit type. example: <input
       * onclick="setActionAndSubmit(this.form,'http://localhost/action', 'Are
       * you sure?')"/> form: the name of the form that you are submitting
       * actionURL: the Action url for where this form is beging submitted
       * confirmMsg: the message you want to display to the user
       */

      setActionAndConfirmAndSubmit : function(form, actionURL, confirmMsg) {
         var performOperation = true;

         performOperation = window.confirm(confirmMsg);

         if (!performOperation)
            return;

         document.forms[form].action = actionURL;
         document.forms[form].submit();
      },

      /* check box and radio buttons */

      checkRadioButton : function(form, formElementName, formElementValue) {
         if (formElementValue != null && formElementValue != '' && formElementValue != 'null') {
            for (var i = 0; i < form.elements[formElementName].length; i++) {
               if (form.elements[formElementName][i].value == formElementValue) {
                  form.elements[formElementName][i].checked = true;
               }
            }
         }
      },

      getRadioGroupCheckedValue : function(form, formElementName) {
         for (var i = 0; i < form.elements[formElementName].length; i++) {
            if (form.elements[formElementName][i].checked) {
               return form.elements[formElementName][i].value;
            }
         }
         return null;
      },

      selectAllCheckboxes : function(formObj, checkboxName) {
         this.changeAllCheckboxes(formObj, checkboxName, true);
      },

      deselectAllCheckboxes : function(formObj, checkboxName) {
         this.changeAllCheckboxes(formObj, checkboxName, false);
      },

      changeAllCheckboxes : function(formObj, checkboxName, checked) {
         for (var i = 0; i < formObj.elements.length; i++) {
            if (formObj.elements[i].type == "checkbox") {
               if (checkboxName == null || checkboxName == "")
                  formObj.elements[i].checked = checked;
               else if (formObj.elements[i].name == checkboxName)
                  formObj.elements[i].checked = checked;
            }
         }
      },

      /** return an array of string with the checked values */
      getCheckedBoxes : function(formObj, checkboxName) {
         var values = new Array();
         for (var i = 0; i < formObj.elements.length; i++) {
            var formControlElement = formObj.elements[i];
            if (formControlElement.type == "checkbox" && formControlElement.checked == true && formControlElement.name == checkboxName) {
               values.push(formControlElement.value);
            }
         }
         return values;
      },

      /* dropdown box */

      setSelectionControlVal : function(controlObj, value) {
         if (controlObj != null && controlObj.options != null)
            for (var x = 0; x < controlObj.options.length; x++)
               if (controlObj.options[x].value == value) {
                  controlObj.selectedIndex = x;
                  return;
               }
      },

      getSelectionControlVal : function(controlObj) {
         if (controlObj != null && controlObj.options != null && controlObj.options[controlObj.selectedIndex] != null)
            return controlObj.options[controlObj.selectedIndex].value;
         else
            return null;
      },

      /** return an array of string with the selected values */
      getMultipleSelectionControlValues : function(controlObj) {
         var values = new Array();
         for (var i = 0; i < controlObj.options.length; i++) {
            if (controlObj.options[i].selected == true)
               values.push(controlObj.options[i].value);
         }

         return values;
      },

      /** return an array of string all values */
      getAllSelectionControlValues : function(controlObj) {
         var values = new Array();
         for (var i = 0; i < controlObj.options.length; i++)
            values.push(controlObj.options[i].value);
         return values;
      },

      getSelectionControlName : function(controlObj) {
         return controlObj.options[controlObj.selectedIndex].text;
      },

      removeSelectedSelectionControlOption : function(controlObj) {
         controlObj.options[controlObj.selectedIndex] = null;
      },

      removeSelectionControlOption : function(controlObj, value) {
         for (var i = 0; i < controlObj.options.length; i++) {
            if (controlObj.options[i].value == value)
               controlObj.options[i] = null;
         }
      },

      removeAllSelectionControlOption : function(controlObj) {
         for (var x = controlObj.options.length; x >= 0; x--)
            controlObj.options[x] = null;

      },

      addSelectionControlVal : function(controlObj, text, value) {
         controlObj.options[controlObj.options.length] = new Option(text, value);
      },

      /* others */

      getFormControl : function(form, formElementName) {
         return form.elements[formElementName];
      },

      getTextBoxValue : function(form, formElementName) {
         return this.getFormControl(form, formElementName).value;
      },

      getControlTagName : function(formControlObj) {
         var formControlTagName = null;

         if (formControlObj.nodeName)
            formControlTagName = formControlObj.nodeName;
         else if (formControlObj.tagName)
            formControlTagName = formControlObj.tagName;
         else {
            log("getValue", "unable to get the formControl tag name; returning null");
            return null;
         }

         return formControlTagName;
      },

      getValue : function(formControlObj) {
         var formControlTagName = this.getControlTagName(formControlObj);

         if (formControlTagName.toLowerCase() == "input" || formControlTagName.toLowerCase() == "textarea") {
            if (formControlObj.type == "checkbox") {
               if (formControlObj.checked)
                  return true;
               else
                  return false;
            }
            else
               return formControlObj.value;
         }
         else if (formControlTagName.toLowerCase() == "select") {
            return this.getSelectionControlVal(formControlObj);
         }
         else {
            log("getValue", "returning null");
            return null;
         }
      },

      setValue : function(formControlObj, value) {

         var formControlTagName = this.getControlTagName(formControlObj);

         if (formControlTagName.toLowerCase() == "input" || formControlTagName.toLowerCase() == "textarea") {
            formControlObj.value = value;
         }
         else if (formControlTagName.toLowerCase() == "select") {
            this.setSelectionControlVal(formControlObj, value)
         }
         else {
            log("setValue", formControlTagName.toLowerCase());
         }
      }
   });

   /**
    * Typo, let's keep it around just in case
    * 
    * @deprecated Use {@see #checkRadioButton} instead
    */
   formutilities.checkRadionButton = formutilities.checkRadioButton;

   return formutilities;

}(dojo, dojo));

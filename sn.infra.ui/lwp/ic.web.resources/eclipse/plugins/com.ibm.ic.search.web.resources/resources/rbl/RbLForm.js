/* Copyright IBM Corp. 2015  All Rights Reserved.             */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/has",
	"dojo/dom-class",
	"dojo/i18n",
	"dojo/i18n!./nls/RbLForm",
	"dojo/text!./templates/RbLForm.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-ui/ckeditor/dynamic"
], function (declare, lang, has, domClass, i18n, i18nRbLForm, template, _Templated, _Widget, ckeditor) {

	/**
	 * This widget represent the join form for a Restricted but Listed Community
	 * 
	 * @class lconn.search.rbl.RbLForm
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var RbLForm = declare(
		"lconn.search.rbl.RbLForm",
		[_Widget, _Templated], /** @lends lconn.search.rbl.RbLForm.prototype */
	{
		templateString: template,
		
		/**
		 * The form element action property.
		 * 
		 * @default ["/unused"]
		 * @type {String}
		 */
		formAction: "/unused", 
		
		/**
		 * The form element method property.
		 * 
		 * @default ["post"]
		 * @type {String}
		 */
		formMethod: "post",
		
		/**
		 * The Community id.
		 * This will be sent in a hidden input named 'uuid'.
		 * 
		 * @default [""]
		 * @type {String}
		 */
		commUuid: "",
		
		/**
		 * The Community name.
		 * 
		 * @default [""]
		 * @type {String}
		 */
		commName: "",
		
		/**
		 * The Community description.
		 * 
		 * @default [""]
		 * @type {String}
		 */
		commDescription: "",
		
		/**
		 * This property will be sent in a hidden input named 'dangerousurlnonce'.
		 * 
		 * @default [""]
		 * @type {String}
		 */
		dangerousUrlNonce: "",
		
		/**
		 * The function to be executed clicking on submit button.
		 * 
		 * @type {Function}
		 */
		submitFunction: function() {},
		
		/**
		 * The function to be executed clicking on cancel button.
		 * 
		 * @type {Function}
		 */
		cancelFunction: function() {},
		
		_strings: null,
		_editor: null,
		
		postMixInProperties: function() {
			this._strings = i18nRbLForm;
			lang.mixin(this, this._strings);
			this.inherited(arguments);
		},
		
		postCreate: function() {
			this.inherited(arguments);
			
			if(this.commDescription) {
				this.descriptionNode.style.display = "";
			}
			
			this.reqMemSubmit.onclick = lang.hitch(this, "_send");
			this.reqMemCancel.onclick = lang.hitch(this, "_cancel");
			
			var that = this;
			ckeditor.replace(this.membershipRequestBody, {
				toolbar: "CommToolbar_NoFiles",
				ibmMentionDisabled: true,
				customConfigMethod: this._initConfigs(),
				on: {
					instanceReady: function(ev) {
						that._editor = ev.editor;
					}
				}
			});
			domClass.add(this.editorContainer, "_editorrepaint");
		},
		
		destroy: function() {
			if(!this._destroyed) {
				this._editor.destroy();
				this.inherited(arguments);
			}
		},
		
		_initConfigs: function() {
			var conf = {
				// Standard toolbar
				toolbar_CommToolbar: [
					{ name: 'tools',		items: ['Undo','Redo','MenuPaste','LotusSpellChecker','IbmPermanentPen']},
					{ name: 'styles',		items: ['Font','FontSize','Bold','Italic','Underline','Strike','TextColor','BGColor','CopyFormatting']},
					{ name: 'paragraph',	items: ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock', 'NumberedList','BulletedList','Indent','Outdent','BidiLtr','BidiRtl','Language']},
					{ name: 'insert',		items: ['Table','Image','MenuLink','Smiley']}
				],
				
				// Standard toolbar without file picker 
				toolbar_CommToolbar_NoFiles: [
					{ name: 'tools',		items: ['Undo','Redo','MenuPaste','LotusSpellChecker','IbmPermanentPen']},
					{ name: 'styles',		items: ['Font','FontSize','Bold','Italic','Underline','Strike','TextColor','BGColor','CopyFormatting']},
					{ name: 'paragraph',	items: ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock', 'NumberedList','BulletedList','Indent','Outdent','BidiLtr','BidiRtl','Language']},
					{ name: 'insert',		items: ['Table','Image','Link','Smiley']}
				],
				
				language: djConfig.locale,
				toolbar: 'CommToolbar',
				useComputedState: true,
				enableTabKeyTools: true,
				resize_maxWidth: has("safari") ? 815 : 800,
				//width: has("safari") ? 815 : undefined,
				entities: false,
				basicEntities: false
			};
			
			return function(opts) {
				lang.mixin(opts, conf);
			};
		},
		
		_saveForm: function() {
			this.formBody.value = this._editor ? this._editor.getData() : ""; 
		},
		
		_send: function() {
			this._saveForm();
			return this.submitFunction(this.formBody.value);
		},
		
		_cancel: function() {
			return this.cancelFunction();
		}
	});
	return RbLForm;
});
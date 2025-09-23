/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.upload.provider.FlashFileProvider");

dojo.require("dojo.io.iframe");

dojo.require("dojox.xml.parser");

dojo.require("com.ibm.oneui.util.proxy");

dojo.require("lconn.core.util.text");
dojo.require("lconn.core.upload.provider.HtmlFileProvider");
dojo.require("lconn.core.swfupload");
dojo.requireLocalization("lconn.core.upload", "upload");

(function(swf) {
		
	var flashCapable = dojo.isIE && swfobject.hasFlashPlayerVersion("10");
	if (flashCapable) {
		// if we're on a flash capable browser, make sure we're not in another frame. flash can't call JS callbacks
		// in another frame
      var activeDoc = false;

      try {
         activeDoc = dojo.getObject("top.document.activeElement.contentWindow.document", false, window);
      } catch (e) { // IE8 in an iFrame this throws an exception
      }

		if (activeDoc) {
			flashCapable = (document == activeDoc);
		}

		// RTC 153871: [PMR 14775,035,724] Cannot upload files in IE when Flash is prohibited from accessing the file system 
      flashCapable = flashCapable && ( !lconn.core.config.properties["flash.LocalFileReadDisable"] || lconn.core.config.properties["flash.LocalFileReadDisable"] != "true" );
	}
	
	var _nls = dojo.i18n.getLocalization("lconn.core.upload", "upload");
	
	dojo.declare("lconn.core.upload.provider.FlashFileProvider", lconn.core.upload.provider.HtmlFileProvider, {
	   constructor: function(opts){
	      dojo.mixin(this, opts);
	   },
		_getInputID: function(controller) {
			if (!flashCapable) {
				return this.inherited(arguments);
			}
			
			var uploader = controller.uploader;
			if (uploader) {
				return uploader.movieName;
			}
			
			return null;
		},
		
		buildInput: function(field, label) {
			if (!flashCapable) {
				return this.inherited(arguments);
			}
						
			var fragment = dojo.doc.createDocumentFragment();
			
			var input = this.browseInput = dojo.create('button', {'type': 'button', 'className': 'lotusBtn lotusBtnDisabled'});
         input.id = "lconn_btn_browse_files";
			
			input.appendChild(dojo.doc.createTextNode(_nls.BUTTON_TEXT));
			fragment.appendChild(input);

			this.inputFn = dojo.hitch(this, "_renderFlash", field, label, input);
			
			return { domNode: fragment, destroy: function() { field.controller.uploader.destroy(); } };
		},
		
		_renderFlash: function(field, label, input) {
			var uploader = field.controller.uploader;
			
			if (!uploader) {
				var _queueCallback = dojo.hitch(this, "_flashFileQueued", field);
				var uploader = field.controller.uploader = new swf({
					file_post_name: field.controller.inputName,
					button_action: swf.BUTTON_ACTION.SELECT_FILES,
					button_text: ' ',
					button_placeholder: input,
					button_window_mode : SWFUpload.WINDOW_MODE.OPAQUE,	    		
					
					custom_settings: {
					},
					
					file_dialog_start_handler: dojo.hitch(this, "_flashFileDialogStart"),
					file_queued_handler: _queueCallback,
					file_queue_error_handler: _queueCallback,
					swfupload_loaded_handler: dojo.hitch(this, function(){
					   var browseInput = this.inputFn = uploader.a11y_input;
					      var contentBox = dojo.position(browseInput);
					      dojo.contentBox(uploader.getMovieElement(), contentBox);
					      if (this.setFocus != false) dijit.focus(browseInput);
					}),
					file_dialog_complete_handler: dojo.hitch(this, function() {
					   this._beforeInputChanged();
						this._flashFileDialogComplete(field);
					})
				});
				
				this._updateLabel(field, label);
			}
		},
		
		getFocusNode: function() {
			if (!flashCapable) {
				return this.inherited(arguments);
			}
			
			return this.inputFn;
		},
		
		uploadFile: function(manager, file, args) {
			
			if (!flashCapable) {
				return this.inherited(arguments);
			}
			
			var dfd = null;
			
			args.handleAs = args.handleAs || "text";
			
			if (!args.url && args.form) {
				args.url = args.form.action;
			}
			
			var params = dojo.mixin({}, args.content || {});
			
			if (args.form) {
				dojo.mixin(params, dojo.formToObject(args.form));
			}
			
			if (file.getSize() == 0) {
				return this._sendZeroByteUpload(manager, file, args); 
			} 
				
			// replicate deferred setup from dojo.xhr()
			var uploader = manager.controller.uploader;
			
			/* 
			 * pass empty ok and error callbacks, as they'll be handled by the flash events
			 * before the deferred gets a hold of them. doesn't appear dojo_ioSetArgs will 
			 * allow null functions there, so just pass no-op functions.
			 */				 
			dfd = dojo._ioSetArgs(args, function cancel() {
				uploader.stopUpload();
				
				var err = dfd.ioArgs.error;
				if(!err){
					err = new Error();
					err.dojoType="cancel";
				}
				
				return err;
			}, function okHandler() { }, function errHandler() { });
			
			uploader.setUploadURL(dfd.ioArgs.url);
			
			var fid = file.getId();
			for (var k in params) {
				if (params.hasOwnProperty(k)) {
					uploader.removeFileParam(fid, k);
					var vs = params[k];
					vs = dojo.isArray(vs) ? vs : [ vs ];
											
					dojo.forEach(vs, function(v) {
						uploader.addFileParam(fid, k, v);
					});
				}
			}
			
			uploader.settings.upload_progress_handler = function(f, complete, total) {
				file.setBytesComplete(complete);
			};
			
			uploader.settings.upload_success_handler = function(f, data, resp) {
				var ha = dfd.ioArgs.handleAs || "text";
				var response = null;
				if (ha == "text") {
					response = data;
				} else if (ha == "xml") {
					response = dojox.xml.parser.parse(data);
				} else {		
				   if (data.indexOf("content=\"409\"") >= 0)
				      uploader.requeueUpload(f.id);
					var dii = dojo.io.iframe;
					var iframe = dii.create("flashUploadFrame");
					var idoc = dii.doc(iframe);
					
					idoc.close();
					idoc.open();
					idoc.write(data);
					
					idoc.close();
					
					if (ha == "html") {
						response = idoc;
					} else {
						var js = idoc.getElementsByTagName("textarea")[0].value;
						if (ha == "json") {
							response = dojo.fromJson(js);
						} else if (ha == "javascript") {
							response = dojo.eval(js);
						} else {
							throw new Error("unsupported handleAs");
						}
					}
				}
				
				dfd.callback(response);
			};
			
			uploader.settings.upload_error_handler = dojo.hitch(this, function(f, code, msg) {
				// don't ever call dfd.cancel() here as you'll likely cause an infinite loop
				var uec = swf.UPLOAD_ERROR;
				if (code != uec.FILE_CANCELLED && code != uec.UPLOAD_STOPPED) {
				   if (code == -200 && msg == "409")
				      uploader.requeueUpload(file._id);
					var err = new Error(msg);
					err.code = code;
					
					dfd.errback(err);
				}
			});
			
			uploader.startUpload(fid);
		
			
			return dfd;
		},
		
		_flashFileDialogStart: function() {
			this._tmpFiles = [];
		},
		
		_flashFileQueued: function(field, file, error) {
			if (error == -140) {
				var error = [ { message: dojo.string.substitute(_nls.ERROR_IO, [file.name]) } ];
				field.controller.fileList.onAddFilesError(error);
			}
			
			var fileBean = new lconn.core.upload.data.File(file, file.name);
			fileBean.setSize(file.size);
			
			this._tmpFiles.push(fileBean);
		},
		
		_flashFileDialogComplete: function(field) {
			field.controller.fileList.addFiles(this._tmpFiles);
			field._focusFirstFileOfCurrentSelection();
		},
		_beforeInputChanged: function(){}
	});	
}(lconn.core.swfupload.SWFUpload));

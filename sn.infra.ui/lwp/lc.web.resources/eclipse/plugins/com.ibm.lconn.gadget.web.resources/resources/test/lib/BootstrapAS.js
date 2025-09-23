/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.test.lib.BootstrapAS');

dojo.require('lconn.core.util.dojoPatches');

dojo.require('com.ibm.lconn.gadget.config.settings');

dojo.require('dojo.i18n');

dojo.require('dijit._Widget');
dojo.require('dijit._Container');
dojo.require('dijit._Templated');

dojo.require('dijit.form.Form');
dojo.require('dijit.form.Button');
dojo.require('dijit.form.TextBox');
dojo.require('dijit.form.Select');
dojo.require('dijit.form.RadioButton');

(function(
 dojo,
 _Widget,
 _Container,
 _Templated) {
	
	var Export_ = dojo.declare('com.ibm.lconn.gadget.test.lib.BootstrapAS', [_Widget, _Container, _Templated], {
		/* template path */
		templatePath : dojo.moduleUrl('com.ibm.lconn.gadget', 'test/lib/templates/BootstrapAS.html'),
		
		/* Dijit includes other dijits */
		widgetsInTemplate : true,
		
		/* Properties */
		style : "",
		
		/* Internal AttachPoints */
		_ASForm : null, 		// Form dijit
		
		_gadget : null,			// Field dijit
		_asfeed : null,	// Field dijit
		_asconfig : null,	// Field dijit
		_asmode : null,	// Field dijit
		_profileid : null,	// Field dijit
		_singleEntryId: null,	// Field dijit
		_shareboxboardid : null,	// Field dijit
		_shareboxpostype : null,	// Field dijit
		_viewSelect : null,	// Field dijit
		_width : null,	// Field dijit
		_debugFF : null,	// Field dijit
		_debug : null,	// Field dijit
		_showSharebox : null,	// Field dijit
		_useOAuth : null,	// Field dijit
		_showFeedLink : null,	// Field dijit
		_showHeader : null, // Field dijit
		_isCommunityStream : null,	// Field dijit
		_asMaxWidth: null, //Field dijit
		_asMinWidth: null, //Field dijit
		
		persistAndRefreshButton : null,
		
		//
		// Getters
		//
		getGadgetDef : function() {
			var optsObj = this.getGadgetOpts();
			var def = {
					definitionUrl: optsObj._gadget,
					placement: 'attach_point',
					componentType : 'gadget',
					instanceData : {
						renderParams: {
							height: "500px", 
							width: optsObj._width, 
							view: optsObj._viewSelect == "none" ? "" : optsObj._viewSelect,
							userPrefs: optsObj.debugOptsUP
						},
						viewParams : {
							useOAuth: optsObj.boolOpts.useOAuth ? "true" : "false"
						}
					}
				};
			if ( optsObj._asfeed !== "") {
				def.instanceData.viewParams.asFeed = optsObj._asfeed;
			} else if ( optsObj._asmode !== "" ) {
				def.instanceData.viewParams.asMode = optsObj._asmode;
				if ( optsObj._profileid !== "" ) {
					def.instanceData.viewParams.profileId = optsObj._profileid;
				}
				if ( optsObj._singleEntryId !== "" ) {
					def.instanceData.viewParams.profileSingleEntryId = optsObj._singleEntryId;
				}
			} else if ( optsObj._asconfig !== "") {
				def.instanceData.viewParams.asConfig = optsObj._asconfig;
			}
			
			return def;
		},
		
		getGadgetOpts : function() {
			var optsObj = {
				_gadget : this._gadget.attr('value'),
				_asfeed : this._asfeed.attr('value'),
				_asmode : this._asmode.attr('value'),
				_profileid: this._profileid.attr('value'),
				_singleEntryId: this._singleEntryId.attr('value'),
				_asconfig : this._asconfig.attr('value'),
				_shareboxboardid : this._shareboxboardid.attr('value'),
				_shareboxpostype : this._shareboxpostype.attr('value'),
				_viewSelect : this._viewSelect.value,
				_width : this._width.attr('value'),
				_asMaxWidth: this._asMaxWidth.attr('value'),
				_asMinWidth: this._asMinWidth.attr('value'),
				boolOpts : {
					debug : this._debug.checked,
					debugFF : this._debugFF.checked,
					showSharebox : this._showSharebox.checked,
					useOAuth : this._useOAuth.checked,
					showFeedLink : this._showFeedLink.checked,
					showHeader: this._showHeader.checked,
					isCommunityStream : this._isCommunityStream.checked
				}
			};
			
			optsObj.debugOptsUP = {
				debug : optsObj.boolOpts.debug || optsObj.boolOpts.debugFF,
				debugFF : optsObj.boolOpts.debugFF,
				showSharebox : optsObj.boolOpts.showSharebox,
				shareboxBoardId : optsObj._shareboxboardid,
				shareboxPostType : optsObj._shareboxpostype,
				showFeedLink : optsObj.boolOpts.showFeedLink,
				showHeader : optsObj.boolOpts.showHeader,
				isCommunityStream : optsObj.boolOpts.isCommunityStream,
				asMaxWidth: optsObj._asMaxWidth,
				asMinWidth: optsObj._asMinWidth
			};
			
			return optsObj;
		},
		
		setGadgetOpts : function(optsObj) {
			this._gadget.attr('value', optsObj._gadget);
			this._asfeed.attr('value', optsObj._asfeed);
			this._asmode.attr('value', optsObj._asmode);
			this._profileid.attr('value', optsObj._profileid);
			this._singleEntryId.attr('value', optsObj._singleEntryId);
			this._asconfig.attr('value', optsObj._asconfig);
			this._shareboxboardid.attr('value', optsObj._shareboxboardid);
			this._shareboxpostype.attr('value', optsObj._shareboxpostype);
			this._viewSelect.attr('value', optsObj._viewSelect);
			this._width.attr('value', optsObj._width);
			this._debug.checked = optsObj.boolOpts.debug;
			this._debugFF.checked = optsObj.boolOpts.debugFF;
			this._showSharebox.checked = optsObj.boolOpts.showSharebox;
			this._useOAuth.checked = optsObj.boolOpts.useOAuth;
			this._showFeedLink.checked = optsObj.boolOpts.showFeedLink;
			this._showHeader.checked = optsObj.boolOpts.showHeader;
			this._isCommunityStream.checked = optsObj.boolOpts.isCommunityStream;
			this._asMaxWidth.attr('value', optsObj._asMaxWidth);
			this._asMinWidth.attr('value', optsObj._asMinWidth);
		},
		
		persistAndRefresh : function() {
			// we could URL encode this, but localStorage + JSON seems easier...
			localStorage.setItem("previousASSettings", dojo.toJson(this.getGadgetOpts()));
			location.reload(true);
		},
		
		// connect to form change events
		postCreate : function() {
			this.connect(this._viewSelect, "onChange", "_handleViewChange");
			
			this.connect(this.persistAndRefreshButton, 'onclick', 'persistAndRefresh');
			
			var previousOpts = localStorage.getItem("previousASSettings");
			if (previousOpts !== null) {
				localStorage.removeItem("previousASSettings");
				try {
					previousOpts = dojo.fromJson(previousOpts);
				} catch (e) {
					console.log("problem loading gadget from refresh, aborting.");
					return;
				}
				this.setGadgetOpts(previousOpts);
			}
		},
		
		/* handles data change */
		_handleViewChange : function() {
			var view = this._viewSelect.getValue();
			var width = ( view == "profile" ) ? 300 : 800;
			this._width.attr("value", width);
		}
	});

//	dojo.extend(Export_, lconn.core.util.dojoPatches.TemplatedPatch);
	
})
(dojo,
 dijit._Widget,
 dijit._Container,
 dijit._Templated);

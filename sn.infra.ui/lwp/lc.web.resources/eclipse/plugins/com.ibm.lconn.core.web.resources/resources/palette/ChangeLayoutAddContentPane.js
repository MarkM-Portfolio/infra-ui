/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.palette.ChangeLayoutAddContentPane");
dojo.require("lconn.core.paletteOneUI.AddContentPane");
dojo.require("lconn.core.palette.ChangeLayoutContentPanel");

dojo.declare(
	// widget name and class
	"lconn.core.palette.ChangeLayoutAddContentPane",
	
	// superclass
	[lconn.core.paletteOneUI.AddContentPane],

	// properties and methods
	{		
		postCreate: function(){			
			this._createLoadingNode();
			this._setLoading();
			
			// init and display info panel
			var imageRoot = this.imageContextRoot;
			
			// Change is here			
			this._contentArea = new lconn.core.palette.ChangeLayoutContentPanel({imageContextRoot: imageRoot});
			
			this.contentAreaNode.appendChild(this._contentArea.domNode);
			
			// utility to create datastore for the tree
			this._storeBuilder = new lconn.core.paletteOneUI.PaletteDataStoreBuilder();		
		
			this._registerDefaultCanAddWidgetFct();
			this._registerDefaultIsVisibleWidgetFct();
		}
	}	
);

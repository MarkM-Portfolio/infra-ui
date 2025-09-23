/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.ImageDataStore");

dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.data.ItemFileReadStore");

dojo.require("com.ibm.oneui._base");
dojo.declare("lconn.test.ImageDataStore",
[
		com.ibm.oneui._base, dojo.data.ItemFileReadStore
],
{
	constructor : function(keywordParameters)
	{
		this.logEnter(arguments);
		this.inherited(arguments);		
		var d = dojo;

		var sourceData = {
			items: []
		};

		
		//source - can be either id of dom element,  
		//or a reference to the dom element itself
		if (!!keywordParameters.source) {
			d.query("img", keywordParameters.source).forEach(
				function(imgTag) {
					var sLink = null;
					
					//if the parent node is a link, we can pull the
					//href out of that and put it as a link in the data
					var pNode = imgTag.parentNode;
					
					if (!!pNode) {
						if (pNode.tagName.toUpperCase() == "A") {
							sLink = d.attr(pNode, "href");
						}
					}
					
					sourceData.items.push(
						{
							"large": imgTag.src,
							"thumb": d.attr(imgTag, "thumb") || imgTag.src,
							"title": imgTag.title || imgTag.alt,
							"link": sLink 
						}
					);

					
				}
			);

			if (!!this._jsonData && dojo.isArray(this._jsonData.items)) {
				this._jsonData.items = this._jsonData.items.concat(sourceData.items);
			} else {
				this._jsonData = sourceData;
			}

			
		}
		
	
		// if there is no thumb provided, pull it from the large ref
		if (dojo.isObject(this._jsonData) && dojo.isArray(this._jsonData.items))
		{
			dojo.forEach(this._jsonData.items, function(itm, idx)
			{
				if (!itm["thumb"] && !!itm["large"])
				{
					itm["thumb"] = itm["large"];
				}
			});
		}
		this.logExit(arguments);
	},
	
	fetchAllItems:function()
	{
		if (!this.data && !this._jsonData)
		{
			if (this._jsonFileUrl !== this._ccUrl)
			{
				dojo.deprecated("dojo.data.ItemFileReadStore: ",
						"To change the url, set the url property of the store,"
								+ " not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
				this._ccUrl = this._jsonFileUrl;
				this.url = this._jsonFileUrl;
			}
			else if (this.url !== this._ccUrl)
			{
				this._jsonFileUrl = this.url;
				this._ccUrl = this.url;
			}

			// See if there was any forced reset of data.
			if (this.data != null)
			{
				this._jsonData = this.data;
				this.data = null;
			}

			if (this._jsonFileUrl)
			{
				var self = this;
				if (!this._loadInProgress)
				{
					this._loadInProgress = true;
					var getArgs =
					{
						url : self._jsonFileUrl,
						handleAs : "json-comment-optional",
						preventCache : this.urlPreventCache,
						failOk : this.failOk,
						sync : true
					};
					var getHandler = dojo.xhrGet(getArgs);
					getHandler.addCallback(function(data)
					{
						try
						{
							self._getItemsFromLoadedData(data);
							self._loadFinished = true;
							self._loadInProgress = false;
							self.data = data;
							self._jsonData = data;
						}
						catch (e)
						{
							self._loadFinished = true;
							self._loadInProgress = false;
						}
					});

				}
			}
		}
	}

});

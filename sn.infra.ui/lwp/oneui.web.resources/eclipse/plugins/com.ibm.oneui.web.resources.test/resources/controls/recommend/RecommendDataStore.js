/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.test.controls.recommend.RecommendDataStore");

dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("com.ibm.oneui._base");

dojo.declare("com.ibm.oneui.test.controls.recommend.RecommendDataStore",
[
	dojo.data.ItemFileWriteStore, com.ibm.oneui._base
],
{
//TODO -- all item methods implementors will need to add.
	preamble: function(args) {
		try {
			if (args && !args.url) {
				args.url = dojo.moduleUrl("com.ibm.oneui","test/controls/recommend/sampleRecommendDataStore.json").toString();
			}
		} catch (ignore) {}
	},
	
	newItem: function(/* object */keywordArgs) {
		
		if (!keywordArgs.displayName) {
			keywordArgs.displayName = keywordArgs[this._getIdentifierAttribute()];
		}
		
		return this.inherited(arguments);
		
	},
	
	loadItem : function(/* object */keywordArgs)
	{
		// keywordArgs:
		// An anonymous object that defines the item to load and callbacks to
		// invoke when the
		// load has completed. The format of the object is as follows:
		// {
		// item: object,
		// onItem: Function,
		// onError: Function,
		// scope: object
		// }
		this.logEnter(arguments);
		this.inherited(arguments);
		var scope = keywordArgs.scope || dojo.global;
		try
		{
			if (keywordArgs.onItem && keywordArgs.item)
			{
				keywordArgs.onItem.call(scope, keywordArgs.item);
			}
		}
		catch (error)
		{
			if (keywordArgs.onError)
			{
				keywordArgs.onError.call(scope, error);
			}
		}

		this.logExit(arguments);
	}
});

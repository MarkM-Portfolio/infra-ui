/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

dojo.provide("lconn.core.util.LCDeferredList");

dojo.require("lconn.core.util.LCDeferred");

(function (dojo, DeferredCls) {

lconn.core.util.LCDeferredList = function(/*Array*/ list, /*Boolean?*/ fireOnOneCallback, /*Boolean?*/ fireOnOneErrback, /*Boolean?*/ consumeErrors, /*Function?*/ canceller){
	// summary:
	//		Provides event handling for a group of Deferred objects.
	// description:
	//		DeferredList takes an array of existing deferreds and returns a new deferred of its own
	//		this new deferred will typically have its callback fired when all of the deferreds in
	//		the given list have fired their own deferreds.  The parameters `fireOnOneCallback` and
	//		fireOnOneErrback, will fire before all the deferreds as appropriate
	//
	//	list:
	//		The list of deferreds to be synchronizied with this DeferredList
	//	fireOnOneCallback:
	//		Will cause the DeferredLists callback to be fired as soon as any
	//		of the deferreds in its list have been fired instead of waiting until
	//		the entire list has finished
	//	fireonOneErrback:
	//		Will cause the errback to fire upon any of the deferreds errback
	//	canceller:
	//		A deferred canceller function, see dojo.Deferred
	var resultList = [];
	DeferredCls.call(this);
	var self = this;
	if(list.length === 0 && !fireOnOneCallback){
		this.resolve([0, []]);
	}
	var finished = 0;
	dojo.forEach(list, function(item, i){
		item.then(function(result){
			if(fireOnOneCallback){
				self.resolve([i, result]);
			}else{
				addResult(true, result);
			}
		},function(error){
			if(fireOnOneErrback){
				self.reject(error);
			}else{
				addResult(false, error);
			}
			if(consumeErrors){
				return null;
			}
			throw error;
		});
		function addResult(succeeded, result){
			resultList[i] = [succeeded, result];
			finished++;
			if(finished === list.length){
				self.resolve(resultList);
			}
			
		}
	});
};
lconn.core.util.LCDeferredList.prototype = new dojo.Deferred();

lconn.core.util.LCDeferredList.prototype.gatherResults= function(deferredList){
	// summary:
	//	Gathers the results of the deferreds for packaging
	//	as the parameters to the Deferred Lists' callback

	var d = new lconn.core.util.LCDeferredList(deferredList, false, true, false);
	d.addCallback(function(results){
		var ret = [];
		dojo.forEach(results, function(result){
			ret.push(result[1]);
		});
		return ret;
	});
	return d;
};

return lconn.core.util.LCDeferredList;

}(dojo, lconn.core.util.LCDeferred));

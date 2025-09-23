/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
	dojo.provide("com.ibm.example.forums.AddStartForumButton");
	dojo.require("lconn.forums.widgets.TopicListImpl");
	
	/**
	 * @namespace com.ibm.example.forums
	 */
	/**
	 * This example shows how to add a Start Forum button to the Forums widget in Communities.
	 * @namespace com.ibm.example.forums.AddStartForumButton
	 */
	
	// Store a reference to the original implementation
	var _transform = lconn.forums.widgets.TopicList.prototype.transform;
	
	dojo.extend(lconn.forums.widgets.TopicList, {
		transform: function(xml, xsl) {
			// Calls original implementation
			_transform.apply(this, arguments);
			
			if (this.isOwner) {
				// Adds a Start a Forum button
				// Use this.iContext.getElementById(id) vs. dojo.byId(id)
				var startTopicTd = dojo.query('td.lotusFirstCell', this.iContext.getElementById('startTopicLink'))[0];
				if (startTopicTd) {
					dojo.create('span',
						{
							className: 'lotusDivider',
							innerHTML: '|'
						}, startTopicTd);
					var btn = dojo.create('a',
						{
							className: 'lotusAction',
							innerHTML: this.rs.rs_startForum,
							href: 'javascript:;'
						}, startTopicTd);
					// startForum is declared in lconn.forums.StartForumMixin
					dojo.connect(btn, 'onclick', dojo.hitch(this, 'startForum'));
				}
			}
		},
		startForum: function(e) {
			if (e) dojo.stopEvent(e);
			var widgetId = this.iContext.widgetId;
			// FIXME: not sure why show=forums won't work
			window.changeHash("fullpageWidgetId=" + widgetId + "&show=topics");
			// FIXME: no topic / event we could connect to, so resorting to timeout
			window.setTimeout(dojo.hitch(this, function() {
				this.displayForumsTab();
				// FIXME: the Forums widget sets the lconn.forums.ViewController instance in the global scope
				var uuid = widgetId + "_forums", viewController = window[uuid];
				if (viewController)
					viewController.startForum(e);
			}), 2000);
		}
	});
})();
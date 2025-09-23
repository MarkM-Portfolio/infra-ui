/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.notification.NotificationsItem");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.as.util.ItemUtil");
dojo.require("lconn.core.ext.timeago.Timeago");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

/**
 * Widget used to display individual notification item in the flyout
 * @author Johann Ott
 */

dojo.declare("com.ibm.social.as.notification.NotificationsItem",
[dijit._Widget, dijit._Templated],
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "notification/templates/NotificationsItem.html"),

    data: null,

    itemCount: null,

    unreadNotifications: null,

    content: "",

    time: null,

    timeString: null,

    timeSeconds: null,

    timeago: null,

    timeagoNode: null,

    authorImage: null,

    ariaSummary: null,

    strings: dojo.i18n.getLocalization("com.ibm.social.as", "activitystream"),

    /**
     * Called before the widget is rendered in the UI.
     * - Formats the time property
     */
    postMixInProperties: function(){
        this.inherited(arguments);

        // Get the timestamp
        this.time = this.data.published;

        // Format the time so that it is more readable
        var itemUtil = new com.ibm.social.as.util.ItemUtil();

        // Format the time so that it is more readable
        this.timeString = itemUtil.getDateString(this.strings, this.time);
        this.timeSeconds = itemUtil.getTimeWithSeconds(this.time).substring(0,11);

        this.ariaSummary = this.data.object.summary;
    },

	postCreate: function(){
        this.inherited(arguments);

        // Implement the timeago function
        this.timeago = new lconn.core.ext.timeago.Timeago({}, this.timeagoNode);

        // Get the photo details from Notification Item and place in author image node
        dojo.query(".photo", this.domNode).forEach(dojo.hitch(this, function(item){
            var authorImageSrc = item.attributes.src.value;
            dojo.attr(this.authorImage, "src",authorImageSrc);
        }));
        lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.domNode);
        // Check the number of unread notifications and add blue dot to notification item
        //Remove until propery unread message support is integrated
//        if(this.itemCount <= this.unreadNotifications){
//            dojo.removeClass(this.bluedot, "lotusHidden");
//        }
	},

    onClick : function(e){
        window.open(
            this.data.object.url,
            '_blank'
        );
    }

});

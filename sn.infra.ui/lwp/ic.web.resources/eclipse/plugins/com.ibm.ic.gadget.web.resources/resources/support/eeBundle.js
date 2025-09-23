/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/cache",
	"dojo/date/stamp",
	"dojo/DeferredList",
	"dojo/AdapterRegistry",
	"dojo/cldr/supplemental",
	"dojo/date",
	"dojo/date/locale",
	"dojo/html",
	"dojo/i18n",
	"dojo/number",
	"dojo/parser",
	"dojo/regexp",
	"dojo/string",
	"dijit/_base/sniff",
	"dijit/_DialogMixin",
	"dijit/_base/scroll",
	"dijit/_base/popup",
	"dijit/DialogUnderlay",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/_base",
	"dijit/_base/focus",
	"dijit/_base/manager",
	"dijit/_base/place",
	"dijit/_base/typematic",
	"dijit/_base/wai",
	"dijit/_base/window",
	"ic-core/config/services",
	"ic-ui/recommend/_base",
	"./eeBundleStrings",
	"ic-ee/bean/AtomBean",
	"ic-ee/bean/Bean",
	"ic-ee/bean/User",
	"ic-ee/data/AbstractRoutes",
	"ic-ee/widget/Recommendation",
	"ic-ee/widget/History",
	"ic-ee/util/validation",
	"ic-ee/widget/Comments",
	"ic-ee/util/ErrorHandling",
	"ic-ee/data/ProfilesRoutes",
	"ic-ee/data/FeedDataStore",
	"ic-ee/data/DataStore",
	"ic-ee/util/ConnectionManager",
	"ic-ee/test/util/serviceutil",
	"ic-ee/data/ShowMoreDataStore",
	"ic-ee/data/HistoryDataStore",
	"ic-ee/data/FlagItemDataStore",
	"ic-ee/data/DomBuilder",
	"ic-ee/config",
	"ic-ee/bean/PermissionsBean",
	"ic-ee/bean/FlagItem",
	"ic-ee/action/InlineAction",
	"ic-ee/action/FlagItem",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/url",
	"ic-incontext/util/text",
	"ic-incontext/util/proxy",
	"ic-incontext/util/misc",
	"ic-incontext/util/html",
	"ic-incontext/util/dom",
	"ic-incontext/util/atom",
	"ic-incontext/util/_dom",
	"ic-incontext/util/uri",
	"ic-incontext/widget/MessageContainer",
	"ic-ui/Logger",
	"ic-ui/_base",
	"ic-ui/controls/HoverDialog",
	"ic-ui/controls/HoverPopup",
	"ic-ui/controls/Like",
	"ic-ui/controls/_HoverDialogMixin",
	"ic-ui/recommend/Inline",
	"ic-ui/recommend/Popup",
	"ic-ui/util/Url"
], function (cache, stamp, DeferredList, AdapterRegistry, supplemental, date, locale, html, i18n, number, parser, regexp, string, sniff, _DialogMixin, scroll, popup, DialogUnderlay, _Templated, _Widget, _base, focus, manager, place, typematic, wai, windowModule, services, ibmOneuiRecommend_base, eeBundleStrings, AtomBean, Bean, User, AbstractRoutes, Recommendation, History, validation, Comments, ErrorHandling, ProfilesRoutes, FeedDataStore, DataStore, ConnectionManager, serviceutil, ShowMoreDataStore, HistoryDataStore, FlagItemDataStore, DomBuilder, config, PermissionsBean, ibmSocialEeBeanFlagItem, InlineAction, FlagItem, DateFormat, url, text, proxy, misc, html, dom, atom, _dom, uri, MessageContainer, Logger, ibmOneui_base, HoverDialog, HoverPopup, Like, _HoverDialogMixin, Inline, Popup, Url) {

	//Common dependencies in decreasing order of frequency of:
	//js "com.ibm.social.ee.widget.FileLoader"
	//js "com.ibm.social.ee.widget.BlogEntryLoader"
	//js "com.ibm.social.ee.widget.NetworkInviteLoader"
	//js "com.ibm.social.ee.widget.StatusUpdateLoader"
	
	 // included 4 times, compressed size 5,158
	 // included 4 times, compressed size 1,955
	 // included 4 times, compressed size 1,402
	 // included 4 times, compressed size 357
	 // included 4 times, compressed size 5,245
	 // included 4 times, compressed size 5,124
	 // included 4 times, compressed size 1,070
	 // included 4 times, compressed size 10,243
	 // included 4 times, compressed size 2,147
	 // included 4 times, compressed size 5,494
	 // included 4 times, compressed size 13,929
	 // included 4 times, compressed size 7,022
	 // included 4 times, compressed size 3,020
	 // included 4 times, compressed size 757
	 // included 4 times, compressed size 6,433
	 // included 4 times, compressed size 651
	 // included 4 times, compressed size 2,580
	 // included 4 times, compressed size 3,928
	 // included 4 times, compressed size 8,578
	 // included 4 times, compressed size 433
	 // included 4 times, compressed size 6,331
	 // included 4 times, compressed size 4,622
	 // included 4 times, compressed size 3,654
	 // included 4 times, compressed size 3,931
	 // included 4 times, compressed size 1,653
	 // included 4 times, compressed size 755
	 // included 4 times, compressed size 2,711
	 // included 4 times, compressed size 1,987
	 // included 4 times, compressed size 436
	 // included 4 times, compressed size 753
	 // included 4 times, compressed size 838
	 // included 4 times, compressed size 1,378
	 // included 4 times, compressed size 3,158
	 // included 4 times, compressed size 9,358
	 // included 4 times, compressed size 1,743
	 // included 4 times, compressed size 2,899
	 // included 4 times, compressed size 7,901
	 // included 4 times, compressed size 4,209
	 // included 4 times, compressed size 547
	 // included 4 times, compressed size 974
	//Partial size of dependencies required at least 4 times: 145,608
	 // included 3 times, compressed size 917
	 // included 3 times, compressed size 6,539
	 // included 3 times, compressed size 589
	 // included 3 times, compressed size 12,133
	 // included 3 times, compressed size 1,685
	 // included 3 times, compressed size 2,637
	 // included 3 times, compressed size 4,300
	 // included 3 times, compressed size 7,058
	 // included 3 times, compressed size 3,451
	 // included 3 times, compressed size 1,902
	 // included 3 times, compressed size 3,467
	 // included 3 times, compressed size 3,051
	 // included 3 times, compressed size 297
	 // included 3 times, compressed size 2,370
	 // included 3 times, compressed size 767
	 // included 3 times, compressed size 12,298
	 // included 3 times, compressed size 1,085
	 // included 3 times, compressed size 4,161
	 // included 3 times, compressed size 5,746
	 // included 3 times, compressed size 2,873
	 // included 3 times, compressed size 634
	 // included 3 times, compressed size 1,364
	 // included 3 times, compressed size 26,189
	 // included 3 times, compressed size 5,050
	 // included 3 times, compressed size 745
	 // included 3 times, compressed size 4,367
	 // included 3 times, compressed size 1,187
	 // included 3 times, compressed size 754
	 // included 3 times, compressed size 1,338
	 // included 3 times, compressed size 3,033
	 // included 3 times, compressed size 3,516
	//Partial size of dependencies required at least 3 times: 284,214
	
	
	return com.ibm.lconn.gadget.support.eeBundle;
});

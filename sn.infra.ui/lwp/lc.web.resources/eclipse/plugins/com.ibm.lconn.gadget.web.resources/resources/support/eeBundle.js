/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.support.eeBundle");

//Common dependencies in decreasing order of frequency of:
//js "com.ibm.social.ee.widget.FileLoader"
//js "com.ibm.social.ee.widget.BlogEntryLoader"
//js "com.ibm.social.ee.widget.NetworkInviteLoader"
//js "com.ibm.social.ee.widget.StatusUpdateLoader"

dojo.require("com.ibm.lconn.gadget.support.eeBundleStrings");


dojo.require("com.ibm.social.ee.util.validation");
dojo.require("com.ibm.social.ee.bean.AtomBean"); // included 4 times, compressed size 5,158
dojo.require("com.ibm.social.ee.bean.Bean"); // included 4 times, compressed size 1,955
dojo.require("com.ibm.social.ee.bean.User"); // included 4 times, compressed size 1,402
dojo.require("com.ibm.social.ee.data.AbstractRoutes"); // included 4 times, compressed size 357
dojo.require("com.ibm.social.ee.data.DataStore"); // included 4 times, compressed size 5,245
dojo.require("com.ibm.social.ee.data.FeedDataStore"); // included 4 times, compressed size 5,124
dojo.require("com.ibm.social.ee.data.ProfilesRoutes"); // included 4 times, compressed size 1,070
dojo.require("com.ibm.social.incontext.util.DateFormat"); // included 4 times, compressed size 10,243
dojo.require("com.ibm.social.incontext.util._dom"); // included 4 times, compressed size 2,147
dojo.require("com.ibm.social.incontext.util.atom"); // included 4 times, compressed size 5,494
dojo.require("com.ibm.social.incontext.util.dom"); // included 4 times, compressed size 13,929
dojo.require("com.ibm.social.incontext.util.html"); // included 4 times, compressed size 7,022
dojo.require("com.ibm.social.incontext.util.misc"); // included 4 times, compressed size 3,020
dojo.require("com.ibm.social.incontext.util.proxy"); // included 4 times, compressed size 757
dojo.require("com.ibm.social.incontext.util.text"); // included 4 times, compressed size 6,433
dojo.require("com.ibm.social.incontext.util.uri"); // included 4 times, compressed size 651
dojo.require("com.ibm.social.incontext.util.url"); // included 4 times, compressed size 2,580
dojo.require("dijit._Templated"); // included 4 times, compressed size 3,928
dojo.require("dijit._Widget"); // included 4 times, compressed size 8,578
dojo.require("dijit._base"); // included 4 times, compressed size 433
dojo.require("dijit._base.focus"); // included 4 times, compressed size 6,331
dojo.require("dijit._base.manager"); // included 4 times, compressed size 4,622
dojo.require("dijit._base.place"); // included 4 times, compressed size 3,654
dojo.require("dijit._base.popup"); // included 4 times, compressed size 3,931
dojo.require("dijit._base.scroll"); // included 4 times, compressed size 1,653
dojo.require("dijit._base.sniff"); // included 4 times, compressed size 755
dojo.require("dijit._base.typematic"); // included 4 times, compressed size 2,711
dojo.require("dijit._base.wai"); // included 4 times, compressed size 1,987
dojo.require("dijit._base.window"); // included 4 times, compressed size 436
dojo.require("dojo.AdapterRegistry"); // included 4 times, compressed size 753
dojo.require("dojo.cache"); // included 4 times, compressed size 838
dojo.require("dojo.cldr.supplemental"); // included 4 times, compressed size 1,378
dojo.require("dojo.date"); // included 4 times, compressed size 3,158
dojo.require("dojo.date.locale"); // included 4 times, compressed size 9,358
dojo.require("dojo.date.stamp"); // included 4 times, compressed size 1,743
dojo.require("dojo.i18n"); // included 4 times, compressed size 2,899
dojo.require("dojo.number"); // included 4 times, compressed size 7,901
dojo.require("dojo.parser"); // included 4 times, compressed size 4,209
dojo.require("dojo.regexp"); // included 4 times, compressed size 547
dojo.require("dojo.string"); // included 4 times, compressed size 974
//Partial size of dependencies required at least 4 times: 145,608
dojo.require("com.ibm.oneui.Logger"); // included 3 times, compressed size 917
dojo.require("com.ibm.oneui._base"); // included 3 times, compressed size 6,539
dojo.require("com.ibm.oneui.controls.HoverDialog"); // included 3 times, compressed size 589
dojo.require("com.ibm.oneui.controls.HoverPopup"); // included 3 times, compressed size 12,133
dojo.require("com.ibm.oneui.controls.Like"); // included 3 times, compressed size 1,685
dojo.require("com.ibm.oneui.controls._HoverDialogMixin"); // included 3 times, compressed size 2,637
dojo.require("com.ibm.oneui.recommend.Inline"); // included 3 times, compressed size 4,300
dojo.require("com.ibm.oneui.recommend.Popup"); // included 3 times, compressed size 7,058
dojo.require("com.ibm.oneui.recommend._base"); // included 3 times, compressed size 3,451
dojo.require("com.ibm.oneui.util.Url"); // included 3 times, compressed size 1,902
dojo.require("com.ibm.social.ee.action.FlagItem"); // included 3 times, compressed size 3,467
dojo.require("com.ibm.social.ee.action.InlineAction"); // included 3 times, compressed size 3,051
dojo.require("com.ibm.social.ee.bean.FlagItem"); // included 3 times, compressed size 297
dojo.require("com.ibm.social.ee.bean.PermissionsBean"); // included 3 times, compressed size 2,370
dojo.require("com.ibm.social.ee.config"); // included 3 times, compressed size 767
dojo.require("com.ibm.social.ee.data.DomBuilder"); // included 3 times, compressed size 12,298
dojo.require("com.ibm.social.ee.data.FlagItemDataStore"); // included 3 times, compressed size 1,085
dojo.require("com.ibm.social.ee.data.HistoryDataStore"); // included 3 times, compressed size 4,161
dojo.require("com.ibm.social.ee.data.ShowMoreDataStore"); // included 3 times, compressed size 5,746
dojo.require("com.ibm.social.ee.test.util.serviceutil"); // included 3 times, compressed size 2,873
dojo.require("com.ibm.social.ee.util.ConnectionManager"); // included 3 times, compressed size 634
dojo.require("com.ibm.social.ee.util.ErrorHandling"); // included 3 times, compressed size 1,364
dojo.require("com.ibm.social.ee.widget.Comments"); // included 3 times, compressed size 26,189
dojo.require("com.ibm.social.ee.widget.History"); // included 3 times, compressed size 5,050
dojo.require("com.ibm.social.ee.widget.Recommendation"); // included 3 times, compressed size 745
dojo.require("com.ibm.social.incontext.widget.MessageContainer"); // included 3 times, compressed size 4,367
dojo.require("dijit.DialogUnderlay"); // included 3 times, compressed size 1,187
dojo.require("dijit._DialogMixin"); // included 3 times, compressed size 754
dojo.require("dojo.DeferredList"); // included 3 times, compressed size 1,338
dojo.require("dojo.html"); // included 3 times, compressed size 3,033
dojo.require("lconn.core.config.services"); // included 3 times, compressed size 3,516
//Partial size of dependencies required at least 3 times: 284,214


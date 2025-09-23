/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.controls.Feeds");

/* This module provides a 1:1 replacement for com.ibm.oneui.controls.Feeds */
dojo.require("ic-ui.Feeds");

/**
 * @typedef FeedItem
 * @property {String} text Link text of the feed
 * @property {String} title Title of the feed
 * @property {String} type Mime type of the feed
 * @property {URL} href Url of the feed
 */

/**
 * A widget that renders links to feeds, usually at the bottom of lists
 * @class com.ibm.oneui.controls.Feeds
 * @deprecated Use {@link ic-ui.Feeds} instead
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.deprecated("com.ibm.oneui.controls.Feeds", "Use ic-ui.Feeds instead", "6.0");

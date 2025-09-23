/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./Action",
  "dojo/topic"
], function (declare, Action, topic) {
  "use strict";

  return declare([Action], {
    onLinkClicked: function () {
      topic.publish(this.eventName);
    }
  });
});

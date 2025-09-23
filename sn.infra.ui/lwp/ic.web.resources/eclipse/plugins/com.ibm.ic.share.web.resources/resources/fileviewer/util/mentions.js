/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/array"
], function (array) {

  var LINKED_MENTION_REGEX_STRING = '<[sS][pP][aA][nN] class="?vcard"?><[aA] class="?fn url"? href=".*?">([^<>]+)' +
    '</[aA]><[sS][pP][aA][nN] (?:(?:class="?x-lconn-userid"? style="?[dD][iI][sS][pP][lL][aA][yY]: none;?"?)' +
    '|(?:style="?[dD][iI][sS][pP][lL][aA][yY]: none;?"? class="?x-lconn-userid"?))>([^<>]+)</[sS][pP][aA][nN]>' +
    '</[sS][pP][aA][nN]>',
    MENTION_PART1 = "<span class=\"vcard\"><span class=\"fn\">",
    MENTION_PART2 = "</span><span class=\"x-lconn-userid\">",
    MENTION_PART3 = "</span></span>";
  
   return {
     formatMentionsForEdit: function (text) {
       var match;
       var newText = text;
       var lastIndex = 0;
       var regExp = new RegExp(LINKED_MENTION_REGEX_STRING, "g");
       while((match = regExp.exec(text)) !== null) {
          var matchIndex = match.index;
          if(matchIndex >= lastIndex) {
             var o = text.substring(match.index, match.index + match[0].length);
             var n = MENTION_PART1 + match[1] + MENTION_PART2 + match[2] + MENTION_PART3;
             newText = newText.replace(o, n);
             lastIndex = matchIndex + match[0].length;
          }
       }
       return newText;
    },
    
    getUniqueMentions: function (mentions) {
      var unique = [];
      var map = {};
      
      array.forEach(mentions, function(mention) {
         if (!(mention.value in map)) {
            map[mention.value] = true;
            unique.push(mention);
         }
      }, this);
      
      return unique;
    }
   };
});

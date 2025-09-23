/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
    AddGroups.js
    This widget contains everything needed to add groups to a form. However, it lacks
    the form element and submit/cancel buttons so this can be placed in a variety of 
    forms. 
*/

dojo.provide("lconn.core.AddGroups");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.BrowseGroups");
dojo.require("lconn.core.PeopleTypeAhead");
dojo.require("lconn.core.GroupsDataStore");
dojo.require('lconn.core.NameUtil');
dojo.require("lconn.core.aria.Listbox");

// Widget declaration object
var w={
   templatePath: dojo.moduleUrl("lconn.core","templates/AddGroups.html")
};

// Base Class Settings

// Resource Strings (with defaults)
w.rs_browseGroups         = "Browse Groups";
w.rs_groups               = "Groups";
w.rs_members              = "Members";
w.rs_noResults            = "No results found";
w.rs_addMember_title      = "Click to add member";
w.rs_removeMember_title   = "Click to remove member";
w.rs_addGroup_title       = "Click to add group";
w.rs_removeGroup_title    = "Click to remove group";
w.rs_group_typeahead      = "Group Name";
w.rs_group_select         = "group select";

// Parameters
w.communityUuid = null;
w.contextPath = null;
w.orgId = null;
// should we show the role drop down or hide it [roleSelector1, roleSelector2]
w.showRoleSelector=true;
w.disableRenderGroupsList = false;
w.pageSize = 25;
//override for custom no result message
w.NoResultsMessage = null;

// Div to announce new members
w.ariaDiv = null;

// memberStore: lconn.core.GroupsDataStore
// Used to supply the names that will be fetched by the TypeAhead widget
w.memberStore = null;

//typeAhead_W: lconn.core.PeopleTypeAhead
//   A type-ahead widget used for helping users type in names
w.typeAhead_W = null;

//browseGroups_W: lconn.core.BrowseGroupsList
//   A browse widget used for showing group lists
w.browseGroups_W = null;

// members: { authors: [ person_1, ... ]}
//           
// Used to keep track of the people that have been queued up to be added to this Community.
w.members = {};

// Cell id if widget is in a table 
//w.cellContainer = "addMembersContainer";
w.cellContainer = "addGroupsContainer";

//Group lookup type (groupTypeahead or browseGroups)
w.groupLookupType = "groupTypeahead";

//Turn on local AddGroups debugging
w.debug = false;

w.listboxNavigation = null;

// Initialize Resources
w.postMixInProperties =  function() {
    this.debugLog("Entered postMixInProperties");
 
    this.stringResources = dojo.i18n.getLocalization("lconn.core", "strings");
    this.rs_browseGroups      = this.stringResources.rs_group_browse_groups;
    this.rs_groups            = this.stringResources.rs_member_groups;
    this.rs_members           = this.stringResources.rs_member_members;
    this.rs_addMember_title   = this.stringResources.rs_member_add_to_community;
    this.rs_removeMember_title = this.stringResources.rs_member_remove_group;
    this.rs_addGroup_title    = this.stringResources.rs_group_add_to_community;
    this.rs_removeGroup_title = this.stringResources.rs_group_remove_name;
    this.rs_group_typeahead     = this.stringResources.rs_group_name;
    this.rs_group_select      = this.stringResources.rs_group_role;
    
    if(this.NoResultsMessage){
        this.rs_noResults = this.NoResultsMessage;
    }else{
        this.rs_noResults = this.stringResources.rs_member_no_results;
    }
            
    this.debugLog("Left postMixInProperties");
};

// Dojo methods
w.postCreate=function(){
    this.debugLog("Entered postCreate");
 
    // TODO - Should org_id be included or description?
    this.members = {
        G: {
            authors: {
                uuid:  [],
                name: []
            }
        }
    };
    
    // Limit typeahead to one Community
    var communityStr = "";
    this.disableSearchDirectory = false;   // true prevents display of the "Person not listed?" string in the combobox
    if (this.communityUuid != null) {
        communityStr = "?communityUuid="+this.communityUuid;
        //this.disableSearchDirectory = true;
    }

    // Set up the type-ahead        
    this.debugLog("contextPath = " + this.contextPath);
    var url = this.contextPath + "groupselection/getGroups" + communityStr;

    this.memberStore = new lconn.core.GroupsDataStore({ url: url, queryParam: "member", orgId: this.orgId }, this.memberStore_AP );
    
    // Leverage existing people TA support in infra ... expand as necessary ..
    var typeAheadId = this.id+"PeopleTypeAhead";
    var argsTA = {
      isGroup:true,
      id: typeAheadId,
        minChars: 2,
        searchDelay: 600,
        multipleValues: false,
        store: this.memberStore,
        NoResultsMessage: this.rs_noResults,
        disableSearchDirectory: this.disableSearchDirectory,
        'class': 'typeAhead'
    };
    
    this.typeAhead_W = new lconn.core.PeopleTypeAhead( argsTA, this.membersCombo_AP );
    
    dojo.connect(this.typeAhead_W, "_selectOption", this, 'newMember');
   
    this.typeAhead_W.focusNode.maxLength = 65;
    
    this.groupList_AP.style.height = '';
    this.groupList_AP.className = 'memberList';
    
    // Enable Group typeahead selection as the default
    this.setGroupLookup('groupTypeahead');
    
    // Group browsing support
    var browseId = this.id + "_browseGroups";
    var argsBG = {
      id: browseId,
        pageSize: this.pageSize,
        memberStore: this.memberStore,
        addGroupsWidgetRef: this,
        NoResultsMessage: this.rs_noResults
    };
    
    this.browseGroups_W = new lconn.core.BrowseGroups( argsBG, this.browseGroups_AP );
    
    this.debugLog("Role selector enabled: " + this.showRoleSelector);
    if (this.showRoleSelector == false)
    {
      // destroy the role selector elements
      dojo.destroy(this.groupSelect1_AP);
      dojo.destroy(this.groupSelect2_AP);
    }
    
    this.debugLog("Left postCreate");
};

w.uninitialize = function () {
    this.debugLog("Entered uninitialize");
    this.members = null;
    if (this.typeAhead_W != null) {
       this.debugLog("Destroying typeahead widget.");
       this.typeAhead_W.destroy();
       this.typeAhead_W = null;
    }
    
    if (this.browseGroups_W != null) {
       this.debugLog("Destroying browse groups widget.");
       this.browseGroups_W.destroy();
       this.browseGroups_W = null;
    }
	if (this.listboxNavigation != null) {
		this.listboxNavigation.destroy();
	}
    this.debugLog("Left uninitialize");
};

//Resets the form and empties the lists
w.reset = function () {
    this.debugLog("Entered reset");
    this.members = {
        G: {
            authors: {
                uuid:  [],
                name: []
            }
        }
    };
    
    this.typeAhead_W.setValue('');
    
    this.authors_GRP_AP.value = '';
        
    this.groupList_AP.innerHTML = '';
    this.groupList_AP.style.height = '';
    this.groupList_AP.className = 'memberList';
    this.groupList_AP.style.visibility = '';
    this.updateListbox();
    this.debugLog("Left reset");
};

// class methods
w.newMember=function () {
    this.debugLog("Entered newMember");
    var personObj = null;  //The selected person from the type-ahead
    var aclLevel = 'authors';     //The permissions level for the new member (from the drop-down input)
    var nameArr = [];      //Array of people after splitting the text box value by a token (usually ',')
    var clear = false;     //Boolean to tell at the end of the loop whether or not the text box should be cleared
                           //It should be cleared if at least one name in the text box was accepted
    
    personObj = this.typeAhead_W.getItem();
    
    var type, personId;
    
    //Check type. We can only get a type from the type-ahead box
    //  if there was only one name in the list. Normally there will
    //  only be one name because when a name is selected from type-
    //  ahead, this function is called right away.
    if ( personObj ) {
        switch(parseInt(personObj.type, 10)) {
            case 0: type = 'P'; break;
            case 1: type = 'G'; break;
            case 2: type = 'C'; break;
            default: type = 'P';
        }
        personId = personObj.userid;
    }
    else {
        type = 'G';
        personId = this.typeAhead_W.getTextBoxValue();
    }
    
    if ( personId && personId != "null" ) {
        this.addNewGroup(aclLevel, personId, personObj.name, personObj.member);
        this.updateListbox();
    }
    
    this.debugLog("Left newMember");
};

// class methods
w.addNewGroup=function (aclLevel, personId, personName, personEmail) {
    this.debugLog("Entered addNewGroup");
    
    // Adds group to members list
    var type = 'G';
    this.addMemberData(type, aclLevel, personId, personEmail, personName);
    
    if (this.disableRenderGroupsList) {
      // Requested by Activities
        this.debugLog("Group list rendering is disabled - skipping");
        this.debugLog("Left addNewGroup");
        return;
    }
    
    this.groupListContainer_AP.style.display='block';    
    
    //Add person to list in HTML
    var newName = document.createElement('a');
    dojo.addClass(newName, 'lotusFilter filterSpacing');
    
    var removeMemberAlt = dojo.string.substitute(this.rs_removeMember_title, [personName]);
    newName.title = removeMemberAlt;
    newName.setAttribute("aria-label", removeMemberAlt);
    newName.href = "javascript:;";
    newName.setAttribute("role", "option");
    newName.innerHTML = personName + ' (' + this.rs_members + ')';

    this.connect(newName,'ondijitclick',
            dojo.hitch(this, "removeMember", personId, type, aclLevel, newName)
    );
            
//    var currNameHtml = lconn.core.NameUtil.getHTML(personName,null,personId);
//    content.innerHTML += currNameHtml;
    
    var delButton = document.createElement("img");
    delButton.className = "lotusDelete";
    delButton.setAttribute("role", "presentation");
    delButton.setAttribute("alt",removeMemberAlt);
    delButton.src = dojo.config.blankGif;
        
    removeMemberAlt = dojo.string.substitute(this.rs_removeMember_title, [personName]);
    
      
    // high contrast version
    var delButtonText = document.createElement("span");
    delButtonText.className = "fieldDelText";
    delButtonText.title = removeMemberAlt;
    delButtonText.innerHTML = 'X';
    
    this.connect(delButtonText,'ondijitclick',
        dojo.hitch(this, "removeMember", personId, type, aclLevel, newName)
    );
    
    newName.appendChild(delButton);
    newName.appendChild(delButtonText);
    
    
    if ( this.groupList_AP.firstChild ) {
        this.groupList_AP.insertBefore(newName, this.groupList_AP.firstChild);
    } else {
        this.groupList_AP.appendChild(newName);
    }
    
    this.groupList_AP.className = 'lotusFilters2';
    this.groupList_AP.style.visibility = "visible";
    this.groupList_AP.style.whiteSpace = "normal";
    
    this.announceAdd(this.addGroups_AP, aclLevel, personName);
    
    //Parse javalin cards
    if ( window.SemTagSvc && SemTagSvc.parseDom && SemTagSvc.service != null )
        SemTagSvc.parseDom(0,newName);
    
    if (this.howManyMembers() >= this.scrollThreshold) {
        this.groupList_AP.style.height = this.groupList_AP.offsetHeight + "px";
        dojo.addClass(this.groupList_AP, "scroll");
    }
    
    this.typeAhead_W.setValue('');
    
    // Force table cell to repaint (to get around IE display issues)       
    if (w.cellContainer != null) {
        var cellElm = dojo.byId(w.cellContainer);
        if (cellElm != null) {
            cellElm.style.display = "none";
            cellElm.style.display = "block";
        }
    }
    
    this.updateListbox();
    this.debugLog("Left addNewGroup");
};

// Note data is assumed to be valid and no data checking is
// done at this level.
w.addMemberData = function(type, aclLevel, personId, personEmail, personName) {
    this.debugLog("Entered addMemberData aclLevel: "+aclLevel+" personId: "+personId+" personEmail: "+personEmail+" personName: "+personName);
    if (personId ) {
        this.debugLog("Adding member by uuid: "+personId);
        this.members[type][aclLevel]["uuid"].push(personId + ":G");
        if (personName) this.members[type][aclLevel]["name"].push(personName);
    }
};

// removeMemberData removes new member data from the 
// array sent to the server.  
w.removeMemberData = function(type, aclLevel, personId, personEmail) {
    this.debugLog("Entered removeMemberData aclLevel: "+aclLevel+" personId: "+personId+" personEmail: "+personEmail);
    
    var idtype;
    var member;

    if (personId) {
        idtype = "uuid";
        member = personId;
    }
    else {
        idtype = "email";
        member = personEmail;
    }
         
    // Find member in members list
    var ii = 0;
    while(ii < this.members[type][aclLevel][idtype].length && this.members[type][aclLevel][idtype][ii] != (member + ":G") ) {
        ii++;
    }

    var personName = null;
    
    // If we've found a match, remove the member
    if (ii < this.members[type][aclLevel][idtype].length) {
        this.debugLog("removeMemberData: Match found, removing member: "+member+" idtype: "+idtype);
        this.members[type][aclLevel][idtype].splice(ii, 1);
        personName = this.members[type][aclLevel]["name"].splice(ii, 1);
    }
    
    return personName;
};

//Returns the number of people in the members object
w.howManyMembers = function() {
    var count = 0;
    
    for(var type in this.members) {
        for(var level in this.members[type]) {
            for(var idtype in this.members[type][level]) {
               if (idtype != "name")
                  count += this.members[type][level][idtype].length;
            }
        }
    }
    this.debugLog("Leaving howManyMembers, count: "+count);
    return count;
};

// Remove the member from the queue to be added
w.removeMember = function(/* string */ personId, /* string (P|G|C) */ type, /* string */ aclLevel, /* DOM node */ node, /* obj */ evt) {
    this.debugLog("Entered removeMember");
    var prevSibling = node.previousSibling;
    if(prevSibling != null)
    {
      prevSibling.focus();
    }
    else
    {
      var nextSibling = node.nextSibling;
      if(nextSibling!=null)
      {
         nextSibling.focus();
      }
    }
    
    if (node) {
        this.groupList_AP.removeChild(node);
    }
    
    // Remove member from internal data array
    var personName = this.removeMemberData(type, aclLevel, personId, null);
    
    var count = this.howManyMembers();
    
    if (count == 0) {
      this.typeAhead_W.focus();
    }
    
    this.announceRemove(this.addGroups_AP, aclLevel, personName);
    
    this.updateListbox();
    this.debugLog("Left removeMember");
};

w.updateListbox = function(){
	if (this.listboxNavigation != null) {
		this.listboxNavigation.destroy();
	}
	this.listboxNavigation = new lconn.core.aria.Listbox('groupList');
};

// This should be called when the data is needed inside the hidden fields
// prior to a submit. This sets the hidden fields with the data currently
// inside this.members.
w.setHiddenFields = function () {
    this.debugLog("Entered setHiddenFields");
    var hiddenInputs = {};
    var len = 0;
    for(var type in this.members) {
        hiddenInputs[type] = {};
        for(var level in this.members[type]) {
            hiddenInputs[type][level] = {};
            for(var idtype in this.members[type][level]) {
                hiddenInputs[type][level][idtype] = this.members[type][level][idtype].join(',');
            }
        }
    }
    
    this.authors_GRP_AP.value = hiddenInputs.G.authors.uuid;
    
    this.debugLog("Group members: "+this.authors_GRP_AP.value);
    this.debugLog("Left setHiddenFields");
};
// Note: call setHiddenFields first
w.getGroups = function () {
    return (this.authors_GRP_AP.value);
};

//Note: call setHiddenFields first
w.getGroupDescriptions = function () {
    return ('');
};

w.noProcessing = function (evt) {
    dojo.stopEvent(evt);
};

w.keyListener = function(evt){
   this.debugLog("Entered keyListener");
   //    Handles keyboard events
   var key =  evt.keyCode || evt.charCode;
   var dk = dojo.keys;
   switch (key) {
      case dk.SPACE:
         evt.preventDefault();
         this.browseGroups(evt);
      default:

   }

}
w.browseGroups = function (evt) {
    this.debugLog("Entered browseGroups");
    this.setGroupLookup('browseGroups');
    this.browseGroups_W.displayBrowseGroupsDialog();
    dojo.stopEvent(evt);
    
    this.debugLog("Left browseGroups");
    return false;
};


w.setGroupLookup = function (lookupType) {
    this.groupLookupType = lookupType;
};

w.debugLog = function (message) {
    if (this.debug || (window.debugComm != null)) {
        if (window.console != null) {
            console.log("AddGroups.js: " + message);
        }
    }
};

// Announce adding a new group
w.announceAdd = function(containerNode, aclLevel, personName) {
   var message = null;
   if (aclLevel == 'authors') {
      message = this.stringResources.rs_member_added;
      if (message == null) 
         message = "Selected ${0} as a member"; // default message
   }

   var announceMsg = dojo.string.substitute(message, [personName]);
   this.announce(containerNode,announceMsg);
};

//Announce removing a person
w.announceRemove = function(containerNode, aclLevel, personName) {
   var message = null;
   if (aclLevel == 'authors') {
      message = this.stringResources.rs_member_removed;
      if (message == null) 
         message = "Removed ${0} as a member"; // default message    
   }

   var announceMsg = dojo.string.substitute(message, [personName]);
   this.announce(containerNode,announceMsg);
};

// Create a div to make an announcement. The announcement message is not displayed but
// will be read by screen readers. 
w.announce = function announce(containerNode, message) {
    var ariaDiv = this.ariaDiv;
    
    // Create the ariaDiv if it doesn't exist
    if (!ariaDiv) {
       ariaDiv = this.ariaDiv = document.createElement("div");
       ariaDiv.className = "lotusAccess";
       dijit.setWaiRole(ariaDiv, "alert");
       containerNode.appendChild(ariaDiv);
    }
    
    // Empty the div for reuse if it already has text content
    while (ariaDiv.firstChild) {
       ariaDiv.removeChild(ariaDiv.firstChild);
    }
    
    ariaDiv.appendChild(document.createTextNode(message));
};


dojo.declare("lconn.core.AddGroups", [dijit._Widget, dijit._Templated], w);

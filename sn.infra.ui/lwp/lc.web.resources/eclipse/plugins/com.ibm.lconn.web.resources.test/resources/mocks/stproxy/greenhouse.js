/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Mock objects for Sametime Proxy tests
 * 
 * @namespace lconn.test.mocks.stproxy.greenhouse
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.provide('lconn.test.mocks.stproxy.greenhouse');

(function() {
   // First round of scalar properties
   var stproxy = window.stproxy = {
      "allowAnonymousLogin": false,
      "DELIMITER": "|",
      "displayNames": {},
      "ESC_PRESSED": false,
      "EXTERNAL_USER_PREFIX": "@E ",
      "isUnauthorized": false,
      "loginCount": 0,
      "loginResponse": {},
      "loginUsername": "",
      "isLoggedIn": false,
      "MAX_MESSAGE_LENGTH": 10000,
      "manualLogout": false,
      "isWebAv": false,
      "isHTTPS": true,
      "CHAT_EDITOR_FONT": "chatEditorFontKey",
      "buildVersion": "STSU8.5.2.120131021.0941",
      "substitute": function(){},
      "options": {
         "store": {}
      },
      "json": {},
      "agent": {
         "_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36"
      },
      "session": {},
      "reset": {},
      "guestStore": {
         "noResolve": true,
         "_ids": {}
      },
      "offlineMessages": {
         "flagName": "isofflinemessage"
      },
      "resolve": {},
      "awareness": {
         "UNKNOWN": -1,
         "OFFLINE": 0,
         "AVAILABLE": 1,
         "AWAY": 2,
         "DND": 3,
         "NOT_USING": 4,
         "IN_MEETING": 5,
         "AVAILABLE_MOBILE": 6,
         "AWAY_MOBILE": 7,
         "DND_MOBILE": 8,
         "IN_MEETING_MOBILE": 10,
         "i18nStrings": {
            "0": "statusOffline",
            "1": "statusAvailable",
            "2": "statusAway",
            "3": "statusDisturb",
            "4": "statusAway",
            "5": "statusMeeting",
            "6": "statusAvailableMobile",
            "7": "statusAwayMobile",
            "8": "statusDisturbMobile",
            "10": "statusMeetingMobile"
         }
      },
      "telephony": {
         "isActive": false,
         "AVAILABLE": 1,
         "BUSY": 2
      },
      "api": {
         "CONTEXT_ROOT": "https://st85meetingsp.lotus.com:9444/stwebapi",
         "LOGIN": "https://st85meetingsp.lotus.com:9444/stwebapi/user/connect",
         "LOGOUT": "https://st85meetingsp.lotus.com:9444/stwebapi/user/connect",
         "STATUS": "https://st85meetingsp.lotus.com:9444/stwebapi/user/status",
         "LOCATION": "https://st85meetingsp.lotus.com:9444/stwebapi/user/location",
         "ALERTS": "https://st85meetingsp.lotus.com:9444/stwebapi/user/alerts",
         "PRIVACY": "https://st85meetingsp.lotus.com:9444/stwebapi/user/privacy",
         "CAPABILITY": "https://st85meetingsp.lotus.com:9444/stwebapi/user/capability",
         "ATTRIBUTES": "https://st85meetingsp.lotus.com:9444/stwebapi/presence/attributes",
         "INFO": "https://st85meetingsp.lotus.com:9444/stwebapi/userinfo",
         "BUDDYLIST": "https://st85meetingsp.lotus.com:9444/stwebapi/buddylist",
         "USER": "https://st85meetingsp.lotus.com:9444/stwebapi/buddylist/user",
         "USERS": "https://st85meetingsp.lotus.com:9444/stwebapi/buddylist/users",
         "GROUP": "https://st85meetingsp.lotus.com:9444/stwebapi/buddylist/group",
         "GROUPS": "https://st85meetingsp.lotus.com:9444/stwebapi/buddylist/groups",
         "PRESENCE": "https://st85meetingsp.lotus.com:9444/stwebapi/presence",
         "PRESENCE_STATUS": "https://st85meetingsp.lotus.com:9444/stwebapi/presence/status",
         "CHAT": "https://st85meetingsp.lotus.com:9444/stwebapi/chat",
         "MEETING": "https://st85meetingsp.lotus.com:9444/stwebapi/chat/meeting",
         "QUICKFIND": "https://st85meetingsp.lotus.com:9444/stwebapi/quickfind",
         "N_WAY_CHAT": "https://st85meetingsp.lotus.com:9444/stwebapi/chat/nway",
         "CALL": "https://st85meetingsp.lotus.com:9444/stwebapi/call",
         "CONF": "https://st85meetingsp.lotus.com:9444/stwebapi/conference",
         "CONFUSER": "https://st85meetingsp.lotus.com:9444/stwebapi/conference/user",
         "WEBAVVER": "https://st85meetingsp.lotus.com:9444/stwebav/WebAVServlet",
         "BUILD": "https://st85meetingsp.lotus.com:9444/stwebclient/buildinfo",
         "COMMUNITYFQDN": "https://st85meetingsp.lotus.com:9444/stwebclient/communityserver"
      },
      "client": {
         "INOTES_CLIENT": 5284,
         "WEB_CLIENT": 5293,
         "MOBILE_CLIENT": 5177,
         "OTHER": 5291
      },
      "codes": {
         "error": {
            "COMMUNITY_SERVER": 503,
            "CONNECT_CLIENT": 500,
            "SESSION": 17
         },
         "SUCCESS": 200,
         "MAX_SUCCESS": 299,
         "FAIL": 400,
         "UNAUTHORIZED": 401,
         "LOGIN_FAIL": 500
      },
      "loginType": {
         "AS_ANON": "anonymous",
         "BY_PASSWORD": "byPassword",
         "BY_TOKEN": "byToken"
      },
      "community": {
         "AOL": "aol",
         "GOOGLE": "google",
         "YAHOO": "yahoo",
         "SAMETIME_OTHER": "sametime/other"
      },
      "gateWayCommunityMap": {
         "AOL IM": "aol",
         "GoogleTalk": "google",
         "Yahoo Messenger": "yahoo!",
         "other": "sametime/other"
      },
      "isExternalUser": function(){},
      "isExternalUserId": function(){},
      "ignoreMessages": {
         "serverId": "server",
         "users": {
            "server": ["The following external users want to add you to their contact list"]
         }
      },
      "isConnectClientAPI": function(){},
      "policies": {
         "TCSPI": 5,
         "ALLOW_INSTANT_MEETING": 1001,
         "ALLOW_EXTERNAL_USER": 2001,
         "CONTACT_LIST_SIZE": 2015,
         "ALLOW_ANNOUNCEMENT": 9014,
         "ALLOW_SEARCH_DIRECTORY": 9023,
         "DISABLE_MEETING_INVITATION": 9034,
         "COMMUNITY_SERVER_LICENSE": 9034,
         "meeting": {},
         "userPolicies": {}
      },
      "helpTopics": {
         "landingPage": "st_imb_faq.html",
         "path": "/stwebclient/st_imb_faq"
      },
      "hitch": {},
      "SSO": {
         "tokens": ["LtpaToken", "LtpaToken2", "SametimeToken", "PD-H-SESSION-ID", "PD-S-SESSION-ID"]
      },
      "addExtension": function(){},
      "hasExtension": function(){},
      "uiControl": {
         "i18nStrings": {
            "1": "Sametime is temporarily unavailable.",
            "2": "Please enter a valid user name and password.",
            "3": "Service is currently unavailable.",
            "4": "Operation could not be performed.",
            "5": "Operation could not be performed.",
            "6": "Adding subgroups to a public group is not allowed.",
            "7": "Operation could not be performed.",
            "8": "Search is currently unavailable.",
            "9": "Chat service is currently unavailable.",
            "10": "This group already exists in your contact list.",
            "11": "Please login to Sametime.",
            "12": "Please enter a valid user name and password.",
            "13": "Sametime policy services are currently unavailable, Please try again.",
            "14": "Operation could not be performed.",
            "15": "Guest log in is not allowed, please use a valid user name and password.",
            "quickFindNoResults": "No results",
            "iBMLogoAlt": "IBM",
            "contactAdderAddToGroup": "Add to group",
            "awarenessLogout": "Log Out",
            "meetingCancelButton": "Cancel",
            "contextMenuAddSubgroup": "Add Subgroup",
            "groupAdderNewGroupName": "New group",
            "groupChatDefaultTopic": "Chat with ${0}",
            "smartCloudNavagatingCloseMessage": "You have logged out of IBM SmartCloud Chat.",
            "iGroupChatInvitationTitle": "Group Chat Invitation",
            "chatAnnouncementReceive": "${0} has sent you an announcement",
            "businessCardLabelAddress": "Address",
            "mainMenuHelpDemo": "Help Topics",
            "iawarenessCustomMessage": "Status Message",
            "chatConfirmDndMessage": "${0} is not allowing correspondence at this time.",
            "groupAdderAddAsSubgroup": "Add as a subgroup to the selected group below",
            "emoticonLabelGoofy": "goofy",
            "callCannotComplete": "Unable to place call at this time.",
            "announcementCancel": "Cancel",
            "chatWith": "Chat with ${0}",
            "chatUserDeclined": "${0} has declined the invitation to chat",
            "smartCloudApplicationTitle": "IBM SmartCloud Chat",
            "announcementTitle": "Announcement",
            "mainMenuHelp": "Help",
            "chatTopic": "group chat",
            "chatUnableToDeliverMessage": "Unable to deliver message to ${0}",
            "emoticonLabelCool": "cool",
            "iContactAdderErrorExtDomain": "A community with the specified domain name could not be found. Check with your administrator to determine which communities you can connect to.",
            "dialogContact": "Contact",
            "loginLoginAsGuest": "Log in as guest",
            "iActiveChatGroupChatLabel": "Group chat: ",
            "iContactAdderErrorTitle": "Add contact",
            "statusMeetingMobile": "In a Meeting",
            "externalUsersDefaultCommunity": "Sametime/Other",
            "mainMenuSametimeContacts": "Sametime Contacts",
            "errorClusterLoginTitle": "Attention",
            "businessCardEditNickname": "Edit Nickname",
            "groupChatInvite": "Invite",
            "mainMenuPrivacyList": "Privacy List",
            "applicationTitle": "IBM Sametime",
            "contextMenuInstantMeeting": "Invite to Meeting Room",
            "iGroupErrorRemoveTitle": "Remove group",
            "addContactErrorGroup": "This contact already exists in this group.",
            "aboutBoxText1": "Licensed Materials",
            "aboutBoxText2": "Property of IBM Sametime ${0} &copy;",
            "dialogNext": "Next",
            "aboutBoxText3": "Copyright. IBM Corporation 1998, 2013. IBM, the IBM Logo and Lotus are trademarks of IBM Corporation in the United  States, other countries or both.  AOL and AIM are registered trademarks and Instant Messenger is a trademark of America Online, Inc.",
            "privacyListRadioEverybody": "Everybody, EXCEPT those on the list can see me online",
            "aboutBoxText4": "This product is authorized to work with the AOL&reg; Instant Messenger&trade; service, has been certified to meet AOL's standards for operation as part of the AIM&reg; Certified Partner Program, and is authorized under U.S. Pat. Nos. 5,724,508, 5,774,670, 6,336,133, 6,339,784, 6,496,851, 6,539,421.",
            "groupChatInvitees": "Invitees",
            "chatstBoldButtonLabel": "Bold",
            "linkEditorCancel": "Cancel",
            "iGroupInfoTitlePrivate": "Personal Group",
            "errorHostNameTitle": "Unable to access Sametime:",
            "aboutBoxBuildId": "(${0})",
            "emoticonLabelFrown": "frown",
            "dialogBack": "Back",
            "quickFindPrevious": "Previous page",
            "contactAdderError1": "You have exceeded the following maximum number of contacts allowed: ${0}.",
            "contactAdderError2": "No more contacts can be added. To view and reduce the size of the contact list, click OK.",
            "statusAvailableMobile": "Available",
            "quickFindTitle": "Quickfind",
            "sametimeLogoAlt": "IBM Sametime",
            "errorRemovingUser": "Unable to remove contact, Please try again.",
            "chatConfirmInMeetingMessage": "${0} is in a Meeting and may not be available for chat. Would you like to send this message anyway?",
            "businessCardLabelPhone": "Telephone",
            "groupChatWith": "Chat with ${0}",
            "webclientExitingSametime": "You are about to exit Sametime",
            "externalUsersPopupContent": "That action cannot be performed on an external contact",
            "iChatErrorUnavailableTitle": "Cannot chat",
            "contextMenuAddContact": "Add Contact",
            "contextMenuCall": "Call",
            "errorChatInvitation": "Unable to send chat invite, Please try again.",
            "errorRenameGroup": "Unable to rename group, Please try again.",
            "statusBlankCustomMessage": "Enter a status message.",
            "iContactAdderCommunityLabel": "Community",
            "iContactAdderErrorNoContact": "Select a contact to add or start a new search.",
            "emoticonLabelOops": "oops",
            "errorContactAdder": "An error occured while adding the contact, Please try again.",
            "businessCardAddContact": "Add to Contact List",
            "iGroupAdderPersonalGroupRadio": "Add a new personal group",
            "statusSetCustomMessage": "Edit status message",
            "aboutBoxTitle": "About IBM Sametime",
            "launchClient": "Launch Sametime",
            "mainMenuGroupChatInvite": "Invite to Chat",
            "allContactsGroupLabel": "All Contacts",
            "contactAdderUserNameToSearch": "User name",
            "emoticonLabelAngry": "angry",
            "adderSearchResults": "Search results",
            "emoticonLabelNo": "no",
            "iBizCardErrorPhoneUnavailable": "The telephone number for the selected user is unknown or could not be retrieved.",
            "awarenessCancel": "Cancel",
            "contextMenuViewBusinessCard": "View Business Card",
            "popopRemoveGroupContent1": "Removing this group will also remove all group contacts and subgroups.",
            "popopRemoveGroupContent2": "Do you want to continue?",
            "announcementSend": "Send",
            "errorServerDown": "Sametime is temporarily unavailable.",
            "errorMeetingStart": "Unable to start meeting, Please try again.",
            "iPhoneLoginAlt": "IBM Sametime 8.5",
            "contextMenuRenameGroup": "Rename",
            "groupSelectorOk": "OK",
            "groupChatTitle": "Invite to Chat",
            "iBizCardErrorTitle": "Contact action unavailable",
            "iContactAdderErrorBlankName": "Type a new group name.",
            "errorApplicationDown": "Sametime is temporarily unavailable.",
            "adderSearch": "Search",
            "announcementDescription": "Use the search bar above to find contacts to whom you wish to send an announcement",
            "errorAnnouncement": "Unable to send announcement, Please try again.",
            "mainMenuSametimeGroupChat": "Group Chat",
            "mainMenuHideOfflineUsers": "Hide Offline Users",
            "loginUserStatus": "Availability status:",
            "addContactConfirmationContactLabel": "Contact added:",
            "contactAdderWarningTitle": "Contact List Warning",
            "callConfirmInMeetingMessage": "${0} is in a Meeting and may not be available for a call. Would you like to call anyway?",
            "meetingQuickfindTitle": " Use the search bar above to invite people to your Sametime meeting",
            "privacyListSaveButton": "Save",
            "contactAdderErrorTitle": "Contact List Error",
            "iPhoneLoginLoading": "Loading",
            "welcomeTitle": "Welcome to IBM Sametime",
            "popopRemoveUserTitle": "Remove Contact",
            "chatConfirmOfflineMessage": "${0} is offline. ",
            "contactSelectorTitle": "Select from Contact List",
            "meetingUseExistingRoom": "Use an existing meeting room",
            "chatInviteToMeetingRoom": "Invite to Meeting Room",
            "errorLogin": "Login error",
            "iAdderGroupLabel": "Group",
            "emoticonLabelWink": "wink",
            "userPhotoAlt": "Photo",
            "connectIsNotResponding": "IBM Sametime Connect is not responding",
            "chatstItalicButtonLabel": "Italic",
            "errorPublicGroupAlreadyExists": "This public group already exists in your contact list.",
            "errorChatInvite": "Unable to send chat invite, Please try again.",
            "iContactAdderNoGroupSelectedLabel": "[No group selected]",
            "linkEditorName": "Name",
            "privacyListOptions": "Privacy list options",
            "contactAdderWarning1": "You are approaching the following maximum number of contacts allowed: ${0}.",
            "contactAdderWarning2": "Please reduce the size of your contact list.",
            "privacyListCancelButton": "Cancel",
            "mainMenuMeetingInvite": "Invite to Meeting Room",
            "errorSessionTitle": "Attention",
            "iContactAdderExternalContactCheckbox": "Add external user by e-mail address",
            "mainMenuLogout": "Log Out",
            "availabilityTitle": "Availability",
            "chatDeclineGroupChat": "Decline",
            "chatstUnderlineButtonLabel": "Underline",
            "errorRemovingGroup": "Unable to remove group, Please try again.",
            "errorParentAlreadyContainsGroup": "Parent already contains a group with that name !",
            "loginPassWord": "Password:",
            "meetingPopupTitle": "Information",
            "chatEmoticonButtonLabel": "Insert Emoticon",
            "iContactAdderAddFollowingContactPrompt": "Add the following person:",
            "mainMenuFile": "File",
            "groupAdderAddPublic": "Search for a public group",
            "announcementAllow": "Allow recipients to send responses",
            "quickFindSearchText": "Search directory for ${0}",
            "offlineMessageServiceDisplayName": "Sametime Offline Message Service",
            "dialogCancel": "Cancel",
            "statusAvailable": "Available",
            "mainMenuAnnouncement": "Send Announcement",
            "statusAway": "Away",
            "meetingRoom": "Specify meeting room",
            "mainMenuNewGroup": "New Group",
            "iPopupRemoveUserContent": "Remove the following contact from your contact list?",
            "chatConfirmNo": "No",
            "chatSend": "Send",
            "iGroupAdderAddAsSubgroupCheckbox": "Add as a subgroup to an existing group",
            "iContactAdderAddAsSubgroupCheckbox": "Add as a subgroup to the selected group below",
            "meetingRoomServer": "Meeting room server",
            "groupAdderTitle": "Add Group",
            "contextMenuRemove": "Remove from List",
            "privacyListRadioOnly": "ONLY those on the list can see me online",
            "chatParticipantCount": "(${0}) ",
            "chatInviteOthers": "Invite Others",
            "quickFindSearchingText": "Searching directory for ${0}",
            "chatParticipants": "Participants",
            "quickFindTypeName": "Type to find name",
            "meetingJoin": "Join Meeting",
            "errorLoginNoUserIdPassword": "Please enter a user name and password",
            "groupAdderAddGroupName": "Enter group name",
            "errorClusterLogin": "Sametime is temporarily unavailable.",
            "contactAdderTitle": "Add Contact",
            "mainMenuSametimeChat": "Chat",
            "chatMeetingReceive": "${0} has sent you a meeting invitation",
            "chatSeparatorLabel": "Use the arrow keys to resize this area.",
            "mainMenuNewContact": "New Contact",
            "meetingOptions": "Meeting room options",
            "groupSelectorCancel": "Cancel",
            "groupAdderGroupNameToSearch": "Group name to search",
            "iContactAdderNameLabel": "Name",
            "businessCardAnnouncement": "Send Announcement",
            "announcementRecipients": "Recipients",
            "statusOffline": "I am offline",
            "chatNewMessage": "New Message",
            "emoticonLabelTongue": "tongue",
            "groupChatTopicTitle": "Topic",
            "chatTranscriptLabel": "Chat Transcript",
            "iContactAdderGroupChooserPrompt": "Select a group below or create a new group.",
            "statusMeeting": "In a Meeting",
            "emoticonLabelShy": "shy",
            "chatMenuTools": "Tools",
            "businessCardChatNow": "Chat",
            "addPublicGroupConfirmation": "Public group added: ${0}",
            "iGroupAdderErrorPublicGroupExists": "Public group has already been added to your contact list.",
            "groupChatCancel": "Cancel",
            "groupSelectorTitle": "Select Group",
            "iBizCardErrorEmailUnavailable": "The email address for the selected user is unknown or could not be retrieved.",
            "linkEditorOk": "OK",
            "chatMenuHelp": "Help",
            "iContactAdderNicknameLabel": "Nickname",
            "navagatingAwayFromPage": "Navigating away from this page will log you out of Sametime. Are you sure you want to proceed?",
            "emoticonLabelEyebrow": "eyebrow",
            "statusAwayMobile": "Away",
            "contextMenuChat": "Chat",
            "addPrivateGroupConfirmation": "Personal group added: ${0}",
            "addContactConfirmationGroupLabel": "Group:",
            "meetingTitle": "Invite to Meeting Room",
            "chatServerMessage": "Close Chat",
            "renamerCancel": "Cancel",
            "errorOpenChat": "An error occured while opening the chat window, Please try again.",
            "iGroupInfoContactsOnline": " contacts online",
            "iChatErrorUnavailableText": "User is unavailable at this time.",
            "quickFindSearchTextIME": "Search directory",
            "dialogGroup": "Group",
            "loginTitleiPhone": "Log In to IBM Sametime",
            "iGroupInfoActionChat": "Invite to Chat",
            "chatstStrikethroughButtonLabel": "Strikethrough",
            "imainMenuAnnouncement": "Send Announcement",
            "connectAPIisNotAvailable": "API is not available",
            "chatCreateLinkButtonLabel": "Create Link",
            "iContactAdderPrompt": "Search for a person by name or enter the person's e-mail address to add an external contact.",
            "chatMenuAddToContactList": "Add to Contact List",
            "chatAcceptGroupChat": "Accept",
            "callNoNumber": "Unable to place call, ${0} has not specified a number.",
            "loginSaveOptionsTitle": "save options",
            "errorClose": "Close",
            "emoticonLabelHalf": "half",
            "announcementMessage": "Message",
            "errorSessionExpired": "The Sametime session has expired.",
            "iContactAdderNewGroupPrompt": "Create a new group.",
            "iGroupInfoActionEmail": "Send E-mail",
            "contextMenuRenameUser": "Edit Nickname",
            "loginLogIn": "Log In",
            "businessCardCantChatNow": "User is unavailable for chat",
            "renamerContactContent": "New Nickname",
            "chatMenuAbout": "About",
            "iAdderNewGroupLabel": "New group",
            "errorGroupAdder": "An error occured while adding the group, Please try again.",
            "aboutBoxBuildTitle": "Build: ${0}",
            "chats": "Chats",
            "AdministratorMessageTitle": "Message from the Sametime Administrator",
            "addContactErrorPublicGroup": "Adding contacts to a public group is not allowed.",
            "businessCardRemoveContact": "Remove from Contact List",
            "iGroupAdderErrorBlankName": "Enter a name for the new group.",
            "forceLogoutTitle1": "User \"${0}\" is no longer logged in",
            "forceLogoutTitle2": "Reason:${0}You have been disconnected from Sametime because you logged on from another computer",
            "chatTextAreaTitle": "Type your text",
            "iGroupInfoActionAnnouncement": "Send Announcement",
            "renamerGroupContent": "New group name",
            "iContactAdderWarnEmptyNickname": "The nickname field was left empty. Click OK to use the default nickname or Cancel to return to the dialog.",
            "loginUserName": "User name:",
            "connectClient": "IBM Sametime Connect",
            "emoticonLabelLaughroll": "laughroll",
            "meetingInvitee": "Invitees",
            "contactAdderExternalCommunity": "External Community",
            "contactAdderListSize": "Your contact list has the following number of contacts: ${0}.",
            "errorRenameUser": "Unable to rename contact, Please try again.",
            "awarenessCustomMessage": "Status message",
            "emoticonLabelAngel": "angel",
            "collectorNoResults": "No results",
            "chatGroupChatReceive": "${0} has invited you to a group chat",
            "aboutBoxProductTitle": "IBM Sametime 8.5.2 IFR 1",
            "contextMenuSendAnnouncement": "Send Announcement",
            "webclientExitingSametimePrompt": "Exiting Sametime will log you out. Do you want to continue?",
            "dialogOk": "OK",
            "chatTextColorButtonLabel": "Text Color",
            "connectNotAuthenticated": "User is not authenticated",
            "linkEditorLink": "Link",
            "chatUserLeft": "${0} has left the chat",
            "popupOk": "OK",
            "statusUserOffline": "User is Offline",
            "iGroupInfoTitlePublic": "Public Group",
            "quickFindNext": "Next page",
            "errorGroupAlreadyContainsGroup": "This subgroup already exists.",
            "chatConfirmYes": "Yes",
            "groupAdderAddPersonal": "Add a new personal group",
            "chatPartnerTyping": "${0} is typing a message...",
            "contactAdderUserEmail": "User email address",
            "errorPrivacyList": "An error occured while retreiving the privacy list.",
            "emoticonLabelCrying": "crying",
            "navagatingCloseMessage": "You have logged out of Sametime.",
            "mainMenuShowOfflineUsers": "Show Offline Users",
            "renamerOk": "OK",
            "iPopupRemoveUserTitle": "Remove contact",
            "adderAdd": "Add",
            "loginCustomMessage": "Status message:",
            "chatUserJoined": "${0} has joined the chat",
            "allContactsGroupDesc": "Use this group to view all of your Sametime contacts in a single list.",
            "statusDisturb": "Do not Disturb",
            "errorLoginGuestNoUserName": "Please enter a user name",
            "meetingCreateInstantMeeting": "Use an instant meeting room",
            "iGroupErrorEmail": "The e-mail addresses of the contacts in the selected group could not be retrieved.",
            "awarenessPersonalStatus": "Availability status",
            "errorCustomEmoticon": "Image cannot be displayed",
            "iContactAdderErrorExtEmail": "External users must be added with an e-mail address. Check the format of the address entered.",
            "privacyListTitle": "Privacy List",
            "loginTitle": "IBM Sametime 8.5",
            "chatMenuCloseChat": "Close",
            "mainMenuTools": "Tools",
            "loginRememberMe": "Remember me",
            "dialogDone": "Done",
            "iPhoneScrollTip": "Tip: Use two fingers to scroll this window.",
            "popopRemoveUserContent": "Remove ${0} ?",
            "chatMenuFile": "File",
            "iContactAdderSearchOnlyPrompt": "Search for a person by name.",
            "errorHostNameMessage": "Please make sure you are using the correct address and try again.",
            "contextMenuAddToContacts": "Add to Contacts",
            "chatLinkButtonLabel": "Insert Link",
            "errorServerTitle": "Attention",
            "emoticonLabelSmile": "smile",
            "imainMenuGroupChatInvite": "Invite to Chat",
            "iGroupAdderPublicGroupRadio": "Search for a public group",
            "iBizCardErrorRemoveTitle": "Remove contact error",
            "statusDisturbMobile": "Do not Disturb",
            "emoticonLabelYes": "yes",
            "iContactAdderErrorBlankNameAddSubgroup": "Type a new group name or deselect the checkbox.",
            "announcementConfirmation": "Your announcement has been sent.",
            "businessCardLabelEmail": "E-mail",
            "emoticonLabelIdea": "idea",
            "chatConfirmAwayMessage": "${0} is Away and may not be available for chat. Would you like to send this message anyway?",
            "awarenessOk": "OK",
            "iContactAdderErrorNoGroup": "Create a new group for the contact.",
            "emoticonLabelLaughing": "laughing",
            "businessCardTitle": "Business Card",
            "popupCancel": "Cancel",
            "mainMenuAbout": "About",
            "errorApplicationTitle": "Attention",
            "groupChatDescription": "Use the search bar above to find and add people to your group chat",
            "meetingStartButton": "Invite",
            "privacyListQuickfindTitle": "Use the search bar above to find the person you wish to add to your privacy list",
            "adderCancel": "Cancel",
            "contactAdderAddExternal": "Add external user by E-mail address",
            "emoticonLabelGrin": "grin",
            "contactAdderAddInternal": "Add a new contact",
            "loginLicenseText": "Licensed Materials - Property of IBM &copy; Copyright. IBM Corporation 1998, 2013. IBM, the IBM Logo and Lotus are trademarks of IBM Corporation in the United States, other countries or both.",
            "callConfirmDNDMessage": "${0} is set to Do Not Disturb and may not be available for a call. Would you like to call anyway?",
            "openChat": "Open Chat",
            "chatParticipantListTitle": "Participants (${0})",
            "popopRemoveGroupTitle": "Remove Group",
            "iGroupErrorRemovePrompt": "Removing a group removes all group contacts and subgroups. Continue removing the following group?",
            "iContactAdderEmailLabel": "E-mail"
         },
         "isQuirksMode": false,
         "quickfindMenuPageSize": 10,
         "iconPaths": {
            "ibmLogo": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/ibmLogo.png",
            "sametimeLogo": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/lotusBanner.png",
            "loginAnimGif": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/ajax-loader-3.gif",
            "sametimeTitle": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/sametimeTitle.png",
            "iconAvailable": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/available.gif",
            "iconAway": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/away.gif",
            "iconDnd": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Awns_DND_9x9.gif",
            "iconInMeeting": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/inAMeeting.gif",
            "iconAvailableMobile": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iBdStatMobActiveMed.png",
            "iconAwayMobile": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iBdStatMobAwayMed.png",
            "iconDndMobile": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iBdStatMobDNDMed.png",
            "iconInMeetingMobile": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iBdStatMobMtgMed.png",
            "iconOffline": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iconOffline.gif",
            "iconYahooAvailable": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Online.gif",
            "iconYahooAway": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Online.gif",
            "iconYahooDnd": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Online.gif",
            "iconYahooInMeeting": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Online.gif",
            "iconYahooOffline": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Offline.gif",
            "iconAOLAvailable": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Online.gif",
            "iconAOLAway": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Online.gif",
            "iconAOLDnd": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Online.gif",
            "iconAOLInMeeting": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Online.gif",
            "iconAOLOffline": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Offline.gif",
            "iconGTalkAvailable": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Online.gif",
            "iconGTalkAway": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Online.gif",
            "iconGTalkDnd": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Online.gif",
            "iconGTalkInMeeting": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Online.gif",
            "iconGTalkOffline": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Offline.gif",
            "iconDefaultAvailable": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Comm_Server_Available.gif",
            "iconDefaultAway": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Comm_Server_Away.gif",
            "iconDefaultDnd": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Comm_Server_DND.gif",
            "iconDefaultInMeeting": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Comm_Server_Meeting.gif",
            "iconDefaultOffline": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/CommServer_Offline.gif",
            "iconTelephonyBlank": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Blank.gif",
            "iconTelephonyBusy": "https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/PhoneBusy.png"
         },
         "chatMenuPlugins": [],
         "mainMenuPlugins": [],
         "liveNameMenuPlugins": [{
            "id": "lnmpSetStatus",
            "label": "Availability status",
            "hasAvailableSubMenu": true
         }, {
            "id": "lnmpChat",
            "label": "Chat"
         }, {
            "id": "lnmpCall",
            "label": "Call"
         }, {
            "id": "lnmpMeetingInvite",
            "label": "Invite to Meeting Room"
         }, {
            "id": "lnmpSendAnnouncement",
            "label": "Send Announcement"
         }, {
            "id": "lnmpBizCard",
            "label": "View Business Card"
         }, {
            "id": "lnmpAddContact",
            "label": "Add Contact"
         }, {
            "id": "lnmpAddSubgroup",
            "label": "Add Subgroup"
         }, {
            "id": "lnmpAddToContacts",
            "label": "Add to Contacts"
         }, {
            "id": "lnmpRenameGroup",
            "label": "Rename"
         }, {
            "id": "lnmpRemove",
            "label": "Remove from List"
         }],
         "liveNameIconPlugins": [{
            "id": "lnipTelephony",
            "type": 2,
            "_iconMapper": {
               "0": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Blank.gif", ""],
               "1": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Blank.gif", ""],
               "2": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/PhoneBusy.png", "Unable to place call at this time."]
            }
         }, {
            "id": "lnipAwarenessInternal",
            "type": 0,
            "_iconMapper": {
               "0": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iconOffline.gif", "I am offline"],
               "1": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/available.gif", "Available"],
               "2": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/away.gif", "Away"],
               "3": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Awns_DND_9x9.gif", "Do not Disturb"],
               "4": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/away.gif", "Away"],
               "5": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/inAMeeting.gif", "In a Meeting"],
               "6": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iBdStatMobActiveMed.png", "Available"],
               "7": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iBdStatMobAwayMed.png", "Away"],
               "8": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iBdStatMobDNDMed.png", "Do not Disturb"],
               "10": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iBdStatMobMtgMed.png", "In a Meeting"]
            }
         }, {
            "id": "lnipAwarenessExternal",
            "type": 1,
            "_iconMapper": {
               "0": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/iconOffline.gif", "I am offline"],
               "yahoo!": {
                  "0": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Offline.gif", "I am offline"],
                  "1": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Online.gif", "Available"],
                  "2": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Online.gif", "Away"],
                  "3": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Online.gif", "Do not Disturb"],
                  "4": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Online.gif", "Away"],
                  "5": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Yahoo_Online.gif", "In a Meeting"]
               },
               "aol": {
                  "0": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Offline.gif", "I am offline"],
                  "1": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Online.gif", "Available"],
                  "2": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Online.gif", "Away"],
                  "3": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Online.gif", "Do not Disturb"],
                  "4": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Online.gif", "Away"],
                  "5": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/AOL_Online.gif", "In a Meeting"]
               },
               "google": {
                  "0": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Offline.gif", "I am offline"],
                  "1": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Online.gif", "Available"],
                  "2": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Online.gif", "Away"],
                  "3": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Online.gif", "Do not Disturb"],
                  "4": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Online.gif", "Away"],
                  "5": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Google_Online.gif", "In a Meeting"]
               },
               "sametime/other": {
                  "0": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/CommServer_Offline.gif", "I am offline"],
                  "1": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Comm_Server_Available.gif", "Available"],
                  "2": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Comm_Server_Away.gif", "Away"],
                  "3": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Comm_Server_DND.gif", "Do not Disturb"],
                  "4": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Comm_Server_Away.gif", "Away"],
                  "5": ["https://st85meetingsp.lotus.com:9444/stwebclient/dojo.blue/sametime/themes/images/Comm_Server_Meeting.gif", "In a Meeting"]
               }
            }
         }],
         "slideDownPlugins": [],
         "businessCardMenuPlugins": [],
         "status": [{
            "message": "I am offline",
            "iconClass": "stproxy_statusIconOffline"
         }, {
            "message": "Available",
            "iconClass": "stproxy_statusIconAvailable"
         }, {
            "message": "Away",
            "iconClass": "stproxy_statusIconAway"
         }, {
            "message": "Do not Disturb",
            "iconClass": "stproxy_statusIconDisturb"
         }, {
            "message": "Away",
            "iconClass": "stproxy_statusIconAway"
         }, {
            "message": "In a Meeting",
            "iconClass": "stproxy_statusIconMeeting"
         }, {
            "message": "Available",
            "iconClass": "stproxy_statusIconAvailableMobile"
         }, {
            "message": "Away",
            "iconClass": "stproxy_statusIconAwayMobile"
         }, {
            "message": "Do not Disturb",
            "iconClass": "stproxy_statusIconDisturbMobile"
         },
         undefined,
         {
            "message": "In a Meeting",
            "iconClass": "stproxy_statusIconMeetingMobile"
         }],
         "loadInitFuncs": [],
         "buddyListInitFuncs": [],
         "liveNameTextPlugin": {
            "_classMapper": {
               "0": "stproxy_liveNameOfflineText",
               "1": "stproxy_liveNameAvailableText",
               "2": "stproxy_liveNameAwayText",
               "3": "stproxy_liveNameDndText",
               "4": "stproxy_liveNameAwayText",
               "5": "stproxy_liveNameInMeetingText",
               "6": "stproxy_liveNameAvailableText",
               "7": "stproxy_liveNameAwayText",
               "8": "stproxy_liveNameDndText",
               "10": "stproxy_liveNameInMeetingText"
            }
         },
         "isUIControlLoaded": true,
         "isPageRTL": false,
         "loginPerson": {
            "status": 1,
            "statusMessage": "I am Available",
            "id": "uid=ClaudioProcida,cn=testusers,o=testorg,dc=greenhouse,dc=ibm,dc=com",
            "isAnnon": false,
            "username": "uid=ClaudioProcida,cn=testusers,o=testorg,dc=greenhouse,dc=ibm,dc=com"
         },
         "_communitiesObject": {
            "communities": {
               "community": [{
                  "communityPredefineName": "Yahoo!",
                  "isClearingHouse": "0",
                  "name": "Yahoo Messenger",
                  "internalCommunity": "0",
                  "domains": {
                     "domain": [{
                        "name": "flash.net"
                     }, {
                        "name": "demobroadband.com"
                     }, {
                        "name": "snet.net"
                     }, {
                        "name": "pacbell.net"
                     }, {
                        "name": "ymail.com"
                     }, {
                        "name": "rogers.com"
                     }, {
                        "name": "sbcglobal.net"
                     }, {
                        "name": "nvbell.net"
                     }, {
                        "name": "verizon.net"
                     }, {
                        "name": "uat.rogers.com"
                     }, {
                        "name": "swbell.net"
                     }, {
                        "name": "ort.rogers.com"
                     }, {
                        "name": "ameritech.net"
                     }, {
                        "name": "uat.nl.rogers.com"
                     }, {
                        "name": "nl.rogers.com"
                     }, {
                        "name": "prodigy.net"
                     }, {
                        "name": "ort.nl.rogers.com"
                     }, {
                        "name": "rocketmail.com"
                     }, {
                        "name": "yahoo.com"
                     }, {
                        "name": "btopenworld.com"
                     }, {
                        "name": "wans.net"
                     }, {
                        "name": "btinternet.com"
                     }]
                  }
               }, {
                  "communityPredefineName": "Google",
                  "isClearingHouse": "0",
                  "name": "GoogleTalk",
                  "internalCommunity": "0",
                  "domains": {
                     "domain": {
                        "name": "gmail.com"
                     }
                  }
               }, {
                  "communityPredefineName": "AOL",
                  "isClearingHouse": "0",
                  "name": "AOL IM",
                  "internalCommunity": "0",
                  "domains": {
                     "domain": [{
                        "name": "aol.net"
                     }, {
                        "name": "aol.com"
                     }, {
                        "name": "corp.aol.com"
                     }]
                  }
               }, {
                  "communityPredefineName": "",
                  "isClearingHouse": "0",
                  "name": "Greenhouse",
                  "internalCommunity": "1",
                  "domains": {
                     "domain": [{
                        "name": "stgw1.lotus.com"
                     }, {
                        "name": "greenhouse.lotus.com"
                     }, {
                        "name": "lotus.com"
                     }]
                  }
               }]
            }
         },
         "buddyListJson": null,
         "totalUsers": 1,
         "buddyListItems": [{
            "displayName": "Work",
            "id": "Work",
            "type": "private",
            "children": [{
               "id": "uid=ClaudioProcida,cn=testusers,o=testorg,dc=greenhouse,dc=ibm,dc=com",
               "parentType": "private"
            }],
            "realType": "group",
            "parentType": "root"
         }],
         "isBuddyListLoaded": true,
         "licensePlaceHolder": "L-GHUS-8G9G5J",
         "layer": null,
         "iliveNameChatTextPlugin": null,
         "businessCardManager": null,
         "liveNameMenuManager": null,
         "quickFindController": null,
         "buddyList": null,
         "buddyListStore": null,
         "buddyListModel": null,
         "buddyListModelGroups": null,
         "buddyListModelPublicGroups": null,
         "buddyListModelPrivateGroups": null,
         "isBuddyListLazyLoaded": false,
         "isBuddyListDirty": false,
         "topicGroupRemove": "stproxy_topicGroupRemove",
         "topicGroupRename": "stproxy_topicGroupRename",
         "topicGroupAdd": "stproxy_topicGroupAdd",
         "topicGroupRetrieve": "topicGroupRetrieve",
         "contextMenuClosed": "contextMenuClosed",
         "topicToggleOfflineUsers": "stproxy_ToggleOfflineUsers",
         "topicOnSlideDown": "stproxy_OnSlideDown",
         "topicOnSlideUp": "stproxy_OnSlideUp",
         "communities": [{
            "communityPredefineName": "Yahoo!",
            "isClearingHouse": "0",
            "name": "Yahoo Messenger",
            "internalCommunity": "0",
            "domains": {
               "domain": [{
                  "name": "flash.net"
               }, {
                  "name": "demobroadband.com"
               }, {
                  "name": "snet.net"
               }, {
                  "name": "pacbell.net"
               }, {
                  "name": "ymail.com"
               }, {
                  "name": "rogers.com"
               }, {
                  "name": "sbcglobal.net"
               }, {
                  "name": "nvbell.net"
               }, {
                  "name": "verizon.net"
               }, {
                  "name": "uat.rogers.com"
               }, {
                  "name": "swbell.net"
               }, {
                  "name": "ort.rogers.com"
               }, {
                  "name": "ameritech.net"
               }, {
                  "name": "uat.nl.rogers.com"
               }, {
                  "name": "nl.rogers.com"
               }, {
                  "name": "prodigy.net"
               }, {
                  "name": "ort.nl.rogers.com"
               }, {
                  "name": "rocketmail.com"
               }, {
                  "name": "yahoo.com"
               }, {
                  "name": "btopenworld.com"
               }, {
                  "name": "wans.net"
               }, {
                  "name": "btinternet.com"
               }]
            }
         }, {
            "communityPredefineName": "Google",
            "isClearingHouse": "0",
            "name": "GoogleTalk",
            "internalCommunity": "0",
            "domains": {
               "domain": {
                  "name": "gmail.com"
               }
            }
         }, {
            "communityPredefineName": "AOL",
            "isClearingHouse": "0",
            "name": "AOL IM",
            "internalCommunity": "0",
            "domains": {
               "domain": [{
                  "name": "aol.net"
               }, {
                  "name": "aol.com"
               }, {
                  "name": "corp.aol.com"
               }]
            }
         }, {
            "communityPredefineName": "",
            "isClearingHouse": "0",
            "name": "Greenhouse",
            "internalCommunity": "1",
            "domains": {
               "domain": [{
                  "name": "stgw1.lotus.com"
               }, {
                  "name": "greenhouse.lotus.com"
               }, {
                  "name": "lotus.com"
               }]
            }
         }],
         "iqueuedMessages": [],
         "hideOfflineLiveNames": false,
         "_buddylistState": {
            "isInit": true,
            "items": {},
            "cookieName": "XTCk0+LhxPPs6h",
            "_isActive": false
         },
         "_displayNameLock": null,
         "_displayNames": {},
         "_addPrivateGroup": {},
         "_addPublicGroup": {},
         "declaredClass": "sametime.STProxy"
      }
   };
   
   // Second round of helper objects...
   stproxy._utilities = {
      "isHighContrast": function() {
         try {
            var body = window.document.getElementsByTagName("body")[0];
            var _1d2 = (body) ? body.getAttribute("class") : null;
            if (_1d2) {
               if (_1d2.indexOf("dijit_a11y") != -1) {
                  return true;
               }
            }
         } catch (e) {}
         return false;
      },
      "debug": {
         "top": function(_1d3, _1d4, _1d5) {
            if (!stproxy || !window.console) {
               return;
            }
            if (djConfig.isDebug || _1d5) {
               var temp = _1d3 + "(";
               for (var i = 0; !! _1d4 && i < _1d4.length; i++) {
                  if (i > 0 && i < _1d4.length) {
                     temp += ", ";
                  }
                  if (!(typeof _1d4[i] == "function")) {
                     if (null != _1d4[i]) {
                        temp += _1d4[i];
                     }
                  } else {
                     temp += "<object>";
                  }
               }
               temp += ")  TOP";
               if (djConfig.isDebug) {
                  // FIXME: ST proxy bug in WebKit
                  //(console.debug || console.log)(temp);
                  console.log(temp);
               }
               for (var x = 0; !! _1d4 && x < _1d4.length; x++) {
                  if (typeof _1d4[x] == "object") {
                     if (console.dir) {
                        console.dir(_1d4[x]);
                     } else {
                        console.log(stproxy.json.toString(_1d4[x]));
                     }
                  }
               }
            }
         },
         "bottom": function(_1d6) {
            if (!stproxy || !window.console) {
               return;
            }
            if (djConfig.isDebug) {
               console.debug(_1d6 + "  BOTTOM");
            }
         }
      },
      "arrayToString": function(array) {
         array = stproxy._utilities.buddylist.getUserId.modifyExternalUser(array);
         if (typeof(array) == "object") {
            if (array.length == 0) {
               return "";
            }
            array = array.join(stproxy.DELIMITER);
         }
         return array;
      },
      "buddylist": {
         "userIds": [],
         "externalUserIds": {},
         "getUserId": {}
      }
   };
   
   // More helper objects...
   stproxy.login = {
      "hasToken": function(_8d) {
         stproxy._utilities.debug.top("stproxy.login.hasToken", []);
         stproxy.addOnLoad(function() {
            stproxy.invoke("stproxy.login.hasToken", [], _8d);
         });
         stproxy._utilities.debug.bottom("stproxy.login.hasToken");
      },
      "_login": function(_8e, _8f, _90, _91) {
         stproxy._utilities.debug.top(_8e, _8f);
         stproxy.addOnLoad(function() {
            stproxy.invoke("stproxy.login._login", _8f, _90, _91);
         });
         stproxy._utilities.debug.bottom(_8e);
      },
      "loginByPassword": function(_92, _93, _94, _95, _96, _97, _98) {
         stproxy.login._login("stproxy.login.loginByPassword", [_92, _93, stproxy.loginType.BY_PASSWORD, _94, _95, _98], _96, _97);
      },
      "loginByToken": function(_99, _9a, _9b, _9c, _9d, _9e) {
         stproxy.login._login("stproxy.login.loginByToken", [_99, null, stproxy.loginType.BY_TOKEN, _9a, _9b, _9e], _9c, _9d);
      },
      "loginWithToken": function(_9f, _a0, _a1, _a2, _a3, _a4, _a5) {
         stproxy.login._login("stproxy.login.loginWithToken", [_9f, _a0, stproxy.loginType.BY_TOKEN, _a1, _a2, _a5], _a3, _a4);
      },
      "loginAsAnon": function(_a6, _a7, _a8, _a9, _aa, _ab) {
         stproxy.login._login("stproxy.login.loginAsAnon", [_a6, null, stproxy.loginType.AS_ANON, _a7, _a8, _ab], _a9, _aa);
      },
      "logout": function(_ac, _ad, _ae) {
         stproxy.invoke("stproxy.login.logout", [_ac], _ad, _ae);
      },
      "isRealLogout": function(_af) {
         stproxy.isRealLogout = _af;
      },
      "onLogin": function() {
         var ap = Array.prototype,
            c = arguments.callee,
            ls = c._listeners,
            t = c.target;
         var r = t && t.apply(this, arguments);
         var lls;
         lls = [].concat(ls);
         for (var i in lls) {
            if (!(i in ap)) {
               lls[i].apply(this, arguments);
            }
         }
         return r;
      },
      "onLogout": function() {
         var ap = Array.prototype,
            c = arguments.callee,
            ls = c._listeners,
            t = c.target;
         var r = t && t.apply(this, arguments);
         var lls;
         lls = [].concat(ls);
         for (var i in lls) {
            if (!(i in ap)) {
               lls[i].apply(this, arguments);
            }
         }
         return r;
      },
      "onError": function(_b0, _b1) {}
   };
   
   stproxy.addOnLoad = function(func) {
      try {
         func();
      }
      catch (e) {
         console.error(e);
      }
   };
   
   stproxy.invoke = function stproxy_invoke(_219, _21a, _21b, _21c) {
      _21a = com_ibm_sametime_mkArray(_21a);
      var _21d = stproxy.oMyHubParams;
      if (!_21d) {
         _21d = com_ibm_sametime_initCallbackMaps();
      }
      var sId = (_21b || _21c) ? ("" + _21d.nAutoGenCbId++) : null;
      if (_21b) {
         _21d.afnCallbacks[sId] = _21b;
      }
      if (_21c) {
         _21d.afnErrorCallbacks[sId] = _21c;
      }
      if (sId) {
         stproxy.myHub.publish("com.ibm.sametime.invokeWithCallback", [ _219,
               sId, _21a ]);
      }
      else {
         stproxy.myHub.publish("com.ibm.sametime.invoke", [ _219, _21a ]);
      }
   };
   
   stproxy.myHub = {
      publish : function(a, b) {
         console.log('stproxy.myHub.publish:', a, b);
      }
   };
   
   // Now some more configuration
   var stproxyConfig = window.stproxyConfig = {
      "domain": "lotus.com",
      "server": "https://st85meetingsp.lotus.com:9444",
      "tunnelURI": "https://greenhouse.lotus.com/connections/resources/web/lconn/core/sametime/tunnel.html",
      "isConnectClient": true,
      "isStandAloneWebClient": false,
      "chat": {},
      "plugins": {},
      "ext": {
         "Connections": true
      }
   };
   
   // Add some functions to the global namespace
   dojo.mixin(window, {
      "com_ibm_sametime_invoke": function com_ibm_sametime_invoke(_200, _201) {
         if (isAllowed(_201[0])) {
            com_ibm_sametime_call(_201[0], _201[1], null);
         }
      },
      "com_ibm_sametime_invokeWithCallback": function com_ibm_sametime_invokeWithCallback(_202, _203) {
         if (isAllowed(_203[0])) {
            com_ibm_sametime_call(_203[0], _203[2], _203[1]);
         }
      },
      "com_ibm_sametime_mkArray": function com_ibm_sametime_mkArray(obj) {
         if (obj && typeof obj === "object") {
            try {
               if (obj.constructor.toString() == "[object Window]") {
                  return {};
               }
            } catch (e) {
               return obj;
            }
            if (typeof obj.length === "number" && !(obj.propertyIsEnumerable("length"))) {
               for (var k = 0; k < obj.length; k++) {
                  obj[k] = com_ibm_sametime_mkArray(obj[k]);
               }
               return obj;
            } else {
               var _204 = false;
               for (var l in obj) {
                  if (isNaN(l)) {
                     _204 = true;
                     break;
                  }
               }
               if (_204) {
                  for (var m in obj) {
                     obj[m] = com_ibm_sametime_mkArray(obj[m]);
                  }
                  return obj;
               } else {
                  var _205 = [];
                  for (var n in obj) {
                     _205.push(com_ibm_sametime_mkArray(obj[n]));
                  }
                  return _205;
               }
            }
         } else {
            return obj;
         }
      },
      "com_ibm_sametime_call": function com_ibm_sametime_call(_206, _207, sId) {
         try {
            _207 = com_ibm_sametime_mkArray(_207);
            _207 = _207 || [];
            var _208 = _206.split(".");
            if (sId != null) {
               _207.push(function() {
                  var _209 = [];
                  for (var i = 0; i < arguments.length; i++) {
                     _209.push(arguments[i]);
                  }
                  stproxy.myHub.publish("com.ibm.sametime.invokeCallback", [sId, _209]);
               });
               _207.push(function() {
                  var _20a = [];
                  for (var i = 0; i < arguments.length; i++) {
                     _20a.push(arguments[i]);
                  }
                  stproxy.myHub.publish("com.ibm.sametime.invokeErrorCallback", [sId, _20a]);
               });
            }
            var _20b = com_ibm_sametime_getFunctionFromParts(window, _208);
            if (_20b) {
               _20b.stproxyApply(window, _207 || []);
            }
         } catch (e) {
            console.error(e);
            console.log(_206);
         }
      },
      "com_ibm_sametime_invokeCallback": function com_ibm_sametime_invokeCallback(_20c, _20d) {
         com_ibm_sametime_callCallback(_20d[0], stproxy.oMyHubParams.afnCallbacks, _20d[1]);
      },
      "com_ibm_sametime_invokeErrorCallback": function com_ibm_sametime_invokeErrorCallback(_20e, _20f) {
         com_ibm_sametime_callCallback(_20f[0], stproxy.oMyHubParams.afnErrorCallbacks, _20f[1]);
      },
      "com_ibm_sametime_callCallback": function com_ibm_sametime_callCallback(sId, _210, _211) {
         try {
            _211 = com_ibm_sametime_mkArray(_211);
            var _212 = _210[sId];
            if (_212 != null) {
               delete _210[sId];
               _212.stproxyApply(_210, _211 || []);
            }
         } catch (e) {
            console.error(e);
         }
      },
      "com_ibm_sametime_initCallbackMaps": function com_ibm_sametime_initCallbackMaps() {
         var _213 = stproxy.oMyHubParams = {};
         _213.nAutoGenCbId = 0;
         _213.afnCallbacks = {};
         _213.afnErrorCallbacks = {};
         return _213;
      },
      "com_ibm_sametime_getFunctionFromParts": function com_ibm_sametime_getFunctionFromParts(_214, _215) {
         var _216 = _214 || window;
         try {
            var _217 = _216;
            var _218;
            for (var i in _215) {
               if (_217[_215[i]]) {
                  _217 = _217[_215[i]];
               } else {
                  return null;
               }
            }
            if (_217 instanceof _216.Function) {
               return _217;
            } else {
               throw "fnInvoke is not a function!";
            }
         } catch (e) {
            console.error(e);
            console.log(_217);
         }
         return null;
      },
      "com_ibm_sametime_chatModel": function com_ibm_sametime_chatModel(_235, args) {
         args = (args || {});
         this.userId = _235;
         this.is1to1Chat = true;
         for (var arg in args) {
            this[arg] = args[arg];
         }
         this.isEmbedded = (args.isEmbedded || args.isEmbeded || false);
         this.isAnonymous = stproxy.guestStore.contains(_235);
      },
      "com_ibm_sametime_nwayChatModel": function com_ibm_sametime_nwayChatModel(_25b, _25c) {
         this.placeId = _25b;
      },
      "com_ibm_sametime_liveNameModel": function com_ibm_sametime_liveNameModel(_29a, _29b) {
         if (_29b) {
            for (var arg in _29b) {
               this[arg] = _29b[arg];
            }
         }
         if (emailCNMapper[_29a]) {
            _29a = emailCNMapper[_29a];
         }
         this.id = _29a;
         if (stproxy.isExternalUser(_29a)) {
            this.isExternal = true;
            this.displayName = _29a.substring(stproxy.EXTERNAL_USER_PREFIX.length);
         } else {
            this.isExternal = false;
         }
         if (this.id && this.displayName) {
            stproxy.broadcast.setDisplayName(this.id, this.displayName);
         }
         this.status = stproxy.awareness.OFFLINE;
         this.liveNameIndex = _29a;
         if (stproxy.session.ORGID == _29a) {
            this.liveNameIndex = stproxy.session.USERID;
         }
         var id = _29a;
         if (stproxy.isExternalUserId(_29a)) {
            id = stproxy.EXTERNAL_USER_PREFIX + _29a.split("::")[1];
         }
         this.oListeners = {};
         this.nAutoGenId = 0;
      }
   });
})();

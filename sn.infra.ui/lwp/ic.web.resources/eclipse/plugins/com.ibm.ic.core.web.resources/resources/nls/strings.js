/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
	root:
		// NLS_CHARSET=UTF-8
		({
		   'rs_close' : "Close",
		   'rs_loading' : "Loading...",
		   'rs_at' : "at",

		   'rs_searchDirectory' : "Person not listed? Use full search...",
		   'rs_searchGroupDirectory' : "Group not listed? Use full search...",
		   'rs_searchPersonAndGroupDirectory' : "Person or group not listed? Use full search...",
		   'rs_searchCommunityDirectory' : "Community not listed? Use full search...",

		   'rs_shadowText_searchDirectory' : "Type to find person",
		   'rs_shadowText_searchGroupDirectory' : "Type to find group",
		   'rs_shadowText_searchPersonAndGroupDirectory' : "Type to find person or group",
		   'rs_shadowText_searchCommunityDirectory' : "Type to find community",

		   'rs_listItem' : "List item",
		   'rs_noResults' : "No results for '${0}'",
		   'rs_today' : "Today",
		   'rs_tomorrow' : "Tomorrow",
		   'rs_yesterday' : "Yesterday",

		   /* Activity List Widget */
		   'rs_activityFeedLink' : "Feed for these activities",
		   'rs_externalText' : "This activity can have members from outside your organization.",
		   'rs_moveActivitySuccess' : '\"${activityTitle}\" was moved successfully to the \"${destCommName}\" subcommunity.',
		   // copy 'rs_moreInfo' and 'rs_hideInfo' from activity's strings.js
		   'rs_moreInfo' : 'Show more information about this Activity',
		   'rs_hideInfo' : 'Hide extra information',
		   'rs_more' : "More",
		   'rs_hide' : "Hide",
		   'rs_edit' : "Edit",
		   'rs_restore' : "Restore",
		   'rs_deleteEntry' : "Delete",
		   'rs_prioritize' : "Prioritize",
		   'rs_markComplete' : "Mark Complete",
		   'rs_markIncomplete' : "Restore",
		   'rs_linkMore' : "... [more]",
		   'rs_linkLess' : "... [less]",
		   'rs_actUpdatedByDate' : "Updated by ${0} ${1}",// Updated by (author name) (date)
		   'rs_actUpdatedBy' : "Updated by ${0}",// Updated by (author name)
		   'rs_actDue' : "Due ${0}",// Due (date)
		   'rs_actTags' : "Tags: ",
		   'rs_actTagsDelim' : ", ",
		   'rs_startFromTemplate' : "Start Activity from this Template",
		   'rs_favoriteTemplate' : "Mark as Favorite Template",
		   'rs_normalTemplate' : "Mark as normal template",
		   'rs_tunedOutPri' : "Tuned Out",
		   'rs_pagepos' : "${0} - ${1} of ${2}", // pagination - e.g. 1 - 10 of 100
		   'rs_navPrevLabel' : "Previous",
		   'rs_navNextLabel' : "Next",
		   'rs_noActivities' : "There are no activities started for this community.",
		   'rs_feedError' : "Failed to load feed.",
		   'rs_highPri' : "High Priority",
		   'rs_medPri' : "Medium Priority",
		   'rs_normalPri' : "Normal Priority (Default)",
		   'rs_tuneOut' : "Mark as Tuned Out",
		   'rs_startActivity' : "Start an Activity",
		   'rs_startFirstActivity' : "Create Your First Activity",
		   'rs_navNextLabel' : "Next",
		   'rs_viewAll' : "View All",
		   'rs_activityWidgetTitle' : "Activities",
		   'rs_activityWidgetBriefDescription' : "Track community goals.  Create to-dos and share resources.",
		   'rs_activityWidgetDescription' : "Community activities can be used to collaborate and track progress on community projects or initiatives.",
		   'rs_completedActivityLink' : "Show completed Activities",
		   'rs_activitiesUnavailable' : "The Activities service is unavailable.",
		   'rs_errorPersists' : "If the problem persists, contact your system administrator.",
		   'rs_shared' : "Shared",
		   'rs_removeActFromComm' : "Remove from community",
		   'rs_externalLabel' : "External",

		   // for ActivityForm
		   'rs_templateOptions' : "Template options",
		   'rs_template' : "Template",
		   'rs_tagsLabel' : "Tags",
		   'rs_peopleLabel' : "People",
		   'rs_aboutThisTemplate' : "About This Template",
		   'rs_activity' : "Activity",
		   'rs_copyOf' : "Copy of ${0}",// copy of (activity name)
		   'rs_activityFormGoal' : "Activity Goal",
		   'rs_noTemplate' : "None",
		   'rs_copyActivityMembers' : "Use members from activity",
		   'rs_copyTemplateMembers' : "Use members from template",

		   /* Forum Widget */
		   'rs_noTopics' : "There are no topics yet for this community.",
		   'rs_noTopicsLoggedIn' : "Ask a question, brainstorm, or simply share your ideas.",
		   'rs_postedBy' : "Latest post by",
		   'rs_topics' : "topics",
		   'rs_noTopicsShort' : "No topics",
		   'rs_topic' : "topic",
		   'rs_replies' : "replies",
		   'rs_noReplies' : "No replies",
		   'rs_reply' : "reply",
		   'rs_startTopic' : "Start a Topic",
		   'rs_startFirstTopic' : "Start the First Topic",
		   'rs_ok' : "OK",
		   'rs_locked' : "[Locked]",
		   'rs_manageForumSetting' : "Manage Forum Settings",
		   'rs_forumSettingCommunityOverviewPage' : "Community overview page:",
		   'rs_defaultForumList' : "Show forum list by default",
		   'rs_defaultTopicList' : "Show topic list by default",
		   'rs_forumSettingApplicationView' : "Forum application default view:",
		   'rs_forumSettingNote' : "Note: Topics display by default if there is only one forum.",
		   'rs_forumSettingSubmit' : "Submit",
		   'rs_forumSettingSave' : "Save",
		   'rs_forumSettingSaveAndClose' : "Save and Close",
		   'rs_forumSettingConfirm' : "Your changes for Forums have been saved.",
		   'rs_forumSettingError' : "An error occurred. Contact your administrator.",
		   'rs_formSettingHideMessage' : "Hide this message",
		   'rs_forumSettingCancel' : "Cancel",
		   'rs_forumAnsweredQuestion' : "Answered question",
		   'rs_forumUnAnsweredQuestion' : "Unanswered question",
		   'rs_forumSortBy' : "Sort by:",
		   'rs_forumSortByDate' : "Date",
		   'rs_forumSortByReplies' : "Replies",
		   'rs_forumSortByTopic' : "Topics",
		   'rs_forumSortByTopicsAndReplies' : "Topics and Replies",
		   'rs_sortByReplies' : "Sort by Replies",
		   'rs_sortbyTopicsAndReplies' : "Sort by Topics and Replies",
		   'rs_forumOpenQuestions' : "Open Questions",
		   'rs_feedOpenQuestions' : "Feed for these open questions",
		   'rs_feedAnsweredQuestions' : "Feed for these answered questions",
		   'rs_forumMessages' : "${0} messages",
		   'rs_forumLastAddedPost' : "Latest post by ${0}",
		   'rs_forumTopics' : "${0} topics",
		   /* End discussion forum */

		   /* Editor plugins -- some for a possible one we haven't implemented yet */
		   'rs_createPersonLink' : "Create Person Link",
		   'rs_quote' : "Quote",
		   'rs_labelColon' : "Label: ",
		   'rs_personColon' : "Person: ",
		   'rs_personLink' : "Person Link",
		   'rs_replace' : "Replace",
		   'rs_inactivePerson' : "${0} (inactive)", // person's name (inactive)
		   'rs_PersonPicture' : "${0}'s Picture", // person name's picture

		   /*Visitor mode -- external user name decoration use cases */
		   'rs_PersonExternalLabel' : "External User", // A label for the visitor model use cases.
		   'rs_PersonExternal' : "${0} (External User)", //'{0}' is the person's name. This will be used for the user profile name and profile photo tooltip
		   'rs_PersonPictureExternal' : "${0}'s Picture (External User)", // Alt text for the external user's profile photo
		   'rs_personExternalDesc' : "This user has access to Files and Communities that are externally shared.",
		   /* End editor plugins */

		   /* Notification Form */
		   'rs_notifyOthers' : "Notify other people",
		   'rs_messageColon' : "Message: ",
		   'rs_notifyColon' : "Notify: ",
		   'rs_notificationConfirm' : "The notification message was sent successfully. ",
		   'rs_notificationFail' : "The notification message was not sent. Try again later and contact your system administrator if the problem persists.",
		   'rs_pickCommunity' : "Pick from Community List",
		   'rs_typeName' : "Type in a Name",
		   'rs_typeToFilter' : "Type to filter this list",
		   /* End Notification Form */

		   /* FilteringCheckbox */
		   'rs_filterListPrompt' : "Type to filter this list",
		   'rs_filterGroupLabel' : "Select Group",
		   'rs_noResults' : "No results found",
		   // ${0} will be replaced with a number
		   'rs_numResults' : "Showing ${0} results of ${1}",

		   /* PeopleFilterList */
		   'rs_removeFilter' : "Remove",

		   /* Language Selector */
		   'rs_browser_setting' : "Browser Setting",
		   'rs_customLangaugeLinkLabel' : "Custom Language",

		   /* Paging controls */
		   // 0 and 1 are page numbers
		   'rs_jumpPage' : "Jump to page ${0} of ${1}",
		   "rs_jumpPageLabel" : "Jump to page",
		   'rs_pageNumLabel' : "Page Number",
		   'rs_pageLabel' : "Page:",

		   /* Common Tags Widget */
		   'rs_tagCloudNavigationLabel' : 'Tags',
		   'rs_tagCloudToggleHint' : "Click to hide or show",
		   'rs_tagCloudHelpAlt' : "Get help with tags",
		   'rs_tagCloudNoTags' : "No tags yet.",
		   'rs_tagCloudNoRecentTags' : "No recent tags",
		   'rs_tagCloudNoTagsProfiles' : "Search the directory. Tags associated with the profiles returned by the search will be displayed here.",
		   'rs_tagLoadingTags' : "Loading Content",
		   'rs_tagCloudSelectedTags' : "Selected Tags",
		   'rs_tagCloudSeachDesc' : "Find a Tag",
		   'rs_tagCloudSeach' : "Search",
		   'rs_tagCloudRelatedTags' : "Related Tags",
		   'rs_tagCloudRelatedTagsDescription' : "Add a related tag to further refine your search",
		   'rs_tagCloudError' : 'There was an error',

		   'rs_viewAsCloud' : "Cloud",
		   'rs_viewAsCloudTitle' : "List tags as a tag cloud",
		   'rs_viewAsCloudDescription' : "Viewing tags as a tag cloud",
		   'rs_viewAsList' : "List",
		   'rs_viewAsListTitle' : "List tags as a sequential list of tags",
		   'rs_viewAsListDescription' : "Viewing tags as a sequential list of tags",
		   'rs_tagCloudViewAll' : "Browse",
		   'rs_tagCloudViewAllTitle' : "Browse all tags",

		   'rs_normalTags' : "Active Tags",

		   'rs_removeTag' : "Remove the tag from the selected filter tags",
		   'rs_clearAll' : "Clear all",
		   'rs_searchInputDefault' : "Type to find a tag",
		   'rs_searchInputTagSelected' : "Type another tag",
		   'rs_relatedTagTitle' : "Show the search results of tag ${0}, count ${1}",
		   'rs_removeTagTitle' : "Remove the tag ${0} from the selected filter tags",
		   'rs_addTagTitle' : "Filter by the tag ${0} with count ${1}",

		   'rs_tagDialogCloseTile' : "Close",
		   'rs_tagDialogTitle' : "All Tags",
		   'rs_tagDialogPageInfo' : "${0} - ${1} of ${2} tags",

		   /* Group Selection (Picker) Widget */
		   'rs_group_browse_groups' : "Browse Groups",
		   'rs_group_browse_groups_dialog_title' : "Browse Groups",
		   'rs_group_browse_find_groups' : "Find Groups",
		   'rs_group_browse_add_button' : "Add",
		   'rs_group_browse_cancel_button' : "Cancel",
		   'rs_group_browse_enter_string' : "Type to find groups",
		   'rs_group_browse_group_typeahead_label' : "Type a group name:",
		   'rs_group_browse_group_name' : "Group name:",
		   'rs_group_browse_results_label' : "Select a matching group:",
		   'rs_group_browse_parent_group_label' : "You are in:",
		   'rs_group_browse_next_page' : "Next Page",
		   'rs_group_browse_previous' : "Previous",
		   'rs_group_browse_next' : "Next",
		   'rs_group_browse_paging' : "Paging",
		   'rs_group_browse_previous_page' : "Previous Page",
		   'rs_group_browse_group_selected' : "Selected Group:",
		   'rs_group_browse_group_no_groups' : "This group does not contain any groups",
		   'rs_group_browse_page_info' : "${0} - ${1} of ${2}",
		   'rs_group_browse_page_info_alt' : "Matching groups ${0} through ${1} of ${2}",
		   'rs_group_browse_remove_selection' : 'Remove nested group selection: ${0}',
		   'rs_group_browse_paging' : "Paging",
		   'rs_member_groups' : "Groups",
		   'rs_member_members' : "Members",
		   'rs_member_no_results' : "No results found",
		   'rs_member_remove_group' : "Remove ${0}",
		   'rs_member_add_to_community' : "Click to add member",
		   'rs_member_remove_name' : "Click to remove member",
		   'rs_group_add_to_community' : "Click to add group",
		   'rs_group_remove_name' : "Click to remove group",
		   'rs_group_name' : "Group Name",
		   'rs_group_role' : "Group Role",

		   'rs_warning' : "Warning",
		   'rs_a11y_warning' : "Warning:",

		   'rs_messagebox_close_btn_title' : "Close",
		   'rs_messagebox_close_btn_alt' : "Close",
		   'rs_messagebox_error_icon_alt' : "Error",
		   'rs_messagebox_error_a11y_label' : "Error:",
		   'rs_messagebox_warning_icon_alt' : "Warning",
		   'rs_messagebox_warning_a11y_label' : "Warning:",
		   'rs_messagebox_info_icon_alt' : "Information",
		   'rs_messagebox_info_a11y_label' : "Information:",
		   'rs_messagebox_success_icon_alt' : "Success",
		   'rs_messagebox_success_a11y_label' : "Success:",

		   /* Document Picker CK Plugin */
		   'rs_docpicker_title' : "Insert Link to Files",
		   'rs_docpicker_label' : "Link to Files",
		   // '{0}' is a filename
		   'rs_docpicker_download_title' : "Download ${0}",
		   'rs_docpicker_viewdetails_text' : "View Details",
		   // '{0}' is a filename
		   'rs_docpicker_viewdetails_title' : "View details of ${0}",

		   /* AttachedFileList widget */
		   'rs_attachedfile_remove_alt' : "Remove",
		   'rs_attachedfile_filename' : "Image ${0}",

		   'rs_feedreader_warning' : "Warning: This link is meant for feed readers and may display incorrectly in your browser. Click OK to continue, or Cancel to return to page.",

		   'rs_search' : "Search",
		   'rs_all_connections' : "All Connections",
		   'rs_advanced' : "Advanced",
		   'rs_select_scope' : "Select search scope",

		   'rs_icfixlayout' : {
		      button_label : "Reformat",
		      dialog_title : "Reformat Contents",
		      warning : "Warning",
		      reformat_save : "Reformat and Save",
		      save_as_is : "Save as Is",
		      cancel : "Cancel",
		      warn_layout : "Your content exceeds the maximum display width.  Do you want to reformat automatically to fit the available space?",
		      remember_decision : "Remember my decision"
		   },

		   //The following error messages are used by icdocpicker when private files are shared with a Community.
		   'rs_sharefile_constraint_violation' : "An error occurred while sharing the selected files.",
		   'rs_sharefile_access_denied' : "This file was deleted or is no longer shared with you.",
		   'rs_sharefile_invalid_request' : "An error occurred while sharing the selected files.",
		   'rs_sharefile_sharing_intent_restriction' : "The file can only be shared inside your organization.",
		   'rs_sharefile_error_title' : "Error",

		   /* Strings for the native mobile app banners */
		   'rs_mobileBanner_title' : 'HCL Connections',
		   'rs_mobileBanner_inAppStore' : 'On the App Store',
		   'rs_mobileBanner_inGooglePlay' : 'In Google Play',
		   'rs_mobileBanner_author' : 'HCL Software',
		   'rs_mobileBanner_open' : 'Open',
		   'rs_mobileBanner_view' : 'View',
		   'rs_mobileBanner_hide' : 'Hide',

		   'rs_empty_column_placeholder' : 'Drag apps here.',
		   'rs_widget_loading_error_title' : 'Unable to display the widget',
		   'rs_widget_loading_error_message' : 'Try again later and contact your system administrator if the problem persists.',
		   'rs_widgets_loading_error_title' : 'Unable to display the widget(s) in this community',
		   'rs_widget_misplacement_warning' : 'This app does not fit in this column. A community owner can move it to another column or remove it from the page.',

		   'rs_widget_title_change_fail_message' : {
		      title_too_long : 'The title you entered is too long.',
		      empty_new_title : 'The title you entered cannot be empty.',
		      default_message : 'Unable to change title for this ${0} app.'
		   },

		   /* Strings for change title dialog */
		   'rs_widget_title_change_label' : 'Title:  ',
		   'rs_widget_title_change_direction' : 'Change the title for this ${0} app.',
		   'rs_widget_title_change_title' : 'Change Title',

		   /* Strings for Visitor Model Invite dialog */
		   'rs_vmmainContentTitle' : "Invite or Add Members",
		   'rs_vmmainContentDesc' : "Invite members to give them the opportunity to join in the community. Add members to automatically include them.",
		   'rs_vmtypeAheadLabel' : "Name or Email: ",
		   'rs_vmgroupTypeAheadLabel' : "Name: ",
		   'rs_vmtypeAheadRoleLabel' : " as ",
		   'rs_vmgroupTypeAheadRoleLabel' : " as Members ",
		   'rs_vmtaNoResults' : "No Results found.",
		   'rs_vmtaHeader' : "header",
		   'rs_vmaddUser' : "Add",
		   'rs_vmradioSectionTitle' : "Member Options:",
		   'rs_vmradioOne' : "Send invitations to join the community",
		   'rs_vmradioTwo' : "Automatically add users to community",
		   'rs_vmtwistyA' : "Add an Optional Message",
		   'rs_vmtwistyB' : "Remove additional text",
		   'rs_vmmessage' : "Message:",
		   'rs_vmtextAreaStartText' : "Say something...",
		   'rs_vmcheckboxLabel' : "Send me a copy",
		   'rs_vmsave' : "Save",
		   'rs_vminvite' : "Invite",
		   'rs_vmcancel' : "Cancel",
		   'rs_userContentTitle' : "Enter Information",
		   'rs_vmaddUser' : "Create User",
		   'rs_vmback'	 : "Back",
		   'rs_vmvisitor'	 : "Visitor",

			/* Strings for Communities picker */
			'rs_commpicker_logo_alt' : 'Click here to copy this community',
			'rs_commpicker' : ''

	}),

	"ar": true,
	"bg": true,
	"ca": true,
	"cs": true,
	"da": true,
	"de": true,
	"el": true,
	"es": true,
	"eu": true,
	"fi": true,
	"fr": true,
	"he": true,
	"hr": true,
	"hu": true,
	"id": true,
	"it": true,
	"ja": true,
	"kk": true,
	"ko": true,
	"nb": true,
	"nl": true,
	"no": true,
	"pl": true,
	"pt": true,
	"pt-br": true,
	"ro": true,
	"ru": true,
	"sk": true,
	"sl": true,
	"sv": true,
	"th": true,
	"tr": true,
	"zh": true,
	"zh-tw": true
});

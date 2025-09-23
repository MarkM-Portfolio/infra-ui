define({
	root:
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

		// NLS_CHARSET=UTF-8
		/* The placeholders for date formatting strings are as follows:
		   ${EEEE} is day of the week (e.g. Monday)
		   ${MMM} is the month in short notation (e.g. Jan, Feb)
		   ${time} is time (e.g. 6:00 PM)
		   ${d} is numerical day of the month (e.g 15)
		   ${YYYY} is year (e.g. 2012)
		*/
		({
		   common: {
		      more: {
		         label: "More",
		         tooltip: "More Actions"
		       },
		       tags_more: "and ${0} more",
		       ERROR_ALT: "Error",
		       PERSON_TITLE: "Open the profile of ${user}.",
		       inactiveUser: "${user} (inactive)",
		       inactiveIndicator: "(inactive)",
		       like_error: "Your like could not be saved. Please try again later.",
		       vote_error: "Your vote could not be saved. Please try again later."
		   },
		   generic: {
		      untitled: "(Untitled)",
		      tags: "Tags:",
		      tags_more: "and ${0} more",
		      likes: "Likes",
		      comments: "Comments",
		      titleTooltip: "Navigate to ${app}",
		      error: "Unable to retrieve data.",
		      timestamp: {
		         created: {
		            DAY: "Created ${EEEE} at ${time}",
		            MONTH: "Created ${MMM} ${d}",
		            TODAY: "Created today at ${time}",
		            YEAR: "Created ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Created yesterday at ${time}",
		            TOMORROW: "Created ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Updated ${EEEE} at ${time}",
		            MONTH: "Updated ${MMM} ${d}",
		            TODAY: "Updated today at ${time}",
		            YEAR: "Updated ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Updated yesterday at ${time}",
		            TOMORROW: "Updated ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Public",
		         priv: "Private"
		      },
		      action: {
		         created: "Created",
		         updated: "Updated"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Receive updates about people you are following on the Home page and in an email summary.",
		      profile_title: "Open the profile of ${user}.",
		      profile_a11y: "Activating this link will open the profile of ${user} in a new window.",
		      error: "An error occurred.  ${again}.",
		      error_again: "Please try again",
		      error_404: "The network request no longer exists.",
		      warning: "Warning",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "You are now network contacts.",
		            	follow: "You are now network contacts and following ${user}."
		            },
		            ignore: {
		            	nofollow: "You have ignored the invitation.",
		            	follow: "You have ignored the invitation but are now following ${user}."
		            }
		         },
		         error: {
		            accept: "There was an error accepting the request.",
		            ignore: "There was an error ignoring the request."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} at ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "Today at ${time}",
		              YEAR: "${MMM} ${d}, ${YYYY}",
		              YESTERDAY: "Yesterday at ${time}",
		              TOMORROW: "${MMM} ${d}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Activating this link will open ${name} in a new window.",
		      tooltip: "Open ${name} in the Files application",
		      profile_title: "Open the profile of ${user}.",
		      profile_a11y: "Activating this link will open the profile of ${user} in a new window.",
		      download_tooltip: "Download this file (${0})",
		      following: {
		         add: "Follow File",
		         remove: "Stop Following",
		         title: "Toggle whether you will receive updates about this file"
		      },
		      share: {
		         label: "Share",
		         title: "Give others access to this file"
		      },
		      timestamp: {
		         created: {
		            DAY: "Created ${EEEE} at ${time}",
		            MONTH: "Created ${MMM} ${d}",
		            TODAY: "Created today at ${time}",
		            YEAR: "Created ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Created yesterday at ${time}",
		            TOMORROW: "Created ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} created on ${EEEE} at ${time}",
		            MONTH: "${user} created on ${MMM} ${d}",
		            TODAY: "${user} created today at ${time}",
		            YEAR: "${user} created on ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} created yesterday at ${time}",
		            TOMORROW: "${user} created on ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Updated ${EEEE} at ${time}",
		            MONTH: "Updated ${MMM} ${d}",
		            TODAY: "Updated today at ${time}",
		            YEAR: "Updated ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Updated yesterday at ${time}",
		            TOMORROW: "Updated ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} updated on ${EEEE} at ${time}",
		            MONTH: "${user} updated on ${MMM} ${d}",
		            TODAY: "${user} updated today at ${time}",
		            YEAR: "${user} updated on ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} updated yesterday at ${time}",
		            TOMORROW: "${user} updated on ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Created: ${EEEE} at ${time}",
		            MONTH: "Created: ${MMM} ${d}",
		            TODAY: "Created: Today at ${time}",
		            YEAR: "Created: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Created: Yesterday at ${time}",
		            TOMORROW: "Created: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Updated: ${EEEE} at ${time}",
		            MONTH: "Updated: ${MMM} ${d}",
		            TODAY: "Updated: Today at ${time}",
		            YEAR: "Updated: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Updated: Yesterday at ${time}",
		            TOMORROW: "Updated: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} by ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} by ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Download this file (${size})",
		      	 DOWNLOAD_ALT: "Download"
		      },

		      PREVIEW: {
		         LINK: "Preview",
		         TITLE: "Preview this file in a new window."
		      },
		      TAGS: "Tags:",
		      error: "An error occurred.  ${again}.",
		      error_again: "Please try again",
		      error_404: "The file no longer exists or you do not have sufficient permissions to access it.",
		      error_403: "You do not have permission to view this file. The file is not public and is not shared with you.",
		      notifications: {
		         USER_SHARED: "${user} wrote:",
		         CHANGE_SUMMARY: "${user} provided change summary",
		         NO_CHANGE_SUMMARY: "${user} did not provide a change summary",
		         COMMENTED: "${user} commented"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Checked out by you",
		      checkedout_other: "Checked out by ${user}",
		      tooltip: "Open the ${name} file in the library",
		      draft_404_info: "The draft was deleted or is no longer shared with you. The published version is now the latest version of this file.",
		      error_404: "The file was deleted or is no longer shared with you.",
		      error_403: "The file was deleted or is no longer shared with you.",
		      error_preview: "The file is no longer available for preview.",
		      draft_review_canceled: "The review was canceled and the draft is no longer shared with you. Your review is no longer requested.",
		      switch_ee: "View draft",
		      switch_ee_tooltip: "View the latest draft for this file"
		   },
		   ecm_draft: {
		      tooltip: "Open the ${name} draft in the library",
		      community_owners: "Community Owners",
		      draft: "Draft",
		      draft_tooltip: "Viewing draft",
		      draft_general_info: "The previous draft no longer exists and a newer draft is now the latest version.",
		      draft_review_404_general_info: "One of the reviewers has already voted. You are no longer requested to review this draft.",
		      draft_review_404_request_info: "The previous draft no longer exists and the latest draft was submitted for review. Your review is requested.",
		      draft_review_404_require_info: "The previous draft no longer exists and the latest draft was submitted for review. Your review is required.",
		      draft_review_request_info: "Your review is requested.",
		      draft_review_require_info: "Your review is required.",
		      error_404: "The draft was deleted or is no longer shared with you.",
		      error_403: "You cannot view this draft because it is not shared with you.",
		      error_preview: "The draft is no longer available for preview.",
		      switch_ee: "View published version",
		      switch_ee_tooltip: "View the published version of this file",
		      review: "Review",
		      reviewers: "Reviewers",
		      reviwers_addtl: "Additional Reviewers",
		      in_review: "Draft in Review",
		      in_review_tooltip: "Viewing draft in Review",
		      review_required_any: "Community Owners require one reviewer to review this draft.",
		      review_required_all: "Community Owners require all reviewers to review this draft.",
		      review_required_generic: "Community Owners require these reviewers to review this draft.",
		      review_additional_required: "All reviewers added by the draft submitter are required to review this draft.",
		      reivew_submitted_date: {
		         DAY: "${user} submitted the draft for review on ${EEEE} at ${time}.",
		         MONTH: "${user} submitted the draft for review on ${MMM} ${d}.",
		         TODAY: "${user} submitted the draft for review today at ${time}.",
		         YEAR: "${user} submitted the draft for review on ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} submitted the draft for review yesterday at ${time}.",
		         TOMORROW: "${user} submitted the draft for review on ${MMM} ${d}, ${YYYY}."
		      },
		      pending: "Pending",
		      pending_rejected: "Review no longer needed because draft was rejected",
		      approve: "Approve",
		      approved: "Approved",
		      approve_tooltip: "Approve this draft",
		      accept_success: "You have approved this draft.",
		      accept_error: "There was an error approving this draft. Try again.",
		      accept_info: "You approved this draft.",
		      reject: "Reject",
		      rejected: "Rejected",
		      reject_tooltip: "Reject this draft",
		      reject_success: "You have rejected this draft.",
		      reject_error: "There was an error rejecting this draft. Try again.",
		      reject_info: "You rejected this draft."
		   },
		   authUser: {
		      error: "An error occurred retrieving the current user.  ${again}.",
		      error_again: "Please try again",
		      error_404: "Unable to find authenticated user.",
		      error_403: "You do not have permission to retrieve user information."
		   },
		   forum: {
		      error: "An error occurred.  ${again}.",
		      error_again: "Please try again",
		      error_404: "The forum no longer exists or you do not have sufficient permissions to access it.",
		      error_403: "You do not have permission to view this forum. The forum is not public and is not shared with you.",

		      readMore: "View full topic...",
		      readMore_tooltip: "Open the ${name} forum topic.",
		      readMore_a11y: "Activating this link will open the ${name} forum topic in a new window.",
		      QUESTION_ANSWERED: "This question has been answered.",
		      QUESTION_NOT_ANSWERED: "This question has not been answered yet.",

		      attachments: "${count} Attachments",
		      attachments_one: "${count} Attachment"
		   },
		   blog: {
		      error: "An error occurred.  ${again}.",
		      error_again: "Please try again",
		      error_404: "The blog no longer exists or you do not have sufficient permissions to access it.",
		      error_403: "You do not have permission to view this blog. The blog is not public and is not shared with you.",
		      readMore: " Read more ...",
		      readMore_tooltip: "Open the ${name} blog entry.",
		      readMore_a11y: "Activating this link will open the ${name} blog entry in a new window.",
		      graduated: "Graduated",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Vote</a>",
		  					TOOLTIP: 	"Vote for this"
		  				},

		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Voted</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Voted</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Undo</a>",
		  					TOOLTIP: 	"Remove your vote from this"
		  				},

		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 people voted for this"
		  				},

		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 person voted for this"
		  				},

		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} voted for this"
		  				}
		  			},
		  			LOADING: "Loading...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Voted"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "We could not save your vote because you have either reached your voting limit or the idea is no longer available to you.",
		      readMore_tooltip: "Open the ${name} idea.",
		      readMore_a11y: "Activating this link will open the ${name} idea in a new window."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Replies",
		      THIS_ARIA_LABEL: "This Reply",
		      THIS_TAB_TITLE: "This Reply",
		      TAB_TITLE: "Replies (${0})",
		      REPLY_TO_REPLY: "In reponse to ${thisReply}",
		      REPLY_TO_TOPIC: "In response to ${thisTopic}",
		      THIS_TOPIC: "this topic",
		      THIS_REPLY: "this reply",
		      NAVIGATE_TO_REPLY: "Navigate to the parent reply",
		      NAVIGATE_TO_TOPIC: "Navigate to the parent topic",
		      ADD_COMMENT: "Reply to this topic",
		      ADD_COMMENT_TOOLTIP: "Reply to this forum topic",
		      SHOWING_RECENT_REPLIES: "Showing ${0} most recent replies",
		      PREV_COMMENTS: "Show More Replies",
		      PLACEHOLDER_TXT: "Reply to this topic",
		      EMPTY: "There are no replies.",
		      TRIM_LONG_COMMENT: "Shorten reply?",
		      WARN_LONG_COMMENT: "The reply is too long.  ${shorten}",
		      ERROR: "An error has occurred while retrieving the replies. ${again}",
		      ERROR_CREATE: "Your reply could not be saved.  Try again later.",
		      ERROR_CREATE_NOT_FOUND: "Your reply could not be saved because the topic has been deleted or is no longer visible to you.",
		      ERROR_CREATE_ACCESS_DENIED: "Your reply could not be saved because the topic has been deleted or is no longer visible to you.",
		      ERROR_CREATE_TIMEOUT: "Your reply could not be saved because the server could not be contacted.  Click 'Save' to try again.",
		      ERROR_CREATE_CANCEL: "Your reply could not be saved because the request was canceled.  Click 'Save' to try again.",
		      ERROR_CREATE_NOT_LOGGED_IN: "You must be logged in to create this reply.  Click 'Save' to be prompted to log in.",
		      ERROR_NO_CONTENT: "Enter your reply and click 'Save.'  If you no longer want to leave a reply click 'Cancel.'",
		      ERROR_UNAUTHORIZED: "Your reply could not be saved because you are not authorized to leave a reply.",
		      COMMENT_DELETED: {
		         DAY: "Reply deleted by ${user} on ${EEEE} at ${time}",
		         MONTH: "Reply deleted by ${user} on ${MMM} ${d}",
		         TODAY: "Reply deleted by ${user} today at ${time}",
		         YEAR: "Reply deleted by ${user} on ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Reply deleted by ${user} yesterday at ${time}",
		         TOMORROW: "Reply deleted by ${user} on ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Reason for deletion: ${reason}",
		      REPLY_TITLE: "Re: ${0}",
		      SHOW_FULL_REPLY: "View full reply",
		      SHOW_FULL_REPLY_TOOLTIP: "Navigate to the original reply in the forum topic",
		      REPLY_ACTION: "Reply",
		      REPLY_ACTION_TOOLTIP: "Reply to this post",
		      MODERATION_PENDING: "This reply is pending review.",
		      MODERATION_QUARANTINED: "The post has been quarantined by the moderator.",
		      MODERATION_REMOVED: {
		         DAY: "This reply was removed by ${user} on ${EEEE} at ${time}.",
		         MONTH: "This reply was removed by ${user} on ${MMM} ${d}.",
		         TODAY: "This reply was removed by ${user} today at ${time}.",
		         YEAR: "This reply was removed by ${user} on ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "This reply was removed by ${user} yesterday at ${time}.",
		         TOMORROW: "This reply was removed by ${user} on ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "This reply was rejected by ${user} on ${EEEE} at ${time}.",
		         MONTH: "This reply was rejected by ${user} on ${MMM} ${d}.",
		         TODAY: "This reply was rejected by ${user} today at ${time}.",
		         YEAR: "This reply was rejected by ${user} on ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "This reply was rejected by ${user} yesterday at ${time}.",
		         TOMORROW: "This reply was rejected by ${user} on ${MMM} ${d}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Your reply has been submitted for review and will be available when approved."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Comments",
		      PLACEHOLDER_TXT: "Add a comment",
		      TAB_TITLE: "Comments (${0})",
		      ACTION_NOT_SUPPORTED: "Unsupported Action",
		      ADD_COMMENT: "Add a Comment",
		      ADD_COMMENT_TOOLTIP: "Add a comment to this item",
		      CANCEL: "Cancel",
		      COMMENT_COUNT_ONE: "${0} comment",
		      COMMENT_COUNT_MANY: "${0} comments",
		      COMMENT_LABEL: "Comment:",
		      DELETE: "Delete",
		      DELETE_TOOLTIP: "Delete comment",
		      DELETEREASON: "Reason for deleting this comment:",
		      DIALOG_TITLE: "Shorten Comment",
		      TOOLTIP: "Shorten Comment",
		      NAME: "Shorten Comment",
		      EDIT: "Edit",
		      EDIT_TOOLTIP: "Edit comment",
		      ERROR_CREATE: "Your comment could not be saved.  Try again later.",
		      ERROR_CREATE_NOT_FOUND: "Your comment could not be saved because the item has been deleted or is no longer visible to you.",
		      ERROR_CREATE_ACCESS_DENIED: "Your comment could not be saved because the item has been deleted or is no longer visible to you.",
		      ERROR_CREATE_TIMEOUT: "Your comment could not be saved because the server could not be contacted.  Click 'Post' to try again.",
		      ERROR_CREATE_CANCEL: "Your comment could not be saved because the request was canceled.  Click 'Post' to try again.",
		      ERROR_CREATE_NOT_LOGGED_IN: "You must be logged in to create this comment.  Click 'Post' to be prompted to log in.",
		      ERROR_DELETE: "Your comment could not be deleted.  Try again later.",
		      ERROR_DELETE_TIMEOUT: "Your comment could not be deleted because the server could not be contacted.  Click 'Delete' to try again.",
		      ERROR_DELETE_NOT_FOUND: "Your comment could not be deleted because the comment or item has been deleted or is no longer visible to you.",
		      ERROR_DELETE_ACCESS_DENIED: "Your comment could not be deleted because the item has been deleted or is no longer visible to you.",
		      ERROR_DELETE_CANCEL: "Your comment could not be deleted because the request was canceled.  Click 'Delete' to try again.",
		      ERROR_DELETE_NOT_LOGGED_IN: "You must be logged in to delete this comment.  Click 'Delete' to be prompted to log in.",
		      ERROR_EDIT: "Your comment could not be updated.  Try again later.",
		      ERROR_EDIT_ACCESS_DENIED: "Your comment could not be updated because the item has been deleted or is no longer visible to you.",
		      ERROR_EDIT_NOT_FOUND: "Your comment could not be updated because the item has been deleted or is no longer visible to you.",
		      ERROR_EDIT_TIMEOUT: "Your comment could not be updated because the server could not be contacted.  Click 'Post' to try again.",
		      ERROR_EDIT_CANCEL: "Your comment could not be updated because the request was canceled.  Click 'Post' to try again.",
		      ERROR_EDIT_NOT_LOGGED_IN: "You must be logged in to edit this comment.  Click 'Post' to be prompted to log in.",
		      ERROR_NO_CONTENT: "Enter your comment and click 'Post.'  If you no longer want to leave a comment click 'Cancel.'",
		      ERROR_NO_CONTENT_EDIT: "Enter your comment and click 'Post.'  If you no longer want to edit your comment click 'Cancel.'",
		      ERROR_UNAUTHORIZED: "Your comment could not be saved because you are not authorized to leave a comment.",
		      ERROR_GENERAL: "An error has occurred.",
		      OK: "OK",
		      YES: "Yes",
		      TRIM_LONG_COMMENT: "Shorten comment?",
		      WARN_LONG_COMMENT: "The comment is too long.  ${shorten}",
		      LINK: "Link",
		      SAVE: "Save",
		      POST: "Post",
		      SHOWMORE: "Read more...",
		      VIEW_COMMENTS_FILE: "View comments on this file",
		      SUBSCRIBE_TO_COMMENTS: "Subscribe to these comments",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Follow changes to these comments through your feed reader",
		      PROFILE_TITLE: "Open the profile of ${user}.",
		      PROFILE_A11Y: "Activating this link will open the profile of ${user} in a new window.",
		      MODERATION_PENDING: "This comment is pending review.",
		      MODERATION_REMOVED: {
		         DAY: "This comment was removed by ${user} on ${EEEE} at ${time}.",
		         MONTH: "This comment was removed by ${user} on ${MMM} ${d}.",
		         TODAY: "This comment was removed by ${user} today at ${time}.",
		         YEAR: "This comment was removed by ${user} on ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "This comment was removed by ${user} yesterday at ${time}.",
		         TOMORROW: "This comment was removed by ${user} on ${MMM} ${d}, ${YYYY}."
		      },

		      MODERATION_REJECTED: {
		         DAY: "This comment was rejected by ${user} on ${EEEE} at ${time}.",
		         MONTH: "This comment was rejected by ${user} on ${MMM} ${d}.",
		         TODAY: "This comment was rejected by ${user} today at ${time}.",
		         YEAR: "This comment was rejected by ${user} on ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "This comment was rejected by ${user} yesterday at ${time}.",
		         TOMORROW: "This comment was rejected by ${user} on ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Show Previous Comments",
		      EMPTY: "There are no comments.",
		      ERROR_ALT: "Error",
		      ERROR: "An error has occurred while retrieving the comments. ${again}",
		      ERROR_ADDTL: "An error occurred while retrieving additional comments. ${again}",
		      ERROR_AGAIN: "Try again.",
		      ERROR_AGAIN_TITLE: "Try the request again for more comments.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} at ${time} (version ${version})",
		         MONTH: "${user} ${MMM} ${d} (version ${version})",
		         TODAY: "${user} today at ${time} (version ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (version ${version})",
		         YESTERDAY: "${user} yesterday at ${time} (version ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (version ${version})"
		      },

		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} at ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} today at ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} yesterday at ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },

		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} at ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "Today at ${time}",
		         YEAR: "${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Yesterday at ${time}",
		         TOMORROW: "${MMM} ${d}, ${YYYY}"
		      },

		      COMMENT_DELETED: {
		         DAY: "Comment deleted by ${user} on ${EEEE} at ${time}",
		         MONTH: "Comment deleted by ${user} on ${MMM} ${d}",
		         TODAY: "Comment deleted by ${user} today at ${time}",
		         YEAR: "Comment deleted by ${user} on ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Comment deleted by ${user} yesterday at ${time}",
		         TOMORROW: "Comment deleted by ${user} on ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} edited ${EEEE} at ${time} (version ${version})",
		         MONTH: "${user} edited ${MMM} ${d} (version ${version})",
		         TODAY: "${user} edited today at ${time} (version ${version})",
		         YEAR: "${user} edited ${MMM} ${d}, ${YYYY} (version ${version})",
		         YESTERDAY: "${user} edited yesterday at ${time} (version ${version})",
		         TOMORROW: "${user} edited ${MMM} ${d}, ${YYYY} (version ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} edited ${EEEE} at ${time}",
		         MONTH: "${user} edited ${MMM} ${d}",
		         TODAY: "${user} edited today at ${time}",
		         YEAR: "${user} edited ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} edited yesterday at ${time}",
		         TOMORROW: "${user} edited ${MMM} ${d}, ${YYYY}"
		      },

		      DELETE_CONFIRM: "Are you sure you want to delete this comment?",
		      FLAG_ITEM: {
		         BUSY: "Saving...",
		         CANCEL: "Cancel",
		         ACTION: "Flag as Inappropriate",
		         DESCRIPTION_LABEL: "Provide a reason for flagging this item (optional)",
		         EDITERROR: "The file's metadata was not edited due to an error",
		         OK: "Save",
		         ERROR_SAVING: "There was an error with processing the request. Try again later.",
		         SUCCESS_SAVING: "Your flag has been submitted. A moderator will investigate shortly.",
		         TITLE: "Flag this item as inappropriate",
		         COMMENT: {
		            TITLE: "Flag this comment as inappropriate",
		            A11Y: "This button opens a dialog that allows the user to flag this comment as inappropriate."
		         }
		      }
		   },

		   COMMENTS_DELETE: {
		      CANCEL: "Cancel",
		      DIALOG_TITLE: "Delete Comment",
		      NAME: "Delete Comment",
		      OK: "OK",
		      TOOLTIP: "Delete Comment"
		   },

		   COMMENTS_SHORTEN: {
		      CANCEL: "Cancel",
		      CONFIRM: "Shortening will remove the text beyond the comment limit.  Click 'OK' to shorten or 'Cancel' to edit the comment yourself.",
		      DIALOG_TITLE: "Shorten Comment",
		      NAME: "Shorten Comment",
		      OK: "OK",
		      TOOLTIP: "Shorten Comment"
		   },

		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Submission Confirmation",
		      CONFIRM: "Your comment has been submitted for review and will be available when approved.",
		      OK: "OK"
		   },

		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "PM",
		      TODAY: "today",
		      TODAY_U: "Today",
		      YESTERDAY: "yesterday",
		      YESTERDAY_U: "Yesterday",

		      ADDED: { DAY: "Added ${EEee} at ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Added ${date_long}",
		         TODAY: "Added today at ${time}",
		         YEAR: "Added ${date_long}",
		         YESTERDAY: "Added yesterday at ${time}"
		      },

		      LAST_UPDATED: { DAY: "Last updated ${EEee} at ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Last updated ${date_long}",
		         TODAY: "Last updated today at ${time}",
		         YEAR: "Last updated ${date_long}",
		         YESTERDAY: "Last updated yesterday at ${time}"
		      },

		      MONTHS_ABBR: { 0: "JAN",
		         10: "NOV",
		         11: "DEC",
		         1: "FEB",
		         2: "MAR",
		         3: "APR",
		         4: "MAY",
		         5: "JUN",
		         6: "JUL",
		         7: "AUG",
		         8: "SEP",
		         9: "OCT"
		      },

		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Today",
		         YEAR: "${date_short}",
		         YESTERDAY: "Yesterday",
		         TOMORROW: "Tomorrow"
		      },

		      RELATIVE_TIME: { DAY: "${EEee} at ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Today at ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Yesterday at ${time}",
		         TOMORROW: "${date_short}"
		      },

		      RELATIVE_TIME_LONG: { DAY: "${EEee} at ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Today at ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Yesterday at ${time}",
		         TOMORROW: "${date_long}"
		      },

		      DATE_TIME: { DAY: "${date_short} at ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} at ${time}",
		         TODAY: "${date_short} at ${time}",
		         YEAR: "${date_short} at ${time}",
		         YESTERDAY: "${date_short} at ${time}",
		         TOMORROW: "${date_short} at ${time}"
		      },

		      DATE_ONLY: { DAY: "${date_short}",
		         FULL: "${EEEE}, ${date_long}",
		         MONTH: "${date_short}",
		         TODAY: "${date_short}",
		         YEAR: "${date_short}",
		         YESTERDAY: "${date_short}",
		         TOMORROW: "${date_short}"
		      },

		      TIME_ONLY: { DAY: "${time}",
		         FULL: "${time_long}",
		         MONTH: "${time}",
		         TODAY: "${time}",
		         YEAR: "${time}",
		         YESTERDAY: "${time}",
		         TOMORROW: "${time}"
		      },

		      UPDATED: { DAY: "Updated ${EEee} at ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Updated ${date_long}",
		         TODAY: "Updated today at ${time}",
		         YEAR: "Updated ${date_long}",
		         YESTERDAY: "Updated yesterday at ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Unable to load version information.",
		      ERROR_REQUEST_CANCELLED: "The request was canceled.",
		      ERROR_REQUEST_TIMEOUT: "The server could not be contacted.",
		      ERROR_REQUEST_UNKNOWN: "An unknown error has occurred.",
		      LOADING: "Loading ..",
		      NO_VERSIONS: "There are no versions",
		      INFO: "Version ${0} created ${1} by ",
		      VERSION_NUMBER: "Version ${0}",
		      DELETED: "Deleted",
		      DELETE_ALL: "Delete all versions prior to version",
		      DELETE_VERSION_SINGLE: "Delete version ${0}",
		      DELETEERROR: "The version was not deleted due to an error.",
		      CREATE_VERSION: "Create a new version",
		      CREATE_VERSION_TOOLTIP: "Create a version of this file",
		      REVERT_VERSION: "Restore version ${0}",
		      REVERT_DESCRIPTION: "Restored from version ${0}",
		      PREVIOUS: "Previous",
		      PREVIOUS_TOOLTIP: "Previous page",
		      ELLIPSIS: "...",
		      NEXT: "Next",
		      NEXT_TOOLTIP: "Next page",
		      COUNT: "${0}-${1} of ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Page",
		      SHOW: "Show",
		      ITEMS_PER_PAGE: " items per page.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Today at ${time}",
		            YESTERDAY: "Yesterday at ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} at ${time}",
		            YEAR: "${date_short} at ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} at ${time}",
		            TODAY: "today at ${time}",
		            YESTERDAY: "yesterday at ${time}"
		        },
		        UPDATED: { DAY: "Updated ${EEee} at ${time}",
		            YEAR: "Updated ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Updated ${date_short}",
		            TODAY: "Updated today at ${time}",
		            YESTERDAY: "Updated yesterday at ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Delete version ${0}",
		         DOWNLOAD: "Download",
		         DOWNLOAD_TOOLTIP: "Download this version (${0})",
		         VIEW: "View",
		         VIEW_TOOLTIP: "View version ${0}",
		         REVERT: {
		            A11Y: "This button opens a dialog that allows the user to confirm restoring a file from a previous version. Confirming this action will result in a refresh of the contents on the page.",
		            FULL: "Restore",
		            WIDGET: "Restore this version"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "The version could not be deleted because it has been already deleted or is no longer visible to you.",
		         ERROR_ACCESS_DENIED: "The version could not be deleted because you are not an editor.",
		         ERROR_TIMEOUT: "The version was not deleted because the server could not be contacted.  Click 'Delete' again to try your request again.",
		         ERROR_CANCEL: "The version was not deleted because the request was canceled.  Click 'Delete' again to try your request again.",
		         ERROR_NOT_LOGGED_IN: "You must be logged in to delete this version.  Click 'Delete' to be prompted to log in.",
		         GENERIC_ERROR: "The version could not be deleted because of an unknown error.  Click 'Delete' again to try your request again.",
		         FULL: "Delete",
		         A11Y: "This button opens a dialog that allows the user to confirm the deletion of this version. Confirming this action will result in a refresh of the contents on the page."
		      },

		      REVERT: {
		         ERROR_NOT_FOUND: "The version could not be restored because it has been deleted or is no longer visible to you.",
		         ERROR_ACCESS_DENIED: "The version could not be restored because you are not an editor.",
		         ERROR_NAME_EXISTS: "The version could not be restored because another file has the same name.",
		         ERROR_TIMEOUT: "The version was not restored because the server could not be contacted.  Click 'Restore' again to try your request again.",
		         ERROR_CANCEL: "The version was not restored because the request was canceled.  Click 'Restore' again to try your request again.",
		         ERROR_QUOTA_VIOLATION: "The version could not be restored because of space restrictions.",
		         ERROR_MAX_CONTENT_SIZE: "The version could not be restored because it is larger than the maximum allowed file size of ${0}",
		         GENERIC_ERROR: "The version could not be restored because of an unknown error.  Click 'Restore' again to try your request again."
		      }
		   },

		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "See who has downloaded...",
		      PREVIOUS: "Previous",
		      PREVIOUS_TOOLTIP: "Previous page",
		      ELLIPSIS: "...",
		      NEXT: "Next",
		      NEXT_TOOLTIP: "Next page",
		      COUNT: "${0}-${1} of ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Page",
		      SHOW: "Show",
		      ITEMS_PER_PAGE: " items per page.",
		      VERSION: {
		         DAY: "Version ${version} on ${date}",
		         MONTH: "Version ${version} on ${date}",
		         TODAY: "Version ${version} at ${time}",
		         YEAR: "Version ${version} on ${date}",
		         YESTERDAY: "Version ${version} yesterday"
		      },

		      FILE: {
		         V_LATEST: "You have downloaded the latest version of this file",
		         V_OLDER: "You last downloaded version ${0} of this file",
		         LOADING: "Loading...",
		         EMPTY: "Anonymous users only",
		         ERROR: "Unable to load download information"
		      }
		   },

		   EE_DIALOG: {
		      ERROR: "Error",
		      ERROR_ALT_TEXT: "Error:",
		      ERROR_MSG_GENERIC: "Something went wrong.  Please try again.",
		      ERROR_MSG_NOT_AVAILABLE: "This item has been deleted or is no longer available.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "The content for this item is not available.",
		      ERROR_MSG_NO_ACCESS: "You no longer have access to this item.",
		      LOADING: "Loading...",
		      TITLE_SU: "${author} posted a message.",
		      TITLE_NI: "${author} invited you to join their network.",
		      AUTHOR_TITLE: "View profile for ${author}",
		      OPEN_LINK: "Open ${title}",
		      CONFIRM_CLOSE_TITLE: "Confirm",
		      CONFIRM_CLOSE_MESSAGE: "Are you sure you want to abandon your changes? Press OK to continue or Cancel to return",
		      OK: "OK",
		      CANCEL: "Cancel"
		   },
		   MESSAGE: {
		      SUCCESS: "Confirmation",
		      ERROR: "Error",
		      ERROR_ALT_TEXT: "Error:",
		      INFO: "Information",
		      WARNING: "Warning",
		      DISMISS: "Hide this message",
		      MORE_DETAILS: "More details",
		      HIDE_DETAILS: "Hide details"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Created: ${EEEE} at ${time}",
		           MONTH: "Created: ${MMM} ${d}",
		           TODAY: "Created: Today at ${time}",
		           YEAR: "Created: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Created: Yesterday at ${time}",
		           TOMORROW: "Created: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "An error occurred.  ${again}.",
		      error_again: "Please try again",
		      error_404: "The status update no longer exists.",
		      notifications: {
		         STATUS_UPDATE: "${user} posted a message",
		         USER_BOARD_POST: "${user} wrote on your board",
		         POST_COMMENT: "${user} wrote:"
		      }
		   },
		   login: {
		      error: "Your user name and/or password does not match any existing accounts. Please try again.",
		      logIn: "Log In",
		      password: "Password:",
		      user: "User name:",
		      welcome: "Login to HCL Connections"
		   },
		   repost: {
		      name: "Repost",
		      title: "Repost this update to my followers or communities",
		      msg_success: "The update was successfully reposted to your followers.",
		      msg_generic: "Something went wrong.  Please try again."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Add",
		      ADD_TXT: "Add people or communities as readers",
		      SHOW_MORE: "Show more...",
		      READER_IF_PUBLIC: "Everyone (public)",
		      READER_IF_PUBLIC_TOOLTIP: "This file is public and visible to everyone",
		      EMPTY_READERS: "None",
		      READERS_LABEL: "Readers:\u00a0",
		      EDITORS_LABEL: "Editors:\u00a0",
		      OWNER_LABEL: "Owner:\u00a0",
		      ERROR: "Unable to load share information",
		      ERROR_NOT_FOUND: "The file you have requested has been deleted or moved. If someone sent you this link, check that it is correct.",
		      ERROR_ACCESS_DENIED: "You do not have permission to view this file.  The file is not public and is not shared with you.",
		      SHARE: "Share",
		      CANCEL: "Cancel",
		      SHARE_WITH: "Share with:",
		      PERSON: "a Person",
		      COMMUNITY: "a Community",
		      PLACEHOLDER: "Person name or email...",
		      MESSAGE: "Message:",
		      MESSAGE_TXT: "Add an optional message",
		      REMOVE_ITEM_ALT: "Remove ${0}",
		      NO_MEMBERS: "None",
		      A11Y_READER_ADDED: "Selected ${0} as a reader",
		      A11Y_READER_REMOVED: "Removed ${0} as a reader",
		      SELF_REFERENCE_ERROR: "You cannot share with yourself.",
		      OWNER_REFERENCE_ERROR: "You cannot share with the owner of the file.",
		      SHARE_COMMUNITY_WARN: "Sharing with the public community '${0}' will make this file public.",
		      SELECT_USER_ERROR: "You must select at least one person or community to share with",
		      WARN_LONG_MESSAGE: "The message is too long.",
		      TRIM_LONG_MESSAGE: "Shorten message?",
		      ERROR_SHARING: "The file could not be shared.  Please try again later.",
		      INFO_SUCCESS: "The file was shared successfully.",
		      MAX_SHARES_ERROR: "The maximum number of shares has been exceeded.",
		      NOT_LOGGED_IN_ERROR: "The file was not shared because you were not logged in.  Click 'Share' to share the file.",
		      TIMEOUT_ERROR: "The file was not shared because the server could not be contacted.  Click 'Share' to try again.",
		      CANCEL_ERROR: "The file was not shared because the request was cancelled.  Click 'Share' to try again.",
		      NOT_FOUND_ERROR: "The file has been deleted or is no longer visible to you and cannot be shared.",
		      ACCESS_DENIED_ERROR: "You no longer have permission to share this file.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "A file that is restricted may not be made public.",
		      TOOLTIP: "Give others access to this file"
		   },
		   HISTORY: {
		      TAB_TITLE: "Recent Updates",
		      NO_HISTORY: "There are no recent updates.",
		      EMPTY: "Could not retrieve recent updates for this item. It has been deleted or you no longer have access to it.",
		      MORE: "Show Previous Updates",
		      ERROR_ALT: "Error",
		      ERROR: "An error has occurred while retrieving the updates. ${again}",
		      ERROR_ADDTL: "An error occurred while retrieving additional updates. ${again}",
		      ERROR_AGAIN: "Try again.",
		      ERROR_AGAIN_TITLE: "Try the request again for more updates.",
		      PROFILE_TITLE: "Open the profile of ${user}.",
		      SORT_BY: "Sort by\\:",
		      SORTS: {
		         DATE: "Date",
		         DATE_TOOLTIP: "Sort from most recent history to least recent updates",
		         DATE_TOOLTIP_REVERSE: "Sort from least recent history to most recent updates"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} at ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "Today at ${time}",
		             YEAR: "${MMM} ${d}, ${YYYY}",
		             YESTERDAY: "Yesterday at ${time}",
		             TOMORROW: "${MMM} ${d}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "This Comment",
			   REPLY_ACTION: "Reply",
		       REPLY_ACTION_TOOLTIP: "Reply to this comment"
		   },
		   OAUTH: {
		      welcomeHeader: "Welcome to Connections",
		      continueBtnLabel: "Continue",
		      continueBtnA11y: "Activating this link will open a new window that will allow you to authorize access to Connections.",
		      clickHere: "Click here",
		      infoMsg: "Connections needs your authorization to access your data.",
		      authorizeGadget: "${clickHere} to authorize this application to access your Connections information.",
		      confirmAuthorization: "${clickHere} to confirm that you have authorized this application to access your Connections information."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Activating this link will open a new window that will allow you to authorize access to the Connections Library repository.",
		      infoMsg: "The Connections Library repository needs your authorization to access your data.",
		      authorizeGadget: "${clickHere} to authorize this application to access your Connections Library repository information.",
		      confirmAuthorization: "${clickHere} to confirm that you have authorized this application to access your Connections Library repository information."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Cancel",
		      CONFIRM: "Are you sure you want to abandon your changes?  Press OK to continue or Cancel to return.",
		      DIALOG_TITLE: "Confirm",
		      NAME: "Confirm",
		      OK: "OK",
		      TOOLTIP: "Confirm"
		   }
	}),

	"ar": true,
	"bg": true,
	"ca": true,
	"cs": true,
	"da": true,
	"de": true,
	"el": true,
	"es": true,
	"fi": true,
	"fr": true,
	"he": true,
	"hr": true,
	"hu": true,
	"id": true,
	"it": true,
	"iw": true,
	"ja": true,
	"kk": true,
	"ko": true,
	"nb": true,
	"nl": true,
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

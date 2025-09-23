define({
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
		   common: {
		      more: {
		         label: "更多",
		         tooltip: "更多操作"
		       },
		       tags_more: "以及 ${0} 个以上",
		       ERROR_ALT: "错误",
		       PERSON_TITLE: "打开 ${user} 的个人档案。",
		       inactiveUser: "${user}（未激活）",
		       inactiveIndicator: "（未活动）",
		       like_error: "无法保存您的点赞情况。 请稍后重试。",
		       vote_error: "无法保存您的投票。 请稍后重试。"
		   },
		   generic: {
		      untitled: "（无标题）",
		      tags: "标签：",
		      tags_more: "以及 ${0} 个以上",
		      likes: "点赞数",
		      comments: "评论",
		      titleTooltip: "浏览至 ${app}",
		      error: "无法检索数据。",
		      timestamp: {
		         created: {
		            DAY: "创建于${EEEE} ${time}",
		            MONTH: "创建于 ${MMM}/${d}",
		            TODAY: "创建于今天 ${time}",
		            YEAR: "创建于 ${YYYY}/${MMM}/${d}",
		            YESTERDAY: "创建于昨天 ${time}",
		            TOMORROW: "创建于 ${YYYY}/${MMM}/${d}"
		         },
		         updated: {
		            DAY: "更新于${EEEE} ${time}",
		            MONTH: "更新于 ${MMM}/${d}",
		            TODAY: "更新于今天 ${time}",
		            YEAR: "更新于 ${YYYY}/${MMM}/${d}",
		            YESTERDAY: "更新于昨天 ${time}",
		            TOMORROW: "更新于 ${YYYY}/${MMM}/${d}"
		         }
		      },
		      visibility: {
		         pub: "公共",
		         priv: "私有"
		      },
		      action: {
		         created: "创建日期",
		         updated: "更新时间"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "在主页和电子邮件摘要中接收有关您关注的人员的更新。",
		      profile_title: "打开 ${user} 的个人档案。",
		      profile_a11y: "激活此链接将在新窗口中打开 ${user} 的个人档案。",
		      error: "发生错误。  ${again}.",
		      error_again: "请重试",
		      error_404: "此网络请求不再存在。",
		      warning: "警告",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "您现在是网络联系人。",
		            	follow: "您现在是网络联系人并关注 ${user}。"
		            },
		            ignore: {
		            	nofollow: "您已忽略邀请。",
		            	follow: "您已忽略邀请，但现在正在关注 ${user}。"
		            }
		         },
		         error: {
		            accept: "接受请求时出错。",
		            ignore: "忽略请求时出错。"
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} ${time}",
		              MONTH: "${MMM} ${d} 日",
		              TODAY: "今天 ${time}",
		              YEAR: "${YYYY} 年 ${MMM} ${d} 日",
		              YESTERDAY: "昨天 ${time}",
		              TOMORROW: "${YYYY} 年 ${MMM} ${d} 日"
		           }
		      }
		   },
		   file: {
		      a11y_help: "激活此链接将在新窗口中打开 ${name}。",
		      tooltip: "在“文件”应用程序中打开 ${name}",
		      profile_title: "打开 ${user} 的个人档案。",
		      profile_a11y: "激活此链接将在新窗口中打开 ${user} 的个人档案。",
		      download_tooltip: "下载此文件 (${0})",
		      following: {
		         add: "关注文件",
		         remove: "停止关注",
		         title: "切换您是否将接收有关此文件的更新的设置"
		      },
		      share: {
		         label: "共享",
		         title: "授权他人访问此文件"
		      },
		      timestamp: {
		         created: {
		            DAY: "创建于${EEEE} ${time}",
		            MONTH: "创建于 ${MMM}/${d}",
		            TODAY: "创建于今天 ${time}",
		            YEAR: "创建于 ${YYYY}/${MMM}/${d}",
		            YESTERDAY: "创建于昨天 ${time}",
		            TOMORROW: "创建于 ${YYYY}/${MMM}/${d}"
		         },
		         createdOther: {
		            DAY: "由 ${user} 创建于${EEEE} ${time}",
		            MONTH: "由 ${user} 创建于 ${MMM}/${d}",
		            TODAY: "由 ${user} 于今天 ${time} 创建",
		            YEAR: "由 ${user} 创建于 ${YYYY}/${MMM}/${d}",
		            YESTERDAY: "由 ${user} 于昨天 ${time} 创建",
		            TOMORROW: "由 ${user} 创建于 ${YYYY}/${MMM}/${d}"
		         },
		         updated: {
		            DAY: "更新于${EEEE} ${time}",
		            MONTH: "更新于 ${MMM}/${d}",
		            TODAY: "更新于今天 ${time}",
		            YEAR: "更新于 ${YYYY}/${MMM}/${d}",
		            YESTERDAY: "更新于昨天 ${time}",
		            TOMORROW: "更新于 ${YYYY}/${MMM}/${d}"
		         },
		         updatedOther: {
		            DAY: "由 ${user} 更新于${EEEE} ${time}",
		            MONTH: "由 ${user} 更新于 ${MMM}/${d}",
		            TODAY: "由 ${user} 于今天 ${time} 更新",
		            YEAR: "由 ${user} 更新于 ${YYYY}/${MMM}/${d}",
		            YESTERDAY: "由 ${user} 于昨天 ${time} 更新",
		            TOMORROW: "由 ${user} 更新于 ${YYYY}/${MMM}/${d}"
		         },
		         createdCompact: {
		            DAY: "创建时间：${EEEE} ${time}",
		            MONTH: "创建时间：${MMM}/${d}",
		            TODAY: "创建时间：今天 ${time}",
		            YEAR: "创建时间：${YYYY}/${MMM}/${d}",
		            YESTERDAY: "创建时间：昨天 ${time}",
		            TOMORROW: "创建时间：${YYYY}/${MMM}/${d}"
		         },
		         updatedCompact: {
		            DAY: "更新时间：${EEEE} ${time}",
		            MONTH: "更新时间：${MMM}/${d}",
		            TODAY: "更新时间：今天 ${time}",
		            YEAR: "更新时间：${YYYY}/${MMM}/${d}",
		            YESTERDAY: "更新时间：昨天 ${time}",
		            TOMORROW: "更新时间：${YYYY}/${MMM}/${d}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "由 ${user} 于 ${date_long} ${time_long} 更新",
		         UPDATE_TIMESTAMP: "由 ${user} 于 ${date_long} ${time_long} 更新",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "下载此文件 (${size})",
		      	 DOWNLOAD_ALT: "下载"
		      },
		      PREVIEW: {
		         LINK: "预览",
		         TITLE: "在新窗口中预览此文件。"
		      },
		      TAGS: "标签：",
		      error: "发生错误。  ${again}.",
		      error_again: "请重试",
		      error_404: "此文件不再存在，或者您没有足够的许可权来访问此文件。",
		      error_403: "您无权查看此文件。 此文件不是公共文件，而且并未与您共享。",
		      notifications: {
		         USER_SHARED: "${user} 撰写了：",
		         CHANGE_SUMMARY: "${user} 提供了更改摘要",
		         NO_CHANGE_SUMMARY: "${user} 未提供更改摘要",
		         COMMENTED: "${user} 发表了评论"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "已由您检出",
		      checkedout_other: "已由 ${user} 检出",
		      tooltip: "打开文档库中的 ${name} 文件",
		      draft_404_info: "草稿已删除或不再与您共享。 已发布的版本现在是此文件的最新版本。",
		      error_404: "文件已删除或不再与您共享。",
		      error_403: "文件已删除或不再与您共享。",
		      error_preview: "此文件不能再供您预览。",
		      draft_review_canceled: "复审已取消且草稿不再与您共享。 不再请求您进行复审。",
		      switch_ee: "查看草稿",
		      switch_ee_tooltip: "查看此文件的最新草稿"
		   },
		   ecm_draft: {
		      tooltip: "打开文档库中的 ${name} 草稿",
		      community_owners: "社区所有者",
		      draft: "草稿",
		      draft_tooltip: "查看草稿",
		      draft_general_info: "先前的草稿已不存在，较新的草稿现在是最新版本。",
		      draft_review_404_general_info: "有一名复审者已经投票。 不再请求您复审此草稿。",
		      draft_review_404_request_info: "先前的草稿已不存在，已提交最新草稿供复审。 请求您进行复审。",
		      draft_review_404_require_info: "先前的草稿已不存在，已提交最新草稿供复审。 需要您进行复审。",
		      draft_review_request_info: "请求您进行复审。",
		      draft_review_require_info: "需要您进行复审。",
		      error_404: "草稿已删除或不再与您共享。",
		      error_403: "您无法查看此草稿，因为未与您共享此草稿。",
		      error_preview: "此草稿不能再供您预览。",
		      switch_ee: "查看已发布的版本",
		      switch_ee_tooltip: "查看此文件的已发布版本",
		      review: "复审",
		      reviewers: "复审者",
		      reviwers_addtl: "其他复审者",
		      in_review: "正在复审的草稿",
		      in_review_tooltip: "查看正在复审的草稿",
		      review_required_any: "社区所有者要求一名复审者复审此草稿。",
		      review_required_all: "社区所有者要求所有复审者复审此草稿。",
		      review_required_generic: "社区所有者要求这些复审者复审此草稿。",
		      review_additional_required: "草稿提交者添加的所有复审者都必须复审此草稿。",
		      reivew_submitted_date: {
		         DAY: "${user} 已在 ${EEEE} ${time} 提交草稿供复审。",
		         MONTH: "${user} 已在 ${MMM} ${d} 提交草稿供复审。",
		         TODAY: "${user} 已在今天 ${time} 提交草稿供复审。",
		         YEAR: "${user} 已在 ${YYYY} ${MMM} ${d} 提交草稿供复审。",
		         YESTERDAY: "${user} 已在昨天 ${time} 提交草稿供复审。",
		         TOMORROW: "${user} 已在 ${YYYY} ${MMM} ${d} 提交草稿供复审。"
		      },
		      pending: "待核准",
		      pending_rejected: "不再需要复审，因为草稿已被驳回",
		      approve: "核准",
		      approved: "已核准",
		      approve_tooltip: "核准此草稿",
		      accept_success: "您已核准此草稿。",
		      accept_error: "核准此草稿时出错。 请重试。",
		      accept_info: "您已核准此草稿。",
		      reject: "驳回",
		      rejected: "被驳回",
		      reject_tooltip: "驳回此草稿",
		      reject_success: "您已驳回此草稿。",
		      reject_error: "驳回此草稿时出错。 请重试。",
		      reject_info: "您驳回了此草稿。"
		   },
		   authUser: {
		      error: "检索当前用户时发生错误。  ${again}.",
		      error_again: "请重试",
		      error_404: "找不到已认证的用户。",
		      error_403: "您无权检索用户信息。"
		   },
		   forum: {
		      error: "发生错误。  ${again}.",
		      error_again: "请重试",
		      error_404: "此论坛不再存在，或者您没有足够的许可权来访问此论坛。",
		      error_403: "您没有查看此论坛的许可权。 此论坛不是公共论坛，而且并未与您共享。",
		      readMore: "查看完整主题...",
		      readMore_tooltip: "打开 ${name} 论坛主题。",
		      readMore_a11y: "激活此链接将在新窗口中打开 ${name} 论坛主题。",
		      QUESTION_ANSWERED: "此提问已得到回答。",
		      QUESTION_NOT_ANSWERED: "此提问尚未得到回答。",
		      attachments: "${count} 个附件",
		      attachments_one: "${count} 个附件"
		   },
		   blog: {
		      error: "发生错误。  ${again}.",
		      error_again: "请重试",
		      error_404: "此博客不再存在，或者您没有足够的许可权来访问此文件。",
		      error_403: "您无权查看此博客。此博客不是公共博客，而且并未与您共享。",
		      readMore: " 了解更多...",
		      readMore_tooltip: "请打开 ${name} 博客条目。",
		      readMore_a11y: "激活此链接将在新窗口中打开 ${name} 博客条目。",
		      graduated: "已采纳",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>得票</a>",
		  					TOOLTIP: 	"投票给此项"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>已投票</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>已投票</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>撤销</a>",
		  					TOOLTIP: 	"除去对此项的投票"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"共有 0 人投票给此项"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"共有 1 个人投票给此内容"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} 已投票给此内容"
		  				}
		  			},
		  			LOADING: "正在装入...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "已投票"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "我们无法保存您的投票，因为您已达到投票限制或该构想对您不再可用。",
		      readMore_tooltip: "请打开 ${name} 构想。",
		      readMore_a11y: "激活此链接将在新窗口中打开 ${name} 构想。"
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "回复",
		      THIS_ARIA_LABEL: "此回复",
		      THIS_TAB_TITLE: "此回复",
		      TAB_TITLE: "回复 (${0})",
		      REPLY_TO_REPLY: "回复 ${thisReply}",
		      REPLY_TO_TOPIC: "回复 ${thisTopic}",
		      THIS_TOPIC: "此主题",
		      THIS_REPLY: "此回复",
		      NAVIGATE_TO_REPLY: "浏览到父回复",
		      NAVIGATE_TO_TOPIC: "浏览到父主题",
		      ADD_COMMENT: "回复此主题",
		      ADD_COMMENT_TOOLTIP: "回复此论坛主题",
		      SHOWING_RECENT_REPLIES: "显示 ${0} 个最新回复",
		      PREV_COMMENTS: "显示更多回复",
		      PLACEHOLDER_TXT: "回复此主题",
		      EMPTY: "没有回复。",
		      TRIM_LONG_COMMENT: "是否要缩短回复？",
		      WARN_LONG_COMMENT: "回复太长。  ${shorten}",
		      ERROR: "检索回复时发生错误。 ${again}",
		      ERROR_CREATE: "您的回复无法保存。  请稍后重试。",
		      ERROR_CREATE_NOT_FOUND: "未能保存您的回复，这是因为主题已被删除或者不能再供查看。",
		      ERROR_CREATE_ACCESS_DENIED: "未能保存您的回复，这是因为主题已被删除或者不能再供查看。",
		      ERROR_CREATE_TIMEOUT: "未能保存您的回复，这是因为联系不到服务器。  请单击“保存”以重试。",
		      ERROR_CREATE_CANCEL: "未能保存您的回复，这是因为已取消请求。  请单击“保存”以重试。",
		      ERROR_CREATE_NOT_LOGGED_IN: "您必须登录才能创建此回复。  单击“保存”后，系统将提示您登录。",
		      ERROR_NO_CONTENT: "请输入您的回复，然后单击“保存”。如果不想发表回复，请单击“取消”。",
		      ERROR_UNAUTHORIZED: "无法保存回复，因为您无权回复。",
		      COMMENT_DELETED: {
		         DAY: "${user} 于${EEEE} ${time} 删除的回复",
		         MONTH: "${user} 于 ${MMM}/${d} 删除的回复",
		         TODAY: "${user} 于今天 ${time} 删除的回复",
		         YEAR: "${user} 于 ${YYYY}/${MMM}/${d} 删除的回复",
		         YESTERDAY: "${user} 于昨天 ${time} 删除的回复",
		         TOMORROW: "${user} 于 ${YYYY}/${MMM}/${d} 删除的回复"
		      },
		      REASON_FOR_DELETION: "删除原因：${reason}",
		      REPLY_TITLE: "回复：${0}",
		      SHOW_FULL_REPLY: "查看完整回复",
		      SHOW_FULL_REPLY_TOOLTIP: "浏览到论坛主题中的原始回复",
		      REPLY_ACTION: "回复",
		      REPLY_ACTION_TOOLTIP: "对此帖的回复",
		      MODERATION_PENDING: "此回复待审。",
		      MODERATION_QUARANTINED: "审核人已隔离该帖子。",
		      MODERATION_REMOVED: {
		         DAY: "此回复被 ${user} 于${EEEE} ${time} 除去。",
		         MONTH: "此回复被 ${user} 于 ${MMM}/${d} 除去。",
		         TODAY: "此回复被 ${user} 于今天 ${time} 除去。",
		         YEAR: "此回复被 ${user} 于 ${YYYY}/${MMM}/${d} 除去。",
		         YESTERDAY: "此回复被 ${user} 于昨天 ${time} 除去。",
		         TOMORROW: "此回复被 ${user} 于 ${YYYY}/${MMM}/${d} 除去。"
		      },
		      MODERATION_REJECTED: {
		         DAY: "此回复被 ${user} 于${EEEE} ${time} 驳回。",
		         MONTH: "此回复被 ${user} 于 ${MMM}/${d} 驳回。",
		         TODAY: "此回复被 ${user} 于今天 ${time} 驳回。",
		         YEAR: "此回复被 ${user} 于 ${YYYY}/${MMM}/${d} 驳回。",
		         YESTERDAY: "此回复被 ${user} 于昨天 ${time} 驳回。",
		         TOMORROW: "此回复被 ${user} 于 ${YYYY}/${MMM}/${d} 驳回。"
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "回复已提交复审，将在核准后可用。"
		   },
		   COMMENTS: {
		      ARIA_LABEL: "评论",
		      PLACEHOLDER_TXT: "添加评论",
		      TAB_TITLE: "评论 (${0})",
		      ACTION_NOT_SUPPORTED: "操作不受支持",
		      ADD_COMMENT: "添加评论",
		      ADD_COMMENT_TOOLTIP: "添加对此项的评论",
		      CANCEL: "取消",
		      COMMENT_COUNT_ONE: "${0} 条评论",
		      COMMENT_COUNT_MANY: "${0} 条评论",
		      COMMENT_LABEL: "评论：",
		      DELETE: "删除",
		      DELETE_TOOLTIP: "删除评论",
		      DELETEREASON: "删除此评论的理由：",
		      DIALOG_TITLE: "简化评论",
		      TOOLTIP: "简化评论",
		      NAME: "简化评论",
		      EDIT: "编辑",
		      EDIT_TOOLTIP: "编辑评论",
		      ERROR_CREATE: "您的评论无法保存。  请稍后重试。",
		      ERROR_CREATE_NOT_FOUND: "您的评论无法保存，因为项目已被删除或者不能再供您查看。",
		      ERROR_CREATE_ACCESS_DENIED: "您的评论无法保存，因为项目已被删除或者不能再供您查看。",
		      ERROR_CREATE_TIMEOUT: "您的评论无法保存，因为联系不到服务器。  请单击“发布”以重试。",
		      ERROR_CREATE_CANCEL: "未能保存您的评论，这是因为已取消请求。  请单击“发布”以重试。",
		      ERROR_CREATE_NOT_LOGGED_IN: "您必须登录才能创建此评论。  单击“发布”后，系统将提示您登录。",
		      ERROR_DELETE: "您的评论无法删除。  请稍后重试。",
		      ERROR_DELETE_TIMEOUT: "您的评论无法删除，因为联系不到服务器。  请单击“删除”以重试。",
		      ERROR_DELETE_NOT_FOUND: "您的评论无法删除，因为评论或项目已被删除或者不能再供您查看。",
		      ERROR_DELETE_ACCESS_DENIED: "您的评论无法删除，因为项目已被删除或者不能再供您查看。",
		      ERROR_DELETE_CANCEL: "未能删除您的评论，这是因为已取消请求。  请单击“删除”以重试。",
		      ERROR_DELETE_NOT_LOGGED_IN: "您必须登录才能删除此评论。  单击“删除”后，系统将提示您登录。",
		      ERROR_EDIT: "您的评论无法更新。  请稍后重试。",
		      ERROR_EDIT_ACCESS_DENIED: "您的评论无法更新，因为项目已被删除或者不能再供您查看。",
		      ERROR_EDIT_NOT_FOUND: "您的评论无法更新，因为项目已被删除或者不能再供您查看。",
		      ERROR_EDIT_TIMEOUT: "您的评论无法更新，因为联系不到服务器。  请单击“发布”以重试。",
		      ERROR_EDIT_CANCEL: "未能更新您的评论，这是因为已取消请求。  请单击“发布”以重试。",
		      ERROR_EDIT_NOT_LOGGED_IN: "您必须登录才能编辑此评论。  单击“发布”后，系统将提示您登录。",
		      ERROR_NO_CONTENT: "请输入您的评论并单击“发布”。  如果不想发表评论，请单击“取消”。",
		      ERROR_NO_CONTENT_EDIT: "请输入您的评论并单击“发布”。  如果不想编辑您的评论，请单击“取消”。",
		      ERROR_UNAUTHORIZED: "无法保存评论，因为您无权发表评论。",
		      ERROR_GENERAL: "发生错误。",
		      OK: "确定",
		      YES: "是",
		      TRIM_LONG_COMMENT: "是否简化评论？",
		      WARN_LONG_COMMENT: "评论太长。  ${shorten}",
		      LINK: "链接",
		      SAVE: "保存",
		      POST: "发布",
		      SHOWMORE: "了解更多...",
		      VIEW_COMMENTS_FILE: "查看关于此文件的评论",
		      SUBSCRIBE_TO_COMMENTS: "订阅这些评论",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "通过订阅源阅读器跟踪对这些评论的更改",
		      PROFILE_TITLE: "打开 ${user} 的个人档案。",
		      PROFILE_A11Y: "激活此链接将在新窗口中打开 ${user} 的个人档案。",
		      MODERATION_PENDING: "此评论待审。",
		      MODERATION_REMOVED: {
		         DAY: "此评论由 ${user} 于${EEEE} ${time} 除去。",
		         MONTH: "此评论由 ${user} 于 ${MMM}/${d} 除去。",
		         TODAY: "此评论由 ${user} 于今天 ${time} 除去。",
		         YEAR: "此评论由 ${user} 于 ${YYYY}/${MMM}/${d} 除去。",
		         YESTERDAY: "此评论由 ${user} 于昨天 ${time} 除去。",
		         TOMORROW: "此评论由 ${user} 于 ${YYYY}/${MMM}/${d} 除去。"
		      },
		      MODERATION_REJECTED: {
		         DAY: "此评论由 ${user} 于${EEEE} ${time} 驳回。",
		         MONTH: "此评论由 ${user} 于 ${MMM}/${d} 驳回。",
		         TODAY: "此评论由 ${user} 于今天 ${time} 驳回。",
		         YEAR: "此评论由 ${user} 于 ${YYYY}/${MMM}/${d} 驳回。",
		         YESTERDAY: "此评论由 ${user} 于昨天 ${time} 驳回。",
		         TOMORROW: "此评论由 ${user} 于 ${YYYY}/${MMM}/${d} 驳回。"
		      },
		      PREV_COMMENTS: "显示先前的评论",
		      EMPTY: "没有评论。",
		      ERROR_ALT: "错误",
		      ERROR: "检索评论时发生错误。${again}",
		      ERROR_ADDTL: "检索更多评论时发生错误。${again}",
		      ERROR_AGAIN: "请重试。",
		      ERROR_AGAIN_TITLE: "请重试请求以获取更多评论。",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} ${time}（版本 ${version}）",
		         MONTH: "${user} ${MMM} ${d}（版本 ${version}）",
		         TODAY: "${user} 于今天 ${time}（版本 ${version}）",
		         YEAR: "${user} ${YYYY}/${MMM}/${d}（版本 ${version}）",
		         YESTERDAY: "${user} 于昨天 ${time}（版本 ${version}）",
		         TOMORROW: "${user} ${YYYY}/${MMM}/${d}（版本 ${version}）"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} 于今天 ${time}",
		         YEAR: "${user} ${MMM} ${d}，${YYYY}",
		         YESTERDAY: "${user} 于昨天 ${time}",
		         TOMORROW: "${user} ${MMM} ${d}，${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} ${time}",
		         MONTH: "${MMM} ${d} 日",
		         TODAY: "今天 ${time}",
		         YEAR: "${YYYY} 年 ${MMM} ${d} 日",
		         YESTERDAY: "昨天 ${time}",
		         TOMORROW: "${YYYY} 年 ${MMM} ${d} 日"
		      },
		      COMMENT_DELETED: {
		         DAY: "${user} 于${EEEE} ${time} 删除的评论",
		         MONTH: "${user} 于 ${MMM}/${d} 删除的评论",
		         TODAY: "${user} 于今天 ${time} 删除的评论",
		         YEAR: "${user} 于 ${YYYY}/${MMM}/${d} 删除的评论",
		         YESTERDAY: "${user} 于昨天 ${time} 删除的评论",
		         TOMORROW: "${user} 于 ${YYYY}/${MMM}/${d} 删除的评论"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} 于${EEEE} ${time} 编辑（版本 ${version}）",
		         MONTH: "由 ${user} 于 ${MMM}/${d} 编辑（版本 ${version}）",
		         TODAY: "${user} 于今天 ${time} 编辑（版本 ${version}）",
		         YEAR: "${user} 于 ${YYYY}/${MMM}/${d} 编辑（版本 ${version}）",
		         YESTERDAY: "${user} 于昨天 ${time} 编辑（版本 ${version}）",
		         TOMORROW: "${user} 于 ${YYYY}/${MMM}/${d} 编辑（版本 ${version}）"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "由 ${user} 于${EEEE} ${time} 编辑",
		         MONTH: "由 ${user} 于 ${MMM}/${d} 编辑",
		         TODAY: "由 ${user} 于今天 ${time} 编辑",
		         YEAR: "由 ${user} 于 ${YYYY}/${MMM}/${d} 编辑",
		         YESTERDAY: "由 ${user} 于昨天 ${time} 编辑",
		         TOMORROW: "由 ${user} 于 ${YYYY}/${MMM}/${d} 编辑"
		      },
		      DELETE_CONFIRM: "确定要删除此评论吗？",
		      FLAG_ITEM: {
		         BUSY: "正在保存...",
		         CANCEL: "取消",
		         ACTION: "举报为不当",
		         DESCRIPTION_LABEL: "提供举报此项的原因（可选）",
		         EDITERROR: "由于发生错误，未编辑文件的元数据。",
		         OK: "保存",
		         ERROR_SAVING: "处理请求时出错。 请稍后重试。",
		         SUCCESS_SAVING: "已提交您的举报。 审核人将立即进行审核。",
		         TITLE: "将此项举报为不当",
		         COMMENT: {
		            TITLE: "将此评论举报为不当",
		            A11Y: "此按钮将打开一个对话框，该对话框允许用户将此评论举报为不当。"
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "取消",
		      DIALOG_TITLE: "删除评论",
		      NAME: "删除评论",
		      OK: "确定",
		      TOOLTIP: "删除评论"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "取消",
		      CONFIRM: "简化操作将除去超出评论限制的文本。  单击“确定”以简化，或单击“取消”自行编辑评论。",
		      DIALOG_TITLE: "简化评论",
		      NAME: "简化评论",
		      OK: "确定",
		      TOOLTIP: "简化评论"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "提交确认",
		      CONFIRM: "评论已提交复审，并且它将在核准后可用。",
		      OK: "确定"
		   },
		   DATE: {
		      AM: "上午",
		      FULL: "${EEEE}，${date_long} ${time_long}",
		      PM: "下午",
		      TODAY: "今天",
		      TODAY_U: "今天",
		      YESTERDAY: "昨天",
		      YESTERDAY_U: "昨天",
		      ADDED: { DAY: "添加时间为${EEee} ${time}",
		         FULL: "${EEEE}，${date_long} ${time_long}",
		         MONTH: "添加时间为 ${date_long}",
		         TODAY: "添加时间为今天 ${time}",
		         YEAR: "添加时间为 ${date_long}",
		         YESTERDAY: "添加时间为昨天 ${time}"
		      },
		      LAST_UPDATED: { DAY: "最近一次更新时间为${EEee} ${time}",
		         FULL: "${EEEE}，${date_long} ${time_long}",
		         MONTH: "最近一次更新时间为 ${date_long}",
		         TODAY: "最近一次更新时间为今天 ${time}",
		         YEAR: "最近一次更新时间为 ${date_long}",
		         YESTERDAY: "最近一次更新时间为昨天 ${time}"
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
		         FULL: "${EEEE}，${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "今天",
		         YEAR: "${date_short}",
		         YESTERDAY: "昨天",
		         TOMORROW: "明天"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} ${time}",
		         FULL: "${EEEE}，${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "今天 ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "昨天 ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} ${time}",
		         FULL: "${EEEE}，${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "今天 ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "昨天 ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} ${time}",
		         FULL: "${EEEE}，${date_long} ${time_long}",
		         MONTH: "${date_short} ${time}",
		         TODAY: "${date_short} ${time}",
		         YEAR: "${date_short} ${time}",
		         YESTERDAY: "${date_short} ${time}",
		         TOMORROW: "${date_short} ${time}"
		      },
		      DATE_ONLY: { DAY: "${date_short}",
		         FULL: "${EEEE}，${date_long}",
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
		      UPDATED: { DAY: "更新于${EEee} ${time}",
		         FULL: "${EEEE}，${date_long} ${time_long}",
		         MONTH: "更新于 ${date_long}",
		         TODAY: "更新于今天 ${time}",
		         YEAR: "更新于 ${date_long}",
		         YESTERDAY: "更新于昨天 ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "无法装入版本信息。",
		      ERROR_REQUEST_CANCELLED: "已取消请求。",
		      ERROR_REQUEST_TIMEOUT: "联系不到服务器。",
		      ERROR_REQUEST_UNKNOWN: "发生未知错误。",
		      LOADING: "正在装入..",
		      NO_VERSIONS: "没有版本",
		      INFO: "版本 ${0}，创建时间为 ${1}，创建者 ",
		      VERSION_NUMBER: "版本 ${0}",
		      DELETED: "删除日期",
		      DELETE_ALL: "删除此版本之前的所有版本",
		      DELETE_VERSION_SINGLE: "删除版本 ${0}",
		      DELETEERROR: "由于发生错误，导致未删除版本。",
		      CREATE_VERSION: "创建新版本",
		      CREATE_VERSION_TOOLTIP: "创建此文件的版本",
		      REVERT_VERSION: "恢复版本 ${0}",
		      REVERT_DESCRIPTION: "已从版本 ${0} 恢复",
		      PREVIOUS: "上一页",
		      PREVIOUS_TOOLTIP: "上一页",
		      ELLIPSIS: "...",
		      NEXT: "下一页",
		      NEXT_TOOLTIP: "下一页",
		      COUNT: "第 ${0} - ${1} 个（共 ${2} 个）",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "页面",
		      SHOW: "显示",
		      ITEMS_PER_PAGE: " 项/页。",
		      DATE: {
		        AM: "上午",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "今天 ${time}",
		            YESTERDAY: "昨天 ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} ${time}",
		            YEAR: "${date_short} ${time}",
		            FULL: "${EEEE}，${date_long} ${time_long}",
		            MONTH: "${date_short} ${time}",
		            TODAY: "今天 ${time}",
		            YESTERDAY: "昨天 ${time}"
		        },
		        UPDATED: { DAY: "更新于${EEee} ${time}",
		            YEAR: "更新于 ${date_short}",
		            FULL: "${EEEE}，${date_long} ${time_long}",
		            MONTH: "更新于 ${date_short}",
		            TODAY: "更新于今天 ${time}",
		            YESTERDAY: "更新于昨天 ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "删除版本 ${0}",
		         DOWNLOAD: "下载",
		         DOWNLOAD_TOOLTIP: "下载此版本 (${0})",
		         VIEW: "查看",
		         VIEW_TOOLTIP: "查看版本 ${0}",
		         REVERT: {
		            A11Y: "此按钮将打开一个对话框，该对话框允许用户确认从上一版本复原文件。 确认此操作将刷新页面上的内容。",
		            FULL: "恢复",
		            WIDGET: "恢复此版本"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "无法删除该版本，因为该版本已删除或不再对您可视。",
		         ERROR_ACCESS_DENIED: "无法删除该版本，因为您不是编辑者。",
		         ERROR_TIMEOUT: "无法删除该版本，因为联系不到服务器。  请再次单击“删除”以重试请求。",
		         ERROR_CANCEL: "未删除该版本，因为已取消请求。  请再次单击“删除”以重试请求。",
		         ERROR_NOT_LOGGED_IN: "您必须登录才能删除此版本。  单击“删除”后，系统将提示您登录。",
		         GENERIC_ERROR: "由于发生未知错误，无法删除该版本。  请再次单击“删除”以重试请求。",
		         FULL: "删除",
		         A11Y: "此按钮将打开一个对话框，该对话框允许用户确认删除此版本。 确认此操作将刷新页面上的内容。"
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "无法恢复版本，因为它已被删除或者不能再供您查看。",
		         ERROR_ACCESS_DENIED: "无法复原版本，因为您不是编辑者。",
		         ERROR_NAME_EXISTS: "无法恢复版本，因为另一文件与其具有相同的名称。",
		         ERROR_TIMEOUT: "未恢复版本，因为联系不到服务器。  请再次单击“恢复”以重试请求。",
		         ERROR_CANCEL: "未复原版本，因为已取消请求。  请再次单击“恢复”以重试请求。",
		         ERROR_QUOTA_VIOLATION: "无法恢复版本，因为已达到空间限制。",
		         ERROR_MAX_CONTENT_SIZE: "无法恢复版本，因为该版本大于允许的最大文件大小 ${0}",
		         GENERIC_ERROR: "由于发生未知错误，无法恢复版本。  请再次单击“恢复”以重试请求。"
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "查看下载者...",
		      PREVIOUS: "上一页",
		      PREVIOUS_TOOLTIP: "上一页",
		      ELLIPSIS: "...",
		      NEXT: "下一页",
		      NEXT_TOOLTIP: "下一页",
		      COUNT: "第 ${0} - ${1} 个（共 ${2} 个）",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "页面",
		      SHOW: "显示",
		      ITEMS_PER_PAGE: " 项/页。",
		      VERSION: {
		         DAY: "版本 ${version} 日期 ${date}",
		         MONTH: "版本 ${version} 日期 ${date}",
		         TODAY: "版本 ${version} 时间 ${time}",
		         YEAR: "版本 ${version} 日期 ${date}",
		         YESTERDAY: "版本 ${version} 昨天"
		      },
		      FILE: {
		         V_LATEST: "您已下载此文件的最新版本",
		         V_OLDER: "您上次下载的是此文件的版本 ${0}",
		         LOADING: "正在装入...",
		         EMPTY: "仅限匿名用户",
		         ERROR: "无法装入下载信息"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "错误",
		      ERROR_ALT_TEXT: "错误：",
		      ERROR_MSG_GENERIC: "某些内容出错。  请重试。",
		      ERROR_MSG_NOT_AVAILABLE: "已删除此项或此项不再可用。",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "此项的内容不可用。",
		      ERROR_MSG_NO_ACCESS: "您已没有对此项的访问权。",
		      LOADING: "正在装入...",
		      TITLE_SU: "${author} 发布了一条消息。",
		      TITLE_NI: "${author} 邀请您加入其网络。",
		      AUTHOR_TITLE: "查看 ${author} 的个人档案",
		      OPEN_LINK: "打开 ${title}",
		      CONFIRM_CLOSE_TITLE: "确认",
		      CONFIRM_CLOSE_MESSAGE: "确定要放弃更改吗？ 请按“确定”继续，或者按“取消”返回",
		      OK: "确定",
		      CANCEL: "取消"
		   },
		   MESSAGE: {
		      SUCCESS: "确认",
		      ERROR: "错误",
		      ERROR_ALT_TEXT: "错误：",
		      INFO: "信息",
		      WARNING: "警告",
		      DISMISS: "隐藏此消息",
		      MORE_DETAILS: "更多详细信息",
		      HIDE_DETAILS: "隐藏详细信息"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "创建时间：${EEEE} ${time}",
		           MONTH: "创建时间：${MMM}/${d}",
		           TODAY: "创建时间：今天 ${time}",
		           YEAR: "创建时间：${YYYY}/${MMM}/${d}",
		           YESTERDAY: "创建时间：昨天 ${time}",
		           TOMORROW: "创建时间：${YYYY}/${MMM}/${d}"
		       },
		      error: "发生错误。  ${again}.",
		      error_again: "请重试",
		      error_404: "状态更新不再存在。",
		      notifications: {
		         STATUS_UPDATE: "${user} 发布了一条消息",
		         USER_BOARD_POST: "${user} 在您的公告板上撰写了内容",
		         POST_COMMENT: "${user} 撰写了："
		      }
		   },
		   login: {
		      error: "您的用户名和/或密码与任何现有的帐户都不匹配。 请重试。",
		      logIn: "登录",
		      password: "密码：",
		      user: "用户名：",
		      welcome: "登录 HCL Connections"
		   },
		   repost: {
		      name: "转发",
		      title: "向我的关注者或社区转发此更新",
		      msg_success: "已成功向您的关注者转发更新。",
		      msg_generic: "某些内容出错。  请重试。"
		   },
		   FILE_SHARE_INFO: {
		      ADD: "加",
		      ADD_TXT: "将人员或社区添加为读者",
		      SHOW_MORE: "显示更多...",
		      READER_IF_PUBLIC: "所有人（公共）",
		      READER_IF_PUBLIC_TOOLTIP: "此文件对所有人公开并且可供所有人查看。",
		      EMPTY_READERS: "无",
		      READERS_LABEL: "读者：\u00a0",
		      EDITORS_LABEL: "编辑者：\u00a0",
		      OWNER_LABEL: "所有者：\u00a0",
		      ERROR: "无法装入共享信息",
		      ERROR_NOT_FOUND: "您请求的文件已删除或移动。 如果此链接是他人发送给您的，请检查是否正确。",
		      ERROR_ACCESS_DENIED: "您无权查看此文件。  此文件不是公共文件，而且并未与您共享。",
		      SHARE: "共享",
		      CANCEL: "取消",
		      SHARE_WITH: "共享对象：",
		      PERSON: "人员",
		      COMMUNITY: "社区",
		      PLACEHOLDER: "人员姓名或电子邮件...",
		      MESSAGE: "消息：",
		      MESSAGE_TXT: "添加可选消息",
		      REMOVE_ITEM_ALT: "除去 ${0}",
		      NO_MEMBERS: "无",
		      A11Y_READER_ADDED: "已将 ${0} 选为读者",
		      A11Y_READER_REMOVED: "已将 ${0} 作为读者除去",
		      SELF_REFERENCE_ERROR: "您不能与自己共享",
		      OWNER_REFERENCE_ERROR: "您无法与文件所有者共享。",
		      SHARE_COMMUNITY_WARN: "与公共社区“${0}”共享将使此文件成为公共文件。",
		      SELECT_USER_ERROR: "您必须选择至少一个人或一个社区作为共享对象",
		      WARN_LONG_MESSAGE: "消息太长。",
		      TRIM_LONG_MESSAGE: "是否简化消息？",
		      ERROR_SHARING: "无法共享文件。  请稍后重试。",
		      INFO_SUCCESS: "已成功共享文件。",
		      MAX_SHARES_ERROR: "已超出最大共享数。",
		      NOT_LOGGED_IN_ERROR: "未共享文件，因为您尚未登录。  请单击“共享”以共享文件。",
		      TIMEOUT_ERROR: "未共享文件，因为联系不到服务器。  请单击“共享”以重试。",
		      CANCEL_ERROR: "未共享文件，因为已取消请求。  请单击“共享”以重试。",
		      NOT_FOUND_ERROR: "文件已被删除或者不能再供您查看，因此无法共享。",
		      ACCESS_DENIED_ERROR: "您已没有共享此文件的许可权。",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "受限文件不可公开。",
		      TOOLTIP: "授权他人访问此文件"
		   },
		   HISTORY: {
		      TAB_TITLE: "最近更新",
		      NO_HISTORY: "最近没有更新。",
		      EMPTY: "无法检索到此项的最近更新。 该项已被删除，或者您不再有权对其进行访问。",
		      MORE: "显示先前的更新",
		      ERROR_ALT: "错误",
		      ERROR: "检索更新时发生错误。${again}",
		      ERROR_ADDTL: "检索更多更新时发生错误。${again}",
		      ERROR_AGAIN: "请重试。",
		      ERROR_AGAIN_TITLE: "请重试请求以获取更多更新。",
		      PROFILE_TITLE: "打开 ${user} 的个人档案。",
		      SORT_BY: "排序依据：",
		      SORTS: {
		         DATE: "日期",
		         DATE_TOOLTIP: "按照最新历史记录到最旧更新进行排序",
		         DATE_TOOLTIP_REVERSE: "按照最旧历史记录到最新更新进行排序"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} ${time}",
		             MONTH: "${MMM} ${d} 日",
		             TODAY: "今天 ${time}",
		             YEAR: "${YYYY} 年 ${MMM} ${d} 日",
		             YESTERDAY: "昨天 ${time}",
		             TOMORROW: "${YYYY} 年 ${MMM} ${d} 日"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "此评论",
			   REPLY_ACTION: "回复",
		       REPLY_ACTION_TOOLTIP: "回复此评论"
		   },
		   OAUTH: {
		      welcomeHeader: "欢迎使用 Connections",
		      continueBtnLabel: "继续",
		      continueBtnA11y: "激活此链接将打开一个新的窗口，在此窗口中您可以授予对 Connections 的访问权。",
		      clickHere: "单击此处",
		      infoMsg: "Connections 需要您的授权来访问您的数据。",
		      authorizeGadget: "${clickHere}以授权此应用程序访问您的 Connections 信息。",
		      confirmAuthorization: "${clickHere}以确认您已授权此应用程序访问您的 Connections 信息。"
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "激活此链接将打开一个新的窗口，在此窗口中您可以授予对 Connections Library 存储库的访问权。",
		      infoMsg: "Connections Library 存储库需要您的授权来访问您的数据。",
		      authorizeGadget: "${clickHere} 以授权此应用程序访问您的 Connections Library 存储库信息。",
		      confirmAuthorization: "${clickHere} 以确认您已授权此应用程序访问您的 Connections Library 存储库信息。"
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "取消",
		      CONFIRM: "确定要放弃更改吗？  请按“确定”继续，或者按“取消”返回。",
		      DIALOG_TITLE: "确认",
		      NAME: "确认",
		      OK: "确定",
		      TOOLTIP: "确认"
		   }
});

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
         label: "其他",
         tooltip: "其他動作"
       },
       tags_more: "再多 ${0} 個",
       ERROR_ALT: "錯誤",
       PERSON_TITLE: "開啟 ${user} 的人員資訊。",
       inactiveUser: "${user}（非作用中）",
       inactiveIndicator: "(非作用中)",
       like_error: "無法儲存您的按讚項目。請稍後重試。",
       vote_error: "無法儲存您的投票。 請稍後重試。"
   },
   generic: {
      untitled: "(未命名)",
      tags: "標籤：",
      tags_more: "再多 ${0} 個",
      likes: "按讚數",
      comments: "評論",
      titleTooltip: "導覽至 ${app}",
      error: "無法擷取資料。",
      timestamp: {
         created: {
            DAY: "於${EEEE} ${time} 建立",
            MONTH: "於 ${MMM} ${d} 建立",
            TODAY: "已於今天 ${time} 建立",
            YEAR: "於 ${YYYY} ${MMM} ${d} 建立",
            YESTERDAY: "已於昨天 ${time} 建立",
            TOMORROW: "於 ${YYYY} ${MMM} ${d} 建立"
         },
         updated: {
            DAY: "更新於${EEEE} ${time}",
            MONTH: "於 ${MMM} ${d} 更新",
            TODAY: "已於今天 ${time} 更新",
            YEAR: "更新於 ${YYYY} ${MMM} ${d}",
            YESTERDAY: "已於昨天 ${time} 更新",
            TOMORROW: "更新於 ${YYYY} ${MMM} ${d}"
         }
      },
      visibility: {
         pub: "公用",
         priv: "專用"
      },
      action: {
         created: "建立日期",
         updated: "更新日期"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "在首頁和電子郵件摘要中接收您追蹤的人員的相關更新。",
      profile_title: "開啟 ${user} 的人員資訊。",
      profile_a11y: "啟動此鏈結會在新視窗中開啟 ${user} 的人員資訊。",
      error: "發生錯誤。  ${again}.",
      error_again: "請重試",
      error_404: "網路要求已不再存在。",
      warning: "警告",
      messages: {
         success: {
            accept: {
            	nofollow: "您現在已是網路聯絡人。",
            	follow: "您現在已是網路聯絡人並追蹤 ${user}。"
            },
            ignore: {
            	nofollow: "您已忽略邀請。",
            	follow: "您已忽略邀請，但現在正在追蹤 ${user}。"
            }
         },
         error: {
            accept: "接受要求時發生錯誤。",
            ignore: "忽略要求時發生錯誤。"
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} 於 ${time}",
              MONTH: "${MMM} ${d} 日",
              TODAY: "今天 ${time}",
              YEAR: "${YYYY} 年 ${MMM} ${d} 日",
              YESTERDAY: "昨天 ${time}",
              TOMORROW: "${YYYY} 年 ${MMM} ${d} 日"
           }
      }
   },
   file: {
      a11y_help: "啟動此鏈結會在新視窗中開啟 ${name}。",
      tooltip: "在「檔案」應用程式中開啟 ${name}",
      profile_title: "開啟 ${user} 的人員資訊。",
      profile_a11y: "啟動此鏈結會在新視窗中開啟 ${user} 的人員資訊。",
      download_tooltip: "下載此檔案 (${0})",
      following: {
         add: "追蹤檔案",
         remove: "停止追蹤",
         title: "切換您是否將接收此檔案的相關更新"
      },
      share: {
         label: "共用",
         title: "授予他人對此檔案的存取權"
      },
      timestamp: {
         created: {
            DAY: "於${EEEE} ${time} 建立",
            MONTH: "於 ${MMM} ${d} 建立",
            TODAY: "已於今天 ${time} 建立",
            YEAR: "於 ${YYYY} ${MMM} ${d} 建立",
            YESTERDAY: "已於昨天 ${time} 建立",
            TOMORROW: "於 ${YYYY} ${MMM} ${d} 建立"
         },
         createdOther: {
            DAY: "${user} 於${EEEE} ${time} 建立",
            MONTH: "${user} 於 ${MMM} ${d} 建立",
            TODAY: "${user} 於今天 ${time} 建立",
            YEAR: "${user} 於 ${YYYY} ${MMM} ${d} 建立",
            YESTERDAY: "${user} 於昨天 ${time} 建立",
            TOMORROW: "${user} 於 ${YYYY} ${MMM} ${d} 建立"
         },
         updated: {
            DAY: "更新於${EEEE} ${time}",
            MONTH: "於 ${MMM} ${d} 更新",
            TODAY: "已於今天 ${time} 更新",
            YEAR: "更新於 ${YYYY} ${MMM} ${d}",
            YESTERDAY: "已於昨天 ${time} 更新",
            TOMORROW: "更新於 ${YYYY} ${MMM} ${d}"
         },
         updatedOther: {
            DAY: "${user} 於${EEEE} ${time} 更新",
            MONTH: "${user} 於 ${MMM} ${d} 更新",
            TODAY: "${user} 於今天 ${time} 更新",
            YEAR: "${user} 於 ${YYYY} ${MMM} ${d} 更新",
            YESTERDAY: "${user} 於昨天 ${time} 更新",
            TOMORROW: "${user} 於 ${YYYY} ${MMM} ${d} 更新"
         },
         createdCompact: {
            DAY: "建立：${EEEE} 於 ${time}",
            MONTH: "建立：${MMM} ${d}",
            TODAY: "建立：於今天 ${time}",
            YEAR: "建立：${YYYY} ${MMM} ${d}",
            YESTERDAY: "建立：於昨天 ${time}",
            TOMORROW: "建立：${YYYY} ${MMM} ${d}"
         },
         updatedCompact: {
            DAY: "更新：${EEEE} 於 ${time}",
            MONTH: "更新：${MMM} ${d}",
            TODAY: "更新：於今天 ${time}",
            YEAR: "更新：${YYYY} ${MMM} ${d}",
            YESTERDAY: "更新：於昨天 ${time}",
            TOMORROW: "更新：${YYYY} ${MMM} ${d}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "由 ${user} 於 ${date_long} ${time_long}",
         UPDATE_TIMESTAMP: "由 ${user} 於 ${date_long} ${time_long}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "下載此檔案 (${size})",
      	 DOWNLOAD_ALT: "下載"
      },

      PREVIEW: {
         LINK: "預覽",
         TITLE: "在新視窗中預覽此檔案。"
      },
      TAGS: "標籤：",
      error: "發生錯誤。  ${again}.",
      error_again: "請重試",
      error_404: "檔案已不再存在，或者您沒有足夠的許可權對其進行存取。",
      error_403: "您沒有檢視此檔案的權限。 該檔案並非公用，且未與您共用。",
      notifications: {
         USER_SHARED: "${user} 寫入：",
         CHANGE_SUMMARY: "${user} 提供了變更摘要",
         NO_CHANGE_SUMMARY: "${user} 未提供變更摘要",
         COMMENTED: "${user} 已評論"
      }
   },
   ecm_file: {
      checkedout_you: "由您移出",
      checkedout_other: "由 ${user} 移出",
      tooltip: "在檔案庫開啟 ${name} 檔案",
      draft_404_info: "草稿已刪除或不再與您共用。 發佈的版本現在是此檔案的最新版本。",
      error_404: "檔案已刪除或不再與您共用。",
      error_403: "檔案已刪除或不再與您共用。",
      error_preview: "檔案不再供預覽。",
      draft_review_canceled: "已取消檢閱且不再與您共用該草稿。 不再需要您的檢閱。",
      switch_ee: "檢視草稿",
      switch_ee_tooltip: "檢視此檔案的最新草稿"
   },
   ecm_draft: {
      tooltip: "在檔案庫開啟 ${name} 草稿",
      community_owners: "社群擁有者",
      draft: "草稿",
      draft_tooltip: "檢視草稿",
      draft_general_info: "前一個草稿不再存在，而較新的草稿現在是最新版本。",
      draft_review_404_general_info: "其中一位檢閱人員已投票。 您不再需要檢閱此草稿。",
      draft_review_404_request_info: "前一個草稿不再存在，而最新的草稿已提交供檢閱。 需要您的檢閱。",
      draft_review_404_require_info: "前一個草稿不再存在，而最新的草稿已提交供檢閱。 需要您的檢閱。",
      draft_review_request_info: "需要您的檢閱。",
      draft_review_require_info: "需要您的檢閱。",
      error_404: "草稿已刪除或不再與您共用。",
      error_403: "您無法檢視此草稿，因為它不再與您共用。",
      error_preview: "草稿不再供預覽。",
      switch_ee: "檢視已發佈版本",
      switch_ee_tooltip: "檢視此檔案的已發佈版本",
      review: "檢閱",
      reviewers: "檢閱人員",
      reviwers_addtl: "其他檢閱人員",
      in_review: "檢閱中的草稿",
      in_review_tooltip: "檢視檢閱中的草稿",
      review_required_any: "社群擁有者要求一位檢閱人員檢閱此草稿。",
      review_required_all: "社群擁有者要求所有檢閱人員檢閱此草稿。",
      review_required_generic: "社群擁有者要求這些檢閱人員檢閱此草稿。",
      review_additional_required: "要求草稿提交者新增的所有檢閱人員檢閱此草稿。",
      reivew_submitted_date: {
         DAY: "${user} 已於 ${EEEE} ${time} 提交草稿以供檢閱。",
         MONTH: "${user} 已於 ${MMM} ${d} 提交草稿以供檢閱。",
         TODAY: "${user} 已於今天 ${time} 提交草稿以供檢閱。",
         YEAR: "${user} 已於 ${YYYY} ${MMM} ${d} 提交草稿以供檢閱。",
         YESTERDAY: "${user} 已於昨天 ${time} 提交草稿以供檢閱。",
         TOMORROW: "${user} 已於 ${YYYY} ${MMM} ${d} 提交草稿以供檢閱。"
      },
      pending: "擱置",
      pending_rejected: "因為已拒絕草稿，所以不再需要檢閱。",
      approve: "核准",
      approved: "已核准",
      approve_tooltip: "核准此草稿",
      accept_success: "您已核准此草稿。",
      accept_error: "核准此草稿時發生錯誤。 請重試。",
      accept_info: "您已核准此草稿。",
      reject: "拒絕",
      rejected: "已拒絕",
      reject_tooltip: "拒絕此草稿",
      reject_success: "您已拒絕此草稿。",
      reject_error: "拒絕此草稿時發生錯誤。 請重試。",
      reject_info: "您已拒絕此草稿。"
   },
   authUser: {
      error: "擷取現行使用者時發生錯誤。  ${again}.",
      error_again: "請重試",
      error_404: "找不到已鑑別使用者。",
      error_403: "您沒有權限可擷取使用者資訊。"
   },
   forum: {
      error: "發生錯誤。  ${again}.",
      error_again: "請重試",
      error_404: "討論區已不再存在，或者您沒有足夠的許可權對其進行存取。",
      error_403: "您沒有檢視此討論區的權限。 該討論區非公用，且未與您共用。",

      readMore: "檢視完整主題...",
      readMore_tooltip: "開啟 ${name} 討論區主題。",
      readMore_a11y: "啟動此鏈結會在新視窗中開啟 ${name} 討論區主題。",
      QUESTION_ANSWERED: "此問題已得到回答。",
      QUESTION_NOT_ANSWERED: "此問題尚未得到回答。",

      attachments: "${count} 個附件",
      attachments_one: "${count} 個附件"
   },
   blog: {
      error: "發生錯誤。  ${again}.",
      error_again: "請重試",
      error_404: "部落格已不再存在，或者您沒有足夠的許可權對其進行存取。",
      error_403: "您沒有檢視此部落格的許可權。該部落格不是公用檔案，且未與您共用。",
      readMore: " 閱讀更多...",
      readMore_tooltip: "開啟 ${name} 部落格文章。",
      readMore_a11y: "啟動此鏈結會在新視窗中開啟 ${name} 部落格文章。",
      graduated: "已提升",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>投票</a>",
  					TOOLTIP: 	"對此項投票"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>已投票</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>已投票</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>復原</a>",
  					TOOLTIP: 	"移除您對此項的投票"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 個人對此進行投票"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"已有 1 個人對此進行投票"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"已有 ${recommendCount} 個人對此進行投票"
  				}
  			},
  			LOADING: "載入中...",
  			TEMPLATE_STRINGS: {
  				LIKES: "已投票"
  			}
  		}
   },
   idea: {
	  error_404: "我們無法儲存您的投票，因為您已達到投票限制或您不再能夠使用該構想。",
      readMore_tooltip: "開啟 ${name} 構想。",
      readMore_a11y: "啟動此鏈結會在新視窗中開啟 ${name} 構想。"
   },
   size: {
      B: "${0} B",
      KB: "${0} KB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "回覆",
      THIS_ARIA_LABEL: "這個回覆",
      THIS_TAB_TITLE: "這個回覆",
      TAB_TITLE: "回覆 (${0})",
      REPLY_TO_REPLY: "回應 ${thisReply}",
      REPLY_TO_TOPIC: "回應 ${thisTopic}",
      THIS_TOPIC: "此主題",
      THIS_REPLY: "此回覆",
      NAVIGATE_TO_REPLY: "導覽至上層回覆",
      NAVIGATE_TO_TOPIC: "導覽至上層主題",
      ADD_COMMENT: "回覆此主題",
      ADD_COMMENT_TOOLTIP: "回覆此討論區主題",
      SHOWING_RECENT_REPLIES: "顯示 ${0} 個最近回覆",
      PREV_COMMENTS: "顯示更多回覆",
      PLACEHOLDER_TXT: "回覆此主題",
      EMPTY: "沒有任何回覆。",
      TRIM_LONG_COMMENT: "要縮短回覆嗎？",
      WARN_LONG_COMMENT: "回覆太長。  ${shorten}",
      ERROR: "擷取回覆時發生錯誤。 ${again}",
      ERROR_CREATE: "無法儲存您的回覆。  請稍後重試。",
      ERROR_CREATE_NOT_FOUND: "因為主題已刪除或您不再看得到該主題，所以無法儲存您的回覆。",
      ERROR_CREATE_ACCESS_DENIED: "因為主題已刪除或您不再看得到該主題，所以無法儲存您的回覆。",
      ERROR_CREATE_TIMEOUT: "因為無法聯絡伺服器，所以無法儲存您的回覆。  請按一下「儲存」以重試。",
      ERROR_CREATE_CANCEL: "因為已取消要求，所以無法儲存您的回覆。  請按一下「儲存」以重試。",
      ERROR_CREATE_NOT_LOGGED_IN: "您必須登入以建立此回覆。  請按一下「儲存」，系統會提示您登入。",
      ERROR_NO_CONTENT: "請輸入回覆，然後按一下「儲存」。  如果您不想再留下回覆，請按一下「取消」。",
      ERROR_UNAUTHORIZED: "因為您未獲授權來留下回覆，所以無法儲存您的回覆。",
      COMMENT_DELETED: {
         DAY: "回覆由 ${user} 於 ${EEEE} ${time} 刪除",
         MONTH: "回覆由 ${user} 於 ${MMM} ${d} 刪除",
         TODAY: "回覆由 ${user} 於今天 ${time} 刪除",
         YEAR: "回覆由 ${user} 於 ${YYYY} ${MMM} ${d} 刪除",
         YESTERDAY: "回覆由 ${user} 於昨天 ${time} 刪除",
         TOMORROW: "回覆由 ${user} 於 ${YYYY} ${MMM} ${d} 刪除"
      },
      REASON_FOR_DELETION: "刪除的原因：${reason}",
      REPLY_TITLE: "回覆：${0}",
      SHOW_FULL_REPLY: "檢視完整回覆",
      SHOW_FULL_REPLY_TOOLTIP: "導覽至討論區主題中的原始回覆",
      REPLY_ACTION: "回覆",
      REPLY_ACTION_TOOLTIP: "回覆這篇文章",
      MODERATION_PENDING: "此回覆目前處於擱置狀態，以待檢閱。",
      MODERATION_QUARANTINED: "此公佈已被主持人隔離。",
      MODERATION_REMOVED: {
         DAY: "此回覆由 ${user} 於 ${EEEE} ${time} 移除。",
         MONTH: "此回覆由 ${user} 於 ${MMM} ${d} 移除。",
         TODAY: "此回覆由 ${user} 於今天 ${time} 移除。",
         YEAR: "此回覆由 ${user} 於 ${YYYY} ${MMM} ${d} 移除。",
         YESTERDAY: "此回覆由 ${user} 於昨天 ${time} 移除。",
         TOMORROW: "此回覆由 ${user} 於 ${YYYY} ${MMM} ${d} 移除。"
      },
      MODERATION_REJECTED: {
         DAY: "此回覆由 ${user} 於 ${EEEE} ${time} 拒絕。",
         MONTH: "此回覆由 ${user} 於 ${MMM} ${d} 拒絕。",
         TODAY: "此回覆由 ${user} 於今天 ${time} 拒絕。",
         YEAR: "此回覆由 ${user} 於 ${YYYY} ${MMM} ${d} 拒絕。",
         YESTERDAY: "此回覆由 ${user} 於昨天 ${time} 拒絕。",
         TOMORROW: "此回覆由 ${user} 於 ${YYYY} ${MMM} ${d} 拒絕。"
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "已提交您的回覆進行檢閱，將於核准時生效。"
   },
   COMMENTS: {
      ARIA_LABEL: "評論",
      PLACEHOLDER_TXT: "新增評論",
      TAB_TITLE: "評論 (${0})",
      ACTION_NOT_SUPPORTED: "不受支援的動作",
      ADD_COMMENT: "新增評論",
      ADD_COMMENT_TOOLTIP: "將評論新增至此項目",
      CANCEL: "取消",
      COMMENT_COUNT_ONE: "${0} 個評論",
      COMMENT_COUNT_MANY: "${0} 個評論",
      COMMENT_LABEL: "評論：",
      DELETE: "刪除",
      DELETE_TOOLTIP: "刪除評論",
      DELETEREASON: "刪除此評論的原因：",
      DIALOG_TITLE: "縮短評論",
      TOOLTIP: "縮短評論",
      NAME: "縮短評論",
      EDIT: "編輯",
      EDIT_TOOLTIP: "編輯評論",
      ERROR_CREATE: "無法儲存您的評論。  請稍後重試。",
      ERROR_CREATE_NOT_FOUND: "因為項目已刪除或您不再看得到該項目，所以無法儲存您的評論。",
      ERROR_CREATE_ACCESS_DENIED: "因為項目已刪除或您不再看得到該項目，所以無法儲存您的評論。",
      ERROR_CREATE_TIMEOUT: "因為無法聯絡伺服器，所以無法儲存您的評論。  請按一下「張貼」以重試。",
      ERROR_CREATE_CANCEL: "因為已取消要求，所以無法儲存您的評論。  請按一下「張貼」以重試。",
      ERROR_CREATE_NOT_LOGGED_IN: "您必須登入以建立此評論。  請按一下「張貼」，系統即會提示您登入。",
      ERROR_DELETE: "無法刪除您的評論。  請稍後重試。",
      ERROR_DELETE_TIMEOUT: "因為無法聯絡伺服器，所以無法刪除您的評論。  請按一下「刪除」以重試。",
      ERROR_DELETE_NOT_FOUND: "因為已刪除或再也看不到評論或項目，所以無法刪除您的評論。",
      ERROR_DELETE_ACCESS_DENIED: "因為項目已刪除或您不再看得到該項目，所以無法刪除您的評論。",
      ERROR_DELETE_CANCEL: "因為已取消要求，所以無法刪除您的評論。  請按一下「刪除」以重試。",
      ERROR_DELETE_NOT_LOGGED_IN: "您必須登入以刪除此評論。  請按一下「刪除」，系統會提示您登入。",
      ERROR_EDIT: "無法更新您的評論。  請稍後重試。",
      ERROR_EDIT_ACCESS_DENIED: "因為項目已刪除或您不再看得到該項目，所以無法更新您的評論。",
      ERROR_EDIT_NOT_FOUND: "因為項目已刪除或您不再看得到該項目，所以無法更新您的評論。",
      ERROR_EDIT_TIMEOUT: "因為無法聯絡伺服器，所以無法更新您的評論。  請按一下「張貼」以重試。",
      ERROR_EDIT_CANCEL: "因為已取消要求，所以無法更新您的評論。  請按一下「張貼」以重試。",
      ERROR_EDIT_NOT_LOGGED_IN: "您必須登入以編輯此評論。  請按一下「張貼」，系統即會提示您登入。",
      ERROR_NO_CONTENT: "請輸入評論，然後按一下「張貼」。如果您不想再留下評論，請按一下「取消」。",
      ERROR_NO_CONTENT_EDIT: "請輸入評論，然後按一下「張貼」。如果您不想再編輯評論，請按一下「取消」。",
      ERROR_UNAUTHORIZED: "因為您未獲授權來留下評論，所以無法儲存您的評論。",
      ERROR_GENERAL: "發生錯誤。",
      OK: "確定",
      YES: "是",
      TRIM_LONG_COMMENT: "要縮短評論嗎？",
      WARN_LONG_COMMENT: "評論太長。  ${shorten}",
      LINK: "鏈結",
      SAVE: "儲存",
      POST: "張貼",
      SHOWMORE: "閱讀更多...",
      VIEW_COMMENTS_FILE: "檢視此檔案的評論",
      SUBSCRIBE_TO_COMMENTS: "訂閱這些評論",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "透過資訊來源讀取器來追蹤對這些評論的變更",
      PROFILE_TITLE: "開啟 ${user} 的人員資訊。",
      PROFILE_A11Y: "啟動此鏈結會在新視窗中開啟 ${user} 的人員資訊。",
      MODERATION_PENDING: "此評論待檢閱。",
      MODERATION_REMOVED: {
         DAY: "此評論由 ${user} 於 ${EEEE} ${time} 移除。",
         MONTH: "此評論由 ${user} 於 ${MMM} ${d} 移除。",
         TODAY: "此評論由 ${user} 於今天 ${time} 移除。",
         YEAR: "此評論由 ${user} 於 ${YYYY} ${MMM} ${d} 移除。",
         YESTERDAY: "此評論由 ${user} 於昨天 ${time} 移除。",
         TOMORROW: "此評論由 ${user} 於 ${YYYY} ${MMM} ${d} 移除。"
      },

      MODERATION_REJECTED: {
         DAY: "此評論由 ${user} 於 ${EEEE} ${time} 拒絕。",
         MONTH: "此評論由 ${user} 於 ${MMM} ${d} 拒絕。",
         TODAY: "此評論由 ${user} 於今天 ${time} 拒絕。",
         YEAR: "此評論由 ${user} 於 ${YYYY} ${MMM} ${d} 拒絕。",
         YESTERDAY: "此評論由 ${user} 於昨天 ${time} 拒絕。",
         TOMORROW: "此評論由 ${user} 於 ${YYYY} ${MMM} ${d} 拒絕。"
      },
      PREV_COMMENTS: "顯示先前的評論",
      EMPTY: "沒有任何評論。",
      ERROR_ALT: "錯誤",
      ERROR: "擷取評論時發生錯誤。${again}",
      ERROR_ADDTL: "擷取其他評論時發生錯誤。${again}",
      ERROR_AGAIN: "請重試。",
      ERROR_AGAIN_TITLE: "重試更多評論的要求。",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE} 於 ${time}（${version} 版）",
         MONTH: "${user} ${MMM} ${d}（${version} 版）",
         TODAY: "${user} 於今天 ${time}（${version} 版）",
         YEAR: "${user} ${YYYY} ${MMM} ${d}（${version} 版）",
         YESTERDAY: "${user} 於昨天 ${time}（${version} 版）",
         TOMORROW: "${user} ${YYYY} ${MMM} ${d}（${version} 版）"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} 於 ${time}",
         MONTH: "${user} ${MMM} ${d}",
         TODAY: "${user} 於今天 ${time}",
         YEAR: "${user} ${YYYY} ${MMM} ${d}",
         YESTERDAY: "${user} 於昨天 ${time}",
         TOMORROW: "${user} ${YYYY} ${MMM} ${d}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} 於 ${time}",
         MONTH: "${MMM} ${d} 日",
         TODAY: "今天 ${time}",
         YEAR: "${YYYY} 年 ${MMM} ${d} 日",
         YESTERDAY: "昨天 ${time}",
         TOMORROW: "${YYYY} 年 ${MMM} ${d} 日"
      },

      COMMENT_DELETED: {
         DAY: "評論已由 ${user} 於 ${EEEE} ${time} 刪除",
         MONTH: "評論由 ${user} 於 ${MMM} ${d} 刪除",
         TODAY: "評論已由 ${user} 於今天 ${time} 刪除",
         YEAR: "評論由 ${user} 於 ${YYYY} ${MMM} ${d} 刪除",
         YESTERDAY: "評論已由 ${user} 於昨天 ${time} 刪除",
         TOMORROW: "評論由 ${user} 於 ${YYYY} ${MMM} ${d} 刪除"
      },
      COMMENT_EDITED: {
         DAY: "${user} 於 ${time} 編輯 ${EEEE}（${version} 版）",
         MONTH: "${user} 於 ${MMM} ${d} 編輯（${version} 版）",
         TODAY: "${user} 於今天 ${time} 編輯（${version} 版）",
         YEAR: "${user} 於 ${YYYY} ${MMM} ${d} 編輯（${version} 版）",
         YESTERDAY: "${user} 於昨天 ${time} 編輯（${version} 版）",
         TOMORROW: "${user} 於 ${YYYY} ${MMM} ${d} 編輯（${version} 版）"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} 於 ${time} 編輯 ${EEEE}",
         MONTH: "${user} 於 ${MMM} ${d} 編輯",
         TODAY: "${user} 於今天 ${time} 編輯",
         YEAR: "${user} 於 ${YYYY} ${MMM} ${d} 編輯",
         YESTERDAY: "${user} 於昨天 ${time} 編輯",
         TOMORROW: "${user} 於 ${YYYY} ${MMM} ${d} 編輯"
      },

      DELETE_CONFIRM: "您確定要刪除此評論嗎？",
      FLAG_ITEM: {
         BUSY: "正在儲存...",
         CANCEL: "取消",
         ACTION: "標示為不適當",
         DESCRIPTION_LABEL: "提供標示此項目的原因（選用）",
         EDITERROR: "由於發生錯誤而未編輯檔案的 meta 資料",
         OK: "儲存",
         ERROR_SAVING: "處理要求時發生錯誤。 請稍後重試。",
         SUCCESS_SAVING: "已提交您的旗標。 主持人會儘快開始調查。",
         TITLE: "將此項目標示為不適當",
         COMMENT: {
            TITLE: "將此評論標示為不適當",
            A11Y: "此按鈕會開啟一個對話框，可讓使用者將此評論標示為不適當。"
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "取消",
      DIALOG_TITLE: "刪除評論",
      NAME: "刪除評論",
      OK: "確定",
      TOOLTIP: "刪除評論"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "取消",
      CONFIRM: "縮短作業將移除超出評論限制的文字。  請按一下「確定」以縮短評論，或者按一下「取消」以自行編輯評論。",
      DIALOG_TITLE: "縮短評論",
      NAME: "縮短評論",
      OK: "確定",
      TOOLTIP: "縮短評論"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "提交確認",
      CONFIRM: "已提交您的評論進行檢閱，將於核准時生效。",
      OK: "確定"
   },

   DATE: {
      AM: "上午",
      FULL: "${EEEE}，${date_long} ${time_long}",
      PM: "下午",
      TODAY: "今天",
      TODAY_U: "今天",
      YESTERDAY: "昨天",
      YESTERDAY_U: "昨天",

      ADDED: { DAY: "新增於${EEee} ${time}",
         FULL: "${EEEE}，${date_long} ${time_long}",
         MONTH: "於 ${date_long} 新增",
         TODAY: "已於今天 ${time} 新增",
         YEAR: "於 ${date_long} 新增",
         YESTERDAY: "已於昨天 ${time} 新增"
      },

      LAST_UPDATED: { DAY: "前次更新於${EEee} ${time}",
         FULL: "${EEEE}，${date_long} ${time_long}",
         MONTH: "前次更新於 ${date_long}",
         TODAY: "於今天 ${time} 進行前次更新",
         YEAR: "前次更新於 ${date_long}",
         YESTERDAY: "於昨天 ${time} 進行前次更新"
      },

      MONTHS_ABBR: { 0: "一月",
         10: "十一月",
         11: "十二月",
         1: "二月",
         2: "三月",
         3: "四月",
         4: "五月",
         5: "六月",
         6: "七月",
         7: "八月",
         8: "九月",
         9: "十月"
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

      DATE_TIME: { DAY: "${date_short} 於 ${time}",
         FULL: "${EEEE}，${date_long} ${time_long}",
         MONTH: "${date_short} 於 ${time}",
         TODAY: "${date_short} 於 ${time}",
         YEAR: "${date_short} 於 ${time}",
         YESTERDAY: "${date_short} 於 ${time}",
         TOMORROW: "${date_short} 於 ${time}"
      },

      DATE_ONLY: { DAY: "${date_short}",
         FULL: "${date_long} ${EEEE}",
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

      UPDATED: { DAY: "已於 ${EEee} ${time} 更新",
         FULL: "${EEEE}，${date_long} ${time_long}",
         MONTH: "已於 ${date_long} 更新",
         TODAY: "已於今天 ${time} 更新",
         YEAR: "已於 ${date_long} 更新",
         YESTERDAY: "已於昨天 ${time} 更新"
      }
   },
   VERSIONS: {
      ERROR: "無法載入版本資訊。",
      ERROR_REQUEST_CANCELLED: "已取消要求。",
      ERROR_REQUEST_TIMEOUT: "無法聯絡伺服器。",
      ERROR_REQUEST_UNKNOWN: "發生不明錯誤。",
      LOADING: "載入中...",
      NO_VERSIONS: "沒有任何版本",
      INFO: "第 ${0} 版已於 ${1} 建立，建立者： ",
      VERSION_NUMBER: "第 ${0} 版",
      DELETED: "已刪除",
      DELETE_ALL: "刪除下列版本之前的所有版本：",
      DELETE_VERSION_SINGLE: "刪除第 ${0} 版",
      DELETEERROR: "由於發生錯誤而未刪除該版本。",
      CREATE_VERSION: "建立新版本",
      CREATE_VERSION_TOOLTIP: "建立此檔案的版本",
      REVERT_VERSION: "還原第 ${0} 版",
      REVERT_DESCRIPTION: "已從第 ${0} 版還原",
      PREVIOUS: "上一頁",
      PREVIOUS_TOOLTIP: "上一頁",
      ELLIPSIS: "...",
      NEXT: "下一頁",
      NEXT_TOOLTIP: "下一頁",
      COUNT: "${0}-${1} 個（共 ${2} 個）",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "頁面",
      SHOW: "顯示",
      ITEMS_PER_PAGE: " 個項目/每頁。",
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
            YEAR: "${date_short} 於 ${time}",
            FULL: "${EEEE}，${date_long} ${time_long}",
            MONTH: "${date_short} 於 ${time}",
            TODAY: "今天 ${time}",
            YESTERDAY: "昨天 ${time}"
        },
        UPDATED: { DAY: "已於 ${EEee} ${time} 更新",
            YEAR: "於 ${date_short} 更新",
            FULL: "${EEEE}，${date_long} ${time_long}",
            MONTH: "於 ${date_short} 更新",
            TODAY: "已於今天 ${time} 更新",
            YESTERDAY: "已於昨天 ${time} 更新"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "刪除第 ${0} 版",
         DOWNLOAD: "下載",
         DOWNLOAD_TOOLTIP: "下載這個版本 (${0})",
         VIEW: "檢視",
         VIEW_TOOLTIP: "檢視第 ${0} 版",
         REVERT: {
            A11Y: "此按鈕會開啟一個對話框，可讓使用者確認還原舊版的檔案。 確認此動作會重新整理頁面上的內容。",
            FULL: "還原",
            WIDGET: "還原此版本"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "因為版本已刪除或您不再看得到該版本，所以無法刪除該版本。",
         ERROR_ACCESS_DENIED: "因為您不是編輯者，所以無法刪除該版本。",
         ERROR_TIMEOUT: "因為無法聯絡伺服器，所以未刪除該版本。  請再按一下「刪除」以重試要求。",
         ERROR_CANCEL: "因為已取消要求，所以未刪除該版本。  請再按一下「刪除」以重試要求。",
         ERROR_NOT_LOGGED_IN: "您必須登入以刪除此版本。  請按一下「刪除」，系統會提示您登入。",
         GENERIC_ERROR: "因為不明錯誤而無法刪除此版本。  請再按一下「刪除」以重試要求。",
         FULL: "刪除",
         A11Y: "此按鈕會開啟一個對話框，可讓使用者確認刪除此版本。 確認此動作會重新整理頁面上的內容。"
      },

      REVERT: {
         ERROR_NOT_FOUND: "因為版本已刪除或您不再看得到該版本，所以無法還原該版本。",
         ERROR_ACCESS_DENIED: "因為您不是編輯者，所以無法還原版本。",
         ERROR_NAME_EXISTS: "因為另一個檔案具有相同的名稱，所以無法還原該版本。",
         ERROR_TIMEOUT: "因為無法聯絡伺服器，所以未還原該版本。  請再次按一下「還原」以重試要求。",
         ERROR_CANCEL: "因為已取消要求，所以未還原該版本。  請再次按一下「還原」以重試要求。",
         ERROR_QUOTA_VIOLATION: "由於空間限制，無法還原該版本。",
         ERROR_MAX_CONTENT_SIZE: "因為該版本大於所容許的檔案大小上限 ${0}，所以無法還原該版本。",
         GENERIC_ERROR: "由於不明錯誤而無法還原該版本。  請再次按一下「還原」以重試要求。"
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "查看已下載的人員...",
      PREVIOUS: "上一頁",
      PREVIOUS_TOOLTIP: "上一頁",
      ELLIPSIS: "...",
      NEXT: "下一頁",
      NEXT_TOOLTIP: "下一頁",
      COUNT: "${0}-${1} 個（共 ${2} 個）",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "頁面",
      SHOW: "顯示",
      ITEMS_PER_PAGE: " 個項目/每頁。",
      VERSION: {
         DAY: "第 ${version} 版於 ${date}",
         MONTH: "第 ${version} 版於 ${date}",
         TODAY: "第 ${version} 版於 ${time}",
         YEAR: "第 ${version} 版於 ${date}",
         YESTERDAY: "第 ${version} 版於昨天"
      },

      FILE: {
         V_LATEST: "您已下載此檔案的最新版本",
         V_OLDER: "您上次已下載此檔案的第 ${0} 版",
         LOADING: "載入中...",
         EMPTY: "僅限匿名使用者",
         ERROR: "無法載入下載資訊"
      }
   },

   EE_DIALOG: {
      ERROR: "錯誤",
      ERROR_ALT_TEXT: "錯誤：",
      ERROR_MSG_GENERIC: "某些項目發生錯誤。  請重試。",
      ERROR_MSG_NOT_AVAILABLE: "此項目已被刪除或無法再使用。",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "無法使用此項目的內容。",
      ERROR_MSG_NO_ACCESS: "您無法再存取此項目。",
      LOADING: "載入中...",
      TITLE_SU: "${author} 已張貼訊息。",
      TITLE_NI: "${author} 已邀請您加入其網路。",
      AUTHOR_TITLE: "檢視 ${author} 的人員資訊",
      OPEN_LINK: "開啟 ${title}",
      CONFIRM_CLOSE_TITLE: "確認",
      CONFIRM_CLOSE_MESSAGE: "您確定要放棄變更嗎？ 按「確定」繼續或按「取消」返回",
      OK: "確定",
      CANCEL: "取消"
   },
   MESSAGE: {
      SUCCESS: "確認",
      ERROR: "錯誤",
      ERROR_ALT_TEXT: "錯誤：",
      INFO: "資訊",
      WARNING: "警告",
      DISMISS: "隱藏此訊息",
      MORE_DETAILS: "其餘詳細資料",
      HIDE_DETAILS: "隱藏詳細資料"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "建立：${EEEE} 於 ${time}",
           MONTH: "建立：${MMM} ${d}",
           TODAY: "建立：於今天 ${time}",
           YEAR: "建立：${YYYY} ${MMM} ${d}",
           YESTERDAY: "建立：於昨天 ${time}",
           TOMORROW: "建立：${YYYY} ${MMM} ${d}"
       },
      error: "發生錯誤。  ${again}.",
      error_again: "請重試",
      error_404: "狀態更新已不再存在。",
      notifications: {
         STATUS_UPDATE: "${user} 已張貼訊息",
         USER_BOARD_POST: "${user} 在公佈欄上撰寫",
         POST_COMMENT: "${user} 寫入："
      }
   },
   login: {
      error: "您的使用者名稱及/或密碼不符合任何現有的帳號。 請重試。",
      logIn: "登入",
      password: "密碼：",
      user: "使用者名稱：",
      welcome: "登入 HCL Connections"
   },
   repost: {
      name: "轉貼",
      title: "將此更新項目轉貼至我的追蹤者或社群",
      msg_success: "更新已順利轉貼至您的追蹤者。",
      msg_generic: "某些項目發生錯誤。請重試。"
   },
   FILE_SHARE_INFO: {
      ADD: "新增",
      ADD_TXT: "將人員或社群新增為讀者",
      SHOW_MORE: "顯示更多...",
      READER_IF_PUBLIC: "每個人（公用）",
      READER_IF_PUBLIC_TOOLTIP: "此檔案為公用且每個人都可看見",
      EMPTY_READERS: "無",
      READERS_LABEL: "讀者： ",
      EDITORS_LABEL: "編輯者： ",
      OWNER_LABEL: "擁有者： ",
      ERROR: "無法載入共用資訊",
      ERROR_NOT_FOUND: "已刪除或移動您所要求的檔案。 如果某人傳送這個鏈結給您，請檢查它是否正確。",
      ERROR_ACCESS_DENIED: "您沒有檢視此檔案的權限。  該檔案並非公用，且未與您共用。",
      SHARE: "共用",
      CANCEL: "取消",
      SHARE_WITH: "共用對象：",
      PERSON: "人員",
      COMMUNITY: "社群",
      PLACEHOLDER: "人員名稱或電子郵件...",
      MESSAGE: "訊息：",
      MESSAGE_TXT: "新增選用訊息",
      REMOVE_ITEM_ALT: "移除 ${0}",
      NO_MEMBERS: "無",
      A11Y_READER_ADDED: "已選取 ${0} 作為讀者",
      A11Y_READER_REMOVED: "將 ${0} 移除不再是讀者",
      SELF_REFERENCE_ERROR: "您不能與自己共用。",
      OWNER_REFERENCE_ERROR: "您不能與檔案的擁有者共用。",
      SHARE_COMMUNITY_WARN: "與公用社群 '${0}' 進行共用，將會使此檔案成為公用檔案。",
      SELECT_USER_ERROR: "您必須至少選取一個要與其共用的人員或社群",
      WARN_LONG_MESSAGE: "訊息太長。",
      TRIM_LONG_MESSAGE: "要縮短訊息嗎？",
      ERROR_SHARING: "無法共用檔案。  請稍後重試。",
      INFO_SUCCESS: "已順利共用檔案。",
      MAX_SHARES_ERROR: "已超出共用數目上限。",
      NOT_LOGGED_IN_ERROR: "因為您未登入，所以未共用檔案。  請按一下「共用」以共用檔案。",
      TIMEOUT_ERROR: "因為無法聯絡伺服器，所以未共用檔案。  請按一下「共用」以重試。",
      CANCEL_ERROR: "因為已取消要求，所以未共用檔案。  請按一下「共用」以重試。",
      NOT_FOUND_ERROR: "檔案已刪除或您不再看得到此檔案，因此無法共用。",
      ACCESS_DENIED_ERROR: "您無權再共用此檔案。",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "受限的檔案可能無法設成公用檔案。",
      TOOLTIP: "授予他人對此檔案的存取權"
   },
   HISTORY: {
      TAB_TITLE: "最近的更新",
      NO_HISTORY: "沒有最近的更新項目。",
      EMPTY: "無法擷取此項目的最近更新項目。 此項目已刪除或您無法再存取此項目。",
      MORE: "顯示先前的更新項目",
      ERROR_ALT: "錯誤",
      ERROR: "擷取更新項目時發生錯誤。${again}",
      ERROR_ADDTL: "擷取其他更新項目時發生錯誤。${again}",
      ERROR_AGAIN: "請重試。",
      ERROR_AGAIN_TITLE: "重試更多更新項目的要求。",
      PROFILE_TITLE: "開啟 ${user} 的人員資訊。",
      SORT_BY: "排序方式：",
      SORTS: {
         DATE: "日期",
         DATE_TOOLTIP: "從最近歷程到最早更新項目進行排序",
         DATE_TOOLTIP_REVERSE: "從最早歷程到最近更新項目進行排序"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} 於 ${time}",
             MONTH: "${MMM} ${d} 日",
             TODAY: "今天 ${time}",
             YEAR: "${YYYY} 年 ${MMM} ${d} 日",
             YESTERDAY: "昨天 ${time}",
             TOMORROW: "${YYYY} 年 ${MMM} ${d} 日"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "此評論",
	   REPLY_ACTION: "回覆",
       REPLY_ACTION_TOOLTIP: "回覆此評論"
   },
   OAUTH: {
      welcomeHeader: "歡迎使用 Connections",
      continueBtnLabel: "繼續",
      continueBtnA11y: "啟動此鏈結將會開啟一個新視窗，可讓您授與 Connections 的存取權。",
      clickHere: "請按一下這裡",
      infoMsg: "Connections 需要您授權以存取您的資料。",
      authorizeGadget: "${clickHere}以授權此應用程式存取您的 Connections 資訊。",
      confirmAuthorization: "${clickHere}以確認您已授權此應用程式存取您的 Connections 資訊。"
   },
   OAUTH_FILENET: {
      continueBtnA11y: "啟動此鏈結將會開啟一個新視窗，可讓您授與 Connections Library 儲存庫的存取權。",
      infoMsg: "Connections Library 儲存庫需要您授權以存取您的資料。",
      authorizeGadget: "${clickHere}以授權此應用程式存取您的 Connections Library 儲存庫資訊。",
      confirmAuthorization: "${clickHere}以確認您已授權此應用程式存取您的 Connections Library 儲存庫資訊。"
   },
   UNSAVEDCHANGES: {
      CANCEL: "取消",
      CONFIRM: "您確定要放棄變更嗎？  請按「確定」以繼續執行，或按「取消」以返回。",
      DIALOG_TITLE: "確認",
      NAME: "確認",
      OK: "確定",
      TOOLTIP: "確認"
   }
})

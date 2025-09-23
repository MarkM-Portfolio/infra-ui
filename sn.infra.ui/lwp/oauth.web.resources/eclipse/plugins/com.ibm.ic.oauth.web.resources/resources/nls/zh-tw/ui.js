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
define({
      "authorize" : {
         "legal" : "\u6388\u6b0a\u8cc7\u6599 \u2013 Property of HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. All rights reserved. \u8acb\u53c3\u95b1\u7522\u54c1\u6388\u6b0a\u4ee5\u53d6\u5f97\u8a73\u7d30\u8cc7\u8a0a\u3002Java \u548c\u6240\u6709 Java \u578b\u5546\u6a19\u548c\u6a19\u8a8c\u90fd\u662f Oracle \u53ca/\u6216\u5176\u5b50\u516c\u53f8\u7684\u5546\u6a19\u6216\u8a3b\u518a\u5546\u6a19\u3002",
         "error" : "發生錯誤。 請稍後重試。",
         "granted" : {
            "title" : "已授與存取權。",
            "blurb" : "您已授與 ${0} 與您的 HCL Connections 帳號互動的存取權。"
         },
         "denied" : {
            "title" : "拒絕存取",
            "blurb" : "您已拒絕 ${0} 與您的 HCL Connections 帳號互動的存取權。"
         },
         "blurb" : "{0} 正在要求您的 HCL Connections 資訊的存取權，包括您在 Connections 中的所有內容。",
         "revoke" : {
            "description" : "您可以隨時透過 Connections 設定 > {0} 來撤銷存取權。 Connections 會定期要求您重新授權。",
            "link" : "應用程式存取權"
         },
         "authorize" : {
            "label" : "授與存取權"
         },
         "windowtitle" : "授與 HCL Connections 的存取權",
         "title" : "存取要求",
         "deny" : {
            "label" : "拒絕存取"
         },
         "action_tooltip" : "授與應用程式 ${0} 的存取權",
         "action" : "授與存取權",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "正在將您重新導向回 ${0}。"
      },
      "javascript" : {
         "disabled" : {
            "title" : "開啟 JavaScript",
            "p2" : "重新整理頁面以繼續執行。",
            "p1" : "Web 瀏覽器中已停用 JavaScript。  HCL Connections 需要 JavaScript 才能運作。  開啟之後，請重新整理頁面。"
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "我們無法處理您的要求",
            "description" : "應用程式發出之存取您的 HCL Connections 帳號的要求不完整。  請按一下瀏覽器的「上一頁」按鈕以回到轉至此頁面之前的網站或應用程式，然後再試一次。  如果此錯誤持續存在，請將問題報告給您的管理者。"
         },
         "invalid_token" : {
            "title" : "我們無法處理您的要求",
            "description" : "應用程式發出之存取您的 HCL Connections 帳號的要求無效。  請按一下瀏覽器的「上一頁」按鈕以回到轉至此頁面之前的網站或應用程式，然後再試一次。  如果此錯誤持續存在，請將問題報告給您的管理者。"
         },
         "default_action" : {
            "label" : "回到首頁"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "錯誤：",
            "icon_alt" : "錯誤"
         },
         "success" : {
            "a11y_label" : "成功：",
            "icon_alt" : "順利完成"
         },
         "warning" : {
            "a11y_label" : "警告：",
            "icon_alt" : "警告"
         },
         "info" : {
            "a11y_label" : "資訊：",
            "icon_alt" : "資訊"
         }
      },
      "loading" : "載入中...",
      "deny" : {
         "error" : "發生錯誤。 請稍後重試。",
         "action_tooltip" : "拒絕應用程式 ${0} 的存取權",
         "action" : "拒絕存取",
         "success" : "拒絕存取。"
      },
      "grid" : {
         "applications" : {
            "summary" : "對您 HCL Connections 資訊具有存取權之應用程式的清單。",
            "loading" : "載入中...",
            "empty" : "找不到任何應用程式。",
            "reverse_sort" : "反向排序"
         }
      },
      "applications" : {
         "windowtitle" : "應用程式存取權",
         "details" : "具有您 HCL Connections 資訊存取權的應用程式。",
         "error" : "由於發生錯誤而未擷取清單。",
         "titlebar" : {
            "tab2" : "應用程式存取權",
            "tab1" : "電子郵件通知",
            "tab3" : "全球化"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "按此按鈕可以重新整理現行頁面，以呈現新內容。  若要返回此功能表，請導覽回到："
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections 設定"
         },
         "heading" : "應用程式存取權"
      },
      "sorts" : {
         "application_name" : "應用程式名稱",
         "authorization_date" : "授權日期",
         "expiration_date" : "到期日",
         "action" : "動作"
      },
      "revoke_token" : {
         "error" : "發生錯誤。 請稍後重試。",
         "dialog_title" : "撤銷存取權",
         "action_tooltip" : "撤銷應用程式 ${0} 的存取權",
         "action" : "撤銷",
         "ok" : "確定",
         "cancel" : "取消",
         "confirm" : "要撤銷此應用程式對您 HCL Connections 資訊的存取權嗎？ ",
         "success" : "已移除應用程式。"
      }
});

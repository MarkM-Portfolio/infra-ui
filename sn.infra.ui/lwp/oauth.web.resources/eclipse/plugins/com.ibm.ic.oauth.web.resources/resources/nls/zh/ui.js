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
         "legal" : "Licensed Materials \u2013 Property of HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. All rights reserved. \u8bf7\u53c2\u9605\u4ea7\u54c1\u8bb8\u53ef\u4e86\u89e3\u8be6\u7ec6\u4fe1\u606f\u3002Java \u548c\u6240\u6709\u57fa\u4e8e Java \u7684\u5546\u6807\u548c\u5fbd\u6807\u90fd\u662f Oracle \u548c/\u6216\u5176\u9644\u5c5e\u516c\u53f8\u7684\u5546\u6807\u6216\u6ce8\u518c\u5546\u6807\u3002",
         "error" : "发生错误。 请稍后重试。",
         "granted" : {
            "title" : "已授予访问权",
            "blurb" : "系统已授予您 ${0} 访问权以与 HCL Connections 帐户交互。"
         },
         "denied" : {
            "title" : "拒绝访问",
            "blurb" : "系统已拒绝授予您 ${0} 访问权以与 HCL Connections 帐户交互。"
         },
         "blurb" : "{0} 正在请求对您的 HCL Connections 信息（包括 Connections 中您的所有内容）的访问权。",
         "revoke" : {
            "description" : "您可以通过“Connections 设置”>“{0}”随时撤销访问权。 Connections 可能会定期要求您重新授权。",
            "link" : "应用程序访问权"
         },
         "authorize" : {
            "label" : "授予访问权"
         },
         "windowtitle" : "授权访问 HCL Connections",
         "title" : "访问请求权",
         "deny" : {
            "label" : "拒绝访问"
         },
         "action_tooltip" : "授予对应用程序 ${0} 的访问权",
         "action" : "授予访问权",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "将您重定向至 ${0}。"
      },
      "javascript" : {
         "disabled" : {
            "title" : "开启 JavaScript",
            "p2" : "刷新页面以继续。",
            "p1" : "在您的 Web 浏览器中已禁用 JavaScript。  HCL Connections 需要 JavaScript 才能运行。  开启 JavaScript 后，请刷新页面。"
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "我们无法处理您的请求",
            "description" : "应用程序发出的申请访问 HCL Connections 帐户的请求不完整。  单击浏览器后退按钮返回将您转到此处的站点或应用程序，然后重试。  如果此错误仍然存在，请向管理员报告问题。"
         },
         "invalid_token" : {
            "title" : "我们无法处理您的请求",
            "description" : "应用程序发出的申请访问 HCL Connections 帐户的请求无效。  单击浏览器后退按钮返回将您转到此处的站点或应用程序，然后重试。  如果此错误仍然存在，请向管理员报告问题。"
         },
         "default_action" : {
            "label" : "返回到主页"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "错误：",
            "icon_alt" : "错误"
         },
         "success" : {
            "a11y_label" : "成功：",
            "icon_alt" : "成功"
         },
         "warning" : {
            "a11y_label" : "警告：",
            "icon_alt" : "警告"
         },
         "info" : {
            "a11y_label" : "信息：",
            "icon_alt" : "信息"
         }
      },
      "loading" : "正在装入...",
      "deny" : {
         "error" : "发生错误。 请稍后重试。",
         "action_tooltip" : "拒绝访问应用程序 ${0}",
         "action" : "拒绝访问",
         "success" : "访问被拒绝。"
      },
      "grid" : {
         "applications" : {
            "summary" : "有权访问 HCL Connections 信息的应用程序的列表。",
            "loading" : "正在装入...",
            "empty" : "找不到任何应用程序。",
            "reverse_sort" : "反向排序"
         }
      },
      "applications" : {
         "windowtitle" : "应用程序访问权",
         "details" : "有权访问 HCL Connections 信息的应用程序。",
         "error" : "由于发生错误，未检索到列表。",
         "titlebar" : {
            "tab2" : "应用程序访问权",
            "tab1" : "电子邮件通知",
            "tab3" : "全球化"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "按此按钮可刷新当前页面以显示新内容。  要返回至该菜单，请返回："
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections 设置"
         },
         "heading" : "应用程序访问权"
      },
      "sorts" : {
         "application_name" : "应用程序名称",
         "authorization_date" : "授权日期",
         "expiration_date" : "截止日期",
         "action" : "操作"
      },
      "revoke_token" : {
         "error" : "发生错误。 请稍后重试。",
         "dialog_title" : "撤销访问权",
         "action_tooltip" : "撤销对应用程序 ${0} 的访问权",
         "action" : "撤销",
         "ok" : "确定",
         "cancel" : "取消",
         "confirm" : "要撤销此应用程序对 HCL Connections 信息的访问权吗？ ",
         "success" : "已除去此应用程序。"
      }
});

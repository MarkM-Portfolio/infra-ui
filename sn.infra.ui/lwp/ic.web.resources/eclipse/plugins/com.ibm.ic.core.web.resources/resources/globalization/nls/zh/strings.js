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
      "globalization" : {
         "windowtitle" : "全球化",
         "unavailable" : "全球化设置不可用",
         "details" : "指定首选语言、首选日历以及用户生成的文本流动方向。",
         "error" : "由于发生错误，未检索到全球化设置。",
         "titlebar" : {
            "tab2" : "应用程序访问权",
            "tab1" : "电子邮件通知",
            "tab3" : "全球化"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "按此按钮可刷新当前页面以显示新内容。  要返回至该菜单，请返回："
         },
         "details_nolanguage" : "指定首选日历以及用户生成的文本流动方向。",
         "a11y" : {
            "titlebar_label" : "HCL Connections 设置",
            "body_label" : "全球化设置"
         },
         "heading" : "全球化设置"
      },
      "restore_defaults" : {
         "error" : "发生错误。 请稍后重试。",
         "action_tooltip" : "将全球化设置复原到原始缺省值",
         "action" : "恢复缺省值",
         "success" : "您的全球化设置已经复原到原始缺省值。"
      },
      "help" : {
         "help" : "帮助",
         "close" : "关闭"
      },
      "save" : {
         "error" : "发生错误。 请稍后重试。",
         "action_tooltip" : "保存全球化设置",
         "action" : "保存",
         "success" : "您的全球化设置已更新。"
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "恢复缺省值"
         },
         "bidi" : {
            "help" : "启用双向文本帮助",
            "label" : "启用双向文本",
            "tooltip" : "允许以指定语言显示合并文本和结构文本（如文件路径）。  还允许指定独立于语言选择的文本方向。"
         },
         "error" : "错误",
         "save" : {
            "label" : "保存"
         },
         "direction" : {
            "label" : "用户生成文本的方向：",
            "tooltip" : "文本方向源于用户输入，如内容和导航面包屑的名称。  缺省情况下，这由您的语言选择决定（大多数情况下是从左到右）。  选择上下文使系统可以根据字符分析决定方向（支持混合方向的文本）。",
            "options" : {
               "contextual" : "上下文（基于字符）",
               "rtl" : "从右到左",
               "ltr" : "从左到右",
               "default_ltr" : "使用语言缺省值（从左到右）",
               "default_rtl" : "使用语言缺省值（从右到左）"
            }
         },
         "cancel" : {
            "label" : "取消"
         },
         "language" : {
            "selected" : "${0}（当前）",
            "label" : "语言：",
            "tooltip" : "指定显示应用程序文本所使用的语言。  此设置不会影响用户生成的文本。"
         },
         "calendar" : {
            "label" : "日历：",
            "options" : {
               "hebrew" : "希伯来语",
               "gregorian" : "格里历",
               "hijri" : "伊斯兰历"
            }
         }
      }
});

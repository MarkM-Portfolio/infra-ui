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
         "unavailable" : "全球化設定無法使用",
         "details" : "指定您慣用的語言、行事曆，以及使用者產生之文字流向的方向。",
         "error" : "因發生錯誤而未擷取全球化設定。",
         "titlebar" : {
            "tab2" : "應用程式存取權",
            "tab1" : "電子郵件通知",
            "tab3" : "全球化"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "按此按鈕可以重新整理現行頁面，以呈現新內容。  若要返回此功能表，請導覽回到："
         },
         "details_nolanguage" : "指定您慣用的行事曆，以及使用者產生之文字流向的方向。",
         "a11y" : {
            "titlebar_label" : "HCL Connections 設定",
            "body_label" : "全球化設定"
         },
         "heading" : "全球化設定"
      },
      "restore_defaults" : {
         "error" : "發生錯誤。 請稍後重試。",
         "action_tooltip" : "將全球化設定還原成原始預設值",
         "action" : "還原預設值",
         "success" : "已將您的全球化設定還原成原始預設值。"
      },
      "help" : {
         "help" : "說明",
         "close" : "關閉"
      },
      "save" : {
         "error" : "發生錯誤。 請稍後重試。",
         "action_tooltip" : "儲存全球化設定",
         "action" : "儲存",
         "success" : "已更新您的全球化設定。"
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "還原預設值"
         },
         "bidi" : {
            "help" : "啟用雙向文字說明",
            "label" : "啟用雙向文字",
            "tooltip" : "容許依語言顯示連結的文字與結構化文字，例如檔案路徑。  此外也容許您在選擇的語言之外，再指定文字方向。"
         },
         "error" : "錯誤",
         "save" : {
            "label" : "儲存"
         },
         "direction" : {
            "label" : "使用者產生的文字方向：",
            "tooltip" : "由使用者輸入（例如內容與瀏覽途徑的名稱）而來的文字方向。  依預設，此方向由選取的語言決定（大部分情況是由左至右）。  選擇環境定義可讓系統依據字元分析來決定方向（支援混合方向的文字）。",
            "options" : {
               "contextual" : "環境定義（以字元為準）",
               "rtl" : "由右至左",
               "ltr" : "由左至右",
               "default_ltr" : "使用語言預設值（由左至右）",
               "default_rtl" : "使用語言預設值（由右至左）"
            }
         },
         "cancel" : {
            "label" : "取消"
         },
         "language" : {
            "selected" : "${0}（現行）",
            "label" : "語言：",
            "tooltip" : "指定應用程式文字的顯示語言。  此設定不會影響使用者產生的文字。"
         },
         "calendar" : {
            "label" : "行事曆：",
            "options" : {
               "hebrew" : "猶太曆",
               "gregorian" : "西曆",
               "hijri" : "回曆"
            }
         }
      }
});

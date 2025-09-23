/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8
({
   submit: {label: "儲存", a11y: "儲存", tooltip: "儲存"}, 
   cancel: {label: "取消", a11y: "取消", tooltip: "取消"},
   close: {label: "關閉", a11y: "關閉", tooltip: "關閉"},
   title: {global: "分享某些項目", community: "與社群分享"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "在此實務中無法使用共用動作。",
	   ACTIONS_LOAD_ERROR: "載入共用動作時發生錯誤。",
	   CONTENT_LOAD_ERROR: "無法載入內容。 請稍後重試，或與系統管理者聯絡。"},
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
   COMMUNITYUPLOADFILE: {
	   SHARE: "共用",
	   UPLOAD: "上傳",
	   CANCEL: "取消",
	   VISIBILITY_WARNING: "與此社群共用的檔案將變成公用。",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "您已成功與 ${1} 共用 ${0}。",
		   SUCCESS_PLURAL: "您已成功與 ${1} 共用 ${0} 個檔案。",
		   ERROR: "無法共用檔案。  請稍後重試。",
		   ERROR_X: "無法共用檔案。  請稍後重試。",
           MAX_SHARES_ERROR: "已超出共用數目上限。",
           EXTERNAL_SHARES_ERROR: "只能在組織內部共用此檔案。",
           EXTERNAL_SHARES_ERROR_X: "檔案只能在組織內共用。",
           NOT_LOGGED_IN_ERROR: "因為您未登入，所以未共用檔案。  請按一下「共用」以共用檔案。",
           NOT_LOGGED_IN_ERROR_X: "因為您未登入，所以未共用檔案。  請按一下「共用」以共用檔案。",
           TIMEOUT_ERROR: "因為無法聯絡伺服器，所以未共用檔案。  請按一下「共用」以重試。",
           TIMEOUT_ERROR_X: "因為無法與伺服器通訊，所以未共用檔案。  請按一下「共用」以重試。",
           CANCEL_ERROR: "因為已取消要求，所以未共用檔案。  請按一下「共用」以重試。",
           CANCEL_ERROR_X: "因為已取消要求，所以未共用檔案。  請按一下「共用」以重試。",
           NOT_FOUND_ERROR: "檔案已刪除或您不再看得到此檔案，因此無法共用。",
           NOT_FOUND_ERROR_X: "檔案已刪除或您再也找不到此檔案，且無法共用。",
           ACCESS_DENIED_ERROR: "您無權再共用此檔案。",
           ACCESS_DENIED_ERROR_X: "您無權再共用這些檔案。",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "受限的檔案不能設成公用檔案。",
        	   ERROR_SHARE_X: "受限的檔案不能設成公用檔案。"
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "您已成功將 ${1} 上傳至 ${0}。",
		   SUCCESS_PLURAL: "您已成功將 ${1} 個檔案上傳至 ${0}。",
		   ERROR: "無法上傳檔案。  請稍後重試。",
		   ERROR_X: "無法上傳 ${0}。  請稍後重試。",
		   INFO_SUCCESS_PRE_MODERATION: "已提交檔案 ${0} 進行檢閱，將於核准時生效。",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "已提交 ${0} 個檔案進行檢閱，將於核准時生效。"
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "上傳及共用檔案"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "取消",
	   CONFIRM_OTHER_TAB: "如果您繼續執行現行動作，則在其他標籤上輸入的資訊將會遺失。  按「確定」繼續或按「取消」返回。",
	   CONFIRM_CURRENT_TAB: "如果您繼續執行現行動作，則您在 ${0} 標籤上輸入的資訊將會遺失。  按「確定」繼續或按「取消」返回。",
	   DIALOG_TITLE: "確認",
	   OK: "確定"
   }
})




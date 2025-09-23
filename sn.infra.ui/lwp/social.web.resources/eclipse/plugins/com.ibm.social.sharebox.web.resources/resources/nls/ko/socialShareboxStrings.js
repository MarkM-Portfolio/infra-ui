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
   submit: {label: "저장", a11y: "저장", tooltip: "저장"}, 
   cancel: {label: "취소", a11y: "취소", tooltip: "취소"},
   close: {label: "닫기", a11y: "닫기", tooltip: "닫기"},
   title: {global: "내용 공유", community: "커뮤니티와 공유"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "이 시나리오에서는 공유 수행을 사용할 수 없습니다.",
	   ACTIONS_LOAD_ERROR: "공유 수행을 로드하는 중에 오류가 발생했습니다. ",
	   CONTENT_LOAD_ERROR: "컨텐츠를 로드할 수 없습니다. 나중에 다시 시도하거나 시스템 관리자에게 문의하십시오."},
   MESSAGE: {
	      SUCCESS: "확인",
	      ERROR: "오류",
	      ERROR_ALT_TEXT: "오류:",
	      INFO: "정보",
	      WARNING: "경고",
	      DISMISS: "이 메시지 숨기기",
	      MORE_DETAILS: "세부사항 보기",
	      HIDE_DETAILS: "세부사항 숨기기"
	   },
   COMMUNITYUPLOADFILE: {
	   SHARE: "공유",
	   UPLOAD: "업로드",
	   CANCEL: "취소",
	   VISIBILITY_WARNING: "이 커뮤니티와 공유하는 파일은 공용 파일이 됩니다.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "${0}을(를) ${1}과(와) 공유합니다.",
		   SUCCESS_PLURAL: "${0} 파일을 ${1}과(와) 공유합니다.",
		   ERROR: "이 파일을 공유할 수 없습니다. 나중에 다시 시도하십시오.",
		   ERROR_X: "이 파일을 공유할 수 없습니다. 나중에 다시 시도하십시오.",
           MAX_SHARES_ERROR: "최대 공유 수를 초과했습니다.",
           EXTERNAL_SHARES_ERROR: "이 파일은 조직 안에서만 공유할 수 있습니다. ",
           EXTERNAL_SHARES_ERROR_X: "이 파일을 조직 내에서만 공유할 수 있습니다. ",
           NOT_LOGGED_IN_ERROR: "로그인하지 않았으므로 파일을 공유할 수 없습니다. '공유'를 클릭하여 파일을 공유하십시오.",
           NOT_LOGGED_IN_ERROR_X: "로그인하지 않았기 때문에 파일을 공유하지 않았습니다. '공유'를 클릭하여 파일을 공유하십시오.",
           TIMEOUT_ERROR: "서버에 접속할 수 없으므로 파일을 공유할 수 없습니다. '공유'를 클릭하여 다시 시도하십시오.",
           TIMEOUT_ERROR_X: "서버에 접속할 수 없으므로 파일을 공유할 수 없습니다. '공유'를 클릭하여 다시 시도하십시오.",
           CANCEL_ERROR: "요청이 취소되었으므로 파일을 공유할 수 없습니다. '공유'를 클릭하여 다시 시도하십시오.",
           CANCEL_ERROR_X: "요청이 취소되었으므로 파일을 공유할 수 없습니다. '공유'를 클릭하여 다시 시도하십시오.",
           NOT_FOUND_ERROR: "파일이 삭제되었거나 더 이상 표시되지 않으므로 공유할 수 없습니다.",
           NOT_FOUND_ERROR_X: "파일이 삭제되었거나 더 이상 표시되지 않으므로 공유할 수 없습니다.",
           ACCESS_DENIED_ERROR: "이 파일을 공유할 수 있는 권한이 없습니다.",
           ACCESS_DENIED_ERROR_X: "이 파일을 공유할 수 있는 권한이 없습니다.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "제한된 파일은 공용 파일로 만들 수 없습니다.",
        	   ERROR_SHARE_X: "제한된 파일은 공용 파일로 만들 수 없습니다."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "${0}을(를) ${1}에 업로드했습니다.",
		   SUCCESS_PLURAL: "${0} 파일을 ${1}에 업로드했습니다.",
		   ERROR: "파일을 업로드할 수 없습니다. 나중에 다시 시도하십시오.",
		   ERROR_X: "${0}을(를) 업로드할 수 없습니다. 나중에 다시 시도하십시오.",
		   INFO_SUCCESS_PRE_MODERATION: "검토를 위해 ${0} 파일을 제출하였고 승인 시 이 파일을 사용할 수 있습니다.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "검토를 위해 ${0} 파일을 제출하였고 승인 시 이 파일을 사용할 수 있습니다. "
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "파일 업로드 및 공유"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "취소",
	   CONFIRM_OTHER_TAB: "현재 조치를 계속하면 다른 탭에 입력한 정보가 사라집니다. 확인을 눌러 계속하거나 취소를 눌러 돌아가십시오.",
	   CONFIRM_CURRENT_TAB: "현재 조치를 계속하면 ${0} 탭에 입력한 정보가 사라집니다. 확인을 눌러 계속하거나 취소를 눌러 돌아가십시오.",
	   DIALOG_TITLE: "확인",
	   OK: "확인"
   }
})




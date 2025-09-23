define(
	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2008, 2012                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	// NLS_CHARSET=UTF-8
	({
	   submit: {label: "保存", a11y: "保存", tooltip: "保存"}, 
	   cancel: {label: "取消", a11y: "取消", tooltip: "取消"},
	   close: {label: "关闭", a11y: "关闭", tooltip: "关闭"},
	   title: {global: "共享内容", community: "与社区共享"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "共享操作不适用于此场景。",
		   ACTIONS_LOAD_ERROR: "装入共享操作时发生错误。",
		   CONTENT_LOAD_ERROR: "无法装入该内容。请稍后重试或与系统管理员联系。"},
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
	   COMMUNITYUPLOADFILE: {
		   SHARE: "共享",
		   UPLOAD: "上载",
		   CANCEL: "取消",
		   VISIBILITY_WARNING: "与此社区共享的文件将成为公共文件。",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "已成功与 ${1} 共享 ${0}。",
			   SUCCESS_PLURAL: "已成功与 ${1} 共享 ${0} 个文件。",
			   ERROR: "无法共享文件。请稍后重试。",
			   ERROR_X: "无法共享文件。  请稍后重试。",
	           MAX_SHARES_ERROR: "已超出最大共享数。",
	           EXTERNAL_SHARES_ERROR: "此文件只能在您的组织内共享。",
	           EXTERNAL_SHARES_ERROR_X: "只能在组织内部共享这些文件。",
	           NOT_LOGGED_IN_ERROR: "未共享文件，因为您尚未登录。请单击“共享”以共享文件。",
	           NOT_LOGGED_IN_ERROR_X: "由于您尚未登录，因此未共享这些文件。  请单击“共享”以共享这些文件。",
	           TIMEOUT_ERROR: "未共享文件，因为联系不到服务器。请单击“共享”以重试。",
	           TIMEOUT_ERROR_X: "未共享文件，因为联系不到服务器。请单击“共享”以重试。",
	           CANCEL_ERROR: "未共享文件，因为已取消请求。请单击“共享”以重试。",
	           CANCEL_ERROR_X: "未共享文件，因为已取消请求。请单击“共享”以重试。",
	           NOT_FOUND_ERROR: "文件已被删除或者不再可供您查看，因此无法共享。",
	           NOT_FOUND_ERROR_X: "文件已被删除或者不再可供您查看，因此无法共享。",
	           ACCESS_DENIED_ERROR: "您已没有共享此文件的许可权。",
	           ACCESS_DENIED_ERROR_X: "您已没有共享这些文件的许可权。",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "受限文件可能无法公开。",
	        	   ERROR_SHARE_X: "受限文件不可公开。"
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "已成功将 ${0} 上载到 ${1}。",
			   SUCCESS_PLURAL: "已成功将 ${0} 个文件上载到 ${1}。",
			   ERROR: "无法上载文件。请稍后重试。",
			   ERROR_X: "无法上载 ${0}。  请稍后重试。",
			   INFO_SUCCESS_PRE_MODERATION: "文件 ${0} 已提交复审，并且它将在核准后可用。",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} 个文件已提交复审，并且它们将在核准后可用。"
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "上载并共享文件"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "取消",
		   CONFIRM_OTHER_TAB: "如果您继续执行当前的操作，将会丢失在其他选项卡上已输入的信息。请按“确定”继续，或者按“取消”返回。",
		   CONFIRM_CURRENT_TAB: "如果您继续当前操作，那么您已在“${0}”选项卡上输入的信息将丢失。  请按“确定”继续，或者按“取消”返回。",
		   DIALOG_TITLE: "确认",
		   OK: "确定"
	   }
	})
	
	
);
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
		         label: "자세히",
		         tooltip: "추가 조치"
		       },
		       tags_more: "및 ${0} 이상",
		       ERROR_ALT: "오류",
		       PERSON_TITLE: "${user}의 프로파일을 엽니다.",
		       inactiveUser: "${user}(비활성)",
		       inactiveIndicator: "(비활성)",
		       like_error: "좋아요 설정을 저장할 수 없습니다. 나중에 다시 시도하십시오.",
		       vote_error: "투표를 저장할 수 없습니다. 나중에 다시 시도하십시오."
		   },
		   generic: {
		      untitled: "(제목 없음)",
		      tags: "태그:",
		      tags_more: "및 ${0} 이상",
		      likes: "좋아요",
		      comments: "댓글",
		      titleTooltip: "탐색: ${app}",
		      error: "데이터를 검색할 수 없습니다.",
		      timestamp: {
		         created: {
		            DAY: "${EEEE} ${time}에 작성됨",
		            MONTH: "${MMM} ${d}일에 작성됨",
		            TODAY: "오늘 ${time}에 작성됨",
		            YEAR: "${YYYY} ${MMM} ${d}일에 작성됨",
		            YESTERDAY: "어제 ${time}에 작성됨",
		            TOMORROW: "${YYYY} ${MMM} ${d}일에 작성됨"
		         },
		         updated: {
		            DAY: "${EEEE} ${time}에 업데이트됨",
		            MONTH: "${MMM} ${d}일에 업데이트됨",
		            TODAY: "오늘 ${time}에 업데이트됨",
		            YEAR: "${YYYY} ${MMM} ${d}일에 업데이트됨",
		            YESTERDAY: "어제 ${time}에 업데이트됨",
		            TOMORROW: "${YYYY} ${MMM} ${d}일에 업데이트됨"
		         }
		      },
		      visibility: {
		         pub: "공용",
		         priv: "개인용"
		      },
		      action: {
		         created: "작성됨",
		         updated: "업데이트 날짜"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "홈 페이지 및 이메일 요약에서 관심 대상으로 등록한 사람에 관한 업데이트를 수신합니다.",
		      profile_title: "${user}의 프로파일을 엽니다.",
		      profile_a11y: "이 링크를 활성화하면 ${user}의 프로파일을 새 창에서 엽니다.",
		      error: "오류가 발생했습니다.  ${again}.",
		      error_again: "다시 시도하십시오.",
		      error_404: "네트워크 요청이 더 이상 존재하지 않습니다.",
		      warning: "경고",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "현재 네트워크 연락처에 있습니다.",
		            	follow: "현재 네트워크 연락처에 있으며 관심 대상으로 ${user}을(를) 등록했습니다."
		            },
		            ignore: {
		            	nofollow: "초대를 무시했습니다.",
		            	follow: "초대를 무시했으며 현재 ${user}을(를) 관심 대상으로 등록했습니다."
		            }
		         },
		         error: {
		            accept: "요청을 승인하는 중에 오류가 발생했습니다.",
		            ignore: "요청을 무시하는 중에 오류가 발생했습니다."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} ${time}",
		              MONTH: "${MMM} ${d}일",
		              TODAY: "오늘 ${time}",
		              YEAR: "${YYYY} ${MMM} ${d}일",
		              YESTERDAY: "어제 ${time}",
		              TOMORROW: "${YYYY} ${MMM} ${d}일"
		           }
		      }
		   },
		   file: {
		      a11y_help: "이 링크를 활성화하면 ${name}을(를) 새 창에서 엽니다.",
		      tooltip: "파일 애플리케이션에서 ${name} 열기",
		      profile_title: "${user}의 프로파일을 엽니다.",
		      profile_a11y: "이 링크를 활성화하면 ${user}의 프로파일을 새 창에서 엽니다.",
		      download_tooltip: "이 파일 다운로드(${0})",
		      following: {
		         add: "파일 관심 대상으로 등록",
		         remove: "관심 대상에서 제거",
		         title: "이 파일에 대한 업데이트 수신 여부를 토글합니다."
		      },
		      share: {
		         label: "공유",
		         title: "기타 사용자에게 이 파일에 대한 액세스 부여"
		      },
		      timestamp: {
		         created: {
		            DAY: "${EEEE} ${time}에 작성됨",
		            MONTH: "${MMM} ${d}일에 작성됨",
		            TODAY: "오늘 ${time}에 작성됨",
		            YEAR: "${YYYY} ${MMM} ${d}일에 작성됨",
		            YESTERDAY: "어제 ${time}에 작성됨",
		            TOMORROW: "${YYYY} ${MMM} ${d}일에 작성됨"
		         },
		         createdOther: {
		            DAY: "${user}이(가) ${EEEE} ${time}에 작성함",
		            MONTH: "${user}이(가) ${MMM} ${d}일에 작성함",
		            TODAY: "${user}이(가) 오늘 ${time}에 작성함",
		            YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 작성함",
		            YESTERDAY: "${user}이(가) 어제 ${time}에 작성함",
		            TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 작성함"
		         },
		         updated: {
		            DAY: "${EEEE} ${time}에 업데이트됨",
		            MONTH: "${MMM} ${d}일에 업데이트됨",
		            TODAY: "오늘 ${time}에 업데이트됨",
		            YEAR: "${YYYY} ${MMM} ${d}일에 업데이트됨",
		            YESTERDAY: "어제 ${time}에 업데이트됨",
		            TOMORROW: "${YYYY} ${MMM} ${d}일에 업데이트됨"
		         },
		         updatedOther: {
		            DAY: "${user}이(가) ${EEEE} ${time}에 업데이트함",
		            MONTH: "${user}이(가) ${MMM} ${d}일에 업데이트함 ",
		            TODAY: "${user}이(가) 오늘 ${time}에 업데이트함",
		            YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 업데이트함",
		            YESTERDAY: "${user}이(가) 어제 ${time}에 업데이트함",
		            TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 업데이트함"
		         },
		         createdCompact: {
		            DAY: "작성: ${EEEE} ${time}",
		            MONTH: "작성: ${MMM} ${d}일",
		            TODAY: "작성: 오늘 ${time}",
		            YEAR: "작성: ${YYYY} ${MMM} ${d}일",
		            YESTERDAY: "작성: 어제 ${time}",
		            TOMORROW: "작성: ${YYYY} ${MMM} ${d}일"
		         },
		         updatedCompact: {
		            DAY: "업데이트: ${EEEE} ${time}",
		            MONTH: "업데이트: ${MMM} ${d}일",
		            TODAY: "업데이트: 오늘 ${time}",
		            YEAR: "업데이트: ${YYYY} ${MMM} ${d}일",
		            YESTERDAY: "업데이트: 어제 ${time}",
		            TOMORROW: "업데이트: ${YYYY} ${MMM} ${d}일"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long}, ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long}, ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "이 파일 다운로드(${size})",
		      	 DOWNLOAD_ALT: "다운로드"
		      },
		      PREVIEW: {
		         LINK: "미리보기",
		         TITLE: "새 창에서 이 파일을 미리봅니다."
		      },
		      TAGS: "태그:",
		      error: "오류가 발생했습니다.  ${again}.",
		      error_again: "다시 시도하십시오.",
		      error_404: "파일이 더 이상 존재하지 않거나 액세스할 충분한 권한이 없습니다.",
		      error_403: "이 파일을 볼 수 있는 권한이 없습니다.  공용 파일이 아니며 사용자와 공유되지 않습니다.",
		      notifications: {
		         USER_SHARED: "${user} 작성:",
		         CHANGE_SUMMARY: "${user}이(가) 변경 요약을 입력했습니다.",
		         NO_CHANGE_SUMMARY: "${user}이(가) 변경 요약을 입력하지 않았습니다.",
		         COMMENTED: "${user}이(가) 댓글을 작성했습니다. "
		      }
		   },
		   ecm_file: {
		      checkedout_you: "사용자가 체크아웃함",
		      checkedout_other: "${user}이(가) 체크아웃함",
		      tooltip: "라이브러리에서 ${name} 파일을 엽니다.",
		      draft_404_info: "초안이 삭제되었거나 더 이상 공유되지 않습니다. 공개된 버전이 이 파일의 최신 버전입니다.",
		      error_404: "파일이 삭제되었거나 더 이상 공유되지 않습니다.",
		      error_403: "파일이 삭제되었거나 더 이상 공유되지 않습니다.",
		      error_preview: "파일을 더 이상 미리 볼 수 없습니다.",
		      draft_review_canceled: "검토가 취소되었고 초안이 더 이상 공유되지 않습니다. 검토가 더 이상 요청되지 않습니다.",
		      switch_ee: "초안 보기",
		      switch_ee_tooltip: "이 파일의 최신 초안 보기"
		   },
		   ecm_draft: {
		      tooltip: "라이브러리에서 ${name} 초안을 엽니다.",
		      community_owners: "커뮤니티 소유자",
		      draft: "초안",
		      draft_tooltip: "초안 보는 중",
		      draft_general_info: "이전 초안이 더 이상 존재하지 않으며 새 초안이 현재 최신 버전입니다.",
		      draft_review_404_general_info: "검토자 중 한명이 이미 투표했습니다. 더 이상 이 초안을 검토하도록 요청되지 않습니다. ",
		      draft_review_404_request_info: "이전 초안이 더 이상 존재하지 않으며 최신 초안이 검토를 위해 제출되었습니다. 검토가 요청됩니다.",
		      draft_review_404_require_info: "이전 초안이 더 이상 존재하지 않으며 최신 초안이 검토를 위해 제출되었습니다. 검토가 필요합니다.",
		      draft_review_request_info: "검토가 요청됩니다.",
		      draft_review_require_info: "검토가 필요합니다.",
		      error_404: "초안이 삭제되었거나 더 이상 공유되지 않습니다. ",
		      error_403: "사용자와 공유되지 않으므로 이 초안을 볼 수 없습니다.",
		      error_preview: "미발송 문서를 더 이상 미리 볼 수 없습니다.",
		      switch_ee: "공개된 버전 보기",
		      switch_ee_tooltip: "이 파일의 공개된 버전 보기",
		      review: "검토",
		      reviewers: "검토자",
		      reviwers_addtl: "추가 검토자",
		      in_review: "검토 중인 초안",
		      in_review_tooltip: "검토 중인 초안 보기",
		      review_required_any: "커뮤니티 소유자가 이 초안을 한 명의 검토자가 검토하도록 요구합니다.",
		      review_required_all: "커뮤니티 소유자가 이 초안을 모든 검토자가 검토하도록 요구합니다.",
		      review_required_generic: "커뮤니티 소유자가 이 초안을 이들 검토자가 검토하도록 요구합니다.",
		      review_additional_required: "이 초안을 검토하려면 초안 제출자가 추가한 모든 검토자가 필요합니다.",
		      reivew_submitted_date: {
		         DAY: "${user}이(가) ${EEEE} ${time}에 검토를 위해 초안을 제출했습니다.",
		         MONTH: "${user}이(가) ${MMM} ${d}일에 검토를 위해 초안을 제출했습니다.",
		         TODAY: "${user}이(가) 오늘 ${time}에 검토를 위해 초안을 제출했습니다.",
		         YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 검토를 위해 초안을 제출했습니다.",
		         YESTERDAY: "${user}이(가) 어제 ${time}에 검토를 위해 초안을 제출했습니다.",
		         TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 검토를 위해 초안을 제출했습니다."
		      },
		      pending: "보류",
		      pending_rejected: "초안이 거부되었으므로 더 이상 검토가 필요하지 않습니다.",
		      approve: "승인",
		      approved: "승인됨",
		      approve_tooltip: "이 초안 승인",
		      accept_success: "이 초안을 수락했습니다. ",
		      accept_error: "이 초안을 승인하는 중에 오류가 발생했습니다. 다시 시도하십시오.",
		      accept_info: "이 초안을 수락했습니다. ",
		      reject: "거부",
		      rejected: "거부됨",
		      reject_tooltip: "이 초안 거부",
		      reject_success: "이 초안을 거부했습니다.",
		      reject_error: "이 초안을 거부하는 중에 오류가 발생했습니다. 다시 시도하십시오.",
		      reject_info: "이 초안을 거부했습니다."
		   },
		   authUser: {
		      error: "현재 사용자를 검색하는 중에 오류가 발생했습니다. ${again}.",
		      error_again: "다시 시도하십시오.",
		      error_404: "인증된 사용자를 찾을 수 없습니다.",
		      error_403: "사용자 정보를 검색할 수 있는 권한이 없습니다."
		   },
		   forum: {
		      error: "오류가 발생했습니다.  ${again}.",
		      error_again: "다시 시도하십시오.",
		      error_404: "포럼이 더 이상 존재하지 않거나 액세스할 충분한 권한이 없습니다.",
		      error_403: "이 포럼을 볼 수 있는 권한이 없습니다. 공용 포럼이 아니며 사용자와 공유되지 않습니다.",
		      readMore: "전체 주제 보기...",
		      readMore_tooltip: "${name} 포럼 주제를 엽니다.",
		      readMore_a11y: "이 링크를 활성화하면 ${name} 포럼 주제가 새 창에서 열립니다.",
		      QUESTION_ANSWERED: "이 질문이 응답되었습니다.",
		      QUESTION_NOT_ANSWERED: "이 질문에 아직 응답이 없습니다.",
		      attachments: "${count}개 첨부 파일",
		      attachments_one: "${count}개 첨부 파일"
		   },
		   blog: {
		      error: "오류가 발생했습니다.  ${again}.",
		      error_again: "다시 시도하십시오.",
		      error_404: "블로그가 더 이상 존재하지 않거나 액세스할 충분한 권한이 없습니다.",
		      error_403: "이 블로그를 볼 권한이 없습니다. 이 블로그는 공용이 아니며 사용자와 공유되지 않습니다.",
		      readMore: " 자세히 보기...",
		      readMore_tooltip: "${name} 블로그 항목을 엽니다.",
		      readMore_a11y: "이 링크를 활성화하면 ${name} 블로그 항목이 새 창에서 열립니다.",
		      graduated: "승격됨",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>투표</a>",
		  					TOOLTIP: 	"다음에 투표"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>투표함</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>투표함</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>실행 취소</a>",
		  					TOOLTIP: 	"다음에서 투표 제거"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0명의 사용자가 다음에 투표했음"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1명의 사용자가 다음에 투표했음"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount}의 사용자가 다음에 투표했음"
		  				}
		  			},
		  			LOADING: "로드 중...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "투표함"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "투표 한계에 도달했거나 더 이상 해당 아이디어를 사용할 수 없기 때문에 투표를 저장할 수 없습니다.",
		      readMore_tooltip: "${name} 아이디어를 엽니다.",
		      readMore_a11y: "이 링크를 활성화하면 ${name} 아이디어가 새 창에서 열립니다."
		   },
		   size: {
		      B: "${0}B",
		      KB: "${0}KB",
		      MB: "${0}MB",
		      GB: "${0}GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "답글",
		      THIS_ARIA_LABEL: "이 답글",
		      THIS_TAB_TITLE: "이 답글",
		      TAB_TITLE: "답글(${0})",
		      REPLY_TO_REPLY: "${thisReply}에 대한 응답",
		      REPLY_TO_TOPIC: "${thisTopic}에 대한 응답",
		      THIS_TOPIC: "이 주제",
		      THIS_REPLY: "이 답글",
		      NAVIGATE_TO_REPLY: "상위 답글로 이동",
		      NAVIGATE_TO_TOPIC: "상위 주제로 이동",
		      ADD_COMMENT: "이 주제에 답글 작성",
		      ADD_COMMENT_TOOLTIP: "이 포럼 주제에 답글 작성",
		      SHOWING_RECENT_REPLIES: "최근 ${0}개의 답글 표시",
		      PREV_COMMENTS: "자세히 응답 표시",
		      PLACEHOLDER_TXT: "이 주제에 답글 작성",
		      EMPTY: "답글이 없습니다.",
		      TRIM_LONG_COMMENT: "답글의 길이를 줄이시겠습니까?",
		      WARN_LONG_COMMENT: "답글이 너무 깁니다. ${shorten}",
		      ERROR: "답글을 검색하는 중에 오류가 발생했습니다. ${again}",
		      ERROR_CREATE: "답글을 저장할 수 없습니다. 나중에 다시 시도하십시오.",
		      ERROR_CREATE_NOT_FOUND: "주제가 삭제되었거나 더 이상 표시되지 않으므로 답글을 저장할 수 없습니다. ",
		      ERROR_CREATE_ACCESS_DENIED: "주제가 삭제되었거나 더 이상 표시되지 않으므로 답글을 저장할 수 없습니다. ",
		      ERROR_CREATE_TIMEOUT: "서버에 접속할 수 없으므로 답글을 저장할 수 없습니다. '저장'을 클릭하여 다시 시도하십시오.",
		      ERROR_CREATE_CANCEL: "요청이 취소되었으므로 답글을 저장할 수 없습니다. '저장'을 클릭하여 다시 시도하십시오.",
		      ERROR_CREATE_NOT_LOGGED_IN: "이 답글를 작성하려면 로그인해야 합니다. '저장'을 클릭하면 로그인하도록 프롬프트됩니다.",
		      ERROR_NO_CONTENT: "답글을 입력하고 '저장'을 클릭하십시오. 답글을 남기지 않으려면 '취소'를 클릭하십시오.",
		      ERROR_UNAUTHORIZED: "답글을 남길 권한이 없으므로 답글을 저장할 수 없습니다.",
		      COMMENT_DELETED: {
		         DAY: "${user}이(가) ${EEEE} ${time}에 답글을 삭제함",
		         MONTH: "${user}이(가) ${MMM} ${d}일에 답글을 삭제함",
		         TODAY: "${user}이(가) 오늘 ${time}에 답글을 삭제함",
		         YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 답글을 삭제함",
		         YESTERDAY: "${user}이(가) 어제 ${time}에 답글을 삭제함",
		         TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 답글을 삭제함"
		      },
		      REASON_FOR_DELETION: "삭제 이유: ${reason}",
		      REPLY_TITLE: "답글: ${0}",
		      SHOW_FULL_REPLY: "전체 답글 보기",
		      SHOW_FULL_REPLY_TOOLTIP: "포럼 주제의 원래 답글로 이동",
		      REPLY_ACTION: "답글",
		      REPLY_ACTION_TOOLTIP: "이 게시물에 답글 작성",
		      MODERATION_PENDING: "이 답글은 검토 보류 중입니다.",
		      MODERATION_QUARANTINED: "운영자가 게시를 검역소로 격리했습니다.",
		      MODERATION_REMOVED: {
		         DAY: "${user}이(가) ${EEEE} ${time}에 이 답글을 제거했습니다.",
		         MONTH: "${user}이(가) ${MMM} ${d}일에 이 답글을 제거했습니다.",
		         TODAY: "${user}이(가) 오늘 ${time}에 이 답글을 제거했습니다.",
		         YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 이 답글을 제거했습니다.",
		         YESTERDAY: "${user}이(가) 어제 ${time}에 이 답글을 제거했습니다.",
		         TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 이 답글을 제거했습니다."
		      },
		      MODERATION_REJECTED: {
		         DAY: "${user}이(가) ${EEEE} ${time}에 이 답글 거부했습니다.",
		         MONTH: "${user}이(가) ${MMM} ${d}일에 이 답글을 거부했습니다.",
		         TODAY: "${user}이(가) 오늘 ${time}에 이 답글을 거부했습니다.",
		         YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 이 답글을 거부했습니다.",
		         YESTERDAY: "${user}이(가) 어제 ${time}에 이 답글을 거부했습니다.",
		         TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 이 답글을 거부했습니다."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "검토를 위해 답글이 제출되었고 승인 시 답글을 사용할 수 있습니다."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "댓글",
		      PLACEHOLDER_TXT: "댓글 추가",
		      TAB_TITLE: "댓글(${0})",
		      ACTION_NOT_SUPPORTED: "지원되지 않는 조치",
		      ADD_COMMENT: "댓글 추가",
		      ADD_COMMENT_TOOLTIP: "이 항목에 댓글 추가",
		      CANCEL: "취소 ",
		      COMMENT_COUNT_ONE: "${0}개의 댓글",
		      COMMENT_COUNT_MANY: "${0}개의 댓글",
		      COMMENT_LABEL: "댓글:",
		      DELETE: "삭제",
		      DELETE_TOOLTIP: "댓글 삭제",
		      DELETEREASON: "이 댓글을 삭제하는 이유:",
		      DIALOG_TITLE: "축약된 댓글",
		      TOOLTIP: "축약된 댓글",
		      NAME: "축약된 댓글",
		      EDIT: "편집",
		      EDIT_TOOLTIP: "댓글 편집",
		      ERROR_CREATE: "댓글을 저장할 수 없습니다. 나중에 다시 시도하십시오.",
		      ERROR_CREATE_NOT_FOUND: "항목이 삭제되었거나 더 이상 표시되지 않으므로 댓글을 저장할 수 없습니다.",
		      ERROR_CREATE_ACCESS_DENIED: "항목이 삭제되었거나 더 이상 표시되지 않으므로 댓글을 저장할 수 없습니다.",
		      ERROR_CREATE_TIMEOUT: "서버에 접속할 수 없으므로 댓글을 저장할 수 없습니다. '게시'를 클릭하여 다시 시도하십시오.",
		      ERROR_CREATE_CANCEL: "요청이 취소되었으므로 댓글을 저장할 수 없습니다. '게시'를 클릭하여 다시 시도하십시오.",
		      ERROR_CREATE_NOT_LOGGED_IN: "이 댓글을 작성하려면 로그인해야 합니다. '게시'를 클릭하면 로그인하도록 프롬프트됩니다.",
		      ERROR_DELETE: "댓글을 삭제할 수 없습니다. 나중에 다시 시도하십시오.",
		      ERROR_DELETE_TIMEOUT: "서버에 접속할 수 없으므로 댓글을 삭제할 수 없습니다. '삭제'를 클릭하여 다시 시도하십시오.",
		      ERROR_DELETE_NOT_FOUND: "댓글 또는 항목이 삭제되었거나 더 이상 표시되지 않으므로 댓글을 삭제할 수 없습니다.",
		      ERROR_DELETE_ACCESS_DENIED: "항목이 삭제되었거나 더 이상 표시되지 않으므로 댓글을 삭제할 수 없습니다.",
		      ERROR_DELETE_CANCEL: "요청이 취소되었으므로 댓글을 삭제할 수 없습니다. '삭제'를 클릭하여 다시 시도하십시오.",
		      ERROR_DELETE_NOT_LOGGED_IN: "이 댓글을 삭제하려면 로그인해야 합니다. '삭제'를 클릭하면 로그인하도록 프롬프트됩니다.",
		      ERROR_EDIT: "댓글을 업데이트할 수 없습니다. 나중에 다시 시도하십시오.",
		      ERROR_EDIT_ACCESS_DENIED: "항목이 삭제되었거나 더 이상 표시되지 않으므로 댓글을 업데이트할 수 없습니다.",
		      ERROR_EDIT_NOT_FOUND: "항목이 삭제되었거나 더 이상 표시되지 않으므로 댓글을 업데이트할 수 없습니다.",
		      ERROR_EDIT_TIMEOUT: "서버에 접속할 수 없으므로 댓글을 업데이트할 수 없습니다. '게시'를 클릭하여 다시 시도하십시오.",
		      ERROR_EDIT_CANCEL: "요청이 취소되었으므로 댓글을 업데이트할 수 없습니다. '게시'를 클릭하여 다시 시도하십시오.",
		      ERROR_EDIT_NOT_LOGGED_IN: "이 댓글을 편집하려면 로그인해야 합니다. '게시'를 클릭하면 로그인하도록 프롬프트됩니다.",
		      ERROR_NO_CONTENT: "댓글을 입력하고 '게시'를 클릭하십시오. 댓글을 남기지 않으려면 '취소'를 클릭하십시오. ",
		      ERROR_NO_CONTENT_EDIT: "댓글을 입력하고 '게시'를 클릭하십시오. 댓글을 편집하지 않으려면 '취소'를 클릭하십시오. ",
		      ERROR_UNAUTHORIZED: "댓글을 남길 권한이 없으므로 댓글을 저장할 수 없습니다.",
		      ERROR_GENERAL: "오류가 발생했습니다.",
		      OK: "확인",
		      YES: "예",
		      TRIM_LONG_COMMENT: "댓글의 길이를 줄이시겠습니까?",
		      WARN_LONG_COMMENT: "댓글이 너무 깁니다. ${shorten}",
		      LINK: "링크",
		      SAVE: "저장",
		      POST: "게시",
		      SHOWMORE: "자세히 읽기...",
		      VIEW_COMMENTS_FILE: "이 파일에 대한 댓글 보기",
		      SUBSCRIBE_TO_COMMENTS: "이 댓글 구독",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "피드 리더를 통해 이 댓글의 변경사항을 확인합니다.",
		      PROFILE_TITLE: "${user}의 프로파일을 엽니다.",
		      PROFILE_A11Y: "이 링크를 활성화하면 ${user}의 프로파일을 새 창에서 엽니다.",
		      MODERATION_PENDING: "이 댓글은 검토 보류 중입니다.",
		      MODERATION_REMOVED: {
		         DAY: "${user}이(가) ${EEEE} ${time}에 이 댓글을 제거했습니다. ",
		         MONTH: "${user}이(가) ${MMM} ${d}일에 이 댓글을 제거했습니다.",
		         TODAY: "${user}이(가) 오늘 ${time}에 이 댓글을 제거했습니다.",
		         YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 이 댓글을 제거했습니다.",
		         YESTERDAY: "${user}이(가) 어제 ${time}에 이 댓글을 제거했습니다.",
		         TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 이 댓글을 제거했습니다."
		      },
		      MODERATION_REJECTED: {
		         DAY: "${user}이(가) ${EEEE} ${time}에 이 댓글을 거부했습니다.",
		         MONTH: "${user}이(가) ${MMM} ${d}일에 이 댓글을 거부했습니다.",
		         TODAY: "${user}이(가) 오늘 ${time}에 이 댓글을 거부했습니다.",
		         YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 이 댓글을 거부했습니다.",
		         YESTERDAY: "${user}이(가) 어제 ${time}에 이 댓글을 거부했습니다.",
		         TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 이 댓글을 거부했습니다."
		      },
		      PREV_COMMENTS: "이전 댓글 표시",
		      EMPTY: "댓글이 없습니다. ",
		      ERROR_ALT: "오류",
		      ERROR: "댓글을 검색하는 중에 오류가 발생했습니다. ${again}",
		      ERROR_ADDTL: "추가 댓글을 검색하는 중에 오류가 발생했습니다. ${again}",
		      ERROR_AGAIN: "다시 시도하십시오.",
		      ERROR_AGAIN_TITLE: "추가 댓글은 요청을 다시 시도하십시오.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} ${time}(버전 ${version})",
		         MONTH: "${user} ${MMM} ${d}일(버전 ${version})",
		         TODAY: "${user} 오늘 ${time}(버전 ${version})",
		         YEAR: "${user} ${YYYY} ${MMM} ${d}일(버전 ${version})",
		         YESTERDAY: "${user} 어제 ${time}(버전 ${version})",
		         TOMORROW: "${user} ${YYYY} ${MMM} ${d}일(버전 ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} ${time}",
		         MONTH: "${user} ${MMM} ${d}일",
		         TODAY: "${user} 오늘 ${time}",
		         YEAR: "${user} ${MMM} ${d}일, ${YYYY}",
		         YESTERDAY: "${user} 어제 ${time}",
		         TOMORROW: "${user} ${MMM} ${d}일, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} ${time}",
		         MONTH: "${MMM} ${d}일",
		         TODAY: "오늘 ${time}",
		         YEAR: "${YYYY} ${MMM} ${d}일",
		         YESTERDAY: "어제 ${time}",
		         TOMORROW: "${YYYY} ${MMM} ${d}일"
		      },
		      COMMENT_DELETED: {
		         DAY: "${user}이(가) ${EEEE} ${time}에 댓글을 삭제함",
		         MONTH: "${user}이(가) ${MMM} ${d}일에 댓글을 삭제함",
		         TODAY: "${user}이(가) 오늘 ${time}에 댓글을 삭제함",
		         YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 댓글을 삭제함",
		         YESTERDAY: "${user}이(가) 댓글을 어제 ${time}에 삭제함",
		         TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 댓글을 삭제함"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user}이(가) ${EEEE} ${time}에 편집함(버전 ${version})",
		         MONTH: "${user}이(가) ${MMM} ${d}일에 편집함(버전 ${version})",
		         TODAY: "${user}이(가) 오늘 ${time}에 편집함(버전 ${version})",
		         YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 편집함(버전 ${version})",
		         YESTERDAY: "${user}이(가) 어제 ${time}에 편집함(버전 ${version})",
		         TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 편집함(버전 ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user}이(가) ${EEEE} ${time}에 편집함",
		         MONTH: "${user}이(가) ${MMM} ${d}일에 편집함",
		         TODAY: "${user}이(가) 오늘 ${time}에 편집함",
		         YEAR: "${user}이(가) ${YYYY} ${MMM} ${d}일에 편집함,",
		         YESTERDAY: "${user}이(가) 어제 ${time}에 편집함",
		         TOMORROW: "${user}이(가) ${YYYY} ${MMM} ${d}일에 편집함,"
		      },
		      DELETE_CONFIRM: "이 댓글을 삭제하시겠습니까?",
		      FLAG_ITEM: {
		         BUSY: "저장 중...",
		         CANCEL: "취소 ",
		         ACTION: "부적절한 항목으로 플래그 지정",
		         DESCRIPTION_LABEL: "다음 항목에 플래그를 지정하는 이유 입력(선택사항) ",
		         EDITERROR: "오류 발생으로 파일의 메타데이터 편집 불가",
		         OK: "저장",
		         ERROR_SAVING: "요청 처리 중에 오류가 있습니다. 나중에 다시 시도하십시오.",
		         SUCCESS_SAVING: "플래그가 제출되었습니다. 운영자가 곧 검토할 예정입니다.",
		         TITLE: "이 항목을 부적절한 항목으로 플래그 지정",
		         COMMENT: {
		            TITLE: "이 댓글을 부적절한 항목으로 플래그 지정합니다. ",
		            A11Y: "이 단추는 사용자가 이 댓글을 부적절한 항목으로 플래그 지정할 수 있는 대화 상자를 엽니다."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "취소 ",
		      DIALOG_TITLE: "댓글 삭제",
		      NAME: "댓글 삭제",
		      OK: "확인",
		      TOOLTIP: "댓글 삭제"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "취소 ",
		      CONFIRM: "축약하는 경우, 댓글에 설정된 제한값을 넘는 텍스트는 제거됩니다. '확인'을 클릭해서 축약하거나 '취소'를 클릭해서 댓글을 편집하십시오.",
		      DIALOG_TITLE: "축약된 댓글",
		      NAME: "축약된 댓글",
		      OK: "확인",
		      TOOLTIP: "축약된 댓글"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "제출 확인",
		      CONFIRM: "검토를 위해 댓글이 제출되었고 승인 시 댓글을 사용할 수 있습니다.",
		      OK: "확인"
		   },
		   DATE: {
		      AM: "오전",
		      FULL: "${date_long} ${EEEE} ${time_long}",
		      PM: "오후",
		      TODAY: "오늘",
		      TODAY_U: "오늘",
		      YESTERDAY: "어제",
		      YESTERDAY_U: "어제",
		      ADDED: { DAY: "${EEee} ${time}에 추가됨",
		         FULL: "${date_long} ${EEEE} ${time_long}",
		         MONTH: "${date_long}에 추가됨",
		         TODAY: "오늘 ${time}에 추가됨 ",
		         YEAR: "${date_long}에 추가됨",
		         YESTERDAY: "어제 ${time}에 추가됨 "
		      },
		      LAST_UPDATED: { DAY: "${EEee} ${time}에 마지막 업데이트됨 ",
		         FULL: "${date_long} ${EEEE} ${time_long}",
		         MONTH: "${date_long}에 마지막 업데이트됨",
		         TODAY: "오늘 ${time}에 마지막 업데이트됨 ",
		         YEAR: "${date_long}에 마지막 업데이트됨",
		         YESTERDAY: "어제 ${time}에 마지막 업데이트됨"
		      },
		      MONTHS_ABBR: { 0: "1월",
		         10: "11월",
		         11: "12월",
		         1: "2월",
		         2: "3월",
		         3: "4월",
		         4: "5월",
		         5: "6월",
		         6: "7월",
		         7: "8월",
		         8: "9월",
		         9: "10월"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${date_long} ${EEEE} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "오늘",
		         YEAR: "${date_short}",
		         YESTERDAY: "어제",
		         TOMORROW: "내일"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} ${time}",
		         FULL: "${date_long} ${EEEE} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "오늘 ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "어제 ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} ${time}",
		         FULL: "${date_long} ${EEEE} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "오늘 ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "어제 ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} ${time}",
		         FULL: "${date_long} ${EEEE} ${time_long}",
		         MONTH: "${date_short} ${time}",
		         TODAY: "${date_short} ${time}",
		         YEAR: "${date_short} ${time}",
		         YESTERDAY: "${date_short} ${time}",
		         TOMORROW: "${date_short} ${time}"
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
		      UPDATED: { DAY: "${EEee} ${time}에 업데이트됨",
		         FULL: "${date_long} ${EEEE} ${time_long}",
		         MONTH: "${date_long}에 업데이트됨",
		         TODAY: "오늘 ${time}에 업데이트됨",
		         YEAR: "${date_long}에 업데이트됨",
		         YESTERDAY: "어제 ${time}에 업데이트됨"
		      }
		   },
		   VERSIONS: {
		      ERROR: "버전 정보를 표시할 수 없습니다.",
		      ERROR_REQUEST_CANCELLED: "요청이 취소되었습니다.",
		      ERROR_REQUEST_TIMEOUT: "서버에 접속할 수 없습니다.",
		      ERROR_REQUEST_UNKNOWN: "알 수 없는 오류가 발생했습니다.",
		      LOADING: "로드 중...",
		      NO_VERSIONS: "버전 없음",
		      INFO: "버전 ${0}, ${1}에 작성, 작성자: ",
		      VERSION_NUMBER: "버전 ${0}",
		      DELETED: "삭제됨",
		      DELETE_ALL: "다음 버전 이전의 모든 버전 삭제",
		      DELETE_VERSION_SINGLE: "버전 ${0} 삭제",
		      DELETEERROR: "오류가 발생하여 버전을 삭제할 수 없습니다.",
		      CREATE_VERSION: "새 버전 작성",
		      CREATE_VERSION_TOOLTIP: "이 파일의 버전 작성",
		      REVERT_VERSION: "버전 ${0} 복원 ",
		      REVERT_DESCRIPTION: "버전 ${0}에서 복원됨 ",
		      PREVIOUS: "이전",
		      PREVIOUS_TOOLTIP: "이전 페이지",
		      ELLIPSIS: "...",
		      NEXT: "다음",
		      NEXT_TOOLTIP: "다음 페이지",
		      COUNT: "${0} - ${1}/${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "페이지",
		      SHOW: "표시",
		      ITEMS_PER_PAGE: " 페이지당 항목 수",
		      DATE: {
		        AM: "오전",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "오늘 ${time}",
		            YESTERDAY: "어제 ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} ${time}",
		            YEAR: "${date_short} ${time}",
		            FULL: "${date_long} ${EEEE} ${time_long}",
		            MONTH: "${date_short} ${time}",
		            TODAY: "오늘 ${time}",
		            YESTERDAY: "어제 ${time}"
		        },
		        UPDATED: { DAY: "${EEee} ${time}에 업데이트됨",
		            YEAR: "${date_short}에 업데이트됨 ",
		            FULL: "${date_long} ${EEEE} ${time_long}",
		            MONTH: "${date_short}에 업데이트됨 ",
		            TODAY: "오늘 ${time}에 업데이트됨",
		            YESTERDAY: "어제 ${time}에 업데이트됨"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "버전 ${0} 삭제",
		         DOWNLOAD: "다운로드",
		         DOWNLOAD_TOOLTIP: "이 버전 다운로드(${0})",
		         VIEW: "보기",
		         VIEW_TOOLTIP: "버전 ${0} 보기 ",
		         REVERT: {
		            A11Y: "이 단추는 사용자가 이전 버전의 파일 복원을 확인할 수 있는 대화 상자를 엽니다. 이 조치를 수행하면 해당 페이지의 내용이 새로 고침됩니다.",
		            FULL: "복원",
		            WIDGET: "이 버전 복원"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "버전이 이미 삭제되었거나 더 이상 표시되지 않으므로 버전을 삭제할 수 없습니다.",
		         ERROR_ACCESS_DENIED: "편집자가 아니므로 버전을 삭제할 수 없습니다.",
		         ERROR_TIMEOUT: "서버에 접속할 수 없으므로 버전을 삭제할 수 없습니다. '삭제'를 다시 클릭하여 요청을 다시 시도하십시오.",
		         ERROR_CANCEL: "요청이 취소되었으므로 버전을 삭제할 수 없습니다. '삭제'를 다시 클릭하여 요청을 다시 시도하십시오.",
		         ERROR_NOT_LOGGED_IN: "이 버전을 삭제하려면 로그인해야 합니다. '삭제'를 클릭하면 로그인하도록 프롬프트됩니다.",
		         GENERIC_ERROR: "알 수 없는 오류가 발생하여 버전을 삭제할 수 없습니다. '삭제'를 다시 클릭하여 요청을 다시 시도하십시오.",
		         FULL: "삭제",
		         A11Y: "이 단추는 사용자가 이 버전의 삭제를 확인할 수 있는 대화 상자를 엽니다. 이 조치를 수행하면 해당 페이지의 내용이 새로 고침됩니다."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "버전이 삭제되었거나 더 이상 표시되지 않으므로 버전을 복원할 수 없습니다.",
		         ERROR_ACCESS_DENIED: "편집자가 아니므로 버전을 복원할 수 없습니다.",
		         ERROR_NAME_EXISTS: "같은 이름의 파일이 있으므로 버전을 복원할 수 없습니다.",
		         ERROR_TIMEOUT: "서버에 접속할 수 없으므로 버전을 복원할 수 없습니다.  '복원'을 다시 클릭하여 요청을 다시 시도하십시오.",
		         ERROR_CANCEL: "요청이 취소되었으므로 버전을 복원할 수 없습니다. '복원'을 다시 클릭하여 요청을 다시 시도하십시오.",
		         ERROR_QUOTA_VIOLATION: "공간이 제한되어 버전을 복원할 수 없습니다.",
		         ERROR_MAX_CONTENT_SIZE: "버전이 허용된 최대 파일 크기인 ${0}보다 크므로 버전을 복원할 수 없습니다.",
		         GENERIC_ERROR: "알 수 없는 오류가 발생하여 버전을 복원할 수 없습니다.  '복원'을 다시 클릭하여 요청을 다시 시도하십시오."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "다운로드한 사용자 표시...",
		      PREVIOUS: "이전",
		      PREVIOUS_TOOLTIP: "이전 페이지",
		      ELLIPSIS: "...",
		      NEXT: "다음",
		      NEXT_TOOLTIP: "다음 페이지",
		      COUNT: "${0} - ${1}/${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "페이지",
		      SHOW: "표시",
		      ITEMS_PER_PAGE: " 페이지당 항목 수",
		      VERSION: {
		         DAY: "버전 ${version}, ${date}",
		         MONTH: "버전 ${version}, ${date}",
		         TODAY: "버전 ${version}, ${time}",
		         YEAR: "버전 ${version}, ${date}",
		         YESTERDAY: "버전 ${version}, 어제"
		      },
		      FILE: {
		         V_LATEST: "이 파일의 최신 버전을 다운로드했습니다.",
		         V_OLDER: "이 파일의 ${0} 버전을 최종 다운로드했습니다.",
		         LOADING: "로드 중...",
		         EMPTY: "익명의 사용자만 해당",
		         ERROR: "다운로드 정보 로드 불가능"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "오류",
		      ERROR_ALT_TEXT: "오류:",
		      ERROR_MSG_GENERIC: "문제가 발생했습니다. 다시 시도하십시오.",
		      ERROR_MSG_NOT_AVAILABLE: "이 항목이 삭제되었거나 더 이상 사용할 수 없습니다.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "이 항목의 컨텐츠를 사용할 수 없습니다.",
		      ERROR_MSG_NO_ACCESS: "이 항목에 액세스할 수 없습니다.",
		      LOADING: "로드 중...",
		      TITLE_SU: "${author}이(가) 메시지를 게시했습니다.",
		      TITLE_NI: "${author}이(가) 귀하를 네트워크에 가입하도록 초대했습니다.",
		      AUTHOR_TITLE: "${author}의 프로파일 보기",
		      OPEN_LINK: "${title} 열기",
		      CONFIRM_CLOSE_TITLE: "확인",
		      CONFIRM_CLOSE_MESSAGE: "변경사항을 버리시겠습니까?  확인을 눌러 계속하거나 취소를 눌러 돌아가십시오.",
		      OK: "확인",
		      CANCEL: "취소 "
		   },
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
		   statusUpdate: {
		       createdCompact: {
		           DAY: "작성: ${EEEE} ${time}",
		           MONTH: "작성: ${MMM} ${d}일",
		           TODAY: "작성: 오늘 ${time}",
		           YEAR: "작성: ${YYYY} ${MMM} ${d}일",
		           YESTERDAY: "작성: 어제 ${time}",
		           TOMORROW: "작성: ${YYYY} ${MMM} ${d}일"
		       },
		      error: "오류가 발생했습니다.  ${again}.",
		      error_again: "다시 시도하십시오.",
		      error_404: "상태 업데이트가 더 이상 존재하지 않습니다.",
		      notifications: {
		         STATUS_UPDATE: "${user}이(가) 메시지를 게시함",
		         USER_BOARD_POST: "${user}이(가) 사용자의 게시판에 게시물을 작성함",
		         POST_COMMENT: "${user} 작성:"
		      }
		   },
		   login: {
		      error: "사용자 이름 및/또는 비밀번호가 기존 계정과 일치하지 않습니다. 다시 시도하십시오.",
		      logIn: "로그인",
		      password: "비밀번호:",
		      user: "사용자 이름:",
		      welcome: "HCL Connections에 로그인"
		   },
		   repost: {
		      name: "재게시",
		      title: "이 업데이트를 내 팔로워 또는 커뮤니티에 다시 게시",
		      msg_success: "업데이트가 사용자의 팔로워에 다시 게시되었습니다.",
		      msg_generic: "문제가 발생했습니다. 다시 시도하십시오."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "추가",
		      ADD_TXT: "사람 또는 커뮤니티를 독자로 추가",
		      SHOW_MORE: "추가 표시...",
		      READER_IF_PUBLIC: "모든 사용자(공용)",
		      READER_IF_PUBLIC_TOOLTIP: "이 파일은 공용이고 모든 사용자가 볼 수 있습니다.",
		      EMPTY_READERS: "없음",
		      READERS_LABEL: "독자:\u00a0",
		      EDITORS_LABEL: "편집자:\u00a0",
		      OWNER_LABEL: "소유자:\u00a0",
		      ERROR: "공유 정보 로드 불가능",
		      ERROR_NOT_FOUND: "요청한 파일이 삭제되었거나 이동되었습니다. 다른 사용자가 이 링크를 보낸 경우 링크가 올바른지 확인하십시오.",
		      ERROR_ACCESS_DENIED: "이 파일을 볼 수 있는 권한이 없습니다.  공용 파일이 아니며 사용자와 공유되지 않습니다.",
		      SHARE: "공유",
		      CANCEL: "취소 ",
		      SHARE_WITH: "공유 대상:",
		      PERSON: "개인",
		      COMMUNITY: "커뮤니티",
		      PLACEHOLDER: "사용자 이름 또는 이메일...",
		      MESSAGE: "메시지:",
		      MESSAGE_TXT: "선택적 메시지 추가",
		      REMOVE_ITEM_ALT: "${0} 제거",
		      NO_MEMBERS: "없음",
		      A11Y_READER_ADDED: "${0}을(를) 독자로 선택함",
		      A11Y_READER_REMOVED: "${0}을(를) 독자로 제거함",
		      SELF_REFERENCE_ERROR: "사용자 자신과 공유할 수 없습니다.",
		      OWNER_REFERENCE_ERROR: "파일의 소유자와 공유할 수 없습니다.",
		      SHARE_COMMUNITY_WARN: "공용 커뮤니티 '${0}'과(와) 공유하면 이 파일은 공용이 됩니다.",
		      SELECT_USER_ERROR: "공유할 사용자나 커뮤니티를 최소 한 명 이상 선택해야 합니다.",
		      WARN_LONG_MESSAGE: "메시지가 너무 깁니다.",
		      TRIM_LONG_MESSAGE: "메시지의 길이를 줄이시겠습니까?",
		      ERROR_SHARING: "이 파일을 공유할 수 없습니다. 나중에 다시 시도하십시오.",
		      INFO_SUCCESS: "파일이 공유되었습니다.",
		      MAX_SHARES_ERROR: "최대 공유 수를 초과했습니다.",
		      NOT_LOGGED_IN_ERROR: "로그인하지 않았으므로 파일을 공유할 수 없습니다.  '공유'를 클릭하여 파일을 공유하십시오.",
		      TIMEOUT_ERROR: "서버에 접속할 수 없으므로 파일을 공유할 수 없습니다. '공유'를 클릭하여 다시 시도하십시오.",
		      CANCEL_ERROR: "요청이 취소되었으므로 파일을 공유할 수 없습니다. '공유'를 클릭하여 다시 시도하십시오.",
		      NOT_FOUND_ERROR: "파일이 삭제되었거나 더 이상 표시되지 않으므로 공유할 수 없습니다.",
		      ACCESS_DENIED_ERROR: "이 파일을 공유할 수 있는 권한이 없습니다.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "제한된 파일은 공용 파일로 만들 수 없습니다.",
		      TOOLTIP: "기타 사용자에게 이 파일에 대한 액세스 부여"
		   },
		   HISTORY: {
		      TAB_TITLE: "최근 업데이트",
		      NO_HISTORY: "최근 업데이트가 없습니다.",
		      EMPTY: "이 항목에 대한 최근 업데이트를 검색할 수 없습니다. 삭제되었거나 액세스 권한이 없습니다. ",
		      MORE: "이전 업데이트 표시",
		      ERROR_ALT: "오류",
		      ERROR: "업데이트를 검색하는 중에 오류가 발생했습니다. ${again}",
		      ERROR_ADDTL: "추가 업데이트를 검색하는 중에 오류가 발생했습니다. ${again}",
		      ERROR_AGAIN: "다시 시도하십시오.",
		      ERROR_AGAIN_TITLE: "추가 업데이트는 요청을 다시 시도하십시오.",
		      PROFILE_TITLE: "${user}의 프로파일을 엽니다.",
		      SORT_BY: "정렬 기준\\:",
		      SORTS: {
		         DATE: "날짜",
		         DATE_TOOLTIP: "가장 최근 히스토리부터 가장 이전 업데이트로 정렬합니다.",
		         DATE_TOOLTIP_REVERSE: "가장 이전 히스토리부터 가장 최근 업데이트로 정렬합니다."
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} ${time}",
		             MONTH: "${MMM} ${d}일",
		             TODAY: "오늘 ${time}",
		             YEAR: "${YYYY} ${MMM} ${d}일",
		             YESTERDAY: "어제 ${time}",
		             TOMORROW: "${YYYY} ${MMM} ${d}일"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "댓글",
			   REPLY_ACTION: "답글",
		       REPLY_ACTION_TOOLTIP: "이 댓글에 답글 작성"
		   },
		   OAUTH: {
		      welcomeHeader: "Connections 시작",
		      continueBtnLabel: "계속",
		      continueBtnA11y: "이 링크를 활성화하면 Connections에 대한 액세스 권한 부여를 허용할 수 있는 새 창이 열립니다.",
		      clickHere: "여기를 클릭",
		      infoMsg: "사용자 데이터에 액세스하려면 Connections에 사용자 권한이 필요합니다.",
		      authorizeGadget: "이 애플리케이션이 Connections 정보에 액세스할 수 있는 권한을 부여하려면 ${clickHere}.",
		      confirmAuthorization: "이 애플리케이션에 Connections 정보에 액세스할 수 있는 권한을 부여한 것을 확인하려면 ${clickHere}."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "이 링크를 활성화하면 Connections Library 저장소에 대한 액세스 권한 부여를 허용할 수 있는 새 창이 열립니다.",
		      infoMsg: "사용자 데이터에 액세스하려면 Connections Library 저장소에 사용자 권한이 필요합니다.",
		      authorizeGadget: "이 애플리케이션이 Connections Library 저장소 정보에 액세스할 수 있는 권한을 부여하려면 ${clickHere}.",
		      confirmAuthorization: "Connections Library 저장소 정보에 액세스할 수 있는 권한을 이 애플리케이션에 부여한 것을 확인하려면 ${clickHere}."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "취소 ",
		      CONFIRM: "변경사항을 버리시겠습니까?  확인을 눌러 계속하거나 취소를 눌러 돌아가십시오.",
		      DIALOG_TITLE: "확인",
		      NAME: "확인",
		      OK: "확인",
		      TOOLTIP: "확인"
		   }
});

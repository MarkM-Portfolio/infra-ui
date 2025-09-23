/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

//NLS_CHARSET=UTF-8

define ({
  root: {
     FILE_VIEWER_TITLE: "파일 미리보기",
     FILENAME_TOOLTIP: "파일 이름 편집",
     ICON_TOOLTIP: "파일 다운로드",
     ERROR: "오류가 발생했습니다.",
     SHARED_EXTERNALLY: "외부적으로 공유됨",
     FILE_SYNCED: "동기화에 추가됨",
     MORE_ACTIONS: {
       TITLE: "추가 조치",
       A11Y: "파일에서 수행할 추가 조치 목록이 있는 드롭 다운 메뉴를 엽니다."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "추가 옵션",
         A11Y: "이 단추는 추가 옵션에 대한 메뉴를 엽니다."
       },
       BUTTON: {
         EDIT: {
           TITLE: "편집"
         },
         UPLOAD: {
           TITLE: "업로드"
         }
       }
     },
     WELCOME: {
       TITLE: "파일 보기 및 세부사항 조합",
       SUBTITLE: "파일과 댓글을 나란히 볼 수 있습니다.",
       LINES: {
          LINE_1: "예전 페이지에서 할 수 있던 모든 것과 정보가 여기 있습니다.",
          LINE_2: "댓글, 공유, 버전 및 기본 정보가 파일의 측면에서 사용 가능합니다."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "이 단추는 다음 파일로 이동합니다.",
      PREVIOUS_A11Y: "이 단추는 이전 파일로 이동합니다."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "닫기",
         A11Y: "이 단추는 파일 뷰어를 닫습니다."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "파일에서 새로 작성",
         ACTION_NAME:"파일 작성",
         A11Y: {
           TEXT: "템플리트 파일에서 문서(DOC,DOCX 또는 ODT 파일)를 작성합니다. Docs에서 이러한 문서를 온라인으로 편집할 수 있습니다.",
           PRES: "템플리트 파일에서 프리젠테이션(PPT, PPTX 또는 ODP 파일)을 작성합니다. Docs에서 이러한 프리젠테이션을 온라인으로 편집할 수 있습니다.",
           SHEET: "템플리트 파일에서 스프레드시트(XLS, XLSX 또는 ODS 파일)를 작성합니다. Docs에서 이러한 스프레드시트를 온라인으로 편집할 수 있습니다."
         },
         PROMPT: {
           TEXT: "템플리트 파일에서 문서(DOC,DOCX 또는 ODT 파일)를 작성합니다. Docs에서 이러한 문서를 온라인으로 편집할 수 있습니다.",
           PRES: "템플리트 파일에서 프리젠테이션(PPT, PPTX 또는 ODP 파일)을 작성합니다. Docs에서 이러한 프리젠테이션을 온라인으로 편집할 수 있습니다.",
           SHEET: "템플리트 파일에서 스프레드시트(XLS, XLSX 또는 ODS 파일)를 작성합니다. Docs에서 이러한 스프레드시트를 온라인으로 편집할 수 있습니다."
         },
         NAME_FIELD: "이름:",
         EXTERNAL_FIELD: "파일은 내 조직 외부 사용자와 공유될 수 있음",
         EXTERNAL_DESC: "외부 액세스는 파일을 외부 사용자(조직 또는 회사 외부의 사용자), 외부 사용자와 공유된 폴더 및 회원 등 외부 사용자와의 커뮤니티와 공유할 수 있습니다. 파일을 업로드할 때 외부 액세스를 설정해야 나중에 켜질 수 있습니다.",
         CREATE_BUTTON: "작성",
         CANCEL: "취소",
         PRE_FILL_NAMES: {
           OTT: "제목 없는 문서",
           OTS: "제목 없는 스프레드시트",
           OTP: "제목 없는 프리젠테이션",
           DOT: "제목 없는 문서",
           XLT: "제목 없는 스프레드시트",
           POT: "제목 없는 프리젠테이션",
           DOTX: "제목 없는 문서",
           XLTX: "제목 없는 스프레드시트",
           POTX: "제목 없는 프리젠테이션"
         },
         ERRORS: {
           NAME_REQUIRED: "문서 이름이 필요합니다.",
           ILLEGAL_NAME:"문서 제목이 올바르지 않습니다. 다른 이름을 지정하십시오.",
           WARN_LONG_NAME: "문서 이름이 너무 깁니다.",
           TRIM_NAME: "문서 이름을 줄이십시오.",
           SESSION_TIMEOUT: "세션이 만료되었습니다. 로그인하고 다시 시도하십시오.",
           DUPLICATE_NAME: "중복된 파일 이름을 찾았습니다. 새 이름을 입력하십시오.",
           SERVER_ERROR: "Connections 서버를 사용할 수 없습니다. 서버 관리자에게 문의한 후 나중에 다시 시도하십시오."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "파일 다운로드",
         A11Y: "이 단추는 파일을 다운로드합니다."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "PDF로 다운로드",
         TOOLTIP: "이 파일을 PDF 파일로 다운로드",
         A11Y: "이 단추는 파일을 PDF로 다운로드합니다.",
         SUCCESS: "파일을 PDF로 다운로드했습니다.",
         ERROR: {
           DEFAULT: "파일을 PDF로 다운로드할 수 없습니다. 나중에 다시 시도하십시오.",
           UNAUTHENTICATED: "세션 제한시간이 초과되었습니다. 파일을 PDF로 다운로드하려면 다시 로그인해야 합니다.",
           NOT_FOUND: "파일을 삭제했거나 더 이상 공유하지 않아서 이 파일을 PDF로 다운로드할 수 없습니다.",
           ACCESS_DENIED: "파일을 삭제했거나 더 이상 공유하지 않아서 이 파일을 PDF로 다운로드할 수 없습니다."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "다운로드할 이 파일의 공개 버전이 없습니다. Docs 편집기에서 버전을 공개할 수 있습니다."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "파일을 다운로드할 수 없음",
           CANCEL: "닫기",
           PROMPT: "다운로드할 이 파일의 공개 버전이 없습니다.",
           PROMPT2: "Docs 편집기에서 버전을 공개할 수 있습니다."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "파일을 다운로드할 수 없음",
           CANCEL: "닫기",
           PROMPT: "다운로드할 이 파일의 공개 버전이 없습니다.",
           PROMPT2: "파일 소유자에게 이 파일의 버전을 공개하도록 요청하십시오."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "버전 다운로드",
           OK: "버전 다운로드",
           PROMPT: {
             TODAY: "오늘 ${time}에 마지막으로 편집한 최신 초안이 발견되었습니다.",
             YESTERDAY: "어제 ${time}에 마지막으로 편집한 최신 초안이 발견되었습니다.",
             DAY: "${date}에 마지막으로 편집한 최신 초안이 발견되었습니다.",
             MONTH: "${date}에 마지막으로 편집한 최신 초안이 발견되었습니다.",
             YEAR: "${date_long}에 마지막으로 편집한 최신 초안이 발견되었습니다."
           },
           PROMPT2: {
             TODAY: "오늘 ${time}에 공개된 버전을 계속 다운로드하시겠습니까?",
             YESTERDAY: "어제 ${time}에 공개된 버전을 계속 다운로드하시겠습니까?",
             DAY: "${date}에 공개된 버전을 계속 다운로드하시겠습니까?",
             MONTH: "${date}에 공개된 버전을 계속 다운로드하시겠습니까?",
             YEAR: "${date_long}에 공개된 버전을 계속 다운로드하시겠습니까?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "세부사항 패널 표시",
         HIDE: "세부사항 패널 숨기기",
         SHOW_A11Y: "이 단추는 가로 패널 열기 및 닫기를 전환합니다. 가로 패널은 현재 닫혀 있습니다.",
         HIDE_A11Y: "이 단추는 가로 패널 열기 및 닫기를 전환합니다. 가로 패널은 현재 열려 있습니다."
       },
       VIEW_DOC: {
         NAME: "Docs 뷰어에서 열기",
         TOOLTIP: "Docs 뷰어에서 열기",
         A11Y: "이 단추는 새 브라우저 창의 내부에 파일을 엽니다."
       },
       EDIT_DOC: {
         NAME: "Docs에서 편집",
         TOOLTIP: "Docs에서 파일 편집",
         A11Y: "이 단추는 Docs에서 편집하기 위해 새 브라우저 창의 내부에 파일을 엽니다."
       },
       ROUNDTRIP_EDIT: {
         NAME: "데스크탑에서 편집",
         DIALOG_TITLE: "데스크탑에서 편집",
         TOOLTIP: "이 문서 편집",
         A11Y: "이 단추는 로컬로 편집하기 위해 파일을 엽니다.",
         PROMPT: "이 기능을 사용하여 파일을 로컬로 편집할 수 있습니다.",
         IMPORTANT: "중요:",
         REMINDER: "편집을 완료하면 데스크탑 파일 커넥터를 사용하여 초안을 공개해야 합니다. 파일을 여는 데 실패하는 경우 데스크탑 플러그인을 설치해야 합니다.",
         SKIP_DIALOG: "이 메시지를 다시 표시하지 않습니다.",
         OK: "확인",
         CANCEL: "취소"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "확인",
         DELETE_VERSION: "버전 ${version} 삭제",
         DELETE_VERSION_AND_PRIOR: "버전 ${version} 및 모든 이전 버전 삭제",
         PROMPT: "${version} 버전을 삭제하려고 합니다. 계속하시겠습니까?",
         DELETE_PRIOR: "모든 이전 버전도 삭제합니다.",
         ERROR: "버전을 삭제하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
         TOOLTIP: "이 버전 삭제",
         OK: "확인",
         CANCEL: "취소"
       },
       GET_LINKS: {
         DIALOG_TITLE: "링크 가져오기",
         LINK_FILE: "파일에 링크:",
         LINK_PREVIEW: "미리보기 파일에 링크:",
         LINK_DOWNLOAD: "다운로드 파일에 링크:",
         TOOLTIP: "파일에 링크",
         OK: "닫기"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "이 버전 다운로드"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "확인",
         PROMPT: "이 파일의 현재 버전을 ${version} 버전으로 대체하려고 합니다. 계속하시겠습니까?",
         ERROR: "버전을 복원하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
         TOOLTIP: "이 버전 복원",
         CHANGE_SUMMARY: "${version} 버전에서 복원됨",
         OK: "확인",
         CANCEL: "취소"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "확인",
         REMOVE_EVERYONE: "이 파일에 대한 조직의 액세스를 제거하시겠습니까? 액세스를 제거하면 조직 레벨 액세스를 허용하는 폴더 및 커뮤니티에서 파일이 제거되고 소유자 및 공유 사용자만 해당 파일을 보고 작업할 수 있습니다.",
         REMOVE_USER: "${user}과(와) 공유를 중지하시겠습니까? 공유를 중지하면 ${user}이(가) 폴더를 통해서 액세스하거나 조직의 모든 사용자와 공유하는 경우 이 파일에 액세스할 수 있습니다.",
         REMOVE_COMMUNITY: "${communityName} 커뮤니티에서 이 파일을 제거하시겠습니까?",
         REMOVE_FOLDER: "${folderName} 폴더에서 이 파일을 제거하시겠습니까?",
         REMOVE_EVERYONE_TOOLTIP: "조직의 액세스를 제거합니다.",
         REMOVE_USER_TOOLTIP: "${user}과(와)의 모든 공유를 제거합니다.",
         REMOVE_COMMUNITY_TOOLTIP: "${communityName} 커뮤니티에서 제거",
         REMOVE_FOLDER_TOOLTIP: "${folderName} 폴더에서 제거",
         OK: "확인",
         CANCEL: "취소"
       },
       EDIT_COMMENT: {
         TOOLTIP: "댓글 편집"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "확인",
         PROMPT: "이 댓글을 삭제하시겠습니까?",
         ERROR: "댓글을 삭제하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
         TOOLTIP: "댓글 삭제",
         OK: "확인",
         CANCEL: "취소"
       },
       LIKE: {
         LIKE: "파일을 좋아합니다.",
         UNLIKE: "파일을 좋아하지 않습니다.",
         LIKE_A11Y: "이 단추는 파일을 좋아하는 것으로 표시합니다.",
         UNLIKE_A11Y: "이 단추는 파일을 좋아하지 않는 것으로 표시합니다.",
         LIKED_SUCCESS: "이 파일을 좋아합니다.",
         UNLIKE_SUCCESS: "이 파일을 좋아하지 않습니다."
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "설명 편집",
         ERROR: {
           DEFAULT: "설명을 저장할 수 없습니다. 나중에 다시 시도하십시오.",
           UNAUTHENTICATED: "세션 제한시간이 초과되었습니다. 설명을 업데이트하려면 다시 로그인해야 합니다.",
           NOT_FOUND: "파일이 삭제되었거나 더 이상 공유되지 않으므로 설명을 저장할 수 없습니다.",
           ACCESS_DENIED: "파일이 삭제되었거나 더 이상 공유되지 않으므로 설명을 저장할 수 없습니다."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "파일 이름을 저장하는 중에 오류 발생",
           CONFLICT: "파일 이름이 이미 존재함"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "이 파일을 관심 대상으로 등록하는 데 오류가 발생했습니다. 나중에 다시 시도하십시오.",
             UNAUTHENTICATED: "세션 제한시간이 초과되었습니다. 이 파일을 관심 대상으로 등록하려면 먼저 로그인해야 합니다.",
             NOT_FOUND: "파일이 삭제되었거나 더 이상 공유되지 않아서 이 파일을 관심 대상으로 등록할 수 없습니다.",
             ACCESS_DENIED: "파일이 삭제되었거나 더 이상 공유되지 않아서 이 파일을 관심 대상으로 등록할 수 없습니다."
           },
           UNFOLLOW: {
             DEFAULT: "이 파일을 관심 대상에서 제거하는 데 오류가 발생했습니다. 나중에 다시 시도하십시오.",
             UNAUTHENTICATED: "세션 제한시간이 초과되었습니다. 이 파일을 관심 대상에서 제거하려면 먼저 로그인해야 합니다.",
             NOT_FOUND: "파일이 삭제되었거나 더 이상 공유되지 않아서 이 파일을 관심 대상에서 제거할 수 없습니다.",
             ACCESS_DENIED: "파일이 삭제되었거나 더 이상 공유되지 않아서 이 파일을 관심 대상에서 제거할 수 없습니다."
           }
         },
         FOLLOW_NAME: "관심 대상으로 등록",
         FOLLOW_TOOLTIP: "이 파일을 관심 대상으로 등록",
         FOLLOW_A11Y: "이 단추는 파일을 관심 대상으로 등록합니다.",
         FOLLOW_SUCCESS: "이 파일을 관심 대상으로 등록했습니다.",
         STOP_FOLLOWING_NAME: "관심 대상에서 제거",
         STOP_FOLLOWING_TOOLTIP: "이 파일을 관심 대상에서 제거",
         STOP_FOLLOWING_A11Y: "이 단추는 파일을 관심 대상에서 제거합니다.",
         STOP_FOLLOWING_SUCCESS: "이 파일을 관심 대상에서 제거했습니다."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "동기화에 추가",
           TOOLTIP: "이 파일을 동기화에 추가",
           A11Y: "이 단추는 파일을 동기화에 추가합니다.",
           SUCCESS: "이 파일을 동기화에 추가했습니다.",
           ERROR: {
             DEFAULT: "이 파일을 동기화에 추가하는 중 오류가 발생했습니다. 나중에 다시 시도하십시오.",
             UNAUTHENTICATED: "세션 제한시간이 초과되었습니다. 이 파일을 동기화에 추가하기 전에 먼저 로그인해야 합니다.",
             NOT_FOUND: "파일이 삭제되었거나 더 이상 공유되지 않아서 이 파일을 동기화에 추가할 수 없습니다.",
             ACCESS_DENIED: "파일이 삭제되었거나 더 이상 공유되지 않아서 이 파일을 동기화에 추가할 수 없습니다."
           }
         },
         STOP_SYNC: {
           NAME: "동기화에서 제거",
           TOOLTIP: "이 파일을 동기화에서 제거",
           A11Y: "이 단추는 파일을 동기화에서 제거합니다.",
           SUCCESS: "이 파일을 동기화에서 제거했습니다.",
           ERROR: {
             DEFAULT: "이 파일을 추가하여 동기화에서 제거하는 중 오류가 발생했습니다. 나중에 다시 시도하십시오.",
             UNAUTHENTICATED: "세션 제한시간이 초과되었습니다. 이 파일을 동기화에서 제거하려면 다시 로그인해야 합니다.",
             NOT_FOUND: "파일이 삭제되었거나 더 이상 공유되지 않아서 이 파일을 동기화에서 제거할 수 없습니다.",
             ACCESS_DENIED: "파일이 삭제되었거나 더 이상 공유되지 않아서 이 파일을 동기화에서 제거할 수 없습니다."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "고정",
          FAVORITE_TOOLTIP: "이 파일 고정",
          FAVORITE_A11Y: "이 단추는 파일을 고정합니다.",
          FAVORITE_SUCCESS: "이 파일을 고정했습니다.",
          STOP_FAVORITEING_NAME: "고정 해제",
          STOP_FAVORITEING_TOOLTIP: "이 파일 고정 해제",
          STOP_FAVORITEING_A11Y: "이 단추는 파일을 고정 해제합니다.",
          STOP_FAVORITEING_SUCCESS: "이 파일을 고정 해제했습니다."
       },
       TRASH: {
         NAME: "휴지통으로 이동",
         DIALOG_TITLE: "확인",
         PROMPT: "이 파일을 휴지통으로 이동하시겠습니까? 이 파일을 휴지통으로 이동하면 현재 공유하고 있는 사용자가 이 파일을 사용할 수 없게 됩니다.",
         ERROR: "파일을 삭제하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
         TOOLTIP: "이 파일 삭제",
         OK: "확인",
         CANCEL: "취소",
         A11Y: "이 단추는 파일을 휴지통으로 이동합니다.",
         SUCCESS_MSG: "${file}이(가) 휴지통으로 이동되었습니다."
       },
       REFRESH: {
         NAME: "새로 고침",
         ERROR: "파일 뷰어를 새로 고치는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
         TOOLTIP: "파일 뷰어 새로 고침",
         INFO_MSG: "최신 컨텐츠를 확보하려면 새로 고치십시오. ${link}",
         A11Y: "이 단추는 파일을 휴지통으로 이동합니다.",
         SUCCESS_MSG: "컨텐츠가 새로 고쳐졌습니다."
       },
       COPY_FILE: {
         NAME: "커뮤니티에 사본 제공",
         DIALOG_TITLE: "확인",
         ERROR: "파일을 복사하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
         TOOLTIP: "커뮤니티에 이 파일의 사본 제공",
         OK: "확인",
         CANCEL: "취소",
         A11Y: "이 단추는 이 파일의 사본을 커뮤니티에 제공할 수 있는 대화 상자를 엽니다.",
         SUCCESS_MSG: "${file}이(가) ${community}에 복사되었습니다."
       },
       UPLOAD_VERSION: {
         NAME: "새 버전 업로드",
         NAME_SHORT: "업로드",
         CHANGE_SUMMARY: "선택적 변경 요약...",
         TOOLTIP: "이 파일의 새 버전 업로드",
         A11Y: "이 단추를 사용하면 이 파일의 새 버전을 업로드할 수 있는 대화 상자가 열립니다."
       },
       LOG_IN: {
    	   NAME: "로그인",
    	   TOOLTIP: "파일, 댓글을 업로드하고 공유하며 폴더를 작성하기 위해 로그인합니다."
       },
       LOCK: {
          NAME: "파일 잠금",
          TITLE: "이 파일 잠금",
          A11Y: "이 파일 잠금",
          SUCCESS: "파일이 잠겼습니다."
       },
       UNLOCK: {
          NAME: "파일 잠금 해제",
          TITLE: "이 파일 잠금 해제",
          A11Y: "이 파일 잠금 해제",
          SUCCESS: "파일이 잠금 해제되었습니다."
       },
       EDIT_ON_DESKTOP: {
          NAME: "데스크탑에서 편집",
          TITLE: "데스크탑에서 편집",
          A11Y: "데스크탑에서 편집"
       },
       FLAG: {
         FILE: {
           NAME: "부적절한 항목으로 플래그 지정",
           TITLE: "파일 플래그 지정",
           A11Y: "이 파일을 부적절한 항목으로 플래그 지정합니다.",
           PROMPT: "이 파일에 플래그를 지정하는 이유 제공(선택사항):",
           OK: "플래그",
           CANCEL: "취소",
           SUCCESS: "파일에 플래그가 지정되고 검토를 위해 제출되었습니다.",
           ERROR: "이 파일에 플래그 지정하는 데 오류가 발생했습니다. 나중에 다시 시도하십시오."
         },
         COMMENT: {
           NAME: "부적절한 항목으로 플래그 지정",
           TITLE: "댓글 플래그 지정",
           A11Y: "이 댓글을 부적절한 항목으로 플래그 지정합니다.",
           PROMPT: "이 댓글에 플래그를 지정하는 이유 제공(선택사항):",
           OK: "플래그",
           CANCEL: "취소",
           SUCCESS: "댓글에 플래그가 지정되고 검토를 위해 댓글이 제출되었습니다.",
           ERROR: "이 댓글에 플래그 지정하는 데 오류가 발생했습니다. 나중에 다시 시도하십시오."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "이 파일 정보",
       VIEW_FILE_DETAILS: "파일 세부사항 보기",
       A11Y: "이 링크를 활성화하면 파일 뷰어가 닫히고 이 파일의 파일 세부사항 페이지로 이동합니다."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "이 파일에 사용 가능한 미리보기가 없습니다."
      },
      IMAGE: {
       ZOOM_IN: "확대",
       ZOOM_OUT: "축소",
       RESET: "재설정",
       ZOOM_IN_A11Y: "이 단추는 이미지에서 확대합니다.",
       ZOOM_OUT_A11Y: "이 단추는 이미지에서 축소합니다.",
       RESET_ZOOM_A11Y: "이 단추는 확대/축소 레벨을 재설정합니다."
      },
      VIEWER: {
       LOADING: "로드 중...",
       NO_PUBLISHED_VERSION: "이 파일의 공개된 버전을 볼 수 없습니다.",
       IFRAME_TITLE: "이 파일 미리보기"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "오늘 ${time}에 ${user}이(가) 최종 업데이트",
       YESTERDAY: "어제 ${time}에 ${user}이(가) 최종 업데이트",
       DAY: "${EEee} ${time}에 ${user}이(가) 최종 업데이트",
       MONTH: "${date_long}에 ${user}이(가) 최종 업데이트",
       YEAR: "${date_long}에 ${user}이(가) 최종 업데이트"
      },
      CREATED: {
       TODAY: "오늘 ${time}에 ${user}이(가) 작성",
       YESTERDAY: "어제 ${time}에 ${user}이(가) 작성",
       DAY: "${EEee} ${time}에 ${user}이(가) 작성",
       MONTH: "${date_long}에 ${user}이(가) 작성",
       YEAR: "${date_long}에 ${user}이(가) 작성"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - 오늘",
       YESTERDAY: "${time} - 어제",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "오늘",
       YESTERDAY: "어제",
       DAY: "${EEee}",
       MONTH: "${date_long}",
       YEAR: "${date_long}"
      }
     },
     FILE_SIZE: {
      BYTES: "${size}B",
      KILOBYTES: "${size}KB",
      MEGABYTES: "${size}MB",
      GIGABYTES: "${size}GB",
      TERRABYTES: "${size}TB"
     },
     COMMENT_BOX: {
       TITLE: "댓글 텍스트 영역",
       SHADOW_TEXT: "댓글 추가...",
       CANNOT_ACCESS_CONTENT: "멘션된 다음 사용자는 컨텐츠에 액세스할 수 없으므로 댓글을 볼 수 없습니다.",
       ERROR: "멘션하려는 사용자를 유효성 검증하는 중에 오류가 발생했습니다.",
       POST: "게시",
       SAVE: "저장",
       CANCEL: "취소",
       EXTERNAL_WARNING: "댓글은 조직 외부 사람이 볼 수 있습니다."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "취소",
         A11Y: "이 단추는 파일 이름의 편집 조치를 취소합니다."
       },
       INVALID_CHARACTERS: "올바르지 않은 문자",
       INVALID_CHARACTERS_REMOVED: "올바르지 않은 문자가 제거됨"
     },
     COMMENT_WIDGET: {
       EDITED: "(편집됨)",
       EDITED_DATE: {
         TODAY: "오늘 ${time}에 편집됨",
         YESTERDAY: "어제 ${time}에 편집",
         DAY: "${EEee} ${time}에 편집됨",
         MONTH: "${date_long}에 편집됨",
         YEAR: "${date_long}에 편집됨"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "저장",
       CANCEL: "취소",
       USER: "사용자",
       COMMUNITY: "커뮤니티",
       SHARE: "공유",
       SHARE_ALT: "이 사용자와 공유합니다.",
       MEMBER_TYPE: "회원 유형",
       PERSON_SHADOW: "사용자를 검색하려면 입력",
       COMMUNITY_SHADOW: "커뮤니티를 검색하려면 입력",
       PERSON_FULL_SEARCH: "검색된 사용자가 없습니까? 상세 검색을 사용하십시오.",
       COMMUNITY_FULL_SEARCH: "검색된 커뮤니티가 없습니까? 상세 검색을 사용하십시오.",
       ADD_OPTIONAL_MESSAGE: "선택적 메시지 추가",
       ROLE_LABEL: "역할",
       ROLE_EDIT: "편집자",
       ROLE_VIEW: "독자"
     },
     FILE_STATE: {
       DOCS_FILE: "이는 Docs 파일입니다. 모든 편집사항은 온라인으로 작성해야 합니다.",
       LOCKED_BY_YOU: {
         TODAY: "${time}에 사용자가 잠금.",
         YESTERDAY: "어제 ${time}에 사용자가 잠금.",
         DAY: "${date}에 사용자가 잠금.",
         MONTH: "${date}에 사용자가 잠금.",
         YEAR: "${date_long}에 사용자가 잠금."
       },
       LOCKED_BY_OTHER: {
         TODAY: "${time}에 ${user}이(가) 잠금.",
         YESTERDAY: "어제 ${time}에 ${user}이(가) 잠금.",
         DAY: "${user}이(가) ${date}에 잠금.",
         MONTH: "${user}이(가) ${date}에 잠금.",
         YEAR: "${user}이(가) ${date_long}에 잠금."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "댓글이 너무 깁니다.",
         TRIM: "댓글의 길이를 줄이시겠습니까?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "설명이 너무 깁니다.",
         TRIM: "설명의 길이를 줄이시겠습니까?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "메시지가 너무 깁니다.",
         TRIM: "메시지의 길이를 줄이시겠습니까?"
       },
       TAG: {
         WARN_TOO_LONG: "태그가 너무 깁니다.",
         TRIM: "태그의 길이를 줄이시겠습니까?"
       },
       TAGS: {
         WARN_TOO_LONG: "하나 이상의 태그가 너무 깁니다.",
         TRIM: "태그의 길이를 줄이시겠습니까?"
       },
       FILENAME: {
         WARN_TOO_LONG: "파일 이름이 너무 긺"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Docs 자격을 구매한 경우에만 이 파일을 온라인으로 편집할 수 있습니다.",
       CURRENT_EDITORS: "이 파일은 현재 웹에서 ${users}이(가) 편집 중입니다.",
       UNPUBLISHED_CHANGES: "버전으로 공개되지 않은 이 초안에 대한 편집이 있습니다.",
       PUBLISH_A_VERSION: "버전 공개",
       PUBLISH_SUCCESS: "이 파일의 버전을 공개함",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "액세스가 거부되어 버전을 공개할 수 없습니다.",
         NOT_FOUND: "문서를 찾을 수 없어 버전을 공개할 수 없습니다.",
         CANNOT_REACH_REPOSITORY: "Docs 서버를 파일 저장소에 연결할 수 없으므로 버전을 공개할 수 없습니다.",
         QUOTA_VIOLATION: "공간이 제한되어 버전을 공개할 수 없습니다. 이 버전을 공개할 수 있도록 다른 파일을 제거하여 충분한 여유 공간을 확보하십시오.",
         CONVERSION_UNAVAILABLE: "Docs 변환 서비스를 사용할 수 없으므로 버전을 공개할 수 없습니다. 나중에 다시 시도하십시오.",
         TOO_LARGE: "문서가 너무 커서 버전을 공개할 수 없습니다.",
         CONVERSION_TIMEOUT: "Docs 변환 서비스에서 문서를 변환하는 데 시간이 너무 오래 걸리므로 버전을 공개할 수 없습니다. 나중에 다시 시도하십시오.",
         SERVER_BUSY: "Docs 서버가 사용 중이므로 버전을 공개할 수 없습니다. 나중에 다시 시도하십시오.",
         DEFAULT: "Docs 서비스를 사용할 수 없으므로 버전을 공개할 수 없습니다. 나중에 다시 시도하십시오."
       }
     },
     COMMENTS: {
       EMPTY: "댓글이 없습니다.",
       MODERATED: "검토를 위해 댓글이 제출되었고 승인되면 사용 가능합니다.",
       ERROR: {
         SAVE: {
           DEFAULT: "댓글을 저장할 수 없습니다. 나중에 다시 시도하십시오.",
           UNAUTHENTICATED: "세션 제한시간이 초과되었습니다. 댓글을 저장하려면 다시 로그인해야 합니다.",
           NOT_FOUND: "파일이 삭제되었거나 더 이상 공유되지 않으므로 댓글을 저장할 수 없습니다.",
           ACCESS_DENIED: "파일이 삭제되었거나 더 이상 공유되지 않으므로 댓글을 저장할 수 없습니다."
         },
         DELETE: {
           DEFAULT: "댓글을 삭제할 수 없습니다. 나중에 다시 시도하십시오.",
           UNAUTHENTICATED: "세션 제한시간이 초과되었습니다. 댓글을 삭제하려면 다시 로그인해야 합니다.",
           NOT_FOUND: "파일이 삭제되었거나 더 이상 공유되지 않으므로 댓글을 삭제할 수 없습니다.",
           ACCESS_DENIED: "파일이 삭제되었거나 더 이상 공유되지 않으므로 댓글을 삭제할 수 없습니다."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "저장",
       EDIT_TAGS: "태그 편집",
       ERROR: {
         SAVE: {
           DEFAULT: "태그를 작성할 수 없습니다. 나중에 다시 시도하십시오."
         },
         DELETE: {
           DEFAULT: "태그를 삭제할 수 없습니다. 나중에 다시 시도하십시오."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "자세히 읽기...",
       READ_LESS: "간단히 읽기..."
     },
     SHARE: {
	     EVERYONE: "내 조직의 모든 사용자",
	     ADD_TOOLTIP: "저장",
	     ROLES: {
	       OWNER: "소유자",
	       EDIT: "편집자",
	       VIEW: "독자",
	       FOLDER: "폴더와 공유"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "소유자"
	       },
	       EDIT: {
	         ROLE: "편집",
           ADD: "편집기 추가"
	       },
	       VIEW: {
	         ROLE: "독자",
           ADD: "독자 추가"
	       },
	       FOLDER: {
           ADD: "폴더 추가",
           COMMUNITY_ADD: "폴더에 추가",
           MOVE: "폴더로 이동"
	       },
	       MULTI: {
	         ADD: "사용자 또는 커뮤니티 추가",
	         ADD_PEOPLE: "사용자 추가"
	       }
	     },
	     PUBLIC: {
	        SHORT: "내 조직의 모든 사용자",
	        LONG: {
	           GENERIC: "조직의 모든 사용자.",
	           ORG: "${org}의 모든 사용자."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "이 파일은 이미 ${user}과(와) 공유되고 있습니다.",
	       ERROR: "${user}과(와) 공유할 수 없습니다.",
	       SELF: "사용자 자신과 공유할 수 없습니다."
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user}이(가) 더 높은 공유 역할로 승격되었습니다."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "${user}과(와) 공유함"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "선택적 메시지..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "외부 사용자 프로비저닝",
            ACTION: "외부 사용자 프로비저닝...",
            TOOLTIP: "외부 사용자 프로비저닝",
            DIALOG_TITLE: "컨텐츠가 공유되지 않음",
            PROMPT: {
              NO_ACCOUNT: "다음 사용자는 계정이 없으므로 컨텐츠를 공유하지 않습니다.",
              INVITE: "이 사용자와 컨텐츠를 공유하려면 게스트로 초대하십시오."
            },
            SUBMIT: "초대 계속",
            CANCEL: "취소",
            ERROR: "계정을 프로비저닝하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
            SUCCESS: "사용자 계정을 프로비저닝했습니다."
	       },
	       PLURAL: {
	         NAME: "외부 사용자 프로비저닝",
	         ACTION: "외부 사용자 프로비저닝...",
	         TOOLTIP: "외부 사용자 프로비저닝",
	         DIALOG_TITLE: "컨텐츠가 공유되지 않음",
	         PROMPT: {
	           NO_ACCOUNT: "다음 사용자의 계정이 없어서 컨텐츠가 해당 사용자와 공유되지 않았습니다.",
	           INVITE: "이러한 사용자를 게스트로 초대하여 컨텐츠를 이들과 공유합니다."
	         },
	         SUBMIT: "초대 진행",
	         CANCEL: "취소",
	         ERROR: "계정을 프로비저닝하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
	         SUCCESS: "사용자 계정을 프로비저닝했습니다."
	       },
	       ABSTRACT: {
	         NAME: "외부 사용자 프로비저닝",
            ACTION: "외부 사용자 프로비저닝...",
            TOOLTIP: "외부 사용자 프로비저닝",
            DIALOG_TITLE: "컨텐츠가 공유되지 않음",
            PROMPT: {
              NO_ACCOUNT: "일부 사용자에게 계정이 없어서 컨텐츠를 공유하지 않습니다.",
              INVITE: "이러한 사용자를 게스트로 초대하여 컨텐츠를 이들과 공유합니다."
            },
            SUBMIT: "초대 진행",
            CANCEL: "취소",
            ERROR: "계정을 프로비저닝하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
            SUCCESS: "사용자 계정을 프로비저닝했습니다."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "공유 옵션",
         PROPAGATION: "다른 사용자에게 이 파일 공유 허용",
         EVERYONE: "모든 사용자가 이 파일을 공유할 수 있습니다.",
         OWNER_ONLY: "소유자만 이 파일을 공유할 수 있습니다.",
         STOP_SHARE: "공유 중지",
         MAKE_INTERNAL: "외부 공유 중지",
         MAKE_INTERNAL_SUCCESS: "이 파일은 더 이상 조직 외부의 사용자와 공유할 수 없습니다.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "내부 작성 여부",
           PROMPT: "이 파일을 내부에서 작성하면 더 이상 조직 외부의 사용자와 공유할 수 없습니다. ${br}${br}" +
             "외부 사용자, 커뮤니티 또는 폴더와의 모든 공유가 제거됩니다.${br}${br}파일을 내부에서 작성하는 작업은 영구적이며 실행 취소할 수 없습니다."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "파일 공유 중지",
           PROMPT: "이 파일의 공유를 중지하시겠습니까?",
           QUESTION_PUBLIC: "이 파일이 더 이상 조직의 모든 사용자에게 표시되지 않거나 사용자, 폴더 또는 커뮤니티와 공유되지 않습니다. 이 조작은 실행 취소할 수 없습니다.",
           QUESTION_PUBLIC_E: "이 파일이 더 이상 조직의 모든 사용자에게 표시되지 않거나 사용자 또는 폴더와 공유되지 않습니다. 이 조작은 실행 취소할 수 없습니다.",
           QUESTION: "파일이 더 이상 사용자 또는 커뮤니티와 공유되지 않으며 개인 폴더를 제외한 모든 폴더에서 제거됩니다. 이 조치는 실행 취소할 수 없습니다.",
           QUESTION_E: "이 파일이 더 이상 사용자와 공유되지 않으며 개인 폴더를 제외한 모든 폴더에서 제거됩니다. 이 조치는 실행 취소할 수 없습니다."
         },
         MAKE_PRIVATE_SUCCESS: "이제 이 파일은 개인용입니다.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "파일 공유를 중지할 수 없습니다. 나중에 다시 시도하십시오."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "내 공유"
	   },
	   STREAM: {
	     LOADING: "로드 중...",
	     LOAD_MORE: "로드 자세히..."
	   },
	   ENTRY: {
	     REMOVE: "제거",
	     RESTORE: "복원",
	     EDIT: "편집",
	     DELETE: "삭제",
	     OK: "확인",
	     CANCEL: "취소",
	     USER_PICTURE: "${0}의 그림",
	     FLAG: "부적절한 항목으로 플래그 지정"
	   },
	   PANEL: {
	     LOAD_ERROR: "이 파일의 메타데이터에 액세스하는 데 오류가 발생했습니다.",
	     ABOUT: {
	       TITLE: "제품 정보",
	       EXPAND_BUTTON: "자세한 정보를 보려면 이 단추를 펼치십시오.",
	       CURRENT_VERSION_HEADER: "현재 버전 ${versionNumber}",
	       FILE_SIZE_HEADER: "파일 크기",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - 현재 버전",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - 모든 버전",
	       DOCS_DRAFT_UPDATED_HEADER: "초안이 편집됨",
	       DOCS_DRAFT_CREATED_HEADER: "초안이 작성됨",
	       DOCS_UPDATED_HEADER: "공개됨",
	       DOCS_CREATED_HEADER: "작성됨",
	       UPDATED_HEADER: "업데이트된 날짜",
	       CREATED_HEADER: "작성됨",
	       LIKES_HEADER: "좋아요",
	       LIKES_EXPAND_ICON: "파일을 좋아하는 사람을 보려면 이 아이콘을 펼치십시오.",
	       DOWNLOADS_HEADER: "다운로드",
	       DOWNLOADS_HEADER_MORE: "다운로드(${0})",
	       DOWNLOADS_EXPAND_ICON: "파일을 다운로드한 사람을 보려면 이 아이콘을 펼치십시오.",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} 익명",
	       DOWNLOADS_LATEST_VERSION: "이 파일의 최신 버전이 있습니다.",
	       DOWNLOADS_LAST_VERSION: "이 파일의 ${0} 버전을 최종 다운로드했습니다.",
	       TAGS_HEADER: "태그",
	       DESCRIPTION_HEADER: "설명",
	       DESCRIPTION_READ_MORE: "자세히 읽기...",
	       LINKS_HEADER: "링크",
	       SECURITY: "보안",
	       FILE_ENCRYPTED: "파일 컨텐츠가 암호화되었습니다. 암호화된 파일 컨텐츠를 검색할 수 없습니다. 파일 컨텐츠를 보고 HCL Docs를 사용하여 편집할 수 없습니다.",
	       GET_LINKS: "링크 확보...",
	       ADD_DESCRIPTION: "설명 추가",
	       NO_DESCRIPTION: "설명 없음",
	       ADD_TAGS: "태그 추가",
	       NO_TAGS: "태그 없음"
	     },
	     COMMENTS: {
	       TITLE: "댓글",
	       TITLE_WITH_COUNT: "댓글(${0})",
	       VERSION: "버전 ${0}",
	       FEED_LINK: "이 댓글 피드",
	       FEED_TITLE: "피드 리더를 통해 이 댓글의 변경사항을 확인합니다."
	     },
	     SHARING: {
	       TITLE: "공유",
	       TITLE_WITH_COUNT: "공유(${0})",
	       SHARED_WITH_FOLDERS: "폴더와 공유 - ${count}",
	       SEE_WHO_HAS_SHARED: "공유한 사용자 표시",
           COMMUNITY_FILE: "커뮤니티가 소유한 파일은 다른 사용자나 커뮤니티에 공유될 수 없습니다.",
           SHARED_WITH_COMMUNITY: "'${0}' 커뮤니티의 회원과 공유합니다.",
           LOGIN: "로그인",
           NO_SHARE: "이 파일은 폴더에 아직 추가되지 않았습니다.",
           ONE_SHARE: "이 파일이 액세스 권한이 없는 1개의 폴더 또는 커뮤니티에 있습니다.",
           MULTIPLE_SHARE: "이 파일이 액세스 권한이 없는 ${fileNumber} 폴더 또는 커뮤니티에 있습니다."
	     },
	     VERSIONS: {
	       TITLE: "버전",
	       TITLE_WITH_COUNT: "버전(${0})",
	       FEED_LINK: "이 버전 피드",
	       FEED_TITLE: "피드 리더를 통해 이 파일의 변경사항을 확인합니다."
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "조치 확인",
       DIALOG_TITLE: "확인",
       PROMPT: "이 조치를 수행하시겠습니까?",
       ERROR: "조치를 수행하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
       TOOLTIP: "조치 수행",
       OK: "확인",
       CANCEL: "취소",
       A11Y: "이 단추가 현재 조치를 수행합니다."
     },
     THUMBNAIL: {
       TITLE: "작은 그림",
       CHANGE_LINK: "작은 그림 변경...",
       ERROR: "작은 그림을 저장할 수 없습니다. 나중에 다시 시도하십시오.",
       EXT_ERROR: "지원되는 확장자인 ${0} 중 하나로 된 파일을 선택하십시오.",
       SUCCESS: "작은 그림이 변경되었습니다.",
       UPLOAD: "저장",
       CANCEL: "취소"
     },
     UPLOAD_VERSION: {
       LINK: "새 버전 업로드...",
       CHANGE_SUMMARY: "선택적 변경 요약...",
       ERROR: "새 버전을 저장할 수 없습니다. 나중에 다시 시도하십시오.",
       SUCCESS: "새 버전을 저장했습니다.",
       UPLOAD: "업로드",
       UPLOAD_AND_CHANGE_EXTENSION: "업로드 및 확장자 변경",
       CANCEL: "취소"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "파일에 액세스하는 중에 오류가 발생했습니다. 나중에 다시 시도하십시오.",
       UNAUTHENTICATED: "세션 제한시간이 초과되었습니다. 파일을 보려면 다시 로그인해야 합니다.",
       NOT_FOUND: "요청한 파일이 삭제되었거나 이동되었습니다. 다른 사용자가 이 링크를 보낸 경우 링크가 올바른지 확인하십시오.",
       ACCESS_DENIED: "이 파일을 볼 수 있는 권한이 없습니다. 파일은 사용자와 공유되지 않습니다.",
       ACCESS_DENIED_ANON: "이 파일을 볼 수 있는 권한이 없습니다. 이 파일이 사용자의 파일이거나 사용자와 공유된 파일인 경우 먼저 로그인해야 합니다."
     },
     LOAD_ERROR: {
       DEFAULT: "링크에 액세스하는 데 오류가 발생했습니다.",
       ACCESS_DENIED: "이 파일을 볼 수 있는 권한을 요청하려면 파일 소유자에게 문의하십시오."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - 파일",
       LOAD_ERROR: "파일 액세스 중에 오류"
     }
  },

   "pt-br": true,
    "ca": true,
    "cs": true,
    "da": true,
    "nl": true,
    "fi": true,
    "fr": true,
    "de": true,
    "el": true,
    "hu": true,
    "pt": true,
    "it": true,
    "ja": true,
    "ko": true,
    "no": true,
    "pl": true,
    "ru": true,
    "zh": true,
    "sl": true,
    "es": true,
    "sv": true,
    "th": true,
    "zh-tw": true,
    "tr": true
});

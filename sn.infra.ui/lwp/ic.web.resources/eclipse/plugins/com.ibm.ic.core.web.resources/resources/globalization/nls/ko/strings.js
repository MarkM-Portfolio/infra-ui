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
         "windowtitle" : "다국어 지원",
         "unavailable" : "다국어 지원 설정을 사용할 수 없음",
         "details" : "자주 사용하는 언어, 자주 사용하는 달력, 사용자 생성 텍스트가 흐르는 방향을 지정하십시오.",
         "error" : "다국어 지원 설정이 오류로 인해 검색되지 않았습니다.",
         "titlebar" : {
            "tab2" : "애플리케이션 액세스",
            "tab1" : "이메일 알림",
            "tab3" : "다국어 지원"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "이 단추를 누르면 현재 페이지가 새 컨텐츠로 새로 고쳐집니다. 이 메뉴로 돌아가려면 다음으로 다시 이동하십시오. "
         },
         "details_nolanguage" : "자주 사용하는 달력 및 사용자 생성 텍스트가 흐르는 방향을 지정하십시오.",
         "a11y" : {
            "titlebar_label" : "HCL Connections 설정",
            "body_label" : "다국어 지원 설정"
         },
         "heading" : "다국어 지원 설정"
      },
      "restore_defaults" : {
         "error" : "오류가 발생했습니다. 나중에 다시 시도하십시오.",
         "action_tooltip" : "다국어 지원 설정을 원래 기본값으로 복원합니다.",
         "action" : "기본값 복원",
         "success" : "다국어 지원 설정이 원래 기본값으로 복원되었습니다. "
      },
      "help" : {
         "help" : "도움말",
         "close" : "닫기"
      },
      "save" : {
         "error" : "오류가 발생했습니다. 나중에 다시 시도하십시오.",
         "action_tooltip" : "다국어 지원 설정 저장",
         "action" : "저장",
         "success" : "다국어 지원 설정이 업데이트되었습니다. "
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "오류: ",
            "icon_alt" : "오류"
         },
         "success" : {
            "a11y_label" : "성공: ",
            "icon_alt" : "성공"
         },
         "warning" : {
            "a11y_label" : "경고: ",
            "icon_alt" : "경고"
         },
         "info" : {
            "a11y_label" : "정보: ",
            "icon_alt" : "정보"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "기본값 복원"
         },
         "bidi" : {
            "help" : "양방향 텍스트 도움말 사용",
            "label" : "양방향 텍스트 사용",
            "tooltip" : "연결된 텍스트 및 구조화된 텍스트(예: 파일 경로)의 언어 고유의 표시를 허용합니다. 또한 언어 선택과 무관하게 텍스트 방향을 지정할 수 있습니다."
         },
         "error" : "오류",
         "save" : {
            "label" : "저장"
         },
         "direction" : {
            "label" : "사용자 생성 텍스트의 방향:",
            "tooltip" : "컨텐츠 이름 밑 탐색 결과 같이 사용자 입력에서 파생되는 텍스트의 방향입니다. 기본적으로 이것은 언어 선택(대부분 왼쪽에서 오른쪽으로)에 의해 결정됩니다. 문맥을 선택하면 시스템이 문자 분석(혼합 방향 텍스트 지원)을 기반으로 방향을 판별할 수 있습니다.",
            "options" : {
               "contextual" : "문맥(문자 기반)",
               "rtl" : "오른쪽에서 왼쪽으로",
               "ltr" : "왼쪽에서 오른쪽으로",
               "default_ltr" : "언어 기본값(왼쪽에서 오른쪽으로) 사용",
               "default_rtl" : "언어 기본값(오른쪽에서 왼쪽으로) 사용"
            }
         },
         "cancel" : {
            "label" : "취소"
         },
         "language" : {
            "selected" : "${0}(현재)",
            "label" : "언어:",
            "tooltip" : "애플리케이션 텍스트가 표시될 언어를 지정하십시오. 이 설정은 사용자 생성 텍스트에 영향을 주지 않습니다."
         },
         "calendar" : {
            "label" : "달력:",
            "options" : {
               "hebrew" : "히브리어",
               "gregorian" : "그레고리력",
               "hijri" : "회교력"
            }
         }
      }
});

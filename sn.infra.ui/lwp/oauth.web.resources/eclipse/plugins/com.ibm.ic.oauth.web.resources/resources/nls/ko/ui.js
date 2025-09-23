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
         "legal" : "Licensed Materials \u2013 Property of HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. All rights reserved. \uc790\uc138\ud55c \uc815\ubcf4\ub294 \uc81c\ud488 \ub77c\uc774\uc13c\uc2a4\ub97c \ucc38\uc870\ud558\uc2ed\uc2dc\uc624. Java \ubc0f Java\ub97c \uae30\ubc18\uc73c\ub85c \ud55c \ubaa8\ub4e0 \uc0c1\ud45c\uc640 \ub85c\uace0\ub294 Oracle \ub610\ub294 \uad00\uacc4\uc0ac\uc758 \uc0c1\ud45c \ub610\ub294 \ub4f1\ub85d\uc0c1\ud45c\uc785\ub2c8\ub2e4.",
         "error" : "오류가 발생했습니다. 나중에 다시 시도하십시오.",
         "granted" : {
            "title" : "액세스 부여됨",
            "blurb" : "HCL Connections 계정과 상호작용하기 위한 ${0} 액세스 권한이 부여되었습니다."
         },
         "denied" : {
            "title" : "액세스 거부됨",
            "blurb" : "HCL Connections 계정과 상호작용하기 위한 ${0} 액세스가 거부되었습니다."
         },
         "blurb" : "{0}이(가) Connections의 사용자 컨텐츠를 포함한 HCL Connections 정보 액세스를 요청하고 있습니다.",
         "revoke" : {
            "description" : "Connections 설정 > {0}에서 언제든지 액세스를 취소할 수 있습니다. Connections가 사용자에게 주기적으로 재권한 부여 요청을 할 수 있습니다.",
            "link" : "애플리케이션 액세스"
         },
         "authorize" : {
            "label" : "액세스 부여"
         },
         "windowtitle" : "HCL Connections에 대한 액세스 권한 부여",
         "title" : "액세스 요청",
         "deny" : {
            "label" : "액세스 거부"
         },
         "action_tooltip" : "${0} 애플리케이션에 대한 액세스 부여",
         "action" : "액세스 부여",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "${0}(으)로 재지정하는 중입니다."
      },
      "javascript" : {
         "disabled" : {
            "title" : "JavaScript 켜기",
            "p2" : "계속하려면 페이지 새로 고침을 수행하십시오.",
            "p1" : "웹 브라우저에 JavaScript를 사용할 수 없습니다. HCL Connections가 작동되려면 JavaScript가 필요합니다. JavaScript가 켜지면 페이지를 새로 고치십시오."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "사용자 요청을 처리할 수 없습니다.",
            "description" : "HCL Connections 계정 액세스에 대해 애플리케이션이 발행한 액세스 요청이 완전하지 않습니다. 브라우저 이전 단추를 클릭하여 이전 사이트 또는 애플리케이션으로 돌아가서 다시 시도하십시오. 오류가 지속되면 관리자에게 문제점을 보고하십시오."
         },
         "invalid_token" : {
            "title" : "사용자 요청을 처리할 수 없습니다.",
            "description" : "HCL Connections 계정 액세스에 대해 애플리케이션이 발행한 액세스 요청이 올바르지 않습니다. 브라우저 이전 단추를 클릭하여 이전 사이트 또는 애플리케이션으로 돌아가서 다시 시도하십시오. 오류가 지속되면 관리자에게 문제점을 보고하십시오."
         },
         "default_action" : {
            "label" : "홈 페이지로 돌아가기"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "오류: ",
            "icon_alt" : "오류"
         },
         "success" : {
            "a11y_label" : "성공:",
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
      "loading" : "로드 중...",
      "deny" : {
         "error" : "오류가 발생했습니다. 나중에 다시 시도하십시오.",
         "action_tooltip" : "${0} 애플리케이션에 대한 액세스 거부",
         "action" : "액세스 거부",
         "success" : "액세스가 거부되었습니다."
      },
      "grid" : {
         "applications" : {
            "summary" : "HCL Connections 정보에 대한 액세스 권한이 있는 애플리케이션 목록.",
            "loading" : "로드 중...",
            "empty" : "애플리케이션을 찾을 수 없습니다.",
            "reverse_sort" : "반대로 정렬"
         }
      },
      "applications" : {
         "windowtitle" : "애플리케이션 액세스",
         "details" : "HCL Connections 정보에 대한 액세스 권한이 있는 애플리케이션.",
         "error" : "오류가 발생하여 목록을 검색할 수 없습니다.",
         "titlebar" : {
            "tab2" : "애플리케이션 액세스",
            "tab1" : "이메일 알림",
            "tab3" : "다국어 지원"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "이 단추를 누르면 현재 페이지가 새 컨텐츠로 새로 고쳐집니다. 이 메뉴로 돌아가려면 다음으로 다시 이동하십시오. "
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections 설정"
         },
         "heading" : "애플리케이션 액세스"
      },
      "sorts" : {
         "application_name" : "애플리케이션 이름",
         "authorization_date" : "권한 부여 날짜",
         "expiration_date" : "만기 날짜",
         "action" : "조치"
      },
      "revoke_token" : {
         "error" : "오류가 발생했습니다. 나중에 다시 시도하십시오.",
         "dialog_title" : "액세스 철회",
         "action_tooltip" : "${0} 애플리케이션에 대한 액세스 철회",
         "action" : "철회",
         "ok" : "확인",
         "cancel" : "취소 ",
         "confirm" : "사용자의 HCL Connections 정보에 대한 이 애플리케이션의 액세스 권한을 철회하시겠습니까? ",
         "success" : "애플리케이션이 제거되었습니다."
      }
});

/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

// FIXME: temporary stop-gap until we make net.jazz.ajax.dojoResourceModules work with AMD bundles
define({
      // NLS_ENCODING=UNICODE
      // NLS_MARKUP=IBMJDK21
      //// G11N GA UI

      // COMPONENTPREFIX CLFWZ
      // NLS_MESSAGEFORMAT_VAR
      // NLS_CHARSET=UTF-8
         'str_component_id' : 'CLFWZ',

         // Login Required
         'msg.loginRequired' : '컨텐츠를 보려면 로그인하십시오.',
         'ErrorGeneric' : '컨텐츠를 표시하는 중에 오류가 발생했습니다. 시스템 관리자에게 문의하십시오.',
         'showErrorDetails' : '오류 세부사항 표시',
         'HideErrorDetails' : '오류 세부사항 숨기기',

         'loadInfo' : '정보 로드 ...',

         'dykLoadInfo' : '네트워크에 추가할 추천된 사용자를 봅니다.',
         'dykLoadInfo2' : '기존 네트워크 연락처를 기본으로 네트워크에 추가할 추천된 사용자를 봅니다.',

         'wcuLoadInfo' : '네트워크 및 조치를 기본으로 이 프로파일에 연관된 방법을 알 수 있습니다.',

         'ticLoadInfo' : '네트워크 및 활동을 기본으로 이 프로파일과의 공통점을 알 수 있습니다.',

         'deleteWidget' : '애플리케이션 제거',
         'hideWidget' : '애플리케이션 숨기기',
         'deleteWidgetMsg' : '애플리케이션을 제거하려고 합니다. 모든 애플리케이션 컨텐츠가 제거됩니다. 이 조치는 실행 취소할 수 없습니다. 회원이 커뮤니티와 공유하는 컨텐츠는 여전히 공유됩니다. 애플리케이션이 다시 추가되면 이 공유 컨텐츠가 애플리케이션에 다시 나타납니다.<br/><br/>애플리케이션을 제거하려는 경우 아래의 제거 단추를 클릭하십시오. <br/>그렇지 않은 경우 취소를 클릭하십시오.',
         'hideWidgetMsg' : '애플리케이션을 숨기려고 합니다.<br/><br/>단순히 애플리케이션을 커뮤니티에 다시 추가하면 나중에 해당 애플리케이션을 다시 활성화할 수 있습니다. 모든 애플리케이션 컨텐츠는 그대로 보존됩니다.',
         'deleteWidgetWarn' : '경고: 애플리케이션 {0}의 데이터가 영구적으로 삭제됩니다.',
         'deleteWidgetConfirm' : '나는 애플리케이션 및 이와 관련된 데이터가 삭제되고 이를 복구할 수 없음을 이해합니다.',
         'deleteWithSharedContentWidgetConfirm' : '나는 애플리케이션 및 이와 관련된 데이터가 삭제되고 이를 복구할 수 없음을 이해합니다. 회원이 커뮤니티와 공유하는 컨텐츠는 여전히 공유됩니다. 애플리케이션이 다시 추가되면 이 공유 컨텐츠가 애플리케이션에 다시 나타납니다.',
         'delete' : '삭제',
         'hide' : '숨기기',
         'cancel' : '취소',
         'save' : '저장',
         'edit' : '편집',
         'view' : '보기',
         'help' : '도움말',
         'refresh' : '새로 고침',
         'actions' : '조치',
         'switchTabWarning' : '다른 탭으로 이동하기 전에 각 탭에서 변경사항을 저장해야 합니다.',
         'confirmDeleteWidget' : '이 애플리케이션을 제거하시겠습니까?<br><br>나중에 커뮤니티 조치 메뉴를 통해 이 애플리케이션을 복원할 수 있습니다. 애플리케이션 표시 관련 설정은 유실되지만 애플리케이션의 데이터는 그대로 유지됩니다.',

         // Strings for Change Title dialog
         'changeTitleAction' : '제목 변경',

         // {0} is the translated title of the application being rendered
         'actions_alt' : '조치 대상: ${0}',
         'actionsmenu' : '조치 메뉴',
         'toggle' : '토글',
         'open' : '열기',
         'close' : '닫기',

         'widgets_Move' : '이동',
         'widgets_MoveUp' : '위로 이동',
         'widgets_MoveDown' : '아래로 이동',
         'widgets_MoveLeft' : '왼쪽으로 이동',
         'widgets_MoveRight' : '오른쪽으로 이동',
         'widgets_MovePrev' : '이전 열로 이동',
         'widgets_MoveNext' : '다음 열로 이동',
         'widgets_Min' : '최소화',
         'widgets_Max' : '최대화',

         'widgetCat_AllWidgets' : '모든 애플리케이션',
         'widgetCat_thrdParty' : '기타',
         'widgetCat_hidden' : '숨김',
         'widget_BackToOverview' : '개요 페이지로 돌아가기',
         'widget_AddingWidget' : '애플리케이션 추가',
         'widget_RemovingWidget' : '애플리케이션 제거',
         'widget_AllTab' : '모두',
         'widget_HideConfirmation' : '이 커뮤니티에서 ${0}을(를) 숨깁니다. ',
         'widget_HideConfirmationUndo' : '실행 취소',

         'link.remove' : '제거',
         'link.window.close' : '창 닫기',
         'link.window.openNewWindow' : '클릭 시 새 창 열림',

         'error.title.generic' : '문제가 발생했습니다.',
         'error.message.generic' : '문제가 발생했습니다. 이전 단추를 클릭하여 다시 시도하십시오. 그래도 제대로 실행되지 않으면 지원 포럼에 문제점을 보고하십시오.',
         'info.feed.general.moreinfo' : '세부사항을 보려면 여기를 클릭하십시오.',

         'label.theme.customize' : '애플리케이션 추가',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : '사용 가능한 피드가 없음',
         'errorDefaultMsg' : '애플리케이션 데이터를 표시할 수 없음',
         'errorDefaultMsg2' : '오류가 발생했습니다. 시스템 관리자에게 문의하십시오.',
         'errorDefaultMsg3' : '세부사항을 보려면 여기를 클릭하십시오.',
         'errorMsg' : '메시지: ',
         'errorName' : '이름: ',
         'errorType' : '유형: ',
         'errorLine' : '행:',
         'errorStackTrace' : '추적: ',
         'errorUnableToConnect' : '{0}에 대한 연결에 실패'

});


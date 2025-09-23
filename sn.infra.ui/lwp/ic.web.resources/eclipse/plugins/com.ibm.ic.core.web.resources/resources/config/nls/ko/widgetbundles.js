/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

// FIXME: temporary stop-gap until we make net.jazz.ajax.dojoResourceModules work with AMD bundles
define({
      // NLS_ENCODING=UNICODE
      // NLS_MARKUP=IBMJDK21
      //// G11N GA UI

      // COMPONENTPREFIX CLFWZ
      // NLS_MESSAGEFORMAT_VAR
      // NLS_CHARSET=UTF-8
         // These are the default strings that become part of lconn.core.nls.widgetbundles

         // Stock SaND widget titles
         'lc_sand' : {
            'sand_DYK' : '알 수도 있는 사람',
            'sand_recomItems' : '추천',
            'sand_recomComm' : '추천',
            'sand_thingsInCommon' : '공통점',
            'sand_socialPath' : '누가 우리를 연결합니까?',
            'sand_simComm' : '유사 커뮤니티'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : '보고 대상 체인',
            'multiFeedReader' : '최근 게시물',
            'filesReader' : '파일',
            'multiWidget' : '프로파일 정보',
            'board' : '게시판',
            'contactInfo' : '연락처 정보',
            'backgroundInfo' : '경력',
            'structTags' : '구조화된 태그',
            'commonTags' : '조직 태그',
            'socialTags' : '태그',
            'linkRoll' : '내 링크',
            'friends' : '네트워크'
         },

         // Stock Communities widget titles
         'Blog' : '블로그',
         'IdeationBlog' : '아이디어 블로그',
         'Activities' : '활동',
         'Files' : '파일',
         'Wiki' : '위키',
         'RichContent' : '서식있는 컨텐츠',
         'Forum' : '포럼',
         'Bookmarks' : '책갈피',
         'Members' : '회원',
         'Feeds' : '피드',
         'widgetPalette' : '위젯 팔레트',
         'feedReader' : '피드 리더',
         'SubcommunityNav' : '하위 커뮤니티',
         'CommunityUpdates' : '커뮤니티 업데이트',
         'Updates' : '최근 업데이트',
         'RecentUpdates' : '최근 업데이트',
         'StatusUpdates' : '상태 업데이트',
         'Calendar' : {
            'default' : '이벤트',
            'view' : '예정된 이벤트'
         },
         'RelatedCommunities' : '관련 커뮤니티',
         'MyLibrary' : '내 라이브러리',
         'MyLibrary.sequenceNumber' : '내 라이브러리 {0}',
         'Tags' : '태그',
         'MembersSummary' : '회원',
         'description' : '커뮤니티 설명',
         'ImportantBookmarks' : '중요한 책갈피',
         
         // ICEC
         'highlights': {
         	'Highlights' : '강조표시',
         	'Highlights.description' : '커뮤니티 개요를 개인 설정하고 다양한 소스의 컨텐츠를 수집하여 더욱 매력적인 환경을 구축합니다.'
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : '미디어 갤러리',
            'MediaGallery.description' : '사진 및 비디오를 커뮤니티와 공유합니다.',
            'CustomLibrary' : '링크된 라이브러리',
            'CustomLibrary.sequenceNumber' : '링크된 라이브러리 {0}',
            'CustomLibrary.description' : '커뮤니티의 문서 저장소를 사용하십시오.',
            'Library' : '라이브러리',
            'Library.sequenceNumber' : '라이브러리 {0}',
            'Library.description' : '초안, 검토자 및 공개를 통해 파일에 대해 작업하십시오.',
            'librarysummary' : '문서 저장소',
            'librarysummary.description' : '커뮤니티의 문서 저장소를 사용하십시오.',
            'Gallery' : '갤러리',
            'Gallery.description' : '이 커뮤니티에서 파일을 보여줍니다.'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : '기존 커뮤니티의 회원 서브세트를 함께 가져옵니다.',
         'galleryDescription' : '사진 및 비디오를 커뮤니티와 공유합니다.',
         'blogsDescription' : '뉴스와 정보를 커뮤니티 회원과 신속하게 동적으로 공유합니다.',
         'ideationBlogsDescription' : '커뮤니티 회원이 아이디어에 공감하고 투표하도록 함께 협업합니다.',
         'commActivitesDescription' : '커뮤니티의 목표를 추적하고 태스크를 구성하며 작업 항목을 지정합니다.',
         'filesDescription' : '업로드하고 공유하며 커뮤니티 파일 및 폴더에 대해 작업합니다.',
         'wikiDescription' : '자원을 커뮤니티와 공유하고 동료와 협업합니다.',
         'forumDescription' : '주제를 토론하고 아이디어를 공유합니다.',
         'eventsDescription' : '세미나 및 훈련과 같은 중요한 커뮤니티 이벤트를 게시합니다. ',
         'commBookmarks' : '커뮤니티에서 유용한 웹 자원을 직접 사용 가능하도록 작성합니다.',
         'commFeeds' : '커뮤니티에 관련 웹 사이트에 대한 피드 추가',
         'updatesDescription' : '현재 수행 중인 작업을 다른 회원이 알 수 있도록 커뮤니티 상태를 업데이트합니다.',
         'calendarDescription' : '세미나 및 훈련과 같은 중요한 커뮤니티 이벤트를 게시합니다. ',
         'relatedCommunitiesDescription' : '다른 커뮤니티에 대한 링크를 빌드합니다. ',
         'importantBookmarksDescription' : '커뮤니티에 중요한 웹 자원에 대한 책갈피를 수집하십시오.',
         'tagsDescription' : '찾기 쉽도록 의미가 있는 키워드를 사용하여 관심 있는 컨텐츠를 그룹화하십시오.',
         'descriptionDescription' : '커뮤니티의 목적을 알려주는 개요입니다. 설명에서 커뮤니티의 목표와 가치를 반영합니다.',
         'memberSummaryDescription' : '이 커뮤니티에 소속된 사용자입니다. 정보를 공유하고 다른 회원들과 협력하여 커뮤니티를 활성화합니다.'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});

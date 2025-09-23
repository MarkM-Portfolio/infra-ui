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
            'sand_DYK' : '知り合いの可能性があるユーザー',
            'sand_recomItems' : 'おすすめ',
            'sand_recomComm' : 'おすすめ',
            'sand_thingsInCommon' : '共通のもの',
            'sand_socialPath' : 'ユーザーの関係',
            'sand_simComm' : '類似コミュニティー'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'レポート・チェーン',
            'multiFeedReader' : '最近の投稿',
            'filesReader' : 'ファイル',
            'multiWidget' : 'プロフィール情報',
            'board' : 'ボード',
            'contactInfo' : '連絡先情報',
            'backgroundInfo' : '経歴',
            'structTags' : '構造化タグ',
            'commonTags' : '組織タグ',
            'socialTags' : 'タグ',
            'linkRoll' : 'マイ・リンク',
            'friends' : 'ネットワーク'
         },

         // Stock Communities widget titles
         'Blog' : 'ブログ',
         'IdeationBlog' : 'アイデア・ブログ',
         'Activities' : 'アクティビティー',
         'Files' : 'ファイル',
         'Wiki' : 'Wiki',
         'RichContent' : 'リッチ・コンテンツ',
         'Forum' : 'フォーラム',
         'Bookmarks' : 'ブックマーク',
         'Members' : 'メンバー',
         'Feeds' : 'フィード',
         'widgetPalette' : 'ウィジェット・パレット',
         'feedReader' : 'フィード・リーダー',
         'SubcommunityNav' : 'サブコミュニティー',
         'CommunityUpdates' : 'コミュニティーの更新',
         'Updates' : '最新の更新',
         'RecentUpdates' : '最新の更新',
         'StatusUpdates' : '最新の状況',
         'Calendar' : {
            'default' : 'イベント',
            'view' : '近日中のイベント'
         },
         'RelatedCommunities' : '関連コミュニティー',
         'MyLibrary' : 'マイ・ライブラリー',
         'MyLibrary.sequenceNumber' : 'マイ・ライブラリー {0}',
         'Tags' : 'タグ',
         'MembersSummary' : 'メンバー',
         'description' : 'コミュニティーの説明',
         'ImportantBookmarks' : '重要ブックマーク',
         
         // ICEC
         'highlights': {
         	'Highlights' : 'ハイライト',
         	'Highlights.description' : 'コミュニティーの概要をパーソナライズし、さまざまなソースからコンテンツを集約することで、より魅力的な体験を実現します。'
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'メディア・ギャラリー',
            'MediaGallery.description' : '写真とビデオをコミュニティーに共有します。',
            'CustomLibrary' : 'リンク・ライブラリー',
            'CustomLibrary.sequenceNumber' : 'リンク・ライブラリー {0}',
            'CustomLibrary.description' : 'コミュニティー内の文書リポジトリーを使用します。',
            'Library' : 'ライブラリー',
            'Library.sequenceNumber' : 'ライブラリー {0}',
            'Library.description' : 'ドラフト、レビューアー、公開を使用してファイルに対する作業を行います。',
            'librarysummary' : '文書リポジトリー',
            'librarysummary.description' : 'コミュニティー内の文書リポジトリーを使用します。',
            'Gallery' : 'ギャラリー',
            'Gallery.description' : 'このコミュニティー内のファイルを展示します。'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : '既存のコミュニティー内のメンバーをサブセットにまとめます。',
         'galleryDescription' : '写真とビデオをコミュニティーに共有します。',
         'blogsDescription' : 'ニュースや見解をコミュニティー・メンバーと素早く動的に共有します。',
         'ideationBlogsDescription' : 'アイデアを投稿したり、投票したりして、コミュニティー・メンバーと共同で作業します。',
         'commActivitesDescription' : 'コミュニティーの目標の追跡、タスクの編成、To Do 項目の割り当てを行います。',
         'filesDescription' : 'コミュニティー・ファイルやフォルダーのアップロード、共有、作業を行います。',
         'wikiDescription' : 'リソースをコミュニティーで共有して、ワーク・メンバーと共同作業します。',
         'forumDescription' : 'さまざまなトピックについてディスカッションをしたりアイデアを共有したりします。',
         'eventsDescription' : 'セミナーや研修などの重要なコミュニティー・イベントを投稿します。 ',
         'commBookmarks' : '役立つ Web リソースを直接コミュニティーから使用できるようにします。',
         'commFeeds' : '関連する Web サイトのフィードをコミュニティーに追加します。',
         'updatesDescription' : '自分のコミュニティー状況を更新して、他のメンバーに自分が取り組んでいることなどを知らせます。',
         'calendarDescription' : 'セミナーや研修などの重要なコミュニティー・イベントを投稿します。 ',
         'relatedCommunitiesDescription' : '他のコミュニティーとのリンクを作成します。  ',
         'importantBookmarksDescription' : 'コミュニティーにとって重要な Web リソースへのブックマークを収集します。',
         'tagsDescription' : '意味のあるキーワードを使用して見つけやすくした、グループが関心を持つコンテンツ。',
         'descriptionDescription' : 'コミュニティーの目的の概要。  説明は、コミュニティーの目標と価値観を反映している必要があります。',
         'memberSummaryDescription' : 'このコミュニティーのメンバーであるユーザー。  メンバーと情報を共有し、共同作業することで、コミュニティーを活性化します。'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});

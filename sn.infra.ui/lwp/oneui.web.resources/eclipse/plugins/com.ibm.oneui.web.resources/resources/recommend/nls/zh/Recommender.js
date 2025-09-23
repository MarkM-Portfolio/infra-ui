/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>您对此内容点赞</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>您对此内容点赞</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='您对此内容点赞' href='javascript:;' id='TOGGLE_${id}'>取消点赞</a>",
         TOOLTIP : "取消点赞"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>您对此内容点赞</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>您对此内容点赞</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='您对此内容点赞' href='javascript:;' id='TOGGLE_${id}'>取消点赞</a>",
         TOOLTIP : "取消点赞"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>您对此内容点赞</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>您对此内容点赞</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='您对此内容点赞' href='javascript:;' id='TOGGLE_${id}'>取消点赞</a>",
         TOOLTIP : "取消点赞"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>点赞</a>",
         TOOLTIP : "对此内容点赞"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>点赞</a>",
         TOOLTIP : "对此内容点赞"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "对此内容点赞的人员...",
      RECOMMENDED_HEADER_SHOWING_SOME : "对此内容点赞的人员... （按名称排序）",
      RECOMMENDED_CLOSE_TITLE : "关闭对此内容点赞的人员列表。"
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>点赞</a>",
         TOOLTIP : "对此内容点赞"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>您对此内容点赞</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>您对此内容点赞</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='您对此内容点赞' href='javascript:;' id='TOGGLE_${id}'>取消点赞</a>",
         TOOLTIP : "取消点赞"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "没有人对此内容点赞"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "共有 1 个人对此内容点赞"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "共有 ${recommendCount} 个人对此内容点赞"
      }
   },
   LOADING : "正在装入...",
   TEMPLATE_STRINGS : {
      LIKES : "点赞数"
   },
   ERROR : {
      TITLE : "警报",
      RECOMMEND_LOAD_FAILED : "此项已删除或不再可供您查看。"
   }
})


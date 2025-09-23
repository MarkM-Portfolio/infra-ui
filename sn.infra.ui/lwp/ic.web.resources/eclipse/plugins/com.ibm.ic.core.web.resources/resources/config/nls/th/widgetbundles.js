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
            'sand_DYK' : 'ผู้คนที่คุณอาจรู้จัก',
            'sand_recomItems' : 'ข้อเสนอแนะ',
            'sand_recomComm' : 'ข้อเสนอแนะ',
            'sand_thingsInCommon' : 'สิ่งที่เหมือนกัน',
            'sand_socialPath' : 'ใครที่เชื่อมต่อกับเรา?',
            'sand_simComm' : 'ชุมชนที่เหมือนกัน'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'ลูกโซ่การรายงาน',
            'multiFeedReader' : 'การโพสต์ล่าสุด',
            'filesReader' : 'ไฟล์',
            'multiWidget' : 'ข้อมูลโปรไฟล์',
            'board' : 'บอร์ด',
            'contactInfo' : 'ข้อมูลติดต่อ',
            'backgroundInfo' : 'ประวัติ',
            'structTags' : 'แท็กที่มีโครงสร้าง',
            'commonTags' : 'แท็กองค์กร',
            'socialTags' : 'แท็ก',
            'linkRoll' : 'ลิงก์ของฉัน',
            'friends' : 'เครือข่าย'
         },

         // Stock Communities widget titles
         'Blog' : 'บล็อก',
         'IdeationBlog' : 'บล็อกระดมความคิด',
         'Activities' : 'กิจกรรม',
         'Files' : 'ไฟล์',
         'Wiki' : 'วิกิ',
         'RichContent' : 'เนื้อหาแบบริช',
         'Forum' : 'ฟอรัม',
         'Bookmarks' : 'บุ๊กมาร์ก',
         'Members' : 'สมาชิก',
         'Feeds' : 'ฟีด',
         'widgetPalette' : 'ถาดค่าตัวเลือกวิดเจ็ต',
         'feedReader' : 'โปรแกรมอ่านฟีด',
         'SubcommunityNav' : 'ชุมชนย่อย',
         'CommunityUpdates' : 'อัพเดตชุมชน',
         'Updates' : 'อัพเดตล่าสุด',
         'RecentUpdates' : 'อัพเดตล่าสุด',
         'StatusUpdates' : 'การอัพเดตสถานะ',
         'Calendar' : {
            'default' : 'เหตุการณ์',
            'view' : 'เหตุการณ์ขาเข้า'
         },
         'RelatedCommunities' : 'ชุมชนที่เกี่ยวข้อง',
         'MyLibrary' : 'ไลบรารีของฉัน',
         'MyLibrary.sequenceNumber' : 'ไลบรารี {0} ของฉัน',
         'Tags' : 'แท็ก',
         'MembersSummary' : 'สมาชิก',
         'description' : 'รายละเอียดชุมชน',
         'ImportantBookmarks' : 'บุ๊กมาร์กสำคัญ',
         
         // ICEC
         'highlights': {
         	'Highlights' : 'ไฮไลต์',
         	'Highlights.description' : 'ทำภาพรวมชุมชนและเนื้อหาการรวมให้เป็นส่วนตัวจากแหล่งที่มาที่หลากหลายเพื่อสร้างประสบการณ์ที่น่าสนใจให้มากขึ้น'
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'แกลเลอรีสื่อ',
            'MediaGallery.description' : 'แบ่งใช้ภาพถ่ายและวิดีโอกับชุมชน',
            'CustomLibrary' : 'ไลบรารีที่ลิงก์',
            'CustomLibrary.sequenceNumber' : 'ไลบรารี {0} ที่ลิงก์',
            'CustomLibrary.description' : 'ใช้ที่เก็บเอกสารในชุมชนของคุณ',
            'Library' : 'ไลบรารี',
            'Library.sequenceNumber' : 'ไลบรารี {0}',
            'Library.description' : 'ทำงานกับไฟล์โดยใช้แบบร่าง ผู้ตรวจทาน และการเผยแพร่',
            'librarysummary' : 'ที่เก็บเอกสาร',
            'librarysummary.description' : 'ใช้ที่เก็บเอกสารในชุมชนของคุณ',
            'Gallery' : 'แกลเลอรี',
            'Gallery.description' : 'แสดงไฟล์ในชุมชนนี้'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : 'นำชุดย่อยของสมาชิกมาไว้ด้วยกันภายในชุมชนที่มีอยู่',
         'galleryDescription' : 'แบ่งใช้ภาพถ่ายและวิดีโอกับชุมชน',
         'blogsDescription' : 'แบ่งใช้ข่าวสารและมุมมองของคุณกับสมาชิกชุมชนอย่างรวดเร็วและไดนามิก',
         'ideationBlogsDescription' : 'ทำงานร่วมกับสมาชิกชุมชนเพื่อมีส่วนร่วมและให้คะแนนแนวคิด',
         'commActivitesDescription' : 'ติดตามเป้าหมายของชุมชนของคุณ จัดระเบียบภารกิจ และกำหนดไอเท็มสิ่งที่ต้องทำ',
         'filesDescription' : 'อัพโหลด แบ่งใช้ และทำงานกับไฟล์และโฟลเดอร์ชุมชน',
         'wikiDescription' : 'แบ่งใช้รีซอร์สกับชุมชนของคุณ และทำงานร่วมกับเพื่อนร่วมงาน',
         'forumDescription' : 'สนทนาหัวข้อและแบ่งใช้แนวคิด',
         'eventsDescription' : 'โพสต์เหตุการณ์ชุมชนที่สำคัญ เช่น สัมมนา และการฝึกอบรม ',
         'commBookmarks' : 'ทำให้เว็บรีซอร์สที่มีประโยชน์พร้อมใช้งานจากชุมชนของคุณโดยตรง',
         'commFeeds' : 'เพิ่มฟีดไปยังเว็บไซต์ที่เกี่ยวข้องลงในชุมชนของคุณ',
         'updatesDescription' : 'อัพเดตสถานะชุมชนของคุณเพื่อให้สมาชิกท่านอื่นทราบถึงสิ่งที่คุณกำลังทำอยู่',
         'calendarDescription' : 'โพสต์เหตุการณ์ชุมชนที่สำคัญ เช่น สัมมนา และการฝึกอบรม ',
         'relatedCommunitiesDescription' : 'สร้างลิงก์ไปยังชุมชนอื่น  ',
         'importantBookmarksDescription' : 'รวบรวมบุ๊กมาร์กไปยังรีซอร์สเว็บที่มีความสำคัญต่อชุมชนของคุณ',
         'tagsDescription' : 'จัดกลุ่มเนื้อหาที่น่าสนใจโดยใช้คีย์เวิร์ดที่มีความหมายเพื่อทำให้ง่ายต่อการค้นหา',
         'descriptionDescription' : 'ภาพรวมของสิ่งที่ชุมชนของคุณใช้  คำอธิบายควรสะท้อนถึงเป้าหมายและค่าของชุมชน',
         'memberSummaryDescription' : 'บุคคลผู้ที่เป็นส่วนหนึ่งของชุมชนนี้  แบ่งใช้ข้อมูลและการทำงานร่วมกับสมาชิกเพื่อทำให้ชุมชนของคุณมีชีวิตชีวา'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});

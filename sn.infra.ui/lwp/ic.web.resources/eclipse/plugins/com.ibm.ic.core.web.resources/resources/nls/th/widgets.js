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
         'msg.loginRequired' : 'ล็อกอินเพื่อดูเนื้อหาของคุณ',
         'ErrorGeneric' : 'มีข้อผิดพลาดเกิดขึ้นขณะแสดงเนื้อหา โปรดติดต่อผู้ดูแลระบบของคุณ',
         'showErrorDetails' : 'แสดงรายละเอียดข้อผิดพลาด',
         'HideErrorDetails' : 'ซ่อนรายละเอียดข้อผิดพลาด',

         'loadInfo' : 'โหลดข้อมูล ...',

         'dykLoadInfo' : 'ดูบุคคลที่ได้รับการแนะนำให้เพิ่มลงในเครือข่ายของคุณ',
         'dykLoadInfo2' : 'ดูบุคคลที่ได้รับการแนะนำให้เพิ่มลงในเครือข่ายของคุณตามรายชื่อติดต่อเครือข่ายที่มีอยุ่ของคุณ',

         'wcuLoadInfo' : 'ค้นหาว่าคุณเกี่ยวข้องกับโฟรไฟล์นี้อย่างไรตามเครือข่ายและการดำเนินการของคุณ',

         'ticLoadInfo' : 'ค้นหาว่าคุณเกี่ยวข้องกับโฟรไฟล์นี้อย่างไรตามเครือข่ายและกิจกรรมของคุณ',

         'deleteWidget' : 'ลบแอ็พพลิเคชัน',
         'hideWidget' : 'ซ่อนแอ็พพลิเคชัน',
         'deleteWidgetMsg' : 'คุณกำลังจะลบแอ็พพลิเคชันของคุณ ซึ่งจะลบเนื้อหาของแอ็พพลิเคชันทั้งหมด การดำเนินการนี้ไม่สามารถเลิกทำได้ เนื้อหาที่สมาชิกแบ่งใช้กับชุมชนยังคงถูกแบ่งใช้อยู่ หากแอ็พพลิเคชันถูกเพิ่มอีกครั้ง เนื้อหาที่แบ่งใช้นี้จะปรากฏอีกครั้งในแอ็พพลิเคชัน<br/><br/>หากคุณแน่ใจว่าคุณต้องการลบแอ็พพลิเคชันออก ให้คลิกปุ่ม ลบ ด้านล่าง <br/>ไม่เช่นนั้น ให้คลิก ยกเลิก',
         'hideWidgetMsg' : 'คุณกำลังจะซ่อนแอ็พพลิเคชันของคุณ<br/><br/>คุณสามารถเรียกทำงานได้อีกครั้งในภายหลังโดยเพิ่มแอ็พพลิเคชันไปยังชุมชนของคุณได้อีกครั้ง เนื้อหาของแอ็พพลิเคชันทั้งหมดจะไม่เปลี่ยนแปลง',
         'deleteWidgetWarn' : 'คำเตือน: ข้อมูลสำหรับแอ็พพลิเคชัน {0} จะถูกลบทิ้งอย่างถาวร',
         'deleteWidgetConfirm' : 'ฉันทราบว่าแอ็พพลิเคชันและข้อมูลที่เกี่ยวข้องจะถูกลบออกและไม่สามารถกู้คืนได้',
         'deleteWithSharedContentWidgetConfirm' : 'ฉันทราบว่าแอ็พพลิเคชันและข้อมูลที่เกี่ยวข้องจะถูกลบออกและไม่สามารถกู้คืนได้  เนื้อหาที่สมาชิกแบ่งใช้กับชุมชนยังคงถูกแบ่งใช้อยู่ หากแอ็พพลิเคชันถูกเพิ่มอีกครั้ง เนื้อหาที่แบ่งใช้นี้จะปรากฏอีกครั้งในแอ็พพลิเคชัน',
         'delete' : 'ลบ',
         'hide' : 'ซ่อน',
         'cancel' : 'ยกเลิก',
         'save' : 'บันทึก',
         'edit' : 'แก้ไข',
         'view' : 'มุมมอง',
         'help' : 'วิธีใช้',
         'refresh' : 'รีเฟรช',
         'actions' : 'แอ็คชัน',
         'switchTabWarning' : 'คุณต้องบันทึกการเปลี่ยนแปลงบนแต่ละแท็บก่อนที่จะย้ายไปยังแท็บอื่น',
         'confirmDeleteWidget' : 'คุณแน่ใจหรือไม่ว่าต้องการลบแอ็พพลิเคชันนี้?<br><br>คุณสามารถเรียกคืนแอ็พพลิเคชันนี้ได้ภายหลังผ่านเมนู แอ็คชันชุมชน  ค่าติดตั้งใดๆ สำหรับการแสดงผลแอ็พพลิเคชันจะหายไป แต่ข้อมูลของแอ็พพลิเคชันยังคงทำงานได้ปกติ',

         // Strings for Change Title dialog
         'changeTitleAction' : 'เปลี่ยนหัวเรื่อง',

         // {0} is the translated title of the application being rendered
         'actions_alt' : 'การดำเนินการสำหรับ: ${0}',
         'actionsmenu' : 'เมนูแอ็คชัน',
         'toggle' : 'สลับ',
         'open' : 'เปิด',
         'close' : 'ปิด',

         'widgets_Move' : 'ย้าย',
         'widgets_MoveUp' : 'ย้ายขึ้น',
         'widgets_MoveDown' : 'ย้ายลง',
         'widgets_MoveLeft' : 'ย้ายไปทางซ้าย',
         'widgets_MoveRight' : 'ย้ายไปทางขวา',
         'widgets_MovePrev' : 'ย้ายไปยังคอลัมน์ก่อนหน้า',
         'widgets_MoveNext' : 'ย้ายไปยังคอลัมน์ถัดไป',
         'widgets_Min' : 'ย่อขนาดเล็กสุด',
         'widgets_Max' : 'ขยายให้ใหญ่สุด',

         'widgetCat_AllWidgets' : 'แอ็พพลิเคชันทั้งหมด',
         'widgetCat_thrdParty' : 'อื่นๆ',
         'widgetCat_hidden' : 'ซ่อน',
         'widget_BackToOverview' : 'กลับไปที่หน้าภาพรวม',
         'widget_AddingWidget' : 'การเพิ่มแอ็พพลิเคชัน',
         'widget_RemovingWidget' : 'การลบแอ็พพลิเคชัน',
         'widget_AllTab' : 'ทั้งหมด',
         'widget_HideConfirmation' : 'คุณได้ซ่อน ${0} จากชุมชนนี้เรียบร้อยแล้ว ',
         'widget_HideConfirmationUndo' : 'เลิกทำ',

         'link.remove' : 'ลบ',
         'link.window.close' : 'ปิดหน้าต่าง',
         'link.window.openNewWindow' : 'การคลิกสิ่งนี้จะเปิดหน้าต่างใหม่',

         'error.title.generic' : 'เราตรวจพบปัญหา',
         'error.message.generic' : 'มีบางอย่างผิดพลาด - คลิกปุ่ม ย้อนกลับ และลองอีกครั้ง ถ้าไม่สามารถแก้ปัญหาได้ ให้รายงานปัญหาในฟอรัมการสนับสนุน',
         'info.feed.general.moreinfo' : 'คลิกที่นี่เพื่อแสดงรายละเอียดเพิ่มเติม',

         'label.theme.customize' : 'เพิ่มแอ็พ',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'ไม่มีฟีดอยู่',
         'errorDefaultMsg' : 'ไม่สามารถแสดงข้อมูลแอ็พพลิเคชัน',
         'errorDefaultMsg2' : 'มีข้อผิดพลาดเกิดขึ้น โปรดติดต่อผู้ดูแลระบบของคุณ',
         'errorDefaultMsg3' : 'คลิกที่นี่เพื่อแสดงรายละเอียดเพิ่มเติม',
         'errorMsg' : 'ข้อความ: ',
         'errorName' : 'ชื่อ: ',
         'errorType' : 'ชนิด: ',
         'errorLine' : 'บรรทัด:',
         'errorStackTrace' : 'ติดตาม: ',
         'errorUnableToConnect' : 'การเชื่อมต่อล้มเหลวสำหรับ {0}'

});


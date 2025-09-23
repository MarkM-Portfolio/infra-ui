/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2017, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
    // Connections Home Page tour; for d61, runs as JIT tour on first visit to Communities app
    // Note - would like to include username in the title - 'Welcome, {username}!'
    homepageWelcomeTitle : "ยินดีต้อนรับ!",
    homepageWelcomeContent : "โฮมเพจของคุณเป็นศูนย์คำสั่งของคุณ ที่คุณสามารถโฟกัสในอัพเดตที่สำคัญ และดูไอเท็มที่ต้องการให้คุณสนใจ",
    easyKeepUpTitle : "เป็นเรื่องง่ายที่จะตามให้ทัน!",
    easyKeepUpContent : "สแกนโฮมเพจของคุณติดตามอัพเดตที่คุณสนใจ ดูการโพสต์บล็อกล่าสุด และกิจกรรม และการอัพเดตชุมชน",
    whatNeedsAttentionTitle : "อะไรที่ต้องการให้คุณใสใจ?",
    whatNeedsAttentionContent : "ใช้ตัวกรองเพื่อดูว่าใครกล่าวถึงชื่อคุณ เพื่อดูการแจ้งเตือนอื่น และเพื่อดูไอเท็มที่ต้องการการดำเนินการ",
    whatsImportantTitle : "อะไรที่สำคัญกับคุณ?",
    whatsImportantContent : "ย้ายหรือลบแอ็พจากเพจของคุณเพื่อให้ได้ลักษณะและเนื้อหาที่คุณต้องการ",
    customizePageTitle : "ปรับแต่งเพจของคุณ",
    customizePageContent : "เพิ่มแอ็พเข้ากับโฮมเพจเพื่อให้คุณสามารถติดตามแค่สิ่งที่คุณต้องการจากที่เดียว",
    thanksForWatchingTitle : "ขอบคุณที่ดู",
    thanksForWatchingContent : "ดูคำแนะนำนี้อีกครั้งจากเมนู วิธีใช้",
    thanksExploreContent : "เมื่อคุณสำรวจพื้นที่อื่น เช่น ไฟล์หรือชุมชน ให้ตรวจสอบทัวร์ที่แนะนำเพื่อช่วยคุณทำงานได้อย่างมีประสิทธิภาพ",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "ดูข้อมูลอื่น",
    haveLookAroundContent : "ใช้ลิงก์ <b>แบ่งใช้</b> และ <b>สำรวจ</b> เพื่อทำความรู้จัก Connections ดูว่าคุณสามารถทำงานร่วมกับผู้ร่วมงานและทำงานได้อย่างมีประสิทธิภาพอย่างไร",
    whatsImportantGSContent : "คลิก <b>เพจของฉัน</b> เพื่อดูแดชบอร์ดที่คุณกำหนดเอง เพิ่ม ย้าย หรือลบแอ็พเพื่อให้คุณสามารถโฟกัสในสิ่งที่มีความหมายกับคุณ ติดตามเฉพาะสิ่งที่คุณต้องการจากที่เดียว",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "ชุมชนคืออะไร?",
    whatsACommunityContent : "ชุมชนเป็นฮับที่คุณสามารถแบ่งใช้เนื้อหาและแนวคิด คุณสามารถทำงานร่วมกับทีมของคุณ หรือกับบุคคลที่มีความสนใจร่วมกัน",
    whatCanIJoinTitle : "สิ่งใดที่ฉันสามารถเข้าร่วม?",
    whatCanIJoinContent : "ชุมชนที่แนะนำระบุชุมชนที่ผู้ร่วมงานของคุณเป็นสมาชิก หากคุณเห็นสิ่งที่คุณชอบ ให้คลิกที่สิ่งนั้น คุณยังสามารถค้นหาชุมชนที่ต้องการเข้าร่วม",
    whatColleaguesUpToTitle : "อะไรเป็นสิ่งที่ผู้ร่วมงานของฉันขึ้นอยู่?",
    whatColleaguesUpToContent : "มุมมองขององค์กรของคุณแสดงรายการชุมชนพับลิกทั้งหมดที่คุณสามารถเข้าร่วม เรียกดูชุมชนที่คุณสนใจ",
    startOwnCommTitle : "เริ่มต้นชุมชนของคุณเอง!",
    startOwnCommContent : "ไม่พบสิ่งที่คุณต้องการใช่หรือไม่? เริ่มต้นชุมชนเพื่อให้คุณสามารถแบ่งใช้และทำงานร่วมกับผู้อื่น",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "จัดระเบียบ!",
    getOrganizedContent : "Files ช่วยให้คุณสามารถเก็บเอกสารและรูปถ่ายของคุณในตำแหน่งส่วนกลาง เพื่อให้คุณสามารถเข้าถึงและแบ่งใช้ได้จากทุกที่",
    findCreateFileTitle : "เพิ่มหรือสร้างไฟล์",
    findCreateFileContent : "อัพโหลดไฟล์ที่มีอยู่แล้ว หรือสร้างเอกสารใหม่หาก HCL Docs พร้อมใช้งานสำหรับคุณ ไม่ทางใดก็ทางหนึ่ง ไฟล์ของคุณจะพร้อมใช้งานสำหรับคุณเท่านั้นหรือสำหรับให้คุณแบ่งใช้กับผู้อื่น",
    takeActionTitle : "ดำเนินการ!",
    takeActionContent : "ไฟล์ที่คุณเป็นเจ้าของจะปรากฏขึ้นในมุมมอง ไฟล์ของฉัน โดยที่คุณสามารถแท็กและปักหมุดไฟล์ เพิ่มไฟล์ไปยังโฟลเดอร์ และแบ่งใช้ไฟล์กับผู้อื่น<br/><br/>คลิกไฟล์เพื่อดูและแสดงข้อคิดเห็น",
    getLatestTitle : "จัดระเบียบด้วย My Drive",
    getLatestContent : "จัดระเบียบไฟล์และโฟลเดอร์ที่สำคัญไว้ในที่เดียว หากองค์กรของคุณสนับสนุนคุณลักษณะการซิงค์ ให้ติดตั้งปลั๊กอิน Desktop เพื่อให้ซิงค์การเปลี่ยนแปลงไฟล์โดยอัตโนมัติ",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "ทำงานร่วมกันเป็นทีมกับชุมชน!",
    teamUpContent : "เข้าร่วมหรือติดตามชุมชนเพื่อทำงานร่วมกันกับทีม ชุมชนที่คุณเป็นเจ้าของ เป็นของ หรือติดตาม จะถูกแสดงพร้อมกัน ดังนั้นคุณจึงสามารถโฟกัสไปที่ฮับที่สำคัญที่สุดของคุณ",
    getBackTitle : "กลับไปยังชุมชนโปรดโดยด่วน!",
    getBackContent : "ดูชุมชนที่คุณเยี่ยมชมครั้งสุดท้าย ดังนั้นคุณจึงเลือกตำแหน่งที่คุณออกได้อย่างง่ายได้ คุณยังสามารถเปลี่ยนมุมมองหรือใช้การค้นหาเพื่อค้นหาชุมชน",
    createUniqueTitle : "สร้างชุมชนที่ไม่เหมือนใคร!",
    createUniqueContent : "ใช้แอ็พ Connections ที่คุณรู้จักเพื่อบิลด์ทีมฮับ  หรือใช้แอ็พ Highlights เพื่อสร้างประสบการณ์กับเนื้อหาจากแหล่งที่มาที่หลากหลาย กำหนดความเป็นส่วนบุคคลสำหรับผู้ใช้ของคุณ  เช็กเอาต์ในตอนนี้!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "ดูตำแหน่งที่คุณอยู่",
    seeWhereContent : "กลับไปยังไฟล์หรือโฟลเดอร์ที่คุณสร้างหรือทำงานร่วมกัน... โดยด่วน!",
    filterFilesTitle : "กรองไฟล์ด้วยวิธีของคุณ",
    filterFilesContent : "ใช้บานหน้าต่างการนำทางทั้งสองเพื่อค้นหาไฟล์ เรียกดูตามมุมมอง หรือจำกัดมุมมองปัจจุบันตามแท็ก วันที่ บุคคล และอื่นๆ เพิ่มเติม<br/><br/>โปรดดูเนื้อหาเพิ่มเติม! คลิกไอคอนแอ็คทีฟเพื่อซ่อนพาเนลด้านข้าง",
    metricsThemeTreeTitle : "เลือกโฟกัสของคุณ",
    metricsThemeTreeContent : "ดูเมทริกระหว่างชุมชนของคุณผ่านเลนส์อื่น",
    metricsDateRangeTitle : "ดูการเปลี่ยนแปลงที่ผ่านมา",
    metricsDateRangeContent : "วิเคราะห์ข้อมูลสำหรับช่วงเวลาตั้งแต่สัปดาห์ที่ผ่านมาจนถึงเวลาที่ชุมชนเริ่มต้น หรือในช่วงที่คุณกำหนด",
    metricsSwitchTitle : "มีทั้งสองวิธี",
    metricsSwitchContent : "สลับระหว่างไอคอนเพื่อแสดงผลรวมทั้งหมดในรูปของแผนภูมิหรือตาราง",
    metricsGroupByTitle : "กรองตามกลุ่ม",
    metricsGroupByContent : "ดูข้อมูลสำหรับบุคคลทั้งหมด หรือแตกข้อมูลตามภูมิภาค บทบาท หรือแผนก"
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});

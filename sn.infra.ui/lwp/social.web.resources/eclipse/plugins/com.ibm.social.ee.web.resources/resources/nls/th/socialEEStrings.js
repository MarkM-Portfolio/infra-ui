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
/* The placeholders for date formatting strings are as follows:
   ${EEEE} is day of the week (e.g. Monday)
   ${MMM} is the month in short notation (e.g. Jan, Feb)
   ${time} is time (e.g. 6:00 PM)
   ${d} is numerical day of the month (e.g 15)
   ${YYYY} is year (e.g. 2012)
*/
({
   common: {
      more: {
         label: "เพิ่มเติม",
         tooltip: "แอ็คชันเพิ่มเติม"
       },
       tags_more: "และ ${0} มากกว่า",
       ERROR_ALT: "ข้อผิดพลาด",
       PERSON_TITLE: "เปิดโปรไฟล์ของ ${user}",
       inactiveUser: "${user}(ไม่แอ็คทีฟ)",
       inactiveIndicator: "(ไม่แอ็คทีฟ)",
       like_error: "ไม่สามารถบันทึกความชอบของคุณ โปรดลองอีกครั้งในภายหลัง",
       vote_error: "ไม่สามารถบันทึกโหวตของคุณ โปรดลองอีกครั้งในภายหลัง"
   },
   generic: {
      untitled: "(Untitled)",
      tags: "แท็ก:",
      tags_more: "และ ${0} มากกว่า",
      likes: "ชอบ",
      comments: "ความคิดเห็น",
      titleTooltip: "นำทางไปยัง ${app}",
      error: "ไม่สามารถดึงข้อมูล",
      timestamp: {
         created: {
            DAY: "ถูกสร้าง ${EEEE} เมื่อ ${time}",
            MONTH: "สร้างเมื่อ ${MMM} ${d}",
            TODAY: "ถูกสร้างวันนี้เมื่อ ${time}",
            YEAR: "สร้างเมือ ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "ถูกสร้างเมื่อวานนี้เมื่อ ${time}",
            TOMORROW: "สร้างเมือ ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "อัพเดต ${EEEE} เมื่อ ${time}",
            MONTH: "อัพเดตเมื่อ ${MMM} ${d}",
            TODAY: "อัพเดตวันนี้เมื่อ ${time}",
            YEAR: "อัพเดตเมื่อ ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "ถูกอัพเดตเมื่อวานนี้เมื่อ ${time}",
            TOMORROW: "อัพเดตเมื่อ ${MMM} ${d}, ${YYYY}"
         }
      },
      visibility: {
         pub: "พับลิก",
         priv: "ไพรเวต"
      },
      action: {
         created: "สร้าง",
         updated: "อัพเดต"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "รับอัพเดตเกี่ยวกับบุคคลที่คุณกำลังติดตามโฮมเพจและในสรุปอีเมล",
      profile_title: "เปิดโปรไฟล์ของ ${user}",
      profile_a11y: "การเรียกใช้ลิงก์นี้จะเปิดโปรไฟล์ของ ${user} ในหน้าต่างใหม่",
      error: "มีข้อผิดพลาดเกิดขึ้น  ${again}.",
      error_again: "โปรดลองอีกครั้ง",
      error_404: "คำร้องขอเครือข่ายไม่มีอยู่อีกต่อไป",
      warning: "คำเตือน",
      messages: {
         success: {
            accept: {
            	nofollow: "ขณะนี้คุณมีหน้าที่เป็นผู้ติดต่อด้านเครือข่าย",
            	follow: "ขณะนี้คุณมีหน้าที่เป็นผู้ติดต่อด้านเครือข่าย และ ${user} ต่อไปนี้"
            },
            ignore: {
            	nofollow: "คุณได้เพิกเฉยต่อคำเชิญ",
            	follow: "คุณได้เพิกเฉยต่อคำเชิญ แต่ะขณะนี้กำลังติดตาม ${user}"
            }
         },
         error: {
            accept: "มีข้อผิดพลาดในการยอมรับการร้องขอ",
            ignore: "มีข้อผิดพลาดในการละเว้นการร้องขอ"
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} เวลา ${time}",
              MONTH: "${MMM} ${d}",
              TODAY: "วันนี้เมื่อ ${time}",
              YEAR: "${MMM} ${d}, ${YYYY}",
              YESTERDAY: "เมื่อวานนี้เมื่อ ${time}",
              TOMORROW: "${MMM} ${d}, ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "การเรียกใช้ลิงก์นี้จะเปิด ${name} ในหน้าต่างใหม่",
      tooltip: "เปิด ${name} ในแอ็พพลิเคชันไฟล์",
      profile_title: "เปิดโปรไฟล์ของ ${user}",
      profile_a11y: "การเรียกใช้ลิงก์นี้จะเปิดโปรไฟล์ของ ${user} ในหน้าต่างใหม่",
      download_tooltip: "ดาวน์โหลดไฟล์นี้ (${0})",
      following: {
         add: "ติดตามไฟล์",
         remove: "หยุดการติดตาม",
         title: "สลับว่าคุณจะรับการอัพเดตเกี่ยวกับไฟล์นี้หรือไม่"
      },
      share: {
         label: "แบ่งใช้",
         title: "ให้ผู้อื่นเข้าถึงไฟล์นี้"
      },
      timestamp: {
         created: {
            DAY: "ถูกสร้าง ${EEEE} เมื่อ ${time}",
            MONTH: "สร้างเมื่อ ${MMM} ${d}",
            TODAY: "ถูกสร้างวันนี้เมื่อ ${time}",
            YEAR: "สร้างเมือ ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "ถูกสร้างเมื่อวานนี้เมื่อ ${time}",
            TOMORROW: "สร้างเมือ ${MMM} ${d}, ${YYYY}"
         },
         createdOther: {
            DAY: "${user} สร้างบน ${EEEE} เวลา ${time}",
            MONTH: "${user} สร้างเมื่อ ${MMM} ${d}",
            TODAY: "${user} ถูกสร้างวันนี้เมื่อ ${time}",
            YEAR: "${user} สร้างเมื่อ ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} ถูกสร้างเมื่อวานนี้เมื่อ ${time}",
            TOMORROW: "${user} สร้างเมื่อ ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "อัพเดต ${EEEE} เมื่อ ${time}",
            MONTH: "อัพเดตเมื่อ ${MMM} ${d}",
            TODAY: "อัพเดตวันนี้เมื่อ ${time}",
            YEAR: "อัพเดตเมื่อ ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "ถูกอัพเดตเมื่อวานนี้เมื่อ ${time}",
            TOMORROW: "อัพเดตเมื่อ ${MMM} ${d}, ${YYYY}"
         },
         updatedOther: {
            DAY: "${user} อัพเดตบน ${EEEE} เวลา ${time}",
            MONTH: "${user} อัพเดตเมื่อ ${MMM} ${d}",
            TODAY: "${user} ถูกอัพเดตวันนี้เมื่อ ${time}",
            YEAR: "${user} อัพเดตเมื่อ ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} ถูกอัพเดตเมื่อวานนี้เมื่อ ${time}",
            TOMORROW: "${user} อัพเดตเมื่อ ${MMM} ${d}, ${YYYY}"
         },
         createdCompact: {
            DAY: "สร้างที่: ${EEEE} เวลา ${time}",
            MONTH: "ถูกสร้าง: ${MMM} ${d}",
            TODAY: "ถูกสร้าง: วันนี้เมื่อ ${time}",
            YEAR: "สร้างเมื่อ: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "ถูกสร้าง: เมื่อวานนี้เมื่อ ${time}",
            TOMORROW: "สร้างเมื่อ: ${MMM} ${d}, ${YYYY}"
         },
         updatedCompact: {
            DAY: "อัพเดตที่: ${EEEE} เวลา ${time}",
            MONTH: "ถูกอัพเดต: ${MMM} ${d}",
            TODAY: "ถูกอัพเดต: วันนี้เมื่อ ${time}",
            YEAR: "อัพเดตเมื่อ: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "ถูกอัพเดต: เมื่อวานนี้เมื่อ ${time}",
            TOMORROW: "อัพเดตเมื่อ: ${MMM} ${d}, ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long} โดย ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long} โดย ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "ดาวน์โหลดไฟล์นี้ (${size})",
      	 DOWNLOAD_ALT: "ดาวน์โหลด"
      },

      PREVIEW: {
         LINK: "ดูตัวอย่าง",
         TITLE: "แสดงตัวอย่างไฟล์นี้ในหน้าต่างใหม่"
      },
      TAGS: "แท็ก:",
      error: "มีข้อผิดพลาดเกิดขึ้น  ${again}.",
      error_again: "โปรดลองอีกครั้ง",
      error_404: "ไฟล์ไม่มีอยู่หรือไม่มีสิทธิเพียงพอต่อการเข้าถึง",
      error_403: "คุณไม่มีสิทธิในการดูไฟล์นี้ ไฟล์ไม่ใช่แบบพับลิกและไม่มีการแบ่งใช้กับคุณ",
      notifications: {
         USER_SHARED: "${user} เขียน:",
         CHANGE_SUMMARY: "${user} ระบุข้อมูลสรุปการเปลี่ยนแปลง",
         NO_CHANGE_SUMMARY: "${user} ไม่ได้ระบุข้อมูลสรุปการเปลี่ยนแปลง",
         COMMENTED: "${user} แสดงข้อคิดเห็น"
      }
   },
   ecm_file: {
      checkedout_you: "เช็กเอาต์โดยคุณ",
      checkedout_other: "เช็กเอาต์โดย ${user}",
      tooltip: "เปิดไฟล์ ${name} ในไลบรารี",
      draft_404_info: "แบบร่างถูกลบทิ้งหรือไม่ได้แบ่งใช้กับคุณ เวอร์ชันที่เผยแพร่แล้วคือเวอร์ชันล่าสุดของไฟล์นี้",
      error_404: "ไฟล์ถูกลบทิ้งหรือไม่ได้แบ่งใช้กับคุณ",
      error_403: "ไฟล์ถูกลบทิ้งหรือไม่ได้แบ่งใช้กับคุณ",
      error_preview: "ไฟล์ไม่พร้อมใช้สำหรับการแสดงตัวอย่าง",
      draft_review_canceled: "การตรวจทานถูกยกเลิกและแบบร่างไม่ได้แบ่งใช้กับคุณ การตรวจทานของคุณไม่ได้ถูกร้องขออีกต่อไป",
      switch_ee: "ดูแบบร่าง",
      switch_ee_tooltip: "ดูแบบร่างล่าสุดสำหรับไฟล์นี้"
   },
   ecm_draft: {
      tooltip: "เปิดแบบร่าง ${name} ในไลบรารี",
      community_owners: "เจ้าของชุมชน",
      draft: "แบบร่าง",
      draft_tooltip: "การดูแบบร่าง",
      draft_general_info: "แบบร่างก่อนหน้านี้ไม่มีอยู่และแบบร่างที่ใหม่กว่าคือเวอร์ชันล่าสุดในตอนนี้",
      draft_review_404_general_info: "หนึ่งในผู้ตรวจทานได้ถูกโหวตแล้ว คุณไม่ได้ร้องขอเพื่อให้ตรวจทานแบบร่างนี้อีกต่อไป",
      draft_review_404_request_info: "แบบร่างก่อนหน้านี้ไม่มีอยู่อีกต่อไป และแบบร่างล่าสุดจะถูกส่งเพื่อตรวจทาน การตรวจทานของคุณถูกร้องขอแล้ว",
      draft_review_404_require_info: "แบบร่างก่อนหน้านี้ไม่มีอยู่อีกต่อไป และแบบร่างล่าสุดจะถูกส่งเพื่อตรวจทาน การตรวจทานของคุณถูกร้องขอแล้ว",
      draft_review_request_info: "การตรวจทานของคุณถูกร้องขอแล้ว",
      draft_review_require_info: "การตรวจทานของคุณถูกร้องขอแล้ว",
      error_404: "แบบร่างถูกลบทิ้งหรือไม่ได้แบ่งใช้กับคุณ",
      error_403: "คุณไม่สามารถดูแบบร่างนี้ได้ เนื่องจากแบบร่างนี้ไม่ได้แบ่งใช้กับคุณ",
      error_preview: "แบบร่างไม่พร้อมใช้งานสำหรับการแสดงตัวอย่าง",
      switch_ee: "ดูเวอร์ชันที่เผยแพร่แล้ว",
      switch_ee_tooltip: "ดูเวอร์ชันที่เผยแพร่แล้วของไฟล์นี้",
      review: "ตรวจทาน",
      reviewers: "ผู้ตรวจทาน",
      reviwers_addtl: "ผู้ตรวจทานเพิ่มเติม",
      in_review: "แบบร่างในการตรวจทาน",
      in_review_tooltip: "การดูแบบร่างใน ตรวจทาน",
      review_required_any: "เจ้าของชุมชนต้องการผู้ตรวจทานหนึ่งรายเพื่อตรวจทานแบบร่างนี้",
      review_required_all: "เจ้าของชุมชนต้องการผู้ตรวจทานทั้งหมดเพื่อตรวจทานแบบร่างนี้",
      review_required_generic: "เจ้าของชุมชนต้องการผู้ตรวจทานเหล่านี้เพื่อตรวจทานแบบร่างนี้",
      review_additional_required: "ผู้ตรวจทานทั้งหมดที่เพิ่มไว้โดยผู้ส่งแบบร่างต้องการตรวจทานแบบนี้",
      reivew_submitted_date: {
         DAY: "${user} ส่งแบบร่างเพื่อตรวจทานบน ${EEEE} เมื่อ ${time}",
         MONTH: "${user} ส่งแบบร่างเพื่อตรวจทานเมื่อ ${MMM} ${d}",
         TODAY: "${user} ส่งแบบร่างเพื่อตรวจทานในวันนี้ เมื่อ ${time}",
         YEAR: "${user} ส่งแบบร่างเพื่อตรวจทานเมื่อ ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} ส่งแบบร่างเพื่อตรวจทานเมื่อวานนี้ เมื่อ ${time}.",
         TOMORROW: "${user} ส่งแบบร่างเพื่อตรวจทานเมื่อ ${MMM} ${d}, ${YYYY}"
      },
      pending: "ยังค้างอยู่",
      pending_rejected: "ไม่จำเป็นต้องตรวจทาน เนื่องจากแบบร่างถูกปฏิเสธ",
      approve: "อนุมัติ",
      approved: "ได้รับอนุมัติ",
      approve_tooltip: "อนุมัติแบบร่างนี้",
      accept_success: "คุณได้อนุมัติแบบร่างนี้แล้ว",
      accept_error: "มีข้อผิดพลาดในการอนุมัติแบบร่างนี้ ลองอีกครั้ง",
      accept_info: "คุณได้อนุมัติแบบร่างนี้แล้ว",
      reject: "ปฏิเสธ",
      rejected: "ปฏิเสธ",
      reject_tooltip: "ปฏิเสธแบบร่างนี้",
      reject_success: "คุณได้ปฏิเสธแบบร่างนี้แล้ว",
      reject_error: "มีข้อผิดพลาดในการปฏิเสธแบบร่างนี้ ลองอีกครั้ง",
      reject_info: "คุณปฏิเสธแบบร่างนี้"
   },
   authUser: {
      error: "เกิดข้อผิดพลาดในการเรียกข้อมูลผู้ใช้ปัจจุบัน  ${again}.",
      error_again: "โปรดลองอีกครั้ง",
      error_404: "ไม่พบผู้ใช้ที่ได้รับอนุญาต",
      error_403: "คุณไม่มีสิทธิในการเรียกค้นข้อมูลผู้ใช้"
   },
   forum: {
      error: "มีข้อผิดพลาดเกิดขึ้น  ${again}.",
      error_again: "โปรดลองอีกครั้ง",
      error_404: "ไม่มีฟอรัมอยู่อีกต่อไป หรือคุณไม่มีสิทธิเพียงพอที่จะเข้าถึงฟอรัม",
      error_403: "คุณไม่มีสิทธิเพียงพอที่จะดูฟอรัมนี้ ฟอรัมไม่เป็นพับลิก และไม่ได้แบ่งใช้กับคุณ",

      readMore: "ดูหัวข้อแบบเต็ม...",
      readMore_tooltip: "เปิดหัวข้อฟอรัม ${name}",
      readMore_a11y: "การเรียกทำงานลิงก์นี้จะเปิดหัวข้อฟอรัม ${name} ในหน้าต่างใหม่",
      QUESTION_ANSWERED: "คำถามนี้ถูกตอบ",
      QUESTION_NOT_ANSWERED: "คำถามนี้ยังไม่มีการตอบ",

      attachments: "${count} สิ่งที่แนบ",
      attachments_one: "${count} สิ่งที่แนบ"
   },
   blog: {
      error: "มีข้อผิดพลาดเกิดขึ้น  ${again}.",
      error_again: "โปรดลองอีกครั้ง",
      error_404: "บล็อกไม่มีอยู่อีกต่อไปหรือคุณไม่มีสิทธิเพียงพอต่อการเข้าถึง",
      error_403: "คุณไม่มีสิทธิในการดูบล็อกนี้ บล็อกไม่เป็นพับลิก และไม่ได้แบ่งใช้กับคุณ",
      readMore: " อ่านเพิ่มเติม ...",
      readMore_tooltip: "เปิดรายการบล็อก ${name}",
      readMore_a11y: "การเรียกใช้ลิงก์นี้จะเปิดรายการบล็อก ${name} ในหน้าต่างใหม่",
      graduated: "สำเร็จ",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>โหวต</a>",
  					TOOLTIP: 	"โหวตสำหรับสิ่งนี้"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>โหวตแล้ว</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>โหวตแล้ว</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>เลิกทำ</a>",
  					TOOLTIP: 	"ลบโหวตของคุณออกจากสิ่งนี้"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 คนโหวตสิ่งนี้"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 คนโหวตสิ่งนี้"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} โหวตสิ่งนี้"
  				}
  			},
  			LOADING: "กำลังโหลด...",
  			TEMPLATE_STRINGS: {
  				LIKES: "โหวตแล้ว"
  			}
  		}
   },
   idea: {
	  error_404: "เราไม่สามารถบันทึกโหวตของคุณเนื่องจากคุณใช้งานถึงขีดจำกัดการโหวตแล้ว หรือแนวคิดไม่พร้อมใช้งานสำหรับคุณอีกต่อไป",
      readMore_tooltip: "เปิดแนวคิด ${name}",
      readMore_a11y: "การเรียกใช้ลิงก์นี้จะเปิดแนวคิด ${name} ในหน้าต่างใหม่"
   },
   size: {
      B: "${0} B",
      KB: "${0} KB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "ตอบกลับ",
      THIS_ARIA_LABEL: "การตอบกลับนี้",
      THIS_TAB_TITLE: "การตอบกลับนี้",
      TAB_TITLE: "ตอบกลับ (${0})",
      REPLY_TO_REPLY: "เพื่อตอบกลับไปยัง ${thisReply}",
      REPLY_TO_TOPIC: "เพื่อตอบกลับไปยัง ${thisTopic}",
      THIS_TOPIC: "หัวข้อนี้",
      THIS_REPLY: "การตอบกลับนี้",
      NAVIGATE_TO_REPLY: "นำทางไปยังการตอบกลับพาเรนต์",
      NAVIGATE_TO_TOPIC: "นำทางไปยังหัวข้อพาเรนต์",
      ADD_COMMENT: "ตอบกลับหัวข้อนี้",
      ADD_COMMENT_TOOLTIP: "ตอบกลับไปยังหัวข้อฟอรัมนี้",
      SHOWING_RECENT_REPLIES: "การแสดง ${0} การตอบกลับเมื่อเร็วๆ นี้",
      PREV_COMMENTS: "แสดงการตอบเพิ่มเติม",
      PLACEHOLDER_TXT: "ตอบกลับหัวข้อนี้",
      EMPTY: "ไม่มีการตอบกลับ",
      TRIM_LONG_COMMENT: "ทำให้การตอบกลับสั้นลง?",
      WARN_LONG_COMMENT: "การตอบกลับยาวเกินไป  ${shorten}",
      ERROR: "เกิดข้อผิดพลาดขึ้นขณะดึงข้อมูลคำตอบ ${again}",
      ERROR_CREATE: "ไม่สามารถบันทึกการตอบกลับของคุณ  โปรดลองอีกครั้งภายหลัง",
      ERROR_CREATE_NOT_FOUND: "ไม่สามารถบันทึกการตอบกลับของคุณเนื่องจากหัวข้อถูกลบไป หรือคุณไม่สามารถเห็นได้อีกต่อไป",
      ERROR_CREATE_ACCESS_DENIED: "ไม่สามารถบันทึกการตอบกลับของคุณเนื่องจากหัวข้อถูกลบไป หรือคุณไม่สามารถเห็นได้อีกต่อไป",
      ERROR_CREATE_TIMEOUT: "การตอบกลับของคุณไม่สามารถบันทึกได้เนื่องจากไม่สามารถติดต่อกับเซิร์ฟเวอร์  คลิก 'บันทึก' เพื่อลองอีกครั้ง",
      ERROR_CREATE_CANCEL: "ไม่สามารถบันทึกการตอบกลับของคุณได้ เนื่องจากการร้องขอถูกยกเลิก  คลิก 'บันทึก' เพื่อลองอีกครั้ง",
      ERROR_CREATE_NOT_LOGGED_IN: "คุณต้องล็อกอินเพื่อสร้างการตอบกลับนี้  คลิก 'บันทึก' เพื่อจะพร้อมต์ให้ล็อกอิน",
      ERROR_NO_CONTENT: "ป้อนการตอบกลับของคุณ และคลิก 'บันทึก'  ถ้าคุณไม่ต้องการออกจากการตอบกลับให้คลิก 'ยกเลิก'",
      ERROR_UNAUTHORIZED: "ไม่สามารถบันทึกมุมมองได้ เนื่องจากคุณไม่ได้รับอนุญาตให้ฝากคำตอบ",
      COMMENT_DELETED: {
         DAY: "การตอบกลับถูกลบทิ้งโดย ${user} เมื่อ ${EEEE} เวลา ${time}",
         MONTH: "การตอบกลับถูกลบทิ้งโดย ${user} เมื่อ ${MMM} ${d}",
         TODAY: "การตอบกลับถูกลบทิ้งโดย ${user} วันนี้ เวลา ${time}",
         YEAR: "การตอบกลับถูกลบทิ้งโดย ${user} เมื่อ ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "การตอบกลับถูกลบทิ้งโดย ${user} เมื่อวานนี้ เวลา ${time}",
         TOMORROW: "การตอบกลับถูกลบทิ้งโดย ${user} เมื่อ ${MMM} ${d}, ${YYYY}"
      },
      REASON_FOR_DELETION: "เหตุผลสำหรับการลบ: ${reason}",
      REPLY_TITLE: "ตอบกลับ: ${0}",
      SHOW_FULL_REPLY: "ดูการตอบกลับแบบเต็ม",
      SHOW_FULL_REPLY_TOOLTIP: "นำทางไปยังการตอบกลับเริ่มต้นในหัวข้อฟอรัม",
      REPLY_ACTION: "ตอบกลับ",
      REPLY_ACTION_TOOLTIP: "ตอบกลับการโพสต์นี้",
      MODERATION_PENDING: "การตอบกลับนี้กำลังรอการตรวจทาน",
      MODERATION_QUARANTINED: "โพสต์ถูกกักกันไว้โดยผู้ดำเนินการ",
      MODERATION_REMOVED: {
         DAY: "การตอบกลับนี้ถูกลบออกโดย ${user} บน ${EEEE} เวลา ${time}.",
         MONTH: "การตอบกลับนี้ถูกลบออกโดย ${user} บน ${MMM} ${d}.",
         TODAY: "การตอบกลับนี้ถูกลบออกโดย ${user} วันนี้เวลา ${time}.",
         YEAR: "การตอบกลับนี้ถูกลบออกโดย ${user} บน ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "การตอบกลับนี้ถูกลบออกโดย ${user} เมื่อวานนี้ เวลา ${time}.",
         TOMORROW: "การตอบกลับนี้ถูกลบออกโดย ${user} บน ${MMM} ${d}, ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "การตอบกลับนี้ถูกปฏิเสธโดย ${user} บน ${EEEE} เวลา ${time}",
         MONTH: "การตอบกลับนี้ถูกปฏิเสธโดย ${user} บน ${MMM} ${d}.",
         TODAY: "การตอบกลับนี้ถูกปฏิเสธโดย ${user} วันนี้ เวลา ${time}.",
         YEAR: "การตอบกลับนี้ถูกปฎิเสธโดย ${user} บน ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "การตอบกลับนี้ถูกปฏิเสธโดย ${user} เมื่อวานนี้ เวลา ${time}.",
         TOMORROW: "การตอบกลับนี้ถูกปฎิเสธโดย ${user} บน ${MMM} ${d}, ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "ข้อคิดเห็นของคุณถูกส่งสำหรับการตรวจทานและจะพร้อมใช้งานเมื่อได้รับการอนุมัติ"
   },
   COMMENTS: {
      ARIA_LABEL: "ความคิดเห็น",
      PLACEHOLDER_TXT: "เพิ่มข้อคิดเห็น",
      TAB_TITLE: "ข้อคิดเห็น (${0})",
      ACTION_NOT_SUPPORTED: "แอ็คชันที่ไม่สนับสนุน",
      ADD_COMMENT: "เพิ่มข้อคิดเห็น",
      ADD_COMMENT_TOOLTIP: "เพิ่มข้อคิดเห็นไปยังไอเท็มนี้",
      CANCEL: "ยกเลิก",
      COMMENT_COUNT_ONE: "${0} ข้อคิดเห็น",
      COMMENT_COUNT_MANY: "${0} ข้อคิดเห็น",
      COMMENT_LABEL: "ข้อคิดเห็น:",
      DELETE: "ลบ",
      DELETE_TOOLTIP: "ลบข้อคิดเห็น",
      DELETEREASON: "เหตุผลในการลบข้อคิดเห็นนี้",
      DIALOG_TITLE: "ทำข้อคิดเห็นให้สั้นลง",
      TOOLTIP: "ทำข้อคิดเห็นให้สั้นลง",
      NAME: "ทำข้อคิดเห็นให้สั้นลง",
      EDIT: "แก้ไข",
      EDIT_TOOLTIP: "แก้ไขข้อคิดเห็น",
      ERROR_CREATE: "ไม่สามารถบันทึกความคิดเห็นของคุณได้  โปรดลองอีกครั้งภายหลัง",
      ERROR_CREATE_NOT_FOUND: "ไม่สามารถบันทึกข้อคิดเห็นของคุณได้ เนื่องจากไอเท็มถูกลบออกแล้วหรือคุณมองไม่เห็นอีกต่อไป",
      ERROR_CREATE_ACCESS_DENIED: "ไม่สามารถบันทึกข้อคิดเห็นของคุณได้ เนื่องจากไอเท็มถูกลบออกแล้วหรือคุณมองไม่เห็นอีกต่อไป",
      ERROR_CREATE_TIMEOUT: "ไม่สามารถบันทึกความคิดเห็นของคุณได้ เนื่องจากไม่สามารถติดต่อเซิร์ฟเวอร์ได้  คลิก 'โพสต์' เพื่อลองอีกครั้ง",
      ERROR_CREATE_CANCEL: "ไม่สามารถบันทึกข้อคิดเห็นของคุณได้ เนื่องจากการร้องขอถูกยกเลิก  คลิก 'โพสต์' เพื่อลองอีกครั้ง",
      ERROR_CREATE_NOT_LOGGED_IN: "คุณต้องล็อกอินเพื่อสร้างความคิดเห็นนี้  คลิก 'โพสต์' เพื่อจะได้รับพร้อมต์ให้ล็อกอิน",
      ERROR_DELETE: "ไม่สามารถลบความคิดเห็นของคุณได้  โปรดลองอีกครั้งภายหลัง",
      ERROR_DELETE_TIMEOUT: "ไม่สามารถลบความคิดเห็นของคุณได้ เนื่องจากไม่สามารถติดต่อเซิร์ฟเวอร์ได้  คลิก 'ลบ' เพื่อลองอีกครั้ง",
      ERROR_DELETE_NOT_FOUND: "ไม่สามารถลบข้อคิดเห็นของคุณได้เนื่องจากข้อคิดเห็นหรือไอเท็มถูกลบออกแล้ว หรือคุณมองไม่เห็นอีกต่อไป",
      ERROR_DELETE_ACCESS_DENIED: "ไม่สามารถลบข้อคิดเห็นของคุณได้ เนื่องจากไอเท็มถูกลบออกแล้วหรือคุณมองไม่เห็นอีกต่อไป",
      ERROR_DELETE_CANCEL: "ไม่สามารถลบข้อคิดเห็นของคุณได้ เนื่องจากการร้องขอถูกยกเลิก  คลิก 'ลบ' เพื่อลองอีกครั้ง",
      ERROR_DELETE_NOT_LOGGED_IN: "คุณต้องล็อกอินเพื่อลบความคิดเห็นนี้  คลิก 'ลบ' เพื่อจะพร้อมต์ให้ล็อกอิน",
      ERROR_EDIT: "ไม่สามารถอัพเดตความคิดเห็นของคุณได้  โปรดลองอีกครั้งภายหลัง",
      ERROR_EDIT_ACCESS_DENIED: "ไม่สามารถอัพเดตข้อคิดเห็นของคุณได้ เนื่องจากไอเท็มถูกลบออกแล้วหรือคุณมองไม่เห็นอีกต่อไป",
      ERROR_EDIT_NOT_FOUND: "ไม่สามารถอัพเดตข้อคิดเห็นของคุณได้ เนื่องจากไอเท็มถูกลบออกแล้วหรือคุณมองไม่เห็นอีกต่อไป",
      ERROR_EDIT_TIMEOUT: "ไม่สามารถอัพเดตความคิดเห็นของคุณได้ เนื่องจากไม่สามารถติดต่อเซิร์ฟเวอร์ได้  คลิก 'โพสต์' เพื่อลองอีกครั้ง",
      ERROR_EDIT_CANCEL: "ไม่สามารถอัพเดตข้อคิดเห็นของคุณได้ เนื่องจากการร้องขอถูกยกเลิก  คลิก 'โพสต์' เพื่อลองอีกครั้ง",
      ERROR_EDIT_NOT_LOGGED_IN: "คุณต้องล็อกอินเพื่อแก้ไขความคิดเห็นนี้  คลิก 'โพสต์' เพื่อจะได้รับพร้อมต์ให้ล็อกอิน",
      ERROR_NO_CONTENT: "ป้อนข้อคิดเห็นของคุณ และคลิก 'โพสต์'  ถ้าคุณไม่ต้องการออกจากการให้ข้อคิดเห็น คลิก 'ยกเลิก'",
      ERROR_NO_CONTENT_EDIT: "ป้อนข้อคิดเห็นของคุณ และคลิก 'โพสต์'  ถ้าคุณไม่ต้องการแก้ไขข้อคิดเห็นของคุณ คลิก 'ยกเลิก'",
      ERROR_UNAUTHORIZED: "ไม่สามารถบันทึกความคิดเห็นเนื่องจากคุณไม่ได้รับอนุญาตให้ฝากความคิดเห็น",
      ERROR_GENERAL: "มีข้อผิดพลาดเกิดขึ้น",
      OK: "OK",
      YES: "ใช่",
      TRIM_LONG_COMMENT: "ทำข้อคิดเห็นให้สั้นลงหรือไม่?",
      WARN_LONG_COMMENT: "ข้อคิดเห็นยาวเกินไป  ${shorten}",
      LINK: "ลิงก์",
      SAVE: "บันทึก",
      POST: "โพสต์",
      SHOWMORE: "อ่านเพิ่มเติม...",
      VIEW_COMMENTS_FILE: "ดูข้อคิดเห็นเกี่ยวกับไฟล์นี้",
      SUBSCRIBE_TO_COMMENTS: "สมัครสมาชิกไปยังข้อคิดเห็นเหล่านี้",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "ปฏิบัติตามการเปลี่ยนแปลงในข้อคิดเห็นเหล่านี้ผ่านทางตัวอ่าน feed ของคุณ",
      PROFILE_TITLE: "เปิดโปรไฟล์ของ ${user}",
      PROFILE_A11Y: "การเรียกใช้ลิงก์นี้จะเปิดโปรไฟล์ของ ${user} ในหน้าต่างใหม่",
      MODERATION_PENDING: "ข้อคิดเห็นนี้กำลังรอการตรวจสอบ",
      MODERATION_REMOVED: {
         DAY: "ข้อคิดเห็นนี้ถูกลบออกโดย ${user} บน ${EEEE} เวลา ${time}",
         MONTH: "ข้อคิดเห็นนี้ถูกลบออกโดย ${user} เมื่อ ${MMM} ${d}.",
         TODAY: "ข้อคิดเห็นนี้ถูกลบออกโดย ${user} วันนี้เวลา ${time}",
         YEAR: "ข้อคิดเห็นนี้ถูกลบออกโดย ${user} เมื่อ ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "ข้อคิดเห็นนี้ถูกลบออกโดย ${user} เมื่อวานนี้เวลา ${time}",
         TOMORROW: "ข้อคิดเห็นนี้ถูกลบออกโดย ${user} เมื่อ ${MMM} ${d}, ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "ข้อคิดเห็นนี้ถูกปฏิเสธโดย ${user} บน ${EEEE} เวลา ${time}",
         MONTH: "ข้อคิดเห็นนี้ถูกปฏิเสธโดย ${user} เมื่อ ${MMM} ${d}.",
         TODAY: "ข้อคิดเห็นนี้ถูกปฏิเสธโดย ${user} วันนี้เวลา ${time}",
         YEAR: "ข้อคิดเห็นนี้ถูกปฏิเสธโดย ${user} เมื่อ ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "ข้อคิดเห็นนี้ถูกปฏิเสธโดย ${user} เมื่อวานนี้เวลา ${time}",
         TOMORROW: "ข้อคิดเห็นนี้ถูกปฏิเสธโดย ${user} เมื่อ ${MMM} ${d}, ${YYYY}"
      },
      PREV_COMMENTS: "แสดงข้อคิดเห็นก่อนหน้านี้",
      EMPTY: "ไม่มีข้อคิดเห็น",
      ERROR_ALT: "ข้อผิดพลาด",
      ERROR: "เกิดข้อผิดพลาดขึ้นขณะดึงข้อคิดเห็น ${again}",
      ERROR_ADDTL: "เกิดข้อผิดพลาดขึ้นขณะดึงข้อคิดเห็นเพิ่มเติม ${again}",
      ERROR_AGAIN: "ลองอีกครั้ง",
      ERROR_AGAIN_TITLE: "ลองส่งการร้องขออีกครั้งเพื่อขอข้อคิดเห็นเพิ่มเติม",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE} เวลา ${time} (เวอร์ชัน ${version})",
         MONTH: "${user} ${MMM} ${d} (เวอร์ชัน ${version})",
         TODAY: "${user} วันนี้เวลา ${time} (เวอร์ชัน ${version})",
         YEAR: "${user} ${MMM} ${d}, ${YYYY} (เวอร์ชัน ${version})",
         YESTERDAY: "${user} เมื่อวานนี้เวลา ${time} (เวอร์ชัน ${version})",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (เวอร์ชัน ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} เวลา ${time}",
         MONTH: "${user} ${MMM} ${d}",
         TODAY: "${user} วันนี้เวลา ${time}",
         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} เมื่อวานนี้เวลา ${time}",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} เวลา ${time}",
         MONTH: "${MMM} ${d}",
         TODAY: "วันนี้เมื่อ ${time}",
         YEAR: "${MMM} ${d}, ${YYYY}",
         YESTERDAY: "เมื่อวานนี้ที่ ${time}",
         TOMORROW: "${MMM} ${d}, ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "ข้อคิดเห็นถูกลบออกโดย ${user} บน ${EEEE} เมื่อ ${time}",
         MONTH: "ข้อคิดเห็นถูกลบออกโดย ${user} เมื่อ ${MMM} ${d}",
         TODAY: "ข้อคิดเห็นถูกลบออกโดย ${user} วันนี้เมื่อ ${time}",
         YEAR: "ข้อคิดเห็นถูกลบออกโดย ${user} เมื่อ ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "ข้อคิดเห็นถูกลบออกโดย ${user} เมื่อวานนี้เมื่อ ${time}",
         TOMORROW: "ข้อคิดเห็นถูกลบออกโดย ${user} เมื่อ ${MMM} ${d}, ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} แก้ไขที่ ${EEEE} เวลา ${time} (เวอร์ชัน ${version})",
         MONTH: "${user} แก้ไข ${MMM} ${d} (เวอร์ชัน ${version})",
         TODAY: "${user} แก้ไขวันนี้เวลา ${time} (เวอร์ชัน ${version})",
         YEAR: "${user} แก้ไขเมื่อ ${MMM} ${d}, ${YYYY} (เวอร์ชัน ${version})",
         YESTERDAY: "${user} แก้ไขเมื่อวานนี้เวลา ${time} (เวอร์ชัน ${version})",
         TOMORROW: "${user} แก้ไขเมื่อ ${MMM} ${d}, ${YYYY} (เวอร์ชัน ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} แก้ไขที่ ${EEEE} เวลา ${time}",
         MONTH: "${user} แก้ไข ${MMM} ${d}",
         TODAY: "${user} แก้ไขวันนี้เวลา ${time}",
         YEAR: "${user} แก้ไขเมื่อ ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} แก้ไขเมื่อวานนี้เวลา ${time}",
         TOMORROW: "${user} แก้ไขเมื่อ ${MMM} ${d}, ${YYYY}"
      },

      DELETE_CONFIRM: "คุณแน่ใจว่าต้องการลบข้อคิดเห็นนี้?",
      FLAG_ITEM: {
         BUSY: "กำลังบันทึก...",
         CANCEL: "ยกเลิก",
         ACTION: "แฟล็กเป็นไม่เหมาะสม",
         DESCRIPTION_LABEL: "จัดเตรียมเหตุผลสำหรับการแฟล็กไอเท็มนี้ (เป็นทางเลือก)",
         EDITERROR: "ไม่ได้แก้ไขข้อมูลเมตาของไฟล์เนื่องจากข้อผิดพลาด",
         OK: "บันทึก",
         ERROR_SAVING: "มีข้อผิดพลาดกับการประมวลผลการร้องขอ โปรดลองอีกครั้งภายหลัง",
         SUCCESS_SAVING: "แฟล็กของคุณถูกส่ง ผู้ตรวจสอบจะตรวจสอบเร็วๆนี้",
         TITLE: "แฟล็กไอเท็มนี้ว่าไม่เหมาะสม",
         COMMENT: {
            TITLE: "แฟล็กข้อคิดเห็นนี้เป็นไม่เหมาะสม",
            A11Y: "ปุ่มนี้จะเปิดไดอะล็อกที่ช่วยให้ผู้ใช้แฟล็กข้อคิดเห็นนี้ว่าไม่เหมาะสม"
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "ยกเลิก",
      DIALOG_TITLE: "ลบข้อคิดเห็น",
      NAME: "ลบข้อคิดเห็น",
      OK: "OK",
      TOOLTIP: "ลบข้อคิดเห็น"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "ยกเลิก",
      CONFIRM: "การตัดให้สั้นลงจะลบข้อความที่เกินขีดจำกัดข้อคิดเห็นออก  คลิก 'ตกลง' เพื่อตัดให้สั้นลง หรือ 'ยกเลิก' เพื่อแก้ไขข้อคิดเห็นด้วยตัวคุณเอง",
      DIALOG_TITLE: "ทำข้อคิดเห็นให้สั้นลง",
      NAME: "ทำข้อคิดเห็นให้สั้นลง",
      OK: "OK",
      TOOLTIP: "ทำข้อคิดเห็นให้สั้นลง"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "การส่งการยืนยัน",
      CONFIRM: "ข้อคิดเห็นของคุณถูกส่งสำหรับการตรวจสอบและจะพร้อมใช้งานเมื่อได้รับการอนุมัติ",
      OK: "OK"
   },

   DATE: {
      AM: "AM",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "PM",
      TODAY: "วันนี้",
      TODAY_U: "วันนี้",
      YESTERDAY: "วันวานนี้",
      YESTERDAY_U: "เมื่อวานนี้",

      ADDED: { DAY: "ถูกเพิ่ม ${EEee} เมื่อ ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "ถูกเพิ่ม ${date_long}",
         TODAY: "ถูกเพิ่มวันนี้เมื่อ ${time}",
         YEAR: "ถูกเพิ่ม ${date_long}",
         YESTERDAY: "ถูกเพิ่มเมื่อวานนี้เมื่อ ${time}"
      },

      LAST_UPDATED: { DAY: "อัพเดตครั้งล่าสุด ${EEee} เมื่อ ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "อัพเดตครั้งล่าสุด ${date_long}",
         TODAY: "อัพเดตครั้งล่าสุดวันนี้เมื่อ ${time}",
         YEAR: "อัพเดตครั้งล่าสุด ${date_long}",
         YESTERDAY: "อัพเดตครั้งล่าสุดเมื่อวานนี้เมื่อ ${time}"
      },

      MONTHS_ABBR: { 0: "ม.ค.",
         10: "พ.ย.",
         11: "ธ.ค.",
         1: "ก.พ.",
         2: "มี.ค.",
         3: "เม.ย.",
         4: "พ.ค.",
         5: "มิ.ย.",
         6: "ก.ค.",
         7: "ส.ค.",
         8: "ก.ย.",
         9: "ต.ค."
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "วันนี้",
         YEAR: "${date_short}",
         YESTERDAY: "เมื่อวานนี้",
         TOMORROW: "วันพรุ่งนี้"
      },

      RELATIVE_TIME: { DAY: "${EEee} เมื่อ ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "วันนี้เมื่อ ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "เมื่อวานนี้เมื่อ ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} เมื่อ ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "วันนี้เมื่อ ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "เมื่อวานนี้เมื่อ ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} เมื่อ ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short} เมื่อ ${time}",
         TODAY: "${date_short} เมื่อ ${time}",
         YEAR: "${date_short} เมื่อ ${time}",
         YESTERDAY: "${date_short} เมื่อ ${time}",
         TOMORROW: "${date_short} เมื่อ ${time}"
      },

      DATE_ONLY: { DAY: "${date_short}",
         FULL: "${EEEE}, ${date_long}",
         MONTH: "${date_short}",
         TODAY: "${date_short}",
         YEAR: "${date_short}",
         YESTERDAY: "${date_short}",
         TOMORROW: "${date_short}"
      },

      TIME_ONLY: { DAY: "${time}",
         FULL: "${time_long}",
         MONTH: "${time}",
         TODAY: "${time}",
         YEAR: "${time}",
         YESTERDAY: "${time}",
         TOMORROW: "${time}"
      },

      UPDATED: { DAY: "อัพเดต ${EEee} เมื่อ ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "ถูกอัพเดต ${date_long}",
         TODAY: "อัพเดตวันนี้เมื่อ ${time}",
         YEAR: "ถูกอัพเดต ${date_long}",
         YESTERDAY: "ถูกอัพเดตเมื่อวานนี้เมื่อ ${time}"
      }
   },
   VERSIONS: {
      ERROR: "ไม่สามารถโหลดข้อมูลเวอร์ชัน",
      ERROR_REQUEST_CANCELLED: "การร้องขอถูกยกเลิก",
      ERROR_REQUEST_TIMEOUT: "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้",
      ERROR_REQUEST_UNKNOWN: "มีข้อผิดพลาดที่ไม่รู้จักเกิดขึ้น",
      LOADING: "กำลังโหลด ..",
      NO_VERSIONS: "ไม่มีเวอร์ชัน",
      INFO: "เวอร์ชัน ${0} ที่สร้าง ${1} โดย ",
      VERSION_NUMBER: "เวอร์ชัน ${0}",
      DELETED: "ลบเมื่อ",
      DELETE_ALL: "ลบเวอร์ชันทั้งหมดก่อนหน้าเวอร์ชันนี้",
      DELETE_VERSION_SINGLE: "ลบเวอร์ชัน ${0}",
      DELETEERROR: "ไม่ได้ลบเวอร์ชันเนื่องจากข้อผิดพลาด",
      CREATE_VERSION: "สร้างเวอร์ชันใหม่",
      CREATE_VERSION_TOOLTIP: "สร้างเวอร์ชันของไฟล์นี้",
      REVERT_VERSION: "เรียกคืนเวอร์ชัน ${0}",
      REVERT_DESCRIPTION: "ถูกเรียกคืนจากเวอร์ชัน ${0}",
      PREVIOUS: "ก่อนหน้า",
      PREVIOUS_TOOLTIP: "หน้าก่อนหน้านี้",
      ELLIPSIS: "...",
      NEXT: "ถัดไป",
      NEXT_TOOLTIP: "หน้าถัดไป",
      COUNT: "${0}-${1} จาก ${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "หน้า",
      SHOW: "แสดง",
      ITEMS_PER_PAGE: " รายการต่อเพจ",
      DATE: {
        AM: "AM",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "วันนี้เมื่อ ${time}",
            YESTERDAY: "เมื่อวานนี้เมื่อ ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} เมื่อ ${time}",
            YEAR: "${date_short} เมื่อ ${time}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short} เมื่อ ${time}",
            TODAY: "วันนี้เมื่อ ${time}",
            YESTERDAY: "เมื่อวานนี้เมื่อ ${time}"
        },
        UPDATED: { DAY: "อัพเดต ${EEee} เมื่อ ${time}",
            YEAR: "ถูกอัพเดต ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "ถูกอัพเดต ${date_short}",
            TODAY: "อัพเดตวันนี้เมื่อ ${time}",
            YESTERDAY: "ถูกอัพเดตเมื่อวานนี้เมื่อ ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "ลบเวอร์ชัน ${0}",
         DOWNLOAD: "ดาวน์โหลด",
         DOWNLOAD_TOOLTIP: "ดาวน์โหลดเวอร์ชันนี้ (${0})",
         VIEW: "มุมมอง",
         VIEW_TOOLTIP: "ดูเวอร์ชัน ${0}",
         REVERT: {
            A11Y: "ปุ่มนี้เปิดไดอะล็อกที่ช่วยให้ผู้ใช้เรียกคืนไฟล์จากเวอร์ชันก่อนหน้า การยืนยันแอ็คชันนี้จะส่งผลให้เกิดการรีเฟรชเนื้อหาบนหน้า",
            FULL: "เรียกคืน",
            WIDGET: "เรียกคืนเวอร์ชันนี้"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "ไม่สามารถลบเวอร์ชันได้ เนื่องจากเวอร์ชันถูกลบออกแล้วหรือคุณมองไม่เห็นอีกต่อไป",
         ERROR_ACCESS_DENIED: "ไม่สามารถลบเวอร์ชันได้ เนื่องจากคุณไม่ได้เป็นผู้แก้ไข",
         ERROR_TIMEOUT: "ไม่ได้ลบเวอร์ชัน เนื่องจากไม่สามารถติดต่อเซิร์ฟเวอร์  คลิก 'ลบ' อีกครั้งเพื่อลองคำร้องขอของคุณอีกครั้ง",
         ERROR_CANCEL: "ไม่ได้ลบเวอร์ชัน เนื่องจากการร้องขอถูกยกเลิก  คลิก 'ลบ' อีกครั้งเพื่อลองคำร้องขอของคุณอีกครั้ง",
         ERROR_NOT_LOGGED_IN: "คุณต้องล็อกอินเพื่อลบเวอร์ชันนี้  คลิก 'ลบ' เพื่อจะพร้อมต์ให้ล็อกอิน",
         GENERIC_ERROR: "ไม่สามารถลบเวอร์ชันได้เนื่องจากข้อผิดพลาดที่ไม่รู้จัก  คลิก 'ลบ' อีกครั้งเพื่อลองคำร้องขอของคุณอีกครั้ง",
         FULL: "ลบ",
         A11Y: "ปุ่มนี้เปิดไดอะล็อกที่ช่วยให้ผู้ใช้ยืนยันการลบเวอร์ชันนี้ การยืนยันแอ็คชันนี้จะส่งผลให้เกิดการรีเฟรชเนื้อหาบนหน้า"
      },

      REVERT: {
         ERROR_NOT_FOUND: "ไม่สามารถเรียกคืนเวอร์ชันได้ เนื่องจากเวอร์ชันถูกลบออกแล้วหรือคุณมองไม่เห็นอีกต่อไป",
         ERROR_ACCESS_DENIED: "ไม่สามารถเรียกคืนเวอร์ชันได้ เนื่องจากคุณไม่ได้เป็นผู้แก้ไข",
         ERROR_NAME_EXISTS: "ไม่สามารถเรียกคืนเวอร์ชันได้ เนื่องจากอีกไฟล์หนึ่งมีชื่อเดียวกัน",
         ERROR_TIMEOUT: "เวอร์ชันไม่ถูกเรียกคืน เนื่องจากไม่สามารถติดต่อกับเซิร์ฟเวอร์  คลิก 'เรียกคืน' อีกครั้งเพื่อลองคำร้องขอของคุณใหม่อีกครั้ง",
         ERROR_CANCEL: "ไม่ได้เรียกคืนเวอร์ชัน เนื่องจากการร้องขอถูกยกเลิก  คลิก 'เรียกคืน' อีกครั้งเพื่อลองคำร้องขอของคุณใหม่อีกครั้ง",
         ERROR_QUOTA_VIOLATION: "ไม่สามารถเรียกคืนเวอร์ชันได้เนื่องจากข้อจำกัดพื้นที่ว่าง",
         ERROR_MAX_CONTENT_SIZE: "เวอร์ชันนี้ไม่สามารถเรียกคืนได้เนื่องจากมีขนาดใหญ่กว่าขนาดของไฟล์ที่อนุญาต ขนาด ${0}",
         GENERIC_ERROR: "ไม่สามารถเรียกคืนเวอร์ชัน เนื่องจากข้อผิดพลาดที่ไม่รู้จัก  คลิก 'เรียกคืน' อีกครั้งเพื่อลองคำร้องขอของคุณใหม่อีกครั้ง"
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "ดูผู้ที่ดาวน์โหลด...",
      PREVIOUS: "ก่อนหน้า",
      PREVIOUS_TOOLTIP: "หน้าก่อนหน้านี้",
      ELLIPSIS: "...",
      NEXT: "ถัดไป",
      NEXT_TOOLTIP: "หน้าถัดไป",
      COUNT: "${0}-${1} จาก ${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "หน้า",
      SHOW: "แสดง",
      ITEMS_PER_PAGE: " รายการต่อเพจ",
      VERSION: {
         DAY: "เวอร์ชัน ${version} เมื่อ ${date}",
         MONTH: "เวอร์ชัน ${version} เมื่อ ${date}",
         TODAY: "เวอร์ชัน ${version} เมื่อ ${time}",
         YEAR: "เวอร์ชัน ${version} เมื่อ ${date}",
         YESTERDAY: "เวอร์ชัน ${version} เมื่อวานนี้"
      },

      FILE: {
         V_LATEST: "คุณได้ดาวน์โหลดเวอร์ชันล่าสุดของไฟล์นี้",
         V_OLDER: "เวอร์ชัน ${0} ของไฟล์นี้ที่คุณดาวน์โหลดล่าสุด",
         LOADING: "กำลังโหลด...",
         EMPTY: "ผู้ใช้ที่ไม่ระบุชื่อเท่านั้น",
         ERROR: "ไม่สามารถโหลดข้อมูลการดาวน์โหลดได้"
      }
   },

   EE_DIALOG: {
      ERROR: "ข้อผิดพลาด",
      ERROR_ALT_TEXT: "ข้อผิดพลาด:",
      ERROR_MSG_GENERIC: "มีบางสิ่งผิดปกติ  โปรดลองใหม่",
      ERROR_MSG_NOT_AVAILABLE: "ไอเท็มนี้ถูกลบออก หรือไม่พร้อมใช้งานอีกต่อไป",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "เนื้อหาสำหรับไอเท็มนี้ไม่มีอยู่",
      ERROR_MSG_NO_ACCESS: "คุณไม่ได้เข้าถึงไอเท็มนี้อีกต่อไป",
      LOADING: "กำลังโหลด...",
      TITLE_SU: "${author} โพสต์ข้อความ",
      TITLE_NI: "${author} ได้เชิญคุณเข้าร่วมในเครือข่ายของเขา",
      AUTHOR_TITLE: "ดูโปรไฟล์สำหรับ ${author}",
      OPEN_LINK: "เปิด ${title}",
      CONFIRM_CLOSE_TITLE: "ยืนยัน",
      CONFIRM_CLOSE_MESSAGE: "คุณแน่ใจว่าต้องการละเว้นการเปลี่ยนแปลงของคุณหรือ? กด ตกลง เพื่อทำต่อไป หรือ ยกเลิก เพื่อกลับไป",
      OK: "OK",
      CANCEL: "ยกเลิก"
   },
   MESSAGE: {
      SUCCESS: "การยืนยัน",
      ERROR: "ข้อผิดพลาด",
      ERROR_ALT_TEXT: "ข้อผิดพลาด:",
      INFO: "ข้อมูล",
      WARNING: "คำเตือน",
      DISMISS: "ซ่อนข้อความนี้",
      MORE_DETAILS: "รายละเอียดเพิ่มเติม",
      HIDE_DETAILS: "ซ่อนรายละเอียด"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "สร้างที่: ${EEEE} เวลา ${time}",
           MONTH: "ถูกสร้าง: ${MMM} ${d}",
           TODAY: "ถูกสร้าง: วันนี้เมื่อ ${time}",
           YEAR: "สร้างเมื่อ: ${MMM} ${d}, ${YYYY}",
           YESTERDAY: "ถูกสร้าง: เมื่อวานนี้เมื่อ ${time}",
           TOMORROW: "สร้างเมื่อ: ${MMM} ${d}, ${YYYY}"
       },
      error: "มีข้อผิดพลาดเกิดขึ้น  ${again}.",
      error_again: "โปรดลองอีกครั้ง",
      error_404: "อัพเดตสถานะไม่มีอยู่อีกต่อไป",
      notifications: {
         STATUS_UPDATE: "${user} โพสต์ข้อความ",
         USER_BOARD_POST: "${user} ได้เขียนบนบอร์ดของคุณ:",
         POST_COMMENT: "${user} เขียน:"
      }
   },
   login: {
      error: "ชื่อผู้ใช้ของคุณ และ/หรือ รหัสผ่านไม่ตรงกับแอคเคาต์ที่มีอยู่ โปรดลองใหม่",
      logIn: "ล็อกอิน",
      password: "รหัสผ่าน:",
      user: "ชื่อผู้ใช้:",
      welcome: "ล็อกอินเข้าสู่ HCL Connections"
   },
   repost: {
      name: "โพสต์ซ้ำ",
      title: "โพสต์การอัพเดตนี้ถึงผู้ติดตามและชุมชนของฉันซ้ำ",
      msg_success: "อัพเดตถูกโพสต์ไปยังผู้ติดตามของคุณอีกครั้งเรียบร้อยแล้ว",
      msg_generic: "มีบางสิ่งผิดปกติ  โปรดลองใหม่"
   },
   FILE_SHARE_INFO: {
      ADD: "เพิ่ม",
      ADD_TXT: "เพิ่มบุคคลหรือชุมชนเป็นผู้อ่าน",
      SHOW_MORE: "แสดงเพิ่มเติม...",
      READER_IF_PUBLIC: "ทุกคน (พับลิก)",
      READER_IF_PUBLIC_TOOLTIP: "ไฟล์นี้เป็นพับลิกและทุกคนเห็นได้",
      EMPTY_READERS: "ไม่มี",
      READERS_LABEL: "ผู้อ่าน: ",
      EDITORS_LABEL: "เอดิเตอร์: ",
      OWNER_LABEL: "เจ้าของ: ",
      ERROR: "ไม่สามารถโหลดข้อมูลการแบ่งใช้",
      ERROR_NOT_FOUND: "ไฟล์ที่คุณร้องขอได้ถูกลบ หรือย้ายไปแล้ว ถ้ามีใครส่งลิงก์นี้ให้คุณ ให้ตรวจสอบว่าลิงก์ถูกต้อง",
      ERROR_ACCESS_DENIED: "คุณไม่มีสิทธิในการดูไฟล์นี้  ไฟล์ไม่ใช่แบบพับลิกและไม่มีการแบ่งใช้กับคุณ",
      SHARE: "แบ่งใช้",
      CANCEL: "ยกเลิก",
      SHARE_WITH: "แบ่งใช้กับ:",
      PERSON: "บุคคล",
      COMMUNITY: "ชุมชน",
      PLACEHOLDER: "ชื่อบุคคลหรืออีเมล...",
      MESSAGE: "ข้อความ:",
      MESSAGE_TXT: "เพิ่มข้อความเผื่อเลือก",
      REMOVE_ITEM_ALT: "ลบ ${0}",
      NO_MEMBERS: "ไม่มี",
      A11Y_READER_ADDED: "เลือก ${0} เป็นผู้อ่าน",
      A11Y_READER_REMOVED: "ลบ ${0} ในฐานะผู้อ่าน",
      SELF_REFERENCE_ERROR: "คุณไม่สามารถแบ่งใช้กับตัวคุณเอง",
      OWNER_REFERENCE_ERROR: "คุณไม่สามารถแบ่งใช้กับเจ้าของไฟล์",
      SHARE_COMMUNITY_WARN: "การแบ่งใช้กับชุมชนแบบพับลิก '${0}' จะทำให้ไฟล์นี้เป็นพับลิก",
      SELECT_USER_ERROR: "คุณต้องเลือกอย่างน้อยหนึ่งคนหรือหนึ่งชุมชนเพื่อแบ่งใช้",
      WARN_LONG_MESSAGE: "ข้อความยาวเกินไป",
      TRIM_LONG_MESSAGE: "ทำข้อความให้สั้นลงหรือไม่?",
      ERROR_SHARING: "ไม่สามารถแบ่งใช้ไฟล์  โปรดลองอีกครั้งในภายหลัง",
      INFO_SUCCESS: "ไฟล์ถูกแบ่งใช้เรียบร้อย",
      MAX_SHARES_ERROR: "จำนวนการแบ่งใช้สูงสุดเกินค่าที่กำหนด",
      NOT_LOGGED_IN_ERROR: "ไฟล์ไม่ถูกแบ่งใช้ เนื่องจากคุณไม่ได้ล็อกอิน  คลิก 'แบ่งใช้' เพื่อแบ่งใช้ไฟล์",
      TIMEOUT_ERROR: "ไฟล์ไม่ถูกแบ่งใช้ เนื่องจากไม่สามารถติดต่อกับเซิร์ฟเวอร์  คลิก 'แบ่งใช้' เพื่อลองอีกครั้ง",
      CANCEL_ERROR: "ไฟล์ไม่ถูกแบ่งใช้ เนื่องจากคำร้องขอถูกยกเลิก  คลิก 'แบ่งใช้' เพื่อลองอีกครั้ง",
      NOT_FOUND_ERROR: "ไฟล์นี้ถูกลบออกแล้วหรือคุณมองไม่เห็นอีกต่อไป และไม่สามารถแบ่งใช้ได้",
      ACCESS_DENIED_ERROR: "คุณไม่มีสิทธิแบ่งใช้ไฟล์นี้อีกต่อไป",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "ไฟล์ที่ถูกจำกัดจะไม่ถูกทำให้เป็นพับลิก",
      TOOLTIP: "ให้ผู้อื่นเข้าถึงไฟล์นี้"
   },
   HISTORY: {
      TAB_TITLE: "อัพเดตเมื่อเร็วๆ นี้",
      NO_HISTORY: "ไม่มีอัพเดตเมื่อเร็วๆ นี้",
      EMPTY: "ไม่สามารถดึงข้อมูลอัพเดตเมื่อเร็วๆ นี้สำหรับไอเท็มนี้ เนื่องจากอัพเดตถูกลบออกแล้ว หรือคุณไม่มีสิทธิเข้าถึงอัพเดตนั้นอีกต่อไป",
      MORE: "แสดงการอัพเดตก่อนหน้า",
      ERROR_ALT: "ข้อผิดพลาด",
      ERROR: "เกิดข้อผิดพลาดขึ้นขณะดึงข้อมูลอัพเดต ${again}",
      ERROR_ADDTL: "เกิดข้อผิดพลาดขึ้นขณะดึงอัพเดตเพิ่มเติม ${again}",
      ERROR_AGAIN: "ลองอีกครั้ง",
      ERROR_AGAIN_TITLE: "ลองส่งการร้องขออีกครั้งเพื่อขอการอัพเดตเพิ่มเติม",
      PROFILE_TITLE: "เปิดโปรไฟล์ของ ${user}",
      SORT_BY: "เรียงลำดับตาม\\:",
      SORTS: {
         DATE: "วันที่",
         DATE_TOOLTIP: "เรียงลำดับจากประวัติล่าสุดไปยังประวัติที่อัพเดตเก่ากว่า",
         DATE_TOOLTIP_REVERSE: "เรียงลำดับตามประวัติที่อัพเดตเก่ากว่าไปยังประวัติล่าสุด"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} เวลา ${time}",
             MONTH: "${MMM} ${d}",
             TODAY: "วันนี้เมื่อ ${time}",
             YEAR: "${MMM} ${d}, ${YYYY}",
             YESTERDAY: "เมื่อวานนี้เมื่อ ${time}",
             TOMORROW: "${MMM} ${d}, ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "ข้อคิดเห็นนี้",
	   REPLY_ACTION: "ตอบกลับ",
       REPLY_ACTION_TOOLTIP: "ตอบข้อคิดเห็นนี้"
   },
   OAUTH: {
      welcomeHeader: "ยินดีต้อนรับสู่ Connections",
      continueBtnLabel: "ทำต่อ",
      continueBtnA11y: "การเรียกใช้ลิงก์นี้จะเปิดหน้าต่างใหม่ ซึ่งจะอนุญาตให้คุณอนุญาตสิทธิการเข้าถึง Connections",
      clickHere: "คลิกที่นี่",
      infoMsg: "Connections ต้องได้รับการอนุญาตจากคุณเพื่อเข้าถึงข้อมูลของคุณ",
      authorizeGadget: "${clickHere} เพื่ออนุญาตให้แอ็พพลิเคชันนี้เข้าถึงข้อมูล Connections ของคุณ",
      confirmAuthorization: "${clickHere} เพื่อยืนยันว่าคุณได้อนุญาตให้แอ็พพลิเคชันนี้เข้าถึงข้อมูล Connections ของคุณ"
   },
   OAUTH_FILENET: {
      continueBtnA11y: "การเรียกใช้ลิงก์นี้จะเปิดหน้าต่างใหม่ ซึ่งช่วยให้คุณสามารถอนุญาตการเข้าถึงที่เก็บห้องสมุด Connections",
      infoMsg: "ที่เก็บห้องสมุด Connections ต้องได้รับการอนุญาตจากคุณเพื่อเข้าถึงข้อมูลของคุณ",
      authorizeGadget: "${clickHere} เพื่ออนุญาตให้แอ็พพลิเคชันนี้เข้าถึงข้อมูลที่เก็บห้องสมุด Connections ของคุณ",
      confirmAuthorization: "${clickHere} เพื่อยืนยันว่าคุณได้อนุญาตให้แอ็พพลิเคชันนี้เข้าถึงข้อมูลที่เก็บห้องสมุด Connections ของคุณ"
   },
   UNSAVEDCHANGES: {
      CANCEL: "ยกเลิก",
      CONFIRM: "คุณแน่ใจว่าต้องการยกเลิกการเปลี่ยนแปลงหรือไม่?  กด ตกลง เพื่อทำต่อ หรือ ยกเลิก เพื่อกลับไป",
      DIALOG_TITLE: "ยืนยัน",
      NAME: "ยืนยัน",
      OK: "OK",
      TOOLTIP: "ยืนยัน"
   }
})

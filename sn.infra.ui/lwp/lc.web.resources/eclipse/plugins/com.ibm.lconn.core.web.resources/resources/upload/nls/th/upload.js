/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({

	"ACTIONS_RENAME" : "เปลี่ยนชื่อ",
	"ACTIONS_REPLACE" : "แทนที่",
	"ACTIONS_UNDO" : "เลิกทำ",
	"ACTIONS_REPLACE_INVALID" : "ลบอักขระที่ไม่ถูกต้อง",
	"ACTIONS_TRUNCATE" : "ลดทอนชื่อ",
	"ACTIONS_REVERT": "คืนกลับ",
	"ACTIONS_REMOVE": "ลบไฟล์",

	"ALERT" : "Alert ",
	"ALERT_MESSAGE": "มีคำเตือนหรือข้อผิดพลาดสำหรับไฟล์ที่เลือก โปรดใช้แท็บเพื่อนำทางไปยังไฟล์ที่เลือกแต่ละไฟล์ และตรวจสอบ",
	"LEVEL_INFO" : "ข้อมูล",
	"LEVEL_WARNING" : "คำเตือน",
	"LEVEL_ERROR" : "ข้อผิดพลาด",
	
	"A11Y_INFO": "ข้อมูล:",
	"A11Y_WARNING": "การเตือน:",
	"A11Y_ERROR": "ข้อผิดพลาด:",

	"STATUS_REPLACE" : "ไฟล์นี้จะแทนที่ไฟล์ที่มีอยู่แล้ว",
	"STATUS_REMOTE_DUPLICATE" : "ไฟล์ที่มีชื่อนี้มีอยู่แล้ว",
	
   "STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_GLOBAL" : "ไฟล์ที่ชื่อ ${0} มีอยู่แล้วใน ไฟล์ของฉัน ",
   "STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_GLOBAL_1" : "ไฟล์ที่ชื่อ ${0} มีอยู่แล้วใน ไฟล์ของฉัน ",
   "STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_COLLECTION" : "ไฟล์ที่ชื่อ ${0} มีอยู่แล้วในโฟลเดอร์นี้ ",
   "STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_COLLECTION_1" : "ไฟล์ที่ชื่อ ${0} มีอยู่แล้วในโฟลเดอร์นี้ ",
   "STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_MYDRIVE" : "ไฟล์ที่ชื่อ ${0} มีอยู่แล้วใน My Drive ",
   "STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_MYDRIVE_1" : "ไฟล์ที่ชื่อ ${0} มีอยู่แล้วใน My Drive ",
   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
   "STATUS_REMOTE_DUPLICATE_RENAME_AND_REPLACE_ACTION" : "ยังคงอัพโหลดเป็นเวอร์ชันใหม่หรือเปลี่ยนชื่อไฟล์ ${0}",
   "STATUS_REMOTE_DUPLICATE_RENAME_ACTION" : "ระบุชื่ออื่น ${0}",
	//${0} is ACTIONS_RENAME_LONG, word 'Rename'
   "STATUS_REMOTE_DUPLICATE_RENAME" : "ไฟล์ที่มีชื่อนี้มีอยู่แล้ว ยังคงอัพโหลดเป็นเวอร์ชันใหม่หรือเปลี่ยนชื่อไฟล์ ${0}",
   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "ไฟล์ที่มีชื่อนี้มีอยู่แล้วในชุมชนนี้ ยังคงอัพโหลดเป็นเวอร์ชันใหม่หรือเปลี่ยนชื่อไฟล์ ${0}",
   "ACTIONS_RENAME_LONG" : "เปลี่ยนชื่อ", 
	"STATUS_LOCAL_DUPLICATE" : "ไฟล์ถูกเลือกไว้แล้ว",
	"STATUS_TO_PREVIEW" : "รูปขนาดย่อไม่สามารถสร้างได้สำหรับวิดีโอนี้ ไปยังรายละเอียดไฟล์เพื่อเพิ่มอิมเมจที่จะแสดงในการแสดงตัวอย่าง",
	"STATUS_INVALID_CHARS" : "ชื่อไฟล์นี้มีอักขระที่ไม่ถูกต้องต่อไปนี้: \\ / : * ? \\ < > |",
	"STATUS_NAME_TOO_LONG" : "ชื่อไฟล์นี้มีความยาวเกินความยาวสูงสุด ${0} ไบต์",
	"STATUS_RENAMED": "ชื่อไฟล์เดิมคือ ${0}",
	
	"ERROR_TOO_BIG": "${0} มีขนาด ${1} ซึ่งใหญ่กว่าจำนวนสูงสุด ${2} ที่อนุญาต",
	"ERROR_TOO_BIG_FOR_BROWSER": "ไฟล์ ${0} มีขนาดใหญ่เกินกว่าที่จะอัพโหลดโดยใช้เบราว์เซอร์ปัจจุบันของคุณ ลองใช้เบราว์เซอร์อื่น",
   "ERROR_TOO_BIG_FOR_BROWSER_OR_ENABLE_FLASH": "ไฟล์ ${0} มีขนาดใหญ่เกินกว่าที่จะอัพโหลดโดยใช้เบราว์เซอร์และค่าติดตั้งปัจจุบันของคุณ ลองเปิดใช้ Flash หรือลองใช้เบราว์เซอร์อื่น",
	"ERROR_BAD_EXT_WHITELIST": "${0} ไม่ถูกต้องเพราะส่วนขยายไฟล์ ${1} ไม่อยู่ในรายการของส่วนขยายไฟล์ที่อนุญาต",
	"ERROR_BAD_EXT_BLACKLIST": "${0} ไม่ถูกต้องเพราะส่วนขยายไฟล์ ${1} อยู่ในรายการของส่วนขยายไฟล์ต้องห้าม",
	"ERROR_IO": "${0} ไม่สามารถเลือกได้โดยเบราว์เซอร์ของคุณ",

	"UI_EDIT" : "เปลี่ยนชื่อ ${0} (${1}) โดยการกด Enter",
	"UI_EDIT_TOOLTIP": "กด Enter เพื่อบันทึกชื่อไฟล์ หรือ Esc เพื่อยกเลิก",
	"UI_REMOVE" : "ลบ ${0}",
	
	"SIZE_UNKNOWN": "ไม่รู้จัก",
	
	"STATE_UPLOADING" : "${0} กำลังถูกอัพโหลดในขณะนี้",
	"STATE_UPLOADED" : "${0} ถูกอัพโหลดเรียบร้อยแล้ว",
	
	"B": "${0} B",
	"KB": "${0} KB",
	"MB": "${0} MB",
	"GB": "${0} GB",
	
	"BUTTON_TEXT_WEBKIT": "เลือกไฟล์",
	"BUTTON_TEXT_WEBKIT_1": "เลือกไฟล์",
	"BUTTON_TEXT": "เรียกดู...",
	"A11Y_CLOSE_BUTTON_WITH_LINK": "กดแท็บเพื่อย้ายไปที่ปุ่ม ${0}"
})


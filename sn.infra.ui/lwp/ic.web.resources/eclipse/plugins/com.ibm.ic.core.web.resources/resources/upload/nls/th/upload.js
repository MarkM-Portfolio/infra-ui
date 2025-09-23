define(
	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2014                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	// NLS_CHARSET=UTF-8
	({
	
		"ACTIONS_RENAME" : "เปลี่ยนชื่อ",
		"ACTIONS_REPLACE" : "แทนที่",
		"ACTIONS_UNDO" : "เลิกทำ",
		"ACTIONS_REPLACE_INVALID" : "ลบอักขระที่ไม่ถูกต้อง",
		"ACTIONS_TRUNCATE" : "ลดทอนชื่อ",
		"ACTIONS_REVERT": "คืนกลับ",
		"ACTIONS_REMOVE": "ลบไฟล์",
	
		"LEVEL_INFO" : "ข้อมูล",
		"LEVEL_WARNING" : "คำเตือน",
		"LEVEL_ERROR" : "ข้อผิดพลาด",
		
		"A11Y_INFO": "ข้อมูล:",
		"A11Y_WARNING": "การเตือน:",
		"A11Y_ERROR": "ข้อผิดพลาด:",
	
		"STATUS_REPLACE" : "ไฟล์นี้จะแทนที่ไฟล์ที่มีอยู่แล้ว",
		"STATUS_REMOTE_DUPLICATE" : "ไฟล์ที่มีชื่อนี้มีอยู่แล้ว",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "ไฟล์ที่มีชื่อนี้มีอยู่แล้ว ยังคงอัพโหลดเป็นเวอร์ชันหรือเปลี่ยนชื่อไฟล์ ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "ไฟล์ที่มีชื่อนี้มีอยู่แล้วในชุมชนนี้ ยังคงอัพโหลดเป็นเวอร์ชันหรือเปลี่ยนชื่อไฟล์ ${0}",
	   "ACTIONS_RENAME_LONG" : "เปลี่ยนชื่อ", 
		"STATUS_LOCAL_DUPLICATE" : "ไฟล์ถูกเลือกไว้แล้ว",
		"STATUS_TO_PREVIEW" : "ไม่สามารถสร้างภาพขนาดเล็กสำหรับวิดีโอนี้ ไปยังรายละเอียดไฟล์เพื่อเพิ่มรูปภาพที่จะแสดงในการแสดงตัวอย่าง",
		"STATUS_INVALID_CHARS" : "ชื่อไฟล์นี้มีอักขระที่ไม่ถูกต้อง",
		"STATUS_NAME_TOO_LONG" : "ชื่อไฟล์นี้มีความยาวเกินความยาวสูงสุด ${0} ไบต์",
		"STATUS_RENAMED": "ชื่อไฟล์เดิมคือ ${0}",
		
		"ERROR_TOO_BIG": "${0} มีขนาด ${1} ซึ่งใหญ่กว่าจำนวนสูงสุด ${2} ที่อนุญาต",
		"ERROR_BAD_EXT_WHITELIST": "${0} ไม่ถูกต้องเพราะส่วนขยายไฟล์ ${1} ไม่อยู่ในรายการของส่วนขยายไฟล์ที่อนุญาต",
		"ERROR_BAD_EXT_BLACKLIST": "${0} ไม่ถูกต้องเพราะส่วนขยายไฟล์ ${1} อยู่ในรายการของส่วนขยายไฟล์ต้องห้าม",
		"ERROR_IO": "${0} ไม่สามารถเลือกได้โดยเบราว์เซอร์ของคุณ",
	
		"UI_EDIT" : "เปลี่ยนชื่อ ${0} (${1})",
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
		"BUTTON_TEXT": "เรียกดู..."
	})
	
);
define({
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
		   common: {
		      more: {
		         label: "يتبع",
		         tooltip: "‏تصرفات أخرى‏"
		       },
		       tags_more: "و ${0} أخرى",
		       ERROR_ALT: "خطأ",
		       PERSON_TITLE: "قم بفتح ملف بيانات تعريف ${user}.",
		       inactiveUser: "${user} (غير فعال)",
		       inactiveIndicator: "(غير فعال)",
		       like_error: "لا يمكن حفظ اعجابك. برجاء اعادة المحاولة فيما بعد.",
		       vote_error: "لا يمكن حفظ التصويت الخاصة بك. برجاء اعادة المحاولة فيما بعد."
		   },
		   generic: {
		      untitled: "(بدون عنوان)",
		      tags: "شارات التعليم:",
		      tags_more: "و ${0} أخرى",
		      likes: "يفضل",
		      comments: "التعقيبات",
		      titleTooltip: "التجول الى ${app}",
		      error: "لا يمكن استرجاع البيانات.",
		      timestamp: {
		         created: {
		            DAY: "تم تكوين ${EEEE} في ${time}",
		            MONTH: "التكوين في ${MMM} ${d}",
		            TODAY: "تم التكوين اليوم في ${time}",
		            YEAR: "التكوين في ${d} ${MMM}، ${YYYY}",
		            YESTERDAY: "تم التكوين أمس في ${time}",
		            TOMORROW: "التكوين في ${d} ${MMM}، ${YYYY}"
		         },
		         updated: {
		            DAY: "تم التحديث في ${EEEE} في ${time}",
		            MONTH: "التحديث في ${MMM} ${d}",
		            TODAY: "تم التحديث اليوم في ${time}",
		            YEAR: "التحديث في ${d}  ${MMM}، ${YYYY}",
		            YESTERDAY: "تم التحديث أمس في ${time}",
		            TOMORROW: "التحديث في ${d}  ${MMM}، ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "عام",
		         priv: "خاص"
		      },
		      action: {
		         created: "تكوين",
		         updated: "تحديث في"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "يمكنك استلام التحديثات الخاصة بالأشخاص الذين تقوم بمتابعتهم في الصفحة الرئيسية وفي ملخص البريد الالكتروني.",
		      profile_title: "قم بفتح ملف بيانات تعريف ${user}.",
		      profile_a11y: "تفعيل هذا الرابط سيؤدي الى فتح ملف بيانات تعريف ${user} في نافذة جديدة.",
		      error: "‏حدث خطأ.‏  ${again}.",
		      error_again: "برجاء اعادة المحاولة",
		      error_404: "طلب شبكة الاتصال لم يعد موجودا.",
		      warning: "تحذير",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "أنت محدد كجهة اتصال بشبكة اتصالات الآن.",
		            	follow: "أنت محدد كجهة اتصال بشبكة اتصالات الآن وتقوم بمتابعة ${user}."
		            },
		            ignore: {
		            	nofollow: "لقد قمت بتجاهل الدعوة.",
		            	follow: "لقد قمت بتجاهل طلب الدعوة وتقوم الآن بمتابعة ${user}."
		            }
		         },
		         error: {
		            accept: "كان هناك خطأ في قبول الطلب.",
		            ignore: "كان هناك خطأ في تجاهل الطلب."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} في ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "اليوم في ${time}",
		              YEAR: "${MMM} ${d}، ${YYYY}",
		              YESTERDAY: "أمس في ${time}",
		              TOMORROW: "${MMM} ${d}، ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "تفعيل هذا الرابط سيؤدي الى فتح ${name} في نافذة جديدة.",
		      tooltip: "قم بفتح ${name} في تطبيق الملفات",
		      profile_title: "قم بفتح ملف بيانات تعريف ${user}.",
		      profile_a11y: "تفعيل هذا الرابط سيؤدي الى فتح ملف بيانات تعريف ${user} في نافذة جديدة.",
		      download_tooltip: "تنزيل هذا الملف (${0})",
		      following: {
		         add: "متابعة ملف",
		         remove: "ايقاف المتابعة",
		         title: "تبديل ما اذا كنت ستقوم باستلام تحديثات عن هذا الملف"
		      },
		      share: {
		         label: "مشاركة",
		         title: "منح الآخرين امكانية التوصل الى هذا الملف"
		      },
		      timestamp: {
		         created: {
		            DAY: "تم تكوين ${EEEE} في ${time}",
		            MONTH: "التكوين في ${MMM} ${d}",
		            TODAY: "تم التكوين اليوم في ${time}",
		            YEAR: "التكوين في ${d} ${MMM}، ${YYYY}",
		            YESTERDAY: "تم التكوين أمس في ${time}",
		            TOMORROW: "التكوين في ${d} ${MMM}، ${YYYY}"
		         },
		         createdOther: {
		            DAY: "قام ${user} بالتكوين في ${EEEE} في ${time}",
		            MONTH: "تم تكوين ${user} في ${MMM} ${d}",
		            TODAY: "تم تكوين ${user} اليوم في ${time}",
		            YEAR: "قام ${user} بالتكوين في ${d} ${MMM}، ${YYYY}",
		            YESTERDAY: "تم تكوين ${user} أمس في ${time}",
		            TOMORROW: "قام ${user} بالتكوين في ${d} ${MMM}، ${YYYY}"
		         },
		         updated: {
		            DAY: "تم التحديث في ${EEEE} في ${time}",
		            MONTH: "التحديث في ${MMM} ${d}",
		            TODAY: "تم التحديث اليوم في ${time}",
		            YEAR: "التحديث في ${d}  ${MMM}، ${YYYY}",
		            YESTERDAY: "تم التحديث أمس في ${time}",
		            TOMORROW: "التحديث في ${d}  ${MMM}، ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "قام ${user} بالتحديث في ${EEEE} في ${time}",
		            MONTH: "تم تحديث ${user} في ${MMM} ${d}",
		            TODAY: "تم تحديث ${user} اليوم في ${time}",
		            YEAR: "قام ${user} بالتحديث في ${d} ${MMM}، ${YYYY}",
		            YESTERDAY: "تم تحديث ${user} الأمس في ${time}",
		            TOMORROW: "قام ${user} بالتحديث في ${d} ${MMM}، ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "التكوين: ${EEEE} في ${time}",
		            MONTH: "التكوين في: ${MMM} ${d}",
		            TODAY: "تم التكوين: اليوم في ${time}",
		            YEAR: "التكوين: ${d} ${MMM}، ${YYYY}",
		            YESTERDAY: "تم التكوين: الأمس في ${time}",
		            TOMORROW: "التكوين: ${d} ${MMM}، ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "التحديث: ${EEEE} في ${time}",
		            MONTH: "التحديث في: ${MMM} ${d}",
		            TODAY: "تم التحديث: اليوم في ${time}",
		            YEAR: "التحديث: ${d} ${MMM}، ${YYYY}",
		            YESTERDAY: "تم التحديث: الأمس في ${time}",
		            TOMORROW: "التحديث: ${d} ${MMM}، ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} بواسطة ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} بواسطة ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "تنزيل هذا الملف (${size})",
		      	 DOWNLOAD_ALT: "تنزيل"
		      },
		      PREVIEW: {
		         LINK: "معاينة",
		         TITLE: "معاينة هذا الملف في نافذة جديدة."
		      },
		      TAGS: "شارات التعليم:",
		      error: "‏حدث خطأ.‏  ${again}.",
		      error_again: "برجاء اعادة المحاولة",
		      error_404: "الملف لم يعد موجودا أو ليس لديك تصاريح كافية للتوصل اليه.",
		      error_403: "لا يتوافر لديك تصريح لمشاهدة هذا الملف. الملف ليس عام ولا يتم مشاركته معك.",
		      notifications: {
		         USER_SHARED: "${user} كتب:",
		         CHANGE_SUMMARY: "قام ${user} بادخال ملخص التغيير",
		         NO_CHANGE_SUMMARY: "لم يقم ${user} بادخال ملخص التغيير",
		         COMMENTED: "قام ${user} بالتعقيب"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "تم التخصيص بواسطتك",
		      checkedout_other: "مخصص بواسطة ${user}",
		      tooltip: "قم بفتح الملف ${name} في المكتبة",
		      draft_404_info: "تم حذف المسودة أو لم يعد يتم مشاركتها معك. ان النسخة التي تم نشرها هي الآن أحدث نسخة من هذا الملف.",
		      error_404: "تم حذف الملف أو لم يعد يتم مشاركته معك.",
		      error_403: "تم حذف الملف أو لم يعد يتم مشاركته معك.",
		      error_preview: "لم يعد يتم اتاحة الملف للمعاينة.",
		      draft_review_canceled: "تم الغاء المراجعة والمسودة لم يعد يتم مشاركتها معك. لم تعد المراجعة الخاصة بك مطلوبة.",
		      switch_ee: "مشاهدة مسودة",
		      switch_ee_tooltip: "مشاهدة أحدث مسودة لهذا الملف"
		   },
		   ecm_draft: {
		      tooltip: "قم بفتح المسودة ${name} في المكتبة",
		      community_owners: "ملاك المجتمع",
		      draft: "المسودة",
		      draft_tooltip: "مشاهدة مسودة",
		      draft_general_info: "لم تعد المسودة السابقة موجودة وهناك مسودة جديدة هي الآن أحدث نسخة.",
		      draft_review_404_general_info: "قام أحد المراجعين بالتصويت بالفعل. لم يعد مطلوبا منك مراجعة هذه المسودة.",
		      draft_review_404_request_info: "لم تعد المسودة السابقة موجودة وتم احالة أحدث مسودة للمراجعة. مطلوب المراجعة الخاصة بك.",
		      draft_review_404_require_info: "لم تعد المسودة السابقة موجودة وتم احالة أحدث مسودة للمراجعة. مطلوب المراجعة الخاصة بك.",
		      draft_review_request_info: "مطلوب المراجعة الخاصة بك.",
		      draft_review_require_info: "مطلوب المراجعة الخاصة بك.",
		      error_404: "تم حذف المسودة أو لم يعد يتم مشاركتها معك.",
		      error_403: "لا يمكنك مشاهدة هذه المسودة لأنه لا يتم مشاركتها معك.",
		      error_preview: "لم يعد يتم اتاحة المسودة للمعاينة.",
		      switch_ee: "مشاهدة النسخة التي تم نشرها",
		      switch_ee_tooltip: "مشاهدة النسخة التي تم نشرها لهذا الملف",
		      review: "المراجعة",
		      reviewers: "المراجعين",
		      reviwers_addtl: "مراجعين اضافيين",
		      in_review: "مسودة في المراجعة",
		      in_review_tooltip: "مشاهدة مسودة في المراجعة",
		      review_required_any: "يطلب ملاك المجتمع من مراجع واحد القيام بمراجعة هذه المسودة.",
		      review_required_all: "يطلب ملاك المجتمع من كل المراجعين القيام بمراجعة هذه المسودة.",
		      review_required_generic: "يطلب ملاك المجتمعات من هؤلاء المراجعين القيام بمراجعة هذه المسودة.",
		      review_additional_required: "مطلوب من كل المراجعين الذين تم اضافتهم بواسطة القائم باحالة المسودة أن يقوموا بمراجعة هذه المسودة.",
		      reivew_submitted_date: {
		         DAY: "قام ${user} باحالة المسودة للمراجعة على ${EEEE} في ${time}.",
		         MONTH: "قام ${user} باحالة المسودة للمراجعة على ${MMM} ${d}.",
		         TODAY: "قام ${user} باحالة المسودة للمراجعة اليوم في ${time}.",
		         YEAR: "قام ${user} باحالة المسودة للمراجعة على ${MMM} ${d}، ${YYYY}.",
		         YESTERDAY: "قام ${user} باحالة المسودة للمراجعة بالأمس في ${time}.",
		         TOMORROW: "قام ${user} باحالة المسودة للمراجعة على ${MMM} ${d}، ${YYYY}."
		      },
		      pending: "معلق",
		      pending_rejected: "لم يعد هناك حاجة الى المراجعة لأن المسودة تم رفضها",
		      approve: "‏موافقة‏",
		      approved: "موافقة",
		      approve_tooltip: "اعتماد هذه المسودة",
		      accept_success: "لقد قمت باعتماد هذه المسودة.",
		      accept_error: "كان هناك خطأ في اعتماد هذه المسودة. ‏أعد المحاولة مرة أخرى.‏",
		      accept_info: "لقد قمت باعتماد هذه المسودة.",
		      reject: "‏رفض‏",
		      rejected: "تم الرفض",
		      reject_tooltip: "قم برفض هذه المسودة",
		      reject_success: "لقد قمت برفض هذه المسودة.",
		      reject_error: "كان هناك خطأ في رفض المسودة. ‏أعد المحاولة مرة أخرى.‏",
		      reject_info: "لقد قمت برفض هذه المسودة."
		   },
		   authUser: {
		      error: "حدث خطأ عند استرجاع المستخدم الحالي.  ${again}.",
		      error_again: "برجاء اعادة المحاولة",
		      error_404: "لا يمكن ايجاد مستخدم موثق.",
		      error_403: "لا يتوافر لديك تصريح لاسترجاع معلومات المستخدم الخاصة بك."
		   },
		   forum: {
		      error: "‏حدث خطأ.‏  ${again}.",
		      error_again: "برجاء اعادة المحاولة",
		      error_404: "المنتدى لم يعد موجودا أو ليس لديك تصاريح كافية للتوصل اليه.",
		      error_403: "ليس لديك تصريح لمشاهدة هذا المنتدى. المنتدى ليس عاما ولا يتم مشاركته معك.",
		      readMore: "مشاهدة الموضوع بالكامل...",
		      readMore_tooltip: "فتح موضوع المنتدى ${name}.",
		      readMore_a11y: "تفعيل هذا الرابط سيؤدي الى فتح موضوع المنتدى ${name} في نافذة جديدة.",
		      QUESTION_ANSWERED: "تم الاجابة على هذا السؤال.",
		      QUESTION_NOT_ANSWERED: "لم يتم الاجابة على هذا السؤال بعد.",
		      attachments: "${count} من الملحقات",
		      attachments_one: "${count} من الملحقات"
		   },
		   blog: {
		      error: "‏حدث خطأ.‏  ${again}.",
		      error_again: "برجاء اعادة المحاولة",
		      error_404: "المدونة لم تعد موجودة أو ليس لديك تصاريح كافية للتوصل اليها.",
		      error_403: "لا يتوافر لديك تصريح لمشاهدة هذه المدونة. المدونة غير عامة ولا يتم مشاركتها معك.",
		      readMore: " قراءة المزيد ...",
		      readMore_tooltip: "فتح ادخال المدونة ${name}.",
		      readMore_a11y: "تفعيل هذا الرابط سيؤدي الى فتح ادخال المدونة ${name} في نافذة جديدة.",
		      graduated: "محدد التدرج",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>تصويت</a>",
		  					TOOLTIP: 	"تصويت لهذا"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>تم التصويت</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>تصويت</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>تراجع</a>",
		  					TOOLTIP: 	"ازالة تصويتك من هذا"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"لم يقم أي شخص بالتصويت لهذا"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"صوت شخص واحد لهذا"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"صوت ${recommendCount} لهذا"
		  				}
		  			},
		  			LOADING: "تحميل...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "تم التصويت"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "لا يمكننا حفظ التصويت الخاص بك، لأنك قمت بالوصول الى حد التصويت الخاص بك أو لم تعد الفكرة متاحة لك.",
		      readMore_tooltip: "فتح الفكرة ${name}.",
		      readMore_a11y: "تفعيل هذا الرابط سيؤدي الى فتح الفكرة ${name} في نافذة جديدة."
		   },
		   size: {
		      B: "${0} بايت",
		      KB: "${0} كيلوبايت",
		      MB: "${0} ميجابايت",
		      GB: "${0} جيجابايت"
		   },
		   REPLIES: {
		      ARIA_LABEL: "ردود",
		      THIS_ARIA_LABEL: "هذا الرد",
		      THIS_TAB_TITLE: "هذا الرد",
		      TAB_TITLE: "ردود (${0})",
		      REPLY_TO_REPLY: "بالرد على ${thisReply}",
		      REPLY_TO_TOPIC: "بالرد على ${thisTopic}",
		      THIS_TOPIC: "هذا الموضوع",
		      THIS_REPLY: "هذا الرد",
		      NAVIGATE_TO_REPLY: "الانتقال الى الرد الرئيسي",
		      NAVIGATE_TO_TOPIC: "الانتقال الى الموضوع الرئيسي",
		      ADD_COMMENT: "الرد على هذا الموضوع",
		      ADD_COMMENT_TOOLTIP: "الرد على موضوع المنتدى هذا",
		      SHOWING_RECENT_REPLIES: "عرض أحدث ${0} من الردود",
		      PREV_COMMENTS: "عرض مزيد من الردود",
		      PLACEHOLDER_TXT: "الرد على هذا الموضوع",
		      EMPTY: "لا توجد ردود.",
		      TRIM_LONG_COMMENT: "تقصير الرد؟",
		      WARN_LONG_COMMENT: "الرد طويل جدا.  ${shorten}",
		      ERROR: "حدث خطأ أثناء استرجاع الردود. ${again}",
		      ERROR_CREATE: "لا يمكن حفظ الرد الخاص بك.  أعد المحاولة فيما بعد.",
		      ERROR_CREATE_NOT_FOUND: "لا يمكن حفظ الرد الخاص بك لأنه تم حذف الموضوع أو لم يعد مرئيا لك.",
		      ERROR_CREATE_ACCESS_DENIED: "لا يمكن حفظ الرد الخاص بك لأنه تم حذف الموضوع أو لم يعد مرئيا لك.",
		      ERROR_CREATE_TIMEOUT: "لم يمكن حفظ الرد الخاص بك لأنه لم يمكن الاتصال بوحدة الخدمة.  اضغط 'حفظ' لاعادة المحاولة مرة أخرى.",
		      ERROR_CREATE_CANCEL: "لم يمكن حفظ التعقيب الخاص بك لأنه تم الغاء الطلب.  اضغط 'حفظ' لاعادة المحاولة مرة أخرى.",
		      ERROR_CREATE_NOT_LOGGED_IN: "يجب تسجيل الدخول لتكوين صفحة الرد هذه.  اضغط 'حفظ' وسيتم مطالبتك بتسجيل الدخول.",
		      ERROR_NO_CONTENT: "ادخل الرد الخاص بك ثم اضغط ارسال.  اذا كنت لم تعد تريد ترك تعقيب اضغط 'الغاء.'",
		      ERROR_UNAUTHORIZED: "لا يمكن حفظ الرد الخاص بك لأنه لا يتوافر لديك الصلاحية لترك رد.",
		      COMMENT_DELETED: {
		         DAY: "تم حذف الرد من خلال ${user} في ${EEEE} في ${time}",
		         MONTH: "تم حذف الرد بواسطة ${user} في ${MMM} ${d}",
		         TODAY: "تم حذف الرد بواسطة ${user} اليوم في ${time}",
		         YEAR: "تم حذف الرد من خلال ${user} في ${d} ${MMM}،  ${YYYY}",
		         YESTERDAY: "تم حذف الرد بواسطة ${user} الأمس في ${time}",
		         TOMORROW: "تم حذف الرد من خلال ${user} في ${d} ${MMM}،  ${YYYY}"
		      },
		      REASON_FOR_DELETION: "سبب الحذف: ${reason}",
		      REPLY_TITLE: "رد: ${0}",
		      SHOW_FULL_REPLY: "مشاهدة الرد الكامل",
		      SHOW_FULL_REPLY_TOOLTIP: "الانتقال الى الرد الأصلي في موضوع المنتدى",
		      REPLY_ACTION: "رد",
		      REPLY_ACTION_TOOLTIP: "الرد على هذا الادخال",
		      MODERATION_PENDING: "هذا الرد يعد مراجعة مؤجلة.",
		      MODERATION_QUARANTINED: "تم اعتماد الارسال بواسطة المنسق.",
		      MODERATION_REMOVED: {
		         DAY: "تم ازالة هذا الرد بواسطة ${user} في ${EEEE} في ${time}.",
		         MONTH: "تم ازالة هذا الرد بواسطة ${user} في ${MMM} ${d}.",
		         TODAY: "تم ازالة هذا الرد بواسطة ${user} اليوم في ${time}.",
		         YEAR: "تم ازالة هذا الرد بواسطة ${user} في ${MMM} ${d}، ${YYYY}.",
		         YESTERDAY: "تم ازالة هذا الرد بواسطة ${user} أمس في ${time}.",
		         TOMORROW: "تم ازالة هذا الرد بواسطة ${user} في ${MMM} ${d}، ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "تم رفض هذا الرد بواسطة ${user} في ${EEEE} في ${time}.",
		         MONTH: "تم رفض هذا الرد بواسطة ${user} في ${MMM} ${d}.",
		         TODAY: "تم رفض هذا الرد بواسطة ${user} اليوم في ${time}.",
		         YEAR: "تم رفض هذا الرد بواسطة ${user} في ${MMM} ${d}، ${YYYY}.",
		         YESTERDAY: "تم رفض هذا الرد بواسطة ${user} أمس في ${time}.",
		         TOMORROW: "تم رفض هذا الرد بواسطة ${user} في ${MMM} ${d}، ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "تم احالة الرد الخاص بك للمراجعة وسيكون متاحا عند الاعتماد."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "التعقيبات",
		      PLACEHOLDER_TXT: "اضافة تعقيب",
		      TAB_TITLE: "التعقيبات (${0})",
		      ACTION_NOT_SUPPORTED: "تصرف لا يتم دعمه",
		      ADD_COMMENT: "اضافة تعقيب",
		      ADD_COMMENT_TOOLTIP: "اضافة تعقيب الى هذا البند",
		      CANCEL: "الغاء",
		      COMMENT_COUNT_ONE: "${0} تعقيب",
		      COMMENT_COUNT_MANY: "${0} تعقيبات",
		      COMMENT_LABEL: "التعقيب:",
		      DELETE: "‏حذف ‏",
		      DELETE_TOOLTIP: "حذف تعقيب",
		      DELETEREASON: "سبب حذف هذا التعقيب:",
		      DIALOG_TITLE: "تقصير التعقيب",
		      TOOLTIP: "تقصير التعقيب",
		      NAME: "تقصير التعقيب",
		      EDIT: "تحرير",
		      EDIT_TOOLTIP: "تحرير تعقيب",
		      ERROR_CREATE: "لا يمكن حفظ التعقيب الخاص بك.  أعد المحاولة فيما بعد.",
		      ERROR_CREATE_NOT_FOUND: "لا يمكن حفظ التعقيب الخاص بك لأنه تم حذف البند أو لم يعد مرئيا بالنسبة لك.",
		      ERROR_CREATE_ACCESS_DENIED: "لا يمكن حفظ التعقيب الخاص بك لأنه تم حذف البند أو لم يعد مرئيا بالنسبة لك.",
		      ERROR_CREATE_TIMEOUT: "لم يتم حفظ التعقيب الخاص بك لأنه لم يمكن الاتصال بوحدة الخدمة.  اضغط 'ارسال' لاعادة المحاولة مرة أخرى.",
		      ERROR_CREATE_CANCEL: "لم يتم حفظ التعقيب الخاص بك لأنه تم الغاء الطلب.  اضغط 'ارسال' لاعادة المحاولة مرة أخرى.",
		      ERROR_CREATE_NOT_LOGGED_IN: "يجب أن تقوم بتسجيل الدخول لتكوين هذا التعقيب.  اضغط  'ارسال' وسيتم مطالبتك بتسجيل الدخول.",
		      ERROR_DELETE: "لا يمكن حذف التعقيب الخاص بك.  أعد المحاولة فيما بعد.",
		      ERROR_DELETE_TIMEOUT: "لم يتم حذف التعقيب الخاص بك لأنه لم يمكن الاتصال بوحدة الخدمة.  اضغط 'حذف' لاعادة المحاولة مرة أخرى.",
		      ERROR_DELETE_NOT_FOUND: "لا يمكن حذف التعقيب الخاص بك لأنه تم حذف التعقيب أو البند أو لم يعد مرئيا لك.",
		      ERROR_DELETE_ACCESS_DENIED: "لا يمكن حذف التعقيب الخاص بك لأنه تم حذف البند أو لم يعد مرئيا بالنسبة لك.",
		      ERROR_DELETE_CANCEL: "لم يتم حذف التعقيب الخاص بك لأنه تم الغاء الطلب.  اضغط 'حذف' لاعادة المحاولة مرة أخرى.",
		      ERROR_DELETE_NOT_LOGGED_IN: "يجب تسجيل الدخول لحذف هذا التعقيب.  اضغط  'حذف' وسيتم مطالبتك بتسجيل الدخول.",
		      ERROR_EDIT: "لم يتم تحديث التعقيب الخاص بك.  أعد المحاولة فيما بعد.",
		      ERROR_EDIT_ACCESS_DENIED: "لا يمكن تحديث التعقيب الخاص بك لأنه تم حذف البند أو لم يعد مرئيا بالنسبة لك.",
		      ERROR_EDIT_NOT_FOUND: "لا يمكن تحديث التعقيب الخاص بك لأنه تم حذف البند أو لم يعد مرئيا بالنسبة لك.",
		      ERROR_EDIT_TIMEOUT: "لم يتم تحديث التعقيب الخاص بك لأنه لم يمكن الاتصال بوحدة الخدمة.  اضغط 'ارسال' لاعادة المحاولة مرة أخرى.",
		      ERROR_EDIT_CANCEL: "لم يتم تحرير التعقيب الخاص بك لأنه تم الغاء الطلب.  اضغط 'ارسال' لاعادة المحاولة مرة أخرى.",
		      ERROR_EDIT_NOT_LOGGED_IN: "يجب أن تقوم بتسجيل الدخول لتحرير هذا التعقيب.  اضغط  'ارسال' وسيتم مطالبتك بتسجيل الدخول.",
		      ERROR_NO_CONTENT: "ادخل التعقيب الخاص بك ثم اضغط 'ارسال'.  اذا كنت لم تعد تريد ترك تعقيب اضغط 'الغاء.'",
		      ERROR_NO_CONTENT_EDIT: "ادخل التعقيب الخاص بك ثم اضغط 'ارسال'.  اذا كنت لم تعد تريد تحرير التعقيب الخاص بك اضغط 'الغاء.'",
		      ERROR_UNAUTHORIZED: "لا يمكن حفظ التعقيب الخاص بك لأنه لا يتوافر لديك الصلاحية لترك تعقيب.",
		      ERROR_GENERAL: "حدث خطأ.",
		      OK: "‏حسنا‏",
		      YES: "نعم",
		      TRIM_LONG_COMMENT: "هل تريد اختصار التعقيب؟",
		      WARN_LONG_COMMENT: "التعقيب طويل جدا.  ${shorten}",
		      LINK: "رابط",
		      SAVE: "‏حفظ‏",
		      POST: "ارسال",
		      SHOWMORE: "قراءة المزيد...",
		      VIEW_COMMENTS_FILE: "مشاهدة التعقيبات بهذا الملف",
		      SUBSCRIBE_TO_COMMENTS: "الاشتراك في هذه التعقيبات",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "متابعة التغييرات بهذه التعقيبات من خلال وحدة قراءة المعلومات المسترجعة الخاصة بك",
		      PROFILE_TITLE: "قم بفتح ملف بيانات تعريف ${user}.",
		      PROFILE_A11Y: "تفعيل هذا الرابط سيؤدي الى فتح ملف بيانات تعريف ${user} في نافذة جديدة.",
		      MODERATION_PENDING: "هذا التعقيب مؤجل حاليا للمراجعة.",
		      MODERATION_REMOVED: {
		         DAY: "هذا التعقيب تم ازالته بواسطة ${user} في ${EEEE} في ${time}.",
		         MONTH: "تم ازالة هذا التعقيب بواسطة ${user} في ${MMM} ${d}",
		         TODAY: "هذا التعقيب تم ازالته بواسطة ${user} اليوم في ${time}.",
		         YEAR: "تم تحرير هذا الملف بواسطة ${user} في ${d} ${MMM}، ${YYYY}.",
		         YESTERDAY: "هذا التعقيب تم ازالته بواسطة ${user} الأمس في ${time}.",
		         TOMORROW: "تم تحرير هذا الملف بواسطة ${user} في ${d} ${MMM}، ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "هذا التعقيب تم رفضه بواسطة ${user} في ${EEEE} في ${time}.",
		         MONTH: "تم رفض هذا التعقيب بواسطة ${user} في ${MMM} ${d}.",
		         TODAY: "هذا التعقيب تم رفضه بواسطة ${user} اليوم في ${time}.",
		         YEAR: "هذا التعقيب تم رفضه بواسطة ${user} في ${d} ${MMM}، ${YYYY}.",
		         YESTERDAY: "هذا التعقيب تم رفضه بواسطة ${user} الأمس في ${time}.",
		         TOMORROW: "هذا التعقيب تم رفضه بواسطة ${user} في ${d} ${MMM}، ${YYYY}."
		      },
		      PREV_COMMENTS: "عرض التعقيبات السابقة",
		      EMPTY: "لا توجد أية تعقيبات.",
		      ERROR_ALT: "خطأ",
		      ERROR: "حدث خطأ أثناء استرجاع التعقيبات. ${again}",
		      ERROR_ADDTL: "حدث خطأ أثناء استرجاع التعقيبات الاضافية. ${again}",
		      ERROR_AGAIN: "‏أعد المحاولة مرة أخرى.‏",
		      ERROR_AGAIN_TITLE: "أعد محاولة الطلب للمزيد من التعقيبات.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} في ${time} (النسخة ${version})",
		         MONTH: "${user} ${d} ${MMM}  (النسخة ${version})",
		         TODAY: "${user} اليوم في ${time} (النسخة ${version})",
		         YEAR: "${user} ${d} ${MMM}، ${YYYY} (النسخة ${version})",
		         YESTERDAY: "${user} الأمس في ${time} (النسخة ${version})",
		         TOMORROW: "${user} ${d} ${MMM}، ${YYYY} (النسخة ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} في ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} اليوم في ${time}",
		         YEAR: "${user} ${MMM} ${d}، ${YYYY}",
		         YESTERDAY: "${user} الأمس في ${time}",
		         TOMORROW: "${user} ${MMM} ${d}، ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} في ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "اليوم في ${time}",
		         YEAR: "${MMM} ${d}، ${YYYY}",
		         YESTERDAY: "أمس في ${time}",
		         TOMORROW: "${MMM} ${d}، ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "تم حذف التعقيب بواسطة ${user} في ${EEEE} في ${time}",
		         MONTH: "تم حذف التعقيب بواسطة ${user} في ${MMM} ${d}",
		         TODAY: "تم حذف التعقيب بواسطة ${user} اليوم في ${time}",
		         YEAR: "تم حذف التعقيب بواسطة ${user} في ${d} ${MMM} في ${YYYY}",
		         YESTERDAY: "تم حذف التعقيب بواسطة ${user} أمس في ${time}",
		         TOMORROW: "تم حذف التعقيب بواسطة ${user} في ${d} ${MMM} في ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "قام ${user} بتحرير ${EEEE} في ${time} (النسخة ${version})",
		         MONTH: "قام ${user} بتحرير ${MMM} ${d} (النسخة ${version})",
		         TODAY: "قام ${user} بالتحرير اليوم في ${time} (النسخة ${version})",
		         YEAR: "قام ${user} بالتحرير ${d} ${MMM}، ${YYYY} (النسخة ${version})",
		         YESTERDAY: "قام ${user} بالتحرير الأمس في ${time} (النسخة ${version})",
		         TOMORROW: "قام ${user} بالتحرير ${d} ${MMM}، ${YYYY} (النسخة ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "قام ${user} بتحرير ${EEEE} في ${time}",
		         MONTH: "قام ${user} بتحرير ${MMM} ${d}",
		         TODAY: "قام ${user} بالتحرير اليوم في ${time}",
		         YEAR: "قام ${user} بالتحرير في ${d} ${MMM}، ${YYYY}",
		         YESTERDAY: "قام ${user} بالتحرير الأمس في ${time}",
		         TOMORROW: "قام ${user} بالتحرير في ${d} ${MMM}، ${YYYY}"
		      },
		      DELETE_CONFIRM: "هل تريد حذف هذا التعقيب بالفعل؟",
		      FLAG_ITEM: {
		         BUSY: "‏جاري الحفظ...‏",
		         CANCEL: "الغاء",
		         ACTION: "تعليم بشارة عدم الملائمة",
		         DESCRIPTION_LABEL: "منح سبب لاعطاء شارة لهذا البند (اختياري)",
		         EDITERROR: "لم يتم تحرير بيانات تعريف الملف بسبب حدوث خطأ",
		         OK: "‏حفظ‏",
		         ERROR_SAVING: "كان هناك خطأ في تشغيل الطلب. أعد المحاولة فيما بعد.",
		         SUCCESS_SAVING: "تمت احالة شارة التعليم الخاصة بك. سيقوم المنسق بالتحقيق قريبا.",
		         TITLE: "اعطاء شارة لهذا البند كغير ملائم",
		         COMMENT: {
		            TITLE: "تعليم هذا التعقيب بشارة عدم الملائمة",
		            A11Y: "هذا المفتاح يفتح مربع حوار يسمح للمستخدم لاعطاء شارة لهذا التعقيب كغير ملائم."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "الغاء",
		      DIALOG_TITLE: "حذف تعقيب",
		      NAME: "حذف تعقيب",
		      OK: "‏حسنا‏",
		      TOOLTIP: "حذف تعقيب"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "الغاء",
		      CONFIRM: "سيؤدي الاختصار الى ازالة النص الزائد عن حد التعقيب.  اضغط 'حسنا' للاختصار أو 'الغاء' لتحرير التعقيب بنفسك.",
		      DIALOG_TITLE: "تقصير التعقيب",
		      NAME: "تقصير التعقيب",
		      OK: "‏حسنا‏",
		      TOOLTIP: "تقصير التعقيب"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "تأكيد الاحالة",
		      CONFIRM: "التعقيب الخاص بك  تمت احالته للمراجعة وستكون متاحة عند الاعتماد.",
		      OK: "‏حسنا‏"
		   },
		   DATE: {
		      AM: "ص",
		      FULL: "${EEEE}، ${date_long} ${time_long}",
		      PM: "مساءا",
		      TODAY: "اليوم",
		      TODAY_U: "اليوم الحالي",
		      YESTERDAY: "أمس",
		      YESTERDAY_U: "أمس",
		      ADDED: { DAY: "اضافة ${EEee} في ${time}",
		         FULL: "${EEEE}، ${date_long} ${time_long}",
		         MONTH: "تم الاضافة في ${date_long}",
		         TODAY: "تمت الاضافة اليوم في ${time}",
		         YEAR: "تم الاضافة في ${date_long}",
		         YESTERDAY: "تمت الاضافة أمس في ${time}"
		      },
		      LAST_UPDATED: { DAY: "آخر تحديث ${EEee} في ${time}",
		         FULL: "${EEEE}، ${date_long} ${time_long}",
		         MONTH: "آخر تحديث ${date_long}",
		         TODAY: "آخر تحديث اليوم في ${time}",
		         YEAR: "آخر تحديث ${date_long}",
		         YESTERDAY: "آخر تحديث بالأمس في ${time}"
		      },
		      MONTHS_ABBR: { 0: "يناير",
		         10: "نوفمبر",
		         11: "ديسمبر",
		         1: "فبراير",
		         2: "مارس",
		         3: "ابريل",
		         4: "مايو",
		         5: "يونيو",
		         6: "يوليو",
		         7: "أغسطس",
		         8: "سبتمبر",
		         9: "أكتوبر"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}، ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "اليوم الحالي",
		         YEAR: "${date_short}",
		         YESTERDAY: "أمس",
		         TOMORROW: "غدا"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} في ${time}",
		         FULL: "${EEEE}، ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "اليوم في ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "أمس في ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} في ${time}",
		         FULL: "${EEEE}، ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "اليوم في ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "أمس في ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} في ${time}",
		         FULL: "${EEEE}، ${date_long} ${time_long}",
		         MONTH: "${date_short} في ${time}",
		         TODAY: "${date_short} في ${time}",
		         YEAR: "${date_short} في ${time}",
		         YESTERDAY: "${date_short} في ${time}",
		         TOMORROW: "${date_short} في ${time}"
		      },
		      DATE_ONLY: { DAY: "${date_short}",
		         FULL: "${EEEE}، ${date_long}",
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
		      UPDATED: { DAY: "تم التحديث في ${EEee} في ${time}",
		         FULL: "${EEEE}، ${date_long} ${time_long}",
		         MONTH: "تم التحديث في ${date_long}",
		         TODAY: "تم التحديث اليوم في ${time}",
		         YEAR: "تم التحديث في ${date_long}",
		         YESTERDAY: "تم التحديث أمس في ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "لا يمكن تحميل معلومات النسخة.",
		      ERROR_REQUEST_CANCELLED: "تم الغاء الطلب.",
		      ERROR_REQUEST_TIMEOUT: "لم يمكن الاتصال بوحدة الخدمة.",
		      ERROR_REQUEST_UNKNOWN: "حدث خطأ غير معروف.",
		      LOADING: "تحميل ..",
		      NO_VERSIONS: "لا توجد نسخ",
		      INFO: "تم تكوين النسخة ${0} ${1} بواسطة ",
		      VERSION_NUMBER: "النسخة ${0}",
		      DELETED: "‏تم الحذف‏",
		      DELETE_ALL: "حذف كل النسخ قبل النسخة",
		      DELETE_VERSION_SINGLE: "حذف النسخة ${0}",
		      DELETEERROR: "لم يتم حذف النسخة بسبب حدوث خطأ.",
		      CREATE_VERSION: "تكوين نسخة جديدة",
		      CREATE_VERSION_TOOLTIP: "تكوين نسخة من هذا الملف",
		      REVERT_VERSION: "استعادة النسخة ${0}",
		      REVERT_DESCRIPTION: "استعادة من النسخة ${0}",
		      PREVIOUS: "السابق",
		      PREVIOUS_TOOLTIP: "صفحة سابقة",
		      ELLIPSIS: ".‏..",
		      NEXT: "التالي",
		      NEXT_TOOLTIP: "صفحة تالية",
		      COUNT: "${0} - ${1} من ${2}",
		      COUNT_SHORT: "‏${0}‏ - ‏${1}‏",
		      PAGE: "الصفحة",
		      SHOW: "عرض",
		      ITEMS_PER_PAGE: " البنود بكل صفحة.",
		      DATE: {
		        AM: "ص",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "اليوم في ${time}",
		            YESTERDAY: "أمس في ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} في ${time}",
		            YEAR: "${date_short} في ${time}",
		            FULL: "${EEEE}، ${date_long} ${time_long}",
		            MONTH: "${date_short} في ${time}",
		            TODAY: "اليوم في ${time}",
		            YESTERDAY: "أمس في ${time}"
		        },
		        UPDATED: { DAY: "تم التحديث في ${EEee} في ${time}",
		            YEAR: "التحديث في ${date_short}",
		            FULL: "${EEEE}، ${date_long} ${time_long}",
		            MONTH: "التحديث في ${date_short}",
		            TODAY: "تم التحديث اليوم في ${time}",
		            YESTERDAY: "تم التحديث أمس في ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "حذف النسخة ${0}",
		         DOWNLOAD: "تنزيل",
		         DOWNLOAD_TOOLTIP: "تنزيل هذه النسخة (${0})",
		         VIEW: "مشاهدة",
		         VIEW_TOOLTIP: "مشاهدة النسخة ${0}",
		         REVERT: {
		            A11Y: "هذا المفتاح يفتح مربع حوار يسمح للمستخدم لتأكيد استعادة ملف من نسخة سابقة. سينتج عن تأكيد هذا التصرف أن يتم تجديد محتويات الصفحة.",
		            FULL: "‏استعادة‏",
		            WIDGET: "استعادة هذه النسخة"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "لا يمكن حذف النسخة لأنه تم حذفها بالفعل أو لأنها لم تعد مرئية بالنسبة لك.",
		         ERROR_ACCESS_DENIED: "لا يمكن حذف النسخة لأنك لست المحرر.",
		         ERROR_TIMEOUT: "لم يتم حذف النسخة لأنه لا يمكن الاتصال بوحدة الخدمة.  اضغط 'حذف' مرة أخرى لمحاولة الطلب مرة أخرى.",
		         ERROR_CANCEL: "لم يتم حذف النسخة لأنه تم الغاء الطلب.  اضغط 'حذف' مرة أخرى لمحاولة الطلب مرة أخرى.",
		         ERROR_NOT_LOGGED_IN: "يجب أن تكون متصلا لحذف هذه النسخة.  اضغط  'حذف' وسيتم مطالبتك بتسجيل الدخول.",
		         GENERIC_ERROR: "لا يمكن حذف النسخة بسبب حدوث خطأ غير معروف.  اضغط 'حذف' مرة أخرى لمحاولة الطلب مرة أخرى.",
		         FULL: "‏حذف ‏",
		         A11Y: "هذا المفتاح يفتح مربع حوار يسمح للمستخدم لتأكيد حذف هذه النسخة. سينتج عن تأكيد هذا التصرف أن يتم تجديد محتويات الصفحة."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "لم يتم استعادة النسخة لأنه تم حذفها أو لم تعد مرئية بالنسبة لك.",
		         ERROR_ACCESS_DENIED: "لا يمكن استعادة النسخة لأنك لست المحرر.",
		         ERROR_NAME_EXISTS: "لم يتم استعادة النسخة لوجود ملف آخر بنفس الاسم.",
		         ERROR_TIMEOUT: "لم يتم استعاد النسخة لأنه لم يمكن الاتصال بوحدة الخدمة.  اضغط 'استعادة' لمحاولة الطلب مرة أخرى.",
		         ERROR_CANCEL: "لم يتم استعادة النسخة لأنه تم الغاء الطلب.  اضغط 'استعادة' لمحاولة الطلب مرة أخرى.",
		         ERROR_QUOTA_VIOLATION: "لا يمكن استعادة النسخة بسبب قيود المساحة.",
		         ERROR_MAX_CONTENT_SIZE: "لم يتم استعادة النسخة لأنها أكبر من الحد الأقصى المسموح به لحجم الملف ${0}",
		         GENERIC_ERROR: "لم يتم استعادة النسخة بسبب حدوث خطأ غير معروف.  اضغط 'استعادة' لمحاولة الطلب مرة أخرى."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "مشاهدة من قام بالتنزيل...",
		      PREVIOUS: "السابق",
		      PREVIOUS_TOOLTIP: "صفحة سابقة",
		      ELLIPSIS: ".‏..",
		      NEXT: "التالي",
		      NEXT_TOOLTIP: "صفحة تالية",
		      COUNT: "${0} - ${1} من ${2}",
		      COUNT_SHORT: "‏${0}‏ - ‏${1}‏",
		      PAGE: "صفحة",
		      SHOW: "عرض",
		      ITEMS_PER_PAGE: " البنود بكل صفحة.",
		      VERSION: {
		         DAY: "النسخة ${version} في ${date}",
		         MONTH: "النسخة ${version} في ${date}",
		         TODAY: "النسخة ${version} في ${time}",
		         YEAR: "النسخة ${version} في ${date}",
		         YESTERDAY: "النسخة ${version} بالامس"
		      },
		      FILE: {
		         V_LATEST: "لقد قمت بتنزيل آخر نسخة من هذا الملف",
		         V_OLDER: "آخر نسخة تم تنزيلها ${0} من هذا الملف",
		         LOADING: "تحميل...",
		         EMPTY: "المستخدمين غير المعروفين فقط",
		         ERROR: "لا يمكن تنزيل معلومات التنزيل"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "خطأ",
		      ERROR_ALT_TEXT: "خطأ:",
		      ERROR_MSG_GENERIC: "حدث شيء غير صحيح الاحالة.  رجاء اعادة المحاولة.",
		      ERROR_MSG_NOT_AVAILABLE: "تم حذف هذا البند أو لم يعد متاحا.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "محتويات هذا البند غير متاحة.",
		      ERROR_MSG_NO_ACCESS: "لم يعد لديك امكانية توصل لهذا البند.",
		      LOADING: "تحميل...",
		      TITLE_SU: "قام ${author} بارسال رسالة.",
		      TITLE_NI: "قام ${author} بدعوتك للانضمام الى شبكة الاتصال الخاصة بهم.",
		      AUTHOR_TITLE: "مشاهدة ملف بيانات التعريف الى ${author}",
		      OPEN_LINK: "فتح ${title}",
		      CONFIRM_CLOSE_TITLE: "تأكيد",
		      CONFIRM_CLOSE_MESSAGE: "هل تريد بالفعل استبعاد التغييرات الخاصة بك؟ اضغط حسنا للاستمرار أو الغاء للعودة",
		      OK: "‏حسنا‏",
		      CANCEL: "الغاء"
		   },
		   MESSAGE: {
		      SUCCESS: "التأكيد",
		      ERROR: "خطأ",
		      ERROR_ALT_TEXT: "خطأ:",
		      INFO: "معلومات",
		      WARNING: "تحذير",
		      DISMISS: "اخفاء هذه الرسالة",
		      MORE_DETAILS: "مزيد من التفاصيل",
		      HIDE_DETAILS: "اخفاء التفاصيل"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "التكوين: ${EEEE} في ${time}",
		           MONTH: "التكوين في: ${MMM} ${d}",
		           TODAY: "تم التكوين: اليوم في ${time}",
		           YEAR: "التكوين: ${d} ${MMM}، ${YYYY}",
		           YESTERDAY: "تم التكوين: الأمس في ${time}",
		           TOMORROW: "التكوين: ${d} ${MMM}، ${YYYY}"
		       },
		      error: "‏حدث خطأ.‏  ${again}.",
		      error_again: "برجاء اعادة المحاولة",
		      error_404: "لم يعد هناك تحديث في الحالة.",
		      notifications: {
		         STATUS_UPDATE: "قام ${user} بارسال رسالة",
		         USER_BOARD_POST: "قام ${user} بالكتابة على لوحتك",
		         POST_COMMENT: "${user} كتب:"
		      }
		   },
		   login: {
		      error: "اسم المستخدم و/أو كلمة السرية الخاصة بك لا تطابق أي من الحسابات الموجودة. رجاء اعادة المحاولة.",
		      logIn: "تسجيل الدخول",
		      password: "كلمة السرية:",
		      user: "اسم المستخدم:",
		      welcome: "تسجيل الدخول مع HCL Connections"
		   },
		   repost: {
		      name: "اعادة الارسال",
		      title: "اعادة ارسال هذا التحديث الى المتابعين أو المتصلين بي",
		      msg_success: "تم استعادة التحديث للمتابعين لك.",
		      msg_generic: "حدث شيء غير صحيح الاحالة.  رجاء اعادة المحاولة."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "اضافة",
		      ADD_TXT: "اضافة أشخاص أو مجتمعات كقارئين",
		      SHOW_MORE: "عرض المزيد...",
		      READER_IF_PUBLIC: "كل شخص (عام)",
		      READER_IF_PUBLIC_TOOLTIP: "هذا الملف عام ومرئي لكل شخص",
		      EMPTY_READERS: "‏لا شيء‏",
		      READERS_LABEL: "القارئين:\u00a0",
		      EDITORS_LABEL: "المحررين:\u00a0",
		      OWNER_LABEL: "المالكين:\u00a0",
		      ERROR: "لا يمكن تحميل معلومات المشاركة",
		      ERROR_NOT_FOUND: "تم حذف أو نقل الملف الذي قمت بطلبه. اذا قام أحد الأشخاص بارسال هذا الرابط لك، تحقق من صحته.",
		      ERROR_ACCESS_DENIED: "لا يتوافر لديك تصريح لمشاهدة هذا الملف.  الملف ليس عام ولا يتم مشاركته معك.",
		      SHARE: "مشاركة",
		      CANCEL: "الغاء",
		      SHARE_WITH: "مشاركة مع:",
		      PERSON: "شخص",
		      COMMUNITY: "مجتمع",
		      PLACEHOLDER: "اسم الشخص أو البريد الالكتروني...",
		      MESSAGE: "رسالة:",
		      MESSAGE_TXT: "اضافة رسالة اختيارية",
		      REMOVE_ITEM_ALT: "ازالة ${0}",
		      NO_MEMBERS: "‏لا شيء‏",
		      A11Y_READER_ADDED: "تم تحديد ${0} كقارئ",
		      A11Y_READER_REMOVED: "ازالة ${0} كقارىء",
		      SELF_REFERENCE_ERROR: "لا يمكنك المشاركة مع نفسك.",
		      OWNER_REFERENCE_ERROR: "لا يمكنك المشاركة مع مالك الملف.",
		      SHARE_COMMUNITY_WARN: "المشاركة مع المجتمع العام '${0}' سيجعل هذا الملف عاما.",
		      SELECT_USER_ERROR: "يجب تحديد مجتمع أو شخص واحد على الأقل للمشاركة معه",
		      WARN_LONG_MESSAGE: "الرسالة طويلة جدا.",
		      TRIM_LONG_MESSAGE: "هل تريد اختصار الرسالة؟",
		      ERROR_SHARING: "لم يمكن مشاركة الملف.  برجاء اعادة المحاولة فيما بعد.",
		      INFO_SUCCESS: "تم مشاركة الملف بنجاح.",
		      MAX_SHARES_ERROR: "تم تعدي الحد الأقصى لعدد المشاركات.",
		      NOT_LOGGED_IN_ERROR: "لم يتم مشاركة الملف لأنك لم تقم بتسجيل الدخول.  اضغط 'مشاركة' لمشاركة الملف.",
		      TIMEOUT_ERROR: "لم يتم مشاركة الملف لأنه لم يمكن الاتصال بوحدة الخدمة.  اضغط 'مشاركة' لاعادة المحاولة مرة أخرى.",
		      CANCEL_ERROR: "لم يتم مشاركة الملف لأنه تم الغاء الطلب.  اضغط 'مشاركة' لاعادة المحاولة مرة أخرى.",
		      NOT_FOUND_ERROR: "تم حذف الملف أو لم يعد مرئيا بالنسبة لك ولا يمكنك مشاركته.",
		      ACCESS_DENIED_ERROR: "لم يعد يتوافر لديك تصريح لمشاركة هذا الملف.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "قد لا يمكن جعل الملف الذي تم قصره ملف عام.",
		      TOOLTIP: "منح الآخرين امكانية التوصل الى هذا الملف"
		   },
		   HISTORY: {
		      TAB_TITLE: "أحدث التعديلات",
		      NO_HISTORY: "لا توجد تحديثات أخرى.",
		      EMPTY: "لا يمكن استرجاع آخر التحديثات في هذا الوقت. لم يتم حذفها أو لم يعد لديك امكانية توصل لها.",
		      MORE: "عرض التحديثات السابقة",
		      ERROR_ALT: "خطأ",
		      ERROR: "حدث خطأ أثناء استرجاع التحديثات. ${again}",
		      ERROR_ADDTL: "حدث خطأ أثناء استرجاع التحديثات الاضافية. ${again}",
		      ERROR_AGAIN: "‏أعد المحاولة مرة أخرى.‏",
		      ERROR_AGAIN_TITLE: "أعد محاولة الطلب للمزيد من التحديثات.",
		      PROFILE_TITLE: "قم بفتح ملف بيانات تعريف ${user}.",
		      SORT_BY: "فرز بواسطة\\:",
		      SORTS: {
		         DATE: "تاريخ",
		         DATE_TOOLTIP: "فرز من الأحدث في التحديث الى الأقدم",
		         DATE_TOOLTIP_REVERSE: "فرز من الأقدم في التحديث الى الأحدث"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} في ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "اليوم في ${time}",
		             YEAR: "${MMM} ${d}، ${YYYY}",
		             YESTERDAY: "أمس في ${time}",
		             TOMORROW: "${MMM} ${d}، ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "هذا التعقيب",
			   REPLY_ACTION: "رد",
		       REPLY_ACTION_TOOLTIP: "الرد على هذا التعقيب"
		   },
		   OAUTH: {
		      welcomeHeader: "مرحبا بك في Connections",
		      continueBtnLabel: "استمرار",
		      continueBtnA11y: "سيؤدي تفعيل هذا الرابط الى فتح نافذة جديدة ستسمح لك بالتصريح بالتوصل الى Connections.",
		      clickHere: "اضغط هنا",
		      infoMsg: "تتطلب Connections الصلاحية الخاصة بك للتوصل الى البيانات.",
		      authorizeGadget: "${clickHere} للتصريح لهذا التطبيق بالتوصل الى معلومات Connections الخاصة بك.",
		      confirmAuthorization: "${clickHere} للتأكيد على أنك تصرح لهذا التطبيق بالتوصل الى معلومات Connections الخاصة بك."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "سيؤدي تفعيل هذا الرابط الى فتح نافذة جديدة ستسمح لك بترخيص امكانية التوصل الى مستودع تخزين Connections Library.",
		      infoMsg: "يتطلب مستودع تخزين Connections Library الصلاحية الخاصة بك للتوصل الى البيانات.",
		      authorizeGadget: "${clickHere} للترخيص لهذا التطبيق للتوصل الى معلومات مستودع تخزين Connections Library الخاصة بك.",
		      confirmAuthorization: "${clickHere} لتأكيد أنه يتوافر لديك الصلاحية الى هذا التطبيق للتوصل الى معلومات مستودع تخزين Connections Library الخاصة بك."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "الغاء",
		      CONFIRM: "هل تريد بالفعل استبعاد التغييرات الخاصة بك؟  اضغط حسنا للاستمرار أو الغاء للعودة.",
		      DIALOG_TITLE: "تأكيد",
		      NAME: "تأكيد",
		      OK: "‏حسنا‏",
		      TOOLTIP: "تأكيد"
		   }
});

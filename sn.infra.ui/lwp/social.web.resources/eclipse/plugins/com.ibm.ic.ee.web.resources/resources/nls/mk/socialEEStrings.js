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
		         label: "Повеќе",
		         tooltip: "Повеќе дејства"
		       },
		       tags_more: "и уште ${0}",
		       ERROR_ALT: "Грешка",
		       PERSON_TITLE: "Отворете го профилот на ${user}.",
		       inactiveUser: "${user} (неактивен)",
		       inactiveIndicator: "(неактивен)",
		       like_error: "Допаѓањето не може да се зачува. Обидете се повторно подоцна.",
		       vote_error: "Гласот не може да се зачува.Обидете се повторно подоцна."
		   },
		   generic: {
		      untitled: "(Без наслов)",
		      tags: "Ознаки:",
		      tags_more: "и уште ${0}",
		      likes: "Допаѓања",
		      comments: "Коментари",
		      titleTooltip: "Навигација до ${app}",
		      error: "Не може да се вчитаат податоците.",
		      timestamp: {
		         created: {
		            DAY: "Создадено ${EEEE} во ${time}",
		            MONTH: "Создадено ${d} ${MMM}",
		            TODAY: "Создадено денеска во ${time}",
		            YEAR: "Создадено ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Создадено вчера во ${time}",
		            TOMORROW: "Создадено ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Ажурирано ${EEEE} во ${time}",
		            MONTH: "Ажурирано ${d} ${MMM}",
		            TODAY: "Ажурирано денеска во ${time}",
		            YEAR: "Ажурирано ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Ажурирано вчера во ${time}",
		            TOMORROW: "Ажурирано ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Јавно",
		         priv: "Приватно"
		      },
		      action: {
		         created: "Создадено",
		         updated: "Ажурирано"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Добивајте ажурирања за лицата што ги следите на Почетната страница и во резиме на е-пошта.",
		      profile_title: "Отворете го профилот на ${user}.",
		      profile_a11y: "Активирањето на оваа врска ќе го отвори профилот на ${user} во нов прозорец.",
		      error: "Се појави грешка. ${again}.",
		      error_again: "Обидете се повторно",
		      error_404: "Мрежното барање веќе не постои.",
		      warning: "Предупредување",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Сега сте мрежни контакти.",
		            	follow: "Сега сте мрежни контакти и го следите ${user}."
		            },
		            ignore: {
		            	nofollow: "Ја игнориравте поканата.",
		            	follow: "Ја игнориравте поканата, но сега го следите ${user}."
		            }
		         },
		         error: {
		            accept: "Грешка при прифаќањето на барањето.",
		            ignore: "Грешка при игнорирањето на барањето."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} во ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "Денеска во ${time}",
		              YEAR: "${MMM} ${d}, ${YYYY}",
		              YESTERDAY: "Вчера во ${time}",
		              TOMORROW: "${MMM} ${d}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Активирањето на оваа врска ќе го отвори ${name} во нов прозорец.",
		      tooltip: "Отворете го ${name} во апликацијата Датотеки",
		      profile_title: "Отворете го профилот на ${user}.",
		      profile_a11y: "Активирањето оваа врска ќе го отвори профилот на ${user} во нов прозорец.",
		      download_tooltip: "Преземете ја датотеката (${0})",
		      following: {
		         add: "Следи ја датотеката",
		         remove: "Запри со следење",
		         title: "Изберете дали да добивате ажурирања за датотеката"
		      },
		      share: {
		         label: "Сподели",
		         title: "Дајте им пристап до датотеката на другите"
		      },
		      timestamp: {
		         created: {
		            DAY: "Создадено ${EEEE} во ${time}",
		            MONTH: "Создадено ${d} ${MMM}",
		            TODAY: "Создадено денеска во ${time}",
		            YEAR: "Создадено ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Создадено вчера во ${time}",
		            TOMORROW: "Создадено ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} ја создаде во ${EEEE} во ${time}",
		            MONTH: "${user} ја создаде во ${MMM} ${d}",
		            TODAY: "${user} создаде денеска во ${time}",
		            YEAR: "${user} ја создаде во ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} ја создаде вчера во ${time}",
		            TOMORROW: "${user} ја создаде на ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Ажурирано ${EEEE} во ${time}",
		            MONTH: "Ажурирано ${d} ${MMM}",
		            TODAY: "Ажурирано денеска во ${time}",
		            YEAR: "Ажурирано ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Ажурирано вчера во ${time}",
		            TOMORROW: "Ажурирано ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} ја ажурираше во ${EEEE} во ${time}",
		            MONTH: "${user} ја ажурираше во ${MMM} ${d}",
		            TODAY: "${user} ја ажурираше денеска во ${time}",
		            YEAR: "${user} ја ажурираше во ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} ја ажурираше вчера во ${time}",
		            TOMORROW: "${user} ја ажурираше на ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Создадено: ${EEEE} во ${time}",
		            MONTH: "Создадено: ${d} ${MMM}",
		            TODAY: "Создадено: денеска во ${time}",
		            YEAR: "Создадено: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Создадено: вчера во ${time}",
		            TOMORROW: "Создадено: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Ажурирано: ${EEEE}  во${time}",
		            MONTH: "Ажурирано: ${MMM} ${d}",
		            TODAY: "Ажурирано: денеска во ${time}",
		            YEAR: "Ажурирано: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Ажурирано: вчера во ${time}",
		            TOMORROW: "Ажурирано: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} од ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} од ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Преземи ја датотеката (${size})",
		      	 DOWNLOAD_ALT: "Преземи"
		      },
		      PREVIEW: {
		         LINK: "Преглед",
		         TITLE: "Прегледајте ја датотеката во нов прозорец."
		      },
		      TAGS: "Ознаки:",
		      error: "Се појави грешка.  ${again}.",
		      error_again: "Обидете се подоцна",
		      error_404: "Датотеката веќе не постои или немате доволно дозволи за пристап.",
		      error_403: "Немате дозвола за прикажување на датотеката. Датотеката не е јавна и не се споделува со вас.",
		      notifications: {
		         USER_SHARED: "${user} напиша:",
		         CHANGE_SUMMARY: "${user} обезбеди резиме на измената",
		         NO_CHANGE_SUMMARY: "${user} не обезбеди резиме на измената",
		         COMMENTED: "${user} коментираше"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Заклучено од вас",
		      checkedout_other: "Заклучено од ${user}",
		      tooltip: "Отворете ја датотеката ${name} во библиотеката",
		      draft_404_info: "Нацртот е избришан или веќе не се споделува со вас. Објавената верзија сега е најновата верзија на датотеката.",
		      error_404: "Датотеката е избришана или веќе не се споделува со вас.",
		      error_403: "Датотеката е избришана или веќе не се споделува со вас.",
		      error_preview: "Датотеката веќе не е достапна за преглед.",
		      draft_review_canceled: "Прегледот е откажан, а нацртот веќе не се споделува со вас. Веќе не се бара преглед од вас.",
		      switch_ee: "Прикажи го нацртот",
		      switch_ee_tooltip: "Прикажи го последниот нацрт за оваа датотека"
		   },
		   ecm_draft: {
		      tooltip: "Отворете го нацртот ${name} во библиотеката",
		      community_owners: "Сопственици на заедницата",
		      draft: "Нацрт",
		      draft_tooltip: "Се прикажува нацрт",
		      draft_general_info: "Претходниот нацрт веќе не постои, а поновиот нацрт сега е најновата верзија.",
		      draft_review_404_general_info: "Еден од прегледувачите веќе гласаше. Веќе не се бара од вас да го прегледате нацртот.",
		      draft_review_404_request_info: "Претходниот нацрт веќе не постои, а најновиот нацрт е поднесен на преглед. Се бара преглед од вас.",
		      draft_review_404_require_info: "Претходниот нацрт веќе не постои, а најновиот нацрт е поднесен на преглед. Неопходен е ваш преглед.",
		      draft_review_request_info: "Се бара преглед од вас.",
		      draft_review_require_info: "Неопходен е ваш преглед.",
		      error_404: "Нацртот е избришан или веќе не се споделува со вас. ",
		      error_403: "Не може да го прикажете нацртот бидејќи не е споделен со вас.",
		      error_preview: "Нацртот веќе не е достапен за преглед.",
		      switch_ee: "Прикажи ја објавената верзија",
		      switch_ee_tooltip: "Прикажи ја објавената верзија на оваа датотека",
		      review: "Преглед",
		      reviewers: "Прегледувачи",
		      reviwers_addtl: "Дополнителни прегледувачи",
		      in_review: "Нацрт во преглед",
		      in_review_tooltip: "Се прикажува нацрт во Преглед",
		      review_required_any: "Сопствениците на заедницата бараат еден прегледувач да го прегледа нацртот.",
		      review_required_all: "Сопствениците на заедницата бараат сите прегледувачи да го прегледаат нацртот.",
		      review_required_generic: "Сопствениците на заедницата бараат овие прегледувачи да го прегледаат нацртот.",
		      review_additional_required: "Побарано е нацртот да го прегледаат сите преглеувачи додадени од поднесувачот на нацртот.",
		      reivew_submitted_date: {
		         DAY: "${user} го достави нацртот за преглед во ${EEEE} во ${time}.",
		         MONTH: "${user} го достави нацртот за преглед на ${MMM} ${d}.",
		         TODAY: "${user} го достави нацртот за преглед денеска во ${time}.",
		         YEAR: "${user} го достави нацртот за преглед на ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} го достави нацртот за преглед вчера во ${time}.",
		         TOMORROW: "${user} го достави нацртот за преглед на ${MMM} ${d}, ${YYYY}."
		      },
		      pending: "Чека на ред",
		      pending_rejected: "Преглед веќе не е потребен бидејќи нацртот беше одбиен",
		      approve: "Одобри",
		      approved: "Одобрено",
		      approve_tooltip: "Одобрете го овој нацрт",
		      accept_success: "Го одобривте овој нацрт.",
		      accept_error: "Грешка при одобрувањето на нацртот. Обидете се повторно.",
		      accept_info: "Го одобривте овој нацрт.",
		      reject: "Одбиј",
		      rejected: "Одбиено",
		      reject_tooltip: "Одбијте го овој нацрт",
		      reject_success: "Го одбивте овој нацрт.",
		      reject_error: "Грешка при одбивањето на нацртот. Обидете се повторно.",
		      reject_info: "Го одбивте овој нацрт."
		   },
		   authUser: {
		      error: "Се појави грешка при вчитувањето на тековниот корисник.  ${again}.",
		      error_again: "Обидете се подоцна",
		      error_404: "Не може да се најде овластен корисник.",
		      error_403: "Немате дозвола за вчитување на информации за корисникот."
		   },
		   forum: {
		      error: "Се појави грешка.  ${again}.",
		      error_again: "Обидете се повторно",
		      error_404: "Форумот веќе не постои или немате доволно дозволи за пристап.",
		      error_403: "Немате дозвола за прикажување на форумот. Форумот не е јавен и не е споделен со вас.",
		      readMore: "Прикажи ја целосната тема...",
		      readMore_tooltip: "Отворете ја темата на форумот ${name}.",
		      readMore_a11y: "Активирањето на оваа врска ќе ја отвари темата на форумот ${name} во нов прозорец.",
		      QUESTION_ANSWERED: "Ова прашање е одговорено.",
		      QUESTION_NOT_ANSWERED: "Ова прашање уште не е одговорено.",
		      attachments: "${count} прилози",
		      attachments_one: "${count} прилог"
		   },
		   blog: {
		      error: "Се појави грешка.  ${again}.",
		      error_again: "Обидете се повторно",
		      error_404: "Блогот веќе не постои или немате доволно дозволи за пристап.",
		      error_403: "Немате дозвола за прикажување на блогот. Блогот не е јавен и не е споделен со вас.",
		      readMore: " Прочитајте повеќе...",
		      readMore_tooltip: "Отворете го записот од блогот ${name}.",
		      readMore_a11y: "Активирањето на оваа врска ќе го отвари записот од блогот ${name} во нов прозорец.",
		      graduated: "Градирано",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Гласај</a>",
		  					TOOLTIP: 	"Гласајте за ова"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Гласано</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Гласано</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Врати</a>",
		  					TOOLTIP: 	"Отстранете го вашиот глас за ова"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 лица гласаа за ова"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 гласаше за ова"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} гласаа за ова"
		  				}
		  			},
		  			LOADING: "Вчитување...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Гласано"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Не можеме да го зачуваме вашиот глас бидејќи или сте го достигнале ограничувањето за гласање или идејата веќе не ви е достапна.",
		      readMore_tooltip: "Отворете ја идејата ${name}.",
		      readMore_a11y: "Активирањето на оваа врска ќе ја отвари идејата ${name} во нов прозорец."
		   },
		   size: {
		      B: "${0} Б",
		      KB: "${0} КБ",
		      MB: "${0} МБ",
		      GB: "${0} ГБ"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Одговори",
		      THIS_ARIA_LABEL: "Овој одговор",
		      THIS_TAB_TITLE: "Овој одговор",
		      TAB_TITLE: "Одговори (${0})",
		      REPLY_TO_REPLY: "Како одговор на ${thisReply}",
		      REPLY_TO_TOPIC: "Како одговор на ${thisTopic}",
		      THIS_TOPIC: "оваа тема",
		      THIS_REPLY: "овој одговор",
		      NAVIGATE_TO_REPLY: "Навигација до надредениот одговор",
		      NAVIGATE_TO_TOPIC: "Навигација до надредената тема",
		      ADD_COMMENT: "Одговорете на оваа тема",
		      ADD_COMMENT_TOOLTIP: "Одговорете на оваа тема на форум",
		      SHOWING_RECENT_REPLIES: "Се прикажуваат ${0} најнови одговори",
		      PREV_COMMENTS: "Прикажи повеќе одговори",
		      PLACEHOLDER_TXT: "Одговорете на оваа тема",
		      EMPTY: "Нема одговори.",
		      TRIM_LONG_COMMENT: "Скрати одговор?",
		      WARN_LONG_COMMENT: "Одговорот е премногу долг.  ${shorten}",
		      ERROR: "Се појави грешка при вчитувањето на одговорите. ${again}",
		      ERROR_CREATE: "Одговорот не може да се зачува. Обидете се повторно подоцна.",
		      ERROR_CREATE_NOT_FOUND: "Одговорот не може да се зачува бидејќи темата е избришана или веќе не е видлива за вас.",
		      ERROR_CREATE_ACCESS_DENIED: "Одговорот не може да се зачува бидејќи темата е избришана или веќе не е видлива за вас.",
		      ERROR_CREATE_TIMEOUT: "Одговорот не може да се зачува бидејќи не може да се контактира со серверот. Кликнете „Зачувај“ за да се обидете повторно.",
		      ERROR_CREATE_CANCEL: "Одговорот не може да се зачува бидејќи барањето е откажано. Кликнете „Зачувај“ за да се обидете повторно.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Мора да сте најавени за да го создадете овој договор. Кликнете „Зачувај“ за да ве потсетиме да се најавите.",
		      ERROR_NO_CONTENT: "Внесете го одговорот и кликнете „Зачувај“. Ако не сакате да оставите одговор, кликнете „Откажи“.",
		      ERROR_UNAUTHORIZED: "Оговорот не може да се зачува бидејќи не сте овластени да оставите одговор.",
		      COMMENT_DELETED: {
		         DAY: "Одговорот е избришан од ${user} во ${EEEE} во ${time}",
		         MONTH: "Одговорот е избришан од ${user} на ${MMM} ${d}",
		         TODAY: "Одговорот е избришан од ${user} денеска во ${time}",
		         YEAR: "Одговорот е избришан од ${user} на ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Одговорот е избришан од ${user} вчера во ${time}",
		         TOMORROW: "Одговорот е избришан од ${user} на ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Причина за бришењето: ${reason}",
		      REPLY_TITLE: "Од: ${0}",
		      SHOW_FULL_REPLY: "Прикажи го целосниот одговор",
		      SHOW_FULL_REPLY_TOOLTIP: "Навигација до оригиналниот одговор во темата на форумот",
		      REPLY_ACTION: "Одговори",
		      REPLY_ACTION_TOOLTIP: "Одговорете на оваа објава",
		      MODERATION_PENDING: "Објавата чека на ред за преглед.",
		      MODERATION_QUARANTINED: "Објавата е ставена во карантин од модераторот.",
		      MODERATION_REMOVED: {
		         DAY: "Овој одговор е отстранет од ${user} во ${EEEE} во ${time}.",
		         MONTH: "Овој одговор е отстранет од ${user} на ${MMM} ${d}.",
		         TODAY: "Овој одговор е отстранет од ${user} денеска во ${time}.",
		         YEAR: "Овој одговор е отстранет од ${user} на ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Овој одговор е отстранет од ${user} вчера во ${time}.",
		         TOMORROW: "Овој одговор е отстранет од ${user} на ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Овој одговор е одбиен од ${user} во ${EEEE} во ${time}.",
		         MONTH: "Овој одговор е одбиен од ${user} на ${MMM} ${d}.",
		         TODAY: "Овој одговор е одбиен од ${user} денеска во ${time}.",
		         YEAR: "Овој одговор е одбиен од ${user} на ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Овој одговор е одбиен од ${user} вчера во ${time}.",
		         TOMORROW: "Овој одговор е одбиен од ${user} на ${MMM} ${d}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Вашиот одговор е поднесен на преглед и ќе биде достапен штом се одобри."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Коментари",
		      PLACEHOLDER_TXT: "Додајте коментар",
		      TAB_TITLE: "Коментари (${0})",
		      ACTION_NOT_SUPPORTED: "Неподдржано дејство",
		      ADD_COMMENT: "Додај коментар",
		      ADD_COMMENT_TOOLTIP: "Додајте коментар на ставката",
		      CANCEL: "Откажи",
		      COMMENT_COUNT_ONE: "${0} коментар",
		      COMMENT_COUNT_MANY: "${0} коментари",
		      COMMENT_LABEL: "Коментар:",
		      DELETE: "Избриши",
		      DELETE_TOOLTIP: "Избришете коментар",
		      DELETEREASON: "Причина за бришење на коментарот:",
		      DIALOG_TITLE: "Скрати коментар",
		      TOOLTIP: "Скратете коментар",
		      NAME: "Скрати коментар",
		      EDIT: "Уреди",
		      EDIT_TOOLTIP: "Уредете коментар",
		      ERROR_CREATE: "Коментарот не може да се зачува.  Обидете се повторно подоцна.",
		      ERROR_CREATE_NOT_FOUND: "Коментарот не може да се зачува бидејќи ставката е избришана или веќе не е видлива за вас.",
		      ERROR_CREATE_ACCESS_DENIED: "Коментарот не може да се зачува бидејќи ставката е избришана или веќе не е видлива за вас.",
		      ERROR_CREATE_TIMEOUT: "Коментарот не може да се зачува бидејќи не може да се контактира со серверот. Кликнете „Објави“ за да се обидете повторно.",
		      ERROR_CREATE_CANCEL: "Коментарот не може да се зачува бидејќи барањето е откажано. Кликнете „Објави“ за да се обидете повторно.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Мора да сте најавени за да го создадете овој коментар. Кликнете „Објави“за да ве потсетиме да се најавите.",
		      ERROR_DELETE: "Коментарот не може да се избрише. Обидете се повторно подоцна.",
		      ERROR_DELETE_TIMEOUT: "Коментарот не може да се избрише бидејќи не може да се контактира со серверот. Кликнете „Избриши“ за да се обидете повторно.",
		      ERROR_DELETE_NOT_FOUND: "Коментарот не може да се избрише бидејќи ставката е избришана или веќе не е видлива за вас.",
		      ERROR_DELETE_ACCESS_DENIED: "Коментарот не може да се избрише бидејќи ставката е избришана или веќе не е видлива за вас.",
		      ERROR_DELETE_CANCEL: "Коментарот не може да се избрише бидејќи барањето е откажано. Кликнете „Избриши“ за да се обидете повторно.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Мора да сте најавени за да го избришете овој коментар.  Кликнете „Избриши“за да ве потсетиме да се најавите.",
		      ERROR_EDIT: "Коментарот не може да се ажурира.  Обидете се повторно подоцна.",
		      ERROR_EDIT_ACCESS_DENIED: "Коментарот не може да се ажурира бидејќи ставката е избришана или веќе не е видлива за вас.",
		      ERROR_EDIT_NOT_FOUND: "Коментарот не може да се ажурира бидејќи ставката е избришана или веќе не е видлива за вас.",
		      ERROR_EDIT_TIMEOUT: "Коментарот не може да се ажурира бидејќи не може да се контактира со серверот. Кликнете „Објави“ за да се обидете повторно.",
		      ERROR_EDIT_CANCEL: "Коментарот не може да се ажурира бидејќи барањето е откажано. Кликнете „Објави“ за да се обидете повторно.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Мора да сте најавени за да го уредите овој коментар. Кликнете „Објави“за да ве потсетиме да се најавите.",
		      ERROR_NO_CONTENT: "Внесете го коментарот и кликнете „Објави“. Ако не сакате да оставите коментар, кликнете „Откажи“.",
		      ERROR_NO_CONTENT_EDIT: "Внесете коментар и кликнете „Објави“. Ако не сакате да го уредите коментарот, кликнете „Откажи“.",
		      ERROR_UNAUTHORIZED: "Коментарот не може да се зачува бидејќи не сте овластени да оставите коментар.",
		      ERROR_GENERAL: "Се појави грешка.",
		      OK: "ОК",
		      YES: "Да",
		      TRIM_LONG_COMMENT: "Скрати коментар?",
		      WARN_LONG_COMMENT: "Коментарот е премногу долг.  ${shorten}",
		      LINK: "Врска",
		      SAVE: "Зачувај",
		      POST: "Објави",
		      SHOWMORE: "Прочитај повеќе...",
		      VIEW_COMMENTS_FILE: "Прикажи ги коментарите за оваа датотека",
		      SUBSCRIBE_TO_COMMENTS: "Претплатете се на овие коментари",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Следете ги измените на овие коментари преку читачот за навестување на содржината",
		      PROFILE_TITLE: "Отворете го профилот на ${user}.",
		      PROFILE_A11Y: "Активирањето на оваа врска ќе го отвори профилот на ${user} во нов прозорец.",
		      MODERATION_PENDING: "Коментарот чека на ред за преглед.",
		      MODERATION_REMOVED: {
		         DAY: "Овој кометар е отстранет од ${user} во ${EEEE} во ${time}.",
		         MONTH: "Овој кометар е отстранет од ${user} на ${MMM} ${d}.",
		         TODAY: "Овој кометар е отстранет од ${user} денеска во ${time}.",
		         YEAR: "Овој кометар е отстранет од ${user} на ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Овој кометар е отстранет од ${user} вчера во ${time}.",
		         TOMORROW: "Овој кометар е отстранет од ${user} на ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Овој кометар е одбиен од ${user} во ${EEEE} во ${time}.",
		         MONTH: "Овој кометар е одбиен од ${user} на ${MMM} ${d}.",
		         TODAY: "Овој кометар е одбиен од ${user} денеска во ${time}.",
		         YEAR: "Овој кометар е одбиен од ${user} на ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Овој кометар е одбиен од ${user} вчера во ${time}.",
		         TOMORROW: "Овој кометар е одбиен од ${user} на ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Прикажи претходни коментари",
		      EMPTY: "Нема коментари.",
		      ERROR_ALT: "Грешка",
		      ERROR: "Се појави грешка при вчитувањето на коментарите. ${again}",
		      ERROR_ADDTL: "Се појави грешка при вчитувањето на дополнителните коментари. ${again}",
		      ERROR_AGAIN: "Обидете се повторно.",
		      ERROR_AGAIN_TITLE: "Обидете се повторно со барањето за повеќе коментари.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} во ${time} (верзија ${version})",
		         MONTH: "${user} ${MMM} ${d} (верзија ${version})",
		         TODAY: "${user} денеска во ${time} (верзија ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (верзија ${version})",
		         YESTERDAY: "${user} вчера во ${time} (верзија ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (верзија ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} во ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} денеска во ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} вчера во ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} во ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "Денеска во ${time}",
		         YEAR: "${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Вчера во ${time}",
		         TOMORROW: "${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Коментарот е избришан од ${user} во ${EEEE} во ${time}",
		         MONTH: "Коментарот е избришан од ${user} на ${MMM} ${d}",
		         TODAY: "Коментарот е избришан од ${user} денеска во ${time}",
		         YEAR: "Коментарот е избришан од ${user} на ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Коментарот е избришан од ${user} вчера во ${time}",
		         TOMORROW: "Коментарот е избришан од ${user} на ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} го уреди во ${EEEE} во ${time} (верзија ${version})",
		         MONTH: "${user} го уреди на ${MMM} ${d} (верзија ${version})",
		         TODAY: "${user} го уреди денеска во ${time} (верзија ${version})",
		         YEAR: "${user} го уреди на ${MMM} ${d}, ${YYYY} (верзија ${version})",
		         YESTERDAY: "${user} го уреди вчера во ${time} (верзија ${version})",
		         TOMORROW: "${user} го уреди на ${MMM} ${d}, ${YYYY} (верзија ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} го уреди во ${EEEE} во ${time}",
		         MONTH: "${user} го уреди на ${MMM} ${d}",
		         TODAY: "${user} го уреди денеска во ${time}",
		         YEAR: "${user} го уреди на ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} го уреди вчера во ${time}",
		         TOMORROW: "${user} го уреди на ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Дали сте сигурни дека сакате да го избришете коментарот?",
		      FLAG_ITEM: {
		         BUSY: "Зачувување...",
		         CANCEL: "Откажи",
		         ACTION: "Означи со знаменце како несоодветно",
		         DESCRIPTION_LABEL: "Обезбедете причина за означувањето со знаменце на оваа ставка (изборно)",
		         EDITERROR: "Метаподатоците за датотеката не се уредени поради грешка",
		         OK: "Зачувај",
		         ERROR_SAVING: "Грешка при обработката на барањето. Обидете се повторно подоцна.",
		         SUCCESS_SAVING: "Вашето знаменце е поднесено. Модератор ќе истражува наскоро.",
		         TITLE: "Означи ја ставката со знаменце како несоодветна",
		         COMMENT: {
		            TITLE: "Означи го коментарот како несоодветен.",
		            A11Y: "Копчето отвора дијалог што му дозволува на корисникот да го означи со знаменце овој коментар како несоодветен."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Откажи",
		      DIALOG_TITLE: "Избриши коментар",
		      NAME: "Избриши коментар",
		      OK: "ОК",
		      TOOLTIP: "Избришете коментар"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Откажи",
		      CONFIRM: "Скратувањето ќе го отстрани текстот над ограничувањето на коментарот. Кликнете „OK“ да го скратите или кликнете „Откажи“ за сами да го уредите коментарот.",
		      DIALOG_TITLE: "Скрати коментар",
		      NAME: "Скрати коментар",
		      OK: "ОК",
		      TOOLTIP: "Скратете коментар"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Потврда за поднесување",
		      CONFIRM: "Вашиот коментар е поднесен на преглед и ќе биде достапен штом се одобри.",
		      OK: "ОК"
		   },
		   DATE: {
		      AM: "претпладне",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "попладне",
		      TODAY: "денеска",
		      TODAY_U: "Денеска",
		      YESTERDAY: "вчера",
		      YESTERDAY_U: "Вчера",
		      ADDED: { DAY: "Додадено ${EEee} во ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Додадено ${date_long}",
		         TODAY: "Додадено денеска во ${time}",
		         YEAR: "Додадено ${date_long}",
		         YESTERDAY: "Додадено вчера во ${time}"
		      },
		      LAST_UPDATED: { DAY: "Последен пат ажурирано ${EEee} во ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Последен пат ажурирано на ${date_long}",
		         TODAY: "Последен пат ажурирано денеска во ${time}",
		         YEAR: "Последен пат ажурирано на ${date_long}",
		         YESTERDAY: "Последен пат ажурирано вчера во ${time}"
		      },
		      MONTHS_ABBR: { 0: "ЈАН",
		         10: "НОЕ",
		         11: "ДЕК",
		         1: "ФЕВ",
		         2: "МАР",
		         3: "АПР",
		         4: "МАЈ",
		         5: "ЈУН",
		         6: "ЈУЛ",
		         7: "АВГ",
		         8: "СЕП",
		         9: "ОКТ"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Денеска",
		         YEAR: "${date_short}",
		         YESTERDAY: "Вчера",
		         TOMORROW: "Утре"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} во ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Денеска во ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Вчера во ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} во ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Денеска во ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Вчера во ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} во ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} во ${time}",
		         TODAY: "${date_short} во ${time}",
		         YEAR: "${date_short} во ${time}",
		         YESTERDAY: "${date_short} во ${time}",
		         TOMORROW: "${date_short} во ${time}"
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
		      UPDATED: { DAY: "Ажурирано ${EEee} во ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Ажурирано ${date_long}",
		         TODAY: "Ажурирано денеска во ${time}",
		         YEAR: "Ажурирано ${date_long}",
		         YESTERDAY: "Ажурирано вчера во ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Не може да се вчитаат информации за верзијата.",
		      ERROR_REQUEST_CANCELLED: "Барањето е откажано.",
		      ERROR_REQUEST_TIMEOUT: "Не може да се контактира со серверот.",
		      ERROR_REQUEST_UNKNOWN: "Се појави непозната грешка.",
		      LOADING: "Вчитување..",
		      NO_VERSIONS: "Нема верзии",
		      INFO: "Верзија ${0} ја создаде ${1} ",
		      VERSION_NUMBER: "Верзија ${0}",
		      DELETED: "Избришано",
		      DELETE_ALL: "Избриши ги сите претходни верзии на верзијата",
		      DELETE_VERSION_SINGLE: "Избриши ја верзијата ${0}",
		      DELETEERROR: "Верзијата не се избриша поради грешка.",
		      CREATE_VERSION: "Создај нова верзија",
		      CREATE_VERSION_TOOLTIP: "Создај верзија на датотеката",
		      REVERT_VERSION: "Обнови ја верзијата ${0}",
		      REVERT_DESCRIPTION: "Обновено од верзијата ${0}",
		      PREVIOUS: "Претходно",
		      PREVIOUS_TOOLTIP: "Претходна страница",
		      ELLIPSIS: "...",
		      NEXT: "Следно",
		      NEXT_TOOLTIP: "Следна страница",
		      COUNT: "${0}-${1} од ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Страница",
		      SHOW: "Покажи",
		      ITEMS_PER_PAGE: " ставки на страница.",
		      DATE: {
		        AM: "претпладне",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Денеска во ${time}",
		            YESTERDAY: "Вчера во ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} во ${time}",
		            YEAR: "${date_short} во ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} во ${time}",
		            TODAY: "денеска во ${time}",
		            YESTERDAY: "вчера во ${time}"
		        },
		        UPDATED: { DAY: "Ажурирано ${EEee} во ${time}",
		            YEAR: "Ажурирано ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Ажурирано ${date_short}",
		            TODAY: "Ажурирано денеска во ${time}",
		            YESTERDAY: "Ажурирано вчера во ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Избришете ја верзијата ${0}",
		         DOWNLOAD: "Преземи",
		         DOWNLOAD_TOOLTIP: "Преземете ја верзијата (${0})",
		         VIEW: "Прикажи",
		         VIEW_TOOLTIP: "Прикажи ја верзијата ${0}",
		         REVERT: {
		            A11Y: "Копчето отвора дијалог што му дозволува на корисникот да го потврди обновувањето датотека од претходна верзија. Содржината на страницата се освежува со потврдување на ова дејство.",
		            FULL: "Обнови",
		            WIDGET: "Обнови ја оваа верзија"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Верзијата не може да се избрише бидејќи веќе е избришана или веќе не е видлива за вас.",
		         ERROR_ACCESS_DENIED: "Верзијата не може да се избрише бидејќи не сте уредник.",
		         ERROR_TIMEOUT: "Верзијата не се избриша бидејќи не можеше да се контактира со серверот. Кликнете „Избриши“ повторно за да го повторите барањето.",
		         ERROR_CANCEL: "Верзијата не се избриша бидејќи барањето беше откажано. Кликнете „Избриши“ повторно за да го повторите барањето.",
		         ERROR_NOT_LOGGED_IN: "Мора да сте најавени за да ја избришете верзијата. Кликнете „Избриши“за да ве потсетиме да се најавите.",
		         GENERIC_ERROR: "Верзијата не може да се избрише поради непозната грешка. Кликнете „Избриши“ повторно за да го повторите барањето.",
		         FULL: "Избриши",
		         A11Y: "Копчето отвора дијалог што му дозволува на корисникот да го потврди бришењето на оваа верзија. Содржината на страницата се освежува со потврдување на ова дејство."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Верзијата не може да се обнови бидејќи веќе е избришана или веќе не е видлива за вас.",
		         ERROR_ACCESS_DENIED: "Верзијата не може да се обнови бидејќи не сте уредник.",
		         ERROR_NAME_EXISTS: "Верзијата не може да се обнови бидејќи има друга датотека со истото име.",
		         ERROR_TIMEOUT: "Верзијата не се обнови бидејќи не можеше да се контактира со серверот. Кликнете „Обнови“ повторно за да го повторите барањето.",
		         ERROR_CANCEL: "Верзијата не се обнови бидејќи барањето беше откажано. Кликнете „Обнови“ повторно за да го повторите барањето.",
		         ERROR_QUOTA_VIOLATION: "Верзијата не можеше да се обнови поради ограничување на просторот.",
		         ERROR_MAX_CONTENT_SIZE: "Верзијата не можеше да се обнови бидејќи е поголема од максимално дозволената големина на датотеки од ${0}",
		         GENERIC_ERROR: "Верзијата не можеше да се обнови поради непозната грешка. Кликнете „Обнови“ повторно за да го повторите барањето."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Видете кој ја има преземено...",
		      PREVIOUS: "Претходно",
		      PREVIOUS_TOOLTIP: "Претходна страница",
		      ELLIPSIS: "...",
		      NEXT: "Следно",
		      NEXT_TOOLTIP: "Следна страница",
		      COUNT: "${0}-${1} од ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Страница",
		      SHOW: "Покажи",
		      ITEMS_PER_PAGE: " ставки на страница.",
		      VERSION: {
		         DAY: "Верзија ${version} на ${date}",
		         MONTH: "Верзија ${version} на ${date}",
		         TODAY: "Верзија ${version} во ${time}",
		         YEAR: "Верзија ${version} на ${date}",
		         YESTERDAY: "Верзија ${version} вчера"
		      },
		      FILE: {
		         V_LATEST: "Ја презедовте најновата верзија на датотеката",
		         V_OLDER: "Последниот пат, ја презедовте верзијата ${0} на оваа датотека",
		         LOADING: "Вчитување...",
		         EMPTY: "Само анонимни корисници",
		         ERROR: "Не може да се вчитаат преземаните информации"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Грешка",
		      ERROR_ALT_TEXT: "Грешка:",
		      ERROR_MSG_GENERIC: "Нешто не е во ред.  Обидете се повторно.",
		      ERROR_MSG_NOT_AVAILABLE: "Ставкате е избришана или веќе не е  достапна.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Содржината за ставката не е достапна.",
		      ERROR_MSG_NO_ACCESS: "Веќе немате пристап до ставката.",
		      LOADING: "Вчитување...",
		      TITLE_SU: "${author} објави порака.",
		      TITLE_NI: "${author} ве покани да се поврзете на неговата мрежа.",
		      AUTHOR_TITLE: "Прикажи го профилот за ${author}",
		      OPEN_LINK: "Отвори го ${title}",
		      CONFIRM_CLOSE_TITLE: "Потврди",
		      CONFIRM_CLOSE_MESSAGE: "Дали сте сигурни дека сакате да ги напуштите измените? Притиснете „OK“ за да продолжите, или „Откажи“ за да се вратите",
		      OK: "ОК",
		      CANCEL: "Откажи"
		   },
		   MESSAGE: {
		      SUCCESS: "Потврда",
		      ERROR: "Грешка",
		      ERROR_ALT_TEXT: "Грешка:",
		      INFO: "Информации",
		      WARNING: "Предупредување",
		      DISMISS: "Сокриј ја поракава",
		      MORE_DETAILS: "Повеќе детали",
		      HIDE_DETAILS: "Сокриј детали"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Создадено: ${EEEE} во ${time}",
		           MONTH: "Создадено: ${d} ${MMM}",
		           TODAY: "Создадено: денеска во ${time}",
		           YEAR: "Создадено: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Создадено: вчера во ${time}",
		           TOMORROW: "Создадено: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Се појави грешка.  ${again}.",
		      error_again: "Обидете се повторно",
		      error_404: "Ажурирањето на статусот веќе не постои.",
		      notifications: {
		         STATUS_UPDATE: "${user} објави порака",
		         USER_BOARD_POST: "${user} напиша на вашата табла",
		         POST_COMMENT: "${user} напиша:"
		      }
		   },
		   login: {
		      error: "Корисничкото име и/или лозинката не се совпаѓаат со ниту една постојна сметка. Обидете се повторно.",
		      logIn: "Најави се",
		      password: "Лозинка:",
		      user: "Корисничко име:",
		      welcome: "Најави се на HCL Connections"
		   },
		   repost: {
		      name: "Објави повторно",
		      title: "Објави го ова ажурирање повторно за моите следбеници или заедници",
		      msg_success: "Ажурирањето е повторно успешно објавено до вашите следбеници.",
		      msg_generic: "Нешто не е во ред.  Обидете се повторно."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Додај",
		      ADD_TXT: "Додајте луѓе или заедници како читатели",
		      SHOW_MORE: "Покажи повеќе...",
		      READER_IF_PUBLIC: "Секој (јавно)",
		      READER_IF_PUBLIC_TOOLTIP: "Датотеката е јавна и видлива за секого",
		      EMPTY_READERS: "Нема",
		      READERS_LABEL: "Читатели:\u00a0",
		      EDITORS_LABEL: "Уредници:\u00a0",
		      OWNER_LABEL: "Сопственик:\u00a0",
		      ERROR: "Не може да се вчитаат споделените информации",
		      ERROR_NOT_FOUND: "Датотеката што ја побаравте е избришана или преместена. Ако некој ви ја испрати врската, проверете дали е точна.",
		      ERROR_ACCESS_DENIED: "Немате дозвола за прикажување на датотека.  Датотеката не е јавна и не се споделува со вас.",
		      SHARE: "Сподели",
		      CANCEL: "Откажи",
		      SHARE_WITH: "Сподели со:",
		      PERSON: "Лице",
		      COMMUNITY: "Заедница",
		      PLACEHOLDER: "Име или е-пошта на лицето...",
		      MESSAGE: "Порака:",
		      MESSAGE_TXT: "Додај незадолжителна порака",
		      REMOVE_ITEM_ALT: "Отстрани ${0}",
		      NO_MEMBERS: "Нема",
		      A11Y_READER_ADDED: "Го избравте ${0} како читател",
		      A11Y_READER_REMOVED: "Го отстранивте ${0} како читател",
		      SELF_REFERENCE_ERROR: "Не може да споделувате сами со себе.",
		      OWNER_REFERENCE_ERROR: "Не може да споделувате со сопственикот на датотеката.",
		      SHARE_COMMUNITY_WARN: "Споделувањето со јавната заедница „${0}“ ќе ја направи датотеката јавна.",
		      SELECT_USER_ERROR: "YouМора да изберете барем едно лице или заедница за да споделувате со него",
		      WARN_LONG_MESSAGE: "Пораката е премногу долга.",
		      TRIM_LONG_MESSAGE: "Скрати порака?",
		      ERROR_SHARING: "Датотеката не може да се сподели.  Обидете се повторно подоцна.",
		      INFO_SUCCESS: "Датотеката е успешно споделена.",
		      MAX_SHARES_ERROR: "Надминат е максималниот број на споделувања.",
		      NOT_LOGGED_IN_ERROR: "Датотеката не се сподели затоа што не бевте најавени.  Кликнете „Сподели“ за да ја споделите датотеката.",
		      TIMEOUT_ERROR: "Датотеката не се сподели бидејќи не можеше да се контактира со серверот.  Кликнете „Сподели“ за да се обидете повторно.",
		      CANCEL_ERROR: "Датотеката не се сподели бидејќи барањето беше откажано.  Кликнете „Сподели“ за да се обидете повторно.",
		      NOT_FOUND_ERROR: "Датотеката е избришана или веќе не е видлива за вас и не може да се сподели.",
		      ACCESS_DENIED_ERROR: "Веќе немате дозвола за споделување на датотеката.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Ограничена датотека не може да се направи јавна.",
		      TOOLTIP: "Дајте им пристап на други до оваа датотека"
		   },
		   HISTORY: {
		      TAB_TITLE: "Најнови ажурирања",
		      NO_HISTORY: "Нема неодамнешни ажурирања.",
		      EMPTY: "Не може да се вчитаат неодамнешни ажурирања за ставката. Или е избришана или веќе немате пристап до неа.",
		      MORE: "Прикажи претходни ажурирања",
		      ERROR_ALT: "Грешка",
		      ERROR: "Се појави грешка при вчитувањето на ажурирањата. ${again}",
		      ERROR_ADDTL: "Се појави грешка при вчитувањето на дополнителните ажурирања. ${again}",
		      ERROR_AGAIN: "Обидете се повторно.",
		      ERROR_AGAIN_TITLE: "Обидете се повторно со барањето за повеќе коментари.",
		      PROFILE_TITLE: "Отворете го профилот на ${user}.",
		      SORT_BY: "Сортирај според\:",
		      SORTS: {
		         DATE: "Датум",
		         DATE_TOOLTIP: "Сортирај од најновата историја до најстарите ажурирања",
		         DATE_TOOLTIP_REVERSE: "Сортирај од најстарата историја до најновите ажурирања"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} во ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "Денеска во ${time}",
		             YEAR: "${MMM} ${d}, ${YYYY}",
		             YESTERDAY: "Вчера во ${time}",
		             TOMORROW: "${MMM} ${d}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Овој коментар",
			   REPLY_ACTION: "Одговор",
		       REPLY_ACTION_TOOLTIP: "Одговорете на овој коментар"
		   },
		   OAUTH: {
		      welcomeHeader: "Добре дојдовте на Connections",
		      continueBtnLabel: "Продолжи",
		      continueBtnA11y: "Активирањето на оваа врска ќе отвори нов прозорец што ќе ви дозволи да авторизирате пристап до Connections.",
		      clickHere: "Кликни тука",
		      infoMsg: "На Connections им е потребна ваша авторизација за пристап до податоците.",
		      authorizeGadget: "${clickHere} за да ја авторизирате оваа апликација да пристапува до вашите информации на Connections.",
		      confirmAuthorization: "${clickHere} за да потврдите дека сте ја авторизирале оваа апликација да пристапува до вашите информации на Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Активирањето на оваа врска ќе отвори нов прозорец што ќе ви дозволи да авторизирате пристап до архивата на Библиотеката на Connections.",
		      infoMsg: "На архивата на Библиотеката на Connections и е потребна ваша авторизација за пристап до податоците.",
		      authorizeGadget: "${clickHere} за да ја авторизирате оваа апликација да пристапува до вашите информации во архивата на Библиотеката на Connections.",
		      confirmAuthorization: "${clickHere} за да потврдите дека сте ја авторизирале оваа апликација да пристапува до вашите информации во архивата на Библиотеката на Connections."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Откажи",
		      CONFIRM: "Дали сте сигурни дека сакате да ги напуштите измените?  Притиснете „OK“ за да продолжите, или „Откажи“ за да се вратите.",
		      DIALOG_TITLE: "Потврди",
		      NAME: "Потврди",
		      OK: "ОК",
		      TOOLTIP: "Потврди"
		   }
});

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
         label: "Повеќе",
         tooltip: "Повеќе дејства"
       },
       tags_more: "и уште ${0}",
       ERROR_ALT: "Грешка",
       PERSON_TITLE: "Отворете го профилот на ${user}.",
       inactiveUser: "${user} (неактивно)",
       inactiveIndicator: "(неактивно)",
       like_error: "Допаѓањето не може да се зачува. Обидете се повторно подоцна.",
       vote_error: "Вашиот глас не може да се зачува. Обидете се повторно подоцна."
   },
   generic: {
      untitled: "(Без наслов)",
      tags: "Ознаки:",
      tags_more: "и уште ${0}",
      likes: "Допаѓања",
      comments: "Коментари",
      titleTooltip: "Одете до ${app}",
      error: "Податоците не можат да се вчитаат.",
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
         pub: "Јавна",
         priv: "Приватно"
      },
      action: {
         created: "Создадено",
         updated: "Ажурирано"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Добивајте ажурирања за луѓето што ги следите на Почетната страница и како резиме во е-порака.",
      profile_title: "Отворете го профилот на ${user}.",
      profile_a11y: "Со активирање на оваа врска, се отвора профилот на ${user} во нов прозорец.",
      error: "Се појави грешка.  ${again}.",
      error_again: "Обидете се повторно",
      error_404: "Мрежното барање не постои повеќе.",
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
            accept: "Се појави грешка при прифаќањето на барањето.",
            ignore: "Се појави грешка при игнорирањето на барањето."
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
      download_tooltip: "Преземете ја оваа датотека (${0})",
      following: {
         add: "Следи ја датотеката",
         remove: "Запри го следното",
         title: "Изберете дали ќе добивате ажурирања за оваа датотека"
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
            MONTH: "${user} ја создаде на ${MMM} ${d}",
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
            MONTH: "${user} ја ажурираше на ${MMM} ${d}",
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
            DAY: "Ажурирано: ${EEEE} во ${time}",
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
      	 TOOLTIP: "Преземете ја оваа датотека (${size})",
      	 DOWNLOAD_ALT: "Преземи"
      },

      PREVIEW: {
         LINK: "Преглед",
         TITLE: "Прегледајте ја датотекава во нов прозорец."
      },
      TAGS: "Ознаки:",
      error: "Се појави грешка.  ${again}.",
      error_again: "Обидете се подоцна",
      error_404: "Датотеката не постои повеќе или немате доволно дозволи за да пристапите до неа.",
      error_403: "Немате дозвола за прикажување на датотеката. Датотеката не е јавна и не се споделува со вас.",
      notifications: {
         USER_SHARED: "${user} напиша:",
         CHANGE_SUMMARY: "${user} обезбеди резиме на промените",
         NO_CHANGE_SUMMARY: "${user} не обезбеди резиме на промените",
         COMMENTED: "${user} коментираше"
      }
   },
   ecm_file: {
      checkedout_you: "Сте одјавиле",
      checkedout_other: "Одјавено од ${user}",
      tooltip: "Отворете ја датотеката ${name} во библиотеката",
      draft_404_info: "Нацрт-верзијата е избришана или повеќе не се споделува со вас. Објавената верзија сега е најновата верзија од оваа датотека.",
      error_404: "Датотеката е избришана или повеќе не се споделува со вас.",
      error_403: "Датотеката е избришана или повеќе не се споделува со вас.",
      error_preview: "Датотеката не е достапна повеќе за преглед.",
      draft_review_canceled: "Прегледот се откажа и нацрт-верзијата повеќе не се споделува со вас. Повеќе не се бара вашиот преглед.",
      switch_ee: "Прегледајте ја нацрт-верзијата",
      switch_ee_tooltip: "Прегледајте ја најновата нацрт-верзија за оваа датотека"
   },
   ecm_draft: {
      tooltip: "Отворете ја нацрт-верзијата од ${name} во библиотеката",
      community_owners: "Сопственици на заедница",
      draft: "Нацрт",
      draft_tooltip: "Прегледување нацрт-верзија",
      draft_general_info: "Претходната нацрт-верзија не постои повеќе и новата нацрт-верзија сега е најновата верзија.",
      draft_review_404_general_info: "Еден од прегледувачите веќе гласаше. Од вас веќе не се вара да ја проверите оваа нацрт-верзија.",
      draft_review_404_request_info: "Претходната нацрт-верзија повеќе не постои, а последната е поднесена на преглед. Се бара преглед.",
      draft_review_404_require_info: "Претходната нацрт-верзија повеќе не постои, а последната е поднесена на преглед. Се бара преглед.",
      draft_review_request_info: "Се бара преглед.",
      draft_review_require_info: "Се бара преглед.",
      error_404: "Нацрт-верзијата е избришана или повеќе не се споделува со вас.",
      error_403: "Не можете да ја погледнете оваа нацрт-верзија затоа што не се споделува со вас.",
      error_preview: "Нацрт-верзијата не е достапна повеќе за преглед.",
      switch_ee: "Погледнете ја објавената верзија",
      switch_ee_tooltip: "Погледнете ја објавената верзија од оваа датотека",
      review: "Преглед",
      reviewers: "Прегледувачи",
      reviwers_addtl: "Дополнителни прегледувачи",
      in_review: "Нацрт-верзија во преглед",
      in_review_tooltip: "Гледање нацрт-верзија во Преглед",
      review_required_any: "Сопствениците на задницата бараат еден прегледувач да ја прегледа оваа нацрт-верзија.",
      review_required_all: "Сопствениците на задницата бараат сите прегледувачи да ја прегледаат оваа нацрт-верзија.",
      review_required_generic: "Сопствениците на задницата бараат овие прегледувачи да ја прегледаат оваа нацрт-верзија.",
      review_additional_required: "Сите прегледувачи што ги додал доставувачот на нацрт-верзијата треба да ја прегледаат оваа нацрт-верзија.",
      reivew_submitted_date: {
         DAY: "${user} ја достави нацрт-верзијата за преглед во ${EEEE} во ${time}.",
         MONTH: "${user} ја достави нацрт-верзијата за преглед на ${MMM} ${d}.",
         TODAY: "${user} ја достави нацрт-верзијата за преглед денеска во ${time}.",
         YEAR: "${user} ја достави нацрт-верзијата за преглед на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "${user} ја достави нацрт-верзијата за преглед вчера во ${time}.",
         TOMORROW: "${user}  ја достави нацрт-верзијата за преглед на ${MMM} ${d}, ${YYYY}."
      },
      pending: "Чека на ред",
      pending_rejected: "Повеќе не е потребно прегледување затоа што нацрт-верзијата беше одбиена",
      approve: "Одобри",
      approved: "Одобрено",
      approve_tooltip: "Одобрете ја оваа нацрт-верзија",
      accept_success: "Ја одобривте оваа нацрт-верзија.",
      accept_error: "Се појави грешка при одобрувањето на оваа  нацрт-верзија. Обидете се повторно.",
      accept_info: "Ја одобривте оваа нацрт-верзија.",
      reject: "Одбиј",
      rejected: "Отфрлено",
      reject_tooltip: "Отфрлете ја оваа нацрт-верзија",
      reject_success: "Ја отфрливте оваа нацрт-верзија.",
      reject_error: "Се појави грешка при отфрлањето на оваа нацрт-верзија. Обидете се повторно.",
      reject_info: "Ја отфрливте оваа нацрт-верзија."
   },
   authUser: {
      error: "Се појави грешка при вчитувањето на тековниот корисник.  ${again}.",
      error_again: "Обидете се повторно",
      error_404: "Не може да се најде автентициран корисник.",
      error_403: "Немате дозвола за вчитување кориснички информации."
   },
   forum: {
      error: "Се појави грешка.  ${again}.",
      error_again: "Обидете се повторно",
      error_404: "Форумот не постои повеќе или немате доволно дозволи за да пристапите до него.",
      error_403: "Немате дозвола да го погледнете овој форум. Форумот не е јавен и не се споделува со вас.",

      readMore: "Погледнете ја целата тема...",
      readMore_tooltip: "Отворете ја темата ${name} од форумот.",
      readMore_a11y: "Активирањето на оваа врска ќе ја отвори темата ${name} од форумот во нов прозорец.",
      QUESTION_ANSWERED: "Оваа прашање е одговорено.",
      QUESTION_NOT_ANSWERED: "Оваа прашање се уште не е одговорено.",

      attachments: "${count} прилози",
      attachments_one: "${count} прилог"
   },
   blog: {
      error: "Се појави грешка.  ${again}.",
      error_again: "Обидете се повторно",
      error_404: "Блогот не постои повеќе или немате доволно дозволи за да пристапите до него.",
      error_403: "Немате дозвола да го погледнете овој блог. Блогот не е јавен и не се споделува со вас.",
      readMore: " Прочитајте повеќе ...",
      readMore_tooltip: "Отворете го написот ${name} на блогот.",
      readMore_a11y: "Активирањето на оваа врска ќе го отвори написот ${name} на блогот во нов прозорец.",
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
  					TEXT: 		"<span class='lotusLikeDescription'>Гласано</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Гласано - врати' href='javascript:;' id='TOGGLE_${id}'>Врати</a>",
  					TOOLTIP: 	"Отстранете го вашиот глас од ова"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 луѓе гласале за ова"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 лице гласало за ова"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} гласале за ова"
  				}
  			},
  			LOADING: "Вчитување...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Гласано"
  			}
  		}
   },
   idea: {
	  error_404: "Не можеме да го зачуваме вашиот глас затоа што или сте го достигнале вашето ограничување за гласање или идејата повеќе не е достапна за вас.",
      readMore_tooltip: "Отворете ја идејата ${name}.",
      readMore_a11y: "Активирањето на оваа врска ќе ја отвори идејата ${name} во нов прозорец."
   },
   size: {
      B: "${0} Б",
      KB: "${0} КГ",
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
      NAVIGATE_TO_REPLY: "Одете до надредениот одговор",
      NAVIGATE_TO_TOPIC: "Одете до надредената тема",
      ADD_COMMENT: "Одговори на оваа тема",
      ADD_COMMENT_TOOLTIP: "Одговорете на оваа тема од форумот",
      SHOWING_RECENT_REPLIES: "Се прикажуваат ${0} најскорешни одговори",
      PREV_COMMENTS: "Прикажи повеќе одговори",
      PLACEHOLDER_TXT: "Одговори на оваа тема",
      EMPTY: "Нема одговори.",
      TRIM_LONG_COMMENT: "Да се скрати одговорот?",
      WARN_LONG_COMMENT: "Одговорот е предолг.  ${shorten}",
      ERROR: "Се појави грешка при вчитувањето на одговорите. ${again}",
      ERROR_CREATE: "Одговорот не може да се зачува.  Обидете се повторно подоцна.",
      ERROR_CREATE_NOT_FOUND: "Одговорот не може да се зачува затоа што темата е избришана или повеќе не можете да ја видите.",
      ERROR_CREATE_ACCESS_DENIED: "Одговорот не може да се зачува затоа што темата е избришана или повеќе не можете да ја видите.",
      ERROR_CREATE_TIMEOUT: "Одговорот не мое да се зачува затоа што не може да се воспостави контакт со серверот.  Кликнете „Зачувај“ за да се обидете повторно.",
      ERROR_CREATE_CANCEL: "Одговорот не може да се зачува затоа што барањето беше откажано.  Кликнете „Зачувај“ за да се обидете повторно.",
      ERROR_CREATE_NOT_LOGGED_IN: "Мора да сте најавени за да го создадете одговорот.  Кликнете „Зачувај“ за потсетник за најава.",
      ERROR_NO_CONTENT: "Внесете го одговорот и кликнете 'Зачувај'.  Ако повеќе не сакате да оставите одговор, кликнете 'Откажи'.",
      ERROR_UNAUTHORIZED: "Одговорот не може да се зачува затоа што немате авторизација за да оставите одговор.",
      COMMENT_DELETED: {
         DAY: "Одговорот го избриша ${user} во ${EEEE} во ${time}",
         MONTH: "Одговорот го избриша ${user} на ${MMM} ${d}",
         TODAY: "Одговорот го избриша ${user} денеска во ${time}",
         YEAR: "Одговорот го избриша ${user} на ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Одговорот го избриша ${user} вчера во ${time}",
         TOMORROW: "Одговорот го избриша ${user} на ${MMM} ${d}, ${YYYY}"
      },
      REASON_FOR_DELETION: "Причина за бришењето: ${reason}",
      REPLY_TITLE: "Од: ${0}",
      SHOW_FULL_REPLY: "Погледнете го целиот одговор",
      SHOW_FULL_REPLY_TOOLTIP: "Одете до оригиналниот одговор во темата од форумот",
      REPLY_ACTION: "Одговор",
      REPLY_ACTION_TOOLTIP: "Одговорете на овој напис",
      MODERATION_PENDING: "Одговорот чека проверка.",
      MODERATION_QUARANTINED: "Модераторот го стави написот во карантин.",
      MODERATION_REMOVED: {
         DAY: "Одговорот го отстрани ${user} во ${EEEE} во ${time}.",
         MONTH: "Одговорот го отстрани ${user} на ${MMM} ${d}.",
         TODAY: "Одговорот го отстрани ${user} денеска во ${time}.",
         YEAR: "Одговорот го отстрани ${user} на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Одговорот го отстрани ${user} вчера во ${time}.",
         TOMORROW: "Одговорот го отстрани ${user} на ${MMM} ${d}, ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "Одговорот го одби ${user} во ${EEEE} во ${time}.",
         MONTH: "Одговорот го одби ${user} на ${MMM} ${d}.",
         TODAY: "Одговорот го одби ${user} денеска во ${time}.",
         YEAR: "Одговорот го одби ${user} на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Одговорот го одби ${user} вчера во ${time}.",
         TOMORROW: "Одговорот го одби ${user} на ${MMM} ${d}, ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Одговорот е поднесен за проверка и ќе биде достапен по одобрувањето."
   },
   COMMENTS: {
      ARIA_LABEL: "Коментари",
      PLACEHOLDER_TXT: "Додадете коментар",
      TAB_TITLE: "Коментари (${0})",
      ACTION_NOT_SUPPORTED: "Неподдржано дејство",
      ADD_COMMENT: "Додај коментар",
      ADD_COMMENT_TOOLTIP: "Додај коментар на оваа ставка",
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
      EDIT_TOOLTIP: "Уреди го коментарот",
      ERROR_CREATE: "Коментарот не може да се зачува.  Обидете се повторно подоцна.",
      ERROR_CREATE_NOT_FOUND: "Коментарот не може да се зачува затоа што ставката е избришана или повеќе не е видлива за вас.",
      ERROR_CREATE_ACCESS_DENIED: "Коментарот не може да се зачува затоа што ставката е избришана или повеќе не е видлива за вас.",
      ERROR_CREATE_TIMEOUT: "Коментарот не може да се зачува бидејќи не може да се контактира со серверот.  Кликнете „Објави“ за да се обидете повторно.",
      ERROR_CREATE_CANCEL: "Коментарот не може да се зачува затоа што барањето беше откажано.  Кликнете „објави“ за да се обидете повторно.",
      ERROR_CREATE_NOT_LOGGED_IN: "Мора да сте најавени за да го создадете овој коментар.  Кликнете „Објави“ за потсетник за најава.",
      ERROR_DELETE: "Коментарот не може да се избрише.  Обидете се повторно подоцна.",
      ERROR_DELETE_TIMEOUT: "Коментарот не може да се избрише бидејќи не може да се контактира со серверот.  Кликнете „Избриши“ за да се обидете повторно.",
      ERROR_DELETE_NOT_FOUND: "Коментарот не може да се избрише затоа што  коментарот или ставката се избришани или повеќе не се видливи за вас.",
      ERROR_DELETE_ACCESS_DENIED: "Коментарот не може да се избрише затоа што ставката е избришана или повеќе не е видлива за вас.",
      ERROR_DELETE_CANCEL: "Коментарот не може да се избрише затоа што барањето беше откажано.  Кликнете „Избриши“ за да се обидете повторно.",
      ERROR_DELETE_NOT_LOGGED_IN: "Мора да сте најавени за да го избришете коментарот.  Кликнете „Избриши“ за потсетник за најава.",
      ERROR_EDIT: "Коментарот не може да се ажурира.  Обидете се повторно подоцна.",
      ERROR_EDIT_ACCESS_DENIED: "е избришана или повеќе не е видлива за вас.",
      ERROR_EDIT_NOT_FOUND: "е избришана или повеќе не е видлива за вас.",
      ERROR_EDIT_TIMEOUT: "Коментарот не може да се ажурира затоа што не може да се воспостави контакт со серверот.  Кликнете „објави“ за да се обидете повторно.",
      ERROR_EDIT_CANCEL: "Коментарот не може да се ажурира затоа што барањето беше откажано.  Кликнете „објави“ за да се обидете повторно.",
      ERROR_EDIT_NOT_LOGGED_IN: "Мора да сте најавени за да го уредите коментарот.  Кликнете „Објави“ за потсетник за најава.",
      ERROR_NO_CONTENT: "Внесете коментар и кликнете „Објави“.  Ако не сакате да оставите коментар, кликнете „Откажи“.",
      ERROR_NO_CONTENT_EDIT: "Внесете коментар и кликнете „Објави“.  Ако не сакате да го уредите коментарот, кликнете 'Откажи'.",
      ERROR_UNAUTHORIZED: "Коментарот не може да се зачува затоа што немате авторизација за да оставите одговор.",
      ERROR_GENERAL: "Се појави грешка.",
      OK: "ОК",
      YES: "Да",
      TRIM_LONG_COMMENT: "Скрати коментар?",
      WARN_LONG_COMMENT: "Коментарот е премногу долг.  ${shorten}",
      LINK: "Врска",
      SAVE: "Зачувај",
      POST: "Објави",
      SHOWMORE: "Прочитај повеќе...",
      VIEW_COMMENTS_FILE: "Види ги коментарите за оваа датотека",
      SUBSCRIBE_TO_COMMENTS: "Претплатете се на овие коментари",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Следете ги измените на овие коментари преку читачот за навестување на содржината",
      PROFILE_TITLE: "Отворете го профилот на ${user}.",
      PROFILE_A11Y: "Со активирање на оваа врска, се отвора профилот на ${user} во нов прозорец.",
      MODERATION_PENDING: "Коментарот чека на ред за преглед.",
      MODERATION_REMOVED: {
         DAY: "Коментарот го отстрани ${user} во ${EEEE} во ${time}.",
         MONTH: "Коментарот го отстрани ${user} на ${MMM} ${d}.",
         TODAY: "Коментарот го отстрани ${user} денеска во ${time}.",
         YEAR: "Коментарот го отстрани ${user} на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Коментарот го отстрани ${user} вчера во ${time}.",
         TOMORROW: "Коментарот го отстрани ${user} на ${MMM} ${d}, ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "Коментарот го одби ${user} во ${EEEE} во ${time}.",
         MONTH: "Коментарот го одби ${user} на ${MMM} ${d}.",
         TODAY: "Коментарот го одби ${user} денеска во ${time}.",
         YEAR: "Коментарот го одби ${user} на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Коментарот го одби ${user} вчера во ${time}.",
         TOMORROW: "Коментарот го одби ${user} на ${MMM} ${d}, ${YYYY}."
      },
      PREV_COMMENTS: "Прикажи ги претходните коментари",
      EMPTY: "Нема коментари.",
      ERROR_ALT: "Грешка",
      ERROR: "Се појави грешка при вчитувањето на коментарите. ${again}",
      ERROR_ADDTL: "Се појави грешка при вчитувањето на дополнителните коментари. ${again}",
      ERROR_AGAIN: "Обидете се повторно.",
      ERROR_AGAIN_TITLE: "Повторно обидете се со барањето за повеќе коментари.",
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
         DAY: "Коментарот го избриша ${user} во ${EEEE} во ${time}",
         MONTH: "Коментарот го избриша ${user} на ${MMM} ${d}",
         TODAY: "Коментарот го избриша ${user} денеска во ${time}",
         YEAR: "Коментарот го избриша ${user} на ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Коментарот го избриша ${user} вчера во ${time}",
         TOMORROW: "Коментарот го избриша ${user} на ${MMM} ${d}, ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} го уреди во ${EEEE} во ${time} (верзија ${version})",
         MONTH: "${user} го уреди ${MMM} ${d} (верзија ${version})",
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
         ACTION: "Означи како несоодветно",
         DESCRIPTION_LABEL: "Наведете причина за означувањето на оваа ставка (изборно)",
         EDITERROR: "Мета податоците за датотеката не се уредени поради грешка.",
         OK: "Зачувај",
         ERROR_SAVING: "Се појави грешка при обработката на барањето. Обидете се повторно подоцна.",
         SUCCESS_SAVING: "Означувањето е поднесено. Модераторот ќе го провери наскоро.",
         TITLE: "Означете ја оваа ставка како несоодветна",
         COMMENT: {
            TITLE: "Означете го овој коментар како несоодветен.",
            A11Y: "Ова копче отвора дијалог што му овозможува на корисникот да го означи коментарот како несоодветен."
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
      CONFIRM: "Скратувањето ќе го отстрани текстот над ограничувањето на коментарот.  Кликнете „OK“ за да го скратите или кликнете „Откажи“ за сами да го уредите коментарот.",
      DIALOG_TITLE: "Скрати коментар",
      NAME: "Скрати коментар",
      OK: "ОК",
      TOOLTIP: "Скрати коментар"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Потврда за поднесување",
      CONFIRM: "Коментарот е поднесен за проверка и ќе биде достапен по одобрувањето.",
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

      ADDED: { DAY: "Додадено во ${EEee} во ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Додадено ${date_long}",
         TODAY: "Додадено денеска во ${time}",
         YEAR: "Додадено ${date_long}",
         YESTERDAY: "Додадено вчера во ${time}"
      },

      LAST_UPDATED: { DAY: "Последен пат ажурирано во ${EEee} во ${time}",
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
         FULL: "${EEEE}, ${date_long} ${time_long} ",
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
         FULL: "${EEEE}, ${date_long} ${time_long} ",
         MONTH: "${date_short} во ${time}",
         TODAY: "${date_short} во ${time}",
         YEAR: "${date_short} во ${time}",
         YESTERDAY: "${date_short} во ${time}",
         TOMORROW: "${date_short} во ${time}"
      },

      DATE_ONLY: { DAY: "${date_short}",
         FULL: "${EEEE}, ${date_long} ",
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
      ERROR_REQUEST_TIMEOUT: "Серверот не може да се контактира.",
      ERROR_REQUEST_UNKNOWN: "Се појави непозната грешка.",
      LOADING: "Вчитување ..",
      NO_VERSIONS: "Нема верзии",
      INFO: "Верзија ${0} ја создаде ${1} ",
      VERSION_NUMBER: "Верзија ${0}",
      DELETED: "Избришано",
      DELETE_ALL: "Избриши ги сите претходни верзии на верзијата",
      DELETE_VERSION_SINGLE: "Избриши верзија ${0}",
      DELETEERROR: "Верзијата не се избриша поради грешка.",
      CREATE_VERSION: "Создај нова верзија",
      CREATE_VERSION_TOOLTIP: "Создај верзија на датотеката",
      REVERT_VERSION: "Обнови ја верзијата ${0}",
      REVERT_DESCRIPTION: "Обновено од верзија ${0}",
      PREVIOUS: "Претходно",
      PREVIOUS_TOOLTIP: "Претходна страница",
      ELLIPSIS: "...",
      NEXT: "Следно",
      NEXT_TOOLTIP: "Следна страница",
      COUNT: "${0}-${1} од ${2}",
      COUNT_SHORT: "${0} - ${1}",
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
            FULL: "${EEEE}, ${date_long} ${time_long} ",
            MONTH: "Ажурирано ${date_short}",
            TODAY: "Ажурирано денеска во ${time}",
            YESTERDAY: "Ажурирано вчера во ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Избришете ја верзијата ${0}",
         DOWNLOAD: "Преземи",
         DOWNLOAD_TOOLTIP: "Преземете ја оваа верзија (${0})",
         VIEW: "Прикажи",
         VIEW_TOOLTIP: "Прикажете ја верзијата ${0}",
         REVERT: {
            A11Y: "Ова копче отвора дијалог што му овозможува на корисникот да го потврди обновувањето на датотека од претходна верзија. Со потврдување на ова дејство, ќе се освежи содржината на страницата.",
            FULL: "Обнови",
            WIDGET: "Обнови ја оваа верзија"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "Верзијата не може да се избрише затоа што веќе е избришана или повеќе не е видлива за вас.",
         ERROR_ACCESS_DENIED: "Верзијата не може да се избрише затоа што вие не сте уредник.",
         ERROR_TIMEOUT: "Верзијата не се избриша затоа што не може да се воспостави контакт со серверот.  Кликнете повторно „Избриши“ за да се повтори барањето.",
         ERROR_CANCEL: "Верзијата не се избриша затоа што барањето беше откажано.  Кликнете повторно „Избриши“ за да се повтори барањето.",
         ERROR_NOT_LOGGED_IN: "Мора да сте најавени  за да ја избришете оваа верзија.  Кликнете „Избриши“ за потсетник за најава.",
         GENERIC_ERROR: "Верзијата не може да се избрише поради непозната грешка.  Кликнете повторно „Избриши“ за да се повтори барањето.",
         FULL: "Избриши",
         A11Y: "Ова копче отвора дијалог што му овозможува на корисникот да го потврди бришењето на оваа верзија. Со потврдување на ова дејство, ќе се освежи содржината на страницата."
      },

      REVERT: {
         ERROR_NOT_FOUND: "Верзијата не може да се обнови затоа што е избришана или повеќе не е видлива за вас.",
         ERROR_ACCESS_DENIED: "Верзијата не може да се обнови затоа што вие не сте уредник",
         ERROR_NAME_EXISTS: "Верзијата не може да се обнови затоа што има датотека со истото име.",
         ERROR_TIMEOUT: "Верзијата не се обнови затоа што не може да се воспостави контакт со серверот.  Кликнете „Обнови“ за да се повтори барањето.",
         ERROR_CANCEL: "Верзијата не се обнови затоа што барањето беше откажано.  Кликнете „Обнови“ за да се повтори барањето.",
         ERROR_QUOTA_VIOLATION: "Верзијата не може да се обнови поради ограничување на просторот.",
         ERROR_MAX_CONTENT_SIZE: "Верзијата не може да се обнови затоа што е поголема од максималната дозволена големина од ${0}",
         GENERIC_ERROR: "Верзијата не може да се обнови поради непозната грешка.  Кликнете „Обнови“ за да се повтори барањето."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Видете кој презел...",
      PREVIOUS: "Претходно",
      PREVIOUS_TOOLTIP: "Претходна страница",
      ELLIPSIS: "...",
      NEXT: "Следно",
      NEXT_TOOLTIP: "Следна страница",
      COUNT: "${0}-${1} од ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Страница",
      SHOW: "Покажи",
      ITEMS_PER_PAGE: " ставки на страница.",
      VERSION: {
         DAY: "Верзија ${version} на ${date}",
         MONTH: "Верзија ${version} на ${date}",
         TODAY: "Верзија ${version} во ${time}",
         YEAR: "Верзија ${version} на ${date}",
         YESTERDAY: "Верзија${version} вчера"
      },

      FILE: {
         V_LATEST: "Ја презедовте најновата верзија од датотеката",
         V_OLDER: "Последниот пат, ја презедовте верзијата ${0} на оваа датотека",
         LOADING: "Вчитување...",
         EMPTY: "Само за анонимни корисници",
         ERROR: "Не може да се вчитаат преземаните информации"
      }
   },

   EE_DIALOG: {
      ERROR: "Грешка",
      ERROR_ALT_TEXT: "Грешка:",
      ERROR_MSG_GENERIC: "Нешто не е во ред.  Обидете се подоцна повторно.",
      ERROR_MSG_NOT_AVAILABLE: "Ставката е избришана или повеќе не е достапна.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Содржината за оваа ставка не е достапна.",
      ERROR_MSG_NO_ACCESS: "Повеќе немате пристап до оваа ставка.",
      LOADING: "Вчитување...",
      TITLE_SU: "${author} објави порака.",
      TITLE_NI: "${author} ве поканија да се придужите на нивната мрежа.",
      AUTHOR_TITLE: "Погледнете го профилот за ${author}",
      OPEN_LINK: "Отвори ${title}",
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
      error_404: "Ажурирањето на статусот не постои повеќе.",
      notifications: {
         STATUS_UPDATE: "${user} објави порака.",
         USER_BOARD_POST: "${user} напиша на вашата табла",
         POST_COMMENT: "${user} напиша:"
      }
   },
   login: {
      error: "Корисничкото име и/или лозинката не се совпаѓаат со ниту една постоечка сметка. Обидете се подоцна повторно.",
      logIn: "Најави се",
      password: "Лозинка:",
      user: "Корисничко име:",
      welcome: "Најавете се на HCL Connections"
   },
   repost: {
      name: "Објави повторно",
      title: "Објави го повторно ова ажурирање до моите следбеници или заедници",
      msg_success: "Ажурирањето е успешно објавено до вашите следбеници.",
      msg_generic: "Нешто не е во ред.  Обидете се подоцна повторно."
   },
   FILE_SHARE_INFO: {
      ADD: "Додај",
      ADD_TXT: "Додај луѓе или заедници како читатели",
      SHOW_MORE: "Прикажи повеќе...",
      READER_IF_PUBLIC: "Секој (јавно)",
      READER_IF_PUBLIC_TOOLTIP: "Датотеката е јавна и видлива за сите",
      EMPTY_READERS: "Нема",
      READERS_LABEL: "Читатели: ",
      EDITORS_LABEL: "Уредници: ",
      OWNER_LABEL: "Сопственик: ",
      ERROR: "Не може да се вчитаат споделените информации",
      ERROR_NOT_FOUND: "Датотеката што ја побаравте е избришана или преместена. Ако некој ви ја испратил врската, проверете дали е точна.",
      ERROR_ACCESS_DENIED: "Немате дозвола за прикажување на датотеката.  Датотеката не е јавна и не се споделува со вас.",
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
      A11Y_READER_ADDED: "Избран ${0} како читател",
      A11Y_READER_REMOVED: "Отстранет ${0} како читател",
      SELF_REFERENCE_ERROR: "Не може да споделувате сами со себе.",
      OWNER_REFERENCE_ERROR: "Не може да споделувате со сопственикот на датотеката.",
      SHARE_COMMUNITY_WARN: "Споделувањето со јавната заедница '${0}' веќе ја направи оваа датотека јавна.",
      SELECT_USER_ERROR: "Мора да изберете барем едно лице или заедница за да споделувате со нив",
      WARN_LONG_MESSAGE: "Пораката е премногу долга.",
      TRIM_LONG_MESSAGE: "Скрати порака?",
      ERROR_SHARING: "Датотеката не може да се сподели.  Обидете се повторно подоцна.",
      INFO_SUCCESS: "Датотеката е успешно споделена.",
      MAX_SHARES_ERROR: "Надминат е максималниот број на споделувања.",
      NOT_LOGGED_IN_ERROR: "Датотеката не се сподели затоа што не бевте најавени.  Кликнете „Сподели“ за да ја споделите датотеката.",
      TIMEOUT_ERROR: "Датотеката не се сподели затоа што не може да се воспостави контакт со серверот.  Кликнете „Сподели“ за да се обидете повторно.",
      CANCEL_ERROR: "Датотеката не се сподели бидејќи барањето беше откажано.  Кликнете „Сподели“ за да се обидете повторно.",
      NOT_FOUND_ERROR: "Датотеката е избришана или повеќе не е видлива за вас и не може да се сподели.",
      ACCESS_DENIED_ERROR: "Повеќе немате дозвола за да ја споделите датотеката.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Ограничената датотека не може да биде јавна.",
      TOOLTIP: "Дајте им пристап на други до оваа датотека"
   },
   HISTORY: {
      TAB_TITLE: "Најнови ажурирања",
      NO_HISTORY: "Нема скорешни ажурирања.",
      EMPTY: "Не можат да се вчитаат скорешни ажурирања за оваа ставка. Избришана е или повеќе немате пристап до неа.",
      MORE: "Прикажи претходни ажурирања",
      ERROR_ALT: "Грешка",
      ERROR: "Се појави грешка при вчитувањето на ажурирањата. ${again}",
      ERROR_ADDTL: "Се појави грешка при вчитувањето на дополнителните ажурирања. ${again}",
      ERROR_AGAIN: "Обидете се повторно.",
      ERROR_AGAIN_TITLE: "Повторно обидете се со барањето за повеќе ажурирања.",
      PROFILE_TITLE: "Отворете го профилот на ${user}.",
      SORT_BY: "Сортирај според\:",
      SORTS: {
         DATE: "Датум",
         DATE_TOOLTIP: "Сортирај од најскорешната историја до најстарите ажурирања",
         DATE_TOOLTIP_REVERSE: "Сортирај од најстарата историја до најскорешните ажурирања"
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
       REPLY_ACTION_TOOLTIP: "Одговори на овој коментар"
   },
   OAUTH: {
      welcomeHeader: "Добре дојдовте во Connections",
      continueBtnLabel: "Продолжи",
      continueBtnA11y: "Активирањето на оваа врска ќе отвори нов прозорец што ќе ви дозволи да авторизирате пристап до Connections.",
      clickHere: "Кликнете овде",
      infoMsg: "На Connections му е потребна вашата авторизација за да пристапи до вашите податоци.",
      authorizeGadget: "${clickHere} за да дозволите оваа апликација да пристапи до вашите информации за Connections.",
      confirmAuthorization: "${clickHere} за да потврдите дека сте дозволиле оваа апликација да пристапи до вашите информации за Connections."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Активирањето на оваа врска ќе отвори нов прозорец што ќе ви дозволи да авторизирате пристап до складиштето Библиотека на Connections.",
      infoMsg: "На складиштето Библиотека на Connections му е потребна вашата авторизација за да пристапи до вашите податоци.",
      authorizeGadget: "${clickHere} за да дозволите оваа апликација да пристапи до вашите информации за складиштето Библиотека на Connections.",
      confirmAuthorization: "${clickHere} за да потврдите дека сте дозволиле оваа апликација да пристапи до вашите информации за складиштето Библиотека на Connections."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Откажи",
      CONFIRM: "Дали сте сигурни дека сакате да ги напуштите измените?  Притиснете „OK“ за да продолжите, или „Откажи“ за да се вратите.",
      DIALOG_TITLE: "Потврди",
      NAME: "Потврди",
      OK: "ОК",
      TOOLTIP: "Потврди"
   }
})

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
         label: "Повече",
         tooltip: "Повече действия"
       },
       tags_more: "и още ${0}",
       ERROR_ALT: "Грешка",
       PERSON_TITLE: "Отворете профила на ${user}.",
       inactiveUser: "${user} (неактивни)",
       inactiveIndicator: "(неактивно)",
       like_error: "Харесването не можа да се запише. Моля, опитайте отново по-късно.",
       vote_error: "Вашият глас не можа да бъде запазен. Моля, опитайте отново по-късно."
   },
   generic: {
      untitled: "(Неозаглавен)",
      tags: "Етикети:",
      tags_more: "и още ${0}",
      likes: "Харесвания",
      comments: "Коментари",
      titleTooltip: "Навигиране към ${app}",
      error: "Данните не могат да се извлекат.",
      timestamp: {
         created: {
            DAY: "Създадено ${EEEE} в ${time}",
            MONTH: "Създаване ${MMM} ${d}",
            TODAY: "Създадено днес в ${time}",
            YEAR: "Създадено на ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Създадено вчера в ${time}",
            TOMORROW: "Създадено на ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Актуализирано ${EEEE} в ${time}",
            MONTH: "Актуализирано ${MMM} ${d}",
            TODAY: "Актуализирано днес в ${time}",
            YEAR: "Актуализирано на ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Актуализирано вчера в ${time}",
            TOMORROW: "Актуализирано на ${MMM} ${d}, ${YYYY}"
         }
      },
      visibility: {
         pub: "Публични",
         priv: "Частни"
      },
      action: {
         created: "Създадено",
         updated: "Актуализирано"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Получете актуализации за лица, които следвате от началната страница и в обобщение на имейла.",
      profile_title: "Отворете профила на ${user}.",
      profile_a11y: "Активирането на тази връзка ще отвори профила на ${user} в нов прозорец.",
      error: "Възникна грешка.  ${again}.",
      error_again: "Моля, опитайте отново",
      error_404: "Мрежовата заявка вече не съществува.",
      warning: "Предупреждение",
      messages: {
         success: {
            accept: {
            	nofollow: "Вече сте контакти в мрежата.",
            	follow: "Вече сте контакти в мрежата и следвате ${user}."
            },
            ignore: {
            	nofollow: "Игнорирахте поканата.",
            	follow: "Игнорирахте поканата, но сега следвате ${user}."
            }
         },
         error: {
            accept: "Има грешка при приемането на заявката.",
            ignore: "Има грешка при игнорирането на заявката."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} в ${time}",
              MONTH: "${MMM} ${d}",
              TODAY: "Днес в ${time}",
              YEAR: "${MMM} ${d}, ${YYYY}",
              YESTERDAY: "Вчера в ${time}",
              TOMORROW: "${MMM} ${d}, ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "Активирането на тази връзка ще отвори ${name} в нов прозорец.",
      tooltip: "Отваряне на ${name} в приложение Files",
      profile_title: "Отворете профила на ${user}.",
      profile_a11y: "Активирането на тази връзка ще отвори профила на ${user} в нов прозорец.",
      download_tooltip: "Изтегляне на този файл (${0})",
      following: {
         add: "Следване на файл",
         remove: "Спиране на следването",
         title: "Превключване на получаването на актуализации относно файла"
      },
      share: {
         label: "Споделяне",
         title: "Даване на достъп до този файл на останалите"
      },
      timestamp: {
         created: {
            DAY: "Създадено ${EEEE} в ${time}",
            MONTH: "Създаване ${MMM} ${d}",
            TODAY: "Създадено днес в ${time}",
            YEAR: "Създадено на ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Създадено вчера в ${time}",
            TOMORROW: "Създадено на ${MMM} ${d}, ${YYYY}"
         },
         createdOther: {
            DAY: "${user} създаде на ${EEEE} в ${time}",
            MONTH: "${user} създаде на ${MMM} ${d}",
            TODAY: "${user} създаде днес в ${time}",
            YEAR: "${user} създава на ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} създаде вчера в ${time}",
            TOMORROW: "${user} създава на ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Актуализирано ${EEEE} в ${time}",
            MONTH: "Актуализирано ${MMM} ${d}",
            TODAY: "Актуализирано днес в ${time}",
            YEAR: "Актуализирано на ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Актуализирано вчера в ${time}",
            TOMORROW: "Актуализирано на ${MMM} ${d}, ${YYYY}"
         },
         updatedOther: {
            DAY: "${user} актуализира на ${EEEE} в ${time}",
            MONTH: "${user} актуализира на ${MMM} ${d}",
            TODAY: "${user} актуализира днес в ${time}",
            YEAR: "${user} актуализира на ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} актуализира вчера в ${time}",
            TOMORROW: "${user} актуализира на ${MMM} ${d}, ${YYYY}"
         },
         createdCompact: {
            DAY: "Създадено: ${EEEE} в ${time}",
            MONTH: "Създадено: ${MMM} ${d}",
            TODAY: "Създадено: днес в ${time}",
            YEAR: "Създадено: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Създадено: вчера в ${time}",
            TOMORROW: "Създадено: ${MMM} ${d}, ${YYYY}"
         },
         updatedCompact: {
            DAY: "Актуализирано: ${EEEE} в ${time}",
            MONTH: "Актуализирано: ${MMM} ${d}",
            TODAY: "Актуализирано: Днес в ${time}",
            YEAR: "Актуализирано: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Актуализирано: Вчера в ${time}",
            TOMORROW: "Актуализирано: ${MMM} ${d}, ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long} от ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long} от ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "Изтегляне на този файл (${size})",
      	 DOWNLOAD_ALT: "Изтегляне"
      },

      PREVIEW: {
         LINK: "Преглед",
         TITLE: "Преглед на този файл в нов прозорец."
      },
      TAGS: "Етикети:",
      error: "Възникна грешка.  ${again}.",
      error_again: "Моля, опитайте отново",
      error_404: "Файлът вече не съществува или нямате достатъчно разрешения, за да получите достъп до него.",
      error_403: "Нямате разрешение за преглед на този файл. Файлът не е публичен и не е споделен с Вас.",
      notifications: {
         USER_SHARED: "${user} написа:",
         CHANGE_SUMMARY: "${user} предостави резюме на промяната",
         NO_CHANGE_SUMMARY: "${user} не предостави резюме на промяната",
         COMMENTED: "${user} коментира"
      }
   },
   ecm_file: {
      checkedout_you: "Проверено от Вас",
      checkedout_other: "Проверено от ${user}",
      tooltip: "Отваряне на ${name} файл в библиотеката",
      draft_404_info: "Черновата е изтрита или вече не е споделена с Вас. Публикуваната версия вече е последната версия на този файл.",
      error_404: "Файлът е изтрит или вече не е споделен с Вас.",
      error_403: "Файлът е изтрит или вече не е споделен с Вас.",
      error_preview: "Файлът вече не е достъпен за преглед.",
      draft_review_canceled: "Прегледът е анулиран и черновата вече не е споделена с Вас. Вашият преглед вече не е заявен.",
      switch_ee: "Преглед на чернова",
      switch_ee_tooltip: "Преглед на последната чернова за този файл"
   },
   ecm_draft: {
      tooltip: "Отваряне на чернова ${name} в библиотеката",
      community_owners: "Собственици на общност",
      draft: "Чернова",
      draft_tooltip: "Преглед на чернова",
      draft_general_info: "Предишната чернова вече не съществува и по-нова чернова представлява последната версия.",
      draft_review_404_general_info: "Един от преглеждащите вече е гласувал. Към Вас вече няма отправена заявка за преглед на тази чернова.",
      draft_review_404_request_info: "Предишната чернова вече не съществува и последната чернова е изпратена за преглед. Заявен е преглед.",
      draft_review_404_require_info: "Предишната чернова вече не съществува и последната чернова е изпратена за преглед. Необходим е Вашият преглед.",
      draft_review_request_info: "Заявен е преглед.",
      draft_review_require_info: "Необходим е Вашият преглед.",
      error_404: "Черновата е изтрита или вече не е споделена с Вас.",
      error_403: "Не можете да видите тази чернова, тъй като тя не е споделена с Вас.",
      error_preview: "Черновата вече не е достъпна за преглед.",
      switch_ee: "Преглед на публикувана версия",
      switch_ee_tooltip: "Преглед на публикуваната версия за този файл",
      review: "Преглед",
      reviewers: "Преглеждащи",
      reviwers_addtl: "Допълнителни преглеждащи",
      in_review: "Чернова в преглед",
      in_review_tooltip: "Разглеждане на чернова в преглед",
      review_required_any: "Собствениците на общността изискват един преглеждащ да разгледа тази чернова.",
      review_required_all: "Собствениците на общността изискват всички преглеждащи да разгледат тази чернова.",
      review_required_generic: "Собствениците на общността изискват тези преглеждащи да разгледат тази чернова.",
      review_additional_required: "Всички преглеждащи, добавени от подаващия черновата, трябва да разгледат тази чернова.",
      reivew_submitted_date: {
         DAY: "${user} подаде чернова за преглед на ${EEEE} в ${time}.",
         MONTH: "${user} подаде чернова за преглед на ${MMM} ${d}.",
         TODAY: "${user} подаде чернова за преглед днес в ${time}.",
         YEAR: "${user} подаде чернова за преглед на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "${user} подаде чернова за преглед вчера в ${time}.",
         TOMORROW: "${user} подаде чернова за преглед на ${MMM} ${d}, ${YYYY}."
      },
      pending: "Изчакващи",
      pending_rejected: "Вече не е нужен преглед, тъй като черновата е отхвърлена",
      approve: "Одобряване",
      approved: "Одобрен",
      approve_tooltip: "Одобряване на тази чернова",
      accept_success: "Вие одобрихте тази чернова.",
      accept_error: "Възникна грешка при одобряването на тази чернова. Опитайте отново.",
      accept_info: "Вие одобрихте тази чернова.",
      reject: "Отхвърляне",
      rejected: "Отхвърлено",
      reject_tooltip: "Отхвърляне на тази чернова",
      reject_success: "Вие отхвърлихте тази чернова.",
      reject_error: "Възникна грешка при отхвърлянето на тази чернова. Опитайте отново.",
      reject_info: "Вие отхвърлихте тази чернова."
   },
   authUser: {
      error: "Възникна грешка при извличането на текущия потребител.  ${again}.",
      error_again: "Моля, опитайте отново",
      error_404: "Не е намерен разпознаваем потребител.",
      error_403: "Нямате разрешение да извлечете потребителска информация."
   },
   forum: {
      error: "Възникна грешка.  ${again}.",
      error_again: "Моля, опитайте отново",
      error_404: "Форумът вече не съществува или нямате достатъчно разрешения, за да получите достъп до него.",
      error_403: "Нямате разрешение да видите този форум. Форумът не е публичен и не е споделен с Вас.",

      readMore: "Преглед на цялата тема...",
      readMore_tooltip: "Отваряне на тема ${name} от форума.",
      readMore_a11y: "Активирането на тази връзка ще отвори тема ${name} от форума в нов прозорец.",
      QUESTION_ANSWERED: "Този въпрос има отговор.",
      QUESTION_NOT_ANSWERED: "Този въпрос още няма отговор.",

      attachments: "${count} Прикачени файла",
      attachments_one: "${count} Прикачен файл"
   },
   blog: {
      error: "Възникна грешка.  ${again}.",
      error_again: "Моля, опитайте отново",
      error_404: "Блогът вече не съществува или нямате достатъчно разрешения, за да получите достъп до него.",
      error_403: "Нямате разрешения да видите този блог. Блогът не е публичен и не е споделен с Вас.",
      readMore: " Прочети още...",
      readMore_tooltip: "Отваряне на запис ${name} от блога.",
      readMore_a11y: "Активирането на тази връзка ще отвори запис ${name} от блога в нов прозорец.",
      graduated: "Завършили",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Гласуване</a>",
  					TOOLTIP: 	"Гласувай за това"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Гласуване</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Voted</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Отменяне</a>",
  					TOOLTIP: 	"Премахнете своя глас от това"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 лица са гласували за това"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 лице е гласувало за това"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} са гласували за това"
  				}
  			},
  			LOADING: "Зареждане...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Гласувано"
  			}
  		}
   },
   idea: {
	  error_404: "Не можем да запишем гласа Ви, защото или сте достигнали лимита за гласуване, или идеята вече не е достъпна за Вас.",
      readMore_tooltip: "Отваряне на идея ${name}.",
      readMore_a11y: "Активирането на тази връзка ще отвори идея ${name} в нов прозорец."
   },
   size: {
      B: "${0} Б",
      KB: "${0} КБ",
      MB: "${0} МБ",
      GB: "${0} ГБ"
   },
   REPLIES: {
      ARIA_LABEL: "Отговори",
      THIS_ARIA_LABEL: "Този отговор",
      THIS_TAB_TITLE: "Този отговор",
      TAB_TITLE: "Отговори (${0})",
      REPLY_TO_REPLY: "В отговор на ${thisReply}",
      REPLY_TO_TOPIC: "В отговор на ${thisTopic}",
      THIS_TOPIC: "тази тема",
      THIS_REPLY: "този отговор",
      NAVIGATE_TO_REPLY: "Навигиране до родителския отговор",
      NAVIGATE_TO_TOPIC: "Навигиране до родителската тема",
      ADD_COMMENT: "Отговаряне на тази тема",
      ADD_COMMENT_TOOLTIP: "Отговори на тази тема от форума",
      SHOWING_RECENT_REPLIES: "Показване на ${0} последни отговора",
      PREV_COMMENTS: "Показване на повече отговори",
      PLACEHOLDER_TXT: "Отговаряне на тази тема",
      EMPTY: "Няма отговори.",
      TRIM_LONG_COMMENT: "Съкращаване на отговора?",
      WARN_LONG_COMMENT: "Отговорът е твърде дълъг.  ${shorten}",
      ERROR: "Възникна грешка при извличането на отговорите. ${again}",
      ERROR_CREATE: "Отговорът не можа да се запише.  Опитайте отново по-късно.",
      ERROR_CREATE_NOT_FOUND: "Отговорът не можа да се запише, тъй като темата е била изтрита или повече не е видима за Вас.",
      ERROR_CREATE_ACCESS_DENIED: "Отговорът не можа да се запише, тъй като темата е била изтрита или повече не е видима за Вас.",
      ERROR_CREATE_TIMEOUT: "Отговорът не можа да се запише, защото няма връзка със сървъра.  Щракнете върху 'Записване', за да опитате отново.",
      ERROR_CREATE_CANCEL: "Отговорът не можа да се запише, защото заявката е отказана.  Щракнете върху 'Записване', за да опитате отново.",
      ERROR_CREATE_NOT_LOGGED_IN: "Трябва да сте влезли, за да създадете този отговор.  Щракнете върху 'Записване', за да бъдете подканени да влезете.",
      ERROR_NO_CONTENT: "Въведете отговора и щракнете върху 'Запис'.  Ако вече не искате да оставите отговор, щракнете върху 'Отказ'.",
      ERROR_UNAUTHORIZED: "Отговорът не можа да се запише, защото не сте упълномощени да оставяте отговор.",
      COMMENT_DELETED: {
         DAY: "Отговорът е изтрит от ${user} на ${EEEE} в ${time}",
         MONTH: "Отговорът е изтрит от ${user} на ${MMM} ${d}",
         TODAY: "Отговорът е изтрит от ${user} днес в ${time}",
         YEAR: "Отговорът е изтрит от ${user} на ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Отговорът е изтрит от ${user} вчера в ${time}",
         TOMORROW: "Отговорът е изтрит от ${user} на ${MMM} ${d}, ${YYYY}"
      },
      REASON_FOR_DELETION: "Причина за изтриване: ${reason}",
      REPLY_TITLE: "Отговор: ${0}",
      SHOW_FULL_REPLY: "Преглед на пълен отговор",
      SHOW_FULL_REPLY_TOOLTIP: "Навигиране към оригиналния отговор в темата от форума",
      REPLY_ACTION: "Отговаряне",
      REPLY_ACTION_TOOLTIP: "Отговори на тази публикация",
      MODERATION_PENDING: "Този отговор чака преглеждане.",
      MODERATION_QUARANTINED: "Публикацията е под карантина от модератора.",
      MODERATION_REMOVED: {
         DAY: "Този отговор е премахнат от ${user} на ${EEEE} в ${time}.",
         MONTH: "Този отговор е премахнат от ${user} на ${MMM} ${d}.",
         TODAY: "Този отговор е премахнат от ${user} днес в ${time}.",
         YEAR: "Този отговор е премахнат от ${user} на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Този отговор е премахнат от ${user} вчера в ${time}.",
         TOMORROW: "Този отговор е премахнат от ${user} на ${MMM} ${d}, ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "Този отговор е отхвърлен от ${user} на ${EEEE} в ${time}.",
         MONTH: "Този отговор е отхвърлен от ${user} на ${MMM} ${d}.",
         TODAY: "Този отговор е отхвърлен от ${user} днес в ${time}.",
         YEAR: "Този отговор е отхвърлен от ${user} на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Този отговор е отхвърлен от ${user} вчера в ${time}.",
         TOMORROW: "Този отговор е отхвърлен от ${user} на ${MMM} ${d}, ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Отговорът е подаден за преглед и ще бъде достъпен след одобрение."
   },
   COMMENTS: {
      ARIA_LABEL: "Коментари",
      PLACEHOLDER_TXT: "Добавяне на коментар",
      TAB_TITLE: "Коментари (${0})",
      ACTION_NOT_SUPPORTED: "Неподдържано действие",
      ADD_COMMENT: "Добавяне на коментар",
      ADD_COMMENT_TOOLTIP: "Добавяне на коментар към този елемент",
      CANCEL: "Отказ",
      COMMENT_COUNT_ONE: "${0} коментар",
      COMMENT_COUNT_MANY: "${0} коментара",
      COMMENT_LABEL: "Коментар:",
      DELETE: "Изтриване",
      DELETE_TOOLTIP: "Изтриване на коментар",
      DELETEREASON: "Причина за изтриването на този коментар:",
      DIALOG_TITLE: "Съкращаване на коментар",
      TOOLTIP: "Съкращаване на коментар",
      NAME: "Съкращаване на коментар",
      EDIT: "Редактиране",
      EDIT_TOOLTIP: "Редактиране на коментари",
      ERROR_CREATE: "Коментарът не беше записан.  Опитайте отново по-късно.",
      ERROR_CREATE_NOT_FOUND: "Коментарът не можа да се запише, защото елементът е изтрит или вече не е видим за Вас.",
      ERROR_CREATE_ACCESS_DENIED: "Коментарът не можа да се запише, защото елементът е изтрит или вече не е видим за Вас.",
      ERROR_CREATE_TIMEOUT: "Коментарът не беше записан, понеже не може да се осъществи връзка със сървъра.  Щракнете върху 'Публикуване', за да опитате отново.",
      ERROR_CREATE_CANCEL: "Вашият коментар не можа да се запази, защото заявката е отменена.  Щракнете върху 'Публикуване', за да опитате отново.",
      ERROR_CREATE_NOT_LOGGED_IN: "Трябва да сте влезли, за да създадете този коментар.  Щракнете върху 'Публикуване', за да бъдете подканени да влезете.",
      ERROR_DELETE: "Коментарът не беше изтрит.  Опитайте отново по-късно.",
      ERROR_DELETE_TIMEOUT: "Коментарът не беше изтрит, понеже не може да се осъществи връзка със сървъра.  Щракнете върху 'Изтриване', за да опитате отново.",
      ERROR_DELETE_NOT_FOUND: "Коментарът не можа да се изтрие, защото коментарът или елементът е изтрит или вече не е видим за Вас.",
      ERROR_DELETE_ACCESS_DENIED: "Коментарът не можа да се изтрие, защото елементът е изтрит или вече не е видим за Вас.",
      ERROR_DELETE_CANCEL: "Вашият коментар не можа да се изтрие, защото заявката беше отменена.  Щракнете върху 'Изтриване', за да опитате отново.",
      ERROR_DELETE_NOT_LOGGED_IN: "Трябва да сте влезли, за да изтриете този коментар.  Щракнете върху 'Изтриване', за да бъдете подканени да влезете.",
      ERROR_EDIT: "Коментарът не беше актуализиран.  Опитайте отново по-късно.",
      ERROR_EDIT_ACCESS_DENIED: "Коментарът не можа да се актуализира, защото елементът е бил изтрит или повече не е видим за Вас.",
      ERROR_EDIT_NOT_FOUND: "Коментарът не можа да се актуализира, защото елементът е бил изтрит или повече не е видим за Вас.",
      ERROR_EDIT_TIMEOUT: "Коментарът не беше актуализиран, защото не може да се осъществи връзка със сървъра.  Щракнете върху 'Публикуване', за да опитате отново.",
      ERROR_EDIT_CANCEL: "Вашият коментар не можа да се актуализира, защото заявката е отменена.  Щракнете върху 'Публикуване', за да опитате отново.",
      ERROR_EDIT_NOT_LOGGED_IN: "Трябва да сте влезли, за да редактирате този коментар.  Щракнете върху 'Публикуване', за да бъдете подканени да влезете.",
      ERROR_NO_CONTENT: "Въведете коментар и щракнете върху 'Публикуване'.  Ако не желаете повече да оставите коментар, щракнете върху 'Отказ'.",
      ERROR_NO_CONTENT_EDIT: "Въведете коментар и щракнете върху 'Публикуване'.  Ако вече не искате да редактирате коментара си, щракнете върху 'Отказ'.",
      ERROR_UNAUTHORIZED: "Коментарът Ви не можа да се запише, защото не се упълномощени да оставяте коментар.",
      ERROR_GENERAL: "Възникна грешка.",
      OK: "OK",
      YES: "Да",
      TRIM_LONG_COMMENT: "Съкращаване на коментар?",
      WARN_LONG_COMMENT: "Коментарът е прекалено дълъг.  ${shorten}",
      LINK: "Връзка",
      SAVE: "Записване",
      POST: "Публикация",
      SHOWMORE: "Прочетете повече...",
      VIEW_COMMENTS_FILE: "Преглед на коментарите за този файл",
      SUBSCRIBE_TO_COMMENTS: "Абониране за тези коментари",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Следвайте промените на тези коментари чрез четеца на информационни канали",
      PROFILE_TITLE: "Отворете профила на ${user}.",
      PROFILE_A11Y: "Активирането на тази връзка ще отвори профила на ${user} в нов прозорец.",
      MODERATION_PENDING: "Този коментар очаква преглед.",
      MODERATION_REMOVED: {
         DAY: "Този коментар е премахнат от ${user} на ${EEEE} в ${time}.",
         MONTH: "Този коментар е премахнат от ${user} на ${MMM} ${d}.",
         TODAY: "Този коментар е премахнат от ${user} днес в ${time}.",
         YEAR: "Този коментар е премахнат от ${user} на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Този коментар е премахнат от ${user} вчера в ${time}.",
         TOMORROW: "Този коментар е премахнат от ${user} на ${MMM} ${d}, ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "Този коментар е отхвърлен от ${user} на ${EEEE} в ${time}.",
         MONTH: "Този коментар е отхвърлен от ${user} на ${MMM} ${d}.",
         TODAY: "Този коментар е отхвърлен от ${user} днес в ${time}.",
         YEAR: "Този коментар е отхвърлен от ${user} на ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Този коментар е отхвърлен от ${user} вчера в ${time}.",
         TOMORROW: "Този коментар е отхвърлен от ${user} на ${MMM} ${d}, ${YYYY}."
      },
      PREV_COMMENTS: "Показване на предишни коментари",
      EMPTY: "Няма коментари.",
      ERROR_ALT: "Грешка",
      ERROR: "Възникна грешка при извличането на коментарите. ${again}",
      ERROR_ADDTL: "Възникна грешка при извличането на допълнителните коментари. ${again}",
      ERROR_AGAIN: "Опитайте отново.",
      ERROR_AGAIN_TITLE: "Опитайте заявката отново за повече коментари.",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE} в ${time} (версия ${version})",
         MONTH: "${user} ${MMM} ${d} (версия ${version})",
         TODAY: "${user} днес в ${time} (версия ${version})",
         YEAR: "${user} ${MMM} ${d}, ${YYYY} (версия ${version})",
         YESTERDAY: "${user} вчера в ${time} (версия ${version})",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (версия ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} в ${time}",
         MONTH: "${user} ${MMM} ${d}",
         TODAY: "${user} днес в ${time}",
         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} вчера в ${time}",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} в ${time}",
         MONTH: "${MMM} ${d}",
         TODAY: "Днес в ${time}",
         YEAR: "${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Вчера в ${time}",
         TOMORROW: "${MMM} ${d}, ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "Коментар изтрит от ${user} на ${EEEE} в ${time}",
         MONTH: "Коментарът е изтрит от ${user} на ${MMM} ${d}",
         TODAY: "Коментарът е изтрит от ${user} днес в ${time}",
         YEAR: "Коментарът е изтрит от ${user} на ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Коментарът е изтрит от ${user} вчера в ${time}",
         TOMORROW: "Коментарът е изтрит от ${user} на ${MMM} ${d}, ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} редактира ${EEEE} в ${time} (версия ${version})",
         MONTH: "${user} редактира ${MMM} ${d} (версия ${version})",
         TODAY: "${user} редактира днес в ${time} (версия ${version})",
         YEAR: "${user} редактира ${MMM} ${d}, ${YYYY} (версия ${version})",
         YESTERDAY: "${user} редактира вчера в ${time} (версия ${version})",
         TOMORROW: "${user} редактира ${MMM} ${d}, ${YYYY} (версия ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} редактира ${EEEE} в ${time}",
         MONTH: "${user} редактира ${MMM} ${d}",
         TODAY: "${user} редактира днес в ${time}",
         YEAR: "${user} редактира ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} редактира вчера в ${time}",
         TOMORROW: "${user} редактира ${MMM} ${d}, ${YYYY}"
      },

      DELETE_CONFIRM: "Наистина ли искате да изтриете този коментар?",
      FLAG_ITEM: {
         BUSY: "Записване...",
         CANCEL: "Отказ",
         ACTION: "Маркиране като неподходящо",
         DESCRIPTION_LABEL: "Въведете причина за маркирането с флаг на този елемент (по желание)",
         EDITERROR: "Метаданните на файла не бяха редактирани поради грешка",
         OK: "Записване",
         ERROR_SAVING: "Възникна грешка при обработването на заявката. Опитайте отново по-късно.",
         SUCCESS_SAVING: "Маркирането Ви беше подадено. Модератор ще проучи проблема скоро.",
         TITLE: "Маркирай с флаг този елемент като неподходящ",
         COMMENT: {
            TITLE: "Маркиране на този коментар като неподходящ",
            A11Y: "Този бутон отваря диалогов прозорец, който позволява на потребителя да маркира с флаг този коментар като неподходящ."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Отказ",
      DIALOG_TITLE: "Изтриване на коментар",
      NAME: "Изтриване на коментар",
      OK: "OK",
      TOOLTIP: "Изтриване на коментар"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Отказ",
      CONFIRM: "Съкращаването ще премахне текста, надхвърлящ ограничението на коментара.  Щракнете върху 'OK', за да съкратите, или върху 'Отказ', за да редактирате коментара сами.",
      DIALOG_TITLE: "Съкращаване на коментар",
      NAME: "Съкращаване на коментар",
      OK: "OK",
      TOOLTIP: "Съкращаване на коментар"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Потвърждаване на подаване",
      CONFIRM: "Вашият коментар беше приет за преглед и ще е достъпен, когато бъде одобрен.",
      OK: "OK"
   },

   DATE: {
      AM: "AM",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "PM",
      TODAY: "днес",
      TODAY_U: "Днес",
      YESTERDAY: "вчера",
      YESTERDAY_U: "Вчера",

      ADDED: { DAY: "Добавено ${EEee} в ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Добавено на ${date_long}",
         TODAY: "Добавено днес в ${time}",
         YEAR: "Добавено на ${date_long}",
         YESTERDAY: "Добавено вчера в ${time}"
      },

      LAST_UPDATED: { DAY: "Последно актуализирано ${EEee} в ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Последно актуализирано ${date_long}",
         TODAY: "Последно актуализирано днес в ${time}",
         YEAR: "Последно актуализирано ${date_long}",
         YESTERDAY: "Последно актуализирано вчера в ${time}"
      },

      MONTHS_ABBR: { 0: "ЯНУ",
         10: "НОЕ",
         11: "ДЕК",
         1: "ФЕВ",
         2: "МАРТ",
         3: "АПР",
         4: "МАЙ",
         5: "ЮНИ",
         6: "ЮЛИ",
         7: "АВГ",
         8: "СЕП",
         9: "ОКТ"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Днес",
         YEAR: "${date_short}",
         YESTERDAY: "Вчера",
         TOMORROW: "Утре"
      },

      RELATIVE_TIME: { DAY: "${EEee} в ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Днес в ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "Вчера в ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} в ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Днес в ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "Вчера в ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} в ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short} в ${time}",
         TODAY: "${date_short} в ${time}",
         YEAR: "${date_short} в ${time}",
         YESTERDAY: "${date_short} в ${time}",
         TOMORROW: "${date_short} в ${time}"
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

      UPDATED: { DAY: "Актуализирано ${EEee} в ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Актуализирано на ${date_long}",
         TODAY: "Актуализирано днес в ${time}",
         YEAR: "Актуализирано на ${date_long}",
         YESTERDAY: "Актуализирано вчера в ${time}"
      }
   },
   VERSIONS: {
      ERROR: "Невъзможност за зареждане на информация за версия.",
      ERROR_REQUEST_CANCELLED: "Заявката беше отменена.",
      ERROR_REQUEST_TIMEOUT: "Няма връзка със сървъра.",
      ERROR_REQUEST_UNKNOWN: "Възникна неизвестна грешка.",
      LOADING: "Зареждане..",
      NO_VERSIONS: "Няма версии",
      INFO: "Версия ${0}, създадена ${1} от ",
      VERSION_NUMBER: "Версия ${0}",
      DELETED: "Изтрито",
      DELETE_ALL: "Изтриване на всички версии преди",
      DELETE_VERSION_SINGLE: "Изтрийте версия ${0}",
      DELETEERROR: "Версията не беше изтрита поради грешка.",
      CREATE_VERSION: "Създаване на нова версия",
      CREATE_VERSION_TOOLTIP: "Създаване на версия на този файл",
      REVERT_VERSION: "Възстановяване на версия ${0}",
      REVERT_DESCRIPTION: "Възстановено от версия ${0}",
      PREVIOUS: "Назад",
      PREVIOUS_TOOLTIP: "Предишна страница",
      ELLIPSIS: "...",
      NEXT: "Напред",
      NEXT_TOOLTIP: "Следваща страница",
      COUNT: "${0}-${1} от ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Страница",
      SHOW: "Показване",
      ITEMS_PER_PAGE: " елемента на страница.",
      DATE: {
        AM: "AM",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "Днес в ${time}",
            YESTERDAY: "Вчера в ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} в ${time}",
            YEAR: "${date_short} в ${time}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short} в ${time}",
            TODAY: "днес в ${time}",
            YESTERDAY: "вчера в ${time}"
        },
        UPDATED: { DAY: "Актуализирано ${EEee} в ${time}",
            YEAR: "Актуализирано на ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "Актуализирано на ${date_short}",
            TODAY: "Актуализирано днес в ${time}",
            YESTERDAY: "Актуализирано вчера в ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Изтриване на версия ${0}",
         DOWNLOAD: "Изтегляне",
         DOWNLOAD_TOOLTIP: "Изтегляне на тази версия (${0})",
         VIEW: "Преглед",
         VIEW_TOOLTIP: "Тази версия ${0}",
         REVERT: {
            A11Y: "Този бутон отваря диалогов прозорец, който позволява на потребителя да потвърди възстановяването на файл от предишна версия. Потвърждаването на това действие ще доведе до обновяване на съдържанието на страницата.",
            FULL: "Възстановяване",
            WIDGET: "Възстановяване на тази версия"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "Версията не можа да бъде изтрита, защото вече е изтрита или вече не е видима за Вас.",
         ERROR_ACCESS_DENIED: "Версията не можа да бъде изтрита, защото не сте редактор.",
         ERROR_TIMEOUT: "Версията не беше изтрита, понеже не може да се осъществи връзка със сървъра.  Щракнете отново върху 'Изтриване', за да опитате повторно да изпратите заявката си.",
         ERROR_CANCEL: "Тази версия не беше изтрита, защото заявката беше отменена.  Щракнете отново върху 'Изтриване', за да опитате повторно да изпратите заявката си.",
         ERROR_NOT_LOGGED_IN: "Трябва да влезете, за да изтриете тази версия.  Щракнете върху 'Изтриване', за да бъдете подканени да влезете.",
         GENERIC_ERROR: "Тази версия не можа да се изтрие заради неизвестна грешка.  Щракнете отново върху 'Изтриване', за да опитате повторно да изпратите заявката си.",
         FULL: "Изтриване",
         A11Y: "Този бутон отваря диалогов прозорец, който позволява на потребителя да потвърди изтриването на тази версия. Потвърждаването на това действие ще доведе до обновяване на съдържанието на страницата."
      },

      REVERT: {
         ERROR_NOT_FOUND: "Версията не можа да се възстанови, понеже е била изтрита или вече не е видима за Вас.",
         ERROR_ACCESS_DENIED: "Тази версия не можа да се възстанови, защото не сте редактор.",
         ERROR_NAME_EXISTS: "Версията не беше възстановена, понеже друг файл има същото име.",
         ERROR_TIMEOUT: "Версията не беше възстановена, понеже не може да се осъществи връзка със сървъра.  Щракнете върху 'Възстановяване' отново, за да опитате пак със заявката.",
         ERROR_CANCEL: "Тази версия не беше възстановена, защото заявката беше отменена.  Щракнете върху 'Възстановяване' отново, за да опитате пак със заявката.",
         ERROR_QUOTA_VIOLATION: "Версията не беше възстановена поради ограничения на пространството.",
         ERROR_MAX_CONTENT_SIZE: "Версията не беше възстановена, понеже е по-голяма от максимално позволения размер от ${0}",
         GENERIC_ERROR: "Версията не можа да бъде възстановена поради неизвестна грешка.  Щракнете върху 'Възстановяване' отново, за да опитате пак със заявката."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Вижте кой е изтеглил...",
      PREVIOUS: "Назад",
      PREVIOUS_TOOLTIP: "Предишна страница",
      ELLIPSIS: "...",
      NEXT: "Напред",
      NEXT_TOOLTIP: "Следваща страница",
      COUNT: "${0}-${1} от ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Страница",
      SHOW: "Показване",
      ITEMS_PER_PAGE: " елемента на страница.",
      VERSION: {
         DAY: "Версия ${version} от ${date}",
         MONTH: "Версия ${version} от ${date}",
         TODAY: "Версия ${version} на ${time}",
         YEAR: "Версия ${version} от ${date}",
         YESTERDAY: "Версия ${version} вчера"
      },

      FILE: {
         V_LATEST: "Изтеглихте последната версия на този файл",
         V_OLDER: "Последно сте изтеглили версия ${0} на този файл",
         LOADING: "Зареждане...",
         EMPTY: "Само за анонимни потребители",
         ERROR: "Невъзможност за зареждане на информация за изтегляне"
      }
   },

   EE_DIALOG: {
      ERROR: "Грешка",
      ERROR_ALT_TEXT: "Грешка:",
      ERROR_MSG_GENERIC: "Нещо се обърка.  Опитайте отново.",
      ERROR_MSG_NOT_AVAILABLE: "Този елемент е изтрит или вече не е достъпен.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Съдържанието за този елемент не е достъпно.",
      ERROR_MSG_NO_ACCESS: "Вече нямате достъп до този елемент.",
      LOADING: "Зареждане...",
      TITLE_SU: "${author} публикува съобщение.",
      TITLE_NI: "${author} Ви покани да се присъедините към тяхната мрежа.",
      AUTHOR_TITLE: "Виж профила за ${author}",
      OPEN_LINK: "Отваряне на ${title}",
      CONFIRM_CLOSE_TITLE: "Потвърждаване",
      CONFIRM_CLOSE_MESSAGE: "Сигурни ли сте, че желаете да се откажете от промените? Натиснете OK, за да продължите, или Cancel, за да се върнете",
      OK: "OK",
      CANCEL: "Отказ"
   },
   MESSAGE: {
      SUCCESS: "Потвърждение",
      ERROR: "Грешка",
      ERROR_ALT_TEXT: "Грешка:",
      INFO: "Информация",
      WARNING: "Предупреждение",
      DISMISS: "Скрий това съобщение",
      MORE_DETAILS: "Още подробности",
      HIDE_DETAILS: "Скриване на подробностите"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Създадено: ${EEEE} в ${time}",
           MONTH: "Създадено: ${MMM} ${d}",
           TODAY: "Създадено: днес в ${time}",
           YEAR: "Създадено: ${MMM} ${d}, ${YYYY}",
           YESTERDAY: "Създадено: вчера в ${time}",
           TOMORROW: "Създадено: ${MMM} ${d}, ${YYYY}"
       },
      error: "Възникна грешка.  ${again}.",
      error_again: "Моля, опитайте отново",
      error_404: "Актуализацията на състоянието вече не съществува.",
      notifications: {
         STATUS_UPDATE: "${user} публикува съобщение",
         USER_BOARD_POST: "${user} писа на таблото Ви",
         POST_COMMENT: "${user} написа:"
      }
   },
   login: {
      error: "Потребителското име и/или паролата Ви не съответстват на съществуващи акаунти. Опитайте отново.",
      logIn: "Влизане",
      password: "Парола:",
      user: "Потребителско име:",
      welcome: "Влезте в HCL Connections"
   },
   repost: {
      name: "Повторно публикуване",
      title: "Повторно публикуване на тази актуализация на моите последователи или общности",
      msg_success: "Актуализацията успешно е публикувана повторно на последователите Ви.",
      msg_generic: "Нещо се обърка.  Опитайте отново."
   },
   FILE_SHARE_INFO: {
      ADD: "Добавяне",
      ADD_TXT: "Добавяне на лица или общности като читатели",
      SHOW_MORE: "Показване на повече...",
      READER_IF_PUBLIC: "Всички (публично)",
      READER_IF_PUBLIC_TOOLTIP: "Този файл е публичен и видим за всички",
      EMPTY_READERS: "Няма",
      READERS_LABEL: "Читатели: ",
      EDITORS_LABEL: "Редактори: ",
      OWNER_LABEL: "Собственик: ",
      ERROR: "Невъзможност за зареждане на информация за споделяне",
      ERROR_NOT_FOUND: "Заявеният файл е бил изтрит или преместен. Ако някой Ви е изпратил тази връзка, проверете дали е правилна.",
      ERROR_ACCESS_DENIED: "Нямате разрешение за преглед на този файл.  Файлът не е публичен и не е споделен с Вас.",
      SHARE: "Споделяне",
      CANCEL: "Отказ",
      SHARE_WITH: "Споделяне с:",
      PERSON: "Лице",
      COMMUNITY: "Общност",
      PLACEHOLDER: "Име или имейл на дадено лице...",
      MESSAGE: "Съобщение:",
      MESSAGE_TXT: "Добавяне на опционално съобщение",
      REMOVE_ITEM_ALT: "Премахване на ${0}",
      NO_MEMBERS: "Няма",
      A11Y_READER_ADDED: "Избиране ${0} като читател",
      A11Y_READER_REMOVED: "Премахнати ${0} като читател/и",
      SELF_REFERENCE_ERROR: "Не можете да споделяте със себе си.",
      OWNER_REFERENCE_ERROR: "Не можете да споделите със собственика на файла.",
      SHARE_COMMUNITY_WARN: "Споделянето с публичната общност '${0}' ще направи този файл публичен.",
      SELECT_USER_ERROR: "Трябва да изберете поне едно лице или общност, с когото да споделите",
      WARN_LONG_MESSAGE: "Съобщението е прекалено дълго.",
      TRIM_LONG_MESSAGE: "Съкращаване на съобщението?",
      ERROR_SHARING: "Файлът не може да бъде споделен.  Моля, опитайте отново по-късно.",
      INFO_SUCCESS: "Файлът е успешно споделен.",
      MAX_SHARES_ERROR: "Максималният брой споделяния е надхвърлен.",
      NOT_LOGGED_IN_ERROR: "Файлът не беше споделен, защото не сте влезли.  Щракнете върху Сподели, за да споделите този файл.",
      TIMEOUT_ERROR: "Файлът не беше споделен, понеже не може да се осъществи връзка със сървъра.  Щракнете върху 'Споделяне', за да опитате отново.",
      CANCEL_ERROR: "Този файл не беше споделен, защото заявката беше отказана.  Щракнете върху 'Споделяне', за да опитате отново.",
      NOT_FOUND_ERROR: "Файлът е изтрит или повече не е видим за Вас и не може да се сподели.",
      ACCESS_DENIED_ERROR: "Вече нямате разрешение за споделяне на този файл.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Ограничените файлове не могат да се правят публични.",
      TOOLTIP: "Даване на достъп до този файл на останалите"
   },
   HISTORY: {
      TAB_TITLE: "Скорошни актуализации",
      NO_HISTORY: "Няма последни актуализации.",
      EMPTY: "Последните актуализации за този елемент не могат да бъдат извлечени. Изтрити са или вече нямате достъп до тях.",
      MORE: "Показване на предишните актуализации",
      ERROR_ALT: "Грешка",
      ERROR: "Възникна грешка при извличането на актуализациите. ${again}",
      ERROR_ADDTL: "Възникна грешка при извличането на допълнителни актуализации. ${again}",
      ERROR_AGAIN: "Опитайте отново.",
      ERROR_AGAIN_TITLE: "Опитайте заявката отново за повече актуализации.",
      PROFILE_TITLE: "Отворете профила на ${user}.",
      SORT_BY: "Сортиране по\\:",
      SORTS: {
         DATE: "Дата",
         DATE_TOOLTIP: "Сортиране от последната история до най-старите актуализации",
         DATE_TOOLTIP_REVERSE: "Сортиране от най-старата история до последните актуализации"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} в ${time}",
             MONTH: "${MMM} ${d}",
             TODAY: "Днес в ${time}",
             YEAR: "${MMM} ${d}, ${YYYY}",
             YESTERDAY: "Вчера в ${time}",
             TOMORROW: "${MMM} ${d}, ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Този коментар",
	   REPLY_ACTION: "Отговаряне",
       REPLY_ACTION_TOOLTIP: "Отговор на този коментар"
   },
   OAUTH: {
      welcomeHeader: "Добре дошли в Connections",
      continueBtnLabel: "Продължаване",
      continueBtnA11y: "Активирането на тази връзка ще отвори нов прозорец, който ще Ви позволи да упълномощите достъп до Connections.",
      clickHere: "Щракнете тук",
      infoMsg: "Connections изисква Вашата оторизация, за да осъществявате достъп до Вашите данни.",
      authorizeGadget: "${clickHere} да упълномощите това приложение за достъп до информацията Ви за Connections.",
      confirmAuthorization: "${clickHere} да потвърдите, че сте упълномощили това приложение за достъп до Вашата информация за Connections."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Активирането на тази връзка ще отвори нов прозорец, който ще Ви позволи да упълномощите достъп до хранилището на библиотеката на Connections.",
      infoMsg: "Хранилището на библиотеката на Connections изисква Вашата оторизация, за да осъществявате достъп до Вашите данни.",
      authorizeGadget: "${clickHere}, за да оторизирате това приложение да осъществява достъп до информацията в хранилището на библиотеката на Connections.",
      confirmAuthorization: "${clickHere}, за да потвърдите, че сте оторизирали това приложение да осъществява достъп до информацията в хранилището на библиотеката на Connections."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Отказ",
      CONFIRM: "Сигурни ли сте, че желаете да се откажете от промените?  Щракнете върху OK, за да продължите, или натиснете Отказ, за да се върнете.",
      DIALOG_TITLE: "Потвърждаване",
      NAME: "Потвърждаване",
      OK: "OK",
      TOOLTIP: "Потвърждаване"
   }
})

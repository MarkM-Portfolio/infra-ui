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
		         label: "Дополнительно",
		         tooltip: "Дополнительные действия"
		       },
		       tags_more: "и еще ${0}",
		       ERROR_ALT: "Ошибка",
		       PERSON_TITLE: "Открыть профайл ${user}.",
		       inactiveUser: "${user} (неактивный)",
		       inactiveIndicator: "(неактивный)",
		       like_error: "Не удалось сохранить пометку Мне нравится. Повторите попытку позже.",
		       vote_error: "Не удалось сохранить ваш голос. Повторите попытку позже."
		   },
		   generic: {
		      untitled: "(Без названия)",
		      tags: "Теги:",
		      tags_more: "и еще ${0}",
		      likes: "Отметки Мне нравится",
		      comments: "Комментарии",
		      titleTooltip: "Перейти к ${app}",
		      error: "Не удалось загрузить данные.",
		      timestamp: {
		         created: {
		            DAY: "Дата создания: ${EEEE}, ${time}",
		            MONTH: "Дата создания: ${d} ${MMM}",
		            TODAY: "Создано сегодня в ${time}",
		            YEAR: "Дата создания: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Создано вчера в ${time}",
		            TOMORROW: "Дата создания: ${d} ${MMM} ${YYYY}"
		         },
		         updated: {
		            DAY: "Дата изменения: ${EEEE}, ${time}",
		            MONTH: "Дата изменения: ${d} ${MMM}",
		            TODAY: "Обновлено сегодня в ${time}",
		            YEAR: "Дата изменения: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Обновлено вчера в ${time}",
		            TOMORROW: "Дата изменения: ${d} ${MMM} ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Общедоступный",
		         priv: "Личный"
		      },
		      action: {
		         created: "Создано",
		         updated: "Обновлено"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Получать обновления об отслеживаемых пользователях на домашней странице и в обзоре электронной почты.",
		      profile_title: "Открыть профайл ${user}.",
		      profile_a11y: "Активация этой ссылки откроет профайл ${user} в новом окне.",
		      error: "Ошибка.  ${again}.",
		      error_again: "Повторите попытку",
		      error_404: "Сетевой запрос больше не существует.",
		      warning: "Предупреждение",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Вы установили контакт.",
		            	follow: "Вы установили контакт с пользователем ${user} и отслеживаете его."
		            },
		            ignore: {
		            	nofollow: "Вы проигнорировали приглашение.",
		            	follow: "Вы проигнорировали приглашение, но теперь отслеживаете пользователя ${user}."
		            }
		         },
		         error: {
		            accept: "Ошибка в процессе принятия запроса.",
		            ignore: "Ошибка в процессе игнорирования запроса."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE}, ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "Сегодня в ${time}",
		              YEAR: "${MMM} ${d}, ${YYYY}",
		              YESTERDAY: "Вчера в ${time}",
		              TOMORROW: "${MMM} ${d}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Активация этой ссылки откроет ${name} в новом окне.",
		      tooltip: "Открыть ${name} в приложении Файлы",
		      profile_title: "Открыть профайл ${user}.",
		      profile_a11y: "Активация этой ссылки откроет профайл ${user} в новом окне.",
		      download_tooltip: "Загрузить этот файл (${0})",
		      following: {
		         add: "Отслеживать файл",
		         remove: "Прекратить отслеживание",
		         title: "Включить или выключить получение уведомлений об изменениях этого файла"
		      },
		      share: {
		         label: "Сделать общим",
		         title: "Предоставить другим пользователям доступ к этому файлу"
		      },
		      timestamp: {
		         created: {
		            DAY: "Дата создания: ${EEEE}, ${time}",
		            MONTH: "Дата создания: ${d} ${MMM}",
		            TODAY: "Создано сегодня в ${time}",
		            YEAR: "Дата создания: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Создано вчера в ${time}",
		            TOMORROW: "Дата создания: ${d} ${MMM} ${YYYY}"
		         },
		         createdOther: {
		            DAY: "Создан пользователем ${user}, ${EEEE}, ${time}",
		            MONTH: "Создан пользователем ${user} ${d} ${MMM}",
		            TODAY: "Создан пользователем ${user} сегодня в ${time}",
		            YEAR: "Создан пользователем ${user} ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Создан пользователем ${user} вчера в ${time}",
		            TOMORROW: "Создан пользователем ${user} ${d} ${MMM} ${YYYY}"
		         },
		         updated: {
		            DAY: "Дата изменения: ${EEEE}, ${time}",
		            MONTH: "Дата изменения: ${d} ${MMM}",
		            TODAY: "Обновлено сегодня в ${time}",
		            YEAR: "Дата изменения: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Обновлено вчера в ${time}",
		            TOMORROW: "Дата изменения: ${d} ${MMM} ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "Изменен пользователем ${user}, ${EEEE}, ${time}",
		            MONTH: "Изменен пользователем ${user} ${d} ${MMM}",
		            TODAY: "Изменена пользователем ${user} сегодня в ${time}",
		            YEAR: "Изменен пользователем ${user} ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Изменена пользователем ${user} вчера в ${time}",
		            TOMORROW: "Изменен пользователем ${user} ${d} ${MMM} ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Дата создания: ${EEEE}, ${time}",
		            MONTH: "Дата создания: ${d} ${MMM}",
		            TODAY: "Дата создания: сегодня в ${time}",
		            YEAR: "Дата создания: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Дата создания: вчера в ${time}",
		            TOMORROW: "Дата создания: ${d} ${MMM} ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Дата изменения: ${EEEE}, ${time}",
		            MONTH: "Дата изменения: ${d} ${MMM}",
		            TODAY: "Дата изменения: сегодня в ${time}",
		            YEAR: "Дата изменения: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Дата изменения: вчера в ${time}",
		            TOMORROW: "Дата изменения: ${d} ${MMM} ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} в ${time_long} пользователем ${user}",
		         UPDATE_TIMESTAMP: "${date_long} в ${time_long} пользователем ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} в ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Загрузить этот файл (${size})",
		      	 DOWNLOAD_ALT: "Загрузить"
		      },
		      PREVIEW: {
		         LINK: "Предварительный просмотр",
		         TITLE: "Предварительный просмотр файла в новом окне."
		      },
		      TAGS: "Теги:",
		      error: "Ошибка.  ${again}.",
		      error_again: "Повторите попытку",
		      error_404: "Файл больше не существует или у вас недостаточно прав для доступа к нему.",
		      error_403: "У вас недостаточно прав для просмотра этого файла. Файл не является общим и не открыт вам для совместного доступа.",
		      notifications: {
		         USER_SHARED: "Пользователь ${user} написал:",
		         CHANGE_SUMMARY: "Пользователь ${user} предоставил сводку изменений",
		         NO_CHANGE_SUMMARY: "Пользователь ${user} не предоставил сводку изменений",
		         COMMENTED: "Пользователь ${user} оставил комментарий"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Изъято вами",
		      checkedout_other: "Изъято ${user}",
		      tooltip: "Открыть файл ${name} в библиотеке",
		      draft_404_info: "Черновик был удален или больше не используется совместно с вами. Опубликованная версия теперь является последней версией этого файла.",
		      error_404: "Файл был удален или больше не используется совместно с вами.",
		      error_403: "Файл был удален или больше не используется совместно с вами.",
		      error_preview: "Файл больше недоступен для предварительного просмотра.",
		      draft_review_canceled: "Проверка была отменена, и черновик больше не используется совместно с вами. Ваша проверка больше не требуется.",
		      switch_ee: "Показать черновик",
		      switch_ee_tooltip: "Показать последний черновик этого файла"
		   },
		   ecm_draft: {
		      tooltip: "Открыть черновик ${name} в библиотеке",
		      community_owners: "Владельцы сообщества",
		      draft: "Черновик",
		      draft_tooltip: "Просмотр черновика",
		      draft_general_info: "Предыдущий черновик больше не существует, теперь последней версией является более новый черновик.",
		      draft_review_404_general_info: "Один из проверяющих уже проголосовал. От вас больше не требуется проверка этого черновика.",
		      draft_review_404_request_info: "Предыдущий черновик больше не существует, и последний черновик подан на проверку. Вам отправлен запрос на проверку.",
		      draft_review_404_require_info: "Предыдущий черновик больше не существует, и последний черновик подан на проверку. Требуется ваша проверка.",
		      draft_review_request_info: "Вам отправлен запрос на проверку.",
		      draft_review_require_info: "Требуется ваша проверка.",
		      error_404: "Черновик был удален или больше не используется совместно с вами.",
		      error_403: "Вы не можете просматривать этот черновик, так как он больше не используется совместно с вами.",
		      error_preview: "Черновик больше недоступен для предварительного просмотра.",
		      switch_ee: "Показать опубликованную версию",
		      switch_ee_tooltip: "Показать опубликованную версию этого файла",
		      review: "Проверить",
		      reviewers: "Проверяющие",
		      reviwers_addtl: "Дополнительные проверяющие",
		      in_review: "Черновик в процессе проверки",
		      in_review_tooltip: "Просмотр черновика в процессе проверки",
		      review_required_any: "Владельцы сообщества требуют, чтобы этот черновик был проверен одним проверяющим.",
		      review_required_all: "Владельцы сообщества требуют, чтобы этот черновик был проверен всеми проверяющими.",
		      review_required_generic: "Владельцы сообщества требуют, чтобы этот черновик был проверен этими проверяющими.",
		      review_additional_required: "Проверить этот черновик должны все проверяющие, добавленные отправителем черновика.",
		      reivew_submitted_date: {
		         DAY: "Пользователь ${user} отправил черновик на проверку ${EEEE} в ${time}.",
		         MONTH: "Пользователь ${user} отправил черновик на проверку ${MMM} ${d}.",
		         TODAY: "Пользователь ${user} отправил черновик на проверку сегодня в ${time}.",
		         YEAR: "Пользователь ${user} отправил черновик на проверку  ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Пользователь ${user} отправил черновик на проверку вчера в ${time}.",
		         TOMORROW: "Пользователь ${user} отправил черновик на проверку  ${MMM} ${d}, ${YYYY}."
		      },
		      pending: "Ожидает",
		      pending_rejected: "Проверка больше не требуется, так как черновик был отклонен",
		      approve: "Утвердить",
		      approved: "Утверждено",
		      approve_tooltip: "Утвердить черновик",
		      accept_success: "Вы утвердили черновик.",
		      accept_error: "В процессе утверждения черновика возникла ошибка. Повторите попытку.",
		      accept_info: "Вы утвердили этот черновик.",
		      reject: "Отклонить",
		      rejected: "Отклонено",
		      reject_tooltip: "Отклонить этот черновик",
		      reject_success: "Вы отклоняете этот черновик",
		      reject_error: "В процессе отклонения черновика возникла ошибка. Повторите попытку.",
		      reject_info: "Вы отклонили этот черновик."
		   },
		   authUser: {
		      error: "Ошибка получения текущего пользователя.  ${again}.",
		      error_again: "Повторите попытку",
		      error_404: "Не найден идентифицированный пользователь.",
		      error_403: "Нет доступа к информации о пользователе."
		   },
		   forum: {
		      error: "Ошибка.  ${again}.",
		      error_again: "Повторите попытку",
		      error_404: "Форум больше не существует, или недостаточно прав для доступа к нему.",
		      error_403: "Нет прав доступа на просмотр этого форума. Форум не является общедоступным, и вам к нему не был предоставлен совместный доступ.",
		      readMore: "Показать тему целиком...",
		      readMore_tooltip: "Открыть тему форума ${name}.",
		      readMore_a11y: "Активация этой ссылки открывает тему форума ${name} в новом окне.",
		      QUESTION_ANSWERED: "На этот вопрос есть ответы.",
		      QUESTION_NOT_ANSWERED: "На этот вопрос еще нет ответов.",
		      attachments: "${count} вложений",
		      attachments_one: "${count} вложение"
		   },
		   blog: {
		      error: "Ошибка.  ${again}.",
		      error_again: "Повторите попытку",
		      error_404: "Блог больше не существует или у вас недостаточно прав для доступа к нему.",
		      error_403: "У вас недостаточно прав для просмотра этого блога. Блог не является общим и не открыт вам для совместного доступа.",
		      readMore: " Читать далее...",
		      readMore_tooltip: "Открыть запись блога ${name}.",
		      readMore_a11y: "Активация этой ссылки открывает запись блога ${name} в новом окне.",
		      graduated: "Принято",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Голосовать</a>",
		  					TOOLTIP: 	"Отдать свой голос"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Голос подан</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Проголосовано</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Отменить</a>",
		  					TOOLTIP: 	"Отозвать свой голос"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 пользователей проголосовало за это"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 пользователь проголосовал за это."
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} проголосовало за это"
		  				}
		  			},
		  			LOADING: "Загрузка...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Голос подан"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Не удалось сохранить ваш голос, так как превышено ограничение голосования либо идея больше недоступна.",
		      readMore_tooltip: "Открыть идею ${name}.",
		      readMore_a11y: "Активация этой ссылки открывает идею ${name} в новом окне."
		   },
		   size: {
		      B: "${0} Б",
		      KB: "${0} КБ",
		      MB: "${0} МБ",
		      GB: "${0} ГБ"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Ответы",
		      THIS_ARIA_LABEL: "Этот ответ",
		      THIS_TAB_TITLE: "Этот ответ",
		      TAB_TITLE: "Ответов (${0})",
		      REPLY_TO_REPLY: "В ответ на ${thisReply}",
		      REPLY_TO_TOPIC: "В ответ на ${thisTopic}",
		      THIS_TOPIC: "эта тема",
		      THIS_REPLY: "этот ответ",
		      NAVIGATE_TO_REPLY: "Перейти в родительский ответ",
		      NAVIGATE_TO_TOPIC: "Перейти в родительскую тему",
		      ADD_COMMENT: "Ответить на тему",
		      ADD_COMMENT_TOOLTIP: "Ответ на эту тему форума",
		      SHOWING_RECENT_REPLIES: "Показ ${0} последних ответов",
		      PREV_COMMENTS: "Показать дополнительные ответы",
		      PLACEHOLDER_TXT: "Ответить на тему",
		      EMPTY: "Нет ответов.",
		      TRIM_LONG_COMMENT: "Сократить ответ?",
		      WARN_LONG_COMMENT: "Этот ответ слишком длинный.  ${shorten}",
		      ERROR: "Произошла ошибка при извлечении ответов. ${again}",
		      ERROR_CREATE: "Не удалось сохранить ответ.  Повторите попытку позднее.",
		      ERROR_CREATE_NOT_FOUND: "Ответ не удалось сохранить, поскольку тема удалена или скрыта.",
		      ERROR_CREATE_ACCESS_DENIED: "Ответ не удалось сохранить, поскольку тема удалена или скрыта.",
		      ERROR_CREATE_TIMEOUT: "Ответ не удалось сохранить, так как потеряна связь с сервером.  Чтобы повторить попытку, нажмите 'Сохранить'.",
		      ERROR_CREATE_CANCEL: "Комментарий не удалось сохранить, так как запрос был отменен.  Чтобы повторить попытку, нажмите 'Сохранить'.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Для создания этого ответа необходимо войти в систему.  Для просмотра приглашения входа в систему, нажмите 'Сохранить'.",
		      ERROR_NO_CONTENT: "Введите ответ и нажмите 'Сохранить'.  Для отказа от ответа нажмите 'Отмена'.",
		      ERROR_UNAUTHORIZED: "Не удалось сохранить ответ, поскольку вы не обладаете правами на размещение ответов.",
		      COMMENT_DELETED: {
		         DAY: "Ответ удален пользователем ${user}, ${EEEE}, ${time}",
		         MONTH: "Ответ удален пользователем ${user} ${d} ${MMM}",
		         TODAY: "Ответ удален пользователем ${user} сегодня в ${time}",
		         YEAR: "Ответ удален пользователем ${user} ${d} ${MMM} ${YYYY}",
		         YESTERDAY: "Ответ удален пользователем ${user} вчера в ${time}",
		         TOMORROW: "Ответ удален пользователем ${user} ${d} ${MMM} ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Причина удаления: ${reason}",
		      REPLY_TITLE: "Ответ: ${0}",
		      SHOW_FULL_REPLY: "Показать ответ целиком",
		      SHOW_FULL_REPLY_TOOLTIP: "Перейти к ответу в теме форума",
		      REPLY_ACTION: "Ответить",
		      REPLY_ACTION_TOOLTIP: "Ответить на это сообщение",
		      MODERATION_PENDING: "Этот ответ ожидает проверку.",
		      MODERATION_QUARANTINED: "Сообщение было помещено в карантин модератором.",
		      MODERATION_REMOVED: {
		         DAY: "Этот ответ удален пользователем ${user}, ${EEEE}, ${time}.",
		         MONTH: "Этот ответ удален пользователем ${user} ${d} ${MMM}.",
		         TODAY: "Этот ответ удален пользователем ${user} сегодня в ${time}.",
		         YEAR: "Этот ответ удален пользователем ${user} ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Этот ответ удален пользователем ${user} вчера в ${time}.",
		         TOMORROW: "Этот ответ удален пользователем ${user} ${d} ${MMM} ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Этот ответ отклонен пользователем ${user}, ${EEEE}, ${time}.",
		         MONTH: "Этот ответ отклонен пользователем ${user} ${d} ${MMM}.",
		         TODAY: "Этот ответ отклонен пользователем ${user} сегодня в ${time}.",
		         YEAR: "Этот ответ отклонен пользователем ${user} ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Этот ответ отклонен пользователем ${user} вчера в ${time}.",
		         TOMORROW: "Этот ответ отклонен пользователем ${user} ${d} ${MMM} ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Ваш ответ отправлен на проверку и станет доступен после утверждения."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Комментарии",
		      PLACEHOLDER_TXT: "Добавить комментарий",
		      TAB_TITLE: "Комментарии (${0})",
		      ACTION_NOT_SUPPORTED: "Неподдерживаемое действие",
		      ADD_COMMENT: "Добавить комментарий",
		      ADD_COMMENT_TOOLTIP: "Добавить комментарий к этому элементу",
		      CANCEL: "Отмена",
		      COMMENT_COUNT_ONE: "${0} комментарий",
		      COMMENT_COUNT_MANY: "${0} комментариев",
		      COMMENT_LABEL: "Комментарий:",
		      DELETE: "Удалить",
		      DELETE_TOOLTIP: "Удалить комментарий",
		      DELETEREASON: "Причина удаления комментария:",
		      DIALOG_TITLE: "Сократить комментарий",
		      TOOLTIP: "Сократить комментарий",
		      NAME: "Сократить комментарий",
		      EDIT: "Изменить",
		      EDIT_TOOLTIP: "Изменить комментарий",
		      ERROR_CREATE: "Не удалось сохранить комментарий.  Повторите попытку позднее.",
		      ERROR_CREATE_NOT_FOUND: "Не удалось сохранить комментарий: элемент удален или больше недоступен.",
		      ERROR_CREATE_ACCESS_DENIED: "Не удалось сохранить комментарий: элемент удален или больше недоступен.",
		      ERROR_CREATE_TIMEOUT: "Комментарий не сохранен, так как невозможно установить соединение с сервером.  Нажмите Опубликовать для повторной попытки.",
		      ERROR_CREATE_CANCEL: "Комментарий не сохранен, так как запрос был отменен.  Нажмите Опубликовать для повторной попытки.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Для создания этого комментария необходимо войти в систему.  Нажмите Опубликовать, чтобы открыть форму входа в систему.",
		      ERROR_DELETE: "Не удалось удалить комментарий.  Повторите попытку позднее.",
		      ERROR_DELETE_TIMEOUT: "Комментарий не удален, так как невозможно установить соединение с сервером.  Нажмите кнопку Удалить для повторной попытки.",
		      ERROR_DELETE_NOT_FOUND: "Невозможно удалить комментарий, так как комментарий или элемент уже удален или больше не является видимым для вас.",
		      ERROR_DELETE_ACCESS_DENIED: "Комментарий не удален, так как элемент был удален или больше не является видимым для вас.",
		      ERROR_DELETE_CANCEL: "Комментарий не удален, так как запрос был отменен.  Нажмите кнопку Удалить для повторной попытки.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Для удаления этого комментария необходимо войти в систему.  Нажмите 'Удалить' для показа приглашения входа в систему.",
		      ERROR_EDIT: "Не удалось изменить ваш комментарий.  Повторите попытку позднее.",
		      ERROR_EDIT_ACCESS_DENIED: "Комментарий невозможно обновить, так как элемент был удален или больше не является видимым для вас.",
		      ERROR_EDIT_NOT_FOUND: "Комментарий невозможно обновить, так как элемент был удален или больше не является видимым для вас.",
		      ERROR_EDIT_TIMEOUT: "Комментарий не изменен, так как невозможно установить соединение с сервером.  Нажмите Опубликовать для повторной попытки.",
		      ERROR_EDIT_CANCEL: "Комментарий не обновлен, так как запрос был отменен.  Нажмите Опубликовать для повторной попытки.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Для изменения этого комментария необходимо войти в систему.  Нажмите Опубликовать, чтобы открыть форму входа в систему.",
		      ERROR_NO_CONTENT: "Введите текст комментария и нажмите Опубликовать.  Для отказа от публикации комментария нажмите кнопку Отмена.",
		      ERROR_NO_CONTENT_EDIT: "Введите текст комментария и нажмите Опубликовать.  Для отказа от изменения комментария нажмите Отмена.",
		      ERROR_UNAUTHORIZED: "Не удалось сохранить комментарий, поскольку вы не обладаете правами на размещение комментариев.",
		      ERROR_GENERAL: "Произошла ошибка.",
		      OK: "OK",
		      YES: "Да",
		      TRIM_LONG_COMMENT: "Сократить комментарий?",
		      WARN_LONG_COMMENT: "Слишком длинный комментарий.  ${shorten}",
		      LINK: "Ссылка",
		      SAVE: "Сохранить",
		      POST: "Опубликовать",
		      SHOWMORE: "Читать далее...",
		      VIEW_COMMENTS_FILE: "Показать комментарии к этому файлу",
		      SUBSCRIBE_TO_COMMENTS: "Подписаться на эти комментарии",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Направить изменения этих комментариев в свою ленту",
		      PROFILE_TITLE: "Открыть профайл ${user}.",
		      PROFILE_A11Y: "Активация этой ссылки откроет профайл ${user} в новом окне.",
		      MODERATION_PENDING: "Этот комментарий ожидает проверки.",
		      MODERATION_REMOVED: {
		         DAY: "Этот комментарий удален пользователем ${user}, ${EEEE}, ${time}.",
		         MONTH: "Этот комментарий удален пользователем ${user} ${d} ${MMM}.",
		         TODAY: "Этот комментарий удален пользователем ${user} сегодня в ${time}.",
		         YEAR: "Этот комментарий удален пользователем ${user} ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Этот комментарий удален пользователем ${user} вчера в ${time}.",
		         TOMORROW: "Этот комментарий удален пользователем ${user} ${d} ${MMM} ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Этот комментарий отклонен пользователем ${user}, ${EEEE}, ${time}.",
		         MONTH: "Этот комментарий отклонен пользователем ${user} ${d} ${MMM}.",
		         TODAY: "Этот комментарий отклонен пользователем ${user} сегодня в ${time}.",
		         YEAR: "Этот комментарий отклонен пользователем ${user} ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Этот комментарий отклонен пользователем ${user} вчера в ${time}.",
		         TOMORROW: "Этот комментарий отклонен пользователем ${user} ${d} ${MMM} ${YYYY}."
		      },
		      PREV_COMMENTS: "Показать предыдущие комментарии",
		      EMPTY: "Нет комментариев.",
		      ERROR_ALT: "Ошибка",
		      ERROR: "Произошла ошибка при извлечении комментариев. ${again}",
		      ERROR_ADDTL: "Произошла ошибка при извлечении дополнительных комментариев. ${again}",
		      ERROR_AGAIN: "Повторите попытку.",
		      ERROR_AGAIN_TITLE: "Для дополнительных комментариев повторите запрос еще раз.",
		      COMMENT_CREATED: {
		         DAY: "Пользователем ${user}, ${EEEE}, ${time} (версия ${version})",
		         MONTH: "Пользователем ${user} ${d} ${MMM} (версия ${version})",
		         TODAY: "Пользователем ${user} сегодня в ${time} (версия ${version})",
		         YEAR: "Пользователем ${user} ${d} ${MMM} ${YYYY} (версия ${version})",
		         YESTERDAY: "Пользователем ${user} вчера в ${time} (версия ${version})",
		         TOMORROW: "Пользователем ${user} ${d} ${MMM} ${YYYY} (версия ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "Пользователем ${user}, ${EEEE}, ${time}",
		         MONTH: "Пользователем ${user}, ${MMM} ${d}",
		         TODAY: "Пользователем ${user} сегодня в ${time}",
		         YEAR: "Пользователем ${user}, ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Пользователем ${user} вчера в ${time}",
		         TOMORROW: "Пользователем ${user}, ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE}, ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "Сегодня в ${time}",
		         YEAR: "${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Вчера в ${time}",
		         TOMORROW: "${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Комментарий удален пользователем ${user}, ${EEEE}, ${time}",
		         MONTH: "Комментарий удален пользователем ${user} ${d} ${MMM}",
		         TODAY: "Комментарий удален пользователем ${user} сегодня в ${time}",
		         YEAR: "Комментарий удален пользователем ${user} ${d} ${MMM} ${YYYY}",
		         YESTERDAY: "Комментарий удален пользователем ${user} вчера в ${time}",
		         TOMORROW: "Комментарий удален пользователем ${user} ${d} ${MMM} ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "Изменен пользователем ${user}, ${EEEE}, ${time} (версия ${version})",
		         MONTH: "Изменен пользователем ${user} ${d} ${MMM} (версия ${version})",
		         TODAY: "Изменен пользователем ${user} сегодня в ${time} (версия ${version})",
		         YEAR: "Изменен пользователем ${user} ${d} ${MMM} ${YYYY} (версия ${version})",
		         YESTERDAY: "Изменен пользователем ${user} вчера в ${time} (версия ${version})",
		         TOMORROW: "Изменен пользователем ${user} ${d} ${MMM} ${YYYY} (версия ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "Изменен пользователем ${user}, ${EEEE}, ${time}",
		         MONTH: "Изменен пользователем ${user} ${d} ${MMM}",
		         TODAY: "Изменен пользователем ${user} сегодня в ${time}",
		         YEAR: "Изменен пользователем ${user} ${d} ${MMM} ${YYYY}",
		         YESTERDAY: "Изменен пользователем ${user} вчера в ${time}",
		         TOMORROW: "Изменен пользователем ${user} ${d} ${MMM} ${YYYY}"
		      },
		      DELETE_CONFIRM: "Вы действительно хотите удалить этот комментарий?",
		      FLAG_ITEM: {
		         BUSY: "Сохранение...",
		         CANCEL: "Отмена",
		         ACTION: "Пометить как несоответствующий",
		         DESCRIPTION_LABEL: "Укажите причину отметки этого элемента (не обязательно)",
		         EDITERROR: "Невозможно изменить метаданные файла из-за ошибки",
		         OK: "Сохранить",
		         ERROR_SAVING: "При обработке запроса произошла ошибка. Повторите попытку позднее.",
		         SUCCESS_SAVING: "Пометка отправлена. Модератор рассмотрит вопрос в ближайшее время.",
		         TITLE: "Пометить этот элемент как несоответствующий",
		         COMMENT: {
		            TITLE: "Пометить этот комментарий как несоответствующий",
		            A11Y: "С помощью этой кнопки можно открыть окно, позволяющее пометить этот комментарий как нежелательный."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Отмена",
		      DIALOG_TITLE: "Удалить комментарий",
		      NAME: "Удалить комментарий",
		      OK: "OK",
		      TOOLTIP: "Удалить комментарий"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Отмена",
		      CONFIRM: "Сокращение удалит текст за пределами ограничения размера комментария.  Нажмите кнопку OK для сокращения или кнопку Отмена для самостоятельного изменения комментария.",
		      DIALOG_TITLE: "Сократить комментарий",
		      NAME: "Сократить комментарий",
		      OK: "OK",
		      TOOLTIP: "Сократить комментарий"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Подтверждение сообщения",
		      CONFIRM: "Ваш комментарий отправлен на проверку и станет доступен после утверждения.",
		      OK: "OK"
		   },
		   DATE: {
		      AM: "утра",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "вечера",
		      TODAY: "сегодня",
		      TODAY_U: "Сегодня",
		      YESTERDAY: "вчера",
		      YESTERDAY_U: "Вчера",
		      ADDED: { DAY: "Дата добавления: ${EEee}, ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Добавлена ${date_long}",
		         TODAY: "Добавлена сегодня в ${time}",
		         YEAR: "Добавлена ${date_long}",
		         YESTERDAY: "Добавлена вчера в ${time}"
		      },
		      LAST_UPDATED: { DAY: "Последнее изменение: ${EEee}, ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Последнее изменение: ${date_long}",
		         TODAY: "Последнее изменение: сегодня в ${time}",
		         YEAR: "Последнее изменение: ${date_long}",
		         YESTERDAY: "Последнее изменение: вчера в ${time}"
		      },
		      MONTHS_ABBR: { 0: "ЯНВ",
		         10: "НОЯ",
		         11: "ДЕК",
		         1: "ФЕВ",
		         2: "МАР",
		         3: "АПР",
		         4: "МАЙ",
		         5: "ИЮН",
		         6: "ИЮЛ",
		         7: "АВГ",
		         8: "СЕН",
		         9: "ОКТ"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Сегодня",
		         YEAR: "${date_short}",
		         YESTERDAY: "Вчера",
		         TOMORROW: "Завтра"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} в ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Сегодня в ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Вчера в ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} в ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Сегодня в ${time}",
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
		      UPDATED: { DAY: "Обновлено: ${EEee} в ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Обновлено ${date_long}",
		         TODAY: "Обновлено сегодня в ${time}",
		         YEAR: "Обновлено ${date_long}",
		         YESTERDAY: "Обновлено вчера в ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Невозможно получить информацию о версии",
		      ERROR_REQUEST_CANCELLED: "Запрос отменен.",
		      ERROR_REQUEST_TIMEOUT: "Не удалось подключиться к серверу.",
		      ERROR_REQUEST_UNKNOWN: "Неизвестная ошибка.",
		      LOADING: "Загрузка ..",
		      NO_VERSIONS: "Версии отсутствуют",
		      INFO: "Версия ${0} создана ${1} пользователем ",
		      VERSION_NUMBER: "Версия ${0}",
		      DELETED: "Удалено",
		      DELETE_ALL: "Удалить все более ранние версии по отношению к версии",
		      DELETE_VERSION_SINGLE: "Удалить версию ${0}",
		      DELETEERROR: "Версия не удалена из-за ошибки.",
		      CREATE_VERSION: "Создать версию",
		      CREATE_VERSION_TOOLTIP: "Создать версию этого файла",
		      REVERT_VERSION: "Восстановить версию ${0}",
		      REVERT_DESCRIPTION: "Восстановлено из версии ${0}",
		      PREVIOUS: "Назад",
		      PREVIOUS_TOOLTIP: "Предыдущая страница",
		      ELLIPSIS: "...",
		      NEXT: "Далее",
		      NEXT_TOOLTIP: "Следующая страница",
		      COUNT: "${0}-${1} из ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Страница",
		      SHOW: "Показать",
		      ITEMS_PER_PAGE: " элементов на странице.",
		      DATE: {
		        AM: "утра",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} в ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Сегодня в ${time}",
		            YESTERDAY: "Вчера в ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} в ${time}",
		            YEAR: "${date_short} в ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} в ${time}",
		            TODAY: "сегодня в ${time}",
		            YESTERDAY: "вчера в ${time}"
		        },
		        UPDATED: { DAY: "Обновлено: ${EEee} в ${time}",
		            YEAR: "Обновлено ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Обновлено ${date_short}",
		            TODAY: "Обновлено сегодня в ${time}",
		            YESTERDAY: "Обновлено вчера в ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Удалить версию ${0}",
		         DOWNLOAD: "Загрузить",
		         DOWNLOAD_TOOLTIP: "Загрузить версию (${0})",
		         VIEW: "Показать",
		         VIEW_TOOLTIP: "Просмотреть версию ${0}",
		         REVERT: {
		            A11Y: "С помощью этой кнопки можно открыть окно, позволяющее подтвердить восстановление файла из предыдущей версии. Подтверждение этого действия приведет к обновлению содержимого страницы.",
		            FULL: "Восстановить",
		            WIDGET: "Восстановить эту версию"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Невозможно удалить версию, так как она была удалена или больше не является видимой для пользователя.",
		         ERROR_ACCESS_DENIED: "Невозможно удалить версию, так как вы не являетесь редактором.",
		         ERROR_TIMEOUT: "Версия не удалена, так как невозможно установить соединение с сервером.  Для повторного запроса еще раз нажмите 'Удалить'.",
		         ERROR_CANCEL: "Версия не была удалена, так как запрос был отменен.  Для повторного запроса еще раз нажмите 'Удалить'.",
		         ERROR_NOT_LOGGED_IN: "Для удаления версии необходимо войти в систему.  Нажмите 'Удалить' для показа приглашения входа в систему.",
		         GENERIC_ERROR: "Не удалось удалить версию из-за неизвестной ошибки.  Для повторного запроса еще раз нажмите 'Удалить'.",
		         FULL: "Удалить",
		         A11Y: "С помощью этой кнопки можно открыть окно, позволяющее подтвердить удаление этой версии. Подтверждение этого действия приведет к обновлению содержимого страницы."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Невозможно восстановить версию, так как она была удалена или больше не является видимой для вас.",
		         ERROR_ACCESS_DENIED: "Невозможно восстановить версию, так как вы не являетесь редактором.",
		         ERROR_NAME_EXISTS: "Невозможно восстановить версию, так как файл с таким именем уже существует.",
		         ERROR_TIMEOUT: "Версия не восстановлена, так как невозможно установить соединение с сервером.  Нажмите 'Восстановить', чтобы повторить запрос.",
		         ERROR_CANCEL: "Версия не была восстановлена, так как запрос был отменен.  Нажмите 'Восстановить', чтобы повторить запрос.",
		         ERROR_QUOTA_VIOLATION: "Не удалось восстановить версию из-за ограничений на занимаемое пространство.",
		         ERROR_MAX_CONTENT_SIZE: "Версия не может быть восстановлена, так как она превышает максимальный разрешенный размер страницы (${0})",
		         GENERIC_ERROR: "Не удалось восстановить данную версию из-за неизвестной ошибки.  Нажмите 'Восстановить', чтобы повторить запрос."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Просмотр пользователей, выполнивших загрузку...",
		      PREVIOUS: "Назад",
		      PREVIOUS_TOOLTIP: "Предыдущая страница",
		      ELLIPSIS: "...",
		      NEXT: "Далее",
		      NEXT_TOOLTIP: "Следующая страница",
		      COUNT: "${0}-${1} из ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Страница",
		      SHOW: "Показать",
		      ITEMS_PER_PAGE: " элементов на странице.",
		      VERSION: {
		         DAY: "Версия ${version}, ${date}",
		         MONTH: "Версия ${version}, ${date}",
		         TODAY: "Версия ${version}, ${time}",
		         YEAR: "Версия ${version}, ${date}",
		         YESTERDAY: "Версия ${version}, вчера"
		      },
		      FILE: {
		         V_LATEST: "Была загружена последняя версия файла",
		         V_OLDER: "Последней была загружена версия ${0} этого файла",
		         LOADING: "Загрузка...",
		         EMPTY: "Только анонимные пользователи",
		         ERROR: "Невозможно получить информацию о загрузке"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Ошибка",
		      ERROR_ALT_TEXT: "Ошибка:",
		      ERROR_MSG_GENERIC: "Возникла неполадка.  Повторите попытку.",
		      ERROR_MSG_NOT_AVAILABLE: "Элемент был удален или больше недоступен.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Данные этого элемента недоступны.",
		      ERROR_MSG_NO_ACCESS: "Вы больше не обладаете доступом к этому элементу.",
		      LOADING: "Загрузка...",
		      TITLE_SU: "Пользователь ${author} опубликовал сообщение.",
		      TITLE_NI: "${author} пригласил вас в свою сеть.",
		      AUTHOR_TITLE: "Просмотр профайла ${author}",
		      OPEN_LINK: "Открыть ${title}",
		      CONFIRM_CLOSE_TITLE: "Подтвердить",
		      CONFIRM_CLOSE_MESSAGE: "Вы действительно хотите отменить свои изменения? Нажмите OK для продолжения или Отмена для возврата",
		      OK: "OK",
		      CANCEL: "Отмена"
		   },
		   MESSAGE: {
		      SUCCESS: "Подтверждение",
		      ERROR: "Ошибка",
		      ERROR_ALT_TEXT: "Ошибка:",
		      INFO: "Информация",
		      WARNING: "Предупреждение",
		      DISMISS: "Скрыть это сообщение",
		      MORE_DETAILS: "Дополнительно",
		      HIDE_DETAILS: "Скрыть сведения"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Дата создания: ${EEEE}, ${time}",
		           MONTH: "Дата создания: ${d} ${MMM}",
		           TODAY: "Дата создания: сегодня в ${time}",
		           YEAR: "Дата создания: ${d} ${MMM} ${YYYY}",
		           YESTERDAY: "Дата создания: вчера в ${time}",
		           TOMORROW: "Дата создания: ${d} ${MMM} ${YYYY}"
		       },
		      error: "Ошибка.  ${again}.",
		      error_again: "Повторите попытку",
		      error_404: "Обновление состояния больше не существует.",
		      notifications: {
		         STATUS_UPDATE: "Пользователь ${user} опубликовал сообщение",
		         USER_BOARD_POST: "Пользователь ${user} оставил запись на вашей доске объявлений",
		         POST_COMMENT: "Пользователь ${user} написал:"
		      }
		   },
		   login: {
		      error: "Имя пользователя или пароль не соответствует ни одной из существующих учетных записей. Повторите попытку.",
		      logIn: "Войти",
		      password: "Пароль:",
		      user: "Имя пользователя:",
		      welcome: "Вход в HCL Connections"
		   },
		   repost: {
		      name: "Сделать репост",
		      title: "Сделать репост обновления для отслеживающих меня пользователей и сообществ",
		      msg_success: "Сделан репост обновления для отслеживающих вас пользователей.",
		      msg_generic: "Возникла неполадка.  Повторите попытку."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Добавить",
		      ADD_TXT: "Добавить пользователей или сообщества в качестве читателей",
		      SHOW_MORE: "Показать больше...",
		      READER_IF_PUBLIC: "Все (общедоступный)",
		      READER_IF_PUBLIC_TOOLTIP: "Этот файл является общедоступным и видимым для всех",
		      EMPTY_READERS: "Нет",
		      READERS_LABEL: "Читатели:\u00a0",
		      EDITORS_LABEL: "Редакторы:\u00a0",
		      OWNER_LABEL: "Владельцы:\u00a0",
		      ERROR: "Невозможно получить информацию о совместном использовании",
		      ERROR_NOT_FOUND: "Запрошенный файл был удален или перемещен. Если вы получили от кого-то эту ссылку, проверьте ее правильность.",
		      ERROR_ACCESS_DENIED: "У вас недостаточно прав для просмотра этого файла.  Файл не является общим и не открыт вам для совместного доступа.",
		      SHARE: "Сделать общим",
		      CANCEL: "Отмена",
		      SHARE_WITH: "Совместный доступ:",
		      PERSON: "Пользователь",
		      COMMUNITY: "Сообщество",
		      PLACEHOLDER: "Имя или электронный адрес пользователя...",
		      MESSAGE: "Сообщение:",
		      MESSAGE_TXT: "Добавить дополнительное сообщение",
		      REMOVE_ITEM_ALT: "Удалить ${0}",
		      NO_MEMBERS: "Нет",
		      A11Y_READER_ADDED: "${0} выбран как читатель",
		      A11Y_READER_REMOVED: "${0} удален как читатель",
		      SELF_REFERENCE_ERROR: "Невозможно открыть общий доступ для самого себя.",
		      OWNER_REFERENCE_ERROR: "Нельзя предоставлять совместный доступ к файлу его владельцу.",
		      SHARE_COMMUNITY_WARN: "Открытие общего доступа для общего сообщества '${0}' позволит сделать этот файл общедоступным.",
		      SELECT_USER_ERROR: "Для открытия совместного доступа необходимо выбрать хотя бы одного пользователя либо сообщество.",
		      WARN_LONG_MESSAGE: "Длина сообщения больше максимальной.",
		      TRIM_LONG_MESSAGE: "Сократить сообщение?",
		      ERROR_SHARING: "Невозможно открыть совместный доступ к файлу.  Повторите попытку позже.",
		      INFO_SUCCESS: "Совместный доступ к файлу успешно предоставлен.",
		      MAX_SHARES_ERROR: "Совместный доступ открывался слишком много раз.",
		      NOT_LOGGED_IN_ERROR: "Не удалось открыть совместный доступ к файлу, так как вы не вошли в систему.  Нажмите 'Использовать совместно' для открытия совместного доступа к этому файлу.",
		      TIMEOUT_ERROR: "Не удалось открыть совместный доступ к файлу, так как не удалось подключиться к серверу.  Нажмите 'Использовать совместно' для повторения запроса.",
		      CANCEL_ERROR: "Не удалось открыть совместный доступ к файлу, так как запрос был отменен.  Нажмите 'Использовать совместно' для повторения запроса.",
		      NOT_FOUND_ERROR: "Файл удален либо недоступен для просмотра, и к нему невозможно открыть общий доступ.",
		      ACCESS_DENIED_ERROR: "У вас больше нет прав для открытия совместного доступа к этому файлу.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Частный файл нельзя сделать общедоступным.",
		      TOOLTIP: "Предоставить другим пользователям доступ к этому файлу"
		   },
		   HISTORY: {
		      TAB_TITLE: "Последние обновления",
		      NO_HISTORY: "Недавних обновлений нет.",
		      EMPTY: "Не удалось получить недавние обновления для этого элемента. Они удалены, или к ним больше нет доступа.",
		      MORE: "Показать предыдущие обновления",
		      ERROR_ALT: "Ошибка",
		      ERROR: "Произошла ошибка при извлечении обновлений. ${again}",
		      ERROR_ADDTL: "Произошла ошибка при извлечении дополнительных обновлений. ${again}",
		      ERROR_AGAIN: "Повторите попытку.",
		      ERROR_AGAIN_TITLE: "Для просмотра дополнительных обновлений повторите запрос еще раз.",
		      PROFILE_TITLE: "Открыть профайл ${user}.",
		      SORT_BY: "Сортировать по\\:",
		      SORTS: {
		         DATE: "Дата",
		         DATE_TOOLTIP: "Сортировать от самых последних к наиболее старым обновлениям",
		         DATE_TOOLTIP_REVERSE: "Сортировать от наиболее старых к самым последним обновлениям"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE}, ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "Сегодня в ${time}",
		             YEAR: "${MMM} ${d}, ${YYYY}",
		             YESTERDAY: "Вчера в ${time}",
		             TOMORROW: "${MMM} ${d}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Этот комментарий",
			   REPLY_ACTION: "Ответить",
		       REPLY_ACTION_TOOLTIP: "Ответить на этот комментарий"
		   },
		   OAUTH: {
		      welcomeHeader: "Вас приветствует Connections",
		      continueBtnLabel: "Продолжить",
		      continueBtnA11y: "При активации этой ссылки открывается новое окно, позволяющее предоставить доступ приложению Connections.",
		      clickHere: "Щелкните здесь",
		      infoMsg: "Приложение Connections запрашивает разрешение на доступ к вашим данным.",
		      authorizeGadget: "${clickHere}, чтобы разрешить этому приложению доступ к информации Connections.",
		      confirmAuthorization: "${clickHere} подтвердите разрешение доступа к информации Connections этому приложению."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "При активации этой ссылки открывается новое окно, позволяющее предоставить доступ к хранилищу библиотек Connections.",
		      infoMsg: "Хранилище библиотек Connections запрашивает разрешение на доступ к вашим данным.",
		      authorizeGadget: "${clickHere}, чтобы разрешить этому приложению доступ к информации хранилища библиотек Connections.",
		      confirmAuthorization: "${clickHere} подтвердите разрешение доступа к информации хранилища библиотек Connections этому приложению."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Отмена",
		      CONFIRM: "Вы действительно хотите отменить свои изменения?  Нажмите OK, чтобы продолжить, или Отмена, чтобы вернуться.",
		      DIALOG_TITLE: "Подтвердить",
		      NAME: "Подтвердить",
		      OK: "OK",
		      TOOLTIP: "Подтвердить"
		   }
});

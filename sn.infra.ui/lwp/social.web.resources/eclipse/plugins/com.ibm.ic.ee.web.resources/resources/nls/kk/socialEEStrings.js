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
		         label: "Қосымша",
		         tooltip: "Қосымша Әрекеттер"
		       },
		       tags_more: "және тағы ${0}",
		       ERROR_ALT: "Қате",
		       PERSON_TITLE: "${user} пайдаланушысының профилін ашыңыз.",
		       inactiveUser: "${user} (белсенсіз)",
		       inactiveIndicator: "(белсенді емес)",
		       like_error: "Қалауыңызды сақтау мүмкін болмады. Әрекетті кейін қайталап көріңіз.",
		       vote_error: "Дауыс беруіңіз сақталмайды. Әрекетті кейін қайталап көріңіз."
		   },
		   generic: {
		      untitled: "(атаусыз)",
		      tags: "Тегтер:",
		      tags_more: "және тағы ${0}",
		      likes: "Ұнатулар",
		      comments: "Пікірлер",
		      titleTooltip: "${app} шарлау",
		      error: "Деректерді қалпына келтіру мүмкін емес.",
		      timestamp: {
		         created: {
		            DAY: "${EEEE} күні ${time} уақытта жасалды",
		            MONTH: "${d} ${MMM} жасалды",
		            TODAY: "Бүгін мына уақытта жасалды ${time}",
		            YEAR: "${d} ${MMM} ${YYYY} жасалды",
		            YESTERDAY: "Кеше мына уақытта жасалды ${time}",
		            TOMORROW: "${d} ${MMM} ${YYYY} жасалды"
		         },
		         updated: {
		            DAY: "${EEEE} ${time} өрісінде жаңартты",
		            MONTH: "${d} ${MMM} жаңартылды",
		            TODAY: "Бүгін ${time} уақытта жаңартылған",
		            YEAR: "${d} ${MMM} ${YYYY} жаңартылды",
		            YESTERDAY: "Кеше ${time} уақытта жаңартылды",
		            TOMORROW: "${d} ${MMM} ${YYYY} жаңартылды"
		         }
		      },
		      visibility: {
		         pub: "Жалпы",
		         priv: "Жеке"
		      },
		      action: {
		         created: "Жасалды",
		         updated: "Жаңартылған"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Басты беттегі және электрондық пошта қорытындысында қосылатын адамдар туралы жаңартуларды алыңыз.",
		      profile_title: "${user} пайдаланушысының профилін ашыңыз.",
		      profile_a11y: "Бұл сілтемені белсендіру ${user} пайдаланушысының профилін жаңа терезеде ашады.",
		      error: "Қате орын алды.  ${again}.",
		      error_again: "Қайта әрекет етіңіз",
		      error_404: "Желі сұрауы енді жоқ.",
		      warning: "Ескерту",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Қазір желі контактісіз.",
		            	follow: "Қазір желі контактісіз және ${user} бақылаудасыз."
		            },
		            ignore: {
		            	nofollow: "Шақыруды елемедіңіз.",
		            	follow: "Шақыруды елемедіңіз, бірақ ${user} бақылаудасыз."
		            }
		         },
		         error: {
		            accept: "Сұрауды қабылдауда қате орын алды.",
		            ignore: "Сұрауды елемеуде қате орын алды."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} күні ${time} сағатта",
		              MONTH: "${MMM} ${d}",
		              TODAY: "Бүгін ${time} уақытта",
		              YEAR: "${MMM} ${d}, ${YYYY}",
		              YESTERDAY: "Кеше ${time} уақытта",
		              TOMORROW: "${MMM} ${d}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Бұл сілтемені белсендіру жаңа терезедегі ${name} ашады.",
		      tooltip: "Файл бағдарламасында ${name} ашу",
		      profile_title: "${user} пайдаланушысының профилін ашыңыз.",
		      profile_a11y: "Бұл сілтемені белсендіру ${user} пайдаланушысының профилін жаңа терезеде ашады.",
		      download_tooltip: "(${0}) файлын жүктеу",
		      following: {
		         add: "Файлды бақылау",
		         remove: "Бақылауды тоқтату",
		         title: "Осы файлдың жаңартуларын алып тұру опциясын ажырата қосу"
		      },
		      share: {
		         label: "Ортақ пайдалану",
		         title: "Басқаларға осы файлды пайдалануға рұқсат беру"
		      },
		      timestamp: {
		         created: {
		            DAY: "${EEEE} күні ${time} уақытта жасалды",
		            MONTH: "${d} ${MMM} жасалды",
		            TODAY: "Бүгін мына уақытта жасалды ${time}",
		            YEAR: "${d} ${MMM} ${YYYY} жасалды",
		            YESTERDAY: "Кеше мына уақытта жасалды ${time}",
		            TOMORROW: "${d} ${MMM} ${YYYY} жасалды"
		         },
		         createdOther: {
		            DAY: "${user} ${EEEE} орнында ${time} уақытында жасалды",
		            MONTH: "${user} деген пайдаланушы ${d} ${MMM} күні жасалды",
		            TODAY: "${user} пайдаланушы бүгін ${time} уақытта жасады",
		            YEAR: "${user} ${d} ${MMM} ${YYYY} кезінде жасалды",
		            YESTERDAY: "${user} кеше ${time} кезінде жасаған",
		            TOMORROW: "${user} ${d} ${MMM} ${YYYY} кезінде жасалды"
		         },
		         updated: {
		            DAY: "${EEEE} ${time} өрісінде жаңартты",
		            MONTH: "${d} ${MMM} жаңартылды",
		            TODAY: "Бүгін ${time} уақытта жаңартылған",
		            YEAR: "${d} ${MMM} ${YYYY} жаңартылды",
		            YESTERDAY: "Кеше ${time} уақытта жаңартылды",
		            TOMORROW: "${d} ${MMM} ${YYYY} жаңартылды"
		         },
		         updatedOther: {
		            DAY: "${user} ${EEEE} орнында ${time} уақытында жаңартылды",
		            MONTH: "${user} пайдаланушы ${d} ${MMM} жаңартты",
		            TODAY: "${user} пайдаланушы бүгін ${time} уақытта жаңартты",
		            YEAR: "${user} ${d} ${MMM} ${YYYY} кезінде жаңартылды",
		            YESTERDAY: "${user} пайдаланушы кеше ${time} өрісінде жаңартты",
		            TOMORROW: "${user} ${d} ${MMM} ${YYYY} кезінде жаңартылды"
		         },
		         createdCompact: {
		            DAY: "Жасалған: ${EEEE} ${time} уақытында",
		            MONTH: "Жасалған: ${MMM} ${d}",
		            TODAY: "Жасалған: Бүгін ${time} сағатта",
		            YEAR: "Жасалған: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Жасалған: Кеше ${time} сағатта",
		            TOMORROW: "Жасалған: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Жаңартылды: ${EEEE} ${time} уақытында",
		            MONTH: "Жаңартылған: ${d} ${MMM}",
		            TODAY: "Жаңартылған: Бүгін ${time} сағатта",
		            YEAR: "Жаңартылды: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Жаңартылған: Кеше ${time} сағатта",
		            TOMORROW: "Жаңартылды: ${d} ${MMM} ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${user} деген пайдаланушыдан: ${date_long} ${time_long}",
		         UPDATE_TIMESTAMP: "${user} деген пайдаланушыдан: ${date_long} ${time_long}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "(${size}) файлын жүктеу",
		      	 DOWNLOAD_ALT: "Жүктеп алу"
		      },
		      PREVIEW: {
		         LINK: "Алдын ала қарау",
		         TITLE: "Бұл файлды жаңа терезеде алдын ала қараңыз."
		      },
		      TAGS: "Тегтер:",
		      error: "Қате орын алды.  ${again}.",
		      error_again: "Қайта әрекет етіңіз",
		      error_404: "Файл енді жоқ немесе файлға қатынасу үшін қажетті рұқсатыңыз жоқ.",
		      error_403: "Бұл файлды көруге рұқсатыңыз жоқ. Файл жалпы көруге арналмаған және сізбен ортақ пайдаланылмаған.",
		      notifications: {
		         USER_SHARED: "${user} деп жазды:",
		         CHANGE_SUMMARY: "${user} өзгерту қорытындысын қамтамасыз етеді",
		         NO_CHANGE_SUMMARY: "${user} өзгерту қорытындысын қамтамасыз етпейді",
		         COMMENTED: "${user} пікір жазды"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Сіз арқылы тіркелген",
		      checkedout_other: "${user} пайдаланушымен тіргелген",
		      tooltip: "${name} файлын кітапханада ашу",
		      draft_404_info: "Жоба жазба жойылды немесе ендігәрі сізбен ортақ пайдаланылмайды. Жарияланған нұсқа осы файлдың ең соңғы нұсқасы болып табылады.",
		      error_404: "Файл жойылды немесе ендігәрі сізбен ортақ пайдаланылмайды.",
		      error_403: "Файл жойылды немесе ендігәрі сізбен ортақ пайдаланылмайды.",
		      error_preview: "Бұл файл алдын ала қарау үшін қол жетімді емес.",
		      draft_review_canceled: "Сараптау болдырылмады және жоба жазба сізбен ортақ пайдаланылмайды. Сараптау ендігәрі қажет болмайды.",
		      switch_ee: "Жоба жазбаны қарау",
		      switch_ee_tooltip: "Осы файлдың ең соңғы жоба жазбасын қарау"
		   },
		   ecm_draft: {
		      tooltip: "${name} жоба жазбасын кітапханада ашу",
		      community_owners: "Қауымдастық иелері",
		      draft: "Жоба",
		      draft_tooltip: "Жоба жазбасын көру",
		      draft_general_info: "Алдыңғы жоба жазба ендігәрі болмайды және жаңарақ жоба жазба ең соңғы нұсқасы болып табылады.",
		      draft_review_404_general_info: "Сараптаушылардың біріне дауыс берілді. Осы жоба жазбаны ендігәрі сараптаудың қажеті жоқ.",
		      draft_review_404_request_info: "Алдыңғы жоба жазба ендігәрі болмайды және ең соңғы жоба жазба сараптауға жіберілді. Сараптау қажет етіледі.",
		      draft_review_404_require_info: "Алдыңғы жоба жазба ендігәрі болмайды және ең соңғы жоба жазба сараптауға жіберілді. Сараптау қажет етіледі.",
		      draft_review_request_info: "Сараптау қажет етіледі.",
		      draft_review_require_info: "Сараптау қажет етіледі.",
		      error_404: "Жоба жазба жойылды немесе ендігәрі сізбен ортақ пайдаланылмайды.",
		      error_403: "Осы жоба жазба сізбен ортақ пайдаланылатындықтан, оны сараптау мүмкін емес.",
		      error_preview: "Алдын ала қарау үшін осы жазба қол жетімді емес.",
		      switch_ee: "Жарияланған нұсқасын қарау",
		      switch_ee_tooltip: "Осы файлдың жарияланған нұсқасын қарау",
		      review: "Сараптау",
		      reviewers: "Сараптаушылар",
		      reviwers_addtl: "Қосымша сараптаушылар",
		      in_review: "Жоба жазба қарастырылуда",
		      in_review_tooltip: "Қарастырылап жатқан жоба жазбаны қарау",
		      review_required_any: "Қауымдастық иелеріне осы жоба жазбаны қарау үшін бір сараптаушы қажет.",
		      review_required_all: "Қауымдастық иелеріне осы жоба жазбаны қарау үшін барлық сараптаушылар қажет.",
		      review_required_generic: "Қауымдастық иелеріне осы жоба жазбаны қарау үшін мына сараптаушылар қажет.",
		      review_additional_required: "Жоба жазбаны жіберуші арқылы қосылған барлық сараптаушылардан осы жоба жазбаны қарау талап етіледі.",
		      reivew_submitted_date: {
		         DAY: "${user} жоба жазбаны ${EEEE} орнында ${time} уақытта сараптауға жіберді.",
		         MONTH: "${user} жоба жазбаны ${MMM} күні ${d} сараптауға жіберді.",
		         TODAY: "${user} жоба жазбаны бүгін ${time} уақытта сараптауға жіберді.",
		         YEAR: "${user} жоба жазбаны ${MMM} ${d}, ${YYYY} жылы сараптауға жіберді.",
		         YESTERDAY: "${user} жоба жазбаны кеше ${time} уақытта сараптауға жіберді.",
		         TOMORROW: "${user} жоба жазбаны ${MMM} ${d}, ${YYYY} жылы сараптауға жіберді."
		      },
		      pending: "Күтуде",
		      pending_rejected: "Жоба жазба қабылданбағандықтан, оны ендігәрі қараудың қажеті жоқ",
		      approve: "Бекіту",
		      approved: "Бекітілген",
		      approve_tooltip: "Осы жазбаны бекіту",
		      accept_success: "Осы жазбаны бекіттіңіз.",
		      accept_error: "Осы жазбаны бекіту қатесі болды. Қайталап көріңіз.",
		      accept_info: "Осы жазбаны бекіттіңіз.",
		      reject: "Бас тарту",
		      rejected: "Қабылданбады",
		      reject_tooltip: "Осы жоба жазба қабылданбады",
		      reject_success: "Осы жоба жазбаны қабылдамады.",
		      reject_error: "Осы жоба жазбаны қабылдамау кезінде қате болды. Қайталап көріңіз.",
		      reject_info: "Осы жоба жазба қабылданбады."
		   },
		   authUser: {
		      error: "Ағымдағы пайдаланушыны шығару барысында қате орын алды.  ${again}.",
		      error_again: "Қайта әрекет етіңіз",
		      error_404: "Тіркелген пайдаланушыны табу мүмкіндігі жоқ.",
		      error_403: "Пайдаланушы ақпаратын шығару рұқсатыңыз жоқ."
		   },
		   forum: {
		      error: "Қате орын алды.  ${again}.",
		      error_again: "Қайта әрекет етіңіз",
		      error_404: "Форум енді жоқ немесе файлға қатынасу үшін қажетті рұқсатыңыз жоқ.",
		      error_403: "Бұл форумды көруге рұқсатыңыз жоқ. Бұл жалпы форум емес және сізбен ортақ пайдаланылмайды.",
		      readMore: "Толық бөлімді көру...",
		      readMore_tooltip: "${name} форум бөлімін ашыңыз.",
		      readMore_a11y: "Бұл сілтемені белсендіру жаңа терезедегі ${name} форумын ашады.",
		      QUESTION_ANSWERED: "Сұраққа жауап берілді.",
		      QUESTION_NOT_ANSWERED: "Сұраққа әлі жауап берілмеді.",
		      attachments: "${count} тіркемелер",
		      attachments_one: "${count} тіркеме"
		   },
		   blog: {
		      error: "Қате орын алды.  ${again}.",
		      error_again: "Қайта әрекет етіңіз",
		      error_404: "Блок енді жоқ немесе файлға қатынасу үшін қажетті рұқсатыңыз жоқ.",
		      error_403: "Бұл блогты көрсетуге рұқсатыңыз жоқ. Блог жалпы емес және сізбен ортақ емес.",
		      readMore: " Көбірек оқу ...",
		      readMore_tooltip: "${name} блог жазбасын ашыңыз.",
		      readMore_a11y: "Бұл сілтемені белсендіру жаңа терезедегі ${name} блог жазбасын ашады.",
		      graduated: "Біткен",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Дауыс беру</a>",
		  					TOOLTIP: 	"Осы үшін дауыс беру"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Дауыс берді</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Дауыс берді</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Болдырмау</a>",
		  					TOOLTIP: 	"Дауысыңызды осыдан жою"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 адам осы үшін дауыс берді"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 адам осы үшін дауыс берді"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} адам осы үшін дауыс берді"
		  				}
		  			},
		  			LOADING: "Жүктелуде...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Дауыс берді"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Сіз үшін ой қол жетімсіз болғандықтан немесе сіз дауыс беру шегіңізге жеткендіктен біз сіздің дауысыңызды сақтай алмадық.",
		      readMore_tooltip: "${name} пікірін ашыңыз.",
		      readMore_a11y: "Бұл сілтемені белсендіру жаңа терезедегі ${name} пікірін ашады."
		   },
		   size: {
		      B: "${0} байт",
		      KB: "${0} Кбайт",
		      MB: "${0} Мбайт",
		      GB: "${0} Гбайт"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Жауаптар",
		      THIS_ARIA_LABEL: "Бұл жауап",
		      THIS_TAB_TITLE: "Бұл жауап",
		      TAB_TITLE: "Жауап берулер (${0})",
		      REPLY_TO_REPLY: "${thisReply} жауабы ретінде",
		      REPLY_TO_TOPIC: "${thisTopic} жауабы ретінде",
		      THIS_TOPIC: "Бұл тақырыпша",
		      THIS_REPLY: "Бұл жауап",
		      NAVIGATE_TO_REPLY: "Тектік жауапты шарлау",
		      NAVIGATE_TO_TOPIC: "Тектік тақырыпшаны шарлау",
		      ADD_COMMENT: "Бұл тақырыпшаға жауап беру",
		      ADD_COMMENT_TOOLTIP: "Осы форум тақырыпшасына жауап беру",
		      SHOWING_RECENT_REPLIES: "${0} ең соңғы жауаптарды көрсету",
		      PREV_COMMENTS: "Қосымша жауаптарды көру",
		      PLACEHOLDER_TXT: "Бұл тақырыпшаға жауап беру",
		      EMPTY: "Жауап берулер жоқ.",
		      TRIM_LONG_COMMENT: "Қысқа жауап қажет пе?",
		      WARN_LONG_COMMENT: "Жауап беру тым ұзын.  ${shorten}",
		      ERROR: "Жауап берулерді қалпына келтіруде қате орын алды. ${again}",
		      ERROR_CREATE: "Жауабыңызды сақтау мүмкін болмады.  Әрекетті кейін қайталап көріңіз.",
		      ERROR_CREATE_NOT_FOUND: "Бөлім жойылғандықтан немесе сізге енді көрінбейтіндіктен, жауабыңызды сақтау мүмкін болмады.",
		      ERROR_CREATE_ACCESS_DENIED: "Бөлім жойылғандықтан немесе сізге енді көрінбейтіндіктен, жауабыңызды сақтау мүмкін болмады.",
		      ERROR_CREATE_TIMEOUT: "Серверге қосылмағандықтан, жауабыңызды сақтау мүмкін болмады.  Әрекетті қайталау үшін 'сақтау' пәрменін нұқыңыз.",
		      ERROR_CREATE_CANCEL: "Сұраныс болдырылмағандықтан, жауабыңызды сақтау мүмкін болмады.  Әрекетті қайталау үшін 'сақтау' пәрменін нұқыңыз.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Бұл жауапты жасау үшін, жүйеге кіруіңіз қажет.  Жүйеге кіру ұсынысы берілу үшін, 'Сақтау' түймешігін басыңыз.",
		      ERROR_NO_CONTENT: "Жауабыңызды енгізіп, 'Сақтау басыңыз.'  Егер бұдан былай жауап қалдырғыңыз келмесе, 'болдырмау' пәрменін басыңыз.",
		      ERROR_UNAUTHORIZED: "Сіздің жауабыңыз сақтала алмайды, себебі сіздің жауап берулер қалдыруға уәкілеттігіңіз жоқ.",
		      COMMENT_DELETED: {
		         DAY: "Жауап беру ${user} ${EEEE} күні ${time} сағатта жойылды",
		         MONTH: "Жауап беру ${user} тарапынан ${MMM} ${d} күні жойылды",
		         TODAY: "Жауап беру ${user} тарапынан бүгін ${time} сағатта жойылды",
		         YEAR: "Жауап беру ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында жойылды",
		         YESTERDAY: "Жауап беру ${user} тарапынан кеше ${time} сағатта жойылды",
		         TOMORROW: "Жауап беру ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында жойылды"
		      },
		      REASON_FOR_DELETION: "Жою себебі: ${reason}",
		      REPLY_TITLE: "Жауап беру: ${0}",
		      SHOW_FULL_REPLY: "Толық жауапты көру",
		      SHOW_FULL_REPLY_TOOLTIP: "Форум бөіліміндегі бастапқы жауапқа шарлау",
		      REPLY_ACTION: "Жауап беру",
		      REPLY_ACTION_TOOLTIP: "Осы поштаға жауап беру",
		      MODERATION_PENDING: "Мына жауап шолуды күтуде.",
		      MODERATION_QUARANTINED: "Хабар модератор арқылы уақытша тыйым салынды.",
		      MODERATION_REMOVED: {
		         DAY: "Бұл жауап ${user} пайдаланушымен ${EEEE} өрісінде ${time} уақытында жойылды.",
		         MONTH: "Бұл жауап ${user} пайдаланушымен ${MMM} ${d} өрісінде жойылды.",
		         TODAY: "Бұл жауап ${user} өрісі арқылы бүгін ${time} уақытында жойылды.",
		         YEAR: "Бұл жауап ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында жойылды.",
		         YESTERDAY: "Бұл жауап ${user} тарапынан кеше ${time} уақытынды жойылды.",
		         TOMORROW: "Бұл жауап ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында жойылды."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Бұл жауап ${user} тарапынан ${EEEE} өрісінде ${time} уақытында бас тартылды.",
		         MONTH: "Бұл жауап ${user} пайдаланушымен ${d} ${MMM} өрісінде қабылданбады.",
		         TODAY: "Бұл жауап ${user} тарапынан бүгін ${time} уақытында бас тартылды.",
		         YEAR: "Бұл жауап ${user} тарапынан ${d} ${MMM} ${YYYY} уақытында бас тартылды.",
		         YESTERDAY: "Бұл жауап ${user} тарапынан ${time} кеше бас тартылды.",
		         TOMORROW: "Бұл жауап ${user} тарапынан ${d} ${MMM} ${YYYY} уақытында бас тартылды."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Жауабыңыз қайта қарауға тапсырылып, расталған соң қол жетімді болады."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Пікірлер",
		      PLACEHOLDER_TXT: "Пікір қосу",
		      TAB_TITLE: "Пікірлер (${0})",
		      ACTION_NOT_SUPPORTED: "Қолдау көрсетілмеген әрекет",
		      ADD_COMMENT: "Пікір қосу",
		      ADD_COMMENT_TOOLTIP: "Бұл элементке пікір қосу",
		      CANCEL: "Болдырмау",
		      COMMENT_COUNT_ONE: "${0} пікір",
		      COMMENT_COUNT_MANY: "${0} пікір",
		      COMMENT_LABEL: "Аңғартпа:",
		      DELETE: "Жою",
		      DELETE_TOOLTIP: "Аңғартпаны жою",
		      DELETEREASON: "Осы аңғартпаны өшіру себебі:",
		      DIALOG_TITLE: "Аңғартпаны қысқарту",
		      TOOLTIP: "Аңғартпаны қысқарту",
		      NAME: "Аңғартпаны қысқарту",
		      EDIT: "Өңдеу",
		      EDIT_TOOLTIP: "Аңғартпаны өңдеу",
		      ERROR_CREATE: "Аңғартпаны сақтау мүмкін болмады.  Әрекетті кейін қайталап көріңіз.",
		      ERROR_CREATE_NOT_FOUND: "Элемент жойылғандықтан немесе сізге көрінбейтіндіктен сіздің пікіріңізді сақтау мүмкін болмады.",
		      ERROR_CREATE_ACCESS_DENIED: "Элемент жойылғандықтан немесе сізге көрінбейтіндіктен сіздің пікіріңізді сақтау мүмкін болмады.",
		      ERROR_CREATE_TIMEOUT: "Серверге қосылмағандықтан, аңғартпаңызды сақтау мүмкін болмады.  Әрекетті қайталау үшін 'жіберу' пәрменін басыңыз.",
		      ERROR_CREATE_CANCEL: "Сұраныс болдырылмағандықтан, аңғартпаңызды сақтау мүмкін болмады.  Әрекетті қайталау үшін 'жіберу' пәрменін басыңыз.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Бұл аңғартпаны жасау үшін, жүйеге кіруіңіз керек.  Жүйеге кіру ұсынысы берілу үшін, 'Жіберу' түймешігін басыңы.",
		      ERROR_DELETE: "Аңғартпаны өшіру мүмкін болмады.  Әрекетті кейін қайталап көріңіз.",
		      ERROR_DELETE_TIMEOUT: "Серверге қосылмағандықтан, аңғартпаңызды жою мүмкін болмады.  Әрекетті қайталау үшін, 'Жою' түймешігін басыңыз.",
		      ERROR_DELETE_NOT_FOUND: "Пікір немесе элементтің жойылу себебнінен немесе сізге көрінбейтін болғандықтан, сіздің пікіріңізді жою мүмкін емес.",
		      ERROR_DELETE_ACCESS_DENIED: "Элементтің жойылу себебінен немесе сізге крінбейтін болғандықтан, сіздің пікіріңізді жою мүмкін емес.",
		      ERROR_DELETE_CANCEL: "Сұраныс болдырылмағандықтан, сіздің аңғартпаңызды жою мүмкін болмады.  Әрекетті қайталау үшін, 'Жою' түймешігін басыңыз.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Бұл аңғартпаны жою үшін, жүйеге кіруіңіз керек.  Кіру ұсынысы берілу үшін, 'Жою' түймешігін басыңыз.",
		      ERROR_EDIT: "Аңғартпаны жаңарту мүмкін болмады.  Әрекетті кейін қайталап көріңіз.",
		      ERROR_EDIT_ACCESS_DENIED: "Пікіріңізді жаңарту мүмкін болмады, себебі элемент жойылған немесе сізге көрінбейтін болған.",
		      ERROR_EDIT_NOT_FOUND: "Пікіріңізді жаңарту мүмкін болмады, себебі элемент жойылған немесе сізге көрінбейтін болған.",
		      ERROR_EDIT_TIMEOUT: "Серверге қосылмағандықтан, аңғартпаңызды жаңарту мүмкін болмады.  Әрекетті қайталау үшін 'жіберу' пәрменін басыңыз.",
		      ERROR_EDIT_CANCEL: "Сұраныс болдырылмағандықтан, аңғартпаңызды жаңарту мүмкін болмады.  Әрекетті қайталау үшін 'жіберу' пәрменін басыңыз.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Бұл аңғартпаны өңдеу үшін, жүйеге тіркелуіңіз қажет.  Жүйеге кіру ұсынысы берілу үшін, 'Жіберу' түймешігін басыңы.",
		      ERROR_NO_CONTENT: "Пікіріңізді енгізіп, 'Жіберу' басыңыз.  Егер бұдан былай аңғартпа қалдырғыңыз келмесе, 'болдырмау' пәрменін нұқыңыз.",
		      ERROR_NO_CONTENT_EDIT: "Пікіріңізді енгізіп, 'Жіберу' басыңыз.  Егер бұдан былай пікірді өңдегіңіз келмесе, 'болдырмау' пәрменін басыңыз.",
		      ERROR_UNAUTHORIZED: "Сіздің пікіріңіз сақтала алмайды, себебі сіздің пікірлер қалдыруға уәкілеттігіңіз жоқ.",
		      ERROR_GENERAL: "Қате орын алды.",
		      OK: "OK",
		      YES: "иә",
		      TRIM_LONG_COMMENT: "Аңғартпаны қысқарту керек пе?",
		      WARN_LONG_COMMENT: "Пікір тым ұзын.  ${shorten}",
		      LINK: "Сілтеме",
		      SAVE: "Сақтау",
		      POST: "Хабар",
		      SHOWMORE: "Қосымша мәлімет оқу...",
		      VIEW_COMMENTS_FILE: "Осы файлдағы аңғартпаларды қараңыз",
		      SUBSCRIBE_TO_COMMENTS: "Осы аңғартпаларға жазылу",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Осы аңғартпаларға жасалған өзгерістерге feed reader арқылы өтіңіз",
		      PROFILE_TITLE: "${user} пайдаланушысының профилін ашыңыз.",
		      PROFILE_A11Y: "Бұл сілтемені белсендіру ${user} пайдаланушысының профилін жаңа терезеде ашады.",
		      MODERATION_PENDING: "Бұл аңғартпа тексеруді күтуде.",
		      MODERATION_REMOVED: {
		         DAY: "Бұл пікір ${user} пайдаланушымен ${EEEE} өрісінде ${time} уақытында жойылды.",
		         MONTH: "Бұл пікір ${user} пайдаланушымен ${MMM} ${d} өрісінде жойылды.",
		         TODAY: "Бұл пікір ${user} өрісі арқылы бүгін ${time} уақытында жойылды.",
		         YEAR: "Бұл пікір ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында жойылды.",
		         YESTERDAY: "Бұл пікір ${user} тарапынан кеше ${time} уақытынды жойылды.",
		         TOMORROW: "Бұл пікір ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында жойылды."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Бұл пікір ${user} тарапынан ${EEEE} өрісінде ${time} уақытында бас тартылды.",
		         MONTH: "Бұл пікір ${user} пайдаланушымен ${MMM} ${d} өрісінде қабылданбады.",
		         TODAY: "Бұл пікір ${user} тарапынан бүгін ${time} уақытында бас тартылды.",
		         YEAR: "Бұл пікір ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында бас тартылды.",
		         YESTERDAY: "Бұл пікір ${user} тарапынан ${time} кеше бас тартылды.",
		         TOMORROW: "Бұл пікір ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында бас тартылды."
		      },
		      PREV_COMMENTS: "Алдыңғы түсіндірмелерді көру",
		      EMPTY: "Пікірлер жоқ.",
		      ERROR_ALT: "Қате",
		      ERROR: "Пікірлерді қалпына келтіруде қате орын алды. ${again}",
		      ERROR_ADDTL: "Қосымша түсіндірмелерді қалпына келтіруде қате орын алды. ${again}",
		      ERROR_AGAIN: "Қайталап көріңіз.",
		      ERROR_AGAIN_TITLE: "Толық пікірлер үшін қайта сұрау жасаңыз.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} ${time} уақытынды (${version} нұсқасы)",
		         MONTH: "${user} ${MMM} ${d} (${version} нұсқасы)",
		         TODAY: "${user} бүгін ${time} уақытында (${version} нұсқасы)",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (${version} нұсқасы)",
		         YESTERDAY: "${user} кеше ${time} уақытында (${version} нұсқасы)",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (${version} нұсқасы)"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${time} өрісіндегі ${user} ${EEEE}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} бүгін ${time} уақытында",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} кеше ${time} уақытында",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} күні ${time} сағатта",
		         MONTH: "${MMM} ${d}",
		         TODAY: "Бүгін ${time} уақытта",
		         YEAR: "${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Кеше ${time} уақытта",
		         TOMORROW: "${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Аңғартпа ${user} пайдаланушымен ${EEEE} өрісінде ${time} уақытта жойылды",
		         MONTH: "Пікір ${user} пайдаланушымен ${MMM} ${d} өрісінде жойылды",
		         TODAY: "Пікір ${user} тарапынан бүгін сағат ${time} өшірілді",
		         YEAR: "Пікір ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында жойылды",
		         YESTERDAY: "Пікір ${user} тарапынан кеше сағат ${time} өшірілді",
		         TOMORROW: "Пікір ${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында жойылды"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} тарапынан ${EEEE} ${time} уақытында өңделді (${version} нұсқасы)",
		         MONTH: "${user} тарапынан ${MMM} ${d} өңделді (нұсқа ${version})",
		         TODAY: "${user} тарапынан ${time} уақытында өңделді (${version} нұсқасы)",
		         YEAR: "${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында өңделді (${version} нұсқасы)",
		         YESTERDAY: "${user} кеше ${time} уақытында өңделді (${version} нұсқасы)",
		         TOMORROW: "${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында өңделді (${version} нұсқасы)"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} тарапынан ${EEEE} ${time} уақытында өңделді",
		         MONTH: "${user} тарапынан ${MMM} ${d} уақытта",
		         TODAY: "${user} бүгін ${time} уақытында өңделді",
		         YEAR: "${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында өңделді",
		         YESTERDAY: "${user} кеше ${time} уақытында өңделді",
		         TOMORROW: "${user} тарапынан ${MMM} ${d}, ${YYYY} уақытында өңделді"
		      },
		      DELETE_CONFIRM: "Осы аңғартпаны жойғыңыз келетініне сенімдісіз бе?",
		      FLAG_ITEM: {
		         BUSY: "Сақталуда...",
		         CANCEL: "Болдырмау",
		         ACTION: "Сәйкес емес деп белгілеу",
		         DESCRIPTION_LABEL: "Осы элементті белгілеу үшін себебін беріңіз (міндетті емес)",
		         EDITERROR: "Қате орын алғандықтан, файлдың метадеректері өңделген жоқ",
		         OK: "Сақтау",
		         ERROR_SAVING: "Өтінішті орындау қате болды. Әрекетті кейін қайталап көріңіз.",
		         SUCCESS_SAVING: "Белгіңіз тапсырылды. Модератор қысқаша зерттейді.",
		         TITLE: "Осы сілтемені сәйкес емес деп белгілеу",
		         COMMENT: {
		            TITLE: "Осы аңғартпаға қатысы жоқ деп жалауға тігіңіз",
		            A11Y: "Осы түймешік пайдаланушыға осы пікірді сәйкес емес ретінде байрақша қоюға рұқсат беретін тілқатысу терезесін ашады."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Болдырмау",
		      DIALOG_TITLE: "Аңғартпаны жою",
		      NAME: "Аңғартпаны жою",
		      OK: "OK",
		      TOOLTIP: "Аңғартпаны жою"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Болдырмау",
		      CONFIRM: "Қысқарту әрекеті аңғартпа шегінен асатын мәтінді жояды.  Аңғартпаны өзіңіз қысқарту үшін 'OK' түймешігін, өңдеу үшін 'Болдырмау' түймешігін басыңыз.",
		      DIALOG_TITLE: "Аңғартпаны қысқарту",
		      NAME: "Аңғартпаны қысқарту",
		      OK: "OK",
		      TOOLTIP: "Аңғартпаны қысқарту"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Бағыныңқылы құптау",
		      CONFIRM: "Аңғартпаңыз қайта қарауға тапсырылып, расталған соң қолжетімді болады.",
		      OK: "OK"
		   },
		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "түстен кейін",
		      TODAY: "бүгін",
		      TODAY_U: "Бүгін",
		      YESTERDAY: "кеше",
		      YESTERDAY_U: "Кеше",
		      ADDED: { DAY: "${EEee} пәрменін ${time} өрісінде қосты",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long} күні қосылды",
		         TODAY: "Бүгін ${time} өрісінде қосты",
		         YEAR: "${date_long} күні қосылды",
		         YESTERDAY: "Кеше ${time} өрісінде қосты"
		      },
		      LAST_UPDATED: { DAY: "${EEee} ${time} өрісінде соңғы жаңартты",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Соңғы жаңартылған ${date_long}",
		         TODAY: "Бүгінгі соңғы жаңартылған ${time} сағатта",
		         YEAR: "Соңғы жаңартылған ${date_long}",
		         YESTERDAY: "Кеше ${time} сағатта соңғы жаңартылған"
		      },
		      MONTHS_ABBR: { 0: "ҚАҢ",
		         10: "ҚАР",
		         11: "ЖЕЛ",
		         1: "АҚП",
		         2: "НАУ",
		         3: "СӘУ",
		         4: "МАМЫР",
		         5: "МАУ",
		         6: "ШІЛ",
		         7: "ТАМ",
		         8: "ҚЫР",
		         9: "ҚАЗ"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Бүгін",
		         YEAR: "${date_short}",
		         YESTERDAY: "Кеше",
		         TOMORROW: "Ертең"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} күні ${time} сағатта",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Бүгін ${time} уақытта",
		         YEAR: "${date_short}",
		         YESTERDAY: "Кеше ${time} уақытта",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} күні ${time} сағатта",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Бүгін ${time} уақытта",
		         YEAR: "${date_long}",
		         YESTERDAY: "Кеше ${time} уақытта",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} күні ${time} сағатта",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} күні ${time} сағатта",
		         TODAY: "${date_short} күні ${time} сағатта",
		         YEAR: "${date_short} күні ${time} сағатта",
		         YESTERDAY: "${date_short} күні ${time} сағатта",
		         TOMORROW: "${date_short} күні ${time} сағатта"
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
		      UPDATED: { DAY: "${EEee} ${time} өрісінде жаңартты",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long} күні жаңартылды",
		         TODAY: "Бүгін ${time} уақытта жаңартылған",
		         YEAR: "${date_long} күні жаңартылды",
		         YESTERDAY: "Кеше ${time} уақытта жаңартылды"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Нұсқа ақпаратын жүктеп алу мүмкін емес.",
		      ERROR_REQUEST_CANCELLED: "Сұраныс болдырылмады.",
		      ERROR_REQUEST_TIMEOUT: "Серверге қосылу мүмкін болмады.",
		      ERROR_REQUEST_UNKNOWN: "Белгісіз қателік орын алды.",
		      LOADING: "Жүктелу..",
		      NO_VERSIONS: "Ешқандай нұсқалар жоқ",
		      INFO: "${0} нұсқасын ${1} өрісінде жасаған: ",
		      VERSION_NUMBER: "${0} нұсқасы",
		      DELETED: "Жойылған",
		      DELETE_ALL: "Жаңа нұсқаның алдындағы барлық нұсқаларды жою",
		      DELETE_VERSION_SINGLE: "${0} нұсқасын жою",
		      DELETEERROR: "Қате орын алғандықтан, нұсқа жойылған жоқ.",
		      CREATE_VERSION: "Жаңа нұсқаны жасау",
		      CREATE_VERSION_TOOLTIP: "Осы файлдың нұсқасын жасау",
		      REVERT_VERSION: "${0} нұсқасын қалпына келтіру",
		      REVERT_DESCRIPTION: "${0} нұсқасынан қалпына келтірілген",
		      PREVIOUS: "Алдыңғы",
		      PREVIOUS_TOOLTIP: "Алдыңғы бет",
		      ELLIPSIS: "...",
		      NEXT: "Келесі",
		      NEXT_TOOLTIP: "Келесі бет",
		      COUNT: "${2} ішінен ${0}-${1}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Бет",
		      SHOW: "Көрсету",
		      ITEMS_PER_PAGE: " әр беттің элементтері.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Бүгін ${time} уақытта",
		            YESTERDAY: "Кеше ${time} уақытта"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} күні ${time} сағатта",
		            YEAR: "${date_short} күні ${time} сағатта",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} күні ${time} сағатта",
		            TODAY: "Бүгін ${time} уақытта",
		            YESTERDAY: "кеше ${time} уақытта"
		        },
		        UPDATED: { DAY: "${EEee} ${time} өрісінде жаңартты",
		            YEAR: "${date_short} өрісі жаңартылды",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} өрісі жаңартылды",
		            TODAY: "Бүгін ${time} уақытта жаңартылған",
		            YESTERDAY: "Кеше ${time} уақытта жаңартылды"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "${0} нұсқасын жою",
		         DOWNLOAD: "Жүктеп алу",
		         DOWNLOAD_TOOLTIP: "(${0}) нұсқасын жүктеу",
		         VIEW: "Көрініс",
		         VIEW_TOOLTIP: "${0} нұсқасын көру",
		         REVERT: {
		            A11Y: "Осы түймешік пайдаланушыға файлды алдыңғы нұсқаны қалпына келтіруді құптауға рұқсат беретін тілқатысу терезесін ашады. Осы әрекетті құптау, беттегі мазмұнның жаңартуында нәтиже береді.",
		            FULL: "Қалпына келтіру",
		            WIDGET: "Осы нұсқаны қалпына келтіру"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Гұсқа әлдеқаша жойылғандықтан немесе енді сізге көрінбейтіндіктен, оны жою мүмкін емес.",
		         ERROR_ACCESS_DENIED: "Сіз өңдеуші болмағандығыңыздықтан, нұсқаны жою мүмкін болмады.",
		         ERROR_TIMEOUT: "Сервер қосылмағандықтан, нұсқа жойылмады.  Сұрауды қайталау үшін, 'Жою' түймешігін басыңыз.",
		         ERROR_CANCEL: "Сұраныс болдырылмағандықтан, нұсқа жойылмады.  Сұрауды қайталау үшін, 'Жою' түймешігін басыңыз.",
		         ERROR_NOT_LOGGED_IN: "Бұл нұсқаны жою үшін, жүйеге кіруіңіз қажет.  Кіру ұсынысы берілу үшін, 'Жою' түймешігін басыңыз.",
		         GENERIC_ERROR: "Белгісіз қатеге байланысты нұсқа жойылмады.  Сұрауды қайталау үшін, 'Жою' түймешігін басыңыз.",
		         FULL: "Жою",
		         A11Y: "Осы түймешік пайдаланушыға осы нұсқаның жойылуын құптауға рұқсат беретін тілқатысу терезесін ашады. Осы әрекетті құптау, беттегі мазмұнның жаңартуында нәтиже береді."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Жойылғандықтан немесе енді сізге көрінбейтіндіктен, нұсқаны қалпына келтіру мүмкін болмады.",
		         ERROR_ACCESS_DENIED: "Сіз өңдеуші болмағандығыңыздықтан, нұсқаны қалпына келтіру мүмкін болмады.",
		         ERROR_NAME_EXISTS: "Осылай аталатын басқа файл бар болғандықтан нұсқаны қалпына келтіру мүмкін болмады.",
		         ERROR_TIMEOUT: "Серверге қосылмағандықтан, нұсқа қалпына келтірілген жоқ.  Cұрауыңызды қайталау үшін, 'Қалпына келтіру' түймешігін басыңыз.",
		         ERROR_CANCEL: "Сұраныс болдырылмағандықтан, нұсқа қалпына келтірілмеді.  Cұрауыңызды қайталау үшін, 'Қалпына келтіру' түймешігін басыңыз.",
		         ERROR_QUOTA_VIOLATION: "Бос орын шектеулі болғандықтан нұсқаны қалпына келтіру мүмкін болмады.",
		         ERROR_MAX_CONTENT_SIZE: "Нұсқаның көлемі ең үлкен рұқсат етілетін ${0} өлшемінен асатындақтан, оны қалпына келтіру мүмкін болмады",
		         GENERIC_ERROR: "Белгісіз қате орын алғандықтан, нұсқаны қалпына келтіру мүмкін болмады.  Cұрауыңызды қайталау үшін, 'Қалпына келтіру' түймешігін басыңыз."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Кімнің жүктегенін көру...",
		      PREVIOUS: "Алдыңғы",
		      PREVIOUS_TOOLTIP: "Алдыңғы бет",
		      ELLIPSIS: "...",
		      NEXT: "Келесі",
		      NEXT_TOOLTIP: "Келесі бет",
		      COUNT: "${2} ішінен ${0}-${1}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Бет",
		      SHOW: "Көрсету",
		      ITEMS_PER_PAGE: " әр беттің элементтері.",
		      VERSION: {
		         DAY: "${date} күнгі ${version} нұсқасы",
		         MONTH: "${date} күнгі ${version} нұсқасы",
		         TODAY: "${time} сағаттағы ${version} нұсқасы",
		         YEAR: "${date} күнгі ${version} нұсқасы",
		         YESTERDAY: "Кешегі ${version} нұсқасы"
		      },
		      FILE: {
		         V_LATEST: "Бұл файлдың соңғы нұсқасын жүктеп алдыңыз",
		         V_OLDER: "Бұл файлдың соңғы рет ${0} нұсқасын жүктеп алдыңыз",
		         LOADING: "Жүктелуде...",
		         EMPTY: "Тек жасырын пайдаланушылар",
		         ERROR: "жүктеп алу мәліметтерін алу мүмкін емес"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Қате",
		      ERROR_ALT_TEXT: "Қате:",
		      ERROR_MSG_GENERIC: "Бір нәрсе дұрыс болмады.  Әрекетті қайталап көріңіз.",
		      ERROR_MSG_NOT_AVAILABLE: "Бұл элемент жойылған немесе енді қол жетімді емес.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Бұл элемент мазмұны қол жетімді емес.",
		      ERROR_MSG_NO_ACCESS: "Бұл элементке енді қатынасу құқығына ие емессіз.",
		      LOADING: "Жүктелуде...",
		      TITLE_SU: "${author} хабарлама жіберді.",
		      TITLE_NI: "${author} олардың желісіне кіру үшін шақыртты.",
		      AUTHOR_TITLE: "${author} үшін профильді көрсету",
		      OPEN_LINK: "${title} ашу",
		      CONFIRM_CLOSE_TITLE: "Растау",
		      CONFIRM_CLOSE_MESSAGE: "Өзгертулерді шынымен тастап шығасыз ба? Жалғастыру үшін OK түймешігін, оралу үшін Болдырмау түймешігін басыңыз",
		      OK: "OK",
		      CANCEL: "Болдырмау"
		   },
		   MESSAGE: {
		      SUCCESS: "Растама",
		      ERROR: "Қате",
		      ERROR_ALT_TEXT: "Қате:",
		      INFO: "Ақпарат",
		      WARNING: "Ескерту",
		      DISMISS: "Осы хабарды жасыру",
		      MORE_DETAILS: "Көбірек мәліметтер",
		      HIDE_DETAILS: "Мәліметтерді жасыру"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Жасалған: ${EEEE} ${time} уақытында",
		           MONTH: "Жасалған: ${MMM} ${d}",
		           TODAY: "Жасалған: Бүгін ${time} сағатта",
		           YEAR: "Жасалған: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Жасалған: Кеше ${time} сағатта",
		           TOMORROW: "Жасалған: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Қате орын алды.  ${again}.",
		      error_again: "Қайта әрекет етіңіз",
		      error_404: "Күй жаңартуы енді жоқ.",
		      notifications: {
		         STATUS_UPDATE: "${user} хабарлама жіберді",
		         USER_BOARD_POST: "${user} сіздің тақтаңызда жазылды",
		         POST_COMMENT: "${user} деп жазды:"
		      }
		   },
		   login: {
		      error: "Пайдаланушы атыңыз және/немесе құпия сөзіңіз бар есептік жазбалардың ешқайсысына тең емес. Әрекетті қайталап көріңіз.",
		      logIn: "Кіру",
		      password: "Құпия сөз:",
		      user: "Пайдаланушы аты:",
		      welcome: "HCL Connections кіру"
		   },
		   repost: {
		      name: "Қайта жариялау",
		      title: "Бұл есепті орындаушыларым мен қауымдастықтарым үшін қайта жіберу",
		      msg_success: "Жаңартуды орындаушыларға қайта жариялады.",
		      msg_generic: "Бір нәрсе дұрыс болмады.  Әрекетті қайталап көріңіз."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Қосу",
		      ADD_TXT: "Адамдар мен қауымдастықтарды оқырмандар ретінде қосыңыз",
		      SHOW_MORE: "Қосымша көрсету...",
		      READER_IF_PUBLIC: "Кез келген адам (жалпы)",
		      READER_IF_PUBLIC_TOOLTIP: "Бұл файл жалпыға ортақ және бәріне көрінеді",
		      EMPTY_READERS: "Ешбір",
		      READERS_LABEL: "Оқырмандар:\u00a0",
		      EDITORS_LABEL: "Өңдеушілер:\u00a0",
		      OWNER_LABEL: "Иесі:\u00a0",
		      ERROR: "Ортақтандырылған пайдалану ақпаратын жүктеп алу мүмкін болмауда",
		      ERROR_NOT_FOUND: "Сұраған файл жойылған немесе жылжытылған. Егер біреу осы сілтемені жіберсе, оның дұрыстығын тексеріңіз.",
		      ERROR_ACCESS_DENIED: "Бұл файлды көруге рұқсатыңыз жоқ.  Файл жалпы көруге арналмаған және сізбен ортақ пайдаланылмаған.",
		      SHARE: "Ортақ пайдалану",
		      CANCEL: "Болдырмау",
		      SHARE_WITH: "Ортақ пайдалану:",
		      PERSON: "Кісі",
		      COMMUNITY: "Қауымдастық",
		      PLACEHOLDER: "Кісінің аты немесе электрондық пошта мекен-жайы...",
		      MESSAGE: "Хабар:",
		      MESSAGE_TXT: "Міндетті емес хабарды қосу",
		      REMOVE_ITEM_ALT: "${0} рөлін жою",
		      NO_MEMBERS: "Ешбір",
		      A11Y_READER_ADDED: "${0} оқырмандар ретінде бөлектелген",
		      A11Y_READER_REMOVED: "${0} оқырмандар ретінде жойылды",
		      SELF_REFERENCE_ERROR: "Өзіңізбен бөліуіңіз мүмкін емес.",
		      OWNER_REFERENCE_ERROR: "Файлдың иесімен ортақ пайдалана алмайсыз.",
		      SHARE_COMMUNITY_WARN: "'${0}' ортақ қауымдастығымен бөлісу осы файлды ортақ етеді.",
		      SELECT_USER_ERROR: "Бөлісу үшін ең кемінде бір адам немесе қауымдастықты таңдауыңыз керек",
		      WARN_LONG_MESSAGE: "Хабар тым ұзын.",
		      TRIM_LONG_MESSAGE: "Хабарды қысқарту керек пе?",
		      ERROR_SHARING: "Файлды ортақ пайдалану мүмкін емес.  Әрекетті кейін қайталап көріңіз.",
		      INFO_SUCCESS: "Файл сәтті ортақ пайдаланылды.",
		      MAX_SHARES_ERROR: "Бөлісулер ең көп санынан асты.",
		      NOT_LOGGED_IN_ERROR: "Жүйеге кірілмегендіктен файл ортақ пайдаланылмады.  Файлды ортақ пайдалану үшін, 'Ортақ пайдалану' түймесін басыңыз.",
		      TIMEOUT_ERROR: "Сервермен байланыс орнатылмағандықтан файл ортақ пайдаланылмады.  Қайталап көру үшін, 'Ортақ пайдалану' түймесін басыңыз.",
		      CANCEL_ERROR: "Сұрау болдырылмағандықтан файл ортақ пайдаланылмады.  Қайталап көру үшін, 'Ортақ пайдалану' түймесін басыңыз.",
		      NOT_FOUND_ERROR: "Бұл файл жойылған немесе енді сізге көрінбейді, сондықтан оны ортақ пайдалану мүмкін емес.",
		      ACCESS_DENIED_ERROR: "Енді бұл файлды ортақ пайдалануға рұқсатыңыз жоқ.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Шектелген файлды жалпы ету мүмкін емес.",
		      TOOLTIP: "Басқаларға осы файлды пайдалануға рұқсат беру"
		   },
		   HISTORY: {
		      TAB_TITLE: "Соңғы жаңартулар",
		      NO_HISTORY: "Соңғы жаңартулар жоқ.",
		      EMPTY: "Соңғы жаңартуларды осы элемент үшін шығару мүмкін болмады. Ол жойылды не оған енді қатынаса алмайсыз.",
		      MORE: "Алдыңғы жаңартуларды көрсету",
		      ERROR_ALT: "Қате",
		      ERROR: "Жаңартуларды қалпына келтіру кезінде қате орын алды. ${again}",
		      ERROR_ADDTL: "Қосымша жаңартуларды қалпына келтіру кезінде қате орын алды. ${again}",
		      ERROR_AGAIN: "Қайталап көріңіз.",
		      ERROR_AGAIN_TITLE: "Толық жаңартулар үшін қайта сұрау жасаңыз.",
		      PROFILE_TITLE: "${user} пайдаланушысының профилін ашыңыз.",
		      SORT_BY: "\\: бойынша сұрыптаңыз -",
		      SORTS: {
		         DATE: "Күн",
		         DATE_TOOLTIP: "Тарихы бойынша соңынан соңғы жаңартуларға қарай сұрыптау",
		         DATE_TOOLTIP_REVERSE: "Ең аз соңғы тарихынан ең көп соңғы жаңартуларына қарай сұрыптау"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} күні ${time} сағатта",
		             MONTH: "${MMM} ${d}",
		             TODAY: "Бүгін ${time} уақытта",
		             YEAR: "${MMM} ${d}, ${YYYY}",
		             YESTERDAY: "Кеше ${time} уақытта",
		             TOMORROW: "${MMM} ${d}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Осы пікір",
			   REPLY_ACTION: "Жауап беру",
		       REPLY_ACTION_TOOLTIP: "Осы пікірге жауап беру"
		   },
		   OAUTH: {
		      welcomeHeader: "Қосылымдарға қош келдіңіз",
		      continueBtnLabel: "Жалғастыру",
		      continueBtnA11y: "Осы сілтемені іске қосу Қосылымдарға қатынас рұқсатын беру мүмкіндігін беретін жаңа терезені ашады.",
		      clickHere: "Осында басу",
		      infoMsg: "Деректерге кіру үшін қосылымдарға қатынас шегін айқындау керек.",
		      authorizeGadget: "${clickHere} осы бағдарламаға тіркелу үшін, әрі Connections ақпаратына қатынасу үшін.",
		      confirmAuthorization: "${clickHere} Connections ақпаратына қатынасу үшін осы бағдарламаны тіркегеніңізді құптау."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Осы сілтемені белсендіру қосылымдар кітапханасы репозиторийіне қатынас рұқсатын беретін жаңа терезені ашады.",
		      infoMsg: "Connections кітапханасы репозиторийі деректерге кіру үшін қатынас шегін айқындауы керек.",
		      authorizeGadget: "${clickHere} қосылымдар кітапханасы репозиторийі туралы ақпаратқа кіру үшін осы бағдарламаға тіркелу.",
		      confirmAuthorization: "${clickHere} қосылымдар кітапханасы репозиторийі туралы ақпаратқа кіру үшін осы тіркелген бағдарламаны растау."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Болдырмау",
		      CONFIRM: "Өзгертулерді шынымен тастап шығасыз ба?  Жалғастыру үшін OK түймешігін, оралу үшін Болдырмау түймешігін басыңыз.",
		      DIALOG_TITLE: "Растау",
		      NAME: "Растау",
		      OK: "OK",
		      TOOLTIP: "Растау"
		   }
});

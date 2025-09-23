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
		         label: "Més",
		         tooltip: "Més accions"
		       },
		       tags_more: "i ${0} més",
		       ERROR_ALT: "Error",
		       PERSON_TITLE: "Obre el perfil de ${user}.",
		       inactiveUser: "${user} (inactiu)",
		       inactiveIndicator: "(inactiu)",
		       like_error: "No s'ha pogut desar el vostre comentari M'agrada. Torneu a intentar-ho més endavant.",
		       vote_error: "No s'ha pogut desar el vostre vot. Torneu a intentar-ho més endavant."
		   },
		   generic: {
		      untitled: "(Sense títol)",
		      tags: "Etiquetes:",
		      tags_more: "i ${0} més",
		      likes: "Li agrada",
		      comments: "Comentaris",
		      titleTooltip: "Navega fins a ${app}",
		      error: "No es poden recuperar les dades.",
		      timestamp: {
		         created: {
		            DAY: "Creat ${EEEE} a ${time}",
		            MONTH: "Creat ${MMM} ${d}",
		            TODAY: "Creat avui a les ${time}",
		            YEAR: "Creat el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creat ahir a les ${time}",
		            TOMORROW: "Creat el ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Actualitzat ${EEEE} a les ${time}",
		            MONTH: "Actualitzat ${MMM} ${d}",
		            TODAY: "Actualitzat avui a les ${time}",
		            YEAR: "Actualitzat el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Actualitzat ahir a les ${time}",
		            TOMORROW: "Actualitzat el ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Públic",
		         priv: "Privat"
		      },
		      action: {
		         created: "Creat",
		         updated: "Actualitzat"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Rebeu actualitzacions sobre persones que seguiu a la pàgina inicial i al resum de correu electrònic.",
		      profile_title: "Obre el perfil de ${user}.",
		      profile_a11y: "En activar aquest enllaç, s'obrirà el perfil de ${user} en una finestra nova.",
		      error: "S'ha produït un error.  ${again}.",
		      error_again: "Torneu a intentar-ho",
		      error_404: "La sol·licitud de xarxa ja no existeix.",
		      warning: "Advertiment",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Ja sou contactes de xarxa.",
		            	follow: "Ja sou contactes de xarxa i seguiu ${user}."
		            },
		            ignore: {
		            	nofollow: "Heu ignorat la invitació.",
		            	follow: "Heu ignorat la invitació, però ara seguiu ${user}."
		            }
		         },
		         error: {
		            accept: "S'ha produït un error en acceptar la sol·licitud.",
		            ignore: "S'ha produït en error en ignorar la sol·licitud."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} a les ${time}",
		              MONTH: "${d} de ${MMM}",
		              TODAY: "Avui a les ${time}",
		              YEAR: "${d} de ${MMM} de ${YYYY}",
		              YESTERDAY: "Ahir a les ${time}",
		              TOMORROW: "${d} de ${MMM} de ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "En activar aquest perfil, s'obrirà ${name} en una finestra nova.",
		      tooltip: "Obre ${name} a l'aplicació Fitxers",
		      profile_title: "Obre el perfil de ${user}.",
		      profile_a11y: "En activar aquest enllaç, s'obrirà el perfil de ${user} en una finestra nova.",
		      download_tooltip: "Descarrega aquest fitxer (${0})",
		      following: {
		         add: "Segueix el fitxer",
		         remove: "Deixa de seguir",
		         title: "Commuteu per indicar si rebreu actualitzacions sobre aquest fitxer"
		      },
		      share: {
		         label: "Comparteix",
		         title: "Atorga accés a altres a aquest fitxer"
		      },
		      timestamp: {
		         created: {
		            DAY: "Creat ${EEEE} a ${time}",
		            MONTH: "Creat ${MMM} ${d}",
		            TODAY: "Creat avui a les ${time}",
		            YEAR: "Creat el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creat ahir a les ${time}",
		            TOMORROW: "Creat el ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} creat a ${EEEE} a les ${time}",
		            MONTH: "${user} creat el ${MMM} ${d}",
		            TODAY: "${user} creat avui a les ${time}",
		            YEAR: "${user} creat el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} creat ahir a les ${time}",
		            TOMORROW: "${user} creat el ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Actualitzat ${EEEE} a les ${time}",
		            MONTH: "Actualitzat ${MMM} ${d}",
		            TODAY: "Actualitzat avui a les ${time}",
		            YEAR: "Actualitzat el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Actualitzat ahir a les ${time}",
		            TOMORROW: "Actualitzat el ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} actualitzat el ${EEEE} a les ${time}",
		            MONTH: "${user} actualitzat el ${MMM} ${d}",
		            TODAY: "${user} actualitzat avui a les ${time}",
		            YEAR: "${user} actualitzat el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} actualitzat ahir a les ${time}",
		            TOMORROW: "${user} actualitzat el ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Creat: ${EEEE} a les ${time}",
		            MONTH: "Creat: ${MMM} ${d}",
		            TODAY: "Creat: avui a les ${time}",
		            YEAR: "Creat: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creat: ahir a les ${time}",
		            TOMORROW: "Creat: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Actualitzat: ${EEEE} a les ${time}",
		            MONTH: "Actualitzat: ${MMM} ${d}",
		            TODAY: "Actualitzat: avui a les ${time}",
		            YEAR: "Actualitzat: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Actualitzat: ahir a les ${time}",
		            TOMORROW: "Actualitzat: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} per ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} per ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Descarrega aquest fitxer (${size})",
		      	 DOWNLOAD_ALT: "Baixa"
		      },
		      PREVIEW: {
		         LINK: "Visualització prèvia",
		         TITLE: "Previsualitza aquest fitxer en una finestra nova."
		      },
		      TAGS: "Etiquetes:",
		      error: "S'ha produït un error.  ${again}.",
		      error_again: "Torneu a intentar-ho",
		      error_404: "El fitxer ja no existeix o no teniu prou permisos per accedir-hi.",
		      error_403: "No teniu permís per visualitzar aquest fitxer. El fitxer no és públic i no es comparteix amb vós.",
		      notifications: {
		         USER_SHARED: "${user} ha escrit:",
		         CHANGE_SUMMARY: "${user} ha proporcionat un resum del canvi",
		         NO_CHANGE_SUMMARY: "${user} no ha proporcionat un resum del canvi",
		         COMMENTED: "${user} ha comentat"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Extret per vosaltres",
		      checkedout_other: "Extret per ${user}",
		      tooltip: "Obre el fitxer ${name} a la biblioteca",
		      draft_404_info: "S'ha suprimit l'esborrany o ja no està compartit. La versió publicada és l'última versió del fitxer.",
		      error_404: "S'ha suprimit el fitxer o ja no està compartit.",
		      error_403: "S'ha suprimit el fitxer o ja no està compartit.",
		      error_preview: "El fitxer ja no està disponible per a visualització prèvia.",
		      draft_review_canceled: "S'ha suprimit la revisió o l'esborrany ja no està compartit. Ja no se sol·licita la revisió.",
		      switch_ee: "Visualitza l'esborrany",
		      switch_ee_tooltip: "Visualitza l'últim esborrany del fitxer"
		   },
		   ecm_draft: {
		      tooltip: "Obre l'esborrany ${name} a la biblioteca",
		      community_owners: "Propietaris de la comunitat",
		      draft: "Esborrany",
		      draft_tooltip: "S'està visualitzant l'esborrany",
		      draft_general_info: "L'esborrany anterior ja no existeix i l'esborrany és la versió més recent.",
		      draft_review_404_general_info: "Un dels revisors ja ha votat. Ja esteu sol·licitat per revisar l'esborrany.",
		      draft_review_404_request_info: "L'esborrany anterior ja no existeix i l'esborrany més recent s'ha enviat a revisió. S'ha sol·licitat la vostra revisió.",
		      draft_review_404_require_info: "L'esborrany anterior ja no existeix i l'esborrany més recent s'ha enviat a revisió. La revisió és obligatòria.",
		      draft_review_request_info: "S'ha sol·licitat la vostra revisió.",
		      draft_review_require_info: "La revisió és obligatòria.",
		      error_404: "S'ha suprimit l'esborrany o ja no està compartit.",
		      error_403: "No podeu visualitzar l'esborrany perquè ja no està compartit.",
		      error_preview: "L'esborrany ja no està disponible per visualització prèvia.",
		      switch_ee: "Visualitza la versió publicada",
		      switch_ee_tooltip: "Visualitza la versió publicada del fitxer",
		      review: "Revisió",
		      reviewers: "Revisors",
		      reviwers_addtl: "Revisors addicionals",
		      in_review: "Esborrany a revisió",
		      in_review_tooltip: "Visualitza l'esborrany a revisió",
		      review_required_any: "Els propietaris de la comunitat necessiten un revisor per revisar l'esborrany.",
		      review_required_all: "Els propietaris de la comunitat necessiten que tots els revisors revisin aquest esborrany.",
		      review_required_generic: "Els propietaris de la comunitat necessiten que aquests revisors revisin aquest esborrany.",
		      review_additional_required: "L'emissor de l'esborrany ha afegit tots els revisors necessaris per revisar l'esborrany.",
		      reivew_submitted_date: {
		         DAY: "${user} ha enviat l'esborrany a revisió el ${EEEE} a les ${time}.",
		         MONTH: "${user} ha enviat l'esborrany a revisió el ${d} de ${MMM}.",
		         TODAY: "${user} ha enviat l'esborrany a revisió avui a les ${time}.",
		         YEAR: "${user} va enviar l'esborrany a revisió el ${d} de ${MMM} del ${YYYY}.",
		         YESTERDAY: "${user} va enviar l'esborrany a revisió ahir a les ${time}.",
		         TOMORROW: "${user} va enviar l'esborrany a revisió el ${d} de ${MMM} del ${YYYY}."
		      },
		      pending: "Pendent",
		      pending_rejected: "Ja no es necessita la revisió perquè s'ha rebutjat",
		      approve: "Aprova",
		      approved: "Aprovat",
		      approve_tooltip: "Aproveu aquest esborrany",
		      accept_success: "Heu aprovat aquest esborrany.",
		      accept_error: "S'ha produït un error en aprovar aquest esborrany. Torneu-ho a provar.",
		      accept_info: "Heu aprovat aquest esborrany.",
		      reject: "Rebutja",
		      rejected: "Rebutjat",
		      reject_tooltip: "S'ha rebutjat l'esborrany",
		      reject_success: "Heu rebutjat l'esborrany.",
		      reject_error: "S'ha produït un error en rebutjar l'esborrany. Torneu-ho a provar.",
		      reject_info: "S'ha rebutjat l'esborrany."
		   },
		   authUser: {
		      error: "S'ha produït un error en recuperar l'usuari actual.  ${again}.",
		      error_again: "Torneu a intentar-ho",
		      error_404: "No es pot trobar l'usuari autenticat.",
		      error_403: "No teniu permís per recuperar la informació d'usuari."
		   },
		   forum: {
		      error: "S'ha produït un error.  ${again}.",
		      error_again: "Torneu a intentar-ho",
		      error_404: "El fòrum ja no existeix o no teniu prou permisos per accedir-hi.",
		      error_403: "No teniu permís per veure aquest fòrum. El fòrum no és públic i no es comparteix amb vostè.",
		      readMore: "Visualitza el tema complet...",
		      readMore_tooltip: "Obre el tema del fòrum ${name}.",
		      readMore_a11y: "En activar aquest enllaç, s'obrirà el tema del fòrum ${name} en una finestra nova.",
		      QUESTION_ANSWERED: "Aquesta pregunta s'ha respost.",
		      QUESTION_NOT_ANSWERED: "Aquesta pregunta encara no s'han respost.",
		      attachments: "${count} adjuncions",
		      attachments_one: "${count} adjunció"
		   },
		   blog: {
		      error: "S'ha produït un error.  ${again}.",
		      error_again: "Torneu a intentar-ho",
		      error_404: "El blog ja no existeix o no teniu prou permisos per accedir-hi.",
		      error_403: "No teniu permís per visualitzar aquest blog. El blog no és públic i no es comparteix amb vós.",
		      readMore: " Més informació...",
		      readMore_tooltip: "Obre l'entrada de blog ${name}.",
		      readMore_a11y: "En activar aquest enllaç, s'obrirà l'entrada de blog ${name} en una finestra nova.",
		      graduated: "Graduada",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Vota</a>",
		  					TOOLTIP: 	"Vota per això"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Votat</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Votat</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Desfés</a>",
		  					TOOLTIP: 	"Elimineu el vostre vot per això"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 persones han votat això"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 persona ha votat això"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} ha votat això"
		  				}
		  			},
		  			LOADING: "Carregant...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Votat"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "No s'ha pogut desar el vostre vot perquè heu assolit el límit de votació o perquè la idea ja no està disponible.",
		      readMore_tooltip: "Obre la idea ${name}.",
		      readMore_a11y: "En activar aquest enllaç, s'obrirà la idea ${name} en una finestra nova."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Respostes",
		      THIS_ARIA_LABEL: "Aquesta resposta",
		      THIS_TAB_TITLE: "Aquesta resposta",
		      TAB_TITLE: "Respostes (${0})",
		      REPLY_TO_REPLY: "En resposta a ${thisReply}",
		      REPLY_TO_TOPIC: "En resposta a ${thisTopic}",
		      THIS_TOPIC: "aquest tema",
		      THIS_REPLY: "aquesta resposta",
		      NAVIGATE_TO_REPLY: "Navegueu a la resposta pare",
		      NAVIGATE_TO_TOPIC: "Navegueu al tema pare",
		      ADD_COMMENT: "Respon a aquest tema",
		      ADD_COMMENT_TOOLTIP: "Respon a aquest tema de fòrum",
		      SHOWING_RECENT_REPLIES: "S'estan mostrant les ${0} respostes més recents",
		      PREV_COMMENTS: "Mostra més respostes",
		      PLACEHOLDER_TXT: "Respon a aquest tema",
		      EMPTY: "No hi ha respostes.",
		      TRIM_LONG_COMMENT: "Voleu escurçar la resposta?",
		      WARN_LONG_COMMENT: "La resposta és massa llarga.  ${shorten}",
		      ERROR: "S'ha produït un error en recuperar les respostes. ${again}",
		      ERROR_CREATE: "No s'ha pogut desar la resposta.  Torneu a intentar-ho més tard.",
		      ERROR_CREATE_NOT_FOUND: "No s'ha pogut desar la resposta perquè el tema s'ha suprimit o ja no està visible.",
		      ERROR_CREATE_ACCESS_DENIED: "No s'ha pogut desar la resposta perquè el tema s'ha suprimit o ja no està visible.",
		      ERROR_CREATE_TIMEOUT: "No s'ha pogut desar la vostra resposta perquè no s'ha pogut contactar amb el servidor.  Feu clic a 'Desa' per tornar a intentar-ho.",
		      ERROR_CREATE_CANCEL: "No s'ha pogut desar la resposta perquè s'ha cancel·lat la sol·licitud.  Feu clic a 'Desa' per tornar a intentar-ho.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Cal que inicieu sessió per crear aquesta resposta.  Feu clic a 'Desa' per tal que se us sol·liciti iniciar sessió.",
		      ERROR_NO_CONTENT: "Introduïu la resposta i feu clic a 'Desa'.  Si ja no voleu deixar una resposta, feu clic a 'Cancel·la'.",
		      ERROR_UNAUTHORIZED: "No s'ha pogut desar la visualització perquè no esteu autoritzats a deixar una resposta.",
		      COMMENT_DELETED: {
		         DAY: "Resposta suprimida per ${user} el ${EEEE} a les ${time}",
		         MONTH: "Resposta suprimida per ${user} el ${MMM} ${d}",
		         TODAY: "Resposta suprimida per ${user} avui a les ${time}",
		         YEAR: "Resposta suprimida per ${user} el ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Resposta suprimida per ${user} ahir a les ${time}",
		         TOMORROW: "Resposta suprimida per ${user} el ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Motiu de la supressió: ${reason}",
		      REPLY_TITLE: "Re: ${0}",
		      SHOW_FULL_REPLY: "Visualitza tota la resposta",
		      SHOW_FULL_REPLY_TOOLTIP: "Navegueu a la resposta original al tema del fòrum",
		      REPLY_ACTION: "Respon",
		      REPLY_ACTION_TOOLTIP: "Respon a aquesta publicació",
		      MODERATION_PENDING: "Aquesta resposta està pendent de revisió.",
		      MODERATION_QUARANTINED: "El moderador ha posat en quarantena l'element publicat.",
		      MODERATION_REMOVED: {
		         DAY: "Aquest comentari ha estat eliminat per ${user} el ${EEEE} a les ${time}.",
		         MONTH: "Aquest comentari va ser eliminat per ${user} el ${MMM} ${d}.",
		         TODAY: "Aquest comentari ha estat eliminat per ${user} avui a les ${time}.",
		         YEAR: "Aquest comentari ha estat eliminat per ${user} el ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Aquest comentari ha estat eliminat per ${user} ahir a les ${time}.",
		         TOMORROW: "Aquest comentari ha estat eliminat per ${user} el ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Aquesta resposta va ser rebutjada per ${user} el ${EEEE} a les ${time}.",
		         MONTH: "Aquesta resposta va ser rebutjada per ${user} el ${MMM} ${d}.",
		         TODAY: "Aquesta resposta va ser rebutjada per ${user} avui a les ${time}.",
		         YEAR: "Aquesta resposta va ser rebutjada per ${user} el ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Aquesta resposta va se rebutjada per ${user} ahir a les ${time}.",
		         TOMORROW: "Aquesta resposta va ser rebutjada per ${user} el ${MMM} ${d}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "La vostra resposta s'ha enviat per revisar i es trobarà disponible quan s'aprovi."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Comentaris",
		      PLACEHOLDER_TXT: "Afegeix un comentari",
		      TAB_TITLE: "Comentaris (${0})",
		      ACTION_NOT_SUPPORTED: "No s'admet l'acció",
		      ADD_COMMENT: "Afegeix un comentari",
		      ADD_COMMENT_TOOLTIP: "Afegeix un comentari a aquest element",
		      CANCEL: "Cancel·la",
		      COMMENT_COUNT_ONE: "${0} comentari",
		      COMMENT_COUNT_MANY: "${0} comentaris",
		      COMMENT_LABEL: "Comentari:",
		      DELETE: "Suprimeix",
		      DELETE_TOOLTIP: "Suprimeix el comentari",
		      DELETEREASON: "Motiu per suprimir aquest comentari:",
		      DIALOG_TITLE: "Escurça el comentari",
		      TOOLTIP: "Escurça el comentari",
		      NAME: "Escurça el comentari",
		      EDIT: "Edita",
		      EDIT_TOOLTIP: "Edita el comentari",
		      ERROR_CREATE: "No s'ha pogut desar el comentari.  Torneu a intentar-ho més tard.",
		      ERROR_CREATE_NOT_FOUND: "No s'ha pogut desar el comentari perquè l'element s'ha suprimit o ja no està visible.",
		      ERROR_CREATE_ACCESS_DENIED: "No s'ha pogut desar el comentari perquè l'element s'ha suprimit o ja no està visible.",
		      ERROR_CREATE_TIMEOUT: "No s'ha pogut desar el comentari perquè no s'ha pogut contactar amb el servidor.  Feu clic a 'Publica' per tornar-ho a provar.",
		      ERROR_CREATE_CANCEL: "No s'ha pogut desar el comentari perquè s'ha cancel·lat la sol·licitud.  Feu clic a 'Publica' per tornar-ho a provar.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Cal que inicieu sessió per crear aquest comentari.  Feu clic a 'Publica' perquè se us sol·liciti l'inici de sessió.",
		      ERROR_DELETE: "No s'ha pogut suprimir el comentari.  Torneu a intentar-ho més tard.",
		      ERROR_DELETE_TIMEOUT: "No s'ha pogut suprimir el comentari perquè no s'ha pogut contactar amb el servidor.  Feu clic a 'Suprimeix' per tornar a provar-ho.",
		      ERROR_DELETE_NOT_FOUND: "No s'ha pogut suprimir el comentari perquè el comentari o element s'ha suprimit o ja no es troba visible.",
		      ERROR_DELETE_ACCESS_DENIED: "No s'ha pogut suprimir el comentari perquè l'element s'ha suprimit o ja no està visible.",
		      ERROR_DELETE_CANCEL: "No s'ha pogut suprimir el comentari perquè s'ha cancel·lat la sol·licitud.  Feu clic a 'Suprimeix' per tornar a provar-ho.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Cal que inicieu sessió per suprimir aquest comentari.  Feu clic a 'Suprimeix' perquè se us sol·liciti l'inici de sessió.",
		      ERROR_EDIT: "No s'ha pogut actualitzar el comentari.  Torneu a intentar-ho més tard.",
		      ERROR_EDIT_ACCESS_DENIED: "No s'ha pogut actualitzar el comentari perquè l'element s'ha suprimit o ja no està visible.",
		      ERROR_EDIT_NOT_FOUND: "No s'ha pogut actualitzar el comentari perquè l'element s'ha suprimit o ja no està visible.",
		      ERROR_EDIT_TIMEOUT: "No s'ha pogut actualitzar el comentari perquè no s'ha pogut contactar amb el servidor.  Feu clic a 'Publica' per tornar-ho a provar.",
		      ERROR_EDIT_CANCEL: "No s'ha pogut actualitzar el comentari perquè s'ha cancel·lat la sol·licitud.  Feu clic a 'Publica' per tornar-ho a provar.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Cal que inicieu sessió per editar el comentari.  Feu clic a 'Publica' perquè se us sol·liciti l'inici de sessió.",
		      ERROR_NO_CONTENT: "Introduïu el vostre comentari i feu clic a 'Publica'.  Si ja no voleu deixar cap comentari, feu clic a 'Cancel·la'.",
		      ERROR_NO_CONTENT_EDIT: "Introduïu el vostre comentari i feu clic a 'Publica'.  Si ja no voleu editar el comentari, feu clic 'Cancel·la'.",
		      ERROR_UNAUTHORIZED: "No s'ha pogut desar la visualització perquè no esteu autoritzats a deixar un comentari.",
		      ERROR_GENERAL: "S'ha produït un error.",
		      OK: "D'acord",
		      YES: "Sí",
		      TRIM_LONG_COMMENT: "Voleu escurçar el comentari?",
		      WARN_LONG_COMMENT: "El comentari és massa llarg.  ${shorten}",
		      LINK: "Enllaç",
		      SAVE: "Desa",
		      POST: "Publica",
		      SHOWMORE: "Informació addicional...",
		      VIEW_COMMENTS_FILE: "Visualitza els comentaris d'aquest fitxer",
		      SUBSCRIBE_TO_COMMENTS: "Subscriu-me a aquests comentaris",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Seguiu els canvis realitzats en aquests comentaris a través del lector de canals d'informació.",
		      PROFILE_TITLE: "Obre el perfil de ${user}.",
		      PROFILE_A11Y: "En activar aquest enllaç, s'obrirà el perfil de ${user} en una finestra nova.",
		      MODERATION_PENDING: "Aquest comentari està pendent d'ésser revisat.",
		      MODERATION_REMOVED: {
		         DAY: "Aquest comentari ha estat eliminat per ${user} el ${EEEE} a les ${time}.",
		         MONTH: "Aquest comentari ha estat eliminat per ${user} el ${MMM} ${d}.",
		         TODAY: "Aquest comentari ha estat eliminat per ${user} avui a les ${time}.",
		         YEAR: "Aquest comentari ha estat eliminat per ${user} el ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Aquest comentari ha estat eliminat per ${user} ahir a les ${time}.",
		         TOMORROW: "Aquest comentari ha estat eliminat per ${user} el ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Aquest comentari va ser rebutjat per ${user} el ${EEEE} a les ${time}.",
		         MONTH: "Aquest comentari ha estat rebutjat per ${user} el ${MMM} ${d}.",
		         TODAY: "Aquest comentari va ser rebutjat per ${user} avui a les ${time}.",
		         YEAR: "Aquest comentari va ser rebutjat per ${user} el ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Aquest comentari va ser rebutjat per ${user} ahir a les ${time}.",
		         TOMORROW: "Aquest comentari va ser rebutjat per ${user} el ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Mostra els comentaris anteriors",
		      EMPTY: "No hi ha cap comentari.",
		      ERROR_ALT: "Error",
		      ERROR: "S'ha produït un error en recuperar els comentaris. ${again}",
		      ERROR_ADDTL: "S'ha produït un error en recuperar els comentaris addicionals. ${again}",
		      ERROR_AGAIN: "Torneu-ho a provar.",
		      ERROR_AGAIN_TITLE: "Torneu a provar la sol·licitud per obtenir més comentaris.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} a les ${time} (versió ${version})",
		         MONTH: "${user} ${MMM} ${d} (versió ${version})",
		         TODAY: "${user} avui a les ${time} (versió ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (versió ${version})",
		         YESTERDAY: "${user} ahir a les ${time} (versió ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (versió ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE}a ${time}",
		         MONTH: "${user} ${d} del ${MMM}",
		         TODAY: "${user} avui a les ${time}",
		         YEAR: "${user} ${d} del ${MMM} de ${YYYY}",
		         YESTERDAY: "${user} ahir a les ${time}",
		         TOMORROW: "${user} ${d} del ${MMM} de ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} a les ${time}",
		         MONTH: "${d} de ${MMM}",
		         TODAY: "Avui a les ${time}",
		         YEAR: "${d} de ${MMM} de ${YYYY}",
		         YESTERDAY: "Ahir a les ${time}",
		         TOMORROW: "${d} de ${MMM} de ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Comentari suprimit per ${user} el ${EEEE} a les ${time}",
		         MONTH: "Comentari suprimit per ${user} el ${MMM} ${d}",
		         TODAY: "Comentari suprimit per ${user} avui a les ${time}",
		         YEAR: "Comentari suprimit per ${user} el ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Comentari suprimit per ${user} ahir a les ${time}",
		         TOMORROW: "Comentari suprimit per ${user} el ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} editat ${EEEE} a les ${time} (versió ${version})",
		         MONTH: "${user} editat ${MMM} ${d} (versió ${version})",
		         TODAY: "${user} editat avui a les ${time} (versió ${version})",
		         YEAR: "${user} editat ${MMM} ${d}, ${YYYY} (versió ${version})",
		         YESTERDAY: "${user} editat ahir a les ${time} (versió ${version})",
		         TOMORROW: "${user} editat ${MMM} ${d}, ${YYYY} (versió ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} editat ${EEEE} a les ${time}",
		         MONTH: "${user} editat ${MMM} ${d}",
		         TODAY: "${user} editat avui a les ${time}",
		         YEAR: "${user} editat ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} editat ahir a les ${time}",
		         TOMORROW: "${user} editat ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Esteu segur que voleu suprimir aquest comentari?",
		      FLAG_ITEM: {
		         BUSY: "S'està desant...",
		         CANCEL: "Cancel·la",
		         ACTION: "Senyala com a no adient",
		         DESCRIPTION_LABEL: "Doneu una raó per senyalar aquest element (opcional)",
		         EDITERROR: "Les metadades del fitxer no s'han editat a causa d'un error.",
		         OK: "Desa",
		         ERROR_SAVING: "S'ha produït un error en processar la sol·licitud. Torneu a intentar-ho més tard.",
		         SUCCESS_SAVING: "El vostre senyal s'ha tramès. Un moderador l'investigarà en breu.",
		         TITLE: "Senyala aquest element com a no adient",
		         COMMENT: {
		            TITLE: "Senyala aquest comentari com a no adient",
		            A11Y: "Aquest botó obre un diàleg que permet a l'usuari senyalar aquest comentari com a no adient."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Cancel·la",
		      DIALOG_TITLE: "Suprimeix comentari",
		      NAME: "Suprimeix comentari",
		      OK: "D'acord",
		      TOOLTIP: "Suprimeix comentari"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Cancel·la",
		      CONFIRM: "L'abreujament eliminarà el text que excedeixi el límit.  Feu clic a 'D'acord' per abreujar o a 'Cancel·la' per editar el comentari.",
		      DIALOG_TITLE: "Escurça el comentari",
		      NAME: "Escurça el comentari",
		      OK: "D'acord",
		      TOOLTIP: "Escurça el comentari"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Confirmació d'enviament",
		      CONFIRM: "El vostre comentari s'ha enviat per revisar i es trobarà disponible quan s'aprovi.",
		      OK: "D'acord"
		   },
		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "PM",
		      TODAY: "avui",
		      TODAY_U: "Avui",
		      YESTERDAY: "ahir",
		      YESTERDAY_U: "Ahir",
		      ADDED: { DAY: "Afegit ${EEee} a les ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Afegit el ${date_long}",
		         TODAY: "Afegit avui a les ${time}",
		         YEAR: "Afegit el ${date_long}",
		         YESTERDAY: "Afegit ahir a les ${time}"
		      },
		      LAST_UPDATED: { DAY: "Actualitzat per última vegada ${EEee} a les ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Actualitzat per última vegada ${date_long}",
		         TODAY: "Actualitzat per última vegada avui a les ${time}",
		         YEAR: "Actualitzat per última vegada ${date_long}",
		         YESTERDAY: "Actualitzat per última vegada ahir a les ${time}"
		      },
		      MONTHS_ABBR: { 0: "GEN.",
		         10: "NOV.",
		         11: "DES.",
		         1: "FEB.",
		         2: "MARÇ",
		         3: "ABR.",
		         4: "MAIG",
		         5: "JUNY",
		         6: "JUL.",
		         7: "AG.",
		         8: "SET.",
		         9: "OCT."
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Avui",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ahir",
		         TOMORROW: "Demà"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} a les ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Avui a les ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ahir a les ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} a les ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Avui a les ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Ahir a les ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} a les ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} a les ${time}",
		         TODAY: "${date_short} a les ${time}",
		         YEAR: "${date_short} a les ${time}",
		         YESTERDAY: "${date_short} a les ${time}",
		         TOMORROW: "${date_short} a les ${time}"
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
		      UPDATED: { DAY: "Actualitzat el ${EEee} a les ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Actualitzat el ${date_long}",
		         TODAY: "Actualitzat avui a les ${time}",
		         YEAR: "Actualitzat el ${date_long}",
		         YESTERDAY: "Actualitzat ahir a les ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "No s'ha pogut carregar la informació de versió.",
		      ERROR_REQUEST_CANCELLED: "La sol·licitud s'ha cancel·lat.",
		      ERROR_REQUEST_TIMEOUT: "No s'ha pogut contactar amb el servidor.",
		      ERROR_REQUEST_UNKNOWN: "S'ha produït un error desconegut.",
		      LOADING: "S'està carregant...",
		      NO_VERSIONS: "No hi ha cap versió",
		      INFO: "Versió ${0} creada ${1} per ",
		      VERSION_NUMBER: "Versió ${0}",
		      DELETED: "Suprimit",
		      DELETE_ALL: "Suprimeix totes les versions anteriors a la versió",
		      DELETE_VERSION_SINGLE: "Suprimeix la versió ${0}",
		      DELETEERROR: "No s'ha suprimit la versió a causa d'un error.",
		      CREATE_VERSION: "Crea una versió nova",
		      CREATE_VERSION_TOOLTIP: "Crea una versió d'aquest fitxer",
		      REVERT_VERSION: "Restaura la versió ${0}",
		      REVERT_DESCRIPTION: "Restaurada de la versió ${0}",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Pàgina anterior",
		      ELLIPSIS: "...",
		      NEXT: "Següent",
		      NEXT_TOOLTIP: "Pàgina següent",
		      COUNT: "${0} - ${1} de ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Pàgina",
		      SHOW: "Mostra",
		      ITEMS_PER_PAGE: " elements per pàgina.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Avui a les ${time}",
		            YESTERDAY: "Ahir a les ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} a les ${time}",
		            YEAR: "${date_short} a les ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} a les ${time}",
		            TODAY: "avui a les ${time}",
		            YESTERDAY: "ahir a les ${time}"
		        },
		        UPDATED: { DAY: "Actualitzat el ${EEee} a les ${time}",
		            YEAR: "Actualitzat el ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Actualitzat el ${date_short}",
		            TODAY: "Actualitzat avui a les ${time}",
		            YESTERDAY: "Actualitzat ahir a les ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Suprimeix la versió ${0}",
		         DOWNLOAD: "Baixa",
		         DOWNLOAD_TOOLTIP: "Descarrega aquesta versió (${0})",
		         VIEW: "Visualització",
		         VIEW_TOOLTIP: "Visualitzeu la versió ${0}",
		         REVERT: {
		            A11Y: "Aquest botó obre un diàleg que permet a l'usuari confirmar la restauració d'un fitxer a partir d'una versió anterior. La confirmació d'aquesta acció tindrà com a resultat l'actualització del contingut de la pàgina.",
		            FULL: "Restaura",
		            WIDGET: "Restaura aquesta versió"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "No s'ha pogut suprimir la versió perquè s'ha suprimit o ja no està visible.",
		         ERROR_ACCESS_DENIED: "No s'ha pogut suprimir la versió perquè no sou editor.",
		         ERROR_TIMEOUT: "No s'ha suprimit la versió perquè no s'ha pogut contactar amb el servidor.  Torneu a fer clic a 'Suprimeix' per tornar a provar-ho.",
		         ERROR_CANCEL: "No s'ha suprimit la versió perquè s'ha cancel·lat la sol·licitud.  Torneu a fer clic a 'Suprimeix' per tornar a provar-ho.",
		         ERROR_NOT_LOGGED_IN: "Cal que inicieu sessió per suprimir aquesta versió.  Feu clic a 'Suprimeix' perquè se us sol·liciti l'inici de sessió.",
		         GENERIC_ERROR: "No s'ha pogut suprimir la versió a causa d'un error desconegut.  Torneu a fer clic a 'Suprimeix' per tornar a provar-ho.",
		         FULL: "Suprimeix",
		         A11Y: "Aquest botó obre un diàleg que permet a l'usuari confirmar la supressió d'aquesta versió. La confirmació d'aquesta acció tindrà com a resultat l'actualització del contingut de la pàgina."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "No s'ha pogut restaurar la versió perquè s'ha suprimit o perquè ja no es troba visible.",
		         ERROR_ACCESS_DENIED: "No s'ha pogut restaurar la versió perquè no sou editor.",
		         ERROR_NAME_EXISTS: "No s'ha pogut restaurar la versió perquè hi ha un altre fitxer amb el mateix nom.",
		         ERROR_TIMEOUT: "No s'ha restaurat la versió perquè no s'ha pogut contactar amb el servidor.  Torneu a fer clic a 'Restaura' per tornar a intentar la sol·licitud.",
		         ERROR_CANCEL: "No s'ha restaurat la versió perquè s'ha cancel·lat la sol·licitud.  Torneu a fer clic a 'Restaura' per tornar a intentar la sol·licitud.",
		         ERROR_QUOTA_VIOLATION: "No s'ha pogut restaurar la versió a causa de restriccions en l'espai.",
		         ERROR_MAX_CONTENT_SIZE: "No s'ha pogut restaurar la versió perquè és més llarg que la mida de fitxer permesa de ${0}",
		         GENERIC_ERROR: "No s'ha pogut restaurar la versió a causa d'un error desconegut.  Torneu a fer clic a 'Restaura' per tornar a intentar la sol·licitud."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Veges qui ha descarregat...",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Pàgina anterior",
		      ELLIPSIS: "...",
		      NEXT: "Següent",
		      NEXT_TOOLTIP: "Pàgina següent",
		      COUNT: "${0} - ${1} de ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Pàgina",
		      SHOW: "Mostra",
		      ITEMS_PER_PAGE: " elements per pàgina.",
		      VERSION: {
		         DAY: "Versió ${version} el ${date}",
		         MONTH: "Versió ${version} el ${date}",
		         TODAY: "Versió ${version} a les ${time}",
		         YEAR: "Versió ${version} el ${date}",
		         YESTERDAY: "Versió ${version} ahir"
		      },
		      FILE: {
		         V_LATEST: "Heu descarregat l'última versió d'aquest fitxer",
		         V_OLDER: "Vau descarregar per última vegada la versió ${0} d'aquest fitxer",
		         LOADING: "Carregant...",
		         EMPTY: "Només usuaris anònims",
		         ERROR: "No es pot carregar la informació de baixada"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Error",
		      ERROR_ALT_TEXT: "Error:",
		      ERROR_MSG_GENERIC: "Alguna cosa ha anat malament.  Torneu-ho a provar.",
		      ERROR_MSG_NOT_AVAILABLE: "Aquest element s'ha suprimit o ja no està disponible.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "El contingut per aquest element no està disponible.",
		      ERROR_MSG_NO_ACCESS: "Ja no teniu accés a aquest element.",
		      LOADING: "Carregant...",
		      TITLE_SU: "${author} ha publicat un missatge.",
		      TITLE_NI: "${author} us ha convidat a unir-vos a la seva xarxa.",
		      AUTHOR_TITLE: "Veure perfil de ${author}",
		      OPEN_LINK: "Obre ${title}",
		      CONFIRM_CLOSE_TITLE: "Confirma",
		      CONFIRM_CLOSE_MESSAGE: "Esteu segur que desitgeu abandonar els canvis? Premeu D'acord per continuar o Cancel·la per tornar.",
		      OK: "D'acord",
		      CANCEL: "Cancel·la"
		   },
		   MESSAGE: {
		      SUCCESS: "Confirmació",
		      ERROR: "Error",
		      ERROR_ALT_TEXT: "Error:",
		      INFO: "Informació",
		      WARNING: "Advertiment",
		      DISMISS: "Oculta aquest missatge",
		      MORE_DETAILS: "Més detalls",
		      HIDE_DETAILS: "Oculta detalls"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Creat: ${EEEE} a les ${time}",
		           MONTH: "Creat: ${MMM} ${d}",
		           TODAY: "Creat: avui a les ${time}",
		           YEAR: "Creat: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Creat: ahir a les ${time}",
		           TOMORROW: "Creat: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "S'ha produït un error.  ${again}.",
		      error_again: "Torneu a intentar-ho",
		      error_404: "L'actualització d'estat ja no existeix.",
		      notifications: {
		         STATUS_UPDATE: "${user} ha publicat un missatge",
		         USER_BOARD_POST: "${user} ha escrit al vostre taulell",
		         POST_COMMENT: "${user} ha escrit:"
		      }
		   },
		   login: {
		      error: "El nom d'usuari i/o la contrasenya no coincideix amb els comptes existents. Torneu-ho a provar.",
		      logIn: "Inicia sessió",
		      password: "Contrasenya:",
		      user: "Nom d'usuari:",
		      welcome: "Inicia sessió a l'HCL Connections"
		   },
		   repost: {
		      name: "Torna a publicar",
		      title: "Torna a publicar aquesta actualització als meus seguidors o comunitats",
		      msg_success: "L'actualització s'ha enviat correctament als vostres seguidors.",
		      msg_generic: "Alguna cosa ha anat malament.  Torneu-ho a provar."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Afegeix",
		      ADD_TXT: "Afegeix persones o comunitats com a lectors",
		      SHOW_MORE: "Mostra més...",
		      READER_IF_PUBLIC: "Tothom (públic)",
		      READER_IF_PUBLIC_TOOLTIP: "Aquest fitxer és públic i és visible per a tothom",
		      EMPTY_READERS: "Cap",
		      READERS_LABEL: "Lectors:\u00a0",
		      EDITORS_LABEL: "Editors:\u00a0",
		      OWNER_LABEL: "Propietari:\u00a0",
		      ERROR: "No es pot carregar la informació d'ús compartit",
		      ERROR_NOT_FOUND: "El fitxer que heu sol·licitat s'ha suprimit o mogut. Si algú us envia aquest enllaç, comproveu que sigui correcte.",
		      ERROR_ACCESS_DENIED: "No teniu permís per visualitzar aquest fitxer.  El fitxer no és públic i no es comparteix amb vós.",
		      SHARE: "Comparteix",
		      CANCEL: "Cancel·la",
		      SHARE_WITH: "Comparteix amb:",
		      PERSON: "una persona",
		      COMMUNITY: "una comunitat",
		      PLACEHOLDER: "Nom o adreça de correu electrònic de la persona...",
		      MESSAGE: "Missatge:",
		      MESSAGE_TXT: "Podeu afegir un missatge opcional",
		      REMOVE_ITEM_ALT: "Elimina ${0}",
		      NO_MEMBERS: "Cap",
		      A11Y_READER_ADDED: "${0} seleccionat com a lector",
		      A11Y_READER_REMOVED: "S'ha eliminat ${0} com a lector",
		      SELF_REFERENCE_ERROR: "No podeu compartir-ho amb vós.",
		      OWNER_REFERENCE_ERROR: "No podeu compartir el fitxer amb el seu propietari.",
		      SHARE_COMMUNITY_WARN: "Si compartiu amb la comunitat pública '${0}' aquest fitxer es convertirà en públic.",
		      SELECT_USER_ERROR: "Heu de seleccionar com a mínim una persona o comunitat per executar aquesta acció.",
		      WARN_LONG_MESSAGE: "El missatge és massa llarg.",
		      TRIM_LONG_MESSAGE: "Voleu escurçar el missatge?",
		      ERROR_SHARING: "El fitxer no es pot compartir.  Torneu a intentar-ho més endavant.",
		      INFO_SUCCESS: "S'ha compartit el fitxer correctament.",
		      MAX_SHARES_ERROR: "S'ha superat el nombre màxim d'elements compartits.",
		      NOT_LOGGED_IN_ERROR: "El fitxer no s'ha compartit perquè no estàveu connectat.  Feu clic a 'Comparteix' per compartir el fitxer.",
		      TIMEOUT_ERROR: "No s'ha compartit el fitxer perquè no s'ha pogut contactar amb el servidor.  Feu clic a 'Comparteix' per tornar-ho a provar.",
		      CANCEL_ERROR: "El fitxer no s'ha compartit perquè no s'ha cancel·lat la sol·licitud.  Feu clic a 'Comparteix' per tornar-ho a provar.",
		      NOT_FOUND_ERROR: "S'ha suprimit el fitxer o ja no està visible i no es pot compartir.",
		      ACCESS_DENIED_ERROR: "Ja no teniu permís per compartir aquest fitxer.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Un fitxer restringit no pot convertir-se en públic.",
		      TOOLTIP: "Atorga accés a altres a aquest fitxer"
		   },
		   HISTORY: {
		      TAB_TITLE: "Actualitzacions recents",
		      NO_HISTORY: "No hi ha actualitzacions recents.",
		      EMPTY: "No s'han pogut recuperar les actualitzacions recents per a aquest element. O bé s'ha suprimit o ja no hi teniu accés.",
		      MORE: "Mostra actualitzacions anteriors",
		      ERROR_ALT: "Error",
		      ERROR: "S'ha produït un error en recuperar les actualitzacions. ${again}",
		      ERROR_ADDTL: "S'ha produït un error en recuperar les actualitzacions addicionals. ${again}",
		      ERROR_AGAIN: "Torneu-ho a provar.",
		      ERROR_AGAIN_TITLE: "Torneu a provar la sol·licitud per obtenir més actualitzacions.",
		      PROFILE_TITLE: "Obre el perfil de ${user}.",
		      SORT_BY: "Ordena per\\:",
		      SORTS: {
		         DATE: "Data",
		         DATE_TOOLTIP: "Ordena del relat més recent a l'actualització menys recent",
		         DATE_TOOLTIP_REVERSE: "Ordena del relat menys recent a l'actualització més recent"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} a les ${time}",
		             MONTH: "${d} de ${MMM}",
		             TODAY: "Avui a les ${time}",
		             YEAR: "${d} de ${MMM} de ${YYYY}",
		             YESTERDAY: "Ahir a les ${time}",
		             TOMORROW: "${d} de ${MMM} de ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Aquest comentari",
			   REPLY_ACTION: "Respon",
		       REPLY_ACTION_TOOLTIP: "Respon a aquest comentari"
		   },
		   OAUTH: {
		      welcomeHeader: "Benvinguts al Connections",
		      continueBtnLabel: "Continua",
		      continueBtnA11y: "En activar aquest enllaç s'obrirà una finestra nova que no us permetrà autoritzar l'accés al Connections.",
		      clickHere: "Feu clic aquí",
		      infoMsg: "El Connections necessita la vostra autorització per accedir a les vostres dades.",
		      authorizeGadget: "${clickHere} per autoritzar aquesta aplicació per accedir a la informació del Connections.",
		      confirmAuthorization: "${clickHere} per confirmar que heu autoritzat aquesta aplicació per accedir a la informació de Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "En activar aquest enllaç s'obrirà una finestra nova que us permetrà autoritzar l'accés al dipòsit de la biblioteca del Connections.",
		      infoMsg: "El dipòsit de la biblioteca del Connections necessita una autorització per accedir a les dades.",
		      authorizeGadget: "${clickHere} per autoritzar aquesta aplicació per accedir a la informació de dipòsit de la biblioteca del Connections.",
		      confirmAuthorization: "${clickHere} per confirmar que heu autoritzat aquesta aplicació per accedir a la informació del dipòsit de la biblioteca del Connections."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Cancel·la",
		      CONFIRM: "Esteu segur que desitgeu abandonar els canvis?  Premeu D'acord per continuar o Cancel·la per tornar.",
		      DIALOG_TITLE: "Confirma",
		      NAME: "Confirma",
		      OK: "D'acord",
		      TOOLTIP: "Confirma"
		   }
});

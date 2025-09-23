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
		         label: "Mai multe",
		         tooltip: "Acţiuni suplimentare"
		       },
		       tags_more: "şi încă ${0}",
		       ERROR_ALT: "Eroare",
		       PERSON_TITLE: "Deschideţi profilul ${user}.",
		       inactiveUser: "${user} (inactiv)",
		       inactiveIndicator: "(inactiv)",
		       like_error: "Aprecierea dumneavoastră nu a putut fi salvată. Vă rugăm să încercaţi din nou mai târziu.",
		       vote_error: "Votul dumneavoastră nu a putut fi salvat. Vă rugăm să încercaţi din nou mai târziu."
		   },
		   generic: {
		      untitled: "(Fără titlu)",
		      tags: "Taguri:",
		      tags_more: "şi încă ${0}",
		      likes: "Aprecieri",
		      comments: "Comentarii",
		      titleTooltip: "Deplasaţi-vă la ${app}",
		      error: "Nu se pot extrage datele.",
		      timestamp: {
		         created: {
		            DAY: "Creat ${EEEE} la ${time}",
		            MONTH: "Creat ${MMM} ${d}",
		            TODAY: "Creat astăzi la ${time}",
		            YEAR: "Creat ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creat ieri la ${time}",
		            TOMORROW: "Creat ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Actualizat ${EEEE} la ${time}",
		            MONTH: "Actualizat ${MMM} ${d}",
		            TODAY: "Actualizat astăzi la ${time}",
		            YEAR: "Actualizat ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Actualizat ieri la ${time}",
		            TOMORROW: "Actualizat ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Public",
		         priv: "Privat"
		      },
		      action: {
		         created: "Creat",
		         updated: "Actualizat"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Primiţi actualizări despre persoane pe care le urmăriţi pe pagina Acasă şi într-un sumar e-mail.",
		      profile_title: "Deschideţi profilul ${user}.",
		      profile_a11y: "Activarea acestei legături va deschide profilul ${user} într-o fereastră nouă.",
		      error: "A apărut o eroare.  ${again}.",
		      error_again: "Vă rugăm să încercaţi din nou",
		      error_404: "Cererea reţelei nu mai există.",
		      warning: "Avertisment",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Sunteţi acum contacte în reţea.",
		            	follow: "Sunteţi acum contacte în reţea şi urmăriţi ${user}."
		            },
		            ignore: {
		            	nofollow: "Aţi ignorat invitaţia.",
		            	follow: "Aţi ignorat invitaţia dar acum urmăriţi ${user}."
		            }
		         },
		         error: {
		            accept: "A fost o eroare la acceptarea cererii.",
		            ignore: "A fost o eroare la importarea cererii."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} la ${time}",
		              MONTH: "${d} ${MMM}",
		              TODAY: "Azi la ${time}",
		              YEAR: "${d} ${MMM}, ${YYYY}",
		              YESTERDAY: "Ieri la ${time}",
		              TOMORROW: "${d} ${MMM}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Activarea acestei legături va duce la deschiderea ${name} într-o nouă fereastră.",
		      tooltip: "Deschideţi ${name} în aplicaţia Fişiere",
		      profile_title: "Deschideţi profilul ${user}.",
		      profile_a11y: "Activarea acestei legături va deschide profilul ${user} într-o fereastră nouă.",
		      download_tooltip: "Descărcaţi acest fişier (${0})",
		      following: {
		         add: "Urmăriţi fişierul",
		         remove: "Oprire urmărire",
		         title: "Comutaţi dacă veţi primi actualizări despre acest fişier"
		      },
		      share: {
		         label: "Partajare",
		         title: "Oferiţi acces altora la acest fişier"
		      },
		      timestamp: {
		         created: {
		            DAY: "Creat ${EEEE} la ${time}",
		            MONTH: "Creat ${MMM} ${d}",
		            TODAY: "Creat astăzi la ${time}",
		            YEAR: "Creat ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creat ieri la ${time}",
		            TOMORROW: "Creat ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} creat în ${EEEE} la ${time}",
		            MONTH: "${user} creat în ${MMM} ${d}",
		            TODAY: "${user} creat azi în ${time}",
		            YEAR: "${user} creat pe ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} creat ieri în ${time}",
		            TOMORROW: "${user} creat pe ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Actualizat ${EEEE} la ${time}",
		            MONTH: "Actualizat ${MMM} ${d}",
		            TODAY: "Actualizat astăzi la ${time}",
		            YEAR: "Actualizat ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Actualizat ieri la ${time}",
		            TOMORROW: "Actualizat ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} actualizat în ${EEEE} la ${time}",
		            MONTH: "${user} actualizat în ${MMM} ${d}",
		            TODAY: "${user} a actualizat astăzi la ${time}",
		            YEAR: "${user} actualizat pe ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} a actualizat ieri la ${time}",
		            TOMORROW: "${user} actualizat pe ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Creat: ${EEEE} la ${time}",
		            MONTH: "Creat: ${MMM} ${d}",
		            TODAY: "Creat: Azi la ${time}",
		            YEAR: "Creat: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creat: Ieri la ${time}",
		            TOMORROW: "Creat: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Actualizat: ${EEEE} la ${time}",
		            MONTH: "Actualizat: ${MMM} ${d}",
		            TODAY: "Actualizat: Azi la ${time}",
		            YEAR: "Actualizat: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Actualizat: Ieri la ${time}",
		            TOMORROW: "Actualizat: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} de ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} de ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Descărcaţi acest fişier (${size})",
		      	 DOWNLOAD_ALT: "Descărcare"
		      },
		      PREVIEW: {
		         LINK: "Previzualizare",
		         TITLE: "Previzualizaţi acest fişier într-o fereastră nouă."
		      },
		      TAGS: "Taguri:",
		      error: "A apărut o eroare.  ${again}.",
		      error_again: "Vă rugăm să încercaţi din nou",
		      error_404: "Fişierul nu mai există sau nu aveţi suficiente drepturi pentru a-l accesa.",
		      error_403: "Nu aveţi permisiune să vizualizaţi acest fişier. Fişierul nu este public şi nu este partajat cu dumneavoastră.",
		      notifications: {
		         USER_SHARED: "${user} a scris:",
		         CHANGE_SUMMARY: "${user} a furnizat sumarul modificării",
		         NO_CHANGE_SUMMARY: "${user} nu a furnizat un sumar al modificării",
		         COMMENTED: "${user} a comentat"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Înregistrat la ieşire de către dumneavoastră",
		      checkedout_other: "Înregistrat la ieşire de ${user}",
		      tooltip: "Deschideţi fişierul ${name} din biblioteca.",
		      draft_404_info: "Ciorna a fost ştearsă sau nu mai este partajată cu dumneavoastră. Versiunea publicată este acum ultima versiune a acestui fişier.",
		      error_404: "Fişierul a fost ştes sau nu mai este partajat cu dumneavoastră.",
		      error_403: "Fişierul a fost ştes sau nu mai este partajat cu dumneavoastră.",
		      error_preview: "FIşierul nu mai este disponibil pentru previzualizare.",
		      draft_review_canceled: "Examinarea a fost anulată  şi ciorna nu mai este partajată cu dumneavoastră. Examinarea dumneavoastră nu mai este necesară.",
		      switch_ee: "Vizualizare ciornă",
		      switch_ee_tooltip: "Vizualizarea ultimei ciorne pentru acest fişier"
		   },
		   ecm_draft: {
		      tooltip: "Deschideţi ciorna ${name} din biblioteca",
		      community_owners: "Proprietari comunitate",
		      draft: "Ciornă",
		      draft_tooltip: "Vizualizare ciornă",
		      draft_general_info: "Ciorna anterioară nu mai există sau o ciornă nouă este acum ultima versiune.",
		      draft_review_404_general_info: "Unul dintre  examinatori a votat deja. Nu mai trebuie să revedeţi această ciornă.",
		      draft_review_404_request_info: "Ciorna anterioară nu mai există şi ultima ciornă a fost lansată pentru examinare. Examinarea dumneavoastră este cerută.",
		      draft_review_404_require_info: "Ciorna anterioară nu mai există şi ultima ciornă a fost lansată pentru examinare. Examinarea dumneavoastră este necesară.",
		      draft_review_request_info: "Examinarea dumneavoastră este cerută.",
		      draft_review_require_info: "Examinarea dumneavoastră este necesară.",
		      error_404: "Ciorna a fost ştearsă sau nu mai este partajată cu dumneavoastră.",
		      error_403: "Nu puteţi vizualiza această ciornă deoarece nu este partajată cu dumneavoastră.",
		      error_preview: "Ciorna nu mai este disponibilă pentru previzualizare.",
		      switch_ee: "Vizualizare versiune publicată",
		      switch_ee_tooltip: "Vizualizare versiune publicată a acestui fişier",
		      review: "Examinare",
		      reviewers: "Examinatori",
		      reviwers_addtl: "Examinatori suplimentari",
		      in_review: "Ciornă în examinare",
		      in_review_tooltip: "Vizualizare ciornă în examinare",
		      review_required_any: "Proprietarii de comunitate cer un examinator pentru examinarea acestei ciorne.",
		      review_required_all: "Proprietarii de comunitate cer ca toţi examinatorii să examineze această ciornă.",
		      review_required_generic: "Proprietarii de comunitate cer ca aceşti examinatori să examineze această ciornă.",
		      review_additional_required: "Toţi examinatorii adăugaţi de cel care a trimis ciorna sunt ceruţi pentru examinarea acestei ciorne.",
		      reivew_submitted_date: {
		         DAY: "${user} a trimis ciorna la examinare pe ${EEEE} la ${time}.",
		         MONTH: "${user} a trimis ciorna la examinare pe ${MMM} ${d}.",
		         TODAY: "${user} a trimis ciorna la examinare azi la ${time}.",
		         YEAR: "${user} a trimis ciorna la examinare pe ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "${user} a trimis ciorna la examinare ieri la ${time}.",
		         TOMORROW: "${user} a trimis ciorna la examinare pe ${MMM} ${d} ${YYYY}."
		      },
		      pending: "În aşteptare",
		      pending_rejected: "Examinarea nu mai este necesară deoarece ciorna a fost respinsă",
		      approve: "Aprobare",
		      approved: "Aprobat",
		      approve_tooltip: "Aprobare această ciornă",
		      accept_success: "Aţi aprobat această ciornă.",
		      accept_error: "A existat o eroare la aprobarea acestei ciorne. Încercaţi din nou.",
		      accept_info: "Aţi aporbat această ciornă.",
		      reject: "Respingere",
		      rejected: "Respins",
		      reject_tooltip: "Respingeţi această ciornă",
		      reject_success: "Aţi respins această ciornă.",
		      reject_error: "A exista o eroare la respingerea acestei ciorne. Încercaţi din nou.",
		      reject_info: "Aşi respins această ciornă."
		   },
		   authUser: {
		      error: "A apărut o eroare la extragerea utilizatorului curent.  ${again}.",
		      error_again: "Vă rugăm să încercaţi din nou",
		      error_404: "Nu se poate găsi utilizatorul autentificat.",
		      error_403: "Nu aveţi permisiunea să extrageţi informaţiile de utilizator."
		   },
		   forum: {
		      error: "A apărut o eroare.  ${again}.",
		      error_again: "Vă rugăm să încercaţi din nou",
		      error_404: "Forumul nu mai există sau nu aveţi suficiente drepturi pentru a-l accesa.",
		      error_403: "Nu aveţi permisiunea să vizualizaţi acest forum. Forumul nu este public şi nu este partajat cu dumneavoastră.",
		      readMore: "Vizualizaţi întregul subiect...",
		      readMore_tooltip: "Deschideţi subiectul de forum ${name}.",
		      readMore_a11y: "Activarea acestei legături va deschide subiectul de forum ${name} într-o fereastră nouă.",
		      QUESTION_ANSWERED: "La această întrebare s-a răspuns.",
		      QUESTION_NOT_ANSWERED: "La această întrebare nu s-a răspuns.",
		      attachments: "${count} Ataşamente",
		      attachments_one: "${count} Ataşament"
		   },
		   blog: {
		      error: "A apărut o eroare.  ${again}.",
		      error_again: "Vă rugăm să încercaţi din nou",
		      error_404: "Blogul nu mai există sau nu aveţi suficiente drepturi pentru a-l accesa.",
		      error_403: "Nu aveţi permisiunea de a vizualiza acest blog. Blogul nu este public şi nu este partajat cu dumneavoastră.",
		      readMore: " Citiţi mai multe ...",
		      readMore_tooltip: "Deschideţi intrarea în blogul ${name}.",
		      readMore_a11y: "Activarea acestei legături va deschide intrarea de blog ${name} într-o nouă fereastră.",
		      graduated: "Promovată",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Vot</a>",
		  					TOOLTIP: 	"Votaţi pentru acesta"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Votat</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Votat</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Anulare</a>",
		  					TOOLTIP: 	"Înlăturaţi-vă votul din acesta"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 persoane au votat pentru acesta"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 persoană a votat pentru acesta"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} au votat pentru acesta"
		  				}
		  			},
		  			LOADING: "Încărcare...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Votat"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Nu am putut salva voturile dumneavoastră deoarece fie aţi atins limita de votare, fie ideea nu vă mai este disponibilă.",
		      readMore_tooltip: "Deschideţi ideea ${name}.",
		      readMore_a11y: "Activarea acestei legături va deschide ideea ${name} într-o nouă fereastră."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Replici",
		      THIS_ARIA_LABEL: "Acest răspuns",
		      THIS_TAB_TITLE: "Acest răspuns",
		      TAB_TITLE: "Răspunsuri (${0})",
		      REPLY_TO_REPLY: "În răspuns la ${thisReply}",
		      REPLY_TO_TOPIC: "În răspuns pentru ${thisTopic}",
		      THIS_TOPIC: "acest subiect",
		      THIS_REPLY: "acest răspuns",
		      NAVIGATE_TO_REPLY: "Deplasaţi-vă la răspunsul părinte",
		      NAVIGATE_TO_TOPIC: "Deplasaţi-vă la subiectul părinte",
		      ADD_COMMENT: "Replicaţi la acest pachet",
		      ADD_COMMENT_TOOLTIP: "Răspundeţi la acest subiect de forum",
		      SHOWING_RECENT_REPLIES: "Arătând ${0} cele mai recente răspunsuri",
		      PREV_COMMENTS: "Afişare mai multe răspunsuri",
		      PLACEHOLDER_TXT: "Replicaţi la acest pachet",
		      EMPTY: "Nu mai există răspunsuri.",
		      TRIM_LONG_COMMENT: "Scurtare răspuns?",
		      WARN_LONG_COMMENT: "Răspunsul este prea lung.  ${shorten}",
		      ERROR: "A apărut o eroare la extragerea răspunsurilor. ${again}",
		      ERROR_CREATE: "Răspunsul dumneavoastră nu a putut fi salvat.  Nu se poate verifica adresa de e-mail.",
		      ERROR_CREATE_NOT_FOUND: "Replica dumneavoastră nu a putut fi salvată, deoarece subiectul a fost şters sau nu mai este vizibil pentru dumneavoastră.",
		      ERROR_CREATE_ACCESS_DENIED: "Replica dumneavoastră nu a putut fi salvată, deoarece subiectul a fost şters sau nu mai este vizibil pentru dumneavoastră.",
		      ERROR_CREATE_TIMEOUT: "Răspunsul dumneavoastră nu a putut fi salvat deoarece serverul nu a putu fi contactat.  Faceţi clic pe 'Salvare' pentru a încerca din nou.",
		      ERROR_CREATE_CANCEL: "Răspunsul dumneavoastră nu a putu fi salvat deoarece răspunsul a fost anulat.  Faceţi clic pe 'Salvare' pentru a încerca din nou.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Trebuie să fiţi logat pentru a crea acest răspuns.  Faceţi clic pe 'Salvare' pentru a  fi promptat să vă logaţi.",
		      ERROR_NO_CONTENT: "Introduceţi răspunsul dumneavoastră şi faceţi clic pe 'Salvare'.  Dacă nu mai doriţi să lăsaţi un răspuns faceţi clic pe 'Anulare'.",
		      ERROR_UNAUTHORIZED: "Răspunsul dumneavoastră nu a putut fi salvat deoarece nu sunteţi autorizat să lăsaţi un răspuns.",
		      COMMENT_DELETED: {
		         DAY: "Răspuns şters de ${user} în ${EEEE} la ${time}",
		         MONTH: "Răspuns şters de ${user} în ${MMM} ${d}",
		         TODAY: "Rîspuns şters de ${user} azi la ${time}",
		         YEAR: "Replică ştearsă de ${user} pe ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Răspuns şters de ${user} ieri la ${time}",
		         TOMORROW: "Replică ştearsă de ${user} pe ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Motivul pentru ştergere: ${reason}",
		      REPLY_TITLE: "Re: ${0}",
		      SHOW_FULL_REPLY: "Vizualizaţi răspunsul complet",
		      SHOW_FULL_REPLY_TOOLTIP: "Deplasaţi-vă la răspunsul original în subiectul de forum",
		      REPLY_ACTION: "Replicare",
		      REPLY_ACTION_TOOLTIP: "Răspundeţi la această postare",
		      MODERATION_PENDING: "Acest răspuns aşteaptă examinarea.",
		      MODERATION_QUARANTINED: "Postarea a fost pusă în carantină de către moderator.",
		      MODERATION_REMOVED: {
		         DAY: "Acest răspuns a fost înlăturat de ${user} în ${EEEE} la ${time}.",
		         MONTH: "Acest răspuns a fost înlăturat de ${user} în ${MMM} ${d}.",
		         TODAY: "Acest răspuns a fost înlăturat de ${user} azi la ${time}.",
		         YEAR: "Această replică a fost înlăturată de ${user} pe ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Acest răspuns a fost înlăturat de ${user} ieri la ${time}.",
		         TOMORROW: "Această replică a fost înlăturată de ${user} pe ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Acest răspuns a fost respins de ${user} în ${EEEE} la ${time}.",
		         MONTH: "Acest răspuns a fost înlăturat de ${user} în ${MMM} ${d}.",
		         TODAY: "Acest răspuns a fost respins de ${user} azi la ${time}.",
		         YEAR: "Această replică a fost respinsă de ${user} pe ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Acest răspuns a fost respins de ${user} ieri la ${time}.",
		         TOMORROW: "Această replică a fost respinsă de ${user} pe ${MMM} ${d}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Răspunsul dumneavoastră a fost transmis pentru examinare şi va fi disponibil după ce e aprobat."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Comentarii",
		      PLACEHOLDER_TXT: "Adăugaţi un comentariu",
		      TAB_TITLE: "Comentarii (${0})",
		      ACTION_NOT_SUPPORTED: "Acţiune nesuportată",
		      ADD_COMMENT: "Adăugare comentariu",
		      ADD_COMMENT_TOOLTIP: "Adăugaţi u comentariu la acest articol",
		      CANCEL: "Anulare",
		      COMMENT_COUNT_ONE: "${0} comentariu",
		      COMMENT_COUNT_MANY: "${0} comentarii",
		      COMMENT_LABEL: "Comentariu:",
		      DELETE: "Ştergere",
		      DELETE_TOOLTIP: "Ştergere comentariu",
		      DELETEREASON: "Motiv pentru ştergerea acestui comentariu:",
		      DIALOG_TITLE: "Comentariu scurtat",
		      TOOLTIP: "Comentariu scurtat",
		      NAME: "Comentariu scurtat",
		      EDIT: "Editare",
		      EDIT_TOOLTIP: "Editare comentariu",
		      ERROR_CREATE: "Comentariul dumneavoastră nu a putut fi salvat.  Nu se poate verifica adresa de e-mail.",
		      ERROR_CREATE_NOT_FOUND: "Comentariul dumneavoastră nu a putut fi salvat, deoarece articolul a fost şters sau nu mai este vizibil pentru dumneavoastră.",
		      ERROR_CREATE_ACCESS_DENIED: "Comentariul dumneavoastră nu a putut fi salvat, deoarece articolul a fost şters sau nu mai este vizibil pentru dumneavoastră.",
		      ERROR_CREATE_TIMEOUT: "Comentariul dumneavoastră nu a putut fi salvat deoarece serverul nu a putut fi contactat.  Faceţi clic pe 'Postare' pentru a încerca din nou.",
		      ERROR_CREATE_CANCEL: "Comentariul nu a putut fi salvat deoarece cererea a fost anulată.  Faceţi clic pe 'Postare' pentru a încerca din nou.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Trebuie să fiţi logat pentru a crea acest comentariu.  Faceţi clic pe 'Postare' pentru a  fi promptat să vă logaţi.",
		      ERROR_DELETE: "Comentariul dumneavoastră nu a putut fi şters.  Nu se poate verifica adresa de e-mail.",
		      ERROR_DELETE_TIMEOUT: "Comentariul dumneavoastră nu a putut fi şters deoarece serverul nu a putut fi contactat.  Faceţi clic pe 'Ştergere' pentru a încerca din nou.",
		      ERROR_DELETE_NOT_FOUND: "Comentariul dumneavoastră nu a putut fi şters deoarece comentariul sau articolul a fost şters nu nu mai este vizibil pentru dumneavoastră.",
		      ERROR_DELETE_ACCESS_DENIED: "Comentariul dumneavoastră nu a putut fi şters deoarece articolul a fost şters sau nu mai este vizibil pentru dumneavoastră.",
		      ERROR_DELETE_CANCEL: "Comentariul nu a putut fi şters deoarece cererea a fost anulată.  Faceţi clic pe 'Ştergere' pentru a încerca din nou.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Trebuie să fiţi logat pentru a şterge acest comentariu.  Faceţi clic pe 'Ştergere' pentru a  fi promptat să vă logaţi.",
		      ERROR_EDIT: "Comentariul dumneavoastră nu a putut fi actualizat.  Nu se poate verifica adresa de e-mail.",
		      ERROR_EDIT_ACCESS_DENIED: "Comentariul dumneavoastră nu a putut fi actualizat deoarece articolul a fost şters sau nu mai este vizibil pentru dumneavoastră.",
		      ERROR_EDIT_NOT_FOUND: "Comentariul dumneavoastră nu a putut fi actualizat deoarece articolul a fost şters sau nu mai este vizibil pentru dumneavoastră.",
		      ERROR_EDIT_TIMEOUT: "Comentariul dumneavoastră nu a putut fi actualizat deoarece serverul nu a putut fi contactat.  Faceţi clic pe 'Postare' pentru a încerca din nou.",
		      ERROR_EDIT_CANCEL: "Comentariul nu a putut fi actualizat deoarece cererea a fost anulată.  Faceţi clic pe 'Postare' pentru a încerca din nou.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Trebuie să fiţi logat pentru a edita acest comentariu.  Faceţi clic pe 'Postare' pentru a  fi promptat să vă logaţi.",
		      ERROR_NO_CONTENT: "Introduceţi comentariul dumneavoastră şi faceţi clic pe 'Postare'.  Dacă nu mai vreţi să lăsaţi un comentariu faceţi clic pe 'Anulare'.",
		      ERROR_NO_CONTENT_EDIT: "Introduceţi comentariul dumneavoastră şi faceţi clic pe 'Postare'.  Dacă nu mai doriţi să vă editaţi comentariul, faceţi clic pe 'Anulare.'",
		      ERROR_UNAUTHORIZED: "Comentariul dumneavoastră nu a putut fi salvat deoarece nu sunteţi autorizat să lăsaţi un comentariu.",
		      ERROR_GENERAL: "A apărut o eroare.",
		      OK: "OK",
		      YES: "Da",
		      TRIM_LONG_COMMENT: "Scurtaţi comentariul?",
		      WARN_LONG_COMMENT: "Comentariul este prea lung.  ${shorten}",
		      LINK: "Legătură",
		      SAVE: "Salvare",
		      POST: "Postare",
		      SHOWMORE: "Citiţi mai mult...",
		      VIEW_COMMENTS_FILE: "Vizualizare comentarii asupra acestui fişier",
		      SUBSCRIBE_TO_COMMENTS: "Abonaţi-vă la aceste comentarii",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Urmăriţi modificările la aceste comentarii prin cititorul dumneavoastră de alimentări",
		      PROFILE_TITLE: "Deschideţi profilul ${user}.",
		      PROFILE_A11Y: "Activarea acestei legături va deschide profilul ${user} într-o fereastră nouă.",
		      MODERATION_PENDING: "Acest comentariu este în aşteptare examinare",
		      MODERATION_REMOVED: {
		         DAY: "Acest comentariu a fost înlăturat de ${user} în ${EEEE} la ${time}.",
		         MONTH: "Acest comentariu a fost înlăturat de ${user} pe ${MMM} ${d}.",
		         TODAY: "Acest comentariu a fost înlăturat de ${user} azi la ${time}.",
		         YEAR: "Acest comentariu a fost înlăturat de ${user} pe ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Acest comentariu a fost înlăturat de ${user} ieri la ${time}.",
		         TOMORROW: "Acest comentariu a fost înlăturat de ${user} pe ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Acest comentariu a fost respins de ${user} în ${EEEE} la ${time}.",
		         MONTH: "Acest comentariu a fost respins de ${user} pe ${MMM} ${d}.",
		         TODAY: "Acest comentariu a fost respins de ${user} azi la ${time}.",
		         YEAR: "Acest comentariu a fost respins de ${user} pe ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Acest comentariu a fost respins de ${user} ieri la ${time}.",
		         TOMORROW: "Acest comentariu a fost respins de ${user} pe ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Afişare comentarii anterioare",
		      EMPTY: "Nu există comentarii.",
		      ERROR_ALT: "Eroare",
		      ERROR: "A apărut o eroare la extragerea comentariilor. ${again}",
		      ERROR_ADDTL: "A apărut o eroare la extragerea comentariilor suplimentare. ${again}",
		      ERROR_AGAIN: "Încercaţi din nou.",
		      ERROR_AGAIN_TITLE: "Încercaţi din nou solicitarea pentru mai multe comentarii.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} la ${time} (versiunea ${version})",
		         MONTH: "${user} ${MMM} ${d} (versiunea ${version})",
		         TODAY: "${user} azi la ${time} (versiunea ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (versiune ${version})",
		         YESTERDAY: "${user} ieri la ${time} (versiunea ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (versiune ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} la ${time}",
		         MONTH: "${user} ${d} ${MMM}",
		         TODAY: "${user} azi la ${time}",
		         YEAR: "${user} ${d} ${MMM}, ${YYYY}",
		         YESTERDAY: "${user} ieri la ${time}",
		         TOMORROW: "${user} ${d} ${MMM}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} la ${time}",
		         MONTH: "${d} ${MMM}",
		         TODAY: "Azi la ${time}",
		         YEAR: "${d} ${MMM}, ${YYYY}",
		         YESTERDAY: "Ieri la ${time}",
		         TOMORROW: "${d} ${MMM}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Coment şters de ${user} pe ${EEEE} la ${time}",
		         MONTH: "Comentariu şters de ${user} în ${MMM} ${d}",
		         TODAY: "Comentariu şters de ${user} astăzi la ${time}",
		         YEAR: "Comentariu şters de ${user} pe ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Comentariu şters de ${user} ieri la ${time}",
		         TOMORROW: "Comentariu şters de ${user} pe ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} editat ${EEEE} la ${time} (versiunea ${version})",
		         MONTH: "${user} editat ${MMM} ${d} (versiunea ${version})",
		         TODAY: "${user} editat azi la ${time} (versiunea ${version})",
		         YEAR: "${user} editat ${MMM} ${d}, ${YYYY} (versiune ${version})",
		         YESTERDAY: "${user} editat ieri la ${time} (versiunea ${version})",
		         TOMORROW: "${user} editat ${MMM} ${d}, ${YYYY} (versiune ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} editat ${EEEE} la ${time}",
		         MONTH: "${user} editat ${MMM} ${d}",
		         TODAY: "${user} editat azi la ${time}",
		         YEAR: "${user} editat ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} editat ieri la ${time}",
		         TOMORROW: "${user} editat ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Sunteţi sigur că vreţi să ştergeţi acest comentariu?",
		      FLAG_ITEM: {
		         BUSY: "Salvare...",
		         CANCEL: "Anulare",
		         ACTION: "Semnalare ca necorespunzător",
		         DESCRIPTION_LABEL: "Furnizaţi un motiv pentru semnalarea acestui articol (opţional)",
		         EDITERROR: "Metadatele fişierului nu au fost editate din cauza unei erori",
		         OK: "Salvare",
		         ERROR_SAVING: "A fost o eroare la procesarea cererii. Nu se poate verifica adresa de e-mail.",
		         SUCCESS_SAVING: "Steguleţul dumneavoastră a fost transmis. Un moderator va investiga în curând.",
		         TITLE: "Semnalaţi acest articol ca necorespunzătoare",
		         COMMENT: {
		            TITLE: "Semnalaţi acest comentariu ca necorespunzător",
		            A11Y: "Acest buton deschide un dialog ce permite utilizatorului să semnaleze acest comentariu ca necorespunzător."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Anulare",
		      DIALOG_TITLE: "Ştergere comentariu",
		      NAME: "Ştergere comentariu",
		      OK: "OK",
		      TOOLTIP: "Ştergere comentariu"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Anulare",
		      CONFIRM: "Scurtarea va înlătura textul dincolo de limita comentariului.  Faceţi clic pe 'OK' pentru a scurta sau pe 'Anulare' pentru a edita comentariul.",
		      DIALOG_TITLE: "Comentariu scurtat",
		      NAME: "Comentariu scurtat",
		      OK: "OK",
		      TOOLTIP: "Comentariu scurtat"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Confirmare trimitere",
		      CONFIRM: "Comentariul dumneavoastră a fost trimis pentru examinare şi va fi disponibil atunci când va fi aprobat.",
		      OK: "OK"
		   },
		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "PM",
		      TODAY: "astăzi",
		      TODAY_U: "Astăzi",
		      YESTERDAY: "ieri",
		      YESTERDAY_U: "Ieri",
		      ADDED: { DAY: "Adăugat ${EEee} la ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Adăugat ${date_long}",
		         TODAY: "Adăugat astăzi la ${time}",
		         YEAR: "Adăugat ${date_long}",
		         YESTERDAY: "Adăugat ieri la ${time}"
		      },
		      LAST_UPDATED: { DAY: "Ultima actualizare ${EEee} la ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Ultima actualizare ${date_long}",
		         TODAY: "Ultima actualizare azi la ${time}",
		         YEAR: "Ultima actualizare ${date_long}",
		         YESTERDAY: "Ultima actualizare ieri la ${time}"
		      },
		      MONTHS_ABBR: { 0: "IAN",
		         10: "NOI",
		         11: "DEC",
		         1: "FEB",
		         2: "MAR",
		         3: "APR",
		         4: "MAI",
		         5: "IUN",
		         6: "IUL",
		         7: "AUG",
		         8: "SEP",
		         9: "OCT"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Astăzi",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ieri",
		         TOMORROW: "Mâine"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} la ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Azi la ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ieri la ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} la ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Azi la ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Ieri la ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} la ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} la ${time}",
		         TODAY: "${date_short} la ${time}",
		         YEAR: "${date_short} la ${time}",
		         YESTERDAY: "${date_short} la ${time}",
		         TOMORROW: "${date_short} la ${time}"
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
		      UPDATED: { DAY: "Actualizat ${EEee} la ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Actualizat ${date_long}",
		         TODAY: "Actualizat astăzi la ${time}",
		         YEAR: "Actualizat ${date_long}",
		         YESTERDAY: "Actualizat ieri la ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Nu poate să încarce informaţii versiune.",
		      ERROR_REQUEST_CANCELLED: "Cererea a fost anulată.",
		      ERROR_REQUEST_TIMEOUT: "Serverul nu a putut fi contactat.",
		      ERROR_REQUEST_UNKNOWN: "A apărut o eroare necunoscută.",
		      LOADING: "Încărcare ..",
		      NO_VERSIONS: "Nu există versiuni",
		      INFO: "Versiunea ${0} creată ${1} de ",
		      VERSION_NUMBER: "Versiune ${0}",
		      DELETED: "Şters",
		      DELETE_ALL: "Ştergeţi toate versiunile anterioare versiunii",
		      DELETE_VERSION_SINGLE: "Ştergere versiune ${0}",
		      DELETEERROR: "Versiunea nu a fost ştearsă din cauza unei erori.",
		      CREATE_VERSION: "Creaţi o versiune nouă",
		      CREATE_VERSION_TOOLTIP: "Creaţi o versiune a acestui fişier",
		      REVERT_VERSION: "Restaurare versiune ${0}",
		      REVERT_DESCRIPTION: "Restaurat din versiunea ${0}",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Pagina anterioară",
		      ELLIPSIS: "...",
		      NEXT: "Următor",
		      NEXT_TOOLTIP: "Pagina următoare",
		      COUNT: "${0}-${1} din ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Pagină",
		      SHOW: "Afişare",
		      ITEMS_PER_PAGE: " articole pe pagină.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Azi la ${time}",
		            YESTERDAY: "Ieri la ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} la ${time}",
		            YEAR: "${date_short} la ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} la ${time}",
		            TODAY: "Astăzi la ${time}",
		            YESTERDAY: "Ieri la ${time}"
		        },
		        UPDATED: { DAY: "Actualizat ${EEee} la ${time}",
		            YEAR: "Actualizat ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Actualizat ${date_short}",
		            TODAY: "Actualizat astăzi la ${time}",
		            YESTERDAY: "Actualizat ieri la ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Ştergere versiune ${0}",
		         DOWNLOAD: "Descărcare",
		         DOWNLOAD_TOOLTIP: "Descărcaţi această versiune (${0})",
		         VIEW: "Vizualizare",
		         VIEW_TOOLTIP: "Vizualizare versiune ${0}",
		         REVERT: {
		            A11Y: "Acest buton deschide un dialog care îi permite utilizatorului să confirme restaurarea unui fişier dintr-o versiune anterioară. Confirmarea acestei acţiuni va rezulta într-o reîmprospătare a conţinuturilor de pe pagină.",
		            FULL: "Restaurare",
		            WIDGET: "Restauraţi această versiune"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Versiunea nu a putut fi ştearsă deoarece a fost deja ştearsă sau nu mai este vizibilă pentru dumneavoastră.",
		         ERROR_ACCESS_DENIED: "Versiunea nu a putut fi ştearsă deoarece nu sunteţi un editor.",
		         ERROR_TIMEOUT: "Versiunea nu a fost ştearsă deoarece serverul nu a putut fi contactat.  Faceţi clic pe 'Ştergere' din nou pentru a vă încerca cererea din nou.",
		         ERROR_CANCEL: "Versiunea nu a fost ştearsă deoarece cererea a fost anulată.  Faceţi clic pe 'Ştergere' din nou pentru a vă încerca cererea din nou.",
		         ERROR_NOT_LOGGED_IN: "Trebuie sa fiţi logat pentru a şterge această versiune.  Faceţi clic pe 'Ştergere' pentru a  fi promptat să vă logaţi.",
		         GENERIC_ERROR: "Versiunea nu a putut fi ştearsă din cauza unei erori necunoscute.  Faceţi clic pe 'Ştergere' din nou pentru a vă încerca cererea din nou.",
		         FULL: "Ştergere",
		         A11Y: "Acest buton deschide un dialog care îi permite utilizatorului să confirme ştergerea acestei versiuni. Confirmarea acestei acţiuni va rezulta într-o reîmprospătare a conţinuturilor de pe pagină."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Versiunea nu a putut fi restaurată deoarece a fost ştearsă sau nu mai este vizibilă pentru dumneavoastră.",
		         ERROR_ACCESS_DENIED: "Versiunea nu a putut fi restaurată deoarece nu sunteţi un editor.",
		         ERROR_NAME_EXISTS: "Versiunea nu a putut fi restaurată deoarece un alt fişier are acelaşi nume.",
		         ERROR_TIMEOUT: "Versiunea nu a fost restaurată deoarece serverul nu a putut fi contactat.  Faceţi clic pe 'Restaurare' din nou pentru a vă încerca cererea din nou.",
		         ERROR_CANCEL: "Versiunea nu a fost restaurată deoarece cererea a fost anulată.  Faceţi clic pe 'Restaurare' din nou pentru a vă încerca cererea din nou.",
		         ERROR_QUOTA_VIOLATION: "Versiunea nu a putut fi restaurată din cauza restricţiilor de spaţiu.",
		         ERROR_MAX_CONTENT_SIZE: "Versiunea nu a putut fi restaurată deoarece este mai mare decât dimensiunea de fişier maximă permisă de ${0}",
		         GENERIC_ERROR: "Versiunea nu a putut fi restaurată din cauza unei erori necunoscute.  Faceţi clic pe 'Restaurare' din nou pentru a vă încerca cererea din nou."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Vedeţi cine a descărcat...",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Pagina anterioară",
		      ELLIPSIS: "...",
		      NEXT: "Următor",
		      NEXT_TOOLTIP: "Pagina următoare",
		      COUNT: "${0}-${1} din ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Pagină",
		      SHOW: "Afişare",
		      ITEMS_PER_PAGE: " articole pe pagină.",
		      VERSION: {
		         DAY: "Versiune ${version} pe ${date}",
		         MONTH: "Versiune ${version} pe ${date}",
		         TODAY: "Versiunea ${version} la ${time}",
		         YEAR: "Versiune ${version} pe ${date}",
		         YESTERDAY: "Versiunea ${version} ieri"
		      },
		      FILE: {
		         V_LATEST: "Aţi descărcat ultima versiune a acestui fişier",
		         V_OLDER: "Aţi descărcat cea mai recentă versiune ${0} a acestui fişier",
		         LOADING: "Încărcare...",
		         EMPTY: "Doar utilizatori anonimi",
		         ERROR: "Nu pot fi încărcate informaţiile de descărcare"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Eroare",
		      ERROR_ALT_TEXT: "Eroare:",
		      ERROR_MSG_GENERIC: "Ceva nu a mers bine.  Vă rugăm să încercaţi din nou.",
		      ERROR_MSG_NOT_AVAILABLE: "Acest articol a fost şters sau nu mai este disponibil",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Conţinutul pentru acest articol nu este disponibil.",
		      ERROR_MSG_NO_ACCESS: "Nu mai aveţi acces la acest articol.",
		      LOADING: "Încărcare...",
		      TITLE_SU: "${author} a postat un mesaj.",
		      TITLE_NI: "${author} v-a invitat să intraţi în reţeaua sa.",
		      AUTHOR_TITLE: "Vizualizaţi profilul pentru ${author}",
		      OPEN_LINK: "Deschidere ${title}",
		      CONFIRM_CLOSE_TITLE: "Confirmare",
		      CONFIRM_CLOSE_MESSAGE: "Sunteţi sigur că vreţi să vă abandonaţi modificările? Apăsaţi pe OK pentru a continua sau pe Anulare pentru a reveni",
		      OK: "OK",
		      CANCEL: "Anulare"
		   },
		   MESSAGE: {
		      SUCCESS: "Confirmare",
		      ERROR: "Eroare",
		      ERROR_ALT_TEXT: "Eroare:",
		      INFO: "Informaţii",
		      WARNING: "Avertisment",
		      DISMISS: "Ascundeţi acest mesaj",
		      MORE_DETAILS: "Detalii suplimentare",
		      HIDE_DETAILS: "Ascundere detalii"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Creat: ${EEEE} la ${time}",
		           MONTH: "Creat: ${MMM} ${d}",
		           TODAY: "Creat: Azi la ${time}",
		           YEAR: "Creat: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Creat: Ieri la ${time}",
		           TOMORROW: "Creat: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "A apărut o eroare.  ${again}.",
		      error_again: "Vă rugăm să încercaţi din nou",
		      error_404: "Actualizarea de stare nu mai există.",
		      notifications: {
		         STATUS_UPDATE: "${user} a postat un mesaj",
		         USER_BOARD_POST: "${user} a scris pe planşa dumneavoastră",
		         POST_COMMENT: "${user} a scris:"
		      }
		   },
		   login: {
		      error: "Numele de utilizator şi/sau parola dumneavoastră nu se potriveşte cu niciun cont existent. Vă rugăm să încercaţi din nou.",
		      logIn: "Logare",
		      password: "Parolă:",
		      user: "Nume de utilizator:",
		      welcome: "Logaţi-vă în HCL Connections"
		   },
		   repost: {
		      name: "Re-postare",
		      title: "Re-postează această actualizare pentru urmăritorii mei sau comunităţile mele",
		      msg_success: "Actualizarea a fost re-postată cu succes pentru urmăritorii dumneavoastră.",
		      msg_generic: "Ceva nu a mers bine.  Vă rugăm să încercaţi din nou."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Adăugare",
		      ADD_TXT: "Adăugaţi persoane sau comunităţi ca şi cititori",
		      SHOW_MORE: "Afişare mai mult...",
		      READER_IF_PUBLIC: "Toţi (public)",
		      READER_IF_PUBLIC_TOOLTIP: "Acest fişier este public şi vizibil pentru oricine",
		      EMPTY_READERS: "Fără",
		      READERS_LABEL: "Cititori:\u00a0",
		      EDITORS_LABEL: "Editori:\u00a0",
		      OWNER_LABEL: "Proprietar:\u00a0",
		      ERROR: "Nu poate să încarce informaţii de partajare",
		      ERROR_NOT_FOUND: "Fişierul pe care l-aţi cerut a fost şters sau mutat. Dacă cineva v-a trimis această legătură, verificaţi dacă este corectă.",
		      ERROR_ACCESS_DENIED: "Nu aveţi permisiune să vizualizaţi acest fişier.  Fişierul nu este public şi nu este partajat cu dumneavoastră.",
		      SHARE: "Partajare",
		      CANCEL: "Anulare",
		      SHARE_WITH: "Partajare cu:",
		      PERSON: "o persoană",
		      COMMUNITY: "o comunitate",
		      PLACEHOLDER: "Nume sau e-mail persoană...",
		      MESSAGE: "Mesaj:",
		      MESSAGE_TXT: "Adăugaţi un mesaj suplimentar",
		      REMOVE_ITEM_ALT: "Înlăturare ${0}",
		      NO_MEMBERS: "Fără",
		      A11Y_READER_ADDED: "S-a selectat ${0} ca cititor",
		      A11Y_READER_REMOVED: "Înlăturat ${0} ca şi cititor",
		      SELF_REFERENCE_ERROR: "Nu puteţi partaja cu dumneavoastră.",
		      OWNER_REFERENCE_ERROR: "Nu puteţi partaja cu proprietarul fişierului.",
		      SHARE_COMMUNITY_WARN: "Partajarea cu comunitatea publică '${0}' va face acest fişier public.",
		      SELECT_USER_ERROR: "Trebuie să selectaţi cel puţin o persoană sau comunitate cu care să partajaţi",
		      WARN_LONG_MESSAGE: "Acest mesaj este prea lung.",
		      TRIM_LONG_MESSAGE: "Scurtaţi mesajul?",
		      ERROR_SHARING: "Fişierul nu a putut fi partajat.  Vă rugăm să încercaţi din nou mai târziu.",
		      INFO_SUCCESS: "Fişierul a fost partajat cu succes.",
		      MAX_SHARES_ERROR: "Numărul maxim de partajări a fost depăşit.",
		      NOT_LOGGED_IN_ERROR: "Fişierul nu a fost partajat deoarece nu eraţi logat.  Faceţi clic pe 'Partajare' pentru a partaja fişierul.",
		      TIMEOUT_ERROR: "Fişierul nu a fost partajat deoarece serverul nu a putut fi contactat.  Faceţi clic pe 'Partajare' pentru a încerca din nou.",
		      CANCEL_ERROR: "Fişierul nu a fost partajat deoarece cererea a fost anulată.  Faceţi clic pe 'Partajare' pentru a încerca din nou.",
		      NOT_FOUND_ERROR: "Fişierul a fost şters sau nu mai este vizibil pentru dumneavoastră şi nu poate fi partajat.",
		      ACCESS_DENIED_ERROR: "Nu mai aveţi permisiune să partajaţi acest fişier.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Un fişier care este restricţionat nu poate fi făcut public.",
		      TOOLTIP: "Oferiţi acces altora la acest fişier"
		   },
		   HISTORY: {
		      TAB_TITLE: "Actualizări recente",
		      NO_HISTORY: "Nu există actualizări recente.",
		      EMPTY: "Nu au putut fi extrase cele mai recente actualizări pentru acest articol. A fost şters sau nu mai aveţi acces la el.",
		      MORE: "Afişare actualizări precedente",
		      ERROR_ALT: "Eroare",
		      ERROR: "A apărut o eroare în timpul extragerii actualizărilor. ${again}",
		      ERROR_ADDTL: "A apărut o eroare în timpul extragerii actualizărilor suplimentare. ${again}",
		      ERROR_AGAIN: "Încercaţi din nou.",
		      ERROR_AGAIN_TITLE: "Încercaţi să cereţi din nou mai multe actualizări.",
		      PROFILE_TITLE: "Deschideţi profilul ${user}.",
		      SORT_BY: "Sortare după\\:",
		      SORTS: {
		         DATE: "Dată",
		         DATE_TOOLTIP: "Sortare de la cea mai recentă istorie la cele mai puţin recente actualizări",
		         DATE_TOOLTIP_REVERSE: "Sortare de la cea mai puţin recentă istorie până la cele mai recente actualizări"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} la ${time}",
		             MONTH: "${d} ${MMM}",
		             TODAY: "Azi la ${time}",
		             YEAR: "${d} ${MMM}, ${YYYY}",
		             YESTERDAY: "Ieri la ${time}",
		             TOMORROW: "${d} ${MMM}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Acest comentariu",
			   REPLY_ACTION: "Replicare",
		       REPLY_ACTION_TOOLTIP: "Răspundeţi la acest comentariu"
		   },
		   OAUTH: {
		      welcomeHeader: "Bine aţi venit la conexiuni",
		      continueBtnLabel: "Continuare",
		      continueBtnA11y: "Activarea acestei legături va deschide o nouă fereastră ce vă va permite să autorizaţi accesul la Connections.",
		      clickHere: "Faceţi clic aici",
		      infoMsg: "Connections necesită autorizarea dumneavoastră pentru a accesa datele dumneavoastră.",
		      authorizeGadget: "${clickHere} pentru a autoriza accesul acestei aplicaţii la informaţiile dumneavoastră Connections.",
		      confirmAuthorization: "${clickHere} pentru a confirma că aţi autorizat această aplicaţie să acceseze informaţiile dumneavoastră Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Activarea acestei legături va deschide o fereastră nouă care vă va permite să autorizaţi accesul la magazia Bibliotecă Connections.",
		      infoMsg: "Magazia Bibliotecă Connections necesită autorizarea dumneavoastră pentru a accesa datele dumneavoastră.",
		      authorizeGadget: "${clickHere} penmtru a autoriza această aplicaţie să acceseze informaţiile magaziei dumneavoastră Bibliotecă Connections.",
		      confirmAuthorization: "${clickHere} pentru a confirma că aţi autorizat această aplicaţie să acceseze informaţiile magaziei dumneavoastră Bibliotecă Connections."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Anulare",
		      CONFIRM: "Sunteţi sigur că vreţi să vă abandonaţi modificările?  Apăsaţi OK pentru a continua sau Anulare pentru a vă întoarce.",
		      DIALOG_TITLE: "Confirmare",
		      NAME: "Confirmare",
		      OK: "OK",
		      TOOLTIP: "Confirmare"
		   }
});

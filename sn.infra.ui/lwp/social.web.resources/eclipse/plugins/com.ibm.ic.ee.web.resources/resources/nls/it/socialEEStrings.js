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
		         label: "Altro",
		         tooltip: "Ulteriori azioni"
		       },
		       tags_more: "e altri ${0}",
		       ERROR_ALT: "Errore",
		       PERSON_TITLE: "Aprire il profilo di ${user}.",
		       inactiveUser: "${user} (inattivo)",
		       inactiveIndicator: "(inattivo)",
		       like_error: "La preferenza non è stata salvata. Riprovare più tardi.",
		       vote_error: "Impossibile salvare il voto. Riprovare più tardi."
		   },
		   generic: {
		      untitled: "(Senza titolo)",
		      tags: "Tags:",
		      tags_more: "e altri ${0}",
		      likes: "Preferenze",
		      comments: "Commenti",
		      titleTooltip: "Navigare fino a ${app}",
		      error: "Impossibile richiamare dati.",
		      timestamp: {
		         created: {
		            DAY: "Creato ${EEEE} alle ${time}",
		            MONTH: "Creato ${MMM} ${d}",
		            TODAY: "Creato oggi alle ${time}",
		            YEAR: "Creato il ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creato ieri alle ${time}",
		            TOMORROW: "Creato il ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Aggiornato ${EEEE} alle ${time}",
		            MONTH: "Aggiornato il ${MMM} ${d}",
		            TODAY: "Aggiornato oggi alle ${time}",
		            YEAR: "Aggiornato il ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Aggiornato ieri alle ${time}",
		            TOMORROW: "Aggiornato il ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Pubblico",
		         priv: "Privata"
		      },
		      action: {
		         created: "Creato",
		         updated: "Aggiornato"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Ricevere gli aggiornamenti sulle persone seguite sulla home page e in un riepilogo email.",
		      profile_title: "Aprire il profilo di ${user}.",
		      profile_a11y: "L'attivazione di questo collegamento aprirà il profilo di ${user} in una nuova finestra.",
		      error: "Si è verificato un errore.  ${again}.",
		      error_again: "Provare di nuovo.",
		      error_404: "La richiesta di rete non esiste più.",
		      warning: "Avvertenza",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Sei ora tra i contatti di rete.",
		            	follow: "Sei ora tra i contatti di rete e stai seguendo ${user}."
		            },
		            ignore: {
		            	nofollow: "Hai ignorato l'invito.",
		            	follow: "Hai ignorato l'invito ma stai seguendo ${user}."
		            }
		         },
		         error: {
		            accept: "Si è verificato un errore al momento dell'accettazione della richiesta.",
		            ignore: "Si è verificato un errore al momento del rifiuto della richiesta."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} alle ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "Oggi alle ${time}",
		              YEAR: "${MMM} ${d}, ${YYYY}",
		              YESTERDAY: "Ieri alle ${time}",
		              TOMORROW: "${MMM} ${d}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "L'attivazione di questo collegamento aprirà ${name} in una nuova finestra.",
		      tooltip: "Aprire ${name} nell'applicazione File",
		      profile_title: "Aprire il profilo di ${user}.",
		      profile_a11y: "L'attivazione di questo collegamento aprirà il profilo di ${user} in una nuova finestra.",
		      download_tooltip: "Scarica questo file (${0})",
		      following: {
		         add: "Segui file",
		         remove: "Non seguire più",
		         title: "Attiva/disattiva la ricezione di aggiornamenti su questo file"
		      },
		      share: {
		         label: "Condividi",
		         title: "Consenti ad altri l'accesso a questo file"
		      },
		      timestamp: {
		         created: {
		            DAY: "Creato ${EEEE} alle ${time}",
		            MONTH: "Creato ${MMM} ${d}",
		            TODAY: "Creato oggi alle ${time}",
		            YEAR: "Creato il ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creato ieri alle ${time}",
		            TOMORROW: "Creato il ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} creato il ${EEEE} alle ${time}",
		            MONTH: "${user} creato il ${MMM} ${d}",
		            TODAY: "${user} creato oggi alle ${time}",
		            YEAR: "${user} creato il ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} creato ieri alle ${time}",
		            TOMORROW: "${user} creato il ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Aggiornato ${EEEE} alle ${time}",
		            MONTH: "Aggiornato il ${MMM} ${d}",
		            TODAY: "Aggiornato oggi alle ${time}",
		            YEAR: "Aggiornato il ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Aggiornato ieri alle ${time}",
		            TOMORROW: "Aggiornato il ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} aggiornato il ${EEEE} alle ${time}",
		            MONTH: "${user} aggiornato il ${MMM} ${d}",
		            TODAY: "${user} aggiornato oggi alle ${time}",
		            YEAR: "${user} aggiornato il ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} aggiornato ieri alle ${time}",
		            TOMORROW: "${user} aggiornato il ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Creato: ${EEEE} alle ${time}",
		            MONTH: "Creato il: ${MMM} ${d}",
		            TODAY: "Creato: Oggi alle ${time}",
		            YEAR: "Creato: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creato: Ieri alle ${time}",
		            TOMORROW: "Creato: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Aggiornato: ${EEEE} alle ${time}",
		            MONTH: "Aggiornato il: ${MMM} ${d}",
		            TODAY: "Aggiornato: Oggi alle ${time}",
		            YEAR: "Aggiornato: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Aggiornato: Ieri alle ${time}",
		            TOMORROW: "Aggiornato: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} da ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} da ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Scarica questo file (${size})",
		      	 DOWNLOAD_ALT: "Download"
		      },
		      PREVIEW: {
		         LINK: "Anteprima",
		         TITLE: "Anteprima di questo file in una nuova finestra."
		      },
		      TAGS: "Tags:",
		      error: "Si è verificato un errore.  ${again}.",
		      error_again: "Provare di nuovo.",
		      error_404: "Il file non esiste più e non si dispone delle autorizzazioni sufficienti per accedervi.",
		      error_403: "Non si dispone dell'autorizzazione per visualizzare questo file. Il file non è pubblico e non è condiviso con questo utente.",
		      notifications: {
		         USER_SHARED: "${user} ha scritto:",
		         CHANGE_SUMMARY: "${user} ha fornito un riepilogo delle modifiche",
		         NO_CHANGE_SUMMARY: "${user} non ha fornito un riepilogo delle modifiche",
		         COMMENTED: "${user} ha aggiunto un commento"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Sottoposto a check-out dall'utente",
		      checkedout_other: "Check-out eseguito da ${user}",
		      tooltip: "Apri il file ${name} nella libreria",
		      draft_404_info: "La bozza è stata eliminata o non è più condivisa con l'utente. La versione pubblicata ora è l'ultima versione di questo file.",
		      error_404: "Il file è stato eliminato o non è più condiviso con l'utente.",
		      error_403: "Il file è stato eliminato o non è più condiviso con l'utente.",
		      error_preview: "Il file non è più disponibile per l'anteprima.",
		      draft_review_canceled: "La revisione è stata annullata e la bozza non è più condivisa con l'utente. La revisione non è più richiesta.",
		      switch_ee: "Visualizza bozza",
		      switch_ee_tooltip: "Visualizza l'ultima bozza per questo file"
		   },
		   ecm_draft: {
		      tooltip: "Apri la bozza ${name} nella libreria",
		      community_owners: "Proprietari della comunità",
		      draft: "Bozza",
		      draft_tooltip: "Visualizzazione bozza",
		      draft_general_info: "La bozza precedente non esiste più; ora l'ultima versione è una bozza più recente.",
		      draft_review_404_general_info: "Uno dei revisori ha già votato. Non è più necessario rivedere questa bozza.",
		      draft_review_404_request_info: "La bozza precedente non esiste più e l'ultima bozza è stata inoltrata per la revisione. La revisione è richiesta.",
		      draft_review_404_require_info: "La bozza precedente non esiste più e l'ultima bozza è stata inoltrata per la revisione. La revisione è necessaria.",
		      draft_review_request_info: "La revisione è richiesta.",
		      draft_review_require_info: "La revisione è necessaria.",
		      error_404: "La bozza è stata eliminata o non è più condivisa con l'utente.",
		      error_403: "Non è possibile visualizzare questa bozza poiché non è condivisa.",
		      error_preview: "La bozza non è più disponibile per l'anteprima.",
		      switch_ee: "Visualizza versione pubblicata",
		      switch_ee_tooltip: "Visualizza la versione pubblicata di questo file",
		      review: "Revisione",
		      reviewers: "Revisori",
		      reviwers_addtl: "Ulteriori revisori",
		      in_review: "Bozza in revisione",
		      in_review_tooltip: "Visualizzazione della bozza in revisione",
		      review_required_any: "I proprietari della comunità chiedono che un solo revisore riveda questa bozza.",
		      review_required_all: "I proprietari della comunità richiedono che tutti i revisori rivedano questa bozza.",
		      review_required_generic: "I proprietari della comunità richiedono che tutti i revisori rivedano questa bozza.",
		      review_additional_required: "È richiesta la revisione di questa bozza da parte di tutti i revisori aggiunti dall'utente che ha inviato la bozza.",
		      reivew_submitted_date: {
		         DAY: "${user} ha inoltrato la bozza per la revisione il ${EEEE} alle ${time}.",
		         MONTH: "${user} ha inoltrato la bozza per la revisione il ${MMM} ${d}.",
		         TODAY: "${user} ha inoltrato la bozza per la revisione oggi alle ${time}.",
		         YEAR: "${user} ha inoltrato la bozza per la revisione il ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} ha inoltrato la bozza per la revisione ieri alle ${time}.",
		         TOMORROW: "${user} ha inoltrato la bozza per la revisione il ${MMM} ${d}, ${YYYY}."
		      },
		      pending: "In attesa",
		      pending_rejected: "La revisione non è più necessaria poiché la bozza è stata rifiutata",
		      approve: "Approva",
		      approved: "Approvato",
		      approve_tooltip: "Approva questa bozza",
		      accept_success: "Questa bozza è stata approvata.",
		      accept_error: "Si è verificato un errore durante l'approvazione di questa bozza. Riprovare.",
		      accept_info: "Questa bozza è stata approvata.",
		      reject: "Rifiuta",
		      rejected: "Rifiutato",
		      reject_tooltip: "Rifiuta questa bozza",
		      reject_success: "Questa bozza è stata rifiutata.",
		      reject_error: "Si è verificato un errore nel rifiuto di questa bozza. Riprovare.",
		      reject_info: "Questa bozza è stata rifiutata."
		   },
		   authUser: {
		      error: "Si è verificato un errore durante il richiamo dell'utente corrente.  ${again}.",
		      error_again: "Provare di nuovo.",
		      error_404: "Impossibile trovare l'utente autenticato.",
		      error_403: "Non si dispone dell'autorizzazione per richiamare le informazioni sull'utente."
		   },
		   forum: {
		      error: "Si è verificato un errore.  ${again}.",
		      error_again: "Provare di nuovo.",
		      error_404: "Il forum non esiste più e non si dispone delle autorizzazioni sufficienti per accedervi.",
		      error_403: "Non dispone dell'autorizzazione per visualizzare questo forum. Il forum non è pubblico e non è condiviso con l'utente.",
		      readMore: "Visualizza l'argomento completo...",
		      readMore_tooltip: "Aprire l'argomento del forum ${name}.",
		      readMore_a11y: "L'attivazione di questo collegamento aprirà l'argomento del forum ${name} in una nuova finestra.",
		      QUESTION_ANSWERED: "Questa domanda è stata risposta.",
		      QUESTION_NOT_ANSWERED: "Questa domanda non ha ancora ricevuto risposta.",
		      attachments: "${count} allegati",
		      attachments_one: "${count} allegato"
		   },
		   blog: {
		      error: "Si è verificato un errore.  ${again}.",
		      error_again: "Provare di nuovo.",
		      error_404: "Il blog non esiste più e non si dispone delle autorizzazioni sufficienti per accedervi.",
		      error_403: "Non si dispone dell'autorizzazione per visualizzare questo blog. Il blog non è pubblico e non è condiviso con l'utente.",
		      readMore: " Leggi altro...",
		      readMore_tooltip: "Aprire la voce del blog ${name}.",
		      readMore_a11y: "L'attivazione di questo collegamento aprirà la voce del blog ${name} in una nuova finestra.",
		      graduated: "Promosso",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Vota</a>",
		  					TOOLTIP: 	"Vota"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Votato</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Votato</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Annulla</a>",
		  					TOOLTIP: 	"Rimuovi voto"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 persone hanno votato"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 persona ha votato"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} hanno votato"
		  				}
		  			},
		  			LOADING: "Caricamento...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Votato"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Il voto non è stato salvato in quanto è stato raggiunto il limite del numero di voti o l'idea non è più disponibile.",
		      readMore_tooltip: "Aprire l'idea ${name}.",
		      readMore_a11y: "L'attivazione di questo collegamento aprirà l'idea ${name} in una nuova finestra."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Risposte",
		      THIS_ARIA_LABEL: "Questa risposta",
		      THIS_TAB_TITLE: "Questa risposta",
		      TAB_TITLE: "Risposte (${0})",
		      REPLY_TO_REPLY: "In risposta a ${thisReply}",
		      REPLY_TO_TOPIC: "In risposta a ${thisTopic}",
		      THIS_TOPIC: "questo argomento",
		      THIS_REPLY: "questa risposta",
		      NAVIGATE_TO_REPLY: "Passa alla risposta principale",
		      NAVIGATE_TO_TOPIC: "Passa all'argomento principale",
		      ADD_COMMENT: "Rispondi a questo argomento",
		      ADD_COMMENT_TOOLTIP: "Rispondi all'argomento di questo forum",
		      SHOWING_RECENT_REPLIES: "Visualizzazione delle ${0} risposte più recenti",
		      PREV_COMMENTS: "Mostra più risposte",
		      PLACEHOLDER_TXT: "Rispondi a questo argomento",
		      EMPTY: "Non esistono risposte.",
		      TRIM_LONG_COMMENT: "Abbreviare la risposta?",
		      WARN_LONG_COMMENT: "La risposta è troppo lunga.  ${shorten}",
		      ERROR: "Si è verificato un errore durante il richiamo delle risposte. ${again}",
		      ERROR_CREATE: "Impossibile salvare la risposta.  Riprovare in seguito.",
		      ERROR_CREATE_NOT_FOUND: "Impossibile salvare la risposta poiché l'argomento è stato eliminato o non è più visibile all'utente.",
		      ERROR_CREATE_ACCESS_DENIED: "Impossibile salvare la risposta poiché l'argomento è stato eliminato o non è più visibile all'utente.",
		      ERROR_CREATE_TIMEOUT: "Impossibile salvare la risposta poiché non è stato possibile contattare il server.  Fare clic su 'Salva' per riprovare.",
		      ERROR_CREATE_CANCEL: "Impossibile salvare la risposta poiché la richiesta è stata annullata.  Fare clic su 'Salva' per riprovare.",
		      ERROR_CREATE_NOT_LOGGED_IN: "È necessario essere collegati per creare questa risposta.  Fare clic su 'Salva' affinché sia richiesto il collegamento.",
		      ERROR_NO_CONTENT: "Immettere la risposta e fare clic su 'Salva'.  Se non si desidera più lasciare una risposta, fare clic su 'Annulla'.",
		      ERROR_UNAUTHORIZED: "Non è stato possibile salvare la risposta poiché non si dispone dell'autorizzazione per rispondere.",
		      COMMENT_DELETED: {
		         DAY: "Risposta eliminata da ${user} il ${EEEE} alle ${time}",
		         MONTH: "Risposta eliminata da ${user} il ${MMM} ${d}",
		         TODAY: "Risposta eliminata da ${user} oggi alle ${time}",
		         YEAR: "Risposta eliminata da ${user} il ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Risposta eliminata da ${user} ieri alle ${time}",
		         TOMORROW: "Risposta eliminata da ${user} il ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Motivi dell'eliminazione: ${reason}",
		      REPLY_TITLE: "Re: ${0}",
		      SHOW_FULL_REPLY: "Visualizza risposta completa",
		      SHOW_FULL_REPLY_TOOLTIP: "Passa alla risposta originale nell'argomento del forum",
		      REPLY_ACTION: "Rispondi",
		      REPLY_ACTION_TOOLTIP: "Rispondi a questo post",
		      MODERATION_PENDING: "Questa risposta è in attesa di revisione.",
		      MODERATION_QUARANTINED: "La pubblicazione è stata inserita in quarantena dal moderatore.",
		      MODERATION_REMOVED: {
		         DAY: "Questa risposta è stata rimossa da ${user} il ${EEEE} alle ${time}.",
		         MONTH: "Questa risposta è stata rimossa da ${user} il ${MMM} ${d}.",
		         TODAY: "Questa risposta è stata rimossa da ${user} oggi alle ${time}.",
		         YEAR: "Questa risposta è stata rimossa da ${user} il ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Questa risposta è stata rimossa da ${user} ieri alle ${time}.",
		         TOMORROW: "Questa risposta è stata rimossa da ${user} il ${MMM} ${d} ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Questa risposta è stata rifiutata da ${user} il ${EEEE} alle ${time}.",
		         MONTH: "Questa risposta è stata rifiutata da ${user} il ${MMM} ${d}.",
		         TODAY: "Questa risposta è stata rifiutata da ${user} oggi alle ${time}.",
		         YEAR: "Questa risposta è stata rifiutata da ${user} il ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Questa risposta è stata rifiutata da ${user} ieri alle ${time}.",
		         TOMORROW: "Questa risposta è stata rifiutata da ${user} il ${MMM} ${d} ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "La risposta è stata sottoposta a revisione e sarà disponibile quando approvata."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Commenti",
		      PLACEHOLDER_TXT: "Aggiungi un commento",
		      TAB_TITLE: "Commenti (${0})",
		      ACTION_NOT_SUPPORTED: "Azione non supportata",
		      ADD_COMMENT: "Aggiungi un commento",
		      ADD_COMMENT_TOOLTIP: "Aggiungere un commento a questo elemento",
		      CANCEL: "Annulla",
		      COMMENT_COUNT_ONE: "${0} commento",
		      COMMENT_COUNT_MANY: "${0} commenti",
		      COMMENT_LABEL: "Commento:",
		      DELETE: "Elimina",
		      DELETE_TOOLTIP: "Elimina commento",
		      DELETEREASON: "Motivo dell'eliminazione di questo commento:",
		      DIALOG_TITLE: "Commento abbreviato",
		      TOOLTIP: "Commento abbreviato",
		      NAME: "Commento abbreviato",
		      EDIT: "Modifica",
		      EDIT_TOOLTIP: "Modifica commento",
		      ERROR_CREATE: "Impossibile salvare i commenti.  Riprovare in seguito.",
		      ERROR_CREATE_NOT_FOUND: "Non è stato possibile salvare il commento perché l'elemento è stato eliminato o non è più visibile all'utente.",
		      ERROR_CREATE_ACCESS_DENIED: "Non è stato possibile salvare il commento perché l'elemento è stato eliminato o non è più visibile all'utente.",
		      ERROR_CREATE_TIMEOUT: "Impossibile salvare il commento perché non è stato possibile contattare il server.  Fare clic su 'Pubblica' per provare di nuovo.",
		      ERROR_CREATE_CANCEL: "Non è stato possibile salvare il commento perché la richiesta è stata annullata.  Fare clic su 'Pubblica' per provare di nuovo.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Per creare questo commento l'utente deve essere collegato.  Fare clic su 'Pubblica' affinché sia richiesto il collegamento.",
		      ERROR_DELETE: "Non è stato possibile eliminare il commento.  Riprovare in seguito.",
		      ERROR_DELETE_TIMEOUT: "Impossibile eliminare il commento perché non è stato possibile contattare il server.  Fare clic su 'Elimina' per riprovare.",
		      ERROR_DELETE_NOT_FOUND: "Impossibile eliminare il commento perché il commento stesso o l'elemento è stato eliminato o non è più visibile.",
		      ERROR_DELETE_ACCESS_DENIED: "Non è stato possibile eliminare il commento perché l'elemento è stato eliminato o non è più visibile all'utente.",
		      ERROR_DELETE_CANCEL: "Non è stato possibile eliminare il commento perché la richiesta è stata annullata.  Fare clic su 'Elimina' per riprovare.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Per eliminare questo commento l'utente deve essere collegato.  Fare clic su 'Elimina' affinché sia richiesto il collegamento.",
		      ERROR_EDIT: "Non è stato possibile aggiornare il commento.  Riprovare in seguito.",
		      ERROR_EDIT_ACCESS_DENIED: "Non è stato possibile aggiornare il commento perché l'elemento è stato eliminato o non è più visibile all'utente.",
		      ERROR_EDIT_NOT_FOUND: "Non è stato possibile aggiornare il commento perché l'elemento è stato eliminato o non è più visibile all'utente.",
		      ERROR_EDIT_TIMEOUT: "Impossibile aggiornare il commento perché non è stato possibile contattare il server.  Fare clic su 'Pubblica' per provare di nuovo.",
		      ERROR_EDIT_CANCEL: "Non è stato possibile aggiornare il commento perché la richiesta è stata annullata.  Fare clic su 'Pubblica' per provare di nuovo.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Per modificare questo commento l'utente deve essere collegato.  Fare clic su 'Pubblica' affinché sia richiesto il collegamento.",
		      ERROR_NO_CONTENT: "Immettere il commento e fare clic su 'Pubblica'.  Se non si desidera lasciare un commento, fare clic su 'Annulla'.",
		      ERROR_NO_CONTENT_EDIT: "Immettere il commento e fare clic su 'Pubblica'.  Se non si desidera modificare il commento, fare clic su 'Annulla'.",
		      ERROR_UNAUTHORIZED: "Non è stato possibile salvare il commento poiché non si dispone dell'autorizzazione per commentare.",
		      ERROR_GENERAL: "Si è verificato un errore.",
		      OK: "OK",
		      YES: "Sì",
		      TRIM_LONG_COMMENT: "Abbreviare il commento?",
		      WARN_LONG_COMMENT: "Il commento è troppo lungo.  ${shorten}",
		      LINK: "Collegamento",
		      SAVE: "Salva",
		      POST: "Pubblica",
		      SHOWMORE: "Leggi altro...",
		      VIEW_COMMENTS_FILE: "Visualizza commenti su questo file",
		      SUBSCRIBE_TO_COMMENTS: "Sottoscrivi a questi commenti",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Seguire le modifiche a questi commenti attraverso il lettore feed",
		      PROFILE_TITLE: "Aprire il profilo di ${user}.",
		      PROFILE_A11Y: "L'attivazione di questo collegamento aprirà il profilo di ${user} in una nuova finestra.",
		      MODERATION_PENDING: "Questo commento è in attesa di revisione.",
		      MODERATION_REMOVED: {
		         DAY: "Questo commento è stato rimosso da ${user} il ${EEEE} alle ${time}.",
		         MONTH: "Questo commento è stato rimosso da ${user} il ${MMM} ${d}.",
		         TODAY: "Questo commento è stato rimosso da ${user} oggi alle ${time}.",
		         YEAR: "Questo commento è stato rimosso da ${user} il ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Questo commento è stato rimosso da ${user} ieri alle ${time}.",
		         TOMORROW: "Questo commento è stato rimosso da ${user} il ${MMM} ${d} ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Questo commento è stato rifiutato da ${user} il ${EEEE} alle ${time}.",
		         MONTH: "Questo commento è stato rifiutato da ${user} il ${MMM} ${d}.",
		         TODAY: "Questo commento è stato rifiutato da ${user} oggi alle ${time}.",
		         YEAR: "Questo commento è stato rifiutato da ${user} il ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Questo commento è stato rifiutato da ${user} ieri alle ${time}.",
		         TOMORROW: "Questo commento è stato rifiutato da ${user} il ${MMM} ${d} ${YYYY}."
		      },
		      PREV_COMMENTS: "Mostra commenti precedenti",
		      EMPTY: "Non esistono commenti.",
		      ERROR_ALT: "Errore",
		      ERROR: "Si è verificato un errore durante il richiamo dei commenti. ${again}",
		      ERROR_ADDTL: "Si è verificato un errore durante il richiamo dei commenti aggiuntivi. ${again}",
		      ERROR_AGAIN: "Riprovare.",
		      ERROR_AGAIN_TITLE: "Riprovare la richiesta per altri commenti.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} alle ${time} (versione ${version})",
		         MONTH: "${user} ${MMM} ${d} (versione ${version})",
		         TODAY: "${user} oggi alle ${time} (versione ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (versione ${version})",
		         YESTERDAY: "${user} ieri alle ${time} (versione ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (versione ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} alle ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} oggi alle ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} ieri alle ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} alle ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "Oggi alle ${time}",
		         YEAR: "${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Ieri alle ${time}",
		         TOMORROW: "${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Commento eliminato da ${user} il ${EEEE} alle ${time}",
		         MONTH: "Commento eliminato da ${user} il ${MMM} ${d}",
		         TODAY: "Commento eliminato da ${user} oggi alle ${time}",
		         YEAR: "Commento eliminato da ${user} il ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Commento eliminato da ${user} ieri alle ${time}",
		         TOMORROW: "Commento eliminato da ${user} il ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} modificato ${EEEE} alle ${time} (versione ${version})",
		         MONTH: "${user} modificato ${MMM} ${d} (versione ${version})",
		         TODAY: "${user} modificato oggi alle ${time} (versione ${version})",
		         YEAR: "${user} modificato ${MMM} ${d}, ${YYYY} (versione ${version})",
		         YESTERDAY: "${user} modificato ieri alle ${time} (versione ${version})",
		         TOMORROW: "${user} modificato ${MMM} ${d}, ${YYYY} (versione ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} modificato ${EEEE} alle ${time}",
		         MONTH: "${user} modificato ${MMM} ${d}",
		         TODAY: "${user} modificato oggi alle ${time}",
		         YEAR: "${user} modificato ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} modificato ieri alle ${time}",
		         TOMORROW: "${user} modificato ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Eliminare questo commento?",
		      FLAG_ITEM: {
		         BUSY: "Salvataggio in corso...",
		         CANCEL: "Annulla",
		         ACTION: "Contrassegna come inappropriato",
		         DESCRIPTION_LABEL: "Fornire un motivo per aver contrassegnato questo elemento (facoltativo)",
		         EDITERROR: "I metadati del file non sono stati modificati a causa di un errore",
		         OK: "Salva",
		         ERROR_SAVING: "Si è verificato un errore con l'elaborazione della richiesta. Riprovare in seguito.",
		         SUCCESS_SAVING: "Il flag è stato inoltrato. Verrà analizzato a breve da un moderatore.",
		         TITLE: "Contrassegna questo elemento come inappropriato",
		         COMMENT: {
		            TITLE: "Contrassegna questo commento come inappropriato",
		            A11Y: "Con questo pulsante si apre una finestra di dialogo che consente all'utente di contrassegnare questo commento come non appropriato."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Annulla",
		      DIALOG_TITLE: "Elimina commento",
		      NAME: "Elimina commento",
		      OK: "OK",
		      TOOLTIP: "Elimina commento"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Annulla",
		      CONFIRM: "L'abbreviazione rimuoverà il testo che supera l limite del commento.  Fare clic su 'OK' per abbreviare o su 'Annulla' per modificare il commento autonomamente.",
		      DIALOG_TITLE: "Commento abbreviato",
		      NAME: "Commento abbreviato",
		      OK: "OK",
		      TOOLTIP: "Commento abbreviato"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Conferma inoltro",
		      CONFIRM: "Il commento è stato sottoposto a revisione e sarà disponibile quando approvato.",
		      OK: "OK"
		   },
		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "PM",
		      TODAY: "Oggi",
		      TODAY_U: "Oggi",
		      YESTERDAY: "ieri",
		      YESTERDAY_U: "Ieri",
		      ADDED: { DAY: "Aggiunto il ${EEee} alle ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Aggiunto il ${date_long}",
		         TODAY: "Aggiunto oggi alle ${time}",
		         YEAR: "Aggiunto il ${date_long}",
		         YESTERDAY: "Aggiunto ieri alle ${time}"
		      },
		      LAST_UPDATED: { DAY: "Ultimo aggiornamento ${EEee} alle ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Ultimo aggiornamento alle ${date_long}",
		         TODAY: "Ultimo aggiornamento oggi alle ${time}",
		         YEAR: "Ultimo aggiornamento alle ${date_long}",
		         YESTERDAY: "Ultimo aggiornamento ieri alle ${time}"
		      },
		      MONTHS_ABBR: { 0: "GEN",
		         10: "NOV",
		         11: "DIC",
		         1: "FEB",
		         2: "MAR",
		         3: "APR",
		         4: "MAG",
		         5: "GIU",
		         6: "LUG",
		         7: "AGO",
		         8: "SET",
		         9: "OTT"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Oggi",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ieri",
		         TOMORROW: "Domani"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} alle ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Oggi alle ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ieri alle ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} alle ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Oggi alle ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Ieri alle ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} alle ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} alle ${time}",
		         TODAY: "${date_short} alle ${time}",
		         YEAR: "${date_short} alle ${time}",
		         YESTERDAY: "${date_short} alle ${time}",
		         TOMORROW: "${date_short} alle ${time}"
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
		      UPDATED: { DAY: "Aggiornato ${EEee} alle ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Aggiornato il ${date_long}",
		         TODAY: "Aggiornato oggi alle ${time}",
		         YEAR: "Aggiornato il ${date_long}",
		         YESTERDAY: "Aggiornato ieri alle ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Impossibile caricare le informazioni sulla versione.",
		      ERROR_REQUEST_CANCELLED: "La richiesta è stata annullata.",
		      ERROR_REQUEST_TIMEOUT: "Non è stato possibile contattare il server.",
		      ERROR_REQUEST_UNKNOWN: "Si è verificato un errore sconosciuto.",
		      LOADING: "Caricamento in corso...",
		      NO_VERSIONS: "Non ci sono versioni",
		      INFO: "Versione ${0} creata ${1} da ",
		      VERSION_NUMBER: "Versione ${0}",
		      DELETED: "Eliminata",
		      DELETE_ALL: "Elimina tutte le versioni precedenti alla versione",
		      DELETE_VERSION_SINGLE: "Elimina versione ${0}",
		      DELETEERROR: "La versione non è stata eliminata a causa di un errore.",
		      CREATE_VERSION: "Crea una nuova versione",
		      CREATE_VERSION_TOOLTIP: "Crea una versione di questo file",
		      REVERT_VERSION: "Ripristina versione ${0}",
		      REVERT_DESCRIPTION: "Ripristinato dalla versione ${0}",
		      PREVIOUS: "Precedente",
		      PREVIOUS_TOOLTIP: "Pagina precedente",
		      ELLIPSIS: "...",
		      NEXT: "Successivo",
		      NEXT_TOOLTIP: "Pagina successiva",
		      COUNT: "${0} - ${1} di ${2}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Pagina",
		      SHOW: "Mostra",
		      ITEMS_PER_PAGE: " elementi per pagina.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Oggi alle ${time}",
		            YESTERDAY: "Ieri alle ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} alle ${time}",
		            YEAR: "${date_short} alle ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} alle ${time}",
		            TODAY: "oggi alle ${time}",
		            YESTERDAY: "ieri alle ${time}"
		        },
		        UPDATED: { DAY: "Aggiornato ${EEee} alle ${time}",
		            YEAR: "Aggiornato il ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Aggiornato il ${date_short}",
		            TODAY: "Aggiornato oggi alle ${time}",
		            YESTERDAY: "Aggiornato ieri alle ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Elimina versione ${0}",
		         DOWNLOAD: "Download",
		         DOWNLOAD_TOOLTIP: "Scarica questa versione (${0})",
		         VIEW: "Visualizza",
		         VIEW_TOOLTIP: "Visualizza versione ${0}",
		         REVERT: {
		            A11Y: "Questo pulsante apre una finestra di dialogo che consente all'utente di confermare il ripristino di un file da una versione precedente. Confermando questa azione, il contenuto della pagina verrà aggiornato.",
		            FULL: "Ripristina",
		            WIDGET: "Ripristina questa versione"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Non è stato possibile eliminare la versione perché è stata già eliminata o non è più visibile all'utente.",
		         ERROR_ACCESS_DENIED: "Non è stato possibile eliminare la versione perché l'utente non è un editor.",
		         ERROR_TIMEOUT: "La versione non è stata eliminata perché non è stato possibile contattare il server.  Fare nuovamente clic su 'Elimina' per ritentare la richiesta.",
		         ERROR_CANCEL: "La versione non è stata eliminata perché la richiesta è stata annullata.  Fare nuovamente clic su 'Elimina' per ritentare la richiesta.",
		         ERROR_NOT_LOGGED_IN: "Per eliminare questa versione, è necessario aver eseguito l'accesso.  Fare clic su 'Elimina' affinché sia richiesto il collegamento.",
		         GENERIC_ERROR: "Non è stato possibile eliminare la versione a causa di un errore sconosciuto.  Fare nuovamente clic su 'Elimina' per ritentare la richiesta.",
		         FULL: "Elimina",
		         A11Y: "Questo pulsante apre una finestra di dialogo che consente all'utente di confermare l'eliminazione di questa versione. Confermando questa azione, il contenuto della pagina verrà aggiornato."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Non è stato possibile ripristinare la versione perché è stata eliminata o non è più visibile all'utente.",
		         ERROR_ACCESS_DENIED: "Non è stato possibile ripristinare la versione perché l'utente non è un editor.",
		         ERROR_NAME_EXISTS: "Impossibile ripristinare la versione poiché un altro file ha lo stesso nome.",
		         ERROR_TIMEOUT: "La versione non è stata ripristinata perché non è stato possibile contattare il server.  Fare nuovamente clic su 'Ripristina' e ritentare la richiesta.",
		         ERROR_CANCEL: "La versione non è stata ripristinata perché la richiesta è stata annullata.  Fare nuovamente clic su 'Ripristina' e ritentare la richiesta.",
		         ERROR_QUOTA_VIOLATION: "Impossibile ripristinare la versione a causa delle limitazioni di spazio.",
		         ERROR_MAX_CONTENT_SIZE: "Impossibile ripristinare la versione poiché supera la dimensione di file massima consentita pari a ${0}.",
		         GENERIC_ERROR: "Non è stato possibile ripristinare la versione a causa di un errore sconosciuto.  Fare nuovamente clic su 'Ripristina' e ritentare la richiesta."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Visualizza chi ha scaricato...",
		      PREVIOUS: "Precedente",
		      PREVIOUS_TOOLTIP: "Pagina precedente",
		      ELLIPSIS: "...",
		      NEXT: "Successivo",
		      NEXT_TOOLTIP: "Pagina successiva",
		      COUNT: "${0} - ${1} di ${2}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Pagina",
		      SHOW: "Mostra",
		      ITEMS_PER_PAGE: " elementi per pagina.",
		      VERSION: {
		         DAY: "Versione ${version} il ${date}",
		         MONTH: "Versione ${version} il ${date}",
		         TODAY: "Versione ${version} alle ${time}",
		         YEAR: "Versione ${version} il ${date}",
		         YESTERDAY: "Versione ${version} ieri"
		      },
		      FILE: {
		         V_LATEST: "È stata scaricata l'ultima versione di questo file",
		         V_OLDER: "Ultimamente è stata scaricata la versione ${0} di questo file",
		         LOADING: "Caricamento...",
		         EMPTY: "Soltanto utenti anonimi",
		         ERROR: "Impossibile caricare le informazioni di download"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Errore",
		      ERROR_ALT_TEXT: "Errore:",
		      ERROR_MSG_GENERIC: "Si è verificato un errore.  Riprovare.",
		      ERROR_MSG_NOT_AVAILABLE: "Questo elemento è stato eliminato o non è più disponibile.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Il contenuto per questo elemento non è disponibile.",
		      ERROR_MSG_NO_ACCESS: "Non si dispone più dell'accesso a questo elemento.",
		      LOADING: "Caricamento...",
		      TITLE_SU: "${author} ha pubblicato un messaggio.",
		      TITLE_NI: "${author} ti ha invitato ad entrare a far parte della sua rete.",
		      AUTHOR_TITLE: "Visualizza profilo per ${author}",
		      OPEN_LINK: "Apri ${title}",
		      CONFIRM_CLOSE_TITLE: "Conferma",
		      CONFIRM_CLOSE_MESSAGE: "Si è sicuri di voler abbandonare le modifiche? Fare clic su OK per continuare o su Annulla per tornare indietro.",
		      OK: "OK",
		      CANCEL: "Annulla"
		   },
		   MESSAGE: {
		      SUCCESS: "Conferma",
		      ERROR: "Errore",
		      ERROR_ALT_TEXT: "Errore:",
		      INFO: "Informazioni",
		      WARNING: "Avvertenza",
		      DISMISS: "Nascondi questo messaggio",
		      MORE_DETAILS: "Ulteriori dettagli",
		      HIDE_DETAILS: "Nascondi dettagli"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Creato: ${EEEE} alle ${time}",
		           MONTH: "Creato il: ${MMM} ${d}",
		           TODAY: "Creato: Oggi alle ${time}",
		           YEAR: "Creato: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Creato: Ieri alle ${time}",
		           TOMORROW: "Creato: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Si è verificato un errore.  ${again}.",
		      error_again: "Provare di nuovo.",
		      error_404: "L'aggiornamento dello stato non esiste più.",
		      notifications: {
		         STATUS_UPDATE: "${user} ha pubblicato un messaggio",
		         USER_BOARD_POST: "${user} ha scritto sulla bacheca",
		         POST_COMMENT: "${user} ha scritto:"
		      }
		   },
		   login: {
		      error: "Il nome utente e/o la password non corrispondono ad alcun account esistente. Riprovare.",
		      logIn: "Accesso",
		      password: "Password:",
		      user: "Nome utente:",
		      welcome: "Accedi a HCL Connections"
		   },
		   repost: {
		      name: "Ripubblica",
		      title: "Ripubblica questo aggiornamento per le persone che mi seguono o le mie comunità",
		      msg_success: "L'aggiornamento è stato ripubblicato correttamente per le persone che seguono l'utente.",
		      msg_generic: "Si è verificato un errore.  Riprovare."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Aggiungi",
		      ADD_TXT: "Aggiungi persone o comunità come lettori",
		      SHOW_MORE: "Mostra altro...",
		      READER_IF_PUBLIC: "Tutti (pubblico)",
		      READER_IF_PUBLIC_TOOLTIP: "Questo file è pubblico e visibile a chiunque",
		      EMPTY_READERS: "Nessuna",
		      READERS_LABEL: "Lettori:\u00a0",
		      EDITORS_LABEL: "Editor:\u00a0",
		      OWNER_LABEL: "Proprietario :\u00a0",
		      ERROR: "Impossibile caricare le informazioni sulla condivisione",
		      ERROR_NOT_FOUND: "Il file richiesto è stato eliminato o spostato. Se questo collegamento è stato inviato da qualcuno, controllare che sia corretto.",
		      ERROR_ACCESS_DENIED: "Non si dispone dell'autorizzazione per visualizzare questo file.  Il file non è pubblico e non è condiviso con questo utente.",
		      SHARE: "Condividi",
		      CANCEL: "Annulla",
		      SHARE_WITH: "Condividi con:",
		      PERSON: "una Persona",
		      COMMUNITY: "una comunità",
		      PLACEHOLDER: "Nome persona o email...",
		      MESSAGE: "Messaggio",
		      MESSAGE_TXT: "Aggiungi un messaggio facoltativo",
		      REMOVE_ITEM_ALT: "Rimuovi ${0}",
		      NO_MEMBERS: "Nessuna",
		      A11Y_READER_ADDED: "${0} selezionato come lettore",
		      A11Y_READER_REMOVED: "Rimosso ${0} come lettore",
		      SELF_REFERENCE_ERROR: "Non è possibile condividere con sé stessi.",
		      OWNER_REFERENCE_ERROR: "Impossibile condividere con il proprietario del file.",
		      SHARE_COMMUNITY_WARN: "La condivisione con la comunità pubblica '${0}' creerà questo file pubblico.",
		      SELECT_USER_ERROR: "È necessario selezionare almeno una persona o comunità con cui effettuare la condivisione",
		      WARN_LONG_MESSAGE: "Il messaggio è troppo lungo.",
		      TRIM_LONG_MESSAGE: "Abbreviare il messaggio?",
		      ERROR_SHARING: "Impossibile condividere il file.  Riprovare più tardi.",
		      INFO_SUCCESS: "Il file è stato condiviso correttamente.",
		      MAX_SHARES_ERROR: "Il numero massimo di condivisioni è stato superato.",
		      NOT_LOGGED_IN_ERROR: "Il file non è stato condiviso poiché non si era collegati.  fare clic su 'Condividi' per condividere il file.",
		      TIMEOUT_ERROR: "Il file non è stato condiviso poiché non è stato possibile contattare il server.  Fare clic su 'Condividi' per tentare di nuovo.",
		      CANCEL_ERROR: "Il file non è stato condiviso poiché la richiesta è stata annullata.  Fare clic su 'Condividi' per tentare di nuovo.",
		      NOT_FOUND_ERROR: "Il file è stato eliminato o non è più visibile e non può essere condiviso.",
		      ACCESS_DENIED_ERROR: "Non si dispone più dell'autorizzazione per condividere questo file.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Un file limitato non può essere reso pubblico.",
		      TOOLTIP: "Consenti ad altri l'accesso a questo file"
		   },
		   HISTORY: {
		      TAB_TITLE: "Aggiornamenti recenti",
		      NO_HISTORY: "Non esistono aggiornamenti recenti.",
		      EMPTY: "Impossibile richiamare gli aggiornamenti recenti per questo elemento. È stato eliminato o non si dispone più dell'accesso.",
		      MORE: "Mostra aggiornamenti precedenti",
		      ERROR_ALT: "Errore",
		      ERROR: "Si è verificato un errore durante il richiamo degli aggiornamenti. ${again}",
		      ERROR_ADDTL: "Si è verificato un errore durante il richiamo degli aggiornamenti aggiuntivi. ${again}",
		      ERROR_AGAIN: "Riprovare.",
		      ERROR_AGAIN_TITLE: "Riprovare la richiesta per altri aggiornamenti.",
		      PROFILE_TITLE: "Aprire il profilo di ${user}.",
		      SORT_BY: "Ordina per\\:",
		      SORTS: {
		         DATE: "Data",
		         DATE_TOOLTIP: "Ordina dalla cronologia più recente agli aggiornamenti meno recenti",
		         DATE_TOOLTIP_REVERSE: "Ordina dalla cronologia meno recente agli aggiornamenti più recenti"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} alle ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "Oggi alle ${time}",
		             YEAR: "${MMM} ${d}, ${YYYY}",
		             YESTERDAY: "Ieri alle ${time}",
		             TOMORROW: "${MMM} ${d}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Questo commento",
			   REPLY_ACTION: "Rispondi",
		       REPLY_ACTION_TOOLTIP: "Rispondi a questo commento"
		   },
		   OAUTH: {
		      welcomeHeader: "Benvenuto in Connections",
		      continueBtnLabel: "Continua",
		      continueBtnA11y: "Attivando questo collegamento verrà aperta una nuova finestra che consentirà di autorizzare l'accesso a Connections.",
		      clickHere: "Fare clic qui",
		      infoMsg: "Connections necessita di autorizzazione per accedere ai dati.",
		      authorizeGadget: "${clickHere} per autorizzare questa applicazione ad accedere alle informazioni di Connections.",
		      confirmAuthorization: "${clickHere} per confermare che è stata autorizzata questa applicazione ad accedere alle informazioni di Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Attivando questo collegamento verrà aperta una nuova finestra che consentirà di autorizzare l'accesso al repository di librerie di Connections.",
		      infoMsg: "Il repository di librerie di Connections richiede l'autorizzazione dell'utente per accedere ai dati.",
		      authorizeGadget: "${clickHere} per autorizzare questa applicazione ad accedere alle informazioni del repository di librerie di Connections.",
		      confirmAuthorization: "${clickHere} per confermare di aver autorizzato questa applicazione ad accedere alle informazioni del repository di librerie di Connections."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Annulla",
		      CONFIRM: "Si è sicuri di voler abbandonare le modifiche?  Premere OK per continuare o su Annulla per chiudere.",
		      DIALOG_TITLE: "Conferma",
		      NAME: "Conferma",
		      OK: "OK",
		      TOOLTIP: "Conferma"
		   }
});

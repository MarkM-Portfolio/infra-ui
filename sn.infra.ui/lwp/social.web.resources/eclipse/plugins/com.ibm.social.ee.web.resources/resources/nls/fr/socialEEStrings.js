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
         label: "Plus",
         tooltip: "Autres actions"
       },
       tags_more: "et ${0} de plus",
       ERROR_ALT: "Erreur",
       PERSON_TITLE: "Ouvrez le profil de ${user}.",
       inactiveUser: "${user} (inactif)",
       inactiveIndicator: "(inactif)",
       like_error: "Votre recommandation n'a pas pu être enregistrée. Veuillez réessayer ultérieurement.",
       vote_error: "Votre vote n'a pas pu être enregistré. Veuillez réessayer ultérieurement."
   },
   generic: {
      untitled: "(sans titre)",
      tags: "Etiquettes :",
      tags_more: "et ${0} de plus",
      likes: "Recommandations",
      comments: "Commentaires",
      titleTooltip: "Accéder à ${app}",
      error: "Impossible d'extraire des données.",
      timestamp: {
         created: {
            DAY: "Créé : ${EEEE} à ${time}",
            MONTH: "Créé : ${d} ${MMM}",
            TODAY: "Créé aujourd'hui à ${time}",
            YEAR: "Créé : ${d} ${MMM} ${YYYY}",
            YESTERDAY: "Créé hier à ${time}",
            TOMORROW: "Créé : ${d} ${MMM} ${YYYY}"
         },
         updated: {
            DAY: "Mis à jour : ${EEEE} à ${time}",
            MONTH: "Mis à jour : ${d} ${MMM}",
            TODAY: "Mis à jour aujourd'hui à ${time}",
            YEAR: "Mis à jour : ${d} ${MMM} ${YYYY}",
            YESTERDAY: "Mis à jour hier à ${time}",
            TOMORROW: "Mis à jour : ${d} ${MMM} ${YYYY}"
         }
      },
      visibility: {
         pub: "Public",
         priv: "Privé"
      },
      action: {
         created: "Créé",
         updated: "Mis à jour"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Recevez, sur la page d'accueil et dans un courrier électronique, des mises à jour sur les personnes que vous suivez.",
      profile_title: "Ouvrez le profil de ${user}.",
      profile_a11y: "L'activation de ce lien ouvre le profil de ${user} dans une nouvelle fenêtre.",
      error: "Une erreur s'est produite.  ${again}.",
      error_again: "Retentez l'opération.",
      error_404: "La demande de réseau n'existe plus.",
      warning: "Avertissement",
      messages: {
         success: {
            accept: {
            	nofollow: "Vous êtes maintenant membres du réseau.",
            	follow: "Vous êtes maintenant membres du réseau et suivez ${user}."
            },
            ignore: {
            	nofollow: "Vous avez ignoré l'invitation.",
            	follow: "Vous avez ignoré l'invitation mais suivez maintenant ${user}."
            }
         },
         error: {
            accept: "Une erreur s'est produite lors de l'acceptation de la demande.",
            ignore: "Une erreur s'est produite lorsque la demande a été ignorée."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} à ${time}",
              MONTH: "${MMM} ${d}",
              TODAY: "Aujourd'hui à ${time}",
              YEAR: "${MMM} ${d}, ${YYYY}",
              YESTERDAY: "Hier à ${time}",
              TOMORROW: "${MMM} ${d}, ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "L'activation de ce lien ouvre ${name} dans une nouvelle fenêtre.",
      tooltip: "Ouvrez ${name} dans l'application Fichiers",
      profile_title: "Ouvrez le profil de ${user}.",
      profile_a11y: "L'activation de ce lien ouvre le profil de ${user} dans une nouvelle fenêtre.",
      download_tooltip: "Télécharger ce fichier (${0})",
      following: {
         add: "Suivre le fichier",
         remove: "Arrêter de suivre",
         title: "Permet d'indiquer si vous voulez recevoir ou non les mises à jour de ce fichier"
      },
      share: {
         label: "Partager",
         title: "Donner accès à ce fichier à d'autres personnes"
      },
      timestamp: {
         created: {
            DAY: "Créé : ${EEEE} à ${time}",
            MONTH: "Créé : ${d} ${MMM}",
            TODAY: "Créé aujourd'hui à ${time}",
            YEAR: "Créé : ${d} ${MMM} ${YYYY}",
            YESTERDAY: "Créé hier à ${time}",
            TOMORROW: "Créé : ${d} ${MMM} ${YYYY}"
         },
         createdOther: {
            DAY: "${user} créé ${EEEE} à ${time}",
            MONTH: "${user} créé le ${d} ${MMM}",
            TODAY: "${user} créé aujourd'hui à ${time}",
            YEAR: "${user} créé le ${d} ${MMM} ${YYYY}",
            YESTERDAY: "${user} créé hier à ${time}",
            TOMORROW: "${user} créé le ${d} ${MMM} ${YYYY}"
         },
         updated: {
            DAY: "Mis à jour : ${EEEE} à ${time}",
            MONTH: "Mis à jour : ${d} ${MMM}",
            TODAY: "Mis à jour aujourd'hui à ${time}",
            YEAR: "Mis à jour : ${d} ${MMM} ${YYYY}",
            YESTERDAY: "Mis à jour hier à ${time}",
            TOMORROW: "Mis à jour : ${d} ${MMM} ${YYYY}"
         },
         updatedOther: {
            DAY: "${user} mis à jour ${EEEE} à ${time}",
            MONTH: "${user} mis à jour le ${d} ${MMM}",
            TODAY: "${user} mis à jour aujourd'hui à ${time}",
            YEAR: "${user} mis à jour le ${d} ${MMM} ${YYYY}",
            YESTERDAY: "${user} mis à jour hier à ${time}",
            TOMORROW: "${user} mis à jour le ${d} ${MMM} ${YYYY}"
         },
         createdCompact: {
            DAY: "Créé : ${EEEE} à ${time}",
            MONTH: "Créé : ${d} ${MMM}",
            TODAY: "Créé : aujourd'hui à ${time}",
            YEAR: "Créé : ${d} ${MMM} ${YYYY}",
            YESTERDAY: "Créé : hier à ${time}",
            TOMORROW: "Créé : ${d} ${MMM} ${YYYY}"
         },
         updatedCompact: {
            DAY: "Mis à jour : ${EEEE} à ${time}",
            MONTH: "Mis à jour : ${d} ${MMM}",
            TODAY: "Mis à jour aujourd'hui à ${time}",
            YEAR: "Mis à jour : ${d} ${MMM} ${YYYY}",
            YESTERDAY: "Mis à jour hier à ${time}",
            TOMORROW: "Mis à jour : ${d} ${MMM} ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long} par ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long} par ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "Télécharger ce fichier (${size})",
      	 DOWNLOAD_ALT: "Télécharger"
      },

      PREVIEW: {
         LINK: "Aperçu",
         TITLE: "Prévisualiser ce fichier dans une nouvelle fenêtre."
      },
      TAGS: "Etiquettes :",
      error: "Une erreur s'est produite.  ${again}.",
      error_again: "Retentez l'opération.",
      error_404: "Le fichier n'existe plus ou vous ne disposez pas de droits suffisants pour y accéder.",
      error_403: "Vous n'êtes pas autorisé à afficher ce fichier. Le fichier n'est pas public et n'est pas partagé avec vous.",
      notifications: {
         USER_SHARED: "${user} a écrit :",
         CHANGE_SUMMARY: "${user} a fourni le récapitulatif des modifications",
         NO_CHANGE_SUMMARY: "${user} n'a pas fourni de récapitulatif des modifications",
         COMMENTED: "${user} a ajouté un commentaire"
      }
   },
   ecm_file: {
      checkedout_you: "Réservé par vous",
      checkedout_other: "Réservé par ${user}",
      tooltip: "Ouvrir le fichier ${name} dans la bibliothèque",
      draft_404_info: "Le brouillon a été supprimé ou n'est plus partagé avec vous. La version publiée est désormais la dernière version de ce fichier.",
      error_404: "Le fichier a été supprimé ou n'est plus partagé avec vous.",
      error_403: "Le fichier a été supprimé ou n'est plus partagé avec vous.",
      error_preview: "Le fichier n'est plus disponible pour le prévisualiser.",
      draft_review_canceled: "La révision a été annulée et le brouillon n'est plus partagé avec vous. Votre révision n'est plus demandée.",
      switch_ee: "Afficher le brouillon",
      switch_ee_tooltip: "Afficher le dernier brouillon de ce fichier"
   },
   ecm_draft: {
      tooltip: "Ouvrir le brouillon ${name} dans la bibliothèque",
      community_owners: "Propriétaires de communauté",
      draft: "Brouillon",
      draft_tooltip: "Affichage du brouillon",
      draft_general_info: "Le brouillon précédent n'existe plus et un nouveau brouillon constitue maintenant la version la plus récente.",
      draft_review_404_general_info: "L'un des réviseurs a déjà voté. Vous n'êtes plus sollicité pour la révision de ce brouillon.",
      draft_review_404_request_info: "Le brouillon précédent n'existe plus et le dernier brouillon a été soumis pour révision. Votre révision est demandée.",
      draft_review_404_require_info: "Le brouillon précédent n'existe plus et le dernier brouillon a été soumis pour révision. Votre révision est requise.",
      draft_review_request_info: "Votre révision est demandée.",
      draft_review_require_info: "Votre révision est requise.",
      error_404: "Le brouillon a été supprimé ou n'est plus partagé avec vous.",
      error_403: "Vous ne pouvez pas afficher ce brouillon car il n'est pas partagé avec vous.",
      error_preview: "Le brouillon n'est plus disponible pour le prévisualiser.",
      switch_ee: "Afficher la version publiée",
      switch_ee_tooltip: "Afficher la version publiée de ce fichier",
      review: "Révision",
      reviewers: "Réviseurs",
      reviwers_addtl: "Réviseurs supplémentaires",
      in_review: "Brouillon en révision",
      in_review_tooltip: "Afficher le brouillon en révision",
      review_required_any: "Les propriétaires de communauté demandent qu'un réviseur révise ce brouillon.",
      review_required_all: "Les propriétaires de communauté demandent que tous les réviseurs révisent ce brouillon.",
      review_required_generic: "Les propriétaires de communauté demandent que ces réviseurs révisent ce brouillon.",
      review_additional_required: "Tous les réviseurs ajoutés par la personne ayant soumis le brouillon sont requis pour réviser ce brouillon.",
      reivew_submitted_date: {
         DAY: "${user} a soumis le brouillon pour révision ${EEEE} à ${time}.",
         MONTH: "${user} a soumis le brouillon pour révision le ${d} ${MMM}.",
         TODAY: "${user} a soumis le brouillon pour révision aujourd'hui à ${time}.",
         YEAR: "${user} a soumis le brouillon pour révision le ${d} ${MMM} ${YYYY}.",
         YESTERDAY: "${user} a soumis le brouillon pour révision hier à ${time}.",
         TOMORROW: "${user} a soumis le brouillon pour révision le ${d} ${MMM} ${YYYY}."
      },
      pending: "En attente",
      pending_rejected: "La révision n'est plus nécessaire car le brouillon a été rejeté",
      approve: "Approuver",
      approved: "Approuvé",
      approve_tooltip: "Approuver ce brouillon",
      accept_success: "Vous avez approuvé ce brouillon.",
      accept_error: "Une erreur s'est produite lors de l'approbation de ce brouillon. Recommencez.",
      accept_info: "Vous avez approuvé ce brouillon.",
      reject: "Rejeter",
      rejected: "Rejeté",
      reject_tooltip: "Rejeter ce brouillon",
      reject_success: "Vous avez rejeté ce brouillon.",
      reject_error: "Une erreur s'est produite lors du rejet de ce brouillon. Recommencez.",
      reject_info: "Vous avez rejeté ce brouillon."
   },
   authUser: {
      error: "Une erreur s'est produite lors de l'extraction de l'utilisateur actuel.  ${again}.",
      error_again: "Retentez l'opération.",
      error_404: "Utilisateur authentifié introuvable.",
      error_403: "Vous n'êtes pas autorisé à extraire les informations utilisateur."
   },
   forum: {
      error: "Une erreur s'est produite.  ${again}.",
      error_again: "Retentez l'opération.",
      error_404: "Le forum n'existe plus ou vous ne disposez pas de droits suffisants pour y accéder.",
      error_403: "Vous n'êtes pas autorisé à afficher ce forum. Le forum n'est pas public et n'est pas partagé avec vous.",

      readMore: "Afficher le sujet complet...",
      readMore_tooltip: "Ouvre le sujet de forum ${name}.",
      readMore_a11y: "L'activation de ce lien ouvre le sujet de forum ${name} dans une nouvelle fenêtre.",
      QUESTION_ANSWERED: "Cette question a été répondue.",
      QUESTION_NOT_ANSWERED: "Cette question n'a pas encore été répondue.",

      attachments: "${count} pièces jointes",
      attachments_one: "${count} pièce jointe"
   },
   blog: {
      error: "Une erreur s'est produite.  ${again}.",
      error_again: "Retentez l'opération.",
      error_404: "Le blogue n'existe plus ou vous ne disposez pas de droits suffisants pour y accéder.",
      error_403: "Vous n'êtes pas autorisé à afficher ce blogue. Le blogue n'est pas public et n'est pas partagé avec vous.",
      readMore: " Lire plus ...",
      readMore_tooltip: "Ouvrez l'entrée de blogue ${name}.",
      readMore_a11y: "L'activation de ce lien ouvre l'entrée de blogue ${name} dans une nouvelle fenêtre.",
      graduated: "Promue(s)",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Voter</a>",
  					TOOLTIP: 	"Voter pour ceci"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Voté</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Voté</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Annuler</a>",
  					TOOLTIP: 	"Retirer votre vote de ceci"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 personnes ont voté pour ceci"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 personne a voté pour ceci"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} ont voté pour ceci"
  				}
  			},
  			LOADING: "Chargement...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Vote"
  			}
  		}
   },
   idea: {
	  error_404: "Nous n'avons pas pu enregistrer votre vote car vous avez atteint votre limite de vote ou l'idée n'est plus disponible pour vous.",
      readMore_tooltip: "Ouvre l'idée ${name}.",
      readMore_a11y: "L'activation de ce lien ouvre l'idée ${name} dans une nouvelle fenêtre."
   },
   size: {
      B: "${0} o",
      KB: "${0} ko",
      MB: "${0} Mo",
      GB: "${0} Go"
   },
   REPLIES: {
      ARIA_LABEL: "Réponses",
      THIS_ARIA_LABEL: "Cette réponse",
      THIS_TAB_TITLE: "Cette réponse",
      TAB_TITLE: "Réponses (${0})",
      REPLY_TO_REPLY: "En réponse à ${thisReply}",
      REPLY_TO_TOPIC: "En réponse à ${thisTopic}",
      THIS_TOPIC: "ce sujet",
      THIS_REPLY: "cette réponse",
      NAVIGATE_TO_REPLY: "Accédez à la réponse parent",
      NAVIGATE_TO_TOPIC: "Accédez au sujet parent",
      ADD_COMMENT: "Répondre à ce sujet",
      ADD_COMMENT_TOOLTIP: "Répondre à ce sujet de forum",
      SHOWING_RECENT_REPLIES: "Affichage des ${0} réponses les plus récentes",
      PREV_COMMENTS: "Afficher plus de réponses",
      PLACEHOLDER_TXT: "Répondre à ce sujet",
      EMPTY: "Il n'y a aucune réponse.",
      TRIM_LONG_COMMENT: "Raccourcir la réponse ?",
      WARN_LONG_COMMENT: "La réponse est trop longue.  ${shorten}",
      ERROR: "Une erreur s'est produite lors de l'extraction des réponses. ${again}",
      ERROR_CREATE: "Votre réponse n'a pas pu être enregistrée.  Réessayez ultérieurement.",
      ERROR_CREATE_NOT_FOUND: "Impossible de enregistrer votre réponse car le sujet a été supprimé ou n'est plus visible par vous.",
      ERROR_CREATE_ACCESS_DENIED: "Impossible de enregistrer votre réponse car le sujet a été supprimé ou n'est plus visible par vous.",
      ERROR_CREATE_TIMEOUT: "Impossible d'enregistrer votre réponse car le serveur n'a pas pu être contacté.  Cliquez sur 'Enregistrer' pour réessayer.",
      ERROR_CREATE_CANCEL: "Votre réponse n'a pas été enregistrée, car la demande a été annulée.  Cliquez sur 'Enregistrer' pour réessayer.",
      ERROR_CREATE_NOT_LOGGED_IN: "Vous devez être connecté pour créer cette réponse.  Cliquez sur 'Enregistrer' pour être invité à vous connecter.",
      ERROR_NO_CONTENT: "Entrez votre réponse et cliquez sur 'Enregistrer.'  Si vous ne voulez pas laisser de réponse, cliquez sur 'Annuler'.",
      ERROR_UNAUTHORIZED: "Votre réponse n'a pas pu être enregistré car vous n'êtes pas autorisé à laisser une réponse.",
      COMMENT_DELETED: {
         DAY: "Réponse supprimée par ${user} ${EEEE} à ${time}",
         MONTH: "Réponse supprimée par ${user} le ${d} ${MMM}",
         TODAY: "Réponse supprimée par ${user} aujourd'hui à ${time}",
         YEAR: "Réponse supprimée par ${user} le ${d} ${MMM} ${YYYY}",
         YESTERDAY: "Réponse supprimée par ${user} hier à ${time}",
         TOMORROW: "Réponse supprimée par ${user} le ${d} ${MMM} ${YYYY}"
      },
      REASON_FOR_DELETION: "Raison de la suppression : ${reason}",
      REPLY_TITLE: "Re : ${0}",
      SHOW_FULL_REPLY: "Afficher la réponse complète",
      SHOW_FULL_REPLY_TOOLTIP: "Accédez à la réponse d'origine dans le sujet de forum",
      REPLY_ACTION: "Répondre",
      REPLY_ACTION_TOOLTIP: "Répondre à ce message",
      MODERATION_PENDING: "Cette réponse est en attente de révision.",
      MODERATION_QUARANTINED: "L'article a été mis en quarantaine par le modérateur.",
      MODERATION_REMOVED: {
         DAY: "Cette réponse a été retirée par ${user} ${EEEE} à ${time}.",
         MONTH: "Cette réponse a été retirée par ${user} le ${d} ${MMM}.",
         TODAY: "Cette réponse a été retirée par ${user} aujourd'hui à ${time}.",
         YEAR: "Cette réponse a été retirée par ${user} le ${d} ${MMM} ${YYYY}.",
         YESTERDAY: "Cette réponse a été retirée par ${user} hier à ${time}.",
         TOMORROW: "Cette réponse a été retirée par ${user} le ${d} ${MMM} ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "Cette réponse a été rejetée par ${user} ${EEEE} à ${time}.",
         MONTH: "Cette réponse a été rejetée par ${user} le ${d} ${MMM}.",
         TODAY: "Cette réponse a été rejetée par ${user} aujourd'hui à ${time}.",
         YEAR: "Cette réponse a été rejetée par ${user} le ${d} ${MMM} ${YYYY}.",
         YESTERDAY: "Cette réponse a été rejetée par ${user} hier à ${time}.",
         TOMORROW: "Cette réponse a été rejetée par ${user} le ${d} ${MMM} ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Votre réponse a été soumise pour révision et sera disponible une fois approuvée."
   },
   COMMENTS: {
      ARIA_LABEL: "Commentaires",
      PLACEHOLDER_TXT: "Ajouter un commentaire",
      TAB_TITLE: "Commentaires (${0})",
      ACTION_NOT_SUPPORTED: "Action non prise en charge",
      ADD_COMMENT: "Ajouter un commentaire",
      ADD_COMMENT_TOOLTIP: "Ajouter un commentaire à cet élément",
      CANCEL: "Annuler",
      COMMENT_COUNT_ONE: "${0} commentaire",
      COMMENT_COUNT_MANY: "${0} commentaires",
      COMMENT_LABEL: "Commentaire :",
      DELETE: "Supprimer",
      DELETE_TOOLTIP: "Supprimer le commentaire",
      DELETEREASON: "Motif de la suppression de ce commentaire :",
      DIALOG_TITLE: "Raccourcir le commentaire",
      TOOLTIP: "Raccourcir le commentaire",
      NAME: "Raccourcir le commentaire",
      EDIT: "Editer",
      EDIT_TOOLTIP: "Editer le commentaire",
      ERROR_CREATE: "Impossible d'enregistrer votre commentaire.  Réessayez ultérieurement.",
      ERROR_CREATE_NOT_FOUND: "Impossible d'enregistrer votre commentaire car l'élément a été supprimé ou n'est plus visible par vous.",
      ERROR_CREATE_ACCESS_DENIED: "Impossible d'enregistrer votre commentaire car l'élément a été supprimé ou n'est plus visible par vous.",
      ERROR_CREATE_TIMEOUT: "Impossible d'enregistrer votre commentaire car le serveur n'a pas pu être contacté.  Cliquez sur 'Poster' pour recommencer.",
      ERROR_CREATE_CANCEL: "Votre commentaire n'a pas été enregistré, car la demande a été annulée.  Cliquez sur 'Poster' pour recommencer.",
      ERROR_CREATE_NOT_LOGGED_IN: "Vous devez être connecté pour créer ce commentaire.  Cliquez sur 'Poster' pour être invité à vous connecter.",
      ERROR_DELETE: "Impossible de supprimer votre commentaire.  Réessayez ultérieurement.",
      ERROR_DELETE_TIMEOUT: "Impossible de supprimer votre commentaire car le serveur n'a pas pu être contacté.  Cliquez sur 'Supprimer' pour réessayer.",
      ERROR_DELETE_NOT_FOUND: "Impossible de supprimer votre commentaire car le commentaire ou l'élément a été supprimé ou n'est plus visible par vous.",
      ERROR_DELETE_ACCESS_DENIED: "Impossible de supprimer votre commentaire car l'élément a été supprimé ou n'est plus visible par vous.",
      ERROR_DELETE_CANCEL: "Votre commentaire n'a pas été supprimé, car la demande a été annulée.  Cliquez sur 'Supprimer' pour réessayer.",
      ERROR_DELETE_NOT_LOGGED_IN: "Vous devez être connecté pour supprimer ce commentaire.  Cliquez sur 'Supprimer' pour être invité à vous connecter.",
      ERROR_EDIT: "Impossible de mettre à jour votre commentaire.  Réessayez ultérieurement.",
      ERROR_EDIT_ACCESS_DENIED: "Impossible de mettre à jour votre commentaire car l'élément a été supprimé ou n'est plus visible par vous.",
      ERROR_EDIT_NOT_FOUND: "Impossible de mettre à jour votre commentaire car l'élément a été supprimé ou n'est plus visible par vous.",
      ERROR_EDIT_TIMEOUT: "Impossible de mettre à jour votre commentaire car le serveur n'a pas pu être contacté.  Cliquez sur 'Poster' pour recommencer.",
      ERROR_EDIT_CANCEL: "Votre commentaire n'a pas été mis à jour, car la demande a été annulée.  Cliquez sur 'Poster' pour recommencer.",
      ERROR_EDIT_NOT_LOGGED_IN: "Vous devez être connecté pour éditer ce commentaire.  Cliquez sur 'Poster' pour être invité à vous connecter.",
      ERROR_NO_CONTENT: "Entrez votre commentaire et cliquez sur 'Poster'.  Si vous ne voulez pas laisser de commentaire, cliquez sur 'Annuler'.",
      ERROR_NO_CONTENT_EDIT: "Entrez votre commentaire et cliquez sur 'Poster'.  Si vous ne voulez plus éditer votre commentaire, cliquez sur 'Annuler'.",
      ERROR_UNAUTHORIZED: "Votre commentaire n'a pas été enregistré car vous n'êtes pas autorisé à laisser un commentaire.",
      ERROR_GENERAL: "Une erreur s'est produite.",
      OK: "OK",
      YES: "Oui",
      TRIM_LONG_COMMENT: "Raccourcir le commentaire ?",
      WARN_LONG_COMMENT: "Le commentaire est trop long.  ${shorten}",
      LINK: "Lien",
      SAVE: "Enregistrer",
      POST: "Poster",
      SHOWMORE: "Lire plus...",
      VIEW_COMMENTS_FILE: "Afficher les commentaires sur ce fichier",
      SUBSCRIBE_TO_COMMENTS: "S'abonner à ces commentaires",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Suivez les modifications de ces commentaires via votre programme de lecture de flux.",
      PROFILE_TITLE: "Ouvrez le profil de ${user}.",
      PROFILE_A11Y: "L'activation de ce lien ouvre le profil de ${user} dans une nouvelle fenêtre.",
      MODERATION_PENDING: "Ce commentaire est en attente de révision.",
      MODERATION_REMOVED: {
         DAY: "Ce commentaire a été retiré par ${user} ${EEEE} à ${time}.",
         MONTH: "Ce commentaire a été retiré par ${user} le ${d} ${MMM}.",
         TODAY: "Ce commentaire a été retiré par ${user} aujourd'hui à ${time}.",
         YEAR: "Ce commentaire a été retiré par ${user} le ${d} ${MMM} ${YYYY}.",
         YESTERDAY: "Ce commentaire a été retiré par ${user} hier à ${time}.",
         TOMORROW: "Ce commentaire a été retiré par ${user} le ${d} ${MMM} ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "Ce commentaire a été rejeté par ${user} ${EEEE} à ${time}.",
         MONTH: "Ce commentaire a été rejeté par ${user} le ${d} ${MMM}.",
         TODAY: "Ce commentaire a été rejeté par ${user} aujourd'hui à ${time}.",
         YEAR: "Ce commentaire a été rejeté par ${user} le ${d} ${MMM} ${YYYY}.",
         YESTERDAY: "Ce commentaire a été rejeté par ${user} hier à ${time}.",
         TOMORROW: "Ce commentaire a été rejeté par ${user} le ${d} ${MMM} ${YYYY}."
      },
      PREV_COMMENTS: "Afficher les commentaires précédents",
      EMPTY: "Il n'y a aucun commentaire.",
      ERROR_ALT: "Erreur",
      ERROR: "Une erreur s'est produite lors de l'extraction des commentaires. ${again}",
      ERROR_ADDTL: "Une erreur s'est produite lors de l'extraction des commentaires. ${again}",
      ERROR_AGAIN: "Recommencez.",
      ERROR_AGAIN_TITLE: "Essayez à nouveau la demande pour plus de commentaires.",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE} à ${time} (version ${version})",
         MONTH: "${user} le ${d} ${MMM} (version ${version})",
         TODAY: "${user} aujourd'hui à ${time} (version ${version})",
         YEAR: "${user} le ${d} ${MMM} ${YYYY} (version ${version})",
         YESTERDAY: "${user} hier à ${time} (version ${version})",
         TOMORROW: "${user} le ${d} ${MMM} ${YYYY} (version ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} à ${time}",
         MONTH: "${user} le ${d} ${MMM}",
         TODAY: "${user} aujourd'hui à ${time}",
         YEAR: "${user} le ${d} ${MMM} ${YYYY}",
         YESTERDAY: "${user} hier à ${time}",
         TOMORROW: "${user} le ${d} ${MMM} ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} à ${time}",
         MONTH: "${d} ${MMM}",
         TODAY: "Aujourd'hui à ${time}",
         YEAR: "${d} ${MMM} ${YYYY}",
         YESTERDAY: "Hier à ${time}",
         TOMORROW: "${d} ${MMM} ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "Commentaire supprimé par ${user} ${EEEE} à ${time}",
         MONTH: "Commentaire supprimé par ${user} le ${d} ${MMM}",
         TODAY: "Commentaire supprimé par ${user} aujourd'hui à ${time}",
         YEAR: "Commentaire supprimé par ${user} le ${d} ${MMM} ${YYYY}",
         YESTERDAY: "Commentaire supprimé par ${user} hier à ${time}",
         TOMORROW: "Commentaire supprimé par ${user} le ${d} ${MMM} ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} édité ${EEEE} à ${time} (version ${version})",
         MONTH: "${user} édité le ${d} ${MMM} (version ${version})",
         TODAY: "${user} édité aujourd'hui à ${time} (version ${version})",
         YEAR: "${user} édité le ${d} ${MMM} ${YYYY} (version ${version})",
         YESTERDAY: "${user} édité hier à ${time} (version ${version})",
         TOMORROW: "${user} édité le ${d} ${MMM} ${YYYY} (version ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} édité ${EEEE} à ${time}",
         MONTH: "${user} édité le ${d} ${MMM}",
         TODAY: "${user} édité aujourd'hui à ${time}",
         YEAR: "${user} édité le ${d} ${MMM} ${YYYY}",
         YESTERDAY: "${user} édité hier à ${time}",
         TOMORROW: "${user} édité le ${d} ${MMM} ${YYYY}"
      },

      DELETE_CONFIRM: "Etes-vous sûr de vouloir supprimer ce commentaire ?",
      FLAG_ITEM: {
         BUSY: "Enregistrement...",
         CANCEL: "Annuler",
         ACTION: "Marquer comme inapproprié",
         DESCRIPTION_LABEL: "Indiquez la raison pour laquelle vous avez marqué cet élément (facultatif)",
         EDITERROR: "Les métadonnées du fichier n'ont pas été éditées en raison d'une erreur",
         OK: "Enregistrer",
         ERROR_SAVING: "Une erreur s'est produite lors du traitement de la requête. Réessayez ultérieurement.",
         SUCCESS_SAVING: "Votre marquage a été soumis. Il sera traitée prochainement par un modérateur.",
         TITLE: "Marquer cet élément comme inapproprié",
         COMMENT: {
            TITLE: "Marquer ce commentaire comme étant inapproprié",
            A11Y: "Ce bouton ouvre une boîte de dialogue permettant à l'utilisateur de signaler ce commentaire comme étant inapproprié."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Annuler",
      DIALOG_TITLE: "Supprimer le commentaire",
      NAME: "Supprimer le commentaire",
      OK: "OK",
      TOOLTIP: "Supprimer le commentaire"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Annuler",
      CONFIRM: "Raccourcir le commentaire supprime le texte au-delà de la limite.  Cliquez sur OK pour raccourcir ou sur Annuler pour éditer le commentaire vous-même.",
      DIALOG_TITLE: "Raccourcir le commentaire",
      NAME: "Raccourcir le commentaire",
      OK: "OK",
      TOOLTIP: "Raccourcir le commentaire"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Confirmation de soumission",
      CONFIRM: "Votre commentaire a été soumis pour révision et sera disponible une fois approuvé.",
      OK: "OK"
   },

   DATE: {
      AM: "AM",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "PM",
      TODAY: "aujourd'hui",
      TODAY_U: "Aujourd'hui",
      YESTERDAY: "hier",
      YESTERDAY_U: "Hier",

      ADDED: { DAY: "Ajouté ${EEee} à ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Ajouté le ${date_long}",
         TODAY: "Ajouté aujourd'hui à ${time}",
         YEAR: "Ajouté le ${date_long}",
         YESTERDAY: "Ajouté hier à ${time}"
      },

      LAST_UPDATED: { DAY: "Dernière mise à jour : ${EEee} à ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Dernière mise à jour : ${date_long}",
         TODAY: "Dernière mise à jour aujourd'hui à ${time}",
         YEAR: "Dernière mise à jour : ${date_long}",
         YESTERDAY: "Dernière mise à jour hier à ${time}"
      },

      MONTHS_ABBR: { 0: "JAN",
         10: "NOV",
         11: "DEC",
         1: "FEV",
         2: "MAR",
         3: "AVR",
         4: "MAI",
         5: "JUN",
         6: "JUL",
         7: "AOU",
         8: "SEP",
         9: "OCT"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Aujourd'hui",
         YEAR: "${date_short}",
         YESTERDAY: "Hier",
         TOMORROW: "Demain"
      },

      RELATIVE_TIME: { DAY: "${EEee} à ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Aujourd'hui à ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "Hier à ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} à ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Aujourd'hui à ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "Hier à ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} à ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short} à ${time}",
         TODAY: "${date_short} à ${time}",
         YEAR: "${date_short} à ${time}",
         YESTERDAY: "${date_short} à ${time}",
         TOMORROW: "${date_short} à ${time}"
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

      UPDATED: { DAY: "Mis à jour : ${EEee} à ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Mis à jour : ${date_long}",
         TODAY: "Mis à jour aujourd'hui à ${time}",
         YEAR: "Mis à jour : ${date_long}",
         YESTERDAY: "Mis à jour hier à ${time}"
      }
   },
   VERSIONS: {
      ERROR: "Impossible de charger les informations de version.",
      ERROR_REQUEST_CANCELLED: "La demande a été annulée.",
      ERROR_REQUEST_TIMEOUT: "Impossible de contacter le serveur.",
      ERROR_REQUEST_UNKNOWN: "Une erreur inconnue s'est produite.",
      LOADING: "Chargement...",
      NO_VERSIONS: "Il n'existe aucune version",
      INFO: "Version ${0} créée ${1} par ",
      VERSION_NUMBER: "Version ${0}",
      DELETED: "Supprimer",
      DELETE_ALL: "Supprimer toutes les versions antérieures à la version",
      DELETE_VERSION_SINGLE: "Supprimer la version ${0}",
      DELETEERROR: "La version n'a pas été supprimée en raison d'une erreur.",
      CREATE_VERSION: "Créer une version",
      CREATE_VERSION_TOOLTIP: "Créer une version de ce fichier",
      REVERT_VERSION: "Restaurer la version ${0}",
      REVERT_DESCRIPTION: "Restauré à partir de la version ${0}",
      PREVIOUS: "Précédent",
      PREVIOUS_TOOLTIP: "Page précédente",
      ELLIPSIS: "...",
      NEXT: "Suivant",
      NEXT_TOOLTIP: "Page suivante",
      COUNT: "${0} - ${1} sur ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Page",
      SHOW: "Afficher",
      ITEMS_PER_PAGE: " éléments par page.",
      DATE: {
        AM: "AM",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "Aujourd'hui à ${time}",
            YESTERDAY: "Hier à ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} à ${time}",
            YEAR: "${date_short} à ${time}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short} à ${time}",
            TODAY: "aujourd'hui à ${time}",
            YESTERDAY: "hier à ${time}"
        },
        UPDATED: { DAY: "Mis à jour : ${EEee} à ${time}",
            YEAR: "Mis à jour : ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "Mis à jour : ${date_short}",
            TODAY: "Mis à jour aujourd'hui à ${time}",
            YESTERDAY: "Mis à jour hier à ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Supprimer la version ${0}",
         DOWNLOAD: "Télécharger",
         DOWNLOAD_TOOLTIP: "Télécharger cette version (${0})",
         VIEW: "Afficher",
         VIEW_TOOLTIP: "Afficher la version ${0}",
         REVERT: {
            A11Y: "Ce bouton ouvre une boîte de dialogue permettant à l'utilisateur de confirmer la restauration d'une version antérieure d'un fichier. Si l'opération est confirmée, le contenu de la page est actualisé.",
            FULL: "Restaurer",
            WIDGET: "Restaurer cette version"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "La version n'a pas été supprimée, car elle a déjà été supprimée ou n'est plus visible par vous.",
         ERROR_ACCESS_DENIED: "La version n'a pas pu être supprimée, car vous n'êtes pas éditeur.",
         ERROR_TIMEOUT: "La version n'a pas été supprimée, car le serveur est injoignable.  Cliquez de nouveau sur 'Supprimer' pour relancer votre demande.",
         ERROR_CANCEL: "La version n'a pas été supprimée, car la demande a été annulée.  Cliquez de nouveau sur 'Supprimer' pour relancer votre demande.",
         ERROR_NOT_LOGGED_IN: "Vous devez être connecté pour supprimer cette version.  Cliquez sur 'Supprimer' pour être invité à vous connecter.",
         GENERIC_ERROR: "La version n'a pas été supprimée en raison d'une erreur inconnue.  Cliquez de nouveau sur 'Supprimer' pour relancer votre demande.",
         FULL: "Supprimer",
         A11Y: "Ce bouton ouvre une boîte de dialogue permettant à l'utilisateur de confirmer la suppression de cette version. Si l'opération est confirmée, le contenu de la page est actualisé."
      },

      REVERT: {
         ERROR_NOT_FOUND: "La version n'a pas été restaurée car elle a été supprimée ou n'est plus visible par vous.",
         ERROR_ACCESS_DENIED: "La version n'a pas pu être restaurée, car vous n'êtes pas éditeur.",
         ERROR_NAME_EXISTS: "La version n'a pas été restaurée car un autre fichier porte le même nom.",
         ERROR_TIMEOUT: "La version n'a pas été restaurée car le serveur n'a pas pu être contacté.  Cliquez de nouveau sur 'Restaurer' pour relancer votre demande.",
         ERROR_CANCEL: "La version n'a pas été restaurée, car la demande a été annulée.  Cliquez de nouveau sur 'Restaurer' pour relancer votre demande.",
         ERROR_QUOTA_VIOLATION: "La version n'a pas été restaurée en raison de restrictions d'espace.",
         ERROR_MAX_CONTENT_SIZE: "La version n'a pas été restaurée car sa taille est supérieure à la taille de fichier maximale autorisée : ${0}",
         GENERIC_ERROR: "La version n'a pas été restaurée en raison d'une erreur inconnue.  Cliquez de nouveau sur 'Restaurer' pour relancer votre demande."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Voir qui a téléchargé...",
      PREVIOUS: "Précédent",
      PREVIOUS_TOOLTIP: "Page précédente",
      ELLIPSIS: "...",
      NEXT: "Suivant",
      NEXT_TOOLTIP: "Page suivante",
      COUNT: "${0} - ${1} sur ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Page",
      SHOW: "Afficher",
      ITEMS_PER_PAGE: " éléments par page.",
      VERSION: {
         DAY: "Version ${version} le ${date}",
         MONTH: "Version ${version} le ${date}",
         TODAY: "Version ${version} à ${time}",
         YEAR: "Version ${version} le ${date}",
         YESTERDAY: "Version ${version} hier"
      },

      FILE: {
         V_LATEST: "Vous avez téléchargé la dernière version de ce fichier",
         V_OLDER: "La dernière version téléchargée de ce fichier est ${0}",
         LOADING: "Chargement...",
         EMPTY: "Utilisateurs anonymes uniquement",
         ERROR: "Impossible de charger les informations de téléchargement"
      }
   },

   EE_DIALOG: {
      ERROR: "Erreur",
      ERROR_ALT_TEXT: "Erreur :",
      ERROR_MSG_GENERIC: "Une erreur s'est produite.  Réessayez.",
      ERROR_MSG_NOT_AVAILABLE: "Cet élément a été supprimé ou n'est plus disponible.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Le contenu de cet élément n'est pas disponible.",
      ERROR_MSG_NO_ACCESS: "Vous n'avez plus accès à cet élément.",
      LOADING: "Chargement...",
      TITLE_SU: "${author} a posté un message.",
      TITLE_NI: "${author} vous a invité à rejoindre son réseau.",
      AUTHOR_TITLE: "Afficher le profil de ${author}",
      OPEN_LINK: "Ouvrir ${title}",
      CONFIRM_CLOSE_TITLE: "Confirmer",
      CONFIRM_CLOSE_MESSAGE: "Etes-vous sûr de vouloir abandonner vos modifications ? Appuyez sur OK pour continuer ou sur Annuler pour revenir en arrière",
      OK: "OK",
      CANCEL: "Annuler"
   },
   MESSAGE: {
      SUCCESS: "Confirmation",
      ERROR: "Erreur",
      ERROR_ALT_TEXT: "Erreur :",
      INFO: "Informations",
      WARNING: "Avertissement",
      DISMISS: "Masquer ce message",
      MORE_DETAILS: "Plus d'informations",
      HIDE_DETAILS: "Masquer les détails"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Créé : ${EEEE} à ${time}",
           MONTH: "Créé : ${d} ${MMM}",
           TODAY: "Créé : aujourd'hui à ${time}",
           YEAR: "Créé : ${d} ${MMM} ${YYYY}",
           YESTERDAY: "Créé : hier à ${time}",
           TOMORROW: "Créé : ${d} ${MMM} ${YYYY}"
       },
      error: "Une erreur s'est produite.  ${again}.",
      error_again: "Retentez l'opération.",
      error_404: "La mise à jour de statut n'existe plus.",
      notifications: {
         STATUS_UPDATE: "${user} a posté un message",
         USER_BOARD_POST: "${user} a écrit sur votre panneau",
         POST_COMMENT: "${user} a écrit :"
      }
   },
   login: {
      error: "Vos nom d'utilisateur et/ou mot de passe ne correspondent pas à un compte existant. Réessayez.",
      logIn: "Connexion",
      password: "Mot de passe :",
      user: "Nom d'utilisateur :",
      welcome: "Connexion à HCL Connections"
   },
   repost: {
      name: "Reposter",
      title: "Reposter cette mise à jour pour mes suiveurs ou mes communautés",
      msg_success: "La mise à jour a été repostée pour vos suiveurs.",
      msg_generic: "Une erreur s'est produite.  Réessayez."
   },
   FILE_SHARE_INFO: {
      ADD: "Ajouter",
      ADD_TXT: "Ajouter des personnes ou des communautés en tant que lecteurs",
      SHOW_MORE: "Afficher plus...",
      READER_IF_PUBLIC: "Tout le monde (public)",
      READER_IF_PUBLIC_TOOLTIP: "Ce fichier est public et visible par tout le monde.",
      EMPTY_READERS: "Aucun",
      READERS_LABEL: "Lecteurs : ",
      EDITORS_LABEL: "Editeurs : ",
      OWNER_LABEL: "Propriétaire : ",
      ERROR: "Impossible de charger les informations de partage",
      ERROR_NOT_FOUND: "Le fichier que vous avez demandé a été supprimé ou déplacé. Si quelqu'un vous a envoyé ce lien, vérifiez qu'il est correct.",
      ERROR_ACCESS_DENIED: "Vous n'êtes pas autorisé à afficher ce fichier.  Le fichier n'est pas public et n'est pas partagé avec vous.",
      SHARE: "Partager",
      CANCEL: "Annuler",
      SHARE_WITH: "Partager avec :",
      PERSON: "une personne",
      COMMUNITY: "Une communauté",
      PLACEHOLDER: "Nom ou adresse électronique de la personne...",
      MESSAGE: "Message :",
      MESSAGE_TXT: "Ajouter un message facultatif",
      REMOVE_ITEM_ALT: "Retirer ${0}",
      NO_MEMBERS: "Aucun",
      A11Y_READER_ADDED: "${0} sélectionné en tant que lecteur",
      A11Y_READER_REMOVED: "${0} supprimé en tant que lecteur",
      SELF_REFERENCE_ERROR: "Vous ne pouvez pas partager avec vous-même.",
      OWNER_REFERENCE_ERROR: "Vous ne pouvez pas partager avec le propriétaire du fichier.",
      SHARE_COMMUNITY_WARN: "Le partage avec la communauté publique '${0}' rend le fichier public.",
      SELECT_USER_ERROR: "Vous devez sélectionner au moins une personne ou une communauté pour effectuer un partage",
      WARN_LONG_MESSAGE: "Le message est trop long.",
      TRIM_LONG_MESSAGE: "Raccourcir le message ?",
      ERROR_SHARING: "Impossible de partager le fichier.  Veuillez réessayer ultérieurement.",
      INFO_SUCCESS: "Le fichier a été partagé.",
      MAX_SHARES_ERROR: "Le nombre maximal de partages a été dépassé.",
      NOT_LOGGED_IN_ERROR: "Le fichier n'a pas été partagé car vous n'étiez pas connecté.  Cliquez sur 'Partager' pour partager le fichier.",
      TIMEOUT_ERROR: "Le fichier n'a pas été partagé car le serveur n'a pas pu être contacté.  Cliquez sur 'Partager' pour réessayer.",
      CANCEL_ERROR: "Le fichier n'a pas été partagé car la demande a été annulée.  Cliquez sur 'Partager' pour réessayer.",
      NOT_FOUND_ERROR: "Le fichier été supprimé ou n'est plus visible par vous et ne peut pas être partagé.",
      ACCESS_DENIED_ERROR: "Vous n'êtes plus autorisé à partager ce fichier.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Un fichier qui est restreint ne peut pas être rendu public.",
      TOOLTIP: "Donner accès à ce fichier à d'autres personnes"
   },
   HISTORY: {
      TAB_TITLE: "Mises à jour récentes",
      NO_HISTORY: "Il n'y a aucune mise à jour récente.",
      EMPTY: "Impossible d'extraire des mises à jour récentes pour cet élément. Il a été supprimé ou vous ne pouvez plus y accéder.",
      MORE: "Afficher les mises à jour précédentes",
      ERROR_ALT: "Erreur",
      ERROR: "Une erreur s'est produite lors de l'extraction des mises à jour. ${again}",
      ERROR_ADDTL: "Une erreur s'est produite lors de l'extraction des mises à jour supplémentaires. ${again}",
      ERROR_AGAIN: "Recommencez.",
      ERROR_AGAIN_TITLE: "Essayez à nouveau la demande pour plus de mises à jour.",
      PROFILE_TITLE: "Ouvrez le profil de ${user}.",
      SORT_BY: "Trier par \\:",
      SORTS: {
         DATE: "Date",
         DATE_TOOLTIP: "Trier de l'historique le plus récent aux mises à jour les moins récentes",
         DATE_TOOLTIP_REVERSE: "Trier de l'historique le moins récent aux mises à jour les plus récentes"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} à ${time}",
             MONTH: "${MMM} ${d}",
             TODAY: "Aujourd'hui à ${time}",
             YEAR: "${MMM} ${d}, ${YYYY}",
             YESTERDAY: "Hier à ${time}",
             TOMORROW: "${MMM} ${d}, ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Ce commentaire",
	   REPLY_ACTION: "Répondre",
       REPLY_ACTION_TOOLTIP: "Réponse à ce commentaire"
   },
   OAUTH: {
      welcomeHeader: "Bienvenue dans Connections",
      continueBtnLabel: "Continuer",
      continueBtnA11y: "L'activation de ce lien ouvrira une nouvelle fenêtre vous permettant d'autoriser l'accès à Connections.",
      clickHere: "Cliquez ici",
      infoMsg: "Connections requiert votre autorisation pour accéder à vos données.",
      authorizeGadget: "${clickHere} pour autoriser cette application à accéder à vos informations Connections.",
      confirmAuthorization: "${clickHere} pour confirmer que vous avez autorisé cette application à accéder à vos informations Connections."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "L'activation de ce lien ouvrira une nouvelle fenêtre vous permettant d'autoriser l'accès au référentiel de bibliothèques Connections.",
      infoMsg: "Le référentiel de bibliothèques Connections requiert votre autorisation pour accéder à vos données.",
      authorizeGadget: "${clickHere} pour autoriser cette application à accéder à vos informations dans le référentiel de bibliothèques Connections.",
      confirmAuthorization: "${clickHere} pour confirmer que vous avez autorisé cette application à accéder à vos informations dans le référentiel de bibliothèques Connections."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Annuler",
      CONFIRM: "Etes-vous sûr de vouloir abandonner vos modifications ?  Appuyez sur OK pour continuer ou sur Annuler pour revenir en arrière.",
      DIALOG_TITLE: "Confirmer",
      NAME: "Confirmer",
      OK: "OK",
      TOOLTIP: "Confirmer"
   }
})

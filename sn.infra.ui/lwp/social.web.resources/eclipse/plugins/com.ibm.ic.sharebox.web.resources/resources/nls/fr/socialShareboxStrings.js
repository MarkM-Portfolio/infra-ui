define(
	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2008, 2012                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	// NLS_CHARSET=UTF-8
	({
	   submit: {label: "Enregistrer", a11y: "Enregistrer", tooltip: "Enregistrer"}, 
	   cancel: {label: "Annuler", a11y: "Annuler", tooltip: "Annuler"},
	   close: {label: "Fermer", a11y: "Fermer", tooltip: "Fermer"},
	   title: {global: "Partager quelque chose", community: "Partager avec une communauté"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Le partage d'actions n'est pas disponible pour ce scénario.",
		   ACTIONS_LOAD_ERROR: "Une erreur s'est produite lors du chargement du partage d'actions.",
		   CONTENT_LOAD_ERROR: "Le contenu ne peut pas être chargé. Réessayez ultérieurement ou contactez votre administrateur système."},
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
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Partager",
		   UPLOAD: "Envoyer par téléchargement",
		   CANCEL: "Annuler",
		   VISIBILITY_WARNING: "Les fichiers partagés avec cette communauté deviendront publics.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Vous avez partagé ${0} avec ${1}.",
			   SUCCESS_PLURAL: "Vous avez partagé les fichiers ${0} avec ${1}.",
			   ERROR: "Impossible de partager le fichier.  Veuillez réessayer ultérieurement.",
			   ERROR_X: "Les fichiers n'ont pas pu être partagés.  Veuillez réessayer ultérieurement.",
	           MAX_SHARES_ERROR: "Le nombre maximal de partages a été dépassé.",
	           EXTERNAL_SHARES_ERROR: "Le fichier ne peut être partagé qu'au sein de votre organisation.",
	           EXTERNAL_SHARES_ERROR_X: "Les fichiers peuvent uniquement être partagés au sein de votre organisation.",
	           NOT_LOGGED_IN_ERROR: "Le fichier n'a pas été partagé car vous n'étiez pas connecté.  Cliquez sur 'Partager' pour partager le fichier.",
	           NOT_LOGGED_IN_ERROR_X: "Les fichiers n'ont pas été partagés car vous n'étiez pas connecté.  Cliquez sur 'Partager' pour partager les fichiers.",
	           TIMEOUT_ERROR: "Le fichier n'a pas été partagé car le serveur n'a pas pu être contacté.  Cliquez sur 'Partager' pour réessayer.",
	           TIMEOUT_ERROR_X: "Les fichiers n'ont pas été partagés car le serveur n'a pas pu être contacté.  Cliquez sur 'Partager' pour réessayer.",
	           CANCEL_ERROR: "Le fichier n'a pas été partagé car la demande a été annulée.  Cliquez sur 'Partager' pour réessayer.",
	           CANCEL_ERROR_X: "Les fichiers n'ont pas été partagés car la demande a été annulée.  Cliquez sur 'Partager' pour réessayer.",
	           NOT_FOUND_ERROR: "Le fichier été supprimé ou n'est plus visible par vous et ne peut pas être partagé.",
	           NOT_FOUND_ERROR_X: "Les fichiers ont été supprimés ou ne sont plus visibles pour vous et ne peuvent pas être partagés.",
	           ACCESS_DENIED_ERROR: "Vous n'êtes plus autorisé à partager ce fichier.",
	           ACCESS_DENIED_ERROR_X: "vous n'êtes plus autorisé à partager ces fichiers.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Un fichier qui est restreint ne peut pas être rendu public.",
	        	   ERROR_SHARE_X: "Les fichiers qui sont restreints ne peuvent pas être rendus publics."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "vous avez envoyé par téléchargement ${0} sur ${1}.",
			   SUCCESS_PLURAL: "Vous avez envoyé par téléchargement les fichiers ${0} sur ${1}.",
			   ERROR: "Le fichier n'a pas pu être téléchargé.  Veuillez réessayer ultérieurement.",
			   ERROR_X: "${0} n'a pas pu être téléchargé.  Veuillez réessayer ultérieurement.",
			   INFO_SUCCESS_PRE_MODERATION: "Le fichier ${0} a été soumis pour révision et sera disponible une fois approuvé.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} fichiers ont été soumis pour révision et seront disponibles une fois approuvés."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Envoyer des fichiers par téléchargement et partager des fichiers"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Annuler",
		   CONFIRM_OTHER_TAB: "Les informations que vous avez entrées sur les autres onglets seront perdues si vous poursuivez.  Appuyez sur OK pour continuer ou sur Annuler pour revenir en arrière.",
		   CONFIRM_CURRENT_TAB: "Les informations que vous avez entrées sur l'onglet ${0} seront perdues si vous poursuivez.  Appuyez sur OK pour continuer ou sur Annuler pour revenir en arrière.",
		   DIALOG_TITLE: "Confirmer",
		   OK: "OK"
	   }
	})
	
	
);
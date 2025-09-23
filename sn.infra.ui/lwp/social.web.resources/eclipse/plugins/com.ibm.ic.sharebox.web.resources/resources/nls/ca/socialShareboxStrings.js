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
	   submit: {label: "Desa", a11y: "Desa", tooltip: "Desa"}, 
	   cancel: {label: "Cancel·la", a11y: "Cancel·la", tooltip: "Cancel·la"},
	   close: {label: "Tanca", a11y: "Tanca", tooltip: "Tanca"},
	   title: {global: "Comparteix alguna cosa", community: "Comparteix amb una comunitat"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Les accions d'ús compartit no estan disponibles per a aquest escenari.",
		   ACTIONS_LOAD_ERROR: "S'ha produït un error en carregar les accions d'ús compartit.",
		   CONTENT_LOAD_ERROR: "No es pot carregar el contingut. Torneu-ho a intentar o poseu-vos en contacte amb l'administrador."},
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
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Comparteix",
		   UPLOAD: "Carrega",
		   CANCEL: "Cancel·la",
		   VISIBILITY_WARNING: "Els fitxers compartits amb aquesta comunitat es faran públics.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Heu compartit correctament ${0} amb ${1}.",
			   SUCCESS_PLURAL: "Heu compartit correctament ${0} fitxers amb ${1}.",
			   ERROR: "El fitxer no es pot compartir.  Torneu-ho a provar més endavant.",
			   ERROR_X: "Els fitxers no es poden compartir.  Torneu-ho a provar més endavant.",
	           MAX_SHARES_ERROR: "S'ha superat el número màxim de recursos compartits.",
	           EXTERNAL_SHARES_ERROR: "El fitxer només es pot compartir dins de la vostra organització.",
	           EXTERNAL_SHARES_ERROR_X: "Els fitxers només es poden compartir dins de l'organització.",
	           NOT_LOGGED_IN_ERROR: "El fitxer no s'ha compartit perquè no estàveu connectat.  Feu clic a 'Comparteix' per compartir el fitxer.",
	           NOT_LOGGED_IN_ERROR_X: "Els fitxers no s'han compartit perquè no estàveu connectat.  Feu clic a 'Comparteix' per compartir els fitxers.",
	           TIMEOUT_ERROR: "No s'ha compartit el fitxer perquè no s'ha pogut contactar amb el servidor.  Feu clic a 'Comparteix' per tornar-ho a provar.",
	           TIMEOUT_ERROR_X: "No s'han compartit els fitxers perquè no s'ha pogut contactar amb el servidor.  Feu clic a 'Comparteix' per tornar-ho a provar.",
	           CANCEL_ERROR: "El fitxer no s'ha compartit perquè s'ha cancel·lat la sol·licitud.  Feu clic a 'Comparteix' per tornar-ho a provar.",
	           CANCEL_ERROR_X: "Els fitxers no s'han compartit perquè no s'ha cancel·lat la sol·licitud.  Feu clic a 'Comparteix' per tornar-ho a provar.",
	           NOT_FOUND_ERROR: "S'ha suprimit el fitxer o ja no està visible i no es pot compartir.",
	           NOT_FOUND_ERROR_X: "Els fitxers s'han suprimit o ja no són visibles i no es poden compartir.",
	           ACCESS_DENIED_ERROR: "Ja no teniu permís per compartir aquest fitxer.",
	           ACCESS_DENIED_ERROR_X: "Ja no teniu permís per compartir aquests fitxers.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Un fitxer restringit no pot convertir-se en públic.",
	        	   ERROR_SHARE_X: "Els fitxers restringits no poden convertir-se en públics."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Heu carregat correctament ${0} amb ${1}.",
			   SUCCESS_PLURAL: "Heu carregat correctament ${0} fitxers a ${1}.",
			   ERROR: "No s'ha pogut carregar el fitxer.  Torneu-ho a provar més endavant.",
			   ERROR_X: "${0} no s'ha pogut carregar.  Torneu-ho a provar més endavant.",
			   INFO_SUCCESS_PRE_MODERATION: "El fitxer ${0} s'ha enviat per la seva revisió i es trobarà disponible quan s'aprovi.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} fitxers s'han enviat a revisió i estaran disponibles quan s'aprovin."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Carregueu i compartiu fitxers"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Cancel·la",
		   CONFIRM_OTHER_TAB: "La informació que heu introduït a les altres pestanyes es perdrà si continueu amb l'acció actual.  Premeu D'acord per continuar o Cancel·la per tornar.",
		   CONFIRM_CURRENT_TAB: "La informació que heu introduït a la pestanya ${0} es perdrà si continueu amb l'acció actual.  Premeu D'acord per continuar o Cancel·la per tornar.",
		   DIALOG_TITLE: "Confirma",
		   OK: "D\'acord"
	   }
	})
	
	
);
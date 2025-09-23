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
	   submit: {label: "Guardar", a11y: "Guardar", tooltip: "Guardar"}, 
	   cancel: {label: "Cancelar", a11y: "Cancelar", tooltip: "Cancelar"},
	   close: {label: "Cerrar", a11y: "Cerrar", tooltip: "Cerrar"},
	   title: {global: "Compartir algo", community: "Compartir con una comunidad"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "La opción de compartir acciones no está disponible este caso.",
		   ACTIONS_LOAD_ERROR: "Se ha producido un error al cargar las acciones de compartición.",
		   CONTENT_LOAD_ERROR: "No se puede cargar el contenido. Inténtelo de nuevo o contacte con su administrador del sistema."},
	   MESSAGE: {
		      SUCCESS: "Confirmación",
		      ERROR: "Error",
		      ERROR_ALT_TEXT: "Error:",
		      INFO: "Información",
		      WARNING: "Aviso",
		      DISMISS: "Ocultar este mensaje",
		      MORE_DETAILS: "Más detalles",
		      HIDE_DETAILS: "Ocultar detalles"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Compartir",
		   UPLOAD: "Subir",
		   CANCEL: "Cancelar",
		   VISIBILITY_WARNING: "Los archivos compartidos con esta comunidad pasarán a ser públicos.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Ha compartido correctamente ${0} con ${1}.",
			   SUCCESS_PLURAL: "Ha compartido correctamente ${0} archivos con ${1}.",
			   ERROR: "El archivo no se ha podido compartir.  Inténtelo de nuevo más tarde.",
			   ERROR_X: "No se han podido compartir los archivos.  Inténtelo de nuevo más tarde.",
	           MAX_SHARES_ERROR: "Se ha excedido el número máximo de comparticiones.",
	           EXTERNAL_SHARES_ERROR: "El archivo sólo se puede compartir dentro de la organización.",
	           EXTERNAL_SHARES_ERROR_X: "Los archivos solo se pueden compartir dentro de la organización.",
	           NOT_LOGGED_IN_ERROR: "El archivo no se ha compartido porque no se ha iniciado la sesión.  Pulse 'Compartir' para compartir el archivo.",
	           NOT_LOGGED_IN_ERROR_X: "Los archivos no se han compartido porque no ha iniciado sesión.  Pulse 'Compartir' para compartir los archivos.",
	           TIMEOUT_ERROR: "El archivo no se ha compartido porque no se ha podido establecer contacto con el servidor.  Pulse 'Compartir' para intentarlo de nuevo.",
	           TIMEOUT_ERROR_X: "Los archivos no se han compartido porque no se ha podido establecer contacto con el servidor.  Pulse 'Compartir' para intentarlo de nuevo.",
	           CANCEL_ERROR: "No se ha compartido el archivo porque se ha cancelado la solicitud.  Pulse 'Compartir' para intentarlo de nuevo.",
	           CANCEL_ERROR_X: "Los archivos no se han compartido porque se ha cancelado la solicitud.  Pulse 'Compartir' para intentarlo de nuevo.",
	           NOT_FOUND_ERROR: "El archivo se ha suprimido o ya no lo puede ver, por lo que no se puede compartir.",
	           NOT_FOUND_ERROR_X: "Los archivos se han suprimido o han dejado de ser visibles y no se pueden compartir.",
	           ACCESS_DENIED_ERROR: "Ya no tiene permiso para compartir este archivo.",
	           ACCESS_DENIED_ERROR_X: "Ya no tiene permiso para compartir estos archivos.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Es posible que un archivo restringido no se pueda hacer público.",
	        	   ERROR_SHARE_X: "Es posible que los archivos que están restringidos no se hagan públicos."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Ha cargado correctamente ${0} en ${1}.",
			   SUCCESS_PLURAL: "Ha cargado correctamente ${0} archivos en ${1}.",
			   ERROR: "No se ha podido subir el archivo.  Inténtelo de nuevo más tarde.",
			   ERROR_X: "${0} no se ha podido cargar.  Inténtelo de nuevo más tarde.",
			   INFO_SUCCESS_PRE_MODERATION: "El archivo ${0} se ha enviado a revisión y estará disponible cuando se apruebe.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} archivos se han enviado a revisión y estarán disponibles cuando se aprueben."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Cargar y compartir archivos"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Cancelar",
		   CONFIRM_OTHER_TAB: "La información que ha especificado en los otros separadores se perderá si continúa con la acción actual.  Pulse Aceptar para continuar o Cancelar para volver.",
		   CONFIRM_CURRENT_TAB: "La información que ha especificado en el separador ${0} se perderá si continúa con la acción actual.  Pulse Aceptar para continuar o Cancelar para volver.",
		   DIALOG_TITLE: "Confirmar",
		   OK: "Aceptar"
	   }
	})
	
	
);
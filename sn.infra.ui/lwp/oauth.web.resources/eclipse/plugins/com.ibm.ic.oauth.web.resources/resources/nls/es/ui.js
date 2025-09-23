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
define({
      "authorize" : {
         "legal" : "Materiales bajo licencia - Propiedad de HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. Reservados todos los derechos. Consulte la licencia de producto para m\u00e1s informaci\u00f3n. Java y las marcas comerciales y logotipos basados en Java son marcas comerciales o marcas comerciales registradas de Oracle y/o sus filiales.",
         "error" : "Se ha producido un error. Vuelva a intentarlo más adelante.",
         "granted" : {
            "title" : "Acceso otorgado",
            "blurb" : "Se le ha otorgado acceso de ${0} para interactuar con su cuenta de HCL Connections."
         },
         "denied" : {
            "title" : "Acceso denegado",
            "blurb" : "Se le ha denegado el acceso de ${0} para interactuar con su cuenta de HCL Connections."
         },
         "blurb" : "{0} solicita acceso a su información de HCL Connections, incluyendo todo su contenido de Connections.",
         "revoke" : {
            "description" : "Puede revocar el acceso en cualquier momento a través de Valores de Connections > {0}. Es posible que Connections pueda solicitarle que lo reautorice.",
            "link" : "Acceso de aplicación"
         },
         "authorize" : {
            "label" : "Otorgar acceso"
         },
         "windowtitle" : "Autorizar acceso a HCL Connections",
         "title" : "Solicitud de acceso",
         "deny" : {
            "label" : "Denegar acceso"
         },
         "action_tooltip" : "Otorgue el acceso a la aplicación ${0}",
         "action" : "Otorgar acceso",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Redirigiéndole de nuevo a ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Activar JavaScript",
            "p2" : "Renueve la página para continuar.",
            "p1" : "JavaScript se ha inhabilitado en el navegador web.  HCL Connections necesita JavaScript para funcionar.  Cuando lo haya activado, renueve la página."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "No hemos podido procesar la solicitud",
            "description" : "La solicitud emitida por la aplicación que solicita acceso a su cuenta de HCL Connections estaba incompleta.  Pulse el botón Atrás del navegador para volver al sitio o a la aplicación que le ha enviado aquí y vuelva a intentarlo.  Si el error persiste, informe del problema al administrador."
         },
         "invalid_token" : {
            "title" : "No hemos podido procesar la solicitud",
            "description" : "La solicitud emitida por la aplicación que solicita acceso a su cuenta de HCL Connections no era válida.  Pulse el botón Atrás del navegador para volver al sitio o a la aplicación que le ha enviado aquí y vuelva a intentarlo.  Si el error persiste, informe del problema al administrador."
         },
         "default_action" : {
            "label" : "Volver a la página inicial"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Error:",
            "icon_alt" : "Error"
         },
         "success" : {
            "a11y_label" : "Correcto:",
            "icon_alt" : "Correcto"
         },
         "warning" : {
            "a11y_label" : "Aviso:",
            "icon_alt" : "Aviso"
         },
         "info" : {
            "a11y_label" : "Información:",
            "icon_alt" : "Información"
         }
      },
      "loading" : "Cargando...",
      "deny" : {
         "error" : "Se ha producido un error. Vuelva a intentarlo más adelante.",
         "action_tooltip" : "Deniegue el acceso a la aplicación ${0}",
         "action" : "Denegar acceso",
         "success" : "Acceso denegado."
      },
      "grid" : {
         "applications" : {
            "summary" : "Lista de aplicaciones con acceso a su información de HCL Connections.",
            "loading" : "Cargando...",
            "empty" : "No se han encontrado aplicaciones.",
            "reverse_sort" : "Invertir ordenación"
         }
      },
      "applications" : {
         "windowtitle" : "Acceso de aplicación",
         "details" : "Aplicaciones con acceso a su información de HCL Connections.",
         "error" : "La lista no se ha recuperado debido a un error.",
         "titlebar" : {
            "tab2" : "Acceso de aplicación",
            "tab1" : "Notificaciones de correo electrónico",
            "tab3" : "Globalización"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Al pulsar este botón, se actualizará la página actual con contenido nuevo.  Para volver a este menú, vuelva a:"
         },
         "a11y" : {
            "titlebar_label" : "Valores de HCL Connections"
         },
         "heading" : "Acceso de aplicación"
      },
      "sorts" : {
         "application_name" : "Nombre de aplicación",
         "authorization_date" : "Fecha de autorización",
         "expiration_date" : "Fecha de caducidad",
         "action" : "Acción"
      },
      "revoke_token" : {
         "error" : "Se ha producido un error. Vuelva a intentarlo más adelante.",
         "dialog_title" : "Revocar acceso",
         "action_tooltip" : "Revoque el acceso a la aplicación ${0}",
         "action" : "Revocar",
         "ok" : "Aceptar",
         "cancel" : "Cancelar",
         "confirm" : "¿Desea revocar el acceso de la aplicación a su información de HCL Connections? ",
         "success" : "La aplicación se ha suprimido."
      }
});

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
      "globalization" : {
         "windowtitle" : "Globalización",
         "unavailable" : "Los valores de globalización no están disponibles",
         "details" : "Especifique su idioma preferido, la agenda que prefiera y la dirección a la que va el texto generado por el usuario.",
         "error" : "No se han recuperado los valores de globalización debido a un error.",
         "titlebar" : {
            "tab2" : "Acceso de aplicación",
            "tab1" : "Notificaciones de correo electrónico",
            "tab3" : "Globalización"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Al pulsar este botón, se actualizará la página actual con contenido nuevo.  Para volver a este menú, vuelva a:"
         },
         "details_nolanguage" : "Especifique la agenda que prefiera y la dirección a la que va el texto generado por el usuario.",
         "a11y" : {
            "titlebar_label" : "Valores de HCL Connections",
            "body_label" : "Valores de globalización"
         },
         "heading" : "Valores de globalización"
      },
      "restore_defaults" : {
         "error" : "Se ha producido un error. Vuelva a intentarlo más adelante.",
         "action_tooltip" : "Restaurar los valores de globalización a sus valores predeterminados originales",
         "action" : "Restaurar valores predeterminados",
         "success" : "Se han restaurado los valores de globalización a sus valores predeterminados originales."
      },
      "help" : {
         "help" : "Ayuda",
         "close" : "Cerrar"
      },
      "save" : {
         "error" : "Se ha producido un error. Vuelva a intentarlo más adelante.",
         "action_tooltip" : "Guardar los valores de globalización",
         "action" : "Guardar",
         "success" : "Sus valores de globalización se han actualizado."
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "Restaurar valores predeterminados"
         },
         "bidi" : {
            "help" : "Ayuda de Habilitar texto bidireccional",
            "label" : "Habilitar texto bidireccional",
            "tooltip" : "Permite al idioma especificado la visualización de texto concatenado y texto estructurado, por ejemplo, las vías de acceso de archivo.  Además le permite especificar un la dirección del texto independientemente del idioma seleccionado."
         },
         "error" : "Error",
         "save" : {
            "label" : "Guardar"
         },
         "direction" : {
            "label" : "Dirección del texto generado por el usuario:",
            "tooltip" : "La dirección de texto deriva de la entrada de usuario, como los nombres de contenido y los indicadores de ruta de navegación.  De forma predeterminada, viene determinado por la selección de idioma (de izquierda a derecha para la mayoría).  La elección de contexto permite al sistema determinar la dirección en función de análisis de caracteres (da soporte a dirección de texto combinada).",
            "options" : {
               "contextual" : "Contextual (basado en caracteres)",
               "rtl" : "De derecha a izquierda",
               "ltr" : "De izquierda a derecha",
               "default_ltr" : "Utilizar predeterminado por el idioma (de izquierda a derecha)",
               "default_rtl" : "Utilizar predeterminado por el idioma (de derecha a izquierda)"
            }
         },
         "cancel" : {
            "label" : "Cancelar"
         },
         "language" : {
            "selected" : "${0} (actual)",
            "label" : "Idioma:",
            "tooltip" : "Especifique el idioma en que se visualizará el texto de la aplicación.  Este valor no afectará al texto generado por el usuario."
         },
         "calendar" : {
            "label" : "Agenda:",
            "options" : {
               "hebrew" : "Hebreo",
               "gregorian" : "Gregoriano",
               "hijri" : "Hijri"
            }
         }
      }
});

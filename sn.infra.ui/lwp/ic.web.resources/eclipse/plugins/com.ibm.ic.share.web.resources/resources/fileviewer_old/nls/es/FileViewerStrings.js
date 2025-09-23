/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8

({
   FILENAME_TOOLTIP: "Abrir la página de detalles de archivo",
   ICON_TOOLTIP: "Descargar ${0}",
   NAVIGATION: {
      NEXT_A11Y: "Este botón va al siguiente archivo.",
      PREVIOUS_A11Y: "Este botón va al archivo anterior."
   },
   ACTION: {
      CLOSE: {
         TOOLTIP: "Cerrar ${0}",
         A11Y: "Este botón cierra el visor de archivos."
      },
      DOWNLOAD: {
         TOOLTIP: "Descargar ${0}",
         A11Y: "Este botón descarga el archivo."
      },
      TOGGLE_PANEL: {
         SHOW: "Mostrar panel de detalles",
         HIDE: "Ocultar panel de detalles",
         SHOW_A11Y: "Este botón abre y cierra el panel lateral. Actualmente, el panel lateral está cerrado.",
         HIDE_A11Y: "Este botón abre y cierra el panel lateral. Actualmente, el panel lateral está abierto."
      },
      VIEW_DOC: {
         NAME: "Abrir en el visor de Docs",
         TOOLTIP: "Abrir ${0} en el visor de Docs",
         A11Y: "Este botón abre el archivo para verlo en una ventana del navegador nueva."
      },
      EDIT_DOC: {
         NAME: "Editar",
         TOOLTIP: "Editar ${0}",
         A11Y: "Este botón abre el archivo para editarlo en Docs en una ventana nueva."
      }
   },
   SECTION: {
      ABOUT: {
         NAME: "Acerca de este archivo",
         VIEW_FILE_DETAILS: "Ver detalles del archivo",
         A11Y: "La activación de este enlace cerrará el visor de archivos y le dirigirá a la página de detalles de archivo para este archivo."
      }
   },
   PREVIEW: {
      ICON: {
         PREVIEW_NOT_AVAILABLE: "No hay ninguna vista previa disponible para ${filename}."
      },
      IMAGE: {
         ZOOM_IN: "Acercar",
         ZOOM_OUT: "Alejar",
         RESET: "Restablecer",
         ZOOM_IN_A11Y: "Este botón acerca la imagen.",
         ZOOM_OUT_A11Y: "Este botón aleja la imagen.",
         RESET_ZOOM_A11Y: "Este botón restablece el nivel de zoom."
      },
      VIEWER: {
         LOADING: "Cargando..."
      }
   },
   DATE: {
      LAST_UPDATED: {
         TODAY: "Última actualización realizada por ${user} hoy a las ${time}",
         YESTERDAY: "Última actualización realizada por ${user} ayer a las ${time}",
         DAY: "Última actualización realizada por ${user} el ${EEee} a las ${time}",
         MONTH: "Última actualización realizada por ${user} el ${date_long}",
         YEAR: "Última actualización realizada por ${user} el ${date_long}"
      },
      CREATED: {
         TODAY: "Creado por ${user} hoy a las ${time}",
         YESTERDAY: "Creado por ${user} ayer a las ${time}",
         DAY: "Creado por ${user} el ${EEee} a las ${time}",
         MONTH: "Creado por ${user} el ${date_long}",
         YEAR: "Creado por ${user} el ${date_long}"
      }
   },
   FILE_SIZE: {
      BYTES: "${size} B",
      KILOBYTES: "${size} KB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
   }
});


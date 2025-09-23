/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "Vista previa de archivo",
      FILENAME_TOOLTIP: "Editar nombre de archivo",
      ICON_TOOLTIP: "Descarga los archivos",
      ERROR: "Se ha producido un error.",
      FILE_MALICIOUS: "La exploración ha revelado contenido malicioso.",
      SHARED_EXTERNALLY: "Compartido externamente",
      FILE_SYNCED: "Añadido a sincronización",
      MY_DRIVE: {
         TITLE: "En Mi unidad",
         ROOT_FOLDER: "/Mi unidad",
         FOLDER: "/Mi unidad/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Más acciones",
         A11Y: "Abre un menú desplegable con una lista de más acciones a realizar en el archivo.",
            PANELS: {
               TITLE: "Más",
               A11Y: "Abre un menú desplegable con una lista de paneles ocultos."
            }
      },
      WELCOME: {
         TITLE: "Hemos combinado la vista de archivo y los detalles",
         SUBTITLE: "Ahora puede ver un archivo y sus comentarios en paralelo.",
         LINES: {
            LINE_1: "Aquí encontrará toda la información y tareas que puede realizar en la página antigua.",
            LINE_2: "Al lado del archivo encontrará comentarios, los usos compartidos, versiones e información básica."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Este botón va al siguiente archivo.",
         PREVIOUS_A11Y: "Este botón va al archivo anterior."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Más opciones de edición",
            A11Y: "Este botón obre un menú con más opciones de edición."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Editar"
            },
            UPLOAD: {
               TITLE: "Subir"
            },
            CREATE: {
              TITLE: "Crear"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Ajustar tamaño del panel",
           USAGE: "Pulse las teclas de corchete derecho o izquierdo para redimensionar el panel."
       },
         CLOSE: {
            TOOLTIP: "Cerrar",
            A11Y: "Este botón cierra el visor de archivos.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Su archivo todavía se está cargando.",
              PROMPT: "Su archivo todavía se está cargando. Si cierra antes de que se complete, la carga se cancelará.",
              OK: "Cerrar igualmente",
              CANCEL: "Esperar a que finalice la carga"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Añadir a Archivos",
           A11Y: "Este botón añade el adjunto a Archivos.",
           VIEW_NOW: "Visualizar ahora"
         },
         TEAR_OFF: {
           TOOLTIP: "Abrir en ventana nueva",
           A11Y: "Abrir en ventana nueva",
           ERROR_TEARING_OFF: "Se ha producido un error al abrir la ventana nueva.",
           DIALOG_TITLE: "Confirmar",
           UNSAVED_CHANGES_WARNING: "Hay cambios no guardados que se van a perder. Desea igualmente abrir la ventana nueva?",
           OK: "Sí",
           CANCEL: "No",
           OPEN: "Abrir",
           OPEN_ANYWAY: "Abrir igualmente",
           CANCEL_ALT: "Cancelar"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Nuevo a partir de archivo",
            ACTION_NAME:"Crear archivo",
            A11Y: {
               TEXT: "Crear un documento (archivo DOC, DOCX u ODT) a partir de un archivo de plantilla. Puede editar estos documentos en línea en Docs.",
               PRES: "Cree una presentación (archivo PPT, PPTX u ODP) a partir de un archivo de plantilla. Puede editar estas presentaciones en línea en Docs.",
               SHEET: "Cree una hoja de cálculo (archivo XLS, XLSX u ODS) a partir de un archivo de plantilla. Puede editar estas hojas de cálculo en línea en Docs."
            },
            PROMPT: {
               TEXT: "Crear un documento (archivo DOC, DOCX u ODT) a partir de un archivo de plantilla. Puede editar estos documentos en línea en Docs.",
               PRES: "Cree una presentación (archivo PPT, PPTX u ODP) a partir de un archivo de plantilla. Puede editar estas presentaciones en línea en Docs.",
               SHEET: "Cree una hoja de cálculo (archivo XLS, XLSX u ODS) a partir de un archivo de plantilla. Puede editar estas hojas de cálculo en línea en Docs."
            },
            NAME_FIELD: "Nombre:",
            EXTERNAL_FIELD: "Los archivos se pueden compartir con personas externas a mi organización",
            EXTERNAL_DESC: "El acceso externo permite que se compartan archivos con usuarios externos (personas fuera de su organización o empresa), carpetas compartidas con usuarios externos, y comunidades con personas externas como miembros. Debe establecer el acceso externo al cargar un archivo; no se puede activar más adelante.",
            CREATE_BUTTON: "Crear",
            CANCEL: "Cancelar",
            PRE_FILL_NAMES: {
               OTT: "Documento sin título",
               OTS: "Hoja de cálculo sin título",
               OTP: "Presentación sin título",
               DOT: "Documento sin título",
               XLT: "Hoja de cálculo sin título",
               POT: "Presentación sin título",
               DOTX: "Documento sin título",
               XLTX: "Hoja de cálculo sin título",
               POTX: "Presentación sin título"
            },
            ERRORS: {
               NAME_REQUIRED: "El nombre del documento es obligatorio.",
               ILLEGAL_NAME:"El título de documento no está permitido. Especifique otro.",
               WARN_LONG_NAME: "El nombre de documento es demasiado largo.",
               TRIM_NAME: "¿Desea acortar el nombre de documento?",
               SESSION_TIMEOUT: "Su sesión ha caducado. Inicie sesión e inténtelo de nuevo.",
               DUPLICATE_NAME: "Se ha encontrado un nombre de archivo duplicado. Especifique un nombre nuevo.",
               SERVER_ERROR: "El servidor de Connections no está disponible. Póngase en contacto con el administrador del servidor e inténtelo de nuevo más tarde."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Descarga los archivos",
            A11Y: "Este botón descarga el archivo."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Descargar como PDF",
            TOOLTIP: "Descargar este archivo como un archivo PDF",
            A11Y: "Este botón descarga el archivo como un PDF.",
            SUCCESS: "Ha descargado correctamente el archivo como un PDF.",
            ERROR: {
               DEFAULT: "No ha podido descargar el archivo como un PDF.  Inténtelo de nuevo más tarde.",
               UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar sesión para descargar el archivo como un PDF.",
               NOT_FOUND: "No se ha podido descargar el archivo como un PDF porque el archivo se ha suprimido o ya no se comparte con usted.",
               ACCESS_DENIED: "No se ha podido descargar el archivo como un PDF porque el archivo se ha suprimido o ya no se comparte con usted."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "No hay ninguna versión publicada de este archivo que descargar.  Se pueden publicar versiones desde el editor de Docs."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "No se puede descargar el archivo",
               CANCEL: "Cerrar",
               PROMPT: "No hay ninguna versión publicada de este archivo que descargar.",
               PROMPT2: "Se pueden publicar versiones desde el editor de Docs."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "No se puede descargar el archivo",
               CANCEL: "Cerrar",
               PROMPT: "No hay ninguna versión publicada de este archivo que descargar.",
               PROMPT2: "Solicite al propietario del archivo que publique una versión de este archivo."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Descargar una versión",
               OK: "Descargar versión",
               PROMPT: {
                  TODAY: "Se ha detectado un borrador más reciente, editado por última vez hoy a las ${time}.",
                  YESTERDAY: "Se ha detectado un borrador más reciente, editado por última vez ayer a las ${time}.",
                  DAY: "Se ha detectado un borrador más reciente, editado por última vez el ${date}.",
                  MONTH: "Se ha detectado un borrador más reciente, editado por última vez el ${date}.",
                  YEAR: "Se ha detectado un borrador más reciente, editado por última vez el ${date_long}."
               },
               PROMPT2: {
                  TODAY: "¿Está seguro de que desea continuar para descargar la versión que se ha publicado hoy a las ${time}?",
                  YESTERDAY: "¿Está seguro de que desea continuar para descargar la versión que se publicó ayer a las ${time}?",
                  DAY: "¿Está seguro de que desea continuar para descargar la versión que se publicó el ${date}?",
                  MONTH: "¿Está seguro de que desea continuar para descargar la versión que se publicó el ${date}?",
                  YEAR: "¿Está seguro de que desea continuar para descargar la versión que se publicó el ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Mostrar panel de detalles",
            HIDE: "Ocultar panel de detalles",
            RESET: "Restablecer tamaño del panel",
            SHOW_A11Y: "Este botón abre y cierra el panel lateral. Actualmente, el panel lateral está cerrado.",
            HIDE_A11Y: "Este botón abre y cierra el panel lateral. Actualmente, el panel lateral está abierto.",
            RESET_A11Y: "Este panel restablece el panel lateral al tamaño predeterminado. Actualmente, el panel lateral está expandido."
         },
         VIEW_DOC: {
            NAME: "Abrir en el visor de Docs",
            TOOLTIP: "Abrir en el visor de Docs",
            A11Y: "Este botón abre el archivo para verlo en una ventana del navegador nueva."
         },
         EDIT_DOC: {
            NAME: "Editar en Docs",
            TOOLTIP: "Utilice HCL Docs para editar este archivo",
            A11Y: "Este botón abre el archivo para editarlo en Docs en una ventana nueva."
         },
         EDIT_OFFICE: {
            TITLE: "Opciones de edición.",
            NAME: "Editar en Microsoft Office Online",
            TOOLTIP: "Utilice Microsoft Office Online para editar este archivo",
            A11Y: "Este botón abre el archivo para editarlo en Microsoft Office Online en una ventana nueva."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Editar en Microsoft Word Online",
           TOOLTIP: "Utilice Microsoft Word Online para editar este archivo",
           A11Y: "Este botón abre el archivo para editarlo en Microsoft Word Online en una ventana nueva."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Editar en Microsoft Excel Online",
             TOOLTIP: "Utilice Microsoft Excel Online para editar este archivo",
             A11Y: "Este botón abre el archivo para editarlo en Microsoft Excel Online en una ventana nueva."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Editar en Microsoft PowerPoint Online",
             TOOLTIP: "Utilice Microsoft PowerPoint Online para editar este archivo",
             A11Y: "Este botón abre el archivo para editarlo en Microsoft PowerPoint Online en una ventana nueva."
         },
         OFFICE_EDITED: {
             SUCCESS: "El archivo se está guardando."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Editar en el escritorio",
            DIALOG_TITLE: "Editar en el escritorio",
            TOOLTIP: "Editar este documento",
            A11Y: "Este botón abre el archivo para editarlo localmente.",
            PROMPT: "Esta característica le permite editar el uso de software instalado en su equipo.",
            INSTALL: "Antes de continuar, ${startLink}instale los conectores de archivo de escritorio${endLink}.", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Importante:",
            REMINDER: "Cuando haya finalizado la edición, publique un borrador utilizando los conectores de archivo de escritorio.",
            SKIP_DIALOG: "No volver a mostrar este mensaje.",
            OK: "Aceptar",
            CANCEL: "Cancelar"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Confirmar",
            DELETE_VERSION: "Suprimir versión ${version}",
            DELETE_VERSION_AND_PRIOR: "Suprimir versión ${version} y todas las versiones anteriores",
            PROMPT: "Está a punto de suprimir la versión ${version}. ¿Desea continuar?",
            DELETE_PRIOR: "Suprimir también todas las versiones anteriores-",
            ERROR: "Se ha producido un error al suprimir la versión. Inténtelo de nuevo más tarde.",
            TOOLTIP: "Suprimir esta versión",
            OK: "Aceptar",
            CANCEL: "Cancelar"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Obtener enlaces",
            LINK_FILE: "Enlace del archivo:",
            LINK_PREVIEW: "Enlace del archivo de vista previa:",
            LINK_DOWNLOAD: "Enlace del archivo de descarga:",
            TOOLTIP: "Enlazar con archivo",
            OK: "Cerrar"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Descargar esta versión"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Confirmar",
            PROMPT: "Está a punto de sustituir la versión actual de este archivo por la versión ${version}. ¿Desea continuar?",
            ERROR: "Se ha producido un error al restaurar la versión. Inténtelo de nuevo más tarde.",
            TOOLTIP: "Restaurar esta versión",
            CHANGE_SUMMARY: "Restaurado desde la versión ${version}",
            OK: "Aceptar",
            CANCEL: "Cancelar"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Confirmar",
            REMOVE_EVERYONE: "¿Está seguro de que desea eliminar el acceso de la organización a este archivo? Si se elimina el acceso, el archivo se elimina de las carpetas y las comunidades que permiten acceso a nivel de organización, y sólo el propietario y las personas con quien se haya compartido lo puedan ver y trabajar con él.",
            REMOVE_USER: "¿Está seguro de que desea dejar de compartir con ${user}? Si deja de compartir, ${user} sólo podrá acceder a este archivo a través de carpetas o si se comparte con todas las personas de su organización.",
            REMOVE_COMMUNITY: "¿Está seguro de que desea eliminar este archivo desde la comunidad ${communityName}?",
            REMOVE_FOLDER: "¿Está seguro de que desea eliminar este archivo desde la carpeta ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Eliminar el acceso de su organización",
            REMOVE_USER_TOOLTIP: "Eliminar todos los elementos compartidos con ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Eliminar de la comunidad ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Eliminar de la carpeta ${folderName}",
            OK: "Aceptar",
            CANCEL: "Cancelar",
            EFSS: {
              DIALOG_TITLE: "Confirmar",
              REMOVE_EVERYONE: "¿Está seguro de que desea eliminar el acceso de la organización a este archivo? Si se elimina el acceso, el archivo se elimina de las carpetas que permiten acceso de nivel de organización y sólo el propietario y las personas con quien se haya compartido lo puedan ver y trabajar con él.",
              REMOVE_USER: "¿Está seguro de que desea dejar de compartir con ${user}? Si deja de compartir, ${user} sólo podrá acceder a este archivo a través de carpetas o si se comparte con todas las personas de su organización.",
              REMOVE_COMMUNITY: "¿Está seguro de que desea eliminar este archivo desde la comunidad ${communityName}?",
              REMOVE_FOLDER: "¿Está seguro de que desea eliminar este archivo desde la carpeta ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Eliminar el acceso de su organización",
              REMOVE_USER_TOOLTIP: "Eliminar todos los elementos compartidos con ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Eliminar de la comunidad ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Eliminar de la carpeta ${folderName}",
              OK: "Aceptar",
              CANCEL: "Cancelar",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Editar este comentario"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Confirmar",
            PROMPT: "¿Está seguro de que desea suprimir este comentario?",
            ERROR: "Se ha producido un error al suprimir el comentario. Inténtelo de nuevo más tarde.",
            TOOLTIP: "Suprimir este comentario",
            OK: "Aceptar",
            CANCEL: "Cancelar"
         },
         LIKE: {
            LIKE: "Marcar archivo como Me gusta",
            UNLIKE: "Desmarcar archivo como Me gusta",
            LIKE_A11Y: "Este botón marca el archivo como Me gusta.",
            UNLIKE_A11Y: "Este botón deja de marcar el archivo como Me gusta.",
            LIKED_SUCCESS: "Le ha gustado este archivo",
            UNLIKE_SUCCESS: "No le ha gustado este archivo"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Editar descripción",
            ERROR: {
               DEFAULT: "No se puede guardar la descripción. Inténtelo de nuevo más tarde.",
               UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar sesión para poder actualizar la descripción.",
               NOT_FOUND: "No se ha podido guardar la descripción porque el archivo se ha suprimido o ya no se comparte con usted.",
               ACCESS_DENIED: "No se ha podido guardar la descripción porque el archivo se ha suprimido o ya no se comparte con usted."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Error al guardar el nombre de archivo",
               CONFLICT: "El nombre de archivo ya existe"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Se ha producido un error al seguir este archivo. Inténtelo de nuevo más tarde.",
                  UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar la sesión para poder seguir este archivo.",
                  NOT_FOUND: "No puede seguir este archivo porque se ha suprimido el archivo o ya no se comparte con el usuario.",
                  ACCESS_DENIED: "No puede seguir este archivo porque se ha suprimido el archivo o ya no se comparte con el usuario."
               },
               UNFOLLOW: {
                  DEFAULT: "Se ha producido un error al dejar de seguir este archivo. Inténtelo de nuevo más tarde.",
                  UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar la sesión para poder dejar de seguir este archivo.",
                  NOT_FOUND: "No puede dejar de seguir este archivo porque se ha suprimido el archivo o ya no se comparte con el usuario.",
                  ACCESS_DENIED: "No puede dejar de seguir este archivo porque se ha suprimido el archivo o ya no se comparte con el usuario."
               }
            },
            FOLLOW_NAME: "Seguir",
            FOLLOW_TOOLTIP: "Seguir este archivo",
            FOLLOW_A11Y: "Este botón sigue a este archivo.",
            FOLLOW_SUCCESS: "A partir de ahora seguirá este archivo.",
            STOP_FOLLOWING_NAME: "Dejar de seguir",
            STOP_FOLLOWING_TOOLTIP: "Dejar de seguir este archivo",
            STOP_FOLLOWING_A11Y: "Este botón deja de seguir el archivo.",
            STOP_FOLLOWING_SUCCESS: "Ha dejado de seguir este archivo."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Añadir a Sincronización",
               TOOLTIP: "Añadir este archivo a sincronización",
               A11Y: "Este botón añade el archivo a sincronización.",
               SUCCESS: "Ha añadido este archivo a sincronización.",
               ERROR: {
                  DEFAULT: "Se ha producido un error al añadir este archivo para su sincronización. Inténtelo de nuevo más tarde.",
                  UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar la sesión para añadir este archivo para su sincronización.",
                  NOT_FOUND: "No puede añadir este archivo para su sincronización porque el archivo se ha suprimido o ya no se comparte con usted.",
                  ACCESS_DENIED: "No puede añadir este archivo para su sincronización porque el archivo se ha suprimido o ya no se comparte con usted."
               }
            },
            STOP_SYNC: {
               NAME: "Eliminar de la Sincronización",
               TOOLTIP: "Eliminar este archivo de la sincronización",
               A11Y: "Este botón elimina el archivo de la sincronización.",
               SUCCESS: "Ha eliminado este archivo de la sincronización.",
               ERROR: {
                  DEFAULT: "Se ha producido un error al eliminar este archivo de la sincronización. Inténtelo de nuevo más tarde.",
                  UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar la sesión para poder eliminar este archivo de la sincronización.",
                  NOT_FOUND: "No puede eliminar este archivo de la sincronización porque el archivo se ha suprimido o ya no se comparte con usted.",
                  ACCESS_DENIED: "No puede eliminar este archivo de la sincronización porque el archivo se ha suprimido o ya no se comparte con usted."
               }
            },
            MYDRIVE: {
                NAME: "Añadir a Mi unidad",
                TOOLTIP: "Añadir este archivo a Mi unidad",
                A11Y: "Este botón añade el archivo a Mi unidad.",
                SUCCESS: "Ha añadido este archivo a Mi unidad.",
                ERROR: {
                   DEFAULT: "Se ha producido un error al añadir este archivo a Mi unidad. Inténtelo de nuevo más tarde.",
                   UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar la sesión para añadir este archivo a Mi unidad.",
                   NOT_FOUND: "No puede añadir este archivo a Mi unidad porque el archivo se ha suprimido o ya no se comparte con usted.",
                   ACCESS_DENIED: "No puede añadir este archivo a Mi unidad porque el archivo se ha suprimido o ya no se comparte con usted."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Eliminar de Mi unidad",
                TOOLTIP: "Eliminar este archivo de Mi unidad",
                A11Y: "Este botón elimina el archivo de Mi unidad.",
                SUCCESS: "Ha eliminado este archivo de Mi unidad.",
                ERROR: {
                   DEFAULT: "Se ha producido un error al eliminar este archivo de Mi unidad. Inténtelo de nuevo más tarde.",
                   UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar la sesión para poder eliminar este archivo de Mi unidad.",
                   NOT_FOUND: "No puede eliminar este archivo de Mi unidad porque el archivo se ha suprimido o ya no se comparte con usted.",
                   ACCESS_DENIED: "No puede eliminar este archivo de Mi unidad porque el archivo se ha suprimido o ya no se comparte con usted."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Marcar",
            FAVORITE_TOOLTIP: "Marcar este archivo",
            FAVORITE_A11Y: "Este botón ancla el archivo.",
            FAVORITE_SUCCESS: "Ha anclado este archivo.",
            STOP_FAVORITEING_NAME: "Desfijar",
            STOP_FAVORITEING_TOOLTIP: "Desanclar este archivo",
            STOP_FAVORITEING_A11Y: "Este botón desancla el archivo.",
            STOP_FAVORITEING_SUCCESS: "Ha desanclado este archivo."
         },
         TRASH: {
            NAME: "Mover a Papelera",
            DIALOG_TITLE: "Confirmar",
            PROMPT: "¿Está seguro de que desea mover este archivo a la papelera? Si se mueve este archivo a la papelera dejará de estar disponible para cualquiera con quien se haya compartido actualmente.",
            ERROR: "Se ha producido un error al suprimir el archivo. Inténtelo de nuevo más tarde.",
            TOOLTIP: "Suprimir este archivo",
            OK: "Aceptar",
            CANCEL: "Cancelar",
            A11Y: "Este botón mueve el archivo a la papelera.",
            SUCCESS_MSG: "${file} se ha movido a la papelera."
         },
         REFRESH: {
            NAME: "Actualizar",
            ERROR: "Se ha producido un error al renovar el Visor de archivos. Inténtelo de nuevo más tarde.",
            TOOLTIP: "Renovar el Visor de archivos",
            INFO_MSG: "Renueve para obtener el contenido más reciente. ${link}",
            A11Y: "Este botón mueve el archivo a la papelera.",
            SUCCESS_MSG: "El Contenido se ha renovado correctamente."
         },
         COPY_FILE: {
            NAME: "Dar copia a la comunidad",
            DIALOG_TITLE: "Confirmar",
            ERROR: "Se ha producido un error al copiar el archivo. Inténtelo de nuevo más tarde.",
            TOOLTIP: "Dar una copia de este archivo a una comunidad",
            OK: "Aceptar",
            CANCEL: "Cancelar",
            A11Y: "Este botón abre un diálogo que le permite proporcionar una copia de este archivo a una comunidad.",
            SUCCESS_MSG: "${file} se ha copiado en ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Transferir propiedad...",
            DIALOG_TITLE: "Transferir propiedad",
            TOOLTIP: "Transferir este archivo a un nuevo propietario",
            A11Y: "Este botón abre un diálogo que le permite transferir este archivo a un nuevo propietario.",
            EMPTY: "Vacío"
         },
         UPLOAD_VERSION: {
            NAME: "Cargar nueva versión",
            NAME_SHORT: "Subir",
            CHANGE_SUMMARY: "Resumen de cambios opcional...",
            TOOLTIP: "Cargar una nueva versión de este archivo",
            A11Y: "Este botón abre un diálogo que le permite cargar una nueva versión de este archivo."
         },
         LOG_IN: {
            NAME: "Iniciar sesión",
            TOOLTIP: "Inicie sesión para actualizar y compartir archivos, comentar y crear carpetas."
         },
         LOCK: {
            NAME: "Bloquear archivo",
            TITLE: "Bloquear este archivo",
            A11Y: "Bloquear este archivo",
            SUCCESS: "El archivo está ahora bloqueado.",
            ERROR: "No se ha podido bloquear el archivo porque se ha suprimido o ya no se comparte con usted."
         },
         UNLOCK: {
            NAME: "Desbloquear archivo",
            TITLE: "Desbloquear este archivo",
            A11Y: "Desbloquear este archivo",
            SUCCESS: "El archivo ya está desbloqueado.",
            ERROR: "No se ha podido desbloquear el archivo porque se ha suprimido o ya no se comparte con usted."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Editar en el escritorio",
            TITLE: "Editar en el escritorio",
            A11Y: "Editar en el escritorio"
         },
         FLAG: {
            FILE: {
               NAME: "Señalar como poco apropiado",
               TITLE: "Señalar archivo",
               A11Y: "Señalar este archivo como poco apropiado",
               PROMPT: "Proporcione una razón para señalar este archivo (opcional):",
               OK: "Distintivo",
               CANCEL: "Cancelar",
               SUCCESS: "El archivo se ha señalado y enviado a revisión.",
               ERROR: "Error al marcar este archivo, vuelva a intentarlo más tarde."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Correcto",
               PROMPT: "El archivo se ha señalado y enviado a revisión.",
               CANCEL: "Aceptar"
            },
            COMMENT: {
               NAME: "Señalar como poco apropiado",
               TITLE: "Señalar comentario",
               A11Y: "Señalar este comentario como poco apropiado",
               PROMPT: "Proporcione una razón para señalar este comentario (opcional):",
               OK: "Distintivo",
               CANCEL: "Cancelar",
               SUCCESS: "El comentario se ha señalado y enviado a revisión.",
               ERROR: "Error al marcar este comentario, vuelva a intentarlo más tarde."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Correcto",
            PROMPT: "Los cambios se han enviado para su revisión. Este archivo no estará disponible hasta que los cambios se aprueben.",
            CANCEL: "Aceptar"
         },
         DROPDOWN_BUTTON: "Botón desplegable"
      },
      SECTION: {
         ABOUT: {
            NAME: "Acerca de este archivo",
            VIEW_FILE_DETAILS: "Ver detalles del archivo",
            A11Y: "Al activar este enlace, se cerrará el visor de archivos y se le dirigirá a la página de detalles de este archivo."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "No hay vista previa disponible para este archivo."
         },
         IMAGE: {
            ZOOM_IN: "Aumenta la visualización",
            ZOOM_OUT: "Reduce la visualización",
            RESET: "Restablecer",
            ZOOM_IN_A11Y: "Este botón acerca la imagen.",
            ZOOM_OUT_A11Y: "Este botón aleja la imagen.",
            RESET_ZOOM_A11Y: "Este botón restablece el nivel de zoom.",
            UNSAFE_PREVIEW: "Este archivo no se puede previsualizar porque no se ha explorado en busca de virus."
         },
         VIEWER: {
            LOADING: "Cargando...",
            PUBLISHING: "Publicando...",
            NO_PUBLISHED_VERSION: "No se encuentra disponible una versión publicada de este archivo para su visualización.",
            IFRAME_TITLE: "Vista previa del archivo",
            AUTOPUBLISH_TIMEOUT: "El servidor está tardando demasiado en responder.  Es posible que los últimos cambios no se hayan publicado."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Este archivo no se puede previsualizar porque no se ha explorado en busca de virus."
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
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - Hoy",
            YESTERDAY: "${time} - Ayer",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Hoy",
            YESTERDAY: "Ayer",
            DAY: "${EEee}",
            MONTH: "${date_long}",
            YEAR: "${date_long}"
         }
      },
      FILE_SIZE: {
         B: "${0} B",
         KB: "${0} KB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Área de texto de comentario",
         SHADOW_TEXT: "Añadir un comentario...",
         CANNOT_ACCESS_CONTENT: "Los siguientes usuarios que ha mencionado no pueden ver el comentario porque no tienen acceso al contenido:",
         ERROR: "Ha ocurrido un error al validar el usuario que intenta mencionar.",
         POST: "Publicar",
         SAVE: "Guardar",
         CANCEL: "Cancelar",
         EXTERNAL_WARNING: "Los comentarios pueden ser vistos por personas externas a su empresa."
      },
      EDIT_BOX: {
         SAVE: "Guardar",
         CANCEL: {
            TOOLTIP: "Cancelar",
            A11Y: "Este botón cancela la acción de edición del nombre de archivo."
         },
         INVALID_CHARACTERS: "Carácter no válido",
         INVALID_CHARACTERS_REMOVED: "Se han eliminado los caracteres no válidos"
      },
      COMMENT_WIDGET: {
         EDITED: "(Editado)",
         EDITED_DATE: {
            TODAY: "Editado hoy a las ${time}",
            YESTERDAY: "Editado ayer a las ${time}",
            DAY: "Editado el ${EEee} a las ${time}",
            MONTH: "Editado el ${date_long}",
            YEAR: "Editado el ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Guardar",
         CANCEL: "Cancelar",
         USER: "Persona",
         COMMUNITY: "Comunidad",
         SHARE: "Compartir",
         SHARE_ALT: "Compartir con esta persona",
         MEMBER_TYPE: "Tipo de miembro",
         PERSON_SHADOW: "Escriba para encontrar a una persona",
         COMMUNITY_SHADOW: "Escriba para encontrar una comunidad",
         PERSON_ARIA: "Escriba para buscar a una persona.  Pulse mayúsculas y tabulador para alternar entre personas, comunidades y todas las personas de la organización.",
         COMMUNITY_ARIA: "Escriba para buscar una comunidad.  Pulse mayúsculas y tabulador para alternar entre personas, comunidades y todas las personas de la organización.",
         PERSON_FULL_SEARCH: "¿La persona no está en la lista? Realice una búsqueda completa...",
         COMMUNITY_FULL_SEARCH: "¿No aparece la comunidad en la lista? Realice una búsqueda completa...",
         ADD_OPTIONAL_MESSAGE: "Añadir un mensaje opcional",
         ROLE_LABEL: "Rol",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Lector"
      },
      FILE_STATE: {
         DOCS_FILE: "Es un archivo Docs. Todas las modificaciones deben realizarse en línea.",
         LOCKED_BY_YOU: {
            TODAY: "Bloqueado por el usuario a las ${time}.",
            YESTERDAY: "Bloqueado ayer por el usuario a las ${time}.",
            DAY: "Bloqueado por el usuario el ${date}.",
            MONTH: "Bloqueado por el usuario el ${date}.",
            YEAR: "Bloqueado por el usuario el ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Bloqueado a las ${time} por ${user}.",
            YESTERDAY: "Bloqueado ayer a las ${time} por ${user}.",
            DAY: "Bloqueado el ${date} por ${user}.",
            MONTH: "Bloqueado el ${date} por ${user}.",
            YEAR: "Bloqueado el ${date_long} por ${user}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Acortar automáticamente este texto",
         COMMENT: {
            WARN_TOO_LONG: "El comentario es demasiado largo.",
            TRIM: "¿Desea acortar el comentario?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "La descripción es demasiado larga.",
            TRIM: "¿Desea acortar la descripción?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "El mensaje es demasiado largo.",
            TRIM: "¿Desea acortar el mensaje?"
         },
         TAG: {
            WARN_TOO_LONG: "La etiqueta es demasiado larga.",
            TRIM: "¿Desea acortar la etiqueta?"
         },
         TAGS: {
            WARN_TOO_LONG: "Una o varias etiquetas son demasiado largas.",
            TRIM: "¿Desea acortar las etiquetas?"
         },
         FILENAME: {
            WARN_TOO_LONG: "El nombre de archivo es demasiado largo"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Este archivo puede ser editado en línea por personas que tengan HCL Docs.",
         NO_ENTITLEMENT_LINK: "Este archivo puede ser editado en línea por personas que tengan ${startLink}HCL Docs${endLink}.", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Este archivo lo está editando en la web ${users}.",
         UNPUBLISHED_CHANGES: "Se han realizado modificaciones en este borrador que no se han publicado como una versión.",
         PUBLISH_A_VERSION: "Publicar una versión",
         PUBLISH_SUCCESS: "Ha publicado correctamente una versión de este archivo",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "La versión no se ha podido publicar debido a que se ha denegado el acceso.",
            NOT_FOUND: "La versión no se ha podido publicar debido a que no se ha encontrado el documento.",
            CANNOT_REACH_REPOSITORY: "La versión no se ha podido publicar debido a que el servidor de Docs no se ha podido conectar al repositorio de archivos.",
            QUOTA_VIOLATION: "La versión no se ha podido publicar debido a restricciones de espacio. Elimine otros archivos para liberar espacio para publicar esta versión.",
            CONVERSION_UNAVAILABLE: "La versión no se ha podido publicar debido a que el servicio de conversión de Docs no está disponible. Inténtelo de nuevo más tarde.",
            TOO_LARGE: "La versión no se ha podido publicar debido a que el documento es demasiado grande.",
            CONVERSION_TIMEOUT: "La versión no se ha podido publicar debido a que el servicio de conversión de Docs está tardando demasiado en convertir el documento. Inténtelo de nuevo más tarde.",
            SERVER_BUSY: "La versión no se ha podido publicar debido a que el servidor de Docs está ocupado. Inténtelo de nuevo más tarde.",
            DEFAULT: "La versión no se ha podido publicar debido a que el servicio de Docs no está disponible. Inténtelo de nuevo más tarde."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Sus modificaciones se están publicando. ${startLink}Actualice para ver los cambios. ${endLink}",
            GENERIC: "Es posible que deba actualizar la página para ver los últimos cambios.  ${startLink}Actualizar${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "No hay comentarios.",
         MODERATED: "El comentario se ha enviado a revisión y estará disponible cuando se apruebe.",
         ERROR: {
            SAVE: {
               DEFAULT: "No se ha podido guardar el comentario. Inténtelo de nuevo más tarde.",
               UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar la sesión para poder guardar su comentario.",
               NOT_FOUND: "No se ha podido guardar el comentario porque el archivo se ha suprimido o ya no se comparte con usted.",
               ACCESS_DENIED: "No se ha podido guardar el comentario porque el archivo se ha suprimido o ya no se comparte con usted."
            },
            DELETE: {
               DEFAULT: "El comentario no se puede suprimir. Inténtelo de nuevo más tarde.",
               UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar la sesión para poder suprimir su comentario.",
               NOT_FOUND: "No se ha podido suprimir el comentario porque el archivo se ha suprimido o ya no se comparte con usted.",
               ACCESS_DENIED: "No se ha podido suprimir el comentario porque el archivo se ha suprimido o ya no se comparte con usted."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Guardar",
         EDIT_TAGS: "Editar etiquetas",
         ERROR: {
            SAVE: {
               DEFAULT: "No se ha podido crear la etiqueta. Inténtelo de nuevo más tarde."
            },
            DELETE: {
               DEFAULT: "No se ha podido suprimir la etiqueta. Inténtelo de nuevo más tarde."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Más información...",
         READ_LESS: "Leer menos..."
      },
      SHARE: {
         EVERYONE: "Todas las personas de mi organización",
         ADD_TOOLTIP: "Guardar",
         ROLES: {
            OWNER: "Propietario",
            EDIT: "Editores",
            VIEW: "Lectores",
            FOLDER: "Compartido con carpetas"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Propietario"
            },
            EDIT: {
               ROLE: "Editar",
               ADD: "Añadir editor"
            },
            VIEW: {
               ROLE: "Lector",
               ADD: "Añadir lector"
            },
            FOLDER: {
               ADD: "Añadir carpetas",
               COMMUNITY_ADD: "Añadir a carpeta",
               MOVE: "Mover a una carpeta"
            },
            MULTI: {
               ADD: "Añadir personas o comunidades",
               ADD_PEOPLE: "Añadir personas"
            }
         },
         PUBLIC: {
            SHORT: "Todas las personas de mi organización",
            LONG: {
               GENERIC: "Todas las personas de su organización",
               ORG: "Todas las personas de ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Este archivo ya está compartido con ${user}.",
            ERROR: "No se puede compartir con ${user} en este momento.",
            SELF: "No puede compartir consigo mismo."
         },
         SHARE_INFO: {
            PROMOTED: "${user} ha ascendido a un rol de compartición superior."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Se ha compartido correctamente con ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "El archivo se ha compartido satisfactoriamente."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Mensaje opcional..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Suministro de usuario externo",
               ACTION: "Suministro de usuario externo...",
               TOOLTIP: "Suministro de usuario externo",
               DIALOG_TITLE: "El contenido no se compartía",
               PROMPT: {
                  NO_ACCOUNT: "El usuario siguiente no tiene una cuenta y no se ha compartido con él ningún contenido.",
                  INVITE: "Invite a este usuario como invitado para compartir el contenido con él."
               },
               SUBMIT: "Continuar con invitación",
               CANCEL: "Cancelar",
               ERROR: "Se ha producido un error al suministrar la cuenta. Inténtelo de nuevo más tarde.",
               SUCCESS: "Cuenta de usuario suministrada correctamente."
            },
            PLURAL: {
               NAME: "Suministro de usuarios externos",
               ACTION: "Suministro de usuarios externos...",
               TOOLTIP: "Suministro de usuarios externos",
               DIALOG_TITLE: "El contenido no se compartía",
               PROMPT: {
                  NO_ACCOUNT: "Los usuarios siguientes no tienen una cuenta y no se ha compartido contenido con ellos.",
                  INVITE: "Invite a estos usuarios como invitados para compartir el contenido con ellos."
               },
               SUBMIT: "Continuar con las invitaciones",
               CANCEL: "Cancelar",
               ERROR: "Se ha producido un error al suministrar las cuentas. Inténtelo de nuevo más tarde.",
               SUCCESS: "Se han suministrado correctamente las cuentas de usuario."
            },
            ABSTRACT: {
               NAME: "Suministro de usuarios externos",
               ACTION: "Suministro de usuarios externos...",
               TOOLTIP: "Suministro de usuarios externos",
               DIALOG_TITLE: "El contenido no se compartía",
               PROMPT: {
                  NO_ACCOUNT: "Algunos usuarios no tienen cuentas y no se ha compartido contenido con ellos.",
                  INVITE: "Invite a estos usuarios como invitados para compartir el contenido con ellos."
               },
               SUBMIT: "Continuar con las invitaciones",
               CANCEL: "Cancelar",
               ERROR: "Se ha producido un error al suministrar las cuentas. Inténtelo de nuevo más tarde.",
               SUCCESS: "Se han suministrado correctamente las cuentas de usuario."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Opciones para compartir",
         PROPAGATION: "Permitir que otros compartan este archivo",
         EVERYONE: "Todo el mundo puede compartir este archivo.",
         OWNER_ONLY: "Sólo el propietario puede compartir este archivo.",
         STOP_SHARE: "Dejar de compartir",
         MAKE_INTERNAL: "Dejar de compartir externamente",
         MAKE_INTERNAL_SUCCESS: "Este archivo ya no se puede compartir con otras personas fuera de la empresa.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "¿Hacer interno?",
            PROMPT: "Si convierte este archivo en interno, no podrá compartirse con otras personas fuera de la empresa. ${br}${br}" +
            "Los elementos compartidos con personas, comunidades o carpetas externas se eliminarán.${br}${br}La conversión de un archivo en interno es permanente y no se puede deshacer.",
            EFSS: {
               DIALOG_TITLE: "¿Hacer interno?",
               PROMPT: "Si convierte este archivo en interno, no podrá compartirse con otras personas fuera de la empresa. ${br}${br}" +
               "Los elementos compartidos con personas o carpetas externas se eliminarán.${br}${br}La conversión de un archivo en interno es permanente y no se puede deshacer."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Dejar de compartir archivos",
            PROMPT: "¿Está seguro de que desea dejar de compartir este archivo?",
            QUESTION_PUBLIC: "Este archivo dejará de ser visible para todas las personas de la organización y no se compartirá con otras personas, carpetas o comunidades. Esta operación no se puede deshacer.",
            QUESTION_PUBLIC_E: "Este archivo dejará de ser visible para todas las personas de la organización y no se compartirá con otras personas ni carpetas. Esta operación no se puede deshacer.",
            QUESTION: "El archivo ya no se compartirá con otras personas o comunidades, y se eliminará de todas las carpetas excepto de las carpetas privadas. No podrá deshacer esta acción.",
            QUESTION_E: "El archivo ya no se compartirá con otras personas, y se eliminará de todas las carpetas excepto de las carpetas privadas. No podrá deshacer esta acción."
         },
         MAKE_PRIVATE_SUCCESS: "Este archivo ahora es privado.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "No se ha podido dejar de compartir el archivo. Inténtelo de nuevo más tarde."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Mis elementos compartidos"
      },
      STREAM: {
         LOADING: "Cargando...",
         LOAD_MORE: "Cargar más..."
      },
      ENTRY: {
         REMOVE: "Suprimir",
         RESTORE: "Restaurar",
         EDIT: "Editar",
         DELETE: "Suprimir",
         OK: "Aceptar",
         CANCEL: "Cancelar",
         USER_PICTURE: "Imagen de ${0}",
         FLAG: "Señalar como poco apropiado"
      },
      PANEL: {
         LOAD_ERROR: "Se ha producido un error al acceder a los metadatos de este archivo.",
         ABOUT: {
            TITLE: "Acerca de",
            EXPAND_BUTTON: "Expanda este botón para ver más información",
            CURRENT_VERSION_HEADER: "Versión actual ${versionNumber}",
            FILE_SIZE_HEADER: "Tamaño de archivo",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Versión actual",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Todas las versiones",
            DOCS_DRAFT_UPDATED_HEADER: "Borrador editado",
            DOCS_DRAFT_CREATED_HEADER: "Borrador creado",
            DOCS_UPDATED_HEADER: "Publicada",
            DOCS_CREATED_HEADER: "Creada",
            UPDATED_HEADER: "Actualizada",
            CREATED_HEADER: "Creada",
            LIKES_HEADER: "Me gusta",
            LIKES_EXPAND_ICON: "Expanda este icono para ver a quién le ha gustado el archivo",
            DOWNLOADS_HEADER: "Visualizaciones",
            DOWNLOADS_HEADER_MORE: "Vistas (${0})",
            DOWNLOADS_EXPAND_ICON: "Expanda este icono para ver quién ha visualizado el archivo",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anónimamente",
            DOWNLOADS_LATEST_VERSION: "Tiene la última versión de este archivo",
            DOWNLOADS_LAST_VERSION: "Ha visualizado la última versión ${0} de este archivo",
            TAGS_HEADER: "Etiquetas",
            DESCRIPTION_HEADER: "Descripción",
            DESCRIPTION_READ_MORE: "Más información...",
            LINKS_HEADER: "Enlaces",
            SECURITY: "Seguridad",
            FILE_ENCRYPTED: "El contenido del archivo está cifrado. El contenido de archivo cifrado no se puede buscar. El contenido del archivo no puede visualizarse ni editarse con HCL Docs.",
            GET_LINKS: "Obtener enlaces...",
            ADD_DESCRIPTION: "Añadir una descripción",
            NO_DESCRIPTION: "Sin descripción",
            ADD_TAGS: "Añadir etiquetas",
            NO_TAGS: "Sin etiquetas"
         },
         COMMENTS: {
            TITLE: "Comentarios",
            TITLE_WITH_COUNT: "Comentarios (${0})",
            VERSION: "Versión ${0}",
            FEED_LINK: "Canal de información para estos comentarios",
            FEED_TITLE: "Siga los cambios en estos comentarios mediante el lector de canales de información"
         },
         SHARING: {
            TITLE: "Uso compartido",
            TITLE_WITH_COUNT: "Compartido (${0})",
            SHARED_WITH_FOLDERS: "Compartido con carpetas - ${count}",
            SEE_WHO_HAS_SHARED: "Ver quién lo ha compartido",
            COMMUNITY_FILE: "Los archivos propiedad de una comunidad no se pueden compartir con personas u otras comunidades.",
            SHARED_WITH_COMMUNITY: "Compartido con miembros de la comunidad '${0}'",
            LOGIN: "Iniciar sesión",
            NO_SHARE: "Este archivo aún no se ha añadido a ninguna carpeta.",
            ONE_SHARE: "Este archivo se encuentra en una carpeta o comunidad a la que no tiene acceso.",
            MULTIPLE_SHARE: "Este archivo se encuentra en ${fileNumber} carpetas o comunidades a las que no tiene acceso."
         },
         VERSIONS: {
            TITLE: "Versiones",
            TITLE_WITH_COUNT: "Versiones (${0})",
            FEED_LINK: "Canal de información para estas versiones",
            FEED_TITLE: "Siga los cambios realizados en este archivo con el lector de canales de información"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Confirmación de acción",
         DIALOG_TITLE: "Confirmar",
         PROMPT: "¿Está seguro de que desea realizar esta acción?",
         ERROR: "Se ha producido un error al realizar la acción. Inténtelo de nuevo más tarde.",
         TOOLTIP: "Realizar acción",
         OK: "Aceptar",
         CANCEL: "Cancelar",
         A11Y: "Este botón realiza la acción actual."
      },
      THUMBNAIL: {
         TITLE: "Miniatura",
         CHANGE_LINK: "Cambiar miniatura...",
         ERROR: "La miniatura no se ha podido guardar. Inténtelo de nuevo más tarde.",
         EXT_ERROR: "Seleccione un archivo con una de las extensiones soportadas siguientes: ${0}",
         SUCCESS: "La miniatura ha cambiado",
         UPLOAD: "Guardar",
         CANCEL: "Cancelar"
      },
      UPLOAD_VERSION: {
         LINK: "Cargar nueva versión...",
         CHANGE_SUMMARY: "Resumen de cambios opcional...",
         ERROR: "La versión más reciente no se ha podido guardar. Inténtelo de nuevo más tarde.",
         SUCCESS: "La versión más reciente se ha guardado",
         UPLOAD: "Subir",
         UPLOAD_AND_CHANGE_EXTENSION: "Cargar y cambiar extensión",
         CANCEL: "Cancelar",
         TOO_LARGE: "${file} es más grande que el tamaño de archivo ${size} permitido.",
         PROGRESS_BAR_TITLE: "Cargando nueva versión (${uploaded} de ${total} completado)",
         CANCEL_UPLOAD: "Cancelar carga"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Se ha producido un error al acceder al archivo. Inténtelo de nuevo más tarde.",
         UNAUTHENTICATED: "Su sesión ha excedido el tiempo de espera. Debe volver a iniciar sesión para poder ver el archivo.",
         NOT_FOUND: "El archivo que ha solicitado se ha suprimido o movido. Si alguien le ha enviado este enlace, compruebe que es correcto.",
         ACCESS_DENIED: "No tiene permiso para ver este archivo. El archivo no está compartido con usted.",
         ACCESS_DENIED_ANON: "No tiene permiso para ver este archivo. Si este es su archivo o si alguien la ha compartido con usted, debe iniciar sesión en primer lugar."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Error",
         PROMPT: "El archivo que ha solicitado se ha suprimido o movido.",
         CANCEL: "Aceptar"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Confirmar",
        PROMPT: "Su sesión de HCL Connections ha agotado el tiempo de espera.${lineBreaks}Pulse Aceptar para volver a iniciar la sesión o Cancelar para cerrar este diálogo.",
        OK: "Aceptar",
        CANCEL: "Cancelar"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "No se puede acceder al enlace",
        PROMPT: "Se ha producido un error al acceder al enlace.${lineBreaks}Pulse Aceptar para ser redirigido a la página.",
        OK: "Aceptar",
        CANCEL: "Cancelar"
      },
      LOAD_ERROR: {
         DEFAULT: "Lo sentimos. Se ha producido un error al acceder al enlace.",
         ACCESS_DENIED: "Póngase en contacto con el propietario del archivo para solicitar permiso para visualizar este archivo."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Archivo",
         LOAD_ERROR: "Error al acceder al archivo"
      },
      SHARE_WITH_LINK: {
         TITLE: "Compartir mediante un enlace",
         EMPTY_DESCRIPTION: "No ha creado ningún enlace para este archivo todavía. Cree un enlace compartido para enviar a otros de forma que puedan previsualizar y descargar el archivo.",
         CREATE_LINK: "Crear un enlace",
         COPY_LINK: "Copiar enlace",
         DELETE_LINK: "Suprimir enlace",
         ACCESS_TYPE_1: "Cualquiera que tenga el enlace puede visualizar este archivo",
         ACCESS_TYPE_2: "Las personas de mi organización pueden visualizar este archivo",
         ACCESS_TYPE_1_DESCRIPTION: "Las personas que obtengan el enlace podrán previsualizar y descargar el archivo después de iniciar sesión en Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Las personas de mi organización que obtengan el enlace podrán previsualizar y descargar el archivo después de iniciar sesión en Connections.",
         CHANGE_TYPE_SUCCESS: "Los permisos del enlace se actualizan cuando cambia el tipo de acceso.",
         CHANGE_TYPE_ERROR: "La actualización de los permisos del enlace ha fallado al cambiar el tipo de acceso.",
         COPY_LINK_SUCCESS: "Enlace copiado en el portapapeles",
         CREATE_SHARELINK_SUCCESS:"El enlace se ha creado satisfactoriamente.",
         CREATE_SHARELINK_ERROR:"No se ha podido crear ningún enlace debido a un error.",
         DELETE_SHARELINK_SUCCESS: "Suprima el enlace compartido para \"${file}.\"",
         DELETE_SHARELINK_ERROR: "El enlace compartido no se ha suprimido. Inténtelo de nuevo más tarde.",
         CONFIRM_DIALOG: {
            OK: "Suprimir",
            DIALOG_TITLE: "Suprimir el enlace compartido",
            PROMPT: "Este archivo quedará inaccesible para cualquiera que tenga el enlace. ¿Está seguro de que desea suprimir el enlace compartido?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "El enlace compartido está activo. Cualquiera que tenga el enlace puede visualizar este archivo. Pulse para copiar el enlace.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "El enlace compartido está activo. Las personas de mi organización pueden visualizar el archivo. Pulse para copiar el enlace."
      }
});

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
		         label: "Más",
		         tooltip: "Más acciones"
		       },
		       tags_more: "y ${0} más",
		       ERROR_ALT: "Error",
		       PERSON_TITLE: "Abrir el perfil de ${user}.",
		       inactiveUser: "${user} (inactivo)",
		       inactiveIndicator: "(inactivo)",
		       like_error: "No se ha podido guardar el me gusta. Inténtelo de nuevo más tarde.",
		       vote_error: "Su voto no se ha podido guardar. Inténtelo de nuevo más tarde."
		   },
		   generic: {
		      untitled: "(Sin título)",
		      tags: "Etiquetas:",
		      tags_more: "y ${0} más",
		      likes: "Número de me gusta",
		      comments: "Comentarios",
		      titleTooltip: "Navegar a ${app}",
		      error: "No se pueden recuperar los datos.",
		      timestamp: {
		         created: {
		            DAY: "Creado el ${EEEE} a las ${time}",
		            MONTH: "Creado el ${MMM} ${d}",
		            TODAY: "Creado hoy a las ${time}",
		            YEAR: "Creado el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creado ayer a las ${time}",
		            TOMORROW: "Creado el ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Actualizado ${EEEE} a las ${time}",
		            MONTH: "Actualizado el ${MMM} ${d}",
		            TODAY: "Actualizado hoy a las ${time}",
		            YEAR: "Actualizado el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Actualizado ayer a las ${time}",
		            TOMORROW: "Actualizado el ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Público",
		         priv: "Privado"
		      },
		      action: {
		         created: "Creada",
		         updated: "Actualizada"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Recibir actualizaciones sobre personas a las que siga en la Página de inicio y en un resumen por correo electrónico.",
		      profile_title: "Abrir el perfil de ${user}.",
		      profile_a11y: "La activación de este enlace abrirá el perfil de ${user} en una nueva ventana.",
		      error: "Se ha producido un error.  ${again}.",
		      error_again: "Inténtelo de nuevo.",
		      error_404: "La solicitud de red ya no existe.",
		      warning: "Aviso",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Ahora son contactos de red.",
		            	follow: "Ahora son contactos de red seguidores de ${user}."
		            },
		            ignore: {
		            	nofollow: "Ha omitido la invitación.",
		            	follow: "Ha omitido la invitación, pero está siguiendo a ${user}."
		            }
		         },
		         error: {
		            accept: "Se ha producido un error al aceptar la solicitud.",
		            ignore: "Se ha producido un error al ignorar la solicitud."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} a las ${time}",
		              MONTH: "${d} de ${MMM}",
		              TODAY: "Hoy a las ${time}",
		              YEAR: "${d} de ${MMM} de ${YYYY}",
		              YESTERDAY: "Ayer a las ${time}",
		              TOMORROW: "${d} de ${MMM} de ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "La activación de este enlace abrirá ${name} en una ventana nueva.",
		      tooltip: "Abra ${name} en la aplicación Archivos",
		      profile_title: "Abrir el perfil de ${user}.",
		      profile_a11y: "La activación de este enlace abrirá el perfil de ${user} en una nueva ventana.",
		      download_tooltip: "Descargue este archivo (${0})",
		      following: {
		         add: "Seguir archivo",
		         remove: "Dejar de seguir",
		         title: "Cambiar si recibirá actualizaciones sobre este archivo"
		      },
		      share: {
		         label: "Compartir",
		         title: "Otorgar acceso a otros a este archivo"
		      },
		      timestamp: {
		         created: {
		            DAY: "Creado el ${EEEE} a las ${time}",
		            MONTH: "Creado el ${MMM} ${d}",
		            TODAY: "Creado hoy a las ${time}",
		            YEAR: "Creado el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creado ayer a las ${time}",
		            TOMORROW: "Creado el ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} creado el ${EEEE} a las ${time}",
		            MONTH: "${user} creado el ${MMM} ${d}",
		            TODAY: "${user} creado hoy a las ${time}",
		            YEAR: "${user} creado el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} creó ayer a las ${time}",
		            TOMORROW: "${user} creado el ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Actualizado ${EEEE} a las ${time}",
		            MONTH: "Actualizado el ${MMM} ${d}",
		            TODAY: "Actualizado hoy a las ${time}",
		            YEAR: "Actualizado el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Actualizado ayer a las ${time}",
		            TOMORROW: "Actualizado el ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} actualizado el ${EEEE} a las ${time}",
		            MONTH: "${user} actualizó el ${MMM} ${d}",
		            TODAY: "${user} actualizado hoy a las ${time}",
		            YEAR: "${user} actualizado el ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} actualizado ayer a las ${time}",
		            TOMORROW: "${user} actualizado el ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Creado: ${EEEE} a las ${time}",
		            MONTH: "Creado: ${MMM} ${d}",
		            TODAY: "Creado: hoy a las ${time}",
		            YEAR: "Creado: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Creado: ayer a las ${time}",
		            TOMORROW: "Creado: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Actualizado: ${EEEE} a las ${time}",
		            MONTH: "Actualizado: ${MMM} ${d}",
		            TODAY: "Actualizado: hoy a las ${time}",
		            YEAR: "Actualizado: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Actualizado: ayer a las ${time}",
		            TOMORROW: "Actualizado: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} por ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} por ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Descargue este archivo (${size})",
		      	 DOWNLOAD_ALT: "Descargar"
		      },
		      PREVIEW: {
		         LINK: "Vista previa",
		         TITLE: "Previsualizar este archivo en una nueva ventana."
		      },
		      TAGS: "Etiquetas:",
		      error: "Se ha producido un error.  ${again}.",
		      error_again: "Inténtelo de nuevo.",
		      error_404: "El archivo ya no existe o no tiene permisos suficientes para acceder a él.",
		      error_403: "No tiene permiso para ver este archivo. El archivo no es público y no está compartido con usted.",
		      notifications: {
		         USER_SHARED: "${user} ha escrito:",
		         CHANGE_SUMMARY: "${user} ha proporcionado un resumen de cambios",
		         NO_CHANGE_SUMMARY: "${user} no ha proporcionado un resumen de cambios",
		         COMMENTED: "${user} ha hecho un comentario"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Extraído por usted",
		      checkedout_other: "Extraído por ${user}",
		      tooltip: "Abrir el archivo ${name} en la biblioteca",
		      draft_404_info: "El borrador se ha suprimido o ya no se comparte con usted. La versión publicada es la última versión de este archivo.",
		      error_404: "El archivo se ha suprimido o ya no se comparte con usted.",
		      error_403: "El archivo se ha suprimido o ya no se comparte con usted.",
		      error_preview: "Este archivo ya no está disponible para visualización previa.",
		      draft_review_canceled: "La revisión se ha cancelado y el borrador ya no se comparte con usted. Su revisión ya no se solicita.",
		      switch_ee: "Ver borrador",
		      switch_ee_tooltip: "Ver el último borrador de este archivo"
		   },
		   ecm_draft: {
		      tooltip: "Abra el borrador ${name} en la biblioteca",
		      community_owners: "Propietarios de comunidad",
		      draft: "Borrador",
		      draft_tooltip: "Visualizando borrador",
		      draft_general_info: "El borrador anterior ya no existe y un nuevo borrador es ahora la última versión.",
		      draft_review_404_general_info: "Uno de los revisores ya ha votado. Ya no se le solicita que revise este borrador.",
		      draft_review_404_request_info: "El borrador anterior ya no existe y el último borrador se ha enviado para su revisión. Su revisión se solicita.",
		      draft_review_404_require_info: "El borrador anterior ya no existe y el último borrador se ha enviado para su revisión. Su revisión es necesaria.",
		      draft_review_request_info: "Su revisión se solicita.",
		      draft_review_require_info: "Su revisión es necesaria.",
		      error_404: "El borrador se ha suprimido o ya no se comparte con usted.",
		      error_403: "No puede ver este borrador porque no se comparte con usted.",
		      error_preview: "Este borrador ya no está disponible para visualización previa.",
		      switch_ee: "Ver versión publicada",
		      switch_ee_tooltip: "Ver la versión publicada de este archivo",
		      review: "Revisar",
		      reviewers: "Revisores",
		      reviwers_addtl: "Revisores adicionales",
		      in_review: "Borrador en revisión",
		      in_review_tooltip: "Visualización del borrador en revisión",
		      review_required_any: "Los propietarios de la comunidad precisan que un revisor revise este borrador.",
		      review_required_all: "Los propietarios de la comunidad precisan que todos los revisores revisen este borrador.",
		      review_required_generic: "Los propietarios de la comunidad precisan que estos los revisores revisen este borrador.",
		      review_additional_required: "Es necesario que todos los revisores añadidos por el presentador del borrador revisen este borrador.",
		      reivew_submitted_date: {
		         DAY: "${user} ha enviado el borrador para su revisión en ${EEEE} a las ${time}.",
		         MONTH: "${user} ha enviado el borrador para su revisión en ${MMM} ${d}.",
		         TODAY: "${user} ha enviado el borrador para su revisión hoy a las ${time}.",
		         YEAR: "${user} ha enviado el borrador para su revisión en ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} envió el borrador para su revisión ayer a las ${time}.",
		         TOMORROW: "${user} ha enviado el borrador para su revisión en ${MMM} ${d}, ${YYYY}."
		      },
		      pending: "Pendiente",
		      pending_rejected: "Ya no es necesaria la revisión porque se ha rechazado el borrador",
		      approve: "Aprobar",
		      approved: "Aprobado",
		      approve_tooltip: "Aprobar este borrador",
		      accept_success: "Ha aprobado este borrador.",
		      accept_error: "Se ha producido un error al aprobar este borrador. Inténtelo de nuevo.",
		      accept_info: "Ha aprobado este borrador.",
		      reject: "Rechazar",
		      rejected: "Rechazado",
		      reject_tooltip: "Rechazar este borrador",
		      reject_success: "Ha rechazado este borrador.",
		      reject_error: "Se ha producido un error al rechazar este borrador. Inténtelo de nuevo.",
		      reject_info: "Ha rechazado este borrador."
		   },
		   authUser: {
		      error: "Se ha producido un error al recuperar al usuario actual.  ${again}.",
		      error_again: "Inténtelo de nuevo.",
		      error_404: "No se encuentra el usuario autenticado.",
		      error_403: "No tiene permiso para recuperar la información de usuario."
		   },
		   forum: {
		      error: "Se ha producido un error.  ${again}.",
		      error_again: "Inténtelo de nuevo.",
		      error_404: "El foro ya no existe, o no tiene los permisos suficientes para acceder a él.",
		      error_403: "No tiene permiso para ver este foro. El foro no es público y no se comparte con usted.",
		      readMore: "Ver tema completo...",
		      readMore_tooltip: "Abrir el tema del foro ${name}.",
		      readMore_a11y: "Al activar este enlace se abrirá el tema del foro de ${name} en una ventana nueva.",
		      QUESTION_ANSWERED: "Esta pregunta se ha respondido.",
		      QUESTION_NOT_ANSWERED: "Esta pregunta no se ha respondido aún.",
		      attachments: "${count} archivos adjuntos",
		      attachments_one: "${count} archivos adjuntos"
		   },
		   blog: {
		      error: "Se ha producido un error.  ${again}.",
		      error_again: "Inténtelo de nuevo.",
		      error_404: "El blog ya no existe o no tiene permisos suficientes para acceder a él.",
		      error_403: "No tiene permiso para ver este blog. El blog no es público y no se comparte con usted.",
		      readMore: " Leer más...",
		      readMore_tooltip: "Abra la entrada de blog de ${name}.",
		      readMore_a11y: "Al activar este enlace se abrirá la entrada de blog de ${name} en una nueva ventana.",
		      graduated: "Graduada",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Voto</a>",
		  					TOOLTIP: 	"Votar por esto"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Votado</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Votado</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Deshacer</a>",
		  					TOOLTIP: 	"Suprimir su voto de esto"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 personas han votado por esto"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 persona ha votado esto"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} ha votado esto"
		  				}
		  			},
		  			LOADING: "Cargando...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Votado"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "No se ha podido guardar su voto porque ha alcanzado el límite de voto o la idea ha dejado de estar disponible.",
		      readMore_tooltip: "Abrir la idea de ${name}.",
		      readMore_a11y: "Al activar este enlace, se abrirá la idea de ${name} en una nueva ventana."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Respuestas",
		      THIS_ARIA_LABEL: "Esta respuesta",
		      THIS_TAB_TITLE: "Esta respuesta",
		      TAB_TITLE: "Respuestas (${0})",
		      REPLY_TO_REPLY: "En respuesta a ${thisReply}",
		      REPLY_TO_TOPIC: "En respuesta a ${thisTopic}",
		      THIS_TOPIC: "este tema",
		      THIS_REPLY: "esta respuesta",
		      NAVIGATE_TO_REPLY: "Navegar a la respuesta padre",
		      NAVIGATE_TO_TOPIC: "Navegar al tema padre",
		      ADD_COMMENT: "Responder a este tema",
		      ADD_COMMENT_TOOLTIP: "Responder a este tema de foro",
		      SHOWING_RECENT_REPLIES: "Mostrando ${0} respuestas más recientes",
		      PREV_COMMENTS: "Mostrar más respuestas",
		      PLACEHOLDER_TXT: "Responder a este tema",
		      EMPTY: "No hay respuestas.",
		      TRIM_LONG_COMMENT: "¿Desea acortar la respuesta?",
		      WARN_LONG_COMMENT: "La respuesta es demasiado larga.  ${shorten}",
		      ERROR: "Se ha producido un error al recuperar las respuestas. ${again}",
		      ERROR_CREATE: "No se ha podido guardar la respuesta.  Inténtelo más adelante.",
		      ERROR_CREATE_NOT_FOUND: "No se ha podido guardar la respuesta porque el tema se ha suprimido o porque ya no lo puede ver.",
		      ERROR_CREATE_ACCESS_DENIED: "No se ha podido guardar la respuesta porque el tema se ha suprimido o porque ya no lo puede ver.",
		      ERROR_CREATE_TIMEOUT: "No se ha podido guardar la respuesta porque no se ha podido establecer contacto con el servidor.  Pulse 'Guardar' para intentarlo de nuevo.",
		      ERROR_CREATE_CANCEL: "No se ha podido guardar la respuesta porque se ha cancelado la solicitud.  Pulse 'Guardar' para intentarlo de nuevo.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Debe haber iniciado sesión para crear esta respuesta.  Pulse 'Guardar' para que se le solicite que inicie sesión.",
		      ERROR_NO_CONTENT: "Especifique su respuesta y pulse 'Guardar'.  Si ya no desea dejar una respuesta, pulse 'Cancelar'.",
		      ERROR_UNAUTHORIZED: "No se ha podido guardar su respuesta porque no está autorizado a dejar respuestas.",
		      COMMENT_DELETED: {
		         DAY: "Respuesta suprimida por ${user} el ${EEEE} a las ${time}",
		         MONTH: "Respuesta suprimida por ${user} el ${d} ${MMM}",
		         TODAY: "Respuesta suprimida por ${user} hoy a las ${time}",
		         YEAR: "Respuesta suprimida por ${user} el ${d} ${MMM}, ${YYYY}",
		         YESTERDAY: "Respuesta suprimida por ${user} ayer a las ${time}",
		         TOMORROW: "Respuesta suprimida por ${user} el ${d} ${MMM}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Motivo de la supresión: ${reason}",
		      REPLY_TITLE: "Re: ${0}",
		      SHOW_FULL_REPLY: "Ver respuesta completa",
		      SHOW_FULL_REPLY_TOOLTIP: "Vaya a la respuesta original en el tema del foro",
		      REPLY_ACTION: "Responder",
		      REPLY_ACTION_TOOLTIP: "Responder a esta anotación",
		      MODERATION_PENDING: "Esta respuesta está pendiente de revisión.",
		      MODERATION_QUARANTINED: "La publicación ha sido rechazada por el moderador.",
		      MODERATION_REMOVED: {
		         DAY: "${user} eliminó esta respuesta el ${EEEE} a las ${time}.",
		         MONTH: "${user} eliminó esta respuesta el ${d} ${MMM}.",
		         TODAY: "${user} eliminó esta respuesta hoy a las ${time}.",
		         YEAR: "${user} eliminó esta respuesta el ${d} ${MMM}, ${YYYY}.",
		         YESTERDAY: "${user} eliminó esta respuesta ayer a las ${time}.",
		         TOMORROW: "${user} eliminó esta respuesta el ${d} ${MMM}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "${user} rechazó esta respuesta el ${EEEE} a las ${time}.",
		         MONTH: "${user} rechazó esta respuesta el ${d} ${MMM}.",
		         TODAY: "${user} rechazó esta respuesta a las ${time}.",
		         YEAR: "${user} rechazó esta respuesta el ${d} ${MMM}, ${YYYY}.",
		         YESTERDAY: "${user} rechazó esta respuesta ayer a las ${time}.",
		         TOMORROW: "${user} rechazó esta respuesta el ${d} ${MMM}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Su respuesta se ha enviado para revisión y estará disponible cuando se apruebe."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Comentarios",
		      PLACEHOLDER_TXT: "Añadir un comentario",
		      TAB_TITLE: "Comentarios (${0})",
		      ACTION_NOT_SUPPORTED: "Acción no soportada",
		      ADD_COMMENT: "Añadir un comentario",
		      ADD_COMMENT_TOOLTIP: "Añadir un comentario a este elemento",
		      CANCEL: "Cancelar",
		      COMMENT_COUNT_ONE: "${0} comentario",
		      COMMENT_COUNT_MANY: "${0} comentarios",
		      COMMENT_LABEL: "Comentario:",
		      DELETE: "Suprimir",
		      DELETE_TOOLTIP: "Suprimir comentario",
		      DELETEREASON: "Razón para suprimir este comentario:",
		      DIALOG_TITLE: "Comentario abreviado",
		      TOOLTIP: "Comentario abreviado",
		      NAME: "Comentario abreviado",
		      EDIT: "Editar",
		      EDIT_TOOLTIP: "Editar comentario",
		      ERROR_CREATE: "No se ha podido guardar el comentario.  Inténtelo más adelante.",
		      ERROR_CREATE_NOT_FOUND: "No se ha podido guardar el comentario porque el elemento se ha suprimido o usted ya no puede verlo.",
		      ERROR_CREATE_ACCESS_DENIED: "No se ha podido guardar el comentario porque el elemento se ha suprimido o usted ya no puede verlo.",
		      ERROR_CREATE_TIMEOUT: "No se ha podido guardar el comentario porque no se ha podido contactar con el servidor.  Pulse 'Publicar' para intentarlo de nuevo.",
		      ERROR_CREATE_CANCEL: "El comentario no se ha podido guardar porque se ha cancelado la solicitud.  Pulse 'Publicar' para intentarlo de nuevo.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Debe haber iniciado sesión para crear este comentario.  Pulse 'Publicar' para que se le solicite que inicie sesión.",
		      ERROR_DELETE: "El comentario no se puede suprimir.  Inténtelo más adelante.",
		      ERROR_DELETE_TIMEOUT: "El comentario no se ha suprimido porque no se ha podido establecer contacto con el servidor.  Pulse 'Suprimir' para intentarlo de nuevo.",
		      ERROR_DELETE_NOT_FOUND: "No se ha podido suprimir el comentario porque el comentario o elemento se ha suprimido o ya no lo puede ver.",
		      ERROR_DELETE_ACCESS_DENIED: "No se ha podido suprimir el comentario porque el elemento se ha suprimido o ya no se ve.",
		      ERROR_DELETE_CANCEL: "El comentario no se ha podido suprimir porque se ha cancelado la solicitud.  Pulse 'Suprimir' para intentarlo de nuevo.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Debe haber iniciado sesión para suprimir este comentario.  Pulse 'Suprimir' para que se le solicite que inicie sesión.",
		      ERROR_EDIT: "El comentario no se ha podido actualizar.  Inténtelo más adelante.",
		      ERROR_EDIT_ACCESS_DENIED: "No se ha podido actualizar el comentario porque el elemento se ha suprimido o ya no se ve.",
		      ERROR_EDIT_NOT_FOUND: "No se ha podido actualizar el comentario porque el elemento se ha suprimido o ya no se ve.",
		      ERROR_EDIT_TIMEOUT: "No se ha podido actualizar su comentario porque no se ha podido contactar con el servidor.  Pulse 'Publicar' para intentarlo de nuevo.",
		      ERROR_EDIT_CANCEL: "El comentario no se ha podido actualizar porque se ha cancelado la solicitud.  Pulse 'Publicar' para intentarlo de nuevo.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Debe haber iniciado sesión para editar este comentario.  Pulse 'Publicar' para que se le solicite que inicie sesión.",
		      ERROR_NO_CONTENT: "Escriba el comentario y pulse 'Publicar'.  Si ya no desea realizar un comentario, pulse 'Cancelar'.",
		      ERROR_NO_CONTENT_EDIT: "Escriba el comentario y pulse 'Publicar'.  Si ya no desea editar un comentario, pulse 'Cancelar'.",
		      ERROR_UNAUTHORIZED: "No se ha podido guardar su comentario porque no está autorizado a dejar comentarios.",
		      ERROR_GENERAL: "Se ha producido un error.",
		      OK: "Aceptar",
		      YES: "Sí",
		      TRIM_LONG_COMMENT: "¿Desea acortar el comentario?",
		      WARN_LONG_COMMENT: "El comentario es demasiado largo.  ${shorten}",
		      LINK: "Enlace",
		      SAVE: "Guardar",
		      POST: "Publicar",
		      SHOWMORE: "Leer más...",
		      VIEW_COMMENTS_FILE: "Ver los comentarios de este archivo",
		      SUBSCRIBE_TO_COMMENTS: "Suscribirse a estos comentarios",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Siga los cambios en estos comentarios mediante el lector de canales de información",
		      PROFILE_TITLE: "Abrir el perfil de ${user}.",
		      PROFILE_A11Y: "La activación de este enlace abrirá el perfil de ${user} en una nueva ventana.",
		      MODERATION_PENDING: "Este comentario está pendiente de revisión.",
		      MODERATION_REMOVED: {
		         DAY: "${user} eliminó el comentario el ${EEEE} a las ${time}.",
		         MONTH: "Este comentario ha sido suprimido por ${user} a las ${MMM} ${d}.",
		         TODAY: "${user} eliminó el comentario hoy a las ${time}.",
		         YEAR: "${user} eliminó el comentario el ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} eliminó el comentario ayer a las ${time}.",
		         TOMORROW: "${user} eliminó el comentario el ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "${user} rechazó este comentario el ${EEEE} a las ${time}.",
		         MONTH: "Este comentario ha sido rechazado por ${user} a las ${MMM} ${d}.",
		         TODAY: "${user} rechazó este comentario hoy a las ${time}.",
		         YEAR: "${user} rechazó este comentario el ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} rechazó este comentario ayer a las ${time}.",
		         TOMORROW: "${user} rechazó este comentario el ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Mostrar comentarios anteriores",
		      EMPTY: "No hay comentarios.",
		      ERROR_ALT: "Error",
		      ERROR: "Se ha producido un error al recuperar los comentarios. ${again}",
		      ERROR_ADDTL: "Se ha producido un error al recuperar los comentarios adicionales. ${again}",
		      ERROR_AGAIN: "Inténtelo de nuevo.",
		      ERROR_AGAIN_TITLE: "Vuelva a intentar la solicitud para obtener más comentarios.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} a las ${time} (versión ${version})",
		         MONTH: "${user} ${MMM} ${d} (versión ${version})",
		         TODAY: "${user} hoy a las ${time} (versión ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (versión ${version})",
		         YESTERDAY: "${user} ayer a las ${time} (versión ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (versión ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} en ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} hoy a las ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} ayer a las ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} a las ${time}",
		         MONTH: "${d} de ${MMM}",
		         TODAY: "Hoy a las ${time}",
		         YEAR: "${d} de ${MMM} de ${YYYY}",
		         YESTERDAY: "Ayer a las ${time}",
		         TOMORROW: "${d} de ${MMM} de ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Comentario suprimido por ${user} el ${EEEE} a las ${time}",
		         MONTH: "Comentario suprimido por ${user} el ${MMM} ${d}",
		         TODAY: "Comentario suprimido por ${user} hoy a las ${time}",
		         YEAR: "Comentario suprimido por ${user} el ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Comentario suprimido por ${user} ayer a las ${time}",
		         TOMORROW: "Comentario suprimido por ${user} el ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} ha editado ${EEEE} a las ${time} (versión ${version})",
		         MONTH: "${user} editado ${MMM} ${d} (versión ${version})",
		         TODAY: "${user} editado hoy a las ${time} (versión ${version})",
		         YEAR: "${user} editado ${MMM} ${d}, ${YYYY} (versión ${version})",
		         YESTERDAY: "${user} editado ayer a las ${time} (versión ${version})",
		         TOMORROW: "${user} editado ${MMM} ${d}, ${YYYY} (versión ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} editado ${EEEE} a las ${time}",
		         MONTH: "${user} editado ${MMM} ${d}",
		         TODAY: "${user} editado hoy a las ${time}",
		         YEAR: "${user} editado ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} editado ayer a las ${time}",
		         TOMORROW: "${user} editado ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "¿Está seguro de que desea suprimir este comentario?",
		      FLAG_ITEM: {
		         BUSY: "Guardando...",
		         CANCEL: "Cancelar",
		         ACTION: "Señalar como poco apropiado",
		         DESCRIPTION_LABEL: "Proporcione una razón para señalar este elemento (opcional)",
		         EDITERROR: "No se han podido editar los metadatos del archivo debido a un error.",
		         OK: "Guardar",
		         ERROR_SAVING: "Se ha producido un error al procesar la solicitud. Inténtelo más adelante.",
		         SUCCESS_SAVING: "El distintivo se ha enviado. Un moderador lo investigará en breve.",
		         TITLE: "Marcar este elemento como inapropiado",
		         COMMENT: {
		            TITLE: "Señalar este comentario como poco apropiado",
		            A11Y: "Este botón abre un diálogo que permite al usuario señalar este comentario como inapropiado."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Cancelar",
		      DIALOG_TITLE: "Suprimir comentario",
		      NAME: "Suprimir comentario",
		      OK: "Aceptar",
		      TOOLTIP: "Suprimir comentario"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Cancelar",
		      CONFIRM: "Al acortarlo, se eliminará el texto que aparece más allá del límite del comentario.  Pulse 'Aceptar' para acortar o 'Cancelar' para editar el comentario.",
		      DIALOG_TITLE: "Comentario abreviado",
		      NAME: "Comentario abreviado",
		      OK: "Aceptar",
		      TOOLTIP: "Comentario abreviado"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Confirmación de envío",
		      CONFIRM: "Se ha enviado su comentario para revisión y estará disponible cuando se apruebe.",
		      OK: "Aceptar"
		   },
		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "PM",
		      TODAY: "hoy",
		      TODAY_U: "Hoy",
		      YESTERDAY: "ayer",
		      YESTERDAY_U: "Ayer",
		      ADDED: { DAY: "Añadido ${EEee} a las ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Añadido el ${date_long}",
		         TODAY: "Añadido hoy a las ${time}",
		         YEAR: "Añadido el ${date_long}",
		         YESTERDAY: "Añadido ayer a las ${time}"
		      },
		      LAST_UPDATED: { DAY: "Última actualización ${EEee} a las ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Última actualización el ${date_long}",
		         TODAY: "Última actualización hoy a las ${time}",
		         YEAR: "Última actualización el ${date_long}",
		         YESTERDAY: "Última actualización ayer a las ${time}"
		      },
		      MONTHS_ABBR: { 0: "ENE",
		         10: "NOV",
		         11: "DIC",
		         1: "FEB",
		         2: "MAR",
		         3: "ABR",
		         4: "MAY",
		         5: "JUN",
		         6: "JUL",
		         7: "AGO",
		         8: "SEP",
		         9: "OCT"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Hoy",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ayer",
		         TOMORROW: "Mañana"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} a las ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Hoy a las ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ayer a las ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} a las ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Hoy a las ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Ayer a las ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} a las ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} a las ${time}",
		         TODAY: "${date_short} a las ${time}",
		         YEAR: "${date_short} a las ${time}",
		         YESTERDAY: "${date_short} a las ${time}",
		         TOMORROW: "${date_short} a las ${time}"
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
		      UPDATED: { DAY: "Actualizado el ${EEee} a las ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Actualizado el ${date_long}",
		         TODAY: "Actualizado hoy a las ${time}",
		         YEAR: "Actualizado el ${date_long}",
		         YESTERDAY: "Actualizado ayer a las ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "No se ha podido cargar la información de versión.",
		      ERROR_REQUEST_CANCELLED: "Se ha cancelado la solicitud.",
		      ERROR_REQUEST_TIMEOUT: "No se ha podido contactar con el servidor.",
		      ERROR_REQUEST_UNKNOWN: "Se ha producido un error desconocido.",
		      LOADING: "Cargando ..",
		      NO_VERSIONS: "No hay versiones",
		      INFO: "Versión ${0} creada ${1} por ",
		      VERSION_NUMBER: "Versión ${0}",
		      DELETED: "Suprimido",
		      DELETE_ALL: "Suprimir todas las versiones anteriores a la versión",
		      DELETE_VERSION_SINGLE: "Suprimir versión ${0}",
		      DELETEERROR: "La versión no se ha suprimido debido a un error.",
		      CREATE_VERSION: "Crear una versión nueva",
		      CREATE_VERSION_TOOLTIP: "Crear una versión del archivo",
		      REVERT_VERSION: "Restaurar la versión ${0}",
		      REVERT_DESCRIPTION: "Restaurado desde la versión ${0}",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Página anterior",
		      ELLIPSIS: "...",
		      NEXT: "Siguiente",
		      NEXT_TOOLTIP: "Página siguiente",
		      COUNT: "${0} - ${1} de ${2}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Página",
		      SHOW: "Mostrar",
		      ITEMS_PER_PAGE: " elementos por página.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Hoy a las ${time}",
		            YESTERDAY: "Ayer a las ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} a las ${time}",
		            YEAR: "${date_short} a las ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} a las ${time}",
		            TODAY: "hoy a las ${time}",
		            YESTERDAY: "ayer a las ${time}"
		        },
		        UPDATED: { DAY: "Actualizado el ${EEee} a las ${time}",
		            YEAR: "Actualizado el ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Actualizado el ${date_short}",
		            TODAY: "Actualizado hoy a las ${time}",
		            YESTERDAY: "Actualizado ayer a las ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Suprimir versión ${0}",
		         DOWNLOAD: "Descargar",
		         DOWNLOAD_TOOLTIP: "Descargar esta versión (${0})",
		         VIEW: "Ver",
		         VIEW_TOOLTIP: "Ver versión ${0}",
		         REVERT: {
		            A11Y: "Este botón abre un diálogo que permite al usuario confirmar la restauración de un archivo de una versión anterior. La confirmación de esta acción renovará el contenido de la página.",
		            FULL: "Restaurar",
		            WIDGET: "Restaurar esta versión"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "No se ha podido suprimir la versión porque ya se ha suprimido o ya no se ve.",
		         ERROR_ACCESS_DENIED: "No se ha podido suprimir la versión porque no es un editor.",
		         ERROR_TIMEOUT: "La versión no se ha suprimido porque no se ha podido contactar con el servidor.  Vuelva a pulsar 'Suprimir' para volver a intentar realizar la solicitud.",
		         ERROR_CANCEL: "La versión no se ha suprimido porque se ha cancelado la solicitud.  Vuelva a pulsar 'Suprimir' para volver a intentar realizar la solicitud.",
		         ERROR_NOT_LOGGED_IN: "Debe haber iniciado sesión para suprimir esta versión.  Pulse 'Suprimir' para que se le solicite que inicie sesión.",
		         GENERIC_ERROR: "No se ha podido suprimir la versión debido a un error desconocido.  Vuelva a pulsar 'Suprimir' para volver a intentar realizar la solicitud.",
		         FULL: "Suprimir",
		         A11Y: "Este botón abre un diálogo que permite al usuario confirmar la supresión de esta versión. La confirmación de esta acción renovará el contenido de la página."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "No se ha podido restaurar la versión porque se ha suprimido o ya no la puede ver.",
		         ERROR_ACCESS_DENIED: "No se ha podido restaurar la versión porque no es un editor.",
		         ERROR_NAME_EXISTS: "La versión no se ha podido restaurar porque hay otro archivo con el mismo nombre.",
		         ERROR_TIMEOUT: "La versión no se ha restaurado porque no se ha podido establecer contacto con el servidor.  Pulse 'Restaurar' para reintentar la solicitud.",
		         ERROR_CANCEL: "La versión no se ha restaurado porque se ha cancelado la solicitud.  Pulse 'Restaurar' para reintentar la solicitud.",
		         ERROR_QUOTA_VIOLATION: "La versión no se ha podido restaurar debido a restricciones de espacio.",
		         ERROR_MAX_CONTENT_SIZE: "La versión no se ha podido restaurar porque supera el tamaño de archivo máximo permitido de ${0}",
		         GENERIC_ERROR: "La versión no se ha podido restaurar debido a un error desconocido.  Pulse 'Restaurar' para reintentar la solicitud."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Ver quién ha descargado...",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Página anterior",
		      ELLIPSIS: "...",
		      NEXT: "Siguiente",
		      NEXT_TOOLTIP: "Página siguiente",
		      COUNT: "${0} - ${1} de ${2}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Página",
		      SHOW: "Mostrar",
		      ITEMS_PER_PAGE: " elementos por página.",
		      VERSION: {
		         DAY: "Versión ${version} el ${date}",
		         MONTH: "Versión ${version} el ${date}",
		         TODAY: "Versión ${version} a las ${time}",
		         YEAR: "Versión ${version} el ${date}",
		         YESTERDAY: "Versión ${version} ayer"
		      },
		      FILE: {
		         V_LATEST: "Ha descargado la última versión de este archivo",
		         V_OLDER: "Ha descargado la última versión ${0} de este archivo",
		         LOADING: "Cargando...",
		         EMPTY: "Sólo usuarios anónimos",
		         ERROR: "No se ha podido cargar la información de descarga"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Error",
		      ERROR_ALT_TEXT: "Error:",
		      ERROR_MSG_GENERIC: "Algo ha fallado.  Inténtelo de nuevo.",
		      ERROR_MSG_NOT_AVAILABLE: "Este elemento se ha suprimido o ya no está disponible.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "El contenido de este elemento no está disponible.",
		      ERROR_MSG_NO_ACCESS: "Ya no tiene acceso a este elemento.",
		      LOADING: "Cargando...",
		      TITLE_SU: "${author} ha publicado un mensaje.",
		      TITLE_NI: "${author} le ha invitado a unirse a su red.",
		      AUTHOR_TITLE: "Ver el perfil para ${author}",
		      OPEN_LINK: "Abrir ${title}",
		      CONFIRM_CLOSE_TITLE: "Confirmar",
		      CONFIRM_CLOSE_MESSAGE: "¿Está seguro de que desea dejar los cambios? Pulse Aceptar para continuar o Cancelar para volver",
		      OK: "Aceptar",
		      CANCEL: "Cancelar"
		   },
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
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Creado: ${EEEE} a las ${time}",
		           MONTH: "Creado: ${MMM} ${d}",
		           TODAY: "Creado: hoy a las ${time}",
		           YEAR: "Creado: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Creado: ayer a las ${time}",
		           TOMORROW: "Creado: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Se ha producido un error.  ${again}.",
		      error_again: "Inténtelo de nuevo.",
		      error_404: "La actualización de estado ya no existe.",
		      notifications: {
		         STATUS_UPDATE: "${user} ha publicado un mensaje",
		         USER_BOARD_POST: "${user} ha escrito en su tablón",
		         POST_COMMENT: "${user} ha escrito:"
		      }
		   },
		   login: {
		      error: "El nombre de usuario o la contraseña no coinciden con ninguna cuenta existente. Inténtelo de nuevo.",
		      logIn: "Iniciar sesión",
		      password: "Contraseña:",
		      user: "Nombre de usuario:",
		      welcome: "Inicio de sesión en HCL Connections"
		   },
		   repost: {
		      name: "Volver a publicar",
		      title: "Volver a publicar esta actualización para mis seguidores o comunidades",
		      msg_success: "La actualización se ha vuelto a publicar correctamente para sus seguidores.",
		      msg_generic: "Algo ha fallado.  Inténtelo de nuevo."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Añadir",
		      ADD_TXT: "Añadir personas o comunidades como lectores",
		      SHOW_MORE: "Mostrar más...",
		      READER_IF_PUBLIC: "Todo el mundo (público)",
		      READER_IF_PUBLIC_TOOLTIP: "Este archivo es público y todo el mundo puede verlo",
		      EMPTY_READERS: "Ninguna",
		      READERS_LABEL: "Lectores:\u00a0",
		      EDITORS_LABEL: "Editores:\u00a0",
		      OWNER_LABEL: "Propietario:\u00a0",
		      ERROR: "No se puede cargar la información de compartición",
		      ERROR_NOT_FOUND: "El archivo que ha solicitado se ha suprimido o movido. Si alguien le ha enviado este enlace, asegúrese de que es correcto.",
		      ERROR_ACCESS_DENIED: "No tiene permiso para ver este archivo.  El archivo no es público y no está compartido con usted.",
		      SHARE: "Compartir",
		      CANCEL: "Cancelar",
		      SHARE_WITH: "Compartir con:",
		      PERSON: "Persona",
		      COMMUNITY: "Comunidad",
		      PLACEHOLDER: "Correo electrónico o nombre de persona...",
		      MESSAGE: "Mensaje:",
		      MESSAGE_TXT: "Añadir un mensaje opcional",
		      REMOVE_ITEM_ALT: "Eliminar ${0}",
		      NO_MEMBERS: "Ninguna",
		      A11Y_READER_ADDED: "${0} seleccionado como lector",
		      A11Y_READER_REMOVED: "${0} se ha suprimido como lector",
		      SELF_REFERENCE_ERROR: "No puede compartir consigo mismo.",
		      OWNER_REFERENCE_ERROR: "No puede compartir con el propietario del archivo.",
		      SHARE_COMMUNITY_WARN: "Compartirlo con la comunidad pública '${0}' convertirá a este archivo en público.",
		      SELECT_USER_ERROR: "Debe seleccionar al menos una persona o comunidad con los que compartir",
		      WARN_LONG_MESSAGE: "El mensaje es demasiado largo.",
		      TRIM_LONG_MESSAGE: "¿Desea acortar el mensaje?",
		      ERROR_SHARING: "El archivo no se ha podido compartir.  Inténtelo de nuevo más tarde.",
		      INFO_SUCCESS: "El archivo se ha compartido satisfactoriamente.",
		      MAX_SHARES_ERROR: "Se ha superado el número máximo de usos compartidos.",
		      NOT_LOGGED_IN_ERROR: "El archivo no se ha compartido porque no se ha iniciado la sesión.  Pulse 'Compartir' para compartir el archivo.",
		      TIMEOUT_ERROR: "El archivo no se ha compartido porque no se ha podido establecer contacto con el servidor.  Pulse 'Compartir' para intentarlo de nuevo.",
		      CANCEL_ERROR: "No se ha compartido el archivo porque se ha cancelado la solicitud.  Pulse 'Compartir' para intentarlo de nuevo.",
		      NOT_FOUND_ERROR: "El archivo se ha suprimido o ya no lo puede ver, por lo que no se puede compartir.",
		      ACCESS_DENIED_ERROR: "Ya no tiene permiso para compartir este archivo.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Es posible que un archivo restringido no se pueda hacer público.",
		      TOOLTIP: "Otorgar acceso a otros a este archivo"
		   },
		   HISTORY: {
		      TAB_TITLE: "Actualizaciones recientes",
		      NO_HISTORY: "No hay actualizaciones recientes.",
		      EMPTY: "No se han podido recuperar las actualizaciones recientes para este elemento. Se ha suprimido o ya no tendrá acceso a él.",
		      MORE: "Mostrar actualizaciones previas",
		      ERROR_ALT: "Error",
		      ERROR: "Se ha producido un error al recuperar las actualizaciones. ${again}",
		      ERROR_ADDTL: "Se ha producido un error al recuperar las actualizaciones adicionales. ${again}",
		      ERROR_AGAIN: "Inténtelo de nuevo.",
		      ERROR_AGAIN_TITLE: "Vuelva a probar la solicitud para obtener más actualizaciones.",
		      PROFILE_TITLE: "Abrir el perfil de ${user}.",
		      SORT_BY: "Ordenar por\\:",
		      SORTS: {
		         DATE: "Fecha",
		         DATE_TOOLTIP: "Ordenar de historial más reciente a actualizaciones menos recientes",
		         DATE_TOOLTIP_REVERSE: "Ordenar de historial menos reciente a actualizaciones más recientes"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} a las ${time}",
		             MONTH: "${d} de ${MMM}",
		             TODAY: "Hoy a las ${time}",
		             YEAR: "${d} de ${MMM} de ${YYYY}",
		             YESTERDAY: "Ayer a las ${time}",
		             TOMORROW: "${d} de ${MMM} de ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Este comentario",
			   REPLY_ACTION: "Responder",
		       REPLY_ACTION_TOOLTIP: "Responder a este comentario"
		   },
		   OAUTH: {
		      welcomeHeader: "Bienvenido a Connections",
		      continueBtnLabel: "Continuar",
		      continueBtnA11y: "Al activar este enlace, se abrirá una ventana nueva que le permitirá autorizar el acceso a Connections.",
		      clickHere: "Pulse aquí",
		      infoMsg: "Connections necesita su autorización para acceder a sus datos.",
		      authorizeGadget: "${clickHere} para autorizar esta aplicación para acceder a la información de Connections.",
		      confirmAuthorization: "${clickHere} para confirmar que tiene autorización a esta aplicación para acceder a la información de Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Al activar este enlace, se abrirá una ventana nueva que le permitirá autorizar el acceso al repositorio de la biblioteca de Connections.",
		      infoMsg: "El repositorio de la biblioteca de Connections necesita su autorización para acceder a sus datos.",
		      authorizeGadget: "${clickHere} para autorizar esta aplicación para acceder a la información de repositorio de la biblioteca de Connections.",
		      confirmAuthorization: "${clickHere} para confirmar que tiene autorización a esta aplicación para acceder a la información de repositorio de la biblioteca de Connections."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Cancelar",
		      CONFIRM: "¿Está seguro de que desea abandonar los cambios?  Pulse Aceptar para continuar o Cancelar para volver.",
		      DIALOG_TITLE: "Confirmar",
		      NAME: "Confirmar",
		      OK: "Aceptar",
		      TOOLTIP: "Confirmar"
		   }
});

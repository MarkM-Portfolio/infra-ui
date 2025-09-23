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
		         label: "Mais",
		         tooltip: "Mais acções"
		       },
		       tags_more: "e ${0} mais",
		       ERROR_ALT: "Erro",
		       PERSON_TITLE: "Abra o perfil de ${user}.",
		       inactiveUser: "${user} (inactivo)",
		       inactiveIndicator: "(inactivo)",
		       like_error: "Não foi possível guardar o gosto. Tente novamente mais tarde.",
		       vote_error: "Não foi possível guardar o voto. Tente novamente mais tarde."
		   },
		   generic: {
		      untitled: "(Sem título)",
		      tags: "Etiquetas:",
		      tags_more: "e ${0} mais",
		      likes: "Gostos",
		      comments: "Comentários",
		      titleTooltip: "Navegar até ${app}",
		      error: "Não é possível obter os dados.",
		      timestamp: {
		         created: {
		            DAY: "Criado ${EEEE} às ${time}",
		            MONTH: "Criado a ${d} de ${MMM}",
		            TODAY: "Criado hoje às ${time}",
		            YEAR: "Criado a ${d} de ${MMM} de ${YYYY}",
		            YESTERDAY: "Criado ontem às ${time}",
		            TOMORROW: "Criado a ${d} de ${MMM} de ${YYYY}"
		         },
		         updated: {
		            DAY: "Actualizado ${EEEE} às ${time}",
		            MONTH: "Actualizado a ${d} de ${MMM}",
		            TODAY: "Actualizado hoje às ${time}",
		            YEAR: "Actualizado a ${d} de ${MMM} de ${YYYY}",
		            YESTERDAY: "Actualizado ontem às ${time}",
		            TOMORROW: "Actualizado a ${d} de ${MMM} de ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Pública",
		         priv: "Particular"
		      },
		      action: {
		         created: "Criado",
		         updated: "Actualizado"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Receba actualizações sobre as pessoas que está a acompanhar na página inicial e num resumo de correio electrónico.",
		      profile_title: "Abra o perfil de ${user}.",
		      profile_a11y: "A activação desta ligação irá abrir o perfil de ${user} numa nova janela.",
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "O pedido de rede já não existe.",
		      warning: "Aviso",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "São agora contactos de rede.",
		            	follow: "São agora contactos de rede e está a acompanhar ${user}."
		            },
		            ignore: {
		            	nofollow: "Ignorou o convite.",
		            	follow: "Ignorou o convite, mas está agora a acompanhar ${user}."
		            }
		         },
		         error: {
		            accept: "Ocorreu um erro ao aceitar o pedido.",
		            ignore: "Ocorreu um erro ao ignorar o pedido."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} às ${time}",
		              MONTH: "${d} de ${MMM}",
		              TODAY: "Hoje às ${time}",
		              YEAR: "${d} de ${MMM} de ${YYYY}",
		              YESTERDAY: "Ontem às ${time}",
		              TOMORROW: "${d} de ${MMM} de ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "A activação desta ligação irá abrir ${name} numa nova janela.",
		      tooltip: "Abrir ${name} na aplicação Ficheiros",
		      profile_title: "Abra o perfil de ${user}.",
		      profile_a11y: "A activação desta ligação irá abrir o perfil de ${user} numa nova janela.",
		      download_tooltip: "Descarregar este ficheiro (${0})",
		      following: {
		         add: "Acompanhar ficheiro",
		         remove: "Parar o acompanhamento",
		         title: "Alternar a recepção de actualizações sobre este ficheiro"
		      },
		      share: {
		         label: "Partilhar",
		         title: "Conceder acesso a este ficheiro a outras pessoas"
		      },
		      timestamp: {
		         created: {
		            DAY: "Criado ${EEEE} às ${time}",
		            MONTH: "Criado a ${d} de ${MMM}",
		            TODAY: "Criado hoje às ${time}",
		            YEAR: "Criado a ${d} de ${MMM} de ${YYYY}",
		            YESTERDAY: "Criado ontem às ${time}",
		            TOMORROW: "Criado a ${d} de ${MMM} de ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} criou ${EEEE} às ${time}",
		            MONTH: "${user} criou a ${d} de ${MMM}",
		            TODAY: "${user} criou hoje às ${time}",
		            YEAR: "${user} criou a ${d} de ${MMM} de ${YYYY}",
		            YESTERDAY: "${user} criou ontem às ${time}",
		            TOMORROW: "${user} criou a ${d} de ${MMM} de ${YYYY}"
		         },
		         updated: {
		            DAY: "Actualizado ${EEEE} às ${time}",
		            MONTH: "Actualizado a ${d} de ${MMM}",
		            TODAY: "Actualizado hoje às ${time}",
		            YEAR: "Actualizado a ${d} de ${MMM} de ${YYYY}",
		            YESTERDAY: "Actualizado ontem às ${time}",
		            TOMORROW: "Actualizado a ${d} de ${MMM} de ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} actualizou ${EEEE} às ${time}",
		            MONTH: "${user} actualizou a ${d} de ${MMM}",
		            TODAY: "${user} actualizou hoje às ${time}",
		            YEAR: "${user} actualizou a ${d} de ${MMM} de ${YYYY}",
		            YESTERDAY: "${user} actualizou ontem às ${time}",
		            TOMORROW: "${user} actualizou a ${d} de ${MMM} de ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Criado: ${EEEE} às ${time}",
		            MONTH: "Criado: ${d} de ${MMM}",
		            TODAY: "Criado: Hoje às ${time}",
		            YEAR: "Criado: ${d} de ${MMM} de ${YYYY}",
		            YESTERDAY: "Criado: Ontem às ${time}",
		            TOMORROW: "Criado: ${d} de ${MMM} de ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Actualizado: ${EEEE} às ${time}",
		            MONTH: "Actualizado: ${d} de ${MMM}",
		            TODAY: "Actualizado: Hoje às ${time}",
		            YEAR: "Actualizado: ${d} de ${MMM} de ${YYYY}",
		            YESTERDAY: "Actualizado: Ontem às ${time}",
		            TOMORROW: "Actualizado: ${d} de ${MMM} de ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} às ${time_long} por ${user}",
		         UPDATE_TIMESTAMP: "${date_long} às ${time_long} por ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} às ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Descarregar este ficheiro (${size})",
		      	 DOWNLOAD_ALT: "Descarregar"
		      },
		      PREVIEW: {
		         LINK: "Pré-visualizar",
		         TITLE: "Pré-visualizar este ficheiro numa nova janela."
		      },
		      TAGS: "Etiquetas:",
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "O ficheiro já não existe ou não dispõe de permissões suficientes para aceder ao mesmo.",
		      error_403: "Não tem permissão para visualizar este ficheiro. O ficheiro não é público e não é partilhado consigo.",
		      notifications: {
		         USER_SHARED: "${user} escreveu:",
		         CHANGE_SUMMARY: "${user} forneceu um resumo de alterações",
		         NO_CHANGE_SUMMARY: "${user} não forneceu um resumo de alterações",
		         COMMENTED: "${user} fez um comentário"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Saída dada pelo utilizador",
		      checkedout_other: "Saída dada por ${user}",
		      tooltip: "Abrir o ficheiro ${name} na biblioteca",
		      draft_404_info: "O rascunho foi eliminado ou já não é partilhado consigo. A versão publicada é agora a versão mais recente deste ficheiro.",
		      error_404: "O ficheiro foi eliminado ou já não é partilhado consigo.",
		      error_403: "O ficheiro foi eliminado ou já não é partilhado consigo.",
		      error_preview: "O ficheiro já não está disponível para pré-visualização.",
		      draft_review_canceled: "A revisão foi cancelada e o rascunho já não é partilhado consigo. A sua revisão já não é solicitada.",
		      switch_ee: "Ver rascunho",
		      switch_ee_tooltip: "Ver o rascunho mais recente deste ficheiro"
		   },
		   ecm_draft: {
		      tooltip: "Abrir o rascunho ${name} na biblioteca",
		      community_owners: "Proprietários da comunidade",
		      draft: "Rascunho",
		      draft_tooltip: "A ver o rascunho",
		      draft_general_info: "O rascunho anterior já não existe e um rascunho mais recente é agora a última versão.",
		      draft_review_404_general_info: "Um dos revisores já votou. A sua revisão deste rascunho já não é solicitada.",
		      draft_review_404_request_info: "O rascunho anterior já não existe e o rascunho mais recente foi submetido para revisão. A sua revisão é solicitada.",
		      draft_review_404_require_info: "O rascunho anterior já não existe e o rascunho mais recente foi submetido para revisão. A sua revisão é requerida.",
		      draft_review_request_info: "A sua revisão é solicitada.",
		      draft_review_require_info: "A sua revisão é requerida.",
		      error_404: "O rascunho foi eliminado ou já não é partilhado consigo.",
		      error_403: "Não é possível visualizar este rascunho, uma vez que não é partilhado consigo.",
		      error_preview: "O rascunho já não está disponível para pré-visualização.",
		      switch_ee: "Ver versão publicada",
		      switch_ee_tooltip: "Ver a versão publicada deste ficheiro",
		      review: "Revisão",
		      reviewers: "Revisores",
		      reviwers_addtl: "Revisores adicionais",
		      in_review: "Rascunho em revisão",
		      in_review_tooltip: "Ver o rascunho em revisão",
		      review_required_any: "Os proprietários da comunidade requerem que um revisor reveja este rascunho.",
		      review_required_all: "Os proprietários da comunidade requerem que todos os revisores revejam este rascunho.",
		      review_required_generic: "Os proprietários da comunidade requerem que estes revisores revejam este rascunho.",
		      review_additional_required: "É requerido que todos os revisores adicionados pelo submissor do rascunho revejam este rascunho.",
		      reivew_submitted_date: {
		         DAY: "${user} submeteu o rascunho para revisão ${EEEE} às ${time}.",
		         MONTH: "${user} submeteu o rascunho para revisão a ${d} de ${MMM}.",
		         TODAY: "${user} submeteu o rascunho para revisão hoje às ${time}.",
		         YEAR: "${user} submeteu o rascunho para revisão a ${d} de ${MMM} de ${YYYY}.",
		         YESTERDAY: "${user} submeteu o rascunho para revisão ontem às ${time}.",
		         TOMORROW: "${user} submeteu o rascunho para revisão a ${d} de ${MMM} de ${YYYY}."
		      },
		      pending: "Pendente",
		      pending_rejected: "A revisão já não é necessária, uma vez que o rascunho foi rejeitado",
		      approve: "Aprovar",
		      approved: "Aprovado",
		      approve_tooltip: "Aprovar este rascunho",
		      accept_success: "Aprovou este rascunho.",
		      accept_error: "Ocorreu um erro ao aprovar este rascunho. Tente novamente.",
		      accept_info: "Aprovou este rascunho.",
		      reject: "Rejeitar",
		      rejected: "Rejeitado",
		      reject_tooltip: "Rejeitar este rascunho",
		      reject_success: "Rejeitou este rascunho.",
		      reject_error: "Ocorreu um erro ao rejeitar este rascunho. Tente novamente.",
		      reject_info: "Rejeitou este rascunho."
		   },
		   authUser: {
		      error: "Ocorreu um erro ao obter o utilizador actual.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "Não é possível localizar o utilizador autenticado.",
		      error_403: "Não tem permissão para obter as informações do utilizador."
		   },
		   forum: {
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "O fórum já não existe ou não dispõe de permissões suficientes para aceder ao mesmo.",
		      error_403: "Não tem permissão para visualizar este fórum. O fórum não é público e não é partilhado consigo.",
		      readMore: "Ver tópico completo...",
		      readMore_tooltip: "Abra o tópico do fórum ${name}.",
		      readMore_a11y: "A activação desta ligação irá abrir o tópico do fórum ${name} numa nova janela.",
		      QUESTION_ANSWERED: "Esta pergunta foi respondida.",
		      QUESTION_NOT_ANSWERED: "Esta pergunta ainda não foi respondida.",
		      attachments: "${count} anexos",
		      attachments_one: "${count} anexo"
		   },
		   blog: {
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "O blogue já não existe ou não dispõe de permissões suficientes para aceder ao mesmo.",
		      error_403: "Não tem permissão para visualizar este blogue. O blogue não é público e não é partilhado consigo.",
		      readMore: " Ler mais...",
		      readMore_tooltip: "Abra a entrada de blogue ${name}.",
		      readMore_a11y: "A activação desta ligação irá abrir a entrada de blogue ${name} numa nova janela.",
		      graduated: "Graduada",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Votar</a>",
		  					TOOLTIP: 	"Votar nisto"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Votado</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Votou</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Anular</a>",
		  					TOOLTIP: 	"Remover o voto nisto"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 pessoas votaram nisto"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 pessoa votou nisto"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} votou nisto"
		  				}
		  			},
		  			LOADING: "A carregar...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Votado"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Não foi possível guardar o seu voto, uma vez que já atingiu o seu limite de votos ou a ideia já não está disponível para si.",
		      readMore_tooltip: "Abra a ideia ${name}.",
		      readMore_a11y: "A activação desta ligação irá abrir a ideia ${name} numa nova janela."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Respostas",
		      THIS_ARIA_LABEL: "Esta resposta",
		      THIS_TAB_TITLE: "Esta resposta",
		      TAB_TITLE: "Respostas (${0})",
		      REPLY_TO_REPLY: "Em resposta a ${thisReply}",
		      REPLY_TO_TOPIC: "Em resposta a ${thisTopic}",
		      THIS_TOPIC: "este tópico",
		      THIS_REPLY: "esta resposta",
		      NAVIGATE_TO_REPLY: "Navegar para a resposta ascendente",
		      NAVIGATE_TO_TOPIC: "Navegar para o tópico ascendente",
		      ADD_COMMENT: "Responder a este tópico",
		      ADD_COMMENT_TOOLTIP: "Responder a este tópico do fórum",
		      SHOWING_RECENT_REPLIES: "Mostrar ${0} respostas mais recentes",
		      PREV_COMMENTS: "Mostrar mais respostas",
		      PLACEHOLDER_TXT: "Responder a este tópico",
		      EMPTY: "Não existem quaisquer respostas.",
		      TRIM_LONG_COMMENT: "Abreviar a resposta?",
		      WARN_LONG_COMMENT: "A resposta é demasiado longa.  ${shorten}",
		      ERROR: "Ocorreu um erro ao obter as respostas. ${again}",
		      ERROR_CREATE: "Não foi possível guardar a resposta.  Tente novamente mais tarde.",
		      ERROR_CREATE_NOT_FOUND: "Não foi possível guardar a resposta, uma vez que o tópico foi eliminado ou já não é visível para si.",
		      ERROR_CREATE_ACCESS_DENIED: "Não foi possível guardar a resposta, uma vez que o tópico foi eliminado ou já não é visível para si.",
		      ERROR_CREATE_TIMEOUT: "A resposta não foi guardada, uma vez que não foi possível contactar o servidor.  Faça clique em 'Guardar' para tentar novamente.",
		      ERROR_CREATE_CANCEL: "Não foi possível guardar a resposta, uma vez que o pedido foi cancelado.  Faça clique em 'Guardar' para tentar novamente.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Tem de iniciar sessão para criar esta resposta.  Faça clique em 'Guardar' para que seja apresentado um pedido de início de sessão.",
		      ERROR_NO_CONTENT: "Introduza a resposta e faça clique em 'Guardar'.  Caso já não pretenda deixar uma resposta, faça clique em 'Cancelar'.",
		      ERROR_UNAUTHORIZED: "Não foi possível guardar a resposta, uma vez que não está autorizado a deixar uma resposta.",
		      COMMENT_DELETED: {
		         DAY: "Resposta eliminada por ${user} ${EEEE} às ${time}",
		         MONTH: "Resposta eliminada por ${user} a ${d} de ${MMM}",
		         TODAY: "Resposta eliminada por ${user} hoje às ${time}",
		         YEAR: "Resposta eliminada por ${user} a ${d} de ${MMM} de ${YYYY}",
		         YESTERDAY: "Resposta eliminada por ${user} ontem às ${time}",
		         TOMORROW: "Resposta eliminada por ${user} a ${d} de ${MMM} de ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Motivo da eliminação: ${reason}",
		      REPLY_TITLE: "Re: ${0}",
		      SHOW_FULL_REPLY: "Ver resposta completa",
		      SHOW_FULL_REPLY_TOOLTIP: "Navegue até à resposta original no tópico do fórum",
		      REPLY_ACTION: "Responder",
		      REPLY_ACTION_TOOLTIP: "Responder a esta publicação",
		      MODERATION_PENDING: "Esta resposta está a aguardar revisão.",
		      MODERATION_QUARANTINED: "A publicação foi colocada em quarentena pelo moderador.",
		      MODERATION_REMOVED: {
		         DAY: "Esta resposta foi removida por ${user} a ${EEEE} às ${time}.",
		         MONTH: "Esta resposta foi removida por ${user} a ${d} de ${MMM}.",
		         TODAY: "Esta resposta foi removida por ${user} hoje às ${time}.",
		         YEAR: "Esta resposta foi removida por ${user} a ${d} de ${MMM} de ${YYYY}.",
		         YESTERDAY: "Esta resposta foi removida por ${user} ontem às ${time}.",
		         TOMORROW: "Esta resposta foi removida por ${user} a ${d} de ${MMM} de ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Esta resposta foi rejeitada por ${user} a ${EEEE} às ${time}.",
		         MONTH: "Esta resposta foi rejeitada por ${user} a ${d} de ${MMM}.",
		         TODAY: "Esta resposta foi rejeitada por ${user} hoje às ${time}.",
		         YEAR: "Esta resposta foi rejeitada por ${user} a ${d} de ${MMM} de ${YYYY}.",
		         YESTERDAY: "Esta resposta foi rejeitada por ${user} ontem às ${time}.",
		         TOMORROW: "Esta resposta foi rejeitada por ${user} a ${d} de ${MMM} de ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "A sua resposta foi submetida para revisão e ficará disponível quando aprovada."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Comentários",
		      PLACEHOLDER_TXT: "Adicionar um comentário",
		      TAB_TITLE: "Comentários (${0})",
		      ACTION_NOT_SUPPORTED: "Acção não suportada",
		      ADD_COMMENT: "Adicionar um comentário",
		      ADD_COMMENT_TOOLTIP: "Adicionar um comentário a este item",
		      CANCEL: "Cancelar",
		      COMMENT_COUNT_ONE: "${0} comentário",
		      COMMENT_COUNT_MANY: "${0} comentários",
		      COMMENT_LABEL: "Comentário:",
		      DELETE: "Eliminar",
		      DELETE_TOOLTIP: "Eliminar comentário",
		      DELETEREASON: "Motivo da eliminação deste comentário:",
		      DIALOG_TITLE: "Abreviar comentário",
		      TOOLTIP: "Abreviar comentário",
		      NAME: "Abreviar comentário",
		      EDIT: "Editar",
		      EDIT_TOOLTIP: "Editar comentário",
		      ERROR_CREATE: "Não foi possível guardar o seu comentário.  Tente novamente mais tarde.",
		      ERROR_CREATE_NOT_FOUND: "Não foi possível guardar o seu comentário, uma vez que o item foi eliminado ou já não está visível para si.",
		      ERROR_CREATE_ACCESS_DENIED: "Não foi possível guardar o seu comentário, uma vez que o item foi eliminado ou já não está visível para si.",
		      ERROR_CREATE_TIMEOUT: "O seu comentário não foi guardado, uma vez que não foi possível contactar o servidor.  Faça clique em 'Publicar' para tentar novamente.",
		      ERROR_CREATE_CANCEL: "Não foi possível guardar o seu comentário, uma vez que o pedido foi cancelado.  Faça clique em 'Publicar' para tentar novamente.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Tem de iniciar sessão para criar este comentário.  Faça clique 'Publicar' para que seja apresentado um pedido de início de sessão.",
		      ERROR_DELETE: "Não foi possível eliminar o seu comentário.  Tente novamente mais tarde.",
		      ERROR_DELETE_TIMEOUT: "O seu comentário não foi eliminado, uma vez que não foi possível contactar o servidor.  Faça clique em 'Eliminar' para tentar novamente.",
		      ERROR_DELETE_NOT_FOUND: "Não foi possível eliminar o seu comentário, uma vez que o comentário ou o item foi eliminado ou já não está visível para si.",
		      ERROR_DELETE_ACCESS_DENIED: "Não foi possível eliminar o seu comentário, uma vez que o item foi eliminado ou já não está visível para si.",
		      ERROR_DELETE_CANCEL: "Não foi possível eliminar o seu comentário, uma vez que o pedido foi cancelado.  Faça clique em 'Eliminar' para tentar novamente.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Tem de iniciar sessão para eliminar este comentário.  Faça clique em 'Eliminar' para que seja apresentado um pedido de início de sessão.",
		      ERROR_EDIT: "Não foi possível actualizar o seu comentário.  Tente novamente mais tarde.",
		      ERROR_EDIT_ACCESS_DENIED: "Não foi possível actualizar o seu comentário, uma vez que o item foi eliminado ou já não está visível para si.",
		      ERROR_EDIT_NOT_FOUND: "Não foi possível actualizar o seu comentário, uma vez que o item foi eliminado ou já não está visível para si.",
		      ERROR_EDIT_TIMEOUT: "O seu comentário não foi actualizado, uma vez que não foi possível contactar o servidor.  Faça clique em 'Publicar' para tentar novamente.",
		      ERROR_EDIT_CANCEL: "Não foi possível actualizar o seu comentário, uma vez que o pedido foi cancelado.  Faça clique em 'Publicar' para tentar novamente.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Tem de iniciar sessão para editar este comentário.  Faça clique 'Publicar' para que seja apresentado um pedido de início de sessão.",
		      ERROR_NO_CONTENT: "Introduza o seu comentário e faça clique em 'Publicar'.  Caso já não pretenda deixar um comentário, faça clique em 'Cancelar'.",
		      ERROR_NO_CONTENT_EDIT: "Introduza o seu comentário e faça clique em 'Publicar'.  Caso já não pretenda editar o comentário, faça clique em 'Cancelar'.",
		      ERROR_UNAUTHORIZED: "Não foi possível guardar o seu comentário, uma vez que não está autorizado a deixar um comentário.",
		      ERROR_GENERAL: "Ocorreu um erro.",
		      OK: "OK",
		      YES: "Sim",
		      TRIM_LONG_COMMENT: "Abreviar o comentário?",
		      WARN_LONG_COMMENT: "O comentário é demasiado longo.  ${shorten}",
		      LINK: "Ligação",
		      SAVE: "Guardar",
		      POST: "Publicar",
		      SHOWMORE: "Ler mais...",
		      VIEW_COMMENTS_FILE: "Ver comentários a este ficheiro",
		      SUBSCRIBE_TO_COMMENTS: "Subscrever estes comentários",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Acompanhar as alterações efectuadas a estes comentários através do leitor de feeds",
		      PROFILE_TITLE: "Abra o perfil de ${user}.",
		      PROFILE_A11Y: "A activação desta ligação irá abrir o perfil de ${user} numa nova janela.",
		      MODERATION_PENDING: "Este comentário está a aguardar revisão.",
		      MODERATION_REMOVED: {
		         DAY: "Este comentário foi removido por ${user} ${EEEE} às ${time}.",
		         MONTH: "Este comentário foi removido por ${user} em ${MMM} ${d}.",
		         TODAY: "Este comentário foi removido por ${user} hoje às ${time}.",
		         YEAR: "Este comentário foi removido por ${user} a ${d} de ${MMM} de ${YYYY}.",
		         YESTERDAY: "Este comentário foi removido por ${user} ontem às ${time}.",
		         TOMORROW: "Este comentário foi removido por ${user} a ${d} de ${MMM} de ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Este comentário foi rejeitado por ${user} ${EEEE} às ${time}.",
		         MONTH: "Este comentário foi rejeitado por ${user} em ${MMM} ${d}.",
		         TODAY: "Este comentário foi rejeitado por ${user} hoje às ${time}.",
		         YEAR: "Este comentário foi rejeitado por ${user} a ${d} de ${MMM} de ${YYYY}.",
		         YESTERDAY: "Este comentário foi rejeitado por ${user} ontem às ${time}.",
		         TOMORROW: "Este comentário foi rejeitado por ${user} a ${d} de ${MMM} de ${YYYY}."
		      },
		      PREV_COMMENTS: "Mostrar comentários anteriores",
		      EMPTY: "Não existem comentários.",
		      ERROR_ALT: "Erro",
		      ERROR: "Ocorreu um erro ao obter os comentários. ${again}",
		      ERROR_ADDTL: "Ocorreu um erro ao obter comentários adicionais. ${again}",
		      ERROR_AGAIN: "Tente novamente.",
		      ERROR_AGAIN_TITLE: "Tente efectuar novamente este pedido para mais comentários.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} às ${time} (versão ${version})",
		         MONTH: "${user} a ${d} de ${MMM} (versão ${version})",
		         TODAY: "${user} hoje às ${time} (versão ${version})",
		         YEAR: "${user} a ${d} de ${MMM} de ${YYYY} (versão ${version})",
		         YESTERDAY: "${user} ontem às ${time} (versão ${version})",
		         TOMORROW: "${user} a ${d} de ${MMM} de ${YYYY} (versão ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} às ${time}",
		         MONTH: "${user}${d} de ${MMM}",
		         TODAY: "${user} hoje às ${time}",
		         YEAR: "${user} ${d} de ${MMM} de ${YYYY}",
		         YESTERDAY: "${user} ontem às ${time}",
		         TOMORROW: "${user} ${d} de ${MMM} de ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} às ${time}",
		         MONTH: "${d} de ${MMM}",
		         TODAY: "Hoje às ${time}",
		         YEAR: "${d} de ${MMM} de ${YYYY}",
		         YESTERDAY: "Ontem às ${time}",
		         TOMORROW: "${d} de ${MMM} de ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Comentário eliminado por ${user} a ${EEEE} às ${time}",
		         MONTH: "Comentário eliminado por ${user} a ${d} de ${MMM}",
		         TODAY: "Comentário eliminado por ${user} hoje às ${time}",
		         YEAR: "Comentário eliminado por ${user} a ${d} de ${MMM} de ${YYYY}",
		         YESTERDAY: "Comentário eliminado por ${user} ontem às ${time}",
		         TOMORROW: "Comentário eliminado por ${user} a ${d} de ${MMM} de ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} editou ${EEEE} às ${time} (versão ${version})",
		         MONTH: "${user} editou a ${d} de ${MMM} (versão ${version})",
		         TODAY: "${user} editou hoje às ${time} (versão ${version})",
		         YEAR: "${user} editou a ${d} de ${MMM} de ${YYYY} (versão ${version})",
		         YESTERDAY: "${user} editou ontem às ${time} (versão ${version})",
		         TOMORROW: "${user} editou a ${d} de ${MMM} de ${YYYY} (versão ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} editou ${EEEE} às ${time}",
		         MONTH: "${user} editou a ${d} de ${MMM}",
		         TODAY: "${user} editou hoje às ${time}",
		         YEAR: "${user} editou a ${d} de ${MMM} de ${YYYY}",
		         YESTERDAY: "${user} editou ontem às ${time}",
		         TOMORROW: "${user} editou a ${d} de ${MMM} de ${YYYY}"
		      },
		      DELETE_CONFIRM: "Tem a certeza de que pretende eliminar este comentário?",
		      FLAG_ITEM: {
		         BUSY: "A guardar...",
		         CANCEL: "Cancelar",
		         ACTION: "Sinalizar como inadequado",
		         DESCRIPTION_LABEL: "Forneça um motivo para sinalizar este item (opcional)",
		         EDITERROR: "Os metadados do ficheiro não foram editados devido a um erro",
		         OK: "Guardar",
		         ERROR_SAVING: "Ocorreu um erro ao processar o pedido. Tente novamente mais tarde.",
		         SUCCESS_SAVING: "O seu sinalizador foi submetido. Um moderador irá investigar brevemente.",
		         TITLE: "Sinalizar este item como inadequado",
		         COMMENT: {
		            TITLE: "Sinalizar este comentário como inadequado",
		            A11Y: "Este botão abre uma caixa de diálogo que permite ao utilizador sinalizar este comentário como inadequado."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Cancelar",
		      DIALOG_TITLE: "Eliminar comentário",
		      NAME: "Eliminar comentário",
		      OK: "OK",
		      TOOLTIP: "Eliminar comentário"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Cancelar",
		      CONFIRM: "Ao abreviar o comentário, será removido o texto que ultrapassa o limite do comentário.  Faça clique em 'OK' para abreviar ou em 'Cancelar' para editar o comentário manualmente.",
		      DIALOG_TITLE: "Abreviar comentário",
		      NAME: "Abreviar comentário",
		      OK: "OK",
		      TOOLTIP: "Abreviar comentário"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Confirmação da submissão",
		      CONFIRM: "O seu comentário foi submetido para revisão e ficará disponível quando aprovado.",
		      OK: "OK"
		   },
		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "PM",
		      TODAY: "hoje",
		      TODAY_U: "Hoje",
		      YESTERDAY: "ontem",
		      YESTERDAY_U: "Ontem",
		      ADDED: { DAY: "Adicionado ${EEee} às ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Adicionado em ${date_long}",
		         TODAY: "Adicionado hoje às ${time}",
		         YEAR: "Adicionado em ${date_long}",
		         YESTERDAY: "Adicionado ontem às ${time}"
		      },
		      LAST_UPDATED: { DAY: "Última actualização ${EEee} às ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Última actualização em ${date_long}",
		         TODAY: "Última actualização hoje às ${time}",
		         YEAR: "Última actualização em ${date_long}",
		         YESTERDAY: "Última actualização ontem às ${time}"
		      },
		      MONTHS_ABBR: { 0: "JAN",
		         10: "NOV",
		         11: "DEZ",
		         1: "FEV",
		         2: "MAR",
		         3: "ABR",
		         4: "MAI",
		         5: "JUN",
		         6: "JUL",
		         7: "AGO",
		         8: "SET",
		         9: "OUT"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Hoje",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ontem",
		         TOMORROW: "Amanhã"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} às ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Hoje às ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Ontem às ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} às ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Hoje às ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Ontem às ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} às ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} às ${time}",
		         TODAY: "${date_short} às ${time}",
		         YEAR: "${date_short} às ${time}",
		         YESTERDAY: "${date_short} às ${time}",
		         TOMORROW: "${date_short} às ${time}"
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
		      UPDATED: { DAY: "Actualizado ${EEee} às ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Actualizado em ${date_long}",
		         TODAY: "Actualizado hoje às ${time}",
		         YEAR: "Actualizado em ${date_long}",
		         YESTERDAY: "Actualizado ontem às ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Não é possível carregar as informações da versão.",
		      ERROR_REQUEST_CANCELLED: "O pedido foi cancelado.",
		      ERROR_REQUEST_TIMEOUT: "Não foi possível contactar o servidor.",
		      ERROR_REQUEST_UNKNOWN: "Ocorreu um erro desconhecido.",
		      LOADING: "A carregar...",
		      NO_VERSIONS: "Não existem versões",
		      INFO: "Versão ${0} criada a ${1} por ",
		      VERSION_NUMBER: "Versão ${0}",
		      DELETED: "Eliminada",
		      DELETE_ALL: "Eliminar todas as versões anteriores à versão",
		      DELETE_VERSION_SINGLE: "Eliminar versão ${0}",
		      DELETEERROR: "A versão não foi eliminada devido a um erro.",
		      CREATE_VERSION: "Criar uma nova versão",
		      CREATE_VERSION_TOOLTIP: "Criar uma nova versão deste ficheiro",
		      REVERT_VERSION: "Restaurar versão ${0}",
		      REVERT_DESCRIPTION: "Restaurado a partir da versão ${0}",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Página anterior",
		      ELLIPSIS: "...",
		      NEXT: "Seguinte",
		      NEXT_TOOLTIP: "Página seguinte",
		      COUNT: "${0}-${1} de ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Página",
		      SHOW: "Mostrar",
		      ITEMS_PER_PAGE: " itens por página.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} às ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Hoje às ${time}",
		            YESTERDAY: "Ontem às ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} às ${time}",
		            YEAR: "${date_short} às ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} às ${time}",
		            TODAY: "hoje às ${time}",
		            YESTERDAY: "ontem às ${time}"
		        },
		        UPDATED: { DAY: "Actualizado ${EEee} às ${time}",
		            YEAR: "Actualizado em ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Actualizado em ${date_short}",
		            TODAY: "Actualizado hoje às ${time}",
		            YESTERDAY: "Actualizado ontem às ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Eliminar versão ${0}",
		         DOWNLOAD: "Descarregar",
		         DOWNLOAD_TOOLTIP: "Descarregar esta versão (${0})",
		         VIEW: "Ver",
		         VIEW_TOOLTIP: "Ver versão ${0}",
		         REVERT: {
		            A11Y: "Este botão abre uma caixa de diálogo que permite ao utilizador confirmar a recuperação de um ficheiro de uma versão anterior. Confirmar esta acção irá actualizar os conteúdos da página.",
		            FULL: "Restaurar",
		            WIDGET: "Restaurar esta versão"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Não foi possível eliminar esta versão, uma vez que já foi eliminada ou já não está visível para o utilizador.",
		         ERROR_ACCESS_DENIED: "Não foi possível eliminar a versão, uma vez que o utilizador não é um editor.",
		         ERROR_TIMEOUT: "A versão não foi eliminada, uma vez que não foi possível contactar o servidor.  Faça clique em 'Eliminar' outra vez para tentar efectuar o pedido novamente.",
		         ERROR_CANCEL: "Não foi possível eliminar a versão, uma vez que o pedido foi cancelado.  Faça clique em 'Eliminar' outra vez para tentar efectuar o pedido novamente.",
		         ERROR_NOT_LOGGED_IN: "Tem de iniciar sessão para eliminar esta versão.  Faça clique em 'Eliminar' para que seja apresentado um pedido de início de sessão.",
		         GENERIC_ERROR: "Não foi possível eliminar a versão, devido a um erro desconhecido.  Faça clique em 'Eliminar' outra vez para tentar efectuar o pedido novamente.",
		         FULL: "Eliminar",
		         A11Y: "Este botão abre uma caixa de diálogo que permite ao utilizador confirmar a eliminação desta versão. Confirmar esta acção irá actualizar os conteúdos da página."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Não foi possível restaurar a versão, uma vez que foi eliminada ou já não é visível para o utilizador.",
		         ERROR_ACCESS_DENIED: "Não foi possível restaurar a versão, uma vez que o utilizador não é um editor.",
		         ERROR_NAME_EXISTS: "Não foi possível restaurar a versão, uma vez que outro ficheiro contém o mesmo nome.",
		         ERROR_TIMEOUT: "A versão não foi restaurada, uma vez que não foi possível contactar o servidor.  Faça clique em 'Restaurar' outra vez para tentar efectuar o pedido novamente.",
		         ERROR_CANCEL: "A versão não foi restaurada, uma vez que o pedido foi cancelado.  Faça clique em 'Restaurar' outra vez para tentar efectuar o pedido novamente.",
		         ERROR_QUOTA_VIOLATION: "Não foi possível restaurar a versão, devido a restrições de espaço.",
		         ERROR_MAX_CONTENT_SIZE: "Não foi possível restaurar a versão, uma vez que é maior do que o tamanho de ficheiros máximo permitido de ${0}",
		         GENERIC_ERROR: "Não foi possível restaurar a versão, devido a um erro desconhecido.  Faça clique em 'Restaurar' outra vez para tentar efectuar o pedido novamente."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Ver quem descarregou...",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Página anterior",
		      ELLIPSIS: "...",
		      NEXT: "Seguinte",
		      NEXT_TOOLTIP: "Página seguinte",
		      COUNT: "${0}-${1} de ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Página",
		      SHOW: "Mostrar",
		      ITEMS_PER_PAGE: " itens por página.",
		      VERSION: {
		         DAY: "Versão ${version} em ${date}",
		         MONTH: "Versão ${version} em ${date}",
		         TODAY: "Versão ${version} às ${time}",
		         YEAR: "Versão ${version} em ${date}",
		         YESTERDAY: "Versão ${version} ontem"
		      },
		      FILE: {
		         V_LATEST: "Descarregou a versão mais recente deste ficheiro",
		         V_OLDER: "A última transferência efectuada foi da versão ${0} deste ficheiro",
		         LOADING: "A carregar...",
		         EMPTY: "Apenas utilizadores anónimos",
		         ERROR: "Não é possível carregar as informações de transferência"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Erro",
		      ERROR_ALT_TEXT: "Erro:",
		      ERROR_MSG_GENERIC: "Ocorreu um problema.  Tente novamente.",
		      ERROR_MSG_NOT_AVAILABLE: "Este item foi eliminado ou já não está disponível.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "O conteúdo deste item não está disponível.",
		      ERROR_MSG_NO_ACCESS: "Já não tem acesso a este item.",
		      LOADING: "A carregar...",
		      TITLE_SU: "${author} publicou uma mensagem.",
		      TITLE_NI: "${author} convidou-o para participar na respectiva rede.",
		      AUTHOR_TITLE: "Ver perfil de ${author}",
		      OPEN_LINK: "Abrir ${title}",
		      CONFIRM_CLOSE_TITLE: "Confirmar",
		      CONFIRM_CLOSE_MESSAGE: "Tem a certeza de que pretende abandonar as alterações? Prima OK para continuar ou Cancelar para retroceder.",
		      OK: "OK",
		      CANCEL: "Cancelar"
		   },
		   MESSAGE: {
		      SUCCESS: "Confirmação",
		      ERROR: "Erro",
		      ERROR_ALT_TEXT: "Erro:",
		      INFO: "Informações",
		      WARNING: "Aviso",
		      DISMISS: "Ocultar esta mensagem",
		      MORE_DETAILS: "Mais detalhes",
		      HIDE_DETAILS: "Ocultar detalhes"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Criado: ${EEEE} às ${time}",
		           MONTH: "Criado: ${d} de ${MMM}",
		           TODAY: "Criado: Hoje às ${time}",
		           YEAR: "Criado: ${d} de ${MMM} de ${YYYY}",
		           YESTERDAY: "Criado: Ontem às ${time}",
		           TOMORROW: "Criado: ${d} de ${MMM} de ${YYYY}"
		       },
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "A actualização do estado já não existe.",
		      notifications: {
		         STATUS_UPDATE: "${user} publicou uma mensagem",
		         USER_BOARD_POST: "${user} escreveu no seu quadro",
		         POST_COMMENT: "${user} escreveu:"
		      }
		   },
		   login: {
		      error: "O nome do utilizador e/ou palavra-passe não correspondem a quaisquer contas existentes. Tente novamente.",
		      logIn: "Iniciar sessão",
		      password: "Palavra-passe:",
		      user: "Nome do utilizador:",
		      welcome: "Iniciar sessão no HCL Connections"
		   },
		   repost: {
		      name: "Republicar",
		      title: "Republicar esta actualização para os meus acompanhantes ou comunidades",
		      msg_success: "A actualização foi publicada novamente com êxito para os seus acompanhantes.",
		      msg_generic: "Ocorreu um problema.  Tente novamente."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Adicionar",
		      ADD_TXT: "Adicionar pessoas ou comunidades como leitores",
		      SHOW_MORE: "Mostrar mais...",
		      READER_IF_PUBLIC: "Todos (público)",
		      READER_IF_PUBLIC_TOOLTIP: "Este ficheiro é público e visível para todas as pessoas.",
		      EMPTY_READERS: "Nenhum",
		      READERS_LABEL: "Leitores:\u00a0",
		      EDITORS_LABEL: "Editores:\u00a0",
		      OWNER_LABEL: "Proprietário:\u00a0",
		      ERROR: "Não é possível carregar as informações de partilha",
		      ERROR_NOT_FOUND: "O ficheiro solicitado foi eliminado ou movido. Se alguém lhe enviou esta ligação, verifique se está correcta.",
		      ERROR_ACCESS_DENIED: "Não tem permissão para visualizar este ficheiro.  O ficheiro não é público e não é partilhado consigo.",
		      SHARE: "Partilhar",
		      CANCEL: "Cancelar",
		      SHARE_WITH: "Partilhar com:",
		      PERSON: "uma Pessoa",
		      COMMUNITY: "uma Comunidade",
		      PLACEHOLDER: "Nome ou end. correio electrónico da pessoa...",
		      MESSAGE: "Mensagem:",
		      MESSAGE_TXT: "Adicionar uma mensagem opcional",
		      REMOVE_ITEM_ALT: "Remover ${0}",
		      NO_MEMBERS: "Nenhum",
		      A11Y_READER_ADDED: "Seleccionou ${0} como leitor",
		      A11Y_READER_REMOVED: "Removeu ${0} como leitor",
		      SELF_REFERENCE_ERROR: "Não é possível partilhar consigo próprio.",
		      OWNER_REFERENCE_ERROR: "Não é possível partilhar com o proprietário do ficheiro.",
		      SHARE_COMMUNITY_WARN: "A partilha com a comunidade pública '${0}' irá tornar este ficheiro público.",
		      SELECT_USER_ERROR: "Tem de seleccionar, pelo menos, uma pessoa ou comunidade com a qual partilhar",
		      WARN_LONG_MESSAGE: "A mensagem é demasiado longa.",
		      TRIM_LONG_MESSAGE: "Abreviar mensagem?",
		      ERROR_SHARING: "Não foi possível partilhar o ficheiro.  Tente novamente mais tarde.",
		      INFO_SUCCESS: "O ficheiro foi partilhado com êxito.",
		      MAX_SHARES_ERROR: "O número máximo de partilhas foi excedido.",
		      NOT_LOGGED_IN_ERROR: "O ficheiro não foi partilhado, uma vez que não iniciou sessão.  Faça clique em 'Partilhar' para partilhar o ficheiro.",
		      TIMEOUT_ERROR: "O ficheiro não foi partilhado, uma vez que não foi possível contactar o servidor.  Faça clique em 'Partilhar' para tentar novamente.",
		      CANCEL_ERROR: "O ficheiro não foi partilhado, uma vez que o pedido foi cancelado.  Faça clique em 'Partilhar' para tentar novamente.",
		      NOT_FOUND_ERROR: "O ficheiro foi eliminado ou já não é visível para si e não pode ser partilhado.",
		      ACCESS_DENIED_ERROR: "Já não tem permissão para partilhar este ficheiro.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Um ficheiro restrito não pode ser tornado público.",
		      TOOLTIP: "Conceder acesso a este ficheiro a outras pessoas"
		   },
		   HISTORY: {
		      TAB_TITLE: "Actualizações recentes",
		      NO_HISTORY: "Não existem actualizações recentes.",
		      EMPTY: "Não foi possível obter actualizações recentes para este item. O item foi eliminado ou já não dispõe de acesso ao mesmo.",
		      MORE: "Mostrar actualizações anteriores",
		      ERROR_ALT: "Erro",
		      ERROR: "Ocorreu um erro ao obter as actualizações. ${again}",
		      ERROR_ADDTL: "Ocorreu um erro ao obter actualizações adicionais. ${again}",
		      ERROR_AGAIN: "Tente novamente.",
		      ERROR_AGAIN_TITLE: "Tente efectuar novamente o pedido para obter mais actualizações.",
		      PROFILE_TITLE: "Abra o perfil de ${user}.",
		      SORT_BY: "Ordenar por\\:",
		      SORTS: {
		         DATE: "Data",
		         DATE_TOOLTIP: "Ordenar do histórico mais recente para as actualizações menos recentes",
		         DATE_TOOLTIP_REVERSE: "Ordenar do histórico menos recente para as actualizações mais recentes"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} às ${time}",
		             MONTH: "${d} de ${MMM}",
		             TODAY: "Hoje às ${time}",
		             YEAR: "${d} de ${MMM} de ${YYYY}",
		             YESTERDAY: "Ontem às ${time}",
		             TOMORROW: "${d} de ${MMM} de ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Este comentário",
			   REPLY_ACTION: "Responder",
		       REPLY_ACTION_TOOLTIP: "Responder a este comentário"
		   },
		   OAUTH: {
		      welcomeHeader: "Bem-vindo ao Connections",
		      continueBtnLabel: "Continuar",
		      continueBtnA11y: "Activar esta ligação irá abrir uma nova janela que lhe permitirá autorizar o acesso ao Connections.",
		      clickHere: "Faça clique aqui",
		      infoMsg: "É necessária a sua autorização para o Connections aceder aos seus dados.",
		      authorizeGadget: "${clickHere} para autorizar esta aplicação a aceder às suas informações do Connections.",
		      confirmAuthorization: "${clickHere} para confirmar que autorizou esta aplicação a aceder às suas informações do Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Activar esta ligação irá abrir uma nova janela que permitirá autorizar o acesso ao repositório de bibliotecas do Connections.",
		      infoMsg: "É necessária a sua autorização para o repositório de bibliotecas do Connections aceder aos seus dados.",
		      authorizeGadget: "${clickHere} para autorizar esta aplicação a aceder às suas informações do repositório de bibliotecas do Connections.",
		      confirmAuthorization: "${clickHere} para confirmar que autorizou esta aplicação a aceder às suas informações do repositório de bibliotecas do Connections."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Cancelar",
		      CONFIRM: "Tem a certeza de que pretende abandonar as alterações?  Prima OK para continuar ou Cancelar para retroceder.",
		      DIALOG_TITLE: "Confirmar",
		      NAME: "Confirmar",
		      OK: "OK",
		      TOOLTIP: "Confirmar"
		   }
});

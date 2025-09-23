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
		         tooltip: "Mais Ações"
		       },
		       tags_more: "e ${0} mais",
		       ERROR_ALT: "Erro",
		       PERSON_TITLE: "Abrir o perfil de ${user}.",
		       inactiveUser: "${user} (inativo)",
		       inactiveIndicator: "(inativo)",
		       like_error: "Seu Curtir não pôde ser salvo. Tente novamente mais tarde.",
		       vote_error: "Seu voto não pôde ser salvo. Tente novamente mais tarde."
		   },
		   generic: {
		      untitled: "(Sem título)",
		      tags: "marcações:",
		      tags_more: "e ${0} mais",
		      likes: "Operações Curtir",
		      comments: "Comentários",
		      titleTooltip: "Navegar para ${app}",
		      error: "Impossível recuperar dados.",
		      timestamp: {
		         created: {
		            DAY: "${EEEE} criado às ${time}",
		            MONTH: "Criado em ${MMM} ${d}",
		            TODAY: "Criado hoje às ${time}",
		            YEAR: "Criado em ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Criado ontem às ${time}",
		            TOMORROW: "Criado em ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "${EEEE} atualizado às ${time}",
		            MONTH: "Atualizado em ${MMM} ${d}",
		            TODAY: "Atualizado hoje às ${time}",
		            YEAR: "Atualizado em ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Atualizado ontem às ${time}",
		            TOMORROW: "Atualizado em ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Público",
		         priv: "Privado"
		      },
		      action: {
		         created: "Criado",
		         updated: "Atualizado"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Receba atualizações sobre as pessoas que você está seguindo na Página Inicial e em um resumo por e-mail.",
		      profile_title: "Abrir o perfil de ${user}.",
		      profile_a11y: "A ativação deste link abrirá o perfil de ${user} em uma nova janela.",
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "A solicitação da rede não existe mais.",
		      warning: "Aviso",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Você está agora nos contatos da rede.",
		            	follow: "Você está agora nos contatos da rede e está seguindo ${user}."
		            },
		            ignore: {
		            	nofollow: "Você ignorou o convite.",
		            	follow: "Você ignorou o convite, mas agora está seguindo ${user}."
		            }
		         },
		         error: {
		            accept: "Houve um erro ao aceitar a solicitação.",
		            ignore: "Houve um erro ao ignorar a solicitação."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} às ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "Hoje às ${time}",
		              YEAR: "${MMM} ${d}, ${YYYY}",
		              YESTERDAY: "Ontem às ${time}",
		              TOMORROW: "${MMM} ${d}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "A ativação deste link abrirá ${name} em uma nova janela.",
		      tooltip: "Abrir ${name} no aplicativo Arquivos",
		      profile_title: "Abrir o perfil de ${user}.",
		      profile_a11y: "A ativação deste link abrirá o perfil de ${user} em uma nova janela.",
		      download_tooltip: "Fazer download deste arquivo (${0})",
		      following: {
		         add: "Seguir Arquivo",
		         remove: "Parar de Seguir",
		         title: "Alternar se você receberá as atualizações sobre este arquivo"
		      },
		      share: {
		         label: "Compartilhar",
		         title: "Forneça aos outros acesso a este arquivo"
		      },
		      timestamp: {
		         created: {
		            DAY: "${EEEE} criado às ${time}",
		            MONTH: "Criado em ${MMM} ${d}",
		            TODAY: "Criado hoje às ${time}",
		            YEAR: "Criado em ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Criado ontem às ${time}",
		            TOMORROW: "Criado em ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} criou em ${EEEE} às ${time}",
		            MONTH: "${user} criou em ${MMM} ${d}",
		            TODAY: "${user} criou hoje às ${time}",
		            YEAR: "${user} criou em ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} criou ontem às ${time}",
		            TOMORROW: "${user} criou em ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "${EEEE} atualizado às ${time}",
		            MONTH: "Atualizado em ${MMM} ${d}",
		            TODAY: "Atualizado hoje às ${time}",
		            YEAR: "Atualizado em ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Atualizado ontem às ${time}",
		            TOMORROW: "Atualizado em ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} atualizado em ${EEEE} às ${time}",
		            MONTH: "${user} atualizado em ${MMM} ${d}",
		            TODAY: "${user} atualizado hoje às ${time}",
		            YEAR: "${user} atualizado em ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} atualizado ontem às ${time}",
		            TOMORROW: "${user} atualizado em ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Criado: ${EEEE} às ${time}",
		            MONTH: "Criado: ${MMM} ${d}",
		            TODAY: "Criado: Hoje às ${time}",
		            YEAR: "Criado: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Criado: Ontem às ${time}",
		            TOMORROW: "Criado: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Atualizado: ${EEEE} às ${time}",
		            MONTH: "Atualizado: ${MMM} ${d}",
		            TODAY: "Atualizado: Hoje às ${time}",
		            YEAR: "Atualizado: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Atualizado: Ontem às ${time}",
		            TOMORROW: "Atualizado: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} pelo ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} pelo ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Fazer download deste arquivo (${size})",
		      	 DOWNLOAD_ALT: "Download"
		      },
		      PREVIEW: {
		         LINK: "Visualização prévia",
		         TITLE: "Visualize este arquivo em uma nova janela."
		      },
		      TAGS: "marcações:",
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "O arquivo não existe mais ou você não tem permissões suficientes para acessá-lo.",
		      error_403: "Você não tem permissão para visualizar este arquivo. O arquivo não é público e não é compartilhado com você.",
		      notifications: {
		         USER_SHARED: "${user} escreveu:",
		         CHANGE_SUMMARY: "${user} forneceu o resumo de mudanças",
		         NO_CHANGE_SUMMARY: "${user} não forneceu um resumo de mudanças",
		         COMMENTED: "${user} comentou"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Registro de saída efetuado por você",
		      checkedout_other: "Registro de saída efetuado por ${user}",
		      tooltip: "Abra o arquivo ${name} na biblioteca",
		      draft_404_info: "O rascunho foi excluído ou não está mais compartilhado com você. A versão publicada é agora a versão mais recente deste arquivo.",
		      error_404: "O arquivo foi excluído ou não está mais compartilhado com você.",
		      error_403: "O arquivo foi excluído ou não está mais compartilhado com você.",
		      error_preview: "O arquivo não está mais disponível para visualização.",
		      draft_review_canceled: "A revisão foi cancelada e o rascunho não está mais compartilhado com você. Sua revisão não é mais solicitada.",
		      switch_ee: "Visualizar rascunho",
		      switch_ee_tooltip: "Visualizar o rascunho mais recente deste arquivo"
		   },
		   ecm_draft: {
		      tooltip: "Abra o rascunho ${name} na biblioteca",
		      community_owners: "Proprietários da Comunidade",
		      draft: "Rascunho",
		      draft_tooltip: "Visualizando o rascunho",
		      draft_general_info: "O rascunho anterior não existe mais e um rascunho mais recente é agora a versão mais recente.",
		      draft_review_404_general_info: "Um dos revisores já votou. Você não é mais solicitado a revisar este rascunho.",
		      draft_review_404_request_info: "O rascunho anterior não existe mais e o rascunho mais recente foi enviado para revisão. Sua revisão é solicitada.",
		      draft_review_404_require_info: "O rascunho anterior não existe mais e o rascunho mais recente foi enviado para revisão. Sua revisão é necessária.",
		      draft_review_request_info: "Sua revisão é solicitada.",
		      draft_review_require_info: "Sua revisão é necessária.",
		      error_404: "O rascunho foi excluído ou não está mais compartilhado com você.",
		      error_403: "Não é possível visualizar este rascunho porque ele não está compartilhado com você.",
		      error_preview: "O rascunho não está mais disponível para visualização.",
		      switch_ee: "Visualizar versão publicada",
		      switch_ee_tooltip: "Visualizar a versão publicada deste arquivo",
		      review: "Revisão",
		      reviewers: "Revisores",
		      reviwers_addtl: "Revisores Adicionais",
		      in_review: "Rascunho em Revisão",
		      in_review_tooltip: "Visualizando rascunho em revisão",
		      review_required_any: "Os Proprietários da Comunidade requerem que um revisor revise este rascunho.",
		      review_required_all: "Os Proprietários da Comunidade requerem que todos os revisores revisem este rascunho.",
		      review_required_generic: "Os Proprietários da Comunidade requerem que esses revisores revisem este rascunho.",
		      review_additional_required: "Todos os revisores incluídos pelo requisitante de rascunho são necessários para revisar este rascunho.",
		      reivew_submitted_date: {
		         DAY: "${user} enviou o rascunho para revisão em ${EEEE} às ${time}.",
		         MONTH: "${user} enviou o rascunho para revisão em ${MMM} ${d}.",
		         TODAY: "${user} enviou o rascunho para revisão hoje às ${time}.",
		         YEAR: "${user} enviou o rascunho para revisão em ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} enviou o rascunho para revisão ontem às ${time}.",
		         TOMORROW: "${user} enviou o rascunho para revisão em ${MMM} ${d}, ${YYYY}."
		      },
		      pending: "Pendente",
		      pending_rejected: "A revisão não é mais necessária porque o rascunho foi rejeitado",
		      approve: "Aprovar",
		      approved: "Aprovado",
		      approve_tooltip: "Aprovar este rascunho",
		      accept_success: "Você aprovou este rascunho.",
		      accept_error: "Houve um erro ao aprovar este rascunho. Tente novamente.",
		      accept_info: "Você aprovou este rascunho.",
		      reject: "Rejeitar",
		      rejected: "Rejeitado",
		      reject_tooltip: "Rejeitar este rascunho",
		      reject_success: "Você rejeitou este rascunho.",
		      reject_error: "Houve um erro ao rejeitar este rascunho. Tente novamente.",
		      reject_info: "Você rejeitou este rascunho."
		   },
		   authUser: {
		      error: "Ocorreu um erro ao recuperar o usuário atual.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "Não é possível localizar o usuário autenticado.",
		      error_403: "Você não tem permissão para recuperar informações sobre o usuário."
		   },
		   forum: {
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "O fórum não existe mais ou você não tem permissões suficientes para acessá-lo.",
		      error_403: "Você não tem permissão para visualizar este fórum. O fórum não é público e não está compartilhado com você.",
		      readMore: "Visualize o tópico integral...",
		      readMore_tooltip: "Abra o tópico do fórum ${name}.",
		      readMore_a11y: "A ativação deste link abrirá o tópico do fórum ${name} em uma nova janela.",
		      QUESTION_ANSWERED: "Esta pergunta já foi respondida.",
		      QUESTION_NOT_ANSWERED: "Esta pergunta ainda não foi respondida.",
		      attachments: "Fazer ${count} dos Anexos",
		      attachments_one: "${count} Anexo"
		   },
		   blog: {
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "O blog não existe mais ou você não tem permissões suficientes para acessá-lo.",
		      error_403: "Você não possui permissão para visualizar este blog. O blog não é público e não está compartilhado com você.",
		      readMore: " Leia mais ...",
		      readMore_tooltip: "Abra a entrada de blog ${name}.",
		      readMore_a11y: "A ativação deste link abrirá a entrada de blog ${name} em uma nova janela.",
		      graduated: "Graduado",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Votar</a>",
		  					TOOLTIP: 	"Votar nisto"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Votado</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Votado</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Desfazer</a>",
		  					TOOLTIP: 	"Remover seu voto disto"
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
		  			LOADING: "Carregando...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Votado"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Não foi possível salvar seu voto porque você atingiu seu limite de votação ou a ideia não está mais disponível para você.",
		      readMore_tooltip: "Abra a ideia ${name}.",
		      readMore_a11y: "A ativação deste link abrirá a ideia ${name} em uma nova janela."
		   },
		   size: {
		      B: "${0}B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Respostas",
		      THIS_ARIA_LABEL: "Esta Resposta",
		      THIS_TAB_TITLE: "Esta Resposta",
		      TAB_TITLE: "Respostas (${0})",
		      REPLY_TO_REPLY: "Em resposta a ${thisReply}",
		      REPLY_TO_TOPIC: "Em resposta a ${thisTopic}",
		      THIS_TOPIC: "este tópico",
		      THIS_REPLY: "esta resposta",
		      NAVIGATE_TO_REPLY: "Navegar para a resposta pai",
		      NAVIGATE_TO_TOPIC: "Navegar para o tópico pai",
		      ADD_COMMENT: "Responder a este tópico",
		      ADD_COMMENT_TOOLTIP: "Responder a este tópico do fórum",
		      SHOWING_RECENT_REPLIES: "Mostrando ${0} respostas mais recentes",
		      PREV_COMMENTS: "Mostrar Mais Respostas",
		      PLACEHOLDER_TXT: "Responder a este tópico",
		      EMPTY: "Não há respostas.",
		      TRIM_LONG_COMMENT: "Reduzir a resposta?",
		      WARN_LONG_COMMENT: "A resposta é muito longa.  ${shorten}",
		      ERROR: "Ocorreu um erro ao recuperar as respostas. ${again}",
		      ERROR_CREATE: "Sua resposta não pôde ser salva.  Tente novamente mais tarde.",
		      ERROR_CREATE_NOT_FOUND: "Sua resposta não pôde ser salva porque o tópico foi excluído ou não está mais visível para você.",
		      ERROR_CREATE_ACCESS_DENIED: "Sua resposta não pôde ser salva porque o tópico foi excluído ou não está mais visível para você.",
		      ERROR_CREATE_TIMEOUT: "Sua resposta não pôde ser salva porque o servidor não pôde ser contatado.  Clique em 'Salvar' para tentar novamente.",
		      ERROR_CREATE_CANCEL: "Sua resposta não pôde ser salva porque a solicitação foi cancelada.  Clique em 'Salvar' para tentar novamente.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Você deve estar com login efetuado para criar esta resposta.  Clique em 'Salvar' para que o login seja solicitado.",
		      ERROR_NO_CONTENT: "Insira sua resposta e clique em 'Salvar.'  Se você não desejar mais deixar uma resposta, clique em 'Cancelar.'",
		      ERROR_UNAUTHORIZED: "Sua resposta não pode ser salva porque você não possui autorização para deixar respostas.",
		      COMMENT_DELETED: {
		         DAY: "Resposta excluída por ${user} em ${EEEE} às ${time}",
		         MONTH: "Resposta excluída por ${user} em ${MMM} ${d}",
		         TODAY: "Resposta excluída por ${user} hoje às ${time}",
		         YEAR: "Resposta excluída por ${user} em ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Resposta excluída por ${user} ontem às ${time}",
		         TOMORROW: "Resposta excluída por ${user} em ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Razão da exclusão: ${reason}",
		      REPLY_TITLE: "Re: ${0}",
		      SHOW_FULL_REPLY: "Visualizar resposta completa",
		      SHOW_FULL_REPLY_TOOLTIP: "Navegar para a resposta original no tópico do fórum",
		      REPLY_ACTION: "Responder",
		      REPLY_ACTION_TOOLTIP: "Responder a este post",
		      MODERATION_PENDING: "Esta resposta tem uma revisão pendente.",
		      MODERATION_QUARANTINED: "O post ficou em quarentena pelo moderador.",
		      MODERATION_REMOVED: {
		         DAY: "Essa resposta foi removida por ${user} em ${EEEE} às ${time}.",
		         MONTH: "Essa resposta foi removida por ${user} em ${MMM} ${d}.",
		         TODAY: "Essa resposta foi removida por ${user} hoje às ${time}.",
		         YEAR: "Essa resposta foi removida por ${user} em ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Essa resposta foi removida por ${user} ontem às ${time}.",
		         TOMORROW: "Essa resposta foi removida por ${user} em ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Essa resposta foi rejeitada por ${user} em ${EEEE} às ${time}.",
		         MONTH: "Essa resposta foi rejeitada por ${user} em ${MMM} ${d}.",
		         TODAY: "Essa resposta foi rejeitada por ${user} hoje às ${time}.",
		         YEAR: "Essa resposta foi rejeitada por ${user} em ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Essa resposta foi rejeitada por ${user} ontem às ${time}.",
		         TOMORROW: "Essa resposta foi rejeitada por ${user} em ${MMM} ${d}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Sua resposta foi enviada para revisão e estará disponível quando aprovada."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Comentários",
		      PLACEHOLDER_TXT: "Incluir um Comentário",
		      TAB_TITLE: "Comentários (${0})",
		      ACTION_NOT_SUPPORTED: "Ação Não Suportada",
		      ADD_COMMENT: "Incluir um Comentário",
		      ADD_COMMENT_TOOLTIP: "Inclua um comentário neste item",
		      CANCEL: "Cancelar",
		      COMMENT_COUNT_ONE: "${0} comentário",
		      COMMENT_COUNT_MANY: "${0} comentários",
		      COMMENT_LABEL: "Comentário:",
		      DELETE: "Excluir",
		      DELETE_TOOLTIP: "Excluir comentário",
		      DELETEREASON: "Motivo para excluir este comentário:",
		      DIALOG_TITLE: "Reduzir Comentário",
		      TOOLTIP: "Reduzir Comentário",
		      NAME: "Reduzir Comentário",
		      EDIT: "Editar",
		      EDIT_TOOLTIP: "Editar comentário",
		      ERROR_CREATE: "Seu comentário não pôde ser salvo.  Tente novamente mais tarde.",
		      ERROR_CREATE_NOT_FOUND: "Seu comentário não pôde ser salvo porque o item foi excluído ou não está mais visível para você.",
		      ERROR_CREATE_ACCESS_DENIED: "Seu comentário não pôde ser salvo porque o item foi excluído ou não está mais visível para você.",
		      ERROR_CREATE_TIMEOUT: "Seu comentário não pôde ser salvo porque o servidor não pôde ser contatado.  Clique em 'Postar' para tentar novamente.",
		      ERROR_CREATE_CANCEL: "Seu comentário não pôde ser salvo porque a solicitação foi cancelada.  Clique em 'Postar' para tentar novamente.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Você deve ter efetuado login para criar este comentário.  Clique em 'Postar' para que o login seja solicitado.",
		      ERROR_DELETE: "Seu comentário não pôde ser excluído.  Tente novamente mais tarde.",
		      ERROR_DELETE_TIMEOUT: "Seu comentário não pôde ser excluído porque o servidor não pôde ser contatado.  Clique em 'Excluir' para tentar novamente.",
		      ERROR_DELETE_NOT_FOUND: "Seu comentário não pôde ser excluído porque o comentário ou item foi excluído ou não está mais visível para você.",
		      ERROR_DELETE_ACCESS_DENIED: "Seu comentário não pôde ser excluído porque o item foi excluído ou não está mais visível para você.",
		      ERROR_DELETE_CANCEL: "Seu comentário não pôde ser excluído porque a solicitação foi cancelada.  Clique em 'Excluir' para tentar novamente.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Você deve ter efetuado login para excluir este comentário.  Clique em 'Excluir' para que o login seja solicitado.",
		      ERROR_EDIT: "Seu comentário não pôde ser atualizado.  Tente novamente mais tarde.",
		      ERROR_EDIT_ACCESS_DENIED: "Seu comentário não pôde ser atualizado porque o item foi excluído ou não está mais visível para você.",
		      ERROR_EDIT_NOT_FOUND: "Seu comentário não pôde ser atualizado porque o item foi excluído ou não está mais visível para você.",
		      ERROR_EDIT_TIMEOUT: "Seu comentário não pôde ser atualizado porque o servidor não pôde ser contatado.  Clique em 'Postar' para tentar novamente.",
		      ERROR_EDIT_CANCEL: "Seu comentário não pôde ser atualizado porque a solicitação foi cancelada.  Clique em 'Postar' para tentar novamente.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Você deve ter efetuado login para editar este comentário.  Clique em 'Postar' para que o login seja solicitado.",
		      ERROR_NO_CONTENT: "Insira seu comentário e clique em 'Postar'.  Se não desejar mais deixar um comentário, clique em 'Cancelar.'",
		      ERROR_NO_CONTENT_EDIT: "Insira seu comentário e clique em 'Postar'.  Se não desejar mais editar seu comentário, clique em 'Cancelar.'",
		      ERROR_UNAUTHORIZED: "Seu comentário não pode ser salvo porque você não tem autorização para deixar comentários.",
		      ERROR_GENERAL: "Ocorreu um erro.",
		      OK: "OK",
		      YES: "Sim",
		      TRIM_LONG_COMMENT: "Reduzir o comentário?",
		      WARN_LONG_COMMENT: "O comentário é muito longo.  ${shorten}",
		      LINK: "Link",
		      SAVE: "Salvar",
		      POST: "Postar",
		      SHOWMORE: "Leia mais...",
		      VIEW_COMMENTS_FILE: "Visualizar comentários deste arquivo",
		      SUBSCRIBE_TO_COMMENTS: "Assinar esses comentários",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Siga as mudanças nestes comentários através do seu leitor de feeds",
		      PROFILE_TITLE: "Abrir o perfil de ${user}.",
		      PROFILE_A11Y: "A ativação deste link abrirá o perfil de ${user} em uma nova janela.",
		      MODERATION_PENDING: "Este comentário tem uma revisão pendente.",
		      MODERATION_REMOVED: {
		         DAY: "Este comentário foi removido por ${user} em ${EEEE} às ${time}.",
		         MONTH: "Este comentário foi removido por ${user} em ${MMM} ${d}.",
		         TODAY: "Este comentário foi removido por ${user} hoje às ${time}.",
		         YEAR: "Este comentário foi removido por ${user} em ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Este comentário foi removido por ${user} ontem às ${time}.",
		         TOMORROW: "Este comentário foi removido por ${user} em ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Este comentário foi rejeitado por ${user} em ${EEEE} às ${time}.",
		         MONTH: "Este comentário foi rejeitado por ${user} em ${MMM} ${d}.",
		         TODAY: "Este comentário foi rejeitado por ${user} hoje às ${time}.",
		         YEAR: "Este comentário foi rejeitado por ${user} em ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Este comentário foi rejeitado por ${user} ontem às ${time}.",
		         TOMORROW: "Este comentário foi rejeitado por ${user} em ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Mostrar Comentários Anteriores",
		      EMPTY: "Não há comentários.",
		      ERROR_ALT: "Erro",
		      ERROR: "Ocorreu um erro ao recuperar os comentários. ${again}",
		      ERROR_ADDTL: "Ocorreu um erro ao recuperar comentários adicionais. ${again}",
		      ERROR_AGAIN: "Tente novamente.",
		      ERROR_AGAIN_TITLE: "Tente a solicitação novamente para obter mais comentários.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} às ${time} (versão ${version})",
		         MONTH: "${user} ${MMM} ${d} (versão ${version})",
		         TODAY: "${user} hoje às ${time} (versão ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (versão ${version})",
		         YESTERDAY: "${user} ontem às ${time} (versão ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (versão ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} às ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} hoje às ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} ontem às ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} às ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "Hoje às ${time}",
		         YEAR: "${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Ontem às ${time}",
		         TOMORROW: "${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Comentário excluído por ${user} em ${EEEE} às ${time}",
		         MONTH: "Comentário excluído por ${user} em ${MMM} ${d}",
		         TODAY: "Comentário excluído por ${user} hoje às ${time}",
		         YEAR: "Comentário excluído por ${user} em ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Comentário excluído por ${user} ontem às ${time}",
		         TOMORROW: "Comentário excluído por ${user} em ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} editou ${EEEE} às ${time} (versão ${version})",
		         MONTH: "${user} editou ${MMM} ${d} (versão ${version})",
		         TODAY: "${user} editado hoje às ${time} (versão ${version})",
		         YEAR: "${user} editou ${MMM} ${d}, ${YYYY} (versão ${version})",
		         YESTERDAY: "${user} editado ontem às ${time} (versão ${version})",
		         TOMORROW: "${user} editou ${MMM} ${d}, ${YYYY} (versão ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} editou ${EEEE} às ${time}",
		         MONTH: "${user} editou ${MMM} ${d}",
		         TODAY: "${user} editado hoje às ${time}",
		         YEAR: "${user} editou ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} editado ontem às ${time}",
		         TOMORROW: "${user} editou ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Tem certeza de que deseja excluir este comentário?",
		      FLAG_ITEM: {
		         BUSY: "Salvando...",
		         CANCEL: "Cancelar",
		         ACTION: "Sinalizar como Impróprio",
		         DESCRIPTION_LABEL: "Forneça uma razão para sinalizar este item (opcional)",
		         EDITERROR: "Os metadados do arquivo não foram editados devido a um erro",
		         OK: "Salvar",
		         ERROR_SAVING: "Houve um erro ao processar a solicitação. Tente novamente mais tarde.",
		         SUCCESS_SAVING: "Sua sinalização foi enviada. Um moderador investigará a questão em breve.",
		         TITLE: "Sinalizar este item como inadequado",
		         COMMENT: {
		            TITLE: "Sinalizar este comentário como impróprio",
		            A11Y: "Este botão abrirá um diálogo que permite que o usuário sinalize este comentário como inadequado."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Cancelar",
		      DIALOG_TITLE: "Excluir Comentário",
		      NAME: "Excluir Comentário",
		      OK: "OK",
		      TOOLTIP: "Excluir Comentário"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Cancelar",
		      CONFIRM: "A redução removerá o texto além do limite do comentário.  Clique em 'OK' para reduzir ou em 'Cancelar' para que você mesmo edite o comentário.",
		      DIALOG_TITLE: "Reduzir Comentário",
		      NAME: "Reduzir Comentário",
		      OK: "OK",
		      TOOLTIP: "Reduzir Comentário"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Confirmação de Envio",
		      CONFIRM: "Seu comentário foi enviado para revisão e estará disponível quando aprovado.",
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
		      ADDED: { DAY: "${EEee} incluído às ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Incluído ${date_long}",
		         TODAY: "Incluído hoje às ${time}",
		         YEAR: "Incluído ${date_long}",
		         YESTERDAY: "Incluído ontem às ${time}"
		      },
		      LAST_UPDATED: { DAY: "Última atualização ${EEee} às ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Última atualização ${date_long}",
		         TODAY: "Última atualização hoje às ${time}",
		         YEAR: "Última atualização ${date_long}",
		         YESTERDAY: "Última atualização ontem às ${time}"
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
		      UPDATED: { DAY: "${EEee} atualizado às ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Atualizado em ${date_long}",
		         TODAY: "Atualizado hoje às ${time}",
		         YEAR: "Atualizado em ${date_long}",
		         YESTERDAY: "Atualizado ontem às ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Não é possível carregar informações de versão.",
		      ERROR_REQUEST_CANCELLED: "A solicitação foi cancelada.",
		      ERROR_REQUEST_TIMEOUT: "O servidor não pôde ser contatado.",
		      ERROR_REQUEST_UNKNOWN: "Ocorreu um erro desconhecido.",
		      LOADING: "Carregando ..",
		      NO_VERSIONS: "Não há versões",
		      INFO: "Versão ${0} criada ${1} por ",
		      VERSION_NUMBER: "Versão ${0}",
		      DELETED: "Excluído",
		      DELETE_ALL: "Excluir todas as versões anteriores à versão",
		      DELETE_VERSION_SINGLE: "Excluir versão ${0}",
		      DELETEERROR: "A versão não foi excluída devido a um erro.",
		      CREATE_VERSION: "Criar uma Nova Versão",
		      CREATE_VERSION_TOOLTIP: "Crie uma versão deste arquivo",
		      REVERT_VERSION: "Restaurar versão ${0}",
		      REVERT_DESCRIPTION: "Restaurado a partir da versão ${0}",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Página anterior",
		      ELLIPSIS: "...",
		      NEXT: "Avançar",
		      NEXT_TOOLTIP: "Próxima página",
		      COUNT: "${0}-${1} de ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Página",
		      SHOW: "Mostrar",
		      ITEMS_PER_PAGE: " itens por página.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
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
		        UPDATED: { DAY: "${EEee} atualizado às ${time}",
		            YEAR: "Atualizado em ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Atualizado em ${date_short}",
		            TODAY: "Atualizado hoje às ${time}",
		            YESTERDAY: "Atualizado ontem às ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Excluir versão ${0}",
		         DOWNLOAD: "Download",
		         DOWNLOAD_TOOLTIP: "Fazer Download desta Versão (${0})",
		         VIEW: "Visão",
		         VIEW_TOOLTIP: "Visualizar Versão ${0}",
		         REVERT: {
		            A11Y: "Esse botão abre um diálogo que permite ao usuário confirmar a restauração de um arquivo a partir de uma versão anterior. Confirmar essa ação resultará em uma atualização do conteúdo na página.",
		            FULL: "Restaurar",
		            WIDGET: "Restaurar esta versão"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "A versão não pôde ser excluída porque já havia sido excluída ou não está mais visível para você.",
		         ERROR_ACCESS_DENIED: "A versão não pôde ser excluída porque você não é um editor.",
		         ERROR_TIMEOUT: "A versão não foi excluída porque o servidor não pôde ser contatado.  Clique novamente em 'Excluir' ou tente fazer a solicitação novamente.",
		         ERROR_CANCEL: "A versão não foi excluída porque a solicitação foi cancelada.  Clique novamente em 'Excluir' ou tente fazer a solicitação novamente.",
		         ERROR_NOT_LOGGED_IN: "Você deve estar registrado para excluir esta versão.  Clique em 'Excluir' para que o login seja solicitado.",
		         GENERIC_ERROR: "A versão não pôde ser excluída por causa de um erro desconhecido.  Clique novamente em 'Excluir' ou tente fazer a solicitação novamente.",
		         FULL: "Excluir",
		         A11Y: "Esse botão abre um diálogo que permite ao usuário confirmar a exclusão desta versão. Confirmar essa ação resultará em uma atualização do conteúdo na página."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "A versão não pôde ser restaurada porque foi excluída ou não está mais visível para você.",
		         ERROR_ACCESS_DENIED: "A versão não pôde ser restaurada porque você não é um editor.",
		         ERROR_NAME_EXISTS: "A versão não pôde ser restaurada porque um outro arquivo possui o mesmo nome.",
		         ERROR_TIMEOUT: "A versão não foi restaurada porque o servidor não pôde ser contatado.  Clique de novo em 'Restaurar' para tentar a solicitação novamente.",
		         ERROR_CANCEL: "A versão não foi restaurada porque a solicitação foi cancelada.  Clique de novo em 'Restaurar' para tentar a solicitação novamente.",
		         ERROR_QUOTA_VIOLATION: "A versão não pôde ser restaurada devido a restrições de espaço.",
		         ERROR_MAX_CONTENT_SIZE: "A versão não pôde ser restaurada porque é maior que o tamanho máximo de arquivo permitido de ${0}",
		         GENERIC_ERROR: "A versão não pôde ser restaurada devido a um erro desconhecido.  Clique de novo em 'Restaurar' para tentar a solicitação novamente."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Ver quem fez download...",
		      PREVIOUS: "Anterior",
		      PREVIOUS_TOOLTIP: "Página anterior",
		      ELLIPSIS: "...",
		      NEXT: "Avançar",
		      NEXT_TOOLTIP: "Próxima página",
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
		         V_LATEST: "Você transferiu por download a versão mais recente deste arquivo.",
		         V_OLDER: "Você transferiu por download pela última vez a versão ${0} deste arquivo",
		         LOADING: "Carregando...",
		         EMPTY: "Apenas Usuários Anônimos",
		         ERROR: "Não é possível carregar informações de download"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Erro",
		      ERROR_ALT_TEXT: "Erro:",
		      ERROR_MSG_GENERIC: "Algo saiu errado.  Tente novamente.",
		      ERROR_MSG_NOT_AVAILABLE: "Este item foi excluído ou não está mais disponível.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "O conteúdo para este item não está disponível.",
		      ERROR_MSG_NO_ACCESS: "Você não possui mais acesso a este item.",
		      LOADING: "Carregando...",
		      TITLE_SU: "${author} postou uma mensagem.",
		      TITLE_NI: "${author} o convidou para ingressar em sua rede.",
		      AUTHOR_TITLE: "Visualizar perfil de ${author}",
		      OPEN_LINK: "Abrir ${title}",
		      CONFIRM_CLOSE_TITLE: "Confirmar",
		      CONFIRM_CLOSE_MESSAGE: "Tem certeza de que deseja abandonar suas alterações? Pressione OK para continuar ou Cancelar para retornar",
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
		           MONTH: "Criado: ${MMM} ${d}",
		           TODAY: "Criado: Hoje às ${time}",
		           YEAR: "Criado: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Criado: Ontem às ${time}",
		           TOMORROW: "Criado: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Ocorreu um erro.  ${again}.",
		      error_again: "Tente novamente",
		      error_404: "A atualização de status não existe mais.",
		      notifications: {
		         STATUS_UPDATE: "${user} postou uma mensagem",
		         USER_BOARD_POST: "${user} escreveu em seu quadro",
		         POST_COMMENT: "${user} escreveu:"
		      }
		   },
		   login: {
		      error: "Seu nome de usuário e/ou senha não correspondem a nenhuma conta existente. Tente novamente.",
		      logIn: "Efetuar Login",
		      password: "Senha:",
		      user: "Nome do usuário:",
		      welcome: "Efetue login no HCL Connections"
		   },
		   repost: {
		      name: "Postar novamente",
		      title: "Postar novamente essa atualização para meus seguidores ou comunidades",
		      msg_success: "A atualização foi postada com êxito novamente para seus seguidores.",
		      msg_generic: "Algo saiu errado.  Tente novamente."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Incluir",
		      ADD_TXT: "Inclua pessoas ou comunidades como leitores",
		      SHOW_MORE: "Mostrar mais...",
		      READER_IF_PUBLIC: "Todas as pessoas (público)",
		      READER_IF_PUBLIC_TOOLTIP: "Este arquivo é público e visível a qualquer pessoa",
		      EMPTY_READERS: "Nenhum",
		      READERS_LABEL: "Leitores:\u00a0",
		      EDITORS_LABEL: "Editores:\u00a0",
		      OWNER_LABEL: "Proprietário:\u00a0",
		      ERROR: "Não foi possível carregar as informações de compartilhamento",
		      ERROR_NOT_FOUND: "O arquivo que você solicitou foi excluído ou movido. Se alguém enviou este link a você, verifique se está correto.",
		      ERROR_ACCESS_DENIED: "Você não possui permissão para visualizar este arquivo.  O arquivo não é público e não é compartilhado com você.",
		      SHARE: "Compartilhar",
		      CANCEL: "Cancelar",
		      SHARE_WITH: "Compartilhar com:",
		      PERSON: "uma Pessoa",
		      COMMUNITY: "uma Comunidade",
		      PLACEHOLDER: "Nome ou e-mail da pessoa...",
		      MESSAGE: "Mensagem:",
		      MESSAGE_TXT: "Incluir uma mensagem opcional",
		      REMOVE_ITEM_ALT: "Remover ${0}",
		      NO_MEMBERS: "Nenhum",
		      A11Y_READER_ADDED: "Selecionou ${0} como leitor",
		      A11Y_READER_REMOVED: "Removeu ${0} como um leitor",
		      SELF_REFERENCE_ERROR: "Você não pode compartilhar com você mesmo.",
		      OWNER_REFERENCE_ERROR: "Você não pode compartilhar com o proprietário do arquivo.",
		      SHARE_COMMUNITY_WARN: "Compartilhar com a comunidade pública '${0}' tornará este arquivo público.",
		      SELECT_USER_ERROR: "Você deve selecionar pelo menos uma pessoa ou comunidade com a qual compartilhar",
		      WARN_LONG_MESSAGE: "A mensagem é muito longa.",
		      TRIM_LONG_MESSAGE: "Reduzir a mensagem?",
		      ERROR_SHARING: "O arquivo não pôde ser compartilhado.  Tente novamente mais tarde.",
		      INFO_SUCCESS: "O arquivo foi compartilhado com êxito.",
		      MAX_SHARES_ERROR: "O número máximo de compartilhamentos foi excedido.",
		      NOT_LOGGED_IN_ERROR: "O arquivo não foi compartilhado porque você não efetuou login.  Clique em 'Compartilhar'  para compartilhar o arquivo.",
		      TIMEOUT_ERROR: "O arquivo não foi compartilhado porque o servidor não pôde ser contatado.  Clique em 'Compartilhar' para tentar novamente.",
		      CANCEL_ERROR: "O arquivo não foi compartilhado porque a solicitação foi cancelada.  Clique em 'Compartilhar' para tentar novamente.",
		      NOT_FOUND_ERROR: "O arquivo foi excluído ou não está mais visível para você e não pode ser compartilhado.",
		      ACCESS_DENIED_ERROR: "Você não tem mais permissão para compartilhar este arquivo.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Um arquivo restrito não pode ser tornado público.",
		      TOOLTIP: "Forneça aos outros acesso a este arquivo"
		   },
		   HISTORY: {
		      TAB_TITLE: "Atualizações Recentes",
		      NO_HISTORY: "Não há atualizações recentes.",
		      EMPTY: "Não foi possível recuperar as atualizações recentes deste item. Ele foi excluído ou você não têm mais acesso a ele.",
		      MORE: "Mostrar Atualizações Anteriores",
		      ERROR_ALT: "Erro",
		      ERROR: "Ocorreu um erro ao recuperar as atualizações. ${again}",
		      ERROR_ADDTL: "Ocorreu um erro ao recuperar atualizações adicionais. ${again}",
		      ERROR_AGAIN: "Tente novamente.",
		      ERROR_AGAIN_TITLE: "Tente a solicitação novamente para obter mais atualizações.",
		      PROFILE_TITLE: "Abrir o perfil de ${user}.",
		      SORT_BY: "Classificar por\\:",
		      SORTS: {
		         DATE: "Data",
		         DATE_TOOLTIP: "Classificar do histórico de mais recentes para atualizações menos recentes",
		         DATE_TOOLTIP_REVERSE: "Classificar do histórico de menos recentes para atualizações mais recentes"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} às ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "Hoje às ${time}",
		             YEAR: "${MMM} ${d}, ${YYYY}",
		             YESTERDAY: "Ontem às ${time}",
		             TOMORROW: "${MMM} ${d}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Este Comentário",
			   REPLY_ACTION: "Responder",
		       REPLY_ACTION_TOOLTIP: "Responder a este comentário"
		   },
		   OAUTH: {
		      welcomeHeader: "Bem-vindo ao Connections",
		      continueBtnLabel: "Continuar",
		      continueBtnA11y: "Ativar esse link abrirá uma nova janela que permitirá autorizar o acesso ao Connections.",
		      clickHere: "Clique aqui",
		      infoMsg: "O Connections precisa de autorização para acessar seus dados.",
		      authorizeGadget: "${clickHere} para autorizar este aplicativo a acessar suas informações do Connections.",
		      confirmAuthorization: "${clickHere} para confirmar que você autorizou este aplicativo a acessar suas informações do Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Ativar esse link abrirá uma nova janela que permitirá autorizar o acesso ao repositório da Biblioteca do Connections.",
		      infoMsg: "O repositório da Biblioteca do Connections precisa de autorização para acessar seus dados.",
		      authorizeGadget: "${clickHere} para autorizar este aplicativo a acessar suas informações do repositório da Biblioteca do Connections.",
		      confirmAuthorization: "${clickHere} para confirmar que você autorizou este aplicativo a acessar suas informações do repositório da Biblioteca do Connections."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Cancelar",
		      CONFIRM: "Tem certeza de que deseja abandonar suas alterações?  Pressione OK para continuar ou Cancelar para retornar.",
		      DIALOG_TITLE: "Confirmar",
		      NAME: "Confirmar",
		      OK: "OK",
		      TOOLTIP: "Confirmar"
		   }
});

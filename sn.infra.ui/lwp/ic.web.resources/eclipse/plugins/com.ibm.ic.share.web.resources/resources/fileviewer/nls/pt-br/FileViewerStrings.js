/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2021                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "Visualização do arquivo",
      FILENAME_TOOLTIP: "Editar nome do arquivo",
      ICON_TOOLTIP: "Fazer o download do arquivo",
      ERROR: "Ocorreu um erro.",
      FILE_MALICIOUS: "Varrendo conteúdo malicioso revelado",
      SHARED_EXTERNALLY: "Compartilhado externamente",
      FILE_SYNCED: "Incluir na sincronização",
      MY_DRIVE: {
         TITLE: "Na Minha Unidade",
         ROOT_FOLDER: "/Minha Unidade",
         FOLDER: "/Minha Unidade/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Mais Ações",
         A11Y: "Abre um menu suspenso com uma lista de mais ações para executar no arquivo.",
            PANELS: {
               TITLE: "Mais",
               A11Y: "Abre um menu suspenso com uma lista de painéis ocultos"
            }
      },
      WELCOME: {
         TITLE: "A Visualização de Arquivos e Detalhes foram combinadas",
         SUBTITLE: "Agora, é possível visualizar um arquivo e seus comentários lado a lado.",
         LINES: {
            LINE_1: "Todas as informações e coisas que eram possíveis de serem feitas na antiga página são encontradas aqui.",
            LINE_2: "Comentários, compartilhamentos, versões e informações básicas estão disponíveis ao lado do arquivo."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Este botão navega para o próximo arquivo.",
         PREVIOUS_A11Y: "Este botão navega para o arquivo anterior."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Mais opções de edição",
            A11Y: "Este botão abre um menu para mais opções de edição."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Editar"
            },
            UPLOAD: {
               TITLE: "Carregar"
            },
            CREATE: {
              TITLE: "Criar"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Redimensionar o painel",
           USAGE: "Pressione as teclas colchete esquerdo ou colchete direito para redimensionar o painel."
       },
         CLOSE: {
            TOOLTIP: "Fechar",
            A11Y: "Este botão fecha o visualizador de arquivo.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Seu arquivo ainda está fazendo upload.",
              PROMPT: "Seu arquivo ainda está fazendo upload. Se você fechá-lo antes de concluir, o upload será cancelado.",
              OK: "Fechar de Qualquer Maneira",
              CANCEL: "Aguardar Upload"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Incluir nos Arquivos",
           A11Y: "Este botão inclui o anexo para Arquivos.",
           VIEW_NOW: "Visualizar Agora"
         },
         TEAR_OFF: {
           TOOLTIP: "Abrir em uma nova janela",
           A11Y: "Abrir em uma nova janela",
           ERROR_TEARING_OFF: "Ocorreu um erro ao abrir uma nova janela.",
           DIALOG_TITLE: "Confirmar",
           UNSAVED_CHANGES_WARNING: "Você tem mudanças não salvas que serão perdidas. Deseja abrir em uma nova janela de qualquer forma?",
           OK: "Sim",
           CANCEL: "Não",
           OPEN: "Abrir",
           OPEN_ANYWAY: "Abrir de qualquer forma",
           CANCEL_ALT: "Cancelar"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Novo do Arquivo",
            ACTION_NAME:"Criar Arquivo",
            A11Y: {
               TEXT: "Crie um documento (arquivo DOC,DOCX ou ODT) a partir de um arquivo de modelo. É possível editar estes documentos online no Docs.",
               PRES: "Crie uma apresentação (arquivo PPT, PPTX ou ODP) a partir de um arquivo de modelo. É possível editar estas apresentações on-line no docs.",
               SHEET: "Crie uma planilha (arquivo XLS, XLSX ou ODS) a partir de um arquivo modelo. É possível editar estas planilhas on-line no docs."
            },
            PROMPT: {
               TEXT: "Crie um documento (arquivo DOC,DOCX ou ODT) a partir de um arquivo de modelo. É possível editar estes documentos online no Docs.",
               PRES: "Crie uma apresentação (arquivo PPT, PPTX ou ODP) a partir de um arquivo de modelo. É possível editar estas apresentações on-line no docs.",
               SHEET: "Crie uma planilha (arquivo XLS, XLSX ou ODS) a partir de um arquivo modelo. É possível editar estas planilhas on-line no docs."
            },
            NAME_FIELD: "Nome:",
            EXTERNAL_FIELD: "Arquivos podem ser compartilhados com pessoas de fora de minha organização",
            EXTERNAL_DESC: "O acesso externo permite que arquivos sejam compartilhados com usuários externos (pessoas fora de sua organização ou empresa), pastas compartilhadas com usuários externos e comunidades com pessoas externas como membros. Você deve configurar o acesso externo ao fazer upload de um arquivo; ele não pode ser ativado posteriormente.",
            CREATE_BUTTON: "Criar",
            CANCEL: "Cancelar",
            PRE_FILL_NAMES: {
               OTT: "Documento sem título",
               OTS: "Planilha sem título",
               OTP: "Apresentação sem título",
               DOT: "Documento sem título",
               XLT: "Planilha sem título",
               POT: "Apresentação sem título",
               DOTX: "Documento sem título",
               XLTX: "Planilha sem título",
               POTX: "Apresentação sem título"
            },
            ERRORS: {
               NAME_REQUIRED: "O nome do documento é requerido.",
               ILLEGAL_NAME:"Este é um título de documento ilegal, especifique outro.",
               WARN_LONG_NAME: "O nome do documento é muito longo.",
               TRIM_NAME: "Encurtar o nome do documento?",
               SESSION_TIMEOUT: "Sua sessão expirou, efetue login e tente novamente.",
               DUPLICATE_NAME: "Um nome de arquivo duplicado foi localizado. Insira um novo nome.",
               SERVER_ERROR: "O servidor Connections não está disponível. Entre em contato com o administrador do servidor e tente novamente mais tarde."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Fazer o download do arquivo",
            A11Y: "Este botão faz download do arquivo."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Fazer download como PDF",
            TOOLTIP: "Faça download deste arquivo como um arquivo PDF",
            A11Y: "Este botão faz download do arquivo como um PDF.",
            SUCCESS: "Você transferiu por download com sucesso o arquivo como um PDF.",
            ERROR: {
               DEFAULT: "Você não foi capaz de fazer download do arquivo como um PDF.  Tente novamente mais tarde.",
               UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Deve-se fazer log novamente antes de poder fazer download do arquivo como um PDF.",
               NOT_FOUND: "O arquivo não pôde ser transferido por download como um PDF porque o arquivo foi excluído ou não é mais compartilhado com você.",
               ACCESS_DENIED: "O arquivo não pôde ser transferido por download como um PDF porque o arquivo foi excluído ou não é mais compartilhado com você."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Não há nenhuma versão publicada desse arquivo para download.  As versões podem ser publicadas a partir do editor Docs."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Não é possível fazer download do arquivo",
               CANCEL: "Fechar",
               PROMPT: "Não há nenhuma versão publicada desse arquivo para download.",
               PROMPT2: "As versões podem ser publicadas a partir do editor Docs."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Não é possível fazer download do arquivo",
               CANCEL: "Fechar",
               PROMPT: "Não há nenhuma versão publicada desse arquivo para download.",
               PROMPT2: "Solicite ao proprietário do arquivo a publicação de uma versão desse arquivo."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Fazer download de uma versão",
               OK: "Fazer download da versão",
               PROMPT: {
                  TODAY: "Um rascunho mais recente, editado pela última vez hoje às ${time}, foi detectado.",
                  YESTERDAY: "Um rascunho mais recente, editado pela última vez ontem às ${time}, foi detectado.",
                  DAY: "Um rascunho mais recente, editado pela última vez em ${date}, foi detectado.",
                  MONTH: "Um rascunho mais recente, editado pela última vez em ${date}, foi detectado.",
                  YEAR: "Um rascunho mais recente, editado pela última vez em ${date_long}, foi detectado."
               },
               PROMPT2: {
                  TODAY: "Tem certeza de que deseja continuar a fazer download da versão que foi publicada hoje às ${time}?",
                  YESTERDAY: "Tem certeza de que deseja continuar a fazer download da versão que foi publicada ontem às ${time}?",
                  DAY: "Tem certeza de que deseja continuar a fazer download da versão que foi publicada em ${date}?",
                  MONTH: "Tem certeza de que deseja continuar a fazer download da versão que foi publicada em ${date}?",
                  YEAR: "Tem certeza de que deseja continuar a fazer download da versão que foi publicada em ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Mostrar painel de detalhes",
            HIDE: "Ocultar painel de detalhes",
            RESET: "Reconfigurar tamanho do painel",
            SHOW_A11Y: "Este botão alterna o painel lateral aberto e encerrado. O painel lateral está fechado atualmente.",
            HIDE_A11Y: "Este botão alterna o painel lateral aberto e encerrado. O painel lateral está aberto atualmente.",
            RESET_A11Y: "Este botão reconfigura o painel lateral de volta para o tamanho padrão. O painel lateral está atualmente expandido."
         },
         VIEW_DOC: {
            NAME: "Abrir no Docs Viewer",
            TOOLTIP: "Abrir no Docs Viewer",
            A11Y: "Este botão abre o arquivo para visualização dentro de uma nova janela do navegador."
         },
         EDIT_DOC: {
            NAME: "Editar em Docs",
            TOOLTIP: "Usar HCL Docs para editar esse arquivo",
            A11Y: "Este botão abre o arquivo para edição em Docs dentro de uma nova janela."
         },
         EDIT_OFFICE: {
            TITLE: "Opções de edição.",
            NAME: "Editar no Microsoft Office Online",
            TOOLTIP: "Usar Microsoft Office Online para editar esse arquivo",
            A11Y: "Este botão abre o arquivo para editar no Microsoft Office Online dentro de uma nova janela."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Editar no Microsoft Word Online",
           TOOLTIP: "Usar Microsoft Word Online para editar esse arquivo",
           A11Y: "Este botão abre o arquivo para editar no Microsoft Word Online dentro de uma nova janela."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Editar no Microsoft Excel Online",
             TOOLTIP: "Usar Microsoft Excel Online para editar esse arquivo",
             A11Y: "Este botão abre o arquivo para editar no Microsoft Excel Online dentro de uma nova janela."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Editar no Microsoft PowerPoint Online",
             TOOLTIP: "Usar Microsoft PowerPoint Online para editar esse arquivo",
             A11Y: "Este botão abre o arquivo para editar no Microsoft PowerPoint Online dentro de uma nova janela."
         },
         OFFICE_EDITED: {
             SUCCESS: "O arquivo está sendo salvo."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Editar na Área de Trabalho",
            DIALOG_TITLE: "Editar na Área de Trabalho",
            TOOLTIP: "Editar este documento",
            A11Y: "Este botão abre o arquivo para edição localmente.",
            PROMPT: "Este recurso permite editar usando o software instalado em seu computador.",
            INSTALL: "Antes de continuar, ${startLink}instale conectores de arquivo da área de trabalho${endLink}.",
			// The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Importante:",
            REMINDER: "Quando tiver concluído a edição, publique um rascunho usando os conectores de arquivo da área de trabalho.",
            SKIP_DIALOG: "Não mostrar essa mensagem novamente.",
            OK: "OK",
            CANCEL: "Cancelar"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Confirmar",
            DELETE_VERSION: "Excluir versão ${version}",
            DELETE_VERSION_AND_PRIOR: "Excluir versão ${version} e todas as versões anteriores",
            PROMPT: "Você está prestes a excluir a versão ${version}. Deseja continuar?",
            DELETE_PRIOR: "Excluir também todas as versões anteriores",
            ERROR: "Ocorreu um erro ao excluir a versão. Tente novamente mais tarde.",
            TOOLTIP: "Excluir esta versão",
            OK: "OK",
            CANCEL: "Cancelar"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Obter Links",
            LINK_FILE: "Link para o arquivo:",
            LINK_PREVIEW: "Link para visualização do arquivo:",
            LINK_DOWNLOAD: "Link para fazer download do arquivo:",
            TOOLTIP: "Link para o arquivo",
            OK: "Fechar"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Fazer download desta versão"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Confirmar",
            PROMPT: "Você está prestes a substituir a versão atual deste arquivo pela versão ${version}. Deseja continuar?",
            ERROR: "Ocorreu um erro ao restaurar a versão. Tente novamente mais tarde.",
            TOOLTIP: "Restaurar esta versão",
            CHANGE_SUMMARY: "Restaurado a partir da versão ${version}",
            OK: "OK",
            CANCEL: "Cancelar"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Confirmar",
            REMOVE_EVERYONE: "Tem certeza de que deseja remover o acesso da organização a este arquivo? Se o acesso for removido, o arquivo será removido das pastas e comunidades que permitem o acesso de nível da organização e apenas o proprietário e as pessoas com quem o arquivo foi compartilhado poderão visualizar e trabalhar com ele.",
            REMOVE_USER: "Tem certeza de que deseja parar de compartilhar com ${user}? Se você parar o compartilhamento, ${user} só poderá acessar esse arquivo por meio de pastas ou se for compartilhado com todos em sua organização.",
            REMOVE_COMMUNITY: "Tem certeza de que deseja remover este arquivo da comunidade ${communityName}?",
            REMOVE_FOLDER: "Tem certeza de que deseja remover este arquivo da pasta ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Remover o acesso da organização",
            REMOVE_USER_TOOLTIP: "Remover todos os compartilhamentos com ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Remover da comunidade ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Remover da pasta ${folderName}",
            OK: "OK",
            CANCEL: "Cancelar",
            EFSS: {
              DIALOG_TITLE: "Confirmar",
              REMOVE_EVERYONE: "Tem certeza de que deseja remover o acesso da organização a este arquivo? Se o acesso for removido, o arquivo será removido das pastas que permitem acesso de nível de organização e somente o proprietário e as pessoas com quem ele foi compartilhado poderão visualizar e trabalhar com ele.",
              REMOVE_USER: "Tem certeza de que deseja parar de compartilhar com ${user}? Se você parar o compartilhamento, ${user} só poderá acessar esse arquivo por meio de pastas ou se for compartilhado com todos em sua organização.",
              REMOVE_COMMUNITY: "Tem certeza de que deseja remover este arquivo da comunidade ${communityName}?",
              REMOVE_FOLDER: "Tem certeza de que deseja remover este arquivo da pasta ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Remover o acesso da organização",
              REMOVE_USER_TOOLTIP: "Remover todos os compartilhamentos com ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Remover da comunidade ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Remover da pasta ${folderName}",
              OK: "OK",
              CANCEL: "Cancelar",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Editar este comentário"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Confirmar",
            PROMPT: "Tem certeza de que deseja excluir este comentário?",
            ERROR: "Ocorreu um erro ao excluir o comentário. Tente novamente mais tarde.",
            TOOLTIP: "Excluir este comentário",
            OK: "OK",
            CANCEL: "Cancelar"
         },
         LIKE: {
            LIKE: "Curtir o arquivo",
            UNLIKE: "Descurtir o arquivo",
            LIKE_A11Y: "Este botão curte o arquivo.",
            UNLIKE_A11Y: "Este botão descurte o arquivo.",
            LIKED_SUCCESS: "Você curtiu este arquivo.",
            UNLIKE_SUCCESS: "Você descurtiu este arquivo"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Editar descrição",
            ERROR: {
               DEFAULT: "A descrição não pôde ser salva. Tente novamente mais tarde.",
               UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Deve-se efetuar login novamente antes de atualizar a descrição.",
               NOT_FOUND: "A descrição não pôde ser salva porque o arquivo foi excluído ou não é mais compartilhado com você.",
               ACCESS_DENIED: "A descrição não pôde ser salva porque o arquivo foi excluído ou não é mais compartilhado com você."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Erro ao salvar nome do arquivo",
               CONFLICT: "O nome do arquivo já existe"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Houve um erro ao seguir este arquivo. Tente novamente mais tarde.",
                  UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Deve-se efetuar login novamente antes de seguir este arquivo.",
                  NOT_FOUND: "Não é possível seguir este arquivo porque o arquivo foi excluído ou não está mais compartilhado com você.",
                  ACCESS_DENIED: "Não é possível seguir este arquivo porque o arquivo foi excluído ou não está mais compartilhado com você."
               },
               UNFOLLOW: {
                  DEFAULT: "Houve um erro ao parar de seguir este arquivo. Tente novamente mais tarde.",
                  UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Deve-se efetuar login novamente antes de parar de seguir este arquivo.",
                  NOT_FOUND: "Não é possível parar de seguir este arquivo porque o arquivo foi excluído ou não está mais compartilhado com você.",
                  ACCESS_DENIED: "Não é possível parar de seguir este arquivo porque o arquivo foi excluído ou não está mais compartilhado com você."
               }
            },
            FOLLOW_NAME: "Seguir",
            FOLLOW_TOOLTIP: "Seguir este arquivo",
            FOLLOW_A11Y: "Este botão segue o arquivo.",
            FOLLOW_SUCCESS: "Agora você está seguindo este arquivo.",
            STOP_FOLLOWING_NAME: "Parar de seguir",
            STOP_FOLLOWING_TOOLTIP: "Parar de seguir este arquivo",
            STOP_FOLLOWING_A11Y: "Este botão para de seguir o arquivo.",
            STOP_FOLLOWING_SUCCESS: "Você parou de seguir este arquivo."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Incluir na sincronização",
               TOOLTIP: "Incluir este arquivo na sincronização",
               A11Y: "Este botão inclui o arquivo na sincronização.",
               SUCCESS: "Você incluiu este arquivo na sincronização.",
               ERROR: {
                  DEFAULT: "Ocorreu um erro ao incluir este arquivo na sincronização. Tente novamente mais tarde.",
                  UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Deve-se efetuar login novamente antes de poder incluir este arquivo na sincronização.",
                  NOT_FOUND: "Não é possível incluir este arquivo na sincronização porque o arquivo foi excluído ou não é mais compartilhado com você.",
                  ACCESS_DENIED: "Não é possível incluir este arquivo na sincronização porque o arquivo foi excluído ou não é mais compartilhado com você."
               }
            },
            STOP_SYNC: {
               NAME: "Remover da sincronização",
               TOOLTIP: "Remover este arquivo da sincronização",
               A11Y: "Este botão remove o arquivo da sincronização.",
               SUCCESS: "Você removeu este arquivo da sincronização.",
               ERROR: {
                  DEFAULT: "Ocorreu um erro ao remover este arquivo da sincronização. Tente novamente mais tarde.",
                  UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Deve-se efetuar login novamente antes de poder remover este arquivo da sincronização.",
                  NOT_FOUND: "Não é possível remover este arquivo da sincronização porque o arquivo foi excluído ou não é mais compartilhado com você.",
                  ACCESS_DENIED: "Não é possível remover este arquivo da sincronização porque o arquivo foi excluído ou não é mais compartilhado com você."
               }
            },
            MYDRIVE: {
                NAME: "Incluir na Minha Unidade",
                TOOLTIP: "Inclua esse arquivo na Minha Unidade",
                A11Y: "Este botão inclui o arquivo na Minha Unidade.",
                SUCCESS: "Você incluiu esse arquivo na Minha Unidade.",
                ERROR: {
                   DEFAULT: "Ocorreu um erro ao incluir esse arquivo na Minha Unidade. Tente novamente mais tarde.",
                   UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Deve-se efetuar login novamente antes de poder incluir esse arquivo na Minha Unidade.",
                   NOT_FOUND: "Não é possível incluir esse arquivo na Minha Unidade porque o arquivo foi excluído ou não é mais compartilhado com você.",
                   ACCESS_DENIED: "Não é possível incluir esse arquivo na Minha Unidade porque o arquivo foi excluído ou não é mais compartilhado com você."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Remover da Minha Unidade",
                TOOLTIP: "Remova esse arquivo da Minha Unidade",
                A11Y: "Este botão remove o arquivo da Minha Unidade.",
                SUCCESS: "Você removeu esse arquivo da Minha Unidade.",
                ERROR: {
                   DEFAULT: "Houve um erro ao remover esse arquivo da Minha Unidade. Tente novamente mais tarde.",
                   UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Deve-se efetuar login novamente antes de poder remover esse arquivo da Minha Unidade.",
                   NOT_FOUND: "Não é possível remover esse arquivo da Minha Unidade porque o arquivo foi excluído ou não é mais compartilhado com você.",
                   ACCESS_DENIED: "Não é possível remover esse arquivo da Minha Unidade porque o arquivo foi excluído ou não é mais compartilhado com você."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Fixar",
            FAVORITE_TOOLTIP: "Fixar este arquivo",
            FAVORITE_A11Y: "Este botão fixa o arquivo.",
            FAVORITE_SUCCESS: "Você fixou este arquivo.",
            STOP_FAVORITEING_NAME: "Desafixar",
            STOP_FAVORITEING_TOOLTIP: "Desafixar este arquivo",
            STOP_FAVORITEING_A11Y: "Este botão desafixa o arquivo.",
            STOP_FAVORITEING_SUCCESS: "Você desafixou este arquivo."
         },
         TRASH: {
            NAME: "Mover para Lixeira",
            DIALOG_TITLE: "Confirmar",
            PROMPT: "Tem certeza de que deseja mover esse arquivo para a lixeira? Mover esse arquivo para a lixeira o torna indisponível para todos com quem ele é compartilhado no momento.",
            ERROR: "Ocorreu um erro ao excluir o arquivo. Tente novamente mais tarde.",
            TOOLTIP: "Excluir este arquivo",
            OK: "OK",
            CANCEL: "Cancelar",
            A11Y: "Este botão move o arquivo para a lixeira.",
            SUCCESS_MSG: "${file} foi movido para a lixeira."
         },
         REFRESH: {
            NAME: "Atualizar",
            ERROR: "Ocorreu um erro ao atualizar o File Viewer. Tente novamente mais tarde.",
            TOOLTIP: "Atualizar o File Viewer",
            INFO_MSG: "Atualize para obter o conteúdo mais recente. ${link}",
            A11Y: "Este botão move o arquivo para a lixeira.",
            SUCCESS_MSG: "O conteúdo foi atualizado com sucesso."
         },
         COPY_FILE: {
            NAME: "Fornecer Cópia à Comunidade",
            DIALOG_TITLE: "Confirmar",
            ERROR: "Ocorreu um erro ao copiar o arquivo. Tente novamente mais tarde.",
            TOOLTIP: "Forneça uma cópia deste arquivo a uma comunidade",
            OK: "OK",
            CANCEL: "Cancelar",
            A11Y: "Esse botão abre um diálogo que permite fornecer uma cópia desse arquivo para uma comunidade.",
            SUCCESS_MSG: "${file} foi copiado para ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Transferir Propriedade...",
            DIALOG_TITLE: "Transferir Propriedade",
            TOOLTIP: "Transferir a propriedade deste arquivo para outro usuário",
            A11Y: "Este botão abre um diálogo que permite transferir este arquivo para um novo proprietário.",
            EMPTY: "Esvaziar"
         },
         UPLOAD_VERSION: {
            NAME: "Fazer Upload de Nova Versão",
            NAME_SHORT: "Fazer upload",
            CHANGE_SUMMARY: "Resumo de mudanças opcionais...",
            TOOLTIP: "Fazer upload de uma nova versão deste arquivo",
            A11Y: "Este botão abre um diálogo que permite fazer upload de uma nova versão deste arquivo."
         },
         LOG_IN: {
            NAME: "Efetuar Login",
            TOOLTIP: "Efetuar login para fazer upload e compartilhamento de arquivos, comentar e criar pastas"
         },
         LOCK: {
            NAME: "Bloquear Arquivo",
            TITLE: "Bloqueie este arquivo",
            A11Y: "Bloqueie este arquivo",
            SUCCESS: "O arquivo está bloqueado agora.",
            ERROR: "O arquivo não pôde ser bloqueado porque ele foi excluído ou não está mais compartilhado com você."
         },
         UNLOCK: {
            NAME: "Desbloquear Arquivo",
            TITLE: "Desbloqueie este arquivo",
            A11Y: "Desbloqueie este arquivo",
            SUCCESS: "O arquivo está desbloqueado agora.",
            ERROR: "O arquivo não pôde ser desbloqueado, porque ele foi excluído ou não é mais compartilhado com você."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Editar na área de trabalho",
            TITLE: "Editar na área de trabalho",
            A11Y: "Editar na área de trabalho"
         },
         FLAG: {
            FILE: {
               NAME: "Sinalizar como Impróprio",
               TITLE: "Sinalizar Arquivo",
               A11Y: "Sinalizar este arquivo como impróprio",
               PROMPT: "Forneça uma razão para sinalizar este arquivo (opcional):",
               OK: "Sinalizar",
               CANCEL: "Cancelar",
               SUCCESS: "O arquivo foi sinalizado e enviado para revisão.",
               ERROR: "Erro ao sinalizar este arquivo, tente novamente mais tarde."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Êxito",
               PROMPT: "O arquivo foi sinalizado e enviado para revisão.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Sinalizar como Impróprio",
               TITLE: "Sinalizar Comentário",
               A11Y: "Sinalizar este comentário como impróprio",
               PROMPT: "Forneça uma razão para sinalizar este comentário (opcional):",
               OK: "Sinalizar",
               CANCEL: "Cancelar",
               SUCCESS: "O comentário foi sinalizado e enviado para revisão.",
               ERROR: "Erro ao sinalizar este comentário, tente novamente mais tarde."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Sucesso",
            PROMPT: "As mudanças foram enviadas para revisão. Esse arquivo não estará disponível até que as mudanças estejam aprovadas.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Botão suspenso"
      },
      SECTION: {
         ABOUT: {
            NAME: "Sobre este arquivo",
            VIEW_FILE_DETAILS: "Visualizar os detalhes do arquivo",
            A11Y: "Ativar este link fechará o visualizador de arquivos e direcionará você para a página de detalhes deste arquivo."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "Nenhuma visualização disponível para este arquivo."
         },
         IMAGE: {
            ZOOM_IN: "Aumentar zoom",
            ZOOM_OUT: "Diminuir zoom",
            RESET: "Reconfigurar",
            ZOOM_IN_A11Y: "Este botão aumenta zoom na imagem.",
            ZOOM_OUT_A11Y: "Este botão diminui zoom na imagem.",
            RESET_ZOOM_A11Y: "Este botão reconfigura o nível de zoom.",
            UNSAFE_PREVIEW: "Esse arquivo não pode ser visualizado porque ele não passou por varredura de vírus."
         },
         VIEWER: {
            LOADING: "Carregando...",
            PUBLISHING: "Publicando...",
            NO_PUBLISHED_VERSION: "Uma versão publicada deste arquivo não está disponível para visualização.",
            IFRAME_TITLE: "Visualização deste arquivo",
            AUTOPUBLISH_TIMEOUT: "O servidor está demorando muito para responder.  As mudanças mais recentes podem não ter sido publicadas."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Esse arquivo não pode ser visualizado porque ele não passou por varredura de vírus."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Atualizado pela última vez por ${user} hoje às ${time}",
            YESTERDAY: "Atualizado pela última vez por ${user} ontem às ${time}",
            DAY: "Atualizado pela última vez por ${user} em ${EEee} às ${time}",
            MONTH: "Atualizado pela última vez por ${user} em ${date_long}",
            YEAR: "Atualizado pela última vez por ${user} em ${date_long}"
         },
         CREATED: {
            TODAY: "Criado por ${user} hoje às ${time}",
            YESTERDAY: "Criado por ${user} ontem às ${time}",
            DAY: "Criado por ${user} em ${EEee} às ${time}",
            MONTH: "Criado por ${user} em ${date_long}",
            YEAR: "Criado por ${user} em ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - Hoje",
            YESTERDAY: "${time} - Ontem",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Hoje",
            YESTERDAY: "Ontem",
            DAY: "${EEee}",
            MONTH: "${date_long}",
            YEAR: "${date_long}"
         }
      },
      FILE_SIZE: {
         B: "${0}B",
         KB: "${0} KB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Área de texto comum",
         SHADOW_TEXT: "Incluir um comentário...",
         CANNOT_ACCESS_CONTENT: "As pessoas mencionadas a seguir não conseguirão visualizar o comentário porque não têm acesso ao conteúdo:",
         ERROR: "Um erro ocorreu ao validar o usuário que você está tentando mencionar.",
         POST: "Postar",
         SAVE: "Salvar",
         CANCEL: "Cancelar",
         EXTERNAL_WARNING: "Os comentários podem ser vistos por pessoas de fora da sua organização."
      },
      EDIT_BOX: {
         SAVE: "Salvar",
         CANCEL: {
            TOOLTIP: "Cancelar",
            A11Y: "Este botão cancela a ação de edição do nome do arquivo."
         },
         INVALID_CHARACTERS: "Caractere inválido",
         INVALID_CHARACTERS_REMOVED: "Caracteres inválidos removidos"
      },
      COMMENT_WIDGET: {
         EDITED: "(Editado)",
         EDITED_DATE: {
            TODAY: "Editado hoje às ${time}",
            YESTERDAY: "Editado ontem às ${time}",
            DAY: "Editado em ${EEee} às ${time}",
            MONTH: "Editado em ${date_long}",
            YEAR: "Editado em ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Salvar",
         CANCEL: "Cancelar",
         USER: "Pessoa",
         COMMUNITY: "Comunidade",
         SHARE: "Compartilhar",
         SHARE_ALT: "Compartilhar com esta pessoa",
         MEMBER_TYPE: "Tipo de Membro",
         PERSON_SHADOW: "Digite para localizar a pessoa",
         COMMUNITY_SHADOW: "Digite para localizar a comunidade",
         PERSON_ARIA: "Digite para localizar pessoa.  Pressione a tecla shift para mudar entre pessoas, comunidades e todos na organização.",
         COMMUNITY_ARIA: "Digite para localizar comunidade.  Pressione a tecla shift para mudar entre pessoas, comunidades e todos na organização.",
         PERSON_FULL_SEARCH: "Pessoa não listada? Usar procura completa...",
         COMMUNITY_FULL_SEARCH: "Comunidade não listada? Usar procura completa...",
         ADD_OPTIONAL_MESSAGE: "Incluir mensagem opcional",
         ROLE_LABEL: "Atribuição",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Leitor"
      },
      FILE_STATE: {
         DOCS_FILE: "Este é um arquivo de Docs. Todas as edições devem ser feitas on-line.",
         LOCKED_BY_YOU: {
            TODAY: "Bloqueado por você às ${time}.",
            YESTERDAY: "Bloqueado por você ontem às ${time}.",
            DAY: "Bloqueado por você em ${date}.",
            MONTH: "Bloqueado por você em ${date}.",
            YEAR: "Bloqueado por você em ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Bloqueado às ${time} por ${user}.",
            YESTERDAY: "Bloqueado ontem às ${time} por ${user}.",
            DAY: "Bloqueado em ${date} por ${user}.",
            MONTH: "Bloqueado em ${date} por ${user}.",
            YEAR: "Bloqueado em ${date_long} por ${user}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Reduzir este texto automaticamente",
         COMMENT: {
            WARN_TOO_LONG: "O comentário é muito longo.",
            TRIM: "Reduzir o comentário?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "A descrição é muito longa.",
            TRIM: "Reduzir a descrição?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "A mensagem é muito longa.",
            TRIM: "Reduzir a mensagem?"
         },
         TAG: {
            WARN_TOO_LONG: "A marcação é muito longa.",
            TRIM: "Reduzir marcação?"
         },
         TAGS: {
            WARN_TOO_LONG: "Uma ou mais marcações são muito longas.",
            TRIM: "Reduzir marcações?"
         },
         FILENAME: {
            WARN_TOO_LONG: "Nome de arquivo muito longo"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Este arquivo pode ser editado on-line por pessoas que tenham o HCL Docs.",
         NO_ENTITLEMENT_LINK: "Este arquivo pode ser editado on-line por pessoas que tenham ${startLink}HCL Docs${endLink}.",
		 // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Este arquivo está sendo editado atualmente na web por ${users}.",
         UNPUBLISHED_CHANGES: "Há edições para esse rascunho que não foram publicadas como uma versão.",
         PUBLISH_A_VERSION: "Publicar uma versão",
         PUBLISH_SUCCESS: "Você publicou com sucesso uma versão desse arquivo",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "A versão não pôde ser publicada porque o acesso foi negado.",
            NOT_FOUND: "A versão não pôde ser publicada porque o documento não foi localizado.",
            CANNOT_REACH_REPOSITORY: "A versão não pôde ser publicada porque o servidor Docs não consegue se conectar ao repositório de arquivo.",
            QUOTA_VIOLATION: "A versão não pôde ser publicada devido a restrições de espaço. Remova outros arquivos para liberar espaço suficiente para publicar essa versão.",
            CONVERSION_UNAVAILABLE: "A versão não pôde ser publicada porque o serviço de conversão Docs não está disponível. Tente novamente mais tarde.",
            TOO_LARGE: "A versão não pôde ser publicada porque o documento é muito grande.",
            CONVERSION_TIMEOUT: "A versão não pôde ser publicada porque o serviço de conversão Docs está demorando muito para converter o documento. Tente novamente mais tarde.",
            SERVER_BUSY: "A versão não pôde ser publicada porque o servidor Docs está ocupado. Tente novamente mais tarde.",
            DEFAULT: "A versão não pôde ser publicada porque o serviço Docs não está disponível. Tente novamente mais tarde."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Suas edições estão sendo publicadas. ${startLink}Atualize para ver suas mudanças.${endLink}",
            GENERIC: "Pode ser necessário atualizar a página para ver as mudanças mais recentes.  ${startLink}Atualizar${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Não há comentários.",
         MODERATED: "O comentário foi enviado para revisão e estará disponível quando aprovado.",
         ERROR: {
            SAVE: {
               DEFAULT: "Seu comentário não pôde ser salvo. Tente novamente mais tarde.",
               UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Efetue login novamente para poder salvar o comentário.",
               NOT_FOUND: "Seu comentário não pôde ser salvo porque o arquivo foi excluído ou não está mais compartilhado com você.",
               ACCESS_DENIED: "Seu comentário não pôde ser salvo porque o arquivo foi excluído ou não está mais compartilhado com você."
            },
            DELETE: {
               DEFAULT: "Seu comentário não pôde ser excluído. Tente novamente mais tarde.",
               UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Efetue login novamente para poder excluir seu comentário.",
               NOT_FOUND: "Seu comentário não pôde ser excluído porque o arquivo foi excluído ou não está mais compartilhado com você.",
               ACCESS_DENIED: "Seu comentário não pôde ser excluído porque o arquivo foi excluído ou não está mais compartilhado com você."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Salvar",
         EDIT_TAGS: "Editar Marcações",
         ERROR: {
            SAVE: {
               DEFAULT: "A marcação não pôde ser criada. Tente novamente mais tarde."
            },
            DELETE: {
               DEFAULT: "A marcação não pôde ser excluída. Tente novamente mais tarde."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Ler Mais...",
         READ_LESS: "Ler Menos..."
      },
      SHARE: {
         EVERYONE: "Todos em minha organização",
         ADD_TOOLTIP: "Salvar",
         ROLES: {
            OWNER: "Proprietário",
            EDIT: "Editores",
            VIEW: "Leitores",
            FOLDER: "Compartilhado com Pastas"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Proprietário"
            },
            EDIT: {
               ROLE: "Editar",
               ADD: "Incluir Editor"
            },
            VIEW: {
               ROLE: "Leitor",
               ADD: "Incluir Leitor"
            },
            FOLDER: {
               ADD: "Incluir Pastas",
               COMMUNITY_ADD: "Incluir na pasta",
               MOVE: "Mover para Pasta"
            },
            MULTI: {
               ADD: "Incluir pessoas ou comunidades",
               ADD_PEOPLE: "Incluir pessoas"
            }
         },
         PUBLIC: {
            SHORT: "Todos em minha organização",
            LONG: {
               GENERIC: "Todos em sua organização",
               ORG: "Todos em ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Esse arquivo já é compartilhado com ${user}.",
            ERROR: "Não é possível compartilhar com ${user} nesse momento.",
            SELF: "Você não pode compartilhar com você mesmo."
         },
         SHARE_INFO: {
            PROMOTED: "${user} foi promovido para uma função de compartilhamento mais alta."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Compartilhado com sucesso com ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "O arquivo foi compartilhado com êxito."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Mensagem opcional..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Usuário externo da provisão",
               ACTION: "Usuário externo da provisão...",
               TOOLTIP: "Usuário externo da provisão",
               DIALOG_TITLE: "Conteúdo Não Compartilhado",
               PROMPT: {
                  NO_ACCOUNT: "O usuário a seguir não possui uma conta e nenhum conteúdo foi compartilhado com ele.",
                  INVITE: "Convide este usuário como um convidado para compartilhar o conteúdo com ele."
               },
               SUBMIT: "Continuar com o convite",
               CANCEL: "Cancelar",
               ERROR: "Ocorreu um erro ao provisionar a conta. Tente novamente mais tarde.",
               SUCCESS: "Conta de usuário provisionada com sucesso."
            },
            PLURAL: {
               NAME: "Usuários externos de provisão",
               ACTION: "Usuários externos de provisão...",
               TOOLTIP: "Usuários externos de provisão",
               DIALOG_TITLE: "Conteúdo Não Compartilhado",
               PROMPT: {
                  NO_ACCOUNT: "Os seguintes usuários não têm uma conta e nenhum conteúdo foi compartilhado com eles.",
                  INVITE: "Convide estes usuários como convidados para compartilhar o conteúdo com eles."
               },
               SUBMIT: "Continuar com convites",
               CANCEL: "Cancelar",
               ERROR: "Ocorreu um erro ao provisionar contas. Tente novamente mais tarde.",
               SUCCESS: "Contas de usuários provisionadas com sucesso."
            },
            ABSTRACT: {
               NAME: "Usuários externos de provisão",
               ACTION: "Usuários externos de provisão...",
               TOOLTIP: "Usuários externos de provisão",
               DIALOG_TITLE: "Conteúdo Não Compartilhado",
               PROMPT: {
                  NO_ACCOUNT: "Alguns usuários não possuem contas e nenhum conteúdo foi compartilhado com eles.",
                  INVITE: "Convide estes usuários como convidados para compartilhar o conteúdo com eles."
               },
               SUBMIT: "Continuar com convites",
               CANCEL: "Cancelar",
               ERROR: "Ocorreu um erro ao provisionar contas. Tente novamente mais tarde.",
               SUCCESS: "Contas de usuários provisionadas com sucesso."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Opções de Compartilhamento",
         PROPAGATION: "Permitir que outras pessoas compartilhem este arquivo",
         EVERYONE: "Qualquer pessoa pode compartilhar este arquivo.",
         OWNER_ONLY: "Somente o proprietário pode compartilhar este arquivo.",
         STOP_SHARE: "Parar Compartilhamento",
         MAKE_INTERNAL: "Parar compartilhamento externamente",
         MAKE_INTERNAL_SUCCESS: "Este arquivo não pode mais ser compartilhado com pessoas de fora da sua organização.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Tornar interno?",
            PROMPT: "Tornar esse arquivo interno significa que ele não pode mais ser compartilhado com pessoas de fora de sua organização. ${br}${br}" +
            "Qualquer compartilhamento com pessoas, comunidades ou pastas externas será removido.${br}${br}A ação tornar um arquivo interno é permanente e não pode ser desfeita.",
            EFSS: {
               DIALOG_TITLE: "Tornar interno?",
               PROMPT: "Tornar esse arquivo interno significa que ele não pode mais ser compartilhado com pessoas de fora de sua organização. ${br}${br}" +
               "Qualquer compartilhamento com pessoas, comunidades ou pastas externas será removido.${br}${br}A ação tornar um arquivo interno é permanente e não pode ser desfeita."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Interromper compartilhamento de arquivo",
            PROMPT: "Tem certeza de que deseja parar o compartilhamento deste arquivo?",
            QUESTION_PUBLIC: "Este arquivo não será mais visível a todos em sua organização ou compartilhado com pessoas, pastas ou comunidades. Esta operação não pode ser desfeita.",
            QUESTION_PUBLIC_E: "Este arquivo não será mais visível a todos em sua organização ou compartilhado com pessoas ou pastas. Esta operação não pode ser desfeita.",
            QUESTION: "O arquivo não será mais compartilhado com pessoas ou comunidades e será removido de todas as pastas, exceto suas pastas privadas. Esta ação não pode ser desfeita.",
            QUESTION_E: "Este arquivo não será mais compartilhado com pessoas e será removido de todas as pastas, exceto suas pastas privadas. Esta ação não pode ser desfeita."
         },
         MAKE_PRIVATE_SUCCESS: "Agora este arquivo é privado.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Não é possível parar o compartilhamento deste arquivo. Tente novamente mais tarde."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Meus Compartilhamentos"
      },
      STREAM: {
         LOADING: "Carregando...",
         LOAD_MORE: "Carregar Mais..."
      },
      ENTRY: {
         REMOVE: "Remover",
         RESTORE: "Restaurar",
         EDIT: "Editar",
         DELETE: "Excluir",
         OK: "OK",
         CANCEL: "Cancelar",
         USER_PICTURE: "Foto de ${0}",
         FLAG: "Sinalizar como Impróprio"
      },
      PANEL: {
         LOAD_ERROR: "Houve um erro ao acessar os metadados deste arquivo.",
         ABOUT: {
            TITLE: "Sobre",
            EXPAND_BUTTON: "Expanda este botão para ver mais informações",
            CURRENT_VERSION_HEADER: "Versão atual ${versionNumber}",
            FILE_SIZE_HEADER: "Tamanho do arquivo",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Versão Atual",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Todas as Versões",
            DOCS_DRAFT_UPDATED_HEADER: "Rascunho editado",
            DOCS_DRAFT_CREATED_HEADER: "Rascunho criado",
            DOCS_UPDATED_HEADER: "Publicado",
            DOCS_CREATED_HEADER: "Criado",
            UPDATED_HEADER: "Atualizado",
            CREATED_HEADER: "Criadas",
            LIKES_HEADER: "Curtir",
            LIKES_EXPAND_ICON: "Expanda este ícone para ver quem curtiu o arquivo",
            DOWNLOADS_HEADER: "Visualizações",
            DOWNLOADS_HEADER_MORE: "Visualizações (${0})",
            DOWNLOADS_EXPAND_ICON: "Expanda este ícone para ver quem visualizou o arquivo",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonimamente",
            DOWNLOADS_LATEST_VERSION: "Você tem a versão mais recente deste arquivo",
            DOWNLOADS_LAST_VERSION: "Você visualizou pela última vez a versão ${0} deste arquivo",
            TAGS_HEADER: "Marcações",
            DESCRIPTION_HEADER: "Descrição",
            DESCRIPTION_READ_MORE: "Ler Mais...",
            LINKS_HEADER: "Links",
            SECURITY: "Segurança",
            FILE_ENCRYPTED: "O conteúdo do arquivo está criptografado. O conteúdo do arquivo criptografado não é pesquisável. O conteúdo do arquivo não pode ser visualizado e não pode ser editado com o HCL Docs.",
            GET_LINKS: "Obter Links...",
            ADD_DESCRIPTION: "Incluir uma descrição",
            NO_DESCRIPTION: "Sem Descrição",
            ADD_TAGS: "Incluir Marcações",
            NO_TAGS: "Nenhuma marcação"
         },
         COMMENTS: {
            TITLE: "Comentários",
            TITLE_WITH_COUNT: "Comentários (${0})",
            VERSION: "Versão ${0}",
            FEED_LINK: "Feed para estes comentários",
            FEED_TITLE: "Siga as mudanças nestes comentários através do seu leitor de feeds"
         },
         SHARING: {
            TITLE: "Compartilhamento",
            TITLE_WITH_COUNT: "Compartilhado (${0})",
            SHARED_WITH_FOLDERS: "Compartilhado com Pastas - ${count}",
            SEE_WHO_HAS_SHARED: "Ver quem compartilhou",
            COMMUNITY_FILE: "Arquivos pertencentes a uma comunidade não podem ser compartilhados com pessoas ou outras comunidades.",
            SHARED_WITH_COMMUNITY: "Compartilhado com membros da comunidade '${0}'",
            LOGIN: "Efetuar Login",
            NO_SHARE: "Este arquivo ainda não foi incluído em nenhum pasta.",
            ONE_SHARE: "Este arquivo está em 1 pasta ou comunidade que não permite acesso.",
            MULTIPLE_SHARE: "Este arquivo está em ${fileNumber} pastas ou comunidades às quais você não tem acesso."
         },
         VERSIONS: {
            TITLE: "Versões",
            TITLE_WITH_COUNT: "Versões (${0})",
            FEED_LINK: "Feed para estas versões",
            FEED_TITLE: "Siga as alterações neste arquivo através do leitor de feed"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Confirmação da ação",
         DIALOG_TITLE: "Confirmar",
         PROMPT: "Tem certeza de que deseja executar essa ação?",
         ERROR: "Ocorreu um erro ao executar a ação. Tente novamente mais tarde.",
         TOOLTIP: "Executar ação",
         OK: "OK",
         CANCEL: "Cancelar",
         A11Y: "Esse botão executa a ação atual."
      },
      THUMBNAIL: {
         TITLE: "Miniatura",
         CHANGE_LINK: "Alterar miniatura...",
         ERROR: "A miniatura não pôde ser salva. Tente novamente mais tarde.",
         EXT_ERROR: "Selecione um arquivo com uma das extensões suportadas a seguir: ${0}",
         SUCCESS: "A miniatura foi alterada",
         UPLOAD: "Salvar",
         CANCEL: "Cancelar"
      },
      UPLOAD_VERSION: {
         LINK: "Upload da nova versão...",
         CHANGE_SUMMARY: "Resumo de mudanças opcionais...",
         ERROR: "A nova versão não pôde ser salva. Tente novamente mais tarde.",
         SUCCESS: "A nova versão foi salva",
         UPLOAD: "Fazer upload",
         UPLOAD_AND_CHANGE_EXTENSION: "Fazer upload e mudar extensão",
         CANCEL: "Cancelar",
         TOO_LARGE: "${file} é maior do que o tamanho do arquivo ${size} permitido.",
         PROGRESS_BAR_TITLE: "Fazendo upload da nova versão (${uploaded} de ${total} concluído)",
         CANCEL_UPLOAD: "Cancelar upload"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Ocorreu um erro ao acessar o arquivo. Tente novamente mais tarde.",
         UNAUTHENTICATED: "O tempo limite de sua sessão esgotou-se. Deve-se efetuar login antes de poder visualizar o arquivo.",
         NOT_FOUND: "O arquivo que você solicitou foi excluído ou movido. Se alguém enviou este link a você, verifique se está correto.",
         ACCESS_DENIED: "Você não tem permissão para visualizar este arquivo. O arquivo não está compartilhado com você.",
         ACCESS_DENIED_ANON: "Você não possui permissão para visualizar este arquivo. Se este for seu arquivo ou ele foi compartilhado com você, deve-se efetuar login primeiro."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Erro",
         PROMPT: "O arquivo que você solicitou foi excluído ou movido.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Confirmar",
        PROMPT: "A sessão do HCL Connections atingiu o tempo limite.${lineBreaks}Clique em OK para fazer login novamente ou em Cancelar para fechar esse diálogo.",
        OK: "OK",
        CANCEL: "Cancelar"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Não é possível acessar o link",
        PROMPT: "Ocorreu algo de errado ao acessar o link.${lineBreaks}Clique em OK para ser redirecionado à página.",
        OK: "OK",
        CANCEL: "Cancelar"
      },
      LOAD_ERROR: {
         DEFAULT: "Oops. Houve um erro ao acessar o link.",
         ACCESS_DENIED: "Entre em contato com o proprietário do arquivo para solicitar permissão para visualizar este arquivo."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Arquivo",
         LOAD_ERROR: "Erro ao acessar arquivo"
      },
      SHARE_WITH_LINK: {
         TITLE: "Compartilhar por meio de um link",
         EMPTY_DESCRIPTION: "Você ainda não criou um link para este arquivo. Crie um link compartilhado para enviar a outras pessoas para que elas possam visualizar e fazer download do arquivo.",
         CREATE_LINK: "Criar um Link",
         COPY_LINK: "Copiar Link",
         DELETE_LINK: "Excluir link",
         ACCESS_TYPE_1: "Qualquer pessoa que tenha o link poderá visualizar ver esse arquivo",
         ACCESS_TYPE_2: "Pessoas em minha organização podem visualizar este arquivo",
         ACCESS_TYPE_1_DESCRIPTION: "As pessoas que receberem o link poderão visualizar e fazerdownload desse arquivo depois de efetuarem login no Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "As pessoas em minha organização que receberem o link poderãovisualizar e fazer download desse arquivo depois de efetuarem login noConnections.",
         CHANGE_TYPE_SUCCESS: "As atualizações de permissão de link quando o tipo de acesso é mudado.",
         CHANGE_TYPE_ERROR: "As atualizações de permissão de link falharam quando o tipo de acesso foi mudado.",
         COPY_LINK_SUCCESS: "Link copiado para a área de transferência",
         CREATE_SHARELINK_SUCCESS:"Link criado com êxito.",
         CREATE_SHARELINK_ERROR:"Não é possível criar um link devido a um erro.",
         DELETE_SHARELINK_SUCCESS: "Foi excluído o link compartilhado para \"${file}.\"",
         DELETE_SHARELINK_ERROR: "O link compartilhado não foi excluído. Tente novamente mais tarde.",
         CONFIRM_DIALOG: {
            OK: "Excluir",
            DIALOG_TITLE: "Excluir o link compartilhado",
            PROMPT: "Esse arquivo ficará inacessível para qualquer pessoa que tenha o link. Tem certeza de que deseja excluir o link compartilhado?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "O link compartilhado está ativo. Qualquer pessoa que tenha o link poderá ver esse arquivo. Clique para copiar este link.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "O link compartilhado está ativo. As pessoas em minha organização podem visualizar este arquivo. Clique para copiar este link."
      }
});

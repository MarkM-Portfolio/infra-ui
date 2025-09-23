/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2020                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "文件预览",
      FILENAME_TOOLTIP: "编辑文件名",
      ICON_TOOLTIP: "下载文件",
      ERROR: "发生错误。",
      FILE_MALICIOUS: "正在扫描显示的恶意内容",
      SHARED_EXTERNALLY: "外部共享",
      FILE_SYNCED: "已添加到同步",
      MY_DRIVE: {
         TITLE: "在“我的驱动器”中",
         ROOT_FOLDER: "/我的驱动器",
         FOLDER: "/我的驱动器/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "更多操作",
         A11Y: "打开具有更多操作列表的下拉菜单以对文件执行。",
            PANELS: {
               TITLE: "更多",
               A11Y: "打开具有隐藏面板列表的下拉菜单。"
            }
      },
      WELCOME: {
         TITLE: "我们已组合了文件视图和详细信息",
         SUBTITLE: "现在，您可以同时查看文件和其评论。",
         LINES: {
            LINE_1: "您在旧页面中可操作的所有信息和内容在此处同样能找到。",
            LINE_2: "评论、共享、版本和基本信息可在文件旁边找到。"
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "此按钮用于浏览至下一个文件。",
         PREVIOUS_A11Y: "此按钮用于浏览至上一个文件。"
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "更多编辑选项",
            A11Y: "此按钮将打开包含更多编辑选项的菜单。"
         },
         BUTTON: {
            EDIT: {
               TITLE: "编辑"
            },
            UPLOAD: {
               TITLE: "上传"
            },
            CREATE: {
              TITLE: "创建"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "调整面板大小",
           USAGE: "按左括号键或右括号键来调整面板大小。"
       },
         CLOSE: {
            TOOLTIP: "关闭",
            A11Y: "此按钮用于关闭文件查看器。",
            WARNING_DIALOG: {
              DIALOG_TITLE: "您的文件仍在上载中。",
              PROMPT: "您的文件仍在上载中。 如果您在上载完成前关闭窗口，那么将取消上载。",
              OK: "仍然关闭",
              CANCEL: "等待上载"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "添加到文件",
           A11Y: "此按钮用于将附件添加到文件。",
           VIEW_NOW: "立即查看"
         },
         TEAR_OFF: {
           TOOLTIP: "在新窗口中打开",
           A11Y: "在新窗口中打开",
           ERROR_TEARING_OFF: "打开新窗口时出错。",
           DIALOG_TITLE: "确认",
           UNSAVED_CHANGES_WARNING: "您尚有未保存的更改，该更改即将丢失。 是否仍要在新窗口中打开？",
           OK: "是",
           CANCEL: "否",
           OPEN: "打开",
           OPEN_ANYWAY: "仍然打开",
           CANCEL_ALT: "取消"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "根据文件新建",
            ACTION_NAME:"创建文件",
            A11Y: {
               TEXT: "根据模板文件创建文档（DOC、DOCX 或 ODT 文件）。 您可以在 Docs 中联机编辑这些文档。",
               PRES: "根据模板文件创建演示文稿（PPT、PPTX 或 ODP 文件）。 您可以在 Docs 中联机编辑这些演示文稿。",
               SHEET: "根据模板文件创建电子表格（XLS、XLSX 或 ODS 文件）。 您可以在 Docs 中联机编辑这些电子表格。"
            },
            PROMPT: {
               TEXT: "根据模板文件创建文档（DOC、DOCX 或 ODT 文件）。 您可以在 Docs 中联机编辑这些文档。",
               PRES: "根据模板文件创建演示文稿（PPT、PPTX 或 ODP 文件）。 您可以在 Docs 中联机编辑这些演示文稿。",
               SHEET: "根据模板文件创建电子表格（XLS、XLSX 或 ODS 文件）。 您可以在 Docs 中联机编辑这些电子表格。"
            },
            NAME_FIELD: "名称：",
            EXTERNAL_FIELD: "文件可以与我的组织以外的人员共享",
            EXTERNAL_DESC: "外部访问权限允许与外部用户（组织或公司外部的人员）共享文件和文件夹，以及与具有成员身份的外部人员进行通信。 您必须在上传文件时设置外部访问权限；一旦上传后，外部访问权限将无法开启。",
            CREATE_BUTTON: "创建",
            CANCEL: "取消",
            PRE_FILL_NAMES: {
               OTT: "无标题的文档",
               OTS: "无标题的电子表格",
               OTP: "无标题的演示文稿",
               DOT: "无标题的文档",
               XLT: "无标题的电子表格",
               POT: "无标题的演示文稿",
               DOTX: "无标题的文档",
               XLTX: "无标题的电子表格",
               POTX: "无标题的演示文稿"
            },
            ERRORS: {
               NAME_REQUIRED: "需要文档名。",
               ILLEGAL_NAME:"这是非法的文档标题，请指定其他标题。",
               WARN_LONG_NAME: "文档名太长。",
               TRIM_NAME: "是否要缩短文档名？",
               SESSION_TIMEOUT: "您的会话已到期，请登录并重试。",
               DUPLICATE_NAME: "找到重复的文件名。 请输入新名称。",
               SERVER_ERROR: "Connections 服务器不可用。 请联系服务器管理员，稍后重试。"
            }
         },
         DOWNLOAD: {
            TOOLTIP: "下载文件",
            A11Y: "此按钮用于下载文件。"
         },
         DOWNLOAD_AS_PDF: {
            NAME: "以 PDF 格式下载",
            TOOLTIP: "以 PDF 文件格式下载此文件",
            A11Y: "此按钮用于以 PDF 格式下载文件。",
            SUCCESS: "您已成功以 PDF 格式下载文件。",
            ERROR: {
               DEFAULT: "您无法以 PDF 格式下载文件。  请稍后重试。",
               UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能以 PDF 格式下载文件。",
               NOT_FOUND: "无法以 PDF 格式下载文件，因为该文件已被删除或者不再与您共享。",
               ACCESS_DENIED: "无法以 PDF 格式下载文件，因为该文件已被删除或者不再与您共享。"
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "此文件没有可下载的已发布版本。  可以从 Docs 编辑器发布版本。"
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "无法下载此文件",
               CANCEL: "关闭",
               PROMPT: "此文件没有可下载的已发布版本。",
               PROMPT2: "可以从 Docs 编辑器发布版本。"
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "无法下载此文件",
               CANCEL: "关闭",
               PROMPT: "此文件没有可下载的已发布版本。",
               PROMPT2: "可请求此文件的所有者发布一个文件版本。"
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "下载版本",
               OK: "下载版本",
               PROMPT: {
                  TODAY: "检测到一份更新的草稿，上次编辑时间为今天 ${time}。",
                  YESTERDAY: "检测到一份更新的草稿，上次编辑时间为昨天 ${time}。",
                  DAY: "检测到一份更新的草稿，上次编辑日期为 ${date}。",
                  MONTH: "检测到一份更新的草稿，上次编辑日期为 ${date}。",
                  YEAR: "检测到一份更新的草稿，上次编辑日期为 ${date_long}。"
               },
               PROMPT2: {
                  TODAY: "确定要继续下载于今天 ${time} 发布的版本？",
                  YESTERDAY: "确定要继续下载于昨天 ${time} 发布的版本？",
                  DAY: "确定要继续下载于 ${date} 发布的版本？",
                  MONTH: "确定要继续下载于 ${date} 发布的版本？",
                  YEAR: "确定要继续下载于 ${date_long} 发布的版本？"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "显示详细信息面板",
            HIDE: "隐藏详细信息面板",
            RESET: "重置面板大小",
            SHOW_A11Y: "此按钮用于打开或关闭侧面板。 侧面板当前已关闭。",
            HIDE_A11Y: "此按钮用于打开或关闭侧面板。 侧面板当前已打开。",
            RESET_A11Y: "此按钮用于将侧面板重置回缺省大小。 侧面板当前已展开。"
         },
         VIEW_DOC: {
            NAME: "在 Docs 查看器中打开",
            TOOLTIP: "在 Docs 查看器中打开",
            A11Y: "此按钮将打开文件以在新浏览器窗口内查看。"
         },
         EDIT_DOC: {
            NAME: "在 Docs 中编辑",
            TOOLTIP: "使用 HCL Docs 编辑此文件",
            A11Y: "此按钮将打开文件以在 Docs 的新窗口中编辑。"
         },
         EDIT_OFFICE: {
            TITLE: "编辑选项。",
            NAME: "在 Microsoft Office Online 中编辑",
            TOOLTIP: "使用 Microsoft Office Online 编辑此文件",
            A11Y: "此按钮将在 Microsoft Office Online 的新窗口中打开文件进行编辑。"
         },
         EDIT_OFFICE_WORD: {
           NAME: "在 Microsoft Word Online 中编辑",
           TOOLTIP: "使用 Microsoft Word Online 编辑此文件",
           A11Y: "此按钮将在 Microsoft Word Online 的新窗口中打开文件进行编辑。"
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "在 Microsoft Excel Online 中编辑",
             TOOLTIP: "使用 Microsoft Excel Online 编辑此文件",
             A11Y: "此按钮将在 Microsoft Excel Online 的新窗口中打开文件进行编辑。"
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "在 Microsoft PowerPoint Online 中编辑",
             TOOLTIP: "使用 Microsoft PowerPoint Online 编辑此文件",
             A11Y: "此按钮将在 Microsoft PowerPoint Online 的新窗口中打开文件进行编辑。"
         },
         OFFICE_EDITED: {
             SUCCESS: "正在保存此文件。"
         },
         ROUNDTRIP_EDIT: {
            NAME: "在桌面进行编辑",
            DIALOG_TITLE: "在桌面进行编辑",
            TOOLTIP: "编辑此文档",
            A11Y: "此按钮可打开文件在本地编辑。",
            PROMPT: "此功能允许您使用计算机上安装的软件进行编辑。",
            INSTALL: "在编辑之前，${startLink}安装桌面文件连接器${endLink}。", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "要点：",
            REMINDER: "完成编辑后，请使用桌面文件连接器来发布草稿。",
            SKIP_DIALOG: "不再显示此消息。",
            OK: "确定",
            CANCEL: "取消"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "确认",
            DELETE_VERSION: "删除版本 ${version}",
            DELETE_VERSION_AND_PRIOR: "删除版本 ${version} 和所有之前版本",
            PROMPT: "您将删除版本 ${version}。 是否继续？",
            DELETE_PRIOR: "同时删除所有之前版本",
            ERROR: "删除版本时发生错误。 请稍后重试。",
            TOOLTIP: "删除此版本",
            OK: "确定",
            CANCEL: "取消"
         },
         GET_LINKS: {
            DIALOG_TITLE: "获取链接",
            LINK_FILE: "到文件的链接：",
            LINK_PREVIEW: "到预览文件的链接：",
            LINK_DOWNLOAD: "到下载文件的链接：",
            TOOLTIP: "到文件的链接",
            OK: "关闭"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "下载此版本"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "确认",
            PROMPT: "您正要将此文件的当前版本替换为版本 ${version}。 是否继续？",
            ERROR: "恢复版本时发生错误。 请稍后重试。",
            TOOLTIP: "恢复此版本",
            CHANGE_SUMMARY: "已从版本 ${version} 恢复",
            OK: "确定",
            CANCEL: "取消"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "确认",
            REMOVE_EVERYONE: "确定要除去您的组织对此文件的访问权吗？ 如果除去访问权，那么将从允许组织级别访问权的文件夹和社区中除去此文件，并且只有所有者以及已经与之共享此文件的人员才能查看和处理此文件。",
            REMOVE_USER: "确定要停止与“${user}”共享吗？ 如果停止共享，那么 ${user} 只能够通过文件夹访问此文件，或者在此文件与组织中的所有人共享时对其进行访问。",
            REMOVE_COMMUNITY: "确定要从社区 ${communityName} 中除去此文件吗？",
            REMOVE_FOLDER: "确定要从文件夹 ${folderName} 中除去此文件吗？",
            REMOVE_EVERYONE_TOOLTIP: "除去组织的访问权",
            REMOVE_USER_TOOLTIP: "除去所有与 ${user} 的共享",
            REMOVE_COMMUNITY_TOOLTIP: "从社区 ${communityName} 中除去",
            REMOVE_FOLDER_TOOLTIP: "从文件夹 ${folderName} 中除去",
            OK: "确定",
            CANCEL: "取消",
            EFSS: {
              DIALOG_TITLE: "确认",
              REMOVE_EVERYONE: "确定要除去您的组织对此文件的访问权吗？ 如果除去访问权，那么会从允许组织级别访问权的文件夹中除去此文件，只有所有者以及共享此文件的人员才能查看和处理此文件。",
              REMOVE_USER: "确定要停止与“${user}”共享吗？ 如果停止共享，那么 ${user} 只能够通过文件夹访问此文件，或者在此文件与组织中的所有人共享时对其进行访问。",
              REMOVE_COMMUNITY: "确定要从社区 ${communityName} 中除去此文件吗？",
              REMOVE_FOLDER: "确定要从文件夹 ${folderName} 中除去此文件吗？",
              REMOVE_EVERYONE_TOOLTIP: "除去组织的访问权",
              REMOVE_USER_TOOLTIP: "除去所有与 ${user} 的共享",
              REMOVE_COMMUNITY_TOOLTIP: "从社区 ${communityName} 中除去",
              REMOVE_FOLDER_TOOLTIP: "从文件夹 ${folderName} 中除去",
              OK: "确定",
              CANCEL: "取消",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "编辑此评论"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "确认",
            PROMPT: "确定要删除此评论吗？",
            ERROR: "删除评论时发生错误。 请稍后重试。",
            TOOLTIP: "删除此评论",
            OK: "确定",
            CANCEL: "取消"
         },
         LIKE: {
            LIKE: "对此文件点赞",
            UNLIKE: "取消对此文件点赞",
            LIKE_A11Y: "此按钮用于对此文件点赞。",
            UNLIKE_A11Y: "此按钮用于取消对此文件点赞。",
            LIKED_SUCCESS: "您已对此文件点赞",
            UNLIKE_SUCCESS: "您已取消对此文件点赞"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "编辑描述",
            ERROR: {
               DEFAULT: "无法保存描述。 请稍后重试。",
               UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能更新描述。",
               NOT_FOUND: "无法保存描述，因为该文件已删除或者不再与您共享。",
               ACCESS_DENIED: "无法保存描述，因为该文件已删除或者不再与您共享。"
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "保存文件名时出错",
               CONFLICT: "文件名已存在"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "关注此文件时出错。 请稍后重试。",
                  UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能关注此文件。",
                  NOT_FOUND: "由于此文件已被删除或者不再与您共享，因此无法关注此文件。",
                  ACCESS_DENIED: "由于此文件已被删除或者不再与您共享，因此无法关注此文件。"
               },
               UNFOLLOW: {
                  DEFAULT: "取消关注此文件时出错。 请稍后重试。",
                  UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能停止关注此文件。",
                  NOT_FOUND: "由于此文件已被删除或者不再与您共享，因此无法停止关注此文件。",
                  ACCESS_DENIED: "由于此文件已被删除或者不再与您共享，因此无法停止关注此文件。"
               }
            },
            FOLLOW_NAME: "关注",
            FOLLOW_TOOLTIP: "关注此文件",
            FOLLOW_A11Y: "此按钮用于关注此文件。",
            FOLLOW_SUCCESS: "您正在关注此文件。",
            STOP_FOLLOWING_NAME: "停止关注",
            STOP_FOLLOWING_TOOLTIP: "停止关注此文件",
            STOP_FOLLOWING_A11Y: "此按钮用于停止关注此文件。",
            STOP_FOLLOWING_SUCCESS: "您已停止关注此文件。"
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "添加到“同步”",
               TOOLTIP: "将此文件添加到同步",
               A11Y: "此按钮用于将文件添加到同步。",
               SUCCESS: "您已将此文件添加到同步。",
               ERROR: {
                  DEFAULT: "将此文件添加到同步时出错。 请稍后重试。",
                  UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能将此文件添加到同步。",
                  NOT_FOUND: "由于此文件已被删除或者不再与您共享，因此无法将此文件添加到同步。",
                  ACCESS_DENIED: "由于此文件已被删除或者不再与您共享，因此无法将此文件添加到同步。"
               }
            },
            STOP_SYNC: {
               NAME: "从同步中除去",
               TOOLTIP: "从同步中除去此文件",
               A11Y: "此按钮用于从同步中除去文件。",
               SUCCESS: "您已从同步中除去此文件。",
               ERROR: {
                  DEFAULT: "从同步中除去此文件时出错。 请稍后重试。",
                  UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能从同步中除去此文件。",
                  NOT_FOUND: "由于此文件已被删除或者不再与您共享，因此无法从同步中除去此文件。",
                  ACCESS_DENIED: "由于此文件已被删除或者不再与您共享，因此无法从同步中除去此文件。"
               }
            },
            MYDRIVE: {
                NAME: "添加到“我的驱动器”中",
                TOOLTIP: "将此文件添加到“我的驱动器”中",
                A11Y: "此按钮用于将文件添加到“我的驱动器”中。",
                SUCCESS: "您已将此文件添加到“我的驱动器”中。",
                ERROR: {
                   DEFAULT: "将此文件添加到“我的驱动器”中时出错。 请稍后重试。",
                   UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能将此文件添加到“我的驱动器”中。",
                   NOT_FOUND: "由于此文件已被删除或者不再与您共享，因此无法将此文件添加到“我的驱动器”中。",
                   ACCESS_DENIED: "由于此文件已被删除或者不再与您共享，因此无法将此文件添加到“我的驱动器”中。"
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "从“我的驱动器”中除去",
                TOOLTIP: "从“我的驱动器”中除去此文件",
                A11Y: "此按钮用于从“我的驱动器”中除去文件。",
                SUCCESS: "您已从“我的驱动器”中除去此文件。",
                ERROR: {
                   DEFAULT: "从“我的驱动器”中除去此文件时出错。 请稍后重试。",
                   UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能从“我的驱动器”中除去此文件。",
                   NOT_FOUND: "由于此文件已被删除或者不再与您共享，因此无法从“我的驱动器”中除去此文件。",
                   ACCESS_DENIED: "由于此文件已被删除或者不再与您共享，因此无法从“我的驱动器”中除去此文件。"
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "置顶",
            FAVORITE_TOOLTIP: "将此文件置顶",
            FAVORITE_A11Y: "此按钮用于将文件置顶。",
            FAVORITE_SUCCESS: "您已将此文件置顶。",
            STOP_FAVORITEING_NAME: "取消置顶",
            STOP_FAVORITEING_TOOLTIP: "取消将此文件置顶",
            STOP_FAVORITEING_A11Y: "此按钮用于取消将文件置顶。",
            STOP_FAVORITEING_SUCCESS: "您已取消将此文件置顶。"
         },
         TRASH: {
            NAME: "移到废纸篓",
            DIALOG_TITLE: "确认",
            PROMPT: "确定要将此文件移到废纸篓中吗？ 将此文件移到废纸篓中将使当前共享此文件的所有人无法使用此文件。",
            ERROR: "删除文件时发生错误。 请稍后重试。",
            TOOLTIP: "删除此文件",
            OK: "确定",
            CANCEL: "取消",
            A11Y: "此按钮用于将文件移到废纸篓。",
            SUCCESS_MSG: "已将 ${file} 移到废纸篓。"
         },
         REFRESH: {
            NAME: "刷新",
            ERROR: "刷新文件查看器时出错。 请稍后重试。",
            TOOLTIP: "刷新文件查看器",
            INFO_MSG: "刷新以获取最新内容。 ${link}",
            A11Y: "此按钮用于将文件移到废纸篓。",
            SUCCESS_MSG: "已成功刷新内容。"
         },
         COPY_FILE: {
            NAME: "将副本提供给社区",
            DIALOG_TITLE: "确认",
            ERROR: "复制文件时发生错误。 请稍后重试。",
            TOOLTIP: "将此文件的副本提供给社区",
            OK: "确定",
            CANCEL: "取消",
            A11Y: "此按钮用于打开将此文件的副本提供给社区的对话框。",
            SUCCESS_MSG: "已将 ${file} 复制到 ${community}。"
         },
         TRANSFER_FILE: {
            NAME: "\u8f6c\u79fb\u6240\u6709\u6743...",
            DIALOG_TITLE: "\u8f6c\u79fb\u6240\u6709\u6743",
            TOOLTIP: "将此文件转移给新的所有者",
            A11Y: "此按钮将打开一个对话框，通过该对话框，您可以将此文件转移给新的所有者。",
            EMPTY: "清空"
         },
         UPLOAD_VERSION: {
            NAME: "上传新版本",
            NAME_SHORT: "上传",
            CHANGE_SUMMARY: "可选的更改摘要...",
            TOOLTIP: "上传此文件的新版本",
            A11Y: "此按钮将打开一个对话框，通过该对话框，您可以上传此文件的新版本。"
         },
         LOG_IN: {
            NAME: "登录",
            TOOLTIP: "登录以上传和共享文件、评论以及创建文件夹"
         },
         LOCK: {
            NAME: "锁定文件",
            TITLE: "锁定此文件",
            A11Y: "锁定此文件",
            SUCCESS: "此文件现已锁定。",
            ERROR: "由于文件已被删除或者不再与您共享，无法锁定此文件。"
         },
         UNLOCK: {
            NAME: "解除文件锁定",
            TITLE: "解除此文件的锁定",
            A11Y: "解除此文件的锁定",
            SUCCESS: "此文件现已解锁。",
            ERROR: "无法解锁该文件，因为它已被删除或者不再与您共享。"
         },
         EDIT_ON_DESKTOP: {
            NAME: "在桌面上编辑",
            TITLE: "在桌面上编辑",
            A11Y: "在桌面上编辑"
         },
         FLAG: {
            FILE: {
               NAME: "举报为不当",
               TITLE: "举报文件",
               A11Y: "将此文件举报为不当",
               PROMPT: "请提供举报此文件的理由（可选）：",
               OK: "举报",
               CANCEL: "取消",
               SUCCESS: "该文件已举报并提交待审。",
               ERROR: "举报该文件时出错，请稍后重试。"
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "成功",
               PROMPT: "该文件已举报并提交待审。",
               CANCEL: "确定"
            },
            COMMENT: {
               NAME: "举报为不当",
               TITLE: "举报评论",
               A11Y: "将此评论举报为不当",
               PROMPT: "请提供举报此评论的原因（可选）：",
               OK: "举报",
               CANCEL: "取消",
               SUCCESS: "已举报并提交评论以待复审。",
               ERROR: "举报此评论时出错，请稍后重试。"
            }
         },
         MODERATION: {
            DIALOG_TITLE: "成功",
            PROMPT: "已提交更改以待复审。 在核准更改后，该文件才可用。",
            CANCEL: "确定"
         },
         DROPDOWN_BUTTON: "下拉按钮"
      },
      SECTION: {
         ABOUT: {
            NAME: "关于此文件",
            VIEW_FILE_DETAILS: "查看文件详细信息",
            A11Y: "激活此链接将关闭文件查看器，并将您定向到此文件的文件详细信息页面。"
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "无法预览此文件。"
         },
         IMAGE: {
            ZOOM_IN: "放大",
            ZOOM_OUT: "缩小",
            RESET: "重置",
            ZOOM_IN_A11Y: "此按钮用于放大图像。",
            ZOOM_OUT_A11Y: "此按钮用于缩小图像。",
            RESET_ZOOM_A11Y: "此按钮用于重置缩放级别。",
            UNSAFE_PREVIEW: "无法预览该文件，因为该文件未扫描病毒。"
         },
         VIEWER: {
            LOADING: "正在装入...",
            PUBLISHING: "正在发布...",
            NO_PUBLISHED_VERSION: "无法查看此文件的发布版本。",
            IFRAME_TITLE: "此文件的预览",
            AUTOPUBLISH_TIMEOUT: "服务器长时间未响应。  可能尚未发布最新更改。"
         },
         VIDEO: {
            UNSAFE_PREVIEW: "无法预览该文件，因为该文件未扫描病毒。"
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "最近由 ${user} 于今日 ${time} 更新",
            YESTERDAY: "最近由 ${user} 于昨天 ${time} 更新",
            DAY: "最近由 ${user} 于 ${EEee} ${time} 更新",
            MONTH: "最近由 ${user} 于 ${date_long} 更新",
            YEAR: "最近由 ${user} 于 ${date_long} 更新"
         },
         CREATED: {
            TODAY: "由 ${user} 于今日 ${time} 创建",
            YESTERDAY: "由 ${user} 于昨天 ${time} 创建",
            DAY: "由 ${user} 于 ${EEee} ${time} 创建",
            MONTH: "由 ${user} 于 ${date_long} 创建",
            YEAR: "由 ${user} 于 ${date_long} 创建"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - 今天",
            YESTERDAY: "${time} - 昨天",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "今天",
            YESTERDAY: "昨天",
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
         TITLE: "评论文本区域",
         SHADOW_TEXT: "添加评论...",
         CANNOT_ACCESS_CONTENT: "由于提及的以下人员无权访问内容，因此他们无法查看此评论：",
         ERROR: "验证您尝试提及的用户时发生错误。",
         POST: "发布",
         SAVE: "保存",
         CANCEL: "取消",
         EXTERNAL_WARNING: "贵组织以外的人员可能会看到评论。"
      },
      EDIT_BOX: {
         SAVE: "保存",
         CANCEL: {
            TOOLTIP: "取消",
            A11Y: "此按钮取消编辑文件名的操作。"
         },
         INVALID_CHARACTERS: "字符无效",
         INVALID_CHARACTERS_REMOVED: "已除去无效字符"
      },
      COMMENT_WIDGET: {
         EDITED: "（已编辑）",
         EDITED_DATE: {
            TODAY: "编辑时间：今天${time}",
            YESTERDAY: "编辑时间：昨天${time}",
            DAY: "编辑时间：${EEee} ${time}",
            MONTH: "编辑时间：${date_long}",
            YEAR: "编辑时间：${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "保存",
         CANCEL: "取消",
         USER: "人员",
         COMMUNITY: "社区",
         SHARE: "共享",
         SHARE_ALT: "与此人员共享",
         MEMBER_TYPE: "成员类型",
         PERSON_SHADOW: "输入信息以查找人员",
         COMMUNITY_SHADOW: "输入信息以查找社区",
         PERSON_ARIA: "输入以查找人员。  按 Shift Tab 键以在人员、社区和组织中的所有人之间切换。",
         COMMUNITY_ARIA: "输入以查找社区。  按 Shift Tab 键以在人员、社区和组织中的所有人之间切换。",
         PERSON_FULL_SEARCH: "未列出任何人员？ 请使用完整搜索...",
         COMMUNITY_FULL_SEARCH: "未列出任何社区？ 请使用完整搜索...",
         ADD_OPTIONAL_MESSAGE: "添加可选消息",
         ROLE_LABEL: "角色",
         ROLE_EDIT: "编辑者",
         ROLE_VIEW: "读者"
      },
      FILE_STATE: {
         DOCS_FILE: "这是 Docs 文件。 必须联机完成所有编辑。",
         LOCKED_BY_YOU: {
            TODAY: "由您于${time} 锁定。",
            YESTERDAY: "由您于昨天${time} 锁定。",
            DAY: "由您于 ${date} 锁定。",
            MONTH: "由您于 ${date} 锁定。",
            YEAR: "由您于 ${date_long} 锁定。"
         },
         LOCKED_BY_OTHER: {
            TODAY: "由 ${user} 于${time} 锁定。",
            YESTERDAY: "由 ${user} 于昨天${time} 锁定。",
            DAY: "由 ${user} 于 ${date} 锁定。",
            MONTH: "由 ${user} 于 ${date} 锁定。",
            YEAR: "由 ${user} 于 ${date_long} 锁定。"
         }
      },
      VALIDATION: {
         A11Y_TEXT: "自动缩短此文本",
         COMMENT: {
            WARN_TOO_LONG: "评论太长。",
            TRIM: "是否简化评论？"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "描述过长。",
            TRIM: "是否缩短描述？"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "消息太长。",
            TRIM: "是否简化消息？"
         },
         TAG: {
            WARN_TOO_LONG: "标签过长。",
            TRIM: "是否简化标签？"
         },
         TAGS: {
            WARN_TOO_LONG: "一个或多个标签过长。",
            TRIM: "是否简化标签？"
         },
         FILENAME: {
            WARN_TOO_LONG: "文件名过长"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "此文件可由拥有 HCL Docs 的人员在线编辑。",
         NO_ENTITLEMENT_LINK: "此文件可由拥有 ${startLink}HCL Docs${endLink} 的人员在线编辑。", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "此文件当前由 ${users} 在 Web 上编辑。",
         UNPUBLISHED_CHANGES: "存在尚未发布为版本的草稿编辑。",
         PUBLISH_A_VERSION: "发布版本",
         PUBLISH_SUCCESS: "您已成功发布此文件的版本",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "无法发布此版本，因为访问被拒绝。",
            NOT_FOUND: "无法发布此版本，因为未找到文档。",
            CANNOT_REACH_REPOSITORY: "无法发布此版本，因为 Docs 服务器无法连接至文件存储库。",
            QUOTA_VIOLATION: "无法发布此版本，因为已达到空间限制。 请除去其他文件以释放足够空间来发布此版本。",
            CONVERSION_UNAVAILABLE: "无法发布此版本，因为 Docs 转换服务不可用。 请稍后重试。",
            TOO_LARGE: "无法发布此版本，因为文档太大。",
            CONVERSION_TIMEOUT: "无法发布此版本，因为 Docs 转换服务在转换此文档时花费的时间过长。 请稍后重试。",
            SERVER_BUSY: "无法发布此版本，因为 Docs 服务器繁忙。 请稍后重试。",
            DEFAULT: "无法发布此版本，因为 Docs 服务不可用。 请稍后重试。"
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "正在发布您的编辑内容。 ${startLink}请刷新页面以查看更改。${endLink}",
            GENERIC: "您可能需要刷新页面以查看最新更改。  ${startLink}刷新${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "没有评论。",
         MODERATED: "该评论已提交待审，并将在核准后显示。",
         ERROR: {
            SAVE: {
               DEFAULT: "您的评论无法保存。 请稍后重试。",
               UNAUTHENTICATED: "会话已超时。 您必须先登录，然后才能保存自己的评论。",
               NOT_FOUND: "您的评论无法保存，因为文件已被删除或者不再与您共享。",
               ACCESS_DENIED: "您的评论无法保存，因为文件已被删除或者不再与您共享。"
            },
            DELETE: {
               DEFAULT: "您的评论无法删除。 请稍后重试。",
               UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能删除自己的评论。",
               NOT_FOUND: "您的评论无法删除，因为文件已被删除或者不再与您共享。",
               ACCESS_DENIED: "您的评论无法删除，因为文件已被删除或者不再与您共享。"
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "保存",
         EDIT_TAGS: "编辑标签",
         ERROR: {
            SAVE: {
               DEFAULT: "无法创建标签。 请稍后重试。"
            },
            DELETE: {
               DEFAULT: "无法删除此标签。 请稍后重试。"
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "阅读更多...",
         READ_LESS: "阅读更少..."
      },
      SHARE: {
         EVERYONE: "我的组织中的所有人",
         ADD_TOOLTIP: "保存",
         ROLES: {
            OWNER: "所有者",
            EDIT: "编辑者",
            VIEW: "读者",
            FOLDER: "与文件夹共享"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "所有者"
            },
            EDIT: {
               ROLE: "编辑",
               ADD: "添加编辑者"
            },
            VIEW: {
               ROLE: "读者",
               ADD: "添加读者"
            },
            FOLDER: {
               ADD: "添加文件夹",
               COMMUNITY_ADD: "添加至文件夹",
               MOVE: "移动到文件夹"
            },
            MULTI: {
               ADD: "添加人员或社区",
               ADD_PEOPLE: "添加人员"
            }
         },
         PUBLIC: {
            SHORT: "我的组织中的所有人",
            LONG: {
               GENERIC: "您组织中的每个人",
               ORG: "${org} 中的所有人"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "此文件已与 ${user} 共享。",
            ERROR: "此时无法与 ${user} 共享。",
            SELF: "您不能与自己共享"
         },
         SHARE_INFO: {
            PROMOTED: "${user} 已升级至更高共享角色。"
         },
         SHARE_SUCCESS: {
            SUCCESS: "已与 ${user} 成功共享"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "已成功共享文件。"
         },
         MESSAGE_BOX: {
            HINT_TEXT: "可选消息..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "供应外部用户",
               ACTION: "供应外部用户...",
               TOOLTIP: "供应外部用户",
               DIALOG_TITLE: "未共享内容",
               PROMPT: {
                  NO_ACCOUNT: "下列用户没有帐户，您未与其共享任何内容。",
                  INVITE: "请邀请此用户作为访客，以便与其共享内容。"
               },
               SUBMIT: "继续邀请",
               CANCEL: "取消",
               ERROR: "供应帐户时发生错误。 请稍后重试。",
               SUCCESS: "成功供应用户帐户。"
            },
            PLURAL: {
               NAME: "供应外部用户",
               ACTION: "供应外部用户...",
               TOOLTIP: "供应外部用户",
               DIALOG_TITLE: "未共享内容",
               PROMPT: {
                  NO_ACCOUNT: "下列用户没有帐户，您未与其共享任何内容。",
                  INVITE: "请邀请这些用户作为访客，以便与其共享内容。"
               },
               SUBMIT: "继续邀请",
               CANCEL: "取消",
               ERROR: "供应帐户时发生错误。 请稍后重试。",
               SUCCESS: "成功供应用户帐户。"
            },
            ABSTRACT: {
               NAME: "供应外部用户",
               ACTION: "供应外部用户...",
               TOOLTIP: "供应外部用户",
               DIALOG_TITLE: "未共享内容",
               PROMPT: {
                  NO_ACCOUNT: "一些用户没有帐户，您未与其共享任何内容。",
                  INVITE: "请邀请这些用户作为访客，以便与其共享内容。"
               },
               SUBMIT: "继续邀请",
               CANCEL: "取消",
               ERROR: "供应帐户时发生错误。 请稍后重试。",
               SUCCESS: "成功供应用户帐户。"
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "共享选项",
         PROPAGATION: "允许其他人共享此文件",
         EVERYONE: "所有人都可以共享此文件。",
         OWNER_ONLY: "只有所有者可以共享此文件。",
         STOP_SHARE: "停止共享",
         MAKE_INTERNAL: "停止外部共享",
         MAKE_INTERNAL_SUCCESS: "此文件不能再提供给组织外的人员共享。",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "限于内部？",
            PROMPT: "将此文件限于内部意味着不能再与组织外的人员共享此文件夹。 ${br}${br}" +
            "这将除去与外部人员、社区或文件夹进行的所有共享。${br}${br}将文件限于内部是永久操作，并且不可撤销。",
            EFSS: {
               DIALOG_TITLE: "限于内部？",
               PROMPT: "将此文件限于内部意味着不能再与组织外的人员共享此文件夹。 ${br}${br}" +
               "这将除去与外部人员或文件夹进行的所有共享。${br}${br}将文件限于内部是永久操作，并且不可撤销。"
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "停止共享文件",
            PROMPT: "确定要停止共享此文件吗？",
            QUESTION_PUBLIC: "此文件将不再可供组织内所有人查看，也不会与人员、文件夹或社区共享。 此操作不可撤销。",
            QUESTION_PUBLIC_E: "此文件将不再可供组织内所有人查看，也不会与任何人员或文件夹共享。 此操作不可撤销。",
            QUESTION: "将不再与任何人员或社区共享此文件，并且将从您的私有文件夹以外的所有其他文件夹中除去此文件。 此操作无法撤销。",
            QUESTION_E: "将不再与任何人员共享此文件，并且将从您的私有文件夹以外的所有其他文件夹中除去此文件。 此操作无法撤销。"
         },
         MAKE_PRIVATE_SUCCESS: "此文件现为私有文件。",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "无法停止共享文件。 请稍后重试。"
         }
      },
      SHARE_LINK: {
         MY_SHARES: "我的共享"
      },
      STREAM: {
         LOADING: "正在装入...",
         LOAD_MORE: "装入更多..."
      },
      ENTRY: {
         REMOVE: "除去",
         RESTORE: "恢复",
         EDIT: "编辑",
         DELETE: "删除",
         OK: "确定",
         CANCEL: "取消",
         USER_PICTURE: "${0} 的图片",
         FLAG: "举报为不当"
      },
      PANEL: {
         LOAD_ERROR: "访问此文件的元数据时出错。",
         ABOUT: {
            TITLE: "关于",
            EXPAND_BUTTON: "展开此按钮以查看更多信息",
            CURRENT_VERSION_HEADER: "当前版本 ${versionNumber}",
            FILE_SIZE_HEADER: "文件大小",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - 当前版本",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - 所有版本",
            DOCS_DRAFT_UPDATED_HEADER: "已编辑草稿",
            DOCS_DRAFT_CREATED_HEADER: "已创建草稿",
            DOCS_UPDATED_HEADER: "发布时间",
            DOCS_CREATED_HEADER: "创建日期",
            UPDATED_HEADER: "更新日期",
            CREATED_HEADER: "创建日期",
            LIKES_HEADER: "点赞数",
            LIKES_EXPAND_ICON: "展开此图标以查看对文件点赞的人员",
            DOWNLOADS_HEADER: "视图",
            DOWNLOADS_HEADER_MORE: "视图 (${0})",
            DOWNLOADS_EXPAND_ICON: "展开此图标以查看已浏览文件的人员",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads}（匿名）",
            DOWNLOADS_LATEST_VERSION: "您具有此文件的最新版本",
            DOWNLOADS_LAST_VERSION: "您上次浏览的是此文件的版本 ${0}",
            TAGS_HEADER: "标签",
            DESCRIPTION_HEADER: "说明",
            DESCRIPTION_READ_MORE: "阅读更多...",
            LINKS_HEADER: "链接",
            SECURITY: "安全性",
            FILE_ENCRYPTED: "文件内容已加密。 已加密的文件内容不可搜索。 无法使用 HCL Docs 查看并编辑文件内容。",
            GET_LINKS: "获取链接...",
            ADD_DESCRIPTION: "添加描述",
            NO_DESCRIPTION: "没有描述",
            ADD_TAGS: "添加标签",
            NO_TAGS: "无标签"
         },
         COMMENTS: {
            TITLE: "评论",
            TITLE_WITH_COUNT: "评论 (${0})",
            VERSION: "版本 ${0}",
            FEED_LINK: "这些评论的订阅源",
            FEED_TITLE: "通过订阅源阅读器了解对这些评论的更改"
         },
         SHARING: {
            TITLE: "共享",
            TITLE_WITH_COUNT: "共享项 (${0})",
            SHARED_WITH_FOLDERS: "与文件夹共享 - ${count}",
            SEE_WHO_HAS_SHARED: "查看共享者",
            COMMUNITY_FILE: "由社区拥有的文件无法共享到人员或其他社区。",
            SHARED_WITH_COMMUNITY: "与社区“${0}”的成员共享",
            LOGIN: "登录",
            NO_SHARE: "尚未将此文件添加到任何文件夹。",
            ONE_SHARE: "此文件位于您无权访问的 1 个文件夹或社区中。",
            MULTIPLE_SHARE: "此文件位于您无权访问的 ${fileNumber} 个文件夹或社区中。"
         },
         VERSIONS: {
            TITLE: "版本数",
            TITLE_WITH_COUNT: "版本 (${0})",
            FEED_LINK: "这些版本的订阅源",
            FEED_TITLE: "通过订阅源阅读器跟踪对此文件的更改"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "操作确认",
         DIALOG_TITLE: "确认",
         PROMPT: "确定要执行此操作吗？",
         ERROR: "执行操作时发生错误。 请稍后重试。",
         TOOLTIP: "执行操作",
         OK: "确定",
         CANCEL: "取消",
         A11Y: "此按钮用于执行当前操作。"
      },
      THUMBNAIL: {
         TITLE: "缩略图",
         CHANGE_LINK: "更改缩略图...",
         ERROR: "无法保存缩略图。 请稍后重试。",
         EXT_ERROR: "请选择具有以下某个受支持扩展名的文件：${0}",
         SUCCESS: "缩略图已更改",
         UPLOAD: "保存",
         CANCEL: "取消"
      },
      UPLOAD_VERSION: {
         LINK: "上传新版本...",
         CHANGE_SUMMARY: "可选的更改摘要...",
         ERROR: "无法保存新版本。 请稍后重试。",
         SUCCESS: "已保存新版本",
         UPLOAD: "上传",
         UPLOAD_AND_CHANGE_EXTENSION: "上传并更改扩展名",
         CANCEL: "取消",
         TOO_LARGE: "${file} 大于允许的 ${size} 文件大小。",
         PROGRESS_BAR_TITLE: "正在上载新版本（已完成 ${uploaded}，共 ${total}）",
         CANCEL_UPLOAD: "取消上载"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "访问文件时发生错误。 请稍后重试。",
         UNAUTHENTICATED: "会话已超时。 您必须重新登录，然后才能查看文件。",
         NOT_FOUND: "您请求的文件已删除或移动。 如果此链接是他人发送给您的，请检查是否正确。",
         ACCESS_DENIED: "您无权查看此文件。 此文件未提供给您共享。",
         ACCESS_DENIED_ANON: "您无权查看此文件。 如果这是您的文件或该文件已与您共享，那么您必须先登录。"
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "错误",
         PROMPT: "您请求的文件已删除或移动。",
         CANCEL: "确定"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "确认",
        PROMPT: "您的 HCL Connections 会话已超时。${lineBreaks}单击“确定”以重新登录或单击“取消”以关闭此对话框。",
        OK: "确定",
        CANCEL: "取消"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "无法访问链接",
        PROMPT: "访问链接时出错。${lineBreaks}单击“确定”以重定向到页面。",
        OK: "确定",
        CANCEL: "取消"
      },
      LOAD_ERROR: {
         DEFAULT: "对不起， 访问链接时出错。",
         ACCESS_DENIED: "联系文件所有者以请求查看此文件的许可权。"
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - 文件",
         LOAD_ERROR: "访问文件时出错"
      },
      SHARE_WITH_LINK: {
         TITLE: "通过链接共享",
         EMPTY_DESCRIPTION: "您尚未为此文件创建链接。创建共享链接并将其发送给其他人，使他们可以预览和下载文件。",
         CREATE_LINK: "创建链接",
         COPY_LINK: "复制链接",
         DELETE_LINK: "删除链接",
         ACCESS_TYPE_1: "具有该链接的任何人都可以查看此文件",
         ACCESS_TYPE_2: "我的组织中的用户可以查看此文件",
         ACCESS_TYPE_1_DESCRIPTION: "获得该链接的人员可以在登录到 Connections 后预览和下载此文件。",
         ACCESS_TYPE_2_DESCRIPTION: "我的组织中获得该链接的人员可以在登录到 Connections 后预览和下载此文件。",
         CHANGE_TYPE_SUCCESS: "在访问类型更改时，链接许可权将会更新。",
         CHANGE_TYPE_ERROR: "在访问类型更改时，链接许可权更新失败。",
         COPY_LINK_SUCCESS: "已将链接复制到剪贴板",
         CREATE_SHARELINK_SUCCESS:"已成功创建链接。",
         CREATE_SHARELINK_ERROR:"由于发生错误，无法创建链接。",
         DELETE_SHARELINK_SUCCESS: "删除“${file}”的共享链接。",
         DELETE_SHARELINK_ERROR: "未删除共享链接。 请稍后重试。",
         CONFIRM_DIALOG: {
            OK: "删除",
            DIALOG_TITLE: "删除共享链接",
            PROMPT: "具有该链接的任何人将无法访问此文件。 确定要删除共享链接吗？"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "共享链接处于活动状态。 具有该链接的任何人都可以查看此文件。 单击以复制此链接。",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "共享链接处于活动状态。 我的组织中的用户可以查看此文件。 单击以复制此链接。"
      }
});

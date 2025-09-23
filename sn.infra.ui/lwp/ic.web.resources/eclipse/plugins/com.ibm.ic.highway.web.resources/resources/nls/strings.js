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

define({
	root:

		// NLS_CHARSET=UTF-8
		({
			yes: "yes",
			no: "no",
			dialogSave: "Save",
			dialogCreate: "Create",
			dialogClose: "Close",

			msgErrorAlt: "Error",
			msgWarningAlt: "Warning",
			msgInfoAlt: "Information",
			msgConfirmAlt: "Confirmation",
			msgCloseAlt: "Close message",
			
			msgContentUnexpected: "An unexpected error occurred",

			configTitleAbout: "About Configuring HCL Connections",
			configTitleDefinitions: "Configuring HCL Connections Setting Definitions",
			configTitleDefaults: "Configuring HCL Connections Default Settings",
			configTitleSettings: "Configuring HCL Connections Settings for your Organisation",

			configDescAbout: "You are in the HCL Connections configuration application." ,
			configDescDefinitions: "You can define settings below that influence how Connections will appear and function. This is typically used as for development and should not be required by administrators.",
			configDescDefaults: "You can use the settings below to define how Connections appears and functions by default.",
			configDescSettings: "You can use the settings below to define how Connections appears and functions for your organisation.",

			createSettingTitle: "Create Setting",
			createSettingDescription: "Create a completely new Setting Definition",

			settingEditActionName: "Edit",
			settingDeleteActionName: "Delete",
			settingOverrideActionName: "Override",
			settingRolesActionName: "Roles",
			settingAddRoleActionName: "Add Role",
			settingSaveActionName: "Save",
			settingCancelActionName: "Cancel",
			settingEditActionDescription: "Edit this Setting",
			settingDeleteActionDescription: "Delete the value of this Setting for this role. The default value for this role (if any) will apply",
			settingOverrideActionDescription: "Override the default value for this setting for this role",
			settingRolesActionDescription: "View the per-role values for this Setting, where you may also choose to edit.",
			settingAddRoleActionDescription: "View the per-role values for this Setting, where you may also choose to edit.",
			settingSaveActionDescription: "Save the new value for this setting",
			settingCancelActionDescription: "Abandon modifications and return to viewing this setting",

			settingValue: "Value",

			roleEditActionName: "Edit",
			roleEditActionDescription: "Edit the value of this Setting for users with this role",
			roleDeleteActionName: "Delete",
			roleDeleteActionDescription: "Delete the value of this Setting for this role. The default value for this role (if any) will apply",
			roleOverrideActionName: "Override",
			roleOverrideActionDescription: "Override the default value for this setting for this role",
			roleSaveActionName: "Save",
			roleSaveActionDescription: "Save the new value for this setting",
			roleCancelActionName: "Cancel",
			roleCancelActionDescription: "Abandon modifications and return to viewing this setting",
			roleDescription: "The value shown for the setting will apply to users who have this role",

			roleSingleOnlyName: "Value",
			roleSingleOnlyDescription: "This setting does not support role specific values. A single global value is applied",
			roleSingleOnlyEditActionDescription: "Edit the value of this Setting",

			roleDefaultRoleName: "Any User",
			roleDefaultRoleDescription: "Where no applicable user role exists, this value is used",
			roleDefaultRoleEditActionDescription: "Edit the value of this Setting for users without a matching role",

			roleValueUpdateSuccess: "The setting was updated successfully for the role specified",

			roleNewRole: "New Role",
			roleValue: "Value",

			validationNotCorrect: "The value provided is not valid in this context. Please see setting description for details",
			validationNotInList: "The value must be from the following list : ",
			validationNotABoolean: "The value must be either true or false",
			validationNotAnInteger: "The value must be an integer",
			validationNotADate: "The value must be a valid date",
			validationNotAPerson: "The value provided is not a recognised person",
			validationNotAUrl: "The value provided is not a valid url",
			validationNotAnEmail: "The value provided is not a valid email address",

			settingDefinitionDialogTitle: "Setting Definition",
			settingDefinitionDialogDescription: "This dialog defines how the configuration setting can be entered, if it is editable, and if roles are supported",

			SettingDefinitionDialogRowTitle_name: "Setting Name",
			SettingDefinitionDialogRowDescription_name: "The programmatic name of the setting",
			SettingDefinitionDialogRowTitle_title: "Setting Title",
			SettingDefinitionDialogRowDescription_title: "The user visible title of the setting (a valid property name can be used)",
			SettingDefinitionDialogRowTitle_category: "Category",
			SettingDefinitionDialogRowDescription_category: "The category of the setting (should be from one of a defined set)",
			SettingDefinitionDialogRowTitle_description: "Description",
			SettingDefinitionDialogRowDescription_description: "The complete user visible description of the setting",
			SettingDefinitionDialogRowTitle_allowRoles: "Allow roles",
			SettingDefinitionDialogRowDescription_allowRoles: "This setting supports per-role definitions (i.e. may change depending on the user role)",
			SettingDefinitionDialogRowTitle_canModify: "Can Modify",
			SettingDefinitionDialogRowDescription_canModify: "This setting can be modified (per organisation in a multitenant environment)",
			SettingDefinitionDialogRowTitle_validationType: "Type of Validation",
			SettingDefinitionDialogRowDescription_validationType: "The type of setting validation to be applied. e.g. integer, boolean, email, url, regex",
			SettingDefinitionDialogRowTitle_validationDetails: "Validation Details",
			SettingDefinitionDialogRowDescription_validationDetails: "Further details relating to validation (currently only required for regex type)",
			SettingDefinitionDialogRowTitle_defaultValue: "Default Value",
			SettingDefinitionDialogRowDescription_defaultValue: "The default value to be given for this setting",

			helpOverviewTitle: "Managing Configuration",
			helpOverviewMessage1: "The settings shown can be modified to alter how Connections appears and functions to your users.",
			helpOverviewMessage2: "Some settings apply globally, whereas others may apply differently to users depending on their role. In this case the value for each role can be modified separately.",
			helpSettingTitle: "Setting Name",
			helpSettingDescription: "Setting Description",
			helpSettingEditable: "Setting can be modified",
			helpSettingAllowRoles: "Per-role values supported",
			helpSettingDefinedRoles: "Roles currently defined for this setting",

			category_activities: "Activities",
			category_blogs: "Blogs",
			category_bookmarks: "Bookmarks",
			category_communities: "Communities",
			category_activities: "Activities",
			category_files: "Files",
			category_forums: "Forums",
			category_general: "General",
			category_news: "News",
			category_profiles: "Profiles",
			category_wikis: "Wikis",

			type_boolean: "Boolean",
			type_date: "Date",
			type_email: "Email",
			type_enum: "Enumeration",
			type_file: "File",
			type_integer: "Integer",
			type_person: "Person",
			type_regex: "Regular Expression",
			type_text: "Text",
			type_url: "URL",

			exit : "Exit"
	})});

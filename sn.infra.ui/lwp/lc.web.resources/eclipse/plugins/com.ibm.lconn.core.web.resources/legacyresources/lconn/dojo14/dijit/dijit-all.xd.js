/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {depends: [["provide", "dijit.dijit-all"],
["require", "dijit.dijit"],
["require", "dijit.ColorPalette"],
["require", "dijit.Declaration"],
["require", "dijit.Dialog"],
["require", "dijit.DialogUnderlay"],
["require", "dijit.TooltipDialog"],
["require", "dijit.Editor"],
["require", "dijit.Menu"],
["require", "dijit.MenuItem"],
["require", "dijit.PopupMenuItem"],
["require", "dijit.MenuBar"],
["require", "dijit.MenuBarItem"],
["require", "dijit.PopupMenuBarItem"],
["require", "dijit.MenuSeparator"],
["require", "dijit.ProgressBar"],
["require", "dijit.TitlePane"],
["require", "dijit.Toolbar"],
["require", "dijit.Tooltip"],
["require", "dijit.Tree"],
["require", "dijit.InlineEditBox"],
["require", "dijit.form.Form"],
["require", "dijit.form.Button"],
["require", "dijit.form.DropDownButton"],
["require", "dijit.form.ComboButton"],
["require", "dijit.form.ToggleButton"],
["require", "dijit.form.CheckBox"],
["require", "dijit.form.RadioButton"],
["require", "dijit.form.TextBox"],
["require", "dijit.form.ValidationTextBox"],
["require", "dijit.form.CurrencyTextBox"],
["require", "dijit.form.DateTextBox"],
["require", "dijit.form.NumberSpinner"],
["require", "dijit.form.NumberTextBox"],
["require", "dijit.form.ComboBox"],
["require", "dijit.form.FilteringSelect"],
["require", "dijit.form.MultiSelect"],
["require", "dijit.form.HorizontalSlider"],
["require", "dijit.form.VerticalSlider"],
["require", "dijit.form.HorizontalRule"],
["require", "dijit.form.VerticalRule"],
["require", "dijit.form.HorizontalRuleLabels"],
["require", "dijit.form.VerticalRuleLabels"],
["require", "dijit.form.SimpleTextarea"],
["require", "dijit.form.Textarea"],
["require", "dijit.layout.AccordionContainer"],
["require", "dijit.layout.ContentPane"],
["require", "dijit.layout.BorderContainer"],
["require", "dijit.layout.LayoutContainer"],
["require", "dijit.layout.LinkPane"],
["require", "dijit.layout.SplitContainer"],
["require", "dijit.layout.StackContainer"],
["require", "dijit.layout.TabContainer"]],
defineResource: function(dojo, dijit, dojox){if(!dojo._hasResource["dijit.dijit-all"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit.dijit-all"] = true;
console.warn("dijit-all may include much more code than your application actually requires. We strongly recommend that you investigate a custom build or the web build tool");
dojo.provide("dijit.dijit-all");

/*=====
dijit["dijit-all"] = {
	// summary:
	//		A rollup that includes every dijit. You probably don't need this.
};
=====*/

dojo.require("dijit.dijit");

dojo.require("dijit.ColorPalette");
dojo.require("dijit.Declaration");

dojo.require("dijit.Dialog");
dojo.require("dijit.DialogUnderlay");
dojo.require("dijit.TooltipDialog");

dojo.require("dijit.Editor");

dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.PopupMenuItem");
dojo.require("dijit.MenuBar");
dojo.require("dijit.MenuBarItem");
dojo.require("dijit.PopupMenuBarItem");
dojo.require("dijit.MenuSeparator");

dojo.require("dijit.ProgressBar");
dojo.require("dijit.TitlePane");
dojo.require("dijit.Toolbar");
dojo.require("dijit.Tooltip");
dojo.require("dijit.Tree");
dojo.require("dijit.InlineEditBox");

// Form widgets
dojo.require("dijit.form.Form");

// Button widgets
dojo.require("dijit.form.Button");
dojo.require("dijit.form.DropDownButton");
dojo.require("dijit.form.ComboButton");
dojo.require("dijit.form.ToggleButton");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.RadioButton");

// Textbox widgets
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.form.CurrencyTextBox");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.NumberSpinner");
dojo.require("dijit.form.NumberTextBox");

// Select widgets
dojo.require("dijit.form.ComboBox");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dijit.form.MultiSelect");

// Slider widgets
dojo.require("dijit.form.HorizontalSlider");
dojo.require("dijit.form.VerticalSlider");
dojo.require("dijit.form.HorizontalRule");
dojo.require("dijit.form.VerticalRule");
dojo.require("dijit.form.HorizontalRuleLabels");
dojo.require("dijit.form.VerticalRuleLabels");

// Textarea widgets
dojo.require("dijit.form.SimpleTextarea");
dojo.require("dijit.form.Textarea");

// Layout widgets
dojo.require("dijit.layout.AccordionContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.LayoutContainer"); //deprecated
dojo.require("dijit.layout.LinkPane");
dojo.require("dijit.layout.SplitContainer"); //deprecated
dojo.require("dijit.layout.StackContainer");
dojo.require("dijit.layout.TabContainer");

}

}};});

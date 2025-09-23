/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.util.styling");

// TODO use a CSS class !!!

lconn.highway.util.styling.getInfoBoxStyles = function(color) {
	switch (color) {
		case "LIGHTGRAY":
			return "background:#f8f8f8 !important; border-color:#f8f8f8 !important;";
		case "GRAY":
			return "background:#eeeeee !important; border-color:#eeeeee !important;";
		case "PINK":
			return "background:#fff0f8 !important; border-color:#fff0f8 !important;";
		case "PURPLE":
			return "background:#f0eeff !important; border-color:#f0eeff !important;";
		case "BLUE":
			return "background:#ddeeff !important; border-color:#ddeeff !important;";
		default:
			return "";
	}
}

lconn.highway.util.styling.getInfoBoxStylesBorder = function(color) {
	switch (color) {
		case "LIGHTGRAY":
			return "background:#f8f8f8 !important; border-color:#cccccc !important;";
		case "GRAY":
			return "background:#eeeeee !important; border-color:#cccccc !important;";
		case "PINK":
			return "background:#fff0f8 !important; border-color:#f582d1 !important;";
		case "PURPLE":
			return "background:#f0eeff !important; border-color:#f582f5 !important;";
		case "BLUE":
			return "background:#eef8ff !important; border-color:#82d1f5 !important;";
		default:
			return "";
	}
}

lconn.highway.util.styling.styleNode = function(color, node) {
	switch (color) {
		case "LIGHTGRAY":
			node.style.backgroundColor="#f8f8f8";
			node.style.borderColor="#f8f8f8";
			break;
		case "GRAY":
			node.style.backgroundColor="#eeeeee";
			node.style.borderColor="#eeeeee";
			break;
		case "PINK":
			node.style.backgroundColor="#fff0f8";
			node.style.borderColor="#fff0f8";
			break;
		case "PURPLE":
			node.style.backgroundColor="#f0eeff";
			node.style.borderColor="#f0eeff";
			break;
		case "BLUE":
			node.style.backgroundColor="#ddeeff";
			node.style.borderColor="#ddeeff";
			break;
		default:
			return;
	}
}

// This one works in Chrome !
lconn.highway.util.styling.styleNodeBorder = function(color, node) {
	switch (color) {
		case "LIGHTGRAY":
			node.style.backgroundColor="#f8f8f8";
			node.style.borderColor="#cccccc";
			break;
		case "GRAY":
			node.style.backgroundColor="#eeeeee";
			node.style.borderColor="#cccccc";
			break;
		case "PINK":
			node.style.backgroundColor="#fff0f8";
			node.style.borderColor="#f582d1";
			break;
		case "PURPLE":
			node.style.backgroundColor="#f0eeff";
			node.style.borderColor="#f582f5";
			break;
		case "BLUE":
			node.style.backgroundColor="#eef8ff";
			node.style.borderColor="#82d1f5";
			break;
		default:
			return;
	}
}

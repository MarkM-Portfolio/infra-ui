/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"dojo/dom-geometry",
	"dojo/on",
	"dojo/query",
	"ic-core/config/services"
], function (dojo, lang, domAttr, domConstruct, domGeometry, on, query, services) {

	/**
	 * This utility class provides text summarizing and image manipulation services
	 */
	(function () {
	   function startsWith(str, txt){
	      return str.indexOf(txt) == 0;
	   };
		var cm = com.ibm.social.ee.util.ContentManipulation;
		cm.generate_summary = function (HTMLString, textSize) {
			var contentDiv = document.createElement("div");
			contentDiv._discovered = true;
			contentDiv.innerHTML = HTMLString;
	
			var textSummary = {
					content: "",
					size: 0
			};
			cm._html_dfs(contentDiv, textSummary, textSize);
	
			return textSummary.content;
		};
	
		cm._trim =  function ( s ) {
			if (!s) return "";
			var e = /^(\s*)(.*?)(\s*)$/.exec(s+"");
			return e ? (e[1] && e[1].length ? " " : "") + ((e[2] && e[2].length) ? e[2] + (e[3] && e[3].length ? " " : "") : "") : s;
		};
	
		/**
		 * Function that html sanitizes the node passed in specifically for EE display
		 * Examples are Forum replies, blogs main content.
		 * 
		 * Main aim is to retain some basic html while removing all unwanted styling, tables, images etc
		 */
		cm._html_dfs = function (rootNode, textSummary, threshold) {
			var stack = [rootNode]; // reverse stack since we are using array (pushes/pops from the end);
			var brCount = 0;
			var first = true;
			var hasContent = false;
			while(stack.length > 0 && ((textSummary.size < threshold) || (threshold == -1))) {
				var node = stack[stack.length - 1]; //look at element at "top" of the stack
				
				if ((!node._discovered || node.nodeName.toLowerCase()=="a") && node.nodeType != 3 && node.nodeName) {
					var type = node.nodeName.toLowerCase();
					if (brCount < 2 && (type =="br" || type == "div" || type == "p" || type == "h1" || type == "h2" || type == "h3" || type == "h4" || type == "h5" || type == "blockquote" || type == "tr" || type == "li")) { 
						// hasContent flag is used so we don't have to call dojo.trim() after the first time
					   if (hasContent || lang.trim(textSummary.content).length > 0) { 
					   	hasContent = true;
	   					textSummary.content += "<br/>";
	   					brCount++;
					   }
					}
					if (type == "td") {
						if (node.parentNode._foundFirstTd)
							textSummary.content += "   "; //is space what we want here?
						else
							node.parentNode._foundFirstTd = true;
					}
					if (type == 'span') {
					    if(node.style.display == 'none' && node.parentNode.getAttribute("class") == 'vcard' && node.getAttribute("class") == "x-lconn-userid") {
					    	//specific handling to remove the contents of the hidden biz card span (mentions specific)
					    	domConstruct.empty(node);
						}
					}
					if( type == "a") {
						var href = node.getAttribute('href');
						//Avoid invisible links to images
						if(href && href.indexOf("/resource/BLOGS_UPLOADED_IMAGES/") == -1) {
					   	    if(!node._discovered){
							   textSummary.content += " <a href=\"";			
							   //Only show absolute wellformed links
							   if(startsWith(href, "http")) {
							      //Block any attempts to break and insert XSS code
								  if (href.includes("\"")) {
									  href = encodeURI(href);
								  }
							      textSummary.content += href;
								  textSummary.content += "\" target=\"_blank";	
							   } else if(startsWith(href, "mailto")) {
								  textSummary.content += href;
							   } else {
								  textSummary.content += "javascript:;";
							   }
							   textSummary.content += "\">";
								
							   //If a node has any children we will see it again. Otherwise close it now.
							   if (node.childNodes.length === 0 || node._currChildMarker === node.childNodes.length) {
								  textSummary.content += "</a>";
							   }
						   } else {
							   textSummary.content += "</a>";
						   }
						}
					}
					node._discovered = true; 
				}
				if (node.nodeType == 3) {
					// we are a text node, get our content and pop ourselves off the stack
					var text = cm._trim(node.nodeValue);
					text = text.replace(/</gi, "&lt;");
					text = text.replace(/>/gi, "&gt;");
					if (text.length > 0) {				   
						if((textSummary.size + text.length < threshold) || (threshold == -1)) {
							textSummary.content += text;
							textSummary.size += text.length;
						} else {
							//Handle the case where we add more text than we have space for
							var charToAdd = threshold - textSummary.size;
	
			            // Determine if wide character adjustment is needed at the end of this segment
			            var code = text.charCodeAt(charToAdd - 1), wideCharAdjustment = 0;
			            if (code >= 55296 && code < 56192)
			               wideCharAdjustment=1;
	
							var textToAdd = text.substring(0, charToAdd + wideCharAdjustment);
							textSummary.content += textToAdd;
							textSummary.size = threshold;
						}
						if (text !== " ") // only reset break count if the text is other than a single space
						    brCount = 0; //once we've found some text reset our brCount
					}
					stack.pop();
				}
				else {
					if (!node._currChildMarker)
						node._currChildMarker = 0;
					if (node._currChildMarker == node.childNodes.length) {
						// we are done processing all our children so pop ourselves off the stack
						stack.pop();
					}
					else {
						// there are more children to process, grab the next child and put it on the stack
						// increment the marker to the next child
						stack.push(node.childNodes[node._currChildMarker]);
						node._currChildMarker++;
					}
				}
			}
			//close any <a> left open because we had to cut url text in the middle 
			while(stack.length > 0) {
				var node = stack.pop();
				var type = node.nodeName.toLowerCase();	
				if( type == "a" && node._discovered){
					textSummary.content += "</a>";
				}
			}
		};
	
		cm.generate_images = function(HTMLString, imgHeight, imgWidth, numImages, imageContainer, url, callback) {
	
			imageContainer.style.marginTop = "10px";
	
			var contentDiv = document.createElement("div");
			contentDiv.innerHTML = HTMLString;
	
			var images = query("img", contentDiv);
			if(images.length === 0) {
				if (callback)
					   callback(0);
				return;
					
			}
			var state = {
					imagesSelected: [], //number of images that have been added to the page
					imagesNotSelected: 0,
					originalOrder: 0,
					images: images,
					totalImages: images.length
			}; 
	
			if(url===undefined) url = null;
			cm._process_images(imgHeight, imgWidth, numImages, imageContainer, state, url, callback);
		};
	
	
		cm._process_images = function (minHeight, minWidth, numImages, el, state, url, callback) {
			if (state.imagesSelected.length < numImages) {
				//In order to avoid loading all images, we load numImages at a time, then recursively call this method again if we didn't find enough images to present
				for (var i = 0; i < numImages; i++) { 
					if (state.images.length > 0) {
						var img = state.images.shift();
						if (!domAttr.get(img, "src"))
						   break;
						  
						domAttr.set(img, "src", cm._getImageUrl(domAttr.get(img, "src")));
						   
						img.originalOrder = state.originalOrder;
						state.originalOrder++;
						img.style.position = "absolute";
						img.style.top = "-10000px";
						img.style.left = "-10000px";
						
						if(img.complete || img.height > 0 || img.width > 0) {		
							document.body.appendChild(img);
							cm._image_loaded(minHeight, minWidth, numImages, el, state, {target: img}, url, callback, false);
						}
						else {
							on(img, "load", lang.hitch(cm, cm._image_loaded, minHeight, minWidth, numImages, el, state, {target: img}, url, callback, false));
							on(img, "error", lang.hitch(cm, cm._image_loaded, minHeight, minWidth, numImages, el, state, {target: img},url, callback, true));
							document.body.appendChild(img);
						}
					}
					else
						break;
				}
			}
		};
		
		cm._getImageUrl = function (url) {
			if (!url) return url;
			// If the URL comes from files, fix up the URL so that it uses the oauth proxy
			var filesCfg = lang.getObject("lconn.core.config.services.files"), blogsCfg = lang.getObject("lconn.core.config.services.blogs");
			if (filesCfg && cm.routes && cm.routes.oauth) {
				if (url.indexOf(filesCfg.url) === 0 || url.indexOf(filesCfg.secureUrl) === 0) {
					if (url.indexOf("/form/anonymous/api") !== -1) {
					   url = url.replace("/form/anonymous/api", "/oauth/api");						
					} 
					else if (url.indexOf("/form/api") !== -1) {
						url = url.replace("/form/api", "/oauth/api");
					}
				}
			}
			if (blogsCfg && cm.routes && cm.routes.oauth) {
			   if(url.indexOf(blogsCfg.url) === 0) {
			      url = url.replace(blogsCfg.url, blogsCfg.url + "/oauth");
			   }
			   else if(url.indexOf(blogsCfg.secureUrl) === 0) {
	            url = url.replace(blogsCfg.secureUrl, blogsCfg.secureUrl + "/oauth");
			   }
			}
			if (cm.network && cm.isConnectionsUrl(url)) {
	         url = cm.network.rewriteUrl(url);
	      }
	      return url;
		};
		
		cm.isConnectionsUrl = function (url) {
		   if (!url) return false;
	   	var svcs = services;
	   	for (x in svcs) {
	      	if (url.indexOf(svcs[x].url) == 0 || url.indexOf(svcs[x].secureUrl) == 0)
	      	  return true;
	   	}
	   	return false;
		};
	
		cm._image_loaded = function(minHeight, minWidth, numImages, el, state, e, url, callback, isError) {
			if (state.imagesSelected.length >= numImages) // if we already finished and added the images
				return;
	
			var img = e.target;
			if (!isError && img.height >= minHeight && img.width >= minWidth) {
				state.imagesSelected.push(img);
			}
			else {
				state.imagesNotSelected++;
				document.body.removeChild(img);
				delete img;
			}
			
			if (state.imagesSelected.length >= numImages || (state.imagesSelected.length + state.imagesNotSelected == state.totalImages)) // if we have found enough or they've all been loaded
				cm._add_images(state.imagesSelected, minHeight, minWidth, numImages, el, url, callback); //this call ends the recursion
			// lets try some more images
			else if ((state.imagesSelected.length + state.imagesNotSelected) % numImages == 0) {
				cm._process_images(minHeight, minWidth, numImages, el, state, url, callback);
			}
		};
		
		cm._add_images = function(images, minHeight, minWidth, numImages, el, url, callback) {
		   var isLtr = domGeometry._isBodyLtr();
			images.sort(function(a, b){ return a.originalOrder - b.originalOrder;});
			for (var i = 0; i < images.length && i < numImages; i++) {
				var img = images[i];
				var imgHeight = img.height;
				var imgWidth = img.width;
				img.style.position = "absolute";
				img.style.margin="0pt 0pt 0pt 0pt";
				var aspectRatio, newImgWidth,cropPosition;
				if(imgHeight < imgWidth) {
					aspectRatio = imgWidth / imgHeight;
					newImgWidth = Math.floor(minHeight * aspectRatio);
					cropPosition = (newImgWidth / 2) - (minWidth / 2);
					img.style.height = minHeight + "px";
					img.style.width = newImgWidth + "px";
					if(isLtr)
					   img.style.left = "-" + cropPosition + "px";
					else
					   img.style.right = "-" + cropPosition + "px";
					img.style.top = "0";
				}
				else if (imgWidth < imgHeight){
					aspectRatio = imgHeight / imgWidth;
					newImgHeight = Math.floor(minWidth * aspectRatio);
					cropPosition = (newImgHeight / 2) - (minHeight / 2);
					img.style.width = minWidth + "px";
					img.style.height = newImgHeight + "px";
					img.style.top = "-" + cropPosition + "px";
					if(isLtr)
					   img.style.left = "0";
					else
					   img.style.right = "0";
				}
				else {
					img.style.width = minWidth + "px";
					img.style.height = minHeight + "px";
					if(isLtr)
					   img.style.left = "0";
					else
					   img.style.right = "0";
					img.style.top = "0";
				}
				var a = domConstruct.create("a", {href: url, target: "_blank", className: "eeImgPrev", style: {height: minHeight + "px", width: minWidth + "px" }}, el); 
				a.appendChild(img);
			}
			if (callback)
			   callback(images.length);
		};
	
	
		
	})();
	return com.ibm.social.ee.util.ContentManipulation;
});

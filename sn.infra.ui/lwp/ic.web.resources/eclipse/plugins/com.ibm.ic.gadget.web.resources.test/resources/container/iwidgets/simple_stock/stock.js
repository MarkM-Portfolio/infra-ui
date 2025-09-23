/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on"
], function (dojo, declare, lang, on) {

	declare("simple_stock",null,{
		constructor: function() {
			this.handlingFn = null;
		},
		
		onLoad: function () {
			console.log("test.onLoad ",this.iContext.getRootElement().getAttribute("id"));
		},
		
		onUnload: function() {
			console.log("test.onUnload", this.iContext.getRootElement() ? this.iContext.getRootElement().getAttribute("id") : "root element already gone");
		},
		
		handleAttributeChange:function(iEvent){
			console.log("handleAttributesChange");
			console.dir(iEvent);
			var msg = document.createElement("div");
	        msg.appendChild(document.createTextNode("handleAttributesChange listener is called!"));
	        this.iContext.getElementByClass("message")[0].appendChild(msg);
		},
		
		handleIDescriptorChange:function(iEvent){
			console.log("handleIdescriptorChange");
			console.dir(iEvent);
			var msg = document.createElement("div");
			msg.appendChild(document.createTextNode("handleIdescriptorChange listener is called!"));
			this.iContext.getElementByClass("message")[0].appendChild(msg);
		},
		
		
		
		onview:function(){
			var attributesItemSet = this.iContext.getiWidgetAttributes();
			var symbol = attributesItemSet.getItemValue("symbol");
			this._updateChart(symbol);
			var changeButton = this.iContext.getElementById("changeSymbolButton");
			var input = this.iContext.getElementById("symbolInput");
			on(changeButton, "click", lang.hitch(this, function() {
				var symbol = input.value;
				if (symbol) {
					this._updateChart(symbol);
					this._updateCompanyName(symbol);
				}
			}));
			var usernameLabel = this.iContext.getElementById("username");
			var username = this.iContext.getUserProfile().getItemValue("name");
			usernameLabel.innerHTML = username;
			
			var iDescriptor = this.iContext.getiDescriptor();
			
			var changeTitleButton = this.iContext.getElementById("changeTitleButton");
			var titleInput = this.iContext.getElementById("titleInput");
			on(changeTitleButton, "click", lang.hitch(this, function() {
				var title = titleInput.value;
				if (title) {
					iDescriptor.setItemValue("title",title);
					this.iContext.getElementById("title").innerHTML = this.iContext.getiDescriptor().getItemValue("title");
				}
				
			}));
			
			var changeAuthorButton = this.iContext.getElementById("changeAuthorButton");
			var authorInput = this.iContext.getElementById("authorInput");
			on(changeAuthorButton, "click", lang.hitch(this, function() {
				var author = authorInput.value;
				if (author) {
					iDescriptor.setItemValue("author",author);
					this.iContext.getElementById("author").innerHTML = this.iContext.getiDescriptor().getItemValue("author");
				}
				
			}));
			
			var author = iDescriptor.getItemValue("author");
			this.iContext.getElementById("author").innerHTML = author;
			var version = iDescriptor.getItemValue("version");
			this.iContext.getElementById("version").innerHTML = version;
			var locale = this.iContext.getElementById("titleLocale").options[this.iContext.getElementById("titleLocale").options.selectedIndex].value;
			var title = iDescriptor._getLocalizedItemValue("title",locale);
			this.iContext.getElementById("title").innerHTML = title;
		},
		
		_updateChart : function(symbol) {
			var element = this.iContext.getElementById("symbol");
			element.innerHTML = symbol;
			var imgElement = this.iContext.getElementById("chartImage");
			
			var imageUri = "http://chart.finance.yahoo.com/z?s=" + symbol + "&t=5d&q=l&l=on&z=l&p=s&a=v&p=s&lang=en-US&region=US";
			var uri = this.iContext.io.rewriteURI(imageUri,false);
			if(dojo.config.isDebug) {
				console.debug("image uri: "+uri);
			}
			imgElement.src = imageUri;
		},
		
		_updateCompanyName : function(symbol) {		
			// TODO complete the io test once the proxy url works
			var descUri = "http://www.google.com/finance/info?infotype=infoquoteall&q=" + symbol;
			// var descUri = "widgets/simple_stock/" + symbol + ".json";
			uri = this.iContext.io.rewriteURI(descUri, true);
			if(dojo.config.isDebug) {
				console.debug("desc uri: " + uri);
			}
	
			var callback = cre$.util.hitch(this, function(xhr){
				var element = this.iContext.getElementById("companyName");
				if (xhr.readyState != 4) {
					return;
				}
				var data = xhr.responseText;
				data = data.replace(/\/\//,"");
				data = cre$.internalutil.parseToJson(data);
				console.log(data);
				if(data) {
					data = data[0];
					element.innerHTML = data.name;
				} else {
					element.innerHTML = "Unknown company";
				}
			});
			
			this.iContext.io.request("get", uri, callback);
		},
		
		onedit : function(){
			var attributesItemSet = this.iContext.getiWidgetAttributes();
			var symbol = attributesItemSet.getItemValue("symbol", true);
			var broker = attributesItemSet.getItemValue("broker", true);
			var element1 = this.iContext.getElementByClass("brokerSelection")[0];
			var element2 = this.iContext.getElementByClass("companySelection")[0];
			
			console.log("symbol = " + symbol);
			console.log("broker = " + broker);
			
			if(!symbol) {
				symbol = attributesItemSet.getItemValue("symbol");
				this.iContext.getElementById("symbolMsg").innerHTML="symbol is not set at edit level, use derived value";
			}
			
			if(!broker) {
				broker = attributesItemSet.getItemValue("broker");
				this.iContext.getElementById("brokerMsg").innerHTML="broker is not set at edit level, use derived value";
			}
			
			for(var i = element1.options.length; i--;) {
				if(element1.options[i].value == broker) {
					element1.selectedIndex = i;
					break;
				}
			}
			
			for(var i = element2.options.length; i--;) {
				if(element2.options[i].value == symbol) {
					element2.selectedIndex = i;
					break;
				}
			}
			
		},
		
		save : function(){
		
		  var attr = this.iContext.getiWidgetAttributes();
		  var element1 = this.iContext.getElementByClass("brokerSelection")[0];
	      var value1 = element1.options[element1.selectedIndex].value;
	      attr.setItemValue("broker",value1);
	      // attr.removeItem("broker");
	      var element2 = this.iContext.getElementByClass("companySelection")[0];
	      var value2 = element2.options[element2.selectedIndex].value;
	      attr.setItemValue("symbol",value2);
	      
	      attr.commit(); 
	      
		  
	      var iDescriptor = this.iContext.getiDescriptor();
	      iDescriptor._setLocalizedItemValue("title", "stock_new", "en");
	      iDescriptor.commit();
	      
		}, 
		
		onpersonalize : function(){
			var attributesItemSet = this.iContext.getiWidgetAttributes();
			var symbol = attributesItemSet.getItemValue("symbol", true);
			var broker = attributesItemSet.getItemValue("broker", true);
			var element1 = this.iContext.getElementByClass("p_brokerSelection")[0];
			var element2 = this.iContext.getElementByClass("p_companySelection")[0];
			
			console.log("symbol = " + symbol);
			console.log("broker = " + broker);
			
			if(!symbol) {
				symbol = attributesItemSet.getItemValue("symbol");
				this.iContext.getElementByClass("p_symbolMsg")[0].innerHTML="symbol is not set at personalize level, use derived value";
			}
			
			if(!broker) {
				broker = attributesItemSet.getItemValue("broker");
				this.iContext.getElementByClass("p_brokerMsg")[0].innerHTML="broker is not set at personalize level, use derived value";
			}
			
			for(var i = element1.options.length; i--;) {
				if(element1.options[i].value == broker) {
					element1.selectedIndex = i;
					break;
				}
			}
			
			for(var i = element2.options.length; i--;) {
				if(element2.options[i].value == symbol) {
					element2.selectedIndex = i;
					break;
				}
			}
			
		}, 
		p_save : function(){
			  var attr = this.iContext.getiWidgetAttributes();
			  var element1 = this.iContext.getElementByClass("p_brokerSelection")[0];
		      var value1 = element1.options[element1.selectedIndex].value;
		      attr.setItemValue("broker",value1);
		      // attr.removeItem("broker");
		      var element2 = this.iContext.getElementByClass("p_companySelection")[0];
		      var value2 = element2.options[element2.selectedIndex].value;
		      attr.setItemValue("symbol",value2);
		      
		      attr.commit(); 
		}
	});
});

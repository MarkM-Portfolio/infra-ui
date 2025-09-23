/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.bookmarklet.TopicContent");

dojo.require("lconn.bookmarklet.Res");
dojo.require("dojox.xml.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("lconn.bookmarklet.TopicContent", [dijit._Widget,dijit._Templated], {
    templateString: [   
                     '<div>',                     	
                     	'<div class="discussThisContent lotusLayout lotusBorderBottom">',
                     	    '<div class="discussThisEditableComment" dojoAttachPoint="commentNode"></div>',
                     		'<table role="presentation" width="100%" style="margin-top: 10px;table-layout:fixed"><tbody>',
                     			'<tr><td width="60px" dojoAttachPoint="imgPlaceHolder"> </td><td width="99%"> </td></tr>',
                     			'<tr>',
                     				'<td rowspan="3"><img dojoAttachPoint="imgNode" style="padding-right:5px;max-width:60px;max-heigh:60px;" src="" alt=""/></td>',
                     				'<td style="width:99%"><div class="lotusBold"><a dojoAttachPoint="parentNodeLink" href="${parentLink}" target="_blank">${parentName}</a><span dojoAttachPoint="parentNodeText">${parentName}</span></div></td>',
                     			'</tr>',
                     			'<tr>',
                     				'<td><div><a href="${topicLink}" target="_blank">${escapedTitle}</a></div></td>',
                     			'</tr>',
                     			'<tr>',
                     				'<td><span class="lotusMeta" dojoAttachPoint="topicMetaNode">${labelPosted} <span>${date}</span><span class="lotusDivider" role="presentation">|</span>${labelBy} <span></span>${author}</span></td>',
                     			'</tr>',														
                     			'<tr>',
                     				'<td></td>',
                     				'<td>',
                     				    '<div dojoAttachPoint="descriptionNode" class="lotusBorderTop"></div>',
                     				    '<div dojoAttachPoint="videoNode" style="display:none;"></div>',
                     				    '<div dojoAttachPoint="imageNode" style="display:none;"></div>',
                     				    '<div dojoAttachPoint="attachmentsDivNode"><div class="lotusBold">${labelAttachments}</div><div dojoAttachPoint="attachmentsNode"></div></div>',
                     				'</td>',
                     			'</tr>',
                     		'</tbody></table>',
                     	'</div>'
                     ].join(''),
    parentImg: '',
    parentName: '',
    parentLink: '',
    topicLink: '',
    title: '',
    escapedTitle:'',
    date: '',
    author: '',
    description: '',
    attachments: '',
    labelDiscussThis: '',
    labelBy: '',
    labelPosted: '',
    labelAttachments: '',
    newTitle: '',
    comment: '',
    favicon:'',
    findBy:'',
    find:'',
    video:'',
    videoWidth:'',
    videoHeight:'',
    image:'',
    
    postMixInProperties: function() {
        var res = new lconn.bookmarklet.Res();
	    res.loadDefaultBundle();
	    var b = res.resBundle;
		this.labelDiscussThis = b["discussThis"];
		this.labelPosted = b["posted"];
		this.labelBy = b["by"];
		this.labelAttachments = b["attachments"];
        this.inherited("postMixInProperties", arguments);
        this.escapedTitle = this.title;//dojo 1.10 can handle
    },
    
    postCreate: function() {
    	if (this.findBy == "DF") {
    		this.descriptionNode.innerHTML = this.description;
    	} else {
    		this.descriptionNode.innerHTML = "";
    		this.descriptionNode.appendChild(document.createTextNode(this.description));
    	}
    	
    	this.attachmentsNode.innerHTML = this.attachments;
    	dojo.query("span.dfMimeIcon",this.attachmentsNode).addContent("&nbsp;","first");// empty span will be ignored by atom parser
    	if (this.date == "" || this.author == "")
    		this.topicMetaNode.parentNode.removeChild(this.topicMetaNode);
    	//	dojo.addClass(this.topicMetaNode, 'lotusHidden');
    	if (this.attachments == "")
    		this.attachmentsDivNode.parentNode.removeChild(this.attachmentsDivNode);
    	if (this.parentImg) {
    		dojo.attr(this.imgNode,{src:this.parentImg});
    	}else {
    		this.imgPlaceHolder.setAttribute("width", "0");
    		dojo.attr(this.imgNode,{width:'0', height:'0'});
    	}
    	
    	if (!this.parentLink) {
    		this.parentNodeLink.parentNode.removeChild(this.parentNodeLink);
    	//	this.parentNodeLink.style.display='none';
    	} else {
    		this.parentNodeText.parentNode.removeChild(this.parentNodeText);
    	//	this.parentNodeText.style.display='none';
    	}
    	if (this.findBy == "meta") {
    		if (this.find == 'video') {
    			if (this.video) {
    		        var videoEmbedded = '<iframe width="${videoWidth}" height="${videoHeight}" src="${video}" frameborder="0" allowfullscreen></iframe>';
    		        this.videoNode.innerHTML = dojo.string.substitute(videoEmbedded, this);
    		        this.videoNode.style.display='block';
    			}
    		} else {
    			if (this.image) {
    		        this.imageNode.innerHTML = '<img alt="" src="'+this.image+'"></img>';
    		        this.imageNode.style.display='block';
    			}
    		}
    	}
    },
    
    getTopicFeed: function(isQuestion, isPin) {    	
    	// set comment
    	//this.comment = this.escapeHtml(this.comment);
    	this.comment = this.comment.replace(/\n/g, "<br />");
    	this.commentNode.innerHTML = this.comment;
    	
    	var topicFeedString = ['<entry xmlns="http://www.w3.org/2005/Atom">',
								  '<title type="text"><![CDATA['+ this.newTitle +']]></title>', 
								  '<category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="forum-topic" />',
                            isPin?'<category scheme="http://www.ibm.com/xmlns/prod/sn/flags" term="pinned"/>':'',
                       isQuestion?'<category scheme="http://www.ibm.com/xmlns/prod/sn/flags" term="question"/>':'',
				                  '<content type="text"><![CDATA[' + this.domNode.innerHTML + ']]></content>',
						       '</entry>'].join('');
    	
    	var removelinks = dojo.query(".menu_drop_icon", this.domNode);
    	for(var i=0;i<removelinks.length;i++)
		{
    		var link = removelinks[i].outerHTML;
        	topicFeedString = topicFeedString.replace(link, "")
		}
    	
    	if (dojo.isIE) {
    		return topicFeedString;
    	} else {
    		return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + topicFeedString;
    	}		
    },
    
    escapeHtml: function(html) {
    	if (html && typeof html == 'string') {
    		html = html.replace(/&/g, '&amp;');
    		html = html.replace(/>/g, '&gt;');
    		html = html.replace(/</g, '&lt;');
    		html = html.replace(/'/g, '&#39;');
    		html = html.replace(/"/g, '&quot;');
    		html = html.replace(/ /g, '&nbsp;');
    		return html;
    	} else {
    		return '';
    	}
    }
});

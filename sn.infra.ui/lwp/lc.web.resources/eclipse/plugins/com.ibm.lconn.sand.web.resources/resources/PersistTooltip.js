/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.PersistTooltip");
dojo.declare("lconn.sand.PersistTooltip", [dijit.Tooltip], {

    postCreate: function()
        {
            if(!dijit._masterTT){
                dijit._masterTT = new dijit._MasterTooltip();
            }
            // should get the connection list & see if another heroic.widget.PersistTooltip
            // has already made these connections.
            dijit._masterTT.connect(dijit._masterTT.domNode,'onmouseover',this.ttPersist);
            dijit._masterTT.connect(dijit._masterTT.domNode,'onmouseout',this.ttFade);
            this.inherited("postCreate", arguments);
        },

	open: function(/*DomNode*/ target){
           this.inherited("open", arguments);
	},

                     ttPersist: function (evt)
                     {
                         this.fadeOut.stop();
                         this.fadeIn.play();
                     },

                     ttFade: function (evt)
                     {
                         this.fadeOut.play();
                     }

    }
);

/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

	define([
		"dojo/_base/declare",
		"dojo/json",
		"dojo/date",
		"dojo/_base/lang"
	], function (declare, JSON, date, lang) {
	
		/**
		 * Class that controls broadcast between windows/tabs by offering support
		 * to set/read from localstorage
		 *
		 * Main aim is to allow implementers that have expensive functions only run
		 * on one tab with secondary slave tabs recieving events via local storage.
		 *
		 * Subclass this and register the appropriate functions to ensure you only 
		 * execute on windowActiviated and defer to localStorage when windowDeactivated.
		 *
		 */
		var WindowBroadcastSupport = declare(null,
		{

			isMaster: false,

			storageLock: null,

			masterFrequency: 10000,

			STORAGE_LOCK: "icStorageChannelLock",

			IC_WINDOW_BROADCAST: 'icWindowBroadcast',

			_listenerFunction: undefined,

			/**
			 * Initalize the object for localStorage support setting up
			 * this as the master if first to execute.
			 */
			initWindowBroadcastSupport: function(){	        	
		        var now = new Date().getTime();
		        var storageLock = 0;
			    try {
			        storageLock = +localStorage.getItem( this.STORAGE_LOCK ) || 0;
			    } catch ( error ) {}
			    if ( (now - storageLock) > this.masterFrequency ) {
			        this.assignMaster();
			    } else {
			        this.loseMaster();
			    }
			    this._listenerFunction = lang.hitch(this, "handleStorageEventInternal");
			    if (window.addEventListener) {
				  window.addEventListener("storage", this._listenerFunction, false);
				  window.addEventListener("unload", this._listenerFunction, false);
				} else {
				  window.attachEvent("onstorage", this._listenerFunction);
				  window.attachEvent("unload", this._listenerFunction);
				}
			},

			/**
			 * Process an event from localStorage
			 * Can be following
			 * unload - localStorage is unloaded
			 * storageLock - another window has acquired the lock
			 * broadcast - another window has broadcast a message we can listen for
			 */
			handleStorageEventInternal: function(event){
				if ( event.type === 'unload' ) {
				        this.unregisterNotificationBroadcast();
				} else {
			        var type = event.key,
			            storageLock = 0,
			            data;
			        if ( type === this.STORAGE_LOCK) {
			            try {
			                storageLock = +localStorage.getItem(this.STORAGE_LOCK) || 0;			               
			            } catch ( error ) {}
			            if ( storageLock && !this.isMaster) {
			                this.loseMaster();
			            }
			        } else if ( type === this.IC_WINDOW_BROADCAST ) {
			            try {
			                this.handleStorageEvent(event);			                
			            } catch ( error ) {}
			        }
			    }
			},

			/**
			 *	Subclass this to process events
			 */
			handleStorageEvent: function(event){},

			/**
			 *	Subclass this to cleanup your object
			 */
			cleanupWindowSupport: function(){},

			/**
			 *	Subclass this and set master functionality
			 */
			windowActivated: function(){},

			/**
			 *	Subclass this and set slave functionality
			 */
			windowDeactivated: function(){},

			unregisterNotificationBroadcast: function () {			    
			    if(window.removeEventListener){
 					window.removeEventListener( 'storage', this._listenerFunction, false );
			    	window.removeEventListener( 'unload', this._listenerFunction, false );
			    } else {
 					window.detachEvent( 'storage', this._listenerFunction );
			    	window.detachEvent( 'unload', this._listenerFunction );
			    }
			    this.cleanupWindowSupport();
			   
			},

			assignMaster: function () {
				console.log('WindowBroadcastSupport: assignMaster');
				this.isMaster = true;
				this.setStorageLock();
				this.windowActivated();						    					
			},

			setStorageLock: function(){
				try {
			        localStorage.setItem(this.STORAGE_LOCK, new Date().getTime() );
			    } catch ( error ) {}	
				clearTimeout(this.storageLock);
				this.storageLock = setTimeout( lang.hitch(this, this.setStorageLock), this.masterFrequency);			    
			},

  			loseMaster: function () {
  				clearTimeout(this.storageLock);
  				this.isMaster = false;
  				this.storageLock = setTimeout( lang.hitch(this, this.assignMaster), (this.masterFrequency + this.getRandomTimeout(10000) ));
			    this.windowDeactivated();
			},

			getRandomTimeout: function(base){
				 return ~~( Math.random() * base );
			},

			/**
			 * Set a value into localStorage that others can listen for
			 */
			windowBroadcast: function ( event ) {
			    try {
			        localStorage.setItem(this.IC_WINDOW_BROADCAST ,
			            JSON.stringify({
			                type: 'broadcast',
			                event: event
			            })
			        );
			    } catch ( error ) {}
			}

			
		});
				
		return WindowBroadcastSupport;
		
	});
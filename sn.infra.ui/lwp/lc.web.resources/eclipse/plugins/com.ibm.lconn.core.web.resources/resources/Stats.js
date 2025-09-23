/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.Stats");
//TODO: Am I unused?
dojo.deprecated("lconn.core.Stats", "Mainline components should not use this module", "3.5");
dojo.require("dojo.cookie");

lconn.core.statsOn = false;
lconn.core.stats = {};

lconn.core.numberStatisticPrefix = "lconn.core.NumberStatistic.";
lconn.core.stopWatchStatisticPrefix = "lconn.core.StopWatchStatistic.";
lconn.core.dateStatisticPrefix = "lconn.core.DateStatistic.";
lconn.core.stringStatisticPrefix = "lconn.core.StringStatistic.";
lconn.core.globalStatisticPrefix = "global.";
lconn.core.threadStatisticPrefix = "thread.";

dojo.declare("lconn.core.StopWatch", null, {
        constructor: function(){
        	this.reset();
        },        
        start: function(){
        	this._running = true;
       		this._tStart = new Date();
        	this._tFinish = this._tStart;        
        },       
        stop: function(){
         	var 	diff = 0;
        	
        	this._tFinish = new Date();
        	if( this._running) {
            	this._running = false;
            	diff = this._tFinish - this._tStart;
            	this._tAccum += diff;
        	}
        	return diff;        
        },        
        elapsed: function(){
        	var elapsed = this._tAccum;

	        if( this._running) {
	            elapsed = System.currentTimeMillis( ) - this._tStart;
	        }
        	return elapsed;
        },       
        getElapsed: function(){
        	return this.elapsed( );
        },        
        reset: function(){
        	this._running = false;
        	this._tStart = 0;
        	this._tFinish = 0;
        	this._tAccum = 0;       
        }               
});

dojo.declare("lconn.core.Statistic", null, {
		_type 			: "Statistic",
		_cookiePrefix	: "lconn.core.Statistic.",
		
        constructor: function(instance, name){
        	this._name = name;
 			instance[name] = this;
        },
       	expire: function(scopePrefix, name){
        	document.cookie = scopePrefix + this._cookiePrefix + name + "=" + "" + 
        		"; max-age=" + 0;
        },
        get: function(){
        	return(this);
        },       
        getName: function(){
        	return(this._name);
        },
        getType: function(){
        	return(this._type);
        },
        getValue: function(){
        	return(this._value);
        }, 
        reset: function(){
        	this._value = null;
        }, 
        set: function(value){
        	this._value = value;
        }                      
});

dojo.declare("lconn.core.DateStatistic", lconn.core.Statistic, {
        constructor: function(instance, name){
        	this._cookiePrefix 	= lconn.core.dateStatisticPrefix;
        	this._type 			= "DateStatistic";
        },
        persist: function(scopePrefix){
        	document.cookie = scopePrefix + this._cookiePrefix + this.getName()+ "=" + this._value.toUTCString() + 
        		"; max-age=" + (60 * 60 * 24);
        },
        restore: function(cookieValue){
        	this._value = new Date(cookieValue);
       	},      
        toString: function(){
           	var s = new String();
        	s = this.getName() + " =  " + this._value.toUTCString() + "\n";
        	return(s);
        }             
});

dojo.declare("lconn.core.StringStatistic", lconn.core.Statistic, {
        constructor: function(instance, name){
        	this._cookiePrefix 	= lconn.core.stringStatisticPrefix;
        	this._type 			= "StringStatistic";
        },
        persist: function(scopePrefix){
        	document.cookie = scopePrefix + this._cookiePrefix + this.getName()+ "=" + this.getValue() + 
        		"; max-age=" + (60 * 60 * 24);
        },
        restore: function(cookieValue){
        	this._value = cookieValue;
       	},       
        toString: function(){
           	var s = new String();
        	s = this.getName() + " =  " + this.getValue() + "\n";
        	return(s);
        }                
});

dojo.declare("lconn.core.NumberStatistic", lconn.core.Statistic, {
        constructor: function(instance, name){
        	this._cookiePrefix 	= lconn.core.numberStatisticPrefix;
        	this._type 			= "NumberStatistic";
        	this._value 		= 0;      
        },
        add: function(){
        	this._value += value;
        },
        persist: function(scopePrefix){
        	document.cookie = scopePrefix + this._cookiePrefix + this.getName()+ "=" + this.getValue() + 
        		"; max-age=" + (60 * 60 * 24);
        },
        reset: function(){
        	this._value = 0;
        },
        restore: function(cookieValue){
        	this._value = parseFloat(cookieValue);
       	},         
        toString: function(){
           	var s = new String();
        	s = this.getName() + " =  " + this.getValue() + "\n";
        	return(s);
        }                 
});

dojo.declare("lconn.core.StopWatchStatistic", lconn.core.Statistic, {
        constructor: function(instance, name){
        	this._cookiePrefix 	= lconn.core.stopWatchStatisticPrefix;
        	this._type 			= "StopWatchStatistic";
        	this._value 		= this._type;
        
            this._dsTotalTime = new lconn.core.NumberStatistic( instance, name + ".Total");
            this._dsMin = new lconn.core.NumberStatistic( instance, name + ".Min");
            this._dsMax = new lconn.core.NumberStatistic( instance, name + ".Max");
            this._dsAverage = new lconn.core.NumberStatistic( instance, name + ".Average");
            this._dsCounter = new lconn.core.NumberStatistic( instance, name + ".Count");
            this.reset();
        },
        add: function(stopWatch){
        	var runTime = stopWatch.getElapsed();
        	
        	// compute the new average
        	this._average = ( this._average * this._counter + runTime) / ( this._counter + 1);
        	this._total += runTime;
	        if (this._counter  == 0) {
	            this._min = runTime;
	        } else {
	            this._min = Math.min(this._min, runTime);
	        }
	        this._max = Math.max(runTime,this._max);
	                		
        	this._counter++;

        	this.update( );
        },       
        getAverage: function(){
        	return(this._dsAverage.get( ));
        },       
        getCounter: function(){
            return(this._dsCounter.get( ));       
        },       
        getMax: function(){
			return(this._dsMax.get( ));        
        },        
        getMin: function(){
        	return(this._dsMin.get( ));
        },                
        getTotal: function(){
        	return(this._dsTotalTime.get( ));
        },        
        persist: function(scopePrefix){
        	var cookieValue = "min:"+ this._min + "?max:" + this._max + "?average:" + this._average + "?counter:" + this._counter +
        						"?total:" + this._total;
        	document.cookie = scopePrefix + this._cookiePrefix + this.getName()+ "=" + cookieValue + 
        		"; max-age=" + (60 * 60 * 24);
        }, 
        reset: function(){
            this._dsTotalTime.set(0);
            this._dsMin.set(0);
            this._dsMax.set(0);
            this._dsAverage.set(0);
            this._dsCounter.set(0);
            this._min = Number.MAX_VALUE;;
			this._max = 0;
			this._average = 0;
			this._counter = 0;
			this._total= 0;
        },
        restore: function(instance, cookieValue){        
        	delete instance[this.getName() + ".Total"];
       		delete instance[this.getName() + ".Min"];
       		delete instance[this.getName() + ".Max"];
       		delete instance[this.getName() + ".Average"];
       		delete instance[this.getName() + ".Count"];
        	      	
        	this._dsTotalTime = new lconn.core.NumberStatistic( instance, this.getName() + ".Total");
            this._dsMin = new lconn.core.NumberStatistic( instance, this.getName() + ".Min");
            this._dsMax = new lconn.core.NumberStatistic( instance, this.getName() + ".Max");
            this._dsAverage = new lconn.core.NumberStatistic( instance, this.getName() + ".Average");
            this._dsCounter = new lconn.core.NumberStatistic( instance, this.getName() + ".Count");
        	
         	var nameValuePairs	= cookieValue.split('?');
        	for (var i = 0; i < nameValuePairs.length; i++){
        		nameValuePair = nameValuePairs[i].split(":");
        		switch (nameValuePair[0]){
        			case "min":
        				this._min = parseInt(nameValuePair[1]);
        				break;
        			case "max":
        				this._max = parseInt(nameValuePair[1]);
        				break;
       				case "average":
        				this._average = parseFloat(nameValuePair[1]);
        				break;
        			case "counter":
        				this._counter = parseInt(nameValuePair[1]);
        				break;
       				case "total":
        				this._total = parseInt(nameValuePair[1]);
        				break;
        		}
        	}
        	this.update(); 
        },
        
        set: function(value){
        	this.reset();
        	this.add(value);
        },
                         
        toString: function(){
        	var s = new String();
        	s = this.getName() + ":  " +
				this._dsTotalTime.toString( ) + 
				this._dsMin.toString( ) + 
				this._dsMax.toString( ) +  
				this._dsAverage.toString( ) +  
				"Count = " + this._dsCounter.get( );
        	return(s);	
        },
        
        update: function(){       
        	this._dsMin.set( this._min);
        	this._dsMax.set( this._max);
        	this._dsAverage.set( this._average);
       		this._dsCounter.set( this._counter);
        	this._dsTotalTime.set( this._total);
        }                      
});

dojo.declare("lconn.core.StatisticsCollector", null, {
        
        constructor: function(){
        },
        
        getGlobalInstance: function(){
       		var isEmpty = true;
        	
        	for (var key in this.statics._globalInstance)
        		isEmpty = false;
        	
        	if (isEmpty == true)
        		this.restoreGlobalInstance();    
        	 
        	return(this.statics._globalInstance);
        },
        
        getThreadInstance: function(){
            var isEmpty = true;
        	
        	for (var key in this.statics._threadInstance)
        		isEmpty = false;
        	
        	if (isEmpty == true)
        		this.purgeThreadInstance();    
        	 
        	return(this.statics._threadInstance)
        },
        
        get: function(instance, key){
        	return(instance[key]);
        },
        
        register: function(instance, statistic){
        	instance[statistic.getName()] = statistic;         
        },
        
        persistGlobalInstance: function(){
        	for (var key in this.statics._globalInstance)
        		this.statics._globalInstance[key].persist(lconn.core.globalStatisticPrefix);
        },
        
        persistThreadInstance: function(){
        	for (var key in this.statics._threadInstance)
        		this.statics._threadInstance[key].persist(lconn.core.threadStatisticPrefix);
        },
        
        dumpToConsole: function(instance, key){
        	if(dojo.config.isDebug) {
        		console.debug("StatsCollector:  key = " + key.toString() + "  value = " + instance[key].toString()); 
        	}
        },
        
        dumpAllToConsole: function(instance){
        	for (var key in instance) {
        		if(dojo.config.isDebug) {
        			console.debug("StatsCollector:  key = " + key.toString() + "  value = " + instance[key].toString());
        		}
        	}
        },
        
        purgeGlobalInstance: function(){
        	this.purgeInstance(this.statics._globalInstance, lconn.core.globalStatisticPrefix)
        },
        
        purgeThreadInstance: function(){
        	this.purgeInstance(this.statics._threadInstance, lconn.core.threadStatisticPrefix)
        },
        
        purgeInstance: function(instance, scopePrefix){
            var allCookies = document.cookie;
        	var cookieArray = document.cookie.split(';');
        	for (var i = 0; i < cookieArray.length; i++){
        		var cookie = cookieArray[i];
        		while (cookie.charAt(0) == ' ')
        			cookie = cookie.substring(1, cookie.length);
        		if (cookie.indexOf(scopePrefix + lconn.core.stopWatchStatisticPrefix) == 0){
        			var statNameStart = cookie.substring(scopePrefix.length + lconn.core.stopWatchStatisticPrefix.length, cookie.length);
        			var nameValuePair = statNameStart.split('=');
        			var stopWatchStat = this.get(instance, nameValuePair[0]);
        			if (stopWatchStat == null)
				    	stopWatchStat = new lconn.core.StopWatchStatistic(instance, nameValuePair[0]);
					stopWatchStat.expire(scopePrefix, nameValuePair[0]);
					delete instance[nameValuePair[0]];
	       		} 
        		if (cookie.indexOf(scopePrefix + lconn.core.numberStatisticPrefix) == 0){
        			var statNameStart = cookie.substring(scopePrefix.length + lconn.core.numberStatisticPrefix.length, cookie.length);
        			var nameValuePair = statNameStart.split('=');
        			var numberStat = this.get(instance, nameValuePair[0]);
        			if (numberStat == null)
				    	numberStat = new lconn.core.NumberStatistic(instance, nameValuePair[0]);
					numberStat.expire(scopePrefix, nameValuePair[0]);
					delete instance[nameValuePair[0]];
        		} 
         		if (cookie.indexOf(scopePrefix + lconn.core.stringStatisticPrefix) == 0){
        			var statNameStart = cookie.substring(scopePrefix.length + lconn.core.stringStatisticPrefix.length, cookie.length);
        			var nameValuePair = statNameStart.split('=');
        			var stringStat = this.get(instance, nameValuePair[0]);
        			if (stringStat == null)
				    	stringStat = new lconn.core.StringStatistic(instance, nameValuePair[0]);
					stringStat.expire(scopePrefix, nameValuePair[0]);
					delete instance[nameValuePair[0]];
	       		} 
        		if (cookie.indexOf(scopePrefix + lconn.core.dateStatisticPrefix) == 0){
        			var statNameStart = cookie.substring(scopePrefix.length + lconn.core.dateStatisticPrefix.length, cookie.length);
        			var nameValuePair = statNameStart.split('=');
        			var dateStat = this.get(instance, nameValuePair[0]);
        			if (dateStat == null)
				    	dateStat = new lconn.core.DateStatistic(instance, nameValuePair[0]);
					dateStat.expire(scopePrefix, nameValuePair[0]);
					delete instance[nameValuePair[0]];
        		}        		       			       			
        	}
        	for (var key in instance)
        		delete instance[key];        	     
        },
        restoreGlobalInstance: function(){
        	this.restoreInstance(this.statics._globalInstance, lconn.core.globalStatisticPrefix);
        },        
        restoreInstance: function(instance, scopePrefix){
        	var allCookies = document.cookie;
       		var cookieArray = document.cookie.split(';');
       		
       		// first restore everything but the stopwatch
       		for (var i = 0; i < cookieArray.length; i++){
       			var cookie = cookieArray[i];
       			while (cookie.charAt(0) == ' ')
       				cookie = cookie.substring(1, cookie.length);
       			if (cookie.indexOf(scopePrefix + lconn.core.numberStatisticPrefix) == 0){
       				var statNameStart = cookie.substring(scopePrefix.length + lconn.core.numberStatisticPrefix.length, cookie.length);
       				var nameValuePair = statNameStart.split('=');
       				var numberStat = new lconn.core.NumberStatistic(instance, nameValuePair[0]);
					numberStat.restore(nameValuePair[1]);        				
       			}
       			if (cookie.indexOf(scopePrefix + lconn.core.stringStatisticPrefix) == 0){
       				var statNameStart = cookie.substring(scopePrefix.length + lconn.core.stringStatisticPrefix.length, cookie.length);
       				var nameValuePair = statNameStart.split('=');
       				var stringStat = new lconn.core.StringStatistic(instance, nameValuePair[0]);
					stringStat.restore(nameValuePair[1]);        				
       			} 
       			if (cookie.indexOf(scopePrefix + lconn.core.dateStatisticPrefix) == 0){
       				var statNameStart = cookie.substring(scopePrefix.length + lconn.core.dateStatisticPrefix.length, cookie.length);
       				var nameValuePair = statNameStart.split('=');
       				var dateStat = new lconn.core.DateStatistic(instance, nameValuePair[0]);
					dateStat.restore(nameValuePair[1]);        				
       			}        			       			       			        			       			
       		}
       		
       		// then restore the stopwatch; their restore will overwrite the associated number statistics previously restored
       		for (var i = 0; i < cookieArray.length; i++){
       			var cookie = cookieArray[i];
       			while (cookie.charAt(0) == ' ')
       				cookie = cookie.substring(1, cookie.length);
       			if (cookie.indexOf(scopePrefix + lconn.core.stopWatchStatisticPrefix) == 0){
       				var statNameStart = cookie.substring(scopePrefix.length + lconn.core.stopWatchStatisticPrefix.length, cookie.length);
       				var nameValuePair = statNameStart.split('=');
       				var stopWatchStat = new lconn.core.StopWatchStatistic(instance, nameValuePair[0]);
					stopWatchStat.restore(instance, nameValuePair[1]);        				
       			} 
       		}       		
        },        
        statics: {_threadInstance: {}, _globalInstance: {} }   
});

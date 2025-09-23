/* Copyright IBM Corp. 2017 All Rights Reserved.*/
define([ 'dojo/i18n!../nls/Tours' ], function(nls) {
  /**
   * This module represents a Hopscotch tour object for
   * Metrics Guided JIT tour.
   */
  var metricsTour = {
    id : "jit-metrics",
    type : 'jitTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
    steps : [ {
      title : nls.metricsThemeTreeTitle,
      content : nls.metricsThemeTreeContent,
      target : "#lotusSidenav",
	  xOffset : -100,
      yOffset : 70,
      placement : "right"
    }, { 
      title : nls.metricsDateRangeTitle,
      content : nls.metricsDateRangeContent,
      target : "#divTimeRangeFiltersID",
      placement : "bottom"
    }, { 
        title : nls.metricsGroupByTitle,
        content : nls.metricsGroupByContent,
        target : "#divGroupByFilterID",
  	  xOffset : -30,
        placement : "bottom"
    }, { 
      title : nls.metricsSwitchTitle,
      content : nls.metricsSwitchContent,
      target : "#lineChartViewChartLink",
      placement: "left",
      yOffset : -100
    } ],
  };
  return metricsTour;
});

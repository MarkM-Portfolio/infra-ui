dojo.provide("lconn.core.svg.svgHelper");
dojo.require("lconn.core.svg.svgResource");

/**
 * Provide svg icons under given html node
 * 
 * @param {element} parentNode - the svg icon will be added under this node
 * @param {string} key - key to fetch the svg resource value
 */
lconn.core.svg.svgHelper.loadIcon = function(parentNode, key) {
  var resourceSVG = new lconn.core.svg.svgResource();
  var iconJson = resourceSVG.getSVG();
  
  var iconObj = iconJson[key];
  if (iconObj != null) {
    dojo.attr(parentNode, "innerHTML", iconObj);
  }
};

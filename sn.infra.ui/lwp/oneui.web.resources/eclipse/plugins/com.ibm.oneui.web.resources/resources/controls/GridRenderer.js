/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.controls.GridRenderer");

dojo.require("ic-ui.GridRenderer");

/**
 * A widget that renders the contents of a OneUI grid control.
 * This snippet shows a common use case for this class:
 * <pre>
 *    var gridRenderer = new com.ibm.oneui.controls.GridRenderer({
 *       emptyClass: "lconnEmpty",
 *       nls: {
 *          summary: "List of items",
 *          empty: "No items",
 *          loading: "Loading..."
 *       }
 *    });
 *    var grid = new com.ibm.oneui.controls.Grid({
 *       renderer: gridRenderer
 *    });
 * </pre>
 * @param {Object} opts Options to mixin
 * @deprecated Use {@link ic-ui.GridRenderer} instead
 * @see {@link com.ibm.oneui.controls.Grid}
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.deprecated("com.ibm.oneui.controls.GridRenderer", "Use ic-ui/GridRenderer instead", "6.0");

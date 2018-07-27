sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/sap/airdit_GoodsIssue/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.sap.airdit_GoodsIssue.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();

			var model = new sap.ui.model.json.JSONModel();
			model.loadData("model/goods.json");
			this.setModel(model);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});
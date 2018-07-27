sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function(JSONModel, Controller) {
	"use strict";

	return Controller.extend("com.sap.airdit_GoodsIssue.controller.Master", {

		onInit: function() {
			/*var oModel = new JSONModel("./model/dummy.json");
			this.getView().setModel(oModel, "goods");
			*/
			/*var model = this.getOwnerComponent().getModel();
			this.getView().setModel(model);*/
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("goodsIssue").attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function() {

		},
		_onPressHandler: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("goodsIssue");
		},
		itempress: function(oEvent) {
			this.contextpath = oEvent.getSource().getBindingContext().getProperty("productdetails");
			var model = new sap.ui.model.json.JSONModel(this.contextpath);
			this.getOwnerComponent().getRouter().navTo("goodsIssue");
			var goodsIssue = this.getOwnerComponent().getRouter().getView("com.sap.airdit_GoodsIssue.view.GoodsIssue");
			goodsIssue.setModel(model);
			var goodsIssuedetail = goodsIssue.byId("goodsIssue");
			var path = oEvent.getSource().getBindingContext().getObject().id;
			goodsIssuedetail.setTitle("Goods Name : " + path);
		}

	});

});
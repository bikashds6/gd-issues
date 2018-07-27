"use strict";

sap.ui.define(["sap/m/Dialog", "com/sap/airdit_GoodsIssue/controller/base/BaseController", "sap/ui/model/json/JSONModel",
	"com/sap/airdit_GoodsIssue/service/Connector", "sap/ui/Device"
], function(Dialog, BaseController, JSONModel, Connector, Device) {
	"use strict";

	return BaseController.extend("com.sap.airdit_GoodsIssue.controller.GoodsIssue", {

		onInit: function() {

			sap.ui.core.UIComponent.getRouterFor(this).getRoute("goodsIssue").attachPatternMatched(this._onRouteMatched, this);
			/*var oModel = new sap.ui.model.json.JSONModel(this._data);
			this.getView().setModel(oModel);

			var oModel = new JSONModel("./model/Key.json");
			this.getView().setModel(oModel, "data");
			
			var data = new JSONModel("./model/data.json");
			this.getView().setModel(data, "plant");*/
		
			this.getView().byId("myDP1").setDateValue( new Date());
			this.getView().byId("myDP2").setDateValue( new Date());
			
			var model = this.getOwnerComponent().getModel();
			this.getView().setModel(model);
			
		},
		_onRouteMatched: function() {

		},
		pressDialog: null,
		_onSelectPlant: function() {
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"com.sap.airdit_GoodsIssue.view.Plant",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
			this._valueHelpDialog.open();

			/*if (!this.pressDialog) {
					this.pressDialog = new Dialog({
						title: 'Available Products',
						content: new sap.m.List({
							items: {
								path: 'plant>/',
								template: new sap.m.StandardListItem({
									title: "{plant>name}"
								})
							}
						}),
						beginButton: new sap.m.Button({
							text: 'Close',
							press: function() {
								this.pressDialog.close();
							}.bind(this)
						})
					});

					//to get access to the global model
					this.getView().addDependent(this.pressDialog);
			}

				this.pressDialog.open(); */
		},
		_onSelectMovement: function() {

			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"com.sap.airdit_GoodsIssue.view.Movement",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
			this._valueHelpDialog.open();
		},
		onChange: function(oEvent) {
			this.getView().setModel(sap.ui.getCore().getModel("data"));
			var oKey = oEvent.getSource().getSelectedKey();
			var oData = {
				selected: oKey
			};
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(oData);
			this.getView().setModel(oModel, "selectedModel");
		},
		onPress: function(oEvent) {
			var details = this.getView().byId("goodsIssue").getModel().oData;
			var detailsModel = new sap.ui.model.json.JSONModel(details);
			this.getOwnerComponent().getRouter().navTo("detailsIssue");
			var detailsGoodsIssue = this.getOwnerComponent().getRouter().getView("com.sap.airdit_GoodsIssue.view.DetailsRegardingIssue");
			detailsGoodsIssue.setModel(detailsModel);
			/*var details = this.getView().byId("goodsIssue").getModel().oData;
			var detailsModel = new sap.ui.model.json.JSONModel(details);
			this.getOwnerComponent().getRouter().navTo("detailsIssue");
			var detailsGoodsIssue = this.getOwnerComponent().getRouter().getView("com.sap.airdit_GoodsIssue.view.DetailsRegardingIssue");
			detailsGoodsIssue.setModel(detailsModel);*/
		
		},
		_findBindItemToInput: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId("mtype");
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
			this._valueHelpDialog.close();
		},
		_findPlantBindItemToInput : function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId("ptype");
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
			this._valueHelpDialog.close();
		}



	});
});
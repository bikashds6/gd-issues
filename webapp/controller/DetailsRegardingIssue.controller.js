"use strict";

sap.ui.define(["com/sap/airdit_GoodsIssue/controller/base/BaseController", "sap/ui/model/json/JSONModel",
	"com/sap/airdit_GoodsIssue/service/Connector", "sap/ui/Device"
], function(BaseController, JSONModel, Connector, Device) {
	"use strict";

	return BaseController.extend("sap.ui.airditGoods_Issue.controller.DetailsRegardingIssue", {

		onInit: function onInit() {

			sap.ui.core.UIComponent.getRouterFor(this).getRoute("detailsIssue").attachPatternMatched(this._onRouteMatched, this);

			/*var oModel = new JSONModel("./model/ItemDetails.json");
			this.getView().setModel(oModel, "items");*/

			// Adding row dynamically
			/*var dummyData1 = [{
				"fname": "Brooks",
				"lname": "Frederick",
				"desc": ""
			}, {
				"fname": "Winnie",
				"lname": "Vidales",
				"desc": ""
			}, {
				"fname": "Matt",
				"lname": "Frame",
				"desc": ""
			}, {
				"fname": "Arthur",
				"lname": "Foxen",
				"desc": ""
			}, {
				"fname": "Eric",
				"lname": "Gallant",
				"desc": ""
			}, {
				"fname": "Rupa",
				"lname": "Rodriguez",
				"desc": ""
			}, {
				"fname": "Kash",
				"lname": "Crantek",
				"desc": ""
			}, {
				"fname": "Vittorio",
				"lname": "Lannatewitz",
				"desc": ""
			}, {
				"fname": "Jerrod",
				"lname": "Corado",
				"desc": ""
			}, {
				"fname": "Camelyn",
				"lname": "Flores",
				"desc": ""
			}];
*/
			var dummyData = [{
				"item": "",
				"material": "",
				"quantity": "",
				"vnE": "",
				"slot": "",
				"batch": "",
				"rePlot": ""
			}];

			var oModel = new sap.ui.model.json.JSONModel({
				data: dummyData
			});

			this.getView().setModel(oModel);
			this.getView().getModel().oData.data.splice(0, 1);
			this.getView().getModel().refresh();
			this.addEmptyObject();
		},

		addEmptyObject: function() {
			var oModel = this.getView().getModel();
			var aData = oModel.getProperty("/data");

			var emptyObject = {
				createNew: true
			};

			aData.push(emptyObject);
			oModel.setProperty("/data", aData);
		},

		enableControl: function(value) {
			return !!value;
		},

		disableControl: function(value) {
			return !value;
		},

		addEntry: function(oEvent) {
			var path = oEvent.getSource().getBindingContext().getPath();
			var obj = {
				item: null,
				material: null,
				quantity: null,
				vnE: null,
				slot: null,
				batch: null,
				rePlot: null,
				createNew: false,
				removeNew: false,
				saveNew: true
			};

			var oModel = this.getView().getModel();

			oModel.setProperty(path, obj);
		},

		saveEntry: function(oEvent) {
			var path = oEvent.getSource().getBindingContext().getPath();
			var obj = oEvent.getSource().getBindingContext().getObject();

			obj.saveNew = false;
			obj.removeNew = true;

			var oModel = this.getView().getModel();

			oModel.setProperty(path, obj);

			this.addEmptyObject();

		},
		removeEntry: function(oEvent) {
			var deleteRecord = oEvent.getSource().getBindingContext().getObject();
			for (var i = 0; i < oEvent.getSource().getBindingContext().getModel().oData.data.length; i++) {
				if (oEvent.getSource().getBindingContext().getModel().oData.data[i] == deleteRecord) {
					//	pop this._data.Products[i] 
					oEvent.getSource().getBindingContext().getModel().oData.data.splice(i, 1); //removing 1 record from i th index.
					this.getView().getModel().refresh();
					break; //quit the loop
				}
			}

		},
		_onRouteMatched: function () {

		},

		_onAddRow: function() {
			var model = this.getView().getModel();
			var currentRows = model.getProperty("items>/");
			var newRows = currentRows.concat(this.createEntry());
			model.setProperty("items>/", newRows);
		},

		createEntry: function() {
			return {
				Item: {
					selectedKey: "",
					value: ""
				},
				Material: {
					selectedKey: "",
					value: ""
				},
				Quantity: {
					selectedKey: "",
					value: ""
				},
				VnE: {
					selectedKey: "",
					value: ""
				},
				Slot: {
					selectedKey: "",
					value: ""
				},
				Batch: {
					selectedKey: "",
					value: ""
				}

			};
		}
	});
});
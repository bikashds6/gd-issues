"use strict";

sap.ui.define(["jquery.sap.global", "com/sap/airdit_GoodsIssue/service/RESTer", "com/sap/airdit_GoodsIssue/service/Constants"], function (JQuery, RESTer, Constants) {
    "use strict";

    function Connector(oDefHeaders, sCType, oBAuth, isGetCSRF) {
        if (isGetCSRF) {
            this.oRESTer = new RESTer(oDefHeaders, sCType, oBAuth);
        } else {
            var csrfToken = sap.ui.getCore().getModel("faglobal").getProperty("/CSRF");
            this.oRESTer = new RESTer({
                "X-CSRF-Token": csrfToken
            }, sCType, oBAuth);
        }
        this.sServiceBasePath = Constants.URL.SERVICES.BASE_PATH_PROD;
    }

    Connector.prototype.csrfReq = function (path, successFn, failureFn, oScope) {
        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.getSync(url);

        var oPromise = oDeferred.promise();

        this.handlePromise(oPromise, successFn, failureFn, oScope);
    };

    Connector.prototype.handlePromise = function (oPromise, successFn, failureFn, oScope) {
        var _this = this;

        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oResponse);
            }
        }).fail(function (oResponse) {
            _this.handleFailure(oResponse, failureFn, oScope);
        }).always(function () {
            LoaderUtil.closeLoader();
        });
    };
    Connector.prototype.get = function (path, oItem, successFn, failureFn, oScope) {
        var _this2 = this;

        sap.ui.getCore().getModel("faglobal").setProperty("/LastServiceTime", new Date().getTime());
        LoaderUtil.openLoader();

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.get(url, oItem);

        var oPromise = oDeferred.promise();
        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse);
            }
        }).fail(function (oResponse) {
            _this2.handleFailure(oResponse, failureFn, oScope);
        }).always(function (onFailure) {
            LoaderUtil.closeLoader();
        });

        return oDeferred.promise();
    };
    Connector.prototype.getWOLoader = function (path, oItem, successFn, failureFn, oScope) {
        var _this3 = this;

        sap.ui.getCore().getModel("faglobal").setProperty("/LastServiceTime", new Date().getTime());

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.get(url, oItem);

        var oPromise = oDeferred.promise();
        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse);
            }
        }).fail(function (oResponse) {
            _this3.handleFailure(oResponse, failureFn, oScope);
        });

        return oDeferred.promise();
    };

    Connector.prototype.getLogout = function (path, successFn, failureFn, oScope) {
        LoaderUtil.openLoader();

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.get(url);

        var oPromise = oDeferred.promise();
        oPromise.done(function (oResponse) {
            LoaderUtil.closeLoader();
            if (successFn) {
                successFn.call(oScope, oResponse);
            }
        }).fail(function (oResponse) {
            LoaderUtil.closeLoader();
            failureFn.call(oScope, oResponse);
        }).always(function (onFailure) {
            LoaderUtil.closeLoader();
        });

        return oDeferred.promise();
    };

    Connector.prototype.getImage = function (path, oItem, successFn, failureFn, oScope, extraArg) {
        var _this4 = this;

        LoaderUtil.openLoader();

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.get(url, oItem);

        var oPromise = oDeferred.promise();

        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse, extraArg);
            }
        }).fail(function (oResponse) {
            _this4.handleFailure(oResponse, failureFn, oScope);
        }).always(function (onFailure) {
            LoaderUtil.closeLoader();
        });

        return oDeferred.promise();
    };

    Connector.prototype.getPaginatedResponseAndCombineWith = function (path, page, oItem, successFn, failureFn, oScope, extraArg) {
        var _this5 = this;

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.get(url, oItem);

        var oPromise = oDeferred.promise();

        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse, page, extraArg);
            }
        }).fail(function (oResponse) {
            _this5.handleFailure(oResponse, failureFn, oScope);
        });

        return oDeferred.promise();
    };

    Connector.prototype.getForSession = function (path, oItem, successFn, failureFn, oScope) {
        var _this6 = this;

        sap.ui.getCore().getModel("faglobal").setProperty("/LastServiceTime", new Date().getTime());

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.get(url, oItem);

        var oPromise = oDeferred.promise();
        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse);
            }
        }).fail(function (oResponse) {
            _this6.handleFailure(oResponse, failureFn, oScope);
        }).always(function (onFailure) {});

        return oDeferred.promise();
    };

    Connector.prototype.post = function (path, oItem, successFn, failureFn, oScope) {
        var _this7 = this;

        sap.ui.getCore().getModel("faglobal").setProperty("/LastServiceTime", new Date().getTime());
        LoaderUtil.openLoader();

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.post(url, oItem);

        var oPromise = oDeferred.promise();
        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse);
            }
        }).fail(function (oResponse) {
            _this7.handleFailure(oResponse, failureFn, oScope);
        }).always(function (onFailure) {
            LoaderUtil.closeLoader();
        });

        return oDeferred.promise();
    };

    Connector.prototype.update = function (path, oItem, successFn, failureFn, oScope) {
        var _this8 = this;

        sap.ui.getCore().getModel("faglobal").setProperty("/LastServiceTime", new Date().getTime());
        LoaderUtil.openLoader();

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.put(url, oItem);

        var oPromise = oDeferred.promise();

        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse);
            }
        }).fail(function (oResponse) {
            _this8.handleFailure(oResponse, failureFn, oScope);
        }).always(function (onFailure) {
            LoaderUtil.closeLoader();
        });

        return oDeferred.promise();
    };

    Connector.prototype.partialUpdate = function (path, oItem, successFn, failureFn, oScope) {
        var _this9 = this;

        sap.ui.getCore().getModel("faglobal").setProperty("/LastServiceTime", new Date().getTime());
        LoaderUtil.openLoader();

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.patch(url, oItem);

        var oPromise = oDeferred.promise();

        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse);
            }
        }).fail(function (oResponse) {
            _this9.handleFailure(oResponse, failureFn, oScope);
        }).always(function (onFailure) {
            LoaderUtil.closeLoader();
        });

        return oDeferred.promise();
    };

    Connector.prototype.delete = function (path, oItem, successFn, failureFn, oScope) {
        var _this10 = this;

        sap.ui.getCore().getModel("faglobal").setProperty("/LastServiceTime", new Date().getTime());
        LoaderUtil.openLoader();

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.delete(url, oItem);

        var oPromise = oDeferred.promise();

        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse);
            }
        }).fail(function (oResponse) {
            _this10.handleFailure(oResponse, failureFn, oScope);
        }).always(function (onFailure) {
            LoaderUtil.closeLoader();
        });

        return oDeferred.promise();
    };

    // POC: Centralized error handling.
    Connector.prototype.doPost = function (path, oItem, successFn, failureFn, oScope) {
        var _this11 = this;

        LoaderUtil.openLoader();

        var url = this.sServiceBasePath + path,
            oDeferred = this.oRESTer.post(url, oItem);

        var oPromise = oDeferred.promise();

        oPromise.done(function (oResponse) {
            if (successFn) {
                successFn.call(oScope, oResponse);
            }
        }).fail(function (oResponse) {
            _this11.handleFailure(oResponse, failureFn, oScope);
        }).always(function (onFailure) {
            LoaderUtil.closeLoader();
        });

        return oDeferred.promise();
    };

    // POC: Centralized error handling: Default failure handler
    Connector.prototype.handleFailure = function (onFailure, failureFn, oScope) {

        LoaderUtil.closeLoader();
        if (onFailure.status == 503) {
            setTimeout(function () {
                sap.ui.core.UIComponent.getRouterFor(oScope).navTo("serviceUnavailable");
            }, 100);
        } else if (onFailure.status == 403) {
            setTimeout(function () {
                sap.ui.core.UIComponent.getRouterFor(oScope).navTo("noAuthentication");
            }, 100);
        } else if (onFailure.responseJSON.exception !== undefined && onFailure.responseJSON.exception.exceptionType === "USER_NOT_FOUND_EXCEPTION") {
            sap.ui.core.UIComponent.getRouterFor(oScope).navTo("noprofilefound");
        } else {
            failureFn.call(oScope, onFailure);
        }
    };
    return Connector;
});
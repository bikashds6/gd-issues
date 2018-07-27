"use strict";

sap.ui.define([], function () {
  var oBasicAuth;
  var sContentType;
  var oDefaultHeaders;
  var bAsynchronous;

  /*
  * Constructor
  */
  function RESTer(oDefHeaders, sCType, oBAuth) {
    if (oDefHeaders) {
      _setDefaultHeaders(oDefHeaders);
    }

    _setContentType(sCType);
    _setBasicAuth(oBAuth);
    _setAsync(true);
  }

  /*
  * Private constructors
  */
  function _getSyncSender(sType) {
    return function (sUrl, oPayload, bSupressToast, mSettings) {
      _setAsync(false);
      var promise = _send(sType, sUrl, oPayload, bSupressToast, mSettings);
      _setAsync(true);
      return promise;
    };
  }

  function _getSender(sType) {
    return function (sUrl, oPayload, bSupressToast, mSettings) {
      return _send(sType, sUrl, oPayload, bSupressToast, mSettings);
    };
  }

  /**
   * Set Async
   */
  function _setAsync(bAsync) {
    bAsynchronous = !!bAsync;
  }

  /**
   * Set Content Type
   */
  function _setContentType(sCType) {
    sContentType = sCType !== null && sCType !== undefined ? sCType : "application/json; charset=utf8";
  }

  /**
   * Headers
   */
  function _setDefaultHeaders(oDefHeaders) {
    oDefaultHeaders = _enrichHeaders(oDefHeaders);
  }

  function _enrichHeaders(oHeaders) {
    var oEnrichedHeaders = $.extend({}, oHeaders, oDefaultHeaders);

    if (oEnrichedHeaders) {
      if (!oEnrichedHeaders.locale) {
        oEnrichedHeaders.locale = sap.ui.getCore().getConfiguration().getLanguage();
      }

      if (oBasicAuth) {
        var sBAuth = oBasicAuth.username + ":" + oBasicAuth.password;
        oEnrichedHeaders.Authorization = "Basic " + window.btoa(sBAuth);
      }
    }

    return oEnrichedHeaders;
  }

  /**
   * Basic Auth
   */
  function _setBasicAuth(oBAuth) {
    if (oBAuth) {
      if (oBAuth.username && oBAuth.username !== "" && oBAuth.password && oBAuth.password !== "") {
        oBasicAuth = oBAuth;
      }
    }
  }

  /**
   * Send Request
   */
  function _send(sType, sUrl, vPayload, bSupressToast, mSettings) {
    if (!sType || !sUrl) {
      return;
    }

    var mAjaxSettings = mSettings || {};
    mAjaxSettings.url = sUrl;
    mAjaxSettings.headers = _enrichHeaders(mAjaxSettings.headers);
    mAjaxSettings.type = sType;
    mAjaxSettings.async = bAsynchronous;
    mAjaxSettings.contentType = sContentType;
    mAjaxSettings.data = _stringifyPayload(vPayload);
    mAjaxSettings.xhrFields = { withCredentials: true };

    return $.ajax(mAjaxSettings);
  }

  function _stringifyPayload(vPayload) {
    if (typeof sContentType === "string") {
      if (sContentType.indexOf("application/json") !== -1) {
        return JSON.stringify(vPayload);
      }
    }

    return vPayload;
  }

  /*
  * Public methods
  */
  RESTer.prototype.send = _send;

  RESTer.prototype.get = _getSender("GET");
  RESTer.prototype.post = _getSender("POST");
  RESTer.prototype.put = _getSender("PUT");
  RESTer.prototype.delete = _getSender("DELETE");
  RESTer.prototype.patch = _getSender("PATCH");

  RESTer.prototype.getSync = _getSyncSender("GET");
  RESTer.prototype.postSync = _getSyncSender("POST");
  RESTer.prototype.putSync = _getSyncSender("PUT");
  RESTer.prototype.deleteSync = _getSyncSender("DELETE");
  RESTer.prototype.patchSync = _getSyncSender("PATCH");

  RESTer.prototype.setAsync = _setAsync;

  return RESTer;
});
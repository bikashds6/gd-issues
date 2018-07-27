"use strict";

sap.ui.define([], function () {
  "use strict";

  function Constants() {}

  //TODO: Change back to dev once everything is done  
  Constants.prototype.URL = {
    SERVICES: {
      BASE_PATH_PROD: "/projecthub-core/api/v1"
    }
  };
  return new Constants();
});
// Info viewportSize

//   detect browser version
function detectBrowser () {
  var BrowserDetect = {
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || "Other";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
      for (var i = 0; i < data.length; i++) {
        var dataString = data[i].string;
        this.versionSearchString = data[i].subString;

        if (dataString.indexOf(data[i].subString) !== -1) {
          return data[i].identity;
        }
      }
    },
    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index === -1) {
        return;
      }

      var rv = dataString.indexOf("rv:");
      if (this.versionSearchString === "Trident" && rv !== -1) {
        return parseFloat(dataString.substring(rv + 3));
      } else {
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
      }
    },

    dataBrowser: [
      {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
      {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
      {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
      {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
      {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
      {string: navigator.userAgent, subString: "OPR", identity: "Opera"},

      {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
      {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
    ]
  };

  BrowserDetect.init();

  //console.log( BrowserDetect.browser + BrowserDetect.version);
  $('body').addClass(BrowserDetect.browser + BrowserDetect.version);

}

//  viewportSize
function viewportSize () {
  var ventanaAncho = $(window).width();
  var ventanaAlto = $(window).height();

  var altoViewpor =  ventanaAlto+'px';
  var anchoViewpor = ventanaAncho+'px';

  if (ventanaAncho < 1200){
    // console.log('menor:', ventanaAncho);
    $("body").css({'width': '1200px'});
    $("body").css({'height': '595px'});
    $("body").css({'overflow': 'auto'});
    $('body').addClass('ventanaMenor');
  } else if (ventanaAlto < 595 ){
    // console.log('alto:', ventanaAlto);
    $("body").css({'height': '595px'});
    $("body").css({'overflow-y': 'auto'});
  } else{
    $("body").css({'width': anchoViewpor});
    $("body").css({'height': altoViewpor});
    $('body').removeClass('ventanaMenor');
  }
}

//  mobileDetect
function  mobileDetect () {
  // adds mobile browser class to html tag
  var ua = navigator.userAgent.toLowerCase();
  function removeSpaces(ua) {
    return ua.split(' ').join('');
  }
  ua = removeSpaces(ua);
  var iOS = ua.match(/(iphone|ipod|ipad)/);
  if(iOS) {
    $('body').addClass('ios');
  }
  var iPad = ua.match(/(ipad)/);
  if(iPad) {
    $('body').addClass('ipad');
  }
  var iPhone = ua.match(/(iphone|ipod)/);
  if(iPhone) {
    $('body').addClass('iphone');
  }
  var android = ua.indexOf("android") > -1;
  if(android) {
    $('body').addClass('android');
  }
  var android4 = ua.indexOf("android4") > -1;
  if(android4) {
    $('body').addClass('android4');
  }
  var android2 = ua.indexOf("android2") > -1;
  if(android2) {
    $('body').addClass('android2');
  }


}

//mirar
function  mobileDetect2 () {
  // adds mobile browser class to html tag. Special thanks to @ctcherry on github!
  var ua = navigator.userAgent.toLowerCase().replace(/\s+/,'');

  var matchers = {
    ios: /(iphone|ipod|ipad)/,
    ipad: /ipad/,
    iphone: /(iphone|ipod)/,
    android: 'android',
    android2: 'android2',
    android4: 'android4'
  }

  var tagAddClass = $('body');

  for (i in matchers) {
    var m = matachers[i];
    if ((typeof(m) == "string" && ua.indexOf(m) > -1) || (typeof(m) == "object" && ua.match(m))) {
      tagAddClass.addClass(i)
    }
  }

}


(function  () {
  detectBrowser();
  viewportSize ()
  mobileDetect ();
})();

$( window ).resize(function() {
  // console.log('hola resize');
});


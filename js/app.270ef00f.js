(function(t){function e(e){for(var r,i,o=e[0],c=e[1],u=e[2],h=0,p=[];h<o.length;h++)i=o[h],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&p.push(s[i][0]),s[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(p.length)p.shift()();return n.push.apply(n,u||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,o=1;o<a.length;o++){var c=a[o];0!==s[c]&&(r=!1)}r&&(n.splice(e--,1),t=i(i.s=a[0]))}return t}var r={},s={app:0},n=[];function i(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=r,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(a,r,function(e){return t[e]}.bind(null,r));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0273":function(t,e,a){"use strict";var r=a("078b"),s=a.n(r);s.a},"078b":function(t,e,a){},"3e2e":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r,s=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("app-home")],1)},i=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-main"},[t.errorMessage?a("div",{staticClass:"error-display"},[a("p",[t._v(t._s(t.errorMessage))])]):t._e(),a("div",{staticClass:"search-bar"},[a("svg",{staticClass:"get-location-image",attrs:{xmlns:"http://www.w3.org/2000/svg",height:"29",viewBox:"0 0 24 24",width:"29"},on:{click:t.saveCurrentLocation,mouseover:function(e){return e.target!==e.currentTarget?null:t.showTooltip(e,"Save as default location")},mouseleave:t.removeTooltip}},[a("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}}),a("path",{attrs:{d:"M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm-1.56 10H9v-1.44l3.35-3.34 1.43 1.43L10.44 12zm4.45-4.45l-.7.7-1.44-1.44.7-.7c.15-.15.39-.15.54 0l.9.9c.15.15.15.39 0 .54z"}})]),a("svg",{staticClass:"search-location-image",attrs:{xmlns:"http://www.w3.org/2000/svg",height:"29",viewBox:"0 0 24 24",width:"29"},on:{click:t.getWeatherForSavedLocation,mouseover:function(e){return e.target!==e.currentTarget?null:t.showTooltip(e,"Get weather for default location")},mouseleave:t.removeTooltip}},[a("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}}),a("path",{attrs:{d:"M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"}})]),a("div",{staticClass:"container-btn-search"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.userInput,expression:"userInput"}],staticClass:"weather-input",attrs:{type:"text",placeholder:"ZIP Code or City & Country code","aria-label":"City Search"},domProps:{value:t.userInput},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchByInput(e)},input:function(e){e.target.composing||(t.userInput=e.target.value)}}}),a("button",{staticClass:"btn-search",on:{click:t.searchByInput}},[a("span",[t._v("Search")])])]),a("div",{staticClass:"btn-unit-change"},[a("span",{staticClass:"btn-unit btn-metric",on:{click:function(e){return t.changeUnits("metric")}}},[t._v("Metric: °C")]),a("span",{staticClass:"btn-unit btn-imperial",on:{click:function(e){return t.changeUnits("imperial")}}},[t._v("Imperial: °F")])]),a("button",{staticClass:"btn-refresh",on:{click:t.refreshWeather,mouseover:function(e){return t.showTooltip(e,"Refresh weather")},mouseleave:t.removeTooltip}},[a("span",[t._v("Refresh")])])]),t.storageAvailable?a("div",[a("div",{staticClass:"container-components",style:t.weeklyForecastAvailable?t.weatherStyles.weekly:t.weatherStyles.noWeekly},[a("transition",{attrs:{name:"slide-in-left",mode:"out-in"}},[t.currentWeatherAvailable?a("current-weather",{staticClass:"current-weather",attrs:{"current-weather":t.getCurrentWeatherData}}):t._e()],1),a("transition",{attrs:{name:"slide-in-left",mode:"out-in"}},[t.dailyForecastAvailable?a("daily-forecast",{staticClass:"daily-forecast",attrs:{forecast:t.getDailyForecastData}}):t._e()],1),a("transition",{attrs:{name:"slide-in-right",mode:"out-in"}},[t.weeklyForecastAvailable?a("weekly-forecast",{key:t.getWeeklyForecastData[0].temp_high,staticClass:"weekly-forecast",attrs:{"weekly-forecast":t.getWeeklyForecastData}}):t._e()],1),a("transition",{attrs:{name:"fade",mode:"out-in"}},[""!==t.popupMessage?a("popup-component",{staticClass:"popup-component"},[t._v(" "+t._s(t.popupMessage)+" ")]):t._e()],1)],1)]):a("div",[a("p",{staticClass:"no-storage"},[t._v(" This website doesn't support your browser. You should feel bad. ")])]),a("transition",{attrs:{name:"fade",mode:"in-out"}},[a("app-tooltip",{staticClass:"app-tooltip"},[t._v(" "+t._s(t.tooltipMessage)+" ")])],1)],1)},c=[],u=(a("a4d3"),a("e01a"),a("99af"),a("4160"),a("caad"),a("fb6a"),a("b64b"),a("d3b7"),a("ac1f"),a("2532"),a("466d"),a("4d90"),a("5319"),a("159b"),a("96cf"),a("1da1")),l=a("5530"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-current-weather"},[a("p",{staticClass:"date-time"},[t._v(t._s(t.getCurrentDateTime))]),a("p",{staticClass:"city-name"},[t._v(t._s(t.getCityOrCoords))]),a("img",{staticClass:"icon",attrs:{src:t.currentWeather.icon,alt:"Weather Icon",crossorigin:"anonymous"}}),a("p",{staticClass:"current-temp"},[t._v(" "+t._s(Math.round(Number(t.currentWeather.temp)))+t._s(this.getWeatherUnits.temp)+" ")]),a("div",{staticClass:"humidity"},[t._v("Humidity: "+t._s(t.currentWeather.humidity)+"%")]),a("div",{staticClass:"feels-like"},[t._v(" Feels like "+t._s(Math.round(Number(t.currentWeather.feels_like)))+t._s(this.getWeatherUnits.temp)+". ")]),a("div",{staticClass:"description"},[t._v(t._s(t.currentWeather.description)+".")]),a("div",{staticClass:"wind"},[t._v(" Wind: "+t._s(t.currentWeather.wind)+t._s(this.getWeatherUnits.wind)+" ")])])},p=[],d=a("2f62"),g={name:"CurrentWeather",props:{currentWeather:{type:Object,required:!0}},computed:Object(l["a"])(Object(l["a"])({},Object(d["c"])(["getWeatherUnits","getCurrentDateTime","getCurrentCity","getUserCoordinates","getLocationIQAPIEndpoint"])),{},{getCityOrCoords:function(){return this.getCurrentCity||this.loadCityFromStorage()}}),watch:{currentWeather:"getCityWithCoords"},methods:Object(l["a"])(Object(l["a"])({},Object(d["b"])(["setCurrentCity"])),{},{getCityWithCoords:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){var a,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(null===t.currentWeather.coords.lat||null===t.currentWeather.coords.lon){e.next=16;break}return e.prev=1,a="".concat(t.getLocationIQAPIEndpoint,"?key=").concat("pk.a077452e5ea478a2d2e4f56d45d54b62","&lat=").concat(t.currentWeather.coords.lat,"&lon=").concat(t.currentWeather.coords.lon,"&format=json"),e.next=5,fetch("".concat(a),{mode:"cors"});case 5:return r=e.sent,e.next=8,r.json();case 8:s=e.sent,s.address.state,t.setCurrentCity("".concat(s.address.city,", ").concat(s.address.state)),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](1),t.setCurrentCity(null);case 16:case"end":return e.stop()}}),e,null,[[1,13]])})))()},loadCityFromStorage:function(){return JSON.parse(localStorage.getItem("city"))}})},m=g,f=(a("8315"),a("2877")),y=Object(f["a"])(m,h,p,!1,null,"60e51524",null),v=y.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-weekly-forecast"},[a("p",{staticClass:"weekly-forecast-text"},[t._v("Weekly Forecast")]),a("div",t._l(t.weeklyForecast,(function(e,r){return a("div",{key:e.dt},[a("weekly-forecast-tabs",{attrs:{forecastedDay:e,dayOfWeek:t.days[r]}})],1)})),0)])},W=[],_=(a("a434"),a("6062"),a("3ca3"),a("ddb0"),a("2909")),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-weekly-forecast-tabs"},[a("div",{staticClass:"container content-hidden",style:t.collapsed?t.borderStyles.collapsed:t.borderStyles.open,on:{click:t.toggleDataVisibility}},[a("img",{staticClass:"icon",attrs:{src:t.forecastedDay.icon,alt:"Weather Icon",crossorigin:"anonymous"}}),a("div",{staticClass:"day-of-week"},[t._v(t._s(t.dayOfWeek))]),a("div",{staticClass:"temp-high"},[t._v(" "+t._s(Math.round(Number(t.forecastedDay.temp_high)))+t._s(this.getWeatherUnits.temp)+" ")])]),a("transition",{attrs:{name:"open",mode:"out-in"}},[t.collapsed?t._e():a("div",{staticClass:"container content-shown"},[a("div",{staticClass:"dropdown-temp"},[t._v("High / Low:")]),a("div",{staticClass:"dropdown-temp-high"},[t._v(" "+t._s(Math.round(Number(t.forecastedDay.temp_high)))+t._s(this.getWeatherUnits.temp)+" ")]),a("div",{staticClass:"dropdown-temp-low"},[t._v(" "+t._s(Math.round(Number(t.forecastedDay.temp_low)))+t._s(this.getWeatherUnits.temp)+" ")]),a("div",{staticClass:"humidity"},[t._v("Humidity: "+t._s(t.forecastedDay.humidity)+"%")]),a("div",{staticClass:"description"},[t._v(t._s(t.forecastedDay.description)+".")]),a("div",{staticClass:"wind"},[t._v(" Wind: "+t._s(t.forecastedDay.wind)+t._s(this.getWeatherUnits.wind)+" ")])])])],1)},w=[],D={name:"WeeklyForecastTabs",props:{forecastedDay:{type:Object,required:!0},dayOfWeek:{type:String,reuqired:!0}},data:function(){return{collapsed:!0,borderStyles:{collapsed:"border-width: 1px",open:"border-width: 1px 1px 0 1px"}}},computed:Object(l["a"])({},Object(d["c"])(["getWeatherUnits"])),methods:{toggleDataVisibility:function(){this.collapsed=!this.collapsed}}},S=D,O=(a("ea45"),Object(f["a"])(S,b,w,!1,null,"c123fcc0",null)),T=O.exports,E={name:"WeeklyForecast",components:{WeeklyForecastTabs:T},props:{weeklyForecast:{type:Array,required:!0}},data:function(){return{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}},computed:Object(l["a"])({},Object(d["c"])(["getWeatherUnits"])),methods:{setupCurrentWeek:function(){var t=(new Date).getDay(),e=this.days.splice(t+1);this.days=Object(_["a"])(new Set(e.concat.apply(e,Object(_["a"])(this.days))))}},mounted:function(){this.setupCurrentWeek()}},U=E,I=(a("a3c5"),Object(f["a"])(U,C,W,!1,null,"38efb41c",null)),k=I.exports,A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-daily-forecast"},[a("p",{staticClass:"container-header"},[t._v("Daily Forecast")]),a("img",{staticClass:"icon",attrs:{src:t.forecast.icon,alt:"Weather Icon",crossorigin:"anonymous"}}),a("div",{staticClass:"temp-high"},[t._v(" High: "+t._s(Math.round(Number(t.forecast.temp_high)))+t._s(this.getWeatherUnits.temp)+" ")]),a("div",{staticClass:"temp-low"},[t._v(" Low: "+t._s(Math.round(Number(t.forecast.temp_low)))+t._s(this.getWeatherUnits.temp)+" ")]),a("div",{staticClass:"description"},[t._v(t._s(this.forecast.description)+".")]),a("div",{staticClass:"wind"},[t._v(" Wind: "+t._s(t.forecast.wind)+t._s(this.getWeatherUnits.wind)+" ")])])},F=[],P={name:"DailyForecast",props:{forecast:{type:Object,required:!0}},computed:Object(l["a"])({},Object(d["c"])(["getWeatherUnits"]))},R=P,j=(a("bce4"),Object(f["a"])(R,A,F,!1,null,"018de49e",null)),x=j.exports,L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-popup"},[t._t("default")],2)},M=[],N={name:"PopupComponent"},Q=N,z=(a("0273"),Object(f["a"])(Q,L,M,!1,null,"2526e084",null)),H=z.exports,q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tooltip"},[t._t("default")],2)},Y=[],$={name:"Tooltip"},J=$,B=(a("9307"),Object(f["a"])(J,q,Y,!1,null,"606ff5ce",null)),Z=B.exports,G={name:"Home",components:{CurrentWeather:v,WeeklyForecast:k,DailyForecast:x,PopupComponent:H,appTooltip:Z},data:function(){return{userInput:"",tooltipMessage:null,storageAvailable:!1,geoDataAvailable:!1,popupMessage:"",errorMessage:null,searchType:"",weatherStyles:{weekly:"grid-template-columns: repeat(2, 1fr) repeat(2, [col] minmax(100px, 3fr)) repeat(2, 1fr);",noWeekly:"grid-template-columns: repeat(2, 1fr) [col] minmax(100px, 3fr) repeat(2, 1fr);"}}},computed:Object(l["a"])(Object(l["a"])({},Object(d["c"])(["getOpenWeatherAPIEndpoint","getGiphyAPIEndpoint","getUserCoordinates","getWeatherData","getUserOptions","getCurrentWeatherData","getDailyForecastData","getWeeklyForecastData","getPreviousQuery","getCurrentCity","getCurrentSearchCoordinates"])),{},{currentWeatherAvailable:function(){return Object.keys(this.getCurrentWeatherData).length>0},dailyForecastAvailable:function(){return Object.keys(this.getDailyForecastData).length>0},weeklyForecastAvailable:function(){return this.getWeeklyForecastData.length>0},isUserLocationSet:function(){return null!==this.getUserCoordinates.lat&&null!==this.getUserCoordinates.lon}}),watch:{getWeatherData:function(){this.parseWeatherData()},getUserOptions:function(){try{if(this.getPreviousQuery){var t=this.getPreviousQuery;t="imperial"===this.getUserOptions.units?t.replace("metric","imperial"):t.replace("imperial","metric"),this.setPreviousQuery(t),this.getWeatherDataFromAPI({type:"url",data:t})}}catch(e){}}},methods:Object(l["a"])(Object(l["a"])({},Object(d["b"])(["setUserCoordinates","setWeatherData","setDailyForecast","setCurrentWeather","setWeeklyForecast","setUserOptions","setPreviousQuery","setCurrentDateTime","setCurrentCity","setCurrentSearchCoordinates"])),{},{getWeatherDataFromAPI:function(){var t=arguments,e=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var r,s,n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:r=t.length>0&&void 0!==t[0]?t[0]:{type:"coords"},s="",a.t0=r.type,a.next="refresh"===a.t0?5:"coords"===a.t0?7:"zip"===a.t0?9:"city&state"===a.t0?11:"url"===a.t0?13:15;break;case 5:return s="".concat(e.getOpenWeatherAPIEndpoint,"/onecall?lat=").concat(e.getCurrentSearchCoordinates.lat,"&lon=").concat(e.getCurrentSearchCoordinates.lon,"&appid=").concat("30d109380d8f8e7073393fab59e840b5","&units=").concat(e.getUserOptions.units,"&exclude=minutely,hourly,alerts"),a.abrupt("break",15);case 7:return s="".concat(e.getOpenWeatherAPIEndpoint,"/onecall?lat=").concat(e.getUserCoordinates.lat,"&lon=").concat(e.getUserCoordinates.lon,"&appid=").concat("30d109380d8f8e7073393fab59e840b5","&units=").concat(e.getUserOptions.units,"&exclude=minutely,hourly,alerts"),a.abrupt("break",15);case 9:return s="".concat(e.getOpenWeatherAPIEndpoint,"/weather?zip=").concat(r.data,"&appid=").concat("30d109380d8f8e7073393fab59e840b5","&cnt=7&units=").concat(e.getUserOptions.units),a.abrupt("break",15);case 11:return s="".concat(e.getOpenWeatherAPIEndpoint,"/weather?q=").concat(r.data,"&appid=").concat("30d109380d8f8e7073393fab59e840b5","&cnt=7&units=").concat(e.getUserOptions.units),a.abrupt("break",15);case 13:return s=r.data,a.abrupt("break",15);case 15:return e.searchType="url"!==r.type&&"refresh"!==r.type?r.type:e.getPreviousSearchType(),e.setPreviousQuery(s),a.prev=17,a.next=20,fetch("".concat(s),{mode:"cors"});case 20:return n=a.sent,a.next=23,n.json();case 23:i=a.sent,e.setCurrentDateTime(e.getFormattedDateTime()),e.setWeatherData(i),e.parseWeatherData(),e.setErrorMessage(null),a.next=35;break;case 30:a.prev=30,a.t1=a["catch"](17),e.setWeatherData({}),e.setErrorMessage("Invalid Query."),e.setPreviousQuery("");case 35:e.searchType="";case 36:case"end":return a.stop()}}),a,null,[[17,30]])})))()},getGeoLocationData:function(){var t=this;return!!navigator.geolocation&&(navigator.geolocation.getCurrentPosition((function(e){var a=e.coords.latitude,r=e.coords.longitude;t.setUserCoordinates({lat:a,lon:r})})),!0)},isLocationSavedInStorage:function(){return!!localStorage.getItem("coords")},searchByInput:function(){this.userInput=this.userInput.replace(/[\s]?[,][\s]+/,","),this.setWeeklyForecast([]),this.userInput.match(/\d{5}/)?this.getWeatherDataFromAPI({type:"zip",data:this.userInput}):this.userInput.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*(?:[,])+(?:\s)*(?:[a-zA-Z]){2}$/)||this.userInput.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)?this.getWeatherDataFromAPI({type:"city&state",data:this.userInput}):this.setErrorMessage("Invalid Search. Please use ZIP code or the City + Country Code. (ex. New York, US)")},parseWeatherData:function(){"url"===this.searchType&&(this.searchType=this.getPreviousSearchType()),this.parseDailyForecast(),this.parseCurrentWeather(),this.parseWeeklyForecast()},getPreviousSearchType:function(){var t=this.getPreviousQuery;return t.match(/onecall?/)?"coords":t.match(/weather?zip/)?"zip":t.match(/weather?q/)?"city&state":void 0},getIconURL:function(t){return"https://openweathermap.org/img/wn/".concat(t,"@2x.png")},parseCurrentWeather:function(){"coords"===this.searchType?(this.setCurrentWeather({temp:this.getWeatherData.current.temp,humidity:this.getWeatherData.current.humidity,feels_like:this.getWeatherData.current.feels_like,description:this.capitalizeDescription(this.getWeatherData.current.weather[0].description),wind:this.getWeatherData.current.wind_speed,icon:this.getIconURL(this.getWeatherData.current.weather[0].icon),coords:{lat:this.getWeatherData.lat,lon:this.getWeatherData.lon}}),this.setCurrentSearchCoordinates({lat:this.getWeatherData.lat,lon:this.getWeatherData.lon})):"zip"!==this.searchType&&"city&state"!==this.searchType||(this.setCurrentWeather({temp:this.getWeatherData.main.temp,humidity:this.getWeatherData.main.humidity,feels_like:this.getWeatherData.main.feels_like,description:this.capitalizeDescription(this.getWeatherData.weather[0].description),wind:this.getWeatherData.wind.speed,icon:this.getIconURL(this.getWeatherData.weather[0].icon),coords:this.getWeatherData.coord}),this.setCurrentSearchCoordinates({lat:this.getWeatherData.coord.lat,lon:this.getWeatherData.coord.lon}))},parseDailyForecast:function(){"coords"===this.searchType?this.setDailyForecast({temp_high:this.getWeatherData.daily[0].temp.max,temp_low:this.getWeatherData.daily[0].temp.min,humidity:this.getWeatherData.daily[0].humidity,description:this.capitalizeDescription(this.getWeatherData.daily[0].weather[0].description),wind:this.getWeatherData.daily[0].wind_speed,icon:this.getIconURL(this.getWeatherData.current.weather[0].icon)}):"zip"!==this.searchType&&"city&state"!==this.searchType||this.setDailyForecast({temp_high:this.getWeatherData.main.temp_max,temp_low:this.getWeatherData.main.temp_min,humidity:null,description:this.capitalizeDescription(this.getWeatherData.weather[0].description),wind:this.getWeatherData.wind.speed,icon:this.getIconURL(this.getWeatherData.weather[0].icon)})},parseWeeklyForecast:function(){var t=this,e=[];"coords"===this.searchType&&this.getWeatherData.daily.forEach((function(a){e.push({temp_high:a.temp.max,temp_low:a.temp.min,humidity:a.humidity,description:t.capitalizeDescription(a.weather[0].description),wind:a.wind_speed,icon:t.getIconURL(a.weather[0].icon)})})),e.length>0&&(e.shift(),this.setWeeklyForecast(e))},setErrorMessage:function(t){this.errorMessage=t},changeUnits:function(t){var e=!1,a=document.querySelector(".btn-metric"),r=document.querySelector(".btn-imperial");"metric"===t&&"imperial"===this.getUserOptions.units?(r.classList.contains("selected")&&r.classList.remove("selected"),a.classList.add("selected"),e=!0):"imperial"===t&&"metric"===this.getUserOptions.units&&(a.classList.contains("selected")&&a.classList.remove("selected"),r.classList.add("selected"),e=!0),e&&(this.setUserOptions({units:t}),localStorage.setItem("units",t),this.refreshWeatherNewUnits())},getStoredUserOptions:function(){if(this.isLocationSavedInStorage()){var t=JSON.parse(localStorage.getItem("coords"));this.setUserCoordinates({lat:t.lat,lon:t.lon}),this.geoDataAvailable=!0}else this.getGeoLocationData()||(this.geoDataAvailable=!1);localStorage.getItem("units")?this.setUserOptions({units:localStorage.getItem("units")}):(localStorage.setItem("units","imperial"),this.setUserOptions({units:"imperial"}))},setSelectedOption:function(t){var e=document.querySelector(".btn-".concat(t));e.classList.add("selected")},getFormattedDateTime:function(){var t=new Date(Date.now()),e=t.getHours(),a=String(t.getMinutes()).padStart(2,"0"),r=t.getDate(),s=!0,n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i=n[t.getMonth()];return e>12?(e-=12,s=!1):0===e&&(e=12),"".concat(e,":").concat(a).concat(s?"am":"pm",", ").concat(i," ").concat(r)},refreshWeather:function(){null!==this.getCurrentSearchCoordinates.lat&&null!==this.getCurrentSearchCoordinates.lon?this.getWeatherDataFromAPI({type:"refresh"}):""!==this.getPreviousQuery?(this.getWeatherDataFromAPI({type:"url",data:this.getPreviousQuery}),this.showPopup("Weather Refreshed!")):this.showPopup("No Location to Refresh!")},refreshWeatherNewUnits:function(){if(""!==this.getPreviousQuery){var t=this.getPreviousQuery.includes("imperial")?this.getPreviousQuery.replace("imperial","metric"):this.getPreviousQuery.replace("metric","imperial");this.getWeatherDataFromAPI({type:"url",data:t})}},focusSearchBar:function(){document.querySelector(".weather-input").focus()},saveUserLocation:function(t,e){try{localStorage.setItem("coords",JSON.stringify({lat:t,lon:e})),localStorage.setItem("city",JSON.stringify(this.getCurrentCity)),this.showPopup("Location Saved!")}catch(a){}},saveCurrentLocation:function(){var t,e;this.getWeatherData.coord?(t=this.getWeatherData.coord.lat,e=this.getWeatherData.coord.lon,this.setUserCoordinates({lat:t,lon:e}),this.saveUserLocation(t,e)):this.getWeatherData.lat&&this.getWeatherData.lon&&(t=this.getWeatherData.lat,e=this.getWeatherData.lon,this.setUserCoordinates({lat:t,lon:e}),this.saveUserLocation(t,e))},getLocationWeather:function(){null!==this.getUserCoordinates.lat&&null!==this.getUserCoordinates.lon&&(this.getWeatherDataFromAPI({type:"coords"}),this.geoDataAvailable=!0)},capitalizeDescription:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},getWeatherForSavedLocation:function(){this.getWeatherDataFromAPI({type:"coords"})},showPopup:function(t){var e=this;this.popupMessage=t,setTimeout((function(){e.popupMessage=""}),3e3)},localStorageAvailable:function(){try{var t="TESTING";return localStorage.setItem(t,t),localStorage.removeItem(t),!0}catch(e){return!1}},showTooltip:function(t,e){var a=document.querySelector(".app-tooltip");this.tooltipMessage=e,a.style.left="".concat(t.pageX+10,"px"),a.style.top="".concat(t.pageY+20,"px")},removeTooltip:function(){var t=document.querySelector(".app-tooltip");this.tooltipMessage=null,t.style.left="-300px",t.style.top="-300px"}}),mounted:function(){this.getStoredUserOptions(),this.setSelectedOption(this.getUserOptions.units),this.getLocationWeather(),this.focusSearchBar(),this.storageAvailable=this.localStorageAvailable()}},V=G,K=(a("63a5"),Object(f["a"])(V,o,c,!1,null,"bb62dcf6",null)),X=K.exports,tt={components:{appHome:X}},et=tt,at=(a("5c0b"),Object(f["a"])(et,n,i,!1,null,null,null)),rt=at.exports,st={openWeatherAPIEndpoint:"https://api.openweathermap.org/data/2.5",giphyAPIEndpoint:"https://api.giphy.com/v1",locationIQAPIEndpoint:"https://us1.locationiq.com/v1/reverse.php",previousQuery:"",userCoordinates:{lat:null,lon:null},currentSearchCoordinates:{lat:null,lon:null},userOptions:{units:null},weatherData:{},currentWeather:{},currentCity:null,currentDateTime:null,dailyForecast:{},weeklyForecast:[],availableWeatherUnits:{metric:{temp:"°C",wind:" m/s"},imperial:{temp:"°F",wind:" mph"}},userWeatherUnits:{temp:"°F",wind:" mph"}},nt={getOpenWeatherAPIEndpoint:function(t){return t.openWeatherAPIEndpoint},getGiphyAPIEndpoint:function(t){return t.giphyAPIEndpoint},getLocationIQAPIEndpoint:function(t){return t.locationIQAPIEndpoint},getUserCoordinates:function(t){return t.userCoordinates},getWeatherData:function(t){return t.weatherData},getCurrentWeatherData:function(t){return t.currentWeather},getDailyForecastData:function(t){return t.dailyForecast},getWeeklyForecastData:function(t){return t.weeklyForecast},getUserOptions:function(t){return t.userOptions},getPreviousQuery:function(t){return t.previousQuery},getAvailableWeatherUnits:function(t){return t.availableWeatherUnits},getWeatherUnits:function(t){return t.userWeatherUnits},getCurrentDateTime:function(t){return t.currentDateTime},getCurrentCity:function(t){return t.currentCity},getCurrentSearchCoordinates:function(t){return t.currentSearchCoordinates}},it={setUserCoordinates:function(t,e){var a=t.commit;a("SET_USER_COORDINATES",e)},setWeatherData:function(t,e){var a=t.commit;a("SET_WEATHER_DATA",e)},setWeeklyForecast:function(t,e){var a=t.commit;a("SET_WEEKLY_FORECAST",null),a("SET_WEEKLY_FORECAST",e)},setDailyForecast:function(t,e){var a=t.commit;a("SET_DAILY_FORECAST",{}),a("SET_DAILY_FORECAST",e)},setCurrentWeather:function(t,e){var a=t.commit;a("SET_CURRENT_WEATHER",{}),a("SET_CURRENT_WEATHER",e)},setUserOptions:function(t,e){var a=t.commit,r=t.dispatch;r("setUserUnits",e.units),a("SET_USER_OPTIONS",e)},setPreviousQuery:function(t,e){var a=t.commit;a("SET_PREVIOUS_QUERY",e)},setUserUnits:function(t,e){var a=t.commit,r=t.state,s="imperial"===e?r.availableWeatherUnits.imperial:r.availableWeatherUnits.metric;a("SET_USER_UNITS",s)},setCurrentDateTime:function(t,e){var a=t.commit;a("SET_CURRENT_DATETIME",e)},setCurrentCity:function(t,e){var a=t.commit;a("SET_CURRENT_CITY",e)},setCurrentSearchCoordinates:function(t,e){var a=t.commit;a("SET_CURRENT_SEARCH_COORDS",e)}},ot=a("ade3"),ct="SET_USER_COORDINATES",ut="SET_WEATHER_DATA",lt="SET_DAILY_FORECAST",ht="SET_WEEKLY_FORECAST",pt="SET_CURRENT_WEATHER",dt="SET_USER_OPTIONS",gt="SET_PREVIOUS_QUERY",mt="SET_USER_UNITS",ft="SET_CURRENT_DATETIME",yt="SET_CURRENT_CITY",vt="SET_CURRENT_SEARCH_COORDS",Ct=(r={},Object(ot["a"])(r,ct,(function(t,e){t.userCoordinates.lat=e.lat,t.userCoordinates.lon=e.lon})),Object(ot["a"])(r,ut,(function(t,e){t.weatherData=e})),Object(ot["a"])(r,ht,(function(t,e){t.weeklyForecast=e})),Object(ot["a"])(r,lt,(function(t,e){t.dailyForecast=e})),Object(ot["a"])(r,pt,(function(t,e){t.currentWeather=e})),Object(ot["a"])(r,dt,(function(t,e){t.userOptions=e})),Object(ot["a"])(r,gt,(function(t,e){t.previousQuery=e})),Object(ot["a"])(r,mt,(function(t,e){t.userWeatherUnits=e})),Object(ot["a"])(r,ft,(function(t,e){t.currentDateTime=e})),Object(ot["a"])(r,yt,(function(t,e){t.currentCity=e})),Object(ot["a"])(r,vt,(function(t,e){t.currentSearchCoordinates=e})),r);s["a"].use(d["a"]);var Wt=new d["a"].Store({state:st,getters:nt,actions:it,mutations:Ct,modules:{}});s["a"].config.productionTip=!1,new s["a"]({store:Wt,render:function(t){return t(rt)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var r=a("9c0c"),s=a.n(r);s.a},"63a5":function(t,e,a){"use strict";var r=a("3e2e"),s=a.n(r);s.a},"71c3":function(t,e,a){},8315:function(t,e,a){"use strict";var r=a("9874"),s=a.n(r);s.a},9307:function(t,e,a){"use strict";var r=a("a788"),s=a.n(r);s.a},9874:function(t,e,a){},"9c0c":function(t,e,a){},a2a3:function(t,e,a){},a3c5:function(t,e,a){"use strict";var r=a("71c3"),s=a.n(r);s.a},a788:function(t,e,a){},b1d6:function(t,e,a){},bce4:function(t,e,a){"use strict";var r=a("a2a3"),s=a.n(r);s.a},ea45:function(t,e,a){"use strict";var r=a("b1d6"),s=a.n(r);s.a}});
//# sourceMappingURL=app.270ef00f.js.map
import "../scss/style.scss";

import * as flsFunctions from "./files/functions.js";

flsFunctions.isWebp();

flsFunctions.menuInit();

flsFunctions.spollers();

flsFunctions.tabs();

import "./libs/popup.js";
import * as flsForms from "./files/forms/forms.js";

flsForms.formFieldsInit({
  viewPass: false,
  autoHeight: false,
});

import "./libs/select.js";

import "./files/sliders.js";

import "./libs/watcher.js";

import * as flsScroll from "./files/scroll/scroll.js";

flsScroll.digitsCounter();

import "./libs/dynamic_adapt.js";

import "./files/script.js";
import "./files/gsap.js";

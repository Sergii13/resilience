// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const allClickedElem = document.querySelectorAll(".elem-item");
if (allClickedElem.length > 0) {
  let indexActive = 0;
  let timer = null;
  allClickedElem.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      indexActive = index;
    });
  });
  timer = setInterval(() => {
    indexActive++;
    if (indexActive > allClickedElem.length - 1) {
      indexActive = 0;
    }
    allClickedElem[indexActive].click();
  }, 4000);
}

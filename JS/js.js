import { Orders } from "./data.js";
import { CreateElement } from "./helper.js/index.js";
import { CreateRightSiteDefaute } from "./helper.js/index.js";

document.addEventListener(
  "DOMContentLoaded",
  function() {
    let OrderInfo = [{ ...Orders[0].OrderInfo }, { ...Orders[1].OrderInfo }];

    for (let i = 0; i < OrderInfo.length; i++) {
      CreateElement(OrderInfo[i], i);
    }

    CreateRightSiteDefaute(OrderInfo);

    // let order_name = document.querySelectorAll(".order_name");

    // let search = document.querySelector("#search");
    // search.onclick = function(e) {
    //   e.preventDefault();

    //   let searchs = document.querySelector("#mysearch");
    //   let searchTerms = searchs.value;
    //   console.log(order_name);
    //   let arrayOfFindedElement = [].filter.call(order_name, item =>
    //     item.innerText.includes(searchTerms)
    //   );
    // let order_list = document.querySelector(".order-list");
    // let child = order_list.firstElementChild;
    // while (child) {
    //   child.classList.add("hidden");
    //   child = order_list.nex;
    // }
    // console.log(arrayOfFindedElement);
    // arrayOfFindedElement.forEach(element => {
    //   order_list.appendChild(element);
    // });
    // };
    let img_human = document.querySelector("#human");
    let img_car = document.querySelector("#car");
    function ChangeImg(event) {
      let IDimg = this.id;
      if (IDimg === "human") {
        img_car.setAttribute("src", "../img/car1.png");
        img_human.setAttribute("src", "../img/human2.png");
        img_car.classList.remove("icon-active");
        img_human.classList.add("icon-active");
      } else {
        img_car.setAttribute("src", "../img/car2.png");
        img_human.setAttribute("src", "../img/human1.png");
        img_human.classList.remove("icon-active");
        img_car.classList.add("icon-active");
      }
    }
    img_human.addEventListener("click", ChangeImg);
    img_car.addEventListener("click", ChangeImg);
  },
  false
);

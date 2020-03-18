export function CreateLeftElement(obj, i) {
  let main = document.querySelector(".order-list");
  let switc = document.createElement("label");
  switc.classList.add("switchable");
  switc.id = i;

  let input = document.createElement("input");
  input.type = "radio";
  input.name = "swith";
  input.classList.add("toggleOrderInput");
  if (i == 0) {
    input.setAttribute("checked", "checked");
  }
  input.value = i++;
  let order = document.createElement("div");
  order.classList.add("order-content");

  let description = document.createElement("div");
  description.classList.add("description");

  let number = document.createElement("div");
  number.classList.add("order-number");

  let name = document.createElement("div");
  name.classList.add("order_name");

  let departure = document.createElement("div");
  departure.classList.add("departure");
  departure.innerHTML = "Shipped:";

  let date = document.createElement("div");
  date.classList.add("date");

  let time = document.createElement("div");
  time.classList.add("time-arrive");

  let data = document.createElement("div");
  data.classList.add("data");

  let condition = document.createElement("div");
  condition.classList.add("condition");

  main.appendChild(switc);
  switc.appendChild(input);
  switc.appendChild(order);
  order.appendChild(description);
  description.appendChild(number);
  description.appendChild(name);
  description.appendChild(departure);
  departure.appendChild(date);
  order.appendChild(time);
  time.appendChild(data);
  time.appendChild(condition);
  number.innerHTML = "Order" + i;
  i++;
  name.innerHTML = obj.customer;
  date.innerHTML = obj.shippedAt;
  data.innerHTML = obj.createdAt;
  condition.innerHTML = obj.status;
}

export function SetUp(orders) {
  const img_human = document.querySelector("#human");
  const img_car = document.querySelector("#car");
  const OrderInfo = [{ ...orders[0].OrderInfo }, { ...orders[1].OrderInfo }];

  for (let i = 0; i < OrderInfo.length; i++) {
    CreateLeftElement(OrderInfo[i], i);
  }
  const listOfOrders = document.querySelectorAll(".switchable");
  img_human.addEventListener("click", ChangeImg);
  img_car.addEventListener("click", ChangeImg);
  listOfOrders.forEach(order => {
    order.addEventListener("click", Clearing_fields);
  });
  listOfOrders.forEach(order => {
    order.addEventListener("change", () => {
      FillAllOrderInfo(orders);
    });
  });
  SwitchOrderInfo();
  FillAllOrderInfo(orders);
}

export function SwitchOrderInfo() {
  const icons = document.querySelectorAll(".icon img");
  const activeIconIndex = [].findIndex.call(icons, icon =>
    icon.classList.contains("icon-active")
  );

  const orderInfoWrapper = document.querySelectorAll(".order_info_wrapper");
  const activeOrderInfoWrapper = [].find.call(orderInfoWrapper, wrapper =>
    wrapper.classList.contains("active_order_info_wrapper")
  );

  activeOrderInfoWrapper.classList.remove("active_order_info_wrapper");

  orderInfoWrapper[activeIconIndex].classList.add("active_order_info_wrapper");
}
export function FillAllOrderInfo(infoObj) {
  const orderInputList = document.querySelectorAll(".toggleOrderInput");
  let checkedOrderIndex = [].findIndex.call(
    orderInputList,
    input => input.checked === true
  );
  let { id, OrderInfo, ShipTo, CustomerInfo, products } = infoObj[
    checkedOrderIndex
  ];

  // header
  const numberOfOrder = document.querySelector(".info_title .number");
  const customerName = document.querySelector(".essence .customer");
  const dateOfOrdered = document.querySelector(".essence .ordered");
  const dateOfShipped = document.querySelector(".essence .shipped");

  numberOfOrder.innerHTML = "Order" + id;
  customerName.innerHTML += OrderInfo.customer;
  dateOfOrdered.innerHTML += OrderInfo.createdAt;
  dateOfShipped.innerHTML += OrderInfo.shippedAt;
  // body
  const name__value = document.querySelector(".name__value");
  const street__value = document.querySelector(".street__value");
  const zip_code__value = document.querySelector(".zip_code__value");
  const region__value = document.querySelector(".region__value");
  const country__value = document.querySelector(".country__value");

  name__value.innerHTML = ShipTo.name;
  street__value.innerHTML = ShipTo.Address;
  zip_code__value.innerHTML = ShipTo.ZIP;
  region__value.innerHTML = ShipTo.Region;
  country__value.innerHTML = ShipTo.Country;

  const first_name__value = document.querySelector(".first_name__value");
  const last_name__value = document.querySelector(".last_name__value");
  const address__value = document.querySelector(".address__value");
  const phone__value = document.querySelector(".phone__value");
  const email__value = document.querySelector(".email__value");

  first_name__value.innerHTML = CustomerInfo.firstName;
  last_name__value.innerHTML = CustomerInfo.lastName;
  address__value.innerHTML = CustomerInfo.address;
  phone__value.innerHTML = CustomerInfo.phone;
  email__value.innerHTML = CustomerInfo.email;

  // table
  for (let i = 0; i < products.length; i++) {
    CreateOrderTable(products[i]);
  }

  // адаптация табицы
  for (let i = 0; i < products.length; i++) {
    СreatingAdaptiveTable(products[i]);
  }
}

export function ChangeImg(event) {
  const IDimg = this.id;
  const img_human = document.querySelector("#human");
  const img_car = document.querySelector("#car");
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
  SwitchOrderInfo();
}

export function Search(Orders) {
  const searchButton = document.querySelector("#search");
  searchButton.addEventListener("click", e => {
    e.preventDefault();
    const listOfOrders = document.querySelectorAll(".switchable");
    const container = document.querySelector(".order-list");
    const inputFieldValue = document.querySelector("#mysearch").value;
    const inputUpdateSearch = document.querySelector("#updata");

    const orderInfoStructure = Orders.map((order, index) => {
      let structure = { ...order.OrderInfo };
      structure.name = `Order${order.id}`;
      return structure;
    });

    orderInfoStructure.forEach((order, index) => {
      let flag = false;
      for (let key in order) {
        if (order[key].includes(inputFieldValue)) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        listOfOrders[index].style.display = "none";
      }
      // мой код
      inputUpdateSearch.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector("#mysearch").value = "";
        listOfOrders[index].style.display = "block";
      });
    });
  });
}

function Clearing_fields() {
  const numberOfOrder = document.querySelector(".info_title .number");
  const customerName = document.querySelector(".essence .customer");
  const dateOfOrdered = document.querySelector(".essence .ordered");
  const dateOfShipped = document.querySelector(".essence .shipped");

  numberOfOrder.innerHTML = "";
  customerName.innerHTML = "Customer:";
  dateOfOrdered.innerHTML = "Ordered:";
  dateOfShipped.innerHTML = "Shipped:";
  let string_table = document.querySelectorAll(".string_table");
  for (let i = 0; i < string_table.length; i++) {
    string_table[i].remove();
  }

  let full_product_info = document.querySelectorAll(".full-product-info");
  for (let i = 0; i < full_product_info.length; i++) {
    full_product_info[i].remove();
  }
}

function CreateOrderTable(product) {
  const table = document.querySelector("tbody");
  let tr = document.createElement("tr");
  tr.classList.add("string_table");

  let td1 = document.createElement("td");
  td1.classList.add("table_row");
  let name_order_table = document.createElement("b");
  name_order_table.classList.add("name_order_table");
  let br = document.createElement("br");
  let id_order_table = document.createElement("span");
  id_order_table.classList.add("id_order_table");

  let td2 = document.createElement("td");
  let price__order_table = document.createElement("b");
  price__order_table.classList.add("price__order_table");
  let currency_order_table = document.createElement("span");
  currency_order_table.classList.add("currency_order_table");

  let td3 = document.createElement("td");
  td3.classList.add("press_right");
  let quantity_order_table = document.createElement("span");
  quantity_order_table.classList.add("quantity_order_table");

  let td4 = document.createElement("td");
  td4.classList.add("press_right");
  let totalPrice_order_table = document.createElement("span");
  totalPrice_order_table.classList.add("totalPrice_order_table");

  name_order_table.innerHTML = product.name;
  id_order_table.innerHTML = product.id;
  price__order_table.innerHTML = product.price;
  currency_order_table.innerHTML = product.currency;
  quantity_order_table.innerHTML = product.quantity;
  totalPrice_order_table.innerHTML = product.totalPrice + product.currency;

  table.appendChild(tr);

  tr.appendChild(td1);

  td1.appendChild(name_order_table);
  td1.appendChild(br);
  td1.appendChild(id_order_table);

  tr.appendChild(td2);
  td2.appendChild(price__order_table);
  td2.appendChild(currency_order_table);

  tr.appendChild(td3);
  td3.appendChild(quantity_order_table);
  tr.appendChild(td4);
  td4.appendChild(totalPrice_order_table);
}

function СreatingAdaptiveTable(product) {
  const full_order = document.querySelector(".full-order");
  let full_product_info = document.createElement("div");
  full_product_info.classList.add("full-product-info");

  let name_order = document.createElement("div");
  let name_order_value = document.createElement("b");
  let id_order = document.createElement("div");
  let unit_price = document.createElement("div");
  let price = document.createElement("div");
  let price_value = document.createElement("b");
  let currency = document.createElement("span");
  let quantity = document.createElement("div");
  let quantity_value = document.createElement("div");
  let total = document.createElement("div");
  let total_value = document.createElement("div");

  name_order_value.innerHTML = product.name;
  id_order.innerHTML = product.id;
  unit_price.innerHTML = "Unit Price:";
  price_value.innerHTML = product.price;
  currency.innerHTML = product.currency;
  quantity.innerHTML = "Quantity:";
  quantity_value.innerHTML = product.quantity;
  total.innerHTML = "Total:";
  total_value.innerHTML = product.totalPrice + product.currency;

  full_order.appendChild(full_product_info);
  full_product_info.appendChild(name_order);
  name_order.appendChild(name_order_value);
  full_product_info.appendChild(id_order);
  full_product_info.appendChild(unit_price);
  unit_price.appendChild(price);
  price.appendChild(price_value);
  price.appendChild(currency);
  full_product_info.appendChild(quantity);
  full_product_info.appendChild(quantity_value);
  full_product_info.appendChild(total);
  full_product_info.appendChild(total_value);
}

export function SearchTable(Orders) {
  const searchButtonTable = document.querySelector("#search_icon");
  searchButtonTable.addEventListener("click", e => {
    e.preventDefault();
    const listOfOrders = document.querySelectorAll(".string_table");
    const inputFieldValue = document.querySelector("#mysearch_table").value;
    const inputUpdateSearch = document.querySelector("#updata_table");

    const orderInfoStructure = Orders.map(order => {
      let structure = { ...order.products };
      return structure;
    });

    const orderInputList = document.querySelectorAll(".toggleOrderInput");
    let checkedOrderIndex = [].findIndex.call(
      orderInputList,
      input => input.checked === true
    );
    let order = orderInfoStructure[checkedOrderIndex];
    let index_str = 0;
    let arr_table_order = [];
    for (let key in order) {
      var flag = false;
      var obj_table = order[key];
      for (let keys in obj_table) {
        if (obj_table[keys].includes(inputFieldValue)) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        listOfOrders[index_str].style.display = "none";
        arr_table_order.push(index_str);
      }
      index_str++;
    }

    // мой код
    inputUpdateSearch.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector("#mysearch_table").value = "";
      for (let i of arr_table_order) {
        console.log(i);
        listOfOrders[i].style.display = "contents";
      }
    });
  });
}

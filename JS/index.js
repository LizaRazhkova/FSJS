import { Orders } from "./data.js";
import {
  CreateLeftElement,
  FillAllOrderInfo,
  SwitchOrderInfo,
  SetUp,
  ChangeImg,
  Search,
  SearchTable
} from "./helper.js";

document.addEventListener(
  "DOMContentLoaded",
  function() {
    SetUp(Orders);
    Search(Orders);
    SearchTable(Orders);
  },
  false
);

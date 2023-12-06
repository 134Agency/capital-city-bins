///////////////////////////////////////////////////////////////////////////////////////
//DOM ELEMENTS

document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".header-logo-link");
    const pageLinks = Array.from(
      document.querySelectorAll(".header-nav-list-item"),
    );
  
    const selectPlanBtns = Array.from(
      document.querySelectorAll(".select-plan-button"),
    );
    const tabMenu = document.querySelector(".w-tab-menu");
    const tabs = Array.from(tabMenu.querySelectorAll("a"));
    const tabsContentBar = document.querySelector(".w-tab-content");
    const tabsContents = Array.from(
      tabsContentBar.querySelectorAll(".main-tab-all"),
    );
    const weekSelects = Array.from(document.querySelectorAll(".w-select"));
    const cartContainer = document.querySelector(
      ".w-commerce-commercecartcontainer",
    );
    const cartWrapper = document.querySelector(".cart-button-wrapper");
    const cartBtn = document.querySelector(".w-commerce-commercecartopenlink");
    const cartForm = cartContainer.querySelector(".w-commerce-commercecartform");
  
    const allProductCards = Array.from(
      document.querySelectorAll(".product-card"),
    );
  
    const allPlanNames = allProductCards.map(
      (plan) =>
        plan.querySelector(".product-card-title-wrap").firstChild.textContent,
    );
  
    const backBtn = document.querySelector(".btn-primary-back");
  
    const continueBtn = document.querySelector(".btn-primary-continue");
  
    const productsGridWrapper = document.querySelector(
      ".additional-collection-list-wrapper",
    );
  
    const dollyCard = Array.from(productsGridWrapper.querySelectorAll(".spec"))
      .filter((el) => el.className === "spec")
      .at(0)
      .closest(".additional-items-card");
  
    const dollyCardTitle = dollyCard
      .querySelector(".additional-items-head")
      .firstChild.textContent.slice(0, -3);
  
    const dollyOptions = Array.from(
      document.querySelector(".dolly-select").querySelectorAll("option"),
    );
  
    const deliveryForm = document.querySelector(".left-side-form");
    const [addressInputDelivery, apartmentInputDelivery, dateInputDelivery] =
      Array.from(deliveryForm.querySelectorAll("input"));
  
    const pickupForm = document.querySelector(".right-side-form");
    const [addressInputPickup, apartmentInputPickup, dateInputPickup] =
      Array.from(pickupForm.querySelectorAll("input"));
  
    const realForm = deliveryForm.closest("form");
    const submitBtn = realForm.querySelector(".w-button");
  
    //addressSummary card
    const addressSummary = document.querySelector(".address-summary");
    const binDeliveryAddress = addressSummary.querySelector(
      ".bin-delivery-address",
    );
    const binPickupAddress = addressSummary.querySelector(".bin-pickup-address");
  
    //planSummary card
    const planSummary = document.querySelector(".plan-summary");
    const extraSuppliesWrap = planSummary.querySelector(".extra-supplies-wrap");
    const planName = planSummary.querySelector(".plan-name");
    const planPrice = planSummary.querySelector(".plan-price");
    const planBinsCount = planSummary.querySelector(".plan-bins-count");
    const planAdditionalItems = planSummary.querySelector(
      ".plan-additional-items",
    );
    planPrice.textContent = `$0.00`;
  
    //totalSummary card
    const totalSummary = document.querySelector(".total-summary");
    const totalPrice = totalSummary.querySelector(".total-price");
    const totalPlanName = totalSummary
      .querySelector(".total-wrapper")
      .firstChild.querySelector(".plan-name-total");
    const totalPlanPrice = totalSummary
      .querySelector(".total-wrapper")
      .firstChild.querySelector(".plan-price");
    const totalExtraSuppliesPrice = totalSummary
      .querySelector(".total-wrapper")
      .firstChild.nextSibling.querySelector(".plan-price");
  
    //floor dropdowns
    const floorWrap = document.querySelector(".floor-wrap");
    //const floorDropdowns = Array.from(floorWrap.querySelectorAll("select"));
    const floorDropdown1 = document.querySelector(".delivery-floor-drp");
    const floorDropdown2 = document.querySelector(".pickup-floor-drp");
    // const floorAddButtons = Array.from(
    //  floorWrap.querySelectorAll("input[value='Add to Cart']"),
    // );
    // Assuming 'Add to Cart' buttons are somehow related in the DOM to the dropdowns
    const floorAddButton1 = floorDropdown1
      .closest(".delivery-drp-select")
      .querySelector("input[value='Add to Cart']");
    const floorAddButton2 = floorDropdown2
      .closest(".pickup-drp-select")
      .querySelector("input[value='Add to Cart']");
  
    const floorAddButtons = [floorAddButton1, floorAddButton2];
  
    //checkout button
  
    const checkoutBtn = document.querySelector(".btn-primary-checkout");
  
    ///////////////////////////////////////////////////////////////////////////////////////
    //INIT
  
    const init = function () {
      setTimeout(redirectIfNoCity, 2500);
      tabs.forEach((tab) => (tab.style.pointerEvents = "none"));
      fixFillColorOnTabIcon();
      setColorToSteps(0, "#67229f");
      dateInputDelivery.setAttribute("id", "Date-delivery");
      dateInputPickup.setAttribute("id", "Date-pickup");
      // createDateInputs(dateInputDelivery.closest(".input-wrap"), true);
      // createDateInputs(dateInputPickup.closest(".input-wrap"), false);
      backBtn.classList.add("display-none");
      checkoutBtn.classList.add("display-none");
      binDeliveryAddress.innerHTML = `<div>Bin Delivery</div>`;
      binPickupAddress.innerHTML = `<div>Bin Pickup</div>`;
      return;
    };
  
    ///////////////////////////////////////////////////////////////////////////////////////
    //GLOBAL VARIABLES
    let currentPlan = { name: "", duration: "" };
    let numberOfWeeks;
  
    const suppliesWrapperTemplate = `<div class="extra-supplies-wrapper">
  <img
  loading="lazy"
  src="https://uploads-ssl.webflow.com/64f21c1f2a35f4183af32226/6506d3399c68b17248e86fa0_Group%2050.svg"
  alt=""
  class="small-icon"
  />
  <div class="extra-supplies">%AMOUNT% x %NAME%</div>
  </div>`;
  
    const planIconWrapperTemplate = `<div class="plan-icon-wrap">
  <img loading="lazy" src="https://uploads-ssl.webflow.com/64f21c1f2a35f4183af32226/6506d3399c68b17248e86fa0_Group%2050.svg" alt="" class="small-icon"/>
  <div class="additional-text-1">%FEATURE_TEXT%
  </div>
  </div>`;
  
    const binLocationAddressTemplate = `<div class="plan-icon-wrap">
  <img loading="lazy" src="https://uploads-ssl.webflow.com/64f21c1f2a35f4183af32226/6506024d59aeff2f47f7bcb5_Adrdress%20icon.svg" alt="" class="small-icon">
  <div class="bins-delivery-address">%ADDRESS%%APT%</div>
  </div>`;
  
    const binLocationAddressDateTemplate = `<div class="plan-icon-wrap">
  <img loading="lazy" src="https://uploads-ssl.webflow.com/64f21c1f2a35f4183af32226/6506010cef3d3e0c85d6d3e0_Date%20Picker%20Icon.svg" alt="" class="small-icon"/>
  <div class="bins-delivery-date">%DATE%</div>
  </div>`;
    ///////////////////////////////////////////////////////////////////////////////////////
    //HELPER FUNCTIONS
    const createTemplate = function (template, fn) {
      return fn(template);
    };
  
    const createDateInputs = (el, delivery) => {
      const dateInputTemplate = `
    <div class="input-icon-wrap">
    <input type="date" class="date-field w-input" name="Date-Pickup" data-name="Date Pickup" placeholder="Choose Date"  id="Date-${
      delivery ? "delivery" : "pickup"
    }" required=""/>
    <img loading="lazy" src="https://uploads-ssl.webflow.com/64f21c1f2a35f4183af32226/6506010cef3d3e0c85d6d3e0_Date%20Picker%20Icon.svg" alt="" class="input-icon"/>
    </div>`;
  
      el.innerHTML = `${dateInputTemplate}`;
    };
    const resetCurrentPlan = () => {
      currentPlan.name = "";
      currentPlan.duration = "";
      return;
    };
    const findAllProductsInCart = () => {
      const cartContainer = document.querySelector(
        ".w-commerce-commercecartcontainer",
      );
  
      if (!cartContainer) return null;
  
      const cartForm = cartContainer.querySelector(
        ".w-commerce-commercecartform",
      );
  
      if (!cartForm) return null;
  
      const allProductsInCart = Array.from(
        cartForm.querySelectorAll(".w-commerce-commercecartitem"),
      );
  
      return allProductsInCart || null;
    };
  
    const findPlanInCart = () => {
      const allProductsInCart = findAllProductsInCart();
  
      if (!allProductsInCart || allProductsInCart.length === 0) return null;
  
      const planInCart = allProductsInCart.find((product) =>
        allPlanNames.includes(
          product.querySelector(".cart-item-title").textContent,
        ),
      );
  
      return planInCart || null;
    };
  
    const findDollyInCart = () => {
      const allProductsInCart = findAllProductsInCart();
  
      if (!allProductsInCart || allProductsInCart.length === 0) return null;
  
      const dollyInCart = allProductsInCart.find(
        (product) =>
          dollyCardTitle.trim().toLowerCase() ===
          product
            .querySelector(".cart-item-title")
            .textContent.trim()
            .toLowerCase(),
      );
  
      return dollyInCart || null;
    };
  
    const findAllProductNamesInCart = () => {
      const itemTitles = Array.from(
        cartForm.querySelectorAll(".cart-item-title"),
      );
  
      return itemTitles || null;
    };
  
    const findFloorsInCart = (selectedFloor) => {
      const itemTitles = findAllProductNamesInCart();
  
      if (!itemTitles) return null;
  
      const floorInCart = itemTitles.find((title) => {
        return (
          title.textContent.toLowerCase() ===
          `choose floor - ${selectedFloor.when}`
        );
      });
  
      return floorInCart || null;
    };
  
    const findCityInCart = () => {
      const allProductsInCart = findAllProductsInCart();
  
      if (!allProductsInCart || allProductsInCart.length === 0) return null;
  
      const cityInCart = allProductsInCart.find(
        (product) =>
          product.querySelector(".cart-item-title").textContent.toLowerCase() ===
            "new york" ||
          product.querySelector(".cart-item-title").textContent.toLowerCase() ===
            "new jersey",
      );
  
      return cityInCart || null;
    };
  
    const redirectIfNoCity = () => {
      const cityInCart = findCityInCart();
  
      if (!cityInCart)
        return window.location.replace("https://capital-city-bins.webflow.io/");
  
      return;
    };
  
    const checkIfShippingFormValuesArePopulated = () => {
      const dateInputDelivery = document.getElementById("Date-delivery");
      const dateInputPickup = document.getElementById("Date-pickup");
  
      if (
        !addressInputDelivery.value ||
        !dateInputDelivery.value ||
        !addressInputPickup.value ||
        !dateInputPickup.value ||
        !floorDropdown1.value ||
        !floorDropdown2.value
      ) {
        alert("Please fill in the shipping details and select floors");
        return false;
      }
  
      return true;
    };
  
    const findExtraSuppliesInCart = (allProducts) => {
      if (!allProducts) return null;
  
      const extraSuppliesInCart = allProducts
        .filter(
          (product) =>
            !allPlanNames.includes(
              product.querySelector(".cart-item-title").textContent,
            ),
        )
        .filter(
          (product) =>
            product
              .querySelector(".cart-item-title")
              .textContent.toLowerCase() !== "choose floor - delivery",
        )
        .filter(
          (product) =>
            product
              .querySelector(".cart-item-title")
              .textContent.toLowerCase() !== "choose floor - pickup",
        )
        .filter(
          (product) =>
            product
              .querySelector(".cart-item-title")
              .textContent.toLowerCase() !== "new york",
        )
        .filter(
          (product) =>
            product
              .querySelector(".cart-item-title")
              .textContent.toLowerCase() !== "new jersey",
        );
  
      return extraSuppliesInCart || null;
    };
  
    const updateExtraSuppliesUI = () => {
      const allProducts = findAllProductsInCart();
  
      const extraSuppliesInCart = findExtraSuppliesInCart(allProducts);
  
      if (!extraSuppliesInCart || extraSuppliesInCart.length === 0) {
        return (extraSuppliesWrap.innerHTML = `
      <div class="bold all-caps margin-s">extra supplies</div>
      <div class="extra-supplies-wrapper">
      <img loading="lazy" src="https://uploads-ssl.webflow.com/64f21c1f2a35f4183af32226/6506d338b1e3fcb7f053ecc5_Group%201000003693.svg" alt="" class="small-icon"/>
      <div class="extra-supplies">None chosen</div>
      </div>
      `);
      }
  
      const extraSuppliesList = extraSuppliesInCart.map((supplyItem) => {
        return {
          name: supplyItem.querySelector(".cart-item-title").textContent,
          amount: supplyItem.querySelector('input[type="number"]').value,
        };
      });
  
      const extraSuppliesTemplate = extraSuppliesList
        .map((item) =>
          createTemplate(suppliesWrapperTemplate, (template) =>
            template
              .replace("%NAME%", item.name)
              .replace("%AMOUNT%", item.amount),
          ),
        )
        .reduce((acc, item) => (acc += item), "");
  
      extraSuppliesWrap.innerHTML = `${extraSuppliesTemplate}`;
    };
    const fixFillColorOnTabIcon = () => {
      const firstPath = tabs[3].querySelector(".step-icon>svg>path");
      return firstPath.setAttribute("fill", "currentColor");
    };
  
    const determineCurrentTab = (tabs) => {
      const currentTab = tabs.find((tab) => tab.classList.contains("w--current"));
      const currentTabNumber =
        parseInt(currentTab.getAttribute("data-w-tab").at(-1), 10) - 1;
  
      return currentTabNumber;
    };
  
    const selectStepIconAndTextAndDesc = (tab) => {
      const currentTab = tabs[tab];
  
      const stepIcon = currentTab.querySelector(".step-icon");
      const stepText = currentTab.querySelector(".step-text");
      const stepDesc = currentTab.querySelector(".step-desc");
  
      return [stepIcon, stepText, stepDesc];
    };
  
    const setColorToSteps = (tab, color) => {
      const stepChildren = selectStepIconAndTextAndDesc(tab);
      return stepChildren.forEach((child) => (child.style.color = color));
    };
  
    const addClassesToNextOrPreviousTab = (
      tabs,
      tabsContents,
      currentTab,
      next,
    ) => {
      const targetTab = next === true ? currentTab + 1 : currentTab - 1;
      tabs[currentTab].classList.remove("w--current");
      setColorToSteps(currentTab, "unset");
      tabsContents[currentTab].classList.remove("w--tab-active");
      tabs[targetTab].classList.add("w--current");
      setColorToSteps(targetTab, "#67229f");
      tabsContents[targetTab].classList.add("w--tab-active");
      return;
    };
  
    const goToNextTab = function (tabs, tabsContents, next) {
      const currentTab = determineCurrentTab(tabs);
  
      return addClassesToNextOrPreviousTab(tabs, tabsContents, currentTab, next);
    };
  
    const setDollyPrice = function (numberOfWeeks) {
      const selectedDollyOption = dollyOptions.find(
        (option) => option.textContent === numberOfWeeks,
      );
      const select = selectedDollyOption.closest("select");
  
      selectedDollyOption.addEventListener("click", () => {
        select.dispatchEvent(new Event("change"));
      });
  
      dollyOptions.forEach((opt) => (opt.selected = false));
  
      selectedDollyOption.selected = true;
  
      return selectedDollyOption.click();
    };
  
    const updateTotalExtraSuppliesPriceUI = () => {
      //BIG DANGER
      const totalCartPriceNode = cartForm.querySelector(
        ".w-commerce-commercecartordervalue",
      );
  
      if (!totalCartPriceNode)
        return (totalExtraSuppliesPrice.textContent = `$0.00 USD`);
  
      const totalCartPrice = parseInt(
        totalCartPriceNode.textContent
          .replaceAll(",", "")
          .slice(1)
          .trim()
          .split(".")
          .at(0),
        10,
      );
  
      const totalPlanPriceFromSelectedPlan = parseInt(
        totalPlanPrice.textContent
          .replaceAll(",", "")
          .slice(1)
          .trim()
          .split(".")
          .at(0),
        10,
      );
  
      totalExtraSuppliesPrice.textContent = `$${
        totalCartPrice - totalPlanPriceFromSelectedPlan
      }.00`;
    };
  
    const updateTotalPriceUI = () => {
      const totalCartPriceNode = cartForm.querySelector(
        ".w-commerce-commercecartordervalue",
      );
  
      if (!totalCartPriceNode) return (totalPrice.textContent = `$0.00`);
  
      const totalCartPrice = totalCartPriceNode.textContent;
  
      totalPrice.textContent = `$${totalCartPrice}.00`;
    };
  
    const updatePlanNameAndPriceUI = function () {
      const planInCart = findPlanInCart();
      if (!planInCart) {
        planName.textContent = "None";
        planPrice.textContent = `$0.00`;
        totalPlanName.textContent = "None";
        totalPlanPrice.textContent = `$0.00`;
        return;
      }
      const cartPlanName =
        planInCart.querySelector(".cart-item-title").textContent;
  
      const cartPlanPrice =
        planInCart.querySelector(".cart-item-price").textContent;
  
      planName.textContent = cartPlanName;
      planPrice.textContent = `$${cartPlanPrice}.00`;
      totalPlanName.textContent = cartPlanName;
      totalPlanPrice.textContent = `$${cartPlanPrice}.00`;
    };
  
    const updatePlanBinsCountUI = (planCard) => {
      if (!planCard) return (planBinsCount.textContent = `None`);
  
      const numberOfBins = planCard
        .querySelector(".product-sub-head-wrap")
        .querySelector(".bins-number").textContent;
  
      planBinsCount.textContent = numberOfBins;
    };
  
    const updatePlanFeaturesUI = (planCard) => {
      if (!planCard) return (planAdditionalItems.innerHTML = `<div>None</div>`);
  
      const planFeatures = Array.from(
        planCard.querySelector(".product-body-wrap").children,
      ).map((node) => node.textContent);
  
      const planFeaturesHtml = planFeatures
        .map((item) =>
          createTemplate(planIconWrapperTemplate, (template) =>
            template.replace("%FEATURE_TEXT%", item.toUpperCase()),
          ),
        )
        .reduce((acc, item) => (acc += item));
  
      planAdditionalItems.innerHTML = `${planFeaturesHtml}`;
    };
  
    const isSamePlan = function (name, weeks) {
      const planInCart = findPlanInCart();
  
      if (!planInCart) {
        currentPlan.name = name;
        currentPlan.duration = weeks;
        return false;
      }
  
      const planInCartName =
        planInCart.querySelector(".cart-item-title").textContent;
      const planInCartDuration =
        planInCart.querySelector(".color-neutral-800").textContent;
  
      if (planInCartName === name && planInCartDuration === weeks) return true;
      currentPlan.name = name;
      currentPlan.duration = weeks;
      return false;
    };
    const formatDateString = (string) => {
      return string
        .split("-")
        .map((item, i, arr) => {
          if (i === 0) return arr[0];
          if (i === 1) return arr[1];
          if (i === 2) return arr[2];
          return item;
        })
        .join("/");
    };
    const extractShippingInfo = function () {
      const dateInputDelivery = document.getElementById("Date-delivery");
      const dateInputPickup = document.getElementById("Date-pickup");
  
      const deliveryAddressHtml = createTemplate(
        binLocationAddressTemplate,
        (template) =>
          template
            .replace("%ADDRESS%", addressInputDelivery.value)
            .replace(
              "%APT%",
              apartmentInputDelivery.value
                ? `, apartment ${apartmentInputDelivery.value}`
                : "",
            ),
      );
  
      const deliveryDateHtml = createTemplate(
        binLocationAddressDateTemplate,
        (template) =>
          template.replace("%DATE%", formatDateString(dateInputDelivery.value)),
      );
  
      const pickupAddressHtml = createTemplate(
        binLocationAddressTemplate,
        (template) =>
          template
            .replace("%ADDRESS%", addressInputPickup.value)
            .replace(
              "%APT%",
              apartmentInputPickup.value
                ? `, apartment ${apartmentInputPickup.value}`
                : "",
            ),
      );
      const pickupDateHtml = createTemplate(
        binLocationAddressDateTemplate,
        (template) =>
          template.replace("%DATE%", formatDateString(dateInputPickup.value)),
      );
      binDeliveryAddress.innerHTML = `
  <div>Bin Delivery</div>
  ${deliveryAddressHtml}
  ${deliveryDateHtml}
  `;
  
      binPickupAddress.innerHTML = `
  <div>Bin Pickup</div>
  ${pickupAddressHtml}
  ${pickupDateHtml}
  `;
  
      return;
    };
  
    ///////////////////////////////////////////////////////////////////////////////////////
    // EVENT LISTENERS
  
    const emptyTheCart = () => {
      const allRemoveBtns = Array.from(
        cartContainer.querySelectorAll(".cart-remove-link"),
      );
  
      if (!allRemoveBtns || allRemoveBtns.length === 0) return;
      allRemoveBtns.forEach((btn) => btn.click());
      return;
    };
  
    window.addEventListener("beforeunload", emptyTheCart);
  
    cartBtn.addEventListener("click", () => {
      const inputs = cartForm.querySelectorAll("input");
      return inputs.forEach((input) => input.setAttribute("disabled", "true"));
    });
  
    cartContainer.addEventListener("click", (e) => {
      const allProducts = findAllProductsInCart();
      const planInCart = findPlanInCart();
      const cityInCart = findCityInCart();
      const dollyInCart = findDollyInCart();
      const target = e.target;
  
      if (!allProducts || allProducts.length === 0) return;
  
      if (target.classList.contains("cart-remove-link")) {
        if (target.closest(".w-commerce-commercecartitem") === planInCart) {
          if (dollyInCart) {
            const removeBtn = dollyInCart.querySelector(".cart-remove-link");
            removeBtn.click();
          }
          resetCurrentPlan();
          setTimeout(() => {
            updatePlanNameAndPriceUI();
            updatePlanBinsCountUI();
            updatePlanFeaturesUI();
            updateExtraSuppliesUI();
            updateTotalExtraSuppliesPriceUI();
            updateTotalPriceUI();
          }, 1500);
        } else if (
          target.closest(".w-commerce-commercecartitem") === cityInCart
        ) {
          const allRemoveBtns = Array.from(
            cartContainer.querySelectorAll(".cart-remove-link"),
          );
          allRemoveBtns.forEach((btn) => btn.click());
          return window.location.replace("https://capital-city-bins.webflow.io/");
        } else {
          setTimeout(() => {
            updateExtraSuppliesUI();
            updateTotalExtraSuppliesPriceUI();
            updateTotalPriceUI();
          }, 1000);
        }
      }
  
      return;
    });
  
    continueBtn.addEventListener("click", () => {
      const currentTab = determineCurrentTab(tabs);
      if (currentTab === 0) {
        const planInCart = findPlanInCart();
        if (!planInCart) {
          alert("Please select a plan!");
          return;
        }
        backBtn.classList.remove("display-none");
      }
      if (currentTab === 3) return;
  
      if (currentTab === 2) {
        const shippingFormPopulated = checkIfShippingFormValuesArePopulated();
        if (!shippingFormPopulated) return;
        updateExtraSuppliesUI();
        extractShippingInfo();
        updateTotalPriceUI();
        updateTotalExtraSuppliesPriceUI();
        // submitBtn.click()
  
        continueBtn.classList.add("display-none");
        checkoutBtn.classList.remove("display-none");
      }
  
      return goToNextTab(tabs, tabsContents, true);
    });
  
    backBtn.addEventListener("click", () => {
      const currentTab = determineCurrentTab(tabs);
      if (currentTab === 0) return;
      if (currentTab === 1) {
        backBtn.classList.add("display-none");
      }
  
      if (currentTab === 3) {
        continueBtn.classList.remove("display-none");
        checkoutBtn.classList.add("display-none");
      }
      return goToNextTab(tabs, tabsContents, false);
    });
  
    selectPlanBtns.forEach((selectPlanBtn, i) => {
      return selectPlanBtn.addEventListener("click", (e) => {
        if (!weekSelects[i].value) return;
        const options = Array.from(weekSelects[i].querySelectorAll("option"));
  
        const [selectedOption] = options.filter(
          (option) => option.value === weekSelects[i].value,
        );
  
        numberOfWeeks = selectedOption.textContent;
        const planCard = selectPlanBtn.closest(".product-card");
        const planNameNodeText = Array.from(
          planCard.querySelector(".product-card-title-wrap").children,
        ).at(0).textContent;
  
        const planSame = isSamePlan(planNameNodeText, numberOfWeeks);
  
        if (planSame) {
          e.preventDefault();
          alert("You have already selected that plan!");
          return;
        }
  
        if (!planSame) {
          setDollyPrice(numberOfWeeks);
          updatePlanBinsCountUI(planCard);
          updatePlanFeaturesUI(planCard);
          setTimeout(() => updatePlanNameAndPriceUI(), 3000);
          const previousPlan = findPlanInCart();
  
          if (previousPlan) {
            const removeBtn = previousPlan.querySelector(".remove-button");
  
            if (removeBtn) {
              removeBtn.click();
            }
          }
  
          const previousDolly = findDollyInCart();
  
          if (previousDolly) {
            const removeBtnDolly = previousDolly.querySelector(".remove-button");
  
            removeBtnDolly.click();
          }
  
          return;
        }
  
        return;
      });
    });
  
    //creating event listeners for both floor dropdowns
    [floorDropdown1, floorDropdown2].forEach((dropdown, j) => {
      return dropdown.addEventListener("change", () => {
        //create an array of objects, which represent dropdowns' options
        //and in these objects store the option value, text content, price, and
        //whether is it pickup or delivery floor
  
        const options = Array.from(dropdown.querySelectorAll("option"));
  
        const optionsValuesAndTexts = options.slice(1).map((opt, i) => {
          return {
            value: opt.value,
            text: opt.textContent,
            price: 30 * i,
            when: j === 0 ? "delivery" : "pickup",
          };
        });
  
        //find the selected option
        const selectedFloor = optionsValuesAndTexts.find(
          (obj) => obj.value === dropdown.value,
        );
  
        if (!selectedFloor) {
          floorAddButtons[j].click();
          return;
        }
        //removing any previous selected floors
  
        const floorInCart = findFloorsInCart(selectedFloor);
  
        if (floorInCart) {
          const removeBtn = floorInCart
            .closest(".cart-item-content")
            .querySelector(".remove-button");
  
          removeBtn.click();
        }
  
        //simulating addToCartBtn click, so that the floor is listed in cart
        return floorAddButtons[j].click();
      });
    });
  
    checkoutBtn.addEventListener("click", (e) => {
      window.removeEventListener("beforeunload", emptyTheCart);
      const planInCart = findPlanInCart();
  
      if (!planInCart) {
        e.preventDefault();
        alert("you must choose a plan!");
        return;
      }
    });
  
    init();
  
    const createMinDate = (userDate, noAdditionalTime = false) => {
      const minDate = new Date(
        userDate.getTime() + (noAdditionalTime ? 0 : 172800000),
      );
      minDate.setMinutes(minDate.getMinutes() + minDate.getTimezoneOffset());
      const yyyy = minDate.getFullYear();
      const dd = `${minDate.getDate()}`;
      const mm = `${minDate.getMonth() + 1}`;
  
      const minDateString = `${mm.padStart(2, "0")}-${dd.padStart(
        2,
        "0",
      )}-${yyyy}`;
  
      return minDateString;
    };
  
    const createMaxDate = (userDate) => {
      let additionalTime;
  
      const extractedDurationOfPlan = parseInt(
        currentPlan.duration.slice(0, 1),
        10,
      );
      switch (extractedDurationOfPlan) {
        case 2:
          additionalTime = 1123200000;
          break;
        case 3:
          additionalTime = 1728000000;
          break;
        case 4:
          additionalTime = 2332800000;
          break;
        case 5:
          additionalTime = 2937600000;
          break;
        default:
          additionalTime = 1123200000;
      }
  
      const maxDate = new Date(userDate.getTime() + additionalTime);
      maxDate.setMinutes(maxDate.getMinutes() + maxDate.getTimezoneOffset());
  
      const yyyy = maxDate.getFullYear();
      const dd = `${maxDate.getDate()}`;
      const mm = `${maxDate.getMonth() + 1}`;
  
      const maxDateString = `${mm.padStart(2, "0")}-${dd.padStart(
        2,
        "0",
      )}-${yyyy}`;
  
      return maxDateString;
    };
  
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
    const formatDate = (date) => {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return mm + "-" + dd + "-" + yyyy;
    };
    const todayStr = formatDate(today);
    const tomorrowStr = formatDate(tomorrow);
    const firstDatePicker = $('[data-toggle="datepicker"]').datepicker({
      format: "mm-dd-yyyy",
      startDate: dayAfterTomorrow, // This will disable all dates before the day after tomorrow
      datesDisabled: [todayStr, tomorrowStr], // This will disable today and tomorrow
    });
    const secondDatePicker = $('[data-toggle="datepicker2"]').datepicker({
      format: "mm-dd-yyyy",
    });
    firstDatePicker.on("pick.datepicker", function (e) {
      const selectedDate = new Date(e.date);
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);
  
      const extractedDurationOfPlan = parseInt(
        currentPlan.duration.slice(0, 1),
        10,
      );
  
      endDate.setDate(endDate.getDate() + (extractedDurationOfPlan * 7 - 1));
      secondDatePicker.datepicker("setStartDate", startDate);
      secondDatePicker.datepicker("setEndDate", endDate);
    });
  
    if (window.innerWidth < 768) {
      $('[data-toggle="datepicker"], [data-toggle="datepicker2"]').attr(
        "readonly",
        "readonly",
      );
    }
  
    const allPageLinks = [logo, ...pageLinks];
  
    allPageLinks.forEach((link) =>
      link.addEventListener("click", () => {
        const allRemoveBtns = Array.from(
          cartContainer.querySelectorAll(".cart-remove-link"),
        );
        allRemoveBtns.forEach((btn) => btn.click());
      }),
    );
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  
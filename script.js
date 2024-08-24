let menuData;
const messageDiv = document.getElementById("message-div");
const loadingPage = document.getElementById("full-page-spinner");
function getMenu() {
  fetch(
    "https://raw.githubusercontent.com/igdev116/free-food-menus-api/main/db.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const menu = document.getElementById("menu");
      menu.innerHTML = "";
      //   console.log(data.burgers);
      menuData = data.burgers.slice(20, 40);
      menuData.forEach((item) => {
        const card = document.createElement("div");
        card.classList = "card";
        card.innerHTML = `
                          <div class="card-inner">
                    <div class="food-image">
                    <img src="${item.img}">
                    </div>
                    <div class="food-details">
                      <div class="food-name-price">
                        <p class="name">${item.name}</p>
                        <p class="price">$${item.price}/-</p>
                      </div>
                      <div class="add-food">+</div>
                    </div>
                  </div>
          `;
        menu.append(card);
      });
      loadingPage.style.display = "flex";
    });
}

function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (menuData) {
        let burgers = menuData;
        const shuffled = burgers.sort(() => 0.5 - Math.random());
        resolve({ items: shuffled.slice(0, 3) });
      }
      reject("Error in ordering");
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    const orderPreparedSuccessfully = true;
    if (orderPreparedSuccessfully) {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    } else {
      reject("Error in preparing order");
    }
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    const paymentSuccessful = true;
    if (paymentSuccessful) {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    } else {
      reject("Payment failed");
    }
  });
}

function thankYouFnc() {
  alert("Thank you for eating with us today!");
}

function handleOrder() {
  getMenu();
  takeOrder()
    .then((order) => {
      console.log("random order:", order);
      return orderPrep();
    })
    .then((order_status) => {
      if (order_status.order_status) {
        return payOrder();
      }
    })
    .then((paymentStatus) => {
      if (paymentStatus.paid) {
        loadingPage.style.display = "none";
        thankYouFnc();
      }
    })
    .catch((err) => {
      console.log("Error:", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  getMenu();
  handleOrder();
});

// *************Automatic random ordering on click ***************

function autoOrder() {
  let newElement3;
  let newElement4;
  const newElement = isLoading("Picking 3 random items");
  console.log("newElement: ", newElement);
  takeOrder()
    .then((order) => {
      // message.textContent = "Random items";
      const img = newElement.querySelector("img");
      hasLoaded(newElement);

      const newElement2 = isLoading("Loading images");
      const imagePromises = order.items.map(downloadImages);

      Promise.all(imagePromises).then((images) => {
        const imageDiv = document.createElement("div");
        imageDiv.classList = "ordered-images-div";

        images.forEach((i, index) => {
          //   imageDiv.append(i);
          const innerImage = document.createElement("div");
          const foodName = document.createElement("div");
          innerImage.classList = "innerImage";
          innerImage.append(i);
          foodName.innerHTML = `
            <p>${order.items[index].name}</p>
            <p>$${order.items[index].price}/-</p>
            `;
          innerImage.append(foodName);
          imageDiv.append(innerImage);
          //   imageDiv.append(foodName);
          console.log("order-name", order.items[index].name);
        });
        hasLoaded(newElement2);
        messageDiv.append(imageDiv);
        newElement3 = isLoading("Preparing order");
      });
      return orderPrep();
    })
    .then((order_status) => {
      hasLoaded(newElement3);
      newElement4 = isLoading("Paying for order");
      return payOrder();
    })
    .then((paymentStatus) => {
      if (paymentStatus.paid) {
        hasLoaded(newElement4);
        const orderSuccessMessage = document.createElement("div");
        orderSuccessMessage.classList = "order-sucess-msg";
        orderSuccessMessage.innerHTML = `
          <p>Your order has been placed</p>
          <p>thankyou for eating with us today!</p>
          `;
        messageDiv.append(orderSuccessMessage);
      }
    });
}

document.getElementById("auto-order").addEventListener("click", () => {
  messageDiv.innerHTML = "";
  autoOrder();
});

function downloadImages(img) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = img.img;

    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject("Loading error");
    };
  });
}

function isLoading(msg) {
  const message = document.getElementById("message-div");
  const singleOperation = document.createElement("div");
  singleOperation.classList = "message";
  singleOperation.innerHTML = `
  <h5>${msg}</h5>
  <img src="./loading/Spin@1x-0.6s-200px-200px.svg" class="spinner">
  `;
  message.append(singleOperation);
  console.log("single-operation", singleOperation);
  return singleOperation;
}

function hasLoaded(singleOperation) {
  //   console.log("okok", singleOperation);
  const newElement = document.createElement("img");
  newElement.src = "./loading/check-mark.png";
  newElement.className = "tick-mark";
  const img = singleOperation.querySelector("img");
  if (img) {
    singleOperation.replaceChild(newElement, img);
  }
}

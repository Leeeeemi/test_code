window.onload=function() { 
  document.querySelector('.amountPaperBtn').addEventListener('click', doClickPaperBtn);
  document.querySelector('.amountCoinBtn').addEventListener('click', doClickCoinBtn);
  document.querySelector('.returnBtn').addEventListener('click', doClickReturnBtn);
  
  document.querySelectorAll('.goodsBtnContent > img').forEach((goodsBtn) => {
    goodsBtn.addEventListener('click', doClickGoodsBtn);
  });

  // 실행과 동시에 잔액 세팅해줌
  doSetCash(FIRST___CASH);
}

var arrayGoods = [];
var aAmount = 0;
var aCash = 0;
var aMoney = 0;

const COKE__PRICE = 1200;
const PEPSI_PRICE = 1300;
const LEMON_PRICE = 1200;
const GRAPE_PRICE = 2500;

const FIRST___CASH = 30000;
const FIRST_AMOUNT = 0;

// 지폐 입금 
function doClickPaperBtn() {
  var aPaper = prompt("어떤 지폐를 넣으시나요?");
  
  if (aPaper == null || length.aPaper == 0) {
    return;
  } else if (aPaper < 0) {
    alert("ERROR! 잘못된 입력입니다.");
    return;
  } else if (aPaper > aCash) {
    alert("ERROR! 현금이 모자랍니다.");
    return;
  } else if (aPaper != 10000 && aPaper != 5000 && aPaper != 1000) {
    // \n 을 이용하여 줄바꿈 삽입 
    alert("ERROR! 지폐만 넣을 수 있습니다." + "\n" +
          "(1000원, 5000원, 10000원)");
    return;
  } else {
    doSetAmount(aPaper);
    doSetCash(aPaper * (-1));
  }
}

// 동전 입금
function doClickCoinBtn() {
  var aCoin = prompt("어떤 동전을 넣으시나요?");
  
  if (aCoin == null || length.aCoin == 0) {
    return;
  } else if (aCoin < 0) {
    alert("ERROR! 잘못된 입력입니다.");
    return;
  } else if (aCoin > aCash) {
    alert("ERROR! 현금이 모자랍니다.");
    return;
  } else if (aCoin != 500 && aCoin != 100) {
    alert("ERROR! 동전만 넣을 수 있습니다." + "\n" +
          "(100원, 500원)");
    return;
  } else {
    doSetAmount(aCoin);
  }
}

// 반환 버튼 
function doClickReturnBtn() {
  if (aAmount == 0) {
    alert("ERROR! 반환할 돈이 없습니다.");
  } else {
    doSetCash(aAmount);
    doSetAmount(aAmount * (-1));
  }
}

// 물건 버튼 누름 
function doClickGoodsBtn() {
  var aName = this.className;

  if (aName == null || aName == "") {
    // 현재 실행하고있는 함수명을 같이 출력하여 어디서 에러가 났는지 알 수 있게 함 
    alert("ERROR! " + arguments.callee.name);
    return;
  } 

  if (aName == "cokeAble") {
    doSetAmount((-1) * COKE__PRICE);
  } else if (aName == "pepsiAble") {
    doSetAmount((-1) * PEPSI_PRICE);
  } else if (aName == "lemonAble") {
    doSetAmount((-1) * LEMON_PRICE);
  } else if (aName == "grapefruitAble") {
    doSetAmount((-1) * GRAPE_PRICE);
  }
}

// 입금 또는 물건 선택, 반환으로 인한 현재금액 세팅 
function doSetAmount(inputData) {
  if (inputData == null || length.inputData == 0 || isNaN(inputData)) {
    alert("ERROR! " + arguments.callee.name);
    return;
  }
    
  // 전달받은 값을 숫자로 인식하기 위해 parseInt 사용
  aAmount += parseInt(inputData);

  // 현재 금액이 변동되었으므로 display 세팅 함수 호출 
  doDisplayAmount();
}

// 입금 또는 물건 선택, 반환으로 인한 현재금액 세팅 
function doSetCash(inputData) {
  if (inputData == null || length.inputData == 0 || isNaN(inputData)) {
    alert("ERROR! " + arguments.callee.name);
    return;
  }

  aCash += parseInt(inputData);

  doDisplayCash();
}

// 현재 금액 변동으로 인한 display 세팅 
function doDisplayAmount() {
  var dpText   = document.querySelector('.displayText');
  var dpAmount = document.querySelector('.displayAmount'); 

  if (dpText == null || dpAmount == null) {
    alert("ERROR! " + arguments.callee.name);
    return;
  }

  if (aAmount == 0) {
    dpText.style.display   = "inline";
    dpAmount.style.display = "none";
    dpAmount.innerText = 0;
  } else {
    dpText.style.display   = "none";
    dpAmount.style.display = "inline";
    dpAmount.innerText = aAmount;
  }

  if (aAmount < 1200) {
    document.querySelector('.cokeAble').style.display = "none";
    document.querySelector('.pepsiAble').style.display = "none";
  } else if (aAmount >= 1200) {
    document.querySelector('.cokeAble').style.display = "block";
    document.querySelector('.pepsiAble').style.display = "block";
  } 

  if (aAmount < 1500) {
    document.querySelector('.lemonAble').style.display = "none";
    document.querySelector('.grapefruitAble').style.display = "none";
  } else if (aAmount >= 1500) {
    document.querySelector('.lemonAble').style.display = "block";
    document.querySelector('.grapefruitAble').style.display = "block";
  }
}

// 현재 금액 변동으로 인한 display 세팅 
function doDisplayCash() {
  var dpCash = document.querySelector('.cashAmount'); 

  if (dpCash == null) {
    alert("ERROR! " + arguments.callee.name);
    return;
  }

  dpCash.innerText = aCash;
}


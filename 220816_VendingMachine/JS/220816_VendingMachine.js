window.onload=function() { 
  // 반환버튼 
  document.querySelector('.returnBtn').addEventListener('click', doClickReturnBtn);
  // 잔액버튼을 눌러 입금 Modal 보이게
  document.querySelector('.userCash').addEventListener('click', doClickUserCashBtn);
  // Modal 내의 확인 버튼
  document.querySelector('.okBtn').addEventListener('click', doClickOkBtn);
  // Modal 내의 취소 버튼
  document.querySelector('.cancleBtn').addEventListener('click', doClickCancleBtn);
  
  // 물건 선택 버튼 (노란색 img을 클릭할 때만)
  document.querySelectorAll('.goodsBtnContent > img').forEach((goodsBtn) => {
    goodsBtn.addEventListener('click', doClickGoodsBtn);
  });
  
  // Modal내의 지폐 또는 동전 클릭 시 
  // 하위 요소를 표현하기 위해 띄어쓰기로 선언 
  document.querySelectorAll('.paperContent img, .coinContent img').forEach((moneyBtn) => {
    moneyBtn.addEventListener('click', doClickMoney);
  });

  // 실행과 동시에 잔액 세팅해줌
  doSetCash(FIRST___CASH);
}

var aAmount = 0;
var aCash = 0;
var aMoney = 0;

const COKE__PRICE = 1200;
const PEPSI_PRICE = 1300;
const LEMON_PRICE = 1200;
const GRAPE_PRICE = 2500;

const FIRST___CASH = 30000;
const FIRST_AMOUNT = 0;

const MAN______WON = 10000;
const OH_CHEON_WON = 5000;
const CHEON____WON = 1000;
const OH_BACK__WON = 500;
const BACK_____WON = 100;

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

  // 입금액이 있을 경우 aAmount를 보여주고 Text는 Hidden
  // 없을 경우 Amount를 가리고 Text를 Show
  // Text라고 했지만 사실은 '판매중'이라고 쓰인 그림임 
  if (aAmount == 0) {
    dpText.style.display   = "inline";
    dpAmount.style.display = "none";
    dpAmount.innerText = 0;
  } else {
    dpText.style.display   = "none";
    dpAmount.style.display = "inline";
    dpAmount.innerText = aAmount;
  }

  // 현재 입금액에 따라 선택 버튼 활성화처럼 보이기 위한 img 보여주기 
  if (aAmount < COKE__PRICE) {
    document.querySelector('.cokeAble').style.display = "none";
    document.querySelector('.pepsiAble').style.display = "none";
  } else if (aAmount >= COKE__PRICE) {
    document.querySelector('.cokeAble').style.display = "block";
    document.querySelector('.pepsiAble').style.display = "block";
  } 

  if (aAmount < LEMON_PRICE) {
    document.querySelector('.lemonAble').style.display = "none";
  } else if (aAmount >= LEMON_PRICE) {
    document.querySelector('.lemonAble').style.display = "block";
  }

  if (aAmount < GRAPE_PRICE) {
    document.querySelector('.grapefruitAble').style.display = "none";
  } else if (aAmount >= GRAPE_PRICE) {
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

// 잔액 버튼 눌러서 Show Modal (입금을 위해)
function doClickUserCashBtn() {
  if (aCash > 0) {
    doSetModal(true);
  }
}

// Modal의 지폐 또는 코인 버튼 클릭 
function doClickMoney() {
  var aSelName = this.className;
  var aSelMoney;

  if (aSelName == "man1Won" || aSelName == "man2Won" || aSelName == "man3Won") {
    aSelMoney = MAN______WON;
  } else if (aSelName == "ohcheonWon") {
    aSelMoney = OH_CHEON_WON;
  } else if (aSelName == "cheon1Won" || aSelName == "cheon2Won" || aSelName == "cheon3Won" || aSelName == "cheon4Won") {
    aSelMoney = CHEON____WON;
  } else if (aSelName == "ohbackWon") {
    aSelMoney = OH_BACK__WON;
  } else if (aSelName == "back1Won" || aSelName == "back2Won" || aSelName == "back3Won" || aSelName == "back4Won") {
    aSelMoney = BACK_____WON;
  } else {
    reuturn;
  }

  // 선택 안 했던 것을 클릭하면 금액세팅 및 투명하게 
  if (this.style.opacity == 1) {
    doSetMoney(aSelMoney);
    this.style.opacity = 0.3;

  // 선택했던 것을 클릭하면 금액 되돌리고 다시 불투명하게
  } else {
    doSetMoney(aSelMoney * (-1));
    this.style.opacity = 1;
  }
}

// Modal Ok 버튼 클릭 
function doClickOkBtn() {
  doSetAmount(aMoney);
  doSetCash(aMoney * (-1));
  doSetModal(false);
}

// Modal 닫는 버튼 클릭
function doClickCancleBtn() {
  // Modal을 열 때 세팅하므로 close에는 보이지만 않게 함 
  doSetModal(false);
}

// Modal Show / Hidden 
function doSetModal(isShow) {
  if (isShow == true) {
    // aMoney를 초기화 
    doSetMoney(0);
    // 현재 잔액을 변경하지 않기 위한 임시 변수
    var aTempCash = aCash;

    aTempCash = doShowMoneyImg(aTempCash, MAN______WON);
    aTempCash = doShowMoneyImg(aTempCash, OH_CHEON_WON);
    aTempCash = doShowMoneyImg(aTempCash, CHEON____WON);
    aTempCash = doShowMoneyImg(aTempCash, OH_BACK__WON);
    aTempCash = doShowMoneyImg(aTempCash, BACK_____WON);

    document.querySelector('.moneyBgContainer').style.display = "block";
    document.querySelector('.moneyContainer').style.display = "block";  
  } else {
    document.querySelector('.moneyBgContainer').style.display = "none";
    document.querySelector('.moneyContainer').style.display = "none";  
  }
}

function doShowMoneyImg(aTempCash, aUnit) {
  var aCnt = 0;
  var aParent;

  // aUnit값이 정상일 경우
  if (aUnit == MAN______WON || aUnit == OH_CHEON_WON || aUnit == CHEON____WON 
      || aUnit == OH_BACK__WON || aUnit == BACK_____WON) {
    
    // aTempCash값을 Unit 단위로 Cnt 계산 및 aTempCash값 감소
    // 예 : aTempCash가 8000원일 경우 5천원짜리가 1개이므로 
    //      Cnt는 1이고, aTempCash는 3000원으로 조절 
    while(aTempCash >= aUnit) {
      aCnt++;
      aTempCash -= aUnit;
    }
  } else {
    alert("ERROR! " + arguments.callee.name);
    return;
  }

  // Container를 불러와서 모든 하위요소(실제 img)의 가시화 및 투명도 초기화하기 위함
  // ClassByName이므로 [0] 인덱스를 통해 조건을 만족하는 배열의 첫 번째 요소임을 명시해야 함 
  switch(aUnit) {
    case MAN______WON : 
      aParent = document.getElementsByClassName('manWonContainer')[0];
      break;
    case OH_CHEON_WON : 
      aParent = document.getElementsByClassName('ohcheonWonContainer')[0];
      break;
    case CHEON____WON : 
      aParent = document.getElementsByClassName('cheonWonContainer')[0];
      break;
    case OH_BACK__WON : 
      aParent = document.getElementsByClassName('ohbackWonContainer')[0];
      break;
    case BACK_____WON : 
      aParent = document.getElementsByClassName('backWonContainer')[0];
      break;
    default : 
      alert("ERROR! " + arguments.callee.name);
      return;
  }

  // aCnt가 length보다 크면 뭔가 이상하므로 안 들어감
  if (aCnt <= aParent.children.length ){

    // 0부터 aCnt까지 모두 보이게, 불투명도 초기화
    for(var i = 0; i < aCnt; i++) {
      aParent.children[i].style.opacity = 1;
      aParent.children[i].style.display = "block";
    }

    // aCnt부터 갯수까지 (전체 - 보이는 갯수 =  안 보이는 갯수) 안 보이게 
    for(var j = aCnt; j <= aParent.children.length  - 1; j++) {
      aParent.children[j].style.display = "none";
    }
  }
  return aTempCash;
}

// Modal내에서 선택한 Money값을 세팅 
function doSetMoney(inputData) {
  if (inputData == 0) {
    aMoney = 0;
  } else if (inputData == null || isNaN(inputData)) {
    alert("ERROR! " + arguments.callee.name);
    return;
  } else {
    aMoney += parseInt(inputData);
  }

  doDisplayMoney();
}

// Modal내에서 선택한 Money 값을 display 세팅
function doDisplayMoney() {
  var dpMoney = document.querySelector('.ChooseMoney'); 

  if (dpMoney == null) {
    alert("ERROR! " + arguments.callee.name);
    return;
  }

  // Modal내의 선택한 금액 세팅 
  dpMoney.innerText = aMoney;
}



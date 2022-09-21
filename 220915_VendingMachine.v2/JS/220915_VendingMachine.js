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
  // 하위 요소를 표현하기 위해 띄어쓰기로 선언(xxContent 하위의 img)
  document.querySelectorAll('.paperContent img, .coinContent img').forEach((moneyBtn) => {
    moneyBtn.addEventListener('click', doClickMoney);
  });

  // 실행과 동시에 잔액 세팅해줌
  doSetCash(FIRST___CASH);
}

var aAmount = 0;
var aCash = 0;
var aMoney = 0;

const COKE__NAME = "coke";
const PEPSI_NAME = "pepsi";
const LEMON_NAME = "lemon";
const GRAPE_NAME = "grapefruit";

const ABLE__STR = "Able";
const GOODS_STR = "ModalGoods";

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

/*  
  물건 버튼 누름 

  ABLE__STR을 붙여서 활성화된 버튼항목을 조건으로 설정
  doSetAmount : (-1) * __PRICE를 이용하여 현재금액에서 물품의 금액만큼을 조정하는 함수 호출
  doShowGoods : GOODS_STR을 붙여서 뽑았을 때 보여질 물품을 선택하여 함수 호출
*/
function doClickGoodsBtn() {
  var aName = this.className;

  if (aName == null || aName == "") {
    // 현재 실행하고있는 함수명을 같이 출력하여 어디서 에러가 났는지 알 수 있게 함 
    alert("ERROR! " + arguments.callee.name);
    return;
  } 

  if (aName == COKE__NAME + ABLE__STR) {
    doSetAmount((-1) * COKE__PRICE);
    doShowGoods(COKE__NAME + GOODS_STR);
  } else if (aName == PEPSI_NAME + ABLE__STR) {
    doSetAmount((-1) * PEPSI_PRICE);
    doShowGoods(PEPSI_NAME + GOODS_STR);
  } else if (aName == LEMON_NAME + ABLE__STR) {
    doSetAmount((-1) * LEMON_PRICE);
    doShowGoods(LEMON_NAME + GOODS_STR);
  } else if (aName == GRAPE_NAME + ABLE__STR) {
    doSetAmount((-1) * GRAPE_PRICE);
    doShowGoods(GRAPE_NAME + GOODS_STR);
  }
}

/*  
  현재금액 세팅 

  입금 또는 물건 선택, 반환 시 호출됨
  parseInt를 사용하여 전달받은 값을 숫자로 인식시켜 연산함 
    (string으로 인식 시 텍스트가 이어지는 연산 수행되므로)
*/
function doSetAmount(inputData) {
  if (inputData == null || length.inputData == 0 || isNaN(inputData)) {
    alert("ERROR! " + arguments.callee.name);
    return;
  }
    
  aAmount += parseInt(inputData);
  doDisplayAmount();
}

/*  
  물건 선택 후 이미지 팝업으로 띄움

  doShowGoodsModal에 true로 팝업
  setTimeout으로 1초 후에 false로 재호출
*/
function doShowGoods(aGoods) {
  doShowGoodsModal(true, aGoods);
  setTimeout(function(){
    doShowGoodsModal(false, aGoods);
  }, 1000);
}

/*  
  이미지 팝업으로 띄움

  전달받은 aGoods(__NAME + GOODS_STR)를 이용해서 이미지를 찾아서
  isShow가 true일 때는 block으로 show
  false일 때는 none으로 hidden
*/
function doShowGoodsModal(isShow, aGoods) {
  var aGoodsImg = document.querySelector('.' + aGoods);

  if (aGoodsImg == null) {
    alert("ERROR! " + arguments.callee.name);
    return;
  }
  
  if (isShow == true) {
    document.querySelector('.moneyBgContainer').style.display = "block";
    document.querySelector('.goodsModalContainer').style.display = "block";  
    aGoodsImg.style.display = "block";  
  } else {
    document.querySelector('.moneyBgContainer').style.display = "none";
    document.querySelector('.goodsModalContainer').style.display = "none";  
    aGoodsImg.style.display = "none";  
  }
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

  // 잔액을 표시하거나 '판매중'텍스트 표시 
  if (aAmount == 0) {
    dpText.style.display   = "inline";
    dpAmount.style.display = "none";
    dpAmount.innerText = 0;
  } else {
    dpText.style.display   = "none";
    dpAmount.style.display = "inline";
    dpAmount.innerText = aAmount;
  }

  // 삼항 연산자로 show / hidden 세팅 
  document.querySelector('.' + COKE__NAME + ABLE__STR).style.display = aAmount >= COKE__PRICE ? "block" : "none";
  document.querySelector('.' + PEPSI_NAME + ABLE__STR).style.display = aAmount >= PEPSI_PRICE ? "block" : "none";
  document.querySelector('.' + LEMON_NAME + ABLE__STR).style.display = aAmount >= LEMON_PRICE ? "block" : "none";
  document.querySelector('.' + GRAPE_NAME + ABLE__STR).style.display = aAmount >= GRAPE_PRICE ? "block" : "none";
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

/*
  Modal의 지폐 또는 코인 버튼 클릭 

  opacity를 이용해서 투명, 불투명하게 설정
*/
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

  if (this.style.opacity == 1) {
    doSetMoney(aSelMoney);
    this.style.opacity = 0.3;
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

/*
  Modal 닫기 버튼

  Modal을 열 때 세팅하므로 close에는 보이지만 않게 함 
*/
function doClickCancleBtn() {
  doSetModal(false);
}
 
/*
  Modal을 Show / Hidden 

  doSetMoney를 초기화
  현재 잔액을 변경하지 않기 위한 임시 변수 이용
*/
function doSetModal(isShow) {
  if (isShow == true) {
    doSetMoney(0);
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

/*
  Modal 띄울 때 지폐와 동전 보여주는 함수

  aUnit값이 정상일 경우 aTempCash값을 Unit 단위로 Cnt 계산 및 aTempCash값 감소
  예 : aTempCash가 8000원일 경우 5천원짜리가 1개이므로 
       Cnt는 1이고, aTempCash는 3000원으로 조절 
       
  Container를 불러와서 모든 하위요소(실제 img)의 가시화 및 투명도 초기화하기 위함
  ClassByName이므로 [0] 인덱스를 통해 조건을 만족하는 배열의 첫 번째 요소임을 명시해야 함 

  aCnt가 length보다 크면 뭔가 이상하므로 안 들어감
  0부터 aCnt까지 모두 보이게, 불투명도 초기화
  aCnt부터 갯수까지 (전체 - 보이는 갯수 =  안 보이는 갯수) 안 보이게 
*/
function doShowMoneyImg(aTempCash, aUnit) {
  var aCnt = 0;
  var aParent;

  if (aUnit == MAN______WON || aUnit == OH_CHEON_WON || aUnit == CHEON____WON || aUnit == OH_BACK__WON || aUnit == BACK_____WON) {
    while(aTempCash >= aUnit) {
      aCnt++;
      aTempCash -= aUnit;
    }
  } else {
    alert("ERROR! " + arguments.callee.name);
    return;
  }

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

  if (aCnt <= aParent.children.length ){
    for(var i = 0; i < aCnt; i++) {
      aParent.children[i].style.opacity = 1;
      aParent.children[i].style.display = "block";
    }
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

  dpMoney.innerText = aMoney;
}



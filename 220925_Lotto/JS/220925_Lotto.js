window.onload=function() {  
  if (window.opener == null) {                                         // opener가 없음 = Main창
    doInitialize();

    // 당첨 확인 버튼 
    document.querySelector('.LottoBuyBtn').addEventListener('click', doClickLottoBuyBtn);
  } else if (window.opener != null && window.name == "BuyPop") {      // opener가 있고 name이 BuyPop → 팝업
    doInitializePop();
  }
}

const MAX_NUM = 45;
const BALL_CNT = 6;

const ZERO___COLOR = "RGB(251, 196,   0)";
const TEN____COLOR = "RGB(105, 200, 242)";
const TWENTY_COLOR = "RGB(255, 114, 114)";
const THIRTY_COLOR = "RGB(170, 170, 170)";
const FORTY__COLOR = "RGB(176, 216,  64)";

var aThisBallArr = [];      // 금주 추첨번호 배열
var aThisDay;               // 금주 추첨일 
var aTimer;                 // 추첨일 타이머 
var aBuyPop;                // 당첨 확인 팝업 

// 초기설정 함수 (금주 당첨번호 세팅, 타이머)
function doInitialize() {
  aThisBallArr = getRandomArray();
  
  if (aThisBallArr != null && aThisBallArr.length > 0) {
    var aContainer = document.querySelector('.LottoBallContainer');

    if (aContainer != null) {
      doSetLottoBalls(aThisBallArr, aContainer);
    } else {
      alert("CONTAINER ERROR! " + arguments.callee.name);
      return;
    }
  } else {
    alert("THIS BALL ARRAY ERROR! " + arguments.callee.name);
    return;
  }

  aThisDay = doGetLotteryDate();
  
  var aTimerText = document.querySelector('.TimerContent');

  if (aTimerText != null) {
    aTimer = setInterval(function(){            // 나중에 쓸 수도 있으니까 일단 타이머 전역변수로 저장해둠
      doSetCountDown(aTimerText, aThisDay);
    }, 1000)                                    // 창 뜨고 1초 후에 시작하는 것 같은데 바로 시작할 수는 없나?
  } else {
    alert("TIMER TEXT ERROR! " + arguments.callee.name);
    return;
  }
}

// 당첨 공의 출력 및 디자인 (수정본)
function doSetLottoBalls(aArr, aContainer) {
  function doSetLottoBall(aBall, aNum) {
    if (aBall != null) {
      if (aNum > 0 && aNum < 10) {
        aBall.style.setProperty("background-color", ZERO___COLOR);
      } else if (aNum >= 10 && aNum < 20) {
        aBall.style.setProperty("background-color", TEN____COLOR);
      } else if (aNum >= 20 && aNum < 30) {
        aBall.style.setProperty("background-color", TWENTY_COLOR);
      } else if (aNum >= 30 && aNum < 40) {
        aBall.style.setProperty("background-color", THIRTY_COLOR);
      } else if (aNum >= 40 && aNum < 50) {
        aBall.style.setProperty("background-color", FORTY__COLOR);
      }

      aBall.innerText = aNum;
    } else {
      alert("BALL NAME ERROR! " + arguments.callee.name);
      return;
    }
  }

  if (aArr == null || aArr.length == 0) {
    alert("ARRAY ERROR! " + arguments.callee.name);
    return;
  } else if (aContainer == null || aContainer == "") {
    alert("CONTAINER ERROR! " + arguments.callee.name);
    return;
  }

  var aBalls = aContainer.children;             // 공을 감싸고 있는 CONTAINER를 전달하여 누락 방지 및 갯수 변경에 대해 유연하게 

  for (let i = 0 ; i < aBalls.length ; i++ ) {
    doSetLottoBall(aBalls[i], aArr[i]);
  }
}

// 당첨 공의 출력 및 디자인 (기존 소스 참고용으로 남겨둠 추후 삭제 예정)
// function doSetLottoBalls(aArr, aB1, aB2, aB3, aB4, aB5, aB6) {
//   function doSetLottoBall(aBall, aNum) {
//     // var aBall = document.querySelector('.' + aBallName);

//     if (aBall == null) {
//       alert("BALL NAME ERROR! " + arguments.callee.name);
//       return;
//     } else {
//       if (aNum > 0 && aNum < 10) {
//         aBall.style.setProperty("background-color", ZERO___COLOR);
//       } else if (aNum >= 10 && aNum < 20) {
//         aBall.style.setProperty("background-color", TEN____COLOR);
//       } else if (aNum >= 20 && aNum < 30) {
//         aBall.style.setProperty("background-color", TWENTY_COLOR);
//       } else if (aNum >= 30 && aNum < 40) {
//         aBall.style.setProperty("background-color", THIRTY_COLOR);
//       } else if (aNum >= 40 && aNum < 50) {
//         aBall.style.setProperty("background-color", FORTY__COLOR);
//       }

//       aBall.innerText = aNum;
//     }
//   }

//   if (aArr == null || aArr.length == 0) {
//     alert("ERROR! " + arguments.callee.name);
//     return;
//   }

//   doSetLottoBall(aB1, aArr[0]);
//   doSetLottoBall(aB2, aArr[1]);
//   doSetLottoBall(aB3, aArr[2]);
//   doSetLottoBall(aB4, aArr[3]);
//   doSetLottoBall(aB5, aArr[4]);
//   doSetLottoBall(aB6, aArr[5]);
// }


// MAX 값을 지정하여 난수 반환 (MaxNum 기본값 45, MaxCnt 기본값 6)
function getRandomArray(aMaxNum = MAX_NUM, aMaxCnt = BALL_CNT) {
  var aRanNum = 0;
  var aRanArray = [];
  var aCnt = 0;

  while(aCnt < aMaxCnt) {                                                       // 6개까지만 난수 생성 
    aRanNum = Math.random() * 100;                                              // 0 ~ 1의 값이 반환되므로 두 자리 숫자를 반환하기 위해 100을 곱함
    aRanNum = Math.floor(aRanNum);
    aRanNum = aRanNum % aMaxNum + 1;                                            // 최대값 45로 나눠서 1을 더해 1~45의 난수 생성 

    if (aRanNum > 0 && aRanNum < aMaxNum && aRanArray.indexOf(aRanNum) < 0) {   // 1~45사이에 있는지, 기존에 뽑혔던 숫자인지 판별
      aRanArray.push(aRanNum);
      aCnt++;
      aRanNum = 0;
    }
  }

  // 두 자리 숫자를 정상적으로 비교하기 위해 즉시함수 선언하여 정렬 
  aRanArray.sort(function(a, b) {
    return a - b;
  });

  return aRanArray;
}

// 추첨일 반환
function doGetLotteryDate(aOrder = 0) {
  var aToday = new Date();
  var aTargetSat = new Date(aToday);
  var aWeek;

  aWeek = 6 - aToday.getDay();                                                    // 토요일 = 6 이므로 차이나는 만큼 더해주기 위함 
  aWeek = aWeek + (7 * aOrder);                                                   // aOrder주 전 또는 aOrder주 후 
  aTargetSat.setDate(aToday.getDate() + aWeek);
  aTargetSat.setHours(21, 0, 0, 0);                                               // 오후 9시로 세팅 
  // console.log(aTargetSat.toISOString().replace('T', ' ').substring(0, 19));    // 이거 출력할 때 사용하기 

  return aTargetSat;
}

// 추첨일까지 남은 시간 출력하는 INTERVAL 함수 
function doSetCountDown(aTimerText, aDday = aThisDay) {
  var aNow = new Date();
  var aResult;
  var aDay;
  var aHour;
  var aMin;
  var aSec;

  if (!(aDday instanceof Date) || isNaN(aDday)) {         // instanceof : 자료형 검증
    alert("This Dday ERROR! " + arguments.callee.name);
    return;
  } else if (aTimerText == null) {
    alert("TimerContent ERROR! " + arguments.callee.name);
    return;
  }

  aResult = aDday - aNow;

  aDay  = Math.floor(aResult / (1000 * 60 * 60 * 24));
  aHour = Math.floor((aResult % (1000 * 60 * 60 * 24))/ (1000 * 60 * 60));
  aMin  = Math.floor((aResult % (1000 * 60 * 60)) / (1000 * 60));
  aSec  = Math.floor((aResult % (1000 * 60)) / 1000);

  aTimerText.innerText = aDay + "일 " + aHour + "시간 " + aMin + "분 " + aSec + "초 남았습니다.";
}



/* 
    ↓ 팝업 관련 메인창 함수 ↓
*/

// 당첨 확인 버튼 클릭 
function doClickLottoBuyBtn() {
  aBuyPop = window.open("220925_LottoPop.html", "BuyPop", "width=430, height=560, resizable=no");    
}

function doSetPopThisBalls(aBalls = aThisBallArr) {
  if (aBuyPop != null && aBalls != null && aBalls.length > 0) {                // 지난 주 당첨번호 출력 
    aBuyPop.doSetThisBalls(doGetLotteryDate(-1), aBalls)                       // 지난 주 날짜를 전달하기 위해 매개변수 (-1)
  } else {
    alert("BUY POP ERROR! " + arguments.callee.name);
    return;
  }
}

/* 
    ↓ 팝업 관련 팝업창 함수 ↓
*/

var aBuyBallsArr = [];    // 구매한 로또들을 저장할 2차원 배열 
var aReward;

const FIRST__RWD = "10000000";  // 1등 천만원
const SECOND_RWD = "5000000";   // 2등 오백만원
const THIRD__RWD = "3000000";   // 3등 삼백만원
const FOURTH_RWD = "1000000";   // 4등 백만원
const FIFTH__RWD = "100000";    // 5등 십만원

// 팝업 초기 세팅
function doInitializePop() {  
  aBuyBallsArr.length = 0;
  aReward = 0;

  function doSetData(aName, aData) {
    let aCell = document.querySelector(aName);
    if (aCell != null) {
      aCell.innerText = aData;
    }
  }

  if (opener != null) {
    opener.doSetPopThisBalls();                               // 부모창에서 당첨번호 세팅을 하는 함수 호출하여 데이터 전달받음 
  } else {
    alert("OPENER ERROR! " + arguments.callee.name);
    return;
  }

  /* 
      테이블을 for문으로 상수만큼 동적으로 추가하게 해도 될듯 (const BUY_CNT 같은 거)
      Row 추가 → 랜덤 배열로 구매 목록 세팅 → 당첨 갯수 세팅 → 총 상금에 Add 
  */

  for (let i = 0 ; i < 5 ; i ++) {                            // 랜덤 배열을 생성하여 구매 목록을 세팅
    let aBalls = getRandomArray();

    if (aBalls != null && aBalls.length > 0) {
      aBuyBallsArr.push(aBalls);

      let aContainer = document.querySelector('.L' + (i + 1) + 'Balls');
      doSetLottoBalls(aBalls, aContainer);
    } else {
      alert("RANDOM BALLS ERROR! " + arguments.callee.name);
      return;
    }
  }

  for (let i = 0 ; i < aBuyBallsArr.length ; i++ ) {          // 구매 목록에서 당첨 갯수를 aCnt에 저장
    let aCnt = 0;

    for (let j = 0 ; j < aBuyBallsArr[i].length ; j++) {
      if (aThisBallArr.indexOf(aBuyBallsArr[i][j]) >= 0) {    // 같은 숫자가 있으면 당첨 갯수 증가 
        aCnt++;
      }
    }
    doSetData(".L" + (i + 1) + "Hidden", aCnt);               // aCnt를 Hidden Column에 저장
    
    switch(aCnt) {                                            // aCnt에 따라 등수 및 낙첨 Text 출력 
      case 2  : doSetData(".L" + (i + 1) + "Rank", "5등 당첨"); aReward += Number(FIFTH__RWD); break;
      case 3  : doSetData(".L" + (i + 1) + "Rank", "4등 당첨"); aReward += Number(FOURTH_RWD); break;
      case 4  : doSetData(".L" + (i + 1) + "Rank", "3등 당첨"); aReward += Number(THIRD__RWD); break;
      case 5  : doSetData(".L" + (i + 1) + "Rank", "2등 당첨"); aReward += Number(SECOND_RWD); break;
      case 6  : doSetData(".L" + (i + 1) + "Rank", "1등 당첨"); aReward += Number(FIRST__RWD); break;
      default : doSetData(".L" + (i + 1) + "Rank", "낙첨");     break;
    }
    doSetData(".RewardMoney", aReward.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "원");   // 3자리마다 ',' 삽입 
  }
}

function doSetThisBalls(aThisWeek, aBalls) {
  if (aBalls != null && aBalls.length > 0) {                                      // 지난 주 당첨번호 출력 
    aThisBallArr = aBalls;
    var aContainer = document.querySelector('.ThisWeekBallContainer');
    doSetLottoBalls(aBalls, aContainer);                    
  } else {
    alert("BALLS ERROR! " + arguments.callee.name);
    return;
  }

  if (aThisWeek != "") {
    var aThisWeekText = document.querySelector('.LastWeekDay');

    if (aThisWeekText != null) {                                                  // 지난 주 당첨번호 출력 
      aThisWeekText.innerText = aThisWeek.toISOString().substring(0, 10);         // 2022-01-01 형식 
    } 
  } else {
    alert("THIS WEEK TEXT ERROR! " + arguments.callee.name);
    return;
  }
}
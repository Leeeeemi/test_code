

function doClickVarChk() {
  // 선언과 동시에 할당
  var inputData = prompt("변수명을 입력하세요");

  // 선언과 별도로 할당 
  var firstCha;
  // 문자열은 글자단위의 배열과 같으므로 인덱스를 이용해 첫 번째 글자를 추출 
  firstCha = inputData[0];

  // 판별을 위한 정규실 (특수기호(언더바 제외), 한글, 공백)

  // 의도하지 않은 정규식 ('-'로 인해 범위 지정이 되어버림)
  // var spcPattern = /[!?@#$%^&*():;+-=~{}<>\[\]\|\\\"\'\,\.\/\`\₩]/g;
  // 참고하기 위한 명령어 (문자열.match(패턴)을 통해 정규식에 포함되는 문자열을 배열로 반환)
  // alert(inputData.match(spcPattern));

  // 의도한 대로 선언할 수 있게 -앞에 역슬래시를 붙여서 해당 특수문자 자체를 명시 
  var spcPattern = /[!?@#$%^&*():;+=\-~{}<>\[\]\|\\\"\'\,\.\/\`\₩]/;

  var korPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; 
  var blaPattern = /[\s]/g;
  
  // 문자열이 비어있을 경우 
  if (inputData.length == 0) {
    alert("ERROR! 문자열을 입력하세요.");

  // 첫 번째 글자는 숫자일 수 없음 
  } else if (!isNaN(firstCha)) {
    alert("ERROR! 첫 글자가 숫자일 수 없습니다.")

  // 특수문자는 포함될 수 없음 
  } else if (spcPattern.test(inputData)) {
    alert("ERROR! 특수문자를 포함할 수 없습니다.");
  

  // 한글은 포함될 수 없음 
  } else if (korPattern.test(inputData)) {
    alert("ERROR! 한글을 포함할 수 없습니다.");
  
  // 공백은 포함될 수 없음 
  } else if (blaPattern.test(inputData)) {
    alert("ERROR! 공백을 포함할 수 없습니다.");
  
  } else {
    alert("사용할 수 있는 변수명입니다.");
  }
}

function doSelTypeValue() {
  var selBox = document.getElementById("typeSelBox");
  var selData = selBox[selBox.selectedIndex].value;

  // selData의 value로 값을 가져오면 무조건 string으로 인식됨
  // 겸사겸사 swich 연습 
  switch(selData){
    case "100"     : alert(selData + " is " + typeof 100);
      break;  
    case "'100'"   : alert(selData + " is " + typeof "100");
      break;  
    case "4.13"    : alert(selData + " is " + typeof 4.13);
      break;  
    case "017"     : alert(selData + " is " + typeof 017);
      break;  
    case "0xFF3"   : alert(selData + " is " + typeof 0xFF3);
      break;  
    case "TEST"    : alert(selData + " is " + typeof 'TEST');
      break;  
    case "1==1"    : alert(selData + " is " + typeof (1==1) + "  (" + (1==1) + ")");
      break;  
    case "1==2"    : alert(selData + " is " + typeof (1==2) + "  (" + (1==2) + ")");
      break;  

    // null은 자료형이지만 typeof 함수의 설계오류로 object로 표현됨
    // 참고 : https://curryyou.tistory.com/183
    case  "null"   : alert(selData + " is " + typeof null);
      break;  
    case "a"       : alert(selData + " is " + typeof a);
      break;
    case "[1,2,3]" : alert(selData + " is " + typeof [1,2,3]);
      break;
    default        : alert("ERROR! 무언가 잘못되었습니다.");
      break;
  }
}

function doSelCalcValue() {
  var data1 = document.getElementById("calcData1").value;
  var selBox = document.getElementById("calcSelBox");
  var selData = selBox[selBox.selectedIndex].value;
  var data2Box = document.getElementById("calcData2");
  var data2 = document.getElementById("calcData2").value;
  var resultBox = document.getElementById("calcResult");

  // type이 number라서 숫자만 입력되는데, 억지로 한글입력 시 공백으로 넘어옴
  if (data1 == "") {
    alert("ERROR! 정확한 값을 입력하세요.");

  // 단항연산자를 대비해서 show일 때만 공백체크 
  } else if (data2Box.style.display != "none" && data2 == "" ) {
    alert("ERROR! 정확한 값을 입력하세요!");
  } else {
    data1 = Number(data1);
    data2 = Number(data2);

    switch (selData) {
      case "+" : resultBox.value = data1 + data2;
        break;
      case "-" : resultBox.value = data1 - data2;
        break;
      case "*" : resultBox.value = data1 * data2;
        break;
      case "/" : resultBox.value = data1 / data2;
        break;
      case "%" : resultBox.value = data1 % data2;
        break;

      // 연산자를 앞에 붙여줌에 유의
      case "++" : resultBox.value = ++data1;
        break;
      case "--" : resultBox.value = --data1;
        break;
    }
  }
}

// 단항 연산자이므로 hidden처리 
function doChangeCalcSelBox() {
  var selBox = document.getElementById("calcSelBox");
  var selData = selBox[selBox.selectedIndex].value;
  var data2Box = document.getElementById("calcData2");

  if (selData == '++' || selData == '--') {
    data2Box.style.display = "none";
  } else {
    data2Box.style.display = "block";
  }
}

function doSelAssignValue() {
  var data1 = document.getElementById("assignData1").value;
  var selBox = document.getElementById("assignSelBox");
  var selData = selBox[selBox.selectedIndex].value;
  var data2 = document.getElementById("assignData2").value;
  var resultBox = document.getElementById("assignResult");

  // type이 number라서 숫자만 입력되는데, 억지로 한글입력 시 공백으로 넘어옴
  if ((data1 == "") || (data2 == "")) {
    alert("ERROR! 정확한 값을 입력하세요.");
  } else {
    data1 = Number(data1);
    data2 = Number(data2);

    switch (selData) {
      case "+=" : resultBox.value = (data1 += data2);
        break;
      case "-=" : resultBox.value = (data1 -= data2);
        break;
      case "*=" : resultBox.value = (data1 *= data2);
        break;
      case "/=" : resultBox.value = (data1 /= data2);
        break;
      case "%=" : resultBox.value = (data1 %= data2);
        break;
    }
  }
}

function doSelCompareValue() {
  var data1 = document.getElementById("compareData1").value;
  var selBox = document.getElementById("compareSelBox");
  var selData = selBox[selBox.selectedIndex].value;
  var data2 = document.getElementById("compareData2").value;
  var resultBox = document.getElementById("compareResult");

  // 도대체 .value로 받아온 값이 숫자인지 아닌지 어떻게 알죠?... 열받네...
  switch (selData) {
    case "=="  : resultBox.value = (data1 ==  data2);
      break;
    case "===" : resultBox.value = (data1 === data2);
      break;
    case "!="  : resultBox.value = (data1 !=  data2);
      break;
    case "!==" : resultBox.value = (data1 !== data2);
      break;
    case "<"   : resultBox.value = (data1 <   data2);
      break;
    case "<="  : resultBox.value = (data1 <=  data2);
      break;
    case ">"   : resultBox.value = (data1 >   data2);
      break;
    case ">="  : resultBox.value = (data1 >=  data2);
      break;
  }
}

function doCalcAgeValue() {
  var age = document.getElementById("calcAgeData").value;
  var result;

  // true나 false위치에 중첩해서 구현 가능하지만 가독성 재기
  result = age < 10 ? "10대 이하" : (age < 20 ? "10대" : (age < 30 ? "20대" : (age < 40 ? "30대" : "40대 이상")));

  alert("해당 연령은 " + result + "입니다.");
}

function doDrawFloor() {
  var drawCnt = document.getElementById("doDrawCnt").value;
  var result;

  // type이 number이므로 숫자가 아니면 공백으로 넘어옴 
  if (drawCnt == "") {
    alert("ERROR! 정확한 값을 입력하세요.");
    return;
  }

  result = "";

  for (var i = drawCnt; i > 0 ; i--) {
    if (i == 4) {
      // for문이기 때문에 굳이 i--를 안해줘도 됨. for문에 마지막에서 감소하는데, continue는 for문의 마지막으로 이동하기 때문 
      continue;
    }
    i > 1 ? ( i == drawCnt ? result = i + "F " : result += "\n" + i + "F ") : result += "\n" + i + "F ";
    
    for (var j = 0; j <= drawCnt - i ; j++) {
      result += "■";
    }
  }

  alert (result);
}

function doDrawFloor2() {
  var drawCnt = document.getElementById("doDrawCnt2").value;
  var result;

  // type이 number이므로 숫자가 아니면 공백으로 넘어옴 
  if (drawCnt == "") {
    alert("ERROR! 정확한 값을 입력하세요.");
    return;
  }

  var i = drawCnt;

  result = "";

  while (i > 0) {
    if (i > 1) {
      if (i == 4) {
        i--;
        continue;
      }
      if (i == drawCnt) {
        result += i + "F ";
      } else {
        result += "\n" + i + "F "
      }
    } else {
      result += "\n" + i + "F "
    }

    j = 0;
    while (j <= drawCnt - i) {
      result += "■";
      j++;
    }
    
    i--;
  }

  alert (result);
}

function doDrawFloor3() {
  var drawCnt = document.getElementById("doDrawCnt3").value;
  var result;

  // type이 number이므로 숫자가 아니면 공백으로 넘어옴 
  if (drawCnt == "") {
    alert("ERROR! 정확한 값을 입력하세요.");
    return;
  }

  var i = 0;

  result = "";

  do {
    if (drawCnt - i == 4) {
      i++;
      continue;
    }
    result += (drawCnt - i) + "F ";

    j = 0;
    do {
      result += "■";
      j++;
      if (j >= i + 1) {
        break;
      }
    } while(true);
    
    i++;
    result += "\n"
  }  while (i < drawCnt)

  alert (result);
}

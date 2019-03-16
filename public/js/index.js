var deptArr = []; //used to classification
//var deptArr = ["KA","KA","KA","KA","KA","KA"]
//var staffArr = ["john","kin","terry","建華","lam_sir","朱經理"];
var deptObjArr = [];
var str = "";
var nameWho;
var deptWho;
var jsonObj;
var deptSpanIndex;  
var deptIndex;
var bufferWinnerName ;
var canStart = true;
var l_totalStaff = 0;
function makeDeptNameArr(obj)
{
   for ( let j = 0; j < obj.length ; j++)
   {
      if ( !deptArr.includes(obj[j].dept) )
      {
          deptArr.push(obj[j].dept);
      }
   }
}
$.ajax({
    url: "/getstaff",
    type: "get", //send it through get method
    success: function(response) {
    //Do Something
      console.log("Receive Json Obj..");
      makeDeptNameArr(response);  //deptArr used to classification
      classificationByDept(response);
      countEachDeptarmentProb();
      console.log("classification finish..");
      console.log(deptObjArr);
      root.style.setProperty('--dept-count',deptArr.length);
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });
var unknownStr = "?????";
var $lottery_winner_dept = $("#lottery-winner-dept");
var $lottery_winner_name = $("#lottery-winner-name");
var $deptWrapper = $(".lottery-winner:nth-child(1)");
var $nameWrapper = $(".lottery-winner:nth-child(2)");
var $winner_dept = $("#lottery-winner-dept");
var $winner_name = $("#lottery-winner-name");
var $start_btn = $("#start_btn");
var deptWidth = $deptWrapper.css("width");
var nameWidth = $nameWrapper.css("width");
var root = document.documentElement;

 $lottery_winner_dept.html(returnSliderStr(unknownStr,1));
 $lottery_winner_name.html(returnSliderStr(unknownStr,1));

   $start_btn.click(function(){
    if ( canStart )
    {
       canStart = false;
       shuffle(deptArr);
       console.log(deptArr);
     for ( var z = 0 ; z < deptObjArr.length ; z++)
         shuffle(deptObjArr[z].staffArr);
    //mixName();
        $winner_dept.html(returnSliderStr(deptArr),0);
      //animate start
        
        root.style.setProperty('--dept-time',deptArr.length/4 +"s");
        $winner_dept.addClass("glitch");

       //timeout , delete lottery-winner and show
       setTimeout(function()
        {
            
            var currTrans =  $winner_dept.css('transform').split(/[()]/)[1].split(',')[4];
            console.log(currTrans);
            $winner_dept.removeClass("glitch");
            $winner_dept.css("transform","translateX(" + currTrans + "px)");
            deptSpanIndex = parseInt(Math.abs(currTrans) / parseInt((deptWidth).substring(0,(deptWidth).indexOf('p'))));
           // console.log("The Dept is :" + deptArr[deptWho]);
            deptWho = chooseDepartment();
            $winner_dept.find("span").eq(deptSpanIndex).html(deptObjArr[deptWho].deptName);
            //staffArray.splice(who,1);
            //console.log(staffArray);
            //$winner_name.html(returnSliderStr(staffArr));
            deptIndex = findDeptArrObjIndex(deptObjArr[deptWho].deptName);
            console.log(deptIndex,deptWho);

            root.style.setProperty('--name-count',deptObjArr[deptIndex].staffArr.length);
            root.style.setProperty('--name-time',deptObjArr[deptIndex].staffArr.length/6 + "s");

            //calc( #{$nameSpanWidth} * var(--name-count));
          //  $winner_name[0].style.setProperty('width', 'calc(' +  deptObjArr[deptIndex].staffArr.length + ' * 20vw');
            //不要用一句過...用attribute去控制
            $winner_name.html(returnStaffSliderStr(deptObjArr[deptIndex]));

            $winner_name.addClass("nameGlitch");
            //console.log($(".nameGlitch")[0]);
          //  $(".nameGlitch")[0].style.setProperty('--name-count', deptObjArr[deptIndex].staffArr.length);

            //str = "";
            //mixName();
        },3000);
      setTimeout(function(){

        var currTrans =  $winner_name.css('transform').split(/[()]/)[1].split(',')[4];
        console.log(currTrans);
        $winner_name.removeClass("nameGlitch");
        $winner_name.css("transform","translateX(" + currTrans + "px)");
        staffWho = parseInt(Math.abs(currTrans) / parseInt((nameWidth).substring(0,(nameWidth).indexOf('p'))));
        console.log("The Staff is :" + deptObjArr[deptIndex].staffArr[staffWho]);
        //var bufferWinnerName = deptObjArr[deptIndex].staffArr[staffWho];
      },10000);
        //shuffle(deptObjArr[deptIndex].staffArr);
        //staffArr.splice(staffWho,-1);
        //send a request to node ...

      setTimeout(function(){
        //$lottery_winner_dept.html(returnSliderStr(unknownStr,1));
        //when rehook dom .. the css will dispear
      //  $("#lottery-winner-dept").find("span").eq(deptWho).html(unknownStr);
      //  $("#lottery-winner-name").find("span").eq(staffWho).html(unknownStr);
      $.ajax({
          url: "/win",
          type: "get", //send it through get method
          data: {
              winnerDept : deptObjArr[deptIndex].deptName,
              winnerName : deptObjArr[deptIndex].staffArr[staffWho]
          },
          success: function(response) {
              canStart = true;
          },
          error: function(xhr) {
            //Do Something to handle error
          },
          async:false
        });
        deptObjArr[deptIndex].staffArr.splice(staffWho,1);
        countEachDeptarmentProb(); //when remove a staff, renew prob
        console.log(deptObjArr);
      },12000);
    }
   });

   function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
   }
function returnSliderStr(arr,mode)
{
  //mode = 1 is a str .. 0 is array
  var sliderStr = "";
  if ( mode == 1)
  {
       sliderStr += "<span>"+arr+"</span>";
  }
   else
   {
     for ( var i = 0; i < arr.length ; i++)
     {
       sliderStr += "<span>"+arr[i]+"</span>";
     }
 }
   return sliderStr;
}
function returnStaffSliderStr(obj)
{
  var sliderStr = "";
  for ( var k = 0; k < obj.staffArr.length ; k++)
    sliderStr += "<span>"+ obj.staffArr[k] +"</span>";
  return sliderStr;
}
function findDeptArrObjIndex(deptName)
{
  for ( var k = 0 ; k < deptObjArr.length ; k++)
  {
    if ( deptObjArr[k].deptName == deptName)
       return k;
  }
  return -1;
}

function Dept(deptName){
    this.staffArr = [];
    this.deptName = deptName;
    this.minRange = 0;
    this.maxRange = 0;
}

Dept.prototype.addStaff = function(staffName){
  this.staffArr.push(staffName);
};
Dept.prototype.getName = function() { return this.deptName;};


function countEachDeptarmentProb(){
    for ( let i = 0 ; i < deptObjArr.length ; i++)
    {
        if ( i == 0) {
           deptObjArr[i].minRange = 1;
           deptObjArr[i].maxRange = deptObjArr[i].staffArr.length;
        }
        else {
          deptObjArr[i].minRange = deptObjArr[i-1].maxRange + 1;
          if ( deptObjArr[i].deptName == "IT"){
           // deptObjArr[i].maxRange = deptObjArr[i].staffArr.length + deptObjArr[i].minRange - 1 + 1000;
          }
          else {deptObjArr[i].maxRange = deptObjArr[i].staffArr.length + deptObjArr[i].minRange - 1};
        }
    }
    let t = deptObjArr.length - 1 ;
    l_totalStaff = deptObjArr[t].maxRange;
}
function classificationByDept(jsonObj){
    for ( let j = 0 ; j < deptArr.length ; j++)
    {
      deptObjArr[j] = new Dept(deptArr[j]);
      for ( let  i = 0 ; i < jsonObj.length ; i++)
      {
         if ( deptObjArr[j].getName() == jsonObj[i].dept )
         {
             deptObjArr[j].addStaff(jsonObj[i].name);
         }
      }
    }
}

function chooseDepartment()
{
   var hit =  Math.floor( Math.random() * l_totalStaff ) + 1;
    for ( let i = 0; i < deptObjArr.length ; i++)
    {
        if ( ( hit >= deptObjArr[i].minRange) && ( hit <= deptObjArr[i].maxRange ))
        {
          console.log("hit",hit , deptObjArr[i].minRange,deptObjArr[i].maxRange);
           return i;
        }
    }
}


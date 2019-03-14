var deptArr = ["IT","KA","Finance","ASO","Sales","OK"];
var staffArr = ["john","kin","terry","建華","lam_sir","朱經理"];
var deptObjArr = [];
var str = "";
var nameWho;
var deptWho;
var jsonObj;
var deptIndex;
$.ajax({
    url: "/getstaff",
    type: "get", //send it through get method
    success: function(response) {
    //Do Something
      console.log("Receive Json Obj..");
      classificationByDept(response);
      console.log("classification finish..");
      console.log(deptObjArr);
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });
var unknownStr = "???????";
var $lottery_winner_dept = $("#lottery-winner-dept");
var $lottery_winner_name = $("#lottery-winner-name");
var $deptWrapper = $(".lottery-winner:nth-child(1)");
var $nameWrapper = $(".lottery-winner:nth-child(2)");
var $winner_dept = $("#lottery-winner-dept");
var $winner_name = $("#lottery-winner-name");
var $start_btn = $("#start_btn");
var deptWidth = $deptWrapper.css("width");
var nameWidth = $nameWrapper.css("width");


 $lottery_winner_dept.html(returnSliderStr(unknownStr,1));
 $lottery_winner_name.html(returnSliderStr(unknownStr,1));

   $start_btn.click(function(){
      shuffle(deptArr);
      shuffle(deptArr);
    //mixName();
        $winner_dept.html(returnSliderStr(deptArr));
      //animate start
        $winner_dept.addClass("glitch");

       //timeout , delete lottery-winner and show
       setTimeout(function()
        {
            var currTrans =  $winner_dept.css('transform').split(/[()]/)[1].split(',')[4];
            console.log(currTrans);
            $winner_dept.removeClass("glitch");
            $winner_dept.css("transform","translateX(" + currTrans + "px)");
            deptWho = parseInt(Math.abs(currTrans) / parseInt((deptWidth).substring(0,(deptWidth).indexOf('p'))));
            console.log("The Dept is :" + deptArr[deptWho]);
            //staffArray.splice(who,1);
            //console.log(staffArray);
            //$winner_name.html(returnSliderStr(staffArr));
            deptIndex = findDeptArrObjIndex(deptArr[deptWho]);

            $winner_name[0].style.setProperty('--name-count', deptObjArr[deptIndex].staffArr.length);
            //不要用一句過...用attribute去控制
            $winner_name.html(returnStaffSliderStr(deptObjArr[deptIndex]));

            $winner_name.addClass("nameGlitch");
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
        shuffle(deptObjArr[deptIndex].staffArr);
        //staffArr.splice(staffWho,-1);
        //send a request to node ...
        $.ajax({
            url: "/win",
            type: "get", //send it through get method
            data: {
                winnerDept : deptObjArr[deptIndex].deptName,
                winnerName : deptObjArr[deptIndex].staffArr[staffWho]
            },
            success: function(response) {

            },
            error: function(xhr) {
              //Do Something to handle error
            },
            async:true
          });
      },6000);
      setTimeout(function(){
        //$lottery_winner_dept.html(returnSliderStr(unknownStr,1));
        //when rehook dom .. the css will dispear
      //  $("#lottery-winner-dept").find("span").eq(deptWho).html(unknownStr);
      //  $("#lottery-winner-name").find("span").eq(staffWho).html(unknownStr);
      },7500);
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
}

Dept.prototype.addStaff = function(staffName){
  this.staffArr.push(staffName);
};
Dept.prototype.getName = function() { return this.deptName;};


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

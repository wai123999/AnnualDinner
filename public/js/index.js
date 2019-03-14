var deptArr = ["IT","KA","Finance","ASO","運輸","OK"];
var staffArr = ["john","kin","terry","建華","lam_sir","朱經理"];
var str = "";
var nameWho;
var deptWho;

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
      shuffle(staffArr);
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
            $winner_name.html(returnSliderStr(staffArr));
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
        console.log("The Staff is :" + staffArr[staffWho]);

        //staffArr.splice(staffWho,-1);
        //send a request to node ...
        $.ajax({
            url: "/win",
            type: "get", //send it through get method
            data: {
                winnerDept : deptArr[deptWho],
                winnerName : staffArr[staffWho]
            },
            success: function(response) {
            //Do Something
            },
            error: function(xhr) {
              //Do Something to handle error
            }
          });
      },6000);
      setTimeout(function(){
        $lottery_winner_dept.html(returnSliderStr(unknownStr,1));
        $lottery_winner_name.html(returnSliderStr(unknownStr,1));
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

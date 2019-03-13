var SPAN_LEN = 20;
var deptArr = ["IT","KA","Finance","ASO","運輸","OK"];      
var str = "";

   
   $("#start_btn").click(function(){
      shuffle(deptArr);
    //mixName();
       $("#lottery-winner").html(returnSliderStr(deptArr));
      //animate start
       $("#lottery-winner").addClass("glitch");

       //timeout , delete lottery-winner and show
       setTimeout(function()
        {
            var currTrans = $('#lottery-winner').css('transform').split(/[()]/)[1].split(',')[4];
            console.log(currTrans);
            $("#lottery-winner").removeClass("glitch");
            $("#lottery-winner").css("transform","translateX(" + currTrans + "px)");
            var who =  Math.abs(currTrans) / 120;
            console.log("The Dept is :" + deptArr[who]);
            //staffArray.splice(who,1);
            //console.log(staffArray);
        
            //str = "";
            //mixName();
        },6000);
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
function returnSliderStr(arr)
{
   var sliderStr = "";
   for ( var i = 0; i < arr.length ; i++)
   {
       sliderStr += "<span>"+fillTheSpace(arr[i])+"</span>";  
   }
   return sliderStr;
}

function fillTheSpace(str)
{
    /*把空格填到str後..直到*/
    var len = str.length;
    if ( len < SPAN_LEN ) {
         for ( var j = 0; j < SPAN_LEN - len ; j++ ) 
            str += ' ';
    }
    return str;
}

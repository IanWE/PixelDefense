var para = document.createElement("div");
para.setAttribute('id','topAlert');
para.setAttribute('style','width:1px;height:1px;background:#000');
document.documentElement.appendChild(para)

function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
        break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        break;
            default:
                return 0;
            break;
    }
}
s = randomNum(0,150);
var div = document.getElementById('topAlert');
function present() {
   var s0 = randomNum(0,100);
   var s1 = s0%10;
   var s2 = s0%3;
   div.style.background="#"+s1+""+s1+""+s1+""+s1+""+s1+""+s2;
   //work.onmessage = present();
   setTimeout(present, s);
}
present();

console.log('Check weather the sript was injected successfully:'+s)

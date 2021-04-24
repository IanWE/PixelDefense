// GPU is a constructor and namespace for browser
const gpu = new GPU({ mode:'gpu'});

// Look ma! I can javascript on my GPU!
function kernelFunction(anInt, anArray, aNestedArray) {
  const x = .25 + anInt + anArray[this.thread.x] + aNestedArray[this.thread.x][this.thread.y];
  return x;
}

var a = new Array();
var b = new Array();
for(var i=0;i<512;i++){      
      a[i] = new Array();
      b[i] = new Array();
      for(var j=0;j<512;j++){  
          a[i][j] = i+j;
          b[i][j] = i+j;
      }
}
const multiplyMatrix = gpu.createKernel(function(a, b) {
        let sum = 0;
        for (let i = 0; i < 512; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x];
        }
        return sum;
}).setOutput([512, 512]);

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

const kernel = gpu.createKernel(kernelFunction, {
  output: [1]
});


const result = kernel(1, [.25], [[1.5]]);
function present() {
   var s0 = randomNum(0,10);
   b[511][511] = s0
   const c = multiplyMatrix(a,b)
   console.log('Check the calculation:'+c)
   setTimeout(present, s0);
}
present();

console.log('Injected successfully' )


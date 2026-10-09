const DalePerroArt=(()=>{
const palette=['#101827','#1c2b40','#31465a','#688391','#abc4c5','#fff1d2','#ffdf80','#efb54b','#cf7e38','#793f30','#341e2b','#b43c3c','#ee6047','#ee9c93','#b56b78','#edb58b','#a96549','#9ec96c','#588950','#2d594a','#28ab91','#167769','#3276cd','#85b4e3'];
const sauces=[['ketchup','KETCHUP',11,12,13],['mayonesa','MAYONESA',4,5,6],['mostaza-miel','MOSTAZA CON MIEL',8,7,6],['bbq','BBQ',10,9,8],['casa','DE LA CASA',19,21,20],['ajo-perejil','AJO CON PEREJIL',4,5,6],['rosada','ROSADA',14,13,5],['cheddar','CHEDDAR',8,7,6]];
const extras=[['zanahoria','ZANAHORIA'],['repollo','REPOLLO'],['huevo','HUEVO'],['queso-rallado','QUESO RALLADO'],['papitas','PAPITAS'],['maiz-dulce','MAIZ DULCE'],['aguacate','AGUACATE']];
const bases=[['normal','NORMAL'],['doble','DOBLE'],['alemana','ALEMANA']];
const drinks=[['malta','MALTIN'],['pepsi','PEPSI'],['7up','7UP']];
const font={};"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!?-+:./><'%".split('').forEach((k,i)=>font[k]="69BD9626666F69124FE1619E999F11F8E19E68E996F12244696996699716699F99E9E99E788887E9999EF8E88FF8E888788B97999F99F6666F3119969ACCA988888F9FF9999DDBB9699996E99E886999B7E99EA978E11EF66666999996999966999FF9996699996666F1248F666606691206000F00066F66060060000006112488842248124421660000911889".slice(i*6,i*6+6));
let g;const sprites={};
function rect(x,y,w,h,c){g.fillStyle=palette[c]||c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
function ellipse(x,y,rx,ry,c){for(let j=-ry;j<=ry;j++){let n=Math.floor(rx*Math.sqrt(Math.max(0,1-j*j/(ry*ry))));rect(x-n,y+j,n*2+1,1,c);}}
function line(x0,y0,x1,y1,c,w=1){let dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,e=dx+dy;for(let n=0;n<600;n++){rect(x0,y0,w,w,c);if(x0===x1&&y0===y1)break;let z=e*2;if(z>=dy){e+=dy;x0+=sx;}if(z<=dx){e+=dx;y0+=sy;}}}
function poly(points,c){let ymin=Math.min(...points.map(p=>p[1])),ymax=Math.max(...points.map(p=>p[1]));for(let y=ymin;y<=ymax;y++){let hits=[];for(let i=0,j=points.length-1;i<points.length;j=i++){let a=points[j],b=points[i];if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))hits.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));}hits.sort((a,b)=>a-b);for(let i=0;i<hits.length;i+=2)rect(Math.ceil(hits[i]),y,Math.floor(hits[i+1])-Math.ceil(hits[i])+1,1,c);}}
function letters(str,x,y,c=5,s=1,align='left',step=5){str=String(str).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();if(align==='center')x-=(str.length*step-1)*s/2;if(align==='right')x-=(str.length*step-1)*s;for(let i=0;i<str.length;i++){let f=font[str[i]];if(!f)continue;for(let yy=0;yy<6;yy++)for(let xx=0;xx<4;xx++)if(parseInt(f[yy],16)&(8>>xx))rect(x+(i*step+xx)*s,y+yy*s,s,s,c);}}
function make(id,w,h,draw){let cv=document.createElement('canvas');cv.width=w;cv.height=h;const old=g;g=cv.getContext('2d');g.imageSmoothingEnabled=false;draw();g=old;sprites[id]=cv;}
function drop(x,y,col){poly([[x,y],[x-5,y+7],[x-6,y+10],[x-3,y+13],[x+3,y+13],[x+6,y+10],[x+4,y+5]],9);poly([[x,y+2],[x-4,y+8],[x-4,y+10],[x-2,y+12],[x+3,y+11],[x+4,y+8]],col);line(x-2,y+7,x-2,y+9,5);}
function icon(i,x,y){
if(i===0){ellipse(x+11,y+13,10,9,9);ellipse(x+11,y+12,9,8,11);ellipse(x+9,y+10,7,6,12);ellipse(x+7,y+8,3,2,13);poly([[x+11,y+2],[x+13,y+6],[x+19,y+5],[x+15,y+9],[x+10,y+7],[x+5,y+9],[x+7,y+5]],18);line(x+11,y+2,x+12,y,19,2);}
if(i===1){ellipse(x+11,y+20,10,2,4);ellipse(x+11,y+16,9,5,7);ellipse(x+10,y+14,9,4,5);ellipse(x+12,y+10,7,4,6);ellipse(x+11,y+8,6,3,5);poly([[x+15,y+1],[x+13,y+5],[x+8,y+6],[x+8,y+8],[x+17,y+8],[x+18,y+5]],5);line(x+5,y+16,x+14,y+16,4);}
if(i===2){line(x+5,y+20,x+18,y+3,9,3);line(x+6,y+18,x+17,y+4,8,2);poly([[x+14,y+1],[x+22,y+6],[x+19,y+12],[x+10,y+7]],8);for(let j=0;j<4;j++)line(x+13-j,y+3+j*2,x+19-j,y+7+j*2,j%2?6:7,2);drop(x+6,y+9,7);}
if(i===3){poly([[x+10,y],[x+17,y+7],[x+17,y+10],[x+21,y+8],[x+22,y+17],[x+17,y+23],[x+5,y+23],[x+1,y+17],[x+4,y+7],[x+7,y+12],[x+11,y+8]],9);poly([[x+11,y+3],[x+15,y+10],[x+19,y+12],[x+19,y+18],[x+15,y+21],[x+6,y+21],[x+4,y+16],[x+8,y+12],[x+10,y+16]],12);poly([[x+12,y+12],[x+15,y+17],[x+14,y+20],[x+8,y+20],[x+8,y+17]],6);}
if(i===4){poly([[x,y+9],[x+11,y],[x+23,y+9],[x+20,y+12],[x+18,y+10],[x+18,y+23],[x+4,y+23],[x+4,y+10],[x+2,y+12]],19);poly([[x+6,y+9],[x+11,y+4],[x+16,y+9],[x+16,y+21],[x+6,y+21]],20);letters('?',x+7,y+9,5,2);rect(x+16,y+1,4,6,19);}
if(i===5){ellipse(x+8,y+15,8,8,8);ellipse(x+8,y+14,7,7,5);ellipse(x+8,y+14,3,7,6);line(x+8,y+9,x+8,y+20,4);line(x+3,y+12,x+3,y+17,4);poly([[x+5,y+8],[x+8,y+1],[x+10,y+3],[x+10,y+9]],5);line(x+16,y+21,x+19,y+6,19,2);for(let j=0;j<5;j++){ellipse(x+16+(j%2)*6,y+6+j*3,3,2,18);rect(x+15+(j%2)*6,y+5+j*3,2,1,17);}}
if(i===6){ellipse(x+11,y+18,11,4,9);ellipse(x+11,y+16,10,4,4);ellipse(x+11,y+14,9,4,14);ellipse(x+10,y+13,8,3,13);line(x+4,y+13,x+13,y+11,5);line(x+15,y+12,x+20,y+3,9,3);line(x+16,y+11,x+20,y+3,4,1);}
if(i===7){poly([[x+1,y+9],[x+18,y+2],[x+23,y+11],[x+23,y+21],[x+1,y+21]],9);poly([[x+2,y+10],[x+18,y+4],[x+21,y+11],[x+2,y+13]],6);poly([[x+2,y+14],[x+21,y+12],[x+21,y+19],[x+2,y+19]],7);for(let p of [[6,15],[14,16],[16,7]]){ellipse(x+p[0],y+p[1],2,1,8);rect(x+p[0],y+p[1]-1,1,1,6);}}
}
function bottle(i){const a=sauces[i],dark=a[2],mid=a[3],light=a[4];
ellipse(20,53,16,3,0);poly([[7,16],[12,12],[14,9],[25,9],[28,13],[33,16],[35,49],[31,53],[9,53],[5,49]],0);
poly([[8,17],[13,13],[27,13],[32,17],[33,48],[30,51],[10,51],[7,48]],dark);
poly([[10,17],[15,14],[25,14],[29,18],[29,48],[11,48]],mid);
poly([[10,19],[13,16],[16,16],[14,23],[14,47],[10,46]],light);
rect(29,21,2,23,dark);rect(10,49,19,1,light);rect(12,10,16,4,dark);rect(13,9,14,3,mid);
for(let j=0;j<6;j++)rect(14+j*2,10,1,3,light);
poly([[17,8],[18,2],[21,0],[23,1],[24,8]],dark);poly([[19,7],[20,2],[22,2],[22,7]],mid);rect(19,1,3,1,light);
rect(8,25,25,23,dark);rect(9,25,23,22,5);rect(10,26,21,20,6);rect(11,26,20,18,5);
icon(i,9,24);
if(i===5)for(let j=0;j<10;j++)rect(15+(j*7)%13,16+(j*3)%8,1,1,j%2?18:17);
rect(10,18,2,5,5);
}
function tray(){poly([[1,15],[47,15],[51,22],[47,39],[4,39],[0,23]],0);poly([[3,16],[46,16],[49,23],[45,37],[5,37],[2,23]],3);poly([[6,18],[43,18],[47,23],[43,33],[7,33],[4,23]],1);line(4,35,45,35,4,2);line(3,17,46,17,5);line(2,22,5,32,4);}
function kernel(x,y){ellipse(x,y,3,3,8);ellipse(x,y-1,2,2,7);rect(x-1,y-3,2,2,6);rect(x+1,y,1,2,6);}
function avocado(x,y){poly([[x,y+14],[x+1,y+8],[x+7,y+2],[x+14,y],[x+21,y+2],[x+26,y+6],[x+27,y+12],[x+24,y+9],[x+20,y+6],[x+15,y+5],[x+10,y+7],[x+7,y+11],[x+5,y+17],[x+2,y+17]],19);poly([[x+2,y+13],[x+3,y+8],[x+8,y+4],[x+14,y+2],[x+20,y+4],[x+24,y+7],[x+20,y+5],[x+15,y+4],[x+9,y+6],[x+5,y+12],[x+4,y+15]],17);line(x+4,y+11,x+8,y+6,6,2);line(x+8,y+6,x+14,y+3,6);}
function topping(i){tray();
if(i===0){ellipse(28,23,18,9,9);for(let j=0;j<24;j++){let x=12+(j*13)%29,y=12+(j*7)%17;line(x,y,x+5,y-3,8,2);line(x,y,x+5,y-3,j%3?12:7);}
poly([[4,16],[10,10],[15,12],[14,16],[6,28]],8);line(7,19,12,13,12,2);line(11,11,9,5,18,2);line(12,11,16,6,17,2);}
if(i===1){for(let j=0;j<18;j++){let x=8+(j*11)%33,y=10+(j*7)%16;poly([[x,y],[x+5,y-3],[x+9,y],[x+5,y+2],[x+2,y+5],[x-2,y+3]],j%2?17:4);line(x,y,x+4,y-1,5,2);}}
if(i===2){ellipse(26,24,19,9,8);ellipse(25,21,19,10,4);ellipse(24,19,18,10,5);for(let j=0;j<4;j++)ellipse(10+j*10,22+j%2*3,5,4,5);ellipse(28,18,9,7,8);ellipse(27,16,8,6,7);ellipse(26,15,6,4,6);ellipse(24,13,3,2,5);}
if(i===3){ellipse(29,24,18,10,8);for(let j=0;j<22;j++){let x=14+(j*13)%23,y=12+(j*7)%17;line(x,y,x+6,y-2,6,2);line(x+6,y-2,x+9,y,5);line(x+9,y,x+7,y+2,5);}poly([[4,17],[13,11],[17,15],[17,24],[4,26]],8);poly([[5,17],[13,13],[15,16],[5,20]],6);poly([[5,21],[15,17],[15,23],[5,24]],7);rect(8,20,2,2,8);rect(12,18,2,2,8);}
if(i===4){for(let j=0;j<12;j++){let x=9+(j*11)%31,y=10+(j*7)%15,k=j%2?5:-5;poly([[x,y],[x+3,y-1],[x+k+5,y+11],[x+k+1,y+12]],8);line(x,y,x+k+2,y+10,7,2);line(x,y,x+k,y+7,6);}}
if(i===5){for(let j=0;j<24;j++)kernel(8+j%6*6+Math.floor(j/6)%2*3,12+Math.floor(j/6)*5+j%3);}
if(i===6){ellipse(16,20,11,15,19);ellipse(16,19,9,13,17);ellipse(16,19,7,11,6);ellipse(16,23,5,6,9);ellipse(15,22,3,4,8);avocado(24,9);avocado(20,20);}
}
function maltin(){
ellipse(28,97,24,2,0);poly([[20,7],[35,7],[35,32],[38,39],[45,45],[49,53],[50,88],[47,96],[10,96],[6,90],[6,54],[10,44],[18,35]],0);
poly([[22,8],[33,8],[33,34],[36,41],[42,46],[46,54],[47,88],[44,94],[13,94],[9,88],[9,54],[13,46],[21,37]],10);
poly([[22,8],[33,8],[32,35],[35,40],[24,42],[20,37]],11);rect(23,10,3,26,12);rect(28,11,2,22,9);
poly([[15,47],[20,41],[22,44],[17,54],[16,84],[19,91],[13,90],[11,84],[12,56]],9);line(14,54,14,78,8,2);line(18,46,20,43,8,2);
rect(21,26,13,8,9);line(22,27,32,27,7);letters('M',25,29,6);rect(20,5,15,4,11);
poly([[20,1],[34,1],[36,6],[18,6]],8);rect(21,1,12,3,6);for(let j=0;j<9;j++)rect(19+j*2,4,1,3,j%2?7:6);
poly([[9,59],[45,53],[47,85],[11,89]],5);poly([[11,61],[43,55],[45,83],[13,87]],22);poly([[12,62],[43,56],[43,60],[12,68]],23);
letters('MALTIN',13,69,0,1,'left',5);letters('MALTIN',12,68,6,1,'left',5);
ellipse(29,80,8,7,5);ellipse(29,80,6,5,22);poly([[25,76],[29,75],[33,78],[32,83],[27,85],[23,81]],23);rect(27,77,3,6,5);
rect(17,91,21,1,9);rect(38,43,2,6,9);
}
function can(i){let col=i===1?22:21,dark=i===1?2:19,light=i===1?23:20;ellipse(20,56,17,3,0);rect(4,9,33,43,0);rect(5,10,31,42,dark);rect(7,11,25,40,col);rect(8,14,3,33,light);rect(31,13,3,37,dark);ellipse(20,10,15,4,4);ellipse(20,9,13,2,3);ellipse(20,8,8,1,4);rect(17,8,7,2,1);ellipse(20,52,15,3,3);line(8,53,31,53,4);
if(i===1){ellipse(20,30,11,11,5);poly([[10,24],[15,20],[22,20],[29,23],[29,27],[23,29],[17,28],[10,30]],12);poly([[10,32],[18,31],[23,33],[30,31],[28,38],[20,41],[14,39]],22);letters('PEPSI',9,44,5,1,'left',4);}
else{poly([[10,21],[29,18],[30,29],[24,41],[12,43]],19);letters('7',11,22,5,3);letters('UP',21,33,5,1);ellipse(30,22,4,4,11);ellipse(29,21,2,2,12);}
rect(8,15,2,5,5);}
function sausage(x,y,w,h,german=false){
 const shade=german?9:11,skin=german?8:12,shine=german?7:13;
 const radius=h/2;for(let row=0;row<=h;row++){const inset=Math.ceil(radius-Math.sqrt(Math.max(0,radius*radius-(row-radius)*(row-radius))));rect(x+inset,y+row,w-2*inset+1,1,10);if(row>0&&row<h)rect(x+inset+1,y+row,w-2*inset-1,1,shade);if(row>1&&row<h-4)rect(x+inset+2,y+row,w-2*inset-3,1,skin);}
 line(x+11,y+3,x+w-17,y+3,shine,2);line(x+17,y+5,x+35,y+5,shine);
 ellipse(x+5,y+Math.floor(h/2),3,Math.floor(h/2)-3,shade);line(x+4,y+Math.floor(h/2)-1,x+6,y+Math.floor(h/2)+1,skin);
 line(x+w-7,y+4,x+w-5,y+7,shine);line(x+w-5,y+h-5,x+w-8,y+h-3,shade);
 if(german){for(let j=0;j<5;j++){let xx=x+17+j*15;line(xx,y+3,xx+6,y+h-5,9,3);line(xx+1,y+4,xx+5,y+h-6,10);line(xx+4,y+3,xx+8,y+h-7,6);}for(let j=0;j<12;j++)rect(x+10+(j*19)%(w-19),y+5+j%3*3,1,1,9);}
}
function bun(base){
 poly([[3,28],[9,24],[119,24],[125,29],[119,35],[11,35]],4);line(12,34,117,34,5);
 ellipse(64,22,57,12,9);ellipse(64,20,55,11,8);ellipse(64,17,52,10,7);ellipse(64,15,48,8,6);
 poly([[12,18],[19,11],[34,9],[97,9],[112,13],[118,20],[109,26],[24,27]],9);
 line(21,12,37,10,5);line(40,10,92,10,5);
 if(base===0)sausage(16,7,98,15);
 if(base===1){sausage(14,2,96,11);sausage(20,16,96,11);}
 if(base===2)sausage(17,4,94,20,true);
 poly([[10,22],[16,22],[25,27],[42,29],[92,29],[109,25],[117,21],[120,26],[111,31],[96,33],[31,33],[16,29]],8);
 poly([[12,23],[18,24],[29,29],[43,31],[92,31],[108,27],[116,24],[114,28],[96,32],[33,32],[18,28]],7);
 line(30,29,44,31,6);line(44,31,91,31,6);line(96,30,110,26,6);
 for(let j=0;j<9;j++){let x=24+j*9,y=28+j%2*2;line(x,y,x+2,y-1,j%3?6:5);}
}
function foodExtra(i){
if(i===0)for(let j=0;j<31;j++){let x=11+(j*17)%104,y=9+(j*7)%12;line(x,y,x+6,y-2,9);line(x,y-1,x+6,y-3,j%2?8:7);}
if(i===1)for(let j=0;j<24;j++){let x=10+(j*19)%106,y=10+(j*7)%12;poly([[x,y],[x+4,y-3],[x+8,y-1],[x+6,y+2],[x+1,y+2]],17);line(x,y,x+5,y-1,5);}
if(i===2){ellipse(65,13,20,9,4);ellipse(65,11,19,9,5);ellipse(67,10,9,6,8);ellipse(66,9,8,5,7);ellipse(64,7,4,2,6);rect(62,6,3,1,5);}
if(i===3)for(let j=0;j<52;j++){let x=12+(j*13)%101,y=7+(j*11)%15;line(x,y,x+5,y-2,7);line(x+1,y-1,x+5,y-2,j%3?6:5);line(x+5,y-2,x+7,y,6);}
if(i===4)for(let j=0;j<19;j++){let x=13+(j*17)%100,y=8+(j*13)%12;line(x,y,x+6,y+3,8,3);line(x,y,x+6,y+3,7,2);line(x,y,x+5,y+2,6);}
if(i===5)for(let j=0;j<21;j++)kernel(16+(j*19)%96,8+(j*11)%13);
if(i===6)for(let j=0;j<3;j++)avocado(20+j*30,5+(j%2)*4);
}
function foodSauce(i){let col=sauces[i][3];
 if(i===3){for(let j=0;j<5;j++){let x=20+j*21;line(x,7,x+10,22,10,2);line(x,7,x+10,21,9);}return;}
 if(i===7){for(let j=0;j<7;j++){let x=19+j*15;ellipse(x,13,9,4,8);ellipse(x,12,8,3,7);line(x-5,11,x+3,11,6);line(x+4,14,x+4,20+j%3,7,3);}return;}
 if(i===1||i===4){for(let j=0;j<7;j++){let x=19+j*15;ellipse(x,11+j%2*5,5,3,sauces[i][2]);ellipse(x,10+j%2*5,4,2,col);}return;}
 for(let j=0;j<8;j++){let x=17+j*12,y=8+(i%3)*3;line(x,y+(j%2)*7,x+12,y+((j+1)%2)*7,sauces[i][2],3);line(x,y+(j%2)*7,x+12,y+((j+1)%2)*7,col,2);}
 if(i===5)for(let j=0;j<15;j++)rect(20+j*6,10+j%3*3,2,1,18);
}
function curly(state){
 poly([[27,69],[43,61],[58,62],[70,76],[74,108],[20,108]],0);poly([[29,72],[42,65],[56,66],[66,77],[69,106],[25,106]],22);poly([[27,82],[35,72],[37,107],[24,107]],2);
 poly([[42,59],[54,56],[55,69],[50,76],[41,69]],16);poly([[42,59],[50,60],[51,68],[47,72],[42,67]],15);
 line(36,71,39,91,0,4);line(58,70,56,94,0,4);poly([[36,85],[58,85],[66,108],[32,108]],1);rect(42,91,15,10,2);line(44,93,55,93,3);
 ellipse(48,37,20,29,10);ellipse(29,41,4,7,16);ellipse(66,41,4,7,16);poly([[32,24],[46,17],[62,27],[64,44],[57,63],[47,70],[36,60],[30,44]],16);poly([[34,26],[46,21],[59,28],[60,43],[54,61],[46,65],[37,57],[33,43]],15);
 for(let j=0;j<17;j++){let x=30+(j*13)%36,y=7+(j*11)%20;ellipse(x,y,6,6,10);ellipse(x-1,y-1,4,4,j%4?9:8);}poly([[31,18],[37,24],[36,34],[30,32]],9);
 line(36,33,42,31,10,2);line(52,31,59,34,10,2);
 if(state===1){line(36,40,39,37,10,2);line(39,37,42,40,10,2);line(52,40,55,37,10,2);line(55,37,58,40,10,2);}
 else{ellipse(39,40,4,3,5);ellipse(55,40,4,3,5);rect(40,39,2,4,10);rect(54,39,2,4,10);}
 poly([[47,35],[45,47],[50,50],[54,47],[50,44]],16);line(47,45,49,46,5);ellipse(35,47,3,2,13);ellipse(59,47,3,2,13);
 if(state===2){line(35,32,43,36,10,2);line(51,36,59,32,10,2);ellipse(48,57,5,5,10);ellipse(48,58,2,3,11);}
 else{poly([[38,52],[49,54],[59,51],[55,61],[47,65],[40,60]],10);poly([[40,54],[49,56],[56,54],[53,58],[43,58]],5);line(45,61,51,61,13,2);}
 poly([[26,83],[34,87],[33,95],[43,101],[41,109],[27,104],[20,96]],9);poly([[26,85],[32,88],[30,95],[39,102],[37,105],[28,101],[23,95]],15);
 if(state===1){poly([[65,83],[71,85],[79,64],[84,66],[81,95],[73,106],[65,101]],9);poly([[68,85],[72,91],[80,69],[81,78],[77,96],[71,101],[66,97]],15);ellipse(80,61,6,7,16);ellipse(79,60,5,6,15);line(77,57,82,57,16);}
 else{poly([[64,83],[72,85],[76,97],[70,106],[55,107],[49,102],[53,97],[64,96]],9);poly([[65,86],[69,87],[72,97],[67,102],[56,104],[52,102],[55,99],[66,99]],15);}
 if(state===3){drop(65,28,23);line(36,32,43,34,10,2);}
}
function cook(which,happy){if(which){curly(happy);return;}const state=happy;happy=state===1;let shirt=21,shade=19,shine=20;
poly([[8,75],[23,65],[32,62],[57,62],[71,69],[82,80],[86,107],[3,107]],0);
poly([[12,76],[25,68],[36,65],[57,66],[74,75],[80,103],[8,103]],shirt);poly([[13,80],[25,70],[27,95],[19,106],[7,102]],shade);poly([[65,72],[74,78],[80,103],[69,102]],shade);
poly([[32,64],[33,73],[44,83],[57,74],[57,64]],9);poly([[34,62],[35,72],[44,77],[54,71],[54,60]],15);
poly([[24,70],[32,66],[39,77],[34,83]],shine);poly([[57,67],[64,72],[56,84],[47,78]],shine);
rect(27,76,5,27,0);rect(58,77,5,27,0);poly([[29,90],[61,90],[65,108],[25,108]],1);rect(35,93,21,11,2);line(37,95,53,95,3);
ellipse(44,39,27,32,10);ellipse(20,43,5,9,9);ellipse(68,43,5,9,9);ellipse(20,41,4,7,15);ellipse(68,41,4,7,16);
ellipse(44,41,24,30,16);ellipse(42,37,22,27,15);ellipse(36,36,15,20,15);poly([[58,24],[66,33],[64,52],[56,64],[52,60],[58,47]],16);
ellipse(27,45,5,4,13);ellipse(59,46,5,4,13);
if(which){for(let j=0;j<22;j++){let x=21+(j*13)%47,y=10+(j*7)%19;ellipse(x,y,6,6,10);ellipse(x-1,y-1,4,4,j%3?9:8);}poly([[24,20],[33,20],[34,27],[25,29]],9);line(28,58,33,65,9,2);line(55,62,60,55,9,2);}
else{poly([[17,20],[22,8],[37,3],[56,4],[66,10],[70,22]],0);poly([[20,18],[25,10],[39,6],[55,7],[63,13],[66,20]],shade);poly([[22,17],[27,11],[42,8],[57,9],[62,17]],shirt);line(28,11,49,8,shine,2);poly([[12,21],[23,18],[69,19],[77,23],[74,27],[24,27],[12,25]],0);poly([[15,21],[24,20],[66,21],[72,24],[29,25],[16,24]],shirt);rect(35,11,19,8,7);line(39,15,49,15,11,2);line(38,17,51,17,6);}
line(28,32,37,31,10,2);line(51,31,60,33,10,2);
if(happy){line(28,39,32,36,10,2);line(32,36,36,39,10,2);line(51,39,55,36,10,2);line(55,36,59,39,10,2);}else{ellipse(32,39,5,3,5);ellipse(55,39,5,3,5);rect(32,37,3,5,10);rect(53,37,3,5,10);rect(32,37,1,1,5);rect(53,37,1,1,5);}
poly([[43,37],[40,48],[42,51],[48,51],[51,47],[47,45],[46,37]],16);poly([[43,38],[42,47],[46,48],[48,46],[45,41]],15);rect(44,47,3,1,5);
ellipse(44,58,12,happy?8:6,10);ellipse(44,62,7,3,11);poly([[34,54],[43,56],[55,54],[53,59],[39,60]],5);rect(40,62,8,2,13);
if(!which){ellipse(37,51,8,4,10);ellipse(51,51,8,4,10);poly([[27,51],[31,52],[37,50],[37,54],[30,55]],9);poly([[52,50],[57,52],[62,51],[59,55],[52,54]],9);line(35,50,40,49,9);line(47,49,53,50,9);}
line(33,65,42,69,16,2);line(43,69,54,65,16,2);
poly([[9,86],[21,85],[28,91],[39,96],[43,104],[36,111],[17,108],[7,100]],9);poly([[10,87],[21,87],[27,93],[36,97],[38,104],[34,107],[18,105],[9,99]],15);line(13,96,23,99,16,2);
poly([[68,86],[78,88],[83,98],[79,106],[60,110],[49,106],[50,100],[62,96]],9);poly([[68,88],[75,89],[80,98],[76,103],[59,107],[52,104],[54,101],[64,99]],15);
for(let j=0;j<4;j++){line(27+j*3,100,28+j*3,105,16);line(54+j*3,101,54+j*3,105,16);}
if(!which){poly([[68,67],[77,71],[77,89],[69,89]],4);rect(70,72,5,14,5);rect(70,82,5,2,11);}
if(state===2){line(27,31,38,35,10,3);line(50,35,62,31,10,3);ellipse(44,59,12,7,15);line(35,60,40,57,10,2);line(40,57,52,59,10,2);}
if(state===3){drop(69,30,23);line(28,32,38,35,10,2);}
}
function grater(frame){let dy=frame%2*2;poly([[26,13],[47,14],[55,49],[31,49]],0);poly([[28,15],[45,16],[52,46],[33,46]],3);poly([[29,15],[36,15],[40,46],[33,46]],4);line(30,15,46,16,5);for(let j=0;j<24;j++){let x=32+j%4*4,y=21+Math.floor(j/4)*4;rect(x,y,2,2,1);rect(x+1,y-1,1,1,5);}poly([[33,10],[38,4],[43,5],[47,12]],3);line(36,10,39,6,5,2);poly([[6,13+dy],[21,7+dy],[34,13+dy],[29,23+dy],[10,21+dy]],8);poly([[9,13+dy],[21,10+dy],[30,14+dy],[26,21+dy],[11,19+dy]],6);for(let j=0;j<3;j++)rect(15+j*4,15+dy,2,2,7);
poly([[0,8+dy],[8,7+dy],[13,12+dy],[11,22+dy],[4,24+dy],[0,20+dy]],16);poly([[0,9+dy],[7,9+dy],[10,13+dy],[8,21+dy],[3,21+dy],[0,18+dy]],15);poly([[48,41],[54,37],[63,42],[67,50],[65,57],[60,56],[57,48],[52,48]],16);poly([[50,41],[54,40],[61,44],[65,51],[63,53],[58,46],[53,46]],15);
for(let j=0;j<13;j++){let x=31+(j*7)%23,y=49+(j*5+frame*3)%14;line(x,y,x+3,y-1,j%2?5:6);}}
const customers=[['rumbera','LA RUMBERA'],['motorizado','EL MOTORIZADO'],['oficinista','LA OFICINISTA'],['cancha','EL DE LA CANCHA']];
function customer(kind,mood){
 const skin=kind===0?16:15,shade=kind===0?9:16,shirt=[14,8,5,11][kind],cx=kind===1?45:43;
 if(kind===0){for(let j=0;j<17;j++){let x=21+(j*17)%47,y=18+(j*11)%39;ellipse(x,y,10,10,10);ellipse(x-2,y-2,7,7,9);}ellipse(44,22,26,18,10);}
 if(kind===2){ellipse(43,16,16,13,10);ellipse(49,7,11,7,9);ellipse(46,6,6,4,8);}
 poly([[12,80],[26,69],[35,66],[54,66],[69,72],[79,89],[79,109],[8,109]],0);poly([[14,81],[28,72],[36,70],[52,69],[66,75],[75,89],[75,106],[12,106]],shirt);
 if(kind===1){poly([[13,79],[24,73],[27,106],[12,106]],2);poly([[63,73],[73,82],[75,106],[64,106]],2);rect(29,82,28,20,9);line(40,79,40,106,7,2);rect(17,85,6,17,23);rect(65,85,6,17,23);}
 if(kind===3){poly([[16,79],[27,72],[27,95],[14,95]],8);poly([[62,72],[73,81],[75,96],[63,96]],8);letters('10',34,81,6,3);}
 poly([[34,60],[54,60],[54,71],[44,80],[34,72]],shade);poly([[37,61],[50,61],[50,70],[43,74],[37,69]],skin);
 if(kind===2){poly([[28,72],[36,67],[43,77],[36,88]],4);poly([[52,67],[61,73],[53,89],[45,77]],4);line(45,82,45,104,3);for(let j=0;j<3;j++)rect(46,86+j*7,1,1,3);}
 const rx=kind===1?24:kind===3?21:22;
 ellipse(cx,41,rx+2,29,10);ellipse(cx-rx,44,4,6,shade);ellipse(cx+rx,44,4,6,shade);ellipse(cx,42,rx,27,shade);ellipse(cx-2,39,rx-2,25,skin);
 if(kind===0){poly([[20,35],[26,21],[42,17],[64,26],[67,38],[55,28],[45,26],[34,31],[26,38]],10);ellipse(21,51,4,6,7);ellipse(66,51,4,6,7);ellipse(21,51,2,4,0);ellipse(66,51,2,4,0);line(28,31,36,29,10,2);line(49,29,58,31,10,2);}
 if(kind===1){poly([[16,33],[18,18],[29,7],[47,4],[63,10],[74,23],[73,43],[66,48],[65,29],[25,28],[23,47],[15,43]],0);poly([[19,30],[22,18],[32,10],[47,7],[61,13],[70,24],[69,33]],8);poly([[25,20],[34,13],[47,10],[59,15],[64,22],[47,18]],7);poly([[17,30],[71,30],[68,40],[22,40]],2);line(24,32,48,32,23,2);line(52,32,63,32,3,2);line(21,47,27,63,0,3);line(65,47,60,63,0,3);}
 if(kind===2){poly([[19,36],[22,22],[34,17],[50,18],[64,26],[67,40],[60,31],[54,26],[29,33],[23,43]],9);line(27,35,37,34,10,2);line(50,34,59,35,10,2);}
 if(kind===3){poly([[19,25],[25,12],[39,8],[56,10],[64,20],[65,28],[19,29]],0);poly([[23,22],[28,15],[40,11],[54,13],[60,22]],21);line(29,16,40,13,20,2);poly([[19,26],[64,24],[73,28],[70,32],[20,30]],19);rect(39,15,12,6,6);}
 if(kind!==1){if(mood===2){line(29,42,33,39,10,2);line(33,39,37,42,10,2);line(49,42,53,39,10,2);line(53,39,57,42,10,2);}else{ellipse(33,42,4,3,5);ellipse(53,42,4,3,5);rect(mood===1?35:32,40,2,4,10);rect(mood===1?55:52,40,2,4,10);}if(kind===2){for(let xx of [25,46]){rect(xx,37,15,1,10);rect(xx,46,15,1,10);rect(xx,38,1,8,10);rect(xx+14,38,1,8,10);}line(40,40,46,40,10);}}
 poly([[43,39],[40,48],[44,51],[48,48],[45,45]],shade);line(42,48,45,48,skin);
 if(mood===2){ellipse(44,58,11,8,10);poly([[35,54],[53,54],[51,59],[38,59]],5);line(40,63,47,63,13,2);}
 else if(mood===3){line(32,33,38,36,10,2);line(48,36,57,33,10,2);line(35,60,43,56,10,2);line(43,56,53,59,10,2);}
 else if(mood===1){line(35,58,52,58,10,2);line(53,55,55,60,shade);}
 else{line(36,56,41,59,10);line(41,59,49,59,10);line(49,59,53,56,10);}
 if(kind===0){line(36,57,42,59,mood===3?9:11,2);if(mood===0)line(42,59,50,57,11,2);}
 if(mood===2){poly([[64,88],[69,92],[74,71],[79,72],[78,96],[69,107],[62,101]],shade);poly([[65,89],[69,97],[76,75],[77,84],[74,97],[68,102]],skin);ellipse(77,68,6,7,shade);ellipse(76,67,5,6,skin);poly([[69,68],[69,59],[71,55],[74,57],[73,64],[75,67],[74,72]],skin);for(let j=0;j<3;j++)line(77,64+j*3,81,64+j*3,shade);}
 else{poly([[64,87],[74,90],[77,100],[68,107],[49,105],[49,99],[64,98]],shade);poly([[66,89],[71,92],[74,99],[67,103],[53,102],[54,100],[66,100]],skin);}
 poly([[13,89],[23,87],[28,96],[39,99],[42,105],[36,109],[20,104],[12,98]],shade);poly([[15,90],[22,90],[25,98],[37,101],[37,106],[21,101],[15,97]],skin);
 if(mood===1){rect(30,97,7,8,0);rect(31,98,5,5,23);line(33,98,33,100,5);line(33,100,35,100,5);}
}
function create(){if(sprites['base/normal'])return sprites;
for(let i=0;i<8;i++){make('sauce/'+sauces[i][0],40,56,()=>bottle(i));make('layer/sauce/'+sauces[i][0],128,36,()=>foodSauce(i));}
for(let i=0;i<7;i++){make('extra/'+extras[i][0],52,40,()=>topping(i));make('layer/extra/'+extras[i][0],128,36,()=>foodExtra(i));}
for(let i=0;i<3;i++)make('base/'+bases[i][0],128,36,()=>bun(i));
make('drink/malta',56,100,maltin);make('drink/pepsi',40,60,()=>can(1));make('drink/7up',40,60,()=>can(2));
for(let id of ['malta','pepsi','7up'])make('thumb/drink/'+id,28,48,()=>g.drawImage(sprites['drink/'+id],0,0,28,48));
for(let p=0;p<2;p++)for(let m=0;m<4;m++)make('cook/'+p+'/'+m,88,112,()=>cook(p,m));
for(let p=0;p<4;p++)for(let m=0;m<4;m++)make('customer/'+p+'/'+m,88,112,()=>customer(p,m));
for(let f=0;f<4;f++)make('grater/'+f,68,64,()=>grater(f));return sprites;}
function paint(ctx,id,x,y,scale=1){const s=sprites[id];if(s){ctx.imageSmoothingEnabled=false;ctx.drawImage(s,Math.round(x),Math.round(y),s.width*scale,s.height*scale);}}
function food(ctx,x,y,plate,scale=1){paint(ctx,'base/'+(plate.base||'normal'),x,y,scale);for(let id of ['repollo','zanahoria','papitas','maiz-dulce'])if(plate.extras?.includes(id))paint(ctx,'layer/extra/'+id,x,y,scale);for(let id of plate.sauces||[])paint(ctx,'layer/sauce/'+id,x,y,scale);for(let id of ['aguacate','huevo','queso-rallado'])if(plate.extras?.includes(id))paint(ctx,'layer/extra/'+id,x,y,scale);}
function text(ctx,str,x,y,col=5,s=2,align='left'){const old=g;g=ctx;letters(str,x,y,col,s,align);g=old;}
return {palette,sauces,extras,bases,drinks,customers,create,paint,food,text,sprites};
})();

function createDalePerroView(canvas){
const art=DalePerroArt;art.create();const p=art.palette;
canvas.width=800;canvas.height=600;
const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
const names=Object.fromEntries([...art.sauces,...art.extras,...art.bases,...art.drinks].map(a=>[a[0],a[1]]));
const orders=[0,1].map(()=>({base:'normal',sauces:[],extras:[],drink:null}));
const players=[0,1].map(n=>({focus:n?7:0,time:45,base:'normal',sauces:[],extras:[],drink:null,effect:0,damage:0,cheese:0,delta:0}));
let active=0;const buttons=[];const meta={live:false,remaining:90,reducedMotion:false};
players.forEach((q,n)=>Object.assign(q,{customer:n,patience:1,combo:0,served:0,message:'',preps:[],arriving:0,guide:false}));
const rows=[art.sauces.map(a=>({id:a[0],type:'sauce'})),art.extras.map(a=>({id:a[0],type:'extra'})),[...art.bases.map(a=>({id:a[0],type:'base'})),...art.drinks.map(a=>({id:a[0],type:'drink'}))]];
for(let row=0;row<rows.length;row++)for(let col=0;col<rows[row].length;col++){
 const it=rows[row][col];Object.assign(it,{row,col,index:buttons.length});
 if(row===0)Object.assign(it,{x:5+col*99,y:327,w:97,h:85});
 if(row===1)Object.assign(it,{x:5+col*113,y:427,w:111,h:69});
 if(row===2)Object.assign(it,{x:5+col*132,y:511,w:130,h:65});buttons.push(it);
}
function r(x,y,w,h,col){c.fillStyle=p[col]||col;c.fillRect(Math.round(x),Math.round(y),w,h);}
function tx(str,x,y,col=5,s=2,align='left'){art.text(c,str,x,y,col,s,align);}
function panel(x,y,w,h,fill=1,edge=3){r(x,y,w,h,edge);r(x+2,y+2,w-4,h-4,fill);}
function check(x,y,col){r(x,y+4,2,3,col);r(x+2,y+6,2,3,col);r(x+4,y+4,2,3,col);r(x+6,y+2,2,3,col);}
const background=document.createElement('canvas');background.width=800;background.height=600;
function backgroundDraw(){
 r(0,0,800,600,0);r(0,57,800,260,1);
 for(let i=0;i<100;i++){let x=i*8,y=129+Math.round(Math.sin(i*.1)*15+Math.sin(i*.23)*6);r(x,y,8,120,19);}
 for(let i=0;i<25;i++){let x=i*34,h=28+(i*31)%61;r(x,243-h,29,h,0);for(let j=0;j<12;j++)if((i+j)%3)r(x+4+j%3*8,249-h+Math.floor(j/3)*12,3,4,(i+j)%5?3:7);}
 for(let n=0;n<2;n++){const x=n*400,col=n?11:21;
  r(x+4,62,392,14,col);for(let k=0;k<12;k++){r(x+5+k*33,64,17,10,n?8:20);r(x+7+k*33,76,28,4,col);r(x+11+k*33,80,20,3,col);}
  panel(x+107,82,282,16,0,n?8:20);tx(n?'RULO EXPRESS':'EL RESUELVE',x+248,85,6,2,'center');
  r(x+6,82,3,233,3);r(x+391,82,3,233,3);
  for(let k=0;k<3;k++){let cx=x+15+k*30;r(cx,214,12,14,2);r(cx+2,202,8,13,2);r(cx-3,222,18,14,2);}
  r(x+11,233,378,79,3);r(x+11,234,378,3,4);r(x+11,238,378,3,2);r(x+11,310,378,5,0);
  r(x+105,243,270,61,9);r(x+108,246,264,57,8);r(x+110,248,260,53,7);
  panel(x+15,84,79,13,0,col);tx(n?'SIN MAL DE OJO':'ECHALE DE TODO',x+54,88,6,1,'center');
 }
 r(396,57,8,260,0);
 r(0,0,800,55,0);r(0,54,800,2,7);tx('DALE PERRO',402,9,9,4,'center');tx('DALE PERRO',400,7,6,4,'center');tx('CARACAS / 3 AM',400,36,20,2,'center');
 r(0,317,800,263,1);for(let y of [325,425,509,578])r(0,y,800,1,3);
 tx('SALSAS',8,318,4,1);tx('EXTRAS',8,418,4,1);tx('BASES',8,502,4,1);tx('BEBIDAS',404,502,4,1);
 tx('CURSOR: P1 / P2     AGREGADO: MARCA AZUL / ROJA',788,318,4,1,'right');
 background.getContext('2d').drawImage(canvas,0,0);
}
function has(who,it){const q=players[who];return it.type==='sauce'?q.sauces.includes(it.id):it.type==='extra'?q.extras.includes(it.id):q[it.type]===it.id;}
function marker(who,x,y){r(x,y,25,15,who?12:23);tx('P'+(who+1),x+3,y+2,0,2);}
function drawItem(it){
 panel(it.x,it.y,it.w,it.h,0,2);const cx=it.x+it.w/2;
 if(it.type==='sauce')art.paint(c,'sauce/'+it.id,cx-20,it.y+1);
 if(it.type==='extra')art.paint(c,'extra/'+it.id,cx-26,it.y+1);
 if(it.type==='base')art.paint(c,'base/'+it.id,it.x+1,it.y+6);
 if(it.type==='drink')art.paint(c,'thumb/drink/'+it.id,cx-14,it.y+1);
 const label=names[it.id],lines=it.id==='mostaza-miel'?['MOSTAZA','CON MIEL']:it.id==='ajo-perejil'?['AJO CON','PEREJIL']:it.id==='queso-rallado'?['QUESO','RALLADO']:[label];
 const labelY=it.y+(it.type==='sauce'?57:it.type==='extra'?41:49);
 lines.forEach((str,j)=>tx(str,cx,labelY+j*13,5,2,'center'));
 for(let n=0;n<2;n++){const q=players[n],need=(meta.mode!==1||n===0)&&orderItems(n).find(o=>!has(n,o));if(need&&need.id===it.id)tx(n?'<':'>',it.x+(n?it.w-12:4),it.y+29,6,2);}
 for(let n=0;n<2;n++){
  if(has(n,it))check(it.x+(n?it.w-12:4),it.y+(it.type==='base'?3:20),n?12:23);
  if(players[n].focus===it.index){c.strokeStyle=p[n?12:23];c.lineWidth=2;
   if(n){for(let [a,b,sx,sy]of[[it.x+3,it.y+3,1,1],[it.x+it.w-3,it.y+3,-1,1],[it.x+3,it.y+it.h-3,1,-1],[it.x+it.w-3,it.y+it.h-3,-1,-1]]){c.beginPath();c.moveTo(a+sx*10,b);c.lineTo(a,b);c.lineTo(a,b+sy*10);c.stroke();}}
   else c.strokeRect(it.x+1,it.y+1,it.w-2,it.h-2);
   marker(n,it.x+(n?it.w-27:2),it.y+2);
  }
 }
}
function orderItems(n){const o=orders[n];return[{type:'base',id:o.base},...o.sauces.map(id=>({type:'sauce',id})),...o.extras.map(id=>({type:'extra',id})),{type:'drink',id:o.drink}];}
function surplus(n){const q=players[n],o=orders[n];return q.sauces.filter(id=>!o.sauces.includes(id)).length+q.extras.filter(id=>!o.extras.includes(id)).length+(q.base!==o.base?1:0)+(q.drink&&q.drink!==o.drink?1:0);}
function drawPlayer(n,t){
 const q=players[n],x=n*400,col=n?12:23,o=orderItems(n),ready=o.every(it=>has(n,it))&&!surplus(n);
 marker(n,x+(n?367:12),9);tx(String(Math.ceil(q.time)).padStart(2,'0'),n?681:54,7,q.time<10?6:col,4);tx('SEG',n?729:103,24,4,1);
 r(n?620:12,43,168,5,2);r(n?620:12,43,Math.min(168,q.time/75*168),5,col);
 if(q.effect>0||q.damage>0)tx((q.delta>=0?'+':'')+(Number.isInteger(q.delta)?q.delta:q.delta.toFixed(1))+' S',n?630:160,13,q.delta>=0?17:12,2,'center');
 const state=q.damage>0?3:q.effect>0?2:q.patience<.3?1:0;
 const leaving=q.effect>0&&q.wait<400?(400-q.wait)/400*90:0,entering=q.arriving/400*80;
 c.save();c.beginPath();c.rect(x+10,101,90,112);c.clip();art.paint(c,'customer/'+q.customer+'/'+state,x+12+(meta.reducedMotion?0:Math.round(-leaving-entering+(q.hit>0?Math.sin(t/45)*5:q.damage>0?Math.sin(t/55)*2:0))),101);
 if(q.effect>0&&q.deliveryCanvas)c.drawImage(q.deliveryCanvas,x+23-(meta.reducedMotion?0:Math.round(leaving)),185,64,18);c.restore();
 r(x+14,84,82,13,0);tx(art.customers[q.customer][1],x+55,88,6,1,'center');r(x+15,98,80,3,2);r(x+15,98,Math.max(0,Math.floor(q.patience*80)),3,q.patience<.3?12:20);
 panel(x+110,102,277,96,5,ready||q.effect>0?20:8);r(x+112,104,273,12,8);tx('PEDIDO / P'+(n+1),x+118,107,5,1);tx(q.effect>0?(q.combo%3===0?'RACHA! +8 S':'RESUELVE!'):ready?'LISTO / SALE SOLO':'BUSCA LO MARCADO',x+379,107,ready?19:5,1,'right');
 o.forEach((it,j)=>{let y=121+j*15;panel(x+118,y,11,11,5,8);if(has(n,it))check(x+119,y,19);tx(names[it.id]||'SIN BEBIDA',x+137,y,9,2);});
 const progress=o.filter(it=>has(n,it)).length/o.length;r(x+112,194,273,3,7);r(x+112,194,Math.floor(273*progress),3,ready||q.effect>0?20:8);
 const urgent=q.patience<.2&&q.wait<=0;const fallback=q.errorTime>0?q.message:surplus(n)?correction(n):ready?'LISTO! SALE SOLO.':q.guide?correction(n):'ECHALE SIN MIEDO';const speech=urgent?'ME VOY EN '+Math.ceil((22000-q.age)/1000)+' S!\n'+(ready?'LISTO! SALE SOLO.':correction(n)):q.speechTime>0?q.speech:fallback;
 panel(x+110,200,277,36,0,3);tx(urgent?art.customers[q.customer][1]:q.speechTime>0?q.speaker:'TU PUESTO',x+118,201,4,1);wrap(speech).forEach((line,j)=>tx(line,x+115,209+j*13,q.speechTime>0?6:5,2));
 
 const shift=q.effect>0&&!meta.reducedMotion?Math.floor(Math.sin((1100-q.effect)/1100*Math.PI)*14):0;
 c.save();c.beginPath();c.rect(x+100,236,285,78);c.clip();const pending=q.preps.filter(a=>a.added&&a.left>140),plate={...q,sauces:q.sauces.filter(id=>!pending.some(a=>a.id===id&&a.type==='sauce')),extras:q.extras.filter(id=>!pending.some(a=>a.id===id&&a.type==='extra'))};art.food(c,x+112+shift,239,meta.reducedMotion?q:plate,2);
 if(!meta.reducedMotion)for(const a of pending){const progress=1-a.left/420;if(a.type==='extra')art.paint(c,'layer/extra/'+a.id,x+112,239-Math.round((1-progress)*19),2);if(a.type==='sauce'){c.save();c.translate(x+193+Math.floor(progress*40),261);c.rotate(-Math.PI/2);art.paint(c,'sauce/'+a.id,-20,-28);c.restore();r(x+208+Math.floor(progress*40),272,3,Math.max(1,Math.floor(progress*15)),art.sauces.find(s=>s[0]===a.id)[3]);}}
 c.restore();
 if(q.drink){const id='drink/'+q.drink,s=art.sprites[id];art.paint(c,id,x+55-Math.floor(s.width/2),312-s.height);}
 if(!meta.reducedMotion&&q.preps.some(a=>a.type==='drink'&&a.added)){for(let j=0;j<3;j++)r(x+42+j*7,211-j*4,2,2,5);}
 if(q.cheese>0&&!meta.reducedMotion)art.paint(c,'grater/'+Math.floor(t/80)%4,x+209,242);
 if(q.effect>0&&!meta.reducedMotion){for(let k=0;k<8;k++){let f=(1100-q.effect)/1100,xx=x+120+k*30,yy=263-Math.floor(f*27)+k%3*5;r(xx,yy,2,2,k%2?6:5);}}
 if(q.damage>0||urgent)r(x+108,237,277,2,12);if(q.errorTime>0&&q.message==='RIVAL: -3 S'){r(x+107,82,282,16,0);tx(n?'RULO: ME QUITASTE CLIENTELA!':'PANA, ESA VENTA ERA MIA!',x+248,85,12,1,'center');}if(q.hit>0){c.strokeStyle=p[12];c.lineWidth=2;c.strokeRect(n?676:49,3,48,30);}
 if(meta.live){tx('VENTAS '+q.served,n?620:12,33,4,1);tx('RACHA '+q.combo+(q.combo%3===2?' / SIG +8':''),n?788:180,33,q.combo%3===2?6:4,1,'right');for(let i=0;i<3;i++)r((n?747:139)+i*9,40,6,2,i<(q.effect>0&&q.combo>0&&q.combo%3===0?3:q.combo%3)?6:3);}
}
function draw(t=0){c.imageSmoothingEnabled=false;c.drawImage(background,0,0);drawPlayer(0,t);drawPlayer(1,t);buttons.forEach(drawItem);
 if(meta.attack?.life>0){const a=meta.attack,from=a.from?607:193,to=a.from?193:607,f=1-a.life/550,pos=meta.reducedMotion?(from+to)/2:Math.round(from+(to-from)*f);r(Math.min(from,pos),51,Math.abs(pos-from),1,12);r(pos-2,49,5,5,6);}if(meta.live){r(299,34,203,15,0);tx((meta.remaining<=10?'CIERRA! ':'RONDA ')+Math.ceil(meta.remaining)+' S',400,36,meta.remaining<=10?6:20,2,'center');}
 r(0,581,800,19,0);tx('P1 PALANCA / B1 / SALE SOLO',8,585,23,2);tx(meta.mode===1?'RIVAL CPU / B2: MANUAL':'P2 PALANCA / B1 / SALE SOLO',792,585,12,2,'right');
}
function select(who,index){players[who].focus=index;active=who;}
function move(who,dx,dy){const current=buttons[players[who].focus];let target;if(dy){const row=(current.row+dy+rows.length)%rows.length;target=rows[row].reduce((a,b)=>Math.abs((b.x+b.w/2)-(current.x+current.w/2))<Math.abs((a.x+a.w/2)-(current.x+current.w/2))?b:a);}else target=rows[current.row][(current.col+dx+rows[current.row].length)%rows[current.row].length];select(who,target.index);}
function toggle(who){const it=buttons[players[who].focus],q=players[who];if(it.type==='sauce'||it.type==='extra'){let list=it.type==='sauce'?q.sauces:q.extras;const i=list.indexOf(it.id);if(i>=0){list.splice(i,1);if(it.id==='queso-rallado')q.cheese=0;}else{list.push(it.id);if(it.id==='queso-rallado')q.cheese=640;}}else if(it.type==='base')q.base=it.id;else q.drink=q.drink===it.id?null:it.id;
q.preps=q.preps.filter(a=>a.id!==it.id||a.type!==it.type);if(has(who,it)){q.preps.push({id:it.id,type:it.type,added:true,left:420});if(q.preps.length>5)q.preps.shift();}}
function wrap(text){let lines=[],line='';for(const block of String(text||'').split('\n')){for(const word of block.split(' ')){if((line+' '+word).trim().length>27){lines.push(line);line=word;}else line=(line+' '+word).trim();}if(line)lines.push(line);line='';}return lines.slice(0,2);}
function correction(n){const q=players[n],o=orders[n];if(q.base!==o.base)return 'CAMBIA A '+names[o.base];const extra=buttons.find(it=>(it.type==='sauce'||it.type==='extra')&&has(n,it)&&!(it.type==='sauce'?o.sauces:o.extras).includes(it.id));if(extra)return 'QUITA '+names[extra.id];if(q.drink&&q.drink!==o.drink)return 'QUITA '+names[q.drink];const need=orderItems(n).find(it=>!has(n,it));return need?'FALTA '+names[need.id]:'2: SIRVE EL PEDIDO!';}
function step(t,dt){if(meta.attack)meta.attack.life=Math.max(0,meta.attack.life-dt);for(let q of players){if(q.effect>0||q.damage>0||q.cheese>0||q.arriving>0||q.hit>0||q.preps.length){q.effect=Math.max(0,q.effect-dt);q.damage=Math.max(0,q.damage-dt);q.cheese=Math.max(0,q.cheese-dt);q.arriving=Math.max(0,q.arriving-dt);q.hit=Math.max(0,(q.hit||0)-dt);for(const a of q.preps)a.left-=dt;q.preps=q.preps.filter(a=>a.left>0);}}}
backgroundDraw();draw();
return{players,orders,buttons,draw,move,toggle,select,has,orderItems,surplus,correction,wrap,step,meta,context:c,setActive(n){active=n;},getActive(){return active;},canvas};
}


function createDalePerroSound(){
let ctx,master,music,ambient,fx,noise,next=0,step=0,street=0,active=false,mute=false,musicOff=false,lastLevel='',tempo=96;
const stats={musicEvents:0,effectEvents:0,ambientEvents:0};
function init(){if(ctx)return;try{ctx=new(window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();music=ctx.createGain();ambient=ctx.createGain();fx=ctx.createGain();master.gain.value=.65;music.gain.value=0;ambient.gain.value=0;fx.gain.value=.4;music.connect(master);ambient.connect(master);fx.connect(master);master.connect(ctx.destination);
noise=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);let a=noise.getChannelData(0),seed=87123;for(let i=0;i<a.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;a[i]=(seed/2147483648-1)*.7;}
for(const[f,g]of[[1900,.012],[360,.006]]){let s=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();s.buffer=noise;s.loop=true;filter.type='bandpass';filter.frequency.value=f;filter.Q.value=f>1000?.5:1.4;gain.gain.value=g;s.connect(filter);filter.connect(gain);gain.connect(ambient);s.start();}stats.ambientEvents+=2;
}catch{ctx=null;}}
function envelope(bus,t,length,volume){const gain=ctx.createGain();gain.gain.setValueAtTime(.0001,t);gain.gain.linearRampToValueAtTime(volume,t+.008);gain.gain.exponentialRampToValueAtTime(.0001,t+length);gain.connect(bus);return gain;}
function note(bus,t,midi,length,volume,type='triangle',slide){let o=ctx.createOscillator(),g=envelope(bus,t,length,volume),f=440*Math.pow(2,(midi-69)/12);o.type=type;o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t+length);o.connect(g);o.onended=()=>{o.disconnect();g.disconnect();};o.start(t);o.stop(t+length+.015);}
function hiss(bus,t,length,volume,f=2200,type='bandpass'){let s=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),g=envelope(bus,t,length,volume);s.buffer=noise;filter.type=type;filter.frequency.value=f;filter.Q.value=.7;s.connect(filter);filter.connect(g);s.onended=()=>{s.disconnect();filter.disconnect();g.disconnect();};s.start(t,(step*.071)%Math.max(.1,noise.duration-length));s.stop(t+length);}
function start(){init();if(!ctx)return;ctx.resume().catch(()=>{});next=ctx.currentTime+.035;street=ctx.currentTime+8;step=0;active=false;}
function settings(allMuted,musicMuted){mute=allMuted;musicOff=musicMuted;lastLevel='';if(ctx)master.gain.setTargetAtTime(mute?0:.65,ctx.currentTime,.015);}
function update(playing,urgency,combo){if(!ctx)return;const lobby=playing==='menu',audible=playing===true||lobby,t=ctx.currentTime,level=[playing,mute,musicOff].join('/');if(level!==lastLevel){master.gain.setTargetAtTime(mute?0:.65,t,.015);music.gain.setTargetAtTime(audible&&!musicOff?(lobby?.3:.65):0,t,.04);ambient.gain.setTargetAtTime(playing===true?.6:0,t,.05);lastLevel=level;}
if(!audible){active=false;return;}if(!active){next=t+.03;active=true;}tempo=lobby?84:urgency?124:combo>=3?104:96;if(mute||ctx.state!=='running'){next=t+.03;return;}if(next<t-.2)next=t+.02;
while(next<t+.12){const k=step%16,bar=Math.floor(step/16)%4;if(!musicOff){
const roots=[45,50,43,52],melody=[69,-1,72,76,74,-1,72,69,67,-1,69,72,76,74,72,-1];
if([0,6,8,14].includes(k))note(music,next,roots[bar]+(k===14?7:0),.2,.14,'triangle');
if(k===0||k===8)note(music,next,38,.12,.16,'sine',38);
if(k===4||k===12)hiss(music,next,.07,.085,1600);
if([0,3,6,8,10,13].includes(k))hiss(music,next,.035,.045,6500,'highpass');
if([3,7,10,14].includes(k))note(music,next,83,.045,.03,'sine');
if(melody[k]>=0&&(bar%2===0||combo>=3))note(music,next,melody[k]+(bar===2?-5:0),.17,.075,'triangle');
if(urgency&&k%2===0)hiss(music,next,.02,.035,8000,'highpass');stats.musicEvents++;}
step++;next+=60/tempo/4;}
if(!lobby&&t>=street){hiss(ambient,t,.75,.012,700);note(ambient,t,30,.8,.015,'sine',70);street=t+15+step%7;stats.ambientEvents++;}}
function effect(kind){if(mute)return;init();if(!ctx)return;ctx.resume().catch(()=>{});const t=ctx.currentTime;stats.effectEvents++;
if(kind==='sauce')hiss(fx,t,.12,.13,1400,'lowpass');
else if(kind==='grate'){for(let i=0;i<3;i++)hiss(fx,t+i*.065,.045,.1,4200,'highpass');}
else if(kind==='drink'){hiss(fx,t,.035,.2,6000,'highpass');note(fx,t,85,.09,.08,'sine',240);}
else if(kind==='place'||kind==='pick')note(fx,t,48,.065,.08,'triangle',85);
else if(kind==='ok'||kind==='combo'){for(let i=0;i<(kind==='combo'?4:3);i++)note(fx,t+i*.075,[69,73,76,81][i],.16,.19,'sine');hiss(fx,t,.04,.1,1400);}
else if(kind==='bad'){note(fx,t,48,.16,.17,'triangle',90);note(fx,t+.08,42,.16,.13,'triangle');}
else if(kind==='tick')note(fx,t,76,.07,.065,'sine');
else if(kind==='tie'){[69,72,69].forEach((n,i)=>note(fx,t+i*.13,n,.23,.14,'sine'));}
else if(kind==='win'||kind==='lose'){const ns=kind==='win'?[69,73,76,81]:[64,60,57,52];ns.forEach((n,i)=>note(fx,t+i*.12,n,.25,.16,'triangle'));}}
return{start,update,effect,settings,get stats(){return{...stats,tempo,muted:mute,musicMuted:musicOff,running:ctx?.state==='running',active};}};
}

function createDaleScreens(A){
const night=document.createElement('canvas');night.width=800;night.height=600;let c=night.getContext('2d');
const r=(x,y,w,h,k)=>{c.fillStyle=A.palette[k];c.fillRect(x,y,w,h);},tx=(s,x,y,k=5,z=2,align='center')=>A.text(c,s,x,y,k,z,align),box=(x,y,w,h,k=1)=>{r(x,y,w,h,3);r(x+3,y+3,w-6,h-6,k);};
r(0,0,800,600,0);r(0,115,800,310,1);
for(let i=0;i<50;i++){let y=190+Math.round(Math.sin(i*.19)*25);r(i*16,y,16,190,19);}
for(let i=0;i<16;i++){let x=i*53,h=35+i*29%78;r(x,343-h,48,h,0);for(let j=0;j<9;j++)if((i+j)%3)r(x+7+j%3*12,353-h+Math.floor(j/3)*17,4,6,7);}
r(0,403,800,197,2);for(let i=0;i<8;i++)r(i*110,437,63,4,3);
for(let n=0;n<2;n++){let x=30+n*405;r(x,151,335,16,n?11:21);for(let i=0;i<10;i++){r(x+i*33,152,18,13,n?8:20);r(x+i*33+2,168,26,9,n?11:21);}r(x+8,177,5,226,3);r(x+321,177,5,226,3);r(x+120,193,86,13,9);r(x+133,193,60,6,6);r(x+12,370,310,34,4);r(x+12,377,310,19,2);}
const settings=s=>{tx('B4/J: SONIDO '+(s.muted?'NO':'SI')+' / B6/L: MUSICA '+(s.musicMuted?'NO':'SI'),400,560,4);tx('B3/O: MOVIMIENTO '+(s.reduced?'SUAVE':'NORMAL'),400,581,4);};
return{draw(ctx,phase,s){c=ctx;c.imageSmoothingEnabled=false;c.drawImage(night,0,0);const p=s.players;
if(phase==='intro'){
tx('DALE PERRO',402,57,9,7);tx('DALE PERRO',400,54,6,7);tx('CARACAS / 3 AM / LA RUMBA TERMINO',400,108,20);
A.paint(c,'cook/0/1',109,177,2);A.paint(c,'cook/1/1',527,177,2);tx('EL RESUELVE',193,155,5);tx('RULO EXPRESS',609,155,5);
r(167,407,440,52,0);r(175,412,425,42,4);A.food(c,202,354,{base:'doble',sauces:['ketchup','ajo-perejil'],extras:['papitas','maiz-dulce','aguacate','queso-rallado']},3);
r(271,346,17,27,16);r(286,336,20,19,16);r(303,327,20,15,16);r(274,347,10,14,15);r(291,338,15,9,15);r(307,329,15,7,15);A.paint(c,'grater/1',318,315);for(let i=0;i<9;i++)r(338+i*5,355+(i%3)*5,2,7,6);
A.paint(c,'drink/malta',670,365);A.paint(c,'sauce/ketchup',55,404);A.paint(c,'sauce/ajo-perejil',99,404);
tx('ECHALE DE TODO MENOS MAL DE OJO',400,477,6);box(180,503,440,46,7);tx('START / ENTER: COMENZAR',400,518,0,3);settings(s);
}else if(phase==='menu'){
r(0,145,800,322,1);tx('ELIGE COMO JUGAR',400,63,6,5);tx('MEJOR PUNTUACION CPU: '+s.best,400,105,5);
for(let n=0;n<2;n++){box(65+n*365,146,305,257);if(n){A.paint(c,'cook/0/1',474,186,1.4);A.paint(c,'cook/1/1',600,186,1.4);}else A.paint(c,'cook/0/1',130,165,2);box(65+n*365,418,305,49,s.choice===n?7:2);tx(n?'2 JUGADORES':'1 JUGADOR',218+n*365,435,s.choice===n?0:5,3);}
tx('PALANCA: ELIGE / B1: GUIA',400,491,5);tx('TECLADO: A/D + U / I DIRECTO',400,516,20);settings(s);
}else if(phase==='guide'){
const d=s.demo===8?3:s.demo;r(20,129,760,420,1);tx('ASI SE RESUELVE',400,60,6,5);tx('EL TICKET MANDA. EL CHISTE NO.',400,108,5);
for(let n=0;n<3;n++){box(35+n*250,156,230,229);tx((n+1)+'. '+['BUSCA','AGREGA','SALE SOLO'][n],150+n*250,180,20,3);}
box(62,215,176,123,5);tx('PEDIDO',150,225,9);tx((d&1?'OK ':'')+'BBQ',150,258,d&1?19:9,3);tx((d&2?'OK ':'')+'HUEVO',150,293,d&2?19:9,3);
for(let n=0;n<3;n++){box(295+n*70,215,66,85,s.demoFocus===n?7:2);A.paint(c,['sauce/bbq','extra/huevo','sauce/mayonesa'][n],302+n*70,220);tx(['BBQ','HUEVO','MAYO'][n],328+n*70,282,s.demoFocus===n?0:5,2);if(d&(1<<n))r(351+n*70,219,6,6,20);}A.food(c,332,313,{base:'normal',sauces:[...(d&1?['bbq']:[]),...(d&4?['mayonesa']:[])],extras:d&2?['huevo']:[]});
A.paint(c,'customer/0/'+(s.demo===8?2:0),607,244);if(s.demo===8)A.food(c,619,328,{base:'normal',sauces:['bbq'],extras:['huevo']},.5);
tx('NOMBRE + MARCA',150,361,5);tx(s.demo===8?'B1: REPETIR':d&4?'B1: QUITA MAYO':s.demo===3?'LISTO! SALE SOLO':'IZQ/DER + B1 AGREGA',400,361,6);tx(s.demo===8?'RESUELVE! +6 / -3':'SE ENVIA SOLO',650,361,5);
tx('ACIERTO: +6 S TUYOS / -3 S RIVAL',400,396,6,3);tx('CADA 3 ACIERTOS: +8 / ERROR: -3',400,418,5);tx('GANA AL AGOTAR EL RELOJ RIVAL.',400,438,6);tx('AL CIERRE GANA QUIEN TIENE MAS TIEMPO.',400,456,5);
tx('PALANCA + B1: AGREGA / QUITA',400,483,23);tx('TECLADO: WASD+U / FLECHAS+R',400,502,12);
box(135,525,530,42,7);tx(s.guideReturn==='paused'?'START: SEGUIR PARTIDA':'START / ENTER / B2: JUGAR',400,540,0,3);tx('P1 B5/K: VOLVER',400,579,4);
}else{
r(0,50,800,540,0);box(80,73,640,455);
if(phase==='paused'){tx('PAUSA',400,143,6,5);tx('LA COLA TE ESPERA.',400,220,5,3);tx('START / B1: SEGUIR',400,288,20,3);tx('B5: GUIA / B2: ELEGIR MODO',400,337,5);settings(s);}
else{tx(s.winner<0?'EMPATE!':s.mode===2?'GANA EL PUESTO '+(s.winner+1):s.winner===0?'GANASTE, PANA!':'GANO LA ESQUINA RIVAL',400,108,6,3);
tx(s.winner<0?'DOS PUESTOS. LA MISMA HAMBRE.':s.winner===0?'ESTA ESQUINA YA TIENE DUENO!':'RULO NO PERDONA EL HAMBRE!',400,131,20);
for(let n=0;n<2;n++){A.paint(c,'cook/'+n+'/'+(s.winner===n||s.winner<0?1:2),241+n*225,145-(s.winner===n&&!s.reduced?Math.round(Math.abs(Math.sin(s.t/180))*7):0));tx('P'+(n+1)+' / '+(n?'RULO EXPRESS':'EL RESUELVE'),285+n*225,265,n?12:23);tx(p[n].served+' VENTAS',285+n*225,288,n?12:23);tx((Math.round(p[n].time*10)/10).toFixed(1)+' SEGUNDOS',285+n*225,311);tx('RACHA '+p[n].maxCombo+' / ERRORES '+p[n].invalid,285+n*225,334,4);tx(p[n].score+' PUNTOS',285+n*225,357,6);}
tx(s.reason,400,388,6);tx('GANAR +1000 / RAPIDEZ +10 POR S',400,413);if(s.mode===1)tx((s.record?'NUEVO RECORD! ':'MEJOR CPU: ')+s.best+' PUNTOS',400,433,20,2);tx('START / B1: REVANCHA',400,451,20,3);tx('B2: VOLVER AL MENU',400,490,5);
}}
}};
}



const CABINET_KEYS={P1_U:['w'],P1_D:['s'],P1_L:['a'],P1_R:['d'],P1_1:['u'],P1_2:['i'],P1_3:['o'],P1_4:['j'],P1_5:['k'],P1_6:['l'],P2_U:['ArrowUp'],P2_D:['ArrowDown'],P2_L:['ArrowLeft'],P2_R:['ArrowRight'],P2_1:['r'],P2_2:['t'],P2_3:['y'],P2_4:['f'],P2_5:['g'],P2_6:['h'],START1:['Enter'],START2:['2']};
const DalePerroGame=(()=>{
const A=DalePerroArt,held={},pressed={},map={},sonic=createDalePerroSound();for(const[code,keys]of Object.entries(CABINET_KEYS))for(const key of keys)map[key.toLowerCase()]=code;
let demo=4,demoFocus=2,demoAge=0,v,texture,screens,guideReturn='start',phase='intro',mode=1,choice=0,seed=1,elapsed=0,winner=-1,reason='',best=0,record=false,muted=false,musicMuted=false,repeatAt=[0,0],axis=['',''],aiClock=0,lastDraw=0,reduced=!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
function sound(kind){sonic.effect(kind);}
function orderFor(index){let r=(seed+index*7919)>>>0;const pick=n=>{r=(Math.imul(r,1664525)+1013904223)>>>0;return r%n;};let a=pick(8),b=(a+1+pick(7))%8;return{base:index<2?'normal':A.bases[pick(3)][0],sauces:(index<2?[a]:[a,b]).map(i=>A.sauces[i][0]),extras:[A.extras[pick(7)][0]],drink:index<3?null:A.drinks[pick(3)][0]};}
function say(n,line,speaker){const q=v.players[n];q.speech=line;q.speechError=false;q.speechTime=2800;q.speaker=speaker||A.customers[q.customer][1];}
function lobby(){phase='menu';v.meta.live=false;}
function prepare(players){mode=players;demo=4;demoFocus=2;demoAge=0;guideReturn='start';phase='guide';sonic.start();sonic.settings(muted,musicMuted);}
function nextOrder(n){const q=v.players[n];v.orders[n]=orderFor(q.serial);Object.assign(q,{base:'normal',sauces:[],extras:[],drink:null,customer:(q.serial+n*2)%4,patience:1,age:0,autoReady:0,wait:0,delta:0,errorTime:0,message:'',effect:0,damage:0,cheese:0,preps:[],arriving:400,guide:q.serial<2&&(mode===2||n===0),deliveryCanvas:null});if(!q.speechTime)say(n,['ECHALE DE TODO\nMENOS MAL DE OJO.','ECHALE HASTA PELO DE BOLA','PRIMERO EL PERRO.\nDESPUES VEMOS.','HOY SE COME.\nMANANA SE ENTRENA.'][q.customer]);}
function begin(players){mode=players;seed=(Date.now()^Math.floor(Math.random()*1000000))>>>0;phase='playing';elapsed=0;winner=-1;reason='';record=false;aiClock=0;axis=['',''];repeatAt=[0,0];for(const k in pressed)delete pressed[k];for(const k in held)held[k]=false;
sonic.start();sonic.settings(muted,musicMuted);v.meta.live=true;v.meta.mode=mode;v.meta.attack=null;v.meta.remaining=90;v.meta.reducedMotion=reduced;for(let n=0;n<2;n++){Object.assign(v.players[n],{focus:n?7:0,time:45,score:0,served:0,combo:0,maxCombo:0,serial:0,invalid:0,missed:0,lastTick:45,everBehind:false,comeback:false,speechTime:0,hit:0,houseJoke:false,talk:[0,0,0,0]});nextOrder(n);}v.setActive(0);sound('pick');}
function valid(n){return v.orderItems(n).every(it=>v.has(n,it))&&!v.surplus(n);}
function finish(){if(phase!=='playing')return;phase='result';const[a,b]=v.players;const timeDifference=Math.round(a.time*10)-Math.round(b.time*10),expired=a.time===0||b.time===0;const difference=expired?a.time-b.time:timeDifference||a.served-b.served;winner=difference===0?-1:difference>0?0:1;reason=winner<0?'MISMO TIEMPO Y VENTAS':expired?'POR RELOJ AGOTADO':timeDifference?'POR TIEMPO':'POR VENTAS';sonic.update(false,false,0);sound(winner<0?'tie':mode===2||winner===0?'win':'lose');v.players.forEach((q,n)=>q.score=Math.max(0,(winner===n?1000+Math.floor(900-elapsed/100):0)+q.served*10-q.invalid*20-q.missed*30));if(mode===1){record=a.score>best;best=Math.max(best,a.score);if(record)try{const result=window.platanusArcadeStorage?.set('dale-perro.duelo.score-v11',{score:best});result?.catch(()=>{});}catch{}}}
function serve(n,defer=false){if(phase!=='playing')return;const q=v.players[n],r=v.players[1-n];if(q.wait>0)return;
if(!valid(n)){q.combo=0;q.invalid++;q.delta=-Math.min(3,q.time);q.time=Math.max(0,q.time-3);q.effect=0;q.damage=650;q.message=v.correction(n);q.errorTime=2800;say(n,'PANA,\n'+q.message);q.speechError=true;sound('bad');if(q.time<=0)finish();return;}
q.autoReady=0;q.served++;q.combo++;q.maxCombo=Math.max(q.maxCombo,q.combo);const gain=q.combo%3===0?8:6;q.delta=Math.min(gain,75-q.time);q.time=defer?q.time+gain:Math.min(75,q.time+gain);r.delta=-Math.min(3,r.time);r.time=defer?r.time-3:Math.max(0,r.time-3);q.damage=0;q.effect=1100;q.wait=1100;
const variants=[['ESE PERRO SI RESUELVE!','ASI SI SE CIERRA LA RUMBA!'],['PA LLEVAR, QUE VOY RODANDO','ECHALE HASTA PELO DE BOLA'],['LA REUNION PUEDE ESPERAR.','CON ESTO SI TRABAJO!'],['ESTE ES EL VERDADERO GOL!','LA DIETA EMPIEZA MANANA.']];
say(n,variants[q.customer][q.talk[q.customer]++%2]);if(q.sauces.includes('casa')&&!q.houseJoke){say(n,'LA RECETA ES SECRETA.\nHASTA PARA MI.','EL VENDEDOR');q.houseJoke=true;}q.message=q.combo%3===0?'RACHA! +8 SEGUNDOS':'';
if(q.everBehind&&!q.comeback&&q.time>r.time+1){q.comeback=true;q.message='REMONTASTE, PANA!';}
q.deliveryCanvas=document.createElement('canvas');q.deliveryCanvas.width=128;q.deliveryCanvas.height=36;A.food(q.deliveryCanvas.getContext('2d'),0,0,q,1);
r.hit=550;v.meta.attack={from:n,life:550};r.damage=650;r.message='RIVAL: -3 S';r.errorTime=1100;sound(q.combo%3===0?'combo':'ok');if(r.time<=0&&!defer)finish();}
function toggle(n){if(phase!=='playing'||v.players[n].wait>0)return;const it=v.buttons[v.players[n].focus];v.toggle(n);const q=v.players[n];q.autoReady=0;if(q.speechError&&q.speechTime>0){q.message=v.correction(n);q.speech=valid(n)?'AHORA SI, PANA!\nSALE SOLO EN UN MOMENTO.':'PANA,\n'+q.message;q.speechTime=2800;q.errorTime=valid(n)?0:2800;}const added=v.has(n,it);sound(!added?'pick':it.type==='sauce'?'sauce':it.type==='drink'?'drink':it.id==='queso-rallado'?'grate':'place');}
function timeout(n){const q=v.players[n];q.combo=0;q.missed++;q.delta=-Math.min(4,q.time);q.time=Math.max(0,q.time-4);q.damage=1100;q.effect=0;q.wait=1100;q.message='CLIENTE PERDIDO';say(n,'ME FUI CON EL DE AL LADO!');sound('bad');}
function pause(){if(phase==='playing'){phase='paused';sonic.update(false,false,0);for(const k in held)held[k]=false;for(const k in pressed)delete pressed[k];}}
function action(code){
if(code==='P1_4'){muted=!muted;sonic.settings(muted,musicMuted);return;}if(code==='P1_6'){musicMuted=!musicMuted;sonic.settings(muted,musicMuted);return;}if(code==='P1_3'){reduced=!reduced;v.meta.reducedMotion=reduced;return;}
if(phase==='intro'){if(code==='START2')prepare(2);else if(code==='START1'||code==='P1_1'){lobby();sonic.start();sonic.settings(muted,musicMuted);}return;}
if(phase==='menu'){if(/^P[12]_[UDLR]$/.test(code))choice=/[UL]$/.test(code)?0:1;else if(code==='START2')prepare(2);else if(code==='P1_2')begin(choice+1);else if(['START1','P1_1','P2_1','P1_5'].includes(code))prepare(choice+1);return;}
if(phase==='guide'){if(code==='P1_5'){if(guideReturn==='paused')phase='paused';else lobby();}else if(/^P[12]_[LR]$/.test(code)){demoFocus=(demoFocus+(code.endsWith('L')?2:1))%3;}else if(code==='P1_1'||code==='P2_1'){if(demo===8){demo=4;demoFocus=2;}else demo^=1<<demoFocus;demoAge=0;sound('place');}else if(code==='START1'||code==='P1_2'){if(guideReturn==='paused')phase='playing';else begin(mode);}return;}
if(phase==='paused'){if(code==='START1'||code==='P1_1'){phase='playing';for(const k in pressed)delete pressed[k];}else if(code==='P1_2')lobby();else if(code==='P1_5'){demo=4;demoFocus=2;demoAge=0;guideReturn='paused';phase='guide';}return;}
if(phase==='result'){if(['START1','P1_1',...(mode===2?['P2_1']:[])].includes(code))begin(mode);else if(code==='P1_2'||mode===2&&code==='P2_2')lobby();else if(code==='START2')prepare(2);return;}
if(code==='START1'){pause();return;}
let match=/^P([12])_([UDLR12])$/.exec(code);if(!match)return;const n=+match[1]-1;if(n===1&&mode===1)return;const k=match[2];if(k==='1')toggle(n);else if(k==='2')serve(n);else{const d={U:[0,-1],D:[0,1],L:[-1,0],R:[1,0]}[k];v.move(n,...d);}}
function ai(dt){aiClock-=dt;if(aiClock>0||v.players[1].wait>0)return;aiClock=1150;const q=v.players[1],target=v.orders[1];let item=v.buttons.find(it=>(it.type==='sauce'||it.type==='extra')&&v.has(1,it)&&!(it.type==='sauce'?target.sauces:target.extras).includes(it.id));if(!item)item=v.buttons.find(it=>v.orderItems(1).some(o=>o.type===it.type&&o.id===it.id)&&!v.has(1,it));if(item){const active=v.getActive();v.select(1,item.index);v.toggle(1);v.setActive(active);}else if(q.age>=8500)serve(1);}
function tick(t,rawDt){if(!v)return;const dt=Math.min(100,Math.max(0,rawDt));
for(let n=0;n<2;n++){const codes=['U','D','L','R'].map(k=>'P'+(n+1)+'_'+k),edge=codes.find(k=>pressed[k]),dir=codes.find(k=>held[k])||'';if(edge){action(edge);repeatAt[n]=t+220;}else if(dir&&(axis[n]!==dir||t>=repeatAt[n])){action(dir);repeatAt[n]=t+120;}axis[n]=dir;for(const k of codes)delete pressed[k];}
for(const k of Object.keys(pressed)){if(pressed[k])action(k);delete pressed[k];}
if(phase==='guide'){demoAge=demo===3?demoAge+dt:0;if(demoAge>=450){demo=8;demoAge=0;sound('ok');}}
if(phase==='playing'){
elapsed+=dt;v.meta.remaining=Math.max(0,90-elapsed/1000);
for(let n=0;n<2;n++){const q=v.players[n];q.time=Math.max(0,q.time-dt/1000);q.speechTime=Math.max(0,(q.speechTime||0)-dt);q.errorTime=Math.max(0,(q.errorTime||0)-dt);if(!q.errorTime&&!q.wait)q.message='';if(q.wait>0){q.wait-=dt;if(q.wait<=0){q.serial++;nextOrder(n);}}else{q.age+=dt;q.patience=Math.max(0,1-q.age/22000);if(q.patience===0&&!valid(n))timeout(n);}const sec=Math.ceil(q.time);if(n===0&&sec<=10&&sec!==q.lastTick)sound('tick');q.lastTick=sec;}
if(v.players.some(q=>q.time<=0)||elapsed>=90000)finish();else{if(mode===1)ai(dt);const ready=[];for(let n=0;n<(mode===1?1:2)&&phase==='playing';n++){const q=v.players[n];q.autoReady=q.wait<=0&&valid(n)?q.autoReady+dt:0;if(q.autoReady>=450)ready.push(n);}for(const n of ready)serve(n,true);for(const q of v.players)q.time=Math.max(0,Math.min(75,q.time));if(ready.length&&v.players.some(q=>q.time<=0))finish();}
for(let n=0;n<2;n++)if(v.players[n].time<v.players[1-n].time-2)v.players[n].everBehind=true;
}
sonic.update(phase==='playing'?true:['menu','guide'].includes(phase)?'menu':false,v.meta.remaining<=10||(mode===1?v.players[0].time<=10:v.players.some(q=>q.time<=10)),mode===1?v.players[0].combo:Math.max(...v.players.map(q=>q.combo)));
if(phase==='playing')v.step(t,dt);
if(t-lastDraw>=33||phase!=='playing'){render(t);lastDraw=t;}
}
function render(t){if(phase==='playing'){v.draw(t);if(mode===1)A.text(v.context,'RIVAL / CPU',781,58,12,1,'right');}else screens.draw(v.context,phase,{choice,mode,winner,reason,t,best,record,muted,musicMuted,reduced,guideReturn,demo,demoFocus,players:v.players});texture.refresh();}
function pointer(x,y){if(phase==='intro'){action('START1');return;}if(phase==='menu'){if(y>=418&&y<=467){choice=x<400?0:1;prepare(choice+1);}else if(y>=488&&y<=535)prepare(choice+1);return;}if(phase==='guide'){if(y>=574)action('P1_5');else if(y>=215&&y<=385&&x>=285&&x<=515){demoFocus=Math.max(0,Math.min(2,Math.floor((x-295)/70)));action('P1_1');}else if(y>=525&&y<=567)action('START1');return;}if(phase==='paused'){action(y>=327&&y<=360?x<400?'P1_5':'P1_2':'START1');return;}if(phase==='result'){action(y>480?'P1_2':'START1');return;}if(y<317){if(mode===2)v.setActive(x<400?0:1);return;}if(y>=580){serve(mode===1?0:x<400?0:1);return;}const it=v.buttons.find(z=>x>=z.x&&x<z.x+z.w&&y>=z.y&&y<z.y+z.h);if(it){const n=mode===1?0:v.getActive();v.select(n,it.index);toggle(n);}}
const game=new Phaser.Game({type:Phaser.CANVAS,width:800,height:600,parent:'game-root',backgroundColor:'#101827',pixelArt:true,roundPixels:true,antialias:false,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:800,height:600},scene:{create(){
const cv=document.createElement('canvas');v=createDalePerroView(cv);screens=createDaleScreens(A);v.meta.reducedMotion=reduced;this.textures.addCanvas('duelo-screen',cv);texture=this.textures.get('duelo-screen');texture.setFilter(Phaser.Textures.FilterMode.NEAREST);this.add.image(0,0,'duelo-screen').setOrigin(0);
const down=e=>{const code=map[String(e.key).toLowerCase()];if(!code)return;e.preventDefault();if(!held[code]&&!e.repeat)pressed[code]=true;held[code]=true;},up=e=>{const code=map[String(e.key).toLowerCase()];if(code){e.preventDefault();held[code]=false;}},blur=()=>pause(),visibility=()=>{if(document.hidden)pause();};
window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',blur);document.addEventListener('visibilitychange',visibility);this.input.on('pointerdown',p=>pointer(p.x,p.y));this.events.once('shutdown',()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',blur);document.removeEventListener('visibilitychange',visibility);});
try{const result=window.platanusArcadeStorage?.get('dale-perro.duelo.score-v11');result?.then(r=>{const score=r?.value?.score;if(r?.found&&Number.isInteger(score)&&score>=0&&score<=10000)best=Math.max(best,score);}).catch(()=>{});}catch{}render(0);
},update:tick}});
return{game,audio:sonic,get view(){return v;},get phase(){return phase;},get mode(){return mode;},get elapsed(){return elapsed;},get winner(){return winner;},get muted(){return muted;},get musicMuted(){return musicMuted;},begin,action,serve,tick,valid,pause,render};
})();





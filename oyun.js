window.animasyonFrameIstegi = (function(){
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( callback ){
		return window.setTimeout(callback, 1000 / 60);
		};
})();
//animasyon frame iptal
window.animasyonFrameIptal = (function(){
	return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
})();
var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
DW = window.innerWidth,
DH = window.innerHeight,
mouse = {},
bitti = 0,
res,
resetButon = {},
blockList = [2],
cizgiList =[4],
music = document.getElementById("music");
puan = 0;
canvas.addEventListener("mousemove",mouseHareket,true);
canvas.addEventListener("mousedown",tikla,true);
ball = {
    x:200,
    y:200,
    r:10,
    c:"#f7bb3b",
    xh:4,
    yh:8,
    ciz: function(){
        ctx.beginPath();
        ctx.fillStyle=this.c;
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        ctx.fill();

    }
};
resetButon = {
    w: 300,
    h: 60,
    x: DW/2 - 150,
    y: DH/2 - 53,
    ciz: function(){
        ctx.strokeStyle = "whitesmoke";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.font = "50px Indie Flower, Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "whitesmoke";
        ctx.fillText("Tekrar Oyna", DW/2, DH/2 - 25);
    }
};
function animasyon(){
    res = animasyonFrameIstegi(animasyon);
    ciz();
}
function cizgiler(deger){
    if(deger ==  "ust"){
        this.h=2;
        this.w = DW;
        this.x=0;
        this.y=0;
    }
    else if(deger == "alt"){
        this.h=2;
        this.w = DW;
        this.x=0;
        this.y=DH-this.h;

    }
    else if (deger == "sol"){
        this.w=2;
        this.h = DH;
        this.x=0;
        this.y=0;
    }
    else if (deger == "sag"){
        this.w=2;
        this.h = DH;
        this.x=DW-this.w;
        this.y=0;
    }

}
cizgiList.push(new cizgiler("ust"));
cizgiList.push(new cizgiler("alt"));
cizgiList.push(new cizgiler("sol"));
cizgiList.push(new cizgiler("sag"));

function block(deger){
    this.h=200;
    this.w = 8;
    this.y = DH/2 - this.h/2;
    this.x = (deger == "sol") ? 0 : DW-this.w;
}

blockList.push(new block("sag"));
blockList.push(new block("sol"));

function isimal(){
    name = document.getElementById("isim").value;
    var board = document.getElementById("cerceve");
    board.style.display = "none";
    canvas.style.display ="block";
    animasyon();

}
function canvasPrint (){
    canvas.width = DW;
    canvas.height = DH;
    ctx.fillStyle = "#11aaf7";
    ctx.fillRect(0,0,DW,DH);
}

function ciz (){
    canvasPrint();
    for(var i = 0; i<blockList.length; i++){ 
        p = blockList[i];
        ctx.fillStyle = "#ce5a48";
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.strokeStyle = "#a1f986";
        ctx.lineWidth=3;
        ctx.strokeRect(p.x, p.y, p.w, p.h);
    }
    for(var i = 0; i<cizgiList.length; i++){ 
        p = cizgiList[i];
        ctx.fillStyle = "red";
        ctx.fillRect(p.x, p.y, p.w, p.h);
    }
    ball.ciz();
    haraket();
}

function haraket(){
    puanYaz();
    ball.x += ball.xh;
    ball.y += ball.yh;
    //cubugu haraket ettir
    if(mouse.x && mouse.y){
        for(var i = 1 ; i< blockList.length ; i++){
            p = blockList[i];
            p.y = mouse.y ;

        }
    }
    if(altustCarpismalar(ball)){
        ball.yh = -ball.yh;
    }
    else if(cubukCarpisma1(ball,blockList[1])){
        ball.xh = -ball.xh;
        puan++;
        music.play();
    }
    else if(cubukCarpisma2(ball,blockList[2])){
        ball.xh = -ball.xh;
        puan++;
        music.play();
    }
    else if(oyunSonu(ball)){
        oyunuBitir();
    }
    



}

function mouseHareket(e){
    mouse.x = e.pageX; 
    mouse.y = e.pageY;
    

}

function animasyon(){
    res= animasyonFrameIstegi(animasyon);
    ciz();
}


function altustCarpismalar(ball){
    if((ball.y+ball.r)>= DH){
        return true;
    }
    else if(ball.y-ball.r <= 0){
        return true;

    }

}
function cubukCarpisma1(ball,block1){
    if((ball.x+ball.r) >= block1.x && block1.y+block1.h>=ball.y && ball.y >= block1.y ){
        return true;
    }
    
}
function cubukCarpisma2(ball,block2){
    if(ball.x-ball.r <= block2.x+block2.w && block2.y+block2.h>=ball.y && ball.y >= block2.y){
        return true;
    }
}
function oyunSonu(ball){
    if(ball.x+ball.r >= DW){
        return true;
    }
    else if(ball.x - ball.r <= 0){
        return true;
    }
}
function puanYaz(){
    
    ctx.fillStyle = "whitesmoke";
	ctx.font = "50px Indie Flower, Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
    ctx.fillText("Puan: " + puan, DW/2-20 ,50);
    if(puan % 10 == 0 && puan != 0){
        ctx.fillText("Çok iyi Gidiyorsun " +name, DW/2-20 ,300);
    }
    if(puan % 5 == 0 && puan != 0){
        ctx.fillText("Biraz Hizlaniyoruz " +name, DW/2-20 ,100);
        Hizlandir();
    

    }
    
}

function Hizlandir(){
    if(ball.x <20){
        ball.x+=2;
    }
    if(ball.y <15){
        ball.y+=1;
    }
    
}
function oyunuBitir(){
    ctx.fillStyle = "whitesmoke";
	ctx.font = "50px Indie Flower, Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
    ctx.fillText(name+"Oyun Bitti - Toplamda " + puan + " puan aldın!", DW/2, DH/2 + 50);
    animasyonFrameIptal(res);
	bitti = 1;
    resetButon.ciz();
    
}

function tikla(e){
    var mx = e.pageX,
	    my = e.pageY;
    if(bitti == 1){
		if(mx >= resetButon.x && mx <= resetButon.x + resetButon.w){
			ball.x = 200;
			ball.y = 200;
			puan = 0;
			ball.xh = 4;
			ball.yh = 8;
			animasyon();
			bitti = 0;
		}
	}
        
}
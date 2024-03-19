/* 頁面主選單
 ========================================================*/
function CloseIcon(AbjIcon,j){
    icon=document.getElementById(AbjIcon);
    for(i=1;i<=j;i++){
        kk=document.getElementById("topmu"+i);
        if(kk!=null){
            if(icon==kk.id){
                if (icon.style.display=="none"){
                    icon.style.display="block";
                }else{
                    icon.style.display="none";
                }
            }else{
                kk.style.display="none";
            }
        }
    }
}
function CloseAll_Icon(j){
    for(i=1;i<=j;i++){
        IconBbj=document.getElementById("topmu"+i);
        if(IconBbj!=null){
            if (IconBbj.style.display=="block"){
                IconBbj.style.display="none";
            }
        }
    }
}

//開始計時的時間
var mmStart;
//等待隱藏時間的長短
var timeout=500;
//等待隱藏的物件
var mmInTimerobj;
//目前在計時的程序
var mmHideMenuTimer=null;
//不能隱藏Div名稱
var NotHiddenDivs = new Array();
//----------------------------------------------------------------------------------
//取得絕對位置程式
function getPos(el,sProp){
    var iPos = 0;
    while (el!=null){
        iPos+=el["offset" + sProp];
        el = el.offsetParent;
    }
    return iPos;
}

//-------------------------------------------------------------------------------------
//清除計時的程序---
function MM_clearTimeout(){
    if (mmHideMenuTimer){
        clearTimeout(mmHideMenuTimer);
        mmHideMenuTimer = null;
    }
}

//-------------------------------------------------------------------------------------
//開始一個計時程序每500毫秒一次
function MM_startTimeout(){
    NotHiddenDivs=null;
    mmStart = new Date();
    mmHideMenuTimer = setTimeout("mmDoHide()", 500);
}

//-------------------------------------------------------------------------------------
//判斷隱藏的程式
function mmDoHide(){
    var elapsed = new Date() - mmStart;
    if (elapsed < timeout){
        mmHideMenuTimer = setTimeout("mmDoHide()", timeout+100-elapsed);
        return;
    }
    ToHiddenAllDiv();
    mmHideMenuTimer=null;
}

function FIND(item){
    if( window.mmIsOpera ) return(document.getElementById(item));
    if (document.all) return(document.all[item]);
    if (document.getElementById) return(document.getElementById(item));
    return(false);
}

function ShowMenu(el,NotHiddenDivStr,actMenu){
    var ActiveMenu;
    MM_clearTimeout();
    if (!NotHiddenDivs){
        NotHiddenDivs = NotHiddenDivStr.split(",");
        ToHiddenAllDiv();
    }
    if (FIND(actMenu)){
        ActiveMenu=FIND(actMenu);
        if (ActiveMenu) {
        d=document.getElementById("navigation");

            left=getIE(el);
            l=getIE(d);
            left=left-l;
            ActiveMenu.style.marginLeft=left+"px";
            ActiveMenu.style.pixelTop=getPos(el.offsetParent,"Top") + el.offsetParent.offsetHeight;

            ActiveMenu.style.display='block';
        }
    }
}

function ToHiddenAllDiv(){
    var Divstr,hiddenFlg;
    for (var i=0; i<100; i++){
        Divstr="topmu"+i;
        hiddenFlg=true;
        if (NotHiddenDivs){
            for (var j=0;j<NotHiddenDivs.length;j++){
                if (NotHiddenDivs[j]==Divstr){
                    hiddenFlg=false;
                }
            }
        }
        if (hiddenFlg){
            if (FIND("topmu"+i)){
                var toHiddenDiv = FIND("topmu"+i);
                toHiddenDiv.style.display='none';
            }
        }
    }
}
function getIE(e){
    var t=e.offsetTop;
    var l=e.offsetLeft;

    while(e=e.offsetParent){
    t+=e.offsetTop;
    l+=e.offsetLeft;
    }

if (navigator.appVersion.indexOf('MSIE 6.0',0)>0) {
    //l=l-160;
}else if (navigator.appVersion.indexOf('MSIE 8.0',0)>0){
    //l=l-30;
}else{
    //=l-180;
}
    return l;
}


/* MAPs全球母語同步系統選單
 ========================================================*/
function extand() {
    //sel.style.visibility="visible";
     document.getElementById('aaa').style.visibility='visible';
}

function pinch(obj) {
    document.getElementById('aaa').style.visibility='hidden';
    //sel.style.visibility="hidden";
    bb=1;
    logic=true;
    clearTimeout(timeid)
}

var timeid;
var bb = 1;
var logic = true;
var sel;
function sele(obj){
    sel=obj;
}

function fade(){
    if(document.all);
    if (logic==true){
      document.getElementById('aaa').style.visibility='visible';
      //sel.style.visibility="visible";
      bb+=6;
      if(bb>75){
        logic=false;
      }
      if (bb<75)
        timeid=setTimeout("fade()",1);
    }
}
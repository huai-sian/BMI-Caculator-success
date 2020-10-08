var seeresult=document.querySelector(".result");
var data=JSON.parse(localStorage.getItem("listitem")) || [];
var d=new Date();
var year=(d.getFullYear()).toString();
var reset_btn=document.querySelector(".reset")
var month=(d.getMonth()+1).toString();
var day=d.getDate().toString();
var bmiNum=document.querySelector(".bminum");
var list=document.querySelector(".recordlist");
var result_range=document.querySelector(".result_pass");
var clearAll_js=document.querySelector(".clearAll");
day = day.length<2 ? "0"+day:day;
month=month.length<2 ? "0"+month:month;

const bmilevel={
    light:{
        range:"過輕",
        colorClass:"color-light"
    },
    fit:{
        range:"理想",
        colorClass:"color-fit"
    },
    heavy:{
        range:"過重",
        colorClass:"color-heavy"
    },
    obese1:{
        range:"輕度肥胖",
        colorClass:"color-obese1"
    },
    obese2:{
        range:"中度肥胖",
        colorClass:"color-obese2"
    },
    obese3:{
        range:"重度肥胖",
        colorClass:"color-obese3"
    }

}

seeresult.addEventListener("click",bmicacul,false);
list.addEventListener("click",toggleDone,false);
reset_btn.addEventListener("click",reinput,false)
updateList(data);
clearAll_js.addEventListener("click",clear,false);


function bmicacul(){
    const weight=document.querySelector(".kg-input").value;
    const height=document.querySelector(".cm-input").value/100;
    
    if(isNaN(weight)&&isNaN(height)){
        alert("請輸入身高體重");
        return;
    }  
    const bmi= weight/(height*height);
    bmiNum.textContent=bmi.toFixed(2);
    const status= bmiRange(bmi);
    const rangeli=bmilevel[status].range;
    const colorli=bmilevel[status].colorClass;

    var wholerecords={
        weight:weight,
        height:height,
        date:[year,month,day],
        bmiData:bmiNum.textContent,
        bmiStatus:rangeli,
        border:colorli,
        back:colorli
    } 
    data.push(wholerecords);
    
    localStorage.setItem("listitem",JSON.stringify(data));
    updateList(data);
    
    reset_btn.parentNode.style.display="block";
    reset_btn.parentNode.classList.add(colorli);
    seeresult.style.display="none";
    result_range.textContent=rangeli;

    document.querySelector(".kg-input").value="";
    document.querySelector(".cm-input").value="";
    initial();

}


function bmiRange(bmi){
    if (bmi<18.5){
        return "light";
    }else if(bmi>=18.5 && bmi<24){
        return "fit";
    }else if(bmi>=24 && bmi<27){
        return "heavy";
    }else if(bmi>=27 && bmi<30){
        return "obese1";
    }else if(bmi>=30 && bmi<35){
        return "obese2";
    }else {
        return "obese3";
    }
  
}
/*function bmiBorder(bmi){
    var border="";
    if (bmi<18.5){
        border='color-light';
    }else if(bmi>=18.5 && bmi<24){
        border='color-fit';
    }else if(bmi>=24 && bmi<27){
        border="color-heavy";
    }else if(bmi>=27 && bmi<30){
        border="color-obese1";
    }else if(bmi>=30 && bmi<35){
        border="color-obese2";
    }else {
        border="color-obese3";
    }
    return border;
}
function bmibgColor(bmi){
    var bgcolor="";
    if (bmi<18.5){
        bgcolor='color-light';
    }else if(bmi>=18.5 && bmi<24){
        bgcolor='color-fit';
    }else if(bmi>=24 && bmi<27){
        bgcolor="color-heavy";
    }else if(bmi>=27 && bmi<30){
        bgcolor="color-obese1";
    }else if(bmi>=30 && bmi<35){
        bgcolor="color-obese2";
    }else {
        bgcolor="color-obese3";
    }
    return bgcolor;
}*/
function toggleDone(e){
    e.preventDefault();
    if(e.target.nodeName!=="A"){return};
    var num=e.target.dataset.index;
    data.splice(num, 1);
    localStorage.setItem("listitem",JSON.stringify(data));
    updateList(data);
}
function clear(e){
   e.preventDefault();
   if(e.target.nodeName!=="BUTTON"){return};
   data=[];
   localStorage.setItem("listitem",JSON.stringify(data));
   updateList(data);
   no_record.style.display="block";
}
function reinput(){
    seeresult.style.display="block";
    reset_btn.parentNode.style.display="none";
}
function updateList(item){
    var str="";
    for (var i=0;i<item.length;i++){
        str+='<li class="'+item[i].border+'"><div>'+item[i].bmiStatus+'</div><div><span>BMI</span>'+item[i].bmiData
        +'</div><div><span>Weight</span>'+item[i].weight+'</div><div><span>Height</span>'+item[i].height+'</div><div><span>'
        +item[i].date[0]+'-'+item[i].date[1]+'-'+item[i].date[2]+'</div><div><span><a data-index="'+i+'">刪除</a></span></div></li>';
    }
    list.innerHTML=str;

}
var no_record=document.querySelector(".check_record");
function initial(){
    if(data.length!==0){
        no_record.style.display="none";
    }
}
initial();
console.log(data);

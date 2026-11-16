let task=[
    {
        id:1,
        text:"Лекц унших",
        done:true},
    {
        id:2,
        text:"Aпп бичих",
        done:false}, 
];
function render(){
    list.innerHTML="";
    task.forEach((task)=>{
        const li=document.createElement("li");
        li.textContent=task.text;
        if(task.done)li.classList.add("done");
        li.addEventListener("click",()=>{toggleTask(task.id)});

            constdel=document.createElement("button");
            del.textContent="X";
            del.addEventListener("click",(e)=>{
                e.stopPropagation();
                deleteTask(task.id);
            
        });
        li.appendChild(del);
        list.appendChild(li);
    });
}
from.addEventListener("submit",(e)=>{
    e.preventDefault();
    tasks.push({
        id:Date.now(),
        text:input.value.trime(),
        done:false,
    });
    input.value="";
    save();
    render();
});
 from.addEventListener("submit",(e)=>{
    e.preventDefault();
    tasks.push({
        id:Date.now(),
        text:input.value.trim(),
        done:false,
    });
    input.value="";
    save();
    render();
});
function toggleTask(id){
     task=tasks.map((t)=>
        t.id===id ? {...t, done: !t.done} : t
    ); 
    save();
    render();
}
function deleteTask(id){
    task=tasks.filter((t)=>t.id!==id);      
    save();
    render();
}
function save(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
tasks=JSON.parse(localStorage.getItem("tasks"))??[];
render();

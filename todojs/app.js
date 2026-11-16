function render(){
    list.innerHTML="";
    task.forEach((task)=>{
        const li=document.createElement("li");
        li.textContent=task.text;
        if(task.done)li.classList.add("done");
        li.addEventListener("click",()=>{toggleTask(task.id));

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
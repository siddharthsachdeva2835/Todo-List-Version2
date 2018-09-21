window.onload = function () {
    let crosssvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    let upsvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    let downsvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>';

    let ul = document.getElementsByClassName('todo-list')[0];

    let HandlesButtons = function(){
        ul = document.getElementsByClassName('todo-list')[0];
        
        let downbtn = document.createElement('button');
        downbtn.classList += 'btn li-btn btn-dark mx-1 down';
        downbtn.innerHTML = downsvg;
       // console.log(downbtn);
        downbtn.addEventListener('click', function () {
            let curr = this.parentNode;
            let nexttonextSibling = this.parentNode.nextSibling.nextSibling;

            ul.insertBefore(curr, nexttonextSibling);
            HandlesButtons();
        });

        let upbtn = document.createElement('button');
        upbtn.classList += 'btn li-btn btn-dark mx-1 up';
        upbtn.innerHTML = upsvg;
        upbtn.addEventListener('click', function () {
            let curr = this.parentNode;
            let preSibling = this.parentNode.previousSibling;

            ul.insertBefore(curr, preSibling);
            HandlesButtons();
        });

        if(ul.childElementCount == 1){
            let down = ul.children[0].getElementsByClassName('down')[0];
            let up = ul.children[0].getElementsByClassName('up')[0];

            if(down != undefined){
                ul.children[0].removeChild(down);
            }
            if(up != undefined){
                ul.children[0].removeChild(up);
            }
        }
        else {
            for(let i = 0 ; i < ul.childElementCount ; i++){
                let down = ul.children[i].getElementsByClassName('down')[0];
                let up = ul.children[i].getElementsByClassName('up')[0];
                
                if( i==0 ){
                    if(down == undefined){
                        ul.children[i].appendChild(downbtn);
                    }
                    else{
                        //ul.children[i].removeChild(down);
                    }
                    if(up == undefined){
                        //ul.children[i].appendChild(upbtn);
                    }
                    else{
                        ul.children[i].removeChild(up);
                    }
                }
                else if(i==ul.childElementCount-1){
                    if(down == undefined){
                        //ul.children[i].appendChild(downbtn);
                    }
                    else{
                        ul.children[i].removeChild(down);
                    }
                    if(up == undefined){
                        ul.children[i].appendChild(upbtn);
                    }
                    else{
                        //ul.children[i].removeChild(up);
                    }
                }   
                else{
                    if(down == undefined){
                        ul.children[i].appendChild(downbtn);
                    }
                    else{
                        //ul.children[i].removeChild(down);
                    }
                    if(up == undefined){
                        ul.children[i].appendChild(upbtn);
                    }
                    else{
                        //ul.children[i].removeChild(up);
                    }
                    
                    down = ul.children[i].getElementsByClassName('down')[0];
                    up = ul.children[i].getElementsByClassName('up')[0];
                    
                    if(ul.children[i].lastChild == down){
                        ul.children[i].insertBefore(down,up);
                    }
                }
            }
        }
    }

    let addListItem = function () {
        let count = ul.childElementCount;
        console.log(count);

        let input = document.getElementsByClassName('add-input')[0];
        if (input.value == '') {
            return;
        }

        let li = document.createElement('li');
        li.classList += 'alert li-alert alert-success';
        //console.log(li);


        let h4 = document.createElement('h4');
        h4.classList += 'li-heading';
        h4.innerText = input.value;
        //console.log(h4);

        let crossbtn = document.createElement('button');
        crossbtn.classList += 'btn li-btn btn-danger mx-1';
        crossbtn.innerHTML = crosssvg;
        //console.log(crossbtn);
        crossbtn.addEventListener('click', function () {
            ul.removeChild(this.parentNode);
            HandlesButtons();
        });

        let downbtn = document.createElement('button');
        downbtn.classList += 'btn li-btn btn-dark mx-1 down';
        downbtn.innerHTML = downsvg;
       // console.log(downbtn);
        downbtn.addEventListener('click', function () {
            let curr = this.parentNode;
            let nexttonextSibling = this.parentNode.nextSibling.nextSibling;

            ul.insertBefore(curr, nexttonextSibling);
            console.log(ul);
            
            HandlesButtons();
        });

        let upbtn = document.createElement('button');
        upbtn.classList += 'btn li-btn btn-dark mx-1 up';
        upbtn.innerHTML = upsvg;
        upbtn.addEventListener('click', function () {
            let curr = this.parentNode;
            let preSibling = this.parentNode.previousSibling;
            console.log(ul);
            
            ul.insertBefore(curr, preSibling);
            HandlesButtons();
        });
        //console.log(upbtn);

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList += 'check';
        checkbox.addEventListener('change',function(){
            if(this.checked){
                this.previousSibling.classList.add('checked');
            }
            else{
                this.previousSibling.classList.remove('checked');
            }
        });

        li.appendChild(h4);
        li.appendChild(checkbox);
        li.appendChild(crossbtn);
        li.appendChild(downbtn);
        li.appendChild(upbtn);
        // console.log(li);

        ul.appendChild(li);

        HandlesButtons();
    }

    let deleteListItems = function(){
        ul = document.getElementsByClassName('todo-list')[0];
        let count = ul.childElementCount;
        let copyarr = [];
        for( let i=0 ; i < count ; i++ ) {
            let check = ul.children[i].children[1];
            if(check.checked){
                copyarr.push(check.parentNode);
            }
        }

        let arrcount = copyarr.length;
        
        for( let i=0 ; i < arrcount ; i++ ) {
            ul.removeChild(copyarr[i]);
        }
        HandlesButtons();
    }

    let sortListItems = function(){
        ul = document.getElementsByClassName('todo-list')[0];
        let count = ul.childElementCount;
        for( let i=0 ; i < count ; i++ ) {
            let check = ul.children[i].children[1];
            if(!check.checked){
                console.log("log" + i);
                
                for(let j=0 ; j < i ; j++){
                    let check2 = ul.children[j].children[1];
                    if(check2.checked){
                        ul.insertBefore(ul.children[i],ul.children[j]);
                        break;
                    }
                }
            }
        }
        HandlesButtons();
    }

    let addBtn = this.document.getElementsByClassName('add-btn')[0];
    addBtn.addEventListener('click', addListItem);

    let deleteBtn = this.document.getElementsByClassName('delete-btn')[0];
    deleteBtn.addEventListener('click', deleteListItems)

    let sortBtn = this.document.getElementsByClassName('sort-btn')[0];
    sortBtn.addEventListener('click', sortListItems);
    
}
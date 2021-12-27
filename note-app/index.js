    const addNote = document.getElementById('addNote');
    const notes = document.getElementsByClassName('notes')[0];

    // 如果有資料在本機端，就執行init()
    if (JSON.parse(localStorage.getItem('notes')) !== null) {
        init();
    }

    // 渲染資料
    function init(){
        // 取得本機端資料
        const lsData = JSON.parse(localStorage.getItem('notes'));

        lsData.forEach(item => {
            // 判斷如果沒有內容，就不渲染
            if(!(item.title == "" && item.text == "")) {
                createNewNote(item)
            }
        });
    }

    addNote.addEventListener('click', createNewNote)
    

    function createNewNote(item){

        const note = document.createElement('div');
        note.classList.add('note');

        note.innerHTML =
            `
            <div class="tool">
                <span class="title">${item.title == undefined ? '' : item.title}</span>
                <input class="titleInput" value="${item.title == undefined ? '' : item.title}"></input>
                <span>
                <button class="edit">
                    <i class="far fa-edit"></i>
                </button>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
                </span>
            </div>
            <div class="contentBox">
                <textarea class="textInput disable" disabled="true">${item.text == undefined ? '' : item.text}</textarea>
            </div> 
            
            `;

        
        // 每創建一個note就綁定事件上去
        notes.append(note);
        const editBtn = note.getElementsByClassName('edit')[0];
        const deleteBtn = note.getElementsByClassName('delete')[0];
        const title = note.getElementsByClassName('title')[0];
        const titleInput = note.getElementsByClassName('titleInput')[0];
        const textArea = note.getElementsByClassName('textInput')[0];

        editBtn.addEventListener('click', focusItem)

        function focusItem(){
            title.classList.toggle('hide');
            titleInput.classList.toggle('show');
            const textEditing = textArea.getAttribute('disabled');

            // 屬性的布林值是字串
            if ( textEditing == 'true' ) {
                textArea.removeAttribute('disabled');
                textArea.classList.remove('disable');
            } else if( textEditing == null ) {
                textArea.setAttribute('disabled', true);
                textArea.classList.add('disable');
            }
            textArea.focus();
        }

        deleteBtn.addEventListener('click', ()=>{
            note.remove();
            updateLs()
        })


        titleInput.addEventListener('input', ()=>{
            title.innerText = titleInput.value;
            updateLs()
        })

        textArea.addEventListener('input', ()=>{
            updateLs()
        })
        
    }

    // 用戶輸入時同步更新到LocalStorage
    function updateLs(){
        // 取得所有textarea跟titleInput
        const textArea = document.querySelectorAll('textarea');
        const titleInput = document.querySelectorAll('.titleInput');
        const data = [];

        for (let i=0; i<textArea.length;i++) {
            // 用物件儲存每一個note的資料
            const notesData = {'title': '', 'text': ''};
            notesData.title = titleInput[i].value;
            notesData.text = textArea[i].value;
            data.push(notesData);
        }

        // 更新到LocalStorage
        localStorage.setItem('notes', JSON.stringify(data))
    }

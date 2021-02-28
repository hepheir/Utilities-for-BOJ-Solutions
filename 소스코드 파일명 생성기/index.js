javascript: (() => {
    const statusTable = document.getElementById('status-table');
    const option = {};

    function makeForm() {
        const form = document.createElement('form');
        const form_input_guide = [
            {
                type: 'checkbox',
                name: 'includesTimeOnCorrect',
                label: '"맞았습니다!!"일때 메모리 포함',
                checked: true,
            },
            {
                type: 'checkbox',
                name: 'includesMemoryOnCorrect',
                label: '"맞았습니다!!"일때 시간 포함',
                checked: true,
            },
            {
                type: 'checkbox',
                name: 'includesExt',
                label: '소스코드 확장자 포함',
                checked: false,
            },
            {
                type: 'checkbox',
                name: 'useClipboard',
                label: '파일명 클립보드에 복사',
                checked: true,
            },
            {
                type: 'checkbox',
                name: 'showDatetimeUsingAlert',
                label: '제출시간 알림',
                checked: false,
            },
        ];
    
        for (const inputGuide of form_input_guide) {
            const { type, name, label, checked } = inputGuide;
            const inputNode = document.createElement('input');
            const labelNode = document.createElement('label');
            const wrapperNode = document.createElement('p');
    
            inputNode.type = type;
            inputNode.name = name;
            inputNode.id = name;
            inputNode.checked = checked;
            inputNode.style.marginRight = '16px';
            labelNode.for = name;
            labelNode.innerText = label+'  ';

            option[name] = (node => () => node.checked)(inputNode);
            
            wrapperNode.appendChild(inputNode);
            wrapperNode.appendChild(labelNode);
            form.appendChild(wrapperNode);
        }
    
        statusTable.parentNode.parentNode.insertBefore(form, statusTable.parentNode);
    }

    function onButtonClick(event) {
        const statusTableRow = event.target.parentNode.parentNode;
        const cells = statusTableRow.getElementsByTagName('td');
        const result = {
            id: cells[1].innerText,
            user: cells[2].innerText,
            problem: cells[3].innerText,
            verdict : cells[4].innerText,
            memory: cells[5].innerText,
            time: cells[6].innerText,
            language: cells[7].innerText,
            length: cells[8].innerText,
            datetime: cells[9].children[0].getAttribute('data-original-title'),
        };
        const data = [result.id, result.verdict];
        var filename = '';
        var ext = '';

        if (option.includesMemoryOnCorrect() && verdict == '맞았습니다!!') {
            data.push(result.memory+' KB');
        }

        if (option.includesTimeOnCorrect() && verdict == '맞았습니다!!') {
            data.push(result.time+' ms');
        }
        
        if (option.includesExt()) {
            if (result.language.includes('Python') || result.language.includes('PyPy3')) {
                ext = '.py';
            } else if (result.language.includes('Java 11')) {
                ext = '.java';
            } else if (result.language.includes('C++')) {
                ext = '.cpp';
            }
        }

        filename = data.join(' ') + ext;
        console.log(filename);

        if (option.useClipboard()) navigator.clipboard.writeText(filename);
        if (option.showDatetimeUsingAlert()) alert(result.datetime);
    }

    function createButtonElement() {
        const button = document.createElement('button');

        button.style.borderRadius = '3px';
        button.style.color = '#fff';
        button.style.backgroundColor = '#3071a9';
        button.style.borderColor = '#285e8e';
        button.style.padding = '5px 10px';
        button.style.fontSize = '12px';
        button.style.lineHeight = '1.5';
        button.innerHTML = '생성';

        return button;
    }

    function makeButtons() {
        const statusTableRows = statusTable.getElementsByTagName('tr');

        for (let i=0; i<statusTableRows.length; i++) {
            const celltype = (i == 0) ? 'th' : 'td';
            const cell = document.createElement(celltype);
    
            if (i == 0) {
                cell.innerHTML = '파일명';
            } else {
                const button = createButtonElement();
                button.addEventListener('click', onButtonClick);
                cell.appendChild(button);
            }
            
            statusTableRows[i].insertBefore(cell, statusTableRows[i].getElementsByTagName(celltype)[0]);
        }
    }

    makeForm();
    makeButtons();
})();

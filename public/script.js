let selectedDecisionId = null;

async function createDecision() {
    const name = document.getElementById('decisionInput').value;
    await fetch('/api/decisions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    document.getElementById('decisionInput').value = '';
    fetchDecisions();
}

async function selectDecision(id, name) {
    selectedDecisionId = id;
    document.getElementById('decisionDetail').style.display = 'block';
    document.getElementById('decisionName').textContent = name;
    fetchOptions(); // Ensure options are fetched when decision is selected
}

async function deleteDecision(id) {
    await fetch(`/api/decisions/${id}`, { method: 'DELETE' });
    if (id === selectedDecisionId) {
        document.getElementById('decisionDetail').style.display = 'none';
    }
    fetchDecisions();
}

async function fetchDecisions() {
    const response = await fetch('/api/decisions');
    const decisions = await response.json();
    const decisionList = document.getElementById('decisionList');
    decisionList.innerHTML = ''; // 清空列表
    decisions.forEach(decision => {
        const listItem = document.createElement('li');
        listItem.classList.add('decision-item');
        listItem.innerHTML = `
            <span class="decision-text">${decision.name}</span>
            <div class="button-group">
                <button onclick="selectDecision(${decision.id}, '${decision.name}')">Select</button>
                <button onclick="deleteDecision(${decision.id})">Delete</button>
            </div>
        `;
        decisionList.appendChild(listItem);
    });
}

async function fetchOptions() {
    if (selectedDecisionId === null) return; // 防止未选择决策时请求选项
    const response = await fetch(`/api/decisions/${selectedDecisionId}/options`);
    const options = await response.json();
    console.log(options); // 调试输出：查看返回的选项数据
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = ''; // 清空选项列表

    // 如果有选项数据，逐一渲染
    if (options && options.length > 0) {
        options.forEach(option => {
            const listItem = document.createElement('li');
            listItem.classList.add('option-item');
            listItem.innerHTML = `
                <span class="option-text">${option.text}</span>
                <div class="button-group">
                    <button onclick="editOption(${option.id})">Edit</button>
                    <button onclick="deleteOption(${option.id})">Delete</button>
                </div>
            `;
            optionsList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'No options available';
        optionsList.appendChild(listItem);
    }
}

async function addOption() {
    const text = document.getElementById('optionInput').value;
    if (!text) return; // 防止添加空选项

    // 添加新选项到数据库
    const response = await fetch(`/api/decisions/${selectedDecisionId}/options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    if (response.ok) {
        // 清空输入框，并重新获取选项
        document.getElementById('optionInput').value = ''; 
        fetchOptions(); // 刷新选项列表
    } else {
        console.error('Failed to add option');
    }
}

async function editOption(id) {
    const newText = prompt("Edit option:");
    if (newText) {
        await fetch(`/api/options/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newText })
        });
        fetchOptions();
    }
}

async function deleteOption(id) {
    await fetch(`/api/options/${id}`, { method: 'DELETE' });
    fetchOptions();
}

async function selectRandom() {
    const response = await fetch(`/api/decisions/${selectedDecisionId}/random`);
    const option = await response.json();
    document.getElementById('randomOption').textContent = option ? option.text : 'No options available';
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

fetchDecisions();

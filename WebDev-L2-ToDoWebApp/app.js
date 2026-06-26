// Data Layer initialization loaded safely from local storage context
let tasks = JSON.parse(localStorage.getItem('studio_todo_tasks')) || [];

// DOM Element Registry 
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const addTaskBtn = document.getElementById('addTaskBtn');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const pendingCounter = document.getElementById('pendingCounter');
const completedCounter = document.getElementById('completedCounter');
const progressPercent = document.getElementById('progressPercent');
const clearAllBtn = document.getElementById('clearAllBtn');

function saveState() {
    localStorage.setItem('studio_todo_tasks', JSON.stringify(tasks));
}

function generateCleanTimestamp() {
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const dateOptions = { month: 'short', day: 'numeric' };
    const now = new Date();
    return `${now.toLocaleDateString(undefined, dateOptions)} at ${now.toLocaleTimeString(undefined, timeOptions)}`;
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        priority: prioritySelect.value,
        completed: false,
        createdAt: generateCleanTimestamp(),
        completedAt: null
    };

    tasks.push(newTask);
    taskInput.value = '';
    // Maintain mid priority fallback defaults
    prioritySelect.value = 'Medium';
    saveState();
    render();
}

function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            const currentStatus = !task.completed;
            return {
                ...task,
                completed: currentStatus,
                completedAt: currentStatus ? generateCleanTimestamp() : null
            };
        }
        return task;
    });
    saveState();
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveState();
    render();
}

function clearCompletedArchive() {
    tasks = tasks.filter(task => !task.completed);
    saveState();
    render();
}

function initiateInlineEdit(id, textSpan, textRowElement) {
    const match = tasks.find(t => t.id === id);
    if (!match) return;

    const editField = document.createElement('input');
    editField.type = 'text';
    editField.className = 'edit-input';
    editField.value = match.text;

    textRowElement.replaceChild(editField, textSpan);
    editField.focus();

    function commitChanges() {
        const validatedText = editField.value.trim();
        if (validatedText) {
            match.text = validatedText;
            saveState();
        }
        render();
    }

    editField.addEventListener('blur', commitChanges);
    editField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') commitChanges();
    });
}

function render() {
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    const pendingSet = tasks.filter(t => !t.completed);
    const completedSet = tasks.filter(t => t.completed);

    // Update Text Layer Counters
    pendingCounter.textContent = `${pendingSet.length} Active`;
    completedCounter.textContent = `${completedSet.length} Done`;

    // Calculate Progress Ring Ratios
    const totalCount = tasks.length;
    const ratio = totalCount > 0 ? Math.round((completedSet.length / totalCount) * 100) : 0;
    progressPercent.textContent = `${ratio}%`;

    // Process structural layouts for empty sets
    if (pendingSet.length === 0) {
        pendingList.innerHTML = '<div class="empty-msg">Clear runway. No active actions logged! ✨</div>';
    }
    if (completedSet.length === 0) {
        completedList.innerHTML = '<div class="empty-msg">Archive space empty. Complete a task to index it.</div>';
    }

    // Populate Active Elements
    pendingSet.forEach(task => pendingList.appendChild(buildTaskNode(task)));
    // Populate Settled Elements
    completedSet.forEach(task => completedList.appendChild(buildTaskNode(task)));
}

function buildTaskNode(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';

    const textRow = document.createElement('div');
    textRow.className = 'text-row';

    // Priority Identification Component
    const prioTag = document.createElement('span');
    prioTag.className = `priority-tag prio-${task.priority}`;
    prioTag.textContent = task.priority;

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    textRow.appendChild(prioTag);
    textRow.appendChild(textSpan);

    const stampSpan = document.createElement('span');
    stampSpan.className = 'timestamp';
    stampSpan.textContent = task.completed ? `Closed: ${task.completedAt}` : `Created: ${task.createdAt}`;

    contentDiv.appendChild(textRow);
    contentDiv.appendChild(stampSpan);

    // Context Control Buttons
    const actionWrapper = document.createElement('div');
    actionWrapper.className = 'actions';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn-icon btn-complete';
    completeBtn.textContent = task.completed ? 'Reopen' : 'Close';
    completeBtn.onclick = () => toggleTaskStatus(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon btn-delete';
    deleteBtn.textContent = 'Drop';
    deleteBtn.onclick = () => deleteTask(task.id);

    actionWrapper.appendChild(completeBtn);

    if (!task.completed) {
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-icon btn-edit';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => initiateInlineEdit(task.id, textSpan, textRow);
        actionWrapper.appendChild(editBtn);
    }

    actionWrapper.appendChild(deleteBtn);
    li.appendChild(contentDiv);
    li.appendChild(actionWrapper);

    return li;
}

// Global Event Declarations
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
clearAllBtn.addEventListener('click', clearCompletedArchive);

// Initial Context Execution
render();
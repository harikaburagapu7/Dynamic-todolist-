const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-button');
const todoList = document.getElementById('all-todos');
const delSelectedBtn = document.getElementById('delete-selected');
const delAllBtn = document.getElementById('delete-all');
const filters = document.querySelectorAll('.filter-btn');
const completedCount = document.getElementById('c-count');
const totalCount = document.getElementById('r-count');
const themeSwitch = document.getElementById('theme-switch');

let todos = [];

// Render the list of todos with an optional filter
function renderTodos(filter = 'all') {
  todoList.innerHTML = '';
  const filtered = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', todo.completed);

    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" ${todo.completed ? 'checked' : ''}> ${todo.text}`;

    // Delete individual todo button
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '❌';
    delBtn.onclick = () => {
      todos.splice(index, 1);
      renderTodos(filter);
      updateCounts();
    };

    // Toggle completed state on checkbox change
    label.querySelector('input').onchange = () => {
      todo.completed = !todo.completed;
      renderTodos(filter);
      updateCounts();
    };

    li.append(label, delBtn);
    todoList.appendChild(li);
  });
}

// Update completed and total task counters
function updateCounts() {
  const completed = todos.filter(t => t.completed).length;
  completedCount.textContent = completed;
  totalCount.textContent = todos.length;
}

// Add new todo item
addBtn.onclick = () => {
  const val = todoInput.value.trim();
  if (!val) {
    todoInput.classList.add('input-error');
    setTimeout(() => todoInput.classList.remove('input-error'), 1000);
    return;
  }
  todos.push({ text: val, completed: false });
  todoInput.value = '';
  renderTodos();
  updateCounts();
};

// Add todo on Enter key
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

// Delete all completed todos
delSelectedBtn.onclick = () => {
  todos = todos.filter(t => !t.completed);
  renderTodos();
  updateCounts();
};

// Delete all todos (with confirmation)
delAllBtn.onclick = () => {
  if (confirm('Are you sure you want to delete all tasks?')) {
    todos = [];
    renderTodos();
    updateCounts();
  }
};

// Filter buttons event listener
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTodos(btn.getAttribute('data-filter'));
  });
});

// Dark mode toggle
themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
});

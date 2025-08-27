import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [exportInfo, setExportInfo] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/todos');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.log('Backend not available, using dummy data');
    }
  };

  const addTask = async () => {
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const savedTask = await response.json();
        setTasks([...tasks, savedTask]);
      } else {
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      console.log('Backend not available, adding to local state');
      setTasks([...tasks, newTask]);
    }

    setInputValue('');
  };

  const exportToTxt = () => {
    const txtContent = tasks.map((task, index) => 
      `${index + 1}. ${task.text} (作成日時: ${new Date(task.createdAt).toLocaleString('ja-JP')})`
    ).join('\n');

    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todo-list-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportInfo(`${tasks.length}件のタスクをtxtファイルに出力しました。ダウンロードが開始されます。`);
    setTimeout(() => setExportInfo(''), 5000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Todoリスト</h1>
      
      <div className="input-section">
        <input
          type="text"
          className="task-input"
          placeholder="新しいタスクを入力してください"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="add-button" onClick={addTask}>
          追加
        </button>
      </div>

      <button className="export-button" onClick={exportToTxt}>
        過去タスクをメモ帳に吐き出す
      </button>

      {exportInfo && (
        <div className="export-info">
          {exportInfo}
        </div>
      )}

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            {task.text}
            <small style={{ display: 'block', color: '#666', marginTop: '5px' }}>
              作成日時: {new Date(task.createdAt).toLocaleString('ja-JP')}
            </small>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          タスクがありません。上記のフォームから新しいタスクを追加してください。
        </p>
      )}
    </div>
  );
}

export default App;

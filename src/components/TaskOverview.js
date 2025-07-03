import React, { useState } from 'react';

const TaskOverview = ({ onBack, newTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskFilter, setTaskFilter] = useState('inbox');

  // Mock task data
  const tasksData = [
    {
      id: 1,
      created: '11.04.2025 09:58',
      source: 'email',
      client: 'Company X',
      asset: 'ABC 7654 2198',
      taskType: 'Maintenance',
      deadline: '24.03.2025',
      notes: 'Routine maintenance check required',
      contact: 'David Thompson',
      contactRole: 'Supervisor',
      contactPhone: '+45 98765432',
      contactEmail: 'dthompson@companyx.com',
      status: {
        asset: true,
        taskType: true,
        deadline: true,
        notes: true,
        contact: true
      }
    },
    {
      id: 2,
      created: '13.04.2025 13:23',
      source: 'phone',
      client: 'Corporation Y',
      asset: 'DEF 1234 7890',
      taskType: 'Repair',
      deadline: '25.04.2025',
      notes: 'Urgent repair needed for hydraulic system',
      contact: 'Sarah Johnson',
      contactRole: 'Manager',
      contactPhone: '+45 87654321',
      contactEmail: 'sjohnson@corporationy.com',
      status: {
        asset: true,
        taskType: false,
        deadline: true,
        notes: false,
        contact: true
      }
    },
    {
      id: 3,
      created: '14.04.2025 10:47',
      source: 'calendar',
      client: 'Business Z',
      asset: 'GHI 5678 1234',
      taskType: 'Inspection',
      deadline: '28.04.2025',
      notes: 'Annual safety inspection due',
      contact: 'Mike Wilson',
      contactRole: 'Technician',
      contactPhone: '+45 76543210',
      contactEmail: 'mwilson@businessz.com',
      status: {
        asset: false,
        taskType: true,
        deadline: true,
        notes: true,
        contact: true
      }
    },
    {
      id: 4,
      created: '16.04.2025 15:09',
      source: 'calendar',
      client: 'Studio Q',
      asset: 'JKL 9999 8888',
      taskType: 'Installation',
      deadline: '30.04.2025',
      notes: 'New equipment installation',
      contact: 'Lisa Anderson',
      contactRole: 'Project Manager',
      contactPhone: '+45 65432109',
      contactEmail: 'landerson@studioq.com',
      status: {
        asset: true,
        taskType: true,
        deadline: false,
        notes: true,
        contact: true
      }
    },
    {
      id: 5,
      created: '18.04.2025 11:12',
      source: 'email',
      client: 'Agency R',
      asset: 'MNO 7777 6666',
      taskType: 'Calibration',
      deadline: '02.05.2025',
      notes: 'Precision calibration required',
      contact: 'Tom Brown',
      contactRole: 'Engineer',
      contactPhone: '+45 54321098',
      contactEmail: 'tbrown@agencyr.com',
      status: {
        asset: true,
        taskType: true,
        deadline: true,
        notes: false,
        contact: true
      }
    },
    {
      id: 6,
      created: '20.04.2025 14:30',
      source: 'phone',
      client: 'Startup S',
      asset: 'PQR 4444 3333',
      taskType: 'Maintenance',
      deadline: '05.05.2025',
      notes: 'Preventive maintenance schedule',
      contact: 'Anna Davis',
      contactRole: 'Operations',
      contactPhone: '+45 43210987',
      contactEmail: 'adavis@startups.com',
      status: {
        asset: true,
        taskType: false,
        deadline: false,
        notes: true,
        contact: true
      }
    }
  ];

  const [tasks, setTasks] = useState(tasksData);
  const [editedTask, setEditedTask] = useState(null);

  // Handle new task addition
  React.useEffect(() => {
    if (newTask) {
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setSelectedTask(newTask);
      setEditedTask({ ...newTask });
    }
  }, [newTask]);

  // Initialize with first task selected
  React.useEffect(() => {
    if (tasks.length > 0 && !selectedTask) {
      setSelectedTask(tasks[0]);
      setEditedTask({ ...tasks[0] });
    }
  }, [tasks, selectedTask]);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setEditedTask({ ...task });
  };

  const handleTaskUpdate = (field, value) => {
    setEditedTask(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      
      // Update status based on field values
      const newStatus = { ...prev.status };
      if (field === 'asset') {
        newStatus.asset = value !== '';
      } else if (field === 'taskType') {
        newStatus.taskType = value !== '';
      } else if (field === 'deadline') {
        newStatus.deadline = value !== '';
      } else if (field === 'notes') {
        newStatus.notes = value !== '';
      } else if (field === 'contact' || field === 'contactRole' || field === 'contactPhone' || field === 'contactEmail') {
        // Contact is complete if at least contact name and one contact method is filled
        newStatus.contact = updated.contact !== '' && (updated.contactPhone !== '' || updated.contactEmail !== '');
      }
      
      updated.status = newStatus;
      return updated;
    });
  };

  const handleSaveTask = () => {
    const updatedTasks = tasks.map(task => 
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(editedTask);
    // Show success message or toast
  };

  const handleSaveAndApprove = () => {
    handleSaveTask();
    // Additional approval logic here
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter(task => task.id !== selectedTask.id);
    setTasks(updatedTasks);
    setSelectedTask(updatedTasks.length > 0 ? updatedTasks[0] : null);
    setEditedTask(updatedTasks.length > 0 ? { ...updatedTasks[0] } : null);
  };

  const handleNewTask = () => {
    // Create a new task template with empty fields
    const newTaskTemplate = {
      id: Date.now(), // Simple ID generation
      created: new Date().toLocaleString('de-DE'),
      source: 'manual',
      client: '',
      asset: '',
      taskType: '',
      deadline: '',
      notes: '',
      contact: '',
      contactRole: '',
      contactPhone: '',
      contactEmail: '',
      status: {
        asset: false,
        taskType: false,
        deadline: false,
        notes: false,
        contact: false
      }
    };
    
    // Add the new task to the top of the list
    setTasks(prevTasks => [newTaskTemplate, ...prevTasks]);
    setSelectedTask(newTaskTemplate);
    setEditedTask({ ...newTaskTemplate });
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'email':
        return 'fas fa-envelope';
      case 'phone':
        return 'fas fa-phone';
      case 'calendar':
        return 'fas fa-calendar';
      case 'manual':
        return 'fas fa-plus';
      default:
        return 'fas fa-file';
    }
  };

  const getStatusIcon = (status) => {
    return status ? 'fas fa-check' : 'fas fa-flag';
  };

  const getStatusColor = (status) => {
    return status ? '#4ECDC4' : '#ff6b6b';
  };

  const inboxCount = tasks.filter(task => 
    Object.values(task.status).some(status => !status)
  ).length;

  return (
    <div className="task-overview">
      <div className="section-header">
        <h1>Tasks</h1>
      </div>

      <div className="task-content">
        <div className="task-left-panel">
          <div className="task-header">
            <div className="task-tabs">
              <button 
                className={`task-tab ${taskFilter === 'inbox' ? 'active' : ''}`}
                onClick={() => setTaskFilter('inbox')}
              >
                Inbox ({inboxCount})
              </button>
              <button 
                className={`task-tab ${taskFilter === 'approved' ? 'active' : ''}`}
                onClick={() => setTaskFilter('approved')}
              >
                Approved Tasks
              </button>
            </div>
            <div className="task-actions">
              <button className="btn-filter">
                <i className="fas fa-filter"></i>
                Filter results
              </button>
              <button className="btn-primary" onClick={handleNewTask}>
                <i className="fas fa-plus"></i>
                New Task
              </button>
            </div>
          </div>

          <div className="task-list">
            <div className="task-list-header">
              <div className="header-col created">Created <i className="fas fa-sort-down"></i></div>
              <div className="header-col source">Source</div>
              <div className="header-col client">Client</div>
              <div className="header-col asset">Asset</div>
              <div className="header-col task-type">Task type</div>
              <div className="header-col deadline">Deadline</div>
              <div className="header-col notes">Notes</div>
              <div className="header-col contact">Contact</div>
            </div>

            <div className="task-list-body">
              {tasks.map(task => (
                <div 
                  key={task.id}
                  className={`task-row ${selectedTask?.id === task.id ? 'selected' : ''}`}
                  onClick={() => handleTaskSelect(task)}
                >
                  <div className="task-col created">{task.created}</div>
                  <div className="task-col source">
                    <i className={getSourceIcon(task.source)}></i>
                  </div>
                  <div className="task-col client">{task.client}</div>
                  <div className="task-col asset">
                    <i 
                      className={getStatusIcon(task.status.asset)}
                      style={{ color: getStatusColor(task.status.asset) }}
                    ></i>
                  </div>
                  <div className="task-col task-type">
                    <i 
                      className={getStatusIcon(task.status.taskType)}
                      style={{ color: getStatusColor(task.status.taskType) }}
                    ></i>
                  </div>
                  <div className="task-col deadline">
                    <i 
                      className={getStatusIcon(task.status.deadline)}
                      style={{ color: getStatusColor(task.status.deadline) }}
                    ></i>
                  </div>
                  <div className="task-col notes">
                    <i 
                      className={getStatusIcon(task.status.notes)}
                      style={{ color: getStatusColor(task.status.notes) }}
                    ></i>
                  </div>
                  <div className="task-col contact">
                    <i 
                      className={getStatusIcon(task.status.contact)}
                      style={{ color: getStatusColor(task.status.contact) }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="task-right-panel">
          {selectedTask && editedTask && (
            <>
              <div className="task-detail-header">
                <h2>Task details</h2>
                <div className="task-detail-meta">
                  <span>Created {selectedTask.created}</span>
                  <span>Source {selectedTask.source}</span>
                </div>
                <div className="task-detail-actions">
                  <button className="btn-delete" onClick={handleDeleteTask}>
                    <i className="fas fa-trash"></i>
                    Delete
                  </button>
                  <button className="btn-save" onClick={handleSaveTask}>
                    <i className="fas fa-save"></i>
                    Save
                  </button>
                  <button className="btn-save-approve" onClick={handleSaveAndApprove}>
                    <i className="fas fa-check"></i>
                    Save & Approve
                  </button>
                </div>
              </div>

              <div className="task-detail-content">
                <div className="task-detail-section">
                  <div className="section-row">
                    <div className="section-left">
                      <h3>Client</h3>
                      <div className="form-group">
                        <label>Client</label>
                        <select 
                          value={editedTask.client}
                          onChange={(e) => handleTaskUpdate('client', e.target.value)}
                          className="form-select"
                        >
                          <option value="">Choose Client</option>
                          <option value="Company X">Company X</option>
                          <option value="Corporation Y">Corporation Y</option>
                          <option value="Business Z">Business Z</option>
                          <option value="Studio Q">Studio Q</option>
                        </select>
                      </div>
                    </div>
                    <div className="section-right">
                      <h3>Contacts</h3>
                      <div className="contact-info">
                        <div className="form-group">
                          <label>Contact Person</label>
                          <input 
                            type="text"
                            value={editedTask.contact}
                            onChange={(e) => handleTaskUpdate('contact', e.target.value)}
                            className="form-input"
                            placeholder="Enter contact person name"
                          />
                        </div>
                        <div className="form-group">
                          <label>Role</label>
                          <input 
                            type="text"
                            value={editedTask.contactRole}
                            onChange={(e) => handleTaskUpdate('contactRole', e.target.value)}
                            className="form-input"
                            placeholder="Enter role/title"
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input 
                            type="tel"
                            value={editedTask.contactPhone}
                            onChange={(e) => handleTaskUpdate('contactPhone', e.target.value)}
                            className="form-input"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input 
                            type="email"
                            value={editedTask.contactEmail}
                            onChange={(e) => handleTaskUpdate('contactEmail', e.target.value)}
                            className="form-input"
                            placeholder="Enter email address"
                          />
                        </div>
                        <button className="btn-add-contact">
                          <i className="fas fa-plus"></i>
                          Add Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="task-detail-section">
                  <h3>Asset</h3>
                  {editedTask.asset ? (
                    <div className="asset-selection">
                      <div className="asset-icon">
                        <i className="fas fa-robot"></i>
                      </div>
                      <div className="asset-info">
                        <div className="asset-id">{editedTask.asset}</div>
                        <div className="asset-details">6-axis Robotic Arm, KT Series</div>
                        <div className="asset-location">Boulevard Way 132, ZX 98765 Villagetown</div>
                      </div>
                      <button className="btn-refresh">
                        <i className="fas fa-sync"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="asset-selection-empty">
                      <div className="form-group">
                        <label>Select Asset</label>
                        <select 
                          value={editedTask.asset}
                          onChange={(e) => handleTaskUpdate('asset', e.target.value)}
                          className="form-select"
                        >
                          <option value="">Choose Asset</option>
                          <option value="ABC 9876 5432">ABC 9876 5432</option>
                          <option value="ABC 7654 2198">ABC 7654 2198</option>
                          <option value="DEF 1234 7890">DEF 1234 7890</option>
                          <option value="GHI 5678 1234">GHI 5678 1234</option>
                          <option value="JKL 9999 8888">JKL 9999 8888</option>
                          <option value="MNO 7777 6666">MNO 7777 6666</option>
                          <option value="PQR 4444 3333">PQR 4444 3333</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="task-detail-section">
                  <h3>Task</h3>
                  <div className="form-group">
                    <label>Task Type</label>
                    <select 
                      value={editedTask.taskType}
                      onChange={(e) => handleTaskUpdate('taskType', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Choose Task type</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Repair">Repair</option>
                      <option value="Inspection">Inspection</option>
                      <option value="Installation">Installation</option>
                      <option value="Calibration">Calibration</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Task Deadline</label>
                    <input 
                      type="date"
                      value={editedTask.deadline?.split('.').reverse().join('-') || ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        const formattedDate = date.toLocaleDateString('de-DE');
                        handleTaskUpdate('deadline', formattedDate);
                      }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Enter Task Notes</label>
                    <textarea 
                      value={editedTask.notes}
                      onChange={(e) => handleTaskUpdate('notes', e.target.value)}
                      className="form-textarea"
                      rows="6"
                      placeholder="Enter task notes..."
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskOverview; 
import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

const API_URL = 'https://poniedzialek-5c108.firebaseio.com'


class App extends React.Component {

  state = {
    tasks: [],
    taskName: ""
  }

  addTask = () => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks
      const newTask = ({ taskName: this.state.taskName, completed: false })
      fetch(`${API_URL}/tasks.json`, {
        method: 'POST',
        body: JSON.stringify(newTask)
      })
        .then(response => response.json())
        .then((data) => {
          newTask.id = data.name
          tasks.push(newTask)
          this.setState({ tasks: tasks, taskName: "" })
        })
    }
  }

  handleClick = (event) => {
    this.addTask()
  }

  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) { this.addTask() }
  }

  handleDelete =(id) =>{
    fetch(`${API_URL}/tasks/${id}.json`, {
      method: 'DELETE'
    })
    .then(()=> this.loadData())
  }

  loadData= ()=>{
    fetch(`${API_URL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          return
        }
        const array = Object.entries(data)
        const taskList = array.map(([id, value]) => {
          value.id = id
          return value
        })
        this.setState({ tasks: taskList })
      })
  }

  componentWillMount() {
    this.loadData()
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Add Task"
          value={this.state.taskName}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        >
        </TextField>
        <RaisedButton
          label="+"
          primary={true}
          onClick={this.handleClick}
        />
        <List>
          {this.state.tasks.map((task, index) =>
            (
              <ListItem
                key={task.id}
                primaryText={task.taskName}
                leftCheckbox={<Checkbox />}
                rightIcon={<DeleteIcon onClick={()=>this.handleDelete(task.id)}/>}
              />
            ))}
        </List>
      </div>
    )
  }
}

export default App

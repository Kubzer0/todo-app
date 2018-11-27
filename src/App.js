import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const API_URL = 'https://poniedzialek-5c108.firebaseio.com'

const style = {
  margin: 12,
}

class App extends React.Component {

  state = {
    tasks: [],
    taskName: ""
  }

  handleClick = (event) => {
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

  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }


  componentWillMount() {
    fetch(`${API_URL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        const array = Object.entries(data)
        const taskList = array.map(([id, value]) => {
          value.id = id
          return value
        })
        this.setState({ tasks: taskList })
      })
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Add Task"
          value={this.state.taskName}
          onChange={this.handleChange}
        >
        </TextField>
        <RaisedButton
          label="+"
          primary={true}
          style={style}
          onClick={this.handleClick}
        />
        <div>
          {this.state.tasks.map((task, index) =>
            (
              <div
                key={task.id}
              >
                {task.taskName}
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default App

import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'



const style = {
  margin: 12,
}

class App extends React.Component {

  state = {
    tasks: [
      {
        taskName: 'odkurzanie',
        completed: false
      },
      {
        taskName: 'zmywanie',
        completed: false
      }
    ],
    taskName: ""
  }

  handleClick = (event) => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks
      tasks.push({ taskName: this.state.taskName, completed: false })
      this.setState({ tasks: tasks, taskName: "" })
    }
  }

  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
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
              <div>
                {task.taskName}
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default App

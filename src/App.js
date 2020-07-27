import React, {Component} from 'react';
import './App.css';
import TodoContainer from './components/TodoContainer'
import TodoForm from './components/TodoForm'
import { patchTodo, postTodo, deleteTodo } from './helpers'
import SignupForm from './components/SignupForm';
const todosUrl = "http://localhost:3000/todos/"

class App extends Component {

  state = {
    todos: [],
    user: {},
    alerts: []
  }

  componentDidMount(){
    this.getTodos()
  }

  getTodos = () => {
    fetch(todosUrl)
      .then(response => response.json())
      .then(todos => this.setState({todos}))
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })

    postTodo(newTodo)
  }

  updateTodo = (updatedTodo) => {
    let todos = this.state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)

    this.setState({ todos })

    patchTodo(updatedTodo)
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: filtered
    })

    deleteTodo(id)
  }

  signup = (user) =>{
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify({user})
    }).then(response => response.json())
      .then(response => {
        if(response.errors){
          this.setState({alerts: response.errors})
        } else {
          localStorage.setItem('token', response.token)
          this.setState({
            user: response.user,
            alerts: ["User successfully created!"]
          })
        }
      })
  }

  render(){
    return (
      <div className="App">
        <h1> Todo App </h1>
        <SignupForm signup={this.signup} alerts={this.state.alerts} />
        <TodoForm submitAction={this.addTodo}/>
        <TodoContainer updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={this.state.todos}/>
      </div>
    );
  }
}
export default App;

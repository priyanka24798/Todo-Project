import React from 'react';
import {View, Button, Text, TextInput, ScrollView, StyleSheet, Switch} from 'react-native';
// import {constants} from 'expo'

let id = 0

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }

})

const Todo = props => (
  <View style = {styles.todoContainer}>
    
    
    <Text> {props.todo.text}</Text>
    <Switch value={props.todo.checked} onValueChange ={props.onToggle} />
    <Button onPress={props.onDelete} title = "delete" />
  </View>
)

export default class App extends React.Component{

  constructor(){
    super();
    this.state = {
      todos : [],
      inputTask: '',
    };
  }
  addTodo(text){
    var text1 = text;
    
    this.setState({
        todos : [...this.state.todos, 
            {id: id++, text: text1, checked: false}],
        inputTask: '',
    })
  }
  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }
  render() {
    return (
      <View>
        
        <Text style = {{fontWeight: 'bold', fontSize: 35, alignSelf: "center", padding : 50}}>Todo List</Text>
    
        <ScrollView>
          {this.state.todos.map(todo => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
          
        </ScrollView>
        <Text style = {{paddingTop: 50, alignSelf: 'flex-start',fontWeight: 'bold'}}>Enter your tasks : </Text>
        <TextInput id = "inputTask" type="text" onChangeText = { (inputTask) => this.setState({inputTask}) } 
            value = {this.state.inputTask} placeholder="Write the task here.."/>
        <Button onPress={() => this.addTodo(this.state.inputTask)} title = "Add TODO" />   
      </View>
    )
  }
}


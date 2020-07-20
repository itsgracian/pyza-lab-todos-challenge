import React, { useState, ChangeEvent, MouseEvent, FC } from 'react'
import ViewTodos from './view.todos'
import { IState } from './types'
import './todos.scss'
import CreateTodo from './create.todo'
import { connect, ConnectedProps } from 'react-redux'
import { addTodo } from '../../redux/todos/actions'
import { AppState } from '../../redux'

const mapState = (state: AppState) => ({
  todoReducer: state.todos,
})
const connector = connect(mapState, { addTodo })
type Iprops = ConnectedProps<typeof connector>
const Todos: FC<Iprops> = (props) => {
  const [state, setState] = useState<IState>({ open: false, title: '', category: '', date: '' })
  const onHandleModal = () => {
    setState({ ...state, open: !state.open })
  }
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const onGenerateUuid = (): string => {
    return `${Math.random() * 1000}`
  }
  const onSubmit = (e: MouseEvent) => {
    e.preventDefault()
  }
  return (
    <div className="todos">
      {state.open && (
        <CreateTodo
          onClose={onHandleModal}
          onChange={onChange}
          onSubmit={onSubmit}
          stateProps={state}
        />
      )}
      <div className="todo-header">
        <div className="container">
          <div className="user-info">
            <div className="logo"></div>
            <div className="name">Hi Clark!</div>
          </div>
          <div className="pending-task">
            You have 6 pending tasks <b>today</b>
          </div>
          <div className="buckets">
            <div className="bold">Buckets</div>
            <div className="categories">
              <div className="category">All</div>
              <div className="category">Chores</div>
              <div className="category">Material Study</div>
            </div>
          </div>
        </div>
      </div>
      <ViewTodos onHandleModal={onHandleModal} />
    </div>
  )
}
export default connector(Todos)

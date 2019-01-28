import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://39.107.127.240:8000'
})

export default {
  // 获取todolist type 表示已完成和未完成
  getTodoList: (data) => instance.get('/api/todolist', {params: data}),
  // 增加一个代办事项
  addTodo: (data) => instance.post('/api/todo/', data),
  // 标记一个代办事项已完成
  markTodoDone: (data) => instance.put('/api/todo/', data),
  // 修改一个待办事项
  modifyTodo: (data) => instance.put(`/api/todo/${data.id}/`, data),
  // 删除一个代办事项
  deleteTodo: (data) => instance.delete(`/api/todo/${data.id}/`),
}

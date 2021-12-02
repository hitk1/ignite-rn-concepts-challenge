import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(oldValue => [
      ...oldValue,
      {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
    ])
  }

  function handleToggleTaskDone(id: number) {
    const foundTask = tasks.find(item => item.id === id)

    if (foundTask) {
      foundTask.done = !foundTask.done
      const newTasks = tasks.map(item => ({ ...item })).filter(item => item.id !== foundTask.id)
      newTasks.push(foundTask)

      setTasks(newTasks)
    }

  }

  function handleRemoveTask(id: number) {
    setTasks(oldValue => oldValue.filter(item => item.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
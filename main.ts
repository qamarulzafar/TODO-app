#! /usr/bin/env node

import inquirer from "inquirer";

interface Todo {
    id: number;
    task: string;
}

let todos: Todo[] = [];
let currentId = 1;

async function main() {
    while (true) {
        const { action } = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["Add todo", "List todos", "Delete todo", "Exit"],
        });

        switch (action) {
            case "Add todo":
                await addTodo();
                break;
            case "List todos":
                listTodos();
                break;
            case "Delete todo":
                await deleteTodo();
                break;
            case "Exit":
                console.log("Exiting...");
                return;
        }
    }
}

async function addTodo() {
    const { task } = await inquirer.prompt({
        type: "input",
        name: "task",
        message: "Enter the task:",
    });
    todos.push({ id: currentId++, task });
    console.log("Todo added successfully!");
}

function listTodos() {
    if (todos.length === 0) {
        console.log("No todos found.");
    } else {
        console.log("Your todo list:");
        todos.forEach(todo => console.log(`${todo.id}: ${todo.task}`));
    }
}

async function deleteTodo() {
    if (todos.length === 0) {
        console.log("No todos to delete.");
        return;
    }

    const { id } = await inquirer.prompt({
        type: "number",
        name: "id",
        message: "Enter the ID of the todo to delete:",
    });

    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        console.log("Todo deleted successfully!");
    } else {
        console.log("Todo not found.");
    }
}

main().catch(err => console.error(err));



const initialState = {
    user: {},
    token: ""
}

function userreducer(state = initialState, action) {
    switch (action.type) {
        case "SAVE":

            localStorage.setItem("authToken", action.token)
            return { user: action.user, token: action.token };

        case "REFRESH":

            return { ...state, user: action.user };

        case "CLEAR":

            localStorage.removeItem("authToken")
            return { user: {}, token: "" };

        case "LOAD_TASKS":

            return { ...state, tasks: action.tasks }

        case "ADD_TASK":
            
            const tasks = [...state.tasks, action.task]
            return {...state, tasks}

        case "DELETE_TASK":

            const filteredTasks = state.tasks.filter((task) => {
                return task._id !== action.taskId
            })
            return { ...state, tasks: filteredTasks }

        case "UPDATE_TASK":

            state.tasks.forEach((task) => {
                if (task._id === action.taskId) {
                    task.completed = true;
                }
            })
            return { ...state }

        default:
            return state;
    }
}

export default userreducer
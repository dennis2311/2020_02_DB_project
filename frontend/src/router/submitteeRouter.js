import SubmitteePage from '../components/submittee/SubmitteePage'
import TasklistAndApplyFor from '../components/submittee/TasklistAndApplyFor'

export default [
    {
        path: '/submittee',
        name: 'SubmitteePage',
        component: SubmitteePage
    },
    {
        path: '/submittee/tasklist',
        name: 'TasklistAndApplyFor',
        component: TasklistAndApplyFor
    }
]
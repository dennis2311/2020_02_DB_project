import SubmitteePage from '../components/submittee/SubmitteePage'
import TasklistAndApplyFor from '../components/submittee/TasklistAndApplyFor'
import TaskApply from '../components/submittee/TaskApply'


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
    },
    {
        path: '/submittee/tasklist/:taskname/:userid',
        name: 'TaskApply',
        component: TaskApply
    }
   
]
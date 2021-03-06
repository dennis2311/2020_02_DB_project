import SubmitteePage from '../components/submittee/SubmitteePage'
import TasklistAndApplyFor from '../components/submittee/TasklistAndApplyFor'
import TaskApply from '../components/submittee/TaskApply'
import SubmitFilePage from '../components/submittee/SubmitFilePage'
import SubmitMonitor from '../components/submittee/SubmitMonitor'

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
    },
    {
        path: '/submittee/submitfilepage',
        name: 'SubmitFilePage',
        component: SubmitFilePage
    },
    {
        path: '/submittee/submonitor',
        name: 'SubmitMonitor',
        component: SubmitMonitor
    }

]
import AssessorPage from '../components/assessor/AssessorPage'
import ParsingDataFileEvaluate from '../components/assessor/ParsingDataFileEvaluate'
import MonitorHistory from '../components/assessor/MonitorHistory'

export default [
    {
        path: '/assessor',
        name: 'AssessorPage',
        component: AssessorPage
    },
    {
        path: '/assessor/parsingevaluate',
        name: 'ParsingDataFileEvaluate',
        component: ParsingDataFileEvaluate
    },
    {
        path: '/assessor/monitorhistory',
        name: 'MonitorHistory',
        component: MonitorHistory
    }
]
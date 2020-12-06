import AssessorPage from '../components/assessor/AssessorPage'
import ParsingDataFileEvaluate from '../components/assessor/ParsingDataFileEvaluate'
import MonitorHistory from '../components/assessor/MonitorHistory'
import ParsingDataPerAssessor from '../components/assessor/ParsingDataPerAssessor'
import EvalGradeManage from '../components/assessor/EvalGradeManage'

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
        path: '/assessor/parsingevaluate/:userid',
        name: 'ParsingDataPerAssessor',
        component: ParsingDataPerAssessor
    },
    {
        path: '/assessor/monitorhistory',
        name: 'MonitorHistory',
        component: MonitorHistory
    },
    {
        path: '/assessor/evalgrademanage',
        name: 'EvalGradeManage',
        component: EvalGradeManage
    }
]
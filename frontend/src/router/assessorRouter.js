import AssessorPage from '../components/assessor/AssessorPage'
import ParsingDataFileEvaluate from '../components/assessor/ParsingDataFileEvaluate'

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
    }
]
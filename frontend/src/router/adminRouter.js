import AdminPage from '../components/admin/AdminPage'
import TaskCreate from '../components/admin/TaskCreate'
import DefineOriginalDataType from '../components/admin/DefineOriginalDataType'
import DefineOriginalDataType_Schema from '../components/admin/DefineOriginalDataType_Schema'
import TaskManage from '../components/admin/TaskManage'
import TaskStatistics from '../components/admin/TaskStatistics'
import MemberManage from '../components/admin/MemberManage'
import MemberManage_Each from '../components/admin/MemberManage_Each'
import MemberManage_EachDetail from '../components/admin/MemberManage_EachDetail'

export default [
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage
      },
      {
        path: '/admin/taskcreate',
        name: 'TaskCreate',
        component: TaskCreate
      },
      {
        path: '/admin/defineoriginaldatatype',
        name: 'DefineOriginalDataType',
        component: DefineOriginalDataType
      },
      {
        path: '/admin/defineoriginaldatatype/:taskName',
        name: 'DefineOriginalDataType_Schema',
        component: DefineOriginalDataType_Schema
      },
      {
        path: '/admin/taskmanage',
        name: 'TaskManage',
        component: TaskManage
      },
      {
        path: '/admin/taskstatistics',
        name: 'TaskStatistics',
        component: TaskStatistics
      },
      {
        path: '/admin/membermanage',
        name: 'MemberManage',
        component: MemberManage
      },
      {
        path: '/admin/membermanage/:id',
        name: 'MemberManage_Each',
        component: MemberManage_Each
      },
      {
        path: '/admin/membermanage/:id/:taskname',
        name: 'MemberManage_Each',
        component: MemberManage_EachDetail
      },
]
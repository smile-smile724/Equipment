import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'
import student from '@/pages/student/student.vue'
import teacher from '@/pages/teacher/teacher.vue'
import InfoEdit from '@/pages/InfoEdit/InfoEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/student',
      name: 'student',
      component: student,
      children:[
        // 首页 index
        {
          path: '/student/index',
          name: 'index',
          component:() => import('@/pages/student/index')
        },
        // 设备预约 reservation
        {
          path: '/student/reservation',
          name: 'reservation',
          component:() => import('@/pages/student/reservation')
        },
        // 借用查看 borrowingView
        {
          path: '/student/borrowingView',
          name: 'borrowingView',
          component:() => import('@/pages/student/borrowingView')
        },
        // 信息查看 InformationView
        {
          path: '/student/InformationView',
          name: 'InformationView',
          component:() => import('@/pages/student/InformationView')
        },
        // 个人资料 PersonalInfo
        {
          path: '/student/PersonalInfo',
          name: 'PersonalInfo',
          component:() => import('@/pages/student/PersonalInfo')
        }
      ]
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: teacher,
      children:[
        // 首页 index
        {
          path: '/teacher/index',
          name: 'index',
          component:() => import('@/pages/teacher/index')
        },
        // 设备管理 EquipManage
        {
          path: '/teacher/EquipManage',
          name: 'EquipManage',
          component:() => import('@/pages/teacher/EquipManage')
        },
        // 设备预约审核 OrderExam
        {
          path: '/teacher/OrderExam',
          name: 'OrderExam',
          component:() => import('@/pages/teacher/OrderExam')
        },
        // 设备归还审核 ReturnExam
        {
          path: '/teacher/ReturnExam',
          name: 'ReturnExam',
          component:() => import('@/pages/teacher/ReturnExam')
        },
        // 历史查询 historyView
        {
          path: '/teacher/historyView',
          name: 'historyView',
          component:() => import('@/pages/teacher/historyView')
        },
        // 学生管理 InfoManage
        {
          path: '/teacher/StudentManage',
          name: 'StudentManage',
          component:() => import('@/pages/teacher/StudentManage')
        },
      ]
    },
    {
      path: '/InfoEdit',
      name: 'InfoEdit',
      component: InfoEdit,
      children:[
        // 新闻通知 NewsNotice
        {
          path: '/InfoEdit/NewsNotice',
          name: 'NewsNotice',
          component:() => import('@/pages/InfoEdit/NewsNotice')
        },
        // 仪器说明书 EquipmentInfo
        {
          path: '/InfoEdit/EquipmentInfo',
          name: 'EquipmentInfo',
          component:() => import('@/pages/InfoEdit/EquipmentInfo')
        },
        // 资料衔接 DataLink
        {
          path: '/InfoEdit/DataLink',
          name: 'DataLink',
          component:() => import('@/pages/InfoEdit/DataLink')
        },
        // 记录 EditRecord (设备信息管理)
        {
          path: '/InfoEdit/EditRecord',
          name: 'EditRecord',
          component:() => import('@/pages/InfoEdit/EditRecord')
        },
      ]
    }
  ]
})

import Login from './Auth/component/Login'
import CoreLayout from './Layouts/CoreLayout'
import NavPanelContainer from './Global/NavPanel'
import NavLayout from './Layouts/NavLayout/NavLayout.js'
import CreateCommunity from './CreateCommunity/component/CreateCommunity'
import CommunityView from './CommunityView/container/CommunityView'
import MyCommunity from './MyCommunity/component/MyCommunity'
import MyVolunteerCommunity from './Volunteer/component/MyCommunity'
import MapVolunteer from './MapVolunteer/component/MapVolunteer'
import AuthContainer from './Auth/container/AuthContainer'
export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: { component : AuthContainer},
  childRoutes: [{
  path: '/logged-in',
  component: NavLayout,
  childRoutes: [{
    path: '/volunteer',
    component: CommunityView,
    childRoutes: [{
      path: '/volunteer-community',
      component: MyVolunteerCommunity
    }]
  },
  {
    path: '/communities',
    component: CommunityView,
    childRoutes: [{
      path: '/all-communities',
      component: MyCommunity
    },
    {
      path: '/my-communities',
      component: MyCommunity
    },
    {
      path: '/create-a-community',
      component: CreateCommunity
    },
    {
      path: '/map-volunteer/:communityId/:communityName',
      component: MapVolunteer
    }
    ]
  }
  ] }]})

export default createRoutes

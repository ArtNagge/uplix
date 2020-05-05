import React from 'react'
import { JackpotPage } from '../pages/JackpotPage'
import { FAQPage } from '../pages/FAQPage'
import { LeaderboardPage } from '../pages/LeaderboardPage'
import { ProfilePage } from '../pages/ProfilePage'
import { AuthPage } from '../pages/AuthPage'

const routs = [
  {
    component: JackpotPage,
    exact: true,
    path: '/',
  },
  {
    component: ProfilePage,
    exact: true,
    path: '/profile',
  },
  {
    component: ProfilePage,
    exact: true,
    path: '/profile/:id',
  },
  {
    component: LeaderboardPage,
    exact: true,
    path: '/leaderboard',
  },
  {
    component: FAQPage,
    exact: true,
    path: '/faq',
  },
  {
    component: AuthPage,
    exact: false,
    path: '/oauth_callback',
  },
]

export { routs }

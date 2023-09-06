import React from 'react'
import NormalRoutes from "./NormalRoutes"
import AuthRoutes from "./AuthRoutes"
import { useSelector } from 'react-redux';

const BaseRoutes = () => {
  const user = useSelector(state => state.user);

  return (
        user ?
        <NormalRoutes />
      :
        <AuthRoutes />
  )
}

export default BaseRoutes
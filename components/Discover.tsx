import AuthenticatedLayout from '@/hoc/AuthenticatedLayout'
import React from 'react'
import { Text } from 'react-native'

const DiscoverScreen = () => {
  return (
    <AuthenticatedLayout>
      <Text>Discover Screen</Text>
    </AuthenticatedLayout>
  )
}

export default DiscoverScreen
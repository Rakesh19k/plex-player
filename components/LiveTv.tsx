import AuthenticatedLayout from '@/hoc/AuthenticatedLayout'
import React from 'react'
import { Text } from 'react-native'

const LiveTvScreen = () => {
  return (
    <AuthenticatedLayout>
      <Text>LiveTv</Text>
    </AuthenticatedLayout>
  )
}

export default LiveTvScreen
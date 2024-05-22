import OrderTable from '@/components/admin/OrderTable'
import React from 'react'

const page = () => {
  return (
    <div>
        <OrderTable title='Total Order' desc="every order received ever" />
    </div>
  )
}

export default page
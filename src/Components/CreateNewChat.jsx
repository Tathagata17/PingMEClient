import { PlusCircle } from 'lucide-react'
import React from 'react'

function CreateNewChat() {
  return (
    <div className='bg-white rounded-full w-10 h-10 flex justify-center items-center m-4 relative z-20'>
        <PlusCircle  color='#93C572' />
    </div>
  )
}

export default CreateNewChat
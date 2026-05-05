import React, { useState } from 'react'
import UploadPage from './Components/UploadPage'
import BrowsePage from './Components/BrowsePage'


function App() {

  const [refresh , setRefresh] = useState(true);
  const toggleRefresh = ()=>{
    setRefresh((prev)=>!prev);
  }
  return (
    <div className='min-h-screen bg-blue-50'>
    <h1 className='text-center bg-blue-700 text-white py-3 text-2xl font-bold shadow-md'>PYQ-HUB</h1>
    <div className='max-w-5xl mx-auto px-4 py-6 space-y-6'> 
      <UploadPage onUploadSuccess={toggleRefresh}/>
      <BrowsePage refresh={refresh}  toggleRefresh={toggleRefresh}/>
    </div>
    </div>
  )
}

export default App
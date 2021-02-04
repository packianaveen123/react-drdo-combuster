import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

function App() {
  const [value, onChange] = useState(new Date());
  return (
    <div style={{width:"60%"}}>
       <DatePicker
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default App

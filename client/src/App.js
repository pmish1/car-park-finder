import './App.css';
import {useState, Component} from 'react'

import Result from './components/Results'
import Maps from './components/Map'

export default function App() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState(null)
  

  const handleSubmit = async (event) => {
      event.preventDefault()
      console.log(fetch)
      const res = await fetch(`/api/search/`, {
          method: 'POST',
          headers: {
                      'Content-Type': 'application/json'
                  },
          body: JSON.stringify(query)
      })
      const data = await res.json()
      setResult(data)
      return
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="enter 1-23 and 486-490" 
            name="search_location" 
            onChange={(e) => setQuery(e.target.value)}
            value={query}
        />

        <input type="submit" value="submit" />
      </form>


      <Result result={result}/>

      <Maps />
    </>
  )
}



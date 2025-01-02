import React, { useCallback, useState, useEffect , useRef} from 'react'

const Gen = () => {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
 //useRef hook
 const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = " "
    let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += " 0123456789"
    if (charAllowed) str += "!@#$%^&*()-+{}[]:;'<n .>"


    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])
  
  const copyPasswordToClipBoard = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0 , 12)
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='max-w-md    w-full  shadow-md rounded-lg text-orange-500 bg-stone-900 mx-auto my-8'>
      <h1 className='text-4xl bol font-bold text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg mt-8 overflow-hidden mb-4'>
          <input
            className='outline-none w-full  py-1 px-3'
            type="text"
          placeholder='Password'
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className='bg-blue-500 text-white min-w-max h-12 w-16 shrink-0'
          onClick={copyPasswordToClipBoard}
          >Copy</button>

        </div>
        <div className='flex gap-x-2 text-sm'>
          <div className='flex items-center gap-x-1'>
            <input
              className='cursor-pointer'
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {length}</label>
          </div> 
          <div className='flex items-center   gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label>Number</label>
            <input type="checkbox"
              id="charInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }} />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Gen

import './App.css';
import io from 'socket.io-client'
import {useState, useEffect} from 'react';


const socket = io.connect("http://localhost:5000")


function App() {

  const [state, setState] = useState({
    message: '',
    roomNumber: '',
})

  const [messageReceived, setMessageReceived] = useState('');

  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name] : e.target.value
    })
  }


  const sendMessage = (e) => {
    e.preventDefault();
    console.log(state.message)
    console.log(state.roomNumber)
    socket.emit("send_message", {message: state.message, roomNumber: state.roomNumber})
  }

  const joinRoom = (e) => {
    e.preventDefault();     
    console.log(state.roomNumber)
    socket.emit("join_room", {roomNumber: state.roomNumber})
  }

  useEffect(()=> {
    socket.on('receive_message', (data) => {
      console.log('data frontend',data.message)
      // alert(data.message)
      
      setMessageReceived(data.message)
    })

  }, [socket])
  return (

      <div className="App">

      <input type="text" name="roomNumber" placeholder="Enter your room number here..." onChange={handleChange} value={state.roomNumber}/>



      <button type="submit" onClick={joinRoom}>Change Room</button> <br></br>  <br></br>

      <input type="text" name="message" placeholder="Enter your message here..." onChange={handleChange} value={state.message}/>
   
      <button type="submit" onClick={sendMessage}>Send</button>

      <div>
        {messageReceived}
      </div>
      
    </div>
  );
}

export default App;

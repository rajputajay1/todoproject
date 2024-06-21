
import AuthPage from "./Pages/Register/Register"
import Register from "./Pages/Register/Register"
import AddPeople from "./components/popups/addPeople/AddPeople"
import Delet from "./components/popups/delete/Delet"
import PeopleAdded from "./components/popups/peopleAdded/PeopleAdded"
function App() {

  return (
    <>
      {/* <AuthPage/> */}
      {/* <Delet delete="Delete"/> */}
      {/* <Delet delete="logout"/> */}
      <AddPeople/>
      {/* <PeopleAdded/> */}


    </>
  )
}

export default App

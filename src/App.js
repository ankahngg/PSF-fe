import './App.css';
import Row1 from './components/Row1';
import LeftBar from './components/LeftBar';
import ShowHistory from './components/ShowHistory';
import RightBar from './components/RightBar';

function App() {

  return (
    
    <table>
      <tr><Row1 /></tr>
       <tr>
        <td><LeftBar /></td>
        <td colSpan={5} className='TopAlign'><ShowHistory /></td>
        <td className='TopAlign'><RightBar /></td>
      </tr> 
        
    </table>
  )
}

export default App;

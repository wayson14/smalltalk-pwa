import TopBar from './TopBar';
import BottomBar from './BottomBar';
import PopUp from './PopUp';

const Friends = () => {
  return (
  <div className="name">
      <TopBar/>
      <BottomBar/>
      <h1>Znajomi</h1>
      <div className='Cricles'>
        <PopUp head2={"Ta funkcja będzie dostępna w pełnej wersji aplikacji"} clas={'chatBttns maybeLater'}/>
      </div>
  </div>
  )
}

export default Friends
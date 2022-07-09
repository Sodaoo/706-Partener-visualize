// Sidebar.js
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useStore } from '../store'
import { observer } from 'mobx-react-lite';
import Selects from './Selects';

const Sidebar = () => {
  const {sidebarStore} = useStore();

    //   {/*  isSidebarOpen 为 true : className='sidebar show-sidebar'  显示侧边栏
    // // isSidebarOpen 为 false: className='sidebar'  不显示侧边栏
    // // <aside className={`transform ${sidebarStore.isSidebarOpen ? '' :""}`}> {/* false */} 
    // // </aside>  */}
    // {/* <div>
    // { sidebarStore.isSidebarOpen  && (
    //   <button className="bg-gray-300 mx-4 my-2" bg> <FaBars className='w-30'/> </button>
    // )}
    // </div>
    //  */}

  return (
      <div>
        {!sidebarStore.isSidebarOpen ? 
          (
            <button 
              className='rounded-lg w-full h-full'
              onClick={() => sidebarStore.setSidebar()}
            >
              <FaBars className="bg-white px-2 my-1 w-10 h-6 rounded-xl " />
            </button>
          ): 
          (
            //  <p className='bg-white ' >1</p> 
            <Selects />
          )}
      </div>
    );
};

export default observer(Sidebar);
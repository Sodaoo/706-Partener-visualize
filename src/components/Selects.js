// Tailwind Select Checkbox
//  1.
//  2. 
import React, { useRef } from "react";
// Custom Dependancies
import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { colourOptions } from "./docs/data";
import SelectObjList from "../data/SelectObj.json"

/* Mobx */
import { useStore } from '../store'


/*
Select 需要的数据格式：
export const colourOptions: readonly ColourOption[] = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];
*/

const SelectObj = SelectObjList.lists
// console.log("SelectObj....", SelectObj)
const animatedComponents = makeAnimated();



const Selects = () => {
  const {cateStore, nodeStore, sidebarStore} = useStore()
  const selectref = useRef(null)

  const onMenuCloseHandler = (e) => {
    console.log("xxxxxxxxxxxxxx")
    const checked_ = selectref.current.props.value
    const labels = checked_.map(item => item.label)
    cateStore.setCheckedList(labels)
    nodeStore.nodesItem(labels)
    nodeStore.linksItem(labels)

    sidebarStore.setSidebar()
  }

  return (
    // <div className="flex items-center justify-center p-12">
      <div className="w-full max-w-xs text-blue-500 mx-auto">
        <Select
          ref={selectref}
          onMenuClose={(event)=>{
            onMenuCloseHandler(event)
          }}
          closeMenuOnSelect={false}
          components={animatedComponents}

          // 每次渲染 Selects 组件时，都要 cateStore.list 初始化当前选中的列表
          defaultValue = {
            SelectObj.filter(obj => 
              cateStore.list.includes(obj.label) 
            )
          }
          // defaultValue = { cateStore.initChecked.map(i => SelectObj[i])} 
          // defaultValue={[SelectObj[0], SelectObj[1]]}
          isMulti
          options={SelectObj}
        />
    </div>
  );
}

export default Selects
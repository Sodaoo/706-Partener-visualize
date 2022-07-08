// 导入模块
import CategotyStore from "./category.Store"
import nodeStore from "./node.Store"
import React from "react"

class RootStore {
  // 组合模块
  constructor() {
    this.cateStore = new CategotyStore()
    this.nodeStore = new nodeStore()
  }
}
// 实例化根store注入context
const StoresContext = React.createContext(new RootStore())
// 导出 useStore 方法 供组件调用方法使用store根实例
export const useStore = () => React.useContext(StoresContext)
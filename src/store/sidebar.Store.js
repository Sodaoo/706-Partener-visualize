import {  makeAutoObservable } from 'mobx'

class sidebarStore {
  isSidebarOpen = false;

  constructor() {
    makeAutoObservable(this)
  }

  // 根据 checked list 获取 nodes
  setSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

export default sidebarStore;
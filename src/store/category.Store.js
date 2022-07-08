
import {  makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
//import SelectObj from "../data/SelectObj.json"
import CateObjList from "../data/CategoryList.json"
// import data from "../data/partner_data.json";

// example


class CategotyStore {
  // nodes = data.nodes;
  // links = data.links;
  // defaultChecked = [1,2];
  list = CateObjList.cates.slice(0,2)  ;

  // list = CateObjList.cates.map((item,index) => ({
  //   "index": index,
  //   "id": item,
  //   "isChecked": false
  // }))

  constructor() {
    makeAutoObservable(this)
    // this.list.map((item) => {
    //   if (this.defaultChecked.includes(item.index)) {
    //     item.isChecked = true
    //   }
    //   return item
    // })
    // console.log("nodes", this.nodes)
  }

  // 用户多选的 Label list
  setCheckedList(checkedList_) {
    // console.log("this.list", this.list)
    // const list_ = this.list.filter((item) => checkedList_.includes(item.id))
    // list_.map((item) => item.isChecked = true )
    this.list = checkedList_
  }

  // 获取 checked list
  get checkedItem() {
    // return this.list.filter((item) => item.isChecked)
    return this.list
  }
}
  /*
  // 根据 checked list 获取 nodes
  get nodesItem() {
    console.log("thi,s.", this.list)
    // const checkedlist = this.list.map((item) => item.id)
    // console.log("checkedlist", checkedlist)
    // const checkedlist  = ["社群身份：706notion协作成员",]
    // console.log("checkedlist.length", checkedlist.length)
    const rootList = this.nodes.filter((node) => ( node.type === "Root"))
    const catenodes = this.nodes.filter((node) => ( this.list.includes(node.id)))
    const userodes = this.nodes.filter((node) =>  ( this.list.includes(node.parent)))
    // console.log("this.rootList",rootList)    
    // console.log("this.nodes",  this.nodes)
    console.log("[ ...rootList , ...catenodes , ...userodes ]", [ ...rootList , ...catenodes , ...userodes ])
    return [ ...rootList , ...catenodes , ...userodes ]
    // return this.nodes
  }

  get linksItem() {
    const sourceLinks = this.links.filter((link) => ( this.list.includes(link.source)))
    const targetLinks = this.links.filter((link) => ( this.list.includes(link.target)))
    console.log("targetLinks, source", targetLinks[0], sourceLinks[0])
    console.log("[ ...targetLinks , ...sourceLinks ], links", [ ...targetLinks , ...sourceLinks ])
    return [ ...targetLinks , ...sourceLinks ];
    // return this.links
  }
}

  // 单选操作
  singleCheck(id, isDone){
    // 按 id 查找, 不是 React，所以不用 filter .. 原地修改即可
    const item = this.list.find(item => item.id === id )
    item.isDone = isDone
    // console.log("item.isDone,isDone", item.isDone,isDone)
  }

  // 全选操作： 把所有项的 isDone 属性都按照传入的最新的状态修改
  allCheck(checked) {
    this.list.forEach(item => {
      item.isDone = checked
    })
  }
  // 计算属性： 只有所有子项都是选中的时候，才是选中的状态
  // list.every 会检查每一个数组元素是否满足条件表达，只有都满足才返回 true
  get isAll(){
    console.log("this.list.every(item => item.isDone)", this.list.every(item => item.isDone))
    return this.list.every(item => item.isDone) // true of flase 
  }

  get isFinishedLength(){
    return this.list.filter(item => item.isDone).length
  }
  // Delete Todo
  delTask = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }

  // Add new Todo
  addTask = (task) => {
    this.list.push(task)
  }
  */
export default CategotyStore;
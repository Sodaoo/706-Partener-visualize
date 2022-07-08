
import {  makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import data from "../data/partner_data.json";
import {toJS} from "mobx";

class nodeStore {
  nodes = data.nodes;
  links = data.links;

  constructor() {
    makeAutoObservable(this)
  }

  // 根据 checked list 获取 nodes
  nodesItem(list) {
    const lists = toJS(list)
    const tempnodes = toJS(data.nodes);
    const rootList = tempnodes.filter((node) => ( node.type === "Root"))
    const catenodes = tempnodes.filter((node) => ( lists.includes(node.id)))
    const userodes = tempnodes.filter((node) =>  ( lists.includes(node.parent)))
    // console.log("[ ...rootList , ...catenodes , ...userodes ]", [ ...rootList , ...catenodes , ...userodes ])
    //return [ ...rootList , ...catenodes , ...userodes ]
    this.ndoes = [ ...rootList , ...catenodes , ...userodes ]
    // return this.nodes
  }

  linksItem(list) {
    const lists = toJS(list)
    const templinks = toJS(data.links);  //  [{..}, {..}, {..} ] // 不要用 this.links 直接 filter 否则会无限循环  
    const sourceLinks = templinks.filter((link) => ( lists.includes(link.source))) // [{..}, {..}, {..} ]
    console.log("1 templinks.legth", templinks.length)
    const targetLinks = templinks.filter((link) => ( lists.includes(link.target))) // [{..}, {..}, {..} ]
    console.log("2 templinks.legth", templinks.length)
    // console.log("targetLinks, source", targetLinks[0], sourceLinks[0])
    console.log("-----------------------------------")
    // console.log(" lists :", lists)
    // console.log("[ ...targetLinks ",  [...targetLinks] )
    // console.log("  ...sourceLinks ]", [ ...sourceLinks ])
    this.links = [ ...targetLinks , ...sourceLinks ];
    // return this.links
  }
}

export default nodeStore;
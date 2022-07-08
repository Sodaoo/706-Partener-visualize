import { useCallback, useEffect,useState,useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";
import SpriteText from "three-spritetext";
// import data from "./data/partner_data.json";
import * as THREE from "three";
import Selects from "./components/Selects"

/* Mobx */
import { useStore } from './store'
import { observer } from 'mobx-react-lite'

// import category from "./data/CategoryList.json"
// const categoryList = category.cates
// console.log("cates....", categoryList)


const App = () => {
  const drawNormalNode = useCallback((node) => {
    const sprite = new SpriteText(node.id, 5);
    sprite.color = "#000000";
    sprite.backgroundColor = "#D8D8D8";
    sprite.padding = [8, 4];
    sprite.textHeight = 5;
    sprite.borderRadius = 10;

    return sprite;
  }, []);

  const drawCategoryNode = useCallback((node) => {
    const sprite = new SpriteText(node.id, 5);
    sprite.color = "#000000";
    sprite.backgroundColor = node.color;
    sprite.padding = [8, 4];
    sprite.textHeight = 5;
    sprite.fontWeight = 700;
    sprite.borderRadius = 10;

    return sprite;
  }, []);

  const drawImageNode = useCallback((node) => {
    const { image } = node;
    const imgTexture = new THREE.TextureLoader().load(image.src);
    const material = new THREE.SpriteMaterial({ map: imgTexture });
    const sprite = new THREE.Sprite(material);
    const group = new THREE.Group();
    const spriteText = new SpriteText(node.label || "", 5);
    sprite.scale.set(30, 20);
    group.add(sprite);
    group.add(spriteText);

    return group;
  }, []);

  const nodeThreeObject = useCallback(
    (node) => {
      if (node.type === "Category") {
        return drawCategoryNode(node);
      }
      return node.image ? drawImageNode(node) : drawNormalNode(node);
    },
    [drawCategoryNode, drawImageNode, drawNormalNode]
  );

  const { nodeStore, cateStore } = useStore()
  // // console.log("cateStore....", cateStore.list)
  // // console.log("data.nodes", data.nodes)
  // // data.nodes.filter((node) => ( node.type === "Category")
  // const [nodes, setNodes] = useState(data.nodes);
  // const [links, setLinks] = useState(data.links);
  // console.log("nodes ", nodes)
  // console.log("links ", links)
  // const [catelist, setcatelist]= useState(categoryList.slice(0,80));
  // 根据用户选择的 categorylist 的变化，
  // 显示前端的数据
  // console.log("nodes...",nodes)
  //console.log("cateStore.list...",cateStore.list)
  // useEffect(() => {
  // console.log("cateStore.list...",cateStore.list)
  // console.log("links...",links)
  // console.log("links[0]", links[0])
  // console.log("links[0].source...",links[0].source)
  //   const sourceLinks = links.filter((link) => ( cateStore.list.includes(link.source)))
  //   const targetLinks = links.filter((link) => ( cateStore.list.includes(link.target)))
  //   console.log("targetLinks, source", targetLinks[0], sourceLinks[0])
  //   console.log("[ ...targetLinks , ...sourceLinks ], links", [ ...targetLinks , ...sourceLinks ])
  //   setLinks([ ...targetLinks , ...sourceLinks ]);
  //   // console.log("nodes.", nodes);
  // }, [cateStore.list, cateStore]);
  // const rootList = nodes.filter((node) => ( node.type === "Root"))
  // useEffect(() => {
  //   const catenodes = nodes.filter((node) => ( cateStore.list.includes(node.id)))
  //   const userodes = nodes.filter((node) => ( cateStore.list.includes(node.parent)))
  //   setNodes([ ...rootList , ...catenodes , ...userodes ]);
  // }, [cateStore.list, cateStore]);
  const [nodes, setNodes] = useState(nodeStore.nodes)
  const [links, setLinks] = useState(nodeStore.links)

  useEffect(() => {
    setNodes(nodeStore.nodes);
    setLinks(nodeStore.links)
    return () => {
      setNodes([]);
      setLinks([]);  
    }
  }, [cateStore.list]);

  return (
    <div>
      <div className="flex justify-between bg-black items-center">
        <span className="text-center text-white"> MeshLambertMaterial Bug</span>
        <div className="grid grid-cols-1">
          {/* <button className="rounded-full bg-gray-400 px-3 py-1  mx-4 my-1"> 过滤</button> */}
        </div>
      </div>
      <div className="relative">
        <Selects className="absolute float-right"/>     {/* callbackfunc={callbackFunction} */}

         <ForceGraph3D
        className="relative"
        // graphData={data}
        graphData={{
          nodes: nodes,
          links: links
        }}
        nodeAutoColorBy="group"
        nodeLabel="description"
        nodeThreeObject={nodeThreeObject}
        linkWidth={10}
        />
      </div>
    </div>
  );
};
export default observer(App);
import { useCallback, useEffect,useState,useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";
import SpriteText from "three-spritetext";
import data from "./data/data_.json";
import * as THREE from "three";
import Selects from "./components/Selects"

import category from "./data/CategoryList.json"
const categoryList = category.cates
// console.log("cates....", categoryList)


export default function App() {
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

  // console.log("data.nodes", data.nodes)
  // data.nodes.filter((node) => ( node.type === "Category")
  const [links, setLinks] = useState(data.links);
  const [nodes, setNodes] = useState(data.nodes);
  const [catelist, setcatelist]= useState(categoryList.slice(0,80));

  console.log("links.....", links)


  const callbackFunction = (childData) => {   // 子传父设置类别数据
    setcatelist(childData);
  };
  

  const rootList = nodes.filter((node) => ( node.type === "Root"))
  // 根据用户选择的 categorylist 的变化，
  // 显示前端的数据
  // nodes = ..  setLinks
  // links = ..  setNodes
  useEffect(() => {
    // console.log("nodes.filter((node) => ( catelist.includes(node.id)))]", nodes.filter((node) => ( catelist.includes(node.id))));
    const catenodes = nodes.filter((node) => ( catelist.includes(node.id)))
    const userodes = nodes.filter((node) => ( catelist.includes(node.parent)))
    setNodes([ ...rootList , ...catenodes , ...userodes ]);
  }, [catelist]);

  useEffect(() => {
    const targetLinks = links.filter((link) => ( catelist.includes(link.target)))
    const sourceLinks = links.filter((link) => ( catelist.includes(link.source)))
    console.log("targetLinks, source", targetLinks, sourceLinks)
    setLinks([ ...targetLinks , ...sourceLinks ]);
    // console.log("nodes.", nodes);
  }, [catelist]);

  console.log(nodes, links)
  return (
    <div>
      <div className="flex justify-between bg-black items-center">
        <span className="text-center text-white"> MeshLambertMaterial Bug</span>
        <div className="grid grid-cols-1">
          <Selects callbackfunc={callbackFunction}/>
          {/* <button className="rounded-full bg-gray-400 px-3 py-1  mx-4 my-1"> 过滤</button> */}
        </div>
      </div>
      <ForceGraph3D
        className="bg-gray-300 relative"
        // graphData={data}
        graphData={{
          nodes: nodes,
          links: links
        }}
        nodeAutoColorBy="group"
        nodeLabel="id"
        nodeThreeObject={nodeThreeObject}
        linkWidth={4}
      />
    </div>
  );
}
import { useCallback } from "react";
import ForceGraph3D from "react-force-graph-3d";
import SpriteText from "three-spritetext";
import data from "./data_.json";
import * as THREE from "three";

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

  return (
    <ForceGraph3D
      graphData={data}
      nodeAutoColorBy="group"
      nodeLabel="id"
      nodeThreeObject={nodeThreeObject}
      linkWidth={4}
    />
  );
}

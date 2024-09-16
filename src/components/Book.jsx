/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 .\public\assets\book.glb -o .\src\components\Book.jsx 
*/

import React from "react";
import * as THREE from "three";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function Book(props) {
    const group = React.useRef();
    const { scene, animations } = useGLTF("/assets/book.glb");
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);
    const { actions } = useAnimations(animations, group);

    const mat = new THREE.MeshBasicMaterial();

    React.useEffect(() => {
        Object.entries(actions).forEach(([_, anim]) => {
            anim.reset().play();
        });
    }, [actions]);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Armature" position={[0, 0, 0.313]} scale={0.665}>
                    <primitive object={nodes.Root_Book} />
                    <skinnedMesh
                        name="book_cover"
                        geometry={nodes.book_cover.geometry}
                        material={mat}
                        skeleton={nodes.book_cover.skeleton}
                    />
                </group>
                <group
                    name="Empty"
                    position={[0.003, 0.134, 0.332]}
                    rotation={[Math.PI / 2, 0, 0]}
                />
                <mesh
                    name="auto_page041"
                    geometry={nodes.auto_page041.geometry}
                    material={mat}
                    position={[0.003, 0.206, 0.346]}
                    rotation={[0.014, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page001"
                    geometry={nodes.auto_page001.geometry}
                    material={mat}
                    position={[0.003, 0.202, 0.345]}
                    rotation={[0.013, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page002"
                    geometry={nodes.auto_page002.geometry}
                    material={mat}
                    position={[0.003, 0.202, 0.338]}
                    rotation={[-0.005, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page003"
                    geometry={nodes.auto_page003.geometry}
                    material={mat}
                    position={[0.003, 0.201, 0.334]}
                    rotation={[-0.016, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page004"
                    geometry={nodes.auto_page004.geometry}
                    material={mat}
                    position={[0.003, 0.198, 0.332]}
                    rotation={[-0.022, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page005"
                    geometry={nodes.auto_page005.geometry}
                    material={mat}
                    position={[0.003, 0.194, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page006"
                    geometry={nodes.auto_page006.geometry}
                    material={mat}
                    position={[0.003, 0.19, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page007"
                    geometry={nodes.auto_page007.geometry}
                    material={mat}
                    position={[0.003, 0.186, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page008"
                    geometry={nodes.auto_page008.geometry}
                    material={mat}
                    position={[0.003, 0.182, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page009"
                    geometry={nodes.auto_page009.geometry}
                    material={mat}
                    position={[0.003, 0.179, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page010"
                    geometry={nodes.auto_page010.geometry}
                    material={mat}
                    position={[0.003, 0.175, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page011"
                    geometry={nodes.auto_page011.geometry}
                    material={mat}
                    position={[0.003, 0.171, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page012"
                    geometry={nodes.auto_page012.geometry}
                    material={mat}
                    position={[0.003, 0.167, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page013"
                    geometry={nodes.auto_page013.geometry}
                    material={mat}
                    position={[0.003, 0.163, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page014"
                    geometry={nodes.auto_page014.geometry}
                    material={mat}
                    position={[0.003, 0.159, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page015"
                    geometry={nodes.auto_page015.geometry}
                    material={mat}
                    position={[0.003, 0.155, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page016"
                    geometry={nodes.auto_page016.geometry}
                    material={mat}
                    position={[0.003, 0.151, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page017"
                    geometry={nodes.auto_page017.geometry}
                    material={mat}
                    position={[0.003, 0.147, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page018"
                    geometry={nodes.auto_page018.geometry}
                    material={mat}
                    position={[0.003, 0.143, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page019"
                    geometry={nodes.auto_page019.geometry}
                    material={mat}
                    position={[0.003, 0.139, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page020"
                    geometry={nodes.auto_page020.geometry}
                    material={mat}
                    position={[0.003, 0.136, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page021"
                    geometry={nodes.auto_page021.geometry}
                    material={mat}
                    position={[0.003, 0.132, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page022"
                    geometry={nodes.auto_page022.geometry}
                    material={mat}
                    position={[0.003, 0.128, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page023"
                    geometry={nodes.auto_page023.geometry}
                    material={mat}
                    position={[0.003, 0.124, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page024"
                    geometry={nodes.auto_page024.geometry}
                    material={mat}
                    position={[0.003, 0.12, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page025"
                    geometry={nodes.auto_page025.geometry}
                    material={mat}
                    position={[0.003, 0.116, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page026"
                    geometry={nodes.auto_page026.geometry}
                    material={mat}
                    position={[0.003, 0.112, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page027"
                    geometry={nodes.auto_page027.geometry}
                    material={mat}
                    position={[0.003, 0.108, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page028"
                    geometry={nodes.auto_page028.geometry}
                    material={mat}
                    position={[0.003, 0.104, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page029"
                    geometry={nodes.auto_page029.geometry}
                    material={mat}
                    position={[0.003, 0.1, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page030"
                    geometry={nodes.auto_page030.geometry}
                    material={mat}
                    position={[0.003, 0.096, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page031"
                    geometry={nodes.auto_page031.geometry}
                    material={mat}
                    position={[0.003, 0.093, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page032"
                    geometry={nodes.auto_page032.geometry}
                    material={mat}
                    position={[0.003, 0.089, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page033"
                    geometry={nodes.auto_page033.geometry}
                    material={mat}
                    position={[0.003, 0.085, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page034"
                    geometry={nodes.auto_page034.geometry}
                    material={mat}
                    position={[0.003, 0.081, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page035"
                    geometry={nodes.auto_page035.geometry}
                    material={mat}
                    position={[0.003, 0.077, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page036"
                    geometry={nodes.auto_page036.geometry}
                    material={mat}
                    position={[0.003, 0.073, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page037"
                    geometry={nodes.auto_page037.geometry}
                    material={mat}
                    position={[0.003, 0.069, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page038"
                    geometry={nodes.auto_page038.geometry}
                    material={mat}
                    position={[0.003, 0.065, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page039"
                    geometry={nodes.auto_page039.geometry}
                    material={mat}
                    position={[0.003, 0.061, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page040"
                    geometry={nodes.auto_page040.geometry}
                    material={mat}
                    position={[0.003, 0.057, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="auto_page042"
                    geometry={nodes.auto_page042.geometry}
                    material={mat}
                    position={[0.003, 0.054, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
                <mesh
                    name="manual_page"
                    geometry={nodes.manual_page.geometry}
                    material={mat}
                    position={[0.003, 0.134, 0.332]}
                    rotation={[-0.023, 0, 0]}
                    scale={[7.636, 5.23, 5.23]}
                />
            </group>
        </group>
    );
}

useGLTF.preload("/assets/book.glb");
"use client";

import {
    AccumulativeShadows,
    CameraControls,
    Center,
    RandomizedLight,
    Stats,
    useHelper,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Html, useProgress } from "@react-three/drei";
import {
    EffectComposer,
    Bloom,
    ToneMapping,
} from "@react-three/postprocessing";
// import { Scene } from '@/components/Scene';
import { Room } from "@/components/Room";
import { Model } from "@/components/Model";
// import { Book } from "@/components/Book"
import { Torch } from "@/components/Torch";
import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    Object3D,
    Object3DEventMap,
    PointLight,
    PointLightHelper,
    SpotLight,
    SpotLightHelper,
} from "three";

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}

export default function Page() {
    const [lightOn, setLightOn] = useState(true);

    return (
        <div className="h-full">
            <Canvas
                flat
                gl={{ antialias: true }}
                shadows
                camera={{ far: 5000 }}
            >
                <axesHelper args={[5]} />
                <gridHelper />
                <Stats />
                <color attach="background" args={["#252530"]} />
                {/* <color attach="background" args={["#FFFF"]} /> */}

                <Suspense fallback={<Loader />}>
                    <Room lightOn={lightOn} />
                    {/* <Book /> */}
                    <Model
                        onToggle={(active: boolean) => setLightOn(active)}
                        position={[-7.7, 4, -2]}
                    />
                </Suspense>

                <AccumulativeShadows
                    position={[0, -2.24, 0]}
                    temporal
                    frames={100}
                    alphaTest={0.9}
                    opacity={1.5}
                    scale={12}
                >
                    <RandomizedLight
                        amount={8}
                        radius={2}
                        ambient={0.5}
                        position={[-2.5, 5, 0.5]}
                        bias={0.001}
                    />
                </AccumulativeShadows>
                {/* <EffectComposer multisampling={4}>
                    <Bloom mipmapBlur luminanceThreshold={1} />
                    <ToneMapping
                        adaptive
                        resolution={256}
                        middleGrey={0.5}
                        maxLuminance={16.0}
                        averageLuminance={1.0}
                        adaptationRate={1.0}
                    />
                </EffectComposer> */}

                <CameraControls />
            </Canvas>
        </div>
    );
}

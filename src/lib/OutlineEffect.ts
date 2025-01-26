import {
    Camera,
    Color,
    LinearFilter,
    Object3D,
    RGBAFormat,
    Scene,
    SRGBColorSpace,
    Vector2,
    WebGLRenderer,
    WebGLRenderTarget,
} from "three";
import {
    EffectComposer,
    FXAAShader,
    OutlinePass,
    OutputPass,
    RenderPass,
    ShaderPass,
} from "three/examples/jsm/Addons.js";
import { disposeObject } from "../utils";

export class OutlineEffect {
    private target: WebGLRenderTarget;
    private composer: EffectComposer;
    private effectFXAA: ShaderPass;
    private outlinePass: OutlinePass;

    private _objects: Array<Object3D> = [];

    enabled: boolean = true;

    constructor(scene: Scene, renderer: WebGLRenderer, camera: Camera) {
        this.target = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            minFilter: LinearFilter,
            magFilter: LinearFilter,
            format: RGBAFormat,
            colorSpace: SRGBColorSpace,
            stencilBuffer: true,
        });

        this.composer = new EffectComposer(renderer, this.target);
        this.composer.setPixelRatio(window.devicePixelRatio);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.composer.renderTarget1.stencilBuffer = true;
        this.composer.renderTarget2.stencilBuffer = true;

        const effectScene = new Scene();
        const renderPass = new RenderPass(effectScene, camera);

        renderPass.clearColor = new Color(0, 0, 0);
        renderPass.clearAlpha = 0;
        this.composer.addPass(renderPass);

        this.outlinePass = new OutlinePass(
            new Vector2(window.innerWidth, window.innerHeight),
            scene,
            camera,
        );

        this.outlinePass.edgeGlow = 0;
        this.outlinePass.edgeThickness = 2;
        this.outlinePass.edgeStrength = 10;
        this.outlinePass.pulsePeriod = 0;

        this.outlinePass.visibleEdgeColor.set(new Color(0xc2883d));
        this.outlinePass.hiddenEdgeColor.set(new Color(0xc2883d));
        this.composer.addPass(this.outlinePass);

        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);

        this.effectFXAA = new ShaderPass(FXAAShader);
        this.effectFXAA.uniforms["resolution"].value.set(
            1 / window.innerWidth,
            1 / window.innerHeight,
        );

        this.effectFXAA.renderToScreen = true;
        this.effectFXAA.material.transparent = true; //
        this.composer.addPass(this.effectFXAA);

        renderPass.dispose();
        outputPass.dispose();
        disposeObject(effectScene);
    }

    get objects() {
        return this._objects;
    }

    set objects(objs: Array<Object3D>) {
        this.outlinePass.selectedObjects = objs;
        this._objects = objs;
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.target.setSize(width, height);
        this.composer.setSize(width, height);
        this.effectFXAA.uniforms["resolution"].value.set(1 / width, 1 / height);
    }

    animate() {
        if (this.enabled) {
            this.composer.render();
        }
    }

    dispose() {
        this.composer.dispose();
        this.effectFXAA.dispose();
        this.outlinePass.dispose();
        this.target.dispose();
    }
}

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
    private selectionPass: OutlinePass;
    private hoverPass: OutlinePass;

    private _selectedObjects: Array<Object3D> = [];
    private _hoverObjects: Array<Object3D> = [];

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

        this.hoverPass = new OutlinePass(
            new Vector2(window.innerWidth, window.innerHeight),
            scene,
            camera,
        );

        this.hoverPass.edgeGlow = 0;
        this.hoverPass.edgeThickness = 2;
        this.hoverPass.edgeStrength = 10;
        this.hoverPass.pulsePeriod = 0;

        this.hoverPass.visibleEdgeColor.set(new Color("red"));
        this.hoverPass.hiddenEdgeColor.set(new Color("red"));
        this.composer.addPass(this.hoverPass);

        this.selectionPass = new OutlinePass(
            new Vector2(window.innerWidth, window.innerHeight),
            scene,
            camera,
        );

        this.selectionPass.edgeGlow = 0;
        this.selectionPass.edgeThickness = 2;
        this.selectionPass.edgeStrength = 10;
        this.selectionPass.pulsePeriod = 0;

        this.selectionPass.visibleEdgeColor.set(new Color(0xc2883d));
        this.selectionPass.hiddenEdgeColor.set(new Color(0xc2883d));
        this.composer.addPass(this.selectionPass);

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

    get selectedObjects() {
        return this._selectedObjects;
    }

    set selectedObjects(objs: Array<Object3D>) {
        this.selectionPass.selectedObjects = objs;
        this._selectedObjects = objs;
    }

    get hoverObjects() {
        return this._hoverObjects;
    }

    set hoverObjects(objs: Array<Object3D>) {
        this.hoverPass.selectedObjects = objs;
        this._hoverObjects = objs;
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
        this.selectionPass.dispose();
        this.hoverPass.dispose();
        this.target.dispose();
    }
}

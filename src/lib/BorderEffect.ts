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

export class BorderEffect {
    private composer: EffectComposer;
    private renderPass: RenderPass;
    private effectFXAA: ShaderPass;
    private outlinePass: OutlinePass;
    private outputPass: OutputPass;
    private target: WebGLRenderTarget;

    private _objects: Array<Object3D> = [];
    effectScene: Scene;

    constructor(scene: Scene, renderer: WebGLRenderer, camera: Camera) {
        this.target = new WebGLRenderTarget(
            window.innerWidth,
            window.innerHeight,
            {
                minFilter: LinearFilter,
                magFilter: LinearFilter,
                format: RGBAFormat,
                colorSpace: SRGBColorSpace,
                stencilBuffer: true,
            },
        );

        this.composer = new EffectComposer(renderer, this.target);
        this.composer.setPixelRatio(window.devicePixelRatio);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        // this.composer.renderTarget1.stencilBuffer = true;
        // this.composer.renderTarget2.stencilBuffer = true;

        this.effectScene = new Scene();

        this.renderPass = new RenderPass(this.effectScene, camera);
        // this.renderPass.clearColor = new Color(0, 0, 0);
        // this.renderPass.clearAlpha = 0;
        this.composer.addPass(this.renderPass);

        this.outlinePass = new OutlinePass(
            new Vector2(window.innerWidth, window.innerHeight),
            scene,
            camera,
        );

        this.outlinePass.edgeGlow = 0;
        this.outlinePass.edgeThickness = 4;
        this.outlinePass.edgeStrength = 10;
        this.outlinePass.pulsePeriod = 0;

        this.outlinePass.visibleEdgeColor.set(new Color(0xffddb3));
        this.outlinePass.hiddenEdgeColor.set(new Color(0xffddb3));
        this.composer.addPass(this.outlinePass);

        this.outputPass = new OutputPass();
        this.composer.addPass(this.outputPass);

        this.effectFXAA = new ShaderPass(FXAAShader);
        this.effectFXAA.uniforms["resolution"].value.set(
            1 / window.innerWidth,
            1 / window.innerHeight,
        );
        this.effectFXAA.renderToScreen = true;
        this.effectFXAA.material.transparent = true; //
        this.composer.addPass(this.effectFXAA);
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
        this.composer.render();
    }
}

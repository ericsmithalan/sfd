import {
    Camera,
    Group,
    Material,
    MeshDepthMaterial,
    OrthographicCamera,
    RenderTarget,
    Scene,
    ShaderMaterial,
    WebGLRenderTarget,
} from "three";
import { HorizontalBlurShader, VerticalBlurShader } from "three/examples/jsm/Addons.js";

export class ContactShadows {
    shadowGroup: Group;
    renderTarget: RenderTarget;
    renderTargetBlur: RenderTarget;
    shadowCamera: Camera;
    depthMaterial: Material;
    horizontalBlurMaterial: Material;
    verticalBlurMaterial: Material;

    constructor(scene: Scene) {
        this.shadowGroup = new Group();
        this.shadowGroup.position.y = -0.3;

        this.renderTarget = new WebGLRenderTarget(512, 512);
        this.renderTarget.texture.generateMipmaps = false;

        this.renderTargetBlur = new WebGLRenderTarget(512, 512);
        this.renderTargetBlur.texture.generateMipmaps = false;

        this.shadowCamera = new OrthographicCamera();
        // -PLANE_WIDTH / 2,
        // PLANE_WIDTH / 2,
        // PLANE_HEIGHT / 2,
        // -PLANE_HEIGHT / 2,
        // 0,
        // CAMERA_HEIGHT,
        this.shadowCamera.rotation.x = Math.PI / 2; //
        this.shadowGroup.add(this.shadowCamera);

        this.depthMaterial = new MeshDepthMaterial();

        this.depthMaterial.onBeforeCompile = (shader) => {
            shader.uniforms.darkness = this.depthMaterial.userData.darkness;
            shader.fragmentShader = /* glsl */ `
						uniform float darkness;
						${shader.fragmentShader.replace(
                            "gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );",
                            "gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );",
                        )}
					`;
        };

        this.depthMaterial.depthTest = false;
        this.depthMaterial.depthWrite = false;

        this.horizontalBlurMaterial = new ShaderMaterial(HorizontalBlurShader);
        this.horizontalBlurMaterial.depthTest = false;

        this.verticalBlurMaterial = new ShaderMaterial(VerticalBlurShader);
        this.verticalBlurMaterial.depthTest = false;

        scene.add(this.shadowGroup);
    }
}

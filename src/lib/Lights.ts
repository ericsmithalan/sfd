import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    SpotLight,
    SpotLightHelper,
} from "three";

export class Lights {
    dirLight: DirectionalLight;
    hemiLight: HemisphereLight;
    ambientLight: AmbientLight;
    dirLightHelper: DirectionalLightHelper;
    spotLight: SpotLight;
    spotLightHelper: SpotLightHelper;

    constructor() {
        this.dirLight = new DirectionalLight(0xffffff, 1);
        this.hemiLight = new HemisphereLight(0xffffff, 0x000000, 1);
        this.ambientLight = new AmbientLight(0xffffff);
        this.dirLightHelper = new DirectionalLightHelper(this.dirLight, 1);
        this.spotLight = new SpotLight(0xffffff, 100);
        this.spotLightHelper = new SpotLightHelper(this.spotLight);

        this.init();
    }

    private init() {
        this.setAmbient();
        this.setDirectional();
        this.setHemi();
        this.setSpotLight();
        this.spotLightHelper.update();
    }

    private setAmbient() {
        this.ambientLight.name = "Ambient Light";
    }

    private setSpotLight() {
        this.spotLight.castShadow = true;
        this.spotLight.angle = Math.PI / 8;
        this.spotLight.shadow.mapSize.width = 1024;
        this.spotLight.shadow.mapSize.height = 1024;
        this.spotLight.shadow.camera.near = 5;
        this.spotLight.shadow.camera.far = 100;
        this.spotLight.shadow.camera.near = 10;
        this.spotLight.shadow.camera.far = 100;

        this.spotLight.shadow.focus = 1;
    }
    private setDirectional() {
        this.dirLight.name = "Directional Light";
        this.dirLight.position.set(4, 1, 6);
        this.dirLight.castShadow = true;
        this.dirLight.shadow.camera.near = 0.5;
        this.dirLight.shadow.camera.far = 100;
        this.dirLight.shadow.bias = -0.001;
        this.dirLight.shadow.mapSize.width = 1024 * 2;
        this.dirLight.shadow.mapSize.height = 1024 * 2;
    }
    private setHemi() {
        this.hemiLight.name = "Hemi Light";
        this.hemiLight.position.set(10, 20, 0);
    }
}

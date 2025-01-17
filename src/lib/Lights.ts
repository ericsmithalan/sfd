import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

export class Lights {
    private _dirLight: DirectionalLight;
    private _hemiLight: HemisphereLight;
    private _ambientLight: AmbientLight;

    constructor() {
        this._dirLight = new DirectionalLight(0xffffff, 2);
        this._hemiLight = new HemisphereLight(0xffffff, 0x8d8d8d, 1);
        this._ambientLight = new AmbientLight(0xffffff);

        this.init();
    }

    private init() {
        this.setAmbient();
        this.setDirectional();
        this.setHemi();
    }

    private setAmbient() {
        this._ambientLight.name = "Ambient Light";
    }
    private setDirectional() {
        this._dirLight.name = "Directional Light";
        this._dirLight.position.set(1, -1, 2);
        this._dirLight.castShadow = true;
        this._dirLight.shadow.camera.near = 0.5;
        this._dirLight.shadow.camera.far = 100;
        this._dirLight.shadow.bias = -0.001;
        this._dirLight.shadow.mapSize.width = 1024 * 2;
        this._dirLight.shadow.mapSize.height = 1024 * 2;
    }
    private setHemi() {
        this._hemiLight.name = "Hemi Light";
        this._hemiLight.position.set(10, 20, 0);
    }

    public get directional() {
        return this._dirLight;
    }
    public get ambient() {
        return this._ambientLight;
    }
    public get hemi() {
        return this._hemiLight;
    }
}

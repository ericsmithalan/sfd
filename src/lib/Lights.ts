import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    SpotLight,
    SpotLightHelper,
} from "three";

// ref for lumens: http://www.power-sure.com/lumens.htm
const bulbLuminousPowers: Record<string, number> = {
    "110000 lm (1000W)": 110000,
    "3500 lm (300W)": 3500,
    "1700 lm (100W)": 1700,
    "800 lm (60W)": 800,
    "400 lm (40W)": 400,
    "180 lm (25W)": 180,
    "20 lm (4W)": 20,
    Off: 0,
};

// ref for solar irradiances: https://en.wikipedia.org/wiki/Lux
const hemiLuminousIrradiances: Record<string, number> = {
    "0.0001 lx (Moonless Night)": 0.0001,
    "0.002 lx (Night Airglow)": 0.002,
    "0.5 lx (Full Moon)": 0.5,
    "3.4 lx (City Twilight)": 3.4,
    "50 lx (Living Room)": 50,
    "100 lx (Very Overcast)": 100,
    "350 lx (Office Room)": 350,
    "400 lx (Sunrise/Sunset)": 400,
    "1000 lx (Overcast)": 1000,
    "18000 lx (Daylight)": 18000,
    "50000 lx (Direct Sun)": 50000,
};

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
        this.ambientLight = new AmbientLight(0xffffff, 1);
        this.dirLightHelper = new DirectionalLightHelper(this.dirLight, 1);
        this.spotLight = new SpotLight(0xffffff, 2);

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
        this.spotLight.angle = 0.3;
        this.spotLight.shadow.mapSize.width = 1024;
        this.spotLight.shadow.mapSize.height = 1024;
        this.spotLight.shadow.camera.near = 5;
        this.spotLight.shadow.camera.far = 100;
        this.spotLight.shadow.camera.near = 10;
        this.spotLight.shadow.camera.far = 100;
        this.spotLight.power = bulbLuminousPowers["110000 lm (1000W)"];

        //  intensity={2} shadow-bias={-0.0001}
        this.spotLight.intensity = 4;
        this.spotLight.position.set(3, 10, -8);
        this.spotLight.shadow.bias = -0.0001;
        this.spotLight.penumbra = 1;
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
        this.hemiLight.intensity = hemiLuminousIrradiances["350 lx (Office Room)"];
    }
}

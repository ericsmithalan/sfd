import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

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

    constructor() {
        this.dirLight = new DirectionalLight(0xffffff, 1);
        this.hemiLight = new HemisphereLight(0xffffff, 0x000000, 0.5);
        this.ambientLight = new AmbientLight(0xffffff, 1);

        this.init();
    }

    private init() {
        this.setAmbient();
        this.setDirectional();
        this.setHemi();
    }

    private setAmbient() {
        this.ambientLight.name = "Ambient Light";
    }

    private setDirectional() {
        this.dirLight.name = "Directional Light";
        this.dirLight.position.set(18, 10, -4);
        this.dirLight.castShadow = true;
        this.dirLight.intensity = 1;

        this.dirLight.shadow.camera.near = 0.001;
        this.dirLight.shadow.camera.far = 100;
        this.dirLight.shadow.bias = -0.001;
        this.dirLight.shadow.mapSize.width = 1024;
        this.dirLight.shadow.mapSize.height = 1024;
        // this.dirLight.shadow.blurSamples = 3;
        // this.dirLight.shadow.intensity = 2;
        // this.dirLight.shadow.radius = 30;
        // this.dirLight.shadow.camera.castShadow = true;
    }

    visible(visible: boolean) {
        this.dirLight.visible = visible;
        this.ambientLight.visible = visible;
    }

    private setHemi() {
        this.hemiLight.name = "Hemi Light";
        this.hemiLight.position.set(0, 0, 0);
        this.hemiLight.intensity = 1000;
    }

    dispose() {
        this.dirLight.dispose();
        this.hemiLight.dispose();
        this.ambientLight.dispose();
    }
}

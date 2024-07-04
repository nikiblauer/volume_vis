class Shader {
    constructor(vertexProgram, fragmentProgram) {
        this.vertexProgram = vertexProgram;
        this.fragmentProgram = fragmentProgram;
        this.material = new THREE.ShaderMaterial
        ({
            glslVersion: THREE.GLSL3,
            uniforms: {},
            transparent: true
        });
    }

    async #loadShader(shader, name){
        const program = await d3.text("shaders/"+name+".essl");
        this.material[shader] = program;
    }


    async load(){
        await this.#loadShader("vertexShader", this.vertexProgram);
        await this.#loadShader("fragmentShader", this.fragmentProgram);
    }


    setUniform(key, value, type){
        if(typeof type !== 'undefined'){
            this.material.uniforms[key] = {
                'type': type,
                'value': value
            };
        }
        else{
            this.material.uniforms[key] = new THREE.Uniform(value);
        }
    }
}
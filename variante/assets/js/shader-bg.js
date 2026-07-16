/*
  Fond animé « halftone » — WebGL vanilla.
  Portage du shader Halftone (21st.dev Shader Builder), adapté aux couleurs S2A
  (navy / acier / or). Zéro dépendance. S'attache à tout <canvas class="shader-canvas">
  placé dans un conteneur. Dégrade silencieusement si WebGL absent ou
  prefers-reduced-motion actif (le dégradé CSS reste alors visible).
*/
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvases = document.querySelectorAll('canvas.shader-canvas');
  if (!canvases.length || reduce) return;

  const VERT = `attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.,1.);}`;

  const FRAG = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif
  uniform vec3 u_colors[6];
  uniform vec4 u_scene;   // res.xy, time, colorCount
  uniform vec4 u_shape;   // scale, intensity, paramA, warp
  uniform vec4 u_surface; // detail, contrast, brightness, saturation
  uniform vec4 u_finish;  // hue, vignette, grain, seed
  uniform vec4 u_field;   // rotate, drift, offsetX, offsetY

  #define u_res u_scene.xy
  #define u_time u_scene.z
  #define u_count u_scene.w
  #define u_scale u_shape.x
  #define u_intensity u_shape.y
  #define u_paramA u_shape.z
  #define u_warp u_shape.w
  #define u_detail u_surface.x
  #define u_contrast u_surface.y
  #define u_brightness u_surface.z
  #define u_saturation u_surface.w
  #define u_vignette u_finish.y
  #define u_grain u_finish.z
  #define u_seed u_finish.w
  #define u_rotate u_field.x
  #define u_drift u_field.y
  #define u_offset u_field.zw

  float hash21(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}
  float grainHash(vec2 p){vec3 p3=fract(vec3(p.xyx)*0.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
    return mix(mix(hash21(i),hash21(i+vec2(1,0)),u.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),u.x),u.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(17,9.2);a*=.5;}return v;}

  vec3 palette(float x){
    float n=max(u_count-1.,1.);float f=clamp(x,0.,1.)*n;vec3 col=u_colors[0];
    for(int i=0;i<5;i++){if(float(i)<n)col=mix(col,u_colors[i+1],smoothstep(0.,1.,clamp(f-float(i),0.,1.)));}
    return col;
  }
  vec3 shade(vec2 p,float t){
    float cells=18.+u_intensity*30.;
    vec2 f=fract(p*cells)-.5;
    float field=.5+.5*sin(p.x*3.+t+u_seed)*sin(p.y*2.4-t*.7);
    float r=(.06+u_paramA*.34)+field*.2;
    float dotMask=1.-smoothstep(r-.08,r,length(f));
    return mix(u_colors[0],palette(field),dotMask);
  }
  void main(){
    vec2 screenUv=gl_FragCoord.xy/u_res.xy;
    vec2 p=(gl_FragCoord.xy-.5*u_res.xy)/min(u_res.x,u_res.y);
    p*=u_scale;
    if(abs(u_rotate)>1e-4){float c=cos(u_rotate),s=sin(u_rotate);p=mat2(c,-s,s,c)*p;}
    p+=u_offset;
    if(u_drift>1e-4)p+=u_drift*vec2(sin(u_time*.31),cos(u_time*.23));
    if(u_warp>0.)p+=u_warp*(vec2(fbm(p*u_detail+u_seed),fbm(p*u_detail+vec2(5.2,1.3)))-.5);
    vec3 col=shade(p,u_time);
    if(abs(u_contrast-1.)>1e-4)col=(col-.5)*u_contrast+.5;
    if(abs(u_saturation-1.)>1e-4){float l=dot(col,vec3(.299,.587,.114));col=mix(vec3(l),col,u_saturation);}
    if(abs(u_brightness)>1e-4)col+=u_brightness;
    if(u_vignette>1e-4){float vd=length(screenUv-.5)*1.41421356;col*=1.-u_vignette*smoothstep(.35,1.,vd);}
    if(u_grain>1e-4)col+=(grainHash(gl_FragCoord.xy+vec2(u_seed*17.,u_seed*31.))-.5)*u_grain;
    gl_FragColor=vec4(clamp(col,0.,1.),1.);
  }`;

  // Palette S2A : du navy profond vers l'acier, avec une pointe d'or.
  const COLORS = [
    [0.043, 0.086, 0.145], // #0b1622
    [0.086, 0.157, 0.243], // #16283e
    [0.118, 0.227, 0.322], // #1e3a52
    [0.255, 0.329, 0.400], // #415466
    [0.784, 0.647, 0.478], // #c8a57a (touche or)
    [0.784, 0.647, 0.478],
  ];
  const U = {
    colorCount: 5, scale: 1.78, intensity: 0.19, paramA: 1.0, warp: 0.0,
    detail: 4.0, contrast: 0.62, brightness: -0.42, saturation: 0.72,
    vignette: 1.0, grain: 0.14, seed: 4990.0,
    rotate: 2.9845, drift: 0.14, offsetX: -0.25, offsetY: -0.02, timeScale: -0.9,
  };

  const compile = (gl, type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return s;
  };

  canvases.forEach((canvas) => {
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uni = (n) => gl.getUniformLocation(prog, n);
    const u = { colors: uni('u_colors'), scene: uni('u_scene'), shape: uni('u_shape'),
                surface: uni('u_surface'), finish: uni('u_finish'), field: uni('u_field') };
    gl.uniform3fv(u.colors, new Float32Array(COLORS.flat()));
    gl.uniform4f(u.shape, U.scale, U.intensity, U.paramA, U.warp);
    gl.uniform4f(u.surface, U.detail, U.contrast, U.brightness, U.saturation);
    gl.uniform4f(u.finish, 0, U.vignette, U.grain, U.seed);
    gl.uniform4f(u.field, U.rotate, U.drift, U.offsetX, U.offsetY);

    let raf = 0, visible = true, inView = true, disposed = false;
    const start = performance.now();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const raw = Math.max(1, Math.round(r.width * dpr)) * Math.max(1, Math.round(r.height * dpr));
      const px = Math.min(1, Math.sqrt(1400000 / Math.max(1, raw)));
      const w = Math.max(1, Math.round(r.width * dpr * px));
      const h = Math.max(1, Math.round(r.height * dpr * px));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    };
    const request = () => { if (!disposed && visible && inView && !raf) raf = requestAnimationFrame(render); };
    function render(now) {
      raf = 0; if (disposed || !visible || !inView) return;
      resize();
      gl.uniform4f(u.scene, canvas.width, canvas.height, ((now - start) / 1000) * U.timeScale, U.colorCount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      request();
    }
    const io = new IntersectionObserver(([e]) => { inView = e?.isIntersecting ?? true; inView ? request() : (cancelAnimationFrame(raf), raf = 0); });
    io.observe(canvas);
    const onVis = () => { visible = document.visibilityState === 'visible'; visible ? request() : (cancelAnimationFrame(raf), raf = 0); };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', () => { resize(); request(); }, { passive: true });
    request();
  });
})();

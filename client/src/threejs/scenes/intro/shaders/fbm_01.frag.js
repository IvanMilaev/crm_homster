export const fragmentShader = `
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#define SLOW_NORMAL
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 hash2( float n )
{
    return fract(sin(vec2(n,n+1.0))*vec2(13.5453123,31.1459123));
}

float noise( in vec2 p )
{
	return sin(p.x)*sin(p.y)*cos(p.x);
}

// float noise( in vec2 x )
// {
//     vec2 p = floor(x);
//     vec2 f = fract(x);
//     f = f*f*(3.0-2.0*f);
//   // float a = textureLod(iChannel0,(p+vec2(0.5,0.5))/256.0,0.0).x;
// 	// float b = textureLod(iChannel0,(p+vec2(1.5,0.5))/256.0,0.0).x;
// 	// float c = textureLod(iChannel0,(p+vec2(0.5,1.5))/256.0,0.0).x;
// 	// float d = textureLod(iChannel0,(p+vec2(1.5,1.5))/256.0,0.0).x;
//     float a = 0.2;
//     float b = 0.23456;
//     float c = 0.49977882;
//     float d = 0.35757585;
//     return mix(mix( a, b,f.x), mix( c, d,f.x),f.y);
// }

const mat2 mtx = mat2( 0.80,  0.60, -0.4,  0.6 );

float fbm4( vec2 p )
{
    float f = 0.0;

    f += 0.5000*(-1.0+2.0*noise( p )); p = mtx*p*2.02;
    f += 0.2500*(-1.0+2.0*noise( p )); p = mtx*p*2.03;
    f += 0.1250*(-1.0+2.0*noise( p )); p = mtx*p*2.01;
    f += 0.0625*(-1.0+2.0*noise( p ));

    return f/0.9375;
}

float fbm6( vec2 p )
{
    float f = 0.0;

    f += 0.500000*noise( p ); p = mtx*p*2.02;
    f += 0.250000*noise( p ); p = mtx*p*2.03;
    f += 0.125000*noise( p ); p = mtx*p*2.01;
    f += 0.062500*noise( p ); p = mtx*p*2.04;
    f += 0.031250*noise( p ); p = mtx*p*2.01;
    f += 0.015625*noise( p );

    return f/0.96875;
}

vec2 fbm4_2( vec2 p )
{
    return vec2( fbm4(p+vec2(1.0)), fbm4(p+vec2(6.2)) );
}

vec2 fbm6_2( vec2 p )
{
    return vec2( fbm6(p+vec2(9.2)), fbm6(p+vec2(5.7)) );
}


float func( vec2 q, out vec2 o, out vec2 n )
{
  q += 0.95*cos(vec2(0.07,0.09)*u_time + length( q )*1.1);

  q *= 0.7 + 0.01*cos(0.05);

  o = 0.5 + 0.5*fbm4_2( q );

  o +=  cos(0.1*u_time)+sin(0.05*u_time)+0.51*sin(vec2(0.11,0.13)*u_time*length( o ));

  n = fbm6_2( 4.0*o ) ;

  vec2 p = q + 2.0*n + 1.0;

  float f = sin(u_time)/10.0+0.5 + 0.5*fbm4( 2.0*p );

  f = mix( f, f*f*f*3.5, f*abs(n.x) );

  f *= 1.0-0.5*pow( 0.5+0.5*sin(8.0*p.x)*sin(8.0*p.y), 8.0 );

  return f;
}

float funcs( in vec2 q )
{
    vec2 t1, t2;
    return func(q,t1,t2);
}


void main() {
  vec2 of = vec2(0.0);//hash2( float(u_time)*1113.1 + gl_FragCoord.x + gl_FragCoord.y*119.1 );


  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  vec2 q = (-u_resolution.xy + 2.0*(gl_FragCoord.xy+of)) /u_resolution.y;

  vec2 o, n;
  float f = func(q, o, n);
  vec3 col = vec3(0.0);


  col = mix( vec3(0.2,0.1,0.4), vec3(0.3,0.05,0.05), f );
  col = mix( col, vec3(0.9,0.9,0.9), dot(n,n) );
  col = mix( col, vec3(0.5,0.2,0.2), 0.5*o.y*o.y );


  col = mix( col, vec3(0.0,0.2,0.4), 0.5*smoothstep(1.2,1.3,abs(n.y)+abs(n.x)) );

  col *= f*2.0;

#ifdef SLOW_NORMAL
  vec2 ex = vec2( 1.0 / u_resolution.x, 0.0 );
  vec2 ey = vec2( 0.0, 1.0 / u_resolution.y );
vec3 nor = normalize( vec3( funcs(q+ex) - f, ex.x, funcs(q+ey) - f ) );
#else
  vec3 nor = normalize( vec3( dFdx(f)*u_resolution.x, 1.7, dFdy(f)*u_resolution.y ) );
#endif
  vec3 lig = normalize( vec3( 0.9, -0.2, -0.4 ) );
  float dif = clamp( 0.3+0.7*dot( nor, lig ), 0.0, 1.0 );

  vec3 bdrf;
  bdrf  = vec3(0.85,0.90,0.95)*(nor.y*0.5+0.5);
  bdrf += vec3(0.15,0.10,0.05)*dif;

  bdrf  = vec3(0.85,0.90,0.95)*(nor.y*0.5+0.5);
  bdrf += vec3(0.15,0.10,0.05)*dif;

  col *= bdrf;

   //col = vec3(1.0)-col;

   col = col*col+0.7*col+0.3*col;

   col *= vec3(1.2,1.25,1.2);

 col *= 0.5 + 0.5 * sqrt(16.0*p.x*p.y*(1.0-p.x)*(1.0-p.y));

gl_FragColor = vec4( col, 1.0 );
}
`;

const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./voetbalwereld-CIqUEuix.js","./botsing-CI0jLS9C.js","./leergroep3-BjgXc3wF.js"])))=>i.map(i=>d[i]);
import{$ as e,$n as t,A as n,An as r,B as i,Bn as a,C as o,Ct as s,D as c,Dn as l,Dt as u,E as d,En as f,F as p,Fn as m,G as h,Gn as g,H as _,Hn as v,I as y,J as b,Jn as x,K as S,Kn as C,L as w,Ln as T,M as E,Mn as D,N as ee,Nn as te,O as ne,On as O,Ot as re,P as k,Q as ie,Qn as ae,R as A,Rn as oe,S as se,Sn as j,T as ce,Tn as M,Un as le,V as ue,Vn as de,W as N,Wn as fe,X as pe,Xn as me,Yn as he,Z as ge,Zn as _e,_ as ve,_n as ye,_t as be,a as P,an as xe,at as Se,b as Ce,bn as we,bt as Te,c as F,ct as Ee,dn as De,dt as Oe,er as ke,et as Ae,f as je,fn as Me,ft as Ne,gt as Pe,h as Fe,ht as Ie,i as I,in as Le,it as L,j as Re,jn as ze,k as R,kn as Be,l as Ve,ln as He,lt as Ue,m as z,mt as We,n as B,nr as Ge,nt as V,o as Ke,on as qe,ot as H,p as Je,pt as Ye,q as Xe,qn as Ze,r as Qe,rr as $e,rt as U,s as et,sn as tt,st as nt,t as rt,tr as it,tt as at,u as ot,un as st,ut as W,v as ct,vn as lt,vt as ut,w as dt,wn as ft,x as pt,xn as mt,xt as ht,y as gt,yn as _t,yt as vt,z as yt,zn as bt}from"./botsing-CI0jLS9C.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function xt(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function St(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var G={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},K={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new L},alphaMap:{value:null},alphaMapTransform:{value:new L},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new L}},envmap:{envMap:{value:null},envMapRotation:{value:new L},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new L}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new L}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new L},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new L},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new L},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new L}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new L}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new L}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new v},probesMax:{value:new v},probesResolution:{value:new v}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new L},alphaTest:{value:0},uvTransform:{value:new L}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new L},alphaMap:{value:null},alphaMapTransform:{value:new L},alphaTest:{value:0}}},Ct={basic:{uniforms:ke([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.fog]),vertexShader:G.meshbasic_vert,fragmentShader:G.meshbasic_frag},lambert:{uniforms:ke([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new pt(0)},envMapIntensity:{value:1}}]),vertexShader:G.meshlambert_vert,fragmentShader:G.meshlambert_frag},phong:{uniforms:ke([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:G.meshphong_vert,fragmentShader:G.meshphong_frag},standard:{uniforms:ke([K.common,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.roughnessmap,K.metalnessmap,K.fog,K.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:G.meshphysical_vert,fragmentShader:G.meshphysical_frag},toon:{uniforms:ke([K.common,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.gradientmap,K.fog,K.lights,{emissive:{value:new pt(0)}}]),vertexShader:G.meshtoon_vert,fragmentShader:G.meshtoon_frag},matcap:{uniforms:ke([K.common,K.bumpmap,K.normalmap,K.displacementmap,K.fog,{matcap:{value:null}}]),vertexShader:G.meshmatcap_vert,fragmentShader:G.meshmatcap_frag},points:{uniforms:ke([K.points,K.fog]),vertexShader:G.points_vert,fragmentShader:G.points_frag},dashed:{uniforms:ke([K.common,K.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:G.linedashed_vert,fragmentShader:G.linedashed_frag},depth:{uniforms:ke([K.common,K.displacementmap]),vertexShader:G.depth_vert,fragmentShader:G.depth_frag},normal:{uniforms:ke([K.common,K.bumpmap,K.normalmap,K.displacementmap,{opacity:{value:1}}]),vertexShader:G.meshnormal_vert,fragmentShader:G.meshnormal_frag},sprite:{uniforms:ke([K.sprite,K.fog]),vertexShader:G.sprite_vert,fragmentShader:G.sprite_frag},background:{uniforms:{uvTransform:{value:new L},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:G.background_vert,fragmentShader:G.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new L}},vertexShader:G.backgroundCube_vert,fragmentShader:G.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:G.cube_vert,fragmentShader:G.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:G.equirect_vert,fragmentShader:G.equirect_frag},distance:{uniforms:ke([K.common,K.displacementmap,{referencePosition:{value:new v},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:G.distance_vert,fragmentShader:G.distance_frag},shadow:{uniforms:ke([K.lights,K.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:G.shadow_vert,fragmentShader:G.shadow_frag}};Ct.physical={uniforms:ke([Ct.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new L},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new L},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new L},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new L},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new L},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new L},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new L},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new L},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new L},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new L},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new L},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new L}}]),vertexShader:G.meshphysical_vert,fragmentShader:G.meshphysical_frag};var wt={r:0,b:0,g:0},Tt=new Se,Et=new L;Et.set(-1,0,0,0,1,0,0,0,1);function Dt(e,t,n,r,i,a){let o=new pt(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new H(new Je(1,1,1),new we({name:`BackgroundCubeMaterial`,uniforms:Ze(Ct.backgroundCube.uniforms),vertexShader:Ct.backgroundCube.vertexShader,fragmentShader:Ct.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Tt.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Et),l.material.toneMapped=se.getTransfer(i.colorSpace)!==lt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new H(new ut(2,2),new we({name:`BackgroundMaterial`,uniforms:Ze(Ct.background.uniforms),vertexShader:Ct.background.vertexShader,fragmentShader:Ct.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=se.getTransfer(i.colorSpace)!==lt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(wt,ae(e)),n.buffers.color.setClear(wt.r,wt.g,wt.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ot(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function kt(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function At(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(Ge(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&Ge(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function jt(e){let t=this,n=null,r=0,i=!1,a=!1,o=new be,s=new L,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Mt=4,Nt=6,Pt=20,Ft=256,It=new Ie,Lt=new pt,Rt=null,zt=0,Bt=0,Vt=!1,Ht=new v,Ut=new v,Wt=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Ht}=i;Rt=this._renderer.getRenderTarget(),zt=this._renderer.getActiveCubeFace(),Bt=this._renderer.getActiveMipmapLevel(),Vt=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zt(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xt(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Rt,zt,Bt),this._renderer.xr.enabled=Vt,e.scissorTest=!1,qt(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rt=this._renderer.getRenderTarget(),zt=this._renderer.getActiveCubeFace(),Bt=this._renderer.getActiveMipmapLevel(),Vt=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ie,minFilter:ie,generateMipmaps:!1,type:h,format:u,colorSpace:at,depthBuffer:!1},r=Kt(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kt(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Gt(r)),this._blurMaterial=Yt(r,e,t),this._ggxMaterial=Jt(r,e,t)}return r}_compileMaterial(e){let t=new H(new Fe,e);this._renderer.compile(t,It)}_sceneToCubeUV(e,t,n,r,i){let a=new Pe(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Lt),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new H(new Je,new nt({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Lt),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;qt(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zt()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xt());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;qt(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,It)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Mt?n-d+Mt:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,qt(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,It),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,qt(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,It)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];qt(t,3*l*(r>this._lodMax-Mt?r-this._lodMax+Mt:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,It)}};function Gt(e){let t=[],n=[],r=e,i=e-Mt+1+Nt;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Ut.set(1,r,n):e===1?Ut.set(-n,1,-r):e===2?Ut.set(-n,r,1):e===3?Ut.set(-1,r,-n):e===4?Ut.set(-n,-1,r):Ut.set(n,r,-1),Ut.toArray(l,(e*6+t)*3)}}let u=new Fe;u.setAttribute(`position`,new z(c,3)),u.setAttribute(`outputDirection`,new z(l,3)),n.push(new H(u,null)),r>Mt&&r--}return{lodMeshes:n,sizeLods:t}}function Kt(e,t,n){let r=new g(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function qt(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Jt(e,t,n){return new we({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Ft,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qt(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Yt(e,t,n){return new we({name:`SphericalGaussianBlur`,defines:{SAMPLES:Pt,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Qt(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xt(){return new we({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Qt(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Zt(){return new we({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qt(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Qt(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var $t=class extends g{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new d(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Je(5,5,5),i=new we({name:`CubemapFromEquirect`,uniforms:Ze(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new H(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=ie),new dt(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function en(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new $t(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Wt(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Wt(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function tn(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&$e(`WebGLRenderer: `+e+` extension not supported.`),t}}}function nn(e,t,n,i){let a={},o=new WeakMap;function s(e){let r=e.target;r.index!==null&&t.remove(r.index);for(let e in r.attributes)t.remove(r.attributes[e]);r.removeEventListener(`dispose`,s),delete a[r.id];let c=o.get(r);c&&(t.remove(c),o.delete(r)),i.releaseStatesOfGeometry(r),r.isInstancedBufferGeometry===!0&&delete r._maxInstanceCount,n.memory.geometries--}function c(e,t){return a[t.id]===!0?t:(t.addEventListener(`dispose`,s),a[t.id]=!0,n.memory.geometries++,t)}function l(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function u(e){let n=[],i=e.index,a=e.attributes.position,s=0;if(a===void 0)return;if(i!==null){let e=i.array;s=i.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=a.array;s=a.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let c=new(a.count>=65535?ze:r)(n,1);c.version=s;let l=o.get(e);l&&t.remove(l),o.set(e,c)}function d(e){let t=o.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&u(e)}else u(e);return o.get(e)}return{get:c,update:l,getWireframeAttribute:d}}function rn(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function an(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:me(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function on(e,t,n){let r=new WeakMap,a=new le;function o(o,s,c){let l=o.morphTargetInfluences,u=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,d=u===void 0?0:u.length,f=r.get(s);if(f===void 0||f.count!==d){f!==void 0&&f.texture.dispose();let e=s.morphAttributes.position!==void 0,n=s.morphAttributes.normal!==void 0,o=s.morphAttributes.color!==void 0,c=s.morphAttributes.position||[],l=s.morphAttributes.normal||[],u=s.morphAttributes.color||[],p=0;e===!0&&(p=1),n===!0&&(p=2),o===!0&&(p=3);let m=s.attributes.position.count*p,h=1;m>t.maxTextureSize&&(h=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let g=new Float32Array(m*h*4*d),_=new R(g,m,h,d);_.type=i,_.needsUpdate=!0;let v=p*4;for(let t=0;t<d;t++){let r=c[t],i=l[t],s=u[t],d=m*h*4*t;for(let t=0;t<r.count;t++){let c=t*v;e===!0&&(a.fromBufferAttribute(r,t),g[d+c+0]=a.x,g[d+c+1]=a.y,g[d+c+2]=a.z,g[d+c+3]=0),n===!0&&(a.fromBufferAttribute(i,t),g[d+c+4]=a.x,g[d+c+5]=a.y,g[d+c+6]=a.z,g[d+c+7]=0),o===!0&&(a.fromBufferAttribute(s,t),g[d+c+8]=a.x,g[d+c+9]=a.y,g[d+c+10]=a.z,g[d+c+11]=s.itemSize===4?a.w:1)}}f={count:d,texture:_,size:new de(m,h)},r.set(s,f);function y(){_.dispose(),r.delete(s),s.removeEventListener(`dispose`,y)}s.addEventListener(`dispose`,y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(e,`morphTexture`,o.morphTexture,n);else{let t=0;for(let e=0;e<l.length;e++)t+=l[e];let n=s.morphTargetsRelative?1:1-t;c.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),c.getUniforms().setValue(e,`morphTargetInfluences`,l)}c.getUniforms().setValue(e,`morphTargetsTexture`,f.texture,n),c.getUniforms().setValue(e,`morphTargetsTextureSize`,f.size)}return{update:o}}function sn(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var cn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ln(e,t,n,r,i,a){let o=new g(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Fe;l.setAttribute(`position`,new yt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new yt([0,2,0,0,2,0],2));let u=new qe({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new H(l,u),f=new Ie(-1,1,1,-1,0,1),p=null,m=null,_=!1,v,y=null,b=[],x=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<b.length;n++){let r=b[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){b=e,x=b.length>0&&b[0].isRenderPass===!0;let t=o.width,n=o.height;b.length>0&&s===null&&(s=new g(t,n,{type:h,depthBuffer:!1,stencilBuffer:!1}),c=new g(t,n,{type:h,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<b.length;e++){let r=b[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(_||e.toneMapping===0&&b.length===0)return!1;if(y=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return x===!1&&e.setRenderTarget(o),v=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return x},this.end=function(e,t){e.toneMapping=v,_=!0;let n=o,r=s;for(let i=0;i<b.length;i++){let a=b[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},se.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=cn[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(y),e.render(d,f),y=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var un=new l,dn=new ee(1,1),fn=new R,pn=new ne,mn=new d,hn=[],gn=[],_n=new Float32Array(16),vn=new Float32Array(9),yn=new Float32Array(4);function bn(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=hn[i];if(a===void 0&&(a=new Float32Array(i),hn[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function xn(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Sn(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Cn(e,t){let n=gn[t];n===void 0&&(n=new Int32Array(t),gn[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function wn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Tn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xn(n,t))return;e.uniform2fv(this.addr,t),Sn(n,t)}}function En(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(xn(n,t))return;e.uniform3fv(this.addr,t),Sn(n,t)}}function Dn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xn(n,t))return;e.uniform4fv(this.addr,t),Sn(n,t)}}function On(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(xn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Sn(n,t)}else{if(xn(n,r))return;yn.set(r),e.uniformMatrix2fv(this.addr,!1,yn),Sn(n,r)}}function kn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(xn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Sn(n,t)}else{if(xn(n,r))return;vn.set(r),e.uniformMatrix3fv(this.addr,!1,vn),Sn(n,r)}}function An(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(xn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Sn(n,t)}else{if(xn(n,r))return;_n.set(r),e.uniformMatrix4fv(this.addr,!1,_n),Sn(n,r)}}function jn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Mn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xn(n,t))return;e.uniform2iv(this.addr,t),Sn(n,t)}}function Nn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(xn(n,t))return;e.uniform3iv(this.addr,t),Sn(n,t)}}function Pn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xn(n,t))return;e.uniform4iv(this.addr,t),Sn(n,t)}}function Fn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function In(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xn(n,t))return;e.uniform2uiv(this.addr,t),Sn(n,t)}}function Ln(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(xn(n,t))return;e.uniform3uiv(this.addr,t),Sn(n,t)}}function Rn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xn(n,t))return;e.uniform4uiv(this.addr,t),Sn(n,t)}}function zn(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(dn.compareFunction=n.isReversedDepthBuffer()?518:515,a=dn):a=un,n.setTexture2D(t||a,i)}function Bn(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||pn,i)}function Vn(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||mn,i)}function Hn(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||fn,i)}function Un(e){switch(e){case 5126:return wn;case 35664:return Tn;case 35665:return En;case 35666:return Dn;case 35674:return On;case 35675:return kn;case 35676:return An;case 5124:case 35670:return jn;case 35667:case 35671:return Mn;case 35668:case 35672:return Nn;case 35669:case 35673:return Pn;case 5125:return Fn;case 36294:return In;case 36295:return Ln;case 36296:return Rn;case 35678:case 36198:case 36298:case 36306:case 35682:return zn;case 35679:case 36299:case 36307:return Bn;case 35680:case 36300:case 36308:case 36293:return Vn;case 36289:case 36303:case 36311:case 36292:return Hn}}function Wn(e,t){e.uniform1fv(this.addr,t)}function Gn(e,t){let n=bn(t,this.size,2);e.uniform2fv(this.addr,n)}function Kn(e,t){let n=bn(t,this.size,3);e.uniform3fv(this.addr,n)}function qn(e,t){let n=bn(t,this.size,4);e.uniform4fv(this.addr,n)}function Jn(e,t){let n=bn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Yn(e,t){let n=bn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Xn(e,t){let n=bn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Zn(e,t){e.uniform1iv(this.addr,t)}function Qn(e,t){e.uniform2iv(this.addr,t)}function $n(e,t){e.uniform3iv(this.addr,t)}function er(e,t){e.uniform4iv(this.addr,t)}function tr(e,t){e.uniform1uiv(this.addr,t)}function nr(e,t){e.uniform2uiv(this.addr,t)}function rr(e,t){e.uniform3uiv(this.addr,t)}function ir(e,t){e.uniform4uiv(this.addr,t)}function ar(e,t,n){let r=this.cache,i=t.length,a=Cn(n,i);xn(r,a)||(e.uniform1iv(this.addr,a),Sn(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?dn:un;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function or(e,t,n){let r=this.cache,i=t.length,a=Cn(n,i);xn(r,a)||(e.uniform1iv(this.addr,a),Sn(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||pn,a[e])}function sr(e,t,n){let r=this.cache,i=t.length,a=Cn(n,i);xn(r,a)||(e.uniform1iv(this.addr,a),Sn(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||mn,a[e])}function cr(e,t,n){let r=this.cache,i=t.length,a=Cn(n,i);xn(r,a)||(e.uniform1iv(this.addr,a),Sn(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||fn,a[e])}function lr(e){switch(e){case 5126:return Wn;case 35664:return Gn;case 35665:return Kn;case 35666:return qn;case 35674:return Jn;case 35675:return Yn;case 35676:return Xn;case 5124:case 35670:return Zn;case 35667:case 35671:return Qn;case 35668:case 35672:return $n;case 35669:case 35673:return er;case 5125:return tr;case 36294:return nr;case 36295:return rr;case 36296:return ir;case 35678:case 36198:case 36298:case 36306:case 35682:return ar;case 35679:case 36299:case 36307:return or;case 35680:case 36300:case 36308:case 36293:return sr;case 36289:case 36303:case 36311:case 36292:return cr}}var ur=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Un(t.type)}},dr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lr(t.type)}},fr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},pr=/(\w+)(\])?(\[|\.)?/g;function mr(e,t){e.seq.push(t),e.map[t.id]=t}function hr(e,t,n){let r=e.name,i=r.length;for(pr.lastIndex=0;;){let a=pr.exec(r),o=pr.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){mr(n,l===void 0?new ur(s,e,t):new dr(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new fr(s),mr(n,e)),n=e}}}var gr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);hr(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function _r(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var vr=37297,yr=0;function br(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var xr=new L;function Sr(e){se._getMatrix(xr,se.workingColorSpace,e);let t=`mat3( ${xr.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(e)){case V:return[t,`LinearTransferOETF`];case lt:return[t,`sRGBTransferOETF`];default:return Ge(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Cr(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+br(e.getShaderSource(t),r)}return i}function wr(e,t){let n=Sr(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Tr={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Er(e,t){let n=Tr[t];return n===void 0?(Ge(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Dr=new v;function Or(){return se.getLuminanceCoefficients(Dr),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Dr.x.toFixed(4)}, ${Dr.y.toFixed(4)}, ${Dr.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function kr(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Mr).join(`
`)}function Ar(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function jr(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Mr(e){return e!==``}function Nr(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Pr(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Fr=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ir(e){return e.replace(Fr,Rr)}var Lr=new Map;function Rr(e,t){let n=G[t];if(n===void 0){let e=Lr.get(t);if(e!==void 0)n=G[e],Ge(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Ir(n)}var zr=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Br(e){return e.replace(zr,Vr)}function Vr(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Hr(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Ur={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Wr(e){return Ur[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Gr={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Kr(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Gr[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var qr={302:`ENVMAP_MODE_REFRACTION`};function Jr(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:qr[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Yr={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Xr(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Yr[e.combine]||`ENVMAP_BLENDING_NONE`}function Zr(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Qr(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Wr(n),l=Kr(n),u=Jr(n),d=Xr(n),f=Zr(n),p=kr(n),m=Ar(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Mr).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Mr).join(`
`),_.length>0&&(_+=`
`)):(g=[Hr(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Mr).join(`
`),_=[Hr(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:G.tonemapping_pars_fragment,n.toneMapping===0?``:Er(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,G.colorspace_pars_fragment,wr(`linearToOutputTexel`,n.outputColorSpace),Or(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Mr).join(`
`)),o=Ir(o),o=Nr(o,n),o=Pr(o,n),s=Ir(s),s=Nr(s,n),s=Pr(s,n),o=Br(o),s=Br(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=_r(i,i.VERTEX_SHADER,y),S=_r(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Cr(i,x,`vertex`),n=Cr(i,S,`fragment`);me(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):Ge(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new gr(i,h),T=jr(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,vr)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=yr++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var $r=0,ei=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ti(e),t.set(e,n)),n}},ti=class{constructor(e){this.id=$r++,this.code=e,this.usedTimes=0}};function ni(e){return e===1030||e===37490||e===36285}function ri(e,t,n,r,i,a){let o=new ge,s=new ei,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&Ge(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,ee,te,ne;if(C){let e=Ct[C];D=e.vertexShader,ee=e.fragmentShader}else{D=i.vertexShader,ee=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),te=e.id,ne=t.id}let O=e.getRenderTarget(),re=e.state.buffers.depth.getReversed(),k=h.isInstancedMesh===!0,ie=h.isBatchedMesh===!0,ae=!!i.map,A=!!i.matcap,oe=!!x,j=!!i.aoMap,ce=!!i.lightMap,M=!!i.bumpMap&&i.wireframe===!1,le=!!i.normalMap,ue=!!i.displacementMap,de=!!i.emissiveMap,N=!!i.metalnessMap,fe=!!i.roughnessMap,pe=i.anisotropy>0,me=i.clearcoat>0,he=i.dispersion>0,ge=i.retroreflectivity>0,_e=i.iridescence>0,ve=i.sheen>0,ye=i.transmission>0,be=pe&&!!i.anisotropyMap,P=me&&!!i.clearcoatMap,xe=me&&!!i.clearcoatNormalMap,Se=me&&!!i.clearcoatRoughnessMap,Ce=_e&&!!i.iridescenceMap,we=_e&&!!i.iridescenceThicknessMap,Te=ve&&!!i.sheenColorMap,F=ve&&!!i.sheenRoughnessMap,Ee=!!i.specularMap,De=!!i.specularColorMap,Oe=!!i.specularIntensityMap,ke=ye&&!!i.transmissionMap,Ae=ye&&!!i.thicknessMap,je=!!i.gradientMap,Me=!!i.alphaMap,Ne=i.alphaTest>0,Pe=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let I={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:ee,defines:i.defines,customVertexShaderID:te,customFragmentShaderID:ne,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ie,batchingColor:ie&&h._colorsTexture!==null,instancing:k,instancingColor:k&&h.instanceColor!==null,instancingMorph:k&&h.morphTexture!==null,outputColorSpace:O===null?e.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:se.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ae,matcap:A,envMap:oe,envMapMode:oe&&x.mapping,envMapCubeUVHeight:S,aoMap:j,lightMap:ce,bumpMap:M,normalMap:le,displacementMap:ue,emissiveMap:de,normalMapObjectSpace:le&&i.normalMapType===1,normalMapTangentSpace:le&&i.normalMapType===0,packedNormalMap:le&&i.normalMapType===0&&ni(i.normalMap.format),metalnessMap:N,roughnessMap:fe,anisotropy:pe,anisotropyMap:be,clearcoat:me,clearcoatMap:P,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:he,retroreflection:ge,iridescence:_e,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:ve,sheenColorMap:Te,sheenRoughnessMap:F,specularMap:Ee,specularColorMap:De,specularIntensityMap:Oe,transmission:ye,transmissionMap:ke,thicknessMap:Ae,gradientMap:je,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:Pe,combine:i.combine,mapUv:ae&&m(i.map.channel),aoMapUv:j&&m(i.aoMap.channel),lightMapUv:ce&&m(i.lightMap.channel),bumpMapUv:M&&m(i.bumpMap.channel),normalMapUv:le&&m(i.normalMap.channel),displacementMapUv:ue&&m(i.displacementMap.channel),emissiveMapUv:de&&m(i.emissiveMap.channel),metalnessMapUv:N&&m(i.metalnessMap.channel),roughnessMapUv:fe&&m(i.roughnessMap.channel),anisotropyMapUv:be&&m(i.anisotropyMap.channel),clearcoatMapUv:P&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:F&&m(i.sheenRoughnessMap.channel),specularMapUv:Ee&&m(i.specularMap.channel),specularColorMapUv:De&&m(i.specularColorMap.channel),specularIntensityMapUv:Oe&&m(i.specularIntensityMap.channel),transmissionMapUv:ke&&m(i.transmissionMap.channel),thicknessMapUv:Ae&&m(i.thicknessMap.channel),alphaMapUv:Me&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(le||pe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ae||Me),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&le===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:re,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:ae&&i.map.isVideoTexture===!0&&se.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:de&&i.emissiveMap.isVideoTexture===!0&&se.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||ie)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return I.vertexUv1s=c.has(1),I.vertexUv2s=c.has(2),I.vertexUv3s=c.has(3),c.clear(),I}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Ct[t];n=D.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Qr(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function ii(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ai(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function oi(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function si(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ai),r.length>1&&r.sort(t||oi),i.length>1&&i.sort(t||oi)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ci(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new si,e.set(t,[i])):n>=r.length?(i=new si,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function li(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new v,color:new pt};break;case`SpotLight`:n={position:new v,direction:new v,color:new pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new v,color:new pt,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new v,skyColor:new pt,groundColor:new pt};break;case`RectAreaLight`:n={color:new pt,position:new v,halfWidth:new v,halfHeight:new v}}return e[t.id]=n,n}}}function ui(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var di=0;function fi(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function pi(e){let t=new li,n=ui(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new v);let i=new v,a=new Se,o=new Se;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(fi);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=K.LTC_FLOAT_1,r.rectAreaLTC2=K.LTC_FLOAT_2):(r.rectAreaLTC1=K.LTC_HALF_1,r.rectAreaLTC2=K.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=di++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function mi(e){let t=new pi(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function hi(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new mi(e),t.set(n,[a])):r>=i.length?(a=new mi(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var gi=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_i=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,vi=[new v(1,0,0),new v(-1,0,0),new v(0,1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1)],yi=[new v(0,-1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1),new v(0,-1,0),new v(0,-1,0)],bi=new Se,xi=new v,Si=new v;function Ci(e,t,n){let r=new _,a=new de,o=new de,s=new le,c=new Ee,l=new Ue,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new we({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:gi,fragmentShader:_i}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let v=new Fe;v.setAttribute(`position`,new z(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new H(v,p),b=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let x=this.type;this.render=function(t,n,c){if(b.enabled===!1||b.autoUpdate===!1&&b.needsUpdate===!1||t.length===0)return;this.type===2&&(Ge(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let l=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=x!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let l=0,u=t.length;l<u;l++){let u=t[l],f=u.shadow;if(f===void 0){Ge(`WebGLShadowMap:`,u,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;a.copy(f.mapSize);let _=f.getFrameExtents();a.multiply(_),o.copy(f.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(o.x=Math.floor(d/_.x),a.x=o.x*_.x,f.mapSize.x=o.x),a.y>d&&(o.y=Math.floor(d/_.y),a.y=o.y*_.y,f.mapSize.y=o.y));let v=e.state.buffers.depth.getReversed();if(f.camera._reversedDepth=v,f.map===null||m===!0){if(f.map!==null&&(f.map.depthTexture!==null&&(f.map.depthTexture.dispose(),f.map.depthTexture=null),f.map.dispose()),this.type===3){if(u.isPointLight){Ge(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}f.map=new g(a.x,a.y,{format:Le,type:h,minFilter:ie,magFilter:ie,generateMipmaps:!1}),f.map.texture.name=u.name+`.shadowMap`,f.map.depthTexture=new ee(a.x,a.y,i),f.map.depthTexture.name=u.name+`.shadowMapDepth`,f.map.depthTexture.format=Re,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=Ne,f.map.depthTexture.magFilter=Ne}else u.isPointLight?(f.map=new $t(a.x),f.map.depthTexture=new ce(a.x,T)):(f.map=new g(a.x,a.y),f.map.depthTexture=new ee(a.x,a.y,T)),f.map.depthTexture.name=u.name+`.shadowMap`,f.map.depthTexture.format=Re,this.type===1?(f.map.depthTexture.compareFunction=v?518:515,f.map.depthTexture.minFilter=ie,f.map.depthTexture.magFilter=ie):(f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=Ne,f.map.depthTexture.magFilter=Ne);f.camera.updateProjectionMatrix()}f.map.isWebGLCubeRenderTarget!==!0&&(f.map.width!==a.x||f.map.height!==a.y)&&f.map.setSize(a.x,a.y);let y=f.map.isWebGLCubeRenderTarget?6:f.getViewportCount();u.isPointLight!==!0&&f.updateMatrices(u,c);for(let t=0;t<y;t++){let i=f.getCamera(t);if(u.isPointLight){let e=f.camera,n=f.matrix,r=u.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),xi.setFromMatrixPosition(u.matrixWorld),e.position.copy(xi),Si.copy(e.position),Si.add(vi[t]),e.up.copy(yi[t]),e.lookAt(Si),e.updateMatrixWorld(),n.makeTranslation(-xi.x,-xi.y,-xi.z),bi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),f._frustum.setFromProjectionMatrix(bi,e.coordinateSystem,e.reversedDepth)}if(f.map.isWebGLCubeRenderTarget)e.setRenderTarget(f.map,t),e.clear();else{t===0&&(e.setRenderTarget(f.map),e.clear());let n=f.getViewport(t);s.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),p.viewport(s)}r=f.getFrustum(t),w(n,c,i,u,this.type)}f.isPointLightShadow!==!0&&this.type===3&&S(f,c),f.needsUpdate=!1}x=this.type,b.needsUpdate=!1,e.setRenderTarget(l,u,f)};function S(n,r){let i=t.update(y);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new g(a.x,a.y,{format:Le,type:h}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,p,y,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,m,y,null)}function C(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function w(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=C(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=C(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)w(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function wi(e,t){function n(){let t=!1,n=new le,r=null,i=new le(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?N(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=De[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?N(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new pt(0,0,0),T=0,E=!1,D=null,ee=null,te=null,ne=null,O=null,re=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,ie=0,ae=e.getParameter(e.VERSION);ae.indexOf(`WebGL`)===-1?ae.indexOf(`OpenGL ES`)!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),k=ie>=2):(ie=parseFloat(/^WebGL (\d)/.exec(ae)[1]),k=ie>=1);let A=null,oe={},se=e.getParameter(e.SCISSOR_BOX),j=e.getParameter(e.VIEWPORT),ce=new le().fromArray(se),M=new le().fromArray(j);function ue(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),N(e.DEPTH_TEST),o.setFunc(3),P(!1),xe(1),N(e.CULL_FACE),ye(0);function N(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function fe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function pe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function he(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ge(t){return h!==t&&(e.useProgram(t),h=t,!0)}let _e={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};_e[103]=e.MIN,_e[104]=e.MAX;let ve={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ye(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(fe(e.BLEND),g=!1);return}if(g===!1&&(N(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:me(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:me(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:me(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:me(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(_e[n],_e[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ve[r],ve[i],ve[o],ve[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function be(t,n){t.side===2?fe(e.CULL_FACE):N(e.CULL_FACE);let r=t.side===1;n&&(r=!r),P(r),t.blending===1&&t.transparent===!1?ye(0):ye(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Ce(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?N(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function P(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function xe(t){t===0?fe(e.CULL_FACE):(N(e.CULL_FACE),t!==ee&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),ee=t}function Se(t){t!==te&&(k&&e.lineWidth(t),te=t)}function Ce(t,n,r){t?(N(e.POLYGON_OFFSET_FILL),(ne!==n||O!==r)&&(ne=n,O=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):fe(e.POLYGON_OFFSET_FILL)}function we(t){t?N(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function Te(t){t===void 0&&(t=e.TEXTURE0+re-1),A!==t&&(e.activeTexture(t),A=t)}function F(t,n,r){r===void 0&&(r=A===null?e.TEXTURE0+re-1:A);let i=oe[r];i===void 0&&(i={type:void 0,texture:void 0},oe[r]=i),(i.type!==t||i.texture!==n)&&(A!==r&&(e.activeTexture(r),A=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function Ee(){let t=oe[A];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Oe(){try{e.compressedTexImage2D(...arguments)}catch(e){me(`WebGLState:`,e)}}function ke(){try{e.compressedTexImage3D(...arguments)}catch(e){me(`WebGLState:`,e)}}function Ae(){try{e.texSubImage2D(...arguments)}catch(e){me(`WebGLState:`,e)}}function je(){try{e.texSubImage3D(...arguments)}catch(e){me(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage2D(...arguments)}catch(e){me(`WebGLState:`,e)}}function Ne(){try{e.compressedTexSubImage3D(...arguments)}catch(e){me(`WebGLState:`,e)}}function Pe(){try{e.texStorage2D(...arguments)}catch(e){me(`WebGLState:`,e)}}function Fe(){try{e.texStorage3D(...arguments)}catch(e){me(`WebGLState:`,e)}}function Ie(){try{e.texImage2D(...arguments)}catch(e){me(`WebGLState:`,e)}}function I(){try{e.texImage3D(...arguments)}catch(e){me(`WebGLState:`,e)}}function Le(t){return d[t]===void 0?e.getParameter(t):d[t]}function L(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Re(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function ze(t){M.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),M.copy(t))}function R(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Be(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ve(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},A=null,oe={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new pt(0,0,0),T=0,E=!1,D=null,ee=null,te=null,ne=null,O=null,ce.set(0,0,e.canvas.width,e.canvas.height),M.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:N,disable:fe,bindFramebuffer:pe,drawBuffers:he,useProgram:ge,setBlending:ye,setMaterial:be,setFlipSided:P,setCullFace:xe,setLineWidth:Se,setPolygonOffset:Ce,setScissorTest:we,activeTexture:Te,bindTexture:F,unbindTexture:Ee,compressedTexImage2D:Oe,compressedTexImage3D:ke,texImage2D:Ie,texImage3D:I,pixelStorei:L,getParameter:Le,updateUBOMapping:R,uniformBlockBinding:Be,texStorage2D:Pe,texStorage3D:Fe,texSubImage2D:Ae,texSubImage3D:je,compressedTexSubImage2D:Me,compressedTexSubImage3D:Ne,scissor:Re,viewport:ze,reset:Ve}}function Ti(t,n,r,i,a,o,s){let c=n.has(`WEBGL_multisampled_render_to_texture`)?n.get(`WEBGL_multisampled_render_to_texture`):null,l=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),u=new de,d=new WeakMap,f=new Set,p,m=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function g(e,t){return h?new OffscreenCanvas(e,t):he(`canvas`)}function _(e,t,n){let r=1,i=I(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);p===void 0&&(p=g(n,a));let o=t?g(n,a):p;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),Ge(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&Ge(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function v(e){return e.generateMipmaps}function y(e){t.generateMipmap(e)}function b(e){return e.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?t.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(e,r,i,a,o,s=!1){if(e!==null){if(t[e]!==void 0)return t[e];Ge(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let c;a&&(c=n.get(`EXT_texture_norm16`),c||Ge(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===t.RED&&(i===t.FLOAT&&(l=t.R32F),i===t.HALF_FLOAT&&(l=t.R16F),i===t.UNSIGNED_BYTE&&(l=t.R8),i===t.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===t.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===t.RED_INTEGER&&(i===t.UNSIGNED_BYTE&&(l=t.R8UI),i===t.UNSIGNED_SHORT&&(l=t.R16UI),i===t.UNSIGNED_INT&&(l=t.R32UI),i===t.BYTE&&(l=t.R8I),i===t.SHORT&&(l=t.R16I),i===t.INT&&(l=t.R32I)),r===t.RG&&(i===t.FLOAT&&(l=t.RG32F),i===t.HALF_FLOAT&&(l=t.RG16F),i===t.UNSIGNED_BYTE&&(l=t.RG8),i===t.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===t.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===t.RG_INTEGER&&(i===t.UNSIGNED_BYTE&&(l=t.RG8UI),i===t.UNSIGNED_SHORT&&(l=t.RG16UI),i===t.UNSIGNED_INT&&(l=t.RG32UI),i===t.BYTE&&(l=t.RG8I),i===t.SHORT&&(l=t.RG16I),i===t.INT&&(l=t.RG32I)),r===t.RGB_INTEGER&&(i===t.UNSIGNED_BYTE&&(l=t.RGB8UI),i===t.UNSIGNED_SHORT&&(l=t.RGB16UI),i===t.UNSIGNED_INT&&(l=t.RGB32UI),i===t.BYTE&&(l=t.RGB8I),i===t.SHORT&&(l=t.RGB16I),i===t.INT&&(l=t.RGB32I)),r===t.RGBA_INTEGER&&(i===t.UNSIGNED_BYTE&&(l=t.RGBA8UI),i===t.UNSIGNED_SHORT&&(l=t.RGBA16UI),i===t.UNSIGNED_INT&&(l=t.RGBA32UI),i===t.BYTE&&(l=t.RGBA8I),i===t.SHORT&&(l=t.RGBA16I),i===t.INT&&(l=t.RGBA32I)),r===t.RGB&&(i===t.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===t.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===t.UNSIGNED_INT_5_9_9_9_REV&&(l=t.RGB9_E5),i===t.UNSIGNED_INT_10F_11F_11F_REV&&(l=t.R11F_G11F_B10F)),r===t.RGBA){let e=s?V:se.getTransfer(o);i===t.FLOAT&&(l=t.RGBA32F),i===t.HALF_FLOAT&&(l=t.RGBA16F),i===t.UNSIGNED_BYTE&&(l=e===`srgb`?t.SRGB8_ALPHA8:t.RGBA8),i===t.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===t.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===t.UNSIGNED_SHORT_4_4_4_4&&(l=t.RGBA4),i===t.UNSIGNED_SHORT_5_5_5_1&&(l=t.RGB5_A1)}return(l===t.R16F||l===t.R32F||l===t.RG16F||l===t.RG32F||l===t.RGBA16F||l===t.RGBA32F)&&n.get(`EXT_color_buffer_float`),l}function S(e,n){let r;return e?n===null||n===1014||n===1020?r=t.DEPTH24_STENCIL8:n===1015?r=t.DEPTH32F_STENCIL8:n===1012&&(r=t.DEPTH24_STENCIL8,Ge(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=t.DEPTH_COMPONENT24:n===1015?r=t.DEPTH_COMPONENT32F:n===1012&&(r=t.DEPTH_COMPONENT16),r}function C(e,t){return v(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t),t.isVideoTexture&&d.delete(t),t.isHTMLTexture&&f.delete(t)}function T(e){let t=e.target;t.removeEventListener(`dispose`,T),te(t)}function D(e){let t=i.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=m.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&ee(e),Object.keys(r).length===0&&m.delete(n)}i.remove(e)}function ee(e){let n=i.get(e);t.deleteTexture(n.__webglTexture);let r=e.source,a=m.get(r);delete a[n.__cacheKey],s.memory.textures--}function te(e){let n=i.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),i.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(n.__webglFramebuffer[e]))for(let r=0;r<n.__webglFramebuffer[e].length;r++)t.deleteFramebuffer(n.__webglFramebuffer[e][r]);else t.deleteFramebuffer(n.__webglFramebuffer[e]);n.__webglDepthbuffer&&t.deleteRenderbuffer(n.__webglDepthbuffer[e])}else{if(Array.isArray(n.__webglFramebuffer))for(let e=0;e<n.__webglFramebuffer.length;e++)t.deleteFramebuffer(n.__webglFramebuffer[e]);else t.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&t.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&t.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let e=0;e<n.__webglColorRenderbuffer.length;e++)n.__webglColorRenderbuffer[e]&&t.deleteRenderbuffer(n.__webglColorRenderbuffer[e]);n.__webglDepthRenderbuffer&&t.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=e.textures;for(let e=0,n=r.length;e<n;e++){let n=i.get(r[e]);n.__webglTexture&&(t.deleteTexture(n.__webglTexture),s.memory.textures--),i.remove(r[e])}i.remove(e)}let ne=0;function O(){ne=0}function re(){return ne}function k(e){ne=e}function ae(){let e=ne;return e>=a.maxTextures&&Ge(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+a.maxTextures),ne+=1,e}function A(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function oe(e,n){let a=i.get(e);if(e.isVideoTexture&&Fe(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&a.__version!==e.version){let t=e.image;if(t===null)Ge(`WebGLRenderer: Texture marked for update but no image data found.`);else if(t.complete===!1)Ge(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ye(a,e,n);return}}else e.isExternalTexture&&(a.__webglTexture=e.sourceTexture?e.sourceTexture:null);r.bindTexture(t.TEXTURE_2D,a.__webglTexture,t.TEXTURE0+n)}function j(e,n){let a=i.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&a.__version!==e.version){ye(a,e,n);return}e.isExternalTexture&&(a.__webglTexture=e.sourceTexture?e.sourceTexture:null),r.bindTexture(t.TEXTURE_2D_ARRAY,a.__webglTexture,t.TEXTURE0+n)}function ce(e,n){let a=i.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&a.__version!==e.version){ye(a,e,n);return}r.bindTexture(t.TEXTURE_3D,a.__webglTexture,t.TEXTURE0+n)}function M(e,n){let a=i.get(e);if(e.isCubeDepthTexture!==!0&&e.version>0&&a.__version!==e.version){be(a,e,n);return}r.bindTexture(t.TEXTURE_CUBE_MAP,a.__webglTexture,t.TEXTURE0+n)}let le={[st]:t.REPEAT,[Ce]:t.CLAMP_TO_EDGE,[Oe]:t.MIRRORED_REPEAT},ue={[Ne]:t.NEAREST,[We]:t.NEAREST_MIPMAP_NEAREST,[Ye]:t.NEAREST_MIPMAP_LINEAR,[ie]:t.LINEAR,[Ae]:t.LINEAR_MIPMAP_NEAREST,[e]:t.LINEAR_MIPMAP_LINEAR},N={512:t.NEVER,519:t.ALWAYS,513:t.LESS,515:t.LEQUAL,514:t.EQUAL,518:t.GEQUAL,516:t.GREATER,517:t.NOTEQUAL};function fe(e,r){if(r.type===1015&&n.has(`OES_texture_float_linear`)===!1&&(r.magFilter===1006||r.magFilter===1007||r.magFilter===1005||r.magFilter===1008||r.minFilter===1006||r.minFilter===1007||r.minFilter===1005||r.minFilter===1008)&&Ge(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),t.texParameteri(e,t.TEXTURE_WRAP_S,le[r.wrapS]),t.texParameteri(e,t.TEXTURE_WRAP_T,le[r.wrapT]),(e===t.TEXTURE_3D||e===t.TEXTURE_2D_ARRAY)&&t.texParameteri(e,t.TEXTURE_WRAP_R,le[r.wrapR]),t.texParameteri(e,t.TEXTURE_MAG_FILTER,ue[r.magFilter]),t.texParameteri(e,t.TEXTURE_MIN_FILTER,ue[r.minFilter]),r.compareFunction&&(t.texParameteri(e,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(e,t.TEXTURE_COMPARE_FUNC,N[r.compareFunction])),n.has(`EXT_texture_filter_anisotropic`)===!0){if(r.magFilter===1003||r.minFilter!==1005&&r.minFilter!==1008||r.type===1015&&n.has(`OES_texture_float_linear`)===!1)return;if(r.anisotropy>1||i.get(r).__currentAnisotropy){let o=n.get(`EXT_texture_filter_anisotropic`);t.texParameterf(e,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,a.getMaxAnisotropy())),i.get(r).__currentAnisotropy=r.anisotropy}}}function pe(e,n){let r=!1;e.__webglInit===void 0&&(e.__webglInit=!0,n.addEventListener(`dispose`,w));let i=n.source,a=m.get(i);a===void 0&&(a={},m.set(i,a));let o=A(n);if(o!==e.__cacheKey){a[o]===void 0&&(a[o]={texture:t.createTexture(),usedTimes:0},s.memory.textures++,r=!0),a[o].usedTimes++;let i=a[e.__cacheKey];i!==void 0&&(a[e.__cacheKey].usedTimes--,i.usedTimes===0&&ee(n)),e.__cacheKey=o,e.__webglTexture=a[o].texture}return r}function ge(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ve(e,n,i,a){let o=e.updateRanges;if(o.length===0)r.texSubImage2D(t.TEXTURE_2D,0,0,0,n.width,n.height,i,a,n.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],r=o[e],i=t.start+t.count,a=ge(r.start,n.width,4),c=ge(t.start,n.width,4);r.start<=i+1&&a===c&&ge(r.start+r.count-1,n.width,4)===a?t.count=Math.max(t.count,r.start+r.count-t.start):(++s,o[s]=r)}o.length=s+1;let c=r.getParameter(t.UNPACK_ROW_LENGTH),l=r.getParameter(t.UNPACK_SKIP_PIXELS),u=r.getParameter(t.UNPACK_SKIP_ROWS);r.pixelStorei(t.UNPACK_ROW_LENGTH,n.width);for(let e=0,s=o.length;e<s;e++){let s=o[e],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%n.width,d=Math.floor(c/n.width),f=l;r.pixelStorei(t.UNPACK_SKIP_PIXELS,u),r.pixelStorei(t.UNPACK_SKIP_ROWS,d),r.texSubImage2D(t.TEXTURE_2D,0,u,d,f,1,i,a,n.data)}e.clearUpdateRanges(),r.pixelStorei(t.UNPACK_ROW_LENGTH,c),r.pixelStorei(t.UNPACK_SKIP_PIXELS,l),r.pixelStorei(t.UNPACK_SKIP_ROWS,u)}}function ye(e,n,s){let c=t.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(c=t.TEXTURE_2D_ARRAY),n.isData3DTexture&&(c=t.TEXTURE_3D);let l=pe(e,n),u=n.source;r.bindTexture(c,e.__webglTexture,t.TEXTURE0+s);let d=i.get(u);if(u.version!==d.__version||l===!0){if(r.activeTexture(t.TEXTURE0+s),!(typeof ImageBitmap<`u`&&n.image instanceof ImageBitmap)){let e=se.getPrimaries(se.workingColorSpace),i=n.colorSpace===``?null:se.getPrimaries(n.colorSpace),a=n.colorSpace===``||e===i?t.NONE:t.BROWSER_DEFAULT_WEBGL;r.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,n.flipY),r.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),r.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,a)}r.pixelStorei(t.UNPACK_ALIGNMENT,n.unpackAlignment);let e=_(n.image,!1,a.maxTextureSize);e=Ie(n,e);let i=o.convert(n.format,n.colorSpace),p=o.convert(n.type),m=x(n.internalFormat,i,p,n.normalized,n.colorSpace,n.isVideoTexture);fe(c,n);let h,g=n.mipmaps,b=n.isVideoTexture!==!0,w=d.__version===void 0||l===!0,T=u.dataReady,D=C(n,e);if(n.isDepthTexture)m=S(n.format===E,n.type),w&&(b?r.texStorage2D(t.TEXTURE_2D,1,m,e.width,e.height):r.texImage2D(t.TEXTURE_2D,0,m,e.width,e.height,0,i,p,null));else if(n.isDataTexture){if(g.length>0){b&&w&&r.texStorage2D(t.TEXTURE_2D,D,m,g[0].width,g[0].height);for(let e=0,n=g.length;e<n;e++)h=g[e],b?T&&r.texSubImage2D(t.TEXTURE_2D,e,0,0,h.width,h.height,i,p,h.data):r.texImage2D(t.TEXTURE_2D,e,m,h.width,h.height,0,i,p,h.data);n.generateMipmaps=!1}else b?(w&&r.texStorage2D(t.TEXTURE_2D,D,m,e.width,e.height),T&&ve(n,e,i,p)):r.texImage2D(t.TEXTURE_2D,0,m,e.width,e.height,0,i,p,e.data)}else if(n.isCompressedTexture){if(n.isCompressedArrayTexture){b&&w&&r.texStorage3D(t.TEXTURE_2D_ARRAY,D,m,g[0].width,g[0].height,e.depth);for(let a=0,o=g.length;a<o;a++)if(h=g[a],n.format!==1023){if(i!==null){if(b){if(T){if(n.layerUpdates.size>0){let e=_e(h.width,h.height,n.format,n.type);for(let o of n.layerUpdates){let n=h.data.subarray(o*e/h.data.BYTES_PER_ELEMENT,(o+1)*e/h.data.BYTES_PER_ELEMENT);r.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,a,0,0,o,h.width,h.height,1,i,n)}}else r.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,a,0,0,0,h.width,h.height,e.depth,i,h.data)}}else r.compressedTexImage3D(t.TEXTURE_2D_ARRAY,a,m,h.width,h.height,e.depth,0,h.data,0,0)}else Ge(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else b?T&&r.texSubImage3D(t.TEXTURE_2D_ARRAY,a,0,0,0,h.width,h.height,e.depth,i,p,h.data):r.texImage3D(t.TEXTURE_2D_ARRAY,a,m,h.width,h.height,e.depth,0,i,p,h.data);n.layerUpdates.size>0&&n.clearLayerUpdates()}else{b&&w&&r.texStorage2D(t.TEXTURE_2D,D,m,g[0].width,g[0].height);for(let e=0,a=g.length;e<a;e++)h=g[e],n.format===1023?b?T&&r.texSubImage2D(t.TEXTURE_2D,e,0,0,h.width,h.height,i,p,h.data):r.texImage2D(t.TEXTURE_2D,e,m,h.width,h.height,0,i,p,h.data):i===null?Ge(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):b?T&&r.compressedTexSubImage2D(t.TEXTURE_2D,e,0,0,h.width,h.height,i,h.data):r.compressedTexImage2D(t.TEXTURE_2D,e,m,h.width,h.height,0,h.data)}}else if(n.isDataArrayTexture){if(b){if(w&&r.texStorage3D(t.TEXTURE_2D_ARRAY,D,m,e.width,e.height,e.depth),T){if(n.layerUpdates.size>0){let a=_e(e.width,e.height,n.format,n.type);for(let o of n.layerUpdates){let n=e.data.subarray(o*a/e.data.BYTES_PER_ELEMENT,(o+1)*a/e.data.BYTES_PER_ELEMENT);r.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,o,e.width,e.height,1,i,p,n)}n.clearLayerUpdates()}else r.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,i,p,e.data)}}else r.texImage3D(t.TEXTURE_2D_ARRAY,0,m,e.width,e.height,e.depth,0,i,p,e.data)}else if(n.isData3DTexture)b?(w&&r.texStorage3D(t.TEXTURE_3D,D,m,e.width,e.height,e.depth),T&&r.texSubImage3D(t.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,i,p,e.data)):r.texImage3D(t.TEXTURE_3D,0,m,e.width,e.height,e.depth,0,i,p,e.data);else if(n.isFramebufferTexture){if(w){if(b)r.texStorage2D(t.TEXTURE_2D,D,m,e.width,e.height);else{let n=e.width,a=e.height;for(let e=0;e<D;e++)r.texImage2D(t.TEXTURE_2D,e,m,n,a,0,i,p,null),n>>=1,a>>=1}}}else if(n.isHTMLTexture){if(`texElementImage2D`in t){let r=t.canvas;if(r.hasAttribute(`layoutsubtree`)||r.setAttribute(`layoutsubtree`,`true`),e.parentNode!==r){r.appendChild(e),f.add(n),r.onpaint=e=>{let t=e.changedElements;for(let e of f)t.includes(e.image)&&(e.needsUpdate=!0)},r.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,e);else{let n=t.RGBA,r=t.RGBA,i=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,n,r,i,e)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(g.length>0){if(b&&w){let e=I(g[0]);r.texStorage2D(t.TEXTURE_2D,D,m,e.width,e.height)}for(let e=0,n=g.length;e<n;e++)h=g[e],b?T&&r.texSubImage2D(t.TEXTURE_2D,e,0,0,i,p,h):r.texImage2D(t.TEXTURE_2D,e,m,i,p,h);n.generateMipmaps=!1}else if(b){if(w){let n=I(e);r.texStorage2D(t.TEXTURE_2D,D,m,n.width,n.height)}T&&r.texSubImage2D(t.TEXTURE_2D,0,0,0,i,p,e)}else r.texImage2D(t.TEXTURE_2D,0,m,i,p,e);v(n)&&y(c),d.__version=u.version,n.onUpdate&&n.onUpdate(n)}e.__version=n.version}function be(e,n,s){if(n.image.length!==6)return;let c=pe(e,n),l=n.source;r.bindTexture(t.TEXTURE_CUBE_MAP,e.__webglTexture,t.TEXTURE0+s);let u=i.get(l);if(l.version!==u.__version||c===!0){r.activeTexture(t.TEXTURE0+s);let e=se.getPrimaries(se.workingColorSpace),i=n.colorSpace===``?null:se.getPrimaries(n.colorSpace),d=n.colorSpace===``||e===i?t.NONE:t.BROWSER_DEFAULT_WEBGL;r.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,n.flipY),r.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),r.pixelStorei(t.UNPACK_ALIGNMENT,n.unpackAlignment),r.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=n.isCompressedTexture||n.image[0].isCompressedTexture,p=n.image[0]&&n.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=_(n.image[e],!0,a.maxCubemapSize):m[e]=p?n.image[e].image:n.image[e],m[e]=Ie(n,m[e]);let h=m[0],g=o.convert(n.format,n.colorSpace),b=o.convert(n.type),S=x(n.internalFormat,g,b,n.normalized,n.colorSpace),w=n.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=C(n,h);fe(t.TEXTURE_CUBE_MAP,n);let ee;if(f){w&&T&&r.texStorage2D(t.TEXTURE_CUBE_MAP,D,S,h.width,h.height);for(let e=0;e<6;e++){ee=m[e].mipmaps;for(let i=0;i<ee.length;i++){let a=ee[i];n.format===1023?w?E&&r.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i,0,0,a.width,a.height,g,b,a.data):r.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i,S,a.width,a.height,0,g,b,a.data):g===null?Ge(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&r.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i,0,0,a.width,a.height,g,a.data):r.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,i,S,a.width,a.height,0,a.data)}}}else{if(ee=n.mipmaps,w&&T){ee.length>0&&D++;let e=I(m[0]);r.texStorage2D(t.TEXTURE_CUBE_MAP,D,S,e.width,e.height)}for(let e=0;e<6;e++)if(p){w?E&&r.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,m[e].width,m[e].height,g,b,m[e].data):r.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,S,m[e].width,m[e].height,0,g,b,m[e].data);for(let n=0;n<ee.length;n++){let i=ee[n].image[e].image;w?E&&r.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,n+1,0,0,i.width,i.height,g,b,i.data):r.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,n+1,S,i.width,i.height,0,g,b,i.data)}}else{w?E&&r.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,b,m[e]):r.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,S,g,b,m[e]);for(let n=0;n<ee.length;n++){let i=ee[n];w?E&&r.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,n+1,0,0,g,b,i.image[e]):r.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,n+1,S,g,b,i.image[e])}}}v(n)&&y(t.TEXTURE_CUBE_MAP),u.__version=l.version,n.onUpdate&&n.onUpdate(n)}e.__version=n.version}function P(e,n,a,s,l,u){let d=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=x(a.internalFormat,d,f,a.normalized,a.colorSpace),m=i.get(n),h=i.get(a);if(h.__renderTarget=n,!m.__hasExternalTextures){let e=Math.max(1,n.width>>u),i=Math.max(1,n.height>>u);l===t.TEXTURE_3D||l===t.TEXTURE_2D_ARRAY?r.texImage3D(l,u,p,e,i,n.depth,0,d,f,null):r.texImage2D(l,u,p,e,i,0,d,f,null)}r.bindFramebuffer(t.FRAMEBUFFER,e),Pe(n)?c.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,s,l,h.__webglTexture,0,Me(n)):(l===t.TEXTURE_2D||l>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,s,l,h.__webglTexture,u),r.bindFramebuffer(t.FRAMEBUFFER,null)}function xe(e,n,r){if(t.bindRenderbuffer(t.RENDERBUFFER,e),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=S(n.stencilBuffer,a),s=n.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Pe(n)?c.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Me(n),o,n.width,n.height):r?t.renderbufferStorageMultisample(t.RENDERBUFFER,Me(n),o,n.width,n.height):t.renderbufferStorage(t.RENDERBUFFER,o,n.width,n.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,s,t.RENDERBUFFER,e)}else{let e=n.textures;for(let i=0;i<e.length;i++){let a=e[i],s=o.convert(a.format,a.colorSpace),l=o.convert(a.type),u=x(a.internalFormat,s,l,a.normalized,a.colorSpace);Pe(n)?c.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Me(n),u,n.width,n.height):r?t.renderbufferStorageMultisample(t.RENDERBUFFER,Me(n),u,n.width,n.height):t.renderbufferStorage(t.RENDERBUFFER,u,n.width,n.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Se(e,n,a){let s=n.isWebGLCubeRenderTarget===!0;if(r.bindFramebuffer(t.FRAMEBUFFER,e),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=i.get(n.depthTexture);if(l.__renderTarget=n,(!l.__webglTexture||n.depthTexture.image.width!==n.width||n.depthTexture.image.height!==n.height)&&(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),s){if(l.__webglInit===void 0&&(l.__webglInit=!0,n.depthTexture.addEventListener(`dispose`,w)),l.__webglTexture===void 0){l.__webglTexture=t.createTexture(),r.bindTexture(t.TEXTURE_CUBE_MAP,l.__webglTexture),fe(t.TEXTURE_CUBE_MAP,n.depthTexture);let e=o.convert(n.depthTexture.format),i=o.convert(n.depthTexture.type),a;n.depthTexture.format===1026?a=t.DEPTH_COMPONENT24:n.depthTexture.format===1027&&(a=t.DEPTH24_STENCIL8);for(let r=0;r<6;r++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,a,n.width,n.height,0,e,i,null)}}else oe(n.depthTexture,0);let u=l.__webglTexture,d=Me(n),f=s?t.TEXTURE_CUBE_MAP_POSITIVE_X+a:t.TEXTURE_2D,p=n.depthTexture.format===1027?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)Pe(n)?c.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,p,f,u,0,d):t.framebufferTexture2D(t.FRAMEBUFFER,p,f,u,0);else if(n.depthTexture.format===1027)Pe(n)?c.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,p,f,u,0,d):t.framebufferTexture2D(t.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function we(e){let n=i.get(e),a=e.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==e.depthTexture){let t=e.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),t){let e=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,t.removeEventListener(`dispose`,e)};t.addEventListener(`dispose`,e),n.__depthDisposeCallback=e}n.__boundDepthTexture=t}if(e.depthTexture&&!n.__autoAllocateDepthBuffer){if(a)for(let t=0;t<6;t++)Se(n.__webglFramebuffer[t],e,t);else{let t=e.texture.mipmaps;t&&t.length>0?Se(n.__webglFramebuffer[0],e,0):Se(n.__webglFramebuffer,e,0)}}else if(a){n.__webglDepthbuffer=[];for(let i=0;i<6;i++)if(r.bindFramebuffer(t.FRAMEBUFFER,n.__webglFramebuffer[i]),n.__webglDepthbuffer[i]===void 0)n.__webglDepthbuffer[i]=t.createRenderbuffer(),xe(n.__webglDepthbuffer[i],e,!1);else{let r=e.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[i];t.bindRenderbuffer(t.RENDERBUFFER,a),t.framebufferRenderbuffer(t.FRAMEBUFFER,r,t.RENDERBUFFER,a)}}else{let i=e.texture.mipmaps;if(i&&i.length>0?r.bindFramebuffer(t.FRAMEBUFFER,n.__webglFramebuffer[0]):r.bindFramebuffer(t.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=t.createRenderbuffer(),xe(n.__webglDepthbuffer,e,!1);else{let r=e.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,i),t.framebufferRenderbuffer(t.FRAMEBUFFER,r,t.RENDERBUFFER,i)}}r.bindFramebuffer(t.FRAMEBUFFER,null)}function Te(e,n,r){let a=i.get(e);n!==void 0&&P(a.__webglFramebuffer,e,e.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),r!==void 0&&we(e)}function F(e){let n=e.texture,a=i.get(e),c=i.get(n);e.addEventListener(`dispose`,T);let l=e.textures,u=e.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=t.createTexture()),c.__version=n.version,s.memory.textures++),u){a.__webglFramebuffer=[];for(let e=0;e<6;e++)if(n.mipmaps&&n.mipmaps.length>0){a.__webglFramebuffer[e]=[];for(let r=0;r<n.mipmaps.length;r++)a.__webglFramebuffer[e][r]=t.createFramebuffer()}else a.__webglFramebuffer[e]=t.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){a.__webglFramebuffer=[];for(let e=0;e<n.mipmaps.length;e++)a.__webglFramebuffer[e]=t.createFramebuffer()}else a.__webglFramebuffer=t.createFramebuffer();if(d)for(let e=0,n=l.length;e<n;e++){let n=i.get(l[e]);n.__webglTexture===void 0&&(n.__webglTexture=t.createTexture(),s.memory.textures++)}if(e.samples>0&&Pe(e)===!1){a.__webglMultisampledFramebuffer=t.createFramebuffer(),a.__webglColorRenderbuffer=[],r.bindFramebuffer(t.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];a.__webglColorRenderbuffer[n]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=o.convert(r.format,r.colorSpace),s=o.convert(r.type),c=x(r.internalFormat,i,s,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),u=Me(e);t.renderbufferStorageMultisample(t.RENDERBUFFER,u,c,e.width,e.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+n,t.RENDERBUFFER,a.__webglColorRenderbuffer[n])}t.bindRenderbuffer(t.RENDERBUFFER,null),e.depthBuffer&&(a.__webglDepthRenderbuffer=t.createRenderbuffer(),xe(a.__webglDepthRenderbuffer,e,!0)),r.bindFramebuffer(t.FRAMEBUFFER,null)}}if(u){r.bindTexture(t.TEXTURE_CUBE_MAP,c.__webglTexture),fe(t.TEXTURE_CUBE_MAP,n);for(let r=0;r<6;r++)if(n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)P(a.__webglFramebuffer[r][i],e,n,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else P(a.__webglFramebuffer[r],e,n,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);v(n)&&y(t.TEXTURE_CUBE_MAP),r.unbindTexture()}else if(d){for(let n=0,o=l.length;n<o;n++){let o=l[n],s=i.get(o),c=t.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(c=e.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),r.bindTexture(c,s.__webglTexture),fe(c,o),P(a.__webglFramebuffer,e,o,t.COLOR_ATTACHMENT0+n,c,0),v(o)&&y(c)}r.unbindTexture()}else{let i=t.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),r.bindTexture(i,c.__webglTexture),fe(i,n),n.mipmaps&&n.mipmaps.length>0)for(let r=0;r<n.mipmaps.length;r++)P(a.__webglFramebuffer[r],e,n,t.COLOR_ATTACHMENT0,i,r);else P(a.__webglFramebuffer,e,n,t.COLOR_ATTACHMENT0,i,0);v(n)&&y(i),r.unbindTexture()}e.depthBuffer&&we(e)}function Ee(e){let t=e.textures;for(let n=0,a=t.length;n<a;n++){let a=t[n];if(v(a)){let t=b(e),n=i.get(a).__webglTexture;r.bindTexture(t,n),y(t),r.unbindTexture()}}}let De=[],ke=[];function je(e){if(e.samples>0){if(Pe(e)===!1){let n=e.textures,a=e.width,o=e.height,s=t.COLOR_BUFFER_BIT,c=e.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,u=i.get(e),d=n.length>1;if(d)for(let e=0;e<n.length;e++)r.bindFramebuffer(t.FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+e,t.RENDERBUFFER,null),r.bindFramebuffer(t.FRAMEBUFFER,u.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+e,t.TEXTURE_2D,null,0);r.bindFramebuffer(t.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=e.texture.mipmaps;f&&f.length>0?r.bindFramebuffer(t.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):r.bindFramebuffer(t.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let r=0;r<n.length;r++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(s|=t.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(s|=t.STENCIL_BUFFER_BIT)),d){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,u.__webglColorRenderbuffer[r]);let e=i.get(n[r]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0)}t.blitFramebuffer(0,0,a,o,0,0,a,o,s,t.NEAREST),l===!0&&(De.length=0,ke.length=0,De.push(t.COLOR_ATTACHMENT0+r),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(De.push(c),ke.push(c),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,ke)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,De))}if(r.bindFramebuffer(t.READ_FRAMEBUFFER,null),r.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),d)for(let e=0;e<n.length;e++){r.bindFramebuffer(t.FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+e,t.RENDERBUFFER,u.__webglColorRenderbuffer[e]);let a=i.get(n[e]).__webglTexture;r.bindFramebuffer(t.FRAMEBUFFER,u.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+e,t.TEXTURE_2D,a,0)}r.bindFramebuffer(t.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&l){let n=e.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[n])}}}function Me(e){return Math.min(a.maxSamples,e.samples)}function Pe(e){let t=i.get(e);return e.samples>0&&n.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function Fe(e){let t=s.render.frame;d.get(e)!==t&&(d.set(e,t),e.update())}function Ie(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(se.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&Ge(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):me(`WebGLTextures: Unsupported texture color space:`,n)),t}function I(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(u.width=e.naturalWidth||e.width,u.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(u.width=e.displayWidth,u.height=e.displayHeight):(u.width=e.width,u.height=e.height),u}this.allocateTextureUnit=ae,this.resetTextureUnits=O,this.getTextureUnits=re,this.setTextureUnits=k,this.setTexture2D=oe,this.setTexture2DArray=j,this.setTexture3D=ce,this.setTextureCube=M,this.rebindTextures=Te,this.setupRenderTarget=F,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=P,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return r.buffers.depth.getReversed()}}function Ei(e,t){function n(n,r=``){let i,a=se.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Di=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Oi=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ki=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new w(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new we({vertexShader:Di,fragmentShader:Oi,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new H(new ut(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ai=class extends y{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,c=1,l=null,d=null,f=null,p=null,h=null,_=null,y=typeof XRWebGLBinding<`u`,b=new ki,x={},S=t.getContextAttributes(),D=null,ne=null,O=[],re=[],k=new de,ie=null,ae=null,A=new Pe;A.viewport=new le;let oe=new Pe;oe.viewport=new le;let se=[A,oe],j=new je,ce=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=O[e];return t===void 0&&(t=new C,O[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=O[e];return t===void 0&&(t=new C,O[e]=t),t.getGripSpace()},this.getHand=function(e){let t=O[e];return t===void 0&&(t=new C,O[e]=t),t.getHandSpace()};function ue(e){let t=re.indexOf(e.inputSource);if(t===-1)return;let n=O[t];n!==void 0&&(n.update(e.inputSource,e.frame,l||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function N(){r.removeEventListener(`select`,ue),r.removeEventListener(`selectstart`,ue),r.removeEventListener(`selectend`,ue),r.removeEventListener(`squeeze`,ue),r.removeEventListener(`squeezestart`,ue),r.removeEventListener(`squeezeend`,ue),r.removeEventListener(`end`,N),r.removeEventListener(`inputsourceschange`,fe);for(let e=0;e<O.length;e++){let t=re[e];t!==null&&(re[e]=null,O[e].disconnect(t))}ce=null,M=null,b.reset();for(let e in x)delete x[e];if(e.setRenderTarget(D),h=null,p=null,f=null,r=null,ne=null,be.stop(),n.isPresenting=!1,e.setPixelRatio(ie),e.setSize(k.width,k.height,!1),ae!==null){let e=ae.camera;e.fov=ae.fov,e.zoom=ae.zoom,e.updateProjectionMatrix(),ae=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&Ge(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&Ge(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return p===null?h:p},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(s){if(r=s,r!==null){if(D=e.getRenderTarget(),r.addEventListener(`select`,ue),r.addEventListener(`selectstart`,ue),r.addEventListener(`selectend`,ue),r.addEventListener(`squeeze`,ue),r.addEventListener(`squeezestart`,ue),r.addEventListener(`squeezeend`,ue),r.addEventListener(`end`,N),r.addEventListener(`inputsourceschange`,fe),S.xrCompatible!==!0&&await t.makeXRCompatible(),ie=e.getPixelRatio(),e.getSize(k),y&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;S.depth&&(o=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=S.stencil?E:Re,a=S.stencil?m:T);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};f=this.getBinding(),p=f.createProjectionLayer(s),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),ne=new g(p.textureWidth,p.textureHeight,{format:u,type:te,depthTexture:new ee(p.textureWidth,p.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}else{let n={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:i};h=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),ne=new g(h.framebufferWidth,h.framebufferHeight,{format:u,type:te,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}ne.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),be.setContext(r),be.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function fe(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=re.indexOf(n);r>=0&&(re[r]=null,O[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=re.indexOf(n);if(r===-1){for(let e=0;e<O.length;e++)if(e>=re.length){re.push(n),r=e;break}else if(re[e]===null){re[e]=n,r=e;break}if(r===-1)break}let i=O[r];i&&i.connect(n)}}let pe=new v,me=new v;function he(e,t,n){pe.setFromMatrixPosition(t.matrixWorld),me.setFromMatrixPosition(n.matrixWorld);let r=pe.distanceTo(me),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ge(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;b.texture!==null&&(b.depthNear>0&&(t=b.depthNear),b.depthFar>0&&(n=b.depthFar)),j.near=oe.near=A.near=t,j.far=oe.far=A.far=n,(ce!==j.near||M!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),ce=j.near,M=j.far),j.layers.mask=e.layers.mask|6,A.layers.mask=j.layers.mask&-5,oe.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ge(j,i);for(let e=0;e<a.length;e++)ge(a[e],i);a.length===2?he(j,A,oe):j.projectionMatrix.copy(A.projectionMatrix),ae===null&&e.isPerspectiveCamera&&(ae={camera:e,fov:e.fov,zoom:e.zoom}),_e(e,j,i)};function _e(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=s*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(p!==null||h!==null)return c},this.setFoveation=function(e){c=e,p!==null&&(p.fixedFoveation=e),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=e)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(j)},this.getCameraTexture=function(e){return x[e]};let ve=null;function ye(t,i){if(d=i.getViewerPose(l||a),_=i,d!==null){let t=d.views;h!==null&&(e.setRenderTargetFramebuffer(ne,h.framebuffer),e.setRenderTarget(ne));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(h!==null)a=h.getViewport(r);else{let t=f.getViewSubImage(p,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(ne,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(ne))}let o=se[n];o===void 0&&(o=new Pe,o.layers.enable(n),o.viewport=new le,se[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&y){f=n.getBinding();let e=f.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&b.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&y){e.state.unbindTexture(),f=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=x[n];e||(e=new w,x[n]=e);let t=f.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<O.length;e++){let t=re[e],n=O[e];t!==null&&n!==void 0&&n.update(t,i,l||a)}ve&&ve(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),_=null}let be=new xt;be.setAnimationLoop(ye),this.setAnimationLoop=function(e){ve=e},this.dispose=function(){}}},ji=new Se,Mi=new L;Mi.set(-1,0,0,0,1,0,0,0,1);function Ni(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ae(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(ji.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Mi),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Pi(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return me(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?Ge(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):Ge(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Fi=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ii=null;function Li(){return Ii===null&&(Ii=new n(Fi,16,16,Le,h),Ii.name=`DFG_LUT`,Ii.minFilter=ie,Ii.magFilter=ie,Ii.wrapS=Ce,Ii.wrapT=Ce,Ii.generateMipmaps=!1,Ii.needsUpdate=!0),Ii}var Ri=class{constructor(n={}){let{canvas:r=x(),context:i=null,depth:o=!0,stencil:s=!1,alpha:c=!1,antialias:l=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:d=!1,powerPreference:f=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:y=!1,outputBufferType:b=te}=n;this.isWebGLRenderer=!0;let S;if(i!==null){if(typeof WebGLRenderingContext<`u`&&i instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);S=i.getContextAttributes().alpha}else S=c;let C=b,w=new Set([re,xe,He]),E=new Set([te,T,a,m,oe,bt]),D=new Uint32Array(4),ee=new Int32Array(4),ne=new v,O=null,k=null,ie=[],ae=[],A=null;this.domElement=r,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,ce=!1,M=null,ue=null,de=null,N=null;this._outputColorSpace=ye;let pe=0,he=0,ge=null,_e=-1,ve=null,be=new le,P=new le,Ce=null,we=new pt(0),Te=0,F=r.width,Ee=r.height,De=1,Oe=null,ke=null,Ae=new le(0,0,F,Ee),je=new le(0,0,F,Ee),Me=!1,Ne=new _,Pe=!1,Fe=!1,Ie=new Se,I=new v,Le=new le,L={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Re=!1;function ze(){return ge===null?De:1}let R=i;function Be(e,t){return r.getContext(e,t)}let Ve,Ue,z,We,B,V,Ke,qe,H,Je,Ye,Xe,Ze,Qe,$e,U,et,tt,nt,rt,at,ot,st;try{let e={alpha:!0,depth:o,stencil:s,antialias:l,premultipliedAlpha:u,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:p};if(`setAttribute`in r&&r.setAttribute(`data-engine`,`three.js r186`),r.addEventListener(`webglcontextlost`,lt,!1),r.addEventListener(`webglcontextrestored`,ut,!1),r.addEventListener(`webglcontextcreationerror`,dt,!1),R===null){let t=`webgl2`;if(R=Be(t,e),R===null)throw Be(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}W()}catch(e){throw r.removeEventListener(`webglcontextlost`,lt,!1),r.removeEventListener(`webglcontextrestored`,ut,!1),r.removeEventListener(`webglcontextcreationerror`,dt,!1),me(`WebGLRenderer: `+e.message),e}function W(){Ve=new tn(R),Ve.init(),at=new Ei(R,Ve),Ue=new At(R,Ve,n,at),z=new wi(R,Ve),Ue.reversedDepthBuffer&&y&&z.buffers.depth.setReversed(!0),ue=R.createFramebuffer(),de=R.createFramebuffer(),N=R.createFramebuffer(),We=new an(R),B=new ii,V=new Ti(R,Ve,z,B,Ue,at,We),Ke=new en(j),qe=new St(R),ot=new Ot(R,qe),H=new nn(R,qe,We,ot),Je=new sn(R,H,qe,ot,We),tt=new on(R,Ue,V),$e=new jt(B),Ye=new ri(j,Ke,Ve,Ue,ot,$e),Xe=new Ni(j,B),Ze=new ci,Qe=new hi(Ve),et=new Dt(j,Ke,z,Je,S,u),U=new Ci(j,Je,Ue),st=new Pi(R,We,Ue,z),nt=new kt(R,Ve,We),rt=new rn(R,Ve,We),We.programs=Ye.programs,j.capabilities=Ue,j.extensions=Ve,j.properties=B,j.renderLists=Ze,j.shadowMap=U,j.state=z,j.info=We}C!==1009&&(A=new ln(C,r.width,r.height,l,o,s));let ct=new Ai(j,R);this.xr=ct,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=Ve.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ve.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(e){e!==void 0&&(De=e,this.setSize(F,Ee,!1))},this.getSize=function(e){return e.set(F,Ee)},this.setSize=function(e,t,n=!0){if(ct.isPresenting){Ge(`WebGLRenderer: Can't change size while VR device is presenting.`);return}F=e,Ee=t,r.width=Math.floor(e*De),r.height=Math.floor(t*De),n===!0&&(r.style.width=e+`px`,r.style.height=t+`px`),A!==null&&A.setSize(r.width,r.height),this.setViewport(0,0,e,t)},this.getDrawingBufferSize=function(e){return e.set(F*De,Ee*De).floor()},this.setDrawingBufferSize=function(e,t,n){F=e,Ee=t,De=n,r.width=Math.floor(e*n),r.height=Math.floor(t*n),this.setViewport(0,0,e,t)},this.setEffects=function(e){if(C===1009){me(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){Ge(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}A.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(be)},this.getViewport=function(e){return e.copy(Ae)},this.setViewport=function(e,t,n,r){e.isVector4?Ae.set(e.x,e.y,e.z,e.w):Ae.set(e,t,n,r),z.viewport(be.copy(Ae).multiplyScalar(De).round())},this.getScissor=function(e){return e.copy(je)},this.setScissor=function(e,t,n,r){e.isVector4?je.set(e.x,e.y,e.z,e.w):je.set(e,t,n,r),z.scissor(P.copy(je).multiplyScalar(De).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(e){z.setScissorTest(Me=e)},this.setOpaqueSort=function(e){Oe=e},this.setTransparentSort=function(e){ke=e},this.getClearColor=function(e){return e.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(ge!==null){let t=ge.texture.format;e=w.has(t)}if(e){let e=ge.texture.type,t=E.has(e),n=et.getClearColor(),r=et.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(D[0]=i,D[1]=a,D[2]=o,D[3]=r,R.clearBufferuiv(R.COLOR,0,D)):(ee[0]=i,ee[1]=a,ee[2]=o,ee[3]=r,R.clearBufferiv(R.COLOR,0,ee))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),M=e},this.dispose=function(){r.removeEventListener(`webglcontextlost`,lt,!1),r.removeEventListener(`webglcontextrestored`,ut,!1),r.removeEventListener(`webglcontextcreationerror`,dt,!1),et.dispose(),Ze.dispose(),Qe.dispose(),B.dispose(),Ke.dispose(),Je.dispose(),ot.dispose(),st.dispose(),Ye.dispose(),ct.dispose(),ct.removeEventListener(`sessionstart`,yt),ct.removeEventListener(`sessionend`,G),K.stop()};function lt(e){e.preventDefault(),t(`WebGLRenderer: Context Lost.`),ce=!0}function ut(){t(`WebGLRenderer: Context Restored.`),ce=!1;let e=We.autoReset,n=U.enabled,r=U.autoUpdate,i=U.needsUpdate,a=U.type;W(),We.autoReset=e,U.enabled=n,U.autoUpdate=r,U.needsUpdate=i,U.type=a}function dt(e){me(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ft(e){let t=e.target;t.removeEventListener(`dispose`,ft),mt(t)}function mt(e){ht(e),B.remove(e)}function ht(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){Ye.releaseProgram(e)}),e.isShaderMaterial&&Ye.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=L);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Lt(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=H.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;ot.setup(i,r,s,n,c);let h,g=nt;if(c!==null&&(h=qe.get(c),g=rt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*ze()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*ze()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(Ve.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?qe.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function gt(e,t,n,r){M!==null&&e.isNodeMaterial&&M.setObject(r,e),Pe===!0&&$e.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Nt(e,t,r),e.side=0,e.needsUpdate=!0,Nt(e,t,r),e.side=2):Nt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),M!==null&&M.renderStart(e,t,n),k=Qe.get(n),k.init(t),ae.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),M!==null&&M.updateLights(k.state.lightsArray),Fe=this.localClippingEnabled,Pe=$e.init(this.clippingPlanes,Fe),Pe===!0&&$e.setGlobalState(this.clippingPlanes,t),M!==null&&U.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];gt(o,n,t,e),r.add(o)}else gt(i,n,t,e),r.add(i)}}),k=ae.pop(),M!==null&&M.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ve.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let _t=null;function vt(e){_t&&_t(e)}function yt(){K.stop()}function G(){K.start()}let K=new xt;K.setAnimationLoop(vt),typeof self<`u`&&K.setContext(self),this.setAnimationLoop=function(e){_t=e,ct.setAnimationLoop(e),e===null?K.stop():K.start()},ct.addEventListener(`sessionstart`,yt),ct.addEventListener(`sessionend`,G),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){me(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ce===!0)return;M!==null&&M.renderStart(e,t);let n=ct.enabled===!0&&ct.isPresenting===!0,r=A!==null&&(ge===null||n)&&A.begin(j,ge);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(t),t=ct.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,ge),k=Qe.get(e,ae.length),k.init(t),k.state.textureUnits=V.getTextureUnits(),ae.push(k),Ie.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ne.setFromProjectionMatrix(Ie,fe,t.reversedDepth),Fe=this.localClippingEnabled,Pe=$e.init(this.clippingPlanes,Fe),O=Ze.get(e,ie.length),O.init(),ie.push(O),ct.enabled===!0&&ct.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&Ct(e,t,-1/0,j.sortObjects)}Ct(e,t,0,j.sortObjects),O.finish(),M!==null&&M.updateLights(k.state.lightsArray),j.sortObjects===!0&&O.sort(Oe,ke),Re=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Re&&et.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Pe===!0&&$e.beginShadows();let i=k.state.shadowsArray;if(U.render(i,e,t),Pe===!0&&$e.endShadows(),(r&&A.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Tt(n,r,e,a)}Re&&et.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];wt(O,e,n,n.viewport)}}else r.length>0&&Tt(n,r,e,t),Re&&et.render(e),wt(O,e,t)}ge!==null&&he===0&&(V.updateMultisampleRenderTarget(ge),V.updateRenderTargetMipmap(ge)),r&&A.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),ot.resetDefaultState(),_e=-1,ve=null,ae.pop(),ae.length>0?(k=ae[ae.length-1],V.setTextureUnits(k.state.textureUnits),Pe===!0&&$e.setGlobalState(j.clippingPlanes,k.state.camera)):k=null,ie.pop(),O=ie.length>0?ie[ie.length-1]:null,M!==null&&M.renderEnd()};function Ct(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ne)){r&&Le.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ie);let i=Je.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Le.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ne))){let i=Je.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Le.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Le.copy(e.boundingSphere.center)),Le.applyMatrix4(e.matrixWorld).applyMatrix4(Ie)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Le.z,s,t)}}else a.visible&&O.push(e,i,a,n,Le.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Ct(i[e],t,n,r)}function wt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Pe===!0&&$e.setGlobalState(j.clippingPlanes,n),r&&z.viewport(be.copy(r)),i.length>0&&Et(i,t,n),a.length>0&&Et(a,t,n),o.length>0&&Et(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function Tt(t,n,r,i){if((r.isScene===!0?r.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[i.id]===void 0){let t=Ve.has(`EXT_color_buffer_half_float`)||Ve.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[i.id]=new g(1,1,{generateMipmaps:!0,type:t?h:te,minFilter:e,samples:Math.max(4,Ue.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:se.workingColorSpace})}let a=k.state.transmissionRenderTarget[i.id],o=i.viewport||be;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let c=j.getRenderTarget(),l=j.getActiveCubeFace(),u=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(we),Te=j.getClearAlpha(),Te<1&&j.setClearColor(16777215,.5),j.clear(),Re&&et.render(r);let d=j.toneMapping;j.toneMapping=0;let f=i.viewport;if(i.viewport!==void 0&&(i.viewport=void 0),k.setupLightsView(i),Pe===!0&&$e.setGlobalState(j.clippingPlanes,i),Et(t,r,i),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),Ve.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let t=0,a=n.length;t<a;t++){let{object:a,geometry:o,material:s,group:c}=n[t];if(s.side===2&&a.layers.test(i.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Mt(a,r,i,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}j.setRenderTarget(c,l,u),j.setClearColor(we,Te),f!==void 0&&(i.viewport=f),j.toneMapping=d}function Et(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Mt(o,t,n,s,l,c)}}function Mt(e,t,n,r,i,a){M!==null&&i.isNodeMaterial&&M.setObject(e,i),e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function Nt(e,t,n){t.isScene!==!0&&(t=L);let r=B.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Ye.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Ye.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ke.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ft),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ft(e,s),d}else s.uniforms=Ye.getUniforms(e),M!==null&&e.isNodeMaterial&&M.build(e,n,s),e.onBeforeCompile(s,j),d=Ye.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=$e.uniform),Ft(e,s),r.needsLights=zt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Pt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=gr.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ft(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function It(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];ne.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(ne))return n}return null}function Lt(e,t,n,r,i){t.isScene!==!0&&(t=L),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=ge===null?j.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:se.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ke.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),y=k.state.lights;if(Pe===!0&&(Fe===!0||e!==ve)){let t=e===ve&&r.id===_e;$e.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==$e.numPlanes||v.numIntersection!==$e.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=Nt(r,t,i),M&&r.isNodeMaterial&&M.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(z.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==_e&&(_e=r.id,C=!0),v.needsLights){let e=It(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ve!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(R,`projectionMatrix`,e.projectionMatrix),T.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(R,I.setFromMatrixPosition(e.matrixWorld)),Ue.logarithmicDepthBuffer&&T.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),ve!==e&&(ve=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(R,`sunShadowMap`,y.state.sunShadowMap,V),y.state.directionalShadowMap.length>0&&T.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,V),y.state.spotShadowMap.length>0&&T.setValue(R,`spotShadowMap`,y.state.spotShadowMap,V),y.state.pointShadowMap.length>0&&T.setValue(R,`pointShadowMap`,y.state.pointShadowMap,V)),i.isSkinnedMesh){T.setOptional(R,i,`bindMatrix`),T.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(R,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(T.setOptional(R,i,`batchingTexture`),T.setValue(R,`batchingTexture`,i._matricesTexture,V),T.setOptional(R,i,`batchingIdTexture`),T.setValue(R,`batchingIdTexture`,i._indirectTexture,V),T.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(R,`batchingColorTexture`,i._colorsTexture,V));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&tt.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Li()),C){if(T.setValue(R,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&Rt(E,w),a&&r.fog===!0&&Xe.refreshFogUniforms(E,a),Xe.refreshMaterialUniforms(E,r,De,Ee,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}gr.upload(R,Pt(v),E,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(gr.upload(R,Pt(v),E,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(R,`center`,i.center),T.setValue(R,`modelViewMatrix`,i.modelViewMatrix),T.setValue(R,`normalMatrix`,i.normalMatrix),T.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];st.update(n,x),st.bind(n,x)}}return x}function Rt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function zt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return pe},this.getActiveMipmapLevel=function(){return he},this.getRenderTarget=function(){return ge},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){ge=e,pe=t,he=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),be.copy(e.viewport),P.copy(e.scissor),Ce=e.scissorTest,z.viewport(be),z.scissor(P),z.setScissorTest(Ce),_e=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,be.copy(e.viewport),P.copy(e.scissor),Ce=e.scissorTest}else be.copy(Ae).multiplyScalar(De).floor(),P.copy(je).multiplyScalar(De).floor(),Ce=Me;if(n!==0&&(r=ue),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(be),z.scissor(P),z.setScissorTest(Ce),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}_e=-1};function Bt(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ue.textureFormatReadable(e.format),t.__typeReadable=Ue.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){me(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=Bt(o);if(u.__formatReadable===!1){me(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){me(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,at.convert(c),at.convert(l),a)}finally{let e=ge===null?null:B.get(ge).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=Bt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,at.convert(l),at.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=ge===null?null:B.get(ge).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await it(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=at.convert(t.format),_=at.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,o,s,f,p,o,s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,de),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,N);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,o,s,f,p,o,s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){pe=0,he=0,ge=null,z.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return fe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=se._getDrawingBufferColorSpace(e),t.unpackColorSpace=se._getUnpackColorSpace()}},zi={naam:`Leergroep 3`,deurBord:`Leergroep 3 - Rekenen`,naarBinnenToets:`Druk op E om naar binnen te gaan`,naarBinnenTik:`Tik hier om naar binnen te gaan`,naarBuitenToets:`Druk op E om naar het schoolplein te gaan`,naarBuitenTik:`Tik hier om naar het schoolplein te gaan`,deurTerugBord:`Schoolplein`,welkom:`Welkom in Leergroep 3! Hier oefen je rekenen.`},Bi=[{nummer:1,id:`plus`,naam:`Pim Plus`,onderwerp:`optellen`},{nummer:2,id:`min`,naam:`Mila Min`,onderwerp:`aftrekken`},{nummer:3,id:`keer`,naam:`Kees Keer`,onderwerp:`vermenigvuldigen`},{nummer:4,id:`deel`,naam:`Dina Deel`,onderwerp:`delen`},{nummer:5,id:`klok`,naam:`Klaas Klok`,onderwerp:`klokkijken`},{nummer:6,id:`tafel`,naam:`Tijn Tafel`,onderwerp:`tafels`}],Vi={minX:-40,maxX:40,minZ:-30,maxZ:30},Hi=new v(0,0,22),Ui=new v(0,0,-20.6),q={gras:8368986,rubbergras:9286522,zand:14470051,donkerTegel:7305347,baksteen:11888972,dak:5001817,wit:16777215,glas:9422560,hout:[9140838,8022616,10259318,7299151],bankHout:10119740,stam:7232069,eik:[4028981,4885052,3501360,5609023],wilg:[11777114,10728026,12760158,10004560],struik:[5212734,6068038,4619577],roodStruik:[11879482,13197375,11028283],kei:10130572,metaal:13225168,hek:2830131,geel:15909424,blauw:2781109,rood:14239550,groen:4173402,oranje:16747050};function Wi(e,t){let n=[],r=[],i=new Gi(e);return Ji(e),Yi(e,t,n),Xi(e,t,n),Zi(e,t,n),$i(e,t),ea(e),ta(e,t,-6,-14),na(e,t,i,11,-15),ra(e,t,-24,-10,r),ia(e,t,26,-12),aa(e,t,i,28,10),oa(e,t,i),sa(e,-9,22),ca(e,t,6,-19,r),ua(e,t),ma(e,t),ha(e),va(e,r),i.maak(),{blokkers:n,update(e,t){for(let n of r)n(e,t)}}}var Gi=class{constructor(e){this.scene=e,this.lijst=[],this.rnd=ot(123)}voegToe(e,t,n,r,i=0){this.lijst.push({x:e,z:t,r:n,h:r,kantel:i,kleur:q.hout[Math.floor(this.rnd()*q.hout.length)]})}langsRand(e,{afstand:t=.24,r:n=.1,hoogte:r=.35,variatie:i=.08,opening:a}={}){for(let o=0;o<e.length;o++){let s=e[o],c=e[(o+1)%e.length],l=Math.hypot(c.x-s.x,c.z-s.z),u=Math.max(1,Math.round(l/t));for(let e=0;e<u;e++){let t=s.x+(c.x-s.x)*e/u,o=s.z+(c.z-s.z)*e/u;a&&a(t,o)||this.voegToe(t,o,n*(.85+this.rnd()*.3),r+(this.rnd()*2-1)*i)}}}maak(){let e=new c(1,1,1,7);e.translate(0,.5,0);let t=new b(e,new W,this.lijst.length),n=new Se,r=new ht,i=new p,a=new pt;this.lijst.forEach((e,o)=>{i.set(e.kantel,0,e.kantel*.5),r.setFromEuler(i),n.compose(new v(e.x,0,e.z),r,new v(e.r,e.h,e.r)),t.setMatrixAt(o,n),t.setColorAt(o,a.setHex(e.kleur))}),t.castShadow=!0,t.receiveShadow=!0,this.scene.add(t)}};function Ki(e,t,n,r,i=1,a=36,o=.12){let s=ot(i)()*6,c=[];for(let i=0;i<a;i++){let l=i/a*Math.PI*2,u=1+Math.sin(l*2+s)*o+Math.sin(l*3+s*2)*o*.5;c.push({x:e+Math.cos(l)*n*u,z:t+Math.sin(l)*r*u})}return c}function qi(e,t,n,r=.02){let i=new mt(t.map(e=>new de(e.x,-e.z))),a=new H(new j(i),typeof n==`number`?F(n):n);return a.rotation.x=-Math.PI/2,a.position.y=r,a.receiveShadow=!0,a.userData.grond=!0,e.add(a),a}function Ji(e){let t=Ke(320,320,F(q.gras),0,0,0,e);t.userData.grond=!0;let n=ot(5),r=[`#9ea7b0`,`#97a0aa`,`#a5adb6`,`#929ca6`,`#abb2ba`,`#9aa3ad`],i=Qe(256,256,(e,t,i)=>{e.fillStyle=`#868e97`,e.fillRect(0,0,t,i);for(let a=0;a<i/32;a++){let i=a%2*32;for(let o=-1;o<t/64+1;o++)e.fillStyle=r[Math.floor(n()*r.length)],e.fillRect(o*64+i+2,a*32+2,60,28)}});i.wrapS=i.wrapT=st,i.repeat.set(80/2.4,25);let a=Ke(80,60,new W({map:i}),0,0,.01,e);a.userData.grond=!0}function Yi(e,t,n){let r=new N;e.add(r);let i=P(60,7,8,q.baksteen,0,3.5,-26,r);P(60.2,.6,8.2,7106936,0,.3,-26,r),P(61,.5,9,q.dak,0,7.25,-26,r),n.push(i),t.voegDoosToe(-30,30,-30,-22,7);for(let e of[2.1,5.1])for(let t=-26.5;t<=26.5;t+=4.4)Math.abs(t)<3.5||(P(3.2,2.2,.12,3093560,t,e,-21.94,r),P(2.9,1.9,.14,q.glas,t,e,-21.92,r),P(.1,1.9,.18,3093560,t,e,-21.9,r));P(3.2,3.2,.2,3093560,0,1.6,-21.95,r),P(2.7,2.9,.22,5981750,0,1.45,-21.93,r),P(2.4,.04,.6,13881544,0,.03,-21.75,r),P(1.35,2.9,.12,q.glas,-1.95,1.45,-21.8,r),P(1.35,2.9,.12,q.glas,1.95,1.45,-21.8,r);let a=new H(new ut(5.4,.9),new W({map:Ve(zi.deurBord,{rand:`#e8590c`,grootte:110})}));a.position.set(0,4.25,-19.38),r.add(a);for(let e of[-2.2,2.2])I(.04,.45,3817284,e,3.85,-19.45,r,6);P(6,.3,2.6,3817284,0,3.6,-20.7,r),I(.12,3.5,3817284,-2.7,1.75,-19.6,r),I(.12,3.5,3817284,2.7,1.75,-19.6,r),t.voegCirkelToe(-2.7,-19.6,.15,3.6),t.voegCirkelToe(2.7,-19.6,.15,3.6);let o=new H(new ut(14,2),new W({map:Ve(`Basisschool De Bunders`,{rand:`#2a6fb5`})}));o.position.set(0,6.25,-21.91),r.add(o);for(let n of[-25,-16,15,24])da(e,t,n,-21,1,n>0?q.roodStruik:q.struik)}function Xi(e,t,n){let r=new N;e.add(r);let i=P(9,8,15,9213084,35.5,4,-22.5,r);P(9.6,.5,15.6,q.dak,35.5,8.25,-22.5,r);for(let e=-27;e<=-18;e+=3)P(.12,1.2,2.2,q.glas,30.95,6.2,e,r);P(.2,2.8,2,q.geel,30.95,1.4,-16.8,r),n.push(i),t.voegDoosToe(31,40,-30,-15,8);let a=new H(new ut(5,1.25),new W({map:Ve(`Gymzaal`,{rand:`#d9473e`})}));a.rotation.y=-Math.PI/2,a.position.set(30.9,4.2,-22.5),r.add(a)}function Zi(e,t,n){let r=Qe(256,128,(e,t,n)=>{e.fillStyle=`#b9a58a`,e.fillRect(0,0,t,n);for(let r=0;r<t;r+=16)e.fillStyle=r%32?`#c4b296`:`#ad9a80`,e.fillRect(r+1,0,13,n)});r.wrapS=st,r.repeat.set(3,1);let i=new N;i.position.set(-35,0,-19.5),e.add(i);let a=P(8,2.4,5,new W({map:r}),0,1.2,0,i),o=P(8.4,.15,5.4,15132906,0,2.5,0,i);o.rotation.x=.05;for(let e=-3.6;e<=3.6;e+=.6)P(.08,.05,5.4,13620182,e,2.6,0,i).rotation.x=.05;P(.6,.3,.05,q.blauw,1.5,1.9,2.52,i),n.push(a,o),t.voegDoosToe(-39.2,-30.8,-22.2,-16.8,2.6)}function Qi(e,t,n,r,i){let a=new N;a.position.set(t,0,n),a.rotation.y=i;let o=new Be(.33,.04,5,14);for(let e of[-.55,.55]){let t=new H(o,F(2236962));t.rotation.y=Math.PI/2,t.position.set(0,.38,e),t.castShadow=!0,a.add(t)}P(.06,.06,1.1,r,0,.72,0,a),P(.06,.5,.06,r,0,.5,-.25,a),P(.5,.05,.05,2236962,0,.95,.5,a),P(.18,.06,.28,2236962,0,.78,-.25,a),e.add(a)}function $i(e,t){let n=new N;e.add(n);let r=[q.rood,q.blauw,q.groen,9264086,q.oranje,15754645,2236962,7651580],i=ot(77);for(let e=-6,t=0;e<=14;e+=1.1,t++)Qi(n,-37+(i()-.5)*.3,e,r[t%r.length],Math.PI/2+(i()-.5)*.25);let a=P(.08,.08,21,7830916,-36.3,.45,4,n);a.castShadow=!1;let o=P(1.2,1.5,24,q.struik[2],-39.2,.75,4,n);o.material=new W({color:q.struik[2],flatShading:!0}),t.voegDoosToe(-40,-36,-6.8,14.8,1.1)}function ea(e){let t=Qe(64,64,e=>{e.clearRect(0,0,64,64),e.fillStyle=`#2b2f33`,e.fillRect(0,0,5,64),e.fillRect(32,0,5,64),e.fillRect(0,0,64,5)});t.wrapS=t.wrapT=st;let n=1.5,r=(r,i,a,o)=>{let s=Math.hypot(a-r,o-i),c=t.clone();c.repeat.set(s/.5,n/.5),c.needsUpdate=!0;let l=new H(new ut(s,n),new W({map:c,transparent:!0,alphaTest:.5,side:2}));l.position.set((r+a)/2,n/2,(i+o)/2),l.rotation.y=-Math.atan2(o-i,a-r),l.castShadow=!0,l.userData.geenKlik=!0,e.add(l);let u=P(s,.07,.07,q.hek,l.position.x,n,l.position.z,e);u.rotation.y=l.rotation.y,u.userData.geenKlik=!0;let d=Math.round(s/2.5);for(let t=0;t<=d;t++){let n=t/d,s=I(.06,1.6,q.hek,r+(a-r)*n,1.6/2,i+(o-i)*n,e,6);s.userData.geenKlik=!0}},{minX:i,maxX:a,minZ:o,maxZ:s}=Vi;r(i,o,i,s),r(a,o,a,-3),r(a,3,a,s),r(i,s,-3,s),r(3,s,a,s);for(let t of[-3,3])I(.16,2.2,q.hek,t,1.1,s,e),B(.22,q.geel,t,2.3,s,e)}function ta(e,t,n,r){let i=Ki(n,r,3.6,2.2,3,32,.08);qi(e,Ki(n,r,3.85,2.45,3,32,.08),9147292,.022),qi(e,i,q.zand,.03);let a=new W({color:q.kei,flatShading:!0});for(let[i,o,s]of[[-1.4,-.4,.55],[.3,.7,.5],[1.5,-.3,.65]]){let c=B(s,a,n+i,s*.55,r+o,e,0);c.scale.set(1.2,.8,1),c.rotation.y=i,t.voegCirkelToe(n+i,r+o,s,s*1.1)}}function na(e,t,n,r,i){qi(e,Ki(r,i,5,3,11,36,.1),q.rubbergras,.025);for(let[e,a,o]of[[-3.4,1,.5],[-2.3,.2,.8],[-1.2,-.5,1.1],[0,-.8,.7],[1.2,-.5,1.3],[2.3,.1,.9],[3.3,.9,.6]])n.voegToe(r+e,i+a,.2,o),t.voegCirkelToe(r+e,i+a,.2,o)}function ra(e,t,n,r,i){let a=new H(new gt(4.5,32),F(q.donkerTegel));a.rotation.x=-Math.PI/2,a.position.set(n,.025,r),a.receiveShadow=!0,a.userData.grond=!0,e.add(a);let o=new v(n-3.2,0,r-1),s=new v(n+.8,3.4,r+.3),c=o.distanceTo(s),l=I(.2,c,q.hout[0],0,0,0,e,7);l.position.copy(o).lerp(s,.5),l.quaternion.setFromUnitVectors(new v(0,1,0),s.clone().sub(o).normalize());let u=o.clone().lerp(s,.62);for(let n of[-1,1]){let r=I(.11,2.6,q.hout[1],u.x,1.2,u.z+n*.6,e,6);r.rotation.x=n*.28,t.voegCirkelToe(u.x,u.z+n*.95,.2,3)}t.voegCirkelToe(o.x+.4,o.z+.1,.3,1);let d=new N;d.position.copy(s),e.add(d),I(.03,2.8,13153418,0,-1.4,0,d,5);let f=I(.3,.1,q.hout[2],0,-2.85,0,d,12);f.castShadow=!0,i.push((e,t)=>{d.rotation.x=Math.sin(t*1.4)*.22,d.rotation.z=Math.sin(t*.9)*.08})}function ia(e,t,n,r){qi(e,Ki(n,r+1,6.5,4.5,21,40,.12),q.rubbergras,.025);let i=new N;i.position.set(n,0,r),e.add(i);let a=ot(8);for(let[e,o]of[[-1.1,-1.1],[1.1,-1.1],[-1.1,1.1],[1.1,1.1]]){let s=I(.13,4.2,q.hout[Math.floor(a()*4)],e,2.1,o,i,7);s.rotation.z=(a()-.5)*.06,t.voegCirkelToe(n+e,r+o,.18,4.2)}P(2.4,.15,2.4,q.hout[2],0,1.6,0,i);for(let[e,t,n]of[[0,-1.1,0],[-1.1,0,Math.PI/2],[1.1,0,Math.PI/2]]){let r=I(.06,2.3,q.hout[1],e,2.4000000000000004,t,i,5);r.rotation.z=Math.PI/2,r.rotation.y=n;for(let r of[-1,1])I(.04,1.1,q.hout[3],e,2.02,t,i,4).rotation.set(n?r*.7:0,n,n?0:r*.7)}let o=et(1.9,1.9,new W({color:8221800,flatShading:!0}),0,4.95,0,i,4);o.rotation.y=Math.PI/4,I(.05,.8,q.hout[0],0,6.1,0,i,4);for(let e of[-.4,.4]){let t=I(.05,1.9,q.hout[1],e,.8,-1.55,i,5);t.rotation.x=-.3}for(let e=0;e<4;e++){let t=I(.04,.8,q.hout[2],0,.3+e*.4,-1.75+e*.12,i,5);t.rotation.z=Math.PI/2}let s=new W({color:q.metaal,emissive:2236962}),c=Math.hypot(4,1.35),l=Math.atan2(1.35,4),u=new N;u.position.set(0,1.85/2,3.2),u.rotation.x=l,i.add(u),P(.7,.06,c,s,0,0,0,u),P(.06,.3,c,s,-.35,.12,0,u),P(.06,.3,c,s,.35,.12,0,u),t.voegDoosToe(n-1.2,n+1.2,r-1.2,r+1.2,1.6800000000000002),t.voegDoosToe(n-.4,n+.4,r+1.2,r+5.2,.9)}function aa(e,t,n,r,i){let a=5.5;qi(e,Ki(r,i,8,a,31,48,.05),q.zand,.03);let o=[];for(let e=0;e<64;e++){let t=e/64*Math.PI*2;o.push({x:r+Math.cos(t)*8,z:i+Math.sin(t)*a})}let s=(e,t)=>e<r-6.4&&Math.abs(t-i)<1.6,c=n.lijst.length;n.langsRand(o,{afstand:.3,r:.14,hoogte:1.1,variatie:.35,opening:s});for(let e=c;e<n.lijst.length;e+=2){let r=n.lijst[e];t.voegCirkelToe(r.x,r.z,.32,r.h)}let l=r+3,u=i+.5,d=new N;d.position.set(l,0,u),e.add(d);for(let[e,n]of[[-1,-1],[1,-1],[-1,1],[1,1]])I(.12,2.8,q.hout[1],e,2.8/2,n,d,6),t.voegCirkelToe(l+e,u+n,.16,3);P(2.3,.15,2.3,q.hout[2],0,1.2,0,d);for(let[e,t,n,r]of[[0,-1.1,2.2,.08],[1.1,0,.08,2.2],[0,1.1,2.2,.08]])P(n,.9,r,q.hout[3],e,1.7,t,d);let f=et(2,2.2,new W({color:8221800,flatShading:!0}),0,3.5999999999999996,0,d,4);f.rotation.y=Math.PI/4,t.voegDoosToe(l-1.15,l+1.15,u-1.15,u+1.15,1.28)}function oa(e,t,n){[{x:-24,z:-19,rx:3.2,rz:2,wilgen:[[-1,0]],struiken:[[1.4,.3,q.struik]]},{x:18,z:22,rx:4.5,rz:3,wilgen:[[-1.5,-.5],[1.8,.4]],struiken:[[.2,.8,q.roodStruik],[-2.5,1,q.struik]]},{x:-22,z:14,rx:4,rz:2.8,wilgen:[[.5,-.4]],struiken:[[-1.8,.6,q.struik],[2.2,.8,q.struik]]},{x:-30,z:24,rx:4,rz:3,wilgen:[[1,0]],struiken:[[-1.6,.4,q.roodStruik]]}].forEach((r,i)=>{let a=Ki(r.x,r.z,r.rx,r.rz,40+i,36,.1);qi(e,a,q.zand,.03),n.langsRand(a);for(let[n,a]of r.wilgen)fa(e,t,r.x+n,r.z+a,1+i%2*.2,i);for(let[n,i,a]of r.struiken)da(e,t,r.x+n,r.z+i,1,a)})}function sa(e,t,n){let r=Qe(256,768,(e,t,n)=>{e.clearRect(0,0,t,n),e.strokeStyle=`#ffffff`,e.lineWidth=8,e.font=`bold 60px "Trebuchet MS", sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`;let r=[`#ff8787`,`#ffe066`,`#74c0fc`,`#8ce99a`,`#e599f7`],i=(t,n,i)=>{e.strokeRect(t,n,120,120),e.fillStyle=r[i%5],e.fillText(String(i),t+60,n+62)};i(68,640,1),i(68,520,2),i(8,400,3),i(128,400,4),i(68,280,5),i(8,160,6),i(128,160,7),i(68,40,8)}),i=Ke(2.6,7.8,new W({map:r,transparent:!0}),t,n,.025,e);i.userData.grond=!0}function ca(e,t,n,r,i){I(.08,8,14540253,n,4,r,e,8),B(.15,q.geel,n,8.05,r,e),t.voegCirkelToe(n,r,.15,8);let a=new H(new ut(2,1.2,8,1),new W({color:q.oranje,side:2}));a.position.set(n+1.05,7.2,r),a.castShadow=!0,a.userData.geenKlik=!0,e.add(a);let o=a.geometry.attributes.position,s=Float32Array.from(o.array);i.push((e,t)=>{for(let e=0;e<o.count;e++){let n=s[e*3]+1;o.array[e*3+2]=Math.sin(t*4-n*2.2)*.12*n}o.needsUpdate=!0})}function la(e,t,n,r,i){let a=new N;a.position.set(n,0,r),a.rotation.y=i,e.add(a),P(2.2,.12,.6,q.bankHout,0,.5,0,a),P(2.2,.5,.1,q.bankHout,0,.85,-.3,a);for(let e of[-.9,.9])P(.1,.5,.55,4475474,e,.25,0,a),P(.1,.6,.1,4475474,e,.8,-.3,a);let o=Math.abs(Math.cos(i))>.5,s=o?1.1:.32,c=o?.32:1.1;t.voegDoosToe(n-s,n+s,r-c,r+c,.56)}function ua(e,t){la(e,t,-12,-19.5,0),la(e,t,18,-19.5,0),la(e,t,-31,4,Math.PI/2),la(e,t,37.5,-9,-Math.PI/2),la(e,t,10,26,Math.PI)}function da(e,t,n,r,i,a){let o=ot(Math.abs(Math.round(n*13+r*7))+1);for(let t=0;t<3;t++){let s=new W({color:a[t%a.length],flatShading:!0}),c=B((.6+o()*.3)*i,s,n+(o()-.5)*1.2*i,.55*i,r+(o()-.5)*.8*i,e,0);c.scale.y=.85}t.voegCirkelToe(n,r,.9*i,1.1*i)}function fa(e,t,n,r,i,a){let o=new N;o.position.set(n,0,r),o.scale.setScalar(i),e.add(o),I(.1,2,q.stam,0,1,0,o,6);let s=ot(a+50);for(let e=0;e<7;e++){let t=new W({color:q.wilg[e%q.wilg.length],flatShading:!0}),n=e/7*Math.PI*2,r=B(.55+s()*.2,t,Math.cos(n)*.6,2.6+s()*.9,Math.sin(n)*.6,o,0);r.scale.set(.8,1.9,.8),r.rotation.z=Math.cos(n)*.3,r.rotation.x=-Math.sin(n)*.3}t.voegCirkelToe(n,r,.2,10)}function pa(e,t,n,r,i=1,a=0,o=!0){let s=new N;s.position.set(n,0,r),s.scale.setScalar(i),e.add(s);let c=I(.45,5,q.stam,0,2.5,0,s,7);c.castShadow=o;let l=ot(a+3);for(let[e,t,n,r]of[[0,7,0,3.2],[2.2,6.2,.8,2.4],[-2,6.4,-.6,2.5],[.6,6,-2,2.3],[-.5,8.6,.5,2.2]]){let i=F(q.eik[Math.floor(l()*q.eik.length)],{flatShading:!0}),a=B(r*(.9+l()*.2),i,e,t,n,s,0);a.castShadow=o}t&&t.voegCirkelToe(n,r,.6*i,20)}function ma(e,t){[[-33.5,-7.5],[-14,27],[27,26],[37,18],[-36,27]].forEach(([n,r],i)=>pa(e,t,n,r,.9+i%3*.1,i));let n=ot(42);for(let t=-38;t<=40;t+=9+n()*4)pa(e,null,t,33.5+n()*2,1+n()*.3,10+t,!1);for(let t=-26;t<=26;t+=10+n()*4)pa(e,null,-43.5-n(),t,1+n()*.3,30+t,!1);for(let t=-26;t<=26;t+=9+n()*5)pa(e,null,44+n()*3,t,1+n()*.3,60+t,!1);for(let t=-38;t<=40;t+=10+n()*5)pa(e,null,t,-36-n()*4,1.1+n()*.3,90+t,!1)}function ha(e){let t=F(6119782),n=F(11117981);Ke(160,6,t,0,40.5,.015,e),Ke(160,2,n,0,44.5,.02,e),Ke(6,120,t,-48.5,0,.016,e),Ke(2,120,n,-52.5,0,.021,e);let r=ot(99),i=[11569770,10976350,12753528,10253400],a=(t,n,a,o,s,c)=>{for(let l=0;l<a;l++)ga(e,t+o*l,n+s*l,c,i[Math.floor(r()*i.length)])};a(-56,50,17,7,0,0),a(-58,-36,11,0,7,-Math.PI/2);let o=[16777215,14239550,3885675,12568012,2830131,7651580];[[-30,42.5,0],[-18,42.5,0],[5,42.5,0],[22,42.5,0],[35,38.5,Math.PI],[-46.5,-10,Math.PI/2],[-46.5,18,Math.PI/2]].forEach(([t,n,r],i)=>_a(e,t,n,r,o[i%o.length]))}function ga(e,t,n,r,i){let a=new N;a.position.set(t,0,n),a.rotation.y=r,e.add(a);let o=6.8,s=P(o,6,8,i,0,3,0,a);s.castShadow=!1;let c=new mt([new de(-4.3,0),new de(4.3,0),new de(0,3.2)]),l=new A(c,{depth:o,bevelEnabled:!1});l.translate(0,0,-6.8/2);let u=new H(l,F(7031354));u.rotation.y=Math.PI/2,u.position.y=6,a.add(u);for(let[e,t]of[[-1.6,1.6],[1.4,1.6],[-1.6,4.3],[1.4,4.3]])P(1.6,1.3,.1,16777215,e,t,-4.05,a).castShadow=!1,P(1.4,1.1,.12,7180200,e,t,-4.06,a).castShadow=!1;P(1,2.1,.12,4939066,0,1.05,-4.06,a).castShadow=!1,P(o,1.2,.8,q.struik[1],0,.6,-5.6,a).castShadow=!1}function _a(e,t,n,r,i){let a=new N;a.position.set(t,0,n),a.rotation.y=r,e.add(a),P(4,.8,1.8,i,0,.65,0,a),P(2.2,.65,1.6,i,-.2,1.35,0,a),P(2,.5,1.65,7180200,-.2,1.35,0,a);for(let[e,t]of[[-1.3,.85],[1.3,.85],[-1.3,-.85],[1.3,-.85]]){let n=I(.35,.25,2236962,e,.35,t,a,10);n.rotation.x=Math.PI/2}}function va(e,t){let n=ot(9),r=new W({color:16777215,flatShading:!0,emissive:6710886}),i=[];for(let t=0;t<9;t++){let t=new N,a=3+Math.floor(n()*3);for(let e=0;e<a;e++){let i=new H(new Xe(3+n()*2,0),r);i.position.set(e*3.5-a*1.7,n()*1.5,n()*3),i.userData.geenKlik=!0,t.add(i)}t.scale.y=.55,t.position.set(-120+n()*240,45+n()*15,-100+n()*160),e.add(t),i.push(t)}t.push(e=>{for(let t of i)t.position.x+=e*1.5,t.position.x>130&&(t.position.x=-130)})}var ya=6.5,ba=28,xa=10,Sa=.45,Ca=.4,wa={huid:15909531,shirt:16742953,broek:2772879,schoen:3355443,pet:2781109,haar:4861723,kapsel:`kort`,rugzak:16766011,snelheid:6.5},Ta=class{constructor(e,t={}){this.uiterlijk={...wa,...t},this.groep=new N,this.model=new N,this.groep.add(this.model),e.add(this.groep),this.positie=this.groep.position,this.vy=0,this.opGrond=!0,this.richting=Math.PI,this.loopFase=0,this.huidigeSnelheid=0,this.model.rotation.y=this.richting,this.bouwModel(),this.groep.traverse(e=>{e.isMesh&&(e.userData.geenKlik=!0)})}bouwModel(){let e=this.model,{huid:t,shirt:n,broek:r,schoen:i,pet:a,haar:o,kapsel:s,rugzak:c}=this.uiterlijk;this.delen={mouwen:[],broeken:[],schoenen:[],pet:[],rugzak:[]},this.benen=[-.17,.17].map(t=>{let n=new N;return n.position.set(t,.75,0),this.delen.broeken.push(P(.24,.62,.26,r,0,-.33,0,n)),this.delen.schoenen.push(P(.26,.14,.38,i,0,-.68,.05,n)),e.add(n),n});let l=new H(new ct(.36,.45,4,10),F(n));l.position.y=1.15,l.castShadow=!0,e.add(l),this.delen.lijf=l,c!=null&&this.delen.rugzak.push(P(.5,.55,.22,c,0,1.2,-.38,e),P(.4,.2,.05,new pt(c).multiplyScalar(.8).getHex(),0,1.08,-.5,e)),this.armen=[-.5,.5].map(r=>{let i=new N;return i.position.set(r,1.45,0),this.delen.mouwen.push(P(.18,.55,.2,n,0,-.25,0,i)),B(.12,t,0,-.58,0,i),e.add(i),i});let u=new N;u.position.y=1.92,e.add(u);let d=new H(new ft(.36,16,12),F(t));d.castShadow=!0,u.add(d);let f=new ft(.055,8,6);for(let e of[-.13,.13]){let t=new H(f,F(1907997));t.position.set(e,.05,.32),u.add(t)}let p=new H(new Be(.11,.025,6,12,Math.PI),F(11546672));p.rotation.z=Math.PI,p.position.set(0,-.08,.33),u.add(p);for(let e of[-.22,.22]){let t=new H(new ft(.06,8,6),F(16752286));t.position.set(e,-.06,.29),t.scale.z=.4,u.add(t)}if(a!=null){let e=new H(new ft(.38,16,8,0,Math.PI*2,0,Math.PI/2),F(a));e.position.y=.06,e.castShadow=!0,u.add(e),this.delen.pet.push(e,P(.5,.05,.3,a,0,.1,.42,u))}else{let e=new H(new ft(.385,16,8,0,Math.PI*2,0,Math.PI*.55),F(o));if(e.rotation.x=-.3,e.castShadow=!0,u.add(e),s===`staartjes`)for(let e of[-.4,.4])B(.14,o,e,-.02,-.12,u).scale.y=1.5;else if(s===`paardenstaart`)B(.15,o,0,0,-.42,u).scale.set(.9,1.8,.9);else if(s===`krullen`)for(let e=0;e<7;e++){let t=e/7*Math.PI*2;B(.12,o,Math.cos(t)*.3,.22+Math.sin(e*2)*.05,Math.sin(t)*.3-.05,u,0)}}this.hoofd=u}update(e,t,n,r,{draaiMee:i=!0}={}){let a=this.positie,o=a.x,s=a.z;if(Math.min(1,Math.hypot(t.x,t.z))>.05&&(a.x+=t.x*this.uiterlijk.snelheid*e,a.z+=t.z*this.uiterlijk.snelheid*e,i)){let n=Math.atan2(t.x,t.z)-this.richting;n=Math.atan2(Math.sin(n),Math.cos(n)),this.richting+=n*Math.min(1,e*12)}n&&this.opGrond&&(this.vy=xa,this.opGrond=!1);let c=r.losOp(a,Sa,Ca);this.vy-=ba*e,a.y+=this.vy*e,a.y<=c?(a.y=c,this.vy=0,this.opGrond=!0):this.opGrond&&a.y-c<Ca&&this.vy<=0?(a.y=c,this.vy=0):this.opGrond=!1;let l=Math.hypot(a.x-o,a.z-s);return this.animeer(e,l/Math.max(e,1e-4)),l}animeer(e,t){this.model.rotation.y=this.richting,this.huidigeSnelheid+=(t-this.huidigeSnelheid)*Math.min(1,e*10);let n=this.huidigeSnelheid/ya;if(this.cape){let t=.12+Math.min(1,n)*.55+(this.opGrond?0:.5)+Math.sin(performance.now()/180)*.04*Math.min(1,n);this.cape.rotation.x+=(t-this.cape.rotation.x)*Math.min(1,e*6)}if(!this.opGrond){this.benen[0].rotation.x=-.5,this.benen[1].rotation.x=.3,this.armen[0].rotation.z=-2.4,this.armen[1].rotation.z=2.4,this.armen[0].rotation.x=this.armen[1].rotation.x=0;return}this.armen[0].rotation.z=this.armen[1].rotation.z=0,this.loopFase+=e*(4+8*n)*(n>.05);let r=Math.sin(this.loopFase)*.75*Math.min(1,n);this.benen[0].rotation.x=r,this.benen[1].rotation.x=-r,this.armen[0].rotation.x=-r,this.armen[1].rotation.x=r,this.model.position.y=Math.abs(Math.sin(this.loopFase))*.08*Math.min(1,n),n<.05&&(this.hoofd.position.y=1.92+Math.sin(performance.now()/500)*.015)}},Ea=class{constructor(e,t){this.camera=e,this.blokkers=t,this.yaw=0,this.pitch=.42,this.afstand=10,this.huidigeAfstand=10,this.focus=new v,this.richting=new v,this.raycaster=new tt,this.eersteKeer=!0,this.gesprek=!1,this.laatsteGesprek=null,this.meng=0,this.handmatig=0,this.kijk=new v}draaiNaar(e,t){this.doelYaw=this.yaw+Math.atan2(Math.sin(e-this.yaw),Math.cos(e-this.yaw)),this.doelPitch=t}volgAchter(e,t,n=3){if(this.handmatig>0||this.doelYaw!=null||this.gesprek)return;let r=Math.atan2(Math.sin(e-this.yaw),Math.cos(e-this.yaw));this.yaw+=r*Math.min(1,t*n)}draai(e,t){(e||t)&&(this.doelYaw=this.doelPitch=null,this.handmatig=2.5),this.yaw-=e*.006,this.pitch=U.clamp(this.pitch+t*.004,.12,1.15)}zoom(e){this.afstand=U.clamp(this.afstand+e,5,18)}update(e,t){let n=new v(t.x,t.y+1.6,t.z);this.eersteKeer?(this.focus.copy(n),this.eersteKeer=!1):this.focus.lerp(n,Math.min(1,e*8)),this.handmatig>0&&(this.handmatig-=e);let r=Math.min(1,e*4);this.doelYaw!=null&&(this.yaw+=(this.doelYaw-this.yaw)*r,Math.abs(this.doelYaw-this.yaw)<.002&&(this.doelYaw=null)),this.doelPitch!=null&&(this.pitch+=(this.doelPitch-this.pitch)*r,Math.abs(this.doelPitch-this.pitch)<.002&&(this.doelPitch=null));let i=Math.cos(this.pitch);this.richting.set(Math.sin(this.yaw)*i,Math.sin(this.pitch),Math.cos(this.yaw)*i);let a=this.afstand;this.raycaster.set(this.focus,this.richting),this.raycaster.far=this.afstand;let o=this.raycaster.intersectObjects(this.blokkers,!0)[0];o&&(a=Math.max(1.2,o.distance-.4)),a<this.huidigeAfstand?this.huidigeAfstand=a:this.huidigeAfstand+=(a-this.huidigeAfstand)*Math.min(1,e*3);let s=this.camera.position;if(s.copy(this.focus).addScaledVector(this.richting,this.huidigeAfstand),s.y=Math.max(.5,s.y),this.meng+=(+!!this.gesprek-this.meng)*Math.min(1,e*3),this.meng>.001&&this.laatsteGesprek){let e=this.meng*this.meng*(3-2*this.meng);s.lerp(this.laatsteGesprek.positie,e),this.kijk.copy(this.focus).lerp(this.laatsteGesprek.kijk,e),this.camera.lookAt(this.kijk)}else this.camera.lookAt(this.focus)}zetGesprek(e){if(!e){this.gesprek=!1;return}let t=Math.atan(Math.tan(U.degToRad(this.camera.fov/2))*this.camera.aspect),n=Math.max(8.5,3.2/Math.tan(t)),r=.45,i=new v(Math.sin(r)*n,3.4,Math.cos(r)*n);this.laatsteGesprek={positie:i.applyEuler(e.rotation).add(e.position),kijk:new v(0,this.camera.aspect>1?1.1:.3,.6).applyEuler(e.rotation).add(e.position)},this.gesprek=!0}},Da={vooruit:[`KeyW`,`ArrowUp`],achteruit:[`KeyS`,`ArrowDown`],links:[`KeyA`,`ArrowLeft`],rechts:[`KeyD`,`ArrowRight`]},Oa=class{constructor(e,t,n,r){this.canvas=e,this.camera=t,this.scene=n,this.aan=!0,this.ingedrukt=new Set,this.sprong=!1,this.doel=null,this.draaiX=0,this.draaiY=0,this.zoomDelta=0,this.joystick={x:0,y:0},this.opPraten=null,this.isTouch=`ontouchstart`in window||navigator.maxTouchPoints>0,this.raycaster=new tt,this.muis=new de,window.addEventListener(`keydown`,e=>this.toetsOmlaag(e)),window.addEventListener(`keyup`,e=>this.ingedrukt.delete(e.code)),window.addEventListener(`blur`,()=>this.ingedrukt.clear()),this.koppelAanwijzer(),e.addEventListener(`wheel`,e=>{e.preventDefault(),this.zoomDelta+=Math.sign(e.deltaY)*1.2},{passive:!1}),this.isTouch&&this.maakTouchKnoppen(r)}toetsOmlaag(e){let t=e.target?.tagName;t!==`INPUT`&&t!==`TEXTAREA`&&((e.code===`Space`||e.code.startsWith(`Arrow`))&&e.preventDefault(),this.aan&&(this.ingedrukt.add(e.code),e.code===`Space`&&!e.repeat&&(this.sprong=!0),e.code===`KeyE`&&!e.repeat&&this.opPraten&&this.opPraten(),e.code===`KeyK`&&!e.repeat&&this.opKast&&this.opKast()))}koppelAanwijzer(){let e=new Map;this.canvas.addEventListener(`pointerdown`,t=>{this.canvas.setPointerCapture(t.pointerId),e.set(t.pointerId,{x:t.clientX,y:t.clientY,startX:t.clientX,startY:t.clientY,sleept:!1})}),this.canvas.addEventListener(`pointermove`,t=>{let n=e.get(t.pointerId);if(!n)return;let r=t.clientX-n.x,i=t.clientY-n.y;Math.hypot(t.clientX-n.startX,t.clientY-n.startY)>8&&(n.sleept=!0),n.sleept&&this.aan&&(this.draaiX+=r,this.draaiY+=i),n.x=t.clientX,n.y=t.clientY}),this.canvas.addEventListener(`pointerup`,t=>{let n=e.get(t.pointerId);e.delete(t.pointerId),n&&!n.sleept&&this.aan&&this.klikOpGrond(t.clientX,t.clientY)}),this.canvas.addEventListener(`pointercancel`,t=>e.delete(t.pointerId))}klikOpGrond(e,t){let n=this.canvas.getBoundingClientRect();this.muis.set((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.muis,this.camera);let r=this.raycaster.intersectObjects(this.scene.children,!0).find(e=>!e.object.userData.geenKlik);if(r){if(r.object.userData.kind&&this.opKlikKind){this.opKlikKind(r.object.userData.kind);return}if(r.object.userData.grond){this.doel=r.point.clone().setY(0),this.doelIsKraam=!1;return}for(let e=r.object;e;e=e.parent)if(e.userData.loopDoel){this.doel=e.userData.loopDoel.clone(),this.doelIsKraam=!0;return}}}maakTouchKnoppen(e){let t=document.createElement(`div`);t.className=`joystick`;let n=document.createElement(`div`);n.className=`joystick-knop`,t.appendChild(n),e.appendChild(t);let r=null,i=e=>{let r=t.getBoundingClientRect(),i=e.clientX-(r.left+r.width/2),a=e.clientY-(r.top+r.height/2),o=Math.hypot(i,a);o>55&&(i*=55/o,a*=55/o),n.style.transform=`translate(${i}px, ${a}px)`,this.joystick.x=i/55,this.joystick.y=a/55};t.addEventListener(`pointerdown`,e=>{r=e.pointerId,t.setPointerCapture(e.pointerId),i(e)}),t.addEventListener(`pointermove`,e=>{e.pointerId===r&&i(e)});let a=e=>{e.pointerId===r&&(r=null,n.style.transform=``,this.joystick.x=this.joystick.y=0)};t.addEventListener(`pointerup`,a),t.addEventListener(`pointercancel`,a);let o=document.createElement(`button`);o.className=`springknop`,o.textContent=`Spring`,o.addEventListener(`pointerdown`,e=>{e.preventDefault(),this.aan&&(this.sprong=!0)}),e.appendChild(o)}beweging(){if(!this.aan)return{vooruit:0,draai:0,actief:!1};let e=e=>e.some(e=>this.ingedrukt.has(e)),t=U.clamp(+!!e(Da.vooruit)-!!e(Da.achteruit)-this.joystick.y,-1,1),n=U.clamp(+!!e(Da.rechts)-!!e(Da.links)+this.joystick.x,-1,1),r=Math.abs(t)>.15?t:0,i=Math.abs(n)>.15?n:0;return{vooruit:r,draai:i,actief:r!==0||i!==0}}neemSprong(){let e=this.sprong;return this.sprong=!1,e}neemCamera(){let e={x:this.draaiX,y:this.draaiY,zoom:this.zoomDelta};return this.draaiX=this.draaiY=this.zoomDelta=0,e}},ka=[{id:`kofschip`,kraamNaam:`Kapitein Kofschip`,karakterNaam:`Kapitein Kofschip`,icoon:`🏴‍☠️`,leerdoel:`'t kofschip-x`,begroeting:`Ahoi, matroos! Ik ben Kapitein Kofschip. Bij mij leer je of een werkwoord in de verleden tijd -te of -de krijgt.`,uitleg:[{tekst:`Neem het hele werkwoord en haal er -en af. Is de laatste letter een letter uit 't kofschip-x (t, k, f, s, ch, p, x)? Dan schrijf je ik-vorm + te(n). Anders ik-vorm + de(n).`,voorbeeld:`werken → werk → de **k** zit erin → ik werk**te**, wij werk**ten**`},{tekst:`Let op: alleen de medeklinkers tellen mee. De o en de i in 't kofschip doen niet mee!`,voorbeeld:`bouwen → bouw → de **w** zit er niet in → ik bouw**de**`}]},{id:`taarten`,kraamNaam:`Tante Tessa's Taarten`,karakterNaam:`Tante Tessa`,icoon:`🎂`,leerdoel:`verleden tijd met -te(n)`,begroeting:`Hallo schat! Ik ben Tante Tessa. In mijn taartenkraam bakken we werkwoorden met -te en -ten.`,uitleg:[{tekst:`Zit de laatste letter in 't kofschip-x? Dan krijgt de verleden tijd -te. Bij wij, jullie en zij wordt het -ten.`,voorbeeld:`fietsen → ik fiets**te** – wij fiets**ten**`},{tekst:`Let op! Eindigt de ik-vorm al op een t? Dan komt er toch nog -te achter. Zo krijg je twee keer t!`,voorbeeld:`planten → ik plant → ik plan**tte** – wij plan**tten**`}]},{id:`drummer`,kraamNaam:`Dirk de Drummer`,karakterNaam:`Dirk de Drummer`,icoon:`🥁`,leerdoel:`verleden tijd met -de(n)`,begroeting:`Yo! Ik ben Dirk de Drummer. Boem-boem-de! Bij mij hoor je werkwoorden met -de en -den.`,uitleg:[{tekst:`Zit de laatste letter níet in 't kofschip-x? Dan krijgt de verleden tijd -de. Bij wij, jullie en zij wordt het -den.`,voorbeeld:`rennen → ik ren**de** – wij ren**den**`},{tekst:`Let op! Eindigt de ik-vorm al op een d? Dan komt er toch nog -de achter. Zo krijg je twee keer d!`,voorbeeld:`branden → ik brand → ik bran**dde** – wij bran**dden**`}]},{id:`voorvoegsel`,kraamNaam:`Vera Voorvoegsel`,karakterNaam:`Vera Voorvoegsel`,icoon:`🔤`,leerdoel:`werkwoorden met be-, ge-, ver-, her-, ont-`,begroeting:`Goedendag! Ik ben Vera Voorvoegsel. Ik verzamel werkwoorden die beginnen met be-, ge-, ver-, her- of ont-.`,uitleg:[{tekst:`Staat er be-, ge-, ver-, her- of ont- voor het werkwoord? De regel blijft precies hetzelfde! Kijk naar de ik-vorm en gebruik 't kofschip-x.`,voorbeeld:`verplanten → verplant → **t** → ik verplan**tte**<br>verbranden → verbrand → **d** → ik verbran**dde**`},{tekst:`Je hoort het verschil niet altijd. Zeg er daarom 'gisteren' bij. Dan weet je zeker dat het verleden tijd is.`,voorbeeld:`Vandaag verplant ik een boom.<br>Gisteren verplan**tte** ik een boom.`}]},{id:`poffertjes`,kraamNaam:`Poffertjeskraam`,karakterNaam:`Peter & Olga`,icoon:`🥞`,leerdoel:`persoonsvorm en onderwerp`,begroeting:`Hoi! Wij zijn Peter Persoonsvorm en Olga Onderwerp. Wij bakken de lekkerste poffertjes én zinnen!`,uitleg:[{spreker:`Peter Persoonsvorm`,tekst:`Zo vind je de persoonsvorm. Maak de zin vragend: het woord dat vooraan komt, is de persoonsvorm (vraagproef). Of verander de tijd: het werkwoord dat verandert, is de persoonsvorm (tijdproef).`,voorbeeld:`Olga bakt poffertjes.<br>Vraagproef: **Bakt** Olga poffertjes?<br>Tijdproef: Olga **bakte** poffertjes.`},{spreker:`Olga Onderwerp`,tekst:`Zo vind je het onderwerp. Vraag: wie of wat + persoonsvorm? Het antwoord is het onderwerp.`,voorbeeld:`Olga bakt poffertjes.<br>Wie bakt? → **Olga**. Olga is het onderwerp.`}]},{id:`ijs`,kraamNaam:`IJskraam Gijs`,karakterNaam:`Gijs Gezegde`,icoon:`🍦`,leerdoel:`werkwoordelijk gezegde`,begroeting:`Hé hallo! Ik ben Gijs Gezegde. Bij mij stapel je werkwoorden als ijsbolletjes!`,uitleg:[{tekst:`Het werkwoordelijk gezegde zijn alle werkwoorden in de zin samen. De persoonsvorm hoort er dus ook bij!`,voorbeeld:`Ik **heb** een ijsje **gekocht**.<br>Werkwoordelijk gezegde: heb gekocht`},{tekst:`Zoek eerst de persoonsvorm. Zoek daarna de andere werkwoorden. Samen zijn ze het werkwoordelijk gezegde.`,voorbeeld:`Wij **willen** morgen ijs **gaan eten**.<br>Werkwoordelijk gezegde: willen gaan eten`}]}],J={praatToets:`Druk op E om te praten`,praatTik:`Tik hier om te praten`,kindToets:`Druk op E om met {naam} te praten`,kindTik:`Tik hier om met {naam} te praten`,knopUitleg:`Leg het nog eens uit`,knopSpelen:`Ik wil spelen!`,knopDoei:`Doei!`,knopVerder:`Verder ▶`,startTitel:`Staal Plein`,startOndertitel:`Taalfeest op het schoolplein van De Bunders · Staal blok 2`,startUitleg:`Loop over het plein en praat met de karakters achter de kramen. Speel hun spel en verzamel 6 stempels! Een stempel krijg je als je bij een kraam alle 3 de niveaus haalt.`,startExtra:`🪙 Verdien munten, zoek verstopte muntjes, beantwoord de vragen van de meesters en koop coole kleding in De Bunders Boetiek! En… wat zit er achter de poort met het slot?`,startVerder:`Welkom terug! Je hebt al {aantal} van de 6 stempels.`,startKnop:`Spelen`,startKnopVerder:`Verder spelen`,voorlezenAan:`Voorlezen staat aan`,voorlezenUit:`Voorlezen staat uit`,geluidAan:`Geluid staat aan`,geluidUit:`Geluid staat uit`,opnieuwKnop:`Opnieuw beginnen`,opnieuwVraag:`Weet je het zeker? Al je stempels, munten, kleding en voetbalprijzen worden gewist.`,opnieuwJa:`Ja, opnieuw beginnen`,opnieuwNee:`Nee, toch niet`,stempelErbij:`⭐ Alle 3 de niveaus gehaald! Je krijgt een stempel op je stempelkaart!`,stempelNog:`Nog {aantal} te gaan, dan krijg je een stempel!`,feestTekst:`Hoera! Je hebt alle 6 stempels! Feest op het plein!`,oorkondeTitel:`Staal Blok 2 Kampioen!`,oorkondeSchool:`Basisschool De Bunders · groep 7`,oorkondeVoor:`Deze oorkonde is voor`,oorkondeNaam:`Typ hier je naam`,oorkondeTekst:`Jij hebt bij alle zes de kramen op het schoolplein een stempel verdiend. Je bent een echte taalkampioen!`,oorkondeHandtekening:`handtekening juf of meester`,oorkondePrint:`Afdrukken`,oorkondeVerder:`Verder spelen`},Aa={kofschip:{titel:`De schatkisten van Kapitein Kofschip`,opdracht:`Krijgt dit werkwoord -te of -de? Kies de goede schatkist!`,opdrachtTypen:`Typ de verleden tijd. Krijgt het -te of -de?`,niveaus:[`Gewone werkwoorden. Kies de schatkist -te of -de.`,`Typ zelf de verleden tijd. De ik-vorm staat erbij als hulp.`,`Typ zelf de verleden tijd, zonder hulp. Ook strikvragen zoals leven en reizen!`],vragen:[{hele:`werken`,ik:`werk`,uitgang:`te`,niveau:1},{hele:`fietsen`,ik:`fiets`,uitgang:`te`,niveau:1},{hele:`koken`,ik:`kook`,uitgang:`te`,niveau:1},{hele:`hopen`,ik:`hoop`,uitgang:`te`,niveau:1},{hele:`lachen`,ik:`lach`,uitgang:`te`,niveau:2},{hele:`maken`,ik:`maak`,uitgang:`te`,niveau:1},{hele:`dansen`,ik:`dans`,uitgang:`te`,niveau:1},{hele:`straffen`,ik:`straf`,uitgang:`te`,niveau:2},{hele:`mixen`,ik:`mix`,uitgang:`te`,niveau:2},{hele:`stoppen`,ik:`stop`,uitgang:`te`,niveau:2},{hele:`missen`,ik:`mis`,uitgang:`te`,niveau:2},{hele:`praten`,ik:`praat`,uitgang:`te`,niveau:3},{hele:`spelen`,ik:`speel`,uitgang:`de`,niveau:1},{hele:`wonen`,ik:`woon`,uitgang:`de`,niveau:1},{hele:`leren`,ik:`leer`,uitgang:`de`,niveau:1},{hele:`bouwen`,ik:`bouw`,uitgang:`de`,niveau:1},{hele:`huilen`,ik:`huil`,uitgang:`de`,niveau:1},{hele:`rennen`,ik:`ren`,uitgang:`de`,niveau:2},{hele:`branden`,ik:`brand`,uitgang:`de`,niveau:3},{hele:`horen`,ik:`hoor`,uitgang:`de`,niveau:1},{hele:`bellen`,ik:`bel`,uitgang:`de`,niveau:2},{hele:`kammen`,ik:`kam`,uitgang:`de`,niveau:2},{hele:`leven`,ik:`leef`,uitgang:`de`,niveau:3},{hele:`reizen`,ik:`reis`,uitgang:`de`,niveau:3},{hele:`blaffen`,ik:`blaf`,uitgang:`te`,niveau:2},{hele:`verhuizen`,ik:`verhuis`,uitgang:`de`,niveau:3},{hele:`geloven`,ik:`geloof`,uitgang:`de`,niveau:3},{hele:`antwoorden`,ik:`antwoord`,uitgang:`de`,niveau:3},{hele:`zetten`,ik:`zet`,uitgang:`te`,niveau:3},{hele:`rusten`,ik:`rust`,uitgang:`te`,niveau:3}]},taarten:{titel:`De taartenbakkerij van Tante Tessa`,opdracht:`Welk stukje hoort op de lege plek?`,opdrachtTypen:`Typ wat er op de lege plek hoort.`,niveaus:[`Eén persoon of ding. Kies uit -te of -tte.`,`Typ zelf het stukje dat ontbreekt. Ook met wij, jullie en zij.`,`Typ zelf het hele woord. Alleen het hele werkwoord staat erbij.`],vragen:[{zin:`Gisteren werk__ ik in de tuin.`,hele:`werken`,ik:`werk`,meer:!1},{zin:`Wij fiets__ samen naar het bos.`,hele:`fietsen`,ik:`fiets`,meer:!0},{zin:`Mama kook__ gisteren soep.`,hele:`koken`,ik:`kook`,meer:!1},{zin:`De kinderen maak__ een mooie tekening.`,hele:`maken`,ik:`maak`,meer:!0},{zin:`Ik lach__ om de grap van Tim.`,hele:`lachen`,ik:`lach`,meer:!1},{zin:`Oma dans__ op het feest.`,hele:`dansen`,ik:`dans`,meer:!1},{zin:`Ik hoop__ op mooi weer.`,hele:`hopen`,ik:`hoop`,meer:!1},{zin:`Gisteren plan__ ik een boom.`,hele:`planten`,ik:`plant`,meer:!1},{zin:`Wij plan__ bloemen in de tuin.`,hele:`planten`,ik:`plant`,meer:!0},{zin:`De juf praa__ met de directeur.`,hele:`praten`,ik:`praat`,meer:!1},{zin:`Na het voetballen rus__ wij even.`,hele:`rusten`,ik:`rust`,meer:!0},{zin:`Ik wach__ op de bus.`,hele:`wachten`,ik:`wacht`,meer:!1},{zin:`Jullie wach__ heel lang op een ijsje.`,hele:`wachten`,ik:`wacht`,meer:!0},{zin:`Tom poets__ zijn tanden.`,hele:`poetsen`,ik:`poets`,meer:!1},{zin:`Wij poets__ de ramen van de klas.`,hele:`poetsen`,ik:`poets`,meer:!0},{zin:`Papa maak__ pannenkoeken.`,hele:`maken`,ik:`maak`,meer:!1}]},drummer:{titel:`De woordenregen van Dirk de Drummer`,opdracht:`Vang de goed geschreven woorden met je trommel. Ontwijk de foute!`,opdrachtTypen:`Typ de verleden tijd voordat het woord de grond raakt!`,niveaus:[`Vang de goed geschreven woorden met je trommel.`,`Er valt een werkwoord. Typ de verleden tijd voordat het de grond raakt!`,`Sneller! En ook met wij, jullie en zij.`],klaarTekst:`Je hebt 8 goede woorden gevangen. {aantal} keer zonder fout woord ertussen. Wat een ritme!`,typWoorden:[{hele:`spelen`,ik:`speel`,niveau:2},{hele:`wonen`,ik:`woon`,niveau:2},{hele:`leren`,ik:`leer`,niveau:2},{hele:`bouwen`,ik:`bouw`,niveau:2},{hele:`huilen`,ik:`huil`,niveau:2},{hele:`rennen`,ik:`ren`,niveau:2},{hele:`horen`,ik:`hoor`,niveau:2},{hele:`bellen`,ik:`bel`,niveau:2},{hele:`trommelen`,ik:`trommel`,niveau:2},{hele:`schilderen`,ik:`schilder`,niveau:2},{hele:`branden`,ik:`brand`,niveau:3},{hele:`landen`,ik:`land`,niveau:3},{hele:`schudden`,ik:`schud`,niveau:3},{hele:`antwoorden`,ik:`antwoord`,niveau:3},{hele:`leven`,ik:`leef`,niveau:3},{hele:`reizen`,ik:`reis`,niveau:3}],goed:[`speelde`,`woonde`,`leerde`,`bouwde`,`huilde`,`rende`,`brandde`,`landde`,`schudde`,`speelden`,`bouwden`,`renden`,`brandden`,`landden`,`leerden`],fout:[{niveau:1,woord:`speelte`,goed:`speelde`},{niveau:1,woord:`woonte`,goed:`woonde`},{niveau:1,woord:`leerte`,goed:`leerde`},{niveau:1,woord:`bouwte`,goed:`bouwde`},{niveau:1,woord:`huilte`,goed:`huilde`},{niveau:2,woord:`rennde`,goed:`rende`},{niveau:2,woord:`brande`,goed:`brandde`},{niveau:2,woord:`lande`,goed:`landde`},{niveau:2,woord:`schude`,goed:`schudde`},{niveau:3,woord:`bouwdde`,goed:`bouwde`},{niveau:3,woord:`speeldde`,goed:`speelde`}]},voorvoegsel:{titel:`De letterkast van Vera Voorvoegsel`,opdracht:`Welk woord is goed geschreven?`,opdrachtTypen:`Typ het werkwoord in de verleden tijd.`,niveaus:[`Kies uit twee woorden.`,`Typ zelf het woord. De ik-vorm staat erbij als hulp.`,`Typ zelf het woord. Alleen het hele werkwoord staat erbij.`],vragen:[{zin:`Gisteren ___ de juf een boom.`,hele:`verplanten`,ik:`verplant`,goed:`verplantte`,opties:[`verplante`,`verplantte`,`verplantde`]},{zin:`Oeps! De kok ___ de pannenkoek.`,hele:`verbranden`,ik:`verbrand`,goed:`verbrandde`,opties:[`verbrande`,`verbrandde`,`verbrandden`]},{zin:`Lisa ___ een geheime gang onder de school.`,hele:`ontdekken`,ik:`ontdek`,goed:`ontdekte`,opties:[`ontdekte`,`ontdekde`,`ontdekten`]},{zin:`Wij ___ een grote doos voor ons kunstwerk.`,hele:`gebruiken`,ik:`gebruik`,goed:`gebruikten`,opties:[`gebruikte`,`gebruikten`,`gebruikden`]},{zin:`Opa ___ een spannend verhaal.`,hele:`vertellen`,ik:`vertel`,goed:`vertelde`,opties:[`vertelde`,`vertelte`,`vertelden`]},{zin:`Ik ___ mijn juf van groep 3 meteen.`,hele:`herkennen`,ik:`herken`,goed:`herkende`,opties:[`herkente`,`herkende`,`herkenden`]},{zin:`Mijn ouders ___ een pizza.`,hele:`bestellen`,ik:`bestel`,goed:`bestelden`,opties:[`bestelde`,`bestelden`,`bestelten`]},{zin:`Papa ___ met zijn pinpas.`,hele:`betalen`,ik:`betaal`,goed:`betaalde`,opties:[`betaalte`,`betaalde`,`betaalden`]},{zin:`De hamster ___ uit zijn kooi.`,hele:`ontsnappen`,ik:`ontsnap`,goed:`ontsnapte`,opties:[`ontsnapde`,`ontsnapte`,`ontsnapten`]},{zin:`Gisteren ___ ik mijn nieuwe buurmeisje.`,hele:`ontmoeten`,ik:`ontmoet`,goed:`ontmoette`,opties:[`ontmoete`,`ontmoette`,`ontmoetten`]},{zin:`Niemand ___ dat het ging sneeuwen.`,hele:`verwachten`,ik:`verwacht`,goed:`verwachtte`,opties:[`verwachte`,`verwachtte`,`verwachtten`]},{zin:`De meester ___ de uitleg nog een keer.`,hele:`herhalen`,ik:`herhaal`,goed:`herhaalde`,opties:[`herhaalte`,`herhaalde`,`herhaalden`]},{zin:`Wat ___ er gisteren op het plein?`,hele:`gebeuren`,ik:`gebeur`,goed:`gebeurde`,opties:[`gebeurte`,`gebeurde`,`gebeurden`]}]},poffertjes:{titel:`Zinnen bakken met Peter en Olga`,opdracht:`Klik eerst op de persoonsvorm. Klik daarna op het onderwerp.`,niveaus:[`Klik op de persoonsvorm. Het onderwerp staat vooraan.`,`Typ zelf de persoonsvorm én het onderwerp. Soms staat het onderwerp achteraan.`,`Typ zelf de persoonsvorm en het onderwerp. Ook vraagzinnen en lange zinnen!`],vragen:[{zin:`Olga | bakt | poffertjes.`,pv:1,ow:0,niveau:1},{zin:`De kinderen | spelen | op het plein.`,pv:1,ow:0,niveau:1},{zin:`Morgen | gaat | Peter | naar de markt.`,pv:1,ow:2,niveau:2},{zin:`Mijn zusje | eet | tien poffertjes.`,pv:1,ow:0,niveau:1},{zin:`In de pauze | voetballen | de jongens.`,pv:1,ow:2,niveau:2},{zin:`Gisteren | regende | het | de hele dag.`,pv:1,ow:2,niveau:2},{zin:`Wij | lopen | samen | naar school.`,pv:1,ow:0,niveau:1},{zin:`Na school | fietst | Sara | naar huis.`,pv:1,ow:2,niveau:2},{zin:`Peter en Olga | verkopen | warme poffertjes.`,pv:1,ow:0,niveau:1},{zin:`Heb | jij | de poffertjes | al geproefd?`,pv:0,ow:1,wieOfWat:`Wie heeft de poffertjes al geproefd?`,niveau:3},{zin:`Op zaterdag | zwemmen | mijn ouders | in het meer.`,pv:1,ow:2,niveau:2},{zin:`De hond | blaft | naar de postbode.`,pv:1,ow:0,niveau:1},{zin:`Tim | leest | een spannend boek.`,pv:1,ow:0,niveau:1},{zin:`De juf | schrijft | op het bord.`,pv:1,ow:0,niveau:1},{zin:`Mijn opa | woont | naast de school.`,pv:1,ow:0,niveau:1},{zin:`Lust | jij | ook poffertjes?`,pv:0,ow:1,niveau:3,wieOfWat:`Wie lust er ook poffertjes?`},{zin:`Komt | de juf | ook | naar de markt?`,pv:0,ow:1,niveau:3,wieOfWat:`Wie komt er ook naar de markt?`},{zin:`Vanmiddag | bakken | Peter en Olga | samen | heel veel poffertjes.`,pv:1,ow:2,niveau:3},{zin:`Na de pauze | gaan | alle kinderen van groep 7 | naar de gymzaal.`,pv:1,ow:2,niveau:3}]},ijs:{titel:`IJsjes stapelen met Gijs`,opdracht:`Klik alle werkwoorden aan. Samen zijn ze het werkwoordelijk gezegde!`,opdrachtTypen:`Typ alle werkwoorden uit de zin. Samen zijn ze het werkwoordelijk gezegde!`,niveaus:[`Klik alle werkwoorden aan. Je ziet hoeveel je er nog moet vinden.`,`Typ zelf alle werkwoorden. Je ziet hoeveel het er zijn.`,`Typ zelf alle werkwoorden, ook bij zinnen met drie. Hoeveel? Dat zoek je zelf uit!`],vragen:[{zin:`Ik *heb* een ijsje *gekocht*.`,niveau:1},{zin:`Wij *willen* morgen ijs *gaan* *eten*.`,niveau:3},{zin:`Gijs *schept* een groot bolletje.`,niveau:1},{zin:`De kinderen *zijn* naar de ijskraam *gelopen*.`,niveau:1},{zin:`Ik *mag* een smaak *uitkiezen*.`,niveau:2},{zin:`Het ijs *is* helemaal *gesmolten*.`,niveau:1},{zin:`Jullie *moeten* even *wachten*.`,niveau:1},{zin:`Sanne *heeft* drie bolletjes *besteld*.`,niveau:1},{zin:`Wij *gaan* op het plein *spelen*.`,niveau:2},{zin:`De ijsjes *worden* snel *verkocht*.`,niveau:1},{zin:`Ik *zal* mijn ijsje niet *laten* *vallen*.`,niveau:3},{zin:`Opa *eet* een ijsje met slagroom.`,niveau:1},{zin:`*Kun* jij mij even *helpen*?`,niveau:2},{zin:`Wij *zijn* de hele middag *blijven* *spelen*.`,niveau:3},{zin:`Ik *wil* een ijsje met spikkels.`,niveau:2},{zin:`Mama *laat* mij een smaak *kiezen*.`,niveau:2},{zin:`Wij *hebben* een ijsje *willen* *kopen*.`,niveau:3},{zin:`Gijs *moet* nieuwe hoorntjes *gaan* *halen*.`,niveau:3},{zin:`Jullie *mogen* straks een ijsje *komen* *halen*.`,niveau:3}]}},ja={goed:[`Goed zo!`,`Super!`,`Helemaal goed!`,`Knap gedaan!`,`Top!`,`Yes, goed!`],bijna:`Bijna!`,stoppen:`Stoppen`,klaarTitel:`Ronde gehaald!`,kiesNiveau:`Kies je niveau`,niveauOpSlot:`Op slot. Haal eerst een ronde met {sterren}.`,niveauVrij:`🔓 Nieuw niveau vrijgespeeld: {sterren}!`,anderNiveau:`Ander niveau`,controleer:`Controleer`,typHier:`Typ hier…`,klaarKnop:`Klaar!`,klaarTekst:`Je hebt alle 8 vragen gedaan. {aantal} keer had je het in één keer goed!`,opnieuw:`Nog een keer`,terug:`Terug naar het plein`},Ma={perNiveau:[5,10,15],tweedePoging:.5,latereKeer:0,reeksLengte:3,reeksBonus:5,foutloosBonus:20,pleinMuntje:2},Na={reeks:`{aantal} op rij! +{bonus}`,foutloos:`Foutloze ronde! +{bonus}`,overzichtTitel:`Jouw ronde`,goedeAntwoorden:`Goede antwoorden`,inEenKeer:`In één keer goed`,muntenAntwoorden:`Munten voor antwoorden`,reeksBonus:`Reeks-bonus`,foutloosBonus:`Bonus foutloze ronde`,totaal:`Je hebt nu`,munten:`munten`,pleinGevonden:`Muntje gevonden! {aantal} van de {totaal}`,pleinAlles:`Alle {totaal} muntjes gevonden! Morgen liggen er weer nieuwe.`},Pa=[{id:`pet-rood`,categorie:`hoofd`,naam:`Rode pet`,icoon:`🧢`,kleur:14692657,model:`pet`,prijs:20},{id:`beanie`,categorie:`hoofd`,naam:`Warme muts`,icoon:`🧶`,kleur:1226886,model:`beanie`,prijs:40},{id:`cowboyhoed`,categorie:`hoofd`,naam:`Cowboyhoed`,icoon:`🤠`,kleur:10251068,model:`cowboy`,prijs:90},{id:`piratenhoed`,categorie:`hoofd`,naam:`Piratenhoed`,icoon:`🏴‍☠️`,kleur:1907997,model:`piraat`,prijs:120},{id:`kroon`,categorie:`hoofd`,naam:`Gouden kroon`,icoon:`👑`,kleur:16763177,model:`kroon`,prijs:300},{id:`shirt-groen`,categorie:`shirt`,naam:`Groen shirt`,icoon:`👕`,kleur:4243543,model:`kleur`,prijs:20},{id:`shirt-paars`,categorie:`shirt`,naam:`Paars shirt`,icoon:`👕`,kleur:10237621,model:`kleur`,prijs:20},{id:`shirt-geel`,categorie:`shirt`,naam:`Geel shirt`,icoon:`👕`,kleur:16565273,model:`kleur`,prijs:25},{id:`voetbalshirt`,categorie:`shirt`,naam:`Voetbalshirt`,icoon:`⚽`,kleur:14692657,model:`voetbal`,prijs:70},{id:`heldenshirt`,categorie:`shirt`,naam:`Superheldenshirt`,icoon:`⚡`,kleur:1667522,model:`held`,prijs:140},{id:`broek-spijker`,categorie:`broek`,naam:`Spijkerbroek`,icoon:`👖`,kleur:4878245,model:`kleur`,prijs:25},{id:`broek-rood`,categorie:`broek`,naam:`Rode broek`,icoon:`👖`,kleur:13183530,model:`kleur`,prijs:30},{id:`korte-broek`,categorie:`broek`,naam:`Korte broek`,icoon:`🩳`,kleur:15764480,model:`kort`,prijs:40},{id:`broek-goud`,categorie:`broek`,naam:`Glimmende broek`,icoon:`✨`,kleur:14725120,model:`glim`,prijs:110},{id:`schoenen-rood`,categorie:`schoenen`,naam:`Rode sneakers`,icoon:`👟`,kleur:16405074,model:`kleur`,prijs:25},{id:`schoenen-wit`,categorie:`schoenen`,naam:`Witte sneakers`,icoon:`👟`,kleur:15856629,model:`kleur`,prijs:30},{id:`laarzen`,categorie:`schoenen`,naam:`Stoere laarzen`,icoon:`🥾`,kleur:8014372,model:`laars`,prijs:60},{id:`schoenen-goud`,categorie:`schoenen`,naam:`Gouden schoenen`,icoon:`🌟`,kleur:16763177,model:`glim`,prijs:150},{id:`zonnebril`,categorie:`extra`,naam:`Zonnebril`,icoon:`🕶️`,kleur:2172201,model:`zonnebril`,prijs:50},{id:`vlinderdas`,categorie:`extra`,naam:`Vlinderdas`,icoon:`🎀`,kleur:15092096,model:`vlinderdas`,prijs:40},{id:`rugzak-paars`,categorie:`extra`,naam:`Paarse rugzak`,icoon:`🎒`,kleur:7358696,model:`rugzak`,prijs:35},{id:`cape`,categorie:`extra`,naam:`Heldencape`,icoon:`🦸`,kleur:14692657,model:`cape`,prijs:250},{id:`voetbalschoenen-oranje`,categorie:`schoenen`,groep:`voetbal`,naam:`Oranje voetbalschoenen`,icoon:`👟`,kleur:16742912,model:`voetbalschoen`,prijs:45},{id:`voetbalschoenen-groen`,categorie:`schoenen`,groep:`voetbal`,naam:`Neongroene voetbalschoenen`,icoon:`👟`,kleur:8190976,model:`voetbalschoen`,prijs:45},{id:`keepershandschoenen`,categorie:`extra`,groep:`voetbal`,naam:`Keepershandschoenen`,icoon:`🧤`,kleur:4243543,model:`handschoenen`,prijs:60},{id:`aanvoerdersband`,categorie:`extra`,groep:`voetbal`,naam:`Aanvoerdersband`,icoon:`©️`,kleur:16429061,model:`aanvoerdersband`,prijs:80},{id:`gouden-bal`,categorie:`extra`,groep:`voetbal`,naam:`Gouden bal`,icoon:`⚽`,kleur:16763177,model:`gouden-bal`,prijs:250,vereist:`beker`}],Fa={naam:`De Bunders Boetiek`,verkoper:`Bo Boetiek`,welkom:`Welkom bij De Bunders Boetiek! Ik ben Bo. Kijk maar rond en pas gerust iets aan!`,tabKleding:`Kleding`,categorieen:{hoofd:`Hoofd`,shirt:`Shirt`,broek:`Broek`,schoenen:`Schoenen`,extra:`Extra`,voetbal:`⚽ Voetbal`},vereistBeker:`🔒 Win eerst de Bunders Beker`,openToets:`Druk op E om de winkel te openen`,openTik:`Tik hier om de winkel te openen`,pasAan:`Pas aan`,uitproberen:`Je past nu: {naam}`,kopen:`Kopen`,aantrekken:`Aantrekken`,aan:`Heb je aan ✓`,nogNodig:`Nog {aantal} munten nodig`,zekerVraag:`Weet je het zeker? Je koopt: {naam} voor {prijs} munten.`,ja:`Ja, kopen!`,nee:`Nee, toch niet`,bedankt:`Gekocht: {naam}! Je ziet er super uit!`,sluiten:`Sluiten`,kast:`Kledingkast`,kastLeeg:`Je kast is nog leeg. Koop kleding in De Bunders Boetiek!`,uittrekken:`Uittrekken`,kastUitleg:`Klik op kleding om het aan of uit te trekken.`},Ia=[{id:`jop`,naam:`Meester Jop`,stem:.85,uiterlijk:{shirt:1867478,broek:3422784,pet:null,haar:6044186,kapsel:`kort`,rugzak:null},extra:[`bril`,`keycord`],begroeting:`Hé, hallo! Heb jij even tijd voor een vraag?`},{id:`bram`,naam:`Meester Bram`,stem:.75,uiterlijk:{shirt:3120708,broek:6045747,pet:null,haar:8818326,kapsel:`kort`,rugzak:null},extra:[`baard`,`vlinderdas`],begroeting:`Goedemorgen! Ik heb een pittige vraag voor je.`},{id:`koen`,naam:`Meester Koen`,stem:.95,uiterlijk:{shirt:14692657,broek:2172201,pet:2172201,rugzak:null},extra:[`fluitje`],begroeting:`Yo! Klaar voor een vraag? Kom op, jij kunt dit!`}],La={beloning:20,tweedePoging:10,wachtMinuten:5,maxPerDag:5,onderwerpen:{kofschip:{intro:`Mijn vraag gaat over 't kofschip-x.`,hint:`Haal -en van het hele werkwoord af. Zit de laatste letter in 't kofschip-x? Dan -te, anders -de.`},taarten:{intro:`Mijn vraag gaat over werkwoorden met -te en -ten.`,hint:`Eindigt de ik-vorm al op een t? Dan komt er nog -te achter: twee keer t!`},drummer:{intro:`Mijn vraag gaat over werkwoorden met -de en -den.`,hint:`Eindigt de ik-vorm al op een d? Dan komt er nog -de achter: twee keer d!`},voorvoegsel:{intro:`Mijn vraag gaat over werkwoorden met be-, ge-, ver-, her- en ont-.`,hint:`De regel blijft hetzelfde: ik-vorm + te of de. Gebruik 't kofschip-x.`},poffertjes:{intro:`Mijn vraag gaat over de persoonsvorm en het onderwerp.`,hint:``},ijs:{intro:`Mijn vraag gaat over het werkwoordelijk gezegde.`,hint:`Zoek eerst de persoonsvorm. Zoek daarna de andere werkwoorden in de zin.`}},vraagVerleden:`Hoe schrijf je de verleden tijd?`,vraagZin:`Typ het werkwoord in de verleden tijd:`,vraagPv:`Wat is de persoonsvorm in deze zin?`,vraagOw:`Wat is het onderwerp in deze zin?`,vraagWwg:`Welke werkwoorden horen bij het werkwoordelijk gezegde? Typ ze allemaal.`,hintPv:`Doe de vraagproef: maak er een vraag van. Welk woord komt vooraan?`,hintOw:`Vraag: wie of wat + persoonsvorm?`,goed:[`Helemaal goed! Hier zijn je munten.`,`Top! Dat wist je goed.`,`Knap hoor! Die munten heb je verdiend.`],nogEens:`Bijna! Probeer het nog één keer.`,helaas:`Jammer! Het goede antwoord is: {antwoord}. Volgende keer beter!`,wachten:`Ik heb zo weer een nieuwe vraag! Kom over {minuten} terug.`,genoegVandaag:`Voor vandaag heb ik genoeg vragen gesteld. Morgen heb ik weer nieuwe! Oefen maar lekker bij de kramen.`,controleer:`Controleer`,doei:`Doei!`,bedankt:`Bedankt, meester!`,wolkjeToets:`Druk op E: {naam} heeft een vraag!`,wolkjeTik:`Tik hier: {naam} heeft een vraag!`,wolkjeWacht:`Druk op E om met {naam} te praten`},Ra={poortBord:`Voetbalwereld`,terugBord:`Schoolplein`,slotTekst:`Haal eerst alle stempels!`,nogStempels:`Nog {aantal} stempels`,nogEenStempel:`Nog 1 stempel`,wolkjeDicht:`🔒 Haal eerst alle stempels! ({nog})`,wolkjeOpen:`⚽ Loop door de poort naar de Voetbalwereld!`,poortOpen:`De poort is open!`,poortOpenUitleg:`De poort naar de Voetbalwereld bij het hek is open!`,welkom:`Welkom in de Voetbalwereld!`,wolkjeTerug:`🏫 Loop door de poort terug naar het schoolplein`,uitlegLopen:`WASD of pijltjes: lopen`,uitlegSprint:`Shift: sprinten`,uitlegSchiet:`Spatie vasthouden: harder schieten`,uitlegJoystick:`Joystick: lopen`,uitlegSchietKnop:`Schiet: vasthouden en loslaten`,uitlegSprintKnop:`Sprint: vasthouden`,kracht:`Kracht`,knopSprint:`Sprint`,knopSchiet:`Schiet`,oefenen:`OEFENEN`,goal:`GOAL!`,thuisTeam:`DE BUNDERS`,uitlegPass:`Q: passen`,uitlegWissel:`E: wissel van speler`,knopPass:`Pass`,knopWissel:`Wissel`,startWedstrijd:`Start wedstrijd tegen {team}`,aftrap:`Aftrap!`,uitBal:`Uit! Bal voor {team}`,hoekschop:`Hoekschop voor {team}`,doelschop:`Doelschop voor {team}`,goalTegen:`Goal voor {team}`,eindeTitel:`Einde wedstrijd!`,gewonnen:`Gewonnen! 🎉`,gelijk:`Gelijkspel!`,verloren:`Verloren… volgende keer beter!`,nogEenKeer:`Nog een keer`,terugVeld:`Terug naar het veld`,stoppen:`Stoppen`,kiesTegenstander:`Kies je tegenstander`,bordWolkje:`Druk op E om een tegenstander te kiezen`,bordTik:`Tik hier om een tegenstander te kiezen`,opSlot:`Win eerst van {team}`,verslagen:`Verslagen ✓`,spelen:`Spelen!`,niveaus:{makkelijk:`Makkelijk`,gemiddeld:`Gemiddeld`,moeilijk:`Moeilijk`},nieuwVrij:`🔓 Nieuwe tegenstander: {team}!`,andereTegenstander:`Andere tegenstander`,terugSchoolplein:`Terug naar het schoolplein`,sluiten:`Sluiten`,bekerTitel:`De Bunders Beker!`,bekerTekst:`Je hebt van alle drie de teams gewonnen! De beker staat nu op het schoolplein.`,bekerKnop:`Hoera!`,bekerOpPlein:`🏆 De Bunders Beker staat nu midden op het schoolplein!`,bekerBord:`BUNDERS BEKER`,overzichtDoelpunten:`⚽ Doelpunten: {aantal} × {per} munten`,overzichtWinst:`🏆 Winst tegen {team}`,overzichtGelijk:`🤝 Gelijkspel`,overzichtBeker:`🥇 Bunders Beker`,overzichtVerlies:`Verlies kost geen munten. Probeer het nog eens!`,overzichtTotaal:`Verdiend: {aantal} munten`},za={duurMinuten:3,eigenTeam:{snelheid:5.2,schot:.6,keeper:.6,afpakken:.8,passen:.5},kindAfpakken:2},Ba={doelpunt:5,gelijk:10,beker:100},Va=[{id:`slakken`,naam:`De Slakken`,kort:`SLAKKEN`,niveau:`makkelijk`,tenue:{shirt:`#82c91e`,streep:`#5c940d`,broek:2853438},snelheid:4.2,schot:.3,keeper:.35,afpakken:.5,passen:.3,winstMunten:20},{id:`wervelwinden`,naam:`De Wervelwinden`,kort:`WERVELWINDEN`,niveau:`gemiddeld`,tenue:{shirt:`#ae3ec9`,streep:`#ffffff`,broek:6241732},snelheid:5.4,schot:.55,keeper:.6,afpakken:1.2,passen:.55,winstMunten:30},{id:`bliksems`,naam:`De Bliksems`,kort:`BLIKSEMS`,niveau:`moeilijk`,tenue:{shirt:`#fab005`,streep:`#212529`,broek:2172201},snelheid:6.4,schot:.8,keeper:.85,afpakken:2,passen:.75,winstMunten:40}],Ha={geheimeToetsF9:!0,leerkrachtCode:`lezenisleuk`},Ua={knop:`🔑 Leerkracht`,uitleg:`Vul de leerkrachtcode in om alles vrij te spelen.`,plaatshouder:`Code`,ok:`OK`,goed:`🔑 Alles is vrijgespeeld!`,fout:`Die code klopt niet.`,melding:`🔑 Leerkrachtmodus: alles is vrijgespeeld!`},Wa={namen:[`Sem`,`Noor`,`Daan`,`Lotte`,`Finn`,`Zoë`,`Mila`,`Ayoub`,`Bram`,`Fenna`,`Jesse`,`Lina`],uitspraken:[`Hoi! Heb jij Kapitein Kofschip al ontmoet? Ahoi!`,`Ik fietste vanochtend naar school. Met -te, want de s zit in 't kofschip!`,`Dirk de Drummer is zó hard. Boem-boem-de!`,`Ik heb echt zin in een ijsje van Gijs.`,`Tikkertje? Jij bent 'm!`,`Spring eens op de palen bij de school. Dat is echt leuk!`,`Ik bouwde gisteren een zandkasteel. Bouwde, met een d!`,`Psst… de poffertjes van Peter en Olga zijn heerlijk.`,`Weet jij nog hoe de vraagproef werkt? Ik vergeet het steeds.`,`Mijn hamster heet Werkwoord. Grappig, hè?`,`Ik ben helemaal tot boven in de klimtoren geklommen!`,`Haha, je pet staat scheef!`,`Ik zoek mijn bal. Heb jij hem gezien?`,`Tante Tessa bakt de lekkerste taarten van het plein.`,`Gaap… is het al pauze?`,`Ik had een negen voor spelling!`,`Wij speelden gisteren verstoppertje. Ik won!`,`Vera Voorvoegsel heeft wel héél veel letterblokken.`,`Niet verder vertellen, maar ik ben een beetje bang voor die papegaai.`,`Kom je ook schommelen bij het touw?`,`Ik dacht dat jij een juf was. Grapje!`]},Ga=class{constructor(e,t,{voorlezen:n,geluid:r}){this.voorlezen=n,this.geluid=r,e.insertAdjacentHTML(`beforeend`,`
      <div class="titel">Schoolplein De Bunders</div>
      <div class="hud-rechts">
        <div class="hud-knoppen">
          <button type="button" class="rond" data-knop="kast" title="Kledingkast (K)" aria-label="Kledingkast">👕</button>
          <button type="button" class="rond" data-knop="voorlezen"></button>
          <button type="button" class="rond" data-knop="geluid"></button>
          <button type="button" class="rond" data-knop="opnieuw" title="${J.opnieuwKnop}" aria-label="${J.opnieuwKnop}">↺</button>
          <button type="button" class="rond" data-knop="hulp" title="Hulp" aria-label="Hulp">?</button>
        </div>
        <div class="hulp">
          <h2>Zo speel je</h2>
          <ul>
            ${t?`<li>🕹️ Lopen en draaien: <b>joystick</b></li>`:`<li>🚶 Lopen: <b>↑</b> of <b>W</b> (terug: <b>↓</b>)</li><li>↪️ Draaien: <b>← →</b> of <b>A D</b></li>`}
            <li>⬆️ Springen: <b>${t?`Spring-knop`:`spatie`}</b></li>
            <li>💬 Praten: <b>${t?`tik op het wolkje`:`E`}</b></li>
            <li>👆 ${t?`Tik`:`Klik`} op de grond: loop erheen</li>
            <li>👕 Kledingkast: <b>${t?`knop 👕`:`K`}</b></li>
          </ul>
        </div>
      </div>
      <div class="wolkje"></div>
    `),this.hulp=e.querySelector(`.hulp`),this.wolkje=e.querySelector(`.wolkje`),this.knopVoorlezen=e.querySelector(`[data-knop="voorlezen"]`),this.knopGeluid=e.querySelector(`[data-knop="geluid"]`),this.opWolkjeKlik=null,this.opOpnieuw=null,this.wolkje.setAttribute(`role`,`button`),this.wolkje.addEventListener(`click`,()=>this.opWolkjeKlik?.()),this.hulpTimer=setTimeout(()=>this.hulp.classList.add(`dicht`),25e3),e.querySelector(`.hud-knoppen`).addEventListener(`click`,t=>{let n=t.target.closest(`button`);if(n){switch(n.dataset.knop){case`voorlezen`:this.voorlezen.aan=!this.voorlezen.aan,this.voorlezen.aan&&this.voorlezen.zeg(`Voorlezen staat aan.`);break;case`geluid`:this.geluid.aan=!this.geluid.aan,this.geluid.plop();break;case`kast`:this.opKast?.();break;case`opnieuw`:this.vraagOpnieuw(e);break;case`hulp`:clearTimeout(this.hulpTimer),this.hulp.classList.toggle(`dicht`)}this.zetKnoppen(),n.blur()}}),this.voorlezen.beschikbaar||(this.knopVoorlezen.hidden=!0),this.zetKnoppen()}zetKnoppen(){let e=this.voorlezen.aan;this.knopVoorlezen.textContent=e?`🗣️`:`🤐`,this.knopVoorlezen.title=e?J.voorlezenAan:J.voorlezenUit,this.knopVoorlezen.setAttribute(`aria-pressed`,e),this.knopVoorlezen.classList.toggle(`uit`,!e);let t=this.geluid.aan;this.knopGeluid.textContent=t?`🔊`:`🔇`,this.knopGeluid.title=t?J.geluidAan:J.geluidUit,this.knopGeluid.setAttribute(`aria-pressed`,t),this.knopGeluid.classList.toggle(`uit`,!t)}vraagOpnieuw(e){let t=document.createElement(`div`);t.className=`bevestig-achtergrond`,t.innerHTML=`
      <div class="bevestig" role="alertdialog">
        <p>${J.opnieuwVraag}</p>
        <div>
          <button type="button" class="nee">${J.opnieuwNee}</button>
          <button type="button" class="ja">${J.opnieuwJa}</button>
        </div>
      </div>`,e.appendChild(t),document.body.classList.add(`bevestig-open`);let n=()=>{t.remove(),document.body.classList.remove(`bevestig-open`)};t.querySelector(`.nee`).addEventListener(`click`,n),t.querySelector(`.ja`).addEventListener(`click`,()=>{n(),this.opOpnieuw?.()}),t.querySelector(`.nee`).focus()}toonMelding(e){this.melding||(this.melding=document.createElement(`div`),this.melding.className=`melding`,document.body.appendChild(this.melding)),this.melding.textContent=e,this.melding.classList.remove(`zichtbaar`),this.melding.offsetWidth,this.melding.classList.add(`zichtbaar`),clearTimeout(this.meldingTimer),this.meldingTimer=setTimeout(()=>this.melding.classList.remove(`zichtbaar`),2600)}zetTitel(e){let t=document.querySelector(`.titel`);t&&(this.standaardTitel??=t.textContent,t.textContent=e||this.standaardTitel)}verbergMelding(){clearTimeout(this.meldingTimer),this.melding?.classList.remove(`zichtbaar`)}toonWolkje(e){e!==this.wolkjeTekst&&(this.wolkjeTekst=e,e?(this.wolkje.textContent=e,this.wolkje.classList.add(`zichtbaar`)):this.wolkje.classList.remove(`zichtbaar`))}};function Ka(e){return e.replace(/\*\*(.+?)\*\*/g,`<mark>$1</mark>`)}var qa=class{constructor(e,{voorlezen:t,geluid:n}={}){this.voorlezen=t,this.geluid=n,this.el=document.createElement(`div`),this.el.className=`dialoog`,this.el.setAttribute(`role`,`dialog`),this.el.innerHTML=`
      <div class="dialoog-kop">
        <span class="dialoog-icoon"></span>
        <span class="dialoog-naam"></span>
      </div>
      <button type="button" class="dialoog-luidspreker"></button>
      <div class="dialoog-tekst" aria-live="polite"></div>
      <div class="dialoog-knoppen">
        <button type="button" data-knop="uitleg"><span class="sneltoets">1</span>${J.knopUitleg}</button>
        <button type="button" data-knop="spelen" class="knop-spelen"><span class="sneltoets">2</span>${J.knopSpelen}</button>
        <button type="button" data-knop="doei" class="knop-doei"><span class="sneltoets">3</span>${J.knopDoei}</button>
      </div>`,e.appendChild(this.el),this.icoon=this.el.querySelector(`.dialoog-icoon`),this.naam=this.el.querySelector(`.dialoog-naam`),this.tekst=this.el.querySelector(`.dialoog-tekst`),this.knopUitleg=this.el.querySelector(`[data-knop="uitleg"]`),this.knopSpelen=this.el.querySelector(`[data-knop="spelen"]`),this.luidspreker=this.el.querySelector(`.dialoog-luidspreker`),this.luidspreker.addEventListener(`click`,e=>{e.stopPropagation(),this.voorlezen.aan=!this.voorlezen.aan,this.zetLuidspreker(),this.voorlezen.aan&&this.leesVoor(),this.opInstelling?.()}),t?.beschikbaar||(this.luidspreker.hidden=!0),this.open=!1,this.kraam=null,this.pagina=-1,this.el.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-knop]`);t&&this.kies(t.dataset.knop)}),window.addEventListener(`keydown`,e=>{if(!this.open)return;let t={Digit1:`uitleg`,Numpad1:`uitleg`,Digit2:`spelen`,Numpad2:`spelen`,Digit3:`doei`,Numpad3:`doei`,Escape:`doei`}[e.code];t&&(e.preventDefault(),this.kies(t))})}toon(e,t){this.kraam=e,this.acties=t,this.open=!0,this.el.style.setProperty(`--kraamkleur`,e.stijl.bord),this.icoon.textContent=e.data.icoon,this.pagina=-1,this.zetTekst(e.data.karakterNaam,Ka(e.data.begroeting)),this.knopUitleg.lastChild.textContent=J.knopUitleg,this.knopSpelen.lastChild.textContent=e.data.knopSpelen??J.knopSpelen,this.el.classList.add(`zichtbaar`),this.zetLuidspreker(),this.geluid?.plop(),this.zetPraten(!0),this.knopUitleg.focus({preventScroll:!0})}sluit(){this.open&&(this.open=!1,this.voorlezen?.stop(),this.zetPraten(!1),this.el.classList.remove(`zichtbaar`),this.acties?.opSluiten?.())}kies(e){this.open&&(e===`uitleg`?this.volgendeUitleg():e===`spelen`?this.acties?.opSpelen?.(this.kraam,this):e===`doei`&&this.sluit())}volgendeUitleg(){let e=this.kraam.data.uitleg;this.pagina=(this.pagina+1)%e.length;let t=e[this.pagina],n=t.spreker??this.kraam.data.karakterNaam;this.spreker=t.spreker,this.zetTekst(n,`<p>${Ka(t.tekst)}</p>${t.voorbeeld?`<div class="voorbeeld">${Ka(t.voorbeeld)}</div>`:``}`);let r=this.pagina<e.length-1;this.knopUitleg.lastChild.textContent=r?J.knopVerder:J.knopUitleg,this.zetPraten(!0)}zeg(e){this.zetTekst(this.kraam.data.karakterNaam,Ka(e)),this.zetPraten(!0)}zetTekst(e,t){e===this.kraam.data.karakterNaam&&(this.spreker=null),this.naam.textContent=e,this.tekst.innerHTML=t,this.tekst.classList.remove(`nieuw`),this.tekst.offsetWidth,this.tekst.classList.add(`nieuw`)}zetLuidspreker(){let e=this.voorlezen?.aan;this.luidspreker.textContent=e?`🔊`:`🔈`,this.luidspreker.title=e?`Voorlezen staat aan (klik om uit te zetten)`:`Voorlezen staat uit (klik om aan te zetten)`,this.luidspreker.setAttribute(`aria-pressed`,!!e),this.luidspreker.classList.toggle(`uit`,!e)}toonhoogte(){return(this.kraam.stijl.stemmen??{})[this.spreker]??this.kraam.stijl.stem??1}leesVoor(){return!this.open||!this.voorlezen?.aan?null:this.voorlezen.zeg(this.tekst.innerHTML,{toonhoogte:this.toonhoogte()})}zetPraten(e){clearTimeout(this.praatTimer);for(let t of this.kraam?.karakters??[])t.praat=e;if(!e)return;let t=this.praatNummer=(this.praatNummer??0)+1,n=this.leesVoor();if(n)n.then(()=>{t===this.praatNummer&&this.zetPraten(!1)}),this.praatTimer=setTimeout(()=>this.zetPraten(!1),2e4);else{let e=Math.min(6e3,600+this.tekst.textContent.length*45);this.praatTimer=setTimeout(()=>this.zetPraten(!1),e)}}},Ja={kapitein:{huid:15250575,shirt:14239550,haar:5913122,hoed:`piraat`,extra:[`ooglap`,`baard`,`papegaai`]},tessa:{huid:15909531,shirt:16221100,haar:9063210,kapsel:`lang`,hoed:`koksmuts`,extra:[`schort`]},dirk:{huid:11037509,shirt:1867478,haar:2236962,hoed:`petAchter`,petKleur:16766011,extra:[`stokken`]},vera:{huid:15909531,shirt:10237621,haar:7358696,kapsel:`knot`,extra:[`bril`]},peter:{huid:15777946,shirt:16777215,haar:12618302,hoed:`bakkerspet`,petKleur:2772879,extra:[`snor`,`schort`]},olga:{huid:14260844,shirt:16612884,haar:3875604,kapsel:`staartjes`,extra:[`strik`]},gijs:{huid:15909531,shirt:1226886,haar:14721850,hoed:`ijsmuts`,extra:[`vlinderdas`]},bo:{huid:15250575,shirt:15754645,haar:15227148,kapsel:`knot`,extra:[`bril`,`meetlint`,`bloem`]},lotte:{huid:15909531,shirt:13183530,haar:15909424,kapsel:`staartjes`,extra:[`zaklamp`,`strik`]}},Ya=class{constructor(e){this.stijl=e,this.groep=new N,this.lijf=new N,this.groep.add(this.lijf),this.praat=!1,this.zwaaien=0,this.fase=Math.random()*10,this.bouw(),this.groep.traverse(e=>{e.isMesh&&(e.castShadow=!0)})}bouw(){let e=this.stijl,t=this.lijf;for(let e of[-.17,.17])P(.24,.75,.26,3885675,e,.38,0,this.groep);let n=new H(new ct(.4,.5,4,10),F(e.shirt));n.position.y=1.2,t.add(n),e.extra?.includes(`schort`)&&P(.6,.75,.1,16777215,0,1.05,.36,t),this.armen=[-.52,.52].map(n=>{let r=new N;if(r.position.set(n,1.5,0),P(.2,.58,.22,e.shirt,0,-.26,0,r),B(.13,e.huid,0,-.6,0,r),e.extra?.includes(`stokken`)){let e=I(.025,.7,15849120,0,-.62,.3,r,5);e.rotation.x=Math.PI/2}if(n>0&&e.extra?.includes(`zaklamp`)){let e=new N;e.position.set(0,-.62,.12),e.rotation.x=Math.PI/2,r.add(e),I(.06,.34,3422784,0,0,0,e,10),I(.1,.1,16429061,0,.2,0,e,12),I(.085,.02,16775643,0,.26,0,e,12).material=F(16774079,{emissive:16769126})}return t.add(r),r});let r=new N;r.position.y=2,t.add(r),this.hoofd=r,r.add(new H(new ft(.38,16,12),F(e.huid)));let i=new ft(.06,8,6);for(let e of[-.14,.14]){let t=new H(i,F(1907997));t.position.set(e,.06,.34),r.add(t)}for(let e of[-.24,.24]){let t=new H(new ft(.065,8,6),F(16752286));t.position.set(e,-.06,.31),t.scale.z=.4,r.add(t)}this.mond=new H(new ft(.09,10,6),F(10234410)),this.mond.position.set(0,-.14,.34),this.mond.scale.set(1.5,.45,.5),r.add(this.mond),this.bouwHaar(r),this.bouwHoed(r),this.bouwExtras(r)}bouwHaar(e){let t=this.stijl;if(t.hoed===`piraat`||t.hoed===`koksmuts`||t.hoed===`bakkerspet`){let n=new H(new ft(.395,16,8,0,Math.PI*2,0,Math.PI*.42),F(t.haar));n.rotation.x=-.35,e.add(n)}else if(t.hoed!==`petAchter`){let n=new H(new ft(.4,16,8,0,Math.PI*2,0,Math.PI*.5),F(t.haar));n.rotation.x=-.25,e.add(n)}if(t.kapsel===`lang`&&P(.7,.6,.2,t.haar,0,-.22,-.28,e),t.kapsel===`knot`&&B(.2,t.haar,0,.38,-.25,e),t.kapsel===`staartjes`)for(let n of[-.42,.42]){let r=B(.15,t.haar,n,-.05,-.1,e);r.scale.y=1.6}}bouwHoed(e){let t=this.stijl;switch(t.hoed){case`piraat`:{let t=I(.55,.06,1907997,0,.28,0,e,16);t.scale.z=.75,I(.32,.32,1907997,0,.45,0,e,12),B(.07,16777215,0,.45,.3,e),P(.66,.05,.05,15909424,0,.31,.4,e);break}case`koksmuts`:I(.3,.32,16777215,0,.42,0,e,14),B(.38,16777215,0,.7,0,e,2).scale.y=.65;break;case`petAchter`:{let n=new H(new ft(.4,16,8,0,Math.PI*2,0,Math.PI/2),F(t.petKleur));n.position.y=.06,e.add(n),P(.5,.05,.32,t.petKleur,0,.1,-.44,e);break}case`bakkerspet`:{let n=I(.42,.14,t.petKleur,0,.36,-.02,e,14);n.rotation.x=-.15,P(.46,.04,.24,t.petKleur,0,.3,.4,e);break}case`ijsmuts`:{let t=P(.62,.22,.32,16777215,0,.42,0,e);t.rotation.x=-.1,P(.64,.06,.34,15754645,0,.33,0,e);break}}}bouwExtras(e){let t=this.stijl.extra??[];if(t.includes(`ooglap`)){P(.16,.13,.04,1118481,.14,.07,.36,e);let t=new H(new Be(.385,.012,4,24),F(1118481));t.rotation.set(0,0,-.5),t.rotation.y=Math.PI/2,t.rotation.z=.35,e.add(t)}if(t.includes(`baard`)&&(B(.3,this.stijl.haar,0,-.28,.12,e,1).scale.set(1.05,.8,.8),this.mond.position.z=.4),t.includes(`snor`))for(let t of[-1,1])B(.09,this.stijl.haar,t*.08,-.06,.36,e).scale.set(1.3,.55,.6);if(t.includes(`bril`)){for(let t of[-.14,.14]){let n=new H(new Be(.1,.018,6,16),F(2236962));n.position.set(t,.06,.37),e.add(n)}P(.08,.02,.02,2236962,0,.08,.38,e)}if(t.includes(`strik`))for(let t of[-1,1]){let n=et(.1,.18,15909424,t*.1,.38,-.05,e,6);n.rotation.z=t*Math.PI/2}if(t.includes(`vlinderdas`))for(let e of[-1,1]){let t=et(.09,.16,14239550,e*.08,1.62,.36,this.lijf,6);t.rotation.z=e*Math.PI/2}if(t.includes(`meetlint`)){for(let e of[-.16,.16])P(.07,.5,.02,16766011,e,1.38,.38,this.lijf);let e=new H(new Be(.24,.025,4,16),F(16766011));e.rotation.x=Math.PI/2,e.position.y=1.68,this.lijf.add(e)}if(t.includes(`bloem`)){let t=new N;t.position.set(.3,.28,.12),e.add(t);for(let e=0;e<5;e++){let n=e/5*Math.PI*2;B(.06,16777215,Math.cos(n)*.07,Math.sin(n)*.07,0,t)}B(.05,16429061,0,0,.02,t)}if(t.includes(`papegaai`)){let e=new N;e.position.set(-.55,1.75,0),this.lijf.add(e),B(.14,3650125,0,.12,0,e).scale.y=1.3,B(.1,3650125,0,.34,.03,e);let t=et(.04,.1,16749099,0,.32,.14,e,5);t.rotation.x=Math.PI/2,P(.08,.25,.04,14692657,0,-.05,-.12,e).rotation.x=-.4;for(let t of[-.04,.04])B(.02,1118481,t,.37,.09,e);this.papegaai=e}}update(e,t,n){this.fase+=e;let r=this.fase;this.lijf.position.y=Math.sin(r*2)*.02;let i=new v;this.groep.getWorldPosition(i);let a=Math.hypot(n.x-i.x,n.z-i.z),o=0;if(a<10){let e=Math.atan2(n.x-i.x,n.z-i.z),t=this.groep.getWorldQuaternion(new ht),r=new p().setFromQuaternion(t,`YXZ`).y;o=Math.atan2(Math.sin(e-r),Math.cos(e-r)),o=U.clamp(o,-.9,.9)}this.hoofd.rotation.y+=(o-this.hoofd.rotation.y)*Math.min(1,e*4);let s=a<6&&!this.praat;this.zwaaien+=(+!!s-this.zwaaien)*Math.min(1,e*4);let[c,l]=this.armen;if(this.stijl.extra?.includes(`stokken`)){let e=this.praat?6:9;c.rotation.x=-1.2+Math.sin(r*e)*.3,l.rotation.x=-1.2+Math.sin(r*e+Math.PI)*.3,l.rotation.z=0}else c.rotation.x=Math.sin(r*1.5)*.05,l.rotation.x=Math.sin(r*1.5+1)*.05,l.rotation.z=this.zwaaien*(2.6+Math.sin(r*8)*.35),this.praat&&(c.rotation.x=-.4+Math.sin(r*3)*.25,l.rotation.x=-.3+Math.sin(r*2.5+1)*.25);this.mond.scale.y=this.praat?.45+Math.abs(Math.sin(r*11))*.6:.45,this.papegaai&&(this.papegaai.rotation.y=Math.sin(r*1.3)*.6)}},Xa={kraamNaam:`Leeskraam - Spot aan!`,karakterNaam:`Lotte Leeslamp`,icoon:`🔦`,begroeting:`Welkom bij de Leeskraam! Lees samen met je maatje en stel elkaar vragen over je boek.`,uitleg:[{tekst:`Maatje A leest een stukje voor. Maatje B pakt een kaartje en stelt de vraag. Daarna wissel je om.`}],knopKaartjes:`Kaartjes pakken`,eerstVragen:`Ga pas naar deze kraam als Meester Jop het heeft gezegd.`,eerstVragenJa:`Meester Jop heeft het gezegd`,eerstVragenNee:`Terug naar het plein`,kiesBoek:`Wat voor boek lees je?`,kiesCategorie:`Kies een soort vraag`,kiesInfo:`Pak een kaartje over je informatieboek`,verrasMe:`Verras me!`,pakKaartje:`Kaartje pakken`,anderBoek:`Ander boek`,volgend:`Volgend kaartje`,andereCategorie:`Andere categorie`,klaar:`Klaar`,voorlezen:`Lees de vraag voor`,beurtA:`Maatje A stelt de vraag`,beurtB:`Maatje B stelt de vraag`},Za={aan:!1,perKaartje:2,maxPerDag:10},Qa={verhaal:{naam:`Verhalenboek`,categorieen:[{naam:`Personages`,kleur:`#2E75B6`,vragen:[`Wie is de hoofdpersoon? Vertel iets over hem of haar.`,`Hoe ziet de hoofdpersoon eruit, denk je?`,`Hoe voelt de hoofdpersoon zich nu? Waaraan merk je dat?`,`Welk personage vind jij het leukst? Waarom?`,`Zou je vrienden willen zijn met de hoofdpersoon? Waarom wel of niet?`]},{naam:`Plaats & tijd`,kleur:`#3A9D5D`,vragen:[`Waar speelt het verhaal zich af?`,`Speelt het verhaal nu, vroeger of in de toekomst? Hoe weet je dat?`,`Zou jij op deze plek willen wonen? Waarom wel of niet?`]},{naam:`Wat gebeurt er?`,kleur:`#E07B1F`,vragen:[`Wat gebeurde er in het stukje dat je net hebt gehoord?`,`Wat is het probleem in het verhaal?`,`Wat was tot nu toe het spannendste of grappigste moment?`,`Welk woord of welke zin viel je op? Waarom?`]},{naam:`Voorspellen`,kleur:`#7B4FB0`,vragen:[`Wat denk je dat er hierna gebeurt?`,`Hoe denk je dat het boek afloopt?`,`Past de titel bij het verhaal? Welke titel zou jij bedenken?`,`Kijk naar de kaft. Wat verraadt de kaft over het verhaal?`]},{naam:`Jouw mening`,kleur:`#D6457A`,vragen:[`Wat vind je tot nu toe van het boek? Geef het een cijfer van 1 tot 10.`,`Aan wie in de klas zou jij dit boek aanraden? Waarom?`,`Wat zou jij doen als jij de hoofdpersoon was?`,`Doet het verhaal je denken aan iets wat jij zelf hebt meegemaakt?`]},{naam:`Spot aan!`,kleur:`#E8A800`,vragen:[`Welk personage zou jij in de spotlight zetten? Waarom?`,`Dit boek wordt een toneelstuk. Welke rol wil jij spelen?`,`Welk moment uit het boek zou jij op een podium naspelen?`,`Welke muziek of welk geluid past bij dit stukje?`]}]},info:{naam:`Informatieboek`,categorieen:[{naam:`Informatieboek`,kleur:`#138A8A`,vragen:[`Waar gaat dit boek over? Wat is het onderwerp?`,`Wat is het interessantste feitje dat je net hebt gelezen?`,`Wat wist je nog niet voordat je dit stukje las?`,`Welke foto of tekening vind je het mooist? Wat zie je erop?`,`Leg in je eigen woorden uit wat je net hebt gelezen.`,`Welk feitje zou jij in de spotlight aan de hele klas vertellen?`,`Welk moeilijk woord kwam je tegen? Wat betekent het, denk je?`,`Welk feitje vind je het gekst of het meest verrassend?`,`Wat zou jij nog meer willen weten over dit onderwerp?`,`Kijk in de inhoudsopgave. Welk hoofdstuk wil je als eerste lezen? Waarom?`,`Waar zou je nog meer over dit onderwerp kunnen vinden?`,`Aan wie in de klas zou jij dit boek aanraden? Waarom?`]}]}},$a={kofschip:{kleur:9124395,luifel:[`#d9473e`,`#ffffff`],bord:`#d9473e`,stem:.7,karakters:[`kapitein`],versier:ho},taarten:{kleur:15967936,luifel:[`#f783ac`,`#fff0f6`],bord:`#e64980`,stem:1.25,karakters:[`tessa`],versier:go},drummer:{kleur:2781109,luifel:[`#1c7ed6`,`#ffd43b`],bord:`#1c7ed6`,stem:.9,karakters:[`dirk`],versier:_o},voorvoegsel:{kleur:9264086,luifel:[`#9c36b5`,`#ffffff`],bord:`#9c36b5`,stem:1.35,karakters:[`vera`],versier:yo},poffertjes:{kleur:16747050,luifel:[`#fd7e14`,`#ffffff`],bord:`#e8590c`,stem:1,stemmen:{"Peter Persoonsvorm":.75,"Olga Onderwerp":1.35},karakters:[`peter`,`olga`],versier:bo},ijs:{kleur:3725737,luifel:[`#12b886`,`#e6fcf5`],bord:`#0ca678`,stem:1.1,karakters:[`gijs`],versier:xo}},eo=new de(0,5),to=13,no=[200,228,256,284,312,340];function ro(e,t){return ka.map((n,r)=>{let i=U.degToRad(no[r]),a=eo.x+Math.cos(i)*to,o=eo.y+Math.sin(i)*to,s=Math.atan2(eo.x-a,eo.y-o);return co(e,t,n,$a[n.id],a,o,s)})}function io(e,t){let n=Math.atan2(-11,7),r=co(e,t,{id:`boetiek`,kraamNaam:Fa.naam,karakterNaam:Fa.verkoper,icoon:`👗`},{kleur:15754645,luifel:[`#cc5de8`,`#ffdeeb`],bord:`#c2255c`,stem:1.3,karakters:[`bo`],versier:lo},13,13,n);return r.isWinkel=!0,r}function ao(e,t){let n=Math.atan2(16,8),r=co(e,t,{id:`leeskraam`,...Xa,knopSpelen:Xa.knopKaartjes},{kleur:8003359,luifel:[`#c92a2a`,`#ffd43b`],bord:`#c92a2a`,stem:1.2,karakters:[`lotte`],versier:mo},-14,12,n);r.isLeeskraam=!0;let i=new v(0,0,po.z).applyEuler(r.groep.rotation).add(r.groep.position);return t.voegCirkelToe(i.x,i.z,po.r,po.top),r}function oo([e,t]){return Qe(256,64,(n,r,i)=>{for(let a=0;a<8;a++)n.fillStyle=a%2?t:e,n.fillRect(a*r/8,0,r/8+1,i)})}function so([e,t]){return Qe(512,64,(n,r,i)=>{n.clearRect(0,0,r,i);for(let a=0;a<8;a++){n.fillStyle=a%2?t:e;let o=a*r/8;n.fillRect(o,0,r/8+1,i*.45),n.beginPath(),n.arc(o+r/8/2,i*.45,r/8/2,0,Math.PI),n.fill()}})}function co(e,t,n,r,i,a,o){let s=new N;s.position.set(i,0,a),s.rotation.y=o,e.add(s);let c=10119740;P(3.6,1.05,.7,r.kleur,0,.525,.7,s),P(3.62,.16,.72,16777215,0,.82,.7,s),P(3.9,.08,.95,c,0,1.09,.7,s),P(.08,1.05,2,r.kleur,-1.85,.525,-.1,s),P(.08,1.05,2,r.kleur,1.85,.525,-.1,s),P(3.4,.9,.5,c,0,.45,-1.15,s);for(let e of[-1.9,1.9])for(let t of[-1.25,1.1])I(.07,3.45,c,e,1.725,t,s,8);let l=P(4.5,.05,3.1,new W({map:oo(r.luifel)}),0,3.48,.15,s);l.rotation.x=.17;let u=new H(new ut(4.5,.4),new W({map:so(r.luifel),transparent:!0,alphaTest:.5,side:2}));u.position.set(0,3.02,1.69),s.add(u);let d=Ve(n.kraamNaam,{rand:r.bord,grootte:120}),f=new W({map:d}),p=F(16777215),m=new H(new Je(4,1,.08),[p,p,p,p,f,f]);m.position.set(0,4.25,1.2),m.castShadow=!0,s.add(m);for(let e of[-1.6,1.6])I(.04,.6,c,e,3.65,1.2,s,6);r.versier(s);let h=r.karakters.map((e,t,n)=>{let r=new Ya(Ja[e]),i=n.length>1?t===0?-.75:.75:0;return r.groep.position.set(i,0,-.35),s.add(r.groep),r});s.traverse(e=>{e.isMesh&&(e.receiveShadow=!0)});let g=new v(0,0,2.6).applyEuler(s.rotation).add(s.position);for(let e of[-1.05,1.05]){let n=new v(e,0,0).applyEuler(s.rotation).add(s.position);t.voegCirkelToe(n.x,n.z,1.45,4)}return s.userData.loopDoel=g,{data:n,stijl:r,groep:s,praatPunt:g,karakters:h,update(e,t,n){for(let r of h)r.update(e,t,n)}}}function lo(e){[[14692657,1867478,16429061],[4243543,13393384]].forEach((t,n)=>{t.forEach((t,r)=>P(.55,.09,.42,t,-1.15+n*.7,uo+.05+r*.09,.7,e))}),I(.05,.25,14540253,1,uo+.12,.7,e,6),B(.17,15856629,1,uo+.38,.7,e),I(.26,.03,10251068,1,uo+.5,.7,e,14),I(.13,.14,10251068,1,uo+.58,.7,e,12),P(.3,.07,.04,2172201,1,uo+.4,.86,e);for(let t of[-.9,.9])I(.04,2.1,11384253,2.55,1.05,t,e,6);let t=I(.035,1.9,11384253,2.55,2.05,0,e,6);t.rotation.x=Math.PI/2,[14692657,16429061,1867478,4243543,13393384].forEach((t,n)=>{let r=P(.08,.7,.55,t,2.55,1.6,-.7+n*.35,e);r.rotation.x=(n-2)*.05}),[[-2.2,16739179,4.6],[-2.4,16766011,4.2],[-2,5090295,4]].forEach(([t,n,r],i)=>{B(.3,n,t,r,-1.1+i*.25,e,2).scale.y=1.2,I(.01,r-2.9,16777215,t+.1,(r+2.9)/2-.15,-1.1+i*.25,e,3)})}var uo=1.13;function fo(){return Qe(128,256,(e,t,n)=>{for(let r=0;r<8;r++){let i=e.createLinearGradient(r*t/8,0,(r+1)*t/8,0);i.addColorStop(0,`#9b1c1c`),i.addColorStop(.5,`#e03131`),i.addColorStop(1,`#9b1c1c`),e.fillStyle=i,e.fillRect(r*t/8,0,t/8+1,n)}e.fillStyle=`#f2c230`,e.fillRect(0,n-14,t,14)})}var po={r:1.25,z:2.35,top:.25};function mo(e){I(po.r+.05,.08,15909424,0,.04,po.z,e,28),I(po.r,.25,9063199,0,.125,po.z,e,28);let t=new W({map:fo(),side:2});for(let n of[-1,1]){let r=new H(new ut(.5,2.85),t);r.position.set(n*1.68,1.6,1.22),e.add(r);let i=new H(new Be(.14,.035,6,14),F(15909424));i.position.set(n*1.68,1.45,1.24),i.scale.y=.5,e.add(i)}let n=new H(new ut(3.9,.45),t);n.position.set(0,2.82,1.23),e.add(n),[3044790,3841373,14711583,8081328].forEach((t,n)=>{P(.5,.09,.36,t,-1.15,1.1749999999999998+n*.09,.7,e).rotation.y=n%2?.15:-.1});for(let t of[-1,1]){let n=P(.32,.02,.42,16776693,t*.17,1.18,.72,e);n.rotation.z=-t*.12}P(.68,.03,.44,14042490,0,1.15,.72,e),[3044790,3841373,14711583,8081328,14042490,15247360,1280650].forEach((t,n)=>{P(.34,.025,.24,t,1.1+n%2*.02,1.1449999999999998+n*.025,.72,e).rotation.y=n*.08});let r=new N;r.position.set(3.2,0,3.6),e.add(r),I(.3,.08,3422784,0,.04,0,r,12),I(.05,3,4804695,0,1.5,0,r,8);let i=new N;i.position.set(0,3.05,0),r.add(i);let a=new v(0,1.6,.3).sub(new v(3.2,3.05,3.6));i.quaternion.setFromUnitVectors(new v(0,0,1),a.clone().normalize());let s=new N;i.add(s);let c=I(.22,.45,2172201,0,0,0,s,14);c.rotation.x=Math.PI/2;let l=I(.19,.03,16774079,0,0,.23,s,14);l.rotation.x=Math.PI/2,l.material=F(16774079,{emissive:16769126});let u=a.length()-.5,d=new H(new o(.85,u,24,1,!0),new nt({color:16774079,transparent:!0,opacity:.26,depthWrite:!1,side:2}));d.rotation.x=-Math.PI/2,d.position.z=.25+u/2,d.castShadow=!1,d.receiveShadow=!1,s.add(d);let f=new H(new gt(.8,24),new nt({color:16774079,transparent:!0,opacity:.25,depthWrite:!1}));f.rotation.x=-Math.PI/2,f.position.set(0,1.2,.45),e.add(f)}function ho(e){for(let[t,n]of[[-1.1,1],[1.1,.8]]){let r=new N;r.position.set(t,uo,.7),r.scale.setScalar(n),e.add(r),P(.7,.4,.45,8014372,0,.2,0,r);let i=new H(new c(.225,.225,.7,10,1,!1,0,Math.PI),F(9132587));i.rotation.z=Math.PI/2,i.position.y=.4,r.add(i),P(.72,.06,.47,15909424,0,.38,0,r),P(.1,.14,.05,15909424,0,.3,.24,r)}for(let t=0;t<7;t++){let n=I(.07,.02,15909424,-.3+t%4*.18,1.14+Math.floor(t/4)*.02,.6+t%2*.15,e,10);n.castShadow=!1}I(.03,1.4,5913122,2.05,4.2,-1.25,e,5);let t=P(.7,.45,.02,1907997,2.4,4.65,-1.25,e);B(.08,16777215,0,.02,.02,t)}function go(e){let t=(t,n,r,i)=>{for(let a=0;a<i;a++){let i=.28-a*.07;I(i,.16,a%2?16777215:r,t,1.21+a*.16,n,e,14)}B(.05,14692657,t,uo+i*.16+.04,n,e)};t(-1.2,.7,16221100,3),t(-.45,.75,9132587,2),t(1.2,.7,16766011,3),I(.25,.04,14540253,.45,1.15,.7,e,14),I(.18,.12,16221100,.45,1.23,.7,e,12);let n=new H(new ft(.24,14,8,0,Math.PI*2,0,Math.PI/2),new W({color:13691903,transparent:!0,opacity:.35}));n.position.set(.45,1.17,.7),e.add(n)}function _o(e){let t=(t,n,r,i,a)=>{I(r,i,a,t,uo+i/2,n,e,16),I(r*1.01,.02,16316922,t,uo+i+.01,n,e,16),I(r*1.03,.04,12632256,t,1.15,n,e,16)};t(-1.2,.7,.3,.35,14239550),t(1.25,.7,.25,.3,14239550),t(0,.5,.3,.18,16316922),I(.02,.6,12632256,.65,1.43,.8,e,5);let n=I(.22,.02,15909424,.65,1.75,.8,e,16);n.rotation.x=.2}function vo(e,t){return Qe(128,128,(n,r,i)=>{n.fillStyle=t,n.fillRect(0,0,r,i),n.strokeStyle=`#ffffff`,n.lineWidth=8,n.strokeRect(6,6,r-12,i-12),n.fillStyle=`#ffffff`,n.font=`bold ${e.length>2?46:60}px "Trebuchet MS", sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,r/2,i/2+4)})}function yo(e){[[`be`,`#e64980`],[`ge`,`#1c7ed6`],[`ver`,`#f59f00`],[`her`,`#37b24d`],[`ont`,`#7048e8`]].forEach(([t,n],r)=>{let i=P(.38,.38,.38,new W({map:vo(t,n)}),-1.3+r*.65,1.3199999999999998,.7+r%2*.08,e);i.rotation.y=(r-2)*.12}),[2781109,14239550,15909424].forEach((t,n)=>P(.5,.1,.35,t,1.45,1.18+n*.1,.35,e).rotation.y=n*.2)}function bo(e){let t=I(.6,.08,2830131,-.6,1.21,.7,e,20);t.scale.z=.6;for(let t=0;t<3;t++)for(let n=0;n<6;n++){let r=B(.06,13208380,-.95+n*.14,1.2799999999999998,.55+t*.14,e,1);r.scale.y=.6,r.castShadow=!1}I(.25,.03,16777215,.8,1.15,.7,e,16);for(let t=0;t<6;t++){let n=B(.06,14262363,.7+t%3*.1,1.2,.65+Math.floor(t/3)*.1,e,1);n.scale.y=.6}B(.06,16777215,.8,1.24,.7,e).scale.y=.4,I(.06,.18,16777215,1.4,1.22,.8,e,8)}function xo(e){P(1.6,.12,.7,14607078,-.55,1.19,.7,e),[16774079,16221100,9132587,6937468].forEach((t,n)=>P(.34,.06,.5,t,-1.1+n*.37,1.27,.7,e)),[[.75,[16221100,16774079]],[1.25,[9132587,6937468,16221100]]].forEach(([t,n])=>{let r=et(.1,.35,14723162,t,1.3099999999999998,.7,e,8);r.rotation.x=Math.PI,n.forEach((n,r)=>B(.12,n,t,1.5499999999999998+r*.18,.7,e,1))})}var So=[`hoofd`,`shirt`,`broek`,`schoenen`,`extra`],Co=e=>Pa.find(t=>t.id===e);function wo(e){return[e.hoofd,e.shirt,e.broek,e.schoenen,...e.extra??[]].filter(Boolean)}function To(e){if(e._origineel)return;let t=e.delen,n=e.armen.map(e=>e.children[1]).filter(Boolean);e._origineel=[t.lijf,...t.mouwen,...t.broeken,...t.schoenen,...t.pet,...t.rugzak,...n].map(e=>({m:e,materiaal:e.material,schaal:e.scale.clone(),pos:e.position.clone()})),e.kledingStukken=[]}function Eo(e){for(let t of e._origineel)t.m.material=t.materiaal,t.m.scale.copy(t.schaal),t.m.position.copy(t.pos),t.m.visible=!0;for(let t of e.kledingStukken)t.parent?.remove(t);e.kledingStukken=[],e.cape=null}function Do(e,t,n){return t.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.userData.geenKlik=!0)}),n.add(t),e.kledingStukken.push(t),t}var Oo=e=>F(e,{emissive:new pt(e).multiplyScalar(.25)});function ko(e,t){To(e),Eo(e);for(let n of wo(t)){let t=Co(n);t&&Ao[t.categorie]?.(e,t)}}var Ao={hoofd(e,t){let n=e.delen;if(t.model===`pet`){n.pet.forEach(e=>{e.material=F(t.kleur)});return}n.pet.forEach(e=>{e.visible=!1});let r=new N,i=t.kleur;switch(t.model){case`beanie`:{let e=new H(new ft(.39,16,8,0,Math.PI*2,0,Math.PI*.55),F(i));e.position.y=.02,r.add(e);let t=new H(new Be(.36,.06,6,20),F(new pt(i).multiplyScalar(.75).getHex()));t.rotation.x=Math.PI/2,t.position.y=.06,r.add(t),B(.1,16777215,0,.43,0,r);break}case`cowboy`:{let e=I(.64,.05,i,0,.18,0,r,20);e.scale.z=.85;let t=new H(new c(.26,.32,.34,14),F(i));t.position.y=.36,r.add(t),I(.325,.06,6044186,0,.24,0,r,14);break}case`piraat`:{let e=I(.56,.06,i,0,.24,0,r,16);e.scale.z=.75,I(.32,.3,i,0,.4,0,r,12),P(.66,.05,.05,15909424,0,.28,.4,r),B(.07,16777215,0,.42,.31,r);break}case`kroon`:{let e=new H(new c(.3,.3,.18,18,1,!0),Oo(i));e.material.side=2,e.position.y=.34,r.add(e);for(let e=0;e<6;e++){let t=e/6*Math.PI*2;et(.06,.16,Oo(i),Math.sin(t)*.3,.5,Math.cos(t)*.3,r,5),B(.035,e%2?14692657:1867478,Math.sin(t)*.31,.34,Math.cos(t)*.31,r)}break}}Do(e,r,e.hoofd)},shirt(e,t){let n=e.delen,r=t.kleur;if(n.mouwen.forEach(e=>{e.material=F(r)}),t.model===`voetbal`){let t=Qe(128,64,(e,t,n)=>{for(let r=0;r<8;r++)e.fillStyle=r%2?`#ffffff`:`#e03131`,e.fillRect(r*t/8,0,t/8+1,n)});n.lijf.material=new W({map:t});let r=new H(new ut(.34,.34),new W({map:Qe(64,64,e=>{e.fillStyle=`#ffffff`,e.fillRect(0,0,64,64),e.fillStyle=`#1d2b4f`,e.font=`bold 54px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`7`,32,36)})}));r.position.set(0,1.25,-.37),r.rotation.y=Math.PI,Do(e,r,e.model),n.rugzak.forEach(e=>{e.visible=!1});return}if(n.lijf.material=F(r),t.model===`held`){let t=new mt;for(let e=0;e<10;e++){let n=e%2?.07:.16,r=e/10*Math.PI*2+Math.PI/2;e===0?t.moveTo(Math.cos(r)*n,Math.sin(r)*n):t.lineTo(Math.cos(r)*n,Math.sin(r)*n)}let n=new H(new A(t,{depth:.03,bevelEnabled:!1}),Oo(16766011));n.position.set(0,1.22,.35),Do(e,n,e.model),Do(e,I(.37,.1,14692657,0,.84,0,null,16),e.model)}},broek(e,t){let n=e.delen,r=t.kleur;if(t.model===`kort`){n.broeken.forEach(t=>{t.material=F(r),t.scale.y=.45,t.position.y=-.14,Do(e,P(.2,.36,.22,e.uiterlijk.huid,0,-.44,0,null),t.parent)});return}n.broeken.forEach(e=>{e.material=t.model===`glim`?Oo(r):F(r)})},schoenen(e,t){let n=e.delen,r=t.kleur;n.schoenen.forEach(n=>{if(n.material=t.model===`glim`?Oo(r):F(r),t.model===`laars`&&(n.scale.set(1.05,2.4,1),n.position.y=-.6),t.model===`voetbalschoen`){let t=new N;for(let e of[-.08,.05,.18])for(let n of[-.07,.07])I(.025,.05,16777215,n,-.77,e,t,5);P(.27,.03,.39,16777215,0,-.62,.05,t),Do(e,t,n.parent)}})},extra(e,t){let n=e.delen,r=t.kleur;switch(t.model){case`zonnebril`:{let t=new N;for(let e of[-.13,.13])P(.15,.1,.03,r,e,.05,.355,t);P(.1,.025,.02,r,0,.07,.36,t),Do(e,t,e.hoofd);break}case`vlinderdas`:{let t=new N;for(let e of[-1,1]){let n=et(.08,.15,r,e*.08,1.56,.33,t,6);n.rotation.z=e*Math.PI/2}B(.04,r,0,1.56,.35,t),Do(e,t,e.model);break}case`rugzak`:n.rugzak.forEach((e,t)=>{e.material=F(t===0?r:new pt(r).multiplyScalar(.8).getHex())});break;case`handschoenen`:e.armen.forEach(e=>{let t=e.children[1];t&&(t.material=F(r),t.scale.setScalar(1.45))});break;case`aanvoerdersband`:{let t=e.armen[0],n=new H(new Be(.13,.04,6,16),F(r));n.rotation.x=Math.PI/2,n.position.y=-.12;let i=new H(new ut(.12,.12),new W({map:Qe(64,64,e=>{e.fillStyle=`#fab005`,e.fillRect(0,0,64,64),e.fillStyle=`#1d2b4f`,e.font=`bold 52px sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`C`,32,35)})}));i.position.set(-.15,-.12,0),i.rotation.y=-Math.PI/2;let a=new N;a.add(n,i),Do(e,a,t);break}case`gouden-bal`:Do(e,B(.2,Oo(r),0,-.72,.16,null,2),e.armen[1]);break;case`cape`:{n.rugzak.forEach(e=>{e.visible=!1});let t=new N;t.position.set(0,1.6,-.3);let i=new H(new ut(.9,1.2),new W({color:r,side:2}));i.position.set(0,-.6,-.05),t.add(i),P(.7,.06,.06,16766011,0,0,0,t),t.rotation.x=.12,Do(e,t,e.model),e.cape=t;break}}}},jo=`staal-blok2-kleding`;function Mo(){return{gekocht:[],aan:{hoofd:null,shirt:null,broek:null,schoenen:null,extra:[]}}}function No(){try{let e=JSON.parse(localStorage.getItem(jo));if(e&&Array.isArray(e.gekocht)){let t=Mo();return{gekocht:e.gekocht.filter(e=>Co(e)),aan:{...t.aan,...e.aan,extra:e.aan?.extra??[]}}}}catch{}return Mo()}var Po=No(),Fo=new Set;function Io(){try{localStorage.setItem(jo,JSON.stringify(Po))}catch{}for(let e of Fo)e()}var Lo={get gekocht(){return Po.gekocht},get aan(){return{...Po.aan,extra:[...Po.aan.extra]}},heeft(e){return Po.gekocht.includes(e)},heeftAan(e){let t=Co(e);return t?t.categorie===`extra`?Po.aan.extra.includes(e):Po.aan[t.categorie]===e:!1},koop(e){Po.gekocht.includes(e)||Po.gekocht.push(e),this.trekAan(e)},trekAan(e){let t=Co(e);t&&this.heeft(e)&&(t.categorie===`extra`?Po.aan.extra.includes(e)||Po.aan.extra.push(e):Po.aan[t.categorie]=e,Io())},trekUit(e){let t=Co(e);t&&(t.categorie===`extra`?Po.aan.extra=Po.aan.extra.filter(t=>t!==e):Po.aan[t.categorie]===e&&(Po.aan[t.categorie]=null),Io())},wissel(e){this.heeftAan(e)?this.trekUit(e):this.trekAan(e)},metPasItem(e){let t=this.aan,n=Co(e);return n&&(n.categorie===`extra`?t.extra.includes(e)||t.extra.push(e):t[n.categorie]=e),t},geefAlles(e){for(let t of e)Po.gekocht.includes(t)||Po.gekocht.push(t);Io()},opVerandering(e){Fo.add(e)},wis(){Po=Mo(),Io()}},Ro=`staal-blok2-munten`;function zo(){try{let e=Number(JSON.parse(localStorage.getItem(Ro))?.totaal);return Number.isFinite(e)&&e>0?Math.floor(e):0}catch{return 0}}var Bo=zo(),Vo=new Set;function Ho(){try{localStorage.setItem(Ro,JSON.stringify({totaal:Bo}))}catch{}for(let e of Vo)e(Bo)}var Uo={get totaal(){return Bo},voegToe(e){let t=Math.floor(e);t<=0||(Bo+=t,Ho())},geefUit(e){return e>Bo?!1:(Bo-=e,Ho(),!0)},opVerandering(e){Vo.add(e)},wis(){Bo=0,Ho()}},Wo=`staal-blok2-voetbal`;function Go(){return{poortOpen:!1,verslagen:[],beker:!1}}function Ko(){try{let e=JSON.parse(localStorage.getItem(Wo));if(e&&typeof e==`object`)return{...Go(),...e,verslagen:Array.isArray(e.verslagen)?e.verslagen:[]}}catch{}return Go()}var qo=Ko();function Jo(){try{localStorage.setItem(Wo,JSON.stringify(qo))}catch{}}var Yo={get poortOpen(){return qo.poortOpen},zetPoortOpen(){qo.poortOpen=!0,Jo()},get verslagen(){return[...qo.verslagen]},isVerslagen(e){return qo.verslagen.includes(e)},zetVerslagen(e){qo.verslagen.includes(e)||(qo.verslagen.push(e),Jo())},get beker(){return qo.beker},zetBeker(){qo.beker=!0,Jo()},wis(){qo=Go(),Jo()}},Xo=class{constructor(e){this.houder=e,this.renderer=new Ri({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),e.appendChild(this.renderer.domElement),this.scene=new _t,this.scene.add(new S(16777215,8952234,2.2));let t=new k(16777215,1.8);t.position.set(2,4,3),this.scene.add(t);let n=new H(new c(.9,.95,.12,32),new W({color:16767208}));n.position.y=-.06,this.scene.add(n),this.camera=new Pe(32,1,.1,50),this.camera.position.set(0,1.55,5.2),this.camera.lookAt(0,1.15,0),this.pop=new Ta(this.scene),this.pop.richting=0,this.pop.model.rotation.y=0,this.hoek=.4,this.slepen=null;let r=this.renderer.domElement;r.addEventListener(`pointerdown`,e=>{this.slepen=e.clientX,r.setPointerCapture(e.pointerId)}),r.addEventListener(`pointermove`,e=>{this.slepen!=null&&(this.hoek+=(e.clientX-this.slepen)*.012,this.slepen=e.clientX)}),r.addEventListener(`pointerup`,()=>{this.slepen=null}),this.formaat(),this.resize=()=>this.formaat(),window.addEventListener(`resize`,this.resize),this.loopt=!0;let i=performance.now(),a=e=>{if(!this.loopt)return;let t=Math.min(.05,(e-i)/1e3);i=e,this.slepen??(this.hoek+=t*.7),this.pop.richting=this.hoek,this.pop.animeer(t,0),this.renderer.render(this.scene,this.camera),requestAnimationFrame(a)};requestAnimationFrame(a)}formaat(){let e=this.houder.clientWidth||260,t=this.houder.clientHeight||320;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}kleed(e){ko(this.pop,e)}juich(){let e=performance.now(),t=()=>{let n=(performance.now()-e)/500;this.pop.groep.position.y=n<1?Math.sin(n*Math.PI)*.4:0,n<1&&this.loopt&&requestAnimationFrame(t)};t()}sluit(){this.loopt=!1,window.removeEventListener(`resize`,this.resize),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer.domElement.remove()}},Zo=e=>`#${e.toString(16).padStart(6,`0`)}`,Qo=class{constructor(e,{geluid:t,voorlezen:n}){this.laag=e,this.geluid=t,this.voorlezen=n,this.el=null,this.opSluiten=null,this.categorie=`hoofd`,this.tab=`kleding`,this.toetsen=e=>{e.code===`Escape`&&(e.preventDefault(),this.bevestig?this.sluitBevestig():this.sluit())},Uo.opVerandering(()=>this.el&&this.tekenItems())}get open(){return!!this.el}toon(){this.el||(this.el=document.createElement(`div`),this.el.className=`winkel-achtergrond`,this.el.innerHTML=`
      <div class="winkel" role="dialog" aria-label="${Fa.naam}">
        <header class="wk-kop">
          <span class="wk-logo">👗</span>
          <h2>${Fa.naam}</h2>
          <button type="button" class="wk-sluit">✕ ${Fa.sluiten}</button>
        </header>
        <div class="wk-welkom"><span class="wk-bo" aria-hidden="true">👩‍🦰</span><span><b>${Fa.verkoper}:</b> ${Fa.welkom}</span></div>
        <div class="wk-inhoud">
          <div class="wk-paspop"><div class="wk-canvas"></div><div class="wk-pasmelding"></div></div>
          <div class="wk-rechts">
            <div class="wk-categorieen"></div>
            <div class="wk-items"></div>
          </div>
        </div>
      </div>`,this.laag.appendChild(this.el),document.body.classList.add(`venster-open`),this.itemsEl=this.el.querySelector(`.wk-items`),this.categorieEl=this.el.querySelector(`.wk-categorieen`),this.pasmelding=this.el.querySelector(`.wk-pasmelding`),this.paspop=new Xo(this.el.querySelector(`.wk-canvas`)),this.paspop.kleed(Lo.aan),this.pasId=null,this.el.querySelector(`.wk-sluit`).addEventListener(`click`,()=>this.sluit()),window.addEventListener(`keydown`,this.toetsen),this.kiesTab(`kleding`),this.voorlezen?.zeg(`${Fa.welkom}`,{toonhoogte:1.3}),this.el.querySelector(`.wk-sluit`).focus({preventScroll:!0}))}kiesTab(e){this.tab=e,this.categorieEl.innerHTML=[...So,`voetbal`].map(e=>`<button type="button" data-cat="${e}" class="${e===this.categorie?`actief`:``}">${Fa.categorieen[e]}</button>`).join(``),this.categorieEl.onclick=e=>{let t=e.target.closest(`button[data-cat]`);t&&(this.categorie=t.dataset.cat,this.kiesTab(`kleding`))},this.tekenItems()}tekenItems(){if(this.tab!==`kleding`)return;let e=this.categorie===`voetbal`?Pa.filter(e=>e.groep===`voetbal`):Pa.filter(e=>e.categorie===this.categorie&&!e.groep);this.itemsEl.innerHTML=``;for(let t of e){let e=Lo.heeft(t.id),n=Lo.heeftAan(t.id),r=t.prijs-Uo.totaal,i=t.vereist===`beker`&&!Yo.beker,a=document.createElement(`div`);a.className=`wk-item${this.pasId===t.id?` past`:``}${e?` heeft`:``}`,a.innerHTML=`
        <div class="wk-icoon" style="--kleur:${Zo(t.kleur)}">${t.icoon}</div>
        <div class="wk-naam">${t.naam}</div>
        <div class="wk-prijs"><span class="munt klein" aria-hidden="true"></span> ${t.prijs}</div>
        <div class="wk-knoppen">
          <button type="button" class="wk-pas">👀 ${Fa.pasAan}</button>
          ${e?`<button type="button" class="wk-draag${n?` aan`:``}">${n?Fa.aan:Fa.aantrekken}</button>`:i?`<button type="button" class="wk-koop" disabled>${Fa.vereistBeker}</button>`:`<button type="button" class="wk-koop" ${r>0?`disabled`:``}>${r>0?Fa.nogNodig.replace(`{aantal}`,r):`🛒 ${Fa.kopen}`}</button>`}
        </div>`,a.querySelector(`.wk-pas`).addEventListener(`click`,()=>this.pas(t.id)),a.querySelector(`.wk-koop`)?.addEventListener(`click`,()=>this.vraagKopen(t)),a.querySelector(`.wk-draag`)?.addEventListener(`click`,()=>{Lo.wissel(t.id),this.pasId=null,this.paspop.kleed(Lo.aan),this.pasmelding.textContent=``,this.tekenItems()}),this.itemsEl.appendChild(a)}}pas(e){this.pasId===e?(this.pasId=null,this.paspop.kleed(Lo.aan),this.pasmelding.textContent=``):(this.pasId=e,this.paspop.kleed(Lo.metPasItem(e)),this.pasmelding.textContent=Fa.uitproberen.replace(`{naam}`,Co(e).naam),this.geluid?.plop()),this.tekenItems()}vraagKopen(e){this.bevestig=document.createElement(`div`),this.bevestig.className=`bevestig-achtergrond`,this.bevestig.innerHTML=`
      <div class="bevestig" role="alertdialog">
        <div class="wk-icoon groot" style="--kleur:${Zo(e.kleur)}">${e.icoon}</div>
        <p>${Fa.zekerVraag.replace(`{naam}`,`<b>${e.naam}</b>`).replace(`{prijs}`,e.prijs)}</p>
        <div>
          <button type="button" class="nee">${Fa.nee}</button>
          <button type="button" class="ja ja-groen">${Fa.ja}</button>
        </div>
      </div>`,this.el.appendChild(this.bevestig),this.bevestig.querySelector(`.nee`).addEventListener(`click`,()=>this.sluitBevestig()),this.bevestig.querySelector(`.ja`).addEventListener(`click`,()=>{this.sluitBevestig(),this.koop(e)}),this.bevestig.querySelector(`.ja`).focus(),this.voorlezen?.zeg(this.bevestig.querySelector(`p`).textContent)}sluitBevestig(){this.bevestig?.remove(),this.bevestig=null}koop(e){if(!Uo.geefUit(e.prijs))return;Lo.koop(e.id),this.pasId=null,this.paspop.kleed(Lo.aan),this.paspop.juich(),this.geluid?.klaar();let t=Fa.bedankt.replace(`{naam}`,e.naam);this.pasmelding.textContent=`🎉 ${t}`,this.voorlezen?.zeg(t,{toonhoogte:1.3}),this.tekenItems()}sluit(){this.el&&(this.sluitBevestig(),this.voorlezen?.stop(),window.removeEventListener(`keydown`,this.toetsen),this.paspop.sluit(),this.el.remove(),this.el=null,document.body.classList.remove(`venster-open`),this.opSluiten?.())}},$o=e=>`#${e.toString(16).padStart(6,`0`)}`,es=class{constructor(e,{geluid:t}){this.laag=e,this.geluid=t,this.el=null,this.opSluiten=null,this.toetsen=e=>{(e.code===`Escape`||e.code===`KeyK`)&&(e.preventDefault(),this.sluit())}}get open(){return!!this.el}toon(){this.el||(this.el=document.createElement(`div`),this.el.className=`winkel-achtergrond`,this.el.innerHTML=`
      <div class="winkel kast" role="dialog" aria-label="${Fa.kast}">
        <header class="wk-kop">
          <span class="wk-logo">🚪</span>
          <h2>${Fa.kast}</h2>
          <button type="button" class="wk-sluit">✕ ${Fa.sluiten}</button>
        </header>
        <div class="wk-inhoud">
          <div class="wk-paspop"><div class="wk-canvas"></div></div>
          <div class="wk-rechts"><p class="kast-uitleg"></p><div class="kast-lijst"></div></div>
        </div>
      </div>`,this.laag.appendChild(this.el),document.body.classList.add(`venster-open`),this.paspop=new Xo(this.el.querySelector(`.wk-canvas`)),this.paspop.kleed(Lo.aan),this.el.querySelector(`.wk-sluit`).addEventListener(`click`,()=>this.sluit()),setTimeout(()=>window.addEventListener(`keydown`,this.toetsen),50),this.teken(),this.el.querySelector(`.wk-sluit`).focus({preventScroll:!0}))}teken(){let e=this.el.querySelector(`.kast-lijst`),t=this.el.querySelector(`.kast-uitleg`),n=Lo.gekocht.map(Co).filter(Boolean);if(!n.length){t.textContent=``,e.innerHTML=`<p class="wk-binnenkort">👕 ${Fa.kastLeeg}</p>`;return}t.textContent=Fa.kastUitleg,e.innerHTML=``;for(let t of So){let r=n.filter(e=>e.categorie===t);if(!r.length)continue;let i=document.createElement(`div`);i.className=`kast-rij`,i.innerHTML=`<h3>${Fa.categorieen[t]}</h3>`;let a=document.createElement(`div`);a.className=`kast-vakken`;for(let e of r){let t=Lo.heeftAan(e.id),n=document.createElement(`button`);n.type=`button`,n.className=`kast-item${t?` aan`:``}`,n.innerHTML=`<span class="wk-icoon" style="--kleur:${$o(e.kleur)}">${e.icoon}</span><span>${e.naam}</span><small>${t?Fa.uittrekken:Fa.aantrekken}</small>`,n.addEventListener(`click`,()=>{Lo.wissel(e.id),this.paspop.kleed(Lo.aan),this.geluid?.plop(),this.teken()}),a.appendChild(n)}i.appendChild(a),e.appendChild(i)}}sluit(){this.el&&(window.removeEventListener(`keydown`,this.toetsen),this.paspop.sluit(),this.el.remove(),this.el=null,document.body.classList.remove(`venster-open`),this.opSluiten?.())}},ts=Xa,ns=`staal-blok2-leesmunten`;function rs(e){return`<svg viewBox="0 0 64 48" aria-hidden="true">
    <path d="M20 14 L62 34 L62 46 L28 26 Z" fill="${e}" opacity=".25"/>
    <rect x="6" y="8" width="20" height="14" rx="4" transform="rotate(25 16 15)" fill="${e}"/>
    <rect x="12" y="24" width="4" height="16" fill="${e}"/>
    <rect x="6" y="40" width="16" height="4" rx="2" fill="${e}"/>
  </svg>`}function is(e){let t=parseInt(e.slice(1),16),[n,r,i]=[t>>16,t>>8&255,t&255].map(e=>{let t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4});return 1.05/(.2126*n+.7152*r+.0722*i+.05)>=4.5?`#ffffff`:`#1d2b4f`}function as(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function os(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}var ss=class{constructor(e,{geluid:t,voorlezen:n,beloon:r}){this.laag=e,this.geluid=t,this.voorlezen=n,this.beloon=r,this.el=null,this.opSluiten=null,this.stapels=new Map,this.toetsen=e=>{e.code===`Escape`&&(e.preventDefault(),this.sluit())}}get open(){return!!this.el}toon(){this.el||(this.el=document.createElement(`div`),this.el.className=`winkel-achtergrond`,this.el.innerHTML=`
      <div class="winkel lees" role="dialog" aria-label="${ts.kraamNaam}">
        <header class="wk-kop">
          <span class="wk-logo">${ts.icoon}</span>
          <h2>${ts.kraamNaam}</h2>
          <button type="button" class="wk-sluit">✕ ${ts.klaar}</button>
        </header>
        <div class="lees-inhoud"></div>
      </div>`,this.laag.appendChild(this.el),document.body.classList.add(`venster-open`),this.inhoud=this.el.querySelector(`.lees-inhoud`),this.el.querySelector(`.wk-sluit`).addEventListener(`click`,()=>this.sluit()),window.addEventListener(`keydown`,this.toetsen),this.beurt=`B`,this.toonSoort())}sluit(){this.el&&(this.voorlezen?.stop(),window.removeEventListener(`keydown`,this.toetsen),this.el.remove(),this.el=null,document.body.classList.remove(`venster-open`),this.opSluiten?.())}knop(e,t,n,r=``){let i=document.createElement(`button`);return i.type=`button`,i.className=t,i.innerHTML=e,r&&(i.style.cssText=r),i.addEventListener(`click`,()=>{this.geluid?.plop(),n()}),i}toonSoort(){this.voorlezen?.stop(),this.inhoud.innerHTML=`<h3 class="lees-vraag-titel">${ts.kiesBoek}</h3><div class="lees-soorten"></div>`;let e=this.inhoud.querySelector(`.lees-soorten`);e.append(this.knop(`<span>📖</span>${Qa.verhaal.naam}`,`lees-soort verhaal`,()=>this.toonCategorieen(`verhaal`)),this.knop(`<span>🔎</span>${Qa.info.naam}`,`lees-soort info`,()=>this.toonCategorieen(`info`))),e.firstChild.focus({preventScroll:!0})}toonCategorieen(e){this.voorlezen?.stop(),this.soort=e;let t=Qa[e],n=t.categorieen.length>1;this.inhoud.innerHTML=`<h3 class="lees-vraag-titel">${n?ts.kiesCategorie:ts.kiesInfo}</h3><div class="lees-categorieen"></div><div class="lees-onder"></div>`;let r=this.inhoud.querySelector(`.lees-categorieen`);if(n)t.categorieen.forEach((t,n)=>{r.append(this.knop(t.naam,`lees-categorie`,()=>this.trek({soort:e,cat:n}),`background:${t.kleur};color:${is(t.kleur)}`))});else{let n=t.categorieen[0];r.append(this.knop(`🃏 ${ts.pakKaartje}`,`lees-categorie groot`,()=>this.trek({soort:e,cat:0}),`background:${n.kleur};color:${is(n.kleur)}`))}r.append(this.knop(`🎲 ${ts.verrasMe}`,`lees-categorie verras`,()=>this.trek({soort:e,cat:null}))),this.inhoud.querySelector(`.lees-onder`).append(this.knop(`← ${ts.anderBoek}`,`lees-terug`,()=>this.toonSoort())),r.firstChild.focus({preventScroll:!0})}kaartjesVan({soort:e,cat:t}){let n=Qa[e];return(t===null?n.categorieen:[n.categorieen[t]]).flatMap(e=>e.vragen.map(t=>({vraag:t,naam:e.naam,kleur:e.kleur})))}volgendeUit(e){let t=`${e.soort}-${e.cat??`verras`}`,n=this.kaartjesVan(e),r=this.stapels.get(t);(!r||!r.length)&&(r=as(n.map((e,t)=>t)),n.length>1&&r[r.length-1]===this.laatste?.[t]&&([r[0],r[r.length-1]]=[r[r.length-1],r[0]]),this.stapels.set(t,r));let i=r.pop();return this.laatste={...this.laatste,[t]:i},n[i]}trek(e){this.voorlezen?.stop(),this.keuze=e,this.kaart=this.volgendeUit(e),this.beurt=this.beurt===`A`?`B`:`A`,this.toonKaart(),this.geefMunten()}toonKaart(){let e=this.kaart,t=is(e.kleur);this.inhoud.innerHTML=`
      <div class="lees-beurt beurt-${this.beurt.toLowerCase()}">👥 ${this.beurt===`A`?ts.beurtA:ts.beurtB}</div>
      <div class="lees-kaart-plek">
        <div class="lees-kaart" style="--kaartkleur:${e.kleur};--balktekst:${t}">
          <div class="lees-kant lees-achter"><span>${ts.icoon}</span><b>Spot aan!</b></div>
          <div class="lees-kant lees-voor">
            <div class="lees-balk">${e.naam}</div>
            <p class="lees-tekst">${e.vraag}</p>
            <div class="lees-spot">${rs(e.kleur)}</div>
          </div>
        </div>
      </div>
      <div class="lees-knoppen"></div>`;let n=this.inhoud.querySelector(`.lees-knoppen`),r=this.knop(`🔊`,`lees-luid`,()=>this.leesVoor());r.title=ts.voorlezen,r.setAttribute(`aria-label`,ts.voorlezen),this.voorlezen?.beschikbaar||(r.hidden=!0);let i=this.knop(`${ts.volgend} ▶`,`lees-volgend`,()=>this.trek(this.keuze));n.append(r,i,this.knop(ts.andereCategorie,`lees-terug`,()=>this.soort===`info`?this.toonSoort():this.toonCategorieen(this.soort)),this.knop(ts.klaar,`lees-terug klaar`,()=>this.sluit()));let a=this.inhoud.querySelector(`.lees-kaart`);requestAnimationFrame(()=>requestAnimationFrame(()=>a.classList.add(`omgedraaid`))),i.focus({preventScroll:!0})}leesVoor(){this.kaart&&this.voorlezen?.zeg(this.kaart.vraag,{toonhoogte:1.2,altijd:!0})}geefMunten(){if(!Za.aan||!this.beloon)return;let e={datum:os(),aantal:0};try{let t=JSON.parse(localStorage.getItem(ns));t?.datum===e.datum&&(e=t)}catch{}let t=Za.maxPerDag-e.aantal;if(t<=0)return;let n=Math.min(Za.perKaartje,t);e.aantal+=n;try{localStorage.setItem(ns,JSON.stringify(e))}catch{}this.beloon(n,this.inhoud.querySelector(`.lees-kaart`),`+${n}`)}},cs=class{constructor(e,{geluid:t}){this.laag=e,this.geluid=t,this.el=null,this.opSluiten=null,this.opJa=null,this.toetsen=e=>{e.code===`Escape`&&(e.preventDefault(),this.sluit(!1))}}get open(){return!!this.el}toon(){this.el||(this.el=document.createElement(`div`),this.el.className=`winkel-achtergrond`,this.el.innerHTML=`
      <div class="winkel lees lees-melding" role="alertdialog" aria-label="${ts.kraamNaam}">
        <div class="lees-melding-icoon">✋</div>
        <p class="lees-melding-tekst">${ts.eerstVragen}</p>
        <div class="lees-knoppen">
          <button type="button" class="lees-volgend" data-ja>✓ ${ts.eerstVragenJa}</button>
          <button type="button" class="lees-terug" data-nee>${ts.eerstVragenNee}</button>
        </div>
      </div>`,this.laag.appendChild(this.el),document.body.classList.add(`venster-open`),this.el.querySelector(`[data-ja]`).addEventListener(`click`,()=>this.sluit(!0)),this.el.querySelector(`[data-nee]`).addEventListener(`click`,()=>this.sluit(!1)),setTimeout(()=>window.addEventListener(`keydown`,this.toetsen),50),this.geluid?.plop(),this.el.querySelector(`[data-nee]`).focus({preventScroll:!0}))}sluit(e){this.el&&(window.removeEventListener(`keydown`,this.toetsen),this.el.remove(),this.el=null,document.body.classList.remove(`venster-open`),this.opSluiten?.(),e&&this.opJa?.())}},ls=[`#ff6b6b`,`#ffd43b`,`#69db7c`,`#4dabf7`,`#da77f2`,`#ff922b`],us,ds,fs=[],ps=!1;function ms(){us||(us=document.createElement(`canvas`),us.className=`confetti`,document.body.appendChild(us),ds=us.getContext(`2d`))}function hs(e=90){ms(),us.width=window.innerWidth,us.height=window.innerHeight;let t=us.width/2;for(let n=0;n<e;n++)fs.push({x:t+(Math.random()-.5)*us.width*.5,y:us.height*.35+(Math.random()-.5)*60,vx:(Math.random()-.5)*9,vy:-6-Math.random()*8,draai:Math.random()*Math.PI,vdraai:(Math.random()-.5)*.3,b:8+Math.random()*8,h:5+Math.random()*5,kleur:ls[Math.floor(Math.random()*ls.length)],leven:1});ps||(ps=!0,requestAnimationFrame(gs))}function gs(){ds.clearRect(0,0,us.width,us.height);for(let e of fs)e.vy+=.35,e.vx*=.99,e.x+=e.vx,e.y+=e.vy,e.draai+=e.vdraai,e.y>us.height*.6&&(e.leven-=.02),ds.save(),ds.globalAlpha=Math.max(0,e.leven),ds.translate(e.x,e.y),ds.rotate(e.draai),ds.fillStyle=e.kleur,ds.fillRect(-e.b/2,-e.h/2,e.b,e.h),ds.restore();fs=fs.filter(e=>e.leven>0&&e.y<us.height+30),fs.length?requestAnimationFrame(gs):(ps=!1,ds.clearRect(0,0,us.width,us.height))}var _s=`staal-blok2-voortgang`;function vs(){try{let e=JSON.parse(localStorage.getItem(_s));if(e&&typeof e==`object`)return{niveaus:e.niveaus??e.stempels??{},kampioen:!!e.kampioen,naam:e.naam??``}}catch{}return{niveaus:{},kampioen:!1,naam:``}}var ys=vs();function bs(){try{localStorage.setItem(_s,JSON.stringify(ys))}catch{}}var xs={niveau(e){return ys.niveaus[e]??0},heeftStempel(e){return this.niveau(e)>=3},get aantal(){return Object.keys(ys.niveaus).filter(e=>this.heeftStempel(e)).length},get kampioen(){return ys.kampioen},get naam(){return ys.naam},set naam(e){ys.naam=e,bs()},rondeGehaald(e,t){return t<=this.niveau(e)?null:(ys.niveaus[e]=t,bs(),t>=3?`stempel`:`niveau`)},zetKampioen(){ys.kampioen=!0,bs()},wis(){ys={niveaus:{},kampioen:!1,naam:``},bs()}};function Ss(e,t){let n=[...e];for(let e=n.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[n[e],n[t]]=[n[t],n[e]]}return n.slice(0,t)}function Cs(e){return e[Math.floor(Math.random()*e.length)]}function ws(e){return`★`.repeat(e)+`☆`.repeat(3-e)}function Ts(e,t){let n=e.filter(e=>(e.niveau??1)<=t),r=n.filter(e=>(e.niveau??1)===t),i=Ss(r,t===1?8:Math.min(r.length,5)),a=Ss(n.filter(e=>!i.includes(e)),8-i.length);return Ss([...i,...a],8)}function Y(e,t,n){let r=document.createElement(e);return t&&(r.className=t),n!=null&&(r.innerHTML=n),r}var Es=class e{constructor({laag:e,kraam:t,data:n,opKlaar:r,opSluiten:i,geluid:a,voorlezen:o,beloon:s,muntenTotaal:c}){this.muntenTotaal=c,this.voorlezen=o,this.beloon=s,this.laag=e,this.kraam=t,this.data=n,this.opKlaar=r,this.opSluiten=i,this.geluid=a,this.toetsLuisteraar=e=>this.verwerkToets(e)}start(){window.addEventListener(`keydown`,this.toetsLuisteraar),this.toonNiveauKeuze()}get hoogsteOpen(){return Math.min(3,xs.niveau(this.kraam.data.id)+1)}toonNiveauKeuze(){this.kiesModus=!0,this.wachtOpVolgende=!1;let e=this.hoogsteOpen,t=e;try{t=Number(localStorage.getItem(`staal-niveau-${this.kraam.data.id}`))||e}catch{}t=Math.min(t,e),this.bouwVenster(!1),this.opdrachtEl.textContent=ja.kiesNiveau;let n=Y(`div`,`ms-niveaus`);this.niveauKnoppen=[1,2,3].map(r=>{let i=r>e,a=i?ja.niveauOpSlot.replace(`{sterren}`,ws(r-1)):this.data.niveaus?.[r-1]??``,o=Y(`button`,`ms-niveau${r===t?` vorige`:``}${i?` op-slot`:``}`,`
        <span class="ms-sterren">${ws(r)}</span>
        <span class="ms-niveau-tekst">${a}</span>
        ${i?`<span class="ms-slot" aria-hidden="true">🔒</span>`:`<span class="sneltoets">${r}</span>`}`);return o.type=`button`,o.disabled=i,i&&o.setAttribute(`aria-label`,`${r} sterren: ${a}`),o.addEventListener(`click`,()=>this.beginRonde(r)),n.appendChild(o),o}),this.inhoud.appendChild(n),this.niveauKnoppen[t-1].focus({preventScroll:!0})}beginRonde(e){if(!(e>this.hoogsteOpen)){this.kiesModus=!1,this.niveau=e;try{localStorage.setItem(`staal-niveau-${this.kraam.data.id}`,e)}catch{}this.nr=0,this.inEenKeer=0,this.foutDezeVraag=!1,this.wachtOpVolgende=!1,this.pogingen=0,this.rondeFouten=0,this.reeks=0,this.verdiendAntwoorden=0,this.verdiendReeks=0,this.vragen=this.maakVragen(),this.bouwVenster(!0),this.volgendeVraag()}}maakVragen(){return Ts(this.data.vragen,this.niveau)}bouwVenster(e){this.venster?.remove(),this.venster=Y(`div`,`minispel`),this.venster.style.setProperty(`--kraamkleur`,this.kraam.stijl.bord),this.venster.innerHTML=`
      <div class="ms-kaart ms-${this.kraam.data.id}">
        <header class="ms-kop">
          <span class="ms-icoon">${this.kraam.data.icoon}</span>
          <h2>${this.data.titel}${e?` <span class="ms-kop-sterren">${ws(this.niveau)}</span>`:``}</h2>
          ${this.voorlezen?.beschikbaar?`<button type="button" class="ms-lees" title="Lees voor" aria-label="Lees voor">🔊</button>`:``}
          <button type="button" class="ms-stop">✕ ${ja.stoppen}</button>
        </header>
        <div class="ms-voortgang">${e?`<span></span>`.repeat(8):``}</div>
        <p class="ms-opdracht">${this.niveau>=2&&e&&this.data.opdrachtTypen||this.data.opdracht}</p>
        <div class="ms-inhoud"></div>
        <div class="ms-feedback" aria-live="polite"></div>
      </div>`,this.laag.appendChild(this.venster),this.kaart=this.venster.querySelector(`.ms-kaart`),this.inhoud=this.venster.querySelector(`.ms-inhoud`),this.feedback=this.venster.querySelector(`.ms-feedback`),this.opdrachtEl=this.venster.querySelector(`.ms-opdracht`),this.bolletjes=[...this.venster.querySelectorAll(`.ms-voortgang span`)],this.venster.querySelector(`.ms-stop`).addEventListener(`click`,()=>this.sluit()),this.venster.querySelector(`.ms-lees`)?.addEventListener(`click`,()=>this.leesVraagVoor(!0))}volgendeVraag(){if(this.nr>=8){this.klaar();return}this.foutDezeVraag=!1,this.wachtOpVolgende=!1,this.feedback.className=`ms-feedback`,this.feedback.innerHTML=``,this.bolletjes.forEach((e,t)=>e.classList.toggle(`nu`,t===this.nr)),this.inhoud.innerHTML=``,this.toonVraag(this.vragen[this.nr],this.nr),this.nr===0?this.leesVraagVoor():this.voorleesTekst()&&this.voorlezen?.zeg(this.voorleesTekst())}voorleesTekst(){return``}leesVraagVoor(e=!1){let t=this.kiesModus?ja.kiesNiveau:`${this.opdrachtEl.textContent} ${this.voorleesTekst()}`;this.voorlezen?.zeg(t,{altijd:e})}muntenVoorAntwoord(){let e=Ma.perNiveau[this.niveau-1]??Ma.perNiveau.at(-1),t=this.pogingen===0?1:this.pogingen===1?Ma.tweedePoging:Ma.latereKeer;return Math.round(e*t)}goed(e=``,{automatisch:t=!1}={}){this.foutDezeVraag||this.inEenKeer++;let n=this.muntenVoorAntwoord(),r=0;if(this.pogingen===0?(this.reeks++,this.reeks%Ma.reeksLengte===0&&(r=Ma.reeksBonus)):this.reeks=0,this.pogingen=0,this.bolletjes[this.nr].classList.add(`goed`),this.bolletjes[this.nr].classList.remove(`nu`),this.nr++,this.geluid?.goed(),hs(t?40:90),this.feedback.className=`ms-feedback ms-goed`,this.feedback.innerHTML=`<span><b>${Cs(ja.goed)}</b> ${e}</span>`,n>0){let e=Y(`span`,`ms-munt-badge`,`<span class="munt" aria-hidden="true"></span>+${n}`);this.feedback.firstChild.append(` `,e),this.verdiendAntwoorden+=n,this.beloon?.(n,e,`+${n}`)}if(r){this.verdiendReeks+=r;let e=Na.reeks.replace(`{aantal}`,this.reeks).replace(`{bonus}`,r);setTimeout(()=>this.beloon?.(r,this.bolletjes[this.nr-1]??this.feedback,e),450)}if(t||this.voorlezen?.zeg(this.feedback.querySelector(`b`).textContent),t)return;let i=Y(`button`,`ms-volgende`,this.nr>=8?`Klaar! ▶`:`Volgende ▶`);i.type=`button`,i.addEventListener(`click`,()=>this.volgendeVraag()),this.feedback.appendChild(i),this.wachtOpVolgende=!0,i.focus({preventScroll:!0})}fout(e){this.foutDezeVraag=!0,this.pogingen++,this.rondeFouten++,this.reeks=0,this.geluid?.bijna(),this.feedback.className=`ms-feedback ms-bijna`,this.feedback.offsetWidth,this.feedback.classList.add(`ms-wiebel`),this.feedback.innerHTML=`<span><b>${ja.bijna}</b> ${e}</span>`,this.voorlezen?.zeg(this.feedback.innerHTML.replace(/<s>.*?<\/s>/g,`dat woord`))}klaar(){this.wachtOpVolgende=!1,this.geluid?.klaar(),this.voorlezen?.zeg(ja.klaarTitel),hs(160);let e=((this.niveau>=2&&this.data.opdrachtTypen?null:this.data.klaarTekst)??ja.klaarTekst).replace(`{aantal}`,this.inEenKeer);this.kaart.querySelector(`.ms-opdracht`)?.remove(),this.inhoud.innerHTML=`
      <div class="ms-klaar">
        <div class="ms-klaar-icoon">${this.kraam.data.icoon}</div>
        <h3>${ja.klaarTitel}</h3>
        <p>${e}</p>
        ${this.overzichtHtml()}
        <div class="ms-klaar-knoppen">
          <button type="button" class="ms-opnieuw">↻ ${ja.opnieuw}</button>
          <button type="button" class="ms-ander">${ws(this.niveau)} ${ja.anderNiveau}</button>
          <button type="button" class="ms-terug">${ja.terug} ▶</button>
        </div>
      </div>`,this.feedback.className=`ms-feedback`,this.feedback.innerHTML=``,this.inhoud.querySelector(`.ms-opnieuw`).addEventListener(`click`,()=>this.opnieuw()),this.inhoud.querySelector(`.ms-ander`).addEventListener(`click`,()=>{this.stopSpel?.(),this.toonNiveauKeuze()});let t=this.inhoud.querySelector(`.ms-terug`);if(t.addEventListener(`click`,()=>this.sluit()),t.focus({preventScroll:!0}),this.foutloos){let e=Na.foutloos.replace(`{bonus}`,Ma.foutloosBonus);setTimeout(()=>this.beloon?.(Ma.foutloosBonus,this.inhoud.querySelector(`.ms-foutloos`)??this.inhoud,e),500)}let n=this.hoogsteOpen,r=this.opKlaar?.(this.kraam,{niveau:this.niveau,inEenKeer:this.inEenKeer})??``;this.hoogsteOpen>n&&(r=`${ja.niveauVrij.replace(`{sterren}`,ws(this.hoogsteOpen))}${r?`<br>${r}`:``}`),r&&this.inhoud.querySelector(`.ms-klaar p`).insertAdjacentHTML(`afterend`,`<p class="ms-stempel-bericht">${r}</p>`)}overzichtHtml(){let e=Na;this.foutloos=this.rondeFouten===0;let t=this.foutloos?Ma.foutloosBonus:0,n=(this.muntenTotaal?.()??0)+t,r=(e,t,n,r=``)=>`<div class="${r}"><span>${e} ${t}</span><b>${n}</b></div>`;return`
      <div class="ms-overzicht">
        <h4>${e.overzichtTitel}</h4>
        ${r(`✅`,e.goedeAntwoorden,`8 van 8`)}
        ${r(`⭐`,e.inEenKeer,this.inEenKeer)}
        ${r(`<span class="munt klein" aria-hidden="true"></span>`,e.muntenAntwoorden,`+${this.verdiendAntwoorden}`)}
        ${r(`🔥`,e.reeksBonus,this.verdiendReeks?`+${this.verdiendReeks}`:`–`)}
        ${r(`🏅`,e.foutloosBonus,t?`+${t}`:`–`,t?`ms-foutloos`:``)}
        ${r(`💰`,e.totaal,`<span class="munt" aria-hidden="true"></span> ${n} ${e.munten}`,`ms-totaal`)}
      </div>`}opnieuw(){this.stopSpel?.(),this.beginRonde(this.niveau)}sluit(){this.voorlezen?.stop(),this.stopSpel?.(),window.removeEventListener(`keydown`,this.toetsLuisteraar),this.venster?.remove(),this.venster=null,this.opSluiten?.()}verwerkToets(t){if(t.code===`Escape`){t.preventDefault(),this.sluit();return}if(this.kiesModus){let n=e.cijfer(t);n>=0&&n<3&&this.niveauKnoppen[n].click();return}if(this.wachtOpVolgende&&(t.code===`Enter`||t.code===`Space`||t.code===`NumpadEnter`)){t.preventDefault(),this.volgendeVraag();return}t.target?.tagName!==`INPUT`&&this.toets?.(t)}maakInvoer(e,t=!1){let n=Y(`form`,`ms-invoer-rij`),r=Y(`input`,`ms-invoer${t?` breed`:``}`);Object.assign(r,{type:`text`,autocomplete:`off`,spellcheck:!1,placeholder:ja.typHier}),r.setAttribute(`autocapitalize`,`off`),r.setAttribute(`autocorrect`,`off`);let i=Y(`button`,`ms-controleer`,`${ja.controleer} ✓`);return i.type=`submit`,n.append(r,i),n.addEventListener(`submit`,t=>{t.preventDefault();let n=r.value.trim().toLowerCase().replace(/^-/,``);n&&e(n),r.disabled||r.focus()}),setTimeout(()=>r.focus({preventScroll:!0}),50),{rij:n,invoer:r,knop:i}}static cijfer(e){let t=/^(?:Digit|Numpad)([1-9])$/.exec(e.code);return t?Number(t[1])-1:-1}},Ds=[`t`,`k`,`f`,`s`,`ch`,`p`,`x`];function Os(e){return e.endsWith(`ch`)?`ch`:e.slice(-1)}var ks=class extends Es{toonVraag(e){let t=e.hele.replace(/en$/,``);if(this.vraag={...e,zonderEn:t,letter:Os(t)},this.beantwoord=!1,this.inhoud.append(Y(`div`,`kof-woord`,e.hele)),this.niveau<3&&this.inhoud.append(Y(`div`,`kof-ezelsbrug`,`'t kofschip-x: ${Ds.map(e=>`<span>${e}</span>`).join(``)}`)),this.kisten=[],this.invoer=null,this.niveau>=2){this.niveau===2&&this.inhoud.append(Y(`div`,`ms-hulpje`,`ik-vorm: <b>ik ${e.ik}</b>`));let t=Y(`div`,`kof-typrij`,`<span class="kof-gisteren">Gisteren … ik</span>`);this.invoer=this.maakInvoer(e=>this.controleerGetypt(e),!0),t.appendChild(this.invoer.rij),this.inhoud.appendChild(t);return}let n=Y(`div`,`kof-kisten`);this.kisten=[`te`,`de`].map((e,t)=>{let r=Y(`button`,`kof-kist`,`
        <span class="kof-deksel"></span>
        <span class="kof-bak"><span class="kof-slot"></span></span>
        <span class="kof-label"><span class="sneltoets">${t+1}</span>-${e}</span>`);return r.type=`button`,r.addEventListener(`click`,()=>this.kies(e,r)),n.appendChild(r),r}),this.inhoud.appendChild(n)}voorleesTekst(){return this.vraag.hele}kies(e,t){if(this.beantwoord)return;let n=this.vraag;e===n.uitgang?(this.beantwoord=!0,t.classList.add(`open`),this.kisten.forEach(e=>{e.disabled=!0}),this.goed(`ik ${n.ik}<mark>${n.uitgang}</mark> – wij ${n.ik}<mark>${n.uitgang}n</mark>`)):(t.classList.remove(`wiebel`),t.offsetWidth,t.classList.add(`wiebel`),this.fout(`Haal -en eraf: <b>${n.zonderEn}</b>. De laatste letter is de <mark>${n.letter}</mark>. Zit die in 't kofschip-x?`))}controleerGetypt(e){if(this.beantwoord)return;let t=this.vraag,n=e.replace(/^ik\s+/,``);if(n===t.ik+t.uitgang){this.beantwoord=!0,this.invoer.invoer.disabled=!0,this.invoer.knop.disabled=!0,this.goed(`ik ${t.ik}<mark>${t.uitgang}</mark> – wij ${t.ik}<mark>${t.uitgang}n</mark>`);return}this.wiebel(this.invoer.invoer);let r=n.slice(-2);r!==`te`&&r!==`de`?this.fout(`In de verleden tijd eindigt het woord op <b>-te</b> of <b>-de</b>. Bijvoorbeeld: ik werk<mark>te</mark>.`):n.slice(0,-2)===t.ik?this.fout(`Haal -en eraf: <b>${t.zonderEn}</b>. De laatste letter is de <mark>${t.letter}</mark>. Zit die in 't kofschip-x?`):this.fout(`Kijk goed naar de ik-vorm: <b>ik ${t.ik}</b>. Schrijf die op en zet er -te of -de achter.`)}wiebel(e){e.classList.remove(`wiebel`),e.offsetWidth,e.classList.add(`wiebel`)}toets(e){if(!this.kisten.length)return;let t=Es.cijfer(e),n={KeyT:0,KeyD:1}[e.code],r=t>=0?t:n;(r===0||r===1)&&this.kisten[r].click()}},As=class extends Es{maakVragen(){return Ss(this.niveau===1?this.data.vragen.filter(e=>!e.meer):this.data.vragen,8)}toonVraag(e){let t=e.ik.endsWith(`t`),n=(t?`tte`:`te`)+(e.meer?`n`:``);this.vraag={...e,eindigtOpT:t,antwoord:n,woord:`${e.ik}te${e.meer?`n`:``}`},this.beantwoord=!1;let r=this.niveau===3,[i,a]=r?e.zin.split(/\S*__/):e.zin.split(`__`);if(this.zinEl=Y(`div`,`taart-zin`),this.zinEl.append(document.createTextNode(i),Y(`span`,`taart-gat`,`?`),document.createTextNode(a)),r&&this.zinEl.append(Y(`span`,`ms-hint-werkwoord`,` (${e.hele})`)),this.inhoud.appendChild(this.zinEl),this.knoppen=[],this.invoer=null,this.niveau>=2){this.invoer=this.maakInvoer(e=>r?this.kiesWoord(e):this.kies(e,null),r),this.inhoud.appendChild(this.invoer.rij);return}let o=Y(`div`,`taart-knoppen`),s=[`te`,`tte`];this.knoppen=s.map((e,t)=>{let n=Y(`button`,`taart-knop`,`<span class="taart-kers"></span><span class="taart-tekst">-${e}</span><span class="sneltoets">${t+1}</span>`);return n.type=`button`,n.addEventListener(`click`,()=>this.kies(e,n)),o.appendChild(n),n}),this.inhoud.appendChild(o)}voorleesTekst(){return this.vraag.zin.replace(/\S*__/,e=>e.replace(/\w*__$/,``)+this.vraag.woord)}kiesWoord(e){let t=this.vraag,n=t.eindigtOpT?t.ik.slice(0,-1):t.ik;if(!e.startsWith(n)){this.invoer.invoer.classList.remove(`wiebel`),this.invoer.invoer.offsetWidth,this.invoer.invoer.classList.add(`wiebel`),this.fout(`Begin met de ik-vorm: <b>ik ${t.ik}</b>. Wat komt erachter?`);return}this.kies(e.slice(n.length),null)}kies(e,t){if(this.beantwoord)return;let n=this.vraag;if(e===n.antwoord){this.beantwoord=!0,this.knoppen.forEach(e=>{e.disabled=!0}),t?.classList.add(`gekozen`),this.invoer&&(this.invoer.invoer.disabled=!0,this.invoer.knop.disabled=!0);let r=this.zinEl.querySelector(`.taart-gat`);r.textContent=this.niveau===3?n.woord:e,r.classList.add(`gevuld`),this.goed(`ik ${n.ik} + te${n.meer?`n`:``} = <mark>${n.woord}</mark>`);return}let r=t??this.invoer?.invoer;if(r.classList.remove(`wiebel`),r.offsetWidth,r.classList.add(`wiebel`),!/^t{1,2}en?$/.test(e)){this.fout(this.niveau===3?`Het woord moet eindigen op -te, -ten, -tte of -tten. De ik-vorm is <b>ik ${n.ik}</b>.`:`Typ alleen het stukje dat op de lege plek hoort, bijvoorbeeld <b>te</b> of <b>tte</b>.`);return}e.startsWith(`tt`)===n.eindigtOpT?this.fout(n.meer?`Het gaat om meer personen of dingen. Dan komt er een <mark>n</mark> achter.`:`Het gaat om één persoon of ding. Dan komt er géén n achter.`):this.fout(n.eindigtOpT?`De ik-vorm is <b>ik ${n.ik}</b>. Die eindigt al op een t. Daar komt nog <mark>-te</mark> achter!`:`De ik-vorm is <b>ik ${n.ik}</b>. Daar komt gewoon <mark>-te</mark> achter. Geen extra t!`)}toets(e){let t=Es.cijfer(e);t>=0&&t<this.knoppen.length&&this.knoppen[t].click()}},js=class extends Es{maakVragen(){return[]}volgendeVraag(){if(this.nr>=8){this.stopSpel(),this.klaar();return}this.bolletjes.forEach((e,t)=>e.classList.toggle(`nu`,t===this.nr)),this.veld||(this.niveau>=2?this.bouwTypVeld():this.bouwVeld())}bouwTypVeld(){this.veld=Y(`div`,`drum-veld drum-typveld`),this.trommel=Y(`div`,`drum-trommel`,`<span class="drum-vel"></span><span class="drum-romp"></span>`),this.trommel.style.left=`50%`,this.veld.appendChild(this.trommel),this.inhoud.appendChild(this.veld),this.invoer=this.maakInvoer(e=>this.controleerGetypt(e),!0),this.inhoud.appendChild(this.invoer.rij);let e=this.data.typWoorden.filter(e=>(e.niveau??2)<=this.niveau);this.typLijst=Ss(e,e.length),this.valDuur=this.niveau===2?15:10,this.tijd=0,this.laatste=performance.now(),this.nieuwTypWoord(),this.loopt=!0;let t=e=>{if(!this.loopt)return;let n=Math.min(.05,(e-this.laatste)/1e3);this.laatste=e,this.updateTyp(n),this.frame=requestAnimationFrame(t)};this.frame=requestAnimationFrame(t)}nieuwTypWoord(){if(!this.typLijst.length){let e=this.data.typWoorden.filter(e=>(e.niveau??2)<=this.niveau);this.typLijst=Ss(e,e.length)}let e=this.typLijst.pop(),t=this.niveau===3&&Math.random()<.5;this.typWoord={...e,wij:t,antwoord:e.ik+(t?`den`:`de`)},this.typY=0,this.typKaart?.remove(),this.typKaart=Y(`div`,`drum-woord drum-typkaart`,`${t?`wij`:`ik`} … <small>(${e.hele})</small>`),this.typKaart.style.left=`50%`,this.veld.appendChild(this.typKaart),this.wachtNieuw=!1,this.invoer&&(this.invoer.invoer.disabled=!1,this.invoer.knop.disabled=!1,this.invoer.invoer.value=``,this.invoer.invoer.focus({preventScroll:!0})),this.voorlezen?.zeg(`${t?`wij`:`ik`}, ${e.hele}`)}updateTyp(e){if(this.wachtNieuw||this.nr>=8||!this.typKaart)return;let t=this.veld.clientHeight;if(!t)return;let n=t-this.trommel.offsetHeight-this.typKaart.offsetHeight;this.typY+=n/this.valDuur*e,this.typKaart.style.transform=`translate(-50%, ${this.typY}px)`,this.typY>=n&&(this.wachtNieuw=!0,this.typKaart.classList.add(`te-laat`),this.fout(`Te laat! Het was <mark>${this.typWoord.antwoord}</mark>. Hier komt een nieuw woord.`),this.pogingen=0,this.foutDezeVraag=!1,setTimeout(()=>{this.loopt&&this.nieuwTypWoord()},2200))}controleerGetypt(e){if(this.wachtNieuw||this.nr>=8)return;let t=this.typWoord,n=e.replace(/^(ik|wij)\s+/,``);if(n===t.antwoord){this.wachtNieuw=!0,this.invoer.invoer.disabled=!0,this.typKaart.classList.add(`gevangen`),this.typKaart.innerHTML=`${t.wij?`wij`:`ik`} <b>${t.antwoord}</b>`,this.trommel.classList.remove(`boem`),this.trommel.offsetWidth,this.trommel.classList.add(`boem`),this.goed(`<mark>${t.antwoord}</mark> is goed!`,{automatisch:!0}),this.foutDezeVraag=!1,setTimeout(()=>{this.loopt&&(this.nr>=8?this.volgendeVraag():(this.bolletjes.forEach((e,t)=>e.classList.toggle(`nu`,t===this.nr)),this.nieuwTypWoord()))},900);return}this.invoer.invoer.classList.remove(`wiebel`),this.invoer.invoer.offsetWidth,this.invoer.invoer.classList.add(`wiebel`);let r=t.ik.endsWith(`d`)?` Let op: de ik-vorm eindigt al op een d!`:``;n.startsWith(t.ik)?t.wij&&!n.endsWith(`n`)?this.fout(`Bij <b>wij</b> komt er een <mark>n</mark> achter.${r}`):!t.wij&&n.endsWith(`n`)?this.fout(`Bij <b>ik</b> komt er géén n achter.`):this.fout(`De ik-vorm is <b>ik ${t.ik}</b>. Daar komt <mark>-de</mark> achter.${r}`):this.fout(`Begin met de ik-vorm: <b>ik ${t.ik}</b>.`)}get instelling(){return[{val:.12,extra:.008,kansGoed:.65,tussen:2.2},{val:.17,extra:.012,kansGoed:.55,tussen:1.9},{val:.22,extra:.015,kansGoed:.45,tussen:1.6}][this.niveau-1]}bouwVeld(){this.veld=Y(`div`,`drum-veld`),this.trommel=Y(`div`,`drum-trommel`,`<span class="drum-vel"></span><span class="drum-romp"></span>`),this.veld.appendChild(this.trommel),this.inhoud.appendChild(this.veld),this.inhoud.appendChild(Y(`p`,`drum-tip`,`← → of A en D om te bewegen. Of beweeg met je muis of vinger over het veld.`)),this.woorden=[],this.trommelX=.5,this.doelX=null,this.links=this.rechts=!1,this.pauzeTot=0,this.volgendeWoord=.6,this.tijd=0,this.laatste=performance.now();let e=e=>{let t=this.veld.getBoundingClientRect();this.doelX=Math.min(1,Math.max(0,(e.clientX-t.left)/t.width))};this.veld.addEventListener(`pointerdown`,t=>{this.veld.setPointerCapture(t.pointerId),e(t)}),this.veld.addEventListener(`pointermove`,t=>{(t.pointerType===`mouse`||t.buttons)&&e(t)}),this.toetsLos=e=>{[`ArrowLeft`,`KeyA`].includes(e.code)&&(this.links=!1),[`ArrowRight`,`KeyD`].includes(e.code)&&(this.rechts=!1)},window.addEventListener(`keyup`,this.toetsLos),this.loopt=!0;let t=e=>{if(!this.loopt)return;let n=Math.min(.05,(e-this.laatste)/1e3);this.laatste=e,this.update(n),this.frame=requestAnimationFrame(t)};this.frame=requestAnimationFrame(t)}toets(e){this.niveau>=2||([`ArrowLeft`,`KeyA`].includes(e.code)&&(this.links=!0,this.doelX=null,e.preventDefault()),[`ArrowRight`,`KeyD`].includes(e.code)&&(this.rechts=!0,this.doelX=null,e.preventDefault()))}update(e){let t=this.veld.clientWidth,n=this.veld.clientHeight;if(!t)return;this.tijd+=e;let r=1.3;if(this.links&&(this.trommelX-=r*e),this.rechts&&(this.trommelX+=r*e),this.doelX!=null&&(this.trommelX+=(this.doelX-this.trommelX)*Math.min(1,e*12)),this.trommelX=Math.min(.93,Math.max(.07,this.trommelX)),this.trommel.style.left=`${this.trommelX*100}%`,this.nr>=8||this.tijd<this.pauzeTot)return;this.volgendeWoord-=e,this.volgendeWoord<=0&&this.woorden.length<4&&(this.laatWoordVallen(t),this.volgendeWoord=this.instelling.tussen-Math.min(.6,this.nr*.06));let i=n*(this.instelling.val+this.nr*this.instelling.extra),a=this.trommel.offsetWidth,o=n-this.trommel.offsetHeight,s=this.trommelX*t;for(let r of[...this.woorden]){r.y+=i*e,r.el.style.transform=`translate(-50%, ${r.y}px)`;let c=r.y+r.el.offsetHeight;c>=o+10&&c<o+40&&Math.abs(r.x*t-s)<a/2+10?this.gevangen(r):r.y>n&&this.verwijder(r)}}laatWoordVallen(e){let t=Math.random()<this.instelling.kansGoed,n=this.niveau===1?this.data.fout.filter(e=>(e.niveau??1)===1):this.data.fout,r=Cs(t?this.data.goed:n),i=t?r:r.woord,a;do a=.1+Math.random()*.8;while(this.vorigeX!=null&&Math.abs(a-this.vorigeX)<.22);this.vorigeX=a;let o=Y(`div`,`drum-woord`,i);o.style.left=`${a*100}%`,this.veld.appendChild(o),this.woorden.push({el:o,x:a,y:-50,goed:t,info:r,breedte:e})}gevangen(e){if(this.verwijder(e),this.trommel.classList.remove(`boem`),this.trommel.offsetWidth,this.trommel.classList.add(`boem`),e.goed)this.goed(`<mark>${e.info}</mark> is goed geschreven!`,{automatisch:!0}),this.foutDezeVraag=!1,this.nr>=8?setTimeout(()=>this.volgendeVraag(),900):this.volgendeVraag();else{let t=e.info.goed,n=t.replace(/den?$/,``);this.fout(`<s>${e.info.woord}</s> is fout. Het is <mark>${t}</mark>: ik ${n} + de.`),this.pauzeTot=this.tijd+2.2;for(let e of[...this.woorden])this.verwijder(e);this.volgendeWoord=.4}}verwijder(e){e.el.remove(),this.woorden=this.woorden.filter(t=>t!==e)}stopSpel(){this.loopt=!1,this.typKaart=null,cancelAnimationFrame(this.frame),this.toetsLos&&window.removeEventListener(`keyup`,this.toetsLos),this.veld=null}},Ms=class extends Es{toonVraag(e){this.vraag=e,this.beantwoord=!1;let[t,n]=e.zin.split(`___`);if(this.zinEl=Y(`div`,`vv-zin`),this.zinEl.append(document.createTextNode(t),Y(`span`,`vv-gat`,`…`),document.createTextNode(n)),this.inhoud.appendChild(this.zinEl),this.knoppen=[],this.invoer=null,this.niveau>=2){this.inhoud.appendChild(Y(`div`,`ms-hulpje`,this.niveau===2?`ik-vorm: <b>ik ${e.ik}</b>`:`werkwoord: <b>${e.hele}</b>`)),this.invoer=this.maakInvoer(e=>this.kies(e,null),!0),this.inhoud.appendChild(this.invoer.rij);return}let r=e.opties;if(this.niveau===1){let t=e.opties.find(t=>t!==e.goed&&t.endsWith(`n`)===e.goed.endsWith(`n`))??e.opties.find(t=>t!==e.goed);r=[e.goed,t]}let i=Y(`div`,`vv-opties`);this.knoppen=Ss(r,r.length).map((e,t)=>{let n=Y(`button`,`vv-blok`,`<span class="sneltoets">${t+1}</span>${e}`);return n.type=`button`,n.addEventListener(`click`,()=>this.kies(e,n)),i.appendChild(n),n}),this.inhoud.appendChild(i)}voorleesTekst(){return this.vraag.zin.replace(`___`,this.vraag.goed)}kies(e,t){if(this.beantwoord)return;let n=this.vraag,r=n.goed.slice(n.ik.length);if(e===n.goed){this.beantwoord=!0,this.knoppen.forEach(e=>{e.disabled=!0}),t?.classList.add(`gekozen`),this.invoer&&(this.invoer.invoer.disabled=!0,this.invoer.knop.disabled=!0);let e=this.zinEl.querySelector(`.vv-gat`);e.textContent=n.goed,e.classList.add(`gevuld`),this.goed(`ik ${n.ik} + ${r} = <mark>${n.goed}</mark>`);return}let i=t??this.invoer.invoer;if(i.classList.remove(`wiebel`),i.offsetWidth,i.classList.add(`wiebel`),!e.startsWith(n.ik.slice(0,-1))){this.fout(`Kijk nog eens goed naar het begin van het woord. De ik-vorm is <b>ik ${n.ik}</b>.`);return}let a=e.endsWith(`n`),o=n.goed.endsWith(`n`);if(a!==o)this.fout(o?`Het gaat om meer personen of dingen. Dan komt er een <mark>n</mark> achter.`:`Het gaat om één persoon of ding. Dan komt er géén n achter.`);else{let e=Os(n.ik),t=n.ik.endsWith(`t`)||n.ik.endsWith(`d`)?` Let op: de ik-vorm eindigt al op een ${e}!`:``;this.fout(`De ik-vorm is <b>ik ${n.ik}</b>. De laatste letter is de <mark>${e}</mark>. Zit die in 't kofschip-x? Dan -te, anders -de.${t}`)}}toets(e){let t=Es.cijfer(e);t>=0&&t<this.knoppen.length&&this.knoppen[t].click()}};function Ns(e){return e.toLowerCase().replace(/[.?!,]/g,``).replace(/\s+/g,` `).trim()}var Ps=class extends Es{toonVraag(e){if(this.vraag=e,this.fase=`pv`,this.delen=e.zin.split(`|`).map(e=>e.trim()),this.pvTekst=this.delen[e.pv].replace(/[.?!,]/g,``),this.wieOfWat=e.wieOfWat??`Wie of wat ${this.pvTekst.toLowerCase()}?`,this.zetOpdracht(),this.niveau>=2){this.toonTypVraag();return}let t=Y(`div`,`pof-zin`);this.blokken=this.delen.map((e,n)=>{let r=Y(`button`,`pof-blok`,`<span class="pof-label"></span>${e}`);return r.type=`button`,r.addEventListener(`click`,()=>this.kies(n,r)),t.appendChild(r),r}),this.inhoud.appendChild(t),this.inhoud.appendChild(Y(`div`,`pof-pan`,`<span></span><span></span><span></span><span></span><span></span>`))}zetOpdracht(){if(this.niveau===1){this.opdrachtEl.innerHTML=`Klik op de <b>persoonsvorm</b>.`;return}let e=this.niveau>=2?`Typ`:`Klik op`;this.opdrachtEl.innerHTML=this.fase===`pv`?`<span class="pof-stap pv">Stap 1</span> ${e} de <b>persoonsvorm</b>.`:`<span class="pof-stap ow">Stap 2</span> ${e} het <b>onderwerp</b>. Vraag: <i>${this.wieOfWat}</i>`}toonTypVraag(){let e=Y(`div`,`pof-zin pof-zin-tekst`);this.blokken=this.delen.map(t=>{let n=Y(`span`,`pof-stuk`,`<span class="pof-label"></span>${t}`);return e.appendChild(n),n}),this.inhoud.appendChild(e),this.invoer=this.maakInvoer(e=>this.controleerGetypt(e),!0),this.inhoud.appendChild(this.invoer.rij),this.inhoud.appendChild(Y(`div`,`pof-pan`,`<span></span><span></span><span></span><span></span><span></span>`))}controleerGetypt(e){let t=this.vraag;if(this.fase===`klaar`)return;let n=Ns(e),r=this.delen.flatMap(e=>Ns(e).split(` `));if(this.fase===`pv`){if(n===Ns(this.pvTekst)){this.markeer(t.pv,`is-pv`,`persoonsvorm`),this.fase=`ow`,this.zetOpdracht(),this.invoer.invoer.value=``,this.feedback.className=`ms-feedback ms-goed`,this.feedback.innerHTML=`<span><b>Goed!</b> <mark>${this.pvTekst}</mark> is de persoonsvorm. Typ nu het onderwerp.</span>`;return}this.wiebelInvoer(),r.includes(n)?this.fout(t.pv===0?`Doe de tijdproef: zet de zin in een andere tijd. Welk woord verandert dan?`:`Doe de vraagproef: maak van de zin een vraag. Welk woord komt dan vooraan?`):this.fout(`Typ één woord uit de zin: de persoonsvorm.`);return}let i=Ns(this.delen[t.ow]),a=e=>e.replace(/\s/g,``);if(a(n)===a(i)){this.fase=`klaar`,this.markeer(t.ow,`is-ow`,`onderwerp`),this.invoer.invoer.disabled=!0,this.invoer.knop.disabled=!0,this.goed(`Persoonsvorm: <mark>${this.pvTekst}</mark> · Onderwerp: <mark class="ow">${this.delen[t.ow].replace(/[.?!,]/g,``)}</mark>`);return}this.wiebelInvoer(),n===Ns(this.pvTekst)?this.fout(`Dat is de persoonsvorm al. Typ nu het <b>onderwerp</b>.`):n&&a(i).includes(a(n))?this.fout(`Het onderwerp is langer. Welke woorden horen er nog bij?`):a(n).includes(a(i))?this.fout(`Je hebt te veel woorden getypt. Typ alleen het onderwerp.`):this.fout(`Vraag het jezelf: <b>${this.wieOfWat}</b> Het antwoord is het onderwerp.`)}markeer(e,t,n){this.blokken[e].classList.add(t),this.blokken[e].querySelector(`.pof-label`).textContent=n}wiebelInvoer(){this.invoer.invoer.classList.remove(`wiebel`),this.invoer.invoer.offsetWidth,this.invoer.invoer.classList.add(`wiebel`)}voorleesTekst(){return this.delen.join(` `)}kies(e,t){let n=this.vraag;if(this.fase!==`klaar`){if(this.fase===`pv`){if(e===n.pv){if(t.classList.add(`is-pv`),t.querySelector(`.pof-label`).textContent=`persoonsvorm`,this.niveau===1){this.fase=`klaar`,this.blokken.forEach(e=>{e.disabled=!0}),this.goed(`<mark>${this.pvTekst}</mark> is de persoonsvorm.`);return}this.fase=`ow`,this.zetOpdracht(),this.feedback.className=`ms-feedback ms-goed`,this.feedback.innerHTML=`<span><b>Goed!</b> <mark>${this.pvTekst}</mark> is de persoonsvorm. Zoek nu het onderwerp.</span>`}else this.wiebel(t),this.fout(n.pv===0?`Doe de tijdproef: zet de zin in een andere tijd. Welk woord verandert dan?`:`Doe de vraagproef: maak van de zin een vraag. Welk woord komt dan vooraan?`);return}if(e===n.pv){this.feedback.className=`ms-feedback ms-bijna`,this.feedback.innerHTML=`<span>Dat is de persoonsvorm al. Zoek nu het <b>onderwerp</b>.</span>`;return}if(e===n.ow){this.fase=`klaar`,t.classList.add(`is-ow`),t.querySelector(`.pof-label`).textContent=`onderwerp`,this.blokken.forEach(e=>{e.disabled=!0});let e=this.delen[n.ow].replace(/[.?!,]/g,``);this.goed(`Persoonsvorm: <mark>${this.pvTekst}</mark> · Onderwerp: <mark class="ow">${e}</mark>`)}else this.wiebel(t),this.fout(`Vraag het jezelf: <b>${this.wieOfWat}</b> Het antwoord is het onderwerp.`)}}wiebel(e){e.classList.remove(`wiebel`),e.offsetWidth,e.classList.add(`wiebel`)}toets(e){if(this.niveau>=2)return;let t=Es.cijfer(e);t>=0&&t<this.blokken.length&&this.blokken[t].click()}},Fs=[`#f783ac`,`#fff3bf`,`#8b5a2b`,`#69db7c`,`#ffa94d`,`#b197fc`],Is=class extends Es{toonVraag(e){this.woorden=e.zin.split(/\s+/).map(e=>{let t=/^\*.+\*[.?!,]?$/.test(e),n=e.replace(/\*/g,``);return{tekst:n,kaal:n.replace(/[.?!,]/g,``),werkwoord:t,gevonden:!1}}),this.aantal=this.woorden.filter(e=>e.werkwoord).length,this.gevonden=[];let t=Y(`div`,`ijs-opstelling`),n=Y(`div`,`ijs-zin`),r=this.niveau>=2;this.woorden.forEach((e,t)=>{r?e.el=Y(`span`,`ijs-woord ijs-woord-tekst`,e.tekst):(e.el=Y(`button`,`ijs-woord`,e.tekst),e.el.type=`button`,e.el.addEventListener(`click`,()=>this.kies(e)),e.el.title=`Toets ${t+1}`),n.appendChild(e.el)}),this.hoorntje=Y(`div`,`ijs-hoorntje`,`<div class="ijs-bollen"></div><div class="ijs-hoorn"></div>`),this.bollen=this.hoorntje.querySelector(`.ijs-bollen`),this.teller=Y(`div`,`ijs-teller`),t.append(n,this.hoorntje),this.inhoud.append(t,this.teller),this.invoer=null,r&&(this.invoer=this.maakInvoer(e=>this.controleerGetypt(e),!0),this.inhoud.appendChild(this.invoer.rij)),this.zetTeller(),this.niveau===3&&(this.klaarKnop=Y(`button`,`ms-controleer`,`${ja.klaarKnop} ✓`),this.klaarKnop.type=`button`,this.klaarKnop.addEventListener(`click`,()=>this.controleer()),this.inhoud.appendChild(this.klaarKnop))}zetTeller(){if(this.niveau===3)return;let e=this.aantal-this.gevonden.length,t=this.niveau===2?`Deze zin heeft ${this.aantal} ${this.aantal===1?`werkwoord`:`werkwoorden`}. `:``;this.teller.textContent=e>0?`${t}Nog ${e} te vinden.`:``}voorleesTekst(){return this.woorden.map(e=>e.tekst).join(` `)}kies(e){if(!(e.gevonden||this.gevonden.length===this.aantal)){if(e.werkwoord){if(this.markeerGevonden(e),this.zetTeller(),this.niveau===3)this.feedback.className=`ms-feedback`,this.feedback.innerHTML=``;else if(this.gevonden.length===this.aantal){let e=this.woorden.filter(e=>e.werkwoord).map(e=>e.kaal).join(` `);this.woorden.forEach(e=>{e.el.disabled=!0}),this.goed(`Werkwoordelijk gezegde: <mark>${e}</mark>`)}else this.feedback.className=`ms-feedback ms-goed`,this.feedback.innerHTML=`<span><b>Ja!</b> <mark>${e.kaal}</mark> is een werkwoord. Zijn er nog meer?</span>`}else{e.el.classList.remove(`wiebel`),e.el.offsetWidth,e.el.classList.add(`wiebel`);let t=this.gevonden.length===0?`Tip: zoek eerst de persoonsvorm.`:`Tip: kijk ook naar het eind van de zin. Daar staan vaak nog werkwoorden.`;this.fout(`<b>${e.kaal}</b> is geen werkwoord. ${t}`)}}}controleerGetypt(e){if(this.gevonden.length===this.aantal&&this.niveau!==3)return;let t=e.toLowerCase().replace(/[.?!,]/g,` `).split(/\s+/).filter(Boolean),n=[],r=[];for(let e of t){let t=this.woorden.find(t=>t.kaal.toLowerCase()===e&&!t.gevonden);t?.werkwoord?(this.markeerGevonden(t),r.push(t.kaal)):this.woorden.some(t=>t.kaal.toLowerCase()===e&&t.gevonden)||n.push({t:e,inZin:!!t})}if(this.invoer.invoer.value=``,this.zetTeller(),n.length){this.invoer.invoer.classList.remove(`wiebel`),this.invoer.invoer.offsetWidth,this.invoer.invoer.classList.add(`wiebel`);let e=n[0],t=r.length?`<mark>${r.join(` `)}</mark> ${r.length===1?`is`:`zijn`} goed! `:``;this.fout(e.inZin?`${t}<b>${e.t}</b> is geen werkwoord. Tip: een werkwoord kun je doen, of het hoort bij de persoonsvorm.`:`${t}<b>${e.t}</b> staat niet in de zin. Kijk goed hoe het woord geschreven is.`);return}if(this.niveau!==3&&this.gevonden.length===this.aantal){this.invoer.invoer.disabled=!0,this.invoer.knop.disabled=!0;let e=this.woorden.filter(e=>e.werkwoord).map(e=>e.kaal).join(` `);this.goed(`Werkwoordelijk gezegde: <mark>${e}</mark>`);return}r.length&&(this.feedback.className=`ms-feedback ms-goed`,this.feedback.innerHTML=this.niveau===3?`<span><b>Ja!</b> <mark>${r.join(` `)}</mark>. Heb je ze allemaal? Druk dan op Klaar.</span>`:`<span><b>Ja!</b> <mark>${r.join(` `)}</mark>. Typ de andere werkwoorden erbij.</span>`)}markeerGevonden(e){e.gevonden=!0,e.el.classList.add(`gevonden`),e.el.tagName===`BUTTON`&&(e.el.disabled=!0),this.gevonden.push(e);let t=Y(`div`,`ijs-bol`,e.kaal);t.style.background=Fs[(this.gevonden.length-1)%Fs.length],this.bollen.appendChild(t)}controleer(){if(this.gevonden.length===this.aantal){this.klaarKnop.disabled=!0,this.woorden.forEach(e=>{e.el.disabled=!0}),this.invoer&&(this.invoer.invoer.disabled=!0,this.invoer.knop.disabled=!0);let e=this.woorden.filter(e=>e.werkwoord).map(e=>e.kaal).join(` `);this.goed(`Werkwoordelijk gezegde: <mark>${e}</mark>`)}else{let e=this.aantal-this.gevonden.length;this.fout(`Je mist nog ${e===1?`een werkwoord`:`${e} werkwoorden`}. Kijk ook naar het eind van de zin!`)}}toets(e){if(this.niveau>=2)return;let t=Es.cijfer(e);t>=0&&t<this.woorden.length&&this.woorden[t].el.click()}},Ls=null,Rs=null,zs=!0;try{zs=localStorage.getItem(`staal-geluid`)!==`uit`}catch{}function Bs(){if(!Ls){let e=window.AudioContext||window.webkitAudioContext;if(!e)return null;Ls=new e,Rs=Ls.createGain(),Rs.gain.value=.35,Rs.connect(Ls.destination)}return Ls.state===`suspended`&&Ls.resume(),Ls}for(let e of[`pointerdown`,`keydown`])window.addEventListener(e,()=>{zs&&Bs()},{once:!0,capture:!0});var Vs=e=>440*2**((e-69)/12);function Hs(e,t,n,{type:r=`triangle`,volume:i=.5,glijNaar:a}={}){let o=Bs();if(!o)return;let s=o.currentTime+t,c=o.createOscillator(),l=o.createGain();c.type=r,c.frequency.setValueAtTime(e,s),a&&c.frequency.exponentialRampToValueAtTime(a,s+n),l.gain.setValueAtTime(1e-4,s),l.gain.exponentialRampToValueAtTime(i,s+.02),l.gain.exponentialRampToValueAtTime(1e-4,s+n),c.connect(l).connect(Rs),c.start(s),c.stop(s+n+.05)}function Us(e,t,{volume:n=.4,filter:r=1200}={}){let i=Bs();if(!i)return;let a=i.currentTime+e,o=i.createBuffer(1,Math.ceil(i.sampleRate*t),i.sampleRate),s=o.getChannelData(0);for(let e=0;e<s.length;e++)s[e]=(Math.random()*2-1)*(1-e/s.length);let c=i.createBufferSource();c.buffer=o;let l=i.createBiquadFilter();l.type=`lowpass`,l.frequency.value=r;let u=i.createGain();u.gain.value=n,c.connect(l).connect(u).connect(Rs),c.start(a)}var Ws={get aan(){return zs},set aan(e){zs=e;try{localStorage.setItem(`staal-geluid`,e?`aan`:`uit`)}catch{}e&&Bs()},goed(){zs&&[72,76,79,84].forEach((e,t)=>Hs(Vs(e),t*.08,.25,{volume:.35}))},bijna(){zs&&(Hs(Vs(67),0,.18,{type:`sine`,volume:.3}),Hs(Vs(64),.14,.28,{type:`sine`,volume:.3}))},klaar(){zs&&([[72,0],[72,.12],[72,.24],[76,.36],[79,.6],[84,.84]].forEach(([e,t])=>Hs(Vs(e),t,e===84?.6:.2,{type:`square`,volume:.15})),Hs(Vs(48),.84,.6,{volume:.3}))},stempel(){zs&&(Us(0,.12,{volume:.6,filter:600}),Hs(160,0,.18,{type:`sine`,volume:.6,glijNaar:60}),Hs(Vs(88),.12,.15,{type:`sine`,volume:.2}))},kling(){zs&&(Hs(Vs(88),0,.12,{type:`sine`,volume:.22}),Hs(Vs(95),.05,.3,{type:`sine`,volume:.18}))},slotOpen(){zs&&(Hs(1400,0,.06,{type:`square`,volume:.12}),Hs(900,.05,.08,{type:`square`,volume:.1}),Us(.45,.15,{volume:.5,filter:500}),[72,76,79,84,88].forEach((e,t)=>Hs(Vs(e),.7+t*.1,.35,{type:`triangle`,volume:.25})))},trap(e=.5){zs&&(Hs(180+e*60,0,.12,{type:`sine`,volume:.35+e*.25,glijNaar:70}),Us(0,.06,{volume:.3+e*.3,filter:900}))},juichen(){if(zs){for(let e=0;e<6;e++)Us(e*.25,.5,{volume:.18,filter:1500+e*200});[67,72,76,79].forEach((e,t)=>Hs(Vs(e),.2+t*.12,.3,{type:`square`,volume:.12}))}},woesj(){zs&&(Us(0,.6,{volume:.25,filter:1800}),Hs(300,0,.6,{type:`sine`,volume:.12,glijNaar:900}))},plop(){zs&&Hs(500,0,.1,{type:`sine`,volume:.25,glijNaar:900})},vuurwerk(e=0){zs&&(Hs(400,e,.5,{type:`sine`,volume:.08,glijNaar:1600}),Us(e+.5,.6,{volume:.5,filter:2500}))},feestmuziek(){if(!zs)return;let e=.2,t=[72,74,76,72,76,77,79,0,79,81,79,77,76,72,74,0,72,74,76,72,76,77,79,0,81,79,77,76,74,76,72,0],n=[48,0,55,0,48,0,55,0,53,0,55,0,48,0,55,0];t.forEach((t,n)=>{t&&Hs(Vs(t),n*e,e*.9,{type:`square`,volume:.12})});for(let t=0;t<2;t++)n.forEach((n,r)=>{n&&Hs(Vs(n),(t*16+r)*e,e*1.6,{volume:.35})});for(let t=0;t<32;t+=2)Us(t*e,.05,{volume:.25,filter:5e3})}},Gs=window.speechSynthesis,Ks=null,qs=!0;try{qs=localStorage.getItem(`staal-voorlezen`)!==`uit`}catch{}function Js(){if(!Gs)return;let e=Gs.getVoices();Ks=e.find(e=>e.lang===`nl-NL`&&/google/i.test(e.name))??e.find(e=>e.lang===`nl-NL`)??e.find(e=>e.lang?.toLowerCase().startsWith(`nl`))??null}Gs&&(Js(),Gs.addEventListener?.(`voiceschanged`,Js));function Ys(e){let t=document.createElement(`div`);return t.innerHTML=e.replace(/<br\s*\/?>/gi,`. `).replace(/<\/p>/gi,`. `),t.textContent.replace(/\*\*/g,``).replace(/→/g,`, `).replace(/[–—]/g,`, `).replace(/(^|[\s(])-(\w)/g,`$1$2`).replace(/'t kofschip-x/gi,`'t kofschip x`).replace(/\s+/g,` `).replace(/([.!?])(\s*\.)+/g,`$1`).replace(/\s+,/g,`,`).trim()}var Xs={get beschikbaar(){return!!Gs},get aan(){return qs},set aan(e){qs=e;try{localStorage.setItem(`staal-voorlezen`,e?`aan`:`uit`)}catch{}e||this.stop()},zeg(e,{toonhoogte:t=1,snelheid:n=.95,altijd:r=!1}={}){if(!Gs||!qs&&!r)return Promise.resolve(!1);Gs.cancel();let i=Ys(e);return i?new Promise(e=>{let r=new SpeechSynthesisUtterance(i);r.lang=`nl-NL`,Ks&&(r.voice=Ks),r.pitch=t,r.rate=n,r.onend=()=>e(!0),r.onerror=()=>e(!1),Gs.speak(r)}):Promise.resolve(!1)},stop(){Gs?.cancel()}},Zs={kofschip:ks,taarten:As,drummer:js,voorvoegsel:Ms,poffertjes:Ps,ijs:Is};function Qs(e,t){let n=Zs[e.data.id],r=new n({geluid:Ws,voorlezen:Xs,muntenTotaal:()=>Uo.totaal,...t,kraam:e,data:Aa[e.data.id]});return r.start(),r}var $s=[{shirt:3650125,broek:3422784,pet:14692657,rugzak:null},{shirt:15754645,broek:6061306,pet:null,haar:3875604,kapsel:`staartjes`,rugzak:7651580},{shirt:16766011,broek:4804695,pet:null,haar:14721850,kapsel:`kort`,huid:16241077},{shirt:8675063,broek:2172201,pet:null,haar:8014372,kapsel:`paardenstaart`,rugzak:null},{shirt:1419967,broek:8818326,pet:2172201,huid:13011546,rugzak:16749099},{shirt:16749099,broek:1598635,pet:null,haar:1907997,kapsel:`krullen`,huid:9263675,rugzak:null},{shirt:15092096,broek:3422784,pet:null,haar:13183530,kapsel:`staartjes`,rugzak:null},{shirt:2264038,broek:4804695,pet:null,haar:2824720,kapsel:`kort`,huid:11565136,rugzak:4243543},{shirt:16405074,broek:2853438,pet:1667522,rugzak:16565273},{shirt:2148759,broek:6241732,pet:null,haar:15911244,kapsel:`paardenstaart`,huid:16241077},{shirt:11384253,broek:1598635,pet:null,haar:6044186,kapsel:`krullen`,rugzak:14692657},{shirt:13393384,broek:3422784,pet:null,haar:1907997,kapsel:`staartjes`,huid:10512714}],ec=2.4,tc=class{constructor(e,t,n,r,i){this.naam=n,this.botsing=t,this.figuur=new Ta(e,{...r,snelheid:ec}),this.figuur.groep.scale.setScalar(.88),this.figuur.positie.copy(i),this.figuur.richting=Math.random()*Math.PI*2,this.figuur.groep.traverse(e=>{e.isMesh&&(e.userData.geenKlik=!1),e.userData.kind=this}),this.toestand=`wacht`,this.timer=Math.random()*3,this.doel=null,this.vastTijd=0,this.uitspraken=[],this.springNu=!1}get positie(){return this.figuur.positie}kiesDoel(){for(let e=0;e<30;e++){let e=Math.random()<.3,t=e?40:12,n=e?U.randFloat(Vi.minX+3,Vi.maxX-3):this.positie.x+U.randFloatSpread(t),r=e?U.randFloat(-18,Vi.maxZ-3):this.positie.z+U.randFloatSpread(t);if(!(r<-19)&&this.botsing.isVrij(n,r,.8))return new v(n,0,r)}return null}praat(e){return this.uitspraken.length||(this.uitspraken=Ss(Wa.uitspraken,Wa.uitspraken.length)),this.toestand=`praat`,this.timer=4.5,this.springNu=!0,this.kijkNaar(e),this.uitspraken.pop()}kijkNaar(e){this.figuur.richting=Math.atan2(e.x-this.positie.x,e.z-this.positie.z)}update(e,t){let n={x:0,z:0};if(this.timer-=e,this.toestand===`praat`)this.kijkNaar(t),this.timer<=0&&(this.toestand=`wacht`,this.timer=1+Math.random()*2);else if(this.toestand===`wacht`)this.timer<=0&&(this.doel=this.kiesDoel(),this.doel?(this.toestand=`loop`,this.vastTijd=0):this.timer=1);else if(this.toestand===`loop`){let e=this.doel.x-this.positie.x,r=this.doel.z-this.positie.z,i=Math.hypot(e,r),a=Math.hypot(t.x-this.positie.x,t.z-this.positie.z)<1.3;i<.4?(this.toestand=`wacht`,this.timer=1.5+Math.random()*4):a||(n={x:e/i,z:r/i})}let r=this.figuur.update(e,n,this.springNu,this.botsing);this.springNu=!1,this.toestand===`loop`&&(n.x||n.z)&&(this.vastTijd=r<.01?this.vastTijd+e:0,this.vastTijd>.6&&(this.toestand=`wacht`,this.timer=.3))}},nc=class{constructor(e,t,n,r,i){this.voorlezen=i,this.camera=r,this.lijst=[];let a=Wa.namen;for(let n=0;n<a.length;n++){let r=null;for(let e=0;e<50&&!r;e++){let e=U.randFloat(-34,34),n=U.randFloat(-17,27);t.isVrij(e,n,1)&&Math.hypot(e,n-22)>5&&(r=new v(e,0,n))}this.lijst.push(new tc(e,t,a[n],$s[n%$s.length],r??new v(n*3-12,0,18)))}this.ballon=document.createElement(`div`),this.ballon.className=`tekstballon`,n.appendChild(this.ballon),this.ballonKind=null,this.ballonTijd=0,this._v=new v}dichtsteBij(e,t){let n=null,r=t;for(let t of this.lijst){let i=Math.hypot(t.positie.x-e.x,t.positie.z-e.z);i<r&&(n=t,r=i)}return n}spreekAan(e,t){let n=e.praat(t);this.voorlezen?.zeg(n,{toonhoogte:1.5,snelheid:1.05}),this.ballon.innerHTML=`<b>${e.naam}</b>${n}`,this.ballon.classList.add(`zichtbaar`),this.ballonKind=e,this.ballonTijd=4.5}verbergBallon(){this.ballonKind=null,this.ballon.classList.remove(`zichtbaar`)}juich(e){this.juichTijd=e}update(e,t){if(this.juichTijd>0){this.juichTijd-=e;for(let t of this.lijst)Math.random()<e*1.6&&(t.springNu=!0)}for(let n of this.lijst){n.update(e,t.positie);let r=n.positie.x-t.positie.x,i=n.positie.z-t.positie.z,a=Math.hypot(r,i);a<.85&&a>1e-4&&(n.positie.x=t.positie.x+r/a*.85,n.positie.z=t.positie.z+i/a*.85)}if(this.ballonKind){this.ballonTijd-=e;let n=this.ballonKind,r=Math.hypot(n.positie.x-t.positie.x,n.positie.z-t.positie.z)>8;if(this.ballonTijd<=0||r)this.verbergBallon();else{this._v.set(n.positie.x,n.positie.y+2.4,n.positie.z).project(this.camera);let e=this._v.z>1;this.ballon.style.left=`${(this._v.x+1)/2*window.innerWidth}px`,this.ballon.style.top=`${(1-this._v.y)/2*window.innerHeight}px`,this.ballon.style.visibility=e?`hidden`:``}}}},rc=`staal-blok2-meesters`;function ic(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function ac(){try{let e=JSON.parse(localStorage.getItem(rc))??{};for(let[t,n]of Object.entries(e))typeof n==`number`&&(e[t]={wachttot:n,datum:ic(),aantal:1});return e}catch{return{}}}var oc=class extends tc{constructor(e,t,n,r){super(e,t,n.naam,{...n.uiterlijk,snelheid:2},r),this.info=n,this.isMeester=!0,this.vraagFase=Math.random()*6,this.figuur.groep.scale.setScalar(1.12),this.bouwExtras(),this.maakVraagteken()}bouwExtras(){let{hoofd:e,model:t}=this.figuur,n=this.info.extra??[];if(n.includes(`bril`)){for(let t of[-.13,.13]){let n=new H(new Be(.09,.016,6,16),F(2236962));n.position.set(t,.06,.34),e.add(n)}P(.08,.02,.02,2236962,0,.07,.35,e)}if(n.includes(`keycord`)){let e=new H(new Be(.2,.015,4,16,Math.PI),F(14692657));e.rotation.z=Math.PI,e.position.set(0,1.55,.36),t.add(e),P(.16,.2,.02,16777215,0,1.3,.38,t)}if(n.includes(`baard`)&&(B(.27,this.info.uiterlijk.haar,0,-.22,.13,e,1).scale.set(1.1,.8,.75),P(.12,.03,.02,11546672,0,-.08,.36,e)),n.includes(`vlinderdas`))for(let e of[-1,1]){let n=new H(new o(.08,.15,6),F(16429061));n.rotation.z=e*Math.PI/2,n.position.set(e*.08,1.56,.33),t.add(n)}if(n.includes(`fluitje`)){let e=new H(new Be(.2,.012,4,16,Math.PI),F(1867478));e.rotation.z=Math.PI,e.position.set(0,1.55,.36),t.add(e),I(.04,.12,11384253,0,1.33,.39,t,8).rotation.x=Math.PI/2}this.figuur.groep.traverse(e=>{e.isMesh&&(e.userData.geenKlik=!1,e.userData.kind=this)})}maakVraagteken(){let e=Qe(64,64,e=>{e.fillStyle=`#ffd43b`,e.beginPath(),e.arc(32,32,29,0,Math.PI*2),e.fill(),e.lineWidth=5,e.strokeStyle=`#1d2b4f`,e.stroke(),e.fillStyle=`#1d2b4f`,e.font=`bold 40px "Trebuchet MS", sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`?`,32,35)});this.vraagteken=new M(new f({map:e,depthTest:!1})),this.vraagteken.scale.set(.55,.55,1),this.vraagteken.position.y=2.75,this.vraagteken.renderOrder=5,this.vraagteken.userData.geenKlik=!0,this.figuur.groep.add(this.vraagteken)}houVast(e){this.toestand=`praat`,this.timer=9999,this.kijkNaar(e)}laatLos(){this.toestand=`wacht`,this.timer=1.5}},sc=class{constructor(e,t,n,r,i){this.camera=r,this.voorlezen=i,this.stand=ac();let a=[[-14,20],[16,6],[-4,-12]];this.lijst=Ia.map((n,r)=>{let[i,o]=a[r%a.length];return new oc(e,t,n,new v(i,0,o))}),this.ballon=document.createElement(`div`),this.ballon.className=`tekstballon meester`,n.appendChild(this.ballon),this.ballonMeester=null,this.ballonTijd=0,this._v=new v}standVan(e){let t=this.stand[e.info.id];return!t||t.datum!==ic()?{wachttot:0,datum:ic(),aantal:0}:t}genoegVandaag(e){return this.standVan(e).aantal>=La.maxPerDag}heeftVraag(e){return!this.genoegVandaag(e)&&this.standVan(e).wachttot<=Date.now()}startWachttijd(e){let t=this.standVan(e);this.stand[e.info.id]={wachttot:Date.now()+La.wachtMinuten*6e4,datum:ic(),aantal:t.aantal+1};try{localStorage.setItem(rc,JSON.stringify(this.stand))}catch{}}minutenTeGaan(e){return Math.max(1,Math.ceil((this.standVan(e).wachttot-Date.now())/6e4))}dichtsteBij(e,t){let n=null,r=t;for(let t of this.lijst){let i=Math.hypot(t.positie.x-e.x,t.positie.z-e.z);i<r&&(n=t,r=i)}return n}zeg(e,t,n){e.praat(n),e.springNu=!1,this.ballon.innerHTML=`<b>${e.info.naam}</b>${t}`,this.ballon.classList.add(`zichtbaar`),this.ballonMeester=e,this.ballonTijd=4.5,this.voorlezen?.zeg(t,{toonhoogte:e.info.stem})}verbergBallon(){this.ballonMeester=null,this.ballon.classList.remove(`zichtbaar`)}wis(){this.stand={};try{localStorage.removeItem(rc)}catch{}}update(e,t){for(let n of this.lijst){n.update(e,t.positie),n.vraagteken.visible=this.heeftVraag(n)&&n.toestand!==`praat`,n.vraagteken.position.y=2.75+Math.sin(performance.now()/400+n.vraagFase)*.06;let r=n.positie.x-t.positie.x,i=n.positie.z-t.positie.z,a=Math.hypot(r,i);a<.95&&a>1e-4&&(n.positie.x=t.positie.x+r/a*.95,n.positie.z=t.positie.z+i/a*.95)}if(this.ballonMeester){this.ballonTijd-=e;let t=this.ballonMeester;this.ballonTijd<=0?this.verbergBallon():(this._v.set(t.positie.x,t.positie.y+2.9,t.positie.z).project(this.camera),this.ballon.style.left=`${(this._v.x+1)/2*window.innerWidth}px`,this.ballon.style.top=`${(1-this._v.y)/2*window.innerHeight}px`,this.ballon.style.visibility=this._v.z>1?`hidden`:``)}}};function cc(e){return e.toLowerCase().replace(/[.?!,]/g,` `).replace(/\s+/g,` `).trim()}var lc=e=>cc(e).replace(/^(ik|wij|jij|hij|zij|jullie)\s+/,``),uc=e=>e.filter(e=>(e.niveau??1)<=2);function dc(){return{vakken:1,...fc()}}function fc(){let e=Cs(Object.keys(La.onderwerpen)),t=La.onderwerpen[e],n={onderwerp:e,intro:t.intro,hint:t.hint};switch(e){case`kofschip`:{let e=Cs(uc(Aa.kofschip.vragen)),t=e.ik+e.uitgang;return{...n,vraag:La.vraagVerleden,voorbeeld:`ik … <span class="mv-werkwoord">(${e.hele})</span>`,controleer:e=>lc(e)===t,antwoord:`ik ${t}`,uitleg:`${e.hele} → ${e.hele.replace(/en$/,``)} → ik ${e.ik} + ${e.uitgang} = <mark>${t}</mark>`}}case`taarten`:{let e=Cs(Aa.taarten.vragen),t=`${e.ik}te${e.meer?`n`:``}`,r=e.zin.replace(/\S*__/,`…`);return{...n,vraag:La.vraagZin,voorbeeld:`${r} <span class="mv-werkwoord">(${e.hele})</span>`,controleer:e=>lc(e)===t,antwoord:t,uitleg:`ik ${e.ik} + te${e.meer?`n`:``} = <mark>${t}</mark>`}}case`drummer`:{let e=Cs(Aa.drummer.typWoorden),t=`${e.ik}de`;return{...n,vraag:La.vraagVerleden,voorbeeld:`ik … <span class="mv-werkwoord">(${e.hele})</span>`,controleer:e=>lc(e)===t,antwoord:`ik ${t}`,uitleg:`ik ${e.ik} + de = <mark>${t}</mark>`}}case`voorvoegsel`:{let e=Cs(Aa.voorvoegsel.vragen),t=e.goed.slice(e.ik.length);return{...n,vraag:La.vraagZin,voorbeeld:`${e.zin.replace(`___`,`…`)} <span class="mv-werkwoord">(${e.hele})</span>`,controleer:t=>lc(t)===e.goed,antwoord:e.goed,uitleg:`ik ${e.ik} + ${t} = <mark>${e.goed}</mark>`}}case`poffertjes`:{let e=Cs(uc(Aa.poffertjes.vragen)),t=e.zin.split(`|`).map(e=>e.trim()),r=t.join(` `),i=t[e.pv].replace(/[.?!,]/g,``),a=t[e.ow].replace(/[.?!,]/g,``),o=Math.random()<.5;return{...n,hint:o?La.hintOw:La.hintPv,vraag:o?La.vraagOw:La.vraagPv,voorbeeld:r,vakken:(o?a:i).split(/\s+/).length,controleer:e=>cc(e)===cc(o?a:i),antwoord:o?a:i,uitleg:o?`Wie of wat ${i.toLowerCase()}? → <mark>${a}</mark>`:`De persoonsvorm is <mark>${i}</mark>.`}}default:{let e=Cs(uc(Aa.ijs.vragen)),t=(e.zin.match(/\*([^*]+)\*/g)??[]).map(e=>e.replace(/\*/g,``).toLowerCase()),r=e.zin.replace(/\*/g,``),i=e=>[...e].sort().join(` `);return{...n,vraag:La.vraagWwg,voorbeeld:r,vakken:t.length,controleer:e=>i(cc(e).split(` `))===i(t),antwoord:t.join(` `),uitleg:`Werkwoordelijk gezegde: <mark>${t.join(` `)}</mark>`}}}}var pc=class{constructor(e,{geluid:t,voorlezen:n,beloon:r}){this.laag=e,this.geluid=t,this.voorlezen=n,this.beloon=r,this.el=null,this.opSluiten=null,this.toetsen=e=>{e.code===`Escape`&&(e.preventDefault(),this.sluit())}}get open(){return!!this.el}toon(e){if(this.el)return;this.meester=e,this.vraag=dc(),this.pogingen=0,this.klaar=!1;let t=La;this.el=document.createElement(`div`),this.el.className=`dialoog meestervraag zichtbaar`,this.el.setAttribute(`role`,`dialog`),this.el.innerHTML=`
      <div class="dialoog-kop"><span class="dialoog-icoon">🧑‍🏫</span><span class="dialoog-naam">${e.info.naam}</span></div>
      <div class="dialoog-tekst">
        <p>${e.info.begroeting} ${this.vraag.intro}</p>
        <p><b>${this.vraag.vraag}</b></p>
        <div class="voorbeeld mv-vraag">${this.vraag.voorbeeld}</div>
      </div>
      <form class="ms-invoer-rij mv-invoer">
        <div class="mv-vakken">${Array.from({length:this.vraag.vakken},(e,t)=>`<input class="ms-invoer${this.vraag.vakken===1?` breed`:` mv-vak`}" type="text" autocomplete="off" spellcheck="false" aria-label="Woord ${t+1}" placeholder="${this.vraag.vakken===1?`Typ hier…`:`woord ${t+1}`}">`).join(``)}</div>
        <button type="submit" class="ms-controleer">${t.controleer} ✓</button>
      </form>
      <div class="ms-feedback mv-feedback" aria-live="polite"></div>
      <div class="dialoog-knoppen"><button type="button" class="knop-doei mv-doei">${t.doei}</button></div>`,this.laag.appendChild(this.el),document.body.classList.add(`in-gesprek`),this.vakken=[...this.el.querySelectorAll(`.ms-invoer`)],this.invoer=this.vakken[0],this.vakken.forEach((e,t)=>{e.setAttribute(`autocapitalize`,`off`),e.addEventListener(`keydown`,n=>{n.key===` `&&t<this.vakken.length-1?(n.preventDefault(),e.value.trim()&&this.vakken[t+1].focus()):n.key===`Backspace`&&!e.value&&t>0&&(n.preventDefault(),this.vakken[t-1].focus())})}),this.feedback=this.el.querySelector(`.mv-feedback`),this.doeiKnop=this.el.querySelector(`.mv-doei`),this.el.querySelector(`form`).addEventListener(`submit`,e=>{e.preventDefault();let t=this.vakken.map(e=>e.value.trim()),n=this.vakken.find(e=>!e.value.trim());if(n){n.focus();return}this.controleer(t.join(` `))}),this.doeiKnop.addEventListener(`click`,()=>this.sluit()),window.addEventListener(`keydown`,this.toetsen),setTimeout(()=>this.invoer?.focus({preventScroll:!0}),60),this.geluid?.plop(),this.voorlezen?.zeg(this.el.querySelector(`.dialoog-tekst`).innerHTML.replace(/…/g,`, puntje puntje, `),{toonhoogte:e.info.stem})}controleer(e){if(this.klaar)return;let t=La;if(this.vraag.controleer(e)){this.klaar=!0;let e=this.pogingen===0?t.beloning:t.tweedePoging,n=Cs(t.goed);this.feedback.className=`ms-feedback mv-feedback ms-goed`,this.feedback.innerHTML=`<span><b>${n}</b> ${this.vraag.uitleg} <span class="ms-munt-badge"><span class="munt" aria-hidden="true"></span>+${e}</span></span>`,this.geluid?.goed(),this.beloon?.(e,this.feedback.querySelector(`.ms-munt-badge`),`+${e}`),this.voorlezen?.zeg(n,{toonhoogte:this.meester.info.stem}),this.rondAf();return}this.pogingen++;for(let e of this.vakken)e.classList.remove(`wiebel`),e.offsetWidth,e.classList.add(`wiebel`);if(this.pogingen===1){let e=this.vraag.hint?` ${this.vraag.hint}`:``;this.feedback.className=`ms-feedback mv-feedback ms-bijna`,this.feedback.innerHTML=`<span><b>${t.nogEens}</b>${e}</span>`,this.geluid?.bijna(),this.voorlezen?.zeg(this.feedback.textContent,{toonhoogte:this.meester.info.stem}),this.vakken[0].focus(),this.vakken[0].select();return}this.klaar=!0;let n=t.helaas.replace(`{antwoord}`,`<mark>${this.vraag.antwoord}</mark>`);this.feedback.className=`ms-feedback mv-feedback ms-bijna`,this.feedback.innerHTML=`<span>${n}<br>${this.vraag.uitleg}</span>`,this.voorlezen?.zeg(this.feedback.textContent,{toonhoogte:this.meester.info.stem}),this.rondAf()}rondAf(){for(let e of this.vakken)e.disabled=!0;this.el.querySelector(`.ms-controleer`).disabled=!0,this.doeiKnop.textContent=La.bedankt,this.doeiKnop.classList.add(`mv-bedankt`),this.doeiKnop.focus({preventScroll:!0})}sluit(){this.el&&(window.removeEventListener(`keydown`,this.toetsen),this.voorlezen?.stop(),this.el.remove(),this.el=null,document.body.classList.remove(`in-gesprek`),this.opSluiten?.(this.meester))}},mc=class{constructor(e,t){this.el=document.createElement(`div`),this.el.className=`stempelkaart`,this.el.innerHTML=`
      <div class="sk-kop">Stempelkaart <span class="sk-teller"></span></div>
      <div class="sk-vakjes">
        ${ka.map(e=>`
          <div class="sk-vak" data-id="${e.id}" data-naam="${e.kraamNaam}" style="--kleur:${t[e.id]}">
            <span class="sk-icoon">${e.icoon}</span>
            <span class="sk-sterren"></span>
          </div>`).join(``)}
      </div>
      <button type="button" class="sk-oorkonde">🏆 Bekijk je oorkonde</button>`,e.appendChild(this.el),this.teller=this.el.querySelector(`.sk-teller`),this.oorkondeKnop=this.el.querySelector(`.sk-oorkonde`),this.opOorkonde=null,this.oorkondeKnop.addEventListener(`click`,()=>this.opOorkonde?.()),this.ververs()}ververs(){for(let e of this.el.querySelectorAll(`.sk-vak`)){let t=xs.niveau(e.dataset.id);e.classList.toggle(`gestempeld`,xs.heeftStempel(e.dataset.id)),e.querySelector(`.sk-sterren`).textContent=t?ws(t):``,e.title=`${e.dataset.naam}: ${t} van de 3 niveaus`}this.teller.textContent=`${xs.aantal}/6`,this.oorkondeKnop.hidden=!xs.kampioen}voortgangGemaakt(e){this.ververs();let t=this.el.querySelector(`.sk-vak[data-id="${e}"]`);t.classList.remove(`wip`),t.offsetWidth,t.classList.add(`wip`)}stempel(e){this.ververs();let t=this.el.querySelector(`.sk-vak[data-id="${e}"]`);t.classList.remove(`stempelt`),t.offsetWidth,t.classList.add(`stempelt`)}},hc=class{constructor(e){this.laag=e,this.el=null,this.opSluiten=null}get open(){return!!this.el}toon(){if(this.el)return;let e=new Date().toLocaleDateString(`nl-NL`,{day:`numeric`,month:`long`,year:`numeric`});this.el=document.createElement(`div`),this.el.className=`oorkonde-achtergrond`,this.el.innerHTML=`
      <div class="oorkonde" role="dialog" aria-label="Oorkonde">
        <div class="ok-binnen">
          <div class="ok-beker">🏆</div>
          <h2>${J.oorkondeTitel}</h2>
          <p class="ok-school">${J.oorkondeSchool}</p>
          <p>${J.oorkondeVoor}</p>
          <input class="ok-naam" type="text" maxlength="30" placeholder="${J.oorkondeNaam}" value="${xs.naam.replace(/"/g,`&quot;`)}" autocomplete="off" spellcheck="false">
          <p>${J.oorkondeTekst}</p>
          <div class="ok-kramen">
            ${ka.map(e=>`<div><span>${e.icoon}</span><small>${ws(Math.max(1,xs.niveau(e.id)))}</small></div>`).join(``)}
          </div>
          <div class="ok-onder">
            <span>${e}</span>
            <span class="ok-handtekening">${J.oorkondeHandtekening}</span>
          </div>
        </div>
        <div class="ok-knoppen">
          <button type="button" class="ok-print">🖨️ ${J.oorkondePrint}</button>
          <button type="button" class="ok-verder">${J.oorkondeVerder} ▶</button>
        </div>
      </div>`,this.laag.appendChild(this.el),document.body.classList.add(`oorkonde-open`);let t=this.el.querySelector(`.ok-naam`);t.addEventListener(`input`,()=>{xs.naam=t.value}),t.addEventListener(`keydown`,e=>e.stopPropagation()),this.el.querySelector(`.ok-print`).addEventListener(`click`,()=>window.print()),this.el.querySelector(`.ok-verder`).addEventListener(`click`,()=>this.sluit()),setTimeout(()=>(xs.naam?this.el?.querySelector(`.ok-verder`):t)?.focus({preventScroll:!0}),300)}sluit(){this.el?.remove(),this.el=null,document.body.classList.remove(`oorkonde-open`),this.opSluiten?.()}};function gc(e,t,n){let r=document.createElement(`div`);r.className=`startscherm`;let i=xs.aantal>0;r.innerHTML=`
    <div class="ss-kaart">
      <div class="ss-iconen">🏴‍☠️ 🎂 🥁 🔤 🥞 🍦</div>
      <h1>${J.startTitel}</h1>
      <p class="ss-sub">${J.startOndertitel}</p>
      <p>${J.startUitleg}</p>
      <p class="ss-extra">${J.startExtra}</p>
      ${i?`<p class="ss-verder">${J.startVerder.replace(`{aantal}`,xs.aantal)}</p>`:``}
      <button type="button" class="ss-knop">${i?J.startKnopVerder:J.startKnop} ▶</button>
      ${Ha.leerkrachtCode?`
        <button type="button" class="ss-leerkracht">${Ua.knop}</button>
        <form class="ss-code" hidden>
          <p>${Ua.uitleg}</p>
          <input type="password" autocomplete="off" placeholder="${Ua.plaatshouder}" aria-label="${Ua.plaatshouder}">
          <button type="submit">${Ua.ok}</button>
          <p class="ss-code-uitslag" aria-live="polite"></p>
        </form>`:``}
    </div>`,e.appendChild(r),document.body.classList.add(`start-open`);let a=r.querySelector(`.ss-knop`);a.focus({preventScroll:!0}),a.addEventListener(`click`,()=>{r.classList.add(`weg`),document.body.classList.remove(`start-open`),setTimeout(()=>r.remove(),400),t()});let o=r.querySelector(`.ss-leerkracht`),s=r.querySelector(`.ss-code`);if(o&&s){let e=s.querySelector(`input`),t=s.querySelector(`.ss-code-uitslag`);o.addEventListener(`click`,()=>{s.hidden=!s.hidden,s.hidden||e.focus()}),e.addEventListener(`keydown`,e=>e.stopPropagation()),s.addEventListener(`submit`,r=>{r.preventDefault();let i=n?.(e.value);t.textContent=i?Ua.goed:Ua.fout,t.classList.toggle(`goed`,!!i),e.value=``,i&&(a.textContent=`${J.startKnopVerder} ▶`)})}}var _c=[15744574,16429061,3120708,1867478,11419337,16213767,15092096],vc=class{constructor(e,t){this.scene=e,this.geluid=t,this.pijlen=[],this.bursts=[],this.tijdOver=0,this.volgende=0,this.pijlGeo=new ft(.15,6,4);let n=document.createElement(`canvas`);n.width=n.height=32;let r=n.getContext(`2d`),i=r.createRadialGradient(16,16,0,16,16,16);i.addColorStop(0,`#fff`),i.addColorStop(.5,`#fff`),i.addColorStop(1,`rgba(255,255,255,0)`),r.fillStyle=i,r.fillRect(0,0,32,32),this.vonk=new ve(n)}start(e=12,t=null){this.midden=t,this.tijdOver=e,this.volgende=0}get bezig(){return this.tijdOver>0||this.pijlen.length||this.bursts.length}lanceer(){let e=_c[Math.floor(Math.random()*_c.length)],t=new H(this.pijlGeo,new nt({color:e})),n=this.midden??new v,r=this.richting??new v(0,0,-1),i=new v(-r.z,0,r.x);t.position.copy(n).addScaledVector(r,U.randFloat(12,24)).addScaledVector(i,U.randFloatSpread(26)).setY(1),t.userData={vy:U.randFloat(13,16),kleur:e,hoogte:U.randFloat(7,11)},this.scene.add(t),this.pijlen.push(t),this.geluid?.vuurwerk()}ontplof(e,t){let n=new Float32Array(330),r=[];for(let t=0;t<110;t++){n.set([e.x,e.y,e.z],t*3);let i=new v().randomDirection().multiplyScalar(U.randFloat(5,9));r.push(i)}let i=new Fe;i.setAttribute(`position`,new z(n,3));let a=new Te({color:t,size:1.6,map:this.vonk,alphaTest:.3,transparent:!0,opacity:1,depthWrite:!1}),o=new vt(i,a);o.userData={snelheden:r,leven:1.8},this.scene.add(o),this.bursts.push(o)}update(e){this.tijdOver>0&&(this.tijdOver-=e,this.volgende-=e,this.volgende<=0&&(this.lanceer(),this.volgende=U.randFloat(.35,.8)));for(let t of[...this.pijlen])t.position.y+=t.userData.vy*e,t.userData.vy*=.985,t.position.y>=t.userData.hoogte&&(this.ontplof(t.position,t.userData.kleur),this.scene.remove(t),t.material.dispose(),this.pijlen.splice(this.pijlen.indexOf(t),1));for(let t of[...this.bursts]){let n=t.userData;n.leven-=e;let r=t.geometry.attributes.position;n.snelheden.forEach((t,n)=>{t.y-=6*e,t.multiplyScalar(.985),r.array[n*3]+=t.x*e,r.array[n*3+1]+=t.y*e,r.array[n*3+2]+=t.z*e}),r.needsUpdate=!0,t.material.opacity=Math.max(0,n.leven/1.8),n.leven<=0&&(this.scene.remove(t),t.geometry.dispose(),t.material.dispose(),this.bursts.splice(this.bursts.indexOf(t),1))}}},yc=[`staal-blok2-voortgang`,`staal-blok2-munten`,`staal-blok2-kleding`,`staal-blok2-pleinmunten`,`staal-blok2-meesters`,`staal-blok2-voetbal`,`staal-blok2-leesmunten`];function bc(){try{for(let e of yc)localStorage.removeItem(e);for(let e=localStorage.length-1;e>=0;e--){let t=localStorage.key(e);t?.startsWith(`staal-niveau-`)&&localStorage.removeItem(t)}}catch{}}var xc=class{constructor(e,{x:t,z:n,draai:r=0,bord:i,open:a=!1,botsing:o=null}){this.groep=new N,this.groep.position.set(t,0,n),this.groep.rotation.y=r,e.add(this.groep),this.open=!1,this.animatie=null,this.tijd=0;let s=this.groep;for(let e of[-3.2,3.2])P(1.3,5.2,1.3,10129286,0,2.6,e,s),P(1.5,.3,1.5,8221547,0,5.35,e,s),B(.4,F(16763177,{emissive:5913600}),0,5.85,e,s);P(.5,.5,7.7,2830131,0,4.6,0,s);let c=Qe(1024,256,(e,t,n)=>{e.fillStyle=`#1d6b2f`,e.beginPath(),e.roundRect(0,0,t,n,40),e.fill(),e.fillStyle=`#2f9e44`,e.beginPath(),e.roundRect(14,14,t-28,n-28,30),e.fill();for(let r of[120,t-120]){e.fillStyle=`#fff`,e.beginPath(),e.arc(r,n/2,70,0,Math.PI*2),e.fill(),e.fillStyle=`#1d1d1d`,e.beginPath(),e.arc(r,n/2,26,0,Math.PI*2),e.fill();for(let t=0;t<5;t++){let i=t/5*Math.PI*2-Math.PI/2;e.beginPath(),e.arc(r+Math.cos(i)*58,n/2+Math.sin(i)*58,16,0,Math.PI*2),e.fill()}}e.fillStyle=`#fff`,e.font=`bold 110px "Trebuchet MS", sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(i,t/2,n/2+6)}),l=new W({map:c}),u=F(1927983),d=new H(new Je(.15,1.6,6.4),[u,u,u,u,u,u]);d.material=[l,l,u,u,u,u],d.position.set(0,5.75,0),d.castShadow=!0,s.add(d),this.deuren=[-1,1].map(e=>{let t=new N;t.position.set(0,0,e*2.55),s.add(t);let n=2.55,r=-e;P(.12,.12,n,2830131,0,3.4,r*n/2,t),P(.12,.12,n,2830131,0,.35,r*n/2,t),P(.12,.12,n,2830131,0,1.9,r*n/2,t);for(let e=0;e<=8;e++){let i=I(.04,3.3,2830131,0,1.85,e/8*r*n,t,5);e%2==0&&B(.08,F(16763177,{emissive:5913600}),0,3.55,e/8*r*n,t),i.castShadow=!0}return t.userData.kant=e,t}),this.slot=new N,this.slot.position.set(-.2,1.9,0),s.add(this.slot),P(.3,.75,.7,F(15116288,{emissive:5059328}),0,0,0,this.slot);let f=new H(new Be(.26,.07,8,16,Math.PI),F(11384253));f.rotation.y=Math.PI/2,f.position.y=.38,this.slot.add(f),B(.07,1907997,-.16,-.05,0,this.slot),this.bordjeCanvas=document.createElement(`canvas`),this.bordjeCanvas.width=512,this.bordjeCanvas.height=192,this.bordjeTex=new ve(this.bordjeCanvas),this.bordjeTex.colorSpace=ye,this.bordje=new H(new ut(2.4,.9),new W({map:this.bordjeTex,emissive:3351040})),this.bordje.rotation.y=-Math.PI/2,this.bordje.position.set(-.25,.85,0),s.add(this.bordje);let p=Qe(64,256,(e,t,n)=>{let r=e.createLinearGradient(0,0,0,n);r.addColorStop(0,`rgba(255,255,255,0)`),r.addColorStop(.25,`rgba(255,240,180,0.9)`),r.addColorStop(.8,`rgba(255,255,255,0.9)`),r.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=r,e.fillRect(0,0,t,n)});if(this.licht=new H(new ut(4.9,3.6),new nt({map:p,transparent:!0,opacity:0,blending:2,depthWrite:!1,side:2})),this.licht.rotation.y=Math.PI/2,this.licht.position.set(.1,1.85,0),this.licht.visible=!1,this.licht.userData.geenKlik=!0,s.add(this.licht),this.vonken=this.maakVonken(),s.add(this.vonken),s.traverse(e=>{e.isMesh&&(e.receiveShadow=!0)}),o){let e=new v;for(let t of[-3.2,3.2])e.set(0,0,t).applyEuler(s.rotation).add(s.position),o.voegCirkelToe(e.x,e.z,.85,6);let t=new v(-.9,0,-2.8).applyEuler(s.rotation).add(s.position),n=new v(.6,0,2.8).applyEuler(s.rotation).add(s.position);o.voegDoosToe(Math.min(t.x,n.x),Math.max(t.x,n.x),Math.min(t.z,n.z),Math.max(t.z,n.z),4),this.deurBotsing=o.dozen[o.dozen.length-1]}a&&this.zetOpen(!1)}maakVonken(){let e=new Float32Array(120);this.vonkData=[];for(let e=0;e<40;e++)this.vonkData.push({z:(Math.random()-.5)*4.4,y:Math.random()*3.4,v:.4+Math.random()*.6});let t=new Fe;t.setAttribute(`position`,new z(e,3));let n=new vt(t,new Te({color:16774079,size:.12,transparent:!0,opacity:.9,blending:2,depthWrite:!1}));return n.visible=!1,n.userData.geenKlik=!0,n}zetBordje(e,t){let n=this.bordjeCanvas.getContext(`2d`),{width:r,height:i}=this.bordjeCanvas;n.clearRect(0,0,r,i);let a=n.createLinearGradient(0,0,r,i);a.addColorStop(0,`#ffe066`),a.addColorStop(.5,`#fff3bf`),a.addColorStop(1,`#f2b705`),n.fillStyle=`#b8860b`,n.beginPath(),n.roundRect(0,0,r,i,28),n.fill(),n.fillStyle=a,n.beginPath(),n.roundRect(10,10,r-20,i-20,22),n.fill(),n.fillStyle=`#5c3a00`,n.textAlign=`center`,n.textBaseline=`middle`,n.font=`bold 46px "Trebuchet MS", sans-serif`,n.fillText(e,r/2,i*.36),n.font=`bold 54px "Trebuchet MS", sans-serif`,n.fillStyle=`#c92a2a`,n.fillText(t,r/2,i*.72),this.bordjeTex.needsUpdate=!0}zetOpen(e=!0,t=null){if(!this.open){if(this.open=!0,this.deurBotsing&&(this.deurBotsing.top=0),!e){this.slot.visible=!1,this.bordje.visible=!1;for(let e of this.deuren)e.rotation.y=-e.userData.kant*1.7;this.licht.visible=this.vonken.visible=!0,this.licht.material.opacity=.45;return}this.animatie={t:0,slotVy:1.5},t?.slotOpen()}}zetDicht(){this.open=!1,this.animatie=null,this.deurBotsing&&(this.deurBotsing.top=4),this.slot.visible=!0,this.slot.position.set(-.2,1.9,0),this.slot.rotation.set(0,0,0),this.bordje.visible=!0;for(let e of this.deuren)e.rotation.y=0;this.licht.visible=this.vonken.visible=!1,this.licht.material.opacity=0}isInOpening(e){if(!this.open||this.animatie)return!1;let t=this.groep.worldToLocal(e.clone());return t.x>-.6&&Math.abs(t.z)<2.2}afstandTot(e){return Math.hypot(e.x-this.groep.position.x,e.z-this.groep.position.z)}update(e){this.tijd+=e;let t=this.animatie;if(t){t.t+=e,this.slot.visible&&(t.slotVy-=12*e,this.slot.position.y+=t.slotVy*e,this.slot.position.x-=e*.8,this.slot.rotation.z+=e*4,this.bordje.position.y=Math.max(-1,this.bordje.position.y-e*1.5),this.slot.position.y<.25&&(this.slot.visible=!1,this.bordje.visible=!1));let n=U.clamp((t.t-.5)/1.4,0,1),r=n*n*(3-2*n);for(let e of this.deuren)e.rotation.y=-e.userData.kant*1.7*r;t.t>1.2&&(this.licht.visible=this.vonken.visible=!0,this.licht.material.opacity=Math.min(.45,(t.t-1.2)*.4)),t.t>2.6&&(this.animatie=null)}else this.open&&(this.licht.material.opacity=.4+Math.sin(this.tijd*1.2)*.08);if(this.vonken.visible){let t=this.vonken.geometry.attributes.position;this.vonkData.forEach((n,r)=>{n.y+=n.v*e,n.y>3.5&&(n.y=0,n.z=(Math.random()-.5)*4.4),t.setXYZ(r,.15,n.y+.1,n.z)}),t.needsUpdate=!0}}},Sc=null;function Cc(){return Sc||(Sc=document.createElement(`div`),Sc.className=`overgang`,document.body.appendChild(Sc),Sc)}var wc=e=>new Promise(t=>setTimeout(t,e));async function Tc(e=550){let t=Cc();t.style.transitionDuration=`${e}ms`,t.classList.add(`wit`),await wc(e+30)}async function Ec(e=650){let t=Cc();t.style.transitionDuration=`${e}ms`,t.classList.remove(`wit`),await wc(e)}var Dc=()=>F(16763177,{emissive:7031296});function Oc(e){let t=new N;P(1.5,.25,1.5,4804695,0,.125,0,t),P(1.2,1.1,1.2,3422784,0,.8,0,t),P(1.4,.15,1.4,4804695,0,1.42,0,t);let n=new H(new ut(1.05,.32),new W({map:Qe(256,80,(t,n,r)=>{t.fillStyle=`#e6a800`,t.fillRect(0,0,n,r),t.fillStyle=`#fff3bf`,t.fillRect(5,5,n-10,r-10),t.fillStyle=`#5c3a00`,t.font=`bold 34px "Trebuchet MS", sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(e,n/2,r/2+2)})}));for(let e=0;e<4;e++){let r=n.clone(),i=e/4*Math.PI*2;r.position.set(Math.sin(i)*.605,.85,Math.cos(i)*.605),r.rotation.y=i,t.add(r)}let r=new N;r.position.y=1.5,t.add(r);let i=[[0,0],[.42,0],[.42,.1],[.14,.18],[.1,.55],[.16,.7],[.5,.9],[.62,1.25],[.64,1.55],[.58,1.56],[.55,1.28],[.42,1],[0,.95]].map(([e,t])=>new de(e,t)),a=new H(new pe(i,28),Dc());a.material.side=2,r.add(a);for(let e of[-1,1]){let t=new H(new Be(.28,.06,8,20,Math.PI*1.3),Dc());t.position.set(e*.66,1.2,0),t.rotation.z=e>0?-Math.PI*.65:Math.PI*.35,r.add(t)}let o=new mt;for(let e=0;e<10;e++){let t=e%2?.07:.16,n=e/10*Math.PI*2+Math.PI/2;e===0?o.moveTo(Math.cos(n)*t,Math.sin(n)*t):o.lineTo(Math.cos(n)*t,Math.sin(n)*t)}for(let e of[1,-1]){let t=new H(new A(o,{depth:.04,bevelEnabled:!1}),F(14692657));t.position.set(0,1.18,e*.6),e<0&&(t.rotation.y=Math.PI),r.add(t)}return t.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),t.userData.beker=r,t}var kc=class{constructor(e){this.geluid=e,this.el=document.createElement(`div`),this.el.className=`muntenteller`,this.el.setAttribute(`aria-live`,`polite`),this.el.innerHTML=`<span class="munt draait" aria-hidden="true"></span><span class="mt-getal">0</span>`,document.body.appendChild(this.el),this.getalEl=this.el.querySelector(`.mt-getal`),this.getoond=Uo.totaal,this.toon(this.getoond),this.title(),this.onderweg=0,Uo.opVerandering(e=>{this.onderweg||(this.getoond=e,this.toon(e)),this.title()})}title(){this.el.title=`Je hebt ${Uo.totaal} munten`}toon(e){this.getalEl.textContent=e}beloon(e,t,n){if(e<=0)return;this.onderweg++,Uo.voegToe(e);let r=this.punt(t),i=this.punt(this.el.querySelector(`.munt`));this.zweefLabel(n??`+${e}`,r);let a=Math.min(8,Math.max(2,Math.round(e/3))),o=0;for(let t=0;t<a;t++){let n=document.createElement(`span`);n.className=`munt vliegend`,document.body.appendChild(n);let s=(Math.random()-.5)*80,c=(Math.random()-.5)*50,l=n.animate([{transform:`translate(${r.x-14}px, ${r.y-14}px) scale(.6)`,opacity:0},{transform:`translate(${r.x-14+s}px, ${r.y-14+c}px) scale(1.1)`,opacity:1,offset:.25},{transform:`translate(${i.x-14}px, ${i.y-14}px) scale(.8)`,opacity:1}],{duration:700+t*70,easing:`cubic-bezier(.5,0,.6,1)`,fill:`forwards`});l.onfinish=()=>{n.remove(),o++;let t=Math.round(e*o/a);this.toon(this.getoond+t),(o%2==1||o===a)&&this.geluid?.kling(),this.el.classList.remove(`hup`),this.el.offsetWidth,this.el.classList.add(`hup`),o===a&&(this.getoond+=e,this.onderweg--,this.onderweg||(this.getoond=Uo.totaal,this.toon(this.getoond)))}}}punt(e){if(!e||e instanceof Element&&!e.isConnected)return{x:window.innerWidth/2,y:window.innerHeight/2};if(`x`in e&&`y`in e&&!(e instanceof Element))return e;let t=e.getBoundingClientRect();return{x:t.left+t.width/2,y:t.top+t.height/2}}zweefLabel(e,t){let n=document.createElement(`div`);n.className=`munt-label`,n.textContent=e,n.style.left=`${t.x}px`,n.style.top=`${t.y}px`,document.body.appendChild(n),setTimeout(()=>n.remove(),1300)}},Ac=`staal-blok2-pleinmunten`,jc=[{id:`eik-fietsen`,x:-33.5,z:-9.2,y:0},{id:`keien`,x:-6.4,z:-15,y:0},{id:`klimtoren`,x:26,z:-12,y:1.68},{id:`glijbaan`,x:26,z:-6.3,y:0},{id:`paal`,x:12.2,z:-15.5,y:1.3},{id:`palissade`,x:32.6,z:12.4,y:0},{id:`hutje`,x:31,z:10.5,y:1.28},{id:`fietsenhok`,x:-35,z:-24,y:0},{id:`schommel`,x:-27,z:-8.4,y:0},{id:`wilg`,x:-25.6,z:-19.6,y:0},{id:`rode-struik`,x:19.4,z:23.8,y:0},{id:`struik-school`,x:-18,z:-21.3,y:0},{id:`hinkelbaan`,x:-9,z:18.6,y:0},{id:`hoek`,x:39,z:28.6,y:0},{id:`eik-ingang`,x:-14,z:28.8,y:0}];function Mc(){let e=new Date;return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}function Nc(){try{let e=JSON.parse(localStorage.getItem(Ac));if(e?.datum===Mc()&&Array.isArray(e.opgepakt))return new Set(e.opgepakt)}catch{}return new Set}var Pc=class{constructor(e){this.scene=e,this.opgepakt=Nc(),this.muntjes=[],this.opOppakken=null;let t=new c(.32,.32,.07,24);t.rotateX(Math.PI/2);let n=new W({color:16763177,emissive:8016384}),r=document.createElement(`canvas`);r.width=r.height=128;let i=r.getContext(`2d`);i.fillStyle=`#ffd43b`,i.fillRect(0,0,128,128),i.fillStyle=`#d99a00`,i.beginPath();for(let e=0;e<10;e++){let t=e%2?22:50,n=e/10*Math.PI*2-Math.PI/2;i.lineTo(64+Math.cos(n)*t,64+Math.sin(n)*t)}i.fill();let a=new ve(r);a.colorSpace=ye;let o=new W({map:a,emissive:5913600}),s=new W({color:15116288,emissive:5059328}),l=new Be(.32,.035,6,24);for(let r of jc){let i=new N,a=new H(t,[n,o,o]);a.castShadow=!0,i.add(a,new H(l,s)),i.position.set(r.x,r.y+.6,r.z),i.traverse(e=>{e.userData.geenKlik=!0}),i.visible=!this.opgepakt.has(r.id),e.add(i),this.muntjes.push({plek:r,groep:i,fase:Math.random()*6})}}get totaal(){return jc.length}get aantalGevonden(){return this.opgepakt.size}bewaar(){try{localStorage.setItem(Ac,JSON.stringify({datum:Mc(),opgepakt:[...this.opgepakt]}))}catch{}}controleerNieuweDag(){if(this.datum===Mc())return;this.datum=Mc();let e=Nc();if(e.size<this.opgepakt.size){this.opgepakt=e;for(let e of this.muntjes)e.groep.visible=!this.opgepakt.has(e.plek.id)}}update(e,t,n){this.controleerNieuweDag();for(let r of this.muntjes){if(!r.groep.visible)continue;r.fase+=e,r.groep.rotation.y+=e*2.2,r.groep.position.y=r.plek.y+.6+Math.sin(r.fase*2)*.08;let i=t.x-r.plek.x,a=t.z-r.plek.z;i*i+a*a<.81&&Math.abs(t.y-r.plek.y)<.9&&this.pak(r,n)}}pak(e,t){e.groep.visible=!1,this.opgepakt.add(e.plek.id),this.bewaar();let n=e.groep.position.clone().project(t),r={x:(n.x+1)/2*window.innerWidth,y:(1-n.y)/2*window.innerHeight};this.opOppakken?.(this.aantalGevonden,this.totaal,r)}wis(){this.opgepakt.clear(),this.bewaar();for(let e of this.muntjes)e.groep.visible=!0}},Fc=`modulepreload`,Ic=function(e,t){return new URL(e,t).href},Lc={},Rc=function(e){return e.pathname.endsWith(`.css`)},zc=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Ic(t,n);let r=s(t);if(r.href in Lc)return;Lc[r.href]=!0;let i=Rc(r);if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let o=document.createElement(`link`);if(o.rel=i?`stylesheet`:Fc,i||(o.as=`script`),o.crossOrigin=``,o.href=r.href,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),i)return new Promise((e,t)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Bc=new Ri({antialias:!0,powerPreference:`high-performance`});Bc.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),Bc.setSize(window.innerWidth,window.innerHeight),Bc.shadowMap.enabled=!0,Bc.shadowMap.type=1,document.getElementById(`spel`).appendChild(Bc.domElement);var Vc=new _t;Vc.background=new pt(11460863),Vc.fog=new ue(13626111,70,170);var Hc=new Pe(55,window.innerWidth/window.innerHeight,.1,300);Vc.add(new S(14676479,7313999,1.6));var Uc=new k(16773846,2.6);Uc.castShadow=!0,Uc.shadow.mapSize.set(1024,1024),Object.assign(Uc.shadow.camera,{left:-28,right:28,top:28,bottom:-28,near:1,far:120}),Uc.shadow.bias=-5e-4,Uc.shadow.normalBias=.03,Vc.add(Uc,Uc.target);var Wc=new rt(Vi),Gc=Wi(Vc,Wc),Kc=ro(Vc,Wc),qc=io(Vc,Wc),Jc=ao(Vc,Wc),Yc=[...Kc,qc,Jc],Xc=new xc(Vc,{x:40,z:0,draai:0,bord:Ra.poortBord,open:Yo.poortOpen,botsing:Wc});Gc.blokkers.push(Xc.groep);var X=new Ta(Vc);X.positie.copy(Hi),ko(X,Lo.aan),Lo.opVerandering(()=>ko(X,Lo.aan));var Z=new Ea(Hc,Gc.blokkers),Zc=document.getElementById(`ui`),Q=new Oa(Bc.domElement,Hc,Vc,Zc),$=new Ga(Zc,Q.isTouch,{voorlezen:Xs,geluid:Ws}),Qc=new qa(Zc,{voorlezen:Xs,geluid:Ws});Qc.opInstelling=()=>$.zetKnoppen();var $c=new nc(Vc,Wc,Zc,Hc,Xs),el=new mc(Zc,Object.fromEntries(Kc.map(e=>[e.data.id,e.stijl.bord]))),tl=new hc(Zc),nl=new vc(Vc,Ws),rl=new kc(Ws),il=new sc(Vc,Wc,Zc,Hc,Xs),al=new pc(Zc,{geluid:Ws,voorlezen:Xs,beloon:(e,t,n)=>rl.beloon(e,t,n)}),ol=new Pc(Vc);ol.opOppakken=(e,t,n)=>{rl.beloon(Ma.pleinMuntje,n,`+${Ma.pleinMuntje}`);let r=e===t?Na.pleinAlles:Na.pleinGevonden;$.toonMelding(r.replace(`{aantal}`,e).replace(`{totaal}`,t))};var sl=3.2,cl=null;function ll(){let e=null,t=sl;for(let n of zl?zl.kramen:Yc){let r=Math.hypot(X.positie.x-n.praatPunt.x,X.positie.z-n.praatPunt.z);r<t&&(e=n,t=r)}return e}function ul(e,t=!1){if(!e||Qc.open)return;if(e.isWinkel){vl(pl);return}if(e.isLeeskraam&&!t){hl.opJa=()=>ul(e,!0),vl(hl);return}Q.aan=!1,Q.doel=null,Q.ingedrukt.clear(),Q.joystick.x=Q.joystick.y=0,document.body.classList.add(`in-gesprek`),$.toonWolkje(null),$c.verbergBallon();let n=e.groep.position.x-X.positie.x,r=e.groep.position.z-X.positie.z;X.richting=Math.atan2(n,r),Z.draaiNaar(Math.atan2(-n,-r),.38),Z.zetGesprek(e.groep),Qc.toon(e,{opSpelen:e.isLeeskraam?dl:xl,opSluiten:fl})}function dl(){Qc.acties=null,Qc.sluit(),_l=gl,gl.opSluiten=()=>{_l=null,ou.update(),fl()},gl.toon()}function fl(){Q.aan=!0,Z.zetGesprek(null),document.body.classList.remove(`in-gesprek`)}var pl=new Qo(Zc,{geluid:Ws,voorlezen:Xs}),ml=new es(Zc,{geluid:Ws}),hl=new cs(Zc,{geluid:Ws}),gl=new ss(Zc,{geluid:Ws,voorlezen:Xs,beloon:(e,t,n)=>rl.beloon(e,t,n)}),_l=null;function vl(e){_l||Qc.open||yl||mu||Fl||(Q.aan=!1,Q.doel=null,Q.ingedrukt.clear(),$.toonWolkje(null),$c.verbergBallon(),_l=e,e.opSluiten=()=>{_l=null,ou.update(),Q.aan=!0},e.toon())}Q.opKast=()=>vl(ml),$.opKast=()=>vl(ml);var yl=null,bl=null;function xl(e){Qc.acties=null,Qc.sluit(),yl=Qs(e,{laag:Zc,beloon:(e,t,n)=>rl.beloon(e,t,n),opKlaar:(e,{niveau:t})=>{let n=xs.rondeGehaald(e.data.id,t);if(n&&(bl={id:e.data.id,stempel:n===`stempel`}),n===`stempel`)return J.stempelErbij;if(n===`niveau`){let e=3-t;return J.stempelNog.replace(`{aantal}`,e===1?`1 niveau`:`${e} niveaus`)}return``},opSluiten:()=>{if(yl=null,ou.update(),fl(),bl){let{id:e,stempel:t}=bl;bl=null,setTimeout(()=>{if(!t){el.voortgangGemaakt(e);return}el.stempel(e),Ws.stempel(),El(),kl(),xs.aantal===Sl&&!xs.kampioen&&setTimeout(Kl,900)},350)}}})}var Sl=Kc.length,Cl=new mt;for(let e=0;e<10;e++){let t=e%2?.22:.5,n=e/10*Math.PI*2+Math.PI/2;e===0?Cl.moveTo(Math.cos(n)*t,Math.sin(n)*t):Cl.lineTo(Math.cos(n)*t,Math.sin(n)*t)}var wl=new A(Cl,{depth:.12,bevelEnabled:!1});wl.center();var Tl=new W({color:16766011,emissive:8018432});function El(){for(let e of Kc){let t=xs.heeftStempel(e.data.id);t&&!e.ster&&(e.ster=new H(wl,Tl),e.ster.position.set(0,5.05,1.2),e.ster.castShadow=!0,e.groep.add(e.ster)),e.ster&&(e.ster.visible=t)}}El();function Dl(){return Sl-xs.aantal}function Ol(){return Dl()===1?Ra.nogEenStempel:Ra.nogStempels.replace(`{aantal}`,Dl())}function kl(){Xc.zetBordje(Ra.slotTekst,Ol())}kl();function Al(){Xc.open||xs.aantal<Sl||(Yo.zetPoortOpen(),Xc.zetOpen(!0,Ws),Jl(`🔓 ${Ra.poortOpen}`),$.toonMelding(Ra.poortOpenUitleg),Xs.zeg(`${Ra.poortOpen} ${Ra.poortOpenUitleg}`))}var jl=null,Ml=null;function Nl(){return jl||!Yo.beker?!1:(jl=Oc(Ra.bekerBord),jl.position.set(0,0,4),Vc.add(jl),Ml?Ml.top=3:(Wc.voegCirkelToe(0,4,1,3),Ml=Wc.cirkels[Wc.cirkels.length-1]),!0)}function Pl(){jl?.removeFromParent(),jl=null,Ml&&(Ml.top=0)}Nl();var Fl=null,Il=!1;async function Ll(){if(Il||Fl)return;Il=!0,Q.aan=!1,Q.doel=null,Q.ingedrukt.clear(),$.toonWolkje(null),$c.verbergBallon(),il.verbergBallon(),Ws.woesj(),await Tc();let{VoetbalWereld:e}=await zc(async()=>{let{VoetbalWereld:e}=await import(`./voetbalwereld-CIqUEuix.js`);return{VoetbalWereld:e}},__vite__mapDeps([0,1]),import.meta.url);Fl=new e({camera:Hc,besturing:Q,uiLaag:Zc,geluid:Ws,kleding:Lo.aan,opTerug:Rl,toonWolkje:e=>$.toonWolkje(e),beloon:(e,t,n)=>rl.beloon(e,t,n),muntenTotaal:()=>Uo.totaal}),document.body.classList.add(`in-voetbal`),ou.update(),Q.aan=!0,await Ec(),$.toonMelding(Ra.welkom),Il=!1}async function Rl(){if(Il||!Fl)return;Il=!0,Q.aan=!1,Q.ingedrukt.clear(),$.toonWolkje(null),Ws.woesj(),await Tc(),Fl.dispose(),Fl=null,$.verbergMelding(),document.body.classList.remove(`in-voetbal`),X.positie.set(33.5,0,0),X.richting=-Math.PI/2,Z.yaw=X.richting+Math.PI,Z.doelYaw=Z.doelPitch=null,Z.eersteKeer=!0;let e=Nl();ou.update(),Q.aan=!0,await Ec(),e&&($.toonMelding(Ra.bekerOpPlein),Xs.zeg(Ra.bekerOpPlein)),Il=!1}var zl=null,Bl={pitch:.42,afstand:10};function Vl(){return Math.hypot(X.positie.x-Ui.x,X.positie.z-Ui.z)<2.6}function Hl(e){e.add(X.groep,au),Q.scene=e}async function Ul(){if(Il||zl||Fl)return;Il=!0,Q.aan=!1,Q.doel=null,Q.ingedrukt.clear(),$.toonWolkje(null),$c.verbergBallon(),il.verbergBallon(),Ws.woesj(),await Tc();let{Leergroep3:e}=await zc(async()=>{let{Leergroep3:e}=await import(`./leergroep3-BjgXc3wF.js`);return{Leergroep3:e}},__vite__mapDeps([2,1]),import.meta.url);zl=new e,Hl(zl.scene),X.positie.copy(zl.startPlek),X.richting=zl.startRichting,Z.blokkers=zl.blokkers,Object.assign(Bl,{pitch:Z.pitch,afstand:Z.afstand}),Z.pitch=.78,Z.afstand=8.5,Z.yaw=X.richting+Math.PI,Z.doelYaw=Z.doelPitch=null,Z.eersteKeer=!0,$.zetTitel(zi.naam),document.body.classList.add(`in-school`),ou.update(),Q.aan=!0,await Ec(),$.toonMelding(zi.welkom),Il=!1}function Wl(){zl&&(zl.dispose(),zl=null,Hl(Vc),Z.blokkers=Gc.blokkers,Z.pitch=Bl.pitch,Z.afstand=Bl.afstand,$.zetTitel(null),document.body.classList.remove(`in-school`))}async function Gl(){!Il&&zl&&(Il=!0,Q.aan=!1,Q.doel=null,Q.ingedrukt.clear(),$.toonWolkje(null),Ws.woesj(),await Tc(),Wl(),$.verbergMelding(),X.positie.set(Ui.x,0,Ui.z+3.4),X.richting=0,Z.yaw=Math.PI,Z.doelYaw=Z.doelPitch=null,Z.eersteKeer=!0,ou.update(),Q.aan=!0,await Ec(),Il=!1)}function Kl(){xs.zetKampioen(),el.ververs();let e=new v(-Math.sin(Z.yaw),0,-Math.cos(Z.yaw));nl.start(14,X.positie.clone().addScaledVector(e,4)),nl.richting=e,Z.draaiNaar(Z.yaw,.15),Ws.feestmuziek(),hs(220),$c.juich(10),$.toonWolkje(null),Jl(J.feestTekst),Xs.zeg(J.feestTekst),setTimeout(ql,4500)}function ql(){Q.aan=!1,tl.toon()}tl.opSluiten=()=>{Q.aan=!mu,setTimeout(Al,600)},el.opOorkonde=ql;function Jl(e){let t=document.createElement(`div`);t.className=`feestbanner`,t.textContent=e,Zc.appendChild(t),setTimeout(()=>t.remove(),5e3)}$.opOpnieuw=()=>{Wl(),xs.wis(),Uo.wis(),ol.wis(),Lo.wis(),il.wis(),bc(),el.ververs(),El(),Yo.wis(),Xc.zetDicht(),Pl(),kl(),X.positie.copy(Hi),X.richting=Math.PI,Z.yaw=0};var Yl=2.4,Xl=null;function Zl(e){!e||Qc.open||yl||(X.richting=Math.atan2(e.positie.x-X.positie.x,e.positie.z-X.positie.z),$c.spreekAan(e,X.positie))}var Ql=2.6,$l=null;function eu(e){if(!(!e||Qc.open||yl||_l||al.open||mu)){if(X.richting=Math.atan2(e.positie.x-X.positie.x,e.positie.z-X.positie.z),il.genoegVandaag(e)){il.zeg(e,La.genoegVandaag,X.positie);return}if(!il.heeftVraag(e)){il.zeg(e,La.wachten.replace(`{minuten}`,il.minutenTeGaan(e)===1?`1 minuut`:`${il.minutenTeGaan(e)} minuten`),X.positie);return}Q.aan=!1,Q.doel=null,Q.ingedrukt.clear(),$.toonWolkje(null),$c.verbergBallon(),il.verbergBallon(),e.houVast(X.positie),il.startWachttijd(e),al.opSluiten=e=>{e.laatLos(),ou.update(),Q.aan=!0},al.toon(e)}}function tu(e){e?.isMeester?eu(e):Zl(e)}function nu(){if(!(Fl||Il)){if(zl){cl?ul(cl):zl.isBijDeurTerug(X.positie)&&Gl();return}cl?ul(cl):$l?eu($l):Xl?Zl(Xl):Vl()&&Ul()}}Q.opPraten=nu,$.opWolkjeKlik=()=>Fl?Fl.wolkjeKlik?.():nu(),Q.opKlikKind=e=>{Math.hypot(e.positie.x-X.positie.x,e.positie.z-X.positie.z)<3.5?tu(e):(Q.doel=e.positie.clone().setY(0),Q.doelIsKraam=!1,ru=e)};var ru=null;function iu(){if(ru){if(!Q.doel){ru=null;return}Q.doel.set(ru.positie.x,0,ru.positie.z),Math.hypot(ru.positie.x-X.positie.x,ru.positie.z-X.positie.z)<2&&(Q.doel=null,tu(ru),ru=null)}}var au=new H(new Me(.35,.55,24),new nt({color:16766011,transparent:!0,opacity:.9}));au.rotation.x=-Math.PI/2,au.userData.geenKlik=!0,au.visible=!1,Vc.add(au);var ou=new O,su=2.6,cu=0,lu=0;function uu(){if(ou.update(),Fl){let e=Math.min(ou.getDelta(),.05);Fl.update(e),Fl&&Bc.render(Fl.scene,Hc);return}if(yl||_l||Il)return;let e=Math.min(ou.getDelta(),.05);if(cu+=e,zl){fu(e);return}if(du(e,Wc),Uc.position.set(X.positie.x+20,40,X.positie.z+18),Uc.target.position.copy(X.positie),!Qc.open&&Q.aan){cl=ll(),Xl=$c.dichtsteBij(X.positie,Yl),$l=il.dichtsteBij(X.positie,Ql);let e=e=>Math.hypot(e.x-X.positie.x,e.z-X.positie.z),t=[cl&&[`kraam`,e(cl.praatPunt)],$l&&[`meester`,e($l.positie)],Xl&&[`kind`,e(Xl.positie)]].filter(Boolean).sort((e,t)=>e[1]-t[1])[0]?.[0];if(t!==`kraam`&&(cl=null),t!==`meester`&&($l=null),t!==`kind`&&(Xl=null),cl?.isWinkel)$.toonWolkje(Q.isTouch?Fa.openTik:Fa.openToets);else if(cl)$.toonWolkje(Q.isTouch?J.praatTik:J.praatToets);else if($l&&il.ballonMeester!==$l){let e=il.heeftVraag($l)?Q.isTouch?La.wolkjeTik:La.wolkjeToets:La.wolkjeWacht;$.toonWolkje(e.replace(`{naam}`,$l.info.naam))}else Xl&&$c.ballonKind!==Xl?$.toonWolkje((Q.isTouch?J.kindTik:J.kindToets).replace(`{naam}`,Xl.naam)):Vl()?$.toonWolkje(Q.isTouch?zi.naarBinnenTik:zi.naarBinnenToets):Xc.afstandTot(X.positie)<5.5?$.toonWolkje(Xc.open?Ra.wolkjeOpen:Ra.wolkjeDicht.replace(`{nog}`,Ol())):$.toonWolkje(null)}else Q.aan||$.toonWolkje(null);Xc.update(e),jl&&(jl.userData.beker.rotation.y+=e*.6),Q.aan&&Xc.isInOpening(X.positie)&&Ll(),$c.update(e,X),il.update(e,X);for(let t of Yc)t.update(e,cu,X.positie);Gc.update(e,cu),ol.update(e,X.positie,Hc),nl.update(e);for(let t of Kc)t.ster&&(t.ster.rotation.y+=e*.8);Z.update(e,X.positie),Bc.render(Vc,Hc)}function du(e,t){let n=Q.neemCamera();Z.draai(n.x,n.y),n.zoom&&Z.zoom(n.zoom),iu();let r=Q.beweging(),i={x:0,z:0},a=!1;if(r.actief){Q.doel=null,X.richting-=r.draai*su*e,a=r.vooruit<0;let t=r.vooruit*(a?.6:1);i={x:Math.sin(X.richting)*t,z:Math.cos(X.richting)*t}}else Q.doel&&(i=pu(Q.doel));let o=X.update(e,i,Q.neemSprong(),t,{draaiMee:!r.actief});!a&&(o>.002||r.draai)&&Z.volgAchter(X.richting+Math.PI,e,r.draai?5:2.5),Q.doel&&(lu=o<.01?lu+e:0,lu>.4&&(Q.doel=null)),au.visible=!!Q.doel,Q.doel&&(au.position.set(Q.doel.x,.05,Q.doel.z),au.scale.setScalar(1+Math.sin(cu*6)*.12))}function fu(e){du(e,zl.botsing),!Qc.open&&Q.aan?(cl=ll(),cl?$.toonWolkje(Q.isTouch?J.praatTik:J.praatToets):zl.isBijDeurTerug(X.positie)?$.toonWolkje(Q.isTouch?zi.naarBuitenTik:zi.naarBuitenToets):$.toonWolkje(null)):Q.aan||$.toonWolkje(null),zl.update(e,cu,X.positie),Z.update(e,X.positie),Bc.render(zl.scene,Hc)}function pu(e){let t=e.x-X.positie.x,n=e.z-X.positie.z,r=Math.hypot(t,n);if(r<.25)return Q.doel=null,Q.doelIsKraam&&ul(ll()),{x:0,z:0};let i=Math.min(1,r/1.2)/r;return{x:t*i,z:n*i}}Bc.setAnimationLoop(uu);var mu=!0;Q.aan=!1;function hu(){for(let e of Kc)xs.rondeGehaald(e.data.id,3);xs.zetKampioen(),el.ververs(),El(),kl(),Yo.zetPoortOpen();for(let e of Va)Yo.zetVerslagen(e.id);Yo.zetBeker(),Xc.open||Xc.zetOpen(!0,Ws),Nl(),Lo.geefAlles(Pa.map(e=>e.id)),Fl?.bord?.teken(),$.toonMelding(Ua.melding),Ws.klaar()}function gu(e){return!Ha.leerkrachtCode||e.trim().toLowerCase()!==Ha.leerkrachtCode.toLowerCase()?!1:(hu(),!0)}if(Ha.leerkrachtCode){let e=``;window.addEventListener(`keydown`,t=>{t.target?.tagName!==`INPUT`&&t.key.length===1&&(e=(e+t.key.toLowerCase()).slice(-Ha.leerkrachtCode.length),e===Ha.leerkrachtCode.toLowerCase()&&(e=``,setTimeout(()=>{ml.open&&ml.sluit()},0),hu()))})}gc(Zc,()=>{mu=!1,Q.aan=!0,Ws.plop(),xs.aantal===Sl&&!Xc.open&&setTimeout(Al,1200)},gu),Ha.geheimeToetsF9&&window.addEventListener(`keydown`,e=>{if(!(e.code!==`F9`||mu||Fl)){e.preventDefault();for(let e of Kc)xs.rondeGehaald(e.data.id,3);el.ververs(),El(),kl(),$.toonMelding(`🧪 Testtoets: alle stempels gegeven`),xs.kampioen?setTimeout(Al,600):setTimeout(Kl,600)}}),window.addEventListener(`resize`,()=>{Hc.aspect=window.innerWidth/window.innerHeight,Hc.updateProjectionMatrix(),Bc.setSize(window.innerWidth,window.innerHeight)}),window.__spel={get binnen(){return zl},naarBinnen:Ul,naarBuiten:Gl,leeskraam:Jc,leesvenster:gl,leesMelding:hl,speler:X,besturing:Q,volgCam:Z,hud:$,botsing:Wc,frame:uu,kramen:Kc,boetiek:qc,poort:Xc,naarVoetbal:Ll,naarPlein:Rl,get voetbal(){return Fl},meesters:il,meestervraag:al,winkel:pl,kastvenster:ml,kledingkast:Lo,kinderen:$c,dialoog:Qc,munten:Uo,muntenteller:rl,pleinMuntjes:ol,voortgang:xs,stempelkaart:el,startFeest:Kl,oorkonde:tl,vuurwerk:nl,startGesprek:ul,speelMinispel:xl,get actiefSpel(){return yl},renderer:Bc,scene:Vc,camera:Hc};export{ko as a,Va as c,zi as d,Bi as f,Yo as i,za as l,vc as n,Ra as o,hs as r,Ba as s,xc as t,Ta as u};
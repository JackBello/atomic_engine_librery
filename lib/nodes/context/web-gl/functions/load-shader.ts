export const loadShader = (
	context: WebGL2RenderingContext,
	type: number,
	source: string,
) => {
	const shader = context.createShader(type) as WebGLShader;

	context.shaderSource(shader, source);
	context.compileShader(shader);

	if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
		console.error(
			`An error occurred compiling the shaders: ${context.getShaderInfoLog(shader)}`,
		);

		context.deleteShader(shader);

		return null;
	}

	return shader;
};

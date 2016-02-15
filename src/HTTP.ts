export module HTTP {
	export class Req {
		private base:string;

		constructor(base:string) {
			this.base = base;
		}

		public Get(ep:string):Promise<Response> {
			return new Promise((resolve) => {
				resolve(new Response());
			});
		}
	}

	class Response {

	}
}

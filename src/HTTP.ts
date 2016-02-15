export module HTTP {
	export class Req {
		private base:string;
		private r:XMLHttpRequest;

		constructor(base:string) {
			this.base = base;
			this.r = new XMLHttpRequest();
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
